import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.classList = new Set();
    this.dataset = {};
    this.style = {};
    this.focused = false;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  addEventListener(name, listener) {
    this.listeners ??= new Map();
    this.listeners.set(name, listener);
  }

  focus() {
    this.focused = true;
  }
}

const classListFor = (element) => {
  const classes = element.classList;
  return {
    add: (...names) => names.forEach((name) => classes.add(name)),
    remove: (...names) => names.forEach((name) => classes.delete(name)),
    replace: (from, to) => {
      if (classes.delete(from)) classes.add(to);
    },
    toggle: (name, force) => {
      const active = force ?? !classes.has(name);
      if (active) classes.add(name);
      else classes.delete(name);
      return active;
    },
    has: (name) => classes.has(name),
  };
};

const componentScript = async (component) => {
  const source = await readFile(path.join(projectRoot, "src/components", component), "utf8");
  const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.at(-1)?.[1];
  assert.ok(script, `${component} must ship a client interaction script`);
  return script
    .replace(/<([A-Z][A-Za-z0-9]*)>/g, "")
    .replace(/: (?:HTMLElement|HTMLButtonElement|number) \| (?:null|undefined)/g, "")
    .replace(/ as [A-Z][A-Za-z0-9]*(?: \| null)?/g, "")
    .replace(/: (?:boolean|string)/g, "");
};

test("rapidly reopening the VIP drawer does not let a prior close timer hide it", async () => {
  const drawer = new FakeElement();
  const panel = new FakeElement();
  const scrim = new FakeElement();
  const closeButton = new FakeElement();
  const finalControl = new FakeElement();
  const trigger = new FakeElement();
  const timers = [];
  const listeners = new Map();

  drawer.setAttribute("aria-hidden", "true");
  [drawer, panel, scrim].forEach((element) => (element.classList = new Set()));
  drawer.classList.add("pointer-events-none", "invisible");
  panel.classList.add("translate-y-full", "sm:translate-x-full");
  scrim.classList.add("opacity-0");

  const background = new FakeElement();
  const document = {
    activeElement: trigger,
    body: { style: {}, append: () => {} },
    querySelector: (selector) => {
      if (selector === "[data-vip-extras-drawer]") return drawer;
      if (selector === "[data-page-background]") return background;
      return null;
    },
    addEventListener: (name, listener) => listeners.set(name, listener),
  };

  drawer.querySelector = (selector) => {
    if (selector === "[data-vip-panel]") return panel;
    if (selector === "[data-vip-scrim]") return scrim;
    if (selector === "[data-close-vip-extras]") return closeButton;
    return null;
  };
  panel.querySelectorAll = () => [closeButton, finalControl];
  for (const element of [drawer, panel, scrim, closeButton, finalControl, trigger]) {
    element.classList = classListFor(element);
  }

  const context = {
    document,
    HTMLElement: FakeElement,
    requestAnimationFrame: (callback) => callback(),
    window: { setTimeout: (callback) => timers.push(callback) },
  };
  vm.runInNewContext(await componentScript("VipExtrasDrawer.astro"), context);

  listeners.get("click")({
    preventDefault() {},
    target: { closest: (selector) => (selector === "[data-open-vip-extras]" ? trigger : null) },
  });
  assert.equal(closeButton.focused, true, "opening must focus the first drawer control");
  assert.equal(background.inert, true, "opening must make the page background inert");

  document.activeElement = finalControl;
  listeners.get("keydown")({ key: "Tab", shiftKey: false, preventDefault() {} });
  assert.equal(closeButton.focused, true, "Tab from the last drawer control must wrap to the first");

  document.activeElement = closeButton;
  listeners.get("keydown")({ key: "Tab", shiftKey: true, preventDefault() {} });
  assert.equal(finalControl.focused, true, "Shift+Tab from the first drawer control must wrap to the last");

  listeners.get("keydown")({ key: "Escape", preventDefault() {} });
  assert.equal(background.inert, false, "Escape must restore the background");
  assert.equal(trigger.focused, true, "Escape must restore the opening trigger");

  listeners.get("click")({
    preventDefault() {},
    target: { closest: (selector) => (selector === "[data-open-vip-extras]" ? trigger : null) },
  });
  listeners.get("click")({
    target: { closest: (selector) => (selector === "[data-close-vip-extras]" ? closeButton : null) },
  });
  listeners.get("click")({
    preventDefault() {},
    target: { closest: (selector) => (selector === "[data-open-vip-extras]" ? trigger : null) },
  });

  timers.forEach((callback) => callback());

  assert.equal(drawer.getAttribute("aria-hidden"), "false");
  assert.equal(drawer.classList.has("invisible"), false);
  assert.equal(drawer.classList.has("pointer-events-none"), false);

  scrim.closest = () => null;
  listeners.get("click")({ target: scrim });
  assert.equal(drawer.getAttribute("aria-hidden"), "true", "backdrop clicks must close the drawer");
});

test("the WeChat modal traps focus and restores the trigger on keyboard and backdrop close", async () => {
  const modal = new FakeElement();
  const closeButton = new FakeElement();
  const copyButton = new FakeElement();
  const copyLabel = new FakeElement();
  const trigger = new FakeElement();
  const background = new FakeElement();
  const listeners = new Map();

  modal.setAttribute("hidden", "");
  modal.classList.add("opacity-0", "pointer-events-none");
  for (const element of [modal, closeButton, copyButton, copyLabel, trigger, background]) {
    element.classList = classListFor(element);
  }
  modal.querySelectorAll = () => [closeButton, copyButton];
  modal.closest = () => null;

  const document = {
    activeElement: trigger,
    body: { style: {} },
    getElementById: (id) =>
      ({
        "wechat-modal": modal,
        "wechat-modal-close": closeButton,
        "wechat-copy-btn": copyButton,
        "wechat-copy-label": copyLabel,
      })[id] ?? null,
    querySelector: (selector) => (selector === "[data-page-background]" ? background : null),
    addEventListener: (name, listener) => listeners.set(name, listener),
    createElement: () => new FakeElement(),
  };

  vm.runInNewContext(await componentScript("WeChatModal.astro"), {
    document,
    HTMLElement: FakeElement,
    navigator: { clipboard: { writeText: async () => {} } },
    requestAnimationFrame: (callback) => callback(),
    window: { setTimeout: () => 0, clearTimeout() {} },
  });

  listeners.get("click")({
    preventDefault() {},
    target: { closest: (selector) => (selector === "[data-wechat-trigger]" ? trigger : null) },
  });
  assert.equal(closeButton.focused, true, "opening must focus the first modal control");
  assert.equal(background.inert, true, "opening must make the page background inert");

  document.activeElement = copyButton;
  listeners.get("keydown")({ key: "Tab", shiftKey: false, preventDefault() {} });
  assert.equal(closeButton.focused, true, "Tab must wrap inside the modal");

  document.activeElement = closeButton;
  listeners.get("keydown")({ key: "Tab", shiftKey: true, preventDefault() {} });
  assert.equal(copyButton.focused, true, "Shift+Tab must wrap inside the modal");

  listeners.get("keydown")({ key: "Escape", preventDefault() {} });
  assert.equal(background.inert, false, "Escape must restore the page background");
  assert.equal(trigger.focused, true, "Escape must restore the trigger");

  listeners.get("click")({
    preventDefault() {},
    target: { closest: (selector) => (selector === "[data-wechat-trigger]" ? trigger : null) },
  });
  listeners.get("click")({ target: modal });
  assert.equal(modal.getAttribute("aria-hidden"), "true", "backdrop clicks must close the modal");
});

test("VIP tabs move focus and selection with Arrow, Home, and End", async () => {
  const how = new FakeElement();
  const gifts = new FakeElement();
  const howPanel = new FakeElement();
  const giftsPanel = new FakeElement();
  const tablist = new FakeElement();
  const tabs = [how, gifts];
  const panels = [howPanel, giftsPanel];

  how.dataset = { tabTarget: "how" };
  gifts.dataset = { tabTarget: "gifts" };
  howPanel.dataset = { tabPanel: "how" };
  giftsPanel.dataset = { tabPanel: "gifts" };
  how.setAttribute("aria-selected", "true");
  gifts.setAttribute("aria-selected", "false");
  for (const element of [...tabs, ...panels, tablist]) element.classList = classListFor(element);
  tablist.getBoundingClientRect = () => ({ top: 100 });
  for (const panel of panels) panel.getBoundingClientRect = () => ({ top: 0 });

  const document = {
    querySelectorAll: (selector) => {
      if (selector === "[data-tab-target]") return tabs;
      if (selector === "[data-tab-panel]") return panels;
      return [];
    },
    querySelector: (selector) => {
      if (selector === "[data-vip-tablist]") return tablist;
      if (selector.includes('"how"')) return howPanel;
      if (selector.includes('"gifts"')) return giftsPanel;
      return null;
    },
  };

  vm.runInNewContext(await componentScript("HowItWorks.astro"), {
    document,
    window: { matchMedia: () => ({ matches: false }), scrollBy() {} },
  });

  const keydown = tablist.listeners.get("keydown");
  keydown({ key: "ArrowRight", target: how, preventDefault() {} });
  assert.equal(gifts.getAttribute("aria-selected"), "true");
  assert.equal(gifts.tabIndex, 0);
  assert.equal(gifts.focused, true);

  keydown({ key: "Home", target: gifts, preventDefault() {} });
  assert.equal(how.getAttribute("aria-selected"), "true");
  assert.equal(how.tabIndex, 0);

  keydown({ key: "End", target: how, preventDefault() {} });
  assert.equal(gifts.getAttribute("aria-selected"), "true");
  assert.equal(gifts.tabIndex, 0);
});

test("the promo CTA follows both responsive and scroll visibility without leaving a keyboard target", async () => {
  const bar = new FakeElement();
  const cta = new FakeElement();
  cta.setAttribute("aria-hidden", "true");
  cta.setAttribute("tabindex", "-1");
  bar.querySelectorAll = () => [cta];
  const media = { matches: true, addEventListener: (_, listener) => (media.listener = listener) };
  const listeners = new Map();
  const window = {
    matchMedia: () => media,
    addEventListener: (name, listener) => listeners.set(name, listener),
    scrollY: 0,
  };
  const document = {
    querySelectorAll: () => [],
    querySelector: (selector) => (selector === "[data-promo-cta]" ? cta : null),
    getElementById: (id) => (id === "promo-top-bar" ? bar : null),
  };

  vm.runInNewContext(await componentScript("PromoBar.astro"), {
    document,
    window,
    getComputedStyle: () => ({ position: "fixed" }),
    requestAnimationFrame: (callback) => callback(),
  });
  assert.equal(bar.getAttribute("aria-hidden"), "false");
  assert.equal(bar.inert, false);
  assert.equal(cta.getAttribute("aria-hidden"), "false");
  assert.equal(cta.getAttribute("tabindex"), null);

  window.scrollY = 80;
  listeners.get("scroll")();
  assert.equal(bar.getAttribute("aria-hidden"), "true", "a scrolled-away bar must leave the accessibility tree");
  assert.equal(bar.inert, true, "a scrolled-away bar must make all descendants inert");
  assert.equal(cta.getAttribute("aria-hidden"), "true");
  assert.equal(cta.tabIndex, -1, "a transparent CTA must not remain in keyboard order");

  window.scrollY = 0;
  listeners.get("scroll")();
  assert.equal(bar.getAttribute("aria-hidden"), "false", "returning to the top must expose the bar again");
  assert.equal(bar.inert, false);
  assert.equal(cta.getAttribute("aria-hidden"), "false");
  assert.equal(cta.getAttribute("tabindex"), null);

  media.matches = false;
  media.listener();
  assert.equal(cta.getAttribute("aria-hidden"), "true");
  assert.equal(cta.tabIndex, -1);
});

test("the spa gallery lightbox makes the page inert and restores it after every close path", async () => {
  const lightbox = new FakeElement();
  const image = new FakeElement();
  const caption = new FakeElement();
  const closeButton = new FakeElement();
  const trigger = new FakeElement();
  const background = new FakeElement();
  const appended = [];
  const documentListeners = new Map();

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.classList.add("hidden");
  trigger.dataset = {
    src: "/media/venue-lg.webp",
    alt: "Venue interior",
    caption: "Venue lounge",
  };
  lightbox.querySelector = (selector) =>
    ({
      "[data-gallery-image]": image,
      "[data-gallery-caption]": caption,
      "[data-gallery-close]": closeButton,
    })[selector] ?? null;

  for (const element of [lightbox, image, caption, closeButton, trigger, background]) {
    element.classList = classListFor(element);
  }

  const document = {
    activeElement: trigger,
    body: { style: {}, append: (node) => appended.push(node) },
    querySelector: (selector) => {
      if (selector === "[data-gallery-lightbox]") return lightbox;
      if (selector === "[data-page-background]") return background;
      return null;
    },
    querySelectorAll: (selector) => (selector === "[data-gallery-open]" ? [trigger] : []),
    addEventListener: (name, listener) => documentListeners.set(name, listener),
  };

  vm.runInNewContext(await componentScript("SpaGallery.astro"), {
    document,
    HTMLElement: FakeElement,
    requestAnimationFrame: (callback) => callback(),
  });

  assert.deepEqual(appended, [lightbox], "the lightbox must be moved outside the inert page subtree");
  trigger.listeners.get("click")();
  assert.equal(lightbox.hidden, false);
  assert.equal(lightbox.getAttribute("aria-hidden"), "false");
  assert.equal(background.inert, true, "opening must make the page background inert");
  assert.equal(closeButton.focused, true, "opening must focus the close control");

  documentListeners.get("keydown")({ key: "Escape", preventDefault() {} });
  assert.equal(background.inert, false, "Escape must restore the page background");
  assert.equal(trigger.focused, true, "Escape must restore the opening trigger");

  trigger.focused = false;
  trigger.listeners.get("click")();
  lightbox.listeners.get("click")({ target: lightbox });
  assert.equal(background.inert, false, "backdrop close must restore the page background");
  assert.equal(trigger.focused, true, "backdrop close must restore the opening trigger");
});

test("the floating contact pill restores and removes its tab stop as the hero enters and leaves view", async () => {
  const pill = new FakeElement();
  const backToTop = new FakeElement();
  const progressRing = new FakeElement();
  const hero = new FakeElement();
  let observer;
  pill.setAttribute("aria-hidden", "true");
  pill.setAttribute("tabindex", "-1");
  backToTop.setAttribute("aria-hidden", "true");
  for (const element of [pill, backToTop, progressRing]) element.classList = classListFor(element);
  progressRing.style = {};
  backToTop.querySelector = () => progressRing;

  const document = {
    documentElement: { scrollHeight: 2000 },
    getElementById: (id) =>
      ({ "floating-contact-pill": pill, "floating-back-to-top": backToTop })[id] ?? null,
    querySelector: (selector) => (selector === '[data-testid="hero-icon-row"]' ? hero : null),
  };
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      observer = this;
    }

    observe() {}
  }

  vm.runInNewContext(await componentScript("FloatingContactPill.astro"), {
    document,
    window: {
      matchMedia: () => ({ matches: false }),
      scrollY: 0,
      innerHeight: 800,
      addEventListener() {},
      scrollTo() {},
    },
    IntersectionObserver: FakeObserver,
    requestAnimationFrame: (callback) => callback(),
  });

  observer.callback([{ intersectionRatio: 0 }]);
  assert.equal(pill.getAttribute("aria-hidden"), "false");
  assert.equal(pill.getAttribute("tabindex"), null);

  observer.callback([{ intersectionRatio: 1 }]);
  assert.equal(pill.getAttribute("aria-hidden"), "true");
  assert.equal(pill.tabIndex, -1);
});
