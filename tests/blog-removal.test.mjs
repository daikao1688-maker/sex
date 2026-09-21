import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const projectRoot = new URL("../", import.meta.url);
const distRoot = new URL("dist/", projectRoot);
const removedSlugs = [
  "macau-sauna-august-guide-2026",
  "macau-sauna-market-update-september-2026",
  "macau-sauna-overnight-guide-2026",
];
const emptyMessages = {
  en: "There are currently no articles.",
  "zh-TW": "目前沒有文章。",
  "zh-CN": "目前暂无文章。",
  ja: "現在、掲載中の記事はありません。",
  ko: "현재 게시된 글이 없습니다.",
};
const locales = Object.keys(emptyMessages);

test("removed articles and their images are absent from both source and generated output", async () => {
  for (const slug of removedSlugs) {
    for (const locale of locales) {
      for (const relativePath of [
        `src/content/blog/${locale}/${slug}.md`,
        `dist/${locale}/blog/${slug}/index.html`,
      ]) {
        await assert.rejects(access(new URL(relativePath, projectRoot)), { code: "ENOENT" }, relativePath);
      }
    }
    for (const directory of [`public/blog/${slug}/`, `dist/blog/${slug}/`]) {
      const entries = await readdir(new URL(directory, projectRoot), { recursive: true })
        .catch((error) => {
          if (error.code === "ENOENT") return [];
          throw error;
        });
      assert.deepEqual(entries, [], `${directory} must not retain removed article images`);
    }
  }

  for (const locale of locales) {
    const entries = await readdir(new URL(`${locale}/blog/`, distRoot));
    assert.deepEqual(entries, ["index.html"], `${locale} must not retain cached article pages`);
  }
});

test("all five archives explain their empty state and homepages omit article previews", async () => {
  for (const [locale, emptyMessage] of Object.entries(emptyMessages)) {
    const [archive, home] = await Promise.all([
      readFile(new URL(`${locale}/blog/index.html`, distRoot), "utf8"),
      readFile(new URL(`${locale}/index.html`, distRoot), "utf8"),
    ]);
    const empty = archive.match(/<p\b([^>]*\bdata-blog-empty\b[^>]*)>([\s\S]*?)<\/p>/);
    assert.ok(empty, `${locale} archive must render an empty-state message without JavaScript`);
    assert.equal(empty[2].trim(), emptyMessage);
    assert.doesNotMatch(empty[1], /\b(?:hidden|inert|aria-hidden)\b/, `${locale} empty state must be visible`);
    assert.doesNotMatch(archive, /<[^>]+\bdata-(?:blog-card|blog-filter|filter-cat)\b/);
    assert.doesNotMatch(home, /<[^>]+\bdata-blog-teaser\b/, `${locale} homepage must omit the empty preview`);
    assert.ok(home.includes(`href="/${locale}/blog/"`), `${locale} archive must remain reachable`);

    const schemas = [...archive.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]));
    const blog = schemas.find((schema) => schema["@type"] === "Blog");
    assert.ok(blog, `${locale} archive must retain its Blog identity`);
    assert.deepEqual(blog.blogPost, [], `${locale} schema must not advertise removed articles`);
  }
});

test("generated pages, sitemaps and llms.txt do not advertise removed article URLs or images", async () => {
  const files = (await readdir(distRoot, { recursive: true })).filter((file) =>
    file.endsWith(".html") || /^sitemap.*\.xml$/.test(file) || file === "llms.txt",
  );
  assert.ok(files.includes("sitemap-0.xml"));
  assert.ok(files.includes("llms.txt"));
  assert.equal(files.filter((file) => file.endsWith(".html")).length, 122);
  for (const file of files) {
    const content = await readFile(new URL(file, distRoot), "utf8");
    for (const slug of removedSlugs) {
      assert.ok(!content.includes(slug), `${file} still advertises removed article ${slug}`);
    }
  }
});

test("deployment gone rules match only the removed localized article routes", async () => {
  const config = await readFile(new URL(".htaccess", distRoot), "utf8");
  const rules = [...config.matchAll(/^\s*RedirectMatch\s+410\s+"([^"]+)"\s*$/gm)]
    .map((match) => new RegExp(match[1]));
  assert.ok(rules.length > 0, "deployments must refuse stale copies of the removed articles");
  for (const locale of locales) {
    for (const slug of removedSlugs) {
      for (const suffix of ["", "/", "/index.html"]) {
        const pathname = `/${locale}/blog/${slug}${suffix}`;
        assert.ok(rules.some((rule) => rule.test(pathname)), `${pathname} must return 410`);
      }
    }
    for (const pathname of [
      `/${locale}/`,
      `/${locale}/blog/`,
      `/${locale}/blog/future-article/`,
      `/${locale}/blog/${removedSlugs[0]}-follow-up/`,
      `/${locale}/spa/yu-sauna/`,
    ]) {
      assert.ok(!rules.some((rule) => rule.test(pathname)), `${pathname} must remain outside removal rules`);
    }
  }
  for (const pathname of [
    `/de/blog/${removedSlugs[0]}/`,
    `/blog/${removedSlugs[0]}/`,
  ]) {
    assert.ok(!rules.some((rule) => rule.test(pathname)), `${pathname} is outside the five localized routes`);
  }
});
