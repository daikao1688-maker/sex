import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const readPage = (locale, ...segments) =>
  readFile(path.join(distRoot, locale, ...segments, "index.html"), "utf8");

const tagWithAttribute = (html, attribute) => {
  const match = html.match(new RegExp(`<[^>]+${attribute}(?:="[^"]*")?[^>]*>`));
  assert.ok(match, `generated page is missing ${attribute}`);
  return match[0];
};

const classList = (tag) => tag.match(/class="([^"]+)"/)?.[1]?.split(/\s+/) ?? [];

test("the blog promotion stays on the article and targets its booking section", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "blog", "macau-sauna-beginner-guide-2026");
    const promo = html.match(/<div[^>]+id="promo-top-bar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? "";

    assert.match(promo, /href="#prepare-booking"/, `${locale} blog promo leaves the article`);
    assert.equal(
      (html.match(/id="prepare-booking"/g) ?? []).length,
      1,
      `${locale} blog must expose one booking-section anchor`,
    );
  }
});

test("non-blog promotion links keep their localized homepage contact target", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "contact");
    const promo = html.match(/<div[^>]+id="promo-top-bar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? "";
    assert.match(promo, new RegExp(`href="/${locale}/#contact"`));
  }
});

test("the navigation uses mobile controls below 1280px and desktop links from 1280px", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    const desktop = classList(tagWithAttribute(html, "data-nav-desktop"));
    const mobileControls = classList(tagWithAttribute(html, "data-nav-mobile-controls"));
    const mobileMenu = classList(tagWithAttribute(html, "data-mobile-menu"));

    assert.ok(desktop.includes("hidden"), `${locale} desktop nav is not hidden below xl`);
    assert.ok(desktop.includes("xl:flex"), `${locale} desktop nav appears before 1280px`);
    assert.ok(mobileControls.includes("xl:hidden"), `${locale} mobile controls disappear before 1280px`);
    assert.ok(mobileMenu.includes("xl:hidden"), `${locale} mobile menu disappears before 1280px`);
    assert.ok(!desktop.includes("md:flex"), `${locale} still switches to desktop navigation at 768px`);
  }
});

test("desktop and mobile navigation use a localized home link instead of the venue anchor", async () => {
  const homeLabels = {
    en: "Home",
    "zh-TW": "首頁",
    "zh-CN": "首页",
    ja: "ホーム",
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    const nav = html.match(/<nav\b[^>]*id="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
    const localizedRoot = `/${locale}/`;

    assert.ok(nav, `${locale} is missing the site navigation`);
    assert.ok(
      (nav.match(new RegExp(`href="${localizedRoot}"`, "g")) ?? []).length >= 3,
      `${locale} brand, desktop home, and mobile home must all target the locale root`,
    );
    assert.equal(
      (nav.match(new RegExp(`>${homeLabels[locale]}<`, "g")) ?? []).length,
      2,
      `${locale} must show the localized home label in desktop and mobile navigation`,
    );
    assert.ok(!nav.includes(`href="/${locale}/#spas"`), `${locale} still uses the venue-section anchor`);
  }
});

test("the VIP table includes a Macau-wide private shuttle worth 500 MOP in every locale", async () => {
  const shuttleLabels = {
    en: "Macau-wide private shuttle",
    "zh-TW": "全澳專車接送",
    "zh-CN": "全澳专车接送",
    ja: "マカオ全域専用車送迎",
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    assert.ok(html.includes("🚗"), `${locale} is missing the shuttle icon`);
    assert.ok(html.includes(shuttleLabels[locale]), `${locale} is missing the localized shuttle service`);
    assert.ok(html.includes("500 MOP"), `${locale} is missing the shuttle value`);
  }
});

test("rewritten service copy does not restore unsupported absolutes or unverifiable counters", async () => {
  const forbiddenByLocale = {
    en: [
      "1,000+ guests served",
      "all 13 licensed",
      "same car and same dedicated driver throughout",
      "We don't just serve. We care about your happiness.",
    ],
    "zh-TW": [
      "已服務 1,000+ 位客人",
      "13 間場館全部包含",
      "同一車同一專屬司機",
      "我們不只是提供服務，我們真心在乎您的快樂。",
    ],
    "zh-CN": [
      "已服务 1,000+ 位客人",
      "13 间场馆全部包含",
      "同一车同一专属司机",
      "我们不只是提供服务，我们真心在乎您的快乐。",
    ],
    ja: [
      "1,000名以上のお客様",
      "ご予約ごとに無料で付く",
      "すべてのお客様に、「まあまあ」ではなく一生忘れられない夜",
    ],
  };

  for (const locale of locales) {
    const pages = await Promise.all([
      readPage(locale),
      readPage(locale, "contact"),
      readPage(locale, "about"),
      readPage(locale, "guide"),
      readPage(locale, "ranking"),
      readPage(locale, "shuttle"),
    ]);
    const renderedCopy = pages.join("\n");

    for (const phrase of forbiddenByLocale[locale]) {
      assert.ok(!renderedCopy.includes(phrase), `${locale} still publishes unsupported claim: ${phrase}`);
    }
  }
});

test("the homepage presents planning scenarios instead of unverifiable customer quotations", async () => {
  const expectedHeading = {
    en: "Questions Worth Sorting Out Before You Go",
    "zh-TW": "出發前，最常需要確認的事",
    "zh-CN": "出发前，最常需要确认的事",
    ja: "出発前によく確認されること",
  };
  const legacySocialProof = {
    en: "Notes from Recent Guests",
    "zh-TW": "旅客回饋",
    "zh-CN": "访客反馈",
    ja: "ご利用前後に寄せられた声",
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    assert.ok(html.includes(expectedHeading[locale]), `${locale} is missing the planning-scenario heading`);
    assert.ok(!html.includes(legacySocialProof[locale]), `${locale} still presents invented social proof`);
  }
});

test("ranking schedules and shuttle wording keep temporary closures and locale conventions clear", async () => {
  const rankingScheduleLabel = {
    en: "24h schedule when operating",
    "zh-TW": "正常營業時 24 小時",
    "zh-CN": "正常营业时 24 小时",
    ja: "営業時は24時間",
  };
  const conciseShuttleTitle = {
    en: "<title>Macau Sauna Shuttle - Macau Sauna Sites</title>",
    "zh-TW": "<title>澳門桑拿接送 - 澳門桑拿導航站</title>",
    "zh-CN": "<title>澳门桑拿接送 - 澳门桑拿导航站</title>",
    ja: "<title>マカオ サウナ送迎 - マカオ・サウナ・ガイド</title>",
  };

  for (const locale of locales) {
    const ranking = await readPage(locale, "ranking");
    const shuttle = await readPage(locale, "shuttle");
    assert.ok(ranking.includes(rankingScheduleLabel[locale]), `${locale} ranking makes a closed venue look open`);
    assert.ok(shuttle.includes(conciseShuttleTitle[locale]), `${locale} shuttle title is not concise`);
  }

  const japaneseShuttle = await readPage("ja", "shuttle");
  assert.ok(!japaneseShuttle.includes("会所"), "Japanese shuttle copy contains a Chinese venue term");
  assert.ok(!japaneseShuttle.includes("關閘"), "Japanese shuttle copy contains a Traditional Chinese place name");
});
