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

test("every locale exposes pausable motion controls and hides testimonial duplicates", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const testimonialToggle = tagWith(html, "data-testimonial-motion-toggle");
    const heroToggle = tagWith(html, "data-hero-motion-toggle");
    const clones = html.match(/<blockquote\b[^>]*data-testimonial-clone[^>]*>/gi) ?? [];

    assert.match(testimonialToggle, /aria-pressed="false"/, `${locale} testimonial control starts unpaused`);
    assert.match(heroToggle, /aria-pressed="false"/, `${locale} hero control starts unpaused`);
    assert.ok(clones.length > 0, `${locale} carousel must mark repeated cards as clones`);
    clones.forEach((clone) => {
      assert.match(clone, /aria-hidden="true"/, `${locale} repeated testimonial must be hidden from assistive tech`);
    });
  }
});

test("every locale gives motion regions an observable state and synchronized hero accessibility", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const testimonialTrack = tagWith(html, 'id="testimonial-track"');
    const hero = tagWith(html, "data-hero-motion");
    const activeBackdrop = tagWith(html, "data-hero-backdrop", 'aria-hidden="false"');
    const inactiveBackdrop = tagWith(html, "data-hero-backdrop", 'aria-hidden="true"');
    const activeVenue = tagWith(html, "data-hero-venue-group", 'aria-hidden="false"');
    const inactiveVenue = tagWith(html, "data-hero-venue-group", 'aria-hidden="true"');

    assert.match(testimonialTrack, /data-motion-state="running"/, `${locale} testimonial region exposes its motion state`);
    assert.match(hero, /data-motion-state="running"/, `${locale} hero exposes its motion state`);
    assert.match(activeBackdrop, /is-active/, `${locale} active hero backdrop must be exposed`);
    assert.doesNotMatch(inactiveBackdrop, /is-active/, `${locale} inactive hero backdrop must be hidden`);
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
  const toggle = new FakeElement();
  const icon = new FakeElement();
  const backdrops = [new FakeElement(), new FakeElement(), new FakeElement()];
  const venues = [new FakeElement(), new FakeElement()];
  const timers = new Map();
  let nextTimer = 1;
  let now = 0;

  const document = {
    visibilityState: "visible",
    querySelector: (selector) =>
      ({
        "[data-hero-motion]": hero,
        "[data-hero-motion-toggle]": toggle,
        "[data-hero-motion-icon]": icon,
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

  assert.equal(backdrops[1].getAttribute("aria-hidden"), "false", "backdrop rotation must not be reset by venue rotation");
  assert.equal(venues[1].getAttribute("aria-hidden"), "false", "venue rotation must remain synchronized with its visible state");
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
  const toggle = new FakeElement();
  const icon = new FakeElement();
  track.dataset.count = "2";
  track.querySelectorAll = () => [{ offsetLeft: 0 }, { offsetLeft: 296 }, { offsetLeft: 592 }];
  track.contains = () => false;
  let animationFrames = 0;

  const document = {
    visibilityState: "visible",
    getElementById: (id) => (id === "testimonial-track" ? track : null),
    querySelector: (selector) =>
      ({
        "[data-testimonial-motion-toggle]": toggle,
        "[data-testimonial-motion-icon]": icon,
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
