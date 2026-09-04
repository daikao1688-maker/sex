import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/SpaGallery.astro', import.meta.url), 'utf8');
const script = ts.transpileModule(source.match(/<script>([\s\S]*?)<\/script>/)[1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

// Run the shipped interaction script; only the browser DOM boundary is substituted.
function harness(count = 3) {
  const listeners = new Map();
  const scrollCalls = [];
  let document;
  class Element {
    dataset = {};
    hidden = false;
    disabled = false;
    attributes = new Map();
    listeners = new Map();
    classList = { replace() {} };
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    addEventListener(name, callback) { this.listeners.set(name, callback); }
    focus(options) { document.activeElement = this; this.focusOptions = options; }
    setPointerCapture() {}
    fire(name, details = {}) {
      const event = { target: this, preventDefault() { this.defaultPrevented = true; }, ...details };
      this.listeners.get(name)?.(event);
      return event;
    }
  }
  const lightbox = new Element();
  lightbox.hidden = true;
  const image = new Element();
  const caption = new Element();
  const close = new Element();
  const prev = new Element();
  const next = new Element();
  const counter = new Element();
  counter.dataset.countTemplate = 'Photo {current} of {total}';
  const background = new Element();
  const triggers = Array.from({ length: count }, (_, i) => {
    const trigger = new Element();
    trigger.dataset = { src: `/photo-${i + 1}.webp`, alt: `Photo ${i + 1}`, caption: `Caption ${i + 1}` };
    return trigger;
  });
  lightbox.querySelector = (selector) => ({
    '[data-gallery-image]': image, '[data-gallery-caption]': caption,
    '[data-gallery-close]': close, '[data-gallery-prev]': prev,
    '[data-gallery-next]': next, '[data-gallery-counter]': counter,
  })[selector] ?? null;
  lightbox.querySelectorAll = () => [close, caption, prev, next].filter(el => !el.hidden && !el.disabled);
  lightbox.contains = (el) => [lightbox, image, caption, close, prev, next, counter].includes(el);
  document = {
    activeElement: null,
    body: { style: { overflow: 'auto' }, append() {} },
    querySelector: (selector) => ({ '[data-gallery-lightbox]': lightbox, '[data-page-background]': background })[selector] ?? null,
    querySelectorAll: () => triggers,
    addEventListener: (name, callback) => listeners.set(name, callback),
  };
  const window = { scrollY: 2460, visualViewport: { scale: 1 }, scrollTo: (options) => scrollCalls.push(options) };
  vm.runInNewContext(script, { document, window, HTMLElement: Element, requestAnimationFrame: fn => fn() });
  const key = (key, shiftKey = false) => {
    const event = { key, shiftKey, preventDefault() { this.defaultPrevented = true; } };
    listeners.get('keydown')?.(event);
    return event;
  };
  const swipe = (dx, dy = 0, extras = {}) => {
    image.fire('pointerdown', { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: 200, clientY: 200, ...extras });
    image.fire('pointerup', { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: 200 + dx, clientY: 200 + dy, ...extras });
  };
  return { lightbox, image, caption, close, prev, next, counter, triggers, background, document, window, scrollCalls, key, swipe };
}

test('gallery navigation opens the selected photo and updates image, caption and count without closing', () => {
  const h = harness();
  h.triggers[1].fire('click');
  h.next.fire('click');
  assert.equal(h.image.src, '/photo-3.webp');
  assert.equal(h.image.alt, 'Photo 3');
  assert.equal(h.caption.textContent, 'Caption 3');
  assert.equal(h.counter.textContent, '3 / 3');
  assert.equal(h.counter.getAttribute('aria-label'), 'Photo 3 of 3');
  assert.equal(h.lightbox.hidden, false);
  assert.equal(h.background.inert, true);
  h.next.fire('click');
  assert.equal(h.image.src, '/photo-1.webp', 'next wraps from last to first');
  h.prev.fire('click');
  assert.equal(h.image.src, '/photo-3.webp', 'previous wraps from first to last');
});

test('gallery arrow keys change photos only while the lightbox is open', () => {
  const h = harness();
  h.triggers[0].fire('click');
  h.key('ArrowRight');
  assert.equal(h.image.src, '/photo-2.webp');
  h.key('ArrowLeft');
  assert.equal(h.image.src, '/photo-1.webp');
  h.key('Escape');
  assert.equal(h.key('ArrowRight').defaultPrevented, undefined);
  assert.equal(h.image.src, '/photo-1.webp');
});

test('horizontal touch swipes switch both directions while vertical scrolls, taps and mouse drags do not', () => {
  const h = harness();
  h.triggers[0].fire('click');
  h.swipe(-100, 5);
  assert.equal(h.image.src, '/photo-2.webp');
  h.swipe(100, 5);
  assert.equal(h.image.src, '/photo-1.webp');
  h.swipe(-20);
  h.swipe(-80, 150);
  h.swipe(-100, 0, { pointerType: 'mouse' });
  assert.equal(h.image.src, '/photo-1.webp');
  assert.equal(h.lightbox.hidden, false);
});

test('pinch zoom and canceled gestures never turn into an accidental photo change', () => {
  const h = harness();
  h.triggers[0].fire('click');
  h.window.visualViewport.scale = 2;
  h.swipe(-100);
  assert.equal(h.image.src, '/photo-1.webp');
  h.window.visualViewport.scale = 1;
  const start = { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: 200, clientY: 200 };
  h.image.fire('pointerdown', start);
  h.image.fire('pointerdown', { ...start, pointerId: 2, isPrimary: false });
  h.image.fire('pointerup', { ...start, clientX: 50 });
  assert.equal(h.image.src, '/photo-1.webp');
  h.image.fire('pointerdown', start);
  h.image.fire('pointercancel', start);
  h.image.fire('pointerup', { ...start, clientX: 50 });
  assert.equal(h.image.src, '/photo-1.webp');
});

test('Tab can reach navigation buttons but wraps at dialog boundaries', () => {
  const h = harness();
  h.triggers[0].fire('click');
  assert.equal(h.document.activeElement, h.close);
  assert.equal(h.key('Tab').defaultPrevented, undefined, 'normal Tab can advance from Close to Previous');
  h.document.activeElement = h.next;
  h.key('Tab');
  assert.equal(h.document.activeElement, h.close);
  h.key('Tab', true);
  assert.equal(h.document.activeElement, h.next);
});

test('all close paths restore the original scroll and opening thumbnail after navigating', () => {
  for (const closeBy of ['button', 'escape', 'backdrop']) {
    const h = harness();
    h.triggers[1].fire('click');
    h.next.fire('click');
    h.window.scrollY = 0;
    if (closeBy === 'button') h.close.fire('click');
    if (closeBy === 'escape') h.key('Escape');
    if (closeBy === 'backdrop') h.lightbox.fire('click');
    assert.equal(h.lightbox.hidden, true);
    assert.equal(h.background.inert, false);
    assert.equal(h.document.body.style.overflow, 'auto');
    assert.equal(h.document.activeElement, h.triggers[1]);
    assert.equal(h.triggers[1].focusOptions.preventScroll, true);
    assert.equal(h.scrollCalls.at(-1).top, 2460);
    h.triggers[0].fire('click');
    assert.equal(h.image.src, '/photo-1.webp', 'reopen starts at the clicked thumbnail, not stale index');
  }
});

test('single-photo galleries hide switching controls but keep the caption keyboard-scrollable', () => {
  const h = harness(1);
  h.triggers[0].fire('click');
  assert.equal(h.prev.hidden, true);
  assert.equal(h.next.hidden, true);
  h.key('ArrowRight');
  h.swipe(-100);
  assert.equal(h.image.src, '/photo-1.webp');
  assert.equal(h.counter.textContent, '1 / 1');
  assert.equal(h.key('Tab').defaultPrevented, undefined, 'Tab must reach the scrollable caption');
  h.document.activeElement = h.caption;
  h.key('Tab');
  assert.equal(h.document.activeElement, h.close);
  h.key('Tab', true);
  assert.equal(h.document.activeElement, h.caption);
});
