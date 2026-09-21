import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const registryLanguages = {
  en: "en",
  "zh-TW": "zh-hant",
  "zh-CN": "zh-hans",
  ja: "en",
  ko: "en",
};

test("every venue offers one official licence lookup before its bottom return link", async () => {
  for (const [locale, registryLanguage] of Object.entries(registryLanguages)) {
    const directory = new URL(`../dist/${locale}/spa/`, import.meta.url);
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries.filter((item) => item.isDirectory())) {
      const html = await readFile(new URL(`${entry.name}/index.html`, directory), "utf8");
      const links = [...html.matchAll(/<a\b[^>]*\bdata-license-lookup\b[^>]*>[\s\S]*?<\/a>/g)];
      assert.equal(links.length, 1, `${locale}/${entry.name}: missing or duplicated licence lookup`);
      const [anchor] = links[0];
      const href = anchor.match(/\bhref="([^"]+)"/)?.[1].replaceAll("&amp;", "&");
      const target = new URL(href);
      assert.equal(target.origin, "https://www.dst.gov.mo", "lookup must lead directly to MGTO");
      assert.equal(target.pathname, `/${registryLanguage}/public-services/licensing/licensed-entities.html`);
      assert.ok(anchor.includes('target="_blank"'));
      assert.match(anchor, /\brel="[^"]*noopener[^\"]*"/);
      assert.match(anchor, /\bdata-floating-actions-exclusion\b/, "floating controls must yield to the lookup link");
      assert.ok(links[0].index > html.lastIndexOf("data-contact-channel"));
      assert.ok(links[0].index < html.indexOf("data-spa-return-link"));
      assert.doesNotMatch(anchor, /\{(?:name|venue)\}/, "link must not expose an unresolved template");
    }
  }
});

test("licence lookup stays specific to venue detail pages", async () => {
  for (const locale of Object.keys(registryLanguages)) {
    for (const route of ["", "contact/", "ranking/"]) {
      const html = await readFile(new URL(`../dist/${locale}/${route}index.html`, import.meta.url), "utf8");
      assert.doesNotMatch(html, /\bdata-license-lookup\b/);
    }
  }
});

test("lookup uses the correct venue category and registered name, with an unfiltered fallback", async () => {
  const retainedLookupSource = await readFile(new URL("../src/data/venueLicenses.ts", import.meta.url), "utf8");
  assert.match(retainedLookupSource, /'clube-rio': \{ searchKey: '利澳薈', comType: '12' \}/,
    "hidden Clube Rio must retain its karaoke licence lookup for reactivation");
  const cases = [
    { slug: "yu-sauna", category: "10", search: "御桑拿" },
    { slug: "east-castle-spa", category: "10", search: "東方皇堡水療會所" },
    { slug: "oceanic-royal-spa", category: "10", search: "帝湖水療休閒會所" },
    { slug: "m-club", category: "10", search: null },
    { slug: "eighteen-sauna", category: "10", search: null },
  ];
  for (const locale of Object.keys(registryLanguages)) {
    for (const { slug, category, search } of cases) {
      const html = await readFile(new URL(`../dist/${locale}/spa/${slug}/index.html`, import.meta.url), "utf8");
      const link = html.match(/<a\b[^>]*\bdata-license-lookup\b[^>]*>[\s\S]*?<\/a>/)?.[0];
      assert.ok(link, `${locale}/${slug}: missing official lookup`);
      const url = new URL(link.match(/\bhref="([^"]+)"/)[1].replaceAll("&amp;", "&"));
      assert.equal(url.searchParams.get("comType"), category, `${slug}: wrong licence category`);
      assert.equal(url.searchParams.get("searchKey"), search, `${slug}: wrong registered-name search`);
      assert.equal(url.searchParams.get("isAll"), "1");
      if (search === null && locale === "en") {
        assert.ok(link.includes("MGTO licensed establishments directory"));
      }
    }
  }
});
