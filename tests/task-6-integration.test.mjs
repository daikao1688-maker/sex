import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

async function readPage(locale, page = "") {
  return readFile(path.join(distRoot, locale, page, "index.html"), "utf8");
}

function openingTag(html, marker) {
  const markerIndex = html.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing ${marker}`);
  const start = html.lastIndexOf("<", markerIndex);
  const end = html.indexOf(">", markerIndex);
  return html.slice(start, end + 1);
}

function element(html, marker, tagName = "div") {
  const markerIndex = html.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing ${marker}`);
  const start = html.lastIndexOf(`<${tagName}`, markerIndex);
  const end = html.indexOf(`</${tagName}>`, markerIndex);
  assert.notEqual(end, -1, `missing closing ${tagName} for ${marker}`);
  return html.slice(start, end + tagName.length + 3);
}

test("Best of Month keeps all cards indexable in a labelled mobile scroller", async () => {
  for (const locale of locales) {
    const html = await readPage(locale);
    const section = element(html, 'data-testid="best-of-month"', "section");

    assert.match(openingTag(html, "data-bom-track"), /role="region"/);
    assert.match(openingTag(html, "data-bom-track"), /aria-labelledby="bom-title"/);
    assert.match(openingTag(html, "data-bom-track"), /tabindex="0"/);
    assert.match(openingTag(html, "data-bom-track"), /overflow-x-auto/);
    const cards = [...section.matchAll(/<a\b[^>]*data-bom-card[^>]*>/g)].map(([tag]) => tag);
    assert.equal(cards.length, 3, `${locale} lost shortlist cards`);
    assert.ok(
      cards.every((tag) => !tag.includes('aria-hidden="true"')),
      `${locale} hides shortlist content at build time`,
    );
  }
});

test("ranking mobile collections and every horizontal table have accessible region labels", async () => {
  const tableNames = ["basics", "pricing", "overnight", "features"];

  for (const locale of locales) {
    const html = await readPage(locale, "ranking");
    const topPicks = openingTag(html, "data-ranking-top-picks");
    assert.match(topPicks, /role="region"/);
    assert.match(topPicks, /aria-labelledby="ranking-top-picks-title"/);
    assert.match(topPicks, /tabindex="0"/);
    assert.match(topPicks, /overflow-x-auto/);

    for (const name of tableNames) {
      const tag = openingTag(html, `data-ranking-table="${name}"`);
      assert.match(tag, /role="region"/, `${locale} ${name} table is not a named region`);
      assert.match(tag, new RegExp(`aria-labelledby="ranking-${name}-title"`));
      assert.match(tag, /tabindex="0"/, `${locale} ${name} table is not keyboard-scrollable`);
    }
  }
});

test("ranking rows label closed venues and consolidate duplicated overnight data", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "ranking");
    assert.equal(
      (html.match(/data-ranking-closed-status/g) ?? []).length,
      24,
      `${locale} must label six closed venues in each comparison table`,
    );

    const overnightTable = element(html, 'data-ranking-table="overnight"', "div");
    const header = overnightTable.match(/<thead\b[\s\S]*?<\/thead>/)?.[0] ?? "";
    assert.equal(
      (header.match(/<th\b/g) ?? []).length,
      2,
      `${locale} overnight table repeats equivalent availability fields`,
    );
  }
});

test("floating actions respect viewport safe areas", async () => {
  for (const locale of locales) {
    const html = await readPage(locale, "ranking");
    const actions = openingTag(html, 'id="floating-actions"');

    assert.match(actions, /safe-area-inset-bottom/);
    assert.match(actions, /safe-area-inset-right/);
    assert.match(actions, /max-width:/);
  }
});
