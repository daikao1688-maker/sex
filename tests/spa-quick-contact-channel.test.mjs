import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const temporarilyClosed = new Set([
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "eighteen-sauna",
]);

async function activeSpaSlugs(locale) {
  const spaRoot = path.join(distRoot, locale, "spa");
  return (await readdir(spaRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !temporarilyClosed.has(entry.name))
    .map((entry) => entry.name);
}

async function quickContactMarkup(locale, slug) {
  const html = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
  const match = html.match(
    /<div data-testid="spa-quick-contact"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  );
  assert.ok(match, `${locale}/${slug} must render the quick-contact panel`);
  return match[0];
}

test("uses WeChat instead of Telegram in Chinese spa quick-contact panels", async () => {
  for (const locale of ["zh-TW", "zh-CN"]) {
    for (const slug of await activeSpaSlugs(locale)) {
      const markup = await quickContactMarkup(locale, slug);
      assert.match(markup, /data-testid="spa-quick-contact-secondary"/);
      assert.match(markup, /data-wechat-trigger/);
      assert.match(markup, /\/icons\/wechat\.svg/);
      assert.match(markup, />微信<\/button>/);
      assert.doesNotMatch(markup, /Telegram|\/icons\/telegram\.svg|t\.me\//);
    }
  }
});

test("keeps Telegram in English and Japanese spa quick-contact panels", async () => {
  for (const locale of ["en", "ja"]) {
    for (const slug of await activeSpaSlugs(locale)) {
      const markup = await quickContactMarkup(locale, slug);
      assert.match(markup, /data-testid="spa-quick-contact-secondary"/);
      assert.match(markup, /\/icons\/telegram\.svg/);
      assert.match(markup, /Telegram/);
      assert.doesNotMatch(markup, /data-wechat-trigger/);
    }
  }
});
