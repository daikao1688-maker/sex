import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const slug = "eighteen-sauna";
const leadImage = "macau-sauna-spa-eighteen-gallery-202607-01";

const localeExpectations = {
  en: {
    title: "18 Sauna - Macau Sauna Sites",
    name: "18 Sauna",
    marker: "18 Sauna was a long-established Macau venue on the sixth floor of Hotel Golden Dragon",
    closed: "Temporarily Closed",
  },
  "zh-TW": {
    title: "十八桑拿 - 澳門桑拿導航站",
    name: "十八桑拿",
    marker: "十八桑拿曾設於金龍酒店六樓",
    closed: "暫停營業",
  },
  "zh-CN": {
    title: "十八桑拿 - 澳门桑拿导航站",
    name: "十八桑拿",
    marker: "十八桑拿曾设于金龙酒店六楼",
    closed: "暂停营业",
  },
  ja: {
    title: "18サウナ - マカオ・サウナ・ガイド",
    name: "18サウナ",
    marker: "18サウナ（十八桑拿）は、ホテル・ゴールデン・ドラゴン（金龍酒店）の6階で長く営業していたサウナです。",
    closed: "一時休業中",
  },
};

test("publishes the temporarily closed 18 Sauna venue in all four locales", async () => {
  await Promise.all([
    access(path.join(projectRoot, "public", "covers", "eighteen-sauna-card.jpg")),
    access(path.join(projectRoot, "public", "covers", "eighteen-sauna-card.webp")),
    access(path.join(projectRoot, "public", "media", `${leadImage}-lg.webp`)),
    access(path.join(projectRoot, "public", "media", `${leadImage}-thumb.webp`)),
  ]);

  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const detail = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    const ranking = await readFile(path.join(distRoot, locale, "ranking", "index.html"), "utf8");

    assert.ok(detail.includes(`<title>${expected.title}</title>`), `${locale} has the wrong page title`);
    assert.ok(detail.includes(`>${expected.name}</h1>`), `${locale} is missing the venue heading`);
    assert.ok(detail.includes(expected.marker), `${locale} is missing the editorial introduction`);
    assert.ok(detail.includes("MOP 1,780 - 5,550"), `${locale} is missing the historical price range`);
    assert.ok(detail.includes('data-testid="spa-temporarily-closed-notice"'), `${locale} is missing the closure notice`);
    assert.ok(detail.includes(expected.closed), `${locale} has the wrong closure label`);
    assert.ok(detail.includes('data-testid="spa-temporarily-closed-actions"'), `${locale} still exposes booking actions`);
    assert.ok(detail.includes(`/media/${leadImage}-lg.webp`), `${locale} is not using the supplied lead image`);
    assert.equal(
      (detail.match(/<button[^>]*data-gallery-open/g) ?? []).length,
      7,
      `${locale} does not render all seven photos`,
    );
    assert.ok(home.includes(`/${locale}/spa/${slug}/`), `${locale} homepage is missing the venue`);
    assert.ok(ranking.includes(`/${locale}/spa/${slug}/`), `${locale} ranking is missing the venue`);
  }
});

test("keeps the closed venue out of every Quick Match result list", async () => {
  for (const locale of Object.keys(localeExpectations)) {
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    const quickMatch = home.match(/<section\b[^>]*id="quickmatch"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(quickMatch, `${locale} is missing Quick Match`);
    assert.ok(!quickMatch.includes(`/${locale}/spa/${slug}/`), `${locale} recommends a temporarily closed venue`);
  }
});
