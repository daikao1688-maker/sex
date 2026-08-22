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

const region = (html, testId) => {
  const match = html.match(
    new RegExp(`<aside\\b[^>]*data-testid="${testId}"[\\s\\S]*?<\\/aside>`),
  );
  assert.ok(match, `generated page is missing ${testId}`);
  return match[0];
};

const metaDescription = (html) =>
  html.match(/<meta\b(?=[^>]*name="description")(?=[^>]*content="([^"]*)")[^>]*>/)?.[1];

const policyExpectations = {
  en: {
    heading: "Editorial and Corrections Policy",
    prices: "Prices and opening status",
    corrections: "Corrections",
    footer: "Editorial policy",
    evidence: "Source and review notes",
    current: "not independently verified",
    closed: "marked temporarily closed",
  },
  "zh-TW": {
    heading: "編輯與更正政策",
    prices: "價格與營業狀態",
    corrections: "資料更正",
    footer: "編輯政策",
    evidence: "資料來源與審閱說明",
    current: "尚未經場館官方資料獨立核實",
    closed: "標示為暫停營業",
  },
  "zh-CN": {
    heading: "编辑与更正政策",
    prices: "价格与营业状态",
    corrections: "资料更正",
    footer: "编辑政策",
    evidence: "资料来源与审阅说明",
    current: "尚未通过场馆官方资料独立核实",
    closed: "标示为暂停营业",
  },
  ja: {
    heading: "編集・訂正方針",
    prices: "料金と営業状況",
    corrections: "訂正について",
    footer: "編集方針",
    evidence: "情報源と確認状況",
    current: "店舗公式情報による独立確認はできていません",
    closed: "一時休業として掲載",
  },
};

test("privacy pages disclose the deployed Google tags and every outbound messaging service", async () => {
  for (const locale of locales) {
    const text = visibleText(await readPage(locale, "privacy"));

    assert.ok(text.includes("GT-TXHFV3C5"), `${locale} omits the deployed Google tag`);
    assert.ok(text.includes("AW-18058018185"), `${locale} omits the deployed Google Ads tag`);
    for (const platform of ["WhatsApp", "WeChat", "Telegram", "LINE"]) {
      assert.ok(text.includes(platform), `${locale} omits outbound handling for ${platform}`);
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

test("venue pages show dated evidence notes without presenting profile facts as officially verified", async () => {
  for (const [locale, expected] of Object.entries(policyExpectations)) {
    const activeEvidence = region(await readPage(locale, "spa", "clube-rio"), "editorial-evidence");
    const closedEvidence = region(await readPage(locale, "spa", "eighteen-sauna"), "editorial-evidence");
    const activeText = visibleText(activeEvidence);
    const closedText = visibleText(closedEvidence);

    assert.ok(activeText.includes(expected.evidence), `${locale} lacks an evidence heading`);
    assert.ok(activeText.includes("2026-08-22"), `${locale} lacks the stable audit date`);
    assert.ok(activeText.includes(expected.current), `${locale} overstates venue-specific verification`);
    assert.ok(closedText.includes(expected.closed), `${locale} obscures the closed-profile marker`);
    assert.match(activeEvidence, /https:\/\/www\.dst\.gov\.mo\//);
    assert.doesNotMatch(activeEvidence, /licen[cs]e\s*(?:no\.?|number|#)/i);
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
