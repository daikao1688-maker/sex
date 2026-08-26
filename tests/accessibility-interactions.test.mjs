import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];
const allLocales = [...locales, "ko"];

const readHome = (locale) => readFile(path.join(distRoot, locale, "index.html"), "utf8");

const tagWith = (html, attribute) => {
  const match = html.match(new RegExp(`<[^>]*${attribute}[^>]*>`, "i"));
  assert.ok(match, `generated page is missing ${attribute}`);
  return match[0];
};

test("every locale homepage exposes skip navigation and one focusable main landmark", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const mainTags = html.match(/<main\b[^>]*\bid="main-content"[^>]*>/gi) ?? [];
    const skipLink = tagWith(html, 'data-skip-link');

    assert.equal(mainTags.length, 1, `${locale} must render exactly one main landmark`);
    assert.match(mainTags[0], /tabindex="-1"/, `${locale} main landmark must accept skip-link focus`);
    assert.match(skipLink, /href="#main-content"/, `${locale} skip link must target the main landmark`);
  }
});

test("every locale homepage labels the VIP tabs and exposes a polite quick-match result", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const tablist = tagWith(html, 'data-vip-tablist');
    const firstTab = tagWith(html, 'data-tab-target="how"');
    const giftsPanel = tagWith(html, 'data-tab-panel="gifts"');
    const resultStatus = tagWith(html, 'data-qm-result-status');

    assert.match(tablist, /role="tablist"/, `${locale} VIP switcher must be a tablist`);
    assert.match(tablist, /aria-label="[^"]+"/, `${locale} VIP tablist needs an accessible label`);
    assert.match(firstTab, /id="[^"]+"/, `${locale} tabs need ids for their panels`);
    assert.match(firstTab, /tabindex="0"/, `${locale} selected tab must be in the tab order`);
    assert.match(giftsPanel, /aria-labelledby="[^"]+"/, `${locale} tab panels need their controlling tab label`);
    assert.match(resultStatus, /role="status"/, `${locale} quick-match updates need a status role`);
    assert.match(resultStatus, /aria-live="polite"/, `${locale} quick-match updates must be polite`);
    assert.match(html, /<fieldset\b[^>]*data-qm-question-group/, `${locale} quick-match questions need labelled groups`);
  }
});

test("every locale homepage keeps visually hidden floating and promo controls out of tab order", async () => {
  for (const locale of locales) {
    const html = await readHome(locale);
    const backToTop = tagWith(html, 'id="floating-back-to-top"');
    const contactPill = tagWith(html, 'id="floating-contact-pill"');
    const promoCta = tagWith(html, 'data-promo-cta');

    for (const [name, tag] of [
      ["back-to-top", backToTop],
      ["contact pill", contactPill],
      ["promo CTA", promoCta],
    ]) {
      assert.match(tag, /aria-hidden="true"/, `${locale} hidden ${name} must be hidden from assistive tech`);
      assert.match(tag, /tabindex="-1"/, `${locale} hidden ${name} must be skipped by Tab`);
    }
  }
});

test("Quick Match and contact actions expose collision targets without adding empty mobile padding", async () => {
  for (const locale of allLocales) {
    const html = await readHome(locale);
    const quickMatchActions = tagWith(html, "data-qm-actions");
    const contactChannels = tagWith(html, "data-contact-channels");

    assert.match(quickMatchActions, /data-floating-actions-exclusion/, `${locale} Quick Match actions need a collision marker`);
    assert.match(contactChannels, /data-floating-actions-exclusion/, `${locale} contact actions need a collision marker`);
    assert.doesNotMatch(quickMatchActions, /\bpb-28\b/, `${locale} Quick Match must not add an empty 112px tail`);
    assert.doesNotMatch(contactChannels, /\bpb-28\b/, `${locale} contact cards must not add an empty 112px tail`);
  }
});

test("the VIP drawer layers above floating actions and contact images declare their intrinsic size", async () => {
  for (const locale of allLocales) {
    const guide = await readFile(path.join(distRoot, locale, "guide", "index.html"), "utf8");
    const drawer = tagWith(guide, "data-vip-extras-drawer");
    const floatingActions = tagWith(guide, 'id="floating-actions"');
    const qr = tagWith(guide, 'src="/wechat-qr.webp"');
    const iconTags = [...guide.matchAll(/<img\b[^>]*src="\/icons\/(?:wechat|whatsapp|telegram|line)\.svg"[^>]*>/g)].map(
      (match) => match[0],
    );

    assert.match(drawer, /z-\[130\]/, `${locale} VIP drawer must stack above floating actions`);
    assert.match(floatingActions, /z-\[120\]/, `${locale} floating action layer changed unexpectedly`);
    assert.match(qr, /width="665"/, `${locale} WeChat QR needs its intrinsic width`);
    assert.match(qr, /height="657"/, `${locale} WeChat QR needs its intrinsic height`);
    assert.ok(iconTags.length >= 8, `${locale} is missing contact and Quick Match icons`);
    for (const icon of iconTags) {
      assert.match(icon, /width="\d+"/, `${locale} contact icon needs an intrinsic width`);
      assert.match(icon, /height="\d+"/, `${locale} contact icon needs an intrinsic height`);
    }

    const quickMatchCovers = [...guide.matchAll(/<img\b[^>]*src="\/covers\/[^\"]+\.jpg"[^>]*class="h-11 w-11[^>]*>/g)].map(
      (match) => match[0],
    );
    assert.ok(quickMatchCovers.length >= 2, `${locale} is missing initial Quick Match alternatives`);
    for (const cover of quickMatchCovers) {
      assert.match(cover, /width="44"/, `${locale} initial Quick Match cover needs an intrinsic width`);
      assert.match(cover, /height="44"/, `${locale} initial Quick Match cover needs an intrinsic height`);
    }
  }
});
