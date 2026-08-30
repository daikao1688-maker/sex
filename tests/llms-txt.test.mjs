import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const siteOrigin = new URL(
  process.env.PUBLIC_SITE_ORIGIN ?? "https://macao-sex.com",
).origin;
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

const llmsTxtPath = path.join(distRoot, "llms.txt");
const readLlmsTxt = async () => (await readFile(llmsTxtPath, "utf8")).replace(/^\uFEFF/, "");

const markdownLinks = (markdown) =>
  [...markdown.matchAll(/^- \[[^\]]+\]\((https?:\/\/[^)]+)\)(?:: .*)?$/gm)].map(
    (match) => match[1],
  );

const section = (markdown, heading) => {
  const marker = `## ${heading}\n`;
  const start = markdown.indexOf(marker);
  assert.notEqual(start, -1, `llms.txt is missing the ${heading} section`);
  const contentStart = start + marker.length;
  const next = markdown.indexOf("\n## ", contentStart);
  return markdown.slice(contentStart, next === -1 ? markdown.length : next);
};

const canonicalHref = (html) =>
  html.match(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/)?.[1];

const artifactFor = (url) => {
  const pathname = new URL(url).pathname;
  if (pathname.endsWith("/")) {
    return path.join(distRoot, pathname.slice(1), "index.html");
  }
  return path.join(distRoot, pathname.slice(1));
};

test("the generated llms.txt starts with a UTF-8 byte-order mark", async () => {
  const bytes = await readFile(llmsTxtPath);
  assert.deepEqual(
    [...bytes.subarray(0, 3)],
    [0xef, 0xbb, 0xbf],
    "llms.txt needs a UTF-8 BOM so browsers do not guess a legacy encoding",
  );
});

test("the Hostinger deploy artifact declares UTF-8 and revalidation for llms.txt", async () => {
  const htaccess = await readFile(path.join(distRoot, ".htaccess"), "utf8");
  const llmsHeaders = htaccess.match(/<Files\s+"llms\.txt">([\s\S]*?)<\/Files>/)?.[1];
  assert.ok(llmsHeaders, "the Hostinger .htaccess is missing an llms.txt response block");
  assert.match(llmsHeaders, /Header set Content-Type "text\/plain; charset=UTF-8"/);
  assert.match(llmsHeaders, /Header set Cache-Control "no-cache"/);
});

test("the build emits a well-structured root llms.txt with valid production links", async () => {
  const markdown = await readLlmsTxt();

  assert.match(markdown, /^# Macau Sauna Sites\n\n> \S/m);
  assert.match(markdown, /^## Language Editions$/m);

  const links = markdownLinks(markdown);
  assert.ok(links.length > 0, "llms.txt contains no Markdown links");
  assert.equal(links.length, new Set(links).size, "llms.txt contains duplicate URLs");

  for (const locale of locales) {
    assert.ok(links.includes(`${siteOrigin}/${locale}/`), `llms.txt is missing /${locale}/`);
  }

  for (const url of links) {
    assert.equal(new URL(url).origin, siteOrigin, `${url} uses the wrong origin`);
    assert.doesNotMatch(url, /localhost|127\.0\.0\.1|:7777|:8866/);
    await access(artifactFor(url));
  }
});

test("llms.txt automatically lists every localized article emitted by the build", async () => {
  const markdown = await readLlmsTxt();
  const articleLinks = markdownLinks(section(markdown, "Published Articles")).sort();
  const articleFiles = (await readdir(distRoot, { recursive: true })).filter((relativePath) => {
    const parts = relativePath.split(path.sep);
    return parts.length >= 4 && parts[1] === "blog" && parts.at(-1) === "index.html";
  });
  const builtArticleLinks = (
    await Promise.all(
      articleFiles.map(async (relativePath) => {
        const canonical = canonicalHref(
          await readFile(path.join(distRoot, relativePath), "utf8"),
        );
        assert.ok(canonical, `${relativePath} is missing its canonical URL`);
        return canonical;
      }),
    )
  ).sort();

  assert.ok(builtArticleLinks.length > 0, "the build emitted no localized articles");
  assert.deepEqual(
    articleLinks,
    builtArticleLinks,
    "llms.txt diverges from the localized articles generated from the content collection",
  );
});

test("llms.txt exposes every shared footer resource and mirrors the venue availability groups", async () => {
  const [markdown, ...localizedHomes] = await Promise.all([
    readLlmsTxt(),
    ...locales.map((locale) => readFile(path.join(distRoot, locale, "index.html"), "utf8")),
  ]);
  const coreLinks = markdownLinks(section(markdown, "Core Site Resources")).sort();
  const footerLinks = localizedHomes
    .flatMap((home, index) => {
      const locale = locales[index];
      const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
      assert.ok(footer, `/${locale}/ is missing its footer`);
      return [...footer.matchAll(/href="([^\"]+)"/g)]
        .map((match) => match[1])
        .filter((pathname) => pathname !== `/${locale}/`)
        .map((pathname) => new URL(pathname, siteOrigin).href);
    });
  assert.deepEqual(
    coreLinks,
    [...new Set(footerLinks)].sort(),
    "llms.txt diverges from the localized resources shared by the site footer",
  );

  const home = localizedHomes[0];

  const gridStart = home.indexOf("data-spa-grid");
  const pausedStart = home.indexOf('data-testid="spa-paused-card"', gridStart);
  const gridEnd = home.indexOf("</section>", pausedStart);
  assert.ok(gridStart >= 0 && pausedStart > gridStart && gridEnd > pausedStart);

  const venueUrls = (html) =>
    [...new Set([...html.matchAll(/href="(\/en\/spa\/[^\"]+\/)"/g)].map((match) => match[1]))]
      .map((pathname) => new URL(pathname, siteOrigin).href)
      .sort();

  const openVenueUrls = venueUrls(home.slice(gridStart, pausedStart));
  const pausedVenueUrls = venueUrls(home.slice(pausedStart, gridEnd));
  const currentSectionUrls = markdownLinks(section(markdown, "Current Venue Guides")).sort();
  const referenceSectionUrls = markdownLinks(
    section(markdown, "Temporarily Closed Venue References"),
  ).sort();
  const currentSection = section(markdown, "Current Venue Guides");
  const referenceSection = section(markdown, "Temporarily Closed Venue References");

  assert.deepEqual(currentSectionUrls, openVenueUrls);
  assert.deepEqual(referenceSectionUrls, pausedVenueUrls);
  assert.equal(
    currentSectionUrls.some((url) => referenceSectionUrls.includes(url)),
    false,
    "a venue appears in both current and temporarily closed sections",
  );
  assert.doesNotMatch(currentSection, /reference only|temporarily closed/i);
  const referenceNotes = [...referenceSection.matchAll(/^- \[[^\]]+\]\([^)]+\): (.+)$/gm)].map(
    (match) => match[1],
  );
  assert.equal(referenceNotes.length, pausedVenueUrls.length);
  for (const note of referenceNotes) {
    assert.match(note, /^Reference only;.*temporarily closed\./i);
  }
});
