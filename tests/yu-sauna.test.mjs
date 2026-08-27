import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import { createServer } from "vite";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const slug = "yu-sauna";
const leadImage = "macau-sauna-spa-yu-sauna-gallery-20260827-01";
const galleryImages = Array.from(
  { length: 11 },
  (_, index) => `macau-sauna-spa-yu-sauna-gallery-20260827-${String(index + 1).padStart(2, "0")}`,
);
const expectedLargeImageHashes = [
  "deca9110662db08b4c35ff5bc3988f7dcac64455eecb92283de15469f3976051",
  "84efb034db9dff0733dc392e9b57613d218bbeb66a634b5d4acdd748e9d423d0",
  "24099ad14248acd708424949518e240fcc562011e9f14cd1dbf00d4f834f978e",
  "dd8c52c155a64fcb9a437ede61d1f95b6af1a4c0d681bd1a9064518ed6c88bdb",
  "976e4bd159081fee4731d728b3533f53555fb13c81e12d930dd6c7a608d33ef8",
  "8400bcef132c5c8c443e8e559c16b15cbe2cea6c514230cfb3f06d58271223ea",
  "5663636674e2162bdd83d8900dd12088e04a6f14576f2ba5afb846ea0121b17f",
  "3d58323565a5745dc3d4ccd16b278589060483a32d31a188d9c05c4210b3d9c2",
  "16f08ff92eba22d8950ae0305736f97ba70febf7e79eb6b83715e01806ec84ea",
  "543e77c01d5382ba358dc81f4162109b9b42c8a45a0e8b53342c2dd9176b8529",
  "ad789cba79b9a5d55d817a800c1131c1d9daf7fc0ee4a5e3cf581debb91ab2fd",
];

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

const localeExpectations = {
  en: {
    name: "Yu Sauna",
    location: "third floor",
    opening: "26 August 2026",
    verified: "August 2026",
    staff: "Multinational therapist team",
    removedStaffNote: "Publicly listed hours 13:00 - 06:00; confirm the same-day roster",
    overnight: "Overnight stays available — ask about rest arrangements when booking",
    bestFor: "Visitors who want to try Macau's newest venue and prefer Japanese Zen-inspired facilities",
    removedFeature: "Venue information states 24-hour access",
    descriptionMarker: "Japanese cypress dry sauna",
    rankingOvernight: "Confirm before departure",
    bookingNote: "Transport, payment methods and any promotions require confirmation for this venue.",
    ctaBody: "Send your visit time and requirements; we will confirm the current price, entrance and arrangements before departure.",
    forbiddenPromotions: [
      "free shuttle + best price",
      "your free return ride is waiting",
      "your VIP perk is on us",
    ],
  },
  "zh-TW": {
    name: "八湯御桑拿",
    location: "3 樓",
    opening: "2026 年 8 月 26 日",
    verified: "2026 年 8 月",
    staff: "多國籍技師團隊",
    removedStaffNote: "公開時段為 13:00 - 06:00，實際陣容需當天確認",
    overnight: "可過夜 — 休息安排請於預約時查詢",
    bestFor: "想試最新場館、偏好日式禪意硬件",
    removedFeature: "場館資料標示 24 小時開放",
    descriptionMarker: "日式檜木乾蒸房",
    rankingOvernight: "出發前確認",
    bookingNote: "此會所的接送、付款方式與任何優惠均需在預約時確認。",
    ctaBody: "告訴我們到訪時間與需求；出發前會先確認當日價格、入口及安排。",
    forbiddenPromotions: ["免費接送 + 優惠價格", "您的免費回程接送也已備妥", "我們為您準備的 VIP 尊享"],
  },
  "zh-CN": {
    name: "八汤御桑拿",
    location: "3 楼",
    opening: "2026 年 8 月 26 日",
    verified: "2026 年 8 月",
    staff: "多国籍技师团队",
    removedStaffNote: "公开时段为 13:00 - 06:00，实际阵容需当天确认",
    overnight: "可过夜 — 休息安排请于预约时查询",
    bestFor: "想试最新场馆、偏好日式禅意硬件",
    removedFeature: "场馆资料标注 24 小时开放",
    descriptionMarker: "日式桧木干蒸房",
    rankingOvernight: "出发前确认",
    bookingNote: "这家会所的接送、付款方式和任何优惠都需要在预约时确认。",
    ctaBody: "告诉我们到访时间和需求；出发前会先确认当天价格、入口和安排。",
    forbiddenPromotions: ["免费接送 + 优惠价格", "您的免费回程接送也已备妥", "我们为您准备的 VIP 尊享"],
  },
  ja: {
    name: "YU SAUNA（八湯御桑拿）",
    location: "3階",
    opening: "2026年8月26日",
    verified: "2026年8月",
    staff: "多国籍セラピストチーム",
    removedStaffNote: "公開対応時間 13:00 - 06:00、当日の在籍は要確認",
    overnight: "宿泊可能 — 休憩の手配は予約時にお問い合わせください",
    bestFor: "最新施設を試したい方、日本の禅を感じる設備を好む方",
    removedFeature: "施設案内では24時間営業",
    descriptionMarker: "和風ヒノキのドライサウナ",
    rankingOvernight: "出発前に確認",
    bookingNote: "この店舗の送迎、支払い方法、キャンペーンは予約時に確認が必要です。",
    ctaBody: "来店時刻と希望内容をお知らせください。出発前に当日の料金、入口、利用条件を確認します。",
    forbiddenPromotions: [
      "無料送迎＋優待料金",
      "LINEで問い合わせ（無料送迎つき）",
      "帰りの無料送迎もご用意しています",
      "無料送迎・日本語対応",
      "VIP 特典をご用意しています",
    ],
  },
  ko: {
    name: "YU SAUNA",
    location: "3층",
    opening: "2026년 8월 26일",
    verified: "2026년 8월",
    staff: "다국적 테라피스트 팀",
    removedStaffNote: "공개 안내 시간 13:00 - 06:00, 당일 인원은 확인 필요",
    overnight: "숙박 가능 — 휴식 일정은 예약 시 문의하세요",
    bestFor: "최신 시설을 경험하고 일본식 젠 설비를 선호하는 방문객",
    removedFeature: "시설 안내상 24시간 운영",
    descriptionMarker: "일본식 편백나무 드라이 사우나",
    rankingOvernight: "출발 전 확인",
    bookingNote: "이 매장의 픽업, 결제 방법과 프로모션은 예약할 때 확인해야 합니다.",
    ctaBody: "방문 시간과 요청 사항을 알려 주세요. 출발 전에 당일 가격, 입구와 이용 조건을 확인합니다.",
    forbiddenPromotions: ["무료 픽업 + 우대 가격", "무료 귀가 차량도 준비되어 있습니다", "준비해 둔 VIP 혜택"],
  },
};

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rowContaining(tableHtml, needle) {
  return (tableHtml.match(/<tr\b[\s\S]*?<\/tr>/g) ?? []).find((row) => row.includes(needle)) ?? "";
}

test("places Yu Sauna as the first homepage venue card in every locale", async () => {
  for (const locale of Object.keys(localeExpectations)) {
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    const spaGrid = home.match(/<section\b(?=[^>]*\bid="spas")[\s\S]*?<\/section>/i)?.[0] ?? "";
    const firstVenueHref =
      spaGrid.match(/<div\b[^>]*data-buckets="[^"]*"[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"/i)?.[1] ?? "";

    assert.equal(
      firstVenueHref,
      `/${locale}/spa/${slug}/`,
      `${locale} homepage starts with ${firstVenueHref || "no venue card"} instead of Yu Sauna`,
    );
  }
});

test("reserves the red homepage frame for the first-place Yu Sauna card", async () => {
  for (const locale of Object.keys(localeExpectations)) {
    const home = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    const spaGrid = home.match(/<section\b(?=[^>]*\bid="spas")[\s\S]*?<\/section>/i)?.[0] ?? "";
    const venueCards = [
      ...spaGrid.matchAll(
        /<div\b[^>]*data-buckets="[^"]*"[^>]*>\s*<a\b[^>]*href="([^"]+)"[^>]*class="([^"]+)"/gi,
      ),
    ].map((match) => ({ href: match[1], className: match[2] }));
    const redFrameCards = venueCards.filter((card) => card.className.includes("border-red-400/60"));

    assert.deepEqual(
      redFrameCards.map((card) => card.href),
      [`/${locale}/spa/${slug}/`],
      `${locale} gives the red frame to a card other than the first-place Yu Sauna card`,
    );
  }
});

test("publishes Yu Sauna as a complete five-locale venue", async () => {
  for (const [locale, expected] of Object.entries(localeExpectations)) {
    const [detail, home, ranking] = await Promise.all([
      readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8"),
      readFile(path.join(distRoot, locale, "index.html"), "utf8"),
      readFile(path.join(distRoot, locale, "ranking", "index.html"), "utf8"),
    ]);
    const text = visibleText(detail);
    const venueSections = detail.split('<div id="related"')[0] ?? detail;
    const staffSection = venueSections.match(/<div\b[^>]*data-info-icon="staff"[\s\S]*?<\/div>/)?.[0] ?? "";

    assert.ok(detail.includes(`>${expected.name}</h1>`), `${locale} is missing the venue heading`);
    assert.ok(text.includes(expected.location), `${locale} is missing the owner-confirmed third-floor location`);
    assert.ok(text.includes(expected.opening), `${locale} is missing the owner-confirmed opening date`);
    assert.ok(text.includes(expected.verified), `${locale} is missing the fact-verification month`);
    assert.ok(text.includes(expected.staff), `${locale} is missing the requested therapist-team label`);
    assert.equal(
      visibleText(staffSection).includes("|"),
      false,
      `${locale} appends extra therapist details after the requested team label`,
    );
    assert.equal(text.includes(expected.removedStaffNote), false, `${locale} still shows the removed therapist note`);
    assert.ok(text.includes(expected.overnight), `${locale} does not show the requested overnight wording`);
    assert.ok(text.includes(expected.bestFor), `${locale} does not show the requested best-for wording`);
    assert.equal(text.includes(expected.removedFeature), false, `${locale} still shows the removed 24-hour feature chip`);
    assert.ok(text.includes(expected.descriptionMarker), `${locale} is missing the new venue description`);
    assert.ok(text.includes("MOP 2,899 - 6,999"), `${locale} has the wrong package range`);
    assert.ok(text.includes("13:00 - 06:00"), `${locale} has the wrong staff hours`);
    assert.ok(detail.match(/data-spa-service-fee[^<]*10%/), `${locale} is missing the 10% fee`);
    assert.equal(
      (detail.match(/<button[^>]*data-gallery-open/g) ?? []).length,
      11,
      `${locale} does not render all eleven owner-supplied photos`,
    );

    assert.ok(home.includes(`/${locale}/spa/${slug}/`), `${locale} homepage is missing Yu Sauna`);
    assert.ok(ranking.includes(`/${locale}/spa/${slug}/`), `${locale} ranking is missing Yu Sauna`);

    const overnightTable =
      ranking.match(/<div\b[^>]*data-ranking-table="overnight"[\s\S]*?<\/table>/)?.[0] ?? "";
    const overnightRow = rowContaining(overnightTable, `/${locale}/spa/${slug}/`);
    assert.ok(overnightRow, `${locale} overnight table is missing Yu Sauna`);
    assert.ok(
      visibleText(overnightRow).includes(expected.rankingOvernight),
      `${locale} ranking promises Yu Sauna overnight availability instead of requiring confirmation`,
    );

    assert.ok(text.includes(expected.bookingNote), `${locale} is missing the venue-specific booking disclaimer`);
    assert.ok(text.includes(expected.ctaBody), `${locale} is missing the venue-specific contact copy`);
    for (const forbidden of expected.forbiddenPromotions) {
      assert.equal(
        venueSections.includes(forbidden),
        false,
        `${locale} publishes an unconfirmed transport or promotion guarantee: ${forbidden}`,
      );
    }
    assert.equal(detail.includes('data-testid="spa-flow-vip-reminder"'), false);
    assert.equal(detail.includes('data-testid="spa-flow-concierge-reminder"'), false);
    assert.equal(detail.includes("data-vip-extras-drawer"), false);
    assert.equal(detail.includes('data-info-icon="payment"'), false);

    const quickMatch = home.match(/<section\b[^>]*id="quickmatch"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(quickMatch.includes(`/${locale}/spa/${slug}/`), `${locale} Quick Match cannot recommend Yu Sauna`);
  }
});

test("scores Yu Sauna only for confirmed overnight and on-duty staff availability", async (t) => {
  const server = await createServer({
    root: projectRoot,
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom",
  });
  t.after(() => server.close());

  const [{ scoreVenue, defaultSelection }, { venues }] = await Promise.all([
    server.ssrLoadModule("/src/lib/quickMatch.ts"),
    server.ssrLoadModule("/src/data/venues.ts"),
  ]);
  const yu = venues.find((venue) => venue.slug === slug);
  assert.ok(yu, "Yu Sauna venue data is missing");
  assert.equal(yu.isNew, true, "Yu Sauna is not marked as a newly opened venue");
  assert.ok(yu.buckets.includes("new"), "Yu Sauna is missing from the new-venue matching bucket");
  assert.equal(yu.overnightRequiresConfirmation, true);

  const overnightSelection = { ...defaultSelection, overnight: true };
  const confirmedOvernight = { ...yu, overnightRequiresConfirmation: false };
  assert.ok(
    scoreVenue(confirmedOvernight, overnightSelection) > scoreVenue(yu, overnightSelection),
    "conditional overnight availability receives the same boost as confirmed availability",
  );

  const nowSelection = { ...defaultSelection, when: "now" };
  assert.ok(
    scoreVenue(yu, nowSelection, 14 * 60) > scoreVenue(yu, nowSelection, 12 * 60),
    "24-hour venue access is still treated as 24-hour therapist availability",
  );
});

test("ships all owner-supplied Yu Sauna photos in the requested lead-image order", async () => {
  for (const [index, image] of galleryImages.entries()) {
    const largePath = path.join(projectRoot, "public", "media", `${image}-lg.webp`);
    await Promise.all([
      access(largePath),
      access(path.join(projectRoot, "public", "media", `${image}-thumb.webp`)),
    ]);

    assert.equal(
      sha256(await readFile(largePath)),
      expectedLargeImageHashes[index],
      `${image} does not match its owner-supplied source photo`,
    );

    const thumb = await sharp(path.join(projectRoot, "public", "media", `${image}-thumb.webp`)).metadata();
    assert.deepEqual(
      { width: thumb.width, height: thumb.height, format: thumb.format },
      { width: 600, height: 600, format: "webp" },
      `${image} thumbnail must reserve a square gallery slot`,
    );
  }

  const hero = await sharp(path.join(projectRoot, "public", "media", `${leadImage}-hero-768.webp`)).metadata();
  assert.equal(hero.width, 768, "the responsive Yu Sauna hero must be 768px wide");
  assert.equal(hero.height, 576, "the responsive Yu Sauna hero must come from 第一张.webp");
  assert.equal(hero.format, "webp");

  for (const [file, size, format] of [
    ["yu-sauna-card.webp", 800, "webp"],
    ["yu-sauna-card.jpg", 800, "jpeg"],
    ["yu-sauna-card-400.webp", 400, "webp"],
    ["yu-sauna-card-400.jpg", 400, "jpeg"],
  ]) {
    const metadata = await sharp(path.join(projectRoot, "public", "covers", file)).metadata();
    assert.deepEqual(
      { width: metadata.width, height: metadata.height, format: metadata.format },
      { width: size, height: size, format },
      `${file} has the wrong cover geometry`,
    );
  }
});

test("publishes the owner-confirmed opening and floor without stale fourth-floor copy", async () => {
  const expectations = {
    en: { required: [/opened on 26 August 2026/iu, /third floor/iu], stale: /fourth floor/iu },
    "zh-TW": { required: [/2026\s*年\s*8\s*月\s*26\s*日全新開幕/u, /新東方置地酒店\s*3\s*樓/u], stale: /四樓/u },
    "zh-CN": { required: [/2026\s*年\s*8\s*月\s*26\s*日全新开幕/u, /新东方置地酒店\s*3\s*楼/u], stale: /四楼/u },
    ja: { required: [/2026年8月26日に新規開業/u, /New Orient Landmark Hotelの3階/u], stale: /4階/u },
    ko: { required: [/2026년 8월 26일 새롭게 개장/u, /New Orient Landmark Hotel 3층/u], stale: /4층/u },
  };

  for (const [locale, expected] of Object.entries(expectations)) {
    const detail = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
    const venueSections = detail.split('<div id="related"')[0] ?? detail;
    const text = visibleText(venueSections);
    for (const pattern of expected.required) {
      assert.match(text, pattern, `${locale} is missing the owner-confirmed Yu Sauna claim`);
    }
    assert.doesNotMatch(text, expected.stale, `${locale} still publishes the stale fourth-floor claim`);
    assert.equal(
      detail.includes('href="https://yusauna.com'),
      false,
      `${locale} labels an agent site as Yu Sauna's official website`,
    );
  }
});
