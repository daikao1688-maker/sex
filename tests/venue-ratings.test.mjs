import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];
const moduleServer = () => createServer({
  root,
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
});

test('every localized venue title shows the shared editorial score on a five-star scale', async (t) => {
  const server = await moduleServer();
  t.after(() => server.close());
  const { venues } = await server.ssrLoadModule('/src/data/venues.ts');
  for (const locale of locales) {
    for (const venue of venues) {
      const html = await readFile(`${root}/dist/${locale}/spa/${venue.slug}/index.html`, 'utf8');
      const row = html.match(/<div\b(?=[^>]*\bdata-venue-rating)[^>]*>[\s\S]*?<\/div>/)?.[0];
      assert.ok(row, `${locale}/${venue.slug}: title rating is missing`);
      assert.ok(html.indexOf(row) > html.indexOf('</h1>'), 'rating must follow the venue title');
      assert.match(row, /role="img"/);
      assert.ok(row.includes(`${venue.rating} / 5`), 'accessible label must state the score and maximum');
      assert.equal((row.match(/data-rating-star="filled"/g) ?? []).length, venue.rating);
      assert.equal((row.match(/data-rating-star="empty"/g) ?? []).length, 5 - venue.rating);
      assert.ok(row.includes(`${venue.rating.toFixed(1)}`), 'numeric score must accompany the stars');
    }
  }
});

test('one central rating edit reaches venue facts and localized feature stars', async (t) => {
  const server = await moduleServer();
  t.after(() => server.close());
  const { venueRatings } = await server.ssrLoadModule('/src/data/venueRatings.ts');
  const original = venueRatings['shang-pin-spa'];
  try {
    venueRatings['shang-pin-spa'] = 2;
    const { venues } = await server.ssrLoadModule('/src/data/venues.ts');
    const venue = venues.find((entry) => entry.slug === 'shang-pin-spa');
    assert.equal(venue.rating, 2, 'consumers of shared venue facts must receive the edited score');
    const { getSpaPageCopy } = await server.ssrLoadModule('/src/i18n/pages/spa.ts');
    const { resolveVenueDetail } = await server.ssrLoadModule('/src/lib/spaDetail.ts');
    for (const locale of locales) {
      const { default: dictionary } = await server.ssrLoadModule(`/src/i18n/locales/${locale}.ts`);
      const detail = resolveVenueDetail(venue, getSpaPageCopy(locale), dictionary);
      const ratingFeature = detail.features.find((feature) => feature.includes('⭐'));
      assert.ok(ratingFeature, `${locale}: rating feature is missing`);
      assert.equal((ratingFeature.match(/⭐/gu) ?? []).length, 2, `${locale}: feature kept a stale score`);
      assert.ok(!detail.features.some((feature) => feature.includes('{ratingStars}')));
    }
  } finally {
    venueRatings['shang-pin-spa'] = original;
  }
});

test('manual rating edits fail clearly for missing, fractional or out-of-range values', async (t) => {
  const server = await moduleServer();
  t.after(() => server.close());
  const { venueRatings, getVenueRating } = await server.ssrLoadModule('/src/data/venueRatings.ts');
  const original = venueRatings['number-nine-sauna'];
  try {
    for (const invalid of [undefined, 0, 6, 4.5, NaN, '5']) {
      venueRatings['number-nine-sauna'] = invalid;
      assert.throws(() => getVenueRating('number-nine-sauna'), /number-nine-sauna.*1 to 5.*venueRatings\.ts/);
    }
    for (const valid of [1, 5]) {
      venueRatings['number-nine-sauna'] = valid;
      assert.equal(getVenueRating('number-nine-sauna'), valid);
    }
  } finally {
    venueRatings['number-nine-sauna'] = original;
  }
});
