import { isVenueVisible, venues } from '../data/venues';
import type { Locale } from './config';

/** Resolve catalogue counts from the same list used by public venue pages. */
export function formatVenueCount(text: string): string {
  return text.replaceAll('{venueCount}', String(venues.length));
}

const clubeRioHeroName: Record<Locale, string> = {
  en: 'Clube Rio',
  'zh-TW': '利澳薈',
  'zh-CN': '利澳荟',
  ja: 'クラブ・リオ',
  ko: 'Clube Rio',
};

/** Keep the original translated groups available when the venue is enabled again. */
export function visibleHeroVenueGroups(groups: string[], lang: Locale): string[] {
  if (isVenueVisible('clube-rio')) return groups;

  const separator = lang === 'en' || lang === 'ko' ? ', ' : '、';
  return groups
    .map((group) => group.split('\n')
      .map((line) => line.split(separator)
        .filter((name) => name !== clubeRioHeroName[lang])
        .join(separator))
      .filter(Boolean)
      .join('\n'))
    .filter(Boolean);
}
