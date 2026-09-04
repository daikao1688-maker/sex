import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const messages = {
  en: {
    booking: "Hello, I'd like to book a visit to {venue}. Could you help arrange it?",
    closed: "Hello, I saw that {venue} is temporarily closed. Could you recommend a similar venue?",
    general: "I'm interested in Macau sauna. Could you help arrange this?",
  },
  "zh-TW": {
    booking: "你好，我想預約{venue}，可以安排嗎？",
    closed: "你好，我看到{venue}暫停營業，請問有類似的場所可以推薦嗎？",
    general: "你好，我想預約澳門桑拿，可以安排嗎？",
  },
  "zh-CN": {
    booking: "你好，我想预约{venue}，可以安排吗？",
    closed: "你好，我看到{venue}暂停营业，请问有类似的场所可以推荐吗？",
    general: "你好，我想预约澳门桑拿，可以安排吗？",
  },
  ja: {
    booking: "こんにちは。{venue}を予約したいのですが、手配をお願いできますか？",
    closed: "こんにちは。{venue}が一時休業中と拝見しました。似たお店を紹介していただけますか？",
    general: "マカオのサウナに興味があります。日本語でご案内いただけますか？",
  },
  ko: {
    booking: "안녕하세요. {venue} 이용을 예약하고 싶습니다. 예약을 도와주실 수 있나요?",
    closed: "안녕하세요. {venue}의 임시 휴업 안내를 봤습니다. 비슷한 업소를 추천해 주실 수 있나요?",
    general: "마카오 사우나 이용에 관심이 있습니다. 예약과 이동을 도와주실 수 있나요?",
  },
};

function decodeHtml(value) {
  return value.replace(/&(amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (_, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number(entity.slice(1)));
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[entity];
  });
}

function chatLinks(html, channelCardsOnly = false) {
  return [...html.matchAll(/<a\b[^>]*\bhref="(https:\/\/(?:wa\.me|t\.me)\/[^\"]+)"[^>]*>/g)]
    .filter((match) => !channelCardsOnly || /\bdata-contact-channel(?:[=\s>])/.test(match[0]))
    .map((match) => new URL(decodeHtml(match[1])));
}

// Catches missing context on any quick/contact-card link, wrong locales or stale venue names.
for (const [locale, copy] of Object.entries(messages)) {
  test(`${locale}: all venue contact links identify the current venue and preserve the recipient`, async () => {
    const directory = new URL(`../dist/${locale}/spa/`, import.meta.url);
    const entries = await readdir(directory, { withFileTypes: true });
    const venues = entries.filter((entry) => entry.isDirectory());
    assert.ok(venues.length > 0);

    for (const venue of venues) {
      const html = await readFile(new URL(`${venue.name}/index.html`, directory), "utf8");
      const name = decodeHtml(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]*>/g, "").trim() ?? "");
      assert.ok(name, `${locale}/${venue.name} needs a venue heading`);
      const closed = html.includes('data-testid="spa-temporarily-closed-notice"');
      const expected = (closed ? copy.closed : copy.booking).replace("{venue}", () => name);
      const links = chatLinks(html);
      assert.ok(links.some((link) => link.hostname === "wa.me"), "WhatsApp must remain available");
      assert.ok(links.some((link) => link.hostname === "t.me"), "Telegram must remain available");
      const expectedLinkCount = closed ? 2 : ["zh-TW", "zh-CN"].includes(locale) ? 3 : 4;
      assert.equal(links.length, expectedLinkCount, "retain every quick and bottom contact link for this locale");

      for (const link of links) {
        assert.equal(link.pathname, link.hostname === "wa.me" ? "/8617819124251" : "/am38876", "do not change the recipient");
        assert.equal(link.searchParams.get("text"), expected, `${locale}/${venue.name}: ${link.hostname} has wrong context`);
        assert.equal(link.searchParams.getAll("text").length, 1, "encode the message exactly once");
      }
      const bodyMessage = html.match(/<body\b[^>]*\bdata-inquiry-message="([^"]*)"/)?.[1] ?? "";
      assert.equal(decodeHtml(bodyMessage), expected, "page-level enquiry context must match its links");
      const floatingLink = html.match(/<a\b[^>]*\bid="floating-contact-pill"[^>]*>/)?.[0] ?? "";
      assert.match(floatingLink, /\bhref="#contact"/, "the floating entry must preserve venue context without JavaScript");
    }
  });
}

test("general pages keep general enquiries instead of inheriting a venue name", async () => {
  for (const [locale, copy] of Object.entries(messages)) {
    for (const route of ["contact/", "guide/", "blog/macau-sauna-overnight-guide-2026/"]) {
      const html = await readFile(new URL(`../dist/${locale}/${route}index.html`, import.meta.url), "utf8");
      const links = chatLinks(html, true);
      assert.ok(links.length >= 2);
      for (const link of links) assert.equal(link.searchParams.get("text"), copy.general);
    }
  }
});
