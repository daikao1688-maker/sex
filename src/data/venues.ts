import { getVenueRating, type VenueRating } from './venueRatings';
import venueVisibility from './venueVisibility.json';

/**
 * Locale-neutral venue facts: slugs, imagery, pricing and the feature flags the
 * Quick Match scorer reads. All prose (name, badge, description) lives in the
 * locale dictionaries, keyed by these slugs.
 */

export const venueSlugs = [
  'clube-rio',
  'yu-sauna',
  'manhao-spa',
  'number-nine-sauna',
  'shang-pin-spa',
  'majesty-spa',
  'the-excellent-sauna',
  'empire-sauna',
  'east-castle-spa',
  'victoria-sauna',
  'm-club',
  'number-one-sauna',
  'familia-nobre',
  'oceanic-royal-spa',
  'eighteen-sauna',
] as const;

export type VenueSlug = (typeof venueSlugs)[number];

/** Set a venue to false in venueVisibility.json to hide it; true restores it. */
export function isVenueVisible(slug: VenueSlug): boolean {
  return (venueVisibility as Partial<Record<VenueSlug, boolean>>)[slug] !== false;
}

/** Card frame treatment — mirrors the three tiers used on the live site. */
export type VenueAccent = 'red' | 'gold' | 'silver' | 'plain';

export interface Venue {
  slug: VenueSlug;
  /** Chinese trading name, shown next to the English one on cards. */
  nameZh: string;
  /** Basename in /public/covers (a .jpg and a .webp exist for each). */
  cover: string;
  district: 'peninsula' | 'taipa';
  priceMin: number;
  priceMax: number;
  overnightAllowed: boolean;
  /** The venue may support overnight rest, but availability and terms are not guaranteed. */
  overnightRequiresConfirmation?: boolean;
  open24h: boolean;
  /** Use the localized therapist team label. */
  staffTeam?: boolean;
  /** Therapist on-duty window, as printed on the ranking table. */
  hours: string;
  /** Venue service fee on top of the listed price. */
  /** Service fee added separately on top of the displayed package price. */
  serviceFee: '10%' | '15%' | 'none';
  ktv: boolean;
  themeRooms: boolean;
  isNew: boolean;
  rating: VenueRating;
  /** Buckets the filter pills match against. */
  buckets: string[];
  accent: VenueAccent;
  /** Temporarily closed — labelled on cards and excluded from recommendations. */
  temporarilyClosed: boolean;
}

const venueDetails: Omit<Venue, 'rating'>[] = [
  {
    slug: 'clube-rio',
    nameZh: '利澳薈',
    cover: 'clube-rio-card',
    district: 'peninsula',
    priceMin: 1300,
    priceMax: 5088,
    overnightAllowed: false,
    open24h: false,
    hours: '4:00 PM - 4:00 AM',
    serviceFee: '10%',
    ktv: true,
    themeRooms: true,
    isNew: true,
    buckets: ['ktv', 'new'],
    accent: 'red',
    temporarilyClosed: false,
  },
  {
    slug: 'yu-sauna',
    nameZh: '八湯御桑拿',
    cover: 'yu-sauna-card',
    district: 'peninsula',
    priceMin: 2899,
    priceMax: 6999,
    overnightAllowed: true,
    overnightRequiresConfirmation: true,
    open24h: true,
    staffTeam: true,
    hours: '13:00 - 06:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: true,
    isNew: true,
    buckets: ['theme', 'new'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'manhao-spa',
    nameZh: '曼濠水療',
    cover: 'manhao-spa-card',
    district: 'taipa',
    priceMin: 2488,
    priceMax: 6088,
    overnightAllowed: false,
    open24h: false,
    hours: '14:00 – 04:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: false,
    isNew: true,
    buckets: ['new'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'number-nine-sauna',
    nameZh: '玖號水療',
    cover: 'number-nine-sauna-card',
    district: 'peninsula',
    priceMin: 2299,
    priceMax: 5999,
    overnightAllowed: true,
    open24h: true,
    hours: '17:00 - 05:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: true,
    isNew: true,
    buckets: ['new'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'shang-pin-spa',
    nameZh: '尚品國際水療',
    cover: 'shang-pin-spa-card',
    district: 'taipa',
    priceMin: 2299,
    priceMax: 6499,
    overnightAllowed: true,
    open24h: true,
    hours: '15:00 - 05:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: false,
    isNew: false,
    buckets: ['overnight', 'value'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'majesty-spa',
    nameZh: '尊貴水療',
    cover: 'majesty-spa-card',
    district: 'peninsula',
    priceMin: 2799,
    priceMax: 6699,
    overnightAllowed: true,
    open24h: true,
    hours: '14:00 - 05:00',
    serviceFee: 'none',
    ktv: true,
    themeRooms: true,
    isNew: false,
    buckets: ['overnight', 'ktv'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'the-excellent-sauna',
    nameZh: '極品桑拿',
    cover: 'the-excellent-sauna-card',
    district: 'peninsula',
    priceMin: 2488,
    priceMax: 6388,
    overnightAllowed: true,
    open24h: true,
    hours: '13:00 - 05:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: true,
    isNew: false,
    buckets: ['theme', 'overnight'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'empire-sauna',
    nameZh: '巨亨桑拿',
    cover: 'empire-sauna-card',
    district: 'peninsula',
    priceMin: 2488,
    priceMax: 7388,
    overnightAllowed: true,
    open24h: true,
    staffTeam: true,
    hours: '17:00 - 06:00',
    serviceFee: 'none',
    ktv: false,
    themeRooms: true,
    isNew: true,
    buckets: ['new'],
    accent: 'gold',
    temporarilyClosed: false,
  },
  {
    slug: 'east-castle-spa',
    nameZh: '東方皇堡水療',
    cover: 'east-castle-spa-card',
    district: 'peninsula',
    priceMin: 2388,
    priceMax: 6498,
    overnightAllowed: true,
    open24h: true,
    hours: '15:00 - 05:00',
    serviceFee: '15%',
    ktv: false,
    themeRooms: true,
    isNew: false,
    buckets: ['theme', 'value'],
    accent: 'silver',
    temporarilyClosed: false,
  },
  {
    slug: 'victoria-sauna',
    nameZh: '凱旋桑拿',
    cover: 'victoria-sauna-card',
    district: 'peninsula',
    priceMin: 2298,
    priceMax: 6998,
    overnightAllowed: true,
    open24h: true,
    hours: '13:00 - 05:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: false,
    isNew: false,
    buckets: ['overnight'],
    accent: 'silver',
    temporarilyClosed: false,
  },
  {
    slug: 'm-club',
    nameZh: '晉會MCLUB',
    cover: 'm-club-card',
    district: 'peninsula',
    priceMin: 2388,
    priceMax: 6498,
    overnightAllowed: true,
    open24h: true,
    hours: '15:00 - 05:00',
    serviceFee: '10%',
    ktv: true,
    themeRooms: true,
    isNew: false,
    buckets: ['theme', 'ktv'],
    accent: 'plain',
    temporarilyClosed: true,
  },
  {
    slug: 'number-one-sauna',
    nameZh: '壹號桑拿',
    cover: 'number-one-sauna-card',
    district: 'peninsula',
    priceMin: 2199,
    priceMax: 7699,
    overnightAllowed: true,
    open24h: true,
    hours: '13:00 - 05:00',
    serviceFee: '10%',
    ktv: false,
    themeRooms: false,
    isNew: false,
    buckets: [],
    accent: 'plain',
    temporarilyClosed: true,
  },
  {
    slug: 'familia-nobre',
    nameZh: '豪門桑拿殿',
    cover: 'familia-nobre-card',
    district: 'peninsula',
    priceMin: 2388,
    priceMax: 6988,
    overnightAllowed: true,
    open24h: true,
    hours: '16:00 - 06:00',
    serviceFee: 'none',
    ktv: false,
    themeRooms: false,
    isNew: false,
    buckets: ['value'],
    accent: 'plain',
    temporarilyClosed: true,
  },
  {
    slug: 'oceanic-royal-spa',
    nameZh: '帝湖水療',
    cover: 'oceanic-royal-spa-card',
    district: 'taipa',
    priceMin: 2299,
    priceMax: 7099,
    overnightAllowed: true,
    open24h: true,
    hours: '24/7',
    serviceFee: '10%',
    ktv: false,
    themeRooms: true,
    isNew: false,
    buckets: ['theme', 'overnight'],
    accent: 'plain',
    temporarilyClosed: true,
  },
  {
    slug: 'eighteen-sauna',
    nameZh: '十八桑拿',
    cover: 'eighteen-sauna-card',
    district: 'peninsula',
    priceMin: 1780,
    priceMax: 5550,
    overnightAllowed: true,
    open24h: true,
    staffTeam: true,
    hours: '24/7',
    serviceFee: 'none',
    ktv: false,
    themeRooms: false,
    isNew: false,
    buckets: ['value', 'overnight'],
    accent: 'plain',
    temporarilyClosed: true,
  },
];

/** Public venue list. Full source records above remain intact while hidden. */
export const venues: Venue[] = venueDetails.filter((venue) => isVenueVisible(venue.slug)).map((venue) => ({
  ...venue,
  rating: getVenueRating(venue.slug),
}));

/** Venues currently open and eligible for Quick Match recommendations. */
export const bookableVenues = venues.filter((venue) => !venue.temporarilyClosed);
