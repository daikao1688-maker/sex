import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const dist = new URL('../dist/', import.meta.url);
const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];

for (const locale of locales) {
  test(`${locale}: KakaoTalk is removed from every page while WeChat stays available`, async () => {
    const files = await readdir(new URL(`${locale}/`, dist), { recursive: true });
    let checked = 0;
    for (const file of files.filter((name) => name.endsWith('.html'))) {
      const html = await readFile(new URL(`${locale}/${file}`, dist), 'utf8');
      assert.doesNotMatch(html, /kakaotalk|카카오톡/i, `${locale}/${file}: removed contact is still present`);
      const areas = (html.match(/\bdata-contact-channels(?:[\s=>])/g) ?? []).length;
      if (!areas) continue;
      checked++;
      const cards = [...html.matchAll(/<(?:a|button)\b[^>]*\bdata-contact-channel(?:[\s=>])[^>]*>/g)];
      assert.equal(cards.length, areas * 4, `${locale}/${file}: keep the other four contact channels`);
      const wechat = cards.filter(([card]) => /data-wechat-trigger/.test(card));
      assert.equal(wechat.length, areas, `${locale}/${file}: WeChat card must remain`);
      assert.match(wechat[0][0], /aria-controls="wechat-modal"/);
      assert.equal((html.match(/id="wechat-modal"/g) ?? []).length, 1);
      assert.match(html, /data-copy-wechat="gh34366"/, 'retain the existing WeChat ID');
      assert.match(html, /src="\/wechat-qr\.webp"/, 'retain the existing WeChat QR');
    }
    assert.ok(checked >= 20, `expected site-wide contact coverage, got ${checked}`);
  });
}
