import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const siteOrigin = new URL(process.env.PUBLIC_SITE_ORIGIN ?? "https://macao-sex.com").origin;
const koreanLocale = "ko";
const localeCodes = ["en", "zh-TW", "zh-CN", "ja", koreanLocale];

const pagePath = (locale, ...segments) => path.join(distRoot, locale, ...segments, "index.html");
async function readPage(locale, ...segments) {
  const file = pagePath(locale, ...segments);
  const route = segments.length ? `/${segments.join("/")}/` : "/";
  assert.equal(existsSync(file), true, `missing generated ${locale} page: /${locale}${route}`);
  return readFile(file, "utf8");
}
const containsHangul = (value) => /[\uac00-\ud7a3]/.test(value);
const countHangul = (value) => [...value.matchAll(/[\uac00-\ud7a3]/g)].length;

function scriptContaining(html, marker) {
  const source = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .find((candidate) => candidate.includes(marker));
  assert.ok(source, `generated page is missing the script responsible for ${marker}`);
  return source;
}

function scriptWithAttribute(html, attribute) {
  const match = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].find((candidate) =>
    new RegExp(`\\b${attribute}(?:\\s|=|$)`, "i").test(candidate[1]),
  );
  assert.ok(match, `generated page is missing the ${attribute} script`);
  return match[2];
}

function runRootRedirect(script, language) {
  const redirects = [];
  const context = {
    location: {
      search: "",
      hash: "",
      replace(destination) {
        redirects.push(destination);
      },
    },
    navigator: { language, languages: [language] },
  };
  context.window = context;

  vm.runInNewContext(script, context, { filename: "dist/index.html" });
  assert.equal(redirects.length, 1, `${String(language)} should trigger one root redirect`);
  return redirects[0];
}

function make404Element(dataset = {}) {
  const attributes = new Map();
  const classes = new Set();

  return {
    dataset,
    textContent: "",
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      toggle: (name, force) => {
        if (force === undefined) {
          if (classes.has(name)) classes.delete(name);
          else classes.add(name);
          return classes.has(name);
        }
        if (force) classes.add(name);
        else classes.delete(name);
        return force;
      },
    },
    setAttribute: (name, value) => attributes.set(name, String(value)),
    getAttribute: (name) => attributes.get(name) ?? null,
    removeAttribute: (name) => attributes.delete(name),
    addEventListener() {},
    focus() {},
  };
}

function run404Localization(script, { pathname, language }) {
  const selectors = [
    "eyebrow",
    "heading",
    "body",
    "brand",
    "language-current",
    "home",
    "spas",
    "guide",
    "contact",
    "brand-link",
    "language-toggle",
    "language-panel",
  ];
  const elements = Object.fromEntries(
    selectors.map((name) => [`[data-404-${name}]`, make404Element()]),
  );
  const localeLinks = localeCodes.map((locale) => make404Element({ locale }));
  const document = {
    title: "",
    documentElement: make404Element(),
    querySelector: (selector) => elements[selector] ?? null,
    querySelectorAll: (selector) =>
      selector === "[data-404-locale-link]" ? localeLinks : [],
    addEventListener() {},
  };
  const window = { location: { pathname }, addEventListener() {} };

  vm.runInNewContext(script, {
    document,
    window,
    navigator: { language, languages: [language] },
    console,
  });

  return { document, elements };
}

function runPromoMonthRefresh(script) {
  const month = { textContent: "" };
  const FrozenDate = class extends Date {
    constructor() {
      super("2026-08-24T12:00:00Z");
    }
  };
  const document = {
    documentElement: { lang: koreanLocale },
    querySelectorAll: (selector) => (selector === "[data-promo-month]" ? [month] : []),
    getElementById: () => null,
    querySelector: () => null,
  };

  vm.runInNewContext(script, { Date: FrozenDate, Intl, document });
  return month.textContent;
}

function alternateHref(html, language) {
  return html.match(
    new RegExp(
      `<link\\b(?=[^>]*\\brel="alternate")(?=[^>]*\\bhreflang="${language}")(?=[^>]*\\bhref="([^"]+)")[^>]*>`,
    ),
  )?.[1];
}

test("Korean is a complete public locale with its required metadata", async () => {
  const html = await readPage(koreanLocale);

  assert.match(html, /<html\b(?=[^>]*\blang="ko")[^>]*>/, "Korean homepage must declare lang=ko");
  assert.match(
    html,
    /<meta\b(?=[^>]*\bproperty="og:locale")(?=[^>]*\bcontent="ko_KR")[^>]*>/,
    "Korean homepage must publish Open Graph locale ko_KR",
  );
  assert.match(html, />한국어</, "language controls must name Korean as 한국어");
});

test("root detection sends Korean browsers to the Korean homepage", async () => {
  const html = await readFile(path.join(distRoot, "index.html"), "utf8");
  const script = scriptWithAttribute(html, "data-root-locale-redirect");

  assert.equal(runRootRedirect(script, "ko"), "/ko/");
  assert.equal(runRootRedirect(script, "ko-KR"), "/ko/");
  assert.match(
    html,
    /<a\b(?=[^>]*href="\/ko\/")(?=[^>]*hreflang="ko")[^>]*>\s*한국어\s*<\/a>/,
    "root fallback navigation must expose the 한국어 destination",
  );
});

test("404 recovery provides Korean copy and destinations", async () => {
  const html = await readFile(path.join(distRoot, "404.html"), "utf8");
  const script = scriptContaining(html, "data-404-heading");
  const { document, elements } = run404Localization(script, {
    pathname: "/ko/missing-page/",
    language: "ja-JP",
  });

  assert.equal(document.documentElement.lang, koreanLocale);
  assert.ok(containsHangul(elements["[data-404-heading]"].textContent), "Korean 404 heading must be Korean copy");
  assert.ok(containsHangul(elements["[data-404-body]"].textContent), "Korean 404 body must be Korean copy");
  assert.equal(elements["[data-404-home]"].getAttribute("href"), "/ko/");
  assert.match(
    html,
    /<a\b(?=[^>]*href="\/ko\/")(?=[^>]*hreflang="ko")(?=[^>]*data-404-locale-link)(?=[^>]*data-locale="ko")[^>]*>[\s\S]*?한국어[\s\S]*?<\/a>/,
    "404 language fallback must expose 한국어",
  );
});

test("each active page renders Korean-owned copy instead of an English fallback", async () => {
  const routes = [
    [],
    ["about"],
    ["blog"],
    ["contact"],
    ["editorial-policy"],
    ["faq"],
    ["guide"],
    ["privacy"],
    ["ranking"],
    ["shuttle"],
    ["spa", "clube-rio"],
    ["spa", "eighteen-sauna"],
  ];

  for (const route of routes) {
    const html = await readPage(koreanLocale, ...route);
    const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
    assert.ok(
      countHangul(main) >= 40,
      `/ko/${route.join("/")} must contain substantial Korean page copy rather than the English fallback`,
    );
  }

  const homepage = await readPage(koreanLocale);
  const bestOfMonth = homepage.match(/<section\b(?=[^>]*data-testid="best-of-month")[\s\S]*?<\/section>/i)?.[0] ?? "";
  assert.ok(containsHangul(bestOfMonth), "Korean Best of Month content must not fall back to English");
});

test("Korean blog entries preserve both public slugs and publication dates", async () => {
  const posts = [
    ["macau-sauna-august-guide-2026", "2026-07-26", "2026-08-23"],
    ["macau-sauna-overnight-guide-2026", "2026-08-11", "2026-08-23"],
  ];

  for (const [slug, date, dateModified] of posts) {
    const file = path.join(projectRoot, "src", "content", "blog", koreanLocale, `${slug}.md`);
    assert.equal(existsSync(file), true, `Korean article is missing: ${slug}`);
    if (!existsSync(file)) continue;

    const source = await readFile(file, "utf8");
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---/m)?.[1] ?? "";
    assert.match(frontmatter, new RegExp(`^date: "${date}"$`, "m"), `${slug} changed its publication date`);
    assert.match(
      frontmatter,
      new RegExp(`^dateModified: "${dateModified}"$`, "m"),
      `${slug} changed its editorial update date`,
    );
    assert.ok(containsHangul(source), `${slug} must contain Korean editorial content`);
  }
});

test("all active Korean galleries expose specific Korean alternative text and captions", async () => {
  const galleryCounts = {
    "clube-rio": 5,
    "manhao-spa": 11,
    "number-nine-sauna": 7,
    "shang-pin-spa": 11,
    "majesty-spa": 25,
    "the-excellent-sauna": 14,
    "empire-sauna": 12,
    "east-castle-spa": 18,
    "victoria-sauna": 8,
    "m-club": 22,
    "number-one-sauna": 10,
    "familia-nobre": 10,
    "oceanic-royal-spa": 9,
    "eighteen-sauna": 7,
  };

  let renderedImages = 0;
  for (const [slug, expectedCount] of Object.entries(galleryCounts)) {
    const html = await readPage(koreanLocale, "spa", slug);
    const alts = [...html.matchAll(/data-alt="([^"]+)"/g)].map((match) => match[1]);
    const captions = [...html.matchAll(/data-caption="([^"]+)"/g)].map((match) => match[1]);

    assert.equal(alts.length, expectedCount, `${slug} is missing Korean gallery alt text`);
    assert.equal(captions.length, expectedCount, `${slug} is missing Korean gallery captions`);
    assert.equal(new Set(alts).size, expectedCount, `${slug} repeats Korean gallery alt text`);
    assert.equal(new Set(captions).size, expectedCount, `${slug} repeats Korean gallery captions`);
    for (const [index, alt] of alts.entries()) {
      assert.ok(containsHangul(alt), `${slug} image ${index + 1} alt text is not Korean`);
      assert.ok(containsHangul(captions[index]), `${slug} image ${index + 1} caption is not Korean`);
      assert.notEqual(alt, captions[index], `${slug} image ${index + 1} reuses its alt text as a caption`);
    }
    renderedImages += expectedCount;
  }

  assert.equal(renderedImages, 169, "Korean pages must expose all 169 active gallery descriptions");
});

test("Korean server and client month labels use Korean month and year forms", async () => {
  const html = await readPage(koreanLocale);
  const serverPromoMonth = html.match(/data-promo-month[^>]*>\s*([^<]+)\s*</)?.[1] ?? "";
  const serverBestOfMonth = html.match(/data-bom-month[^>]*>\s*([^<]+)\s*</)?.[1] ?? "";

  assert.match(serverPromoMonth, /^\d{1,2}월$/, "server-rendered promo month must use 월");
  assert.match(serverBestOfMonth, /^\d{4}년 \d{1,2}월$/, "server-rendered month/year must use 년 and 월");

  const promoScript = scriptContaining(html, "data-promo-month");
  assert.equal(runPromoMonthRefresh(promoScript), "8월", "client month refresh must use the Korean 월 suffix");
});

test("Korean static pages complete the 130-URL sitemap and reciprocal hreflang mesh", async () => {
  const sitemap = await readFile(path.join(distRoot, "sitemap-0.xml"), "utf8");
  const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapLocations.length, 130, "sitemap must list 130 localized canonical URLs");

  const localizedPaths = (await readdir(path.join(distRoot, koreanLocale), { recursive: true }))
    .filter((relativePath) => relativePath.endsWith(`${path.sep}index.html`));
  assert.equal(localizedPaths.length, 26, "Korean must ship the same 26 public pages as every other locale");

  for (const relativePath of localizedPaths) {
    const html = await readFile(path.join(distRoot, koreanLocale, relativePath), "utf8");
    const suffix = relativePath.slice(0, -"index.html".length).replaceAll(path.sep, "/");
    const koreanUrl = `${siteOrigin}/ko/${suffix}`;
    const canonical = html.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/)?.[1];

    assert.equal(canonical, koreanUrl, `${relativePath} needs a Korean self canonical`);
    for (const locale of localeCodes) {
      assert.equal(
        alternateHref(html, locale),
        `${siteOrigin}/${locale}/${suffix}`,
        `${relativePath} is missing its reciprocal ${locale} alternate`,
      );
    }
    assert.equal(
      alternateHref(html, "x-default"),
      `${siteOrigin}/en/${suffix}`,
      `${relativePath} is missing its English x-default alternate`,
    );
  }
});
