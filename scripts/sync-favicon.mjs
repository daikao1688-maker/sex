// Keep the root fallback icon in sync with the SVG brand, including on builds.
// Run `npm run icons:sync` after changing the SVG during local development.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svgPath = new URL("../public/favicon.svg", import.meta.url);
const icoPath = new URL("../public/favicon.ico", import.meta.url);
const sizes = [16, 32, 48, 64, 128, 256];
const svg = await readFile(svgPath);
const frames = await Promise.all(sizes.map((size) =>
  sharp(svg, { density: 288 }).resize(size, size).ensureAlpha().png().toBuffer(),
));

// ICO directory entries point to individual lossless RGBA PNG frames.
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // Type 1 = icon (not cursor).
header.writeUInt16LE(sizes.length, 4);
const directory = Buffer.alloc(16 * sizes.length);
let offset = header.length + directory.length;
for (const [index, frame] of frames.entries()) {
  const entry = index * 16;
  directory[entry] = sizes[index] === 256 ? 0 : sizes[index];
  directory[entry + 1] = directory[entry];
  directory.writeUInt16LE(1, entry + 4); // Color planes.
  directory.writeUInt16LE(32, entry + 6); // RGBA bits per pixel.
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
const ico = Buffer.concat([header, directory, ...frames]);
const previous = await readFile(icoPath).catch((error) => {
  if (error.code !== "ENOENT") throw error;
  return undefined;
});
if (!previous?.equals(ico)) {
  await writeFile(icoPath, ico);
}
console.log(`Favicon synced: ${sizes.join(", ")}px (${ico.length} bytes).`);
