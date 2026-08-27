import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

const AW_ID = "AW-18409047939";
const conversionSendTos = [
  "AW-18409047939/7SfQCKrtyegcEIOPj8pE", // Telegram
  "AW-18409047939/_-cICM7eyegcEIOPj8pE", // WhatsApp
  "AW-18409047939/QnbSCMbK0-gcEIOPj8pE", // LINE
  "AW-18409047939/vmq_CKCKyugcEIOPj8pE", // WeChat copy button
];

const pagePaths = (locale) => [
  path.join(distRoot, locale, "index.html"),
  path.join(distRoot, locale, "ranking", "index.html"),
  path.join(distRoot, locale, "guide", "index.html"),
  path.join(distRoot, locale, "spa", "majesty-spa", "index.html"),
  path.join(distRoot, locale, "blog", "macau-sauna-august-guide-2026", "index.html"),
  path.join(distRoot, locale, "contact", "index.html"),
];

test("every page ships the Google Ads tag and all four conversion events", async () => {
  for (const locale of locales) {
    for (const pagePath of pagePaths(locale)) {
      const html = await readFile(pagePath, "utf8");
      assert.ok(
        html.includes(`src="https://www.googletagmanager.com/gtag/js?id=${AW_ID}"`),
        `${locale} ${pagePath} is missing the gtag.js loader`,
      );
      assert.ok(html.includes("window.dataLayer = window.dataLayer || []"), `${locale} ${pagePath} is missing the dataLayer stub`);
      assert.ok(html.includes(`gtag("config", "${AW_ID}")`), `${locale} ${pagePath} is missing the gtag config call`);
      for (const sendTo of conversionSendTos) {
        assert.ok(html.includes(sendTo), `${locale} ${pagePath} is missing conversion ${sendTo}`);
      }
    }
  }
});

test("conversion listeners are delegated and cover all four channels", async () => {
  const home = await readFile(path.join(distRoot, "en", "index.html"), "utf8");
  for (const selector of ['a[href*="t.me"]', 'a[href*="wa.me"]', 'a[href*="line.m"]', "button#wechat-copy-btn"]) {
    assert.ok(home.includes(selector), `homepage is missing the ${selector} listener`);
  }
  // One delegated listener, not per-element binding.
  assert.ok(home.includes('document.addEventListener("click"'), "homepage must use a delegated click listener");
});
