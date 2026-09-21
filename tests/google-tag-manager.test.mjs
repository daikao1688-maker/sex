import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const distRoot = new URL("../dist/", import.meta.url);
const containerId = "GTM-NF5S83BB";

test("content pages install GTM once while the root gateway redirects without tracking overhead", async () => {
  const files = (await readdir(distRoot, { recursive: true }))
    .filter((file) => file.endsWith(".html"));
  assert.ok(files.includes("index.html"), "include the root language gateway");
  assert.ok(files.includes("404.html"), "include the 404 page");
  for (const locale of ["en", "zh-TW", "zh-CN", "ja", "ko"]) {
    assert.ok(files.includes(`${locale}/index.html`), `include ${locale}`);
  }

  for (const file of files) {
    const rawHtml = await readFile(new URL(file, distRoot), "utf8");
    const charset = rawHtml.match(/<meta\b[^>]*charset="utf-8"[^>]*>/i);
    assert.ok(charset, `${file}: keep UTF-8 declared`);
    assert.ok(Buffer.byteLength(rawHtml.slice(0, charset.index + charset[0].length)) <= 1024,
      `${file}: GTM must not push the charset declaration beyond the first 1024 bytes`);
    if (file === "index.html") {
      assert.match(rawHtml, /data-root-locale-redirect/);
      assert.doesNotMatch(rawHtml, /googletagmanager\.com|GTM-/);
      continue;
    }
    const html = rawHtml.replace(/<!--[\s\S]*?-->/g, "");
    const firstHeadScript = html.match(/<head\b[^>]*>\s*<script\b([^>]*)>([\s\S]*?)<\/script>/i);
    assert.ok(firstHeadScript, `${file}: GTM must be first in head`);
    assert.doesNotMatch(firstHeadScript[1], /\b(?:src|type|defer)\s*=/, `${file}: bootstrap must run inline immediately`);
    assert.ok(firstHeadScript[2].includes(containerId), `${file}: wrong head container`);
    assert.ok(firstHeadScript[2].includes("https://www.googletagmanager.com/gtm.js?id="));
    assert.match(firstHeadScript[2], /event:\s*['"]gtm\.js['"]/);

    const firstBodyNoscript = html.match(/<body\b[^>]*>\s*<noscript>\s*<iframe\b([^>]*)>\s*<\/iframe>\s*<\/noscript>/i);
    assert.ok(firstBodyNoscript, `${file}: noscript must be first in body`);
    assert.ok(firstBodyNoscript[1].includes(`src="https://www.googletagmanager.com/ns.html?id=${containerId}"`));
    assert.match(firstBodyNoscript[1], /\bheight="0"/);
    assert.match(firstBodyNoscript[1], /\bwidth="0"/);
    assert.match(firstBodyNoscript[1], /style="display:none;visibility:hidden"/);
    assert.equal(html.split(containerId).length - 1, 2, `${file}: only the head and noscript snippets may contain the container`);
    assert.equal(html.split("googletagmanager.com/gtm.js?id=").length - 1, 1, `${file}: duplicate GTM bootstrap`);
    assert.equal(html.split("googletagmanager.com/ns.html?id=").length - 1, 1, `${file}: duplicate noscript fallback`);
  }
});
