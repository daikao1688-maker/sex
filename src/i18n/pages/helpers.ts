import { defaultLocale, type Locale } from '../config';

/**
 * Per-page copy lives next to this helper, one module per page, each holding a
 * partial map of locale → copy. Only English is written today; when a
 * translation arrives, add its key to that page's map and the page picks it up.
 * Until then every locale renders the English copy rather than 404ing.
 */
export function createPageCopy<T>(map: Partial<Record<Locale, T>>) {
  return (lang: Locale): T => map[lang] ?? (map[defaultLocale] as T);
}

/** True when `lang` has its own translation (rather than falling back). */
export function hasTranslation<T>(map: Partial<Record<Locale, T>>, lang: Locale): boolean {
  return map[lang] !== undefined;
}

/** A crumb in the BreadcrumbList schema; `path` excludes the locale prefix. */
export interface Crumb {
  name: string;
  path: string;
}
