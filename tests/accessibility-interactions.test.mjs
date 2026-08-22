import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

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
