import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];
const expectedOrder = ["number-nine-sauna", "majesty-spa", "manhao-spa"];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const decodeHtml = (value) => value
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&amp;", "&");

test("monthly picks present the requested order with matching initial heading, ranks and controls in every locale", async () => {
  for (const locale of locales) {
    const html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), "utf8");
    const section = html.match(/<section\b(?=[^>]*data-testid="best-of-month")[\s\S]*?<\/section>/)?.[0] ?? "";
    const cards = [...section.matchAll(/<a\b(?=[^>]*\bdata-bom-card\b)[^>]*>[\s\S]*?<\/a>/g)].map(([card]) => card);
    assert.deepEqual(
      cards.map((card) => attribute(card, "href")),
      expectedOrder.map((slug) => `/${locale}/spa/${slug}/`),
      `${locale} monthly picks are out of order`,
    );

    const heading = section.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1].trim();
    assert.ok(heading, `${locale} is missing the initial monthly-pick heading`);
    const firstHeading = attribute(cards[0], "data-bom-heading-value");
    assert.ok(firstHeading);
    assert.equal(decodeHtml(heading), decodeHtml(firstHeading));
    const dots = [...section.matchAll(/<button\b(?=[^>]*\bdata-bom-dot\b)[^>]*>/g)].map(([dot]) => dot);
    assert.equal(dots.length, 3);

    cards.forEach((card, index) => {
      assert.equal(attribute(card, "aria-hidden"), index === 0 ? "false" : "true");
      assert.equal(attribute(card, "tabindex"), index === 0 ? "0" : "-1");
      assert.match(card, new RegExp(`>\\s*#${index + 1}\\s*</span>`));
      const image = card.match(/<img\b[^>]*>/)?.[0] ?? "";
      const name = attribute(image, "alt");
      assert.ok(name, `${locale} card ${index + 1} is missing its venue name`);
      assert.ok(attribute(dots[index], "aria-label")?.includes(name));
      assert.equal(attribute(dots[index], "aria-current"), index === 0 ? "true" : undefined);
    });
  }
});
