import type { Locale } from "../i18n/config";
import type { VenueSlug } from "./venues";
import { replacementVenueGalleryCopy } from "./galleryCopy";

export interface VenueGalleryImage {
  file: string;
  caption: string;
  alt: string;
}

/**
 * Replacement venue albums supplied by the site owner.  The filenames in
 * each list deliberately follow the source-folder sort order, so the first
 * image becomes the hero backdrop and the gallery order remains predictable.
 * Oceanic Royal Spa is intentionally absent: it keeps its existing album.
 */
export const replacementVenueGalleryFiles: Partial<Record<VenueSlug, readonly string[]>> = {
  "clube-rio": [
    "macau-sauna-spa-clube-rio-repaired-01",
    "macau-sauna-spa-clube-rio-repaired-02",
    "macau-sauna-spa-clube-rio-repaired-03",
    "macau-sauna-spa-clube-rio-repaired-04",
    "macau-sauna-spa-clube-rio-repaired-05",
  ],
  "yu-sauna": [
    "macau-sauna-spa-yu-sauna-gallery-20260827-01",
    "macau-sauna-spa-yu-sauna-gallery-20260827-02",
    "macau-sauna-spa-yu-sauna-gallery-20260827-03",
    "macau-sauna-spa-yu-sauna-gallery-20260827-05",
    "macau-sauna-spa-yu-sauna-gallery-20260827-06",
    "macau-sauna-spa-yu-sauna-gallery-20260827-07",
    "macau-sauna-spa-yu-sauna-gallery-20260827-08",
    "macau-sauna-spa-yu-sauna-gallery-20260827-09",
    "macau-sauna-spa-yu-sauna-gallery-20260827-10",
    "macau-sauna-spa-yu-sauna-gallery-20260827-11",
  ],
  "manhao-spa": [
    "macau-sauna-spa-manhao-placed-20260624-01",
    "macau-sauna-spa-manhao-placed-20260624-02",
    "macau-sauna-spa-manhao-placed-20260624-03",
    "macau-sauna-spa-manhao-placed-20260624-04",
    "macau-sauna-spa-manhao-placed-20260624-05",
    "macau-sauna-spa-manhao-placed-20260624-06",
    "macau-sauna-spa-manhao-placed-20260624-07",
    "macau-sauna-spa-manhao-placed-20260624-08",
    "macau-sauna-spa-manhao-placed-20260624-09",
    "macau-sauna-spa-manhao-placed-20260624-10",
    "macau-sauna-spa-manhao-placed-20260624-11",
  ],
  "number-nine-sauna": [
    "macau-sauna-spa-number-nine-placed-20260624-01",
    "macau-sauna-spa-number-nine-placed-20260624-03",
    "macau-sauna-spa-number-nine-placed-20260624-04",
    "macau-sauna-spa-number-nine-placed-20260624-05",
    "macau-sauna-spa-number-nine-placed-20260624-06",
    "macau-sauna-spa-number-nine-placed-20260624-08",
  ],
  "shang-pin-spa": [
    "macau-sauna-spa-elite-placed-20260624-01",
    "macau-sauna-spa-elite-placed-20260624-02",
    "macau-sauna-spa-elite-placed-20260624-03",
    "macau-sauna-spa-elite-placed-20260624-04",
    "macau-sauna-spa-elite-placed-20260624-05",
    "macau-sauna-spa-elite-placed-20260624-06",
    "macau-sauna-spa-elite-placed-20260624-07",
    "macau-sauna-spa-elite-placed-20260624-08",
    "macau-sauna-spa-elite-placed-20260624-10",
    "macau-sauna-spa-elite-placed-20260624-11",
    "macau-sauna-spa-elite-placed-20260624-12",
  ],
  "majesty-spa": [
    "macau-sauna-spa-majesty-gallery-202607-01",
    "macau-sauna-spa-majesty-gallery-202607-02",
    "macau-sauna-spa-majesty-gallery-202607-03",
    "macau-sauna-spa-majesty-gallery-202607-04",
    "macau-sauna-spa-majesty-gallery-202607-05",
    "macau-sauna-spa-majesty-gallery-202607-06",
    "macau-sauna-spa-majesty-gallery-202607-07",
    "macau-sauna-spa-majesty-gallery-202607-08",
    "macau-sauna-spa-majesty-gallery-202607-09",
    "macau-sauna-spa-majesty-gallery-202607-10",
    "macau-sauna-spa-majesty-gallery-202607-11",
    "macau-sauna-spa-majesty-gallery-202607-12",
    "macau-sauna-spa-majesty-gallery-202607-16",
    "macau-sauna-spa-majesty-gallery-202607-17",
    "macau-sauna-spa-majesty-gallery-202607-18",
    "macau-sauna-spa-majesty-gallery-202607-19",
    "macau-sauna-spa-majesty-gallery-202607-20",
    "macau-sauna-spa-majesty-gallery-202607-21",
    "macau-sauna-spa-majesty-gallery-202607-22",
    "macau-sauna-spa-majesty-gallery-202607-23",
    "macau-sauna-spa-majesty-gallery-202607-24",
    "macau-sauna-spa-majesty-gallery-202607-25",
    "macau-sauna-spa-majesty-gallery-202607-26",
    "macau-sauna-spa-majesty-gallery-202607-29",
    "macau-sauna-spa-majesty-gallery-202607-30",
  ],
  "the-excellent-sauna": [
    "macau-sauna-spa-excellent-gallery-202607-01",
    "macau-sauna-spa-excellent-gallery-202607-02",
    "macau-sauna-spa-excellent-gallery-202607-03",
    "macau-sauna-spa-excellent-gallery-202607-04",
    "macau-sauna-spa-excellent-gallery-202607-05",
    "macau-sauna-spa-excellent-gallery-202607-06",
    "macau-sauna-spa-excellent-gallery-202607-07",
    "macau-sauna-spa-excellent-placed-20260624-01",
    "macau-sauna-spa-excellent-placed-20260624-02",
    "macau-sauna-spa-excellent-placed-20260624-03",
    "macau-sauna-spa-excellent-placed-20260624-04",
    "macau-sauna-spa-excellent-placed-20260624-05",
    "macau-sauna-spa-excellent-placed-20260624-06",
    "macau-sauna-spa-excellent-placed-20260624-07",
  ],
  "empire-sauna": [
    "macau-sauna-spa-empire-placed-20260624-01",
    "macau-sauna-spa-empire-placed-20260624-02",
    "macau-sauna-spa-empire-placed-20260624-03",
    "macau-sauna-spa-empire-placed-20260624-04",
    "macau-sauna-spa-empire-placed-20260624-05",
    "macau-sauna-spa-empire-placed-20260624-06",
    "macau-sauna-spa-empire-placed-20260624-07",
    "macau-sauna-spa-empire-placed-20260624-08",
    "macau-sauna-spa-empire-placed-20260624-09",
    "macau-sauna-spa-empire-placed-20260624-10",
    "macau-sauna-spa-empire-placed-20260624-11",
    "macau-sauna-spa-empire-placed-20260624-12",
  ],
  "east-castle-spa": [
    "macau-sauna-spa-east-castle-gallery-202607-02",
    "macau-sauna-spa-east-castle-gallery-202607-03",
    "macau-sauna-spa-east-castle-gallery-202607-08",
    "macau-sauna-spa-east-castle-gallery-202607-09",
    "macau-sauna-spa-east-castle-gallery-202607-11",
    "macau-sauna-spa-east-castle-gallery-202607-13",
    "macau-sauna-spa-east-castle-gallery-202607-14",
    "macau-sauna-spa-east-castle-gallery-202607-16",
    "macau-sauna-spa-east-castle-placed-20260624-02",
    "macau-sauna-spa-east-castle-placed-20260624-03",
    "macau-sauna-spa-east-castle-placed-20260624-04",
    "macau-sauna-spa-east-castle-placed-20260624-05",
    "macau-sauna-spa-east-castle-placed-20260624-06",
    "macau-sauna-spa-east-castle-placed-20260624-07",
    "macau-sauna-spa-east-castle-placed-20260624-08",
    "macau-sauna-spa-east-castle-placed-20260624-09",
    "macau-sauna-spa-east-castle-placed-20260624-10",
    "macau-sauna-spa-east-castle-placed-20260624-11",
  ],
  "victoria-sauna": [
    "macau-sauna-spa-victoria-gallery-202607-01",
    "macau-sauna-spa-victoria-gallery-202607-02",
    "macau-sauna-spa-victoria-gallery-202607-03",
    "macau-sauna-spa-victoria-gallery-202607-04",
    "macau-sauna-spa-victoria-gallery-202607-06",
    "macau-sauna-spa-victoria-placed-20260624-07",
    "macau-sauna-spa-victoria-placed-20260624-08",
    "macau-sauna-spa-victoria-placed-20260624-09",
  ],
  "m-club": [
    "macau-sauna-spa-mclub-gallery-202607-02",
    "macau-sauna-spa-mclub-gallery-202607-03",
    "macau-sauna-spa-mclub-gallery-202607-04",
    "macau-sauna-spa-mclub-gallery-202607-05",
    "macau-sauna-spa-mclub-gallery-202607-06",
    "macau-sauna-spa-mclub-gallery-202607-07",
    "macau-sauna-spa-mclub-gallery-202607-08",
    "macau-sauna-spa-mclub-gallery-202607-09",
    "macau-sauna-spa-mclub-gallery-202607-10",
    "macau-sauna-spa-mclub-gallery-202607-12",
    "macau-sauna-spa-mclub-gallery-202607-13",
    "macau-sauna-spa-mclub-gallery-202607-14",
    "macau-sauna-spa-mclub-gallery-202607-15",
    "macau-sauna-spa-mclub-gallery-202607-16",
    "macau-sauna-spa-mclub-gallery-202607-17",
    "macau-sauna-spa-mclub-placed-20260624-07",
    "macau-sauna-spa-mclub-placed-20260624-08",
    "macau-sauna-spa-mclub-placed-20260624-09",
    "macau-sauna-spa-mclub-placed-20260624-10",
    "macau-sauna-spa-mclub-placed-20260624-11",
    "macau-sauna-spa-mclub-placed-20260624-12",
    "macau-sauna-spa-mclub-placed-20260624-14",
  ],
  "number-one-sauna": [
    "macau-sauna-spa-number-one-gallery-202607-01",
    "macau-sauna-spa-number-one-gallery-202607-02",
    "macau-sauna-spa-number-one-gallery-202607-03",
    "macau-sauna-spa-number-one-gallery-202607-04",
    "macau-sauna-spa-number-one-gallery-202607-05",
    "macau-sauna-spa-number-one-gallery-202607-06",
    "macau-sauna-spa-number-one-gallery-202607-07",
    "macau-sauna-spa-number-one-gallery-202607-08",
    "macau-sauna-spa-number-one-gallery-202607-09",
    "macau-sauna-spa-number-one-gallery-202607-10",
  ],
  "familia-nobre": [
    "macau-sauna-spa-familia-nobre-gallery-202607-01",
    "macau-sauna-spa-familia-nobre-gallery-202607-05",
    "macau-sauna-spa-familia-nobre-gallery-202607-06",
    "macau-sauna-spa-familia-nobre-gallery-202607-07",
    "macau-sauna-spa-familia-nobre-placed-20260624-03",
    "macau-sauna-spa-familia-nobre-placed-20260624-04",
    "macau-sauna-spa-familia-nobre-placed-20260624-05",
    "macau-sauna-spa-familia-nobre-placed-20260624-06",
    "macau-sauna-spa-familia-nobre-placed-20260624-07",
  ],
  "eighteen-sauna": [
    "macau-sauna-spa-eighteen-gallery-202607-01",
    "macau-sauna-spa-eighteen-gallery-202607-02",
    "macau-sauna-spa-eighteen-gallery-202607-03",
    "macau-sauna-spa-eighteen-gallery-202607-04",
    "macau-sauna-spa-eighteen-gallery-202607-05",
    "macau-sauna-spa-eighteen-gallery-202607-06",
    "macau-sauna-spa-eighteen-gallery-202607-07",
  ],
};

export function getReplacementVenueGallery(
  slug: VenueSlug,
  lang: Locale,
): VenueGalleryImage[] | undefined {
  const files = replacementVenueGalleryFiles[slug];
  if (!files) return undefined;

  return files.map((file) => {
    const copy = replacementVenueGalleryCopy[file]?.[lang];
    if (!copy) {
      throw new Error(`Missing ${lang} gallery copy for ${slug}/${file}`);
    }

    return { file, ...copy };
  });
}
