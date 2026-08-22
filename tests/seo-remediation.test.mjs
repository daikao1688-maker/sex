import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const siteOrigin = new URL(
  process.env.PUBLIC_SITE_ORIGIN ?? "https://yongjiu-1z5.pages.dev",
).origin;

const locales = {
  en: "en_US",
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
  ja: "ja_JP",
};

const closedVenueSlugs = [
  "victoria-sauna",
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "eighteen-sauna",
];

const readPage = (...segments) =>
  readFile(path.join(distRoot, ...segments, "index.html"), "utf8");

const attributeValues = (html, selectorPattern, attribute) =>
  [...html.matchAll(new RegExp(`<${selectorPattern}[^>]*\\b${attribute}="([^"]+)"[^>]*>`, "g"))].map(
    (match) => match[1],
  );

const canonicalHref = (html) =>
  html.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/)?.[1];

const metaContent = (html, attribute, value) =>
  html.match(
    new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${value}")(?=[^>]*\\bcontent="([^"]*)")[^>]*>`),
  )?.[1];

const schemas = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );

const schemaOfType = (html, type) => {
  const schema = schemas(html).find((candidate) => candidate["@type"] === type);
  assert.ok(schema, `generated page is missing ${type} schema`);
  return schema;
};

const internalSchemaUrlProperties = new Set([
  "@id",
  "image",
  "item",
  "logo",
  "mainEntityOfPage",
  "url",
]);

const internalSchemaUrls = (value, property = "") => {
  if (typeof value === "string") {
    return internalSchemaUrlProperties.has(property) && value.startsWith("http") ? [value] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => internalSchemaUrls(item, property));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => internalSchemaUrls(item, key));
  }
  return [];
};

test("canonical, social, and structured-data URLs use the configured site origin", async () => {
  const pages = await Promise.all([
    readPage("en"),
    readPage("zh-TW", "privacy"),
    readPage("zh-CN", "ranking"),
    readPage("ja", "spa", "clube-rio"),
    readPage("en", "blog", "macau-sauna-beginner-guide-2026"),
  ]);

  for (const html of pages) {
    const canonical = canonicalHref(html);
    assert.ok(canonical?.startsWith(`${siteOrigin}/`), `canonical does not use ${siteOrigin}`);
    assert.equal(metaContent(html, "property", "og:url"), canonical);
    assert.ok(metaContent(html, "property", "og:image")?.startsWith(`${siteOrigin}/`));

    for (const url of internalSchemaUrls(schemas(html))) {
      assert.ok(url.startsWith(`${siteOrigin}/`), `schema URL does not use ${siteOrigin}: ${url}`);
    }
  }
});

test("the generated sitemap, robots file, and head declaration share one origin", async () => {
  const [home, sitemapIndex, sitemap, robots] = await Promise.all([
    readPage("en"),
    readFile(path.join(distRoot, "sitemap-index.xml"), "utf8"),
    readFile(path.join(distRoot, "sitemap-0.xml"), "utf8"),
    readFile(path.join(distRoot, "robots.txt"), "utf8"),
  ]);

  assert.match(home, /<link\b(?=[^>]*rel="sitemap")(?=[^>]*href="\/sitemap-index\.xml")[^>]*>/);
  assert.match(sitemapIndex, new RegExp(`<loc>${siteOrigin}/sitemap-0\\.xml</loc>`));
  assert.match(robots, new RegExp(`Sitemap: ${siteOrigin}/sitemap-index\\.xml`));

  const sitemapUrls = [
    ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
    ...[...sitemap.matchAll(/<xhtml:link\b[^>]*href="([^"]+)"/g)].map((match) => match[1]),
  ];
  assert.ok(sitemapUrls.length > 0, "sitemap contains no page URLs");
  assert.ok(
    sitemapUrls.every((url) => url.startsWith(`${siteOrigin}/`)),
    "sitemap mixes deployment origins",
  );
  for (const locale of Object.keys(locales)) {
    assert.ok(sitemap.includes(`/${locale}/`), `sitemap is missing ${locale} pages`);
    assert.ok(sitemap.includes(`hreflang="${locale}"`), `sitemap is missing ${locale} alternates`);
  }
});

test("social metadata includes every other Open Graph locale and an image alternative", async () => {
  for (const [locale, ogLocale] of Object.entries(locales)) {
    const html = await readPage(locale);
    assert.equal(metaContent(html, "property", "og:locale"), ogLocale);

    const alternates = attributeValues(html, 'meta\\b[^>]*property="og:locale:alternate"', "content");
    assert.deepEqual(
      alternates.sort(),
      Object.values(locales).filter((value) => value !== ogLocale).sort(),
      `${locale} does not expose the other Open Graph locales`,
    );

    const ogImageAlt = metaContent(html, "property", "og:image:alt");
    assert.ok(ogImageAlt, `${locale} has no Open Graph image alternative`);
    assert.equal(metaContent(html, "name", "twitter:image:alt"), ogImageAlt);
  }
});

test("privacy pages publish WebPage structured data", async () => {
  for (const locale of Object.keys(locales)) {
    const html = await readPage(locale, "privacy");
    assert.equal(schemas(html).some((schema) => schema["@type"] === "PrivacyPolicy"), false);
    const privacy = schemaOfType(html, "WebPage");
    assert.equal(privacy.url, `${siteOrigin}/${locale}/privacy/`);
    assert.equal(privacy.inLanguage, locale);
  }
});

test("blog structured data uses existing organization identities and an honest modification date", async () => {
  const html = await readPage("en", "blog", "macau-sauna-beginner-guide-2026");
  const article = schemaOfType(html, "BlogPosting");

  assert.equal(article.datePublished, "2026-07-17");
  assert.equal(article.dateModified, article.datePublished);
  assert.deepEqual(article.author, { "@type": "Organization", name: "Relax Macau Team" });
  assert.equal(article.publisher?.["@id"], `${siteOrigin}/#organization`);
  assert.equal(article.publisher?.name, "Macau Sauna Sites");
});

test("closed venue schema omits current commercial and opening claims", async () => {
  for (const slug of closedVenueSlugs) {
    const html = await readPage("en", "spa", slug);
    const business = schemaOfType(html, "LocalBusiness");

    for (const property of [
      "priceRange",
      "offers",
      "makesOffer",
      "openingHours",
      "openingHoursSpecification",
    ]) {
      assert.equal(property in business, false, `${slug} still publishes ${property}`);
    }
  }

  const active = schemaOfType(await readPage("en", "spa", "clube-rio"), "LocalBusiness");
  assert.ok(active.priceRange, "active venues lost priceRange");
  assert.ok(active.makesOffer, "active venues lost their offer schema");
});

test("current ranking ItemLists exclude closed venues without hiding them from the page", async () => {
  const html = await readPage("en", "ranking");
  const ranking = schemaOfType(html, "ItemList");
  const itemUrls = ranking.itemListElement.map((item) => item.url);

  for (const slug of closedVenueSlugs) {
    assert.equal(itemUrls.some((url) => url.endsWith(`/spa/${slug}/`)), false, `${slug} remains ranked`);
    assert.ok(html.includes(`href="/en/spa/${slug}/"`), `${slug} disappeared from the visible comparison`);
  }
  assert.deepEqual(
    ranking.itemListElement.map((item) => item.position),
    ranking.itemListElement.map((_, index) => index + 1),
  );
});
