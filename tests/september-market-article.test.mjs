import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const siteOrigin = (process.env.PUBLIC_SITE_ORIGIN ?? "https://macao-sex.com").replace(/\/$/, "");
const slug = "macau-sauna-market-update-september-2026";
const cover = "/blog/" + slug + "/01-macau-sauna-theme-room-costume-experience.webp";
const responsiveCover =
  "/blog/" + slug + "/01-macau-sauna-theme-room-costume-experience-640.webp";
const localeExpectations = {
  en: {
    title: "Macau Sauna Market Update — September 2026",
    heading: /Macau Sauna Market.*September 2026/i,
    leadVenue: "Yu Sauna",
    coverAlt:
      "Three adult women in a Macau theme room, one in nurse-inspired attire, one in police-inspired attire and one in secretary attire.",
  },
  "zh-TW": {
    title: "澳門桑拿市場近況2026年9月｜八湯御開業、凱旋回歸與各場館最新分析",
    heading: /2026年9月澳門桑拿市場/,
    leadVenue: "八湯御桑拿",
    coverAlt: "澳門桑拿主題房內三位成年女性分別穿著護士、警察與秘書造型服裝。",
  },
  "zh-CN": {
    title: "澳门桑拿市场近况2026年9月｜八汤御开业、凯旋回归与各场馆最新分析",
    heading: /2026年9月澳门桑拿市场/,
    leadVenue: "八汤御桑拿",
    coverAlt: "澳门桑拿主题房内三位成年女性分别穿着护士、警察与秘书造型服装。",
  },
  ja: {
    title: "マカオ サウナ市場2026年9月最新動向｜YU SAUNA開業・ヴィクトリアサウナ再開と店舗別分析",
    heading: /2026年9月.*マカオ サウナ市場/,
    leadVenue: "YU SAUNA（八湯御桑拿）",
    coverAlt: "テーマルームで、3人の成人女性がそれぞれナース風、警察官風、秘書風の衣装を着ている様子。",
  },
  ko: {
    title: "마카오 사우나 시장 2026년 9월 최신 동향: YU SAUNA 개장·Victoria Sauna 재영업과 매장별 분석",
    heading: /2026년 9월.*마카오 사우나 시장/,
    leadVenue: "YU SAUNA",
    coverAlt: "테마룸에서 각각 간호사풍, 경찰풍, 비서풍 의상을 입은 성인 여성 세 명.",
  },
};
const locales = Object.keys(localeExpectations);
const venueSlugs = [
  "yu-sauna",
  "empire-sauna",
  "shang-pin-spa",
  "majesty-spa",
  "manhao-spa",
  "east-castle-spa",
  "number-nine-sauna",
  "victoria-sauna",
  "the-excellent-sauna",
];

const escapeRegex = (value) => value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

const readOptional = async (...segments) => {
  try {
    return await readFile(path.join(distRoot, ...segments), "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
};

const schemas = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );

const alternateHref = (html, hreflang) =>
  html.match(
    new RegExp(
      '<link\\b(?=[^>]*\\brel="alternate")(?=[^>]*\\bhreflang="' +
        escapeRegex(hreflang) +
        '")(?=[^>]*\\bhref="([^"]+)")[^>]*>',
    ),
  )?.[1];

const metaContent = (html, key, value) => {
  const tag = html.match(
    new RegExp('<meta\\b(?=[^>]*\\b' + key + '="' + escapeRegex(value) + '")[^>]*>'),
  )?.[0];
  return tag?.match(/\bcontent="([^"]*)"/)?.[1];
};

const imageTagsForSource = (html, source) =>
  [...html.matchAll(new RegExp('<img\\b(?=[^>]*\\bsrc="' + escapeRegex(source) + '")[^>]*>', "g"))].map(
    (match) => match[0],
  );

const sitemapEntry = (sitemap, location) =>
  [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((match) => match[1])
    .find((entry) => entry.includes("<loc>" + location + "</loc>")) ?? "";

const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

test("the September market report is published on every localized discovery surface", async () => {
  const [sitemap, llms] = await Promise.all([
    readOptional("sitemap-0.xml"),
    readOptional("llms.txt"),
  ]);

  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const [article, listing] = await Promise.all([
      readOptional(locale, "blog", slug, "index.html"),
      readOptional(locale, "blog", "index.html"),
    ]);
    const localizedPath = "/" + locale + "/blog/" + slug + "/";
    const articleUrl = siteOrigin + localizedPath;

    assert.ok(article, localizedPath + " was not generated");
    assert.match(article, new RegExp(escapeRegex(expected.title)));
    assert.ok(listing.includes('href="' + localizedPath + '"'), locale + " blog listing is missing the report");
    assert.ok(
      listing.indexOf('href="' + localizedPath + '"') <
        listing.indexOf('href="/' + locale + '/blog/macau-sauna-overnight-guide-2026/"'),
      locale + " does not list the September report first",
    );
    assert.match(sitemap, new RegExp("<loc>" + escapeRegex(articleUrl) + "</loc>"));
    assert.match(llms.replace(/^\uFEFF/, ""), new RegExp("\\(" + escapeRegex(articleUrl) + "\\)"));

    for (const alternateLocale of locales) {
      assert.equal(
        alternateHref(article, alternateLocale),
        siteOrigin + "/" + alternateLocale + "/blog/" + slug + "/",
        locale + " is missing reciprocal " + alternateLocale + " hreflang",
      );
    }
    assert.equal(
      alternateHref(article, "x-default"),
      siteOrigin + "/en/blog/" + slug + "/",
      locale + " x-default must resolve to English",
    );

    const sitemapGroup = sitemapEntry(sitemap, articleUrl);
    assert.ok(sitemapGroup, locale + " sitemap group is missing");
    const sitemapAlternateMatches = [...sitemapGroup.matchAll(/<xhtml:link\b[^>]*>/g)].map(
      (match) => {
        const tag = match[0];
        return [tag.match(/\bhreflang="([^"]+)"/)?.[1], tag.match(/\bhref="([^"]+)"/)?.[1]];
      },
    );
    assert.equal(sitemapAlternateMatches.length, 5, locale + " sitemap group must have five alternates");
    assert.equal(
      new Set(sitemapAlternateMatches.map(([hreflang]) => hreflang)).size,
      5,
      locale + " sitemap group contains duplicate hreflang values",
    );
    const sitemapAlternates = Object.fromEntries(
      sitemapAlternateMatches,
    );
    assert.deepEqual(
      sitemapAlternates,
      Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          siteOrigin + "/" + alternateLocale + "/blog/" + slug + "/",
        ]),
      ),
      locale + " sitemap group does not expose all five localized articles",
    );
  }
});

test("the English report uses concise search metadata without shortening its editorial headline", async () => {
  const article = await readOptional("en", "blog", slug, "index.html");
  const title = article.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
  const description = metaContent(article, "name", "description") ?? "";
  const h1 = article.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").trim() ?? "";

  assert.ok(title.length <= 70, `English title is ${title.length} characters`);
  assert.ok(description.length <= 160, `English description is ${description.length} characters`);
  assert.match(h1, /Nine Major Venues Assessed/);
});

test("each localized September report preserves the editorial structure and local venue links", async () => {
  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const article = await readOptional(locale, "blog", slug, "index.html");
    const articleUrl = siteOrigin + "/" + locale + "/blog/" + slug + "/";
    const articleBody =
      article.match(/<div\b(?=[^>]*\bdata-blog-body\b)[^>]*>([\s\S]*?)<div\b[^>]*\bdata-blog-reading-end\b/)?.[1] ??
      "";

    assert.ok(article, "/" + locale + "/blog/" + slug + "/ was not generated");
    assert.ok(articleBody, locale + " article body could not be isolated");
    assert.equal((article.match(/<h1\b/g) ?? []).length, 1, locale + " must render exactly one H1");
    assert.equal((articleBody.match(/<h2\b/g) ?? []).length, 13, locale + " must render all 13 report sections");
    assert.equal((articleBody.match(/<h3\b/g) ?? []).length, 16, locale + " must render all 16 subsections");
    assert.match(articleBody, expected.heading, locale + " headings are not naturally localized");
    assert.doesNotMatch(articleBody, />\s*(?:SEO標題|Meta描述|建議網址別名|文章核心關鍵字)\s*</);
    if (locale !== "zh-TW") {
      assert.doesNotMatch(articleBody, /href="\/zh-TW\//, locale + " contains a leftover zh-TW link");
    }

    const articleHrefs = [...articleBody.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(
      (match) => match[1],
    );
    const expectedVenueHrefs = venueSlugs.map(
      (venueSlug) => "/" + locale + "/spa/" + venueSlug + "/",
    );
    assert.equal(articleHrefs.length, 9, locale + " must contain exactly nine article links");
    assert.equal(new Set(articleHrefs).size, 9, locale + " contains duplicate article links");
    assert.deepEqual(articleHrefs.slice().sort(), expectedVenueHrefs.slice().sort());

    for (const venueSlug of venueSlugs) {
      assert.match(
        articleBody,
        new RegExp('href="/' + escapeRegex(locale) + "/spa/" + escapeRegex(venueSlug) + '/"'),
        locale + " article is missing /" + locale + "/spa/" + venueSlug + "/",
      );
    }

    assert.doesNotMatch(
      articleBody,
      /\*\*<a\b[^>]*>[^<]+<\/a>\*\*/,
      locale + " exposes Markdown emphasis markers",
    );
    assert.match(
      articleBody,
      new RegExp(
        '<a href="/' +
          escapeRegex(locale) +
          '/spa/yu-sauna/"><strong>' +
          escapeRegex(expected.leadVenue) +
          "<\\/strong><\\/a>",
      ),
      locale + " lead venue link should retain emphasis and its localized name",
    );

    const blogPosting = schemas(article).find((schema) => schema["@type"] === "BlogPosting");
    assert.ok(blogPosting, locale + " is missing BlogPosting structured data");
    assert.equal(blogPosting.datePublished, "2026-09-01");
    assert.equal(blogPosting.dateModified, "2026-09-01");
    assert.equal(blogPosting.inLanguage, locale);
    assert.equal(blogPosting.mainEntityOfPage, articleUrl);
    assert.equal(blogPosting.image, siteOrigin + cover);
    assert.equal(metaContent(article, "property", "og:type"), "article");
    assert.equal(metaContent(article, "property", "article:published_time"), "2026-09-01");
    assert.equal(metaContent(article, "property", "article:modified_time"), "2026-09-01");
  }
});

test("the September report uses one truthful responsive cover across all languages", async () => {
  const [largeBuffer, smallBuffer, distLargeBuffer, distSmallBuffer] = await Promise.all([
    readFile(path.join(projectRoot, "public", cover)),
    readFile(path.join(projectRoot, "public", responsiveCover)),
    readFile(path.join(distRoot, cover)),
    readFile(path.join(distRoot, responsiveCover)),
  ]);
  const [large, small] = await Promise.all([
    sharp(largeBuffer).metadata(),
    sharp(smallBuffer).metadata(),
  ]);
  assert.deepEqual([large.width, large.height, large.format], [1280, 720, "webp"]);
  assert.deepEqual([small.width, small.height, small.format], [640, 360, "webp"]);
  assert.equal(sha256(largeBuffer), "50b94aca27445f89505ea836d59e5494c78a07721a5c9320cd50bdf38dc8925a");
  assert.equal(sha256(smallBuffer), "b224d85716c49fb5277ba32bd47eb16905e62fe695eba799075739af5b359f1b");
  assert.equal(sha256(distLargeBuffer), sha256(largeBuffer));
  assert.equal(sha256(distSmallBuffer), sha256(smallBuffer));

  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const article = await readOptional(locale, "blog", slug, "index.html");
    const hero = article.match(/<img\b(?=[^>]*fetchpriority="high")[^>]*>/)?.[0] ?? "";
    assert.ok(hero.includes('src="' + cover + '"'), locale + " uses the wrong hero image");
    assert.ok(hero.includes(responsiveCover + " 640w"), locale + " is missing the responsive hero");
    assert.match(hero, /width="1280"/);
    assert.match(hero, /height="720"/);
    assert.ok(hero.includes('alt="' + expected.coverAlt + '"'));
    assert.equal(metaContent(article, "property", "og:image"), siteOrigin + cover);
    assert.equal(metaContent(article, "property", "og:image:width"), "1280");
    assert.equal(metaContent(article, "property", "og:image:height"), "720");
    assert.equal(metaContent(article, "property", "og:image:alt"), expected.coverAlt);
    assert.equal(metaContent(article, "name", "twitter:image"), siteOrigin + cover);
    assert.equal(metaContent(article, "name", "twitter:image:alt"), expected.coverAlt);

    for (const [surface, html] of await Promise.all([
      readOptional(locale, "blog", "index.html").then((html) => ["blog listing", html]),
      readOptional(locale, "index.html").then((html) => ["homepage teaser", html]),
    ])) {
      const cardImages = imageTagsForSource(html, cover);
      assert.equal(cardImages.length, 1, locale + " " + surface + " must render the new cover exactly once");
      const [cardImage] = cardImages;
      assert.ok(cardImage, locale + " " + surface + " is missing the new cover");
      assert.ok(cardImage.includes(responsiveCover + " 640w"), locale + " " + surface + " lacks 640w srcset");
      assert.ok(cardImage.includes(cover + " 1280w"), locale + " " + surface + " lacks 1280w srcset");
      assert.match(cardImage, /\bsizes="[^"]+"/);
      assert.match(cardImage, /\bwidth="1280"/);
      assert.match(cardImage, /\bheight="720"/);
      assert.ok(cardImage.includes('alt="' + expected.coverAlt + '"'));
    }
  }
});
