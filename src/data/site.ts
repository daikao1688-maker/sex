/** Locale-neutral site constants: canonical origin, contact handles, tracking. */

const origin = new URL(import.meta.env.SITE).origin;

export const site = {
  origin,
  ogImage: '/covers/macau-sauna-night-skyline.jpg',
  ogImageWidth: 2048,
  ogImageHeight: 1366,
} as const;

export const contact = {
  whatsapp: { number: '8617819124251', url: 'https://wa.me/8617819124251' },
  telegram: { handle: '@am38876', url: 'https://t.me/am38876' },
  wechat: { id: 'gh34366', qr: '/wechat-qr.png' },
  line: { id: '@224vqwdv', url: 'https://line.me/R/ti/p/@224vqwdv' },
} as const;

/** Builds a WhatsApp / Telegram deep link with a pre-filled message. */
export function chatUrl(base: string, message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`;
}
