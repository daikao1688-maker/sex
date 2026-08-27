import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

const replacementGalleries = {
  "clube-rio": { lead: "macau-sauna-spa-clube-rio-repaired-01", count: 5 },
  "yu-sauna": { lead: "macau-sauna-spa-yu-sauna-gallery-20260827-01", count: 10 },
  "manhao-spa": { lead: "macau-sauna-spa-manhao-placed-20260624-01", count: 11 },
  "number-nine-sauna": { lead: "macau-sauna-spa-number-nine-placed-20260624-01", count: 7 },
  "shang-pin-spa": { lead: "macau-sauna-spa-elite-placed-20260624-01", count: 11 },
  "majesty-spa": { lead: "macau-sauna-spa-majesty-gallery-202607-01", count: 25 },
  "the-excellent-sauna": { lead: "macau-sauna-spa-excellent-gallery-202607-01", count: 14 },
  "empire-sauna": { lead: "macau-sauna-spa-empire-placed-20260624-01", count: 12 },
  "east-castle-spa": { lead: "macau-sauna-spa-east-castle-gallery-202607-02", count: 18 },
  "victoria-sauna": { lead: "macau-sauna-spa-victoria-gallery-202607-01", count: 8 },
  "m-club": { lead: "macau-sauna-spa-mclub-gallery-202607-02", count: 22 },
  "number-one-sauna": { lead: "macau-sauna-spa-number-one-gallery-202607-01", count: 10 },
  "familia-nobre": { lead: "macau-sauna-spa-familia-nobre-gallery-202607-01", count: 9 },
  "eighteen-sauna": { lead: "macau-sauna-spa-eighteen-gallery-202607-01", count: 7 },
};

const allVenueLeadImages = {
  ...replacementGalleries,
  "oceanic-royal-spa": {
    lead: "macau-sauna-spa-oceanic-placed-20260624-01",
    count: 9,
  },
};

const coverBasenames = {
  "clube-rio": "clube-rio-card",
  "yu-sauna": "yu-sauna-card",
  "manhao-spa": "manhao-spa-card",
  "number-nine-sauna": "number-nine-sauna-card",
  "shang-pin-spa": "shang-pin-spa-card",
  "majesty-spa": "majesty-spa-card",
  "the-excellent-sauna": "the-excellent-sauna-card",
  "empire-sauna": "empire-sauna-card",
  "east-castle-spa": "east-castle-spa-card",
  "victoria-sauna": "victoria-sauna-card",
  "m-club": "m-club-card",
  "number-one-sauna": "number-one-sauna-card",
  "familia-nobre": "familia-nobre-card",
  "oceanic-royal-spa": "oceanic-royal-spa-card",
  "eighteen-sauna": "eighteen-sauna-card",
};

const decodeHtml = (value) => value
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&amp;", "&")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

test("uses the supplied replacement gallery for every existing venue", async () => {
  for (const [slug, gallery] of Object.entries(replacementGalleries)) {
    await Promise.all([
      access(path.join(projectRoot, "public", "media", `${gallery.lead}-lg.webp`)),
      access(path.join(projectRoot, "public", "media", `${gallery.lead}-thumb.webp`)),
    ]);

    for (const locale of locales) {
      const page = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
      const items = page.match(/<button[^>]*data-gallery-open/g) ?? [];

      assert.ok(
        page.includes(`/media/${gallery.lead}-lg.webp`),
        `${locale}/${slug} does not use the supplied lead image`,
      );
      assert.equal(items.length, gallery.count, `${locale}/${slug} does not show every supplied gallery image`);
    }
  }
});

test("keeps the existing Oceanic Royal Spa gallery unchanged", async () => {
  const lead = "macau-sauna-spa-oceanic-placed-20260624-01";

  for (const locale of locales) {
    const page = await readFile(
      path.join(distRoot, locale, "spa", "oceanic-royal-spa", "index.html"),
      "utf8",
    );
    assert.ok(page.includes(`/media/${lead}-lg.webp`), `${locale} changed the Oceanic gallery`);
  }
});

test("gives every gallery image specific, non-templated copy in all four languages", async () => {
  const forbiddenTemplate = /(venue gallery|interior and facilities|會所相冊|會所環境與設施|会所相册|会所环境与设施|店内ギャラリー|店内と設備)\s*\d*/i;
  let renderedImageCount = 0;

  for (const [slug, gallery] of Object.entries(allVenueLeadImages)) {
    for (const locale of locales) {
      const page = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
      const alts = [...page.matchAll(/data-alt="([^"]+)"/g)].map((match) => decodeHtml(match[1].trim()));
      const captions = [...page.matchAll(/data-caption="([^"]+)"/g)].map((match) => decodeHtml(match[1].trim()));

      assert.equal(alts.length, gallery.count, `${locale}/${slug} is missing localized alt text`);
      assert.equal(captions.length, gallery.count, `${locale}/${slug} is missing localized captions`);
      assert.equal(new Set(alts).size, gallery.count, `${locale}/${slug} repeats alt text`);
      assert.equal(new Set(captions).size, gallery.count, `${locale}/${slug} repeats captions`);

      for (let index = 0; index < gallery.count; index += 1) {
        assert.ok(alts[index].length >= 6, `${locale}/${slug} image ${index + 1} has an empty or vague alt`);
        assert.ok(captions[index].length >= 12, `${locale}/${slug} image ${index + 1} has an empty or vague caption`);
        assert.notEqual(alts[index], captions[index], `${locale}/${slug} image ${index + 1} reuses alt as caption`);
        assert.equal(forbiddenTemplate.test(alts[index]), false, `${locale}/${slug} image ${index + 1} uses a generic alt template`);
        assert.equal(forbiddenTemplate.test(captions[index]), false, `${locale}/${slug} image ${index + 1} uses a generic caption template`);
        assert.equal(alts[index].includes("\n"), false, `${locale}/${slug} image ${index + 1} alt contains a line break`);
      }

      renderedImageCount += gallery.count;
    }
  }

  assert.equal(renderedImageCount, 712, "the four localized galleries must render exactly 712 image cards");
});

test("removes only the selected Familia Nobre staircase photo", async () => {
  const removed = "macau-sauna-spa-familia-nobre-gallery-202607-03";
  const retained = "macau-sauna-spa-familia-nobre-gallery-202607-05";

  for (const locale of locales) {
    const page = await readFile(path.join(distRoot, locale, "spa", "familia-nobre", "index.html"), "utf8");
    assert.equal(page.includes(`/media/${removed}-lg.webp`), false, `${locale} still renders the selected staircase photo`);
    assert.ok(page.includes(`/media/${retained}-lg.webp`), `${locale} removed the staircase photo that should remain`);
  }

  for (const suffix of ["lg", "thumb"]) {
    assert.equal(
      existsSync(path.join(projectRoot, "public", "media", `${removed}-${suffix}.webp`)),
      false,
      `the removed staircase ${suffix} asset still exists`,
    );
    assert.equal(
      existsSync(path.join(projectRoot, "public", "media", `${retained}-${suffix}.webp`)),
      true,
      `the retained staircase ${suffix} asset was deleted`,
    );
  }
});

test("removes legacy gallery files while retaining the Oceanic album", async () => {
  const spaCopy = await readFile(path.join(projectRoot, "src", "i18n", "pages", "spa.ts"), "utf8");
  const legacyFiles = new Set(
    [...spaCopy.matchAll(/file: '([^']+)'/g)]
      .map((match) => match[1])
      .filter((file) => !file.startsWith("macau-sauna-spa-oceanic-")),
  );

  for (const file of legacyFiles) {
    assert.equal(
      existsSync(path.join(projectRoot, "public", "media", `${file}-lg.webp`)),
      false,
      `legacy large gallery image still exists: ${file}`,
    );
    assert.equal(
      existsSync(path.join(projectRoot, "public", "media", `${file}-thumb.webp`)),
      false,
      `legacy gallery thumbnail still exists: ${file}`,
    );
  }

  assert.equal(
    existsSync(path.join(projectRoot, "public", "media", "macau-sauna-spa-oceanic-placed-20260624-01-lg.webp")),
    true,
    "Oceanic large gallery image was removed",
  );
  assert.equal(
    existsSync(path.join(projectRoot, "public", "media", "macau-sauna-spa-oceanic-placed-20260624-01-thumb.webp")),
    true,
    "Oceanic gallery thumbnail was removed",
  );
});

test("derives every shared venue cover from the first detail-gallery image", async () => {
  for (const [slug, gallery] of Object.entries(allVenueLeadImages)) {
    const source = path.join(projectRoot, "public", "media", `${gallery.lead}-lg.webp`);
    const expectedWebp = await sharp(source)
      .resize(800, 800, { fit: "cover", position: "centre" })
      .webp({ quality: 86 })
      .toBuffer();
    const expectedJpeg = await sharp(source)
      .resize(800, 800, { fit: "cover", position: "centre" })
      .jpeg({ quality: 86, mozjpeg: true })
      .toBuffer();
    const basename = coverBasenames[slug];
    const actualWebp = await readFile(path.join(projectRoot, "public", "covers", `${basename}.webp`));
    const actualJpeg = await readFile(path.join(projectRoot, "public", "covers", `${basename}.jpg`));

    assert.equal(
      createHash("sha256").update(actualWebp).digest("hex"),
      createHash("sha256").update(expectedWebp).digest("hex"),
      `${slug} WebP cover must use its first detail-gallery image`,
    );
    assert.equal(
      createHash("sha256").update(actualJpeg).digest("hex"),
      createHash("sha256").update(expectedJpeg).digest("hex"),
      `${slug} JPEG cover must use its first detail-gallery image`,
    );
  }
});
