import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

async function readBuiltPage(...segments) {
  return readFile(path.join(distRoot, ...segments, "index.html"), "utf8");
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("renders the approved Manhao copy and venue-specific practical facts", async () => {
  const html = await readBuiltPage("zh-CN", "spa", "manhao-spa");
  const text = visibleText(html);

  assert.match(
    text,
    /曼濠水疗（Manhao Spa）于2026年5月在氹仔君怡酒店开业/,
  );
  assert.match(
    text,
    /两座浴池、芬兰式桑拿、蒸汽浴室和休息区/,
  );
  assert.match(text, /MOP 2,488 - 6,088/);
  const staffValue = html.match(/<div\b[^>]*data-info-icon="staff"[\s\S]*?<dd\b[^>]*>([\s\S]*?)<\/dd>/)?.[1] ?? "";
  assert.equal(visibleText(staffValue), "多国技师");
  assert.match(text, /14:00 – 04:00/);
  assert.match(text, /不可过夜 — 过渡期暂不提供过夜，即将恢复24小时及过夜/);
  assert.doesNotMatch(text, /MOP 888 - 5,388/);
});

test("restores Manhao booking actions and pricing schema across all locale builds", async () => {
  for (const locale of locales) {
    const html = await readBuiltPage(locale, "spa", "manhao-spa");
    const text = visibleText(html);
    assert.match(text, /MOP 2,488 - 6,088/, `${locale} price`);
    assert.match(text, /14:00 – 04:00/, `${locale} hours`);
    assert.doesNotMatch(html, /data-testid="spa-temporarily-closed-(?:notice|actions|contact)"/, `${locale} Manhao must not show closed status`);
    assert.match(html, /data-testid="spa-quick-contact"/, `${locale} Manhao booking contact`);
    assert.match(html, /data-testid="spa-flow-vip-reminder"/, `${locale} Manhao VIP reminder`);
    assert.match(html, /data-vip-extras-drawer/, `${locale} Manhao VIP extras drawer`);
    assert.match(html, /"priceRange":"MOP 2488 – 6088"/, `${locale} priceRange schema`);
    assert.doesNotMatch(html, /"(?:lowPrice|highPrice|makesOffer|offers)"/, `${locale} must not claim a formal offer`);
  }
});

test("renders semantic icons for every shared practical-info row on every venue detail page", async () => {
  const requiredIcons = [
    "price",
    "staff",
    "hours",
    "overnight",
    "highlights",
    "best-for",
    "payment",
  ];

  for (const locale of locales) {
    const spaRoot = path.join(distRoot, locale, "spa");
    const slugs = (await readdir(spaRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const slug of slugs) {
      const html = await readBuiltPage(locale, "spa", slug);
      const verifiedIcons =
        slug === "yu-sauna" ? requiredIcons.filter((icon) => icon !== "payment") : requiredIcons;
      for (const icon of verifiedIcons) {
        assert.match(
          html,
          new RegExp(`data-info-icon="${icon}"`),
          `${locale}/${slug} is missing ${icon}`,
        );
      }
      if (slug === "yu-sauna") {
        assert.doesNotMatch(
          html,
          /data-info-icon="payment"/,
          `${locale}/${slug} must not publish unverified payment methods`,
        );
      }
    }
  }
});

test("does not render venue official-website areas on any detail page", async () => {
  const visibleOfficialWebsiteLabel = /Official website：|公式サイト：|官方網站：|官方网站：/;

  for (const locale of locales) {
    const spaRoot = path.join(distRoot, locale, "spa");
    const slugs = (await readdir(spaRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const slug of slugs) {
      const html = await readBuiltPage(locale, "spa", slug);
      const text = visibleText(html);

      assert.doesNotMatch(
        html,
        /data-info-icon="website"/,
        `${locale}/${slug} still renders the practical-info website row`,
      );
      assert.doesNotMatch(
        text,
        visibleOfficialWebsiteLabel,
        `${locale}/${slug} still renders the contact website line`,
      );
    }
  }
});

test("FAQ restores Manhao operating hours without stale closure claims", async () => {
  const expectations = [
    ["src/i18n/pages/faq.ts", "Manhao Spa is temporarily closed and is not accepting bookings at this time", "Manhao opens 14:00–04:00"],
    ["src/i18n/pages/faq.ts", "曼濠は一時休業中で、現在ご予約を受け付けていません", "曼濠は14:00〜翌4:00"],
    ["src/i18n/pages/faq.ts", "曼濠水療暫停營業，目前不接受預約", "曼濠為 14:00–04:00"],
    ["src/i18n/pages/faq.ts", "曼濠水疗暂停营业，目前不接受预约", "曼濠为 14:00–04:00"],
    ["src/i18n/pages/faq.ts", "만하오 스파는 임시 휴업 중으로 현재 예약을 받지 않습니다", "만하오는 14:00–04:00"],
  ];

  const cache = new Map();
  for (const [relativePath, stale, current] of expectations) {
    const source = cache.get(relativePath) ?? await readFile(path.join(projectRoot, relativePath), "utf8");
    cache.set(relativePath, source);
    assert.ok(!source.includes(stale), `${relativePath} still contains ${stale}`);
    assert.ok(source.includes(current), `${relativePath} is missing ${current}`);
  }
});
