import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

const venueCovers = {
  "clube-rio-card": "macau-sauna-spa-clube-rio-repaired-01",
  "yu-sauna-card": "macau-sauna-spa-yu-sauna-gallery-20260827-01",
  "manhao-spa-card": "macau-sauna-spa-manhao-placed-20260624-01",
  "number-nine-sauna-card": "macau-sauna-spa-number-nine-placed-20260624-01",
  "shang-pin-spa-card": "macau-sauna-spa-elite-placed-20260624-01",
  "majesty-spa-card": "macau-sauna-spa-majesty-gallery-202607-01",
  "the-excellent-sauna-card": "macau-sauna-spa-excellent-gallery-202607-01",
  "empire-sauna-card": "macau-sauna-spa-empire-placed-20260624-01",
  "east-castle-spa-card": "macau-sauna-spa-east-castle-gallery-202607-02",
  "victoria-sauna-card": "macau-sauna-spa-victoria-gallery-202607-01",
  "m-club-card": "macau-sauna-spa-mclub-gallery-202607-02",
  "number-one-sauna-card": "macau-sauna-spa-number-one-gallery-202607-01",
  "familia-nobre-card": "macau-sauna-spa-familia-nobre-gallery-202607-01",
  "oceanic-royal-spa-card": "macau-sauna-spa-oceanic-placed-20260624-01",
};

for (const [cover, leadImage] of Object.entries(venueCovers)) {
  const source = path.join(projectRoot, "public", "media", `${leadImage}-lg.webp`);
  for (const size of [800, 400]) {
    const suffix = size === 400 ? "-400" : "";
    const pipeline = sharp(source).resize(size, size, {
      fit: "cover",
      position: "centre",
    });

    const [webp, jpeg] = await Promise.all([
      pipeline.clone().webp({ quality: 86 }).toBuffer(),
      pipeline.clone().jpeg({ quality: 86, mozjpeg: true }).toBuffer(),
    ]);

    await Promise.all([
      writeFile(path.join(projectRoot, "public", "covers", `${cover}${suffix}.webp`), webp),
      writeFile(path.join(projectRoot, "public", "covers", `${cover}${suffix}.jpg`), jpeg),
    ]);
  }
}

console.log(`Synced ${Object.keys(venueCovers).length} venue covers from gallery lead images.`);
