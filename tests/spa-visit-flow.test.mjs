import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];
const packageStepCopy = {
  en: ['Choose a package', 'The staff on site will introduce the different packages to help you make your choice.'],
  'zh-TW': ['選擇套餐', '現場的工作人員會為您介紹不同的套餐，以便您進行選擇。'],
  'zh-CN': ['选择套餐', '现场的工作人员会为您介绍不同的套餐，以便您进行选择。'],
  ja: ['プランを選ぶ', '現地スタッフが各種プランをご紹介し、お客様のプラン選びをお手伝いします。'],
  ko: ['패키지 선택', '현장 직원이 다양한 패키지를 소개해 드려 선택하실 수 있도록 도와드립니다.'],
};
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#39;').replaceAll('"', '&quot;');

test('all venue pages render the eight supplied steps in every locale', async (t) => {
  const server = await createServer({ root, configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  t.after(() => server.close());
  const { venues } = await server.ssrLoadModule('/src/data/venues.ts');
  const { getDictionary } = await server.ssrLoadModule('/src/i18n/index.ts');
  const { getSpaVisitFlow } = await server.ssrLoadModule('/src/i18n/pages/spaVisitFlow.ts');

  for (const lang of locales) {
    const dictionary = getDictionary(lang);
    for (const venue of venues) {
      const name = dictionary.spas.venues[venue.slug].name;
      const steps = getSpaVisitFlow(lang, name);
      const html = await readFile(`${root}/dist/${lang}/spa/${venue.slug}/index.html`, 'utf8');
      const flow = html.split('data-testid="spa-flow"')[1]?.split('data-testid="spa-flow-vip-reminder"')[0] ?? '';
      assert.equal(steps.length, 8, `${lang}/${venue.slug}: eight steps are required`);
      assert.equal((flow.match(/class="flow-step\s/g) ?? []).length, 8, `${lang}/${venue.slug}: all steps must reach the page`);
      for (const step of steps) {
        assert.ok(flow.includes(escapeHtml(step.title)), `${lang}/${venue.slug}: missing step title`);
        assert.ok(flow.includes(escapeHtml(step.body)), `${lang}/${venue.slug}: missing step instructions`);
        assert.ok(!step.title.includes('{venue}') && !step.body.includes('{venue}'), 'venue placeholder must be resolved');
      }
      for (const index of [0, 4]) {
        assert.ok(steps[index].body.includes(name), `${lang}/${venue.slug}: wrong venue name in step ${index + 1}`);
      }
      assert.ok(steps[1].title.includes(name), `${lang}/${venue.slug}: arrival title must use the venue name`);
      assert.match(steps[0].body, /10/, 'the ten-minute arrival must be translated');
      assert.deepEqual([steps[5].title, steps[5].body], packageStepCopy[lang], 'step six must use the requested package-selection copy');
      assert.match(steps[6].body, /40/, 'the additional lounge massage duration must be translated');
    }
  }
});
