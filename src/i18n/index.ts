import en from './locales/en';
import ja from './locales/ja';
import ko from './locales/ko';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import type { Dictionary } from './types';
import { defaultLocale, locales, localizePath, type Locale } from './config';
import { testimonials } from './testimonials';

/** Register a new dictionary here after adding its file to `src/i18n/locales/`. */
const dictionaries: Partial<Record<Locale, Dictionary>> = {
  en: { ...en, testimonials: testimonials.en },
  ja: { ...ja, testimonials: testimonials.ja },
  ko,
  'zh-TW': { ...zhTW, testimonials: testimonials['zh-TW'] },
  'zh-CN': { ...zhCN, testimonials: testimonials['zh-CN'] },
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang] ?? (dictionaries[defaultLocale] as Dictionary);
}

/** Reads the active locale out of a URL like `/en/guide/`. */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
  return (locales as string[]).includes(segment) ? (segment as Locale) : defaultLocale;
}

/** Replaces `{name}` placeholders: `interpolate('{count} left', { count: 3 })`. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export { defaultLocale, locales, localizePath };
export type { Dictionary, Locale };
export { getEditorialEvidenceCopy, getEditorialPolicyCopy } from './pages/editorialPolicy';
export type { EditorialEvidenceCopy } from './types';
