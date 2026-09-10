import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.classNames = new Set();
    this.dataset = {};
    this.style = {};
    this.hidden = false;
    this.disabled = false;
    this.focused = false;
    this.onFocus = () => {};
  }

  get classList() {
    return {
      add: (...names) => names.forEach((name) => this.classNames.add(name)),
      remove: (...names) => names.forEach((name) => this.classNames.delete(name)),
      contains: (name) => this.classNames.has(name),
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
    if (name === "hidden") this.hidden = true;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
    if (name === "hidden") this.hidden = false;
  }

  addEventListener(name, listener) {
    this.listeners ??= new Map();
    this.listeners.set(name, listener);
  }

  focus(options) {
    this.onFocus?.();
    this.focused = true;
    this.focusOptions = options;
  }

  scrollIntoView(options) {
    this.scrollIntoViewOptions = options;
  }
}

const componentScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/components/KakaoTalkModal.astro"), "utf8");
  const script = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
  assert.ok(script, "KakaoTalkModal.astro must ship a client interaction script");
  return ts.transpileModule(script, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
};

const createHarness = async ({ writeText } = {}) => {
  const modal = new FakeElement();
  const closeButton = new FakeElement();
  const copyButton = new FakeElement();
  const copyLabel = new FakeElement();
  const fallbackField = new FakeElement();
  const trigger = new FakeElement();
  const background = new FakeElement();
  const listeners = new Map();
  const scrollCalls = [];

  modal.setAttribute("hidden", "");
  modal.setAttribute("aria-hidden", "true");
  modal.classList.add("opacity-0", "pointer-events-none");
  modal.closest = () => null;
  modal.querySelectorAll = () => [closeButton, copyButton, ...(fallbackField.disabled ? [] : [fallbackField])];
  copyButton.dataset = {
    copyKakaotalk: "gh34366",
    copiedLabel: "COPIED",
    manualLabel: "COPY MANUALLY",
  };
  copyLabel.textContent = "COPY gh34366";
  fallbackField.hidden = true;
  fallbackField.disabled = true;
  fallbackField.value = "gh34366";
  fallbackField.select = () => (fallbackField.selected = true);
  fallbackField.scrollIntoView = (options) => {
    fallbackField.scrollIntoViewOptions = options;
    fallbackField.labelAtScroll = copyLabel.textContent;
  };
  const elements = {
    "kakaotalk-modal": modal,
    "kakaotalk-modal-close": closeButton,
    "kakaotalk-copy-btn": copyButton,
    "kakaotalk-copy-label": copyLabel,
    "kakaotalk-copy-fallback": fallbackField,
  };
  const document = {
    activeElement: trigger,
    body: { style: { overflow: "clip" } },
    getElementById: (id) => elements[id] ?? null,
    querySelector: (selector) => (selector === "[data-page-background]" ? background : null),
    addEventListener: (name, listener) => listeners.set(name, listener),
  };
  const focusableElements = [closeButton, copyButton, fallbackField, trigger];
  const setActive = (element) => {
    for (const candidate of focusableElements) candidate.focused = false;
    document.activeElement = element;
    element.focused = true;
  };
  for (const element of focusableElements) {
    element.onFocus = () => setActive(element);
  }
  const window = {
    scrollY: 417,
    scrollTo: (options) => scrollCalls.push(options),
    setTimeout: () => 1,
    clearTimeout() {},
  };
  const navigator = writeText === undefined ? {} : { clipboard: { writeText } };

  vm.runInNewContext(await componentScript(), {
    document,
    HTMLElement: FakeElement,
    navigator,
    requestAnimationFrame: (callback) => callback(),
    window,
  });

  const documentClick = listeners.get("click");
  return {
    modal,
    closeButton,
    copyButton,
    copyLabel,
    fallbackField,
    trigger,
    background,
    document,
    window,
    scrollCalls,
    setActive,
    open: () =>
      documentClick({
        preventDefault() {},
        target: { closest: (selector) => (selector === "[data-kakaotalk-trigger]" ? trigger : null) },
      }),
    backdropClose: () => documentClick({ target: modal }),
    escape: () => listeners.get("keydown")({ key: "Escape", preventDefault() {} }),
    tab: (shiftKey = false) => listeners.get("keydown")({ key: "Tab", shiftKey, preventDefault() {} }),
    copy: () => copyButton.listeners.get("click")(),
  };
};

test("KakaoTalk modal traps focus, locks the page, and restores trigger and scroll on every close path", async () => {
  const harness = await createHarness({ writeText: async () => {} });

  harness.open();
  assert.equal(harness.modal.hidden, false);
  assert.equal(harness.modal.getAttribute("aria-hidden"), "false");
  assert.equal(harness.background.inert, true);
  assert.equal(harness.document.body.style.overflow, "hidden");
  assert.equal(harness.closeButton.focused, true);
  assert.equal(harness.closeButton.focusOptions?.preventScroll, true);

  harness.setActive(harness.copyButton);
  harness.tab();
  assert.equal(harness.closeButton.focused, true, "Tab from the final control must wrap to close");
  harness.setActive(harness.closeButton);
  harness.tab(true);
  assert.equal(harness.copyButton.focused, true, "Shift+Tab from close must wrap to copy");

  harness.escape();
  assert.equal(harness.modal.hidden, true, "close must hide immediately, without a reopen race");
  assert.equal(harness.modal.getAttribute("aria-hidden"), "true");
  assert.equal(harness.background.inert, false);
  assert.equal(harness.document.body.style.overflow, "clip");
  assert.equal(harness.trigger.focusOptions?.preventScroll, true);
  assert.equal(harness.scrollCalls.at(-1)?.top, 417);
  assert.equal(harness.scrollCalls.at(-1)?.behavior, "instant");

  harness.trigger.focused = false;
  harness.setActive(harness.trigger);
  harness.open();
  harness.backdropClose();
  assert.equal(harness.modal.hidden, true);
  assert.equal(harness.trigger.focused, true, "backdrop close must restore the trigger");

  harness.setActive(harness.trigger);
  harness.open();
  harness.closeButton.listeners.get("click")();
  assert.equal(harness.modal.hidden, true, "close button must close the modal");
});

test("KakaoTalk copy reports success and keeps its manual fallback hidden", async () => {
  let copied = "";
  const harness = await createHarness({ writeText: async (value) => (copied = value) });
  harness.open();

  await harness.copy();

  assert.equal(copied, "gh34366");
  assert.equal(harness.copyLabel.textContent, "COPIED");
  assert.equal(harness.fallbackField.hidden, true);
  assert.equal(harness.fallbackField.disabled, true);
});

for (const clipboard of ["missing", "denied"]) {
  test(`KakaoTalk ${clipboard} Clipboard API exposes and selects a truthful manual fallback`, async () => {
    const harness = await createHarness(
      clipboard === "missing"
        ? {}
        : { writeText: async () => { throw new Error("permission denied"); } },
    );
    harness.open();

    await harness.copy();

    assert.equal(harness.copyLabel.textContent, "COPY MANUALLY");
    assert.equal(harness.fallbackField.hidden, false);
    assert.equal(harness.fallbackField.disabled, false);
    assert.equal(harness.fallbackField.focused, true);
    assert.equal(harness.fallbackField.selected, true);
    assert.equal(harness.fallbackField.scrollIntoViewOptions?.block, "nearest");
    assert.equal(harness.fallbackField.scrollIntoViewOptions?.inline, "nearest");
    assert.equal(harness.fallbackField.labelAtScroll, "COPY MANUALLY",
      "scroll after updating the longer status, otherwise it pushes the field out of view");

    harness.setActive(harness.fallbackField);
    harness.tab();
    assert.equal(harness.closeButton.focused, true, "the enabled fallback must join the focus trap");
  });
}

test("late clipboard completion cannot steal focus or leak status into a repeated opening", async () => {
  let resolveCopy;
  const pendingCopy = new Promise((resolve) => (resolveCopy = resolve));
  const harness = await createHarness({ writeText: () => pendingCopy });
  harness.open();
  const copyOperation = harness.copy();
  harness.escape();

  resolveCopy();
  await copyOperation;
  assert.equal(harness.trigger.focused, true);
  assert.equal(harness.copyLabel.textContent, "COPY gh34366", "closed modal must ignore a late result");

  harness.fallbackField.hidden = false;
  harness.fallbackField.disabled = false;
  harness.copyLabel.textContent = "STALE";
  harness.open();
  assert.equal(harness.copyLabel.textContent, "COPY gh34366");
  assert.equal(harness.fallbackField.hidden, true);
  assert.equal(harness.fallbackField.disabled, true);
});

test("an older failed copy cannot overwrite a newer successful copy", async () => {
  let rejectFirst;
  let resolveSecond;
  const first = new Promise((_, reject) => (rejectFirst = reject));
  const second = new Promise((resolve) => (resolveSecond = resolve));
  let attempts = 0;
  const harness = await createHarness({
    writeText: () => (++attempts === 1 ? first : second),
  });
  harness.open();

  const olderCopy = harness.copy();
  const newerCopy = harness.copy();
  resolveSecond();
  await newerCopy;
  assert.equal(harness.copyLabel.textContent, "COPIED");

  rejectFirst(new Error("older permission rejection"));
  await olderCopy;
  assert.equal(harness.copyLabel.textContent, "COPIED", "only the newest copy attempt may report status");
  assert.equal(harness.fallbackField.hidden, true);
  assert.equal(harness.fallbackField.disabled, true);
  assert.equal(harness.fallbackField.focused, false, "a stale failure must not steal focus");
});
