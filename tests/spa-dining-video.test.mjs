import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];
const interiorSlugs = [
  'yu-sauna', 'east-castle-spa', 'familia-nobre', 'number-nine-sauna',
  'empire-sauna', 'victoria-sauna', 'manhao-spa', 'shang-pin-spa',
  'eighteen-sauna', 'number-one-sauna', 'majesty-spa',
];
const noInteriorSlugs = ['the-excellent-sauna', 'm-club', 'oceanic-royal-spa'];

test('every venue page renders the shared video modal and the dining card', async (t) => {
  const server = await createServer({ root, configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  t.after(() => server.close());
  const { venues, isVenueVisible } = await server.ssrLoadModule('/src/data/venues.ts');
  const visibleVenues = venues.filter((venue) => isVenueVisible(venue.slug));

  for (const lang of locales) {
    for (const venue of visibleVenues) {
      const html = await readFile(`${root}/dist/${lang}/spa/${venue.slug}/index.html`, 'utf8');
      assert.ok(html.includes('data-video-open'), `${lang}/${venue.slug}: missing a video card trigger`);
      assert.ok(html.includes('data-video-src="/videos/yu-sauna-dining.mp4"'), `${lang}/${venue.slug}: missing the dining card source`);
      assert.equal((html.match(/data-video-modal aria-hidden/g) ?? []).length, 1, `${lang}/${venue.slug}: exactly one shared modal`);
      assert.ok(html.includes('data-video-close'), `${lang}/${venue.slug}: missing the modal close button`);
      assert.ok(html.includes('data-video-modal-title'), `${lang}/${venue.slug}: missing the dynamic modal title`);
      assert.ok(html.includes('preload="none"'), `${lang}/${venue.slug}: video must not preload before the click`);
      assert.ok(!/<video[^>]*\ssrc=/.test(html), `${lang}/${venue.slug}: video src must be injected on click, not shipped`);
    }
  }
});

test('venues with their own footage render the interior cinema card', async () => {
  for (const lang of locales) {
    for (const slug of interiorSlugs) {
      const html = await readFile(`${root}/dist/${lang}/spa/${slug}/index.html`, 'utf8');
      assert.ok(html.includes(`data-video-src="/videos/${slug}-interior.mp4"`), `${lang}/${slug}: missing interior video source`);
      assert.ok(html.includes(`/videos/${slug}-interior-poster.jpg`), `${lang}/${slug}: missing interior poster`);
      assert.ok(html.includes('interior-video-preview'), `${lang}/${slug}: missing the cinema card`);
    }
  }
});

test('venues without footage render no interior card but keep the dining card', async () => {
  for (const lang of locales) {
    for (const slug of noInteriorSlugs) {
      const html = await readFile(`${root}/dist/${lang}/spa/${slug}/index.html`, 'utf8');
      assert.ok(!html.includes('-interior.mp4'), `${lang}/${slug}: unexpected interior video`);
      assert.ok(html.includes('data-video-open'), `${lang}/${slug}: dining card must remain`);
    }
  }
});

test('the dining card stays inside the flow step and keeps the eight-step count intact', async () => {
  const html = await readFile(`${root}/dist/zh-TW/spa/yu-sauna/index.html`, 'utf8');
  const flow = html.split('data-testid="spa-flow"')[1]?.split('data-testid="spa-flow-vip-reminder"')[0] ?? '';
  assert.ok(flow.includes('data-video-open'), 'dining card must live inside the flow section');
  assert.equal((flow.match(/class="flow-step\s/g) ?? []).length, 8, 'the card must not add flow steps');
});
