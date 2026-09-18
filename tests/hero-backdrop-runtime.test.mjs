import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../src/components/Hero.astro", import.meta.url), "utf8");
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, "the tests must execute the real Hero rotation script");
const runtime = ts.transpileModule(script, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

class Element {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.attributes = new Map();
    this.listeners = new Map();
    const classes = new Set();
    this.classList = {
      contains: (name) => classes.has(name),
      remove: (name) => classes.delete(name),
      toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
    };
  }

  getAttribute(name) { return this.attributes.get(name) ?? null; }
  addEventListener(name, listener) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(listener);
  }
  removeEventListener(name, listener) { this.listeners.get(name)?.delete(listener); }
  dispatch(name) {
    for (const listener of [...(this.listeners.get(name) ?? [])]) listener({ target: this });
  }
}

class Image extends Element {
  constructor(index) {
    super(index ? { src: `/hero-${index}.webp`, srcset: `/hero-${index}-768.webp 768w` } : {});
    this.complete = index === 0;
    this.naturalWidth = index === 0 ? 1448 : 0;
    if (index === 0) this.attributes.set("src", "/hero-0.webp");
    this.decodeRequests = [];
  }

  get src() { return this.getAttribute("src"); }
  set src(value) {
    this.attributes.set("src", value);
    this.complete = false;
    this.naturalWidth = 0;
  }
  load() {
    this.complete = true;
    this.naturalWidth = 1448;
    this.dispatch("load");
  }
  fail() {
    this.complete = true;
    this.naturalWidth = 0;
    this.dispatch("error");
  }
  decode() {
    return new Promise((resolve, reject) => this.decodeRequests.push({ resolve, reject }));
  }
}

// Only the browser/network boundary is controlled: the source's timers,
// visibility checks, image selection and class changes all run unchanged.
function setup() {
  const hero = new Element();
  const images = [0, 1, 2].map((index) => new Image(index));
  const backdrops = images.map((image) => {
    const backdrop = new Element();
    backdrop.querySelector = () => image;
    return backdrop;
  });
  const venueViewport = new Element({ heroVenueGroups: '["First", "Second"]' });
  const venueText = new Element();
  const document = new Element();
  document.visibilityState = "visible";
  document.querySelector = (selector) => ({
    "[data-hero-motion]": hero,
    "[data-hero-venues]": venueViewport,
    "[data-hero-venue-text]": venueText,
  })[selector];
  document.querySelectorAll = () => backdrops;
  const media = new Element();
  media.matches = false;
  let observer;
  const timers = new Map();
  let nextId = 0;
  let now = 0;
  const setTimeout = (callback, delay) => {
    const id = ++nextId;
    timers.set(id, { callback, at: now + delay });
    return id;
  };
  const window = {
    matchMedia: () => media,
    setTimeout,
    clearTimeout: (id) => timers.delete(id),
    requestAnimationFrame: (callback) => setTimeout(callback, 16),
    cancelAnimationFrame: (id) => timers.delete(id),
    IntersectionObserver: class {
      constructor(callback) { observer = callback; }
      observe() {}
    },
  };
  vm.runInNewContext(runtime, { document, window, IntersectionObserver: window.IntersectionObserver });
  const flush = () => new Promise((resolve) => setImmediate(resolve));
  return {
    images,
    active: () => backdrops.flatMap((backdrop, index) => backdrop.classList.contains("is-active") ? [index] : []),
    flush,
    async advanceTo(target) {
      while (true) {
        const due = [...timers.entries()].filter(([, timer]) => timer.at <= target)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        timers.delete(due[0]);
        now = due[1].at;
        due[1].callback();
        await flush();
      }
      now = target;
      await flush();
    },
    pause(reason, paused) {
      if (reason === "hidden") {
        document.visibilityState = paused ? "hidden" : "visible";
        document.dispatch("visibilitychange");
      } else if (reason === "reduced") {
        media.matches = paused;
        media.dispatch("change");
      } else {
        observer([{ isIntersecting: !paused }]);
      }
    },
  };
}

async function decodeLoaded(image, state) {
  image.load();
  await state.flush();
  assert.equal(image.decodeRequests.length, 1, "loaded images must be decoded before becoming active");
  image.decodeRequests[0].resolve();
  await state.flush();
}

test("hero keeps the current image until a slow next image has loaded and decoded", async () => {
  const state = setup();
  await state.advanceTo(4000);
  assert.deepEqual(state.active(), [0], "an unloaded image replaced the usable background");
  state.images[1].load();
  await state.flush();
  assert.deepEqual(state.active(), [0], "an undecoded image replaced the usable background");
  await state.advanceTo(4500);
  state.images[1].decodeRequests[0].resolve();
  await state.flush();
  assert.deepEqual(state.active(), [1]);
});

test("hero preloads only the next image at three seconds and switches no earlier than four", async () => {
  const state = setup();
  await state.advanceTo(2999);
  assert.equal(state.images[1].src, null);
  assert.equal(state.images[2].src, null);
  await state.advanceTo(3000);
  assert.equal(state.images[1].src, "/hero-1.webp");
  assert.equal(state.images[2].src, null);
  await decodeLoaded(state.images[1], state);
  await state.advanceTo(3999);
  assert.deepEqual(state.active(), [0]);
  await state.advanceTo(4000);
  assert.deepEqual(state.active(), [1]);
  await state.advanceTo(6999);
  assert.equal(state.images[2].src, null);
  await state.advanceTo(7000);
  await decodeLoaded(state.images[2], state);
  await state.advanceTo(8000);
  assert.deepEqual(state.active(), [2]);
});

for (const failure of ["network", "decode"]) {
  test(`hero retains the current image after ${failure} failure and proceeds to another image`, async () => {
    const state = setup();
    await state.advanceTo(3000);
    if (failure === "network") state.images[1].fail();
    else {
      state.images[1].load();
      await state.flush();
      assert.equal(state.images[1].decodeRequests.length, 1);
      state.images[1].decodeRequests[0].reject(new Error("corrupt image"));
    }
    await state.advanceTo(4000);
    assert.deepEqual(state.active(), [0], "a failed image replaced the usable background");
    await state.advanceTo(7000);
    assert.equal(state.images[2].src, "/hero-2.webp", "one broken image stalled the whole rotation");
    await decodeLoaded(state.images[2], state);
    await state.advanceTo(8000);
    assert.deepEqual(state.active(), [2]);
    await state.advanceTo(11000);
    assert.equal(state.images[0].decodeRequests.length, 1, "the cached first image must also be decoded");
    state.images[0].decodeRequests[0].resolve();
    await state.advanceTo(12000);
    assert.deepEqual(state.active(), [0]);
    await state.advanceTo(16000);
    assert.deepEqual(state.active(), [2], "a later cycle retried the permanently failed image");
  });
}

for (const reason of ["hidden", "reduced", "offscreen"]) {
  for (const pendingStage of ["load", "decode"]) {
    for (const quickResume of [false, true]) {
      test(`hero ignores stale ${pendingStage} while ${reason}, including quick resume=${quickResume}`, async () => {
        const state = setup();
        await state.advanceTo(3000);
        if (pendingStage === "decode") state.images[1].load();
        await state.advanceTo(4000);
        state.pause(reason, true);
        await state.advanceTo(4500);
        if (quickResume) state.pause(reason, false);
        if (pendingStage === "load") state.images[1].load();
        await state.flush();
        assert.equal(state.images[1].decodeRequests.length, 1);
        state.images[1].decodeRequests[0].resolve();
        await state.flush();
        assert.deepEqual(state.active(), [0], "stale loading changed the active backdrop");
        if (!quickResume) state.pause(reason, false);
        await state.advanceTo(8499);
        assert.deepEqual(state.active(), [0], "the resumed four-second interval was bypassed");
        await state.advanceTo(8500);
        assert.deepEqual(state.active(), [1]);
        await state.advanceTo(11499);
        assert.equal(state.images[2].src, null, "a stale callback created a duplicate preload queue");
        await state.advanceTo(11500);
        await decodeLoaded(state.images[2], state);
        await state.advanceTo(12500);
        assert.deepEqual(state.active(), [2]);
      });
    }
  }
}
