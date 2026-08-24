/**
 * Locale registry.
 *
 * `localeMeta` lists every locale the site is *designed* for; `locales` lists
 * the ones that actually ship — a locale only belongs there once
 * `src/i18n/locales/<code>.ts` exists. Everything else (routing, hreflang,
 * language switcher, sitemap) is derived from `locales`, so enabling a new
 * language is: add the dictionary file, register it in `src/i18n/index.ts`,
 * then add its code here and to `i18n.locales` in `astro.config.mjs`.
 */
export const localeMeta = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  'zh-TW': { label: '繁體中文', short: '繁', htmlLang: 'zh-TW', ogLocale: 'zh_TW', dir: 'ltr' },
  'zh-CN': { label: '简体中文', short: '简', htmlLang: 'zh-CN', ogLocale: 'zh_CN', dir: 'ltr' },
  ja: { label: '日本語', short: 'JA', htmlLang: 'ja', ogLocale: 'ja_JP', dir: 'ltr' },
  ko: { label: '한국어', short: 'KO', htmlLang: 'ko', ogLocale: 'ko_KR', dir: 'ltr' },
} as const;

export type Locale = keyof typeof localeMeta;

/** Locales with a translated dictionary — keep in sync with astro.config.mjs. */
export const locales: Locale[] = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko'];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as string[]).includes(value);
}

/**
 * Prefixes a site-root path with the locale: `('en', '/guide/') -> '/en/guide/'`.
 * Hash-only and fragment paths are handled too: `('en', '/#spas') -> '/en/#spas'`.
 */
export function localizePath(lang: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${normalized}`.replace(/\/{2,}/g, '/');
}
