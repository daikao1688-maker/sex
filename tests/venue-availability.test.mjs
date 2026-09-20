import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const temporarilyClosedSlugs = [
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "eighteen-sauna",
];

const restoredVenue = "victoria-sauna";
const restoredCopy = {
  en: "Victoria Sauna has resumed operations",
  "zh-TW": "凱旋桑拿已恢復營業",
  "zh-CN": "凯旋桑拿已恢复营业",
  ja: "ヴィクトリアサウナは営業を再開",
  ko: "빅토리아 사우나는 영업을 재개",
};

const schemas = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );

const schemaOfType = (html, type) => {
  const schema = schemas(html).find((candidate) => candidate["@type"] === type);
  assert.ok(schema, `generated page is missing ${type} schema`);
  return schema;
};

const section = (html, id) =>
  html.match(new RegExp(`<section\\b(?=[^>]*\\bid="${id}")[\\s\\S]*?<\\/section>`, "i"))?.[0] ?? "";

const rowContaining = (table, marker) => {
  const markerIndex = table.indexOf(marker);
  if (markerIndex < 0) return "";
  const start = table.lastIndexOf("<tr", markerIndex);
  const end = table.indexOf("</tr>", markerIndex);
  return start < 0 || end < 0 ? "" : table.slice(start, end + 5);
};

const closedCopy = {
  en: {
    label: "Temporarily Closed",
    notice: "This venue is temporarily closed and is not accepting guests or bookings at this time.",
  },
  "zh-TW": {
    label: "暫停營業",
    notice: "此會所目前暫停營業，暫不接待客人或提供預約服務。",
  },
  "zh-CN": {
    label: "暂停营业",
    notice: "此会所目前暂停营业，暂不接待客人或提供预约服务。",
  },
  ja: {
    label: "一時休業中",
    notice: "この店舗は現在一時休業中で、ご利用およびご予約は承っておりません。",
  },
};

test("open venue pages offer the VIP extras reminder and drawer; closed pages do not", async () => {
  for (const locale of Object.keys(closedCopy)) {
    const openPage = await readFile(
      path.join(distRoot, locale, "spa", "number-nine-sauna", "index.html"),
      "utf8",
    );
    assert.ok(
      openPage.includes('data-testid="spa-flow-vip-reminder"'),
      `${locale} open venue is missing the VIP extras reminder`,
    );
    assert.ok(
      openPage.includes("data-open-vip-extras"),
      `${locale} open venue reminder must trigger the VIP extras drawer`,
    );
    assert.ok(
      openPage.includes("data-vip-extras-drawer"),
      `${locale} open venue must render the VIP extras drawer`,
    );

    for (const slug of temporarilyClosedSlugs) {
      const closedPage = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
      assert.ok(
        !closedPage.includes('data-testid="spa-flow-vip-reminder"'),
        `${locale}/${slug} must not promise VIP extras while bookings are paused`,
      );
      assert.ok(
        !closedPage.includes("data-vip-extras-drawer"),
        `${locale}/${slug} must not render the VIP extras drawer`,
      );
    }
  }
});

test("labels temporarily closed venues accurately and shows a clear detail-page notice", async () => {
  for (const [locale, copy] of Object.entries(closedCopy)) {
    const homepage = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    // Paused venues collapse into one consolidated card on the homepage grid.
    assert.equal(
      (homepage.match(/data-testid="spa-paused-card"/g) ?? []).length,
      1,
      `${locale} homepage must render one consolidated paused-venues card`,
    );
    assert.equal(
      (homepage.match(/data-testid="spa-temporarily-closed-badge"/g) ?? []).length,
      0,
      `${locale} homepage must not render individual closed badges anymore`,
    );
    for (const slug of temporarilyClosedSlugs) {
      const linkCount = (homepage.match(new RegExp(`/${locale}/spa/${slug}/`, "g")) ?? []).length;
      assert.ok(linkCount >= 1, `${locale} paused card must keep ${slug} linked (avatar button)`);
    }

    for (const slug of temporarilyClosedSlugs) {
      const detail = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-notice"'),
        `${locale}/${slug} is missing its temporarily closed notice`,
      );
      assert.ok(detail.includes(copy.label), `${locale}/${slug} has the wrong closed label`);
      assert.ok(detail.includes(copy.notice), `${locale}/${slug} has the wrong closed explanation`);
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-actions"'),
        `${locale}/${slug} still shows booking actions instead of alternatives`,
      );
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-contact"'),
        `${locale}/${slug} still uses a booking-focused contact heading`,
      );
    }

    const activeDetail = await readFile(
      path.join(distRoot, locale, "spa", "number-nine-sauna", "index.html"),
      "utf8",
    );
    assert.ok(
      !activeDetail.includes('data-testid="spa-temporarily-closed-notice"'),
      `${locale}/number-nine-sauna must not show a closure notice`,
    );
    assert.ok(
      !activeDetail.includes('data-testid="spa-temporarily-closed-actions"'),
      `${locale}/number-nine-sauna must retain its normal booking actions`,
    );
  }
});

test("restores Victoria Sauna across listings, booking surfaces, and current guidance", async () => {
  for (const [locale, resumedCopy] of Object.entries(restoredCopy)) {
    const [homepage, detail, ranking, guide] = await Promise.all([
      readFile(path.join(distRoot, locale, "index.html"), "utf8"),
      readFile(path.join(distRoot, locale, "spa", restoredVenue, "index.html"), "utf8"),
      readFile(path.join(distRoot, locale, "ranking", "index.html"), "utf8"),
      readFile(path.join(distRoot, locale, "guide", "index.html"), "utf8"),
    ]);

    assert.match(
      homepage,
      new RegExp(
        `<div\\b[^>]*data-buckets="[^"]*"[^>]*>\\s*<a\\b[^>]*href="/${locale}/spa/${restoredVenue}/"`,
      ),
      `${locale} homepage must render Victoria Sauna as a normal venue card`,
    );

    const pausedCardStart = homepage.indexOf('data-testid="spa-paused-card"');
    const pausedCardEnd = homepage.indexOf("</section>", pausedCardStart);
    const pausedCard = homepage.slice(pausedCardStart, pausedCardEnd);
    assert.doesNotMatch(
      pausedCard,
      new RegExp(`/${locale}/spa/${restoredVenue}/`),
      `${locale} paused-venues card still contains Victoria Sauna`,
    );

    assert.doesNotMatch(detail, /data-testid="spa-temporarily-closed-(?:notice|actions|contact)"/);
    assert.match(detail, /data-testid="spa-quick-contact"/);
    assert.match(detail, /data-testid="spa-flow-vip-reminder"/);
    assert.match(detail, /data-vip-extras-drawer/);

    const quickMatch = section(homepage, "quickmatch");
    const quickMatchConfigRaw = quickMatch.match(
      /<script\b[^>]*data-qm-config[^>]*>([\s\S]*?)<\/script>/,
    )?.[1];
    assert.ok(quickMatchConfigRaw, `${locale} Quick Match config is missing`);
    const quickMatchConfig = JSON.parse(quickMatchConfigRaw);
    assert.equal(
      quickMatchConfig.venues[restoredVenue]?.href,
      `/${locale}/spa/${restoredVenue}/`,
      `${locale} Quick Match still excludes Victoria Sauna`,
    );

    const basicsTable = ranking.match(
      /<div\b[^>]*data-ranking-table="basics"[\s\S]*?<\/table>/,
    )?.[0] ?? "";
    const restoredRow = rowContaining(basicsTable, `/${locale}/spa/${restoredVenue}/`);
    assert.ok(restoredRow, `${locale} ranking table is missing Victoria Sauna`);
    assert.doesNotMatch(restoredRow, /data-ranking-closed-status/);

    const rankingList = schemaOfType(ranking, "ItemList");
    assert.ok(
      rankingList.itemListElement.some((item) => item.url.endsWith(`/spa/${restoredVenue}/`)),
      `${locale} current ranking still excludes Victoria Sauna`,
    );

    const business = schemaOfType(detail, "LocalBusiness");
    assert.ok(business.priceRange, `${locale} Victoria Sauna schema is still marked closed`);
    assert.ok(guide.includes(resumedCopy), `${locale} guide still describes Victoria Sauna as closed`);
  }
});
