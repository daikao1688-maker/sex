import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const slug = "macau-sauna-market-update-september-2026";
const articleUrl = `https://macao-sex.com/zh-TW/blog/${slug}/`;

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

test("the September market report is the newest Traditional Chinese article on every discovery surface", async () => {
  const [article, listing, sitemap, llms] = await Promise.all([
    readOptional("zh-TW", "blog", slug, "index.html"),
    readOptional("zh-TW", "blog", "index.html"),
    readOptional("sitemap-0.xml"),
    readOptional("llms.txt"),
  ]);

  assert.ok(article, `/${slug}/ was not generated`);
  assert.ok(listing.indexOf(`href="/zh-TW/blog/${slug}/"`) >= 0, "blog listing is missing the report");
  assert.ok(
    listing.indexOf(`href="/zh-TW/blog/${slug}/"`) <
      listing.indexOf('href="/zh-TW/blog/macau-sauna-overnight-guide-2026/"'),
    "the September report is not the newest Traditional Chinese card",
  );
  assert.match(sitemap, new RegExp(`<loc>${articleUrl}</loc>`));
  assert.match(llms.replace(/^\uFEFF/, ""), new RegExp(`\\(${articleUrl}\\)`));

  const alternates = [...article.matchAll(/<link\b[^>]*rel="alternate"[^>]*hreflang="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(alternates.sort(), ["x-default", "zh-TW"], "untranslated locales must not be advertised");
});

test("the September market report renders editorial content with valid article semantics and media", async () => {
  const article = await readOptional("zh-TW", "blog", slug, "index.html");
  assert.ok(article, `/${slug}/ was not generated`);

  assert.equal((article.match(/<h1\b/g) ?? []).length, 1, "article must render exactly one H1");
  assert.ok((article.match(/<h2\b/g) ?? []).length >= 12, "major report sections must feed the reading directory");
  assert.doesNotMatch(article, />\s*(?:SEO標題|Meta描述|建議網址別名|文章核心關鍵字)\s*</);

  for (const href of [
    "/zh-TW/spa/yu-sauna/",
    "/zh-TW/spa/empire-sauna/",
    "/zh-TW/spa/shang-pin-spa/",
    "/zh-TW/spa/majesty-spa/",
    "/zh-TW/spa/manhao-spa/",
    "/zh-TW/spa/east-castle-spa/",
    "/zh-TW/spa/number-nine-sauna/",
    "/zh-TW/spa/victoria-sauna/",
    "/zh-TW/spa/the-excellent-sauna/",
  ]) {
    assert.match(article, new RegExp(`href="${href}"`), `article is missing ${href}`);
  }

  assert.doesNotMatch(
    article,
    /\*\*<a\b[^>]*>[^<]+<\/a>\*\*/,
    "bold venue links must render as HTML instead of exposing Markdown markers",
  );
  assert.match(
    article,
    /<a href="\/zh-TW\/spa\/yu-sauna\/"><strong>八湯御桑拿<\/strong><\/a>/,
    "the lead venue link should retain its intended emphasis",
  );

  const hero = article.match(/<img\b(?=[^>]*fetchpriority="high")[^>]*>/)?.[0] ?? "";
  assert.match(hero, /src="\/blog\/macau-sauna-august-guide-2026\/01-macau-sauna-majesty-spa-pool\.webp"/);
  assert.match(hero, /01-macau-sauna-majesty-spa-pool-640\.webp 640w/);
  assert.match(hero, /width="1280"/);
  assert.match(hero, /height="720"/);

  const blogPosting = schemas(article).find((schema) => schema["@type"] === "BlogPosting");
  assert.ok(blogPosting, "article is missing BlogPosting structured data");
  assert.equal(blogPosting.datePublished, "2026-09-01");
  assert.equal(blogPosting.dateModified, "2026-09-01");
  assert.equal(blogPosting.mainEntityOfPage, articleUrl);
});
