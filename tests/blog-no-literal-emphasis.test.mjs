import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja"];

/**
 * CJK bold guard: a closing `**` preceded by CJK punctuation and followed by
 * a CJK character is not a valid CommonMark delimiter, so the asterisks render
 * literally. Correct style is `**文字**。接續` — punctuation outside the bold.
 * This test fails the build if any rendered blog article still shows `**`.
 */
test("rendered blog articles never contain literal ** emphasis markers", async () => {
  const offenders = [];

  for (const locale of locales) {
    const blogDir = path.join(distRoot, locale, "blog");
    const entries = await readdir(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const html = await readFile(path.join(blogDir, entry.name, "index.html"), "utf8");
      if (html.includes("**")) {
        offenders.push(`${locale}/blog/${entry.name}/`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `literal ** found in rendered articles (move CJK punctuation outside the bold markers): ${offenders.join(", ")}`,
  );
});
