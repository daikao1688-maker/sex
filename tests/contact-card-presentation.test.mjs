import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const baseUrl = process.env.CONTACT_CARD_TEST_BASE_URL?.replace(/\/$/, "");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];
const qrLabels = {
  en: "View QR",
  "zh-TW": "查看 QR",
  "zh-CN": "查看 QR",
  ja: "QRを見る",
  ko: "QR 보기",
};
const channelIcons = ["whatsapp", "telegram", "wechat", "line", "kakaotalk"];

async function routeFiles(locale) {
  const localeRoot = path.join(distRoot, locale);
  return (await readdir(localeRoot, { recursive: true }))
    .filter((file) => file === "index.html" || file.endsWith("/index.html"))
    .map((file) => ({ file, route: `/${locale}/${file.replace(/index\.html$/, "")}` }));
}

async function readRenderedPage(locale, route = "") {
  if (baseUrl) {
    const response = await fetch(`${baseUrl}/${locale}/${route}`);
    assert.equal(response.status, 200, `${locale}/${route} did not render`);
    return response.text();
  }
  return readFile(path.join(distRoot, locale, route, "index.html"), "utf8");
}

async function readRenderedRoute({ file, route }, locale) {
  if (baseUrl) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `${route} did not render`);
    return response.text();
  }
  return readFile(path.join(distRoot, locale, file), "utf8");
}

function openingTagAt(html, markerIndex) {
  const start = html.lastIndexOf("<", markerIndex);
  const end = html.indexOf(">", markerIndex);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  return html.slice(start, end + 1);
}

function elementAt(html, markerIndex) {
  const opening = openingTagAt(html, markerIndex);
  const tagName = opening.match(/^<([a-z][\w-]*)\b/i)?.[1];
  assert.ok(tagName, `could not identify element for ${opening}`);
  const start = html.lastIndexOf("<", markerIndex);
  const tagPattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  let depth = 0;
  for (const match of html.slice(start).matchAll(tagPattern)) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, start + match.index + match[0].length);
  }
  assert.fail(`missing closing ${tagName} tag for ${opening}`);
}

function contactCards(html) {
  return [...html.matchAll(/\bdata-contact-channel(?=[\s=>])/g)].map((match) => {
    const markup = elementAt(html, match.index);
    return { opening: openingTagAt(html, match.index), markup };
  });
}

function classTokens(tag) {
  return new Set(tag.match(/\bclass="([^"]*)"/)?.[1].split(/\s+/).filter(Boolean) ?? []);
}

function assertCardPresentation(card, context) {
  const cardClasses = classTokens(card.opening);
  assert.ok([...cardClasses].some((name) => name.startsWith("rounded-")), `${context}: card is not rounded`);
  assert.ok([...cardClasses].some((name) => name.startsWith("border-gold")), `${context}: card lost its gold outline`);
  assert.ok(
    [...cardClasses].some((name) => name.startsWith("bg-[") || name.startsWith("bg-white/[")),
    `${context}: card lost its dark translucent surface`,
  );

  const iconName = card.markup.match(/src="\/icons\/(whatsapp|telegram|wechat|line|kakaotalk)\.svg"/)?.[1];
  assert.ok(iconName, `${context}: channel icon is missing`);
  const imageIndex = card.markup.indexOf(`/icons/${iconName}.svg`);
  const wrapperStart = card.markup.lastIndexOf("<div", imageIndex);
  const wrapperEnd = card.markup.indexOf(">", wrapperStart);
  const iconWrapperClasses = classTokens(card.markup.slice(wrapperStart, wrapperEnd + 1));
  assert.ok(iconWrapperClasses.has("h-12") && iconWrapperClasses.has("w-12"), `${context}: icon disc must remain 48px`);
  assert.ok(iconWrapperClasses.has("rounded-full"), `${context}: icon disc must remain circular`);
}

// Catches a page retaining the old shared card design or rendering channels in
// a different order. Expectations are taken from the approved presentation,
// while the exercised artifact is the built or live-rendered HTML.
test("every shared contact area renders the approved card and icon presentation in account order", async () => {
  for (const locale of locales) {
    let checked = 0;
    for (const routeFile of await routeFiles(locale)) {
      const html = await readRenderedRoute(routeFile, locale);
      if (!html.includes("data-contact-channels")) continue;
      checked++;
      const cards = contactCards(html);
      assert.equal(cards.length, 5, `${routeFile.route}: shared contact area lost an account`);
      assert.deepEqual(
        cards.map(({ markup }) => markup.match(/\/icons\/(whatsapp|telegram|wechat|line|kakaotalk)\.svg/)?.[1]),
        channelIcons,
        `${routeFile.route}: account order changed`,
      );
      cards.forEach((card, index) => assertCardPresentation(card, `${routeFile.route} ${channelIcons[index]}`));
    }
    assert.ok(checked >= 20, `${locale}: expected site-wide shared contact coverage, got ${checked}`);
  }
});

test("external contact cards expose an icon arrow without changing link behavior", async () => {
  for (const locale of locales) {
    for (const route of ["", "faq", "spa/yu-sauna"]) {
      const cards = contactCards(await readRenderedPage(locale, route));
      for (const index of [0, 1, 3]) {
        const { opening, markup } = cards[index];
        assert.match(opening, /^<a\b/);
        assert.match(opening, /target="_blank"/);
        assert.match(opening, /rel="[^"]*noopener[^"]*noreferrer[^"]*"/);
        const arrow = markup.match(/<span\b[^>]*\bclass="[^"]*\bcontact-channel-arrow\b[^"]*"[^>]*>[\s\S]*?<\/span>/)?.[0];
        assert.ok(arrow, `${locale}/${route || "home"} ${channelIcons[index]}: missing arrow affordance`);
        assert.match(arrow, /aria-hidden="true"/);
        assert.match(arrow, /<svg\b[\s\S]*<\/svg>/);
        assert.equal(arrow.replace(/<svg\b[\s\S]*?<\/svg>/, "").replace(/<[^>]*>|\s/g, ""), "", "arrow must not use literal text");
      }
      assert.match(cards[0].opening, /href="https:\/\/wa\.me\/8617819124251\?text=/);
      assert.match(cards[1].opening, /href="https:\/\/t\.me\/am38876\?text=/);
      assert.match(cards[3].opening, /href="https:\/\/line\.me\/R\/ti\/p\/@224vqwdv"/);
    }
  }
});

test("WeChat and KakaoTalk cards keep dialog controls with localized QR pills and no nested controls", async () => {
  for (const locale of locales) {
    for (const route of ["", "faq", "spa/yu-sauna"]) {
      const cards = contactCards(await readRenderedPage(locale, route));
      for (const [index, kind] of [[2, "wechat"], [4, "kakaotalk"]]) {
        const { opening, markup } = cards[index];
        assert.match(opening, /^<button\b/);
        assert.match(opening, /type="button"/);
        assert.match(opening, new RegExp(`data-${kind}-trigger="true"`));
        assert.match(opening, /aria-haspopup="dialog"/);
        assert.match(opening, new RegExp(`aria-controls="${kind}-modal"`));
        assert.doesNotMatch(markup.slice(opening.length, -9), /<(?:a|button)\b/i, `${locale}/${route}: nested interactive control`);
        const pill = markup.match(/<span\b[^>]*\bclass="[^"]*\bcontact-channel-qr\b[^"]*"[^>]*>([\s\S]*?)<\/span>/);
        assert.ok(pill, `${locale}/${route || "home"} ${kind}: missing QR pill`);
        assert.equal(pill[1].replace(/<[^>]*>/g, "").trim(), qrLabels[locale]);
      }
    }
  }
});

test("venue pages preserve their message override while general pages retain the default enquiry", async () => {
  for (const locale of locales) {
    const homeCards = contactCards(await readRenderedPage(locale));
    const faqCards = contactCards(await readRenderedPage(locale, "faq"));
    const venueCards = contactCards(await readRenderedPage(locale, "spa/yu-sauna"));
    const message = (card) => new URL(card.opening.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&")).searchParams.get("text");

    assert.equal(message(homeCards[0]), message(faqCards[0]), `${locale}: FAQ changed the general enquiry`);
    assert.notEqual(message(homeCards[0]), message(venueCards[0]), `${locale}: venue override was lost`);
    assert.equal(message(venueCards[0]), message(venueCards[1]), `${locale}: venue override differs by protocol`);
  }
});
