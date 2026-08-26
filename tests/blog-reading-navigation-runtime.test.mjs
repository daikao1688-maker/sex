import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getActiveHeadingIndex,
  getHorizontalScrollTarget,
  getReadingRailScrollBehavior,
  initBlogReadingNavigation,
  shouldShowMobileReadingRail,
} from "../src/scripts/blog-reading-navigation.mjs";

class FakeElement {
  constructor({ dataset = {}, rect = {}, clientWidth = 0, scrollWidth = 0 } = {}) {
    this.attributes = new Map();
    this.classes = new Set();
    this.dataset = dataset;
    this.listeners = new Map();
    this.inert = false;
    this.offsetHeight = rect.height ?? 0;
    this.clientWidth = clientWidth;
    this.scrollWidth = scrollWidth;
    this.scrollLeft = 0;
    this.rect = { left: 0, right: 0, top: 0, bottom: 0, height: 0, ...rect };
    this.classList = {
      toggle: (name, force) => {
        const enabled = force ?? !this.classes.has(name);
        if (enabled) this.classes.add(name);
        else this.classes.delete(name);
        return enabled;
      },
    };
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  toggleAttribute(name, force) {
    if (force) this.setAttribute(name, "");
    else this.removeAttribute(name);
  }

  addEventListener(name, listener) {
    this.listeners.set(name, listener);
  }

  getBoundingClientRect() {
    return this.rect;
  }

  scrollTo({ left, behavior }) {
    this.scrollLeft = left;
    this.lastScrollBehavior = behavior;
  }

  scrollIntoView(options) {
    this.lastScrollIntoView = options;
  }
}

test("mobile reading rail appears only between the dismissed promotion and article CTA", () => {
  const base = {
    isMobile: true,
    promoBottom: 64,
    headerBottom: 64,
    bodyTop: 160,
    readingEndTop: 700,
    railHeight: 48,
  };

  assert.equal(shouldShowMobileReadingRail(base), true);
  assert.equal(shouldShowMobileReadingRail({ ...base, promoBottom: 65 }), false);
  assert.equal(
    shouldShowMobileReadingRail({ ...base, bodyTop: 300 }),
    false,
    "the rail must wait until the article body reaches the reading zone",
  );
  assert.equal(shouldShowMobileReadingRail({ ...base, readingEndTop: 112 }), false);
  assert.equal(shouldShowMobileReadingRail({ ...base, isMobile: false }), false);
});

test("Scrollspy selects the last heading that crossed the reading activation line in both directions", () => {
  assert.equal(getActiveHeadingIndex([], 192), -1);
  assert.equal(getActiveHeadingIndex([240, 560, 900], 192), 0);
  assert.equal(getActiveHeadingIndex([-40, 180, 620], 192), 1);
  assert.equal(getActiveHeadingIndex([-700, -120, 190], 192), 2);
  assert.equal(getActiveHeadingIndex([-40, 220, 620], 192), 0, "scrolling upward must restore the prior heading");
});

test("active directory items move only when they leave the horizontal safe area", () => {
  const base = {
    scrollLeft: 0,
    clientWidth: 320,
    scrollWidth: 900,
    trackLeft: 0,
    linkLeft: 100,
    linkRight: 200,
    edgePadding: 16,
  };

  assert.equal(getHorizontalScrollTarget(base), null, "a visible item must not steal a manual scroll position");
  assert.equal(
    getHorizontalScrollTarget({ ...base, linkLeft: 400, linkRight: 520 }),
    300,
    "an off-screen item should be centered",
  );
  assert.equal(
    getHorizontalScrollTarget({ ...base, scrollLeft: 560, linkLeft: 300, linkRight: 380 }),
    580,
    "centering must clamp to the track's final scroll position",
  );
});

test("automatic directory movement respects reduced-motion preferences", () => {
  assert.equal(getReadingRailScrollBehavior(false), "smooth");
  assert.equal(getReadingRailScrollBehavior(true), "auto");
});

test("the client controller waits for the body and enhances anchor clicks without changing the hash", () => {
  const rail = new FakeElement({ rect: { height: 48 } });
  rail.setAttribute("aria-hidden", "true");
  rail.inert = true;
  const track = new FakeElement({ rect: { left: 0, right: 320 }, clientWidth: 320, scrollWidth: 720 });
  const nav = new FakeElement({ rect: { bottom: 64 } });
  const promo = new FakeElement({ rect: { bottom: 64 } });
  const body = new FakeElement({ rect: { top: 300 } });
  const readingEnd = new FakeElement({ rect: { top: 900 } });
  const firstHeading = new FakeElement({ rect: { top: 160 } });
  const secondHeading = new FakeElement({ rect: { top: 520 } });
  const firstMobileLink = new FakeElement({
    dataset: { tocId: "first" },
    rect: { left: 20, right: 120 },
  });
  const secondMobileLink = new FakeElement({
    dataset: { tocId: "second" },
    rect: { left: 420, right: 540 },
  });
  const firstDesktopLink = new FakeElement({ dataset: { tocId: "first" } });
  const secondDesktopLink = new FakeElement({ dataset: { tocId: "second" } });
  const allLinks = [firstMobileLink, secondMobileLink, firstDesktopLink, secondDesktopLink];
  const windowListeners = new Map();
  const mobileMedia = { matches: true, addEventListener() {} };
  const reduceMotionMedia = { matches: false, addEventListener() {} };

  const document = {
    querySelector: (selector) =>
      ({
        "[data-blog-toc-mobile]": rail,
        "[data-blog-toc-track]": track,
        "[data-site-nav]": nav,
        "#promo-top-bar": promo,
        "[data-blog-body]": body,
        "[data-blog-reading-end]": readingEnd,
      })[selector] ?? null,
    querySelectorAll: (selector) => {
      if (selector === "[data-blog-toc-link]") return allLinks;
      if (selector === "[data-blog-toc-mobile-link]") return [firstMobileLink, secondMobileLink];
      return [];
    },
    getElementById: (id) => ({ first: firstHeading, second: secondHeading })[id] ?? null,
  };
  const window = {
    location: { hash: "" },
    matchMedia: (query) => (query.includes("1023px") ? mobileMedia : reduceMotionMedia),
    requestAnimationFrame: (callback) => callback(),
    addEventListener: (name, listener) => windowListeners.set(name, listener),
  };

  const controller = initBlogReadingNavigation({ document, window });
  assert.ok(controller);
  assert.equal(rail.getAttribute("aria-hidden"), "true", "the body has not reached the reading zone yet");
  assert.equal(rail.inert, true);

  body.rect.top = 160;
  controller.update();
  assert.equal(rail.getAttribute("aria-hidden"), "false");
  assert.equal(rail.inert, false);

  let prevented = false;
  const clickListener = secondMobileLink.listeners.get("click");
  assert.ok(clickListener, "directory anchors must be progressively enhanced with a click handler");
  clickListener({ preventDefault: () => (prevented = true), currentTarget: secondMobileLink });
  assert.equal(prevented, true);
  assert.deepEqual(secondHeading.lastScrollIntoView, { behavior: "smooth", block: "start" });
  assert.equal(window.location.hash, "", "enhanced directory clicks must not leave a hash behind");

  firstHeading.rect.top = -240;
  secondHeading.rect.top = 160;
  controller.update();
  assert.equal(secondMobileLink.getAttribute("aria-current"), "location");
  assert.equal(secondDesktopLink.getAttribute("aria-current"), "location");
  assert.equal(firstMobileLink.getAttribute("aria-current"), null);
  assert.equal(track.scrollLeft, 320, "a newly active off-screen item must move into the track");
  assert.equal(track.lastScrollBehavior, "smooth");

  readingEnd.rect.top = 112;
  controller.update();
  assert.equal(rail.getAttribute("aria-hidden"), "true", "the rail must release before the booking CTA");
  assert.equal(rail.inert, true);
});
