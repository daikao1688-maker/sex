import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const temporarilyClosed = new Set([
  "manhao-spa",
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "eighteen-sauna",
]);

async function activeSpaSlugs(locale) {
  const spaRoot = path.join(distRoot, locale, "spa");
  return (await readdir(spaRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !temporarilyClosed.has(entry.name))
    .map((entry) => entry.name);
}

async function quickContactMarkup(locale, slug) {
  const html = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
  const match = html.match(
    /<div data-testid="spa-quick-contact"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  );
  assert.ok(match, `${locale}/${slug} must render the quick-contact panel`);
  return match[0];
}

test("uses WeChat instead of Telegram in Chinese spa quick-contact panels", async () => {
  for (const locale of ["zh-TW", "zh-CN"]) {
    for (const slug of await activeSpaSlugs(locale)) {
      const markup = await quickContactMarkup(locale, slug);
      assert.match(markup, /data-testid="spa-quick-contact-secondary"/);
      assert.match(markup, /data-wechat-trigger/);
      assert.match(markup, /\/icons\/wechat\.svg/);
      assert.match(markup, />微信<\/button>/);
      assert.doesNotMatch(markup, /Telegram|\/icons\/telegram\.svg|t\.me\//);
    }
  }
});

test("keeps Telegram in English and Japanese spa quick-contact panels", async () => {
  for (const locale of ["en", "ja"]) {
    for (const slug of await activeSpaSlugs(locale)) {
      const markup = await quickContactMarkup(locale, slug);
      assert.match(markup, /data-testid="spa-quick-contact-secondary"/);
      assert.match(markup, /\/icons\/telegram\.svg/);
      assert.match(markup, /Telegram/);
      assert.doesNotMatch(markup, /data-wechat-trigger/);
    }
  }
});

test("uses the KakaoTalk QR dialog instead of WhatsApp in Korean spa quick-contact panels", async () => {
  const slugs = await activeSpaSlugs("ko");
  assert.ok(slugs.length > 0);
  for (const slug of slugs) {
    const markup = await quickContactMarkup("ko", slug);
    const primary = markup.match(/<(?:a|button)\b[^>]*>[\s\S]*?<\/(?:a|button)>/)?.[0];
    assert.ok(primary, `ko/${slug}: primary contact action is missing`);
    assert.match(primary, /^<button\b/);
    assert.match(primary, /data-kakaotalk-trigger/);
    assert.match(primary, /aria-haspopup="dialog"/);
    assert.match(primary, /aria-controls="kakaotalk-modal"/);
    assert.match(primary, /\/icons\/kakaotalk\.svg/);
    assert.match(primary, /카카오톡/);
    assert.doesNotMatch(primary, /href=|target=/);
    assert.doesNotMatch(markup, /WhatsApp|whatsapp|wa\.me\//);
    assert.match(markup, /data-testid="spa-quick-contact-secondary"/);
    assert.match(markup, /href="https:\/\/t\.me\/[^\"]*text=/);
    assert.match(markup, /Telegram/);

    const html = await readFile(path.join(distRoot, "ko", "spa", slug, "index.html"), "utf8");
    assert.equal((html.match(/id="kakaotalk-modal"/g) ?? []).length, 1);
    assert.match(html, /\/icons\/whatsapp\.svg/, "full contact area must still offer WhatsApp");
  }
});

test("keeps WhatsApp as the primary quick contact in all other languages", async () => {
  for (const locale of ["en", "zh-TW", "zh-CN", "ja"]) {
    for (const slug of await activeSpaSlugs(locale)) {
      const markup = await quickContactMarkup(locale, slug);
      const primary = markup.match(/<a\b[^>]*>[\s\S]*?<\/a>/)?.[0];
      assert.ok(primary, `${locale}/${slug}: primary contact link is missing`);
      assert.match(primary, /WhatsApp/);
      assert.match(primary, /\/icons\/whatsapp\.svg/);
      assert.doesNotMatch(markup, /data-kakaotalk-trigger/);
    }
  }
});

test("Korean quick-contact actions share equal touch-target sizing and a separate helper row", async () => {
  for (const slug of await activeSpaSlugs("ko")) {
    const markup = await quickContactMarkup("ko", slug);
    const buttons = [...markup.matchAll(/<(?:button|a)\b[^>]*(?:data-kakaotalk-trigger|data-testid="spa-quick-contact-secondary")[^>]*>/g)]
      .map(([tag]) => new Set(tag.match(/class="([^"]*)"/)[1].split(/\s+/)));
    assert.equal(buttons.length, 2);
    for (const classes of buttons) {
      assert.ok(classes.has("min-h-11"), `${slug}: both actions need a 44px touch target`);
      assert.ok(classes.has("w-full") && classes.has("justify-center"), `${slug}: fill equal columns and center content`);
    }
    assert.match(markup, /<div class="[^"]*\bgrid-cols-2\b[^"]*">/);
    assert.match(markup, /<a href="#contact" class="[^"]*\bcol-span-2\b[^"]*">/);
  }
});
