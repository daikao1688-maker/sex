import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const sizes = [16, 32, 48, 64, 128, 256];

test("the root ICO contains decodable, correctly sized versions of the current SVG brand", async () => {
  const ico = await readFile(path.join(root, "public/favicon.ico"));
  assert.deepEqual([...ico.subarray(0, 4)], [0, 0, 1, 0], "favicon.ico must be a real ICO, not the old Astro PNG");
  assert.equal(ico.readUInt16LE(4), sizes.length);

  let expectedOffset = 6 + sizes.length * 16;
  for (const [index, size] of sizes.entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry] || 256, size);
    assert.equal(ico[entry + 1] || 256, size);
    assert.equal(ico.readUInt16LE(entry + 4), 1);
    assert.equal(ico.readUInt16LE(entry + 6), 32);
    const bytes = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(offset, expectedOffset);
    assert.ok(bytes > 0 && offset + bytes <= ico.length);
    const frame = ico.subarray(offset, offset + bytes);
    const metadata = await sharp(frame).metadata();
    assert.equal(metadata.width, size);
    assert.equal(metadata.height, size);
    assert.equal(metadata.hasAlpha, true);

    const actual = await sharp(frame).ensureAlpha().raw().toBuffer();
    const brand = await sharp(path.join(root, "public/favicon.svg"), { density: 288 })
      .resize(size, size).ensureAlpha().raw().toBuffer();
    assert.deepEqual(actual, brand, `${size}px fallback differs from the current brand`);
    expectedOffset += bytes;
  }
  assert.equal(expectedOffset, ico.length);
});

test("all localized pages and the 404 declare versioned ICO fallback and scalable SVG icons", async () => {
  const dist = path.join(root, "dist");
  const files = (await readdir(dist, { recursive: true })).filter((file) =>
    file === "404.html" || /^(en|zh-TW|zh-CN|ja|ko)\/.*index\.html$/.test(file),
  );
  assert.equal(files.length, 126, "check all 125 localized pages and the 404 page");
  for (const file of files) {
    const html = await readFile(path.join(dist, file), "utf8");
    const icons = [...html.matchAll(/<link\b[^>]*\brel="icon"[^>]*>/g)].map((match) => match[0]);
    const ico = icons.find((tag) => /href="\/favicon\.ico\?v=[^"]+"/.test(tag));
    const svg = icons.find((tag) => /href="\/favicon\.svg\?v=[^"]+"/.test(tag));
    assert.ok(ico, `${file} needs a versioned ICO fallback`);
    assert.ok(svg, `${file} needs a versioned SVG icon`);
    assert.match(svg, /sizes="any"/);
    assert.match(ico, /type="image\/x-icon"/);
    assert.equal(ico.match(/\?v=([^"]+)/)?.[1], svg.match(/\?v=([^"]+)/)?.[1]);
    assert.notEqual(svg.match(/\?v=([^"]+)/)?.[1], "2", "old cached icon version must be bypassed");
    assert.deepEqual(
      ico.match(/sizes="([^"]+)"/)?.[1].split(" "),
      sizes.map((size) => `${size}x${size}`),
    );
  }
  assert.deepEqual(
    await readFile(path.join(dist, "favicon.ico")),
    await readFile(path.join(root, "public/favicon.ico")),
    "deployment must include the regenerated fallback",
  );
});

test("deployment cache rules revalidate only the stable favicon paths", async () => {
  const headers = await readFile(path.join(root, "dist/_headers"), "utf8");
  for (const file of ["favicon.ico", "favicon.svg"]) {
    const block = headers.split(/\n(?=\/)/).find((part) => part.startsWith(`/${file}\n`));
    assert.ok(block, `${file} needs an exact cache rule`);
    assert.match(block, /Cache-Control: no-cache/);
  }
  const htaccess = await readFile(path.join(root, "dist/.htaccess"), "utf8");
  const block = htaccess.match(/<FilesMatch "\^favicon[^\n]*>[\s\S]*?<\/FilesMatch>/)?.[0];
  assert.ok(block, "Hostinger deployment needs a narrowly scoped favicon rule");
  assert.match(block, /Header set Cache-Control "no-cache"/);
});
