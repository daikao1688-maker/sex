/** Locale-neutral site constants: canonical origin, contact handles, tracking. */

const origin = new URL(import.meta.env.SITE).origin;

export const site = {
  origin,
  // JPEG sharing copy of the homepage's first hero image; keep dimensions in sync.
  ogImage: '/covers/macau-sauna-hero-grand-lisboa-night-share.jpg',
  ogImageWidth: 1448,
  ogImageHeight: 1086,
} as const;

export const contact = {
  whatsapp: { number: '8617819124251', url: 'https://wa.me/8617819124251' },
  telegram: { handle: '@am38876', url: 'https://t.me/am38876' },
  wechat: { id: 'gh34366', qr: '/wechat-qr.webp' },
  kakaotalk: { id: 'gh34366', qr: '/kakaotalk-qr.webp' },
  line: { id: '@224vqwdv', url: 'https://line.me/R/ti/p/@224vqwdv' },
  email: 'macaurelax888@hotmail.com',
} as const;

/** Builds a WhatsApp / Telegram deep link with a pre-filled message. */
export function chatUrl(base: string, message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`;
}
