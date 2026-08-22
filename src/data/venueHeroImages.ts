export interface VenueHeroImageMetadata {
  width: number;
  height: number;
}

/**
 * Intrinsic geometry for the lead venue-gallery images used as detail-page
 * heroes. Tests compare these values with the checked-in WebP files so a
 * gallery-order or asset change cannot silently reintroduce layout shift.
 */
export const venueHeroImageMetadata: Record<string, VenueHeroImageMetadata> = {
  "macau-sauna-spa-clube-rio-repaired-01": { width: 1448, height: 1086 },
  "macau-sauna-spa-east-castle-gallery-202607-02": { width: 1448, height: 1086 },
  "macau-sauna-spa-eighteen-gallery-202607-01": { width: 1280, height: 720 },
  "macau-sauna-spa-elite-placed-20260624-01": { width: 1280, height: 960 },
  "macau-sauna-spa-empire-placed-20260624-01": { width: 1280, height: 1024 },
  "macau-sauna-spa-excellent-gallery-202607-01": { width: 1448, height: 1086 },
  "macau-sauna-spa-familia-nobre-gallery-202607-01": { width: 1448, height: 1086 },
  "macau-sauna-spa-majesty-gallery-202607-01": { width: 1448, height: 1086 },
  "macau-sauna-spa-manhao-placed-20260624-01": { width: 1254, height: 1254 },
  "macau-sauna-spa-mclub-gallery-202607-02": { width: 1448, height: 1086 },
  "macau-sauna-spa-number-nine-placed-20260624-01": { width: 1280, height: 720 },
  "macau-sauna-spa-number-one-gallery-202607-01": { width: 1024, height: 1536 },
  "macau-sauna-spa-oceanic-placed-20260624-01": { width: 1280, height: 960 },
  "macau-sauna-spa-victoria-gallery-202607-01": { width: 1448, height: 1086 },
};
