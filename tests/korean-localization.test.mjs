import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const siteOrigin = new URL(process.env.PUBLIC_SITE_ORIGIN ?? "https://sex-macau.com").origin;
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
const textContent = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function mainContent(html) {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
}

function firstHeading(html) {
  return textContent(mainContent(html).match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
}

function assertKoreanOwnedPage(html, { route, englishFallback, headingRequired = true }) {
  const main = mainContent(html);
  const heading = firstHeading(html);

  assert.ok(containsHangul(main), `/ko${route} must render Korean-visible page content`);
  if (headingRequired) {
    assert.ok(containsHangul(heading), `/ko${route} must render a Korean page heading`);
  }
  assert.equal(
    main.includes(englishFallback),
    false,
    `/ko${route} still exposes its page-specific English fallback: ${englishFallback}`,
  );
}

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

test("each active page renders Korean-owned copy instead of its page-specific English fallback", async () => {
  const pages = [
    { segments: [], route: "/", englishFallback: "Macau Sauna &amp; Spa — Your VIP Experience" },
    { segments: ["about"], route: "/about/", englishFallback: "A Clearer Way to Navigate Macau Saunas" },
    { segments: ["blog"], route: "/blog/", englishFallback: "Blog" },
    { segments: ["contact"], route: "/contact/", englishFallback: "Contact Us" },
    { segments: ["editorial-policy"], route: "/editorial-policy/", englishFallback: "Editorial and Corrections Policy" },
    { segments: ["faq"], route: "/faq/", englishFallback: "FAQ" },
    { segments: ["guide"], route: "/guide/", englishFallback: "Planning Your First Macau Sauna Visit?" },
    { segments: ["privacy"], route: "/privacy/", englishFallback: "Privacy Notice" },
    { segments: ["ranking"], route: "/ranking/", englishFallback: "Macau Sauna Guide 2026 — Compare 15 Venues" },
    { segments: ["shuttle"], route: "/shuttle/", englishFallback: "Plan Your Macau Sauna Pickup" },
    { segments: ["spa", "clube-rio"], route: "/spa/clube-rio/", englishFallback: "Clube Rio is a business-KTV club that held its grand opening on 30 July 2026", headingRequired: false },
    { segments: ["spa", "eighteen-sauna"], route: "/spa/eighteen-sauna/", englishFallback: "18 Sauna formerly operated on the sixth floor of Hotel Golden Dragon", headingRequired: false },
  ];

  for (const page of pages) {
    assertKoreanOwnedPage(await readPage(koreanLocale, ...page.segments), page);
  }

  const homepage = await readPage(koreanLocale);
  const bestOfMonth = homepage.match(/<section\b(?=[^>]*data-testid="best-of-month")[\s\S]*?<\/section>/i)?.[0] ?? "";
  assert.ok(containsHangul(bestOfMonth), "Korean Best of Month heading must not fall back to English");
  assert.equal(
    bestOfMonth.includes("leads this month's shortlist"),
    false,
    "Korean Best of Month content still exposes its English fallback",
  );
});

test("removed Korean blog entries have no source files, generated pages, or index links", async () => {
  const posts = [
    "macau-sauna-august-guide-2026",
    "macau-sauna-market-update-september-2026",
    "macau-sauna-overnight-guide-2026",
  ];
  const blogIndex = await readPage(koreanLocale, "blog");

  for (const slug of posts) {
    const file = path.join(projectRoot, "src", "content", "blog", koreanLocale, `${slug}.md`);
    assert.equal(existsSync(file), false, `removed Korean article source remains: ${slug}`);
    assert.equal(
      existsSync(pagePath(koreanLocale, "blog", slug)),
      false,
      `removed Korean article is still generated: ${slug}`,
    );
    assert.equal(blogIndex.includes(`/ko/blog/${slug}/`), false, `Korean blog index still links to ${slug}`);
  }
});

test("Korean public pages do not publish known corrupted Korean tokens", async () => {
  const corruptedTokens = [
    "묾셔",
    "복내",
    "복낼",
    "핫두고",
    "이륾니다",
    "예약핫든",
    "정볼",
    "물숍",
    "묣숍",
    "묝대",
    "장멸",
    "큘브",
    "리큐라이너",
    "리큐라이닝",
    "개실",
    "퇴관",
    "에리어",
    "보관핵",
    "다륾",
    "선택핫",
    "취소핫",
    "확인핫",
    "건배핫",
    "조걼",
    "이륾",
    "볞빛",
    "배에되고",
    "세멘대",
    "진엄된",
    "안날되어",
    "추加入",
    "깸깸",
    "수멧",
    "용매 그림",
    "용매 아트",
    "전통莞式",
    "오륵며",
    "드러낸며",
    "클리식",
    "전방향 크림 시트",
    "토르 미러",
    "앰버 광주",
    "레드 발권",
    "중고 가격대",
    "재적 수",
    "식별도",
    "소프트 면",
    "휴업한 건축물",
    "전속 협력가",
    "식재와",
    "혼상",
    "체험감",
    "안마의자 휴게 열",
    "최대형 사우나",
    "중영문 명칭",
    "퍼플 광벽",
    "포스터 침대",
    "부드러운 주역",
    "살펴 보실",
    "이 달의",
  ];
  const localizedPaths = (await readdir(path.join(distRoot, koreanLocale), { recursive: true }))
    .filter((relativePath) =>
      relativePath === "index.html" || relativePath.endsWith(`${path.sep}index.html`),
    );

  for (const relativePath of localizedPaths) {
    const html = await readFile(path.join(distRoot, koreanLocale, relativePath), "utf8");
    for (const token of corruptedTokens) {
      assert.equal(
        html.includes(token),
        false,
        `${relativePath} publishes the corrupted Korean token: ${token}`,
      );
    }
  }
});

test("Korean high-traffic pages publish natural localized wording", async () => {
  const contact = await readPage(koreanLocale, "contact");
  const clubeRio = await readPage(koreanLocale, "spa", "clube-rio");
  const homepage = await readPage(koreanLocale);

  assert.ok(contact.includes("메시지를 보낸 후"), "Korean contact FAQ must use 보낸");
  assert.ok(clubeRio.includes("무료 픽업"), "Korean Clube Rio page must advertise 무료 픽업");
  assert.ok(clubeRio.includes("클루브 리오"), "Korean Clube Rio page must use its established Korean name");
  assert.ok(clubeRio.includes("금박 용·독수리"), "Korean Clube Rio gallery must name the dragon-and-eagle artwork");
  assert.ok(homepage.includes("이달의 베스트"), "Korean homepage must use the standard 이달의 spelling");
});

test("SpaGrid image alternatives and footer copyright use each locale's language", async () => {
  const locales = {
    "zh-TW": { altSuffix: "澳門高級桑拿會所", copyright: "版權所有" },
    "zh-CN": { altSuffix: "澳门高端桑拿会所", copyright: "保留所有权利" },
    ja: { altSuffix: "マカオの高級サウナ施設", copyright: "無断転載を禁じます" },
  };

  for (const [locale, expected] of Object.entries(locales)) {
    const html = await readPage(locale);
    const spaGrid = html.match(/<section\b(?=[^>]*\bid="spas")[\s\S]*?<\/section>/i)?.[0] ?? "";

    assert.ok(spaGrid.includes(expected.altSuffix), `/${locale}/ SpaGrid must use a localized image alt suffix`);
    assert.equal(
      spaGrid.includes("Macau premium sauna venue"),
      false,
      `/${locale}/ SpaGrid must not publish the fixed English image alt suffix`,
    );
    assert.ok(html.includes(expected.copyright), `/${locale}/ footer copyright must use localized wording`);
    assert.equal(
      html.includes("All rights reserved."),
      false,
      `/${locale}/ footer must not publish English copyright wording`,
    );
  }
});

test("all active Korean galleries expose specific Korean alternative text and captions", async () => {
  const galleryCounts = {
    "clube-rio": 5,
    "yu-sauna": 10,
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
    "familia-nobre": 9,
    "oceanic-royal-spa": 9,
    "eighteen-sauna": 7,
  };

  let renderedImages = 0;
  for (const [slug, expectedCount] of Object.entries(galleryCounts)) {
    const html = await readPage(koreanLocale, "spa", slug);
    const figures = [...html.matchAll(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi)]
      .map((match) => match[0])
      .filter((figure) => figure.includes("data-gallery-open"));
    const alts = figures.map((figure) =>
      textContent(figure.match(/<img\b(?=[^>]*\balt="([^"]+)")[^>]*>/i)?.[1] ?? ""),
    );
    const captions = figures.map((figure) =>
      textContent(figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] ?? ""),
    );

    assert.equal(alts.length, expectedCount, `${slug} is missing rendered Korean gallery image alt text`);
    assert.equal(captions.length, expectedCount, `${slug} is missing rendered Korean gallery figcaptions`);
    assert.equal(new Set(alts).size, expectedCount, `${slug} repeats Korean gallery image alt text`);
    assert.equal(new Set(captions).size, expectedCount, `${slug} repeats visible Korean gallery captions`);
    for (const [index, alt] of alts.entries()) {
      assert.ok(containsHangul(alt), `${slug} image ${index + 1} alt text is not Korean`);
      assert.ok(containsHangul(captions[index]), `${slug} image ${index + 1} caption is not Korean`);
      assert.notEqual(alt, captions[index], `${slug} image ${index + 1} reuses its alt text as a caption`);
    }
    renderedImages += expectedCount;
  }

  assert.equal(renderedImages, 178, "Korean pages must expose all 178 active gallery descriptions");
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

test("Korean static pages complete the 125-URL sitemap and reciprocal hreflang mesh", async () => {
  const sitemap = await readFile(path.join(distRoot, "sitemap-0.xml"), "utf8");
  const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapLocations.length, 125, "sitemap must list 125 localized canonical URLs");

  const localizedPaths = (await readdir(path.join(distRoot, koreanLocale), { recursive: true }))
    .filter((relativePath) =>
      relativePath === "index.html" || relativePath.endsWith(`${path.sep}index.html`),
    );
  assert.equal(localizedPaths.length, 25, "Korean must ship the same 25 public pages as every other locale");

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
    const segments = suffix ? suffix.slice(0, -1).split("/") : [];
    for (const locale of localeCodes.filter((locale) => locale !== koreanLocale)) {
      const counterpart = await readPage(locale, ...segments);
      assert.equal(
        alternateHref(counterpart, koreanLocale),
        koreanUrl,
        `/${locale}/${suffix} is missing its reciprocal Korean alternate`,
      );
    }
    assert.equal(
      alternateHref(html, "x-default"),
      `${siteOrigin}/en/${suffix}`,
      `${relativePath} is missing its English x-default alternate`,
    );
  }
});
