import type { VenueSlug } from '../data/venues';

/**
 * A run of text with optional emphasis. Locales differ in where the gold word
 * sits and whether a space separates it, so copy is stored as segments rather
 * than as a string with markup baked in.
 */
export interface TextSegment {
  text: string;
  /** Render in gold. */
  accent?: boolean;
}

/**
 * Every user-facing string on the home page. A new language is a new file in
 * `src/i18n/locales/` that satisfies this type — TypeScript then flags any
 * key that was forgotten.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    siteName: string;
    ogImageAlt: string;
  };
  nav: {
    brand: string;
    spas: string;
    ranking: string;
    guide: string;
    faq: string;
    about: string;
    blog: string;
    languageLabel: string;
    menuLabel: string;
    closeMenuLabel: string;
  };
  promo: {
    headlineShort: string;
    headlineLong: string;
    /** `{month}` is replaced client-side with the visitor's current month. */
    offer: string;
    cta: string;
  };
  hero: {
    title: string;
    tagline: string;
    /** Venue-name blocks that cross-fade; each entry is one multi-line block. */
    venueGroups: string[];
    steps: Array<{
      /** Label under the icon, e.g. gold "Free" + " Pickup" / 金色の「無料」+「送迎」. */
      title: TextSegment[];
      /** Caption below the label; one entry per rendered line. */
      desc: TextSegment[][];
    }>;
    exploreCta: string;
    howItWorksCta: string;
    bookCta: string;
    motion: { pause: string; resume: string };
  };
  spas: {
    heading: string;
    intro: string;
    filterLabel: string;
    filters: Array<{ bucket: string; label: string }>;
    learnMore: string;
    temporarilyClosed: string;
    temporarilyClosedNotice: string;
    pausedCard: { badge: string; description: string };
    browseOtherVenues: string;
    contactForAlternative: string;
    /** `{count}` = number of cards hidden by the active filter. */
    hiddenNote: string;
    showAll: string;
    venues: Record<VenueSlug, { name: string; badge: string; description: string; summary?: string }>;
  };
  vip: {
    badge: string;
    heading: string;
    intro: string;
    tabHow: string;
    tabGifts: string;
    giftsHeader: string;
    columns: { item: string; value: string; ours: string };
    free: string;
    gifts: Array<{ emoji: string; name: string; desc: string; value: string }>;
    steps: Array<{ title: string; body: string; note?: { title: string; body: string } }>;
  };
  quickMatch: {
    badge: string;
    /** Headline; the accented segment is the gold half. Spacing is per-locale. */
    heading: TextSegment[];
    /** `{count}` = number of bookable venues. */
    intro: string;
    questions: { group: string; experience: string; when: string; from: string };
    groupOptions: Record<QuickMatchGroup, string>;
    experienceOptions: Record<QuickMatchExperience, string>;
    whenOptions: Record<QuickMatchWhen, string>;
    fromOptions: Record<QuickMatchFrom, string>;
    overnightOn: string;
    overnightOff: string;
    overnightHint: string;
    resultLabel: string;
    /** `{count}` = number of bookable venues. */
    pickedFrom: string;
    bestMatch: string;
    matchSuffix: string;
    details: string;
    bookNow: string;
    /** Placeholders: {experience} {group} {when} {from} {overnight} {venue} */
    messageTemplate: string;
    yes: string;
    no: string;
  };
  features: {
    heading: string;
    items: Array<{ icon: FeatureIcon; title: string; desc: string }>;
  };
  testimonials: {
    heading: string;
    regionLabel: string;
    served: string;
    motion: { pause: string; resume: string };
    items: Array<{ quote: string; author: string }>;
  };
  blog: {
    heading: string;
    viewAll: string;
  };
  ctaBand: {
    heading: string;
    body: string;
    chat: string;
    ranking: string;
    guide: string;
    faq: string;
  };
  contact: {
    heading: string;
    intro: string;
    /** Default text pre-filled into WhatsApp / Telegram deep links. */
    inquiryMessage: string;
    channels: { whatsapp: string; telegram: string; wechat: string; line: string };
  };
  mission: {
    quote: string;
    body: string;
  };
  footer: {
    backToTop: string;
    links: Array<{ path: string; label: string }>;
    editorialPolicy: string;
    copyright: string;
  };
  wechat: {
    title: string;
    optionScan: string;
    optionCopy: string;
    copy: string;
    copied: string;
    manualCopy: string;
    close: string;
  };
  floatingPill: {
    label: string;
    aria: string;
  };
}

export type QuickMatchGroup = 'solo' | 'pair' | 'small' | 'large';
export type QuickMatchExperience = 'show' | 'theme' | 'jpkr' | 'new' | 'ktv' | 'classic';
export type QuickMatchWhen = 'now' | 'tonight' | 'tomorrow' | 'sat' | 'sun' | 'other';
export type QuickMatchFrom = 'border' | 'hotel' | 'airport' | 'other';
export type FeatureIcon = 'crown' | 'shield' | 'sparkles' | 'clock';

/** Localized disclosure rendered below every venue introduction. */
export interface EditorialEvidenceCopy {
  heading: string;
  lastReviewedLabel: string;
  lastReviewedDate: string;
  profileBasisLabel: string;
  profileBasis: string;
  verificationLabel: string;
  activeStatus: string;
  closedStatus: string;
  unverifiedLabel: string;
  directoryLabel: string;
  directoryDescription: string;
  directoryLink: string;
  directoryUrl: string;
  correctionPrompt: string;
  correctionLink: string;
}
