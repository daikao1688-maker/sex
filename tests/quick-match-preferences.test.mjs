import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
import { createServer } from 'vite';

let server, matching, bookableVenues;
before(async () => {
  server = await createServer({
    root: fileURLToPath(new URL('..', import.meta.url)), configFile: false,
    server: { middlewareMode: true, hmr: false }, appType: 'custom',
  });
  matching = await server.ssrLoadModule('/src/lib/quickMatch.ts');
  ({ bookableVenues } = await server.ssrLoadModule('/src/data/venues.ts'));
});
after(() => server?.close());

test('value matching gives progressively cheaper listed prices a stronger preference', () => {
  const baseline = { ...bookableVenues[0], rating: 3, open24h: false, ktv: false, themeRooms: false };
  const candidates = [
    { ...baseline, slug: 'expensive', priceMin: 4000, rating: 5 },
    { ...baseline, slug: 'mid', priceMin: 3000 },
    { ...baseline, slug: 'affordable', priceMin: 2000 },
  ];
  const ranked = matching.rankVenues(matching.defaultSelection, candidates);
  assert.equal(matching.defaultSelection.experience, 'value');
  assert.deepEqual(ranked.map(({ venue }) => venue.slug), ['affordable', 'mid', 'expensive']);
  assert.ok(ranked[0].score > ranked[1].score && ranked[1].score > ranked[2].score);
  const reversedPrices = candidates.map((venue) => ({ ...venue, priceMin: 6000 - venue.priceMin }));
  assert.equal(matching.rankVenues(matching.defaultSelection, reversedPrices)[0].venue.slug, 'expensive');
  assert.deepEqual(matching.rankVenues(matching.defaultSelection, []), []);
});

test('Taipa matching follows location and is independent of old show or nationality flags', () => {
  const baseline = { ...bookableVenues[0], open24h: false, ktv: false, themeRooms: false };
  const taipa = { ...baseline, slug: 'taipa', district: 'taipa', recommendedShow: false, jpkr: false, rating: 3 };
  const peninsula = { ...baseline, slug: 'peninsula', district: 'peninsula', recommendedShow: true, jpkr: true, rating: 5 };
  const selection = { ...matching.defaultSelection, experience: 'taipa' };
  assert.equal(matching.rankVenues(selection, [peninsula, taipa])[0].venue.slug, 'taipa');
  const swapped = [
    { ...peninsula, district: 'taipa' },
    { ...taipa, district: 'peninsula' },
  ];
  assert.equal(matching.rankVenues(selection, swapped)[0].venue.slug, 'peninsula');
  for (const venue of bookableVenues.map(matching.toQuickMatchVenue)) {
    for (const removed of ['recommendedShow', 'jpkr', 'buckets']) assert.equal(removed in venue, false);
  }
});

// Execute the shipped client handler with the DOM boundary substituted. The
// matching implementation and localized configuration come from the site.
function clientHarness(script, config) {
  class Element {
    dataset = {};
    listeners = new Map();
    attributes = new Map();
    classList = { add() {}, remove() {} };
    addEventListener(name, handler) { this.listeners.set(name, handler); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    getAttribute(name) { return this.attributes.get(name); }
  }
  const whatsapp = new Element(), telegram = new Element(), status = new Element();
  const options = Object.keys(config.labels.experience).map((value) => {
    const element = new Element();
    element.dataset = { field: 'experience', value };
    return element;
  });
  const root = {
    querySelector: (selector) => ({
      '[data-qm-whatsapp]': whatsapp, '[data-qm-telegram]': telegram,
      '[data-qm-result-status]': status,
    })[selector] ?? null,
    querySelectorAll: () => options,
  };
  const document = {
    querySelector: (selector) => selector === '.qm-root' ? root : { textContent: JSON.stringify(config) },
  };
  vm.runInNewContext(script, {
    document, defaultSelection: matching.defaultSelection, rankVenues: matching.rankVenues,
  });
  return {
    choose(value) {
      const option = options.find((option) => option.dataset.value === value);
      option.listeners.get('click')();
      assert.equal(option.getAttribute('aria-pressed'), 'true');
    }, whatsapp, telegram, status,
  };
}

test('five-language preference clicks update results and both outgoing enquiry messages', async () => {
  const source = await readFile(new URL('../src/components/QuickMatch.astro', import.meta.url), 'utf8');
  const clientSource = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  const script = ts.transpileModule(clientSource, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText.replace(/^import[^\n]+\n/gm, '').replace(/^export \{\};?\s*$/gm, '');
  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko']) {
    const preview = process.env.QUICK_MATCH_TEST_BASE_URL;
    const page = preview
      ? await fetch(new URL(`/${locale}/`, preview)).then((response) => {
        assert.equal(response.status, 200);
        return response.text();
      })
      : await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
    const config = JSON.parse(page.match(/<script\b[^>]*data-qm-config[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(Object.keys(config.labels.experience), ['value', 'theme', 'taipa', 'new', 'ktv', 'classic']);
    assert.ok(config.candidates.every((venue) => !('recommendedShow' in venue) && !('jpkr' in venue)));
    const client = clientHarness(script, config);
    for (const experience of ['taipa', 'value']) {
      client.choose(experience);
      const selection = { ...matching.defaultSelection, experience };
      const best = matching.rankVenues(selection, config.candidates)[0];
      const name = config.venues[best.venue.slug].name;
      assert.ok(client.status.textContent.includes(name), `${locale}: result did not update`);
      if (experience === 'taipa') assert.equal(best.venue.district, 'taipa');
      for (const link of [client.whatsapp, client.telegram]) {
        const message = new URL(link.href).searchParams.get('text');
        assert.ok(message.includes(config.labels.experience[experience]), `${locale}: enquiry lost selected preference`);
        assert.ok(message.includes(name), `${locale}: enquiry has a stale recommendation`);
      }
    }
  }
});
