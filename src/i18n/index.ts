import en from './locales/en';
import ja from './locales/ja';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import type { Dictionary } from './types';
import { defaultLocale, locales, localizePath, type Locale } from './config';

/** Register a new dictionary here after adding its file to `src/i18n/locales/`. */
const dictionaries: Partial<Record<Locale, Dictionary>> = { en, ja, 'zh-TW': zhTW, 'zh-CN': zhCN };

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
