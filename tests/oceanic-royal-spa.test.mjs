import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const slug = "oceanic-royal-spa";
const leadImage = "macau-sauna-spa-oceanic-placed-20260624-01";

const localeExpectations = {
  en: {
    title: "Oceanic Royal Spa - Macau Sauna Sites",
    name: "Oceanic Royal Spa",
    marker: "Oceanic Royal Spa is a Taipa venue",
    closed: "Temporarily Closed",
  },
  "zh-TW": {
    title: "帝湖水療 - 澳門桑拿導航站",
    name: "帝湖水療",
    marker: "帝湖水療位於氹仔",
    closed: "暫停營業",
  },
  "zh-CN": {
    title: "帝湖水疗 - 澳门桑拿导航站",
    name: "帝湖水疗",
    marker: "帝湖水疗位于氹仔",
    closed: "暂停营业",
  },
  ja: {
    title: "オーシャニック・ロイヤル・スパ - マカオ・サウナ・ガイド",
    name: "オーシャニック・ロイヤル・スパ",
    marker: "オーシャニック・ロイヤル・スパはタイパ",
    closed: "一時休業中",
  },
};

test("publishes Oceanic Royal Spa in all locales with its own imagery and temporary-closure state", async () => {
  await Promise.all([
    access(path.join(projectRoot, "public", "covers", `${slug}-card.jpg`)),
    access(path.join(projectRoot, "public", "covers", `${slug}-card.webp`)),
    access(path.join(projectRoot, "public", "media", `${leadImage}-lg.webp`)),
    access(path.join(projectRoot, "public", "media", `${leadImage}-thumb.webp`)),
  ]);

  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const page = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");

    assert.ok(page.includes(`<title>${expected.title}</title>`), `${locale} has the wrong page title`);
    assert.ok(page.includes(`<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">${expected.name}</h1>`), `${locale} is missing the venue heading`);
    assert.ok(page.includes(expected.marker), `${locale} is missing the venue introduction`);
    assert.ok(page.includes("MOP 2,299 - 7,099"), `${locale} is missing the public price range`);
    assert.ok(page.includes(`data-testid="spa-temporarily-closed-notice"`), `${locale} is missing the closure notice`);
    assert.ok(page.includes(expected.closed), `${locale} has the wrong closure label`);
    assert.ok(page.includes(`data-testid="spa-temporarily-closed-actions"`), `${locale} still exposes booking actions`);
    assert.ok(page.includes(`/media/${leadImage}-lg.webp`), `${locale} is not using the supplied lead image`);
    assert.ok(home.includes(`/spa/${slug}/`), `${locale} homepage is missing the venue card`);
  }
});

test("renders the closed Oceanic Royal Spa homepage card without a glow frame", async () => {
  for (const locale of Object.keys(localeExpectations)) {
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    const venuePath = `/${locale}/spa/${slug}/`;

    // Closed venues now live inside the consolidated paused card; that card
    // carries the plain frame and no glow, and keeps the venue linked.
    const pausedCard = home.match(/<div\b[^>]*data-testid="spa-paused-card"[^>]*>/g)?.[0];
    assert.ok(pausedCard, `${locale} homepage is missing the paused-venues card`);
    assert.match(pausedCard, /\bborder-gold\/25\b/, `${locale} paused card is not using the plain frame`);
    assert.doesNotMatch(pausedCard, /\bglow-(?:red|gold|silver)\b/, `${locale} paused card still uses a glow frame`);
    assert.ok(home.includes(`href="${venuePath}"`), `${locale} paused card is missing the Oceanic Royal Spa link`);
  }
});
