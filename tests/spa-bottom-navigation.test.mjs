import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const labels = {
  en: "Back to venue list",
  "zh-TW": "返回會所列表",
  "zh-CN": "返回会所列表",
  ja: "店舗一覧に戻る",
  ko: "업소 목록으로 돌아가기",
};

test("every venue has a localized return link after contact channels, including closed venues", async () => {
  for (const [locale, label] of Object.entries(labels)) {
    const directory = new URL(`../dist/${locale}/spa/`, import.meta.url);
    const entries = await readdir(directory, { withFileTypes: true });
    const venues = entries.filter((entry) => entry.isDirectory());
    assert.ok(venues.length > 0, `${locale} has no venue pages`);
    const homepage = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), "utf8");
    assert.match(homepage, /<section\b[^>]*\bid="spas"/);

    for (const venue of venues) {
      const html = await readFile(new URL(`${venue.name}/index.html`, directory), "utf8");
      const contact = html.match(/<section\b[^>]*\bid="contact"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? "";
      const links = [...contact.matchAll(/<a\b[^>]*\bdata-spa-return-link\b[^>]*>[\s\S]*?<\/a>/g)];
      assert.equal(links.length, 1, `${locale}/${venue.name} needs one bottom return link`);
      const [link] = links[0];
      assert.ok(link.includes(`href="/${locale}/#spas"`), `${locale}/${venue.name} must return to its own venue list`);
      assert.ok(link.includes(label), `${locale}/${venue.name} needs localized link text`);
      const lastChannel = contact.lastIndexOf("data-contact-channel");
      assert.ok(lastChannel >= 0, "contact channels must remain available");
      assert.ok(links[0].index > lastChannel, "return link must follow the last contact channel");
      assert.match(link, /\bdata-floating-actions-exclusion\b/);
      const anchorTag = link.match(/^<a\b[^>]*>/)?.[0] ?? "";
      assert.doesNotMatch(anchorTag, /\b(?:onclick|target|aria-hidden|tabindex)=/);
      assert.ok(html.indexOf(contact) < html.indexOf("<footer"), "return link must precede footer navigation");
    }
  }
});

test("non-venue pages do not gain a venue return action", async () => {
  for (const locale of Object.keys(labels)) {
    for (const route of ["", "contact/", "blog/", "ranking/"]) {
      const html = await readFile(new URL(`../dist/${locale}/${route}index.html`, import.meta.url), "utf8");
      assert.doesNotMatch(html, /\bdata-spa-return-link\b/);
    }
  }
});
