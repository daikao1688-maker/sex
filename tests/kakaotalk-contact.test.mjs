import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import sharp from 'sharp';

const dist = new URL('../dist/', import.meta.url);
const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];
const tag = (html, selector) => html.match(new RegExp(`<[^>]*${selector}[^>]*>`, 'i'))?.[0] ?? '';

// Catches a missing channel/modal in either the home or shared subpage shell,
// accidental external navigation, wrong QR assets, IDs, or unexpanded locale copy.
for (const locale of locales) {
  test(`${locale}: every contact area offers a local KakaoTalk QR and copy action`, async () => {
    const files = await readdir(new URL(`${locale}/`, dist), { recursive: true });
    let checked = 0;
    for (const file of files.filter((name) => name.endsWith('.html'))) {
      const html = await readFile(new URL(`${locale}/${file}`, dist), 'utf8');
      const areas = (html.match(/\bdata-contact-channels(?:[\s=>])/g) ?? []).length;
      if (!areas) continue;
      checked++;
      const buttons = [...html.matchAll(/<button\b[^>]*data-kakaotalk-trigger[^>]*>/g)]
        .filter(([button]) => /\bdata-contact-channel(?:[\s=>])/.test(button));
      assert.equal(buttons.length, areas, `${locale}/${file}: missing KakaoTalk contact button`);
      for (const [button] of buttons) {
        assert.match(button, /aria-controls="kakaotalk-modal"/);
        assert.match(button, /aria-haspopup="dialog"/);
        assert.doesNotMatch(button, /href=|target=/);
      }
      assert.equal((html.match(/id="kakaotalk-modal"/g) ?? []).length, 1);
      const modal = tag(html, 'id="kakaotalk-modal"');
      assert.match(modal, /role="dialog"/);
      assert.match(modal, /aria-labelledby="kakaotalk-modal-title"/);
      assert.match(modal, /\bhidden(?:[\s=>])/);
      const qr = tag(html, 'src="/kakaotalk-qr.webp"');
      assert.match(qr, /width="192"/);
      assert.match(qr, /height="210"/);
      assert.match(qr, /alt="[^"]*gh34366[^"]*"/);
      assert.match(tag(html, 'id="kakaotalk-copy-btn"'), /data-copy-kakaotalk="gh34366"/);
      assert.match(tag(html, 'id="kakaotalk-copy-label"'), /aria-live="polite"/);
      assert.match(tag(html, 'id="kakaotalk-copy-fallback"'), /value="gh34366"/);
      const dialogCopy = html.slice(html.indexOf('id="kakaotalk-modal"'));
      assert.doesNotMatch(dialogCopy, /\{id\}|undefined/);
      if (locale === 'ko') assert.match(dialogCopy, /카카오톡/);
      assert.ok(tag(html, 'id="wechat-modal"'), 'existing WeChat modal must remain');
    }
    assert.ok(checked >= 20, `expected site-wide contact coverage, got ${checked}`);
  });
}

// A corrupt, resized, lossy or wrong QR can prevent customers adding the account.
// This is the independently measured decoded pixel hash of the user's supplied JPG.
test('KakaoTalk WebP retains every supplied QR pixel and intrinsic size', async () => {
  const files = await readdir(new URL('../public/', import.meta.url));
  assert.ok(files.includes('kakaotalk-qr.webp'), 'supplied QR must be converted to WebP');
  const file = new URL('../public/kakaotalk-qr.webp', import.meta.url);
  const buffer = await readFile(file);
  const metadata = await sharp(buffer).metadata();
  assert.equal(metadata.format, 'webp');
  assert.deepEqual([metadata.width, metadata.height], [192, 210]);
  const pixels = await sharp(buffer).removeAlpha().raw().toBuffer();
  assert.equal(createHash('sha256').update(pixels).digest('hex'),
    'b22d00668b39a45dab6b903ccd3a3c7a23416f78e6dd5cf8f54bac265882e5b7');
});
