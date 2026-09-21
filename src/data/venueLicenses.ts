import type { Locale } from '../i18n/config';
import type { VenueSlug } from './venues';

interface LicenseSearch {
  searchKey: string;
  /** MGTO categories: 10 = sauna/massage, 12 = karaoke. */
  comType: '10' | '12';
}

/**
 * Search terms checked against MGTO's public directory on 2026-09-21:
 * https://www.dst.gov.mo/zh-hant/public-services/licensing/licensed-entities.html
 * These are lookup links, not an assertion of current licence or operating status.
 * Traditional Chinese search terms work in all three official directory languages.
 */
const licenseSearches: Record<VenueSlug, LicenseSearch | null> = {
  'clube-rio': { searchKey: '利澳薈', comType: '12' },
  // The alias returns 御桑拿(I)/(II), both listed at 4/F. Our venue copy says 3/F;
  // provide the search for readers to inspect, without claiming a verified match.
  'yu-sauna': { searchKey: '御桑拿', comType: '10' },
  'manhao-spa': { searchKey: '曼濠水療', comType: '10' },
  'number-nine-sauna': { searchKey: '玖號水療', comType: '10' },
  'shang-pin-spa': { searchKey: '尚品國際水療', comType: '10' },
  'majesty-spa': { searchKey: '尊貴水療', comType: '10' },
  'the-excellent-sauna': { searchKey: '極品桑拿', comType: '10' },
  'empire-sauna': { searchKey: '巨亨桑拿', comType: '10' },
  'east-castle-spa': { searchKey: '東方皇堡水療會所', comType: '10' },
  'victoria-sauna': { searchKey: '凱旋桑拿', comType: '10' },
  // No matching registered name confirmed: offer the full sauna/massage directory.
  'm-club': null,
  'number-one-sauna': { searchKey: '壹號桑拿', comType: '10' },
  'familia-nobre': { searchKey: '豪門桑拿殿', comType: '10' },
  'oceanic-royal-spa': { searchKey: '帝湖水療休閒會所', comType: '10' },
  'eighteen-sauna': null,
};

export function getVenueLicenseLookup(slug: VenueSlug, lang: Locale) {
  const entry = licenseSearches[slug];
  const registryLanguage = lang === 'zh-TW' ? 'zh-hant' : lang === 'zh-CN' ? 'zh-hans' : 'en';
  const url = new URL(`https://www.dst.gov.mo/${registryLanguage}/public-services/licensing/licensed-entities.html`);
  url.searchParams.set('comType', entry?.comType ?? '10');
  url.searchParams.set('isAll', '1');
  if (entry) url.searchParams.set('searchKey', entry.searchKey);

  return { url: url.href, hasVenueSearch: entry !== null };
}
