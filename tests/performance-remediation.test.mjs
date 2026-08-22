import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const readPage = (...segments) =>
  readFile(path.join(distRoot, ...segments, "index.html"), "utf8");

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];

const attr = (tag, name) =>
  tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "i"))?.[1];

const localCandidates = (tag) => {
  const value = attr(tag, "srcset") ?? "";
  return value
    .split(",")
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter((candidate) => candidate.startsWith("/"));
};

const assertCandidatesExist = async (tag, label) => {
  const candidates = localCandidates(tag);
  assert.ok(candidates.length >= 2, `${label} needs at least two real responsive candidates`);
  for (const candidate of candidates) {
    await access(path.join(projectRoot, "public", candidate));
  }
};

const heroScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/components/Hero.astro"), "utf8");
  const script = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
  assert.ok(script, "Hero must ship its real rotation script");
  return script;
};

class FakeElement {
  constructor(dataset = {}) {
    this.attributes = new Map();
    this.dataset = dataset;
    this.style = {};
    this.listeners = new Map();
    const classes = new Set();
    this.classList = {
      toggle: (name, force) => {
        const enabled = force ?? !classes.has(name);
        if (enabled) classes.add(name);
        else classes.delete(name);
      },
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  toggleAttribute(name, force) {
    if (force) this.setAttribute(name, "");
    else this.attributes.delete(name);
  }

  addEventListener(name, listener) {
    this.listeners.set(name, listener);
  }
}

test("localized pages use locale-aware system stacks without third-party font requests", async () => {
  const expectedStackMarker = {
    en: "-apple-system",
    "zh-TW": "PingFang TC",
    "zh-CN": "PingFang SC",
    ja: "Hiragino Kaku Gothic ProN",
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    assert.doesNotMatch(html, /fonts\.(?:googleapis|gstatic)\.com/i, `${locale} still requests Google Fonts`);
    const htmlTag = tags(html, "html")[0] ?? "";
    assert.ok(
      htmlTag.includes(expectedStackMarker[locale]),
      `${locale} does not expose its locale-aware system font stack`,
    );
  }
});

test("analytics waits for idle or interaction and initializes each Google tag exactly once", async () => {
  const html = await readPage("en");
  assert.doesNotMatch(html, /<script\b[^>]*src="https:\/\/www\.googletagmanager\.com/i);

  const loader = [...html.matchAll(/<script\b[^>]*data-analytics-loader[^>]*>([\s\S]*?)<\/script>/g)][0]?.[1];
  assert.ok(loader, "production pages must include the deferred analytics loader");

  const listeners = new Map();
  const idleCallbacks = [];
  const appended = [];
  const document = {
    createElement: () => ({}),
    head: { append: (node) => appended.push(node) },
  };
  const window = {
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener() {},
    requestIdleCallback: (callback) => idleCallbacks.push(callback),
    setTimeout: (callback) => idleCallbacks.push(callback),
  };
  window.window = window;

  vm.runInNewContext(loader, { document, window });
  assert.equal(appended.length, 0, "analytics loaded before idle or interaction");
  assert.equal(window.dataLayer, undefined, "analytics initialized before idle or interaction");

  listeners.get("pointerdown")?.();
  idleCallbacks.forEach((callback) => callback());
  listeners.get("keydown")?.();

  assert.equal(appended.length, 1, "the Google tag script must be appended exactly once");
  assert.equal(appended[0].src, "https://www.googletagmanager.com/gtag/js?id=GT-TXHFV3C5");
  const configs = window.dataLayer.filter((entry) => entry[0] === "config");
  assert.deepEqual(
    Array.from(configs, (entry) => entry[1]),
    ["GT-TXHFV3C5", "AW-18058018185"],
  );
});

test("the 404 keeps shared branding but omits analytics and remote font payloads", async () => {
  const html = await readFile(path.join(distRoot, "404.html"), "utf8");

  assert.match(html, /data-testid="not-found"/);
  assert.match(html, /data-404-brand/);
  assert.doesNotMatch(html, /data-analytics-loader|googletagmanager\.com|fonts\.google/i);
});

test("hero initially fetches only its active source and preloads the next source shortly before rotation", async () => {
  const html = await readPage("en");
  const backdropBlocks = [
    ...html.matchAll(/<div\b(?=[^>]*data-hero-backdrop)[^>]*>\s*(?:<picture>)?\s*<img\b[^>]*>/g),
  ].map((match) => match[0]);
  assert.equal(backdropBlocks.length, 3);

  const activeImage = backdropBlocks.find((block) => block.includes('aria-hidden="false"')) ?? "";
  const hiddenImages = backdropBlocks.filter((block) => block.includes('aria-hidden="true"'));
  assert.match(activeImage, /\ssrc="\/covers\//);
  assert.match(activeImage, /loading="eager"/);
  assert.match(activeImage, /fetchpriority="high"/);
  await assertCandidatesExist(activeImage, "active hero image");

  assert.equal(hiddenImages.length, 2);
  hiddenImages.forEach((block) => {
    assert.doesNotMatch(block, /\ssrc="/i, "hidden hero image has a fetchable src");
    assert.match(block, /data-src="\/covers\//);
    assert.match(block, /loading="lazy"/);
  });

  const hero = new FakeElement();
  const toggle = new FakeElement();
  const icon = new FakeElement();
  const images = [
    new FakeElement({}),
    new FakeElement({ src: "/covers/next.jpg", srcset: "/covers/next-960.webp 960w" }),
    new FakeElement({ src: "/covers/third.webp", srcset: "/covers/third-960.webp 960w" }),
  ];
  images[0].src = "/covers/active.jpg";
  const backdrops = images.map((image) => {
    const backdrop = new FakeElement();
    backdrop.querySelector = () => image;
    return backdrop;
  });
  const venueGroups = [new FakeElement(), new FakeElement()];
  const timers = new Map();
  let timerId = 0;
  let now = 0;
  const document = {
    visibilityState: "visible",
    querySelector: (selector) => ({
      "[data-hero-motion]": hero,
      "[data-hero-motion-toggle]": toggle,
      "[data-hero-motion-icon]": icon,
    })[selector] ?? null,
    querySelectorAll: (selector) => ({
      "[data-hero-backdrop]": backdrops,
      "[data-hero-venue-group]": venueGroups,
    })[selector] ?? [],
    addEventListener() {},
  };
  const window = {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    setTimeout: (callback, delay) => {
      const id = ++timerId;
      timers.set(id, { callback, at: now + delay });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
  };
  const advanceTo = (target) => {
    while (true) {
      const due = [...timers.entries()]
        .filter(([, timer]) => timer.at <= target)
        .sort((left, right) => left[1].at - right[1].at)[0];
      if (!due) break;
      timers.delete(due[0]);
      now = due[1].at;
      due[1].callback();
    }
    now = target;
  };
  class FakeObserver {
    observe() {}
  }

  vm.runInNewContext(await heroScript(), { document, window, IntersectionObserver: FakeObserver });
  advanceTo(4999);
  assert.equal(images[1].src, undefined, "next hero source loaded too early");
  advanceTo(5000);
  assert.equal(images[1].src, "/covers/next.jpg", "next hero source was not preloaded near rotation");
  assert.equal(backdrops[1].getAttribute("aria-hidden"), "true", "preload exposed the next slide early");
  advanceTo(6000);
  assert.equal(backdrops[1].getAttribute("aria-hidden"), "false", "preloaded slide did not become active");
});

test("viewport-role images expose real responsive candidates and intrinsic dimensions", async () => {
  const home = await readPage("en");
  const cards = tags(home, "img").filter((tag) => tag.includes("Macau premium sauna venue"));
  assert.equal(cards.length, 14);
  for (const [index, card] of cards.entries()) {
    assert.equal(attr(card, "width"), "800");
    assert.equal(attr(card, "height"), "800");
    assert.ok(attr(card, "sizes"), "spa card is missing responsive sizes");
    await assertCandidatesExist(card, `spa card ${index + 1}`);
    if (index === 0) {
      assert.equal(attr(card, "loading"), "eager");
      assert.equal(attr(card, "fetchpriority"), "high");
    } else {
      assert.equal(attr(card, "loading"), "lazy");
    }
  }

  const blog = await readPage("en", "blog", "macau-sauna-beginner-guide-2026");
  const cover = tags(blog, "img").find((tag) => tag.includes("01-macau-sauna-empire-lounge")) ?? "";
  assert.equal(attr(cover, "width"), "1280");
  assert.equal(attr(cover, "height"), "720");
  assert.equal(attr(cover, "loading"), "eager");
  assert.equal(attr(cover, "fetchpriority"), "high");
  assert.ok(attr(cover, "sizes"));
  await assertCandidatesExist(cover, "blog cover");

  const gallery = await readPage("en", "spa", "clube-rio");
  const thumbnails = tags(gallery, "img").filter((tag) => attr(tag, "src")?.includes("-thumb.webp"));
  assert.ok(thumbnails.length > 0, "representative venue has no gallery thumbnails");
  for (const thumbnail of thumbnails) {
    assert.equal(attr(thumbnail, "width"), "600");
    assert.equal(attr(thumbnail, "height"), "600");
    assert.equal(attr(thumbnail, "loading"), "lazy");
    assert.ok(attr(thumbnail, "sizes"));
  }
});

test("Cloudflare headers secure responses and immutably cache only fingerprinted or versioned assets", async () => {
  const [headers, gitignore] = await Promise.all([
    readFile(path.join(projectRoot, "public", "_headers"), "utf8"),
    readFile(path.join(projectRoot, ".gitignore"), "utf8"),
  ]);

  assert.match(headers, /^\/\*$/m);
  assert.match(headers, /^\s+X-Content-Type-Options: nosniff$/m);
  assert.match(headers, /^\s+Referrer-Policy: strict-origin-when-cross-origin$/m);
  assert.match(headers, /^\s+Permissions-Policy: .*camera=\(\).*microphone=\(\).*geolocation=\(\)/m);
  assert.match(headers, /^\/_astro\/\*$/m);
  assert.match(headers, /^\/media\/\*$/m);
  assert.equal((headers.match(/max-age=31536000, immutable/g) ?? []).length, 2);
  assert.doesNotMatch(headers, /Content-Security-Policy/i, "Task 5 must not ship a brittle CSP");
  assert.match(gitignore, /^\.seo-cache\/$/m);
});
