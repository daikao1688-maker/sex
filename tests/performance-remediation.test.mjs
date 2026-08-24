import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import ts from "typescript";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];
const venueSlugs = [
  "clube-rio",
  "manhao-spa",
  "number-nine-sauna",
  "shang-pin-spa",
  "majesty-spa",
  "the-excellent-sauna",
  "empire-sauna",
  "east-castle-spa",
  "victoria-sauna",
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "eighteen-sauna",
];

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

const responsiveCandidates = (tag) => {
  const value = attr(tag, "srcset") ?? "";
  return value
    .split(",")
    .map((candidate) => candidate.trim().match(/^(\/\S+)\s+(\d+)w$/))
    .filter(Boolean)
    .map((match) => ({ src: match[1], width: Number(match[2]) }));
};

const metadataCache = new Map();
const metadataFor = async (src) => {
  if (!metadataCache.has(src)) {
    metadataCache.set(src, sharp(path.join(projectRoot, "public", src)).metadata());
  }
  return metadataCache.get(src);
};

const assertTruthfulCandidates = async (tag, label) => {
  const candidates = responsiveCandidates(tag);
  assert.ok(candidates.length >= 2, `${label} needs at least two width-described candidates`);
  for (const candidate of candidates) {
    const metadata = await metadataFor(candidate.src);
    assert.equal(metadata.width, candidate.width, `${label} has an inaccurate ${candidate.src} descriptor`);
  }
};

const assertTruthfulResponsiveImage = async (tag, label) => {
  await assertTruthfulCandidates(tag, label);
  const source = attr(tag, "src");
  assert.ok(source?.startsWith("/"), `${label} needs a local fallback source`);
  const metadata = await metadataFor(source);
  assert.equal(Number(attr(tag, "width")), metadata.width, `${label} width is not intrinsic`);
  assert.equal(Number(attr(tag, "height")), metadata.height, `${label} height is not intrinsic`);
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
  return ts.transpileModule(script, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
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

  focus() {
    this.focused = true;
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

test("localized production pages omit consent UI and Google tag payloads", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    assert.doesNotMatch(
      html,
      /data-(?:analytics-loader|consent-(?:panel|accept|decline|settings|controller))|googletagmanager\.com|GT-TXHFV3C5|AW-18058018185/i,
      `${locale} still ships removed consent or Google tag behavior`,
    );
  }
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

  const activeImage = backdropBlocks.find((block) => /\bis-active\b/.test(block)) ?? "";
  const hiddenImages = backdropBlocks.filter((block) => !/\bis-active\b/.test(block));
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
  const images = [
    new FakeElement({}),
    new FakeElement({ src: "/covers/next.jpg", srcset: "/covers/next-960.webp 960w" }),
    new FakeElement({ src: "/covers/third.webp", srcset: "/covers/third-960.webp 960w" }),
  ];
  images[0].src = "/covers/active.jpg";
  const nextSourceAssignments = [];
  Object.defineProperties(images[1], {
    srcset: {
      get: () => images[1].getAttribute("srcset") ?? "",
      set: (value) => {
        nextSourceAssignments.push("srcset");
        images[1].setAttribute("srcset", value);
      },
    },
    src: {
      get: () => images[1].getAttribute("src") ?? undefined,
      set: (value) => {
        nextSourceAssignments.push("src");
        images[1].setAttribute("src", value);
      },
    },
  });
  const backdrops = images.map((image) => {
    const backdrop = new FakeElement();
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.querySelector = () => image;
    return backdrop;
  });
  const venueViewport = new FakeElement({
    heroVenueGroups: JSON.stringify(["First venue group", "Second venue group"]),
  });
  const venueText = new FakeElement();
  venueText.textContent = "First venue group";
  const timers = new Map();
  let timerId = 0;
  let now = 0;
  const document = {
    visibilityState: "visible",
    querySelector: (selector) => ({
      "[data-hero-motion]": hero,
      "[data-hero-venues]": venueViewport,
      "[data-hero-venue-text]": venueText,
    })[selector] ?? null,
    querySelectorAll: (selector) => ({
      "[data-hero-backdrop]": backdrops,
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
  advanceTo(2999);
  assert.equal(images[1].src, undefined, "next hero source loaded too early");
  advanceTo(3000);
  assert.equal(images[1].src, "/covers/next.jpg", "next hero source was not preloaded near rotation");
  assert.deepEqual(
    nextSourceAssignments,
    ["srcset", "src"],
    "responsive candidates must be assigned before the fallback starts fetching",
  );
  assert.equal(backdrops[1].getAttribute("aria-hidden"), "true", "preload exposed the next slide early");
  advanceTo(4000);
  assert.equal(backdrops[1].getAttribute("aria-hidden"), "true", "visual rotation exposed a decorative layer");
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
    assert.equal(
      attr(card, "loading"),
      "lazy",
      `spa card ${index + 1} is below the initial viewport`,
    );
    assert.equal(
      attr(card, "fetchpriority"),
      "low",
      `spa card ${index + 1} must not compete with the Hero LCP`,
    );
  }

  const blog = await readPage("en", "blog", "macau-sauna-august-guide-2026");
  const cover = tags(blog, "img").find((tag) => tag.includes("01-macau-sauna-majesty-spa-pool")) ?? "";
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

test("all localized venue heroes use truthful responsive WebP candidates", async () => {
  for (const locale of locales) {
    for (const slug of venueSlugs) {
      const html = await readPage(locale, "spa", slug);
      const hero = html.match(/<section\b(?=[^>]*data-testid="spa-hero")[\s\S]*?<\/section>/i)?.[0] ?? "";
      const image = tags(hero, "img")[0] ?? "";
      const label = `${locale}/${slug} hero`;

      assert.ok(image, `${label} is missing`);
      assert.equal(attr(image, "loading"), "eager", `${label} should remain the route LCP candidate`);
      assert.equal(attr(image, "fetchpriority"), "high", `${label} should retain high priority`);
      assert.equal(attr(image, "decoding"), "async");
      assert.ok(attr(image, "sizes"), `${label} is missing responsive sizes`);
      await assertTruthfulResponsiveImage(image, label);
    }
  }
});

test("Best of Month uses existing modern and fallback candidates at low priority", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    const pictures = [
      ...html.matchAll(/<picture\b(?=[^>]*data-bom-picture)[^>]*>[\s\S]*?<\/picture>/gi),
    ].map((match) => match[0]);
    assert.equal(pictures.length, 3, `${locale} must keep all three indexable shortlist cards`);

    for (const [index, picture] of pictures.entries()) {
      const source = tags(picture, "source")[0] ?? "";
      const image = tags(picture, "img")[0] ?? "";
      const label = `${locale} Best of Month card ${index + 1}`;

      assert.equal(attr(source, "type"), "image/webp", `${label} needs a modern source`);
      assert.ok(attr(source, "sizes"), `${label} modern source is missing sizes`);
      assert.equal(attr(image, "loading"), "lazy", `${label} is below the fold`);
      assert.equal(attr(image, "fetchpriority"), "low", `${label} must not compete with the Hero LCP`);
      assert.equal(attr(image, "width"), "800");
      assert.equal(attr(image, "height"), "800");
      assert.ok(attr(image, "sizes"), `${label} fallback is missing sizes`);
      await assertTruthfulCandidates(source, `${label} WebP`);
      await assertTruthfulResponsiveImage(image, `${label} JPEG`);
    }
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
