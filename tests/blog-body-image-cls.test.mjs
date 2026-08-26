import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "ja", "ko", "zh-TW", "zh-CN"];
const articles = [
  {
    slug: "macau-sauna-august-guide-2026",
    images: [
      "/blog/macau-sauna-august-guide-2026/02-macau-sauna-empire-sauna-lobby.webp",
      "/blog/macau-sauna-august-guide-2026/03-macau-sauna-east-castle-pool.webp",
      "/blog/macau-sauna-august-guide-2026/04-macau-sauna-manhao-shower-room.webp",
    ],
  },
  {
    slug: "macau-sauna-overnight-guide-2026",
    images: [
      "/blog/macau-sauna-overnight-guide-2026/02-macau-sauna-private-rest-room.webp",
      "/blog/macau-sauna-overnight-guide-2026/03-macau-sauna-late-night-supper.webp",
    ],
  },
];

const attr = (tag, name) =>
  tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "i"))?.[1];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("localized blog body images reserve intrinsic space in rendered pages", async () => {
  for (const locale of locales) {
    for (const article of articles) {
      const html = await readFile(
        path.join(distRoot, locale, "blog", article.slug, "index.html"),
        "utf8",
      );

      for (const src of article.images) {
        const matches = html.match(
          new RegExp(`<img\\b[^>]*\\bsrc="${escapeRegExp(src)}"[^>]*>`, "gi"),
        ) ?? [];
        assert.equal(matches.length, 1, `${locale}/${article.slug} must render ${src} once`);

        const [image] = matches;
        assert.equal(attr(image, "width"), "1280", `${src} must reserve its intrinsic width`);
        assert.equal(attr(image, "height"), "720", `${src} must reserve its intrinsic height`);
        assert.equal(attr(image, "loading"), "lazy", `${src} must lazy-load below the fold`);
        assert.equal(attr(image, "decoding"), "async", `${src} must decode asynchronously`);
        assert.ok(attr(image, "alt")?.trim(), `${src} must retain meaningful alternative text`);
      }
    }
  }
});
