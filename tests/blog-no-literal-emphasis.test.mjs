import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const locales = ["en", "zh-TW", "zh-CN", "ja", "ko"];

/**
 * CJK bold guard: a closing `**` preceded by CJK punctuation and followed by
 * a CJK character is not a valid CommonMark delimiter, so the asterisks render
 * literally. Correct style is `**文字**。接續` — punctuation outside the bold.
 * This test checks each blog archive and any published article for literal `**`.
 */
test("rendered blog archives and articles never contain literal ** emphasis markers", async () => {
  const offenders = [];

  for (const locale of locales) {
    const blogDir = path.join(distRoot, locale, "blog");
    const files = (await readdir(blogDir, { recursive: true })).filter((file) => file.endsWith(".html"));
    assert.ok(files.includes("index.html"), `${locale} must retain its readable blog archive`);
    for (const file of files) {
      const html = await readFile(path.join(blogDir, file), "utf8");
      if (html.includes("**")) {
        offenders.push(`${locale}/blog/${file}`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `literal ** found in rendered articles (move CJK punctuation outside the bold markers): ${offenders.join(", ")}`,
  );
});
