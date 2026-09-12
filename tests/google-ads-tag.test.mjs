import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");

for (const extension of [".html", ".js"]) {
  test(`built ${extension} files do not include the removed Google Ads tracking`, async () => {
    const files = (await readdir(distRoot, { recursive: true }))
      .filter((file) => file.endsWith(extension));
    assert.ok(files.length > 0, `build must contain ${extension} files`);

    for (const file of files) {
      const content = await readFile(path.join(distRoot, file), "utf8");
      assert.ok(!content.includes("AW-18409047939"), `${file} contains the removed Ads ID or conversion destination`);
      assert.ok(!content.includes("googletagmanager.com/gtag/js"), `${file} still loads gtag.js`);
      assert.doesNotMatch(content, /\bgtag\s*\(\s*["']event["']\s*,\s*["']conversion["']/, `${file} still sends conversion events`);
      assert.doesNotMatch(content, /\bwindow\.dataLayer\s*=/, `${file} still initializes the removed dataLayer`);
    }
  });
}
