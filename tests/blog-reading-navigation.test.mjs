import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const globalCssPath = path.join(projectRoot, "src", "styles", "global.css");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

test("Markdown tables keep narrow-screen overflow inside the table", async () => {
  const css = await readFile(globalCssPath, "utf8");
  const tableRule = css.match(/\.rm-paper \.prose-paper table\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(tableRule, /display:\s*block/, "Markdown tables need an independent scroll box");
  assert.match(tableRule, /max-width:\s*100%/, "Markdown tables must stay inside the article column");
  assert.match(tableRule, /overflow-x:\s*auto/, "wide Markdown tables must scroll horizontally");
  assert.match(
    tableRule,
    /overscroll-behavior-inline:\s*contain/,
    "horizontal table gestures must not move the whole page",
  );
});

test("empty blog archives do not mount article-only reading navigation", async () => {
  for (const locale of locales) {
    const html = await readFile(path.join(distRoot, locale, "blog", "index.html"), "utf8");
    assert.match(html, /<p\b[^>]*\bdata-blog-empty\b/);
    assert.doesNotMatch(
      html,
      /<[^>]+\bdata-blog-(?:toc-mobile|toc-track|toc-link|body|reading-end)\b/,
      `${locale} empty archive must not expose article controls or empty reading targets`,
    );
  }
});
