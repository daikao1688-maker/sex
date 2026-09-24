import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/pages/[lang]/spa/[slug].astro', import.meta.url), 'utf8');
const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const videoScript = scripts.find((match) => match[1].includes('[data-video-modal]'));
assert.ok(videoScript, 'the venue page must ship its shared video interaction script');
const script = ts.transpileModule(videoScript[1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

// Execute the production controller. Substitute only DOM/media APIs and the
// event loop; copy static dialog attributes from the real template so ARIA
// assertions cannot pass merely because the fixture invents a title link.
function harness() {
  const listeners = new Map();
  const frames = new Map();
  const timers = new Map();
  const scrollCalls = [];
  let nextId = 1;
  let document;

  const dispatch = (name, details = {}) => {
    const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...details };
    for (const listener of listeners.get(name) ?? []) listener(event);
    return event;
  };

  class Element {
    attributes = new Map();
    dataset = {};
    classNames = new Set();
    style = {};
    children = [];
    parentElement = null;
    hidden = false;
    inert = false;
    disabled = false;
    textContent = '';
    listeners = new Map();
    isConnected = true;
    get classList() {
      return {
        add: (...names) => names.forEach((name) => this.classNames.add(name)),
        remove: (...names) => names.forEach((name) => this.classNames.delete(name)),
        contains: (name) => this.classNames.has(name),
        replace: (before, after) => { if (this.classNames.delete(before)) { this.classNames.add(after); return true; } return false; },
      };
    }
    setAttribute(name, value) {
      this.attributes.set(name, String(value));
      if (name === 'class') this.classNames = new Set(String(value).split(/\s+/));
      if (name === 'id') this.id = String(value);
      if (name === 'hidden') this.hidden = true;
      if (name === 'tabindex') this.tabIndex = Number(value);
      if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = String(value);
    }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    hasAttribute(name) { return this.attributes.has(name); }
    removeAttribute(name) { this.attributes.delete(name); if (name === 'hidden') this.hidden = false; }
    append(...elements) {
      for (const element of elements) {
        if (element.parentElement) element.parentElement.children = element.parentElement.children.filter((child) => child !== element);
        element.parentElement = this;
        this.children.push(element);
      }
    }
    contains(element) { return element === this || this.children.some((child) => child.contains(element)); }
    matches(selector) {
      if (selector === 'video' || selector === 'button') return this.tagName === selector.toUpperCase();
      if (selector.startsWith('[')) return this.hasAttribute(selector.slice(1, -1));
      return false;
    }
    closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) ?? null; }
    querySelector(selector) { return this.children.find((child) => child.matches(selector)) ?? this.children.map((child) => child.querySelector(selector)).find(Boolean) ?? null; }
    querySelectorAll() { return [closeButton, video].filter((element) => this.contains(element) && !element.hidden && !element.disabled); }
    addEventListener(name, callback) { const callbacks = this.listeners.get(name) ?? []; callbacks.push(callback); this.listeners.set(name, callbacks); }
    focus(options) { document.activeElement = this; this.focusOptions = options; dispatch('focusin', { target: this }); }
    getBoundingClientRect() { return { width: 420, height: 600 }; }
    getClientRects() { return [{ width: 420, height: 600 }]; }
  }

  function fromMarkup(marker, fallbackTag = 'div') {
    const match = [...source.slice(0, videoScript.index).matchAll(/<([a-z][\w-]*)\b([^>]*?)>/gi)]
      .find((candidate) => new RegExp(`(?:^|\\s)${marker}(?:\\s|=|$)`).test(candidate[2]));
    assert.ok(match, `${marker} must exist in the production template`);
    const element = new Element();
    element.tagName = (match?.[1] ?? fallbackTag).toUpperCase();
    for (const attribute of match[2].matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\{[^}]*\})))?/g)) {
      element.setAttribute(attribute[1], attribute[2] ?? attribute[3] ?? attribute[4] ?? '');
    }
    return element;
  }

  const modal = fromMarkup('data-video-modal');
  const scrim = fromMarkup('data-video-scrim');
  const panel = fromMarkup('data-video-panel');
  const title = fromMarkup('data-video-modal-title');
  const closeButton = fromMarkup('data-video-close', 'button');
  const video = new Element();
  video.tagName = 'VIDEO';
  const videoTag = source.slice(0, videoScript.index).match(/<video\b([^>]*)>/)?.[1] ?? '';
  if (/\bcontrols\b/.test(videoTag)) video.setAttribute('controls', '');
  const tabIndex = videoTag.match(/tabindex="([^"]*)"/)?.[1];
  if (tabIndex !== undefined) video.setAttribute('tabindex', tabIndex);
  video.playCalls = 0;
  video.pauseCalls = 0;
  video.loadCalls = 0;
  video.paused = true;
  video.currentTime = 0;
  video.play = () => { video.playCalls++; video.paused = false; return Promise.resolve(); };
  video.pause = () => { video.pauseCalls++; video.paused = true; };
  video.load = () => { video.loadCalls++; };
  const background = new Element();
  background.setAttribute('data-page-background', '');
  const outside = new Element();
  outside.tagName = 'A';
  const triggers = ['interior', 'dining'].map((kind) => {
    const trigger = new Element();
    trigger.tagName = 'BUTTON';
    trigger.setAttribute('data-video-open', '');
    trigger.dataset = {
      videoSrc: `/videos/yu-sauna-${kind}.mp4`,
      videoPoster: `/videos/yu-sauna-${kind}-poster.jpg`,
      videoTitle: `${kind === 'interior' ? '館內實拍' : '餐飲實拍'} · 八湯御桑拿`,
    };
    return trigger;
  });
  panel.append(title, closeButton, video);
  modal.append(scrim, panel);
  background.append(...triggers, modal);
  const body = new Element();
  body.style.overflow = 'clip';
  body.append(background, outside);
  document = {
    activeElement: triggers[0],
    body,
    querySelector: (selector) => ({ '[data-video-modal]': modal, '[data-page-background]': background })[selector] ?? body.querySelector(selector),
    querySelectorAll: (selector) => selector === '[data-video-open]' ? triggers : [],
    getElementById: (id) => [modal, panel, title, closeButton, video].find((element) => element.id === id) ?? null,
    addEventListener: (name, callback) => { const callbacks = listeners.get(name) ?? []; callbacks.push(callback); listeners.set(name, callbacks); },
  };
  const requestAnimationFrame = (callback) => { const id = nextId++; frames.set(id, callback); return id; };
  const cancelAnimationFrame = (id) => frames.delete(id);
  const setTimeout = (callback) => { const id = nextId++; timers.set(id, callback); return id; };
  const clearTimeout = (id) => timers.delete(id);
  const window = { setTimeout, clearTimeout, requestAnimationFrame, cancelAnimationFrame, scrollY: 900, scrollTo: (value) => scrollCalls.push(value) };
  vm.runInNewContext(script, { document, window, HTMLElement: Element, HTMLVideoElement: Element, requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout });

  const click = (target) => {
    for (const listener of target.listeners.get('click') ?? []) listener({ target, preventDefault() {} });
    return dispatch('click', { target });
  };
  const key = (key, shiftKey = false) => {
    const event = dispatch('keydown', { key, shiftKey, target: document.activeElement });
    // Simulate the browser's next Tab stop at the modal boundary. A production
    // handler must prevent this move, or recover focus through focusin.
    if (key === 'Tab' && !event.defaultPrevented) {
      if (document.activeElement === closeButton) (shiftKey ? outside : video).focus();
      else if (document.activeElement === video) (shiftKey ? closeButton : outside).focus();
    }
    return event;
  };
  const flush = (queue) => { const pending = [...queue.entries()]; queue.clear(); for (const [, callback] of pending) callback(); };
  return { modal, scrim, panel, title, closeButton, video, background, outside, triggers, document, click, key,
    flushFrames: () => flush(frames), flushTimers: () => flush(timers), frames, timers, scrollCalls };
}

for (const index of [0, 1]) {
  test(`${index === 0 ? 'interior' : 'dining'} video loads only after its card is activated`, () => {
    const h = harness();
    assert.equal(h.video.getAttribute('src'), null);
    assert.equal(h.video.playCalls, 0);
    h.click(h.triggers[index]);
    h.flushFrames();
    assert.equal(h.video.getAttribute('src'), h.triggers[index].dataset.videoSrc);
    assert.equal(h.video.getAttribute('poster'), h.triggers[index].dataset.videoPoster);
    assert.equal(h.video.playCalls, 1);
    assert.equal(h.title.textContent, h.triggers[index].dataset.videoTitle);
    assert.equal(h.modal.getAttribute('aria-hidden'), 'false');
    assert.equal(h.modal.parentElement, h.document.body, 'dialog must be outside its inert background');
    assert.equal(h.background.inert, true);
    assert.equal(h.document.body.style.overflow, 'hidden');
    assert.equal(h.document.activeElement, h.closeButton);
  });
}

for (const closeBy of ['button', 'escape', 'scrim']) {
  test(`${closeBy} close stops and releases the media and restores page focus`, () => {
    const h = harness();
    h.click(h.triggers[1]);
    h.flushFrames();
    if (closeBy === 'button') h.click(h.closeButton);
    if (closeBy === 'escape') h.key('Escape');
    if (closeBy === 'scrim') h.click(h.scrim);
    h.flushTimers();
    assert.equal(h.video.paused, true);
    assert.ok(h.video.pauseCalls >= 1);
    assert.equal(h.video.getAttribute('src'), null, 'closing must detach the source to stop hidden buffering');
    assert.ok(h.video.loadCalls >= 1, 'reload the empty media element to release the previous resource');
    assert.equal(h.modal.getAttribute('aria-hidden'), 'true');
    assert.equal(h.background.inert, false);
    assert.equal(h.document.body.style.overflow, 'clip');
    assert.equal(h.document.activeElement, h.triggers[1]);
    assert.equal(h.triggers[1].focusOptions.preventScroll, true);
  });
}

test('pending opening focus cannot focus a video dialog that has already closed', () => {
  const h = harness();
  h.click(h.triggers[0]);
  h.key('Escape');
  h.flushFrames();
  h.flushTimers();
  assert.equal(h.modal.getAttribute('aria-hidden'), 'true');
  assert.equal(h.document.activeElement, h.triggers[0], 'stale animation-frame callback must not steal restored focus');
});

test('quick reopen uses the new card and cannot be hidden or defocused by a prior close', () => {
  const h = harness();
  h.click(h.triggers[0]);
  h.flushFrames();
  h.key('Escape');
  h.click(h.triggers[1]);
  h.flushFrames();
  h.flushTimers();
  assert.equal(h.modal.getAttribute('aria-hidden'), 'false');
  assert.equal(h.modal.classList.contains('invisible'), false);
  assert.equal(h.modal.classList.contains('pointer-events-none'), false);
  assert.equal(h.video.getAttribute('src'), h.triggers[1].dataset.videoSrc);
  assert.equal(h.title.textContent, h.triggers[1].dataset.videoTitle);
  assert.equal(h.document.activeElement, h.closeButton);
  assert.equal(h.document.body.style.overflow, 'hidden');
  h.key('Escape');
  assert.equal(h.document.body.style.overflow, 'clip', 'reopening must not replace the original body state with hidden');
  assert.equal(h.document.activeElement, h.triggers[1]);
});

test('Shift+Tab wraps from Close without canceling native player Tab navigation', () => {
  const h = harness();
  h.click(h.triggers[0]);
  h.flushFrames();
  const intoPlayer = h.key('Tab');
  assert.equal(intoPlayer.defaultPrevented, false, 'normal Tab must be able to enter native video controls');
  assert.equal(h.document.activeElement, h.video, 'normal forward Tab reaches the player');
  const leavingPlayer = h.key('Tab');
  assert.equal(leavingPlayer.defaultPrevented, false, 'do not intercept Tab while native controls retain video as activeElement');
  assert.equal(h.document.activeElement, h.closeButton, 'focus leaving the final native control is recovered inside the dialog');
  h.key('Tab', true);
  assert.equal(h.document.activeElement, h.video, 'reverse Tab from Close wraps to the player');
});

test('external focus is recovered while open but allowed again after closing', () => {
  const h = harness();
  h.click(h.triggers[0]);
  h.flushFrames();
  h.outside.focus();
  assert.equal(h.panel.contains(h.document.activeElement), true, 'focus must not escape to controls outside the active dialog');
  h.key('Escape');
  h.outside.focus();
  assert.equal(h.document.activeElement, h.outside);
});

test('dialog accessible name resolves to the current video title for both cards', () => {
  const h = harness();
  for (const trigger of h.triggers) {
    h.click(trigger);
    const titleId = h.panel.getAttribute('aria-labelledby');
    assert.ok(titleId, 'dialog must be labelled by its changing visible title');
    const label = h.document.getElementById(titleId);
    assert.equal(label, h.title, 'aria-labelledby must resolve to the actual title element');
    assert.equal(label.textContent, trigger.dataset.videoTitle);
    h.key('Escape');
  }
});
