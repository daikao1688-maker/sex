import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const labels = {
  en: { top: "All articles", bottom: "Back to all articles" },
  "zh-TW": { top: "所有文章", bottom: "返回所有文章" },
  "zh-CN": { top: "所有文章", bottom: "返回所有文章" },
  ja: { top: "記事一覧", bottom: "記事一覧に戻る" },
  ko: { top: "전체 글", bottom: "전체 글 목록으로 돌아가기" },
};

// Catches a missing bottom action, a wrong-language destination, or moving it above related articles.
test("every blog article offers a localized article-list link at both ends", async () => {
  for (const [locale, label] of Object.entries(labels)) {
    const directory = new URL(`../dist/${locale}/blog/`, import.meta.url);
    const entries = await readdir(directory, { withFileTypes: true });
    const posts = entries.filter((entry) => entry.isDirectory());
    assert.ok(posts.length > 0, `${locale} has no blog articles`);

    for (const post of posts) {
      const html = await readFile(new URL(`${post.name}/index.html`, directory), "utf8");
      const article = html.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0] ?? "";
      const links = [...article.matchAll(/<a\b[^>]*\bdata-blog-return-link\b[^>]*>[\s\S]*?<\/a>/g)];
      assert.equal(links.length, 1, `${locale}/${post.name} needs one bottom return link`);
      const [link] = links[0];
      assert.ok(link.includes(`href="/${locale}/blog/"`), "return destination must be the same-language article list");
      assert.ok(link.includes(label.bottom), "bottom link must have localized text");
      const articleLinks = [...article.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)];
      assert.equal(articleLinks.at(-1)?.[0], link, "return action must follow all related article links");
      assert.ok(articleLinks.some(([anchor]) => anchor.includes(`href="/${locale}/blog/"`) && anchor.includes(`>${label.top}</`) && anchor !== link), "existing top article-list link must remain");
      assert.match(link, /\bdata-floating-actions-exclusion\b/);
      const anchorTag = link.match(/^<a\b[^>]*>/)?.[0] ?? "";
      assert.doesNotMatch(anchorTag, /\b(?:onclick|target|aria-hidden|tabindex)=/);
      assert.ok(html.indexOf(link) < html.indexOf("<footer"), "return action must precede footer navigation");
      await assert.doesNotReject(readFile(new URL("index.html", directory)), "article-list destination must exist");
    }
  }
});

test("non-article pages do not gain a blog return action", async () => {
  for (const locale of Object.keys(labels)) {
    for (const route of ["", "blog/", "spa/yu-sauna/"]) {
      const html = await readFile(new URL(`../dist/${locale}/${route}index.html`, import.meta.url), "utf8");
      assert.doesNotMatch(html, /\bdata-blog-return-link\b/);
    }
  }
});
