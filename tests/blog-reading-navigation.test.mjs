import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const globalCssPath = path.join(projectRoot, "src", "styles", "global.css");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

const readArticle = (locale) =>
  readFile(
    path.join(distRoot, locale, "blog", "macau-sauna-overnight-guide-2026", "index.html"),
    "utf8",
  );

const tagWithAttribute = (html, attribute) => {
  const match = html.match(new RegExp(`<[^>]+${attribute}(?:="[^"]*")?[^>]*>`));
  assert.ok(match, `generated article is missing ${attribute}`);
  return match[0];
};

const classList = (tag) => tag.match(/class="([^"]+)"/)?.[1]?.split(/\s+/) ?? [];

const regionBetween = (html, startMarker, endMarker) => {
  const start = html.indexOf(startMarker);
  assert.notEqual(start, -1, `generated article is missing ${startMarker}`);
  const end = html.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `generated article is missing ${endMarker} after ${startMarker}`);
  return html.slice(start, end);
};

const markedTags = (html, marker, tagName) =>
  (html.match(new RegExp(`<${tagName}\\b[^>]*>`, "g")) ?? []).filter((tag) => tag.includes(marker));

test("Markdown tables keep narrow-screen overflow inside the table", async () => {
  const css = await readFile(globalCssPath, "utf8");
  const tableRule = css.match(/\.rm-paper \.prose-paper table\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(tableRule, /display:\s*block/, "Markdown tables need an independent scroll box");
  assert.match(tableRule, /max-width:\s*100%/, "Markdown tables must stay inside the article column");
  assert.match(tableRule, /overflow-x:\s*auto/, "wide Markdown tables must scroll horizontally");
  assert.match(
    tableRule,
    /overscroll-behavior-inline:\s*contain/,
    "horizontal table gestures must not move the whole page",
  );
});

test("blog articles render one accessible mobile reading rail with the same H2 destinations as the body", async () => {
  for (const locale of locales) {
    const html = await readArticle(locale);
    assert.equal(
      (html.match(/data-blog-toc-mobile(?:=|\s|>)/g) ?? []).length,
      1,
      `${locale} must render exactly one mobile reading rail`,
    );

    const mobileNav = tagWithAttribute(html, "data-blog-toc-mobile");
    const mobileNavClasses = classList(mobileNav);
    for (const required of ["fixed", "top-16", "sm:top-20", "z-40", "lg:hidden"]) {
      assert.ok(mobileNavClasses.includes(required), `${locale} mobile reading rail is missing ${required}`);
    }
    assert.match(mobileNav, /aria-hidden="true"/, `${locale} rail must start outside the accessibility tree`);
    assert.match(mobileNav, /\sinert(?:\s|>)/, `${locale} hidden rail must start inert`);

    const track = tagWithAttribute(html, "data-blog-toc-track");
    const trackClasses = classList(track);
    for (const required of ["overflow-x-auto", "overscroll-x-contain", "whitespace-nowrap"]) {
      assert.ok(trackClasses.includes(required), `${locale} long reading rail is missing ${required}`);
    }

    const mobileRegion = regionBetween(html, "data-blog-toc-mobile", "</nav>");
    const bodyRegion = regionBetween(html, "data-blog-body", "data-blog-reading-end");
    const mobileLinks = markedTags(mobileRegion, "data-blog-toc-mobile-link", "a");
    const linkIds = mobileLinks.map((tag) => tag.match(/href="#([^"]+)"/)?.[1] ?? "");
    const headingIds = [...bodyRegion.matchAll(/<h2\s+id="([^"]+)"/g)].map((match) => match[1]);

    assert.deepEqual(linkIds, headingIds, `${locale} mobile rail must follow every body H2 in order`);
    assert.ok(linkIds.length > 5, `${locale} fixture must keep a genuinely long, scrollable directory`);
    for (const link of mobileLinks) {
      const classes = classList(link);
      assert.ok(classes.includes("min-h-11"), `${locale} directory links must be at least 44px tall`);
      assert.ok(
        classes.some((name) => name.startsWith("focus-visible:")),
        `${locale} directory links need a visible keyboard focus treatment`,
      );
    }

    assert.ok(
      html.indexOf("data-blog-reading-end") < html.indexOf('id="prepare-booking"'),
      `${locale} reading rail must release before the booking section`,
    );
    assert.doesNotMatch(
      html,
      /<details[^>]+lg:hidden[^>]+mb-7/,
      `${locale} must not keep the old duplicate mobile details directory`,
    );
  }
});

test("desktop and mobile directories expose one shared Scrollspy link contract", async () => {
  for (const locale of locales) {
    const html = await readArticle(locale);
    const bodyRegion = regionBetween(html, "data-blog-body", "data-blog-reading-end");
    const headingIds = [...bodyRegion.matchAll(/<h2\s+id="([^"]+)"/g)].map((match) => match[1]);
    const allLinks = markedTags(html, "data-blog-toc-link", "a");

    assert.equal(
      allLinks.length,
      headingIds.length * 2,
      `${locale} must expose one mobile and one desktop Scrollspy link per H2`,
    );
    for (const link of allLinks) {
      assert.match(link, /data-toc-id="[^"]+"/, `${locale} Scrollspy link is missing its heading id`);
    }
  }
});
