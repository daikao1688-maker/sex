import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const distRoot = new URL("../dist/", import.meta.url);

test("every generated HTML page opts out of search indexing in its initial head", async () => {
  const files = (await readdir(distRoot, { recursive: true }))
    .filter((file) => file.endsWith(".html"));
  assert.ok(files.includes("index.html"), "root language gateway must be checked");
  assert.ok(files.includes("404.html"), "404 page must be checked");
  for (const locale of ["en", "zh-TW", "zh-CN", "ja", "ko"]) {
    assert.ok(files.includes(`${locale}/index.html`), `${locale} must be built`);
  }

  for (const file of files) {
    const html = await readFile(new URL(file, distRoot), "utf8");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    assert.ok(head, `${file} has no initial HTML head`);
    const robots = [...head.matchAll(/<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="([^"]*)")[^>]*>/gi)];
    assert.equal(robots.length, 1, `${file} must have exactly one robots directive`);
    const directives = robots[0][1].toLowerCase().split(/\s*,\s*/);
    assert.ok(directives.includes("noindex"), `${file} allows search indexing`);
    assert.ok(!directives.includes("index"), `${file} has conflicting indexing directives`);
  }
});

test("deployment headers prevent indexing HTML and non-HTML resources", async () => {
  const headers = await readFile(new URL("_headers", distRoot), "utf8");
  const wildcardBlock = headers.split(/\n\s*\n/).find((block) => block.startsWith("/*\n"));
  assert.match(wildcardBlock ?? "", /^\s+X-Robots-Tag: noindex, follow$/m);

  const htaccess = await readFile(new URL(".htaccess", distRoot), "utf8");
  const globalRules = htaccess.replace(/<Files(?:Match)?\b[^>]*>[\s\S]*?<\/Files(?:Match)?>/g, "");
  assert.match(globalRules, /^\s*Header always set X-Robots-Tag "noindex, follow"$/m);
});

test("robots.txt allows crawlers to see the noindex directives", async () => {
  const robots = await readFile(new URL("robots.txt", distRoot), "utf8");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow:\s*\S+/im);
  assert.doesNotMatch(robots, /^Noindex:/im, "robots.txt noindex is not supported by Google");
});
