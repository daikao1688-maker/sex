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

const regionBetween = (html, startMarker, endMarker) => {
  const start = html.indexOf(startMarker);
  assert.notEqual(start, -1, `generated page is missing ${startMarker}`);
  const end = html.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `generated page is missing ${endMarker} after ${startMarker}`);
  return html.slice(start, end);
};

test("the blog promotion stays on the article and targets its booking section", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "blog", "macau-sauna-august-guide-2026");
    const promo = html.match(/<div[^>]+id="promo-top-bar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? "";

    assert.match(promo, /href="#prepare-booking"/, `${locale} blog promo leaves the article`);
    assert.equal(
      (html.match(/id="prepare-booking"/g) ?? []).length,
      1,
      `${locale} blog must expose one booking-section anchor`,
    );
  }
});

test("non-blog promotion links scroll to the page's own contact section", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "contact");
    const promo = html.match(/<div[^>]+id="promo-top-bar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? "";
    assert.match(promo, /href="#contact"/, `${locale} promo CTA should target the on-page contact section`);
  }
});

test("the homepage promotion scrolls away natively on mobile and only floats on desktop", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    const promoClasses = classList(tagWithAttribute(html, 'id="promo-top-bar"'));

    assert.ok(promoClasses.includes("absolute"), `${locale} mobile promo is not in the page scroll layer`);
    assert.ok(promoClasses.includes("sm:fixed"), `${locale} desktop promo lost its floating treatment`);
    assert.ok(!promoClasses.includes("fixed"), `${locale} mobile promo still depends on scroll JavaScript`);
  }
});

test("promotion begins exactly below the 64px mobile and 80px desktop header", async () => {
  for (const locale of locales) {
    const homepage = await readPage(locale);
    const homepagePromo = classList(tagWithAttribute(homepage, 'id="promo-top-bar"'));

    assert.ok(homepagePromo.includes("top-16"), `${locale} home promo leaves a mobile header gap`);
    assert.ok(homepagePromo.includes("sm:top-20"), `${locale} home promo leaves a desktop header gap`);

    const contactPage = await readPage(locale, "contact");
    const inlinePromo = classList(tagWithAttribute(contactPage, 'id="promo-top-bar"'));

    assert.ok(inlinePromo.includes("mt-16"), `${locale} inline promo leaves a mobile header gap`);
    assert.ok(inlinePromo.includes("sm:mt-20"), `${locale} inline promo leaves a desktop header gap`);
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

test("the mobile trigger has a 44px target, three animated bars, and an inert closed menu", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    const trigger = html.match(/<button\b[^>]*\sdata-menu-toggle(?:\s|>)[^>]*>/)?.[0] ?? "";
    const menu = tagWithAttribute(html, "data-mobile-menu");

    assert.ok(trigger, `${locale} menu trigger is missing`);
    assert.ok(classList(trigger).includes("min-h-11"), `${locale} menu trigger is shorter than 44px`);
    assert.ok(classList(trigger).includes("min-w-11"), `${locale} menu trigger is narrower than 44px`);
    assert.match(trigger, /data-open-label=/, `${locale} trigger is missing its localized open label`);
    assert.match(trigger, /data-close-label=/, `${locale} trigger is missing its localized close label`);
    assert.equal(
      (html.match(/data-menu-bar=/g) ?? []).length,
      3,
      `${locale} closed hamburger must render three bars that can morph into an X`,
    );
    assert.match(menu, /aria-hidden="true"/, `${locale} closed menu remains exposed to assistive technology`);
    assert.match(menu, /\sinert(?:\s|>)/, `${locale} closed menu remains keyboard-interactive`);
    assert.ok(classList(menu).includes("overflow-y-auto"), `${locale} short screens cannot scroll within the menu`);
    assert.ok(classList(menu).includes("overscroll-contain"), `${locale} menu scrolling leaks into the page`);
    assert.ok(
      classList(menu).some((name) => name.startsWith("max-h-[calc(100dvh-")),
      `${locale} mobile menu is not constrained to the viewport`,
    );
  }
});

test("opening the mobile menu gives the site navigation an opaque black surface", async () => {
  const openMenuSurfaceClass = "has-[[data-menu-toggle][aria-expanded=true]]:bg-[#0a0a0a]";

  for (const locale of locales) {
    const html = await readPage(locale, "spa", "clube-rio");
    const navigationClasses = classList(tagWithAttribute(html, "data-site-nav"));

    assert.ok(
      navigationClasses.includes(openMenuSurfaceClass),
      `${locale} mobile menu can open while the top navigation remains transparent`,
    );
  }
});

test("mobile navigation moves language switching below its menu links while desktop keeps its switcher", async () => {
  const hreflangs = ["en", "zh-TW", "zh-CN", "ja"];

  for (const locale of locales) {
    const html = await readPage(locale);
    const desktop = regionBetween(html, "data-nav-desktop", "data-nav-mobile-controls");
    const mobileHeader = regionBetween(html, "data-nav-mobile-controls", 'id="mobile-menu"');
    const mobileMenu = regionBetween(html, 'id="mobile-menu"', "</nav>");

    assert.ok(desktop.includes("data-lang-toggle"), `${locale} desktop language trigger is missing`);
    assert.ok(desktop.includes('id="language-panel-desktop"'), `${locale} desktop language panel is missing`);

    assert.ok(!mobileHeader.includes("data-lang-toggle"), `${locale} mobile header still renders a language trigger`);
    assert.ok(mobileHeader.includes("data-menu-toggle"), `${locale} mobile header lost its hamburger trigger`);

    const finalNavLink = mobileMenu.indexOf(`href="/${locale}/blog/"`);
    const languageToggle = mobileMenu.indexOf("data-lang-toggle");
    assert.notEqual(finalNavLink, -1, `${locale} mobile menu is missing its final navigation link`);
    assert.notEqual(languageToggle, -1, `${locale} mobile menu is missing its language trigger`);
    assert.ok(languageToggle > finalNavLink, `${locale} mobile language switcher is not below the menu links`);

    const languageRegion = mobileMenu.slice(languageToggle);
    for (const hreflang of hreflangs) {
      assert.ok(languageRegion.includes(`hreflang="${hreflang}"`), `${locale} mobile language menu is missing ${hreflang}`);
    }
    assert.equal(
      (languageRegion.match(/aria-current="true"/g) ?? []).length,
      1,
      `${locale} mobile language menu must mark exactly one current locale`,
    );
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

    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";
    assert.ok(footer.includes(`href="/${locale}/"`), `${locale} footer is missing its localized home link`);
    assert.ok(footer.includes(`>${homeLabels[locale]}<`), `${locale} footer does not label its home link correctly`);
    assert.ok(!footer.includes(`href="/${locale}/#spas"`), `${locale} footer still uses the venue-section anchor`);
  }
});

test("mobile navigation marks the current section with a visible left rail", async () => {
  for (const locale of locales) {
    const home = await readPage(locale);
    const article = await readPage(locale, "blog", "macau-sauna-august-guide-2026");
    const spa = await readPage(locale, "spa", "clube-rio");
    const homeMenu = regionBetween(home, 'id="mobile-menu"', "</nav>");
    const articleMenu = regionBetween(article, 'id="mobile-menu"', "</nav>");
    const spaMenu = regionBetween(spa, 'id="mobile-menu"', "</nav>");

    const homeTag = homeMenu.match(new RegExp(`<a[^>]+href="/${locale}/"[^>]*>`))?.[0] ?? "";
    const blogTag = articleMenu.match(new RegExp(`<a[^>]+href="/${locale}/blog/"[^>]*>`))?.[0] ?? "";
    const spaHomeTag = spaMenu.match(new RegExp(`<a[^>]+href="/${locale}/"[^>]*>`))?.[0] ?? "";

    assert.match(homeTag, /aria-current="page"/, `${locale} homepage is not marked current in the mobile menu`);
    assert.ok(classList(homeTag).includes("border-gold"), `${locale} current home link has no visible left rail`);
    assert.match(blogTag, /aria-current="page"/, `${locale} blog article does not mark its Blog parent`);
    assert.ok(classList(blogTag).includes("border-gold"), `${locale} current Blog link has no visible left rail`);
    assert.doesNotMatch(spaHomeTag, /aria-current="page"/, `${locale} spa detail incorrectly marks Home as current`);
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

test("the homepage restores clearly disclosed customer reviews in every locale", async () => {
  const expected = {
    en: {
      heading: "Guest Reviews",
      disclosure: "Anonymised summaries of feedback shared after bookings",
      authors: ["First-time guest", "Independent traveller", "Returning guest"],
    },
    "zh-TW": {
      heading: "客戶評價",
      disclosure: "以下內容為預約後回饋的匿名整理",
      authors: ["首次到訪客人", "自由行客人", "回訪客人"],
    },
    "zh-CN": {
      heading: "客户评价",
      disclosure: "以下内容根据预约后的反馈匿名整理",
      authors: ["首次到访客人", "自由行客人", "回访客人"],
    },
    ja: {
      heading: "お客様の声",
      disclosure: "予約後に寄せられた感想を、個人が特定されない形で要約しています",
      authors: ["初めて利用されたお客様", "個人旅行のお客様", "リピーターのお客様"],
    },
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    assert.ok(html.includes(expected[locale].heading), `${locale} is missing the customer-review heading`);
    assert.ok(html.includes(expected[locale].disclosure), `${locale} is missing the review disclosure`);
    for (const author of expected[locale].authors) {
      assert.ok(html.includes(author), `${locale} is missing review attribution: ${author}`);
    }
    assert.equal(
      (html.match(/data-testimonial-card="primary"/g) ?? []).length,
      3,
      `${locale} must expose exactly three primary review summaries`,
    );
  }
});

test("homepage venue and monthly-pick introductions use the approved localized copy", async () => {
  const expected = {
    en: [
      "Explore 14 popular Macau sauna venues, with updates on prices, opening status, team size and other practical details.",
      "Our monthly picks reflect recent guest feedback. Tell us your budget, timing and preferences, and we can suggest the venues that suit you best.",
    ],
    "zh-TW": [
      "收錄澳門熱門的14家桑拿會所，即時更新情報（價格，營業狀態，人員數量等）",
      "我們根據當月客戶反饋，做出推薦，我們也會根據您的預算，時間，喜好推薦適合的桑拿房！",
    ],
    "zh-CN": [
      "收录澳门热门的 14 家桑拿会所，及时更新价格、营业状态、人员数量等实用信息。",
      "我们会根据当月客户反馈给出推荐，也会结合您的预算、时间和喜好，帮您筛选合适的桑拿会所。",
    ],
    ja: [
      "マカオで人気のサウナ14店を掲載。料金・営業状況・在籍人数など、来店前に知りたい情報を随時更新しています。",
      "今月のお客様の声をもとにおすすめ店を選んでいます。ご予算・ご希望の時間・お好みを伺い、条件に合う店舗もご案内します。",
    ],
  };

  for (const locale of locales) {
    const html = await readPage(locale);
    for (const copy of expected[locale]) {
      assert.ok(html.includes(copy), `${locale} is missing approved homepage copy: ${copy}`);
    }
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
