import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];
const expectedCards = [
  ["yu-sauna", "red"],
  ["manhao-spa", "gold"],
  ["number-nine-sauna", "gold"],
  ["shang-pin-spa", "gold"],
  ["majesty-spa", "gold"],
  ["the-excellent-sauna", "gold"],
  ["empire-sauna", "gold"],
  ["east-castle-spa", "silver"],
  ["victoria-sauna", "silver"],
];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const text = (value) => value
  .replace(/<[^>]+>/g, " ")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&amp;", "&")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&nbsp;", " ")
  .replace(/\s+/g, " ")
  .trim();

async function gridMarkup(locale) {
  const base = process.env.SPA_GRID_TEST_BASE_URL;
  let html;
  if (base) {
    const response = await fetch(new URL(`/${locale}/`, base));
    assert.equal(response.status, 200, `${locale}: homepage is unavailable`);
    html = await response.text();
  } else {
    html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), "utf8");
  }
  const section = html.match(/<section\b(?=[^>]*\bid="spas")[\s\S]*?<\/section>/)?.[0];
  assert.ok(section, `${locale}: featured venues section is missing`);
  const cards = [...section.matchAll(/<a\b(?=[^>]*\bclass="[^"]*\bspa-card\b)[^>]*>[\s\S]*?<\/a>/g)]
    .map(([card]) => card);
  assert.equal(cards.length, expectedCards.length, `${locale}: venue cards were added or removed`);
  return { section, cards };
}

test("featured venue order keeps the red spotlight on Yu Sauna alone in every locale", async () => {
  for (const locale of locales) {
    const { cards } = await gridMarkup(locale);
    assert.deepEqual(
      cards.map((card) => [attribute(card, "href"), attribute(card, "data-frame")]),
      expectedCards.map(([slug, frame]) => [`/${locale}/spa/${slug}/`, frame]),
      `${locale}: venue order or frame hierarchy differs from the approved design`,
    );
  }
});

test("immersive cards retain semantic venue headings separate from their cover media", async () => {
  for (const locale of locales) {
    const { cards } = await gridMarkup(locale);
    for (const card of cards) {
      const href = attribute(card, "href");
      const heading = card.match(/<h3\b(?=[^>]*\bclass="[^"]*\bspa-card-title\b)[^>]*>[\s\S]*?<\/h3>/)?.[0];
      assert.ok(heading, `${href}: venue name must remain a level-three heading`);
      assert.match(heading, /<span\b[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/span>/,
        `${href}: decorative title accent must not alter the accessible heading`);
      assert.match(card, /<(?:div|picture)\b[^>]*\bclass="[^"]*\bspa-card-media\b/,
        `${href}: full-cover media layer is missing`);
      assert.match(card, /<div\b[^>]*\bclass="[^"]*\bspa-card-content\b/,
        `${href}: overlay content layer is missing`);
      assert.equal((card.match(/<img\b/g) ?? []).length, 1, `${href}: cover must not be duplicated`);
    }
  }
});

test("restyling preserves every locale's venue content, facts, cover assets and filter membership", async (t) => {
  const server = await createServer({
    root: fileURLToPath(new URL("..", import.meta.url)),
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom",
  });
  t.after(() => server.close());
  const { venues } = await server.ssrLoadModule("/src/data/venues.ts");

  for (const locale of locales) {
    const { default: dictionary } = await server.ssrLoadModule(`/src/i18n/locales/${locale}.ts`);
    const { section, cards } = await gridMarkup(locale);
    const copy = dictionary.spas;
    for (const card of cards) {
      const href = attribute(card, "href");
      const slug = href.split("/").filter(Boolean).at(-1);
      const venue = venues.find((item) => item.slug === slug);
      assert.ok(venue && !venue.temporarilyClosed, `${href}: only open venues belong in featured cards`);
      const venueCopy = copy.venues[slug];
      const renderedText = text(card);
      const expectedText = [
        venueCopy.name,
        venueCopy.badge,
        venueCopy.description,
        copy.districts[venue.district],
        "★".repeat(venue.rating),
        copy.stats.price,
        `${venue.priceMin.toLocaleString("en-US")} – ${venue.priceMax.toLocaleString("en-US")}`,
        copy.stats.hours,
        venue.open24h ? copy.stats.open24h : venue.hours,
        copy.stats.serviceFee,
        venue.serviceFee === "none" ? copy.stats.noServiceFee : `+${venue.serviceFee}`,
        copy.learnMore,
      ];
      for (const value of expectedText) {
        assert.ok(renderedText.includes(text(value)), `${href}: card lost content: ${value}`);
      }
      const image = card.match(/<img\b[^>]*>/)?.[0] ?? "";
      assert.equal(attribute(image, "src"), `/covers/${venue.cover}.jpg`, `${href}: cover image changed`);
      assert.equal(text(attribute(image, "alt") ?? ""), text(`${venueCopy.name} — ${copy.imageAltSuffix}`));
      assert.ok(card.includes(`/covers/${venue.cover}-400.webp`), `${href}: responsive cover source missing`);
      assert.ok(card.includes(`/covers/${venue.cover}.webp`), `${href}: full cover source missing`);

      const wrapper = [...section.matchAll(/<div\b[^>]*\bdata-buckets="([^"]*)"[^>]*>\s*<a\b[^>]*\bhref="([^"]*)"/g)]
        .find((match) => match[2] === href);
      assert.ok(wrapper, `${href}: filterable venue wrapper is missing`);
      assert.deepEqual(wrapper[1].split(/\s+/), venue.buckets, `${href}: filter membership changed`);
    }
    const filterButtons = [...section.matchAll(/<button\b(?=[^>]*\bdata-bucket=")[^>]*>/g)].map(([tag]) => tag);
    assert.deepEqual(filterButtons.map((tag) => attribute(tag, "data-bucket")), copy.filters.map((filter) => filter.bucket));
    assert.equal(attribute(filterButtons[0], "aria-pressed"), "true", `${locale}: All filter is not initially selected`);
    assert.match(section, /\bdata-spa-hidden-note\b/);
    assert.match(section, /\bdata-spa-jump-all\b/);
    for (const venue of venues.filter((item) => item.temporarilyClosed)) {
      assert.ok(section.includes(`href="/${locale}/spa/${venue.slug}/"`), `${locale}: paused-venue navigation lost ${venue.slug}`);
    }
  }
});
