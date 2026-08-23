/** Locale-neutral site constants: canonical origin, contact handles, tracking. */

const origin = new URL(import.meta.env.SITE).origin;

export const site = {
  origin,
  ogImage: '/covers/macau-sauna-night-skyline.jpg',
  ogImageWidth: 2048,
  ogImageHeight: 1366,
} as const;

export const contact = {
  whatsapp: { number: '85365670348', url: 'https://wa.me/85365670348' },
  telegram: { handle: '@Aomensauna', url: 'https://t.me/Aomensauna' },
  wechat: { id: 'AN99348', qr: '/wechat-qr.png' },
  line: { id: '16880348', url: 'https://line.me/ti/p/VZHFDSZnq9' },
} as const;

/** Builds a WhatsApp / Telegram deep link with a pre-filled message. */
export function chatUrl(base: string, message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`;
}
