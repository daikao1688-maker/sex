import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const readHome = (locale) => readFile(path.join(distRoot, locale, "index.html"), "utf8");

const attr = (tag, name) =>
  tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "i"))?.[1];

const rgb = (hex) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const luminance = (color) => {
  const linear = color.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

const contrast = (foreground, background) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

const tagWith = (html, ...attributes) => {
  const match = (html.match(/<(?!style\b|script\b)[a-zA-Z][^>]*>/g) ?? []).find((tag) =>
    attributes.every((attribute) => tag.includes(attribute)),
  );
  assert.ok(match, `generated page is missing ${attributes.join(" and ")}`);
  return match;
};

const heroScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/components/Hero.astro"), "utf8");
  const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.at(-1)?.[1];
  assert.ok(script, "Hero must ship a motion-control script");
  return ts.transpileModule(script, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
};

const testimonialsScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/components/Testimonials.astro"), "utf8");
  const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.at(-1)?.[1];
  assert.ok(script, "Testimonials must ship a motion-control script");
  return ts.transpileModule(script, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
};

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.dataset = {};
    this.style = {};
    this.listeners = new Map();
    const classes = new Set();
    this.classList = {
      toggle: (name, force) => {
        const active = force ?? !classes.has(name);
        if (active) classes.add(name);
        else classes.delete(name);
        return active;
      },
      contains: (name) => classes.has(name),
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

test("every locale omits manual motion controls while keeping hidden testimonial duplicates", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const clones = html.match(/<blockquote\b[^>]*data-testimonial-clone[^>]*>/gi) ?? [];

    assert.doesNotMatch(html, /data-hero-motion-toggle/, `${locale} must not expose a hero pause button`);
    assert.doesNotMatch(
      html,
      /data-testimonial-motion-(?:toggle|icon)/,
      `${locale} must not expose a testimonial pause button`,
    );
    assert.ok(clones.length > 0, `${locale} carousel must mark repeated cards as clones`);
    clones.forEach((clone) => {
      assert.match(clone, /aria-hidden="true"/, `${locale} repeated testimonial must be hidden from assistive tech`);
    });
  }
});

test("every locale exposes a localized manual WeChat copy fallback", async () => {
  const labels = {
    en: "Automatic copy unavailable. Select and copy the WeChat ID manually.",
    "zh-TW": "自動複製無法使用，請選取並手動複製微信 ID。",
    "zh-CN": "自动复制无法使用，请选中并手动复制微信 ID。",
    ja: "自動コピーを利用できません。WeChat IDを選択して手動でコピーしてください。",
  };

  for (const locale of locales) {
    const html = await readHome(locale);
    const copyButton = tagWith(html, "data-copy-wechat");
    const fallbackField = tagWith(html, 'id="wechat-copy-fallback"');
    assert.equal(attr(copyButton, "data-manual-label"), labels[locale]);
    assert.equal(attr(fallbackField, "aria-label"), labels[locale]);
  }
});

test("translucent gold testimonial attribution meets AA on its card surface", async () => {
  const [html, styles] = await Promise.all([
    readHome("en"),
    readFile(path.join(projectRoot, "src/styles/global.css"), "utf8"),
  ]);
  const author = html.match(/<p\b[^>]*class="[^"]*text-gold\/\d+[^"]*"[^>]*>\s*— First-time guest<\/p>/)?.[0];
  assert.ok(author, "generated testimonial attribution is missing its translucent gold token");

  const opacity = Number(author.match(/text-gold\/(\d+)/)?.[1]) / 100;
  const gold = rgb(styles.match(/--color-gold:\s*(#[0-9a-f]{6})/i)?.[1] ?? "#000000");
  const surface = rgb(styles.match(/--color-surface:\s*(#[0-9a-f]{6})/i)?.[1] ?? "#ffffff");
  const composited = gold.map((channel, index) =>
    Math.round(channel * opacity + surface[index] * (1 - opacity)),
  );

  assert.ok(
    contrast(composited, surface) >= 4.5,
    `testimonial attribution contrast is ${contrast(composited, surface).toFixed(3)}:1`,
  );
});

test("testimonial motion runtime does not depend on a removed manual control", async () => {
  const script = await testimonialsScript();
  assert.doesNotMatch(script, /testimonial-motion-(?:toggle|icon)/);
  assert.doesNotMatch(script, /manuallyPaused/);
});

test("every locale keeps decorative hero backdrops hidden while motion state remains observable", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const testimonialTrack = tagWith(html, 'id="testimonial-track"');
    const hero = tagWith(html, "data-hero-motion");
    const backdropBlocks = [
      ...html.matchAll(/<div\b(?=[^>]*data-hero-backdrop)[^>]*>\s*<img\b[^>]*>/g),
    ].map((match) => match[0]);
    const activeVenue = tagWith(html, "data-hero-venue-group", 'aria-hidden="false"');
    const inactiveVenue = tagWith(html, "data-hero-venue-group", 'aria-hidden="true"');

    assert.match(testimonialTrack, /data-motion-state="running"/, `${locale} testimonial region exposes its motion state`);
    assert.match(hero, /data-motion-state="running"/, `${locale} hero exposes its motion state`);
    assert.equal(backdropBlocks.length, 3, `${locale} must retain all visual Hero layers`);
    assert.ok(backdropBlocks.some((block) => /\bis-active\b/.test(block)), `${locale} needs one visual active layer`);
    for (const block of backdropBlocks) {
      const wrapper = block.match(/^<div\b[^>]*>/)?.[0] ?? "";
      const image = block.match(/<img\b[^>]*>/)?.[0] ?? "";
      assert.equal(attr(wrapper, "aria-hidden"), "true", `${locale} decorative Hero layer entered the accessibility tree`);
      assert.equal(attr(image, "alt"), "", `${locale} decorative Hero image has a non-empty alt`);
      assert.doesNotMatch(image, /\bdata-alt=/, `${locale} decorative Hero image retains a rotating SEO alt`);
    }
    assert.doesNotMatch(
      html,
      /Macau sauna concierge|luxury chauffeur pickup/i,
      `${locale} exposes an English backdrop description`,
    );
    assert.match(activeVenue, /opacity:1/, `${locale} active hero venue text must be exposed`);
    assert.match(inactiveVenue, /opacity:0/, `${locale} inactive hero venue text must be hidden`);
  }
});

test("every locale renders AA action colors and 44-pixel control classes", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const whatsapp = tagWith(html, "data-qm-whatsapp");
    const telegram = tagWith(html, "data-qm-telegram");
    const filter = tagWith(html, 'data-bucket="all"');
    const contactCard = tagWith(html, "data-contact-channel");
    const quickMatchOption = tagWith(html, "data-qm-option");

    assert.match(whatsapp, /text-\[#071f12\]/, `${locale} WhatsApp action needs a dark AA foreground`);
    assert.match(telegram, /text-\[#061923\]/, `${locale} Telegram action needs a dark AA foreground`);
    assert.match(filter, /min-h-11/, `${locale} spa filter needs a 44px target`);
    assert.match(contactCard, /min-h-11/, `${locale} contact channel needs a 44px target`);
    assert.match(quickMatchOption, /min-h-11/, `${locale} quick-match choices need 44px targets`);
  }
});

test("hero keeps its background cadence when venue text rotates first", async () => {
  const hero = new FakeElement();
  const backdrops = [new FakeElement(), new FakeElement(), new FakeElement()];
  const backdropImages = backdrops.map((backdrop, index) => {
    const image = new FakeElement();
    image.alt = "";
    image.dataset.alt = `English SEO phrase ${index + 1}`;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.querySelector = () => image;
    return image;
  });
  const venues = [new FakeElement(), new FakeElement()];
  const timers = new Map();
  let nextTimer = 1;
  let now = 0;

  const document = {
    visibilityState: "visible",
    querySelector: (selector) =>
      ({
        "[data-hero-motion]": hero,
      })[selector] ?? null,
    querySelectorAll: (selector) =>
      ({
        "[data-hero-backdrop]": backdrops,
        "[data-hero-venue-group]": venues,
      })[selector] ?? [],
    addEventListener() {},
  };
  const media = { matches: false, addEventListener() {} };
  class FakeObserver {
    observe() {}
  }
  const window = {
    matchMedia: () => media,
    setTimeout: (callback, delay) => {
      const id = nextTimer++;
      timers.set(id, { callback, at: now + delay });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
  };
  const advanceTo = (target) => {
    while (true) {
      const due = [...timers.entries()]
        .filter(([, timer]) => timer.at <= target)
        .sort((a, b) => a[1].at - b[1].at)[0];
      if (!due) break;
      const [id, timer] = due;
      timers.delete(id);
      now = timer.at;
      timer.callback();
    }
    now = target;
  };

  vm.runInNewContext(await heroScript(), { document, window, IntersectionObserver: FakeObserver });
  advanceTo(6000);

  assert.equal(backdrops[1].classList.contains("is-active"), true, "the visual backdrop cadence must still rotate");
  backdrops.forEach((backdrop) =>
    assert.equal(backdrop.getAttribute("aria-hidden"), "true", "visual rotation must not expose a decorative layer"),
  );
  backdropImages.forEach((image) =>
    assert.equal(image.alt, "", "visual rotation must not assign an English SEO alt"),
  );
  assert.equal(venues[1].getAttribute("aria-hidden"), "false", "venue rotation must remain synchronized with its visible state");
});

test("hero motion remains functional when IntersectionObserver is unavailable", async () => {
  const hero = new FakeElement();
  const backdrops = [new FakeElement(), new FakeElement()];
  const venueGroups = [new FakeElement(), new FakeElement()];
  let scheduled = 0;

  backdrops.forEach((backdrop) => {
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.querySelector = () => null;
  });
  const document = {
    visibilityState: "visible",
    querySelector: (selector) =>
      ({
        "[data-hero-motion]": hero,
      })[selector] ?? null,
    querySelectorAll: (selector) =>
      ({
        "[data-hero-backdrop]": backdrops,
        "[data-hero-venue-group]": venueGroups,
      })[selector] ?? [],
    addEventListener() {},
  };
  const window = {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    setTimeout: () => ++scheduled,
    clearTimeout() {},
  };

  vm.runInNewContext(await heroScript(), { document, window });

  assert.equal(hero.dataset.motionState, "running", "unsupported observation must not abort hero setup");
  assert.equal(backdrops[0].getAttribute("aria-hidden"), "true", "fallback motion must keep ambience decorative");
  assert.equal(venueGroups[0].getAttribute("aria-hidden"), "false", "the active venue text must stay exposed");
  assert.ok(scheduled >= 3, "fallback mode must continue the image and venue cadence");
});

test("reduced motion keeps the testimonial region horizontally reachable", async () => {
  const styles = await readFile(path.join(projectRoot, "src/styles/global.css"), "utf8");
  const reducedMotionRules = styles.slice(styles.indexOf("@media (prefers-reduced-motion: reduce)"));

  assert.match(
    reducedMotionRules,
    /\.testimonial-viewport\s*\{\s*overflow-x:\s*auto;/,
    "reduced-motion visitors must be able to scroll the primary testimonial cards",
  );
  assert.match(
    reducedMotionRules,
    /\.testimonial-track\s+\[data-testimonial-clone\]\s*\{\s*display:\s*none;/,
    "reduced-motion visitors must not scroll through redundant visual copies",
  );
});

test("testimonial motion stays inactive when viewport observation is unavailable", async () => {
  const track = new FakeElement();
  const region = new FakeElement();
  track.dataset.count = "2";
  track.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 296 }, { offsetLeft: 592 }];
  region.contains = () => false;
  let animationFrames = 0;

  const document = {
    visibilityState: "visible",
    getElementById: (id) => (id === "testimonial-track" ? track : null),
    querySelector: (selector) =>
      ({
        "[data-testimonial-motion-region]": region,
      })[selector] ?? null,
    addEventListener() {},
  };
  const window = {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    cancelAnimationFrame() {},
    requestAnimationFrame: () => ++animationFrames,
  };

  vm.runInNewContext(await testimonialsScript(), { document, window });

  assert.equal(track.dataset.motionState, "paused", "without observation, carousel visibility is unknown and must remain paused");
  assert.equal(animationFrames, 0, "without observation, carousel must not schedule an animation frame");
});

test("testimonial focus pause covers the testimonial track", async () => {
  const track = new FakeElement();
  const region = new FakeElement();
  const outside = new FakeElement();
  track.dataset.count = "2";
  track.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 296 }, { offsetLeft: 592 }];
  region.contains = (node) => node === track;
  let observer;
  let animationFrames = 0;

  const document = {
    visibilityState: "visible",
    getElementById: (id) => (id === "testimonial-track" ? track : null),
    querySelector: (selector) =>
      ({
        "[data-testimonial-motion-region]": region,
      })[selector] ?? null,
    addEventListener() {},
  };
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      observer = this;
    }

    observe() {}
  }
  const window = {
    IntersectionObserver: FakeObserver,
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    cancelAnimationFrame() {},
    requestAnimationFrame: () => ++animationFrames,
  };

  vm.runInNewContext(await testimonialsScript(), { document, window, IntersectionObserver: FakeObserver });
  observer.callback([{ isIntersecting: true }]);
  assert.equal(track.dataset.motionState, "running");
  assert.ok(animationFrames > 0);

  region.listeners.get("focusin")({ target: track });
  assert.equal(track.dataset.motionState, "paused", "focusing the testimonial region must pause its motion");

  region.listeners.get("focusout")({ relatedTarget: outside });
  assert.equal(track.dataset.motionState, "running", "leaving the shared region must resume eligible motion");
});
