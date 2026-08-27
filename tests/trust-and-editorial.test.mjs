import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const readPage = (locale, ...segments) =>
  readFile(path.join(distRoot, locale, ...segments, "index.html"), "utf8");

const visibleText = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();

const metaDescription = (html) =>
  html.match(/<meta\b(?=[^>]*name="description")(?=[^>]*content="([^"]*)")[^>]*>/)?.[1];

const privacySummary = (html) => {
  const match = html.match(
    /<div\s+class="rounded-2xl border border-gold\/15[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/,
  );
  assert.ok(match, "generated privacy page is missing its summary panel");
  return visibleText(match[1]);
};

const policyExpectations = {
  en: {
    heading: "Editorial and Corrections Policy",
    prices: "Prices and opening status",
    corrections: "Corrections",
    footer: "Editorial policy",
  },
  "zh-TW": {
    heading: "編輯與更正政策",
    prices: "價格與營業狀態",
    corrections: "資料更正",
    footer: "編輯政策",
  },
  "zh-CN": {
    heading: "编辑与更正政策",
    prices: "价格与营业状态",
    corrections: "资料更正",
    footer: "编辑政策",
  },
  ja: {
    heading: "編集・訂正方針",
    prices: "料金と営業状況",
    corrections: "訂正について",
    footer: "編集方針",
  },
};

test("privacy pages omit removed Google tags and still explain every outbound messaging service", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "privacy");
    const text = visibleText(html);

    assert.doesNotMatch(html, /GT-TXHFV3C5|AW-18058018185|data-consent-settings/);
    for (const platform of ["WhatsApp", "WeChat", "Telegram", "LINE"]) {
      assert.ok(text.includes(platform), `${locale} omits outbound handling for ${platform}`);
    }
  }
});

test("privacy summaries distinguish external contact links from the on-site WeChat modal", async () => {
  const expected = {
    en: ["WhatsApp, Telegram and LINE", "WeChat button opens an on-site QR code and account ID modal"],
    "zh-TW": ["WhatsApp、Telegram 及 LINE", "WeChat 按鈕則開啟站內 QR code 與帳戶 ID 視窗"],
    "zh-CN": ["WhatsApp、Telegram 和 LINE", "WeChat 按钮则打开站内二维码与账户 ID 弹窗"],
    ja: ["WhatsApp、Telegram、LINE", "WeChatボタンはサイト内のQRコード・ID画面"],
  };

  for (const [locale, markers] of Object.entries(expected)) {
    const summary = privacySummary(await readPage(locale, "privacy"));
    for (const marker of markers) {
      assert.ok(summary.includes(marker), `${locale} privacy summary omits: ${marker}`);
    }
  }
});

test("each locale publishes an editorial policy covering volatile facts and corrections", async () => {
  for (const [locale, expected] of Object.entries(policyExpectations)) {
    const html = await readPage(locale, "editorial-policy");
    const text = visibleText(html);

    assert.ok(text.includes(expected.heading), `${locale} is missing its policy heading`);
    assert.ok(text.includes(expected.prices), `${locale} does not explain price and status review`);
    assert.ok(text.includes(expected.corrections), `${locale} does not explain corrections`);
    assert.match(html, new RegExp(`href="/${locale}/contact/"`));
    assert.match(html, /https:\/\/www\.dst\.gov\.mo\//);
  }
});

test("venue pages omit the removed source-and-review panel", async () => {
  const headings = /Source and review notes|資料來源與審閱說明|资料来源与审阅说明|情報源と確認状況/;
  for (const locale of locales) {
    for (const slug of ["clube-rio", "eighteen-sauna"]) {
      const html = await readPage(locale, "spa", slug);
      assert.doesNotMatch(html, /data-testid="editorial-evidence"/);
      assert.doesNotMatch(html, headings);
    }
  }
});

test("spa metadata uses readable sentence boundaries instead of fixed-length slicing", async () => {
  for (const locale of locales) {
    const spaRoot = path.join(distRoot, locale, "spa");
    const slugs = (await readdir(spaRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const slug of slugs) {
      const description = metaDescription(await readPage(locale, "spa", slug));
      assert.ok(description, `${locale}/${slug} has no meta description`);
      assert.match(
        description,
        /[.!?。！？]$/u,
        `${locale}/${slug} metadata ends mid-sentence: ${description}`,
      );
      assert.ok(
        description.length <= 200,
        `${locale}/${slug} metadata is not a concise summary (${description.length} characters)`,
      );
    }
  }
});

test("every localized footer links to its editorial policy", async () => {
  for (const [locale, expected] of Object.entries(policyExpectations)) {
    const html = await readPage(locale);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";

    assert.ok(footer.includes(`href="/${locale}/editorial-policy/"`));
    assert.ok(visibleText(footer).includes(expected.footer));
  }
});
