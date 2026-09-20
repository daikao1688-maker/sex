import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

test("non-article pages do not gain a blog return action", async () => {
  for (const locale of locales) {
    for (const route of ["", "blog/", "spa/yu-sauna/"]) {
      const html = await readFile(new URL(`../dist/${locale}/${route}index.html`, import.meta.url), "utf8");
      assert.doesNotMatch(html, /\bdata-blog-return-link\b/);
    }
  }
});
