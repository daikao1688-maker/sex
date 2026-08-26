import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

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

const layoutMotionScript = async () => {
  const source = await readFile(path.join(projectRoot, "src/layouts/Layout.astro"), "utf8");
  const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.at(-1)?.[1];
  assert.ok(script, "Layout must ship a scroll-reveal script");
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
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
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

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  removeEventListener(name, listener) {
    if (this.listeners.get(name) === listener) this.listeners.delete(name);
  }
}

test("every locale provides a localized testimonial pause control while keeping hidden duplicates", async () => {
  const labels = {
    en: "Pause guest review motion",
    "zh-TW": "暫停客戶評價動效",
    "zh-CN": "暂停客户评价动效",
    ja: "お客様の声の動きを一時停止",
    ko: "고객 후기 모션 일시 정지",
  };

  for (const locale of locales) {
    const html = await readHome(locale);
    const clones = html.match(/<blockquote\b[^>]*data-testimonial-clone[^>]*>/gi) ?? [];
    const control = tagWith(html, "data-testimonial-motion-toggle");
    const viewport = tagWith(html, "data-testimonial-viewport");
    const track = tagWith(html, 'id="testimonial-track"');

    assert.doesNotMatch(html, /data-hero-motion-toggle/, `${locale} must not expose a hero pause button`);
    assert.equal(attr(viewport, "tabindex"), "0", `${locale} testimonial scroller must be keyboard reachable`);
    assert.equal(attr(viewport, "role"), "region", `${locale} testimonial scroller must expose a landmark role`);
    assert.ok(attr(viewport, "aria-label"), `${locale} testimonial scroller must have an accessible name`);
    assert.equal(attr(track, "role"), undefined, `${locale} non-focusable inner track must not own the region role`);
    assert.equal(attr(control, "aria-label"), labels[locale], `${locale} pause control needs its localized label`);
    assert.equal(attr(control, "aria-controls"), "testimonial-track", `${locale} pause control must name its target`);
    assert.equal(attr(control, "aria-pressed"), undefined, `${locale} action-label control must not mix in toggle semantics`);
    assert.match(control, /\shidden(?:\s|>)/, `${locale} pause control must stay hidden until autoplay is available`);
    assert.match(control, /min-h-11/, `${locale} pause control needs a 44px touch target`);
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
    ko: "자동 복사를 사용할 수 없습니다. WeChat ID를 선택해 직접 복사해 주세요.",
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

test("scroll reveal stays visible without JavaScript and only enables its hidden start state after supported setup", async () => {
  const styles = await readFile(path.join(projectRoot, "src/styles/global.css"), "utf8");
  const fade = styles.match(/\.fade-up\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const motionReady = styles.match(/\.motion-ready\s+\.fade-up\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(fade, /opacity:\s*0/, "no-JS content must not start transparent");
  assert.match(motionReady, /opacity:\s*0/, "only explicitly motion-ready documents may start a reveal hidden");

  const element = new FakeElement();
  const rootClasses = new Set();
  const document = {
    documentElement: { classList: { add: (name) => rootClasses.add(name), contains: (name) => rootClasses.has(name) } },
    querySelectorAll: () => [element],
  };

  vm.runInNewContext(await layoutMotionScript(), { document, window: {} });

  assert.equal(rootClasses.has("motion-ready"), false, "unsupported observers must not enable hidden reveal styles");
  assert.equal(element.classList.contains("in-view"), true, "unsupported observers must reveal every fade-up element");
});

test("scroll reveal opts in before body paint and fails open when observer setup throws", async () => {
  const source = await readFile(path.join(projectRoot, "src/layouts/Layout.astro"), "utf8");
  const head = source.slice(source.indexOf("<head>"), source.indexOf("</head>"));
  assert.match(head, /motion-ready/, "supported reveal motion must opt in from the document head");

  const element = new FakeElement();
  const rootClasses = new Set(["motion-ready"]);
  const document = {
    documentElement: {
      classList: {
        add: (name) => rootClasses.add(name),
        remove: (name) => rootClasses.delete(name),
        contains: (name) => rootClasses.has(name),
      },
    },
    querySelectorAll: () => [element],
  };
  class BrokenObserver {
    constructor() {
      throw new Error("observer setup failed");
    }
  }

  vm.runInNewContext(await layoutMotionScript(), {
    document,
    window: { IntersectionObserver: BrokenObserver },
  });

  assert.equal(rootClasses.has("motion-ready"), false, "failed setup must remove the hidden reveal state");
  assert.equal(element.classList.contains("in-view"), true, "failed setup must reveal every content block");
});

test("every locale keeps decorative hero backdrops hidden and renders one venue text surface", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const testimonialTrack = tagWith(html, 'id="testimonial-track"');
    const hero = tagWith(html, "data-hero-motion");
    const venueViewport = tagWith(html, "data-hero-venues");
    const venueTexts = html.match(/<span\b(?=[^>]*data-hero-venue-text)[^>]*>/g) ?? [];
    const backdropBlocks = [
      ...html.matchAll(/<div\b(?=[^>]*data-hero-backdrop)[^>]*>\s*<img\b[^>]*>/g),
    ].map((match) => match[0]);

    assert.match(testimonialTrack, /data-motion-state="paused"/, `${locale} testimonial region starts truthfully paused`);
    assert.match(hero, /data-motion-state="running"/, `${locale} hero exposes its motion state`);
    assert.ok(attr(venueViewport, "data-hero-venue-groups"), `${locale} must serialize the venue rotation copy`);
    assert.equal(venueTexts.length, 1, `${locale} must render exactly one venue text surface`);
    assert.doesNotMatch(html, /data-hero-venue-group(?:[=>\s])/, `${locale} must not stack venue copy layers`);
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
  }
});

test("every locale renders AA action colors and 44-pixel control classes", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const whatsapp = tagWith(html, "data-qm-whatsapp");
    const telegram = tagWith(html, "data-qm-telegram");
    const filter = tagWith(html, 'data-bucket="all"');
    const contactCard = html.match(/<[^>]*\bdata-contact-channel(?:\s|=|>)[^>]*>/i)?.[0];
    const quickMatchOption = tagWith(html, "data-qm-option");
    const desktopRankingLink = tagWith(html, `href="/${locale}/ranking/"`, "tracking-widest");

    assert.match(whatsapp, /text-\[#071f12\]/, `${locale} WhatsApp action needs a dark AA foreground`);
    assert.match(telegram, /text-\[#061923\]/, `${locale} Telegram action needs a dark AA foreground`);
    assert.match(filter, /min-h-11/, `${locale} spa filter needs a 44px target`);
    assert.match(contactCard ?? "", /min-h-11/, `${locale} contact channel needs a 44px target`);
    assert.match(quickMatchOption, /min-h-11/, `${locale} quick-match choices need 44px targets`);
    assert.match(desktopRankingLink, /min-h-11/, `${locale} desktop navigation links need 44px targets`);
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
  const venueCopy = ["First venue group", "Second venue group"];
  const venueViewport = new FakeElement();
  venueViewport.dataset.heroVenueGroups = JSON.stringify(venueCopy);
  const venueText = new FakeElement();
  venueText.textContent = venueCopy[0];
  const timers = new Map();
  let nextTimer = 1;
  let now = 0;

  const document = {
    visibilityState: "visible",
    querySelector: (selector) =>
      ({
        "[data-hero-motion]": hero,
        "[data-hero-venues]": venueViewport,
        "[data-hero-venue-text]": venueText,
      })[selector] ?? null,
    querySelectorAll: (selector) =>
      ({
        "[data-hero-backdrop]": backdrops,
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
    requestAnimationFrame: (callback) => {
      const id = nextTimer++;
      timers.set(id, { callback, at: now + 16 });
      return id;
    },
    cancelAnimationFrame: (id) => timers.delete(id),
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
  advanceTo(4000);
  assert.equal(venueText.textContent, venueCopy[0], "venue copy changed before the active text fully exited");
  assert.equal(venueText.classList.contains("is-exiting"), true, "venue copy did not begin its exit transition");
  const finishVenueExit = venueText.listeners.get("transitionend");
  assert.equal(typeof finishVenueExit, "function", "venue copy must wait for the real opacity transition");
  finishVenueExit({ target: venueText, propertyName: "opacity" });
  assert.equal(venueText.textContent, venueCopy[1], "venue copy did not swap after the exit transition");
  assert.equal(venueText.classList.contains("is-entering"), true, "new venue copy did not start below the viewport");
  advanceTo(6000);

  assert.equal(backdrops[1].classList.contains("is-active"), true, "the visual backdrop cadence must still rotate");
  backdrops.forEach((backdrop) =>
    assert.equal(backdrop.getAttribute("aria-hidden"), "true", "visual rotation must not expose a decorative layer"),
  );
  backdropImages.forEach((image) =>
    assert.equal(image.alt, "", "visual rotation must not assign an English SEO alt"),
  );
  assert.equal(venueText.classList.contains("is-exiting"), false, "venue copy remained in its hidden exit state");
  assert.equal(venueText.classList.contains("is-entering"), false, "venue copy remained in its hidden entry state");
  assert.equal(venueText.textContent, venueCopy[1], "venue rotation lost its new single-layer copy");
});

test("hero motion remains functional when IntersectionObserver is unavailable", async () => {
  const hero = new FakeElement();
  const backdrops = [new FakeElement(), new FakeElement()];
  const venueViewport = new FakeElement();
  venueViewport.dataset.heroVenueGroups = JSON.stringify(["First venue group", "Second venue group"]);
  const venueText = new FakeElement();
  venueText.textContent = "First venue group";
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
        "[data-hero-venues]": venueViewport,
        "[data-hero-venue-text]": venueText,
      })[selector] ?? null,
    querySelectorAll: (selector) =>
      ({
        "[data-hero-backdrop]": backdrops,
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
  assert.equal(venueText.textContent, "First venue group", "the active venue text must stay exposed");
  assert.ok(scheduled >= 3, "fallback mode must continue the image and venue cadence");
});

test("reduced motion keeps the testimonial region horizontally reachable", async () => {
  const styles = await readFile(path.join(projectRoot, "src/styles/global.css"), "utf8");
  const baseViewportRules = styles.match(/\.testimonial-viewport\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(baseViewportRules, /overflow-x:\s*auto/, "no-JS visitors must get a horizontally scrollable list");
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

test("testimonial falls back to a horizontal scroll list when viewport observation is unavailable", async () => {
  const styles = await readFile(path.join(projectRoot, "src/styles/global.css"), "utf8");
  const cloneRules = styles.match(/\.testimonial-viewport\s+\.testimonial-track\s+\[data-testimonial-clone\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(cloneRules, /display:\s*none/, "the static scroll list must hide duplicate loop cards");

  const track = new FakeElement();
  const region = new FakeElement();
  const viewport = new FakeElement();
  const control = new FakeElement();
  control.dataset = { pauseLabel: "Pause", resumeLabel: "Resume" };
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
        "[data-testimonial-viewport]": viewport,
        "[data-testimonial-motion-toggle]": control,
      })[selector] ?? null,
    addEventListener() {},
  };
  const window = {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    cancelAnimationFrame() {},
    requestAnimationFrame: () => ++animationFrames,
  };

  vm.runInNewContext(await testimonialsScript(), { document, window });

  assert.equal(track.dataset.motionState, "paused", "without observation, carousel must stop autoplay");
  assert.equal(viewport.classList.contains("is-animated"), false, "unsupported observation must retain the static scroll list");
  assert.equal(control.hidden, true, "unsupported observation must not offer a pause action for stopped content");
  assert.equal(animationFrames, 0, "without observation, carousel must not schedule an animation frame");
});

test("testimonial stays scrollable until viewport observation reports its first state", async () => {
  const track = new FakeElement();
  const region = new FakeElement();
  const viewport = new FakeElement();
  const control = new FakeElement();
  control.dataset = { pauseLabel: "Pause", resumeLabel: "Resume" };
  track.dataset.count = "2";
  track.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 296 }, { offsetLeft: 592 }];

  const document = {
    visibilityState: "visible",
    getElementById: (id) => (id === "testimonial-track" ? track : null),
    querySelector: (selector) =>
      ({
        "[data-testimonial-motion-region]": region,
        "[data-testimonial-viewport]": viewport,
        "[data-testimonial-motion-toggle]": control,
      })[selector] ?? null,
    addEventListener() {},
  };
  class SilentObserver {
    observe() {}
  }
  const window = {
    IntersectionObserver: SilentObserver,
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    cancelAnimationFrame() {},
    requestAnimationFrame: () => 1,
  };

  vm.runInNewContext(await testimonialsScript(), { document, window, IntersectionObserver: SilentObserver });

  assert.equal(track.dataset.motionState, "paused");
  assert.equal(
    viewport.classList.contains("is-animated"),
    false,
    "an observer that never reports must retain the fail-open horizontal list",
  );
  assert.equal(control.hidden, true, "a pause action must stay hidden until autoplay can actually initialize");
});

test("testimonial focus pause covers the testimonial track", async () => {
  const track = new FakeElement();
  const region = new FakeElement();
  const viewport = new FakeElement();
  const outside = new FakeElement();
  const control = new FakeElement();
  control.dataset = { pauseLabel: "Pause", resumeLabel: "Resume" };
  track.dataset.count = "2";
  track.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 296 }, { offsetLeft: 592 }];
  region.contains = (node) => node === track;
  viewport.contains = (node) => node === track || node === viewport;
  let observer;
  let animationFrames = 0;

  const document = {
    visibilityState: "visible",
    getElementById: (id) => (id === "testimonial-track" ? track : null),
    querySelector: (selector) =>
      ({
        "[data-testimonial-motion-region]": region,
        "[data-testimonial-viewport]": viewport,
        "[data-testimonial-motion-toggle]": control,
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
  assert.equal(control.hidden, false, "supported autoplay must expose its pause action");
  assert.ok(animationFrames > 0);

  region.listeners.get("focusin")({ target: track });
  assert.equal(track.dataset.motionState, "paused", "focusing the testimonial region must pause its motion");

  region.listeners.get("focusout")({ relatedTarget: outside });
  assert.equal(track.dataset.motionState, "running", "leaving the shared region must resume eligible motion");

  control.listeners.get("click")();
  assert.equal(track.dataset.motionState, "paused", "the visible pause control must stop autoplay");
  assert.equal(control.getAttribute("aria-pressed"), null, "the action-label control must not expose contradictory toggle state");
  assert.equal(control.getAttribute("aria-label"), control.dataset.resumeLabel, "the paused control must announce resume");

  control.listeners.get("click")();
  assert.equal(track.dataset.motionState, "running", "the visible resume action must restart autoplay");
  assert.equal(control.getAttribute("aria-label"), control.dataset.pauseLabel, "the running control must announce pause");
});

test("floating contact pulse, ranking symbols, and new-status text are reduced-motion and screen-reader safe", async () => {
  const [floating, ranking] = await Promise.all([
    readFile(path.join(projectRoot, "src/components/FloatingContactPill.astro"), "utf8"),
    readFile(path.join(distRoot, "en", "ranking", "index.html"), "utf8"),
  ]);
  const rating = tagWith(ranking, "data-ranking-rating");
  const newest = tagWith(ranking, "data-ranking-new-status");

  assert.match(floating, /animate-ping[^"\n]*motion-reduce:animate-none/, "the contact pulse must stop for reduced motion");
  assert.match(rating, /aria-label="Editorial score: \d+ \/ 5"/, "star ratings need a numeric accessible label");
  assert.match(ranking, /data-ranking-rating[^>]*>\s*<span aria-hidden="true">/, "star characters must be decorative");
  assert.match(newest, /aria-label="Newer venue: Yes"/, "new-status symbols need a localized affirmative label");
  assert.match(ranking, /data-ranking-new-status[^>]*>\s*<span aria-hidden="true">/, "new-status symbols must be decorative");
});
