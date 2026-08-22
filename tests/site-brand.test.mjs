import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");

const brands = {
  en: { current: "Macau Sauna Booking", next: "Macau Sauna Sites" },
  "zh-TW": { current: "澳門桑拿預約站", next: "澳門桑拿導航站" },
  "zh-CN": { current: "澳门桑拿预约站", next: "澳门桑拿导航站" },
  ja: { current: "マカオサウナ予約センター", next: "マカオ・サウナ・ガイド" },
};

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(target);
    return entry.isFile() && entry.name.endsWith(".html") ? [target] : [];
  }));
  return files.flat();
}

test("uses the requested localized brand title on every generated locale page", async () => {
  for (const [locale, brand] of Object.entries(brands)) {
    const files = await listHtmlFiles(path.join(distRoot, locale));
    assert.ok(files.length > 0, `${locale} has no generated pages`);

    for (const file of files) {
      const html = await readFile(file, "utf8");
      const relativePath = path.relative(projectRoot, file);
      assert.match(html, new RegExp(`<title>[^<]*${brand.next}`), `${relativePath} has the wrong document title`);
      assert.ok(html.includes(`property="og:site_name" content="${brand.next}"`), `${relativePath} has the wrong OG site name`);
      assert.ok(html.includes(brand.next), `${relativePath} is missing the new visible site title`);
      assert.ok(!html.includes(brand.current), `${relativePath} still contains the old site title`);
    }
  }
});

test("does not describe the Japanese guide as a reservation center", async () => {
  const files = await listHtmlFiles(path.join(distRoot, "ja"));

  for (const file of files) {
    const html = await readFile(file, "utf8");
    const relativePath = path.relative(projectRoot, file);
    assert.ok(!html.includes("当センター"), `${relativePath} still calls the guide a reservation center`);
    assert.ok(!html.includes("当予約センター"), `${relativePath} still calls the guide a reservation center`);
  }
});

test("uses concise localized titles for every venue detail page", async () => {
  for (const [locale, brand] of Object.entries(brands)) {
    const files = await listHtmlFiles(path.join(distRoot, locale, "spa"));
    assert.ok(files.length > 0, `${locale} has no generated venue detail pages`);

    for (const file of files) {
      const html = await readFile(file, "utf8");
      const relativePath = path.relative(projectRoot, file);
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];

      assert.ok(title, `${relativePath} has no document title`);
      assert.equal(title.split(" - ").length, 2, `${relativePath} has an unnecessarily long venue title`);
      assert.equal(title, `${title.split(" - ")[0]} - ${brand.next}`, `${relativePath} has the wrong venue title`);
      assert.ok(!title.includes(" | "), `${relativePath} still contains the verbose venue title format`);
    }
  }
});
