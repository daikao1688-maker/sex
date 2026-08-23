import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const readPage = (...segments) => readFile(path.join(distRoot, ...segments, "index.html"), "utf8");
const readSource = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

test("privacy consent UI and Google tag loader are absent in every locale", async () => {
  const forbidden = [
    /data-consent-panel/,
    /data-consent-accept/,
    /data-consent-decline/,
    /data-consent-settings/,
    /data-analytics-loader/,
    /googletagmanager\.com/,
    /GT-TXHFV3C5/,
    /AW-18058018185/,
  ];

  for (const locale of locales) {
    const pages = await Promise.all([
      readPage(locale),
      readPage(locale, "about"),
      readPage(locale, "privacy"),
    ]);
    for (const html of pages) {
      for (const pattern of forbidden) assert.doesNotMatch(html, pattern, `${locale} still renders ${pattern}`);
    }
  }
});

test("every localized venue page omits the editorial evidence panel", async () => {
  const headings = /資料來源與審閱說明|资料来源与审阅说明|Sources and review notes|情報源と確認状況/;
  for (const locale of locales) {
    const spaRoot = path.join(distRoot, locale, "spa");
    const entries = await readdir(spaRoot, { withFileTypes: true });
    for (const entry of entries.filter((candidate) => candidate.isDirectory())) {
      const html = await readPage(locale, "spa", entry.name);
      assert.doesNotMatch(html, /data-testid="editorial-evidence"/);
      assert.doesNotMatch(html, headings);
    }
  }
});

test("hero keeps automatic rotation without exposing a pause control", async () => {
  const source = await readSource("src/components/Hero.astro");
  assert.doesNotMatch(source, /data-hero-motion-toggle|data-hero-motion-icon|manuallyPaused/);
  assert.match(source, /}, 6000\);/);
  assert.match(source, /}, 4500\);/);
  for (const locale of locales) assert.doesNotMatch(await readPage(locale), /data-hero-motion-toggle/);
});

test("best-of-month constrains its mobile carousel inside a zero-minimum grid track", async () => {
  const source = await readSource("src/components/BestOfMonth.astro");
  assert.match(source, /grid-cols-\[minmax\(0,1fr\)\]/);
  assert.match(source, /data-bom-deck[\s\S]*?min-w-0/);
  assert.match(source, /class="bom-track[^\"]*\bmin-w-0\b[^\"]*\bw-full\b/);
});
