import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];
const dist = new URL('../dist/', import.meta.url);
const hiddenNames = /clube-rio|Clube Rio|Club Rio|利澳[薈荟]|クラブ・リオ|클루브 리오|클럽 리오/iu;

test('hidden venue is absent from every public page, data feed and browser bundle', async () => {
  for (const locale of locales) {
    await assert.rejects(access(new URL(`${locale}/spa/clube-rio/index.html`, dist)), { code: 'ENOENT' });
    const venues = await readdir(new URL(`${locale}/spa/`, dist));
    assert.equal(venues.length, 14, `${locale}: all other venue pages must remain available`);
  }
  const files = (await readdir(dist, { recursive: true }))
    .filter((file) => /\.(?:html|xml|txt|js|json)$/.test(file));
  for (const file of files) {
    assert.doesNotMatch(await readFile(new URL(file, dist), 'utf8'), hiddenNames, file);
  }
});

test('hidden venue images stay in source but are not published', async () => {
  for (const directory of ['covers', 'media']) {
    const source = new URL(`../public/${directory}/`, import.meta.url);
    const retained = (await readdir(source)).filter((file) => file.includes('clube-rio'));
    assert.ok(retained.length > 0, 'images must be retained for reactivation');
    const published = await readdir(new URL(`${directory}/`, dist));
    assert.ok(!published.some((file) => file.includes('clube-rio')), directory);
  }
});

test('deployment blocks old hidden-venue pages left on the host', async () => {
  const htaccess = await readFile(new URL('.htaccess', dist), 'utf8');
  assert.match(htaccess, /RedirectMatch 404 .*spa\/\(clube-rio\).*index/);
});

test('Quick Match uses only public candidates for every selection', async (t) => {
  const server = await createServer({ root: fileURLToPath(new URL('..', import.meta.url)), configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  t.after(() => server.close());
  const { bookableVenues } = await server.ssrLoadModule('/src/data/venues.ts');
  const { rankVenues } = await server.ssrLoadModule('/src/lib/quickMatch.ts');
  assert.equal(bookableVenues.length, 9);
  for (const group of ['solo', 'pair', 'small', 'large']) {
    for (const experience of ['show', 'theme', 'jpkr', 'new', 'ktv', 'classic']) {
      for (const when of ['now', 'tonight', 'tomorrow', 'sat', 'sun', 'other']) {
        for (const from of ['border', 'hotel', 'airport', 'other']) {
          for (const overnight of [false, true]) {
            const result = rankVenues({ group, experience, when, from, overnight }, bookableVenues);
            assert.equal(result.length, 9);
            assert.ok(result.every(({ venue }) => venue.slug !== 'clube-rio'));
          }
        }
      }
    }
  }
});

test('one visibility switch restores retained venue data and all localized references', async (t) => {
  const server = await createServer({ root: fileURLToPath(new URL('..', import.meta.url)), configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  t.after(() => server.close());
  // Mutate only this isolated module graph, never the on-disk visibility setting.
  const { default: visibility } = await server.ssrLoadModule('/src/data/venueVisibility.json');
  visibility['clube-rio'] = true;
  const { venues, bookableVenues } = await server.ssrLoadModule('/src/data/venues.ts');
  const { getDictionary } = await server.ssrLoadModule('/src/i18n/index.ts');
  const { getGuideCopy } = await server.ssrLoadModule('/src/i18n/pages/guide.ts');
  const { getReplacementVenueGallery } = await server.ssrLoadModule('/src/data/venueGalleries.ts');
  assert.equal(venues.length, 15);
  assert.ok(bookableVenues.some((venue) => venue.slug === 'clube-rio'));
  for (const locale of locales) {
    const dictionary = getDictionary(locale);
    assert.match(dictionary.hero.venueGroups.join('\n'), hiddenNames, locale);
    assert.match(dictionary.spas.intro, /15/);
    assert.ok(getGuideCopy(locale).recommendations.cards.some(({ slug }) => slug === 'clube-rio'));
    assert.equal(getReplacementVenueGallery('clube-rio', locale).length, 5);
  }
});
