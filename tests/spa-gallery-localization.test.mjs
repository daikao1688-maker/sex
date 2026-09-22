import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const labels = {
  en: ['Previous photo', 'Next photo', 'Photo {current} of {total}'],
  'zh-TW': ['上一張相片', '下一張相片', '第 {current} 張相片，共 {total} 張'],
  'zh-CN': ['上一张照片', '下一张照片', '第 {current} 张照片，共 {total} 张'],
  ja: ['前の写真', '次の写真', '全{total}枚中{current}枚目'],
  ko: ['이전 사진', '다음 사진', '사진 {total}장 중 {current}번째'],
};

test('all venue galleries expose localized navigation with counts matching available photos', async () => {
  for (const [locale, [previous, next, count]] of Object.entries(labels)) {
    const directory = new URL(`../dist/${locale}/spa/`, import.meta.url);
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const html = await readFile(new URL(`${entry.name}/index.html`, directory), 'utf8');
      const images = [...html.matchAll(/<button\b[^>]*\bdata-gallery-open\b[^>]*>/g)];
      if (!images.length) {
        assert.doesNotMatch(html, /data-gallery-lightbox/);
        continue;
      }
      const prev = html.match(/<button\b[^>]*\bdata-gallery-prev\b[^>]*>/)?.[0];
      const nextButton = html.match(/<button\b[^>]*\bdata-gallery-next\b[^>]*>/)?.[0];
      assert.ok(prev?.includes(`aria-label="${previous}"`), `${locale}/${entry.name}: previous label`);
      assert.ok(nextButton?.includes(`aria-label="${next}"`), `${locale}/${entry.name}: next label`);
      assert.equal(/\bhidden(?:\s|=|>)/.test(prev), images.length < 2);
      assert.equal(/\bhidden(?:\s|=|>)/.test(nextButton), images.length < 2);
      assert.ok(html.includes(`data-count-template="${count}"`));
      assert.doesNotMatch(html, /<figcaption\b|\bdata-caption=|\bdata-gallery-caption\b/i, `${locale}/${entry.name}: gallery descriptions must be absent`);
    }
  }
});
