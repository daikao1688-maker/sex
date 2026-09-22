import type { Locale } from '../config';
import type { VenueSlug } from '../../data/venues';
import { createPageCopy, type Crumb } from './helpers';
import { eighteenSaunaDetails } from './eighteenSauna';
import { yuSaunaDetails } from './yuSauna';

/** Editorial detail for one venue. Venues without an entry fall back to copy
 *  derived from the shared venue data — see `src/lib/spaDetail.ts`. */
export interface VenueDetail {
  /** Comma-separated alternative names, for search. */
  aliases?: string;
  highlights: string[];
  bestFor: string;
  staffValue?: string;
  staffNote?: string;
  features: string[];
  flow: Array<{ title: string; body: string }>;
  /** Basenames under /public/media, without the -thumb/-lg suffix. */
  gallery: Array<{ file: string; caption: string; alt: string }>;
  website?: { url: string; label: string; display: string };
  overnightValue?: string;
  overnightNote?: string;
  /** Venue-specific neutral contact copy for facts that still need confirmation. */
  bookingNote?: string;
  contactCta?: string;
  ctaBody?: string;
  /** Override shared payment badges when venue support has not been confirmed. */
  paymentMethods?: string[];
  /** Hide shared gift and shuttle guarantees when they are not verified for this venue. */
  suppressPromotionalClaims?: boolean;
}

export interface SpaPageCopy {
  backHome: string;
  backToVenueList: string;
  /** {venue} is replaced with the current localized venue name. */
  inquiry: { booking: string; closed: string };
  alsoKnownAs: string;
  labels: {
    referencePrice: string;
    separateServiceFee: string;
    noSeparateSurcharge: string;
    priceDisclaimer: string;
    discountCta: string;
    staff: string;
    staffValue: string;
    staffTeam: string;
    hours: string;
    openAllDay: string;
    staffHours: string;
    website: string;
    overnight: string;
    overnightAvailable: string;
    overnightUnavailable: string;
    overnightNoteAvailable: string;
    highlights: string;
    bestFor: string;
    payment: string;
    quickBook: string;
    allContacts: string;
    features: string;
    gallery: string;
    viewLarger: string;
    previousPhoto: string;
    nextPhoto: string;
    gallerySwipeHint: string;
    /** Named placeholders let each locale order the photo count naturally. */
    galleryPhotoCount: string;
    flow: string;
    moreInfo: string;
    related: string;
    learnMore: string;
    officialWebsite: string;
  };
  paymentMethods: string[];
  concierge: { title: string; body: string };
  /** VIP extras reminder inside the flow section (open venues only). */
  vipReminder: { title: string; body: string; cta: string };
  /** Copy for the VipExtrasDrawer opened from the reminder. */
  vipDrawer: { titleLead: string; titleAccent: string; note: string; close: string };
  cta: { headingLead: string; headingAccent: string; body: string };
  breadcrumbHome: string;
  breadcrumbList: string;
  /** Labels used when a venue has no written detail copy yet. */
  placeholder: {
    ktv: string;
    themeRooms: string;
    overnight: string;
    open24h: string;
    noServiceFee: string;
    peninsula: string;
    taipa: string;
  };
  venues: Partial<Record<VenueSlug, VenueDetail>>;
}

/**
 * Uses the first complete sentence of a locale-written venue introduction.
 * Metadata therefore stays readable without cutting a word or CJK phrase at
 * an arbitrary character count.
 */
export function venueSummary(description: string, lang: Locale): string {
  const firstParagraph = description.split(/\n\s*\n/u)[0]?.trim() ?? '';
  const sentence =
    lang === 'en'
      ? firstParagraph.match(/^.*?[.!?](?=\s|$)/u)?.[0]
      : firstParagraph.match(/^.*?[。！？]/u)?.[0];

  return sentence?.trim() || firstParagraph;
}



const en: SpaPageCopy = {
  backHome: 'Back to Home',
  backToVenueList: 'Back to venue list',
  inquiry: {
    booking: "Hello, I'd like to book a visit to {venue}. Could you help arrange it?",
    closed: 'Hello, I saw that {venue} is temporarily closed. Could you recommend a similar venue?',
  },
  alsoKnownAs: 'Also known as：',
  labels: {
    referencePrice: 'Typical Package Range',
    separateServiceFee: 'Separate service fee',
    noSeparateSurcharge: 'No separate surcharge',
    priceDisclaimer:
      'Final totals may vary with package tier, room, tax and add-ons. Confirm an itemized quote before visiting.',
    discountCta: 'Contact us for a discount →',
    staff: 'Staff',
    staffValue: 'Multinational therapists',
    staffTeam: 'Multinational therapist team',
    hours: 'Hours',
    openAllDay: 'Open 24 hours',
    staffHours: 'Staff:',
    website: 'Official Website',
    overnight: 'Overnight',
    overnightAvailable: 'Available',
    overnightUnavailable: 'Not available',
    overnightNoteAvailable: '',
    highlights: 'Highlights',
    bestFor: 'Best For',
    payment: 'Payment',
    quickBook: 'First time? Book with us — free shuttle + best price',
    allContacts: 'Contact us for a discount →',
    features: 'Features',
    gallery: 'Gallery',
    viewLarger: 'View larger',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    gallerySwipeHint: 'Swipe left or right to browse',
    galleryPhotoCount: 'Photo {current} of {total}',
    flow: 'Detailed Flow',
    moreInfo: 'Want to know more? Contact us for detailed info',
    related: 'Other Popular Spas',
    learnMore: 'Learn More',
    officialWebsite: 'Official website：',
  },
  paymentMethods: [
    'Cash',
    'Card',
    'WeChat',
    'Alipay',
  ],
  concierge: {
    title: 'And your free return ride is waiting',
    body: 'When you\'re done — after your meal, right after your service, anytime — just text us. The same luxury vehicle takes you to your hotel, the airport, the ferry terminal, or anywhere in Macau. Same zero cost as the pickup.',
  },
  vipReminder: {
    title: '2 complimentary relaxation treatments',
    body: 'Choose any 2 of the 8 complimentary add-on treatments: back scrub, leg massage, head massage, foot massage, manicure, pedicure, hand massage, or ear cleaning. We notify the venue of your visit in advance, so you can select your treatments on arrival.',
    cta: 'See all 8 extras →',
  },
  vipDrawer: {
    titleLead: '2 complimentary',
    titleAccent: 'relaxation treatments',
    note: 'Choose any 2 of the 8 add-on treatments free of charge. We notify the venue of your visit in advance, so you can select your treatments on arrival.',
    close: 'Close complimentary treatments list',
  },
  cta: {
    headingLead: 'Book Your',
    headingAccent: 'VIP Experience',
    body: 'Send us a message and we\'ll take care of the rest.',
  },
  breadcrumbHome: 'Home',
  breadcrumbList: 'Spas',
  placeholder: {
    ktv: 'KTV rooms',
    themeRooms: 'Theme rooms',
    overnight: 'Overnight stay',
    open24h: 'Open 24 hours',
    noServiceFee: 'No service fee',
    peninsula: 'Macau Peninsula',
    taipa: 'Taipa',
  },
  venues: {
    'clube-rio': {
      aliases: 'Clube Rio Macau, Club Rio, Rio KTV, 利澳薈, Macau nightclub KTV, Macau business KTV',
      highlights: [
        'Grand opening 30 July 2026',
        'Macau\'s rare KTV-first club',
      ],
      bestFor: 'Karaoke with friends',
      features: [
        'Free-flow drinks',
        'Private rooms, premium sound',
        '3/F Hotel Rio',
      ],
      flow: [
        {
          title: 'Book Your Room',
          body: 'Book through us with your headcount and timing. During the opening period, booking ahead is recommended for room availability.',
        },
        {
          title: 'Arrive at Hotel Rio',
          body: 'Head to the 3rd floor of Hotel Rio in NAPE — minutes from the border gates and major hotels, or let us arrange the free private car transfer. Give your booking name and staff walk you through.',
        },
        {
          title: 'Play Until Late',
          body: 'Open until 4 am — sing, toast and unwind at your own pace. No overnight stay; NAPE makes late rides easy, or book the return car with us.',
        },
        {
          title: 'Ride Home',
          body: 'Booking through us includes a free private car transfer (private, not shared). If your trip needs an overnight plan, ask us when booking and we\'ll suggest the right arrangement.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-clube-rio-01-main-lounge',
          caption: 'Start with a drink under the chandelier — leather sofas around marble tables in the main lounge, where the group gathers before picking a room.',
          alt: 'Clube Rio main lounge — crystal chandelier and leather sofas',
        },
        {
          file: 'macau-sauna-spa-clube-rio-02-vip-room-gold-leaf',
          caption: 'Gold-leaf dragon and eagle art decorates the VIP room, with its own sound and lighting.',
          alt: 'Clube Rio VIP room — gold-leaf dragon and eagle art',
        },
        {
          file: 'macau-sauna-spa-clube-rio-03-party-room',
          caption: 'Take the big room with the whole crew — space to pass the mic around and sound to match, all the way to 4 am.',
          alt: 'Clube Rio party room',
        },
        {
          file: 'macau-sauna-spa-clube-rio-04-theme-room-orange',
          caption: 'Warm orange styling and equestrian art — every room has its own character, and regulars switch rooms each visit for a fresh mood.',
          alt: 'Clube Rio theme room — warm orange styling',
        },
        {
          file: 'macau-sauna-spa-clube-rio-05-lounge-suite',
          caption: 'A suite with separate living and karaoke zones — sing until you are done, then retreat to the sofas and set your own pace.',
          alt: 'Clube Rio lounge suite',
        },
        {
          file: 'macau-sauna-spa-clube-rio-06-reception',
          caption: 'A temperature-controlled wine wall flanks reception — give your booking name and staff walk you through the marble foyer, so the VIP feeling starts before the singing does.',
          alt: 'Clube Rio reception — wine wall and marble foyer',
        },
        {
          file: 'macau-sauna-spa-clube-rio-07-corridor',
          caption: 'Behind every soundproof door is someone\'s party — the faint singing you catch walking past says the night is on.',
          alt: 'Clube Rio private-room corridor',
        },
        {
          file: 'macau-sauna-spa-clube-rio-08-vip-room-crystal-art',
          caption: 'Quilted orange sofas, crystal tiger art, speakers and low lighting in the VIP room.',
          alt: 'Clube Rio VIP room corner — crystal animal art and gold mirror',
        },
        {
          file: 'macau-sauna-spa-clube-rio-09-lounge-suite-orange',
          caption: 'Checked sheers half-drawn and rows of stools — round-robin karaoke, song battles and toasts, a seat for everyone.',
          alt: 'Clube Rio orange suite — checked sheers and black-gold tables',
        },
      ],
      website: {
        url: 'https://rio-clube.com/en/',
        label: 'Clube Rio official website ↗',
        display: 'rio-clube.com/en/',
      },
      overnightValue: 'Not available',
      overnightNote: '— No overnight stay',
    },
    'manhao-spa': {
      aliases: 'Manhao Spa Macau, 曼濠水療',
      highlights: [
        'Newest Taipa 2026',
        'Spacious stage',
        'Imperial marble luxe',
      ],
      bestFor: 'A spacious stage / luxury in Taipa',
      features: [
        'Newest Taipa opening — 1 May 2026',
        'Spacious stage hall',
        'Calacatta-marble lounges and changing rooms',
        'Doors 14:00–04:00 daily',
      ],
      flow: [
        {
          title: 'Arrive at Grandview Hotel, Taipa',
          body: 'Manhao Spa is located inside the Grandview Hotel (氹仔君怡酒店) on Taipa — a five-minute drive from the Cotai Strip and the most accessible new luxury sauna option for Taipa-side guests. The lobby greets you with the gold crowned \'MH\' monogram on calacatta marble; check in at the front desk and collect your wristband from the concierge.',
        },
        {
          title: 'Luxury Changing Room',
          body: 'Step into the changing area — calacatta marble feature wall, dark wood lockers with gold-toggle pulls, and tufted bench seating. The hardware tone is consistently imperial-luxe rather than utilitarian, setting expectations for the rest of the visit.',
        },
        {
          title: 'Bath & Wet Area',
          body: 'Move through to the bath area, finished in dark mosaic tile and green-veined marble with multiple shower stations and a small immersion pool. The wet zone is brand-new throughout, sized for a relaxed pre-service soak.',
        },
        {
          title: 'Dining Lounge',
          body: 'Take complimentary food and drinks in the marble-topped dining lounge — quiet, hotel-grade seating with a private bar feel, designed for taking your time before or after service.',
        },
        {
          title: 'Spacious Stage',
          body: 'A defining feature is the spacious stage hall, where glass balustrades span multiple levels under deep blue neon lighting. The scale of the stage and layered lighting make this a striking focal point of Manhao Spa.',
        },
        {
          title: '60-Minute Massage',
          body: 'Take an hour to unwind with a 60-minute massage. Adjust the lighting and music to your liking, settle into a comfortable atmosphere, and give yourself time to relax.',
        },
        {
          title: 'Rest Area',
          body: 'Retreat to the dedicated rest area — a calm, dim room of stargazer-lit recliners for unwinding after service. Doors run 14:00–04:00 and overnight stays are not offered for now. Check out at the front desk; cash, card, WeChat Pay, and Alipay are all accepted.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-manhao-01-marble-gold-signage',
          caption: 'The signature gold crowned \'MH\' monogram set against calacatta marble — the imperial-luxe tone is announced the moment you reach the entrance.',
          alt: 'Manhao Spa gold crowned marble signage',
        },
        {
          file: 'macau-sauna-spa-manhao-02-blue-showcase-hall',
          caption: "The hall has several levels of glass-railed walkways lit by deep blue neon.",
          alt: "Manhao Spa blue-lit hall with glass railings",
        },
        {
          file: 'macau-sauna-spa-manhao-04-mural-bedroom-suite',
          caption: 'A mural-papered bedroom suite with an oversized bed, sofa and soft lamps — hotel-grade comfort for an unhurried, private stay.',
          alt: 'Manhao Spa mural bedroom suite',
        },
        {
          file: 'macau-sauna-spa-manhao-05-tree-mural-luxury-suite',
          caption: 'A tree-mural luxury suite where naturalistic wall art and low mood lighting make the room feel like a quiet retreat.',
          alt: 'Manhao Spa tree-mural luxury suite',
        },
        {
          file: 'macau-sauna-spa-manhao-06-marble-locker-room',
          caption: 'The changing room sets the standard with a calacatta marble feature wall, gold-toggle custom lockers and tufted benches.',
          alt: 'Manhao Spa marble changing room',
        },
        {
          file: 'macau-sauna-spa-manhao-07-marble-shower-stalls',
          caption: 'Marble shower stalls offer private wash positions with brand-new, immaculate fittings for an easy pre-service rinse.',
          alt: 'Manhao Spa marble shower stalls',
        },
        {
          file: 'macau-sauna-spa-manhao-08-jacuzzi-bathing-zone',
          caption: 'The bathing zone in dark mosaic tile and green-veined marble, with a spacious immersion pool for a relaxed soak before service.',
          alt: 'Manhao Spa jacuzzi bathing zone',
        },
        {
          file: 'macau-sauna-spa-manhao-09-dark-steam-shower-room',
          caption: 'A secluded dark steam shower room, brand-new throughout and built for a quiet, immersive moment in the wet area.',
          alt: 'Manhao Spa dark steam shower room',
        },
        {
          file: 'macau-sauna-spa-manhao-10-marble-dining-bar',
          caption: 'The marble dining lounge pairs hotel-grade seating with a private-bar feel — where complimentary food and drinks are served.',
          alt: 'Manhao Spa marble dining lounge',
        },
        {
          file: 'macau-sauna-spa-manhao-11-starlight-recliner-lounge',
          caption: 'The dedicated starlight recliner lounge, with soft light and plush recliners for unwinding before or after service.',
          alt: 'Manhao Spa starlight recliner lounge',
        },
        {
          file: 'macau-sauna-spa-manhao-12-mural-corridor',
          caption: 'Mural-wrapped corridors connect the venue\'s zones, with refined wall art and gentle light that read more boutique-hotel than sauna.',
          alt: 'Manhao Spa mural corridor',
        },
      ],
      website: {
        url: 'https://manhaosauna.com/en/',
        label: 'Manhao Spa official website ↗',
        display: 'manhaosauna.com/en/',
      },
      overnightValue: 'Not available',
      overnightNote: '— Doors 14:00–04:00; no overnight stays for now',
    },
    'number-nine-sauna': {
      aliases: 'Number Nine Spa Macau, No.9 Spa, 玖號水療',
      highlights: [
        'Brand new — opened April 2026',
        'Modern stage facilities',
        'Multiple ambient themed rooms',
        'Balinese + Japanese massage',
      ],
      bestFor: 'Trying the newest venue',
      features: [
        'Distinct room designs',
        'Stage lighting',
        'LED screens',
        'Modern bathing facilities',
        'Balinese-style and Japanese-style massage',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Number Nine Spa, brand new as of April 2026, located inside Royal Dragon Hotel in central Macau. As the newest venue in the city, all facilities are in pristine condition. The overall design follows a modern luxury aesthetic with gold and marble elements paired with professional lighting systems.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy newly built modern bathing and sauna facilities with brand-new equipment throughout. The changing room features wooden lockers in a clean, orderly design, while the bathing area is decorated with green mosaic tiles for a fresh, inviting feel.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining with an emphasis on diverse, premium food selections — the venue treats dining as an integral part of the overall experience.',
        },
        {
          title: 'Hall Facilities',
          body: 'The hall combines stage lighting and LED screens with gold accents and marble finishes for a distinctive modern interior.',
        },
        {
          title: 'Choose Themed Room',
          body: 'Number Nine offers multiple ambient themed rooms, each featuring unique mood lighting — red, pink-purple, blue-violet, and other color tones paired with starry-sky ceilings and refined decor for an immersive experience. Round oversized beds are a signature feature in select rooms.',
        },
        {
          title: '60-Minute Session',
          body: 'Choose between Balinese-style and Japanese-style massage, blending Southeast Asian and Japanese techniques. Number Nine\'s signature \'original Japanese + Balinese\' fusion sets it apart from traditional venues.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Overnight stays available with brand-new facilities ensuring comfort. As a new venue, early-stage foot traffic is lower and the atmosphere is quiet. Book through us for the latest special prices.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-nine-01-modern-luxury-themed-suite',
          caption: 'Number Nine Spa\'s signature modern-luxury suite — soft mood lighting and refined gold-and-marble decor in one of Macau\'s newest venues, opened April 2026.',
          alt: 'Number Nine Spa modern-luxury suite',
        },
        {
          file: 'macau-sauna-spa-number-nine-02-red-theme-room',
          caption: 'Sink into a red-themed round-bed suite, its starry-sky ceiling and immersive glow setting the tone — one of Number Nine\'s signature mood rooms.',
          alt: 'Number Nine Spa red round-bed room',
        },
        {
          file: 'macau-sauna-spa-number-nine-03-aurora-bedroom-purple',
          caption: 'A purple aurora-lit themed bedroom where soft gradients wrap the space in a quiet, modern-luxury calm.',
          alt: 'Number Nine Spa purple aurora room',
        },
        {
          file: 'macau-sauna-spa-number-nine-04-recliner-lounge',
          caption: 'A mural-lined recliner lounge bathed in soft light — an easy place to settle before or after your session.',
          alt: 'Number Nine Spa recliner lounge',
        },
        {
          file: 'macau-sauna-spa-number-nine-05-massage-chair-room',
          caption: 'A brand-new massage-chair room — pristine equipment and a private corner to ease into.',
          alt: 'Number Nine Spa massage-chair room',
        },
        {
          file: 'macau-sauna-spa-number-nine-06-premium-towel-locker',
          caption: 'Premium wooden lockers and a tidy towel station — spotless, orderly facilities that signal the venue\'s grade from the start.',
          alt: 'Number Nine Spa premium locker area',
        },
        {
          file: 'macau-sauna-spa-number-nine-07-royal-dragon-exterior',
          caption: 'Number Nine Spa sits inside the central Royal Dragon Hotel — a convenient location that announces the venue from the door.',
          alt: 'Number Nine Spa Royal Dragon Hotel exterior',
        },
        {
          file: 'macau-sauna-spa-number-nine-08-bath-wash-area',
          caption: 'A newly built bath and wash area — pristine fixtures and a fresh wet zone to rinse the day away.',
          alt: 'Number Nine Spa bath and wash area',
        },
        {
          file: 'macau-sauna-spa-number-nine-09-purple-light-bedroom',
          caption: 'A purple-lit themed bedroom where soft light and refined bedding invite an easy, restful pause.',
          alt: 'Number Nine Spa purple-light bedroom',
        },
        {
          file: 'macau-sauna-spa-number-nine-10-ambient-themed-bedroom',
          caption: "The main-stage hall has a neon star backdrop and professional lighting.",
          alt: 'Number Nine Spa main-stage hall',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: 'A refined dining area — complimentary steak, seafood, noodles and more turn the meal into part of the experience.',
          alt: 'Number Nine Spa dining area',
        },
      ],
      website: {
        url: 'https://numbernine-spa.com/en/',
        label: 'Number Nine Spa official website ↗',
        display: 'numbernine-spa.com/en/',
      },
      overnightValue: 'Available',
      overnightNote: '— Overnight stays available',
    },
    'shang-pin-spa': {
      aliases: 'Shang Pin Spa Macau, 尚品國際水療',
      highlights: [
        'Modern bathing facilities',
      ],
      bestFor: 'A quiet setting / modern facilities',
      features: [
        'Recommended rating: {ratingStars}',
        'Complimentary massage or care treatment; confirm the included treatment when booking.',
        'international service standards',
        'extremely high cost performance.',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Shang Pin Spa, located inside Lisboeta Macau (Cotai). The entire venue features a European-modern design aesthetic with a contemporary look. Register at the front desk and collect your wristband.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Brand-new bathing facilities with well-appointed equipment. The pool and sauna areas are bright and immaculate, a stark contrast to traditional venue styles.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining in a clean, comfortable setting that matches the venue\'s overall modern design language.',
        },
        {
          title: 'Room Facilities',
          body: 'Every room features its own private bathtub for a high level of privacy.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: "Overnight stays available — rest in the free lobby recliner lounge, or opt for a paid private rest room. As a boutique-scale venue, foot traffic is lower and the atmosphere is peaceful.",
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: "Shang Pin Spa's purple-lit stage inside Lisboeta Macau in Cotai.",
          alt: "Elite International Spa purple-lit stage",
        },
        {
          file: 'macau-sauna-spa-elite-02-gold-signage-reception',
          caption: 'A gold-signage reception sets the upscale tone the moment you arrive, an easy choice for guests staying in Cotai\'s new district.',
          alt: 'Elite International Spa gold-signage reception',
        },
        {
          file: 'macau-sauna-spa-elite-03-arched-door-lounge',
          caption: 'An arched-door lounge in modern, lavish finishes and soft light — a calm space to settle before or after your service.',
          alt: 'Elite International Spa arched-door lounge',
        },
        {
          file: 'macau-sauna-spa-elite-04-porthole-mirror-stage',
          caption: "A stage with porthole mirrors and stepped seating.",
          alt: 'Elite International Spa porthole-mirror stage',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: 'A modern jacuzzi wet area with bright, immaculate bathing facilities.',
          alt: 'Elite International Spa jacuzzi wet area',
        },
        {
          file: 'macau-sauna-spa-elite-06-blue-led-v88-corridor',
          caption: 'A blue-LED corridor leading to the rooms, part of a private, contemporary layout that runs throughout.',
          alt: 'Elite International Spa blue-LED corridor',
        },
        {
          file: 'macau-sauna-spa-elite-07-marble-private-corridor',
          caption: 'A refined corridor to the private suites — calm, quiet and screened from view.',
          alt: 'Elite International Spa private-room corridor',
        },
        {
          file: 'macau-sauna-spa-elite-08-mirror-headboard-bedroom',
          caption: 'A mirror-headboard bedroom with modern, lavish styling — private and quietly comfortable.',
          alt: 'Elite International Spa mirror-headboard bedroom',
        },
        {
          file: 'macau-sauna-spa-elite-09-starlight-magenta-bedroom',
          caption: 'A feature bedroom under a starlight ceiling washed in magenta light — romantic mood and brand-new fittings.',
          alt: 'Elite International Spa starlight magenta bedroom',
        },
        {
          file: 'macau-sauna-spa-elite-10-wide-recliner-theatre',
          caption: 'A spacious recliner lounge where the complimentary chairs let overnight guests rest right through till morning.',
          alt: 'Elite International Spa wide recliner lounge',
        },
        {
          file: 'macau-sauna-spa-elite-11-selection-stage',
          caption: "The compact stage area inside Shang Pin Spa.",
          alt: "Elite International Spa stage area",
        },
        {
          file: 'macau-sauna-spa-elite-12-massage-chair-rest-area',
          caption: 'A massage-chair rest area — a quiet, comfortable corner paired with complimentary food and drinks.',
          alt: 'Elite International Spa massage-chair rest area',
        },
      ],
      website: {
        url: 'https://shangpin-spa.com/en/',
        label: 'Shang Pin Spa official website ↗',
        display: 'shangpin-spa.com/en/',
      },
      overnightValue: 'Available',
      overnightNote: '— Overnight stays available',
    },
    'majesty-spa': {
      aliases: 'Majesty Spa Macau, 尊貴水療',
      highlights: [
        'Most luxurious decor',
        'Largest rooms',
        'No service fee',
      ],
      bestFor: 'Luxury environment / overnight stays',
      features: [
        'The most luxurious decor in Macau',
        'More than ten different room styles',
        'a KTV-room party mode',
        'open 24 hours a day.',
        'No service fee',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Majesty Spa, the most luxuriously decorated sauna venue in Macau. Gold accents and marble elements run throughout, creating an immediate sense of top-tier opulence. Register at the front desk and collect your wristband.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy luxurious bathing facilities and sauna with spacious pools and soft ambient lighting in an elegant, grand atmosphere. Take your time here — Majesty Spa has the finest hardware and fixtures of any venue in Macau.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary steak, fresh fruit, cold beer, and more with a generous selection of dishes. Majesty\'s food quality is widely praised in the industry, with unlimited servings throughout your stay.',
        },
        {
          title: "Choose a massage package",
          body: "Ask reception about the available massage packages, their duration and what each includes. Confirm the total price before choosing.",
        },
        {
          title: 'Confirm Prices',
          body: 'Prices range from MOP 2,799 to MOP 6,699.',
        },
        {
          title: '60-minute massage',
          body: 'Enjoy a 60-minute massage in a spacious room with soft lighting and comfortable furnishings. Confirm the massage option and its price before the session.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Majesty Spa is open 24 hours and overnight-friendly — rest in the free lobby recliner lounge, or opt for a paid private rest room in peak season. With free dining included, it\'s a comfortable place to stay until morning.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-majesty-01-ktv-party-room',
          caption: 'Majesty Spa\'s signature KTV party room — one of only two Macau venues with KTV, a lavish private suite built for lively gatherings that run late.',
          alt: 'Majesty Spa KTV party room',
        },
        {
          file: 'macau-sauna-spa-majesty-02-majesty-entrance-signage',
          caption: 'The composed, premium entrance signage sets the tone the moment you arrive at Macau\'s most lavishly appointed club.',
          alt: 'Majesty Spa entrance signage',
        },
        {
          file: 'macau-sauna-spa-majesty-03-gold-chandelier-bath-pool',
          caption: 'A gilded-chandelier bathing pool, spacious and softly lit — the kind of top-grade wet area worth lingering in before the night begins.',
          alt: 'Majesty Spa gold-chandelier bath pool',
        },
        {
          file: 'macau-sauna-spa-majesty-04-curved-wood-corridor',
          caption: 'A curved-wood corridor links the themed suites, its soft lighting and flowing lines making for a quiet, private passage.',
          alt: 'Majesty Spa curved-wood corridor',
        },
        {
          file: 'macau-sauna-spa-majesty-05-chinese-marriage-bed-room',
          caption: 'A Chinese marriage-bed themed room with a carved heritage bedframe and red-and-gold dressing — one of over ten finely designed themed suites.',
          alt: 'Majesty Spa Chinese marriage-bed themed room',
        },
        {
          file: 'macau-sauna-spa-majesty-06-egypt-pharaoh-room',
          caption: 'An Egyptian pharaoh themed room, with gilded wall reliefs and temple-inspired styling that show off the range of theming here.',
          alt: 'Majesty Spa Egyptian pharaoh themed room',
        },
        {
          file: 'macau-sauna-spa-majesty-07-gym-boxing-theme-room',
          caption: 'A gym-and-boxing themed room with bold athletic styling — a playful pick among the dozen-plus themed suites.',
          alt: 'Majesty Spa gym-boxing themed room',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Overnight friendly — free lobby recliner lounge, paid private rest rooms in peak season',
    },
    'the-excellent-sauna': {
      aliases: 'The Excellent Sauna Macau, 極品桑拿',
      highlights: [
        'Inside the Grand Emperor Hotel main building',
        'Rooms in different styles',
      ],
      bestFor: 'Flexible schedule / themed rooms',
      features: [
        'Grand Emperor Hotel main building',
        'brand new themed rooms',
        'various exciting themes',
        'DJ room experience',
        'Open 24 hours with overnight rest area',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at The Excellent Sauna inside the Grand Emperor Hotel main building. The venue is open 24 hours, while therapists are on duty from 13:00 to 05:00. Register at reception, bathe and settle into its quieter boutique pace.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy the bathing facilities and sauna in a relatively quiet, serene setting. The Excellent has lower foot traffic than larger venues, so there\'s none of the crowded, noisy atmosphere.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining is available around the clock, so you can eat whether you arrive in the afternoon or late at night.',
        },
        {
          title: 'Discuss Your Massage',
          body: 'Tell reception which areas you would like to focus on and your preferred massage pressure. Review the available options, duration and charges before confirming your arrangements.',
        },
        {
          title: '60-Minute Massage',
          body: 'Massage sessions last approximately 60 minutes, with a 10% service charge. Thai-style and Shanghai-style massage are available; confirm the techniques, pressure and charges before starting.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Wind down in the quiet 24-hour rest area after your session. You can stay overnight at your own pace, then settle up at the front desk when you are ready to leave.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-excellent-01-blue-bathing-pool',
          caption: 'The signature bathing pool glows under blue mood lighting — a spacious wet area to ease into the moment the door closes behind you.',
          alt: 'The Excellent Sauna blue bathing pool',
        },
        {
          file: 'macau-sauna-spa-excellent-02-ambulance-theme-room',
          caption: 'The newly furnished hospital-themed room at The Excellent Sauna.',
          alt: 'The Excellent Sauna hospital theme room',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: 'A patterned-tile hallway threads past the scenario rooms — DJ booth, office, cinema and more, each waiting under soft light.',
          alt: 'The Excellent Sauna themed-room hallway',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: "A suite with a leather headboard, lighting and hotel-style bedding.",
          alt: 'The Excellent Sauna leather-headboard suite',
        },
        {
          file: 'macau-sauna-spa-excellent-06-mirror-vanity-area',
          caption: 'A bright mirror vanity with tidy amenities and soft lighting, ready for a quick freshen-up before or after your service.',
          alt: 'The Excellent Sauna mirror vanity area',
        },
        {
          file: 'macau-sauna-spa-excellent-07-wood-locker-room',
          caption: 'Wood-panelled lockers and an immaculate finish make changing in on arrival feel discreet and effortless.',
          alt: 'The Excellent Sauna wood locker room',
        },
        {
          file: 'macau-sauna-spa-excellent-08-diamond-accent-rest-area',
          caption: 'A diamond-accent rest area pairs soft lighting with comfortable seating — somewhere to unwind or settle in overnight.',
          alt: 'The Excellent Sauna diamond-accent rest area',
        },
        {
          file: 'macau-sauna-spa-excellent-09-purple-vip-lounge',
          caption: 'Sink into the purple-lit VIP lounge, where plush sofas and a private layout make resting between moments easy.',
          alt: 'The Excellent Sauna purple VIP lounge',
        },
        {
          file: 'macau-sauna-spa-excellent-10-recliner-reception-lounge',
          caption: 'Roomy recliners fill the reception lounge under soft light, doubling as the complimentary overnight rest area.',
          alt: 'The Excellent Sauna recliner reception lounge',
        },
        {
          file: 'macau-sauna-spa-excellent-11-marble-dining-area',
          caption: 'The marble dining area serves complimentary food around the clock — steak, seafood, noodle soups and more, whenever you arrive.',
          alt: 'The Excellent Sauna marble dining area',
        },
        {
          file: 'macau-sauna-spa-excellent-12-themed-scene-suite',
          caption: 'A themed scene suite finished with mood lighting and bespoke styling, one of The Excellent Sauna\'s Japanese-theme rooms.',
          alt: 'The Excellent Sauna themed scene suite',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— 24-hour rest area available for overnight stays',
    },
    'empire-sauna': {
      aliases: 'Empire Sauna Macau, 巨亨桑拿',
      highlights: [
        'Newest 2026 opening',
        'Reported renovation cost: US$1,000',
        'Hotel suites',
      ],
      bestFor: 'Newest luxury / hotel suites',
      features: [
        'Opened in April 2026',
        'Reported renovation cost: US$1,000',
        'Suites with hotel-grade amenities',
        '24-hour service, overnight rest areas',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Empire Sauna, the newest premium sauna on the Macau peninsula. The lobby and stairway entrance set the tone — Eastern zen lines paired with modern luxury finishings, all freshly built. Register at the front desk and collect your wristband from the concierge.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Step into the signature marble bathing pool — warm ambient lighting, generous space, and a calm, almost spa-resort quality unusual for Macau. The wet-area hardware is brand-new throughout, including a full sauna suite, making this the centerpiece of the venue.',
        },
        {
          title: 'Dining Lounge',
          body: 'Move through to the dining area for complimentary food and drinks. The room is styled to hotel-grade standards rather than typical sauna canteen — quiet, private, with comfortable seating designed for taking your time before or after service.',
        },
        {
          title: 'Confirm Massage Options and Fees',
          body: 'Ask reception about the massage options, duration and itemised charges before deciding what suits your needs. Reference prices range from MOP 2,488 to 7,388; confirm the service details and total cost before starting.',
        },
        {
          title: '60-Minute Massage',
          body: 'The massage lasts 60 minutes; ask reception about the techniques and arrangements beforehand. Rooms include a bathtub and adjustable lighting and audio, so you can set a comfortable atmosphere.',
        },
        {
          title: 'Rest Area & Overnight',
          body: 'After service, retreat to the dedicated rest area — quiet, dimly lit, and built for actual sleep rather than chair-naps. Overnight stays are welcomed, and the wet area, dining lounge, and rest area remain accessible for the duration of your visit.',
        },
        {
          title: 'Departure',
          body: 'Check out at the front desk. Empire Sauna accepts cash, card, WeChat Pay, and Alipay. Book through our concierge in advance and your site-exclusive perks (free add-ons, free shuttle, no entrance fee) are settled accurately at checkout.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-empire-01-twin-marble-bath-pools',
          caption: 'Sink into Empire Sauna\'s marble bathing pools and let the warm water and low light ease the day out of you.',
          alt: 'Empire Sauna marble bathing pools',
        },
        {
          file: 'macau-sauna-spa-empire-02-grand-lobby-photo-wall',
          caption: 'The hush of the grand lobby is your first breath of calm as you arrive.',
          alt: 'Empire Sauna grand lobby',
        },
        {
          file: 'macau-sauna-spa-empire-03-marble-entry-staircase',
          caption: 'Follow the marble staircase up, deeper into the quiet.',
          alt: 'Empire Sauna marble staircase',
        },
        {
          file: 'macau-sauna-spa-empire-04-white-marble-treatment-room',
          caption: 'White marble walls and warm candlelight inside a suite.',
          alt: 'Empire Sauna white-marble suite',
        },
        {
          file: 'macau-sauna-spa-empire-06-gold-ceiling-marble-suite',
          caption: 'A gilded-ceiling suite glows in custom light, hotel-soft bedding waiting.',
          alt: 'Empire Sauna gold-ceiling suite',
        },
        {
          file: 'macau-sauna-spa-empire-07-dark-marble-private-wash-room',
          caption: 'Rinse off in a private dark-marble wash room, secluded and spotless.',
          alt: 'Empire Sauna private wash room',
        },
        {
          file: 'macau-sauna-spa-empire-08-forest-mural-bedroom',
          caption: 'Drift off in a forest-mural suite, soft light and calm all around.',
          alt: 'Empire Sauna forest-mural room',
        },
        {
          file: 'macau-sauna-spa-empire-09-chandelier-recliner-lounge',
          caption: 'Sink into a recliner under the chandeliers and rest, before or after your service.',
          alt: 'Empire Sauna recliner lounge',
        },
        {
          file: 'macau-sauna-spa-empire-10-marble-cafe-lounge',
          caption: 'Linger in the marble cafe lounge — a quiet corner all to yourself.',
          alt: 'Empire Sauna marble cafe lounge',
        },
        {
          file: 'macau-sauna-spa-empire-11-purple-led-dining-hall',
          caption: 'Help yourself to complimentary steak, seafood and hot dishes in the mood-lit dining hall.',
          alt: 'Empire Sauna dining hall',
        },
        {
          file: 'macau-sauna-spa-empire-12-atrium-restaurant',
          caption: 'Take your time over the included meal in the airy atrium restaurant.',
          alt: 'Empire Sauna atrium restaurant',
        },
      ],
      website: {
        url: 'https://empire-sauna.com/en/',
        label: 'Empire Sauna official website ↗',
        display: 'empire-sauna.com/en/',
      },
      overnightValue: 'Available',
      overnightNote: '— Overnight stay welcomed in dedicated rest areas',
    },
    'east-castle-spa': {
      aliases: 'East Castle Spa Macau, 東方皇堡水療',
      highlights: [
        'More than 20 distinct room designs',
      ],
      bestFor: 'Exploring different room designs',
      features: [
        '20+ distinct room designs',
        'Professional Service Team',
        'Open 24 Hours',
        'Spacious bathing and rest areas',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at East Castle Spa, the original pioneer of themed rooms in Macau. Register at the front desk and collect your wristband. The reference price range is MOP 2,388 – 6,498; detailed menu items are confirmed when booking.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy the bathing facilities and sauna at your own pace, with time to soak, rest and unwind after your travels.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary food and drinks are available. Take a break in the dining area before continuing with your visit.',
        },
        {
          title: 'Confirm Your Massage',
          body: 'Ask reception about massage options, available times and room availability. Confirm the service details, duration and itemised charges before starting.',
        },
        {
          title: '20+ Distinct Room Designs',
          body: 'One of East Castle Spa’s highlights is its choice of more than 20 room designs. Each has a different interior style, so you can enjoy your massage in surroundings that suit your taste.',
        },
        {
          title: 'Service Charges and Tax',
          body: 'A 10% service charge and a 5% tourism tax apply.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Lobby reclining chairs are available for overnight rest. East Castle\'s core experience centers on the themed rooms rather than rest facilities — if overnight comfort is your priority, Majesty Spa is a better choice.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: 'East Castle Spa\'s gym-themed room has training equipment and props.',
          alt: 'East Castle Spa gym theme room',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: 'Step into the lobby and an LED brand wall with mood lighting sets the tone for the themed venue waiting beyond.',
          alt: 'East Castle Spa lobby brand wall',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: "A spacious bathing pool with dramatic lighting.",
          alt: 'East Castle Spa LED stage bath pool',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: 'A classroom-themed room with desks, a blackboard and classroom props.',
          alt: 'East Castle Spa classroom theme room',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: 'A hospital-ward themed room with a detailed bed-and-clinic set.',
          alt: 'East Castle Spa hospital ward room',
        },
        {
          file: 'macau-sauna-spa-east-castle-06-eye-exam-medical-room',
          caption: 'An eye-exam medical room with clinical set and props — one of the 20-plus scenario rooms you can choose from at East Castle Spa.',
          alt: 'East Castle Spa eye-exam medical room',
        },
        {
          file: 'macau-sauna-spa-east-castle-07-jail-bars-room',
          caption: 'A jail-bars interrogation room, a true-to-life set built for guests chasing maximum thrill.',
          alt: 'East Castle Spa jail theme room',
        },
        {
          file: 'macau-sauna-spa-east-castle-08-airplane-cabin-room',
          caption: 'An airplane-cabin themed room with passenger seats and cabin detailing.',
          alt: 'East Castle Spa airplane cabin room',
        },
        {
          file: 'macau-sauna-spa-east-castle-09-ufc-octagon-room',
          caption: 'An octagon boxing-ring themed room — a complete arena set for a session unlike anywhere else.',
          alt: 'East Castle Spa boxing-ring theme room',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Lobby reclining chairs',
    },
    'victoria-sauna': {
      aliases: 'Victoria Sauna Macau, 凱旋桑拿',
      highlights: [
        'Quiet, carefully maintained setting',
        'Attentive service',
        'Free private rest room after 3:00 AM',
      ],
      bestFor: 'Quiet, spacious, a top choice for overnight stays',
      features: [
        'Focus on Service Quality',
        'Spacious Rest Areas',
        'Quiet & Relaxing Environment',
        'Best for Overnight Stays',
        'Open 24 Hours',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Victoria Sauna on the 5th floor of L\'Arc Hotel, centrally located on the Macau Peninsula near MGM, Wynn, and Grand Lisboa. Register at the front desk and collect your wristband — the overall atmosphere is quiet and private.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy the bathing facilities and sauna in a clean, serene setting. Victoria deliberately manages guest volume, so it never feels crowded even during peak hours.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining in a quiet, comfortable setting — none of the noise you\'d find at larger venues.',
        },
        {
          title: "Ask about massage packages",
          body: "Tell reception your preferred massage style, available time and budget. Ask which packages fit your visit and what each includes.",
        },
        {
          title: "Confirm your massage package",
          body: "Confirm the massage type, duration and total cost before starting. Prices range from MOP 2,298 to MOP 6,998, plus a 10% service fee.",
        },
        {
          title: "60-Minute Massage",
          body: "The reference duration is 60 minutes. Before starting, confirm the massage treatment, actual duration and itemised charges with reception.",
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Quiet and private — one of the best venues in Macau for peaceful rest and overnight stays. The lounge is full of recliners, foot traffic is low and noise is minimal, so you can stay the night with peace of mind. Low foot traffic and minimal noise make it ideal for guests seeking tranquility and privacy.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-victoria-01-massage-chair-row',
          caption: 'Victoria Sauna\'s long row of massage recliners — a spacious, hushed rest zone that never feels crowded, true to this hidden-gem venue.',
          alt: 'Victoria Sauna massage chair row',
        },
        {
          file: 'macau-sauna-spa-victoria-02-hotel-exterior-night',
          caption: 'Set inside L\'Arc Hotel in the heart of the Macau Peninsula, an easy stroll from MGM, Wynn and Grand Lisboa.',
          alt: 'L\'Arc Hotel exterior at night',
        },
        {
          file: 'macau-sauna-spa-victoria-03-catwalk-show-stage',
          caption: "The stage is lit by soft lighting.",
          alt: "Victoria Sauna stage",
        },
        {
          file: 'macau-sauna-spa-victoria-04-mosaic-jacuzzi-pool',
          caption: 'A mosaic-tiled jacuzzi pool anchors the spacious bathhouse, built for slow, quiet soaking.',
          alt: 'Victoria Sauna mosaic jacuzzi pool',
        },
        {
          file: 'macau-sauna-spa-victoria-05-black-marble-corridor',
          caption: 'A black-marble corridor in understated tones, its soft light guiding a private path between zones.',
          alt: 'Victoria Sauna black-marble corridor',
        },
        {
          file: 'macau-sauna-spa-victoria-06-wood-locker-room',
          caption: 'The wood-panelled locker room is clean and roomy — an easy, serene start to the visit.',
          alt: 'Victoria Sauna wood locker room',
        },
        {
          file: 'macau-sauna-spa-victoria-07-premium-recliner-lounge',
          caption: 'A premium recliner lounge, spacious and restful, ideal for Victoria Sauna\'s signature overnight stays.',
          alt: 'Victoria Sauna premium recliner lounge',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: "A comfortable seating area faces the stage.",
          alt: "Victoria Sauna seating area facing the stage",
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Quiet environment, good for rest',
    },
    'm-club': {
      aliases: 'M Club Macau, 晉會MCLUB',
      highlights: [
        'Sister venue to East Castle',
        'KTV',
        'Hot spring rooms',
        'More luxurious decor',
      ],
      bestFor: 'Historical facilities — temporarily closed',
      features: [
        'Futuristic interiors',
        'Distinct room designs',
        'KTV rooms',
        'Bathing facilities',
        'Temporarily closed',
      ],
      flow: [
        {
          title: 'Temporarily Closed',
          body: 'M Club is currently closed and is not accepting guests or bookings. The information below describes its former facilities.',
        },
        {
          title: 'Venue and Rooms',
          body: 'A sister venue of East Castle Spa, M Club previously featured rooms in different styles, KTV rooms and bathing facilities.',
        },
        {
          title: 'Bathing and Dining',
          body: 'The former facilities included bathing, sauna and dining areas with futuristic interiors. These facilities are not currently open to visitors.',
        },
        {
          title: 'Historical Charges',
          body: 'A 10% service charge previously applied. This is a historical record, not a current quotation or booking offer.',
        },
        {
          title: 'Rest Facilities',
          body: 'The lobby formerly had a recliner lounge. Overnight stays are unavailable during the closure; any reopening arrangements should be checked against the venue’s latest announcement.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-mclub-01-sports-tv-lounge',
          caption: 'M Club\'s signature sports-TV lounge, styled in cyberpunk tech with big-screen live broadcasts — settle in to unwind before or after your session.',
          alt: 'M Club sports-TV lounge',
        },
        {
          file: 'macau-sauna-spa-mclub-02-golf-cart-theme-room',
          caption: 'A golf-themed room with cart-styled staging, one of the venue\'s many immersive themed suites built for a different world each visit.',
          alt: 'M Club golf theme room',
        },
        {
          file: 'macau-sauna-spa-mclub-03-neon-mirror-corridor',
          caption: 'Neon-lit corridors laced with cyberpunk lighting set the tone for Macau\'s most high-tech sauna interior.',
          alt: 'M Club neon mirror corridor',
        },
        {
          file: 'macau-sauna-spa-mclub-04-marble-locker-room',
          caption: 'A marble locker room — clean, private changing space where the futuristic finish reaches every corner.',
          alt: 'M Club marble locker room',
        },
        {
          file: 'macau-sauna-spa-mclub-05-ktv-panoramic-room',
          caption: 'M Club\'s panoramic KTV room headlines its signature party mode, one of only two Macau saunas with karaoke.',
          alt: 'M Club panoramic KTV room',
        },
        {
          file: 'macau-sauna-spa-mclub-06-ktv-private-lounge',
          caption: "A big-screen KTV lounge with seating for karaoke.",
          alt: 'M Club big-screen KTV lounge',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: 'A galaxy bedroom glowing under aurora mood lighting — part of M Club\'s signature planet-series scenes at peak tech.',
          alt: 'M Club galaxy aurora room',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: "A bathing room with Japanese-style décor.",
          alt: 'M Club Japanese hot-spring room',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: "A room furnished with a billiards table.",
          alt: 'M Club pool-table suite',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: 'A racing-simulator game room with futuristic décor and gaming gear for a cyberpunk play experience.',
          alt: 'M Club racing simulator room',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: 'A dart-games lounge — well-equipped entertainment and an easy social space within the high-tech interior.',
          alt: 'M Club dart games lounge',
        },
        {
          file: 'macau-sauna-spa-mclub-15-neon-m-logo-entrance',
          caption: 'The neon M-logo entrance — a cyberpunk facade announcing Macau\'s most high-tech sauna from the door.',
          alt: 'M Club neon M-logo entrance',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Lobby reclining chairs',
    },
    'number-one-sauna': {
      aliases: 'Number One Sauna Macau, The One Sauna, 壹號桑拿',
      highlights: [
        'Spacious changing rooms',
        'Whirlpool baths',
        'Dry sauna and steam room',
        'Former dining facilities',
      ],
      bestFor: 'Historical facilities — temporarily closed',
      features: [
        'Bathing facilities',
        'Spacious hall',
        'Lockers',
        'Rest area',
        'Temporarily closed',
      ],
      flow: [
        {
          title: 'Temporarily Closed',
          body: 'Number One Sauna is currently closed and is not accepting guests or bookings. The information below is a record of its former facilities.',
        },
        {
          title: 'Bathing and Changing Facilities',
          body: 'The venue formerly had spacious changing rooms, lockers, large whirlpool baths, a dry sauna and a steam room.',
        },
        {
          title: 'Dining Area',
          body: 'Previous dining options included steak, fried rice, noodles, fruit and drinks, served in a spacious dining area. Dining service is currently unavailable.',
        },
        {
          title: 'Historical Prices',
          body: 'The recorded historical price range was MOP 2,199 to MOP 7,699. These are not current quotations; bookings and services are unavailable during the closure.',
        },
        {
          title: 'Rest Facilities',
          body: 'A recliner rest area was previously available. Overnight stays are unavailable during the closure; check the venue’s latest announcement for any reopening.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: "The lounge has LED cube seating and soft mood lighting.",
          alt: 'Number One Sauna LED lounge',
        },
        {
          file: 'macau-sauna-spa-number-one-02-changing-room-vanity-area',
          caption: 'A spacious changing and vanity area right at the entrance, bright and immaculate, with everything laid out for an unhurried start.',
          alt: 'Number One Sauna changing-room vanity',
        },
        {
          file: 'macau-sauna-spa-number-one-03-marble-brand-signage',
          caption: 'The brand signage set against polished marble — a composed welcome the moment you arrive.',
          alt: 'Number One Sauna marble signage',
        },
        {
          file: 'macau-sauna-spa-number-one-04-wood-locker-corridor',
          caption: 'A warm wood-panelled locker corridor, orderly and private, where the evening quietly begins.',
          alt: 'Number One Sauna locker corridor',
        },
        {
          file: 'macau-sauna-spa-number-one-05-indoor-bath-pool',
          caption: 'The large indoor bathing pool sits beneath soft lighting alongside dry and steam rooms — soak and unwind before service.',
          alt: 'Number One Sauna indoor bath pool',
        },
        {
          file: 'macau-sauna-spa-number-one-06-premium-spa-suite',
          caption: "A separate suite furnished with hotel-style bedding.",
          alt: 'Number One Sauna premium suite',
        },
        {
          file: 'macau-sauna-spa-number-one-08-glass-wall-bedroom',
          caption: 'A glass-wall themed bedroom, modern in design with soft lighting — private yet open.',
          alt: 'Number One Sauna glass-wall room',
        },
        {
          file: 'macau-sauna-spa-number-one-09-chesterfield-tv-lounge',
          caption: 'A Chesterfield-leather TV lounge with deep seating and a large screen, perfect for relaxed waiting and rest.',
          alt: 'Number One Sauna lounge',
        },
        {
          file: 'macau-sauna-spa-number-one-10-private-entertainment-room',
          caption: 'A private entertainment room with mood lighting and comfortable seating — a social space to share with friends.',
          alt: 'Number One Sauna entertainment room',
        },
        {
          file: 'macau-sauna-spa-number-one-11-free-dining-spread',
          caption: 'Unlimited complimentary dining throughout your stay, led by the signature steak, with seafood, fried rice and noodles, soups and cold beer.',
          alt: 'Number One Sauna complimentary dining',
        },
        {
          file: 'macau-sauna-spa-number-one-12-reception-lobby',
          caption: "The reception lobby at Number One Sauna has a calm, understated interior.",
          alt: 'Number One Sauna reception lobby',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Reclining chairs available; busy during peak hours',
    },
    'familia-nobre': {
      aliases: 'Familia Nobre Macau, 豪門桑拿殿',
      highlights: [
        'Spacious bathing area',
        'Multiple rooms',
        'Rest area',
      ],
      bestFor: 'Historical facilities — temporarily closed',
      features: [
        'Spacious bathing area',
        'Multiple rooms',
        'Lockers',
        'Recliner lounge',
        'Temporarily closed',
      ],
      flow: [
        {
          title: 'Temporarily Closed',
          body: 'Familia Nobre is currently closed and is not accepting guests or bookings. The information below records its former facilities.',
        },
        {
          title: 'Bathing and Changing Facilities',
          body: 'The venue formerly had spacious changing rooms, lockers, baths and sauna rooms, with separate bathing, dining and rest areas.',
        },
        {
          title: 'Dining and Rooms',
          body: 'Steak, drinks and hot food were previously served, and the venue had multiple rooms. Dining and room facilities are not currently open to visitors.',
        },
        {
          title: 'Historical Prices',
          body: 'The recorded historical price range was MOP 2,388 to MOP 6,988, with no service charge at that time. This is a historical record, not a current quotation.',
        },
        {
          title: 'Rest Facilities',
          body: 'The former rest area had multiple recliners spaced apart. Overnight stays are unavailable during the closure; check the venue’s latest announcement for any reopening.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-familia-nobre-01-neon-entrance-night',
          caption: 'The grand entrance and logo of Familia Nobre — the imposing facade of Macau\'s largest sauna, and the first stop for many before the city falls away.',
          alt: 'Familia Nobre entrance and logo',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-02-hm-crown-lightbox-signage',
          caption: 'A crown lightbox glows at the threshold, a luxe note that sets the venue\'s grade the moment you arrive.',
          alt: 'Familia Nobre crown lightbox signage',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-03-purple-grand-staircase',
          caption: 'A soaring purple-lit grand staircase shows off the largest floorplate in Macau, with room to breathe at every turn.',
          alt: 'Familia Nobre purple grand staircase',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-04-red-lantern-theatre-hallway',
          caption: 'A red-lantern hallway bathed in Eastern theatre lighting leads quietly toward the private rooms.',
          alt: 'Familia Nobre red-lantern hallway',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-05-purple-led-bedroom',
          caption: "A room with purple LED lighting and hotel-style bedding.",
          alt: 'Familia Nobre purple-LED room',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-06-red-lattice-massage-room',
          caption: 'A red-lattice massage room with classical Eastern lines and a private layout — one of many room types to choose from.',
          alt: 'Familia Nobre red-lattice massage room',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-07-mirror-chandelier-massage-room',
          caption: 'Crystal light spills across a mirror-and-chandelier room, spacious and well-appointed for an unhurried session.',
          alt: 'Familia Nobre mirror-and-chandelier room',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-08-mirror-sitting-massage-room',
          caption: 'A mirror sitting-room suite with its own seating area and roomy layout — part of Macau\'s largest room count, so you rarely wait.',
          alt: 'Familia Nobre mirror sitting-room suite',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-10-marble-bar-dining',
          caption: 'The marble bar and dining area, where complimentary steak, seafood, stir-fry and cold beer keep regulars coming back.',
          alt: 'Familia Nobre marble bar and dining area',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-11-free-beer-menu-spread',
          caption: 'A complimentary spread of cold beer, soft drinks, juices and hot dishes — served unlimited throughout your stay, no extra charge.',
          alt: 'Familia Nobre complimentary beer and dining spread',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-12-selection-runway-wall',
          caption: "A view of the hall inside Familia Nobre.",
          alt: "Familia Nobre hall",
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Spacious with the most reclining chairs',
    },
    'oceanic-royal-spa': {
      aliases: 'Oceanic Royal Spa, Oceanic Royal Sauna, 帝湖水療, 帝湖水疗, 帝湖桑拿',
      highlights: [
        'Reference price MOP 2,299–7,099',
        'Themed rooms, dining and recliner lounge',
      ],
      bestFor: 'A full Taipa spa evening once the venue resumes operations',
      features: [
        'Temporarily closed — no guests or bookings accepted',
        'Classical and themed rooms',
        '24-hour lounge and overnight rest',
        'Dining and seafood selection',
      ],
      flow: [
        {
          title: 'Check the current status',
          body: 'Oceanic Royal Spa is temporarily closed and is not accepting guests or bookings. Please contact us before making plans.',
        },
        {
          title: 'Choose an alternative',
          body: 'Tell us whether you prefer Taipa or the Macau Peninsula, a themed room, a 24-hour venue or an overnight lounge. We can point you to an operating alternative.',
        },
        {
          title: 'Return when it reopens',
          body: 'When operations resume, reconfirm the day’s price, staff availability and room arrangements — those details can change with the venue schedule.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-01',
          caption: 'The Oceanic Royal Spa entrance signage in Taipa, the clearest first look at the venue’s identity.',
          alt: 'Oceanic Royal Spa entrance signage in Taipa',
        },
        {
          file: 'macau-sauna-spa-oceanic-gallery-202607-03',
          caption: 'A night exterior view of the Oceanic setting in Taipa.',
          alt: 'Oceanic Royal Spa night exterior in Taipa',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-11',
          caption: 'The pool and stage area inside Oceanic Royal Spa.',
          alt: 'Oceanic Royal Spa pool and stage area',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-12',
          caption: 'Stage lighting and a wide room give the interior a more theatrical mood.',
          alt: 'Oceanic Royal Spa stage room',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-07',
          caption: 'A lounge setting designed for a slower pause between parts of the evening.',
          alt: 'Oceanic Royal Spa lounge',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-02',
          caption: 'A twin-bed private room in a warm, understated treatment.',
          alt: 'Oceanic Royal Spa twin-bed private room',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-08',
          caption: 'A vertical view into one of the venue’s private room settings.',
          alt: 'Oceanic Royal Spa private room',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-09',
          caption: 'Another private-room atmosphere with low, warm lighting.',
          alt: 'Oceanic Royal Spa themed private room',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-04',
          caption: 'One image from the dining offering that complements a long stay.',
          alt: 'Oceanic Royal Spa dining offering',
        },
      ],
      overnightValue: 'Available when operating',
      overnightNote: '— Reconfirm the latest arrangement before visiting',
    },
  },
};

const ja: SpaPageCopy = {
  backHome: 'トップに戻る',
  backToVenueList: '店舗一覧に戻る',
  inquiry: {
    booking: 'こんにちは。{venue}を予約したいのですが、手配をお願いできますか？',
    closed: 'こんにちは。{venue}が一時休業中と拝見しました。似たお店を紹介していただけますか？',
  },
  alsoKnownAs: '別名：',
  labels: {
    referencePrice: '主なコース料金の目安',
    separateServiceFee: '別途サービス料',
    noSeparateSurcharge: '別途加算なし',
    priceDisclaimer:
      'コース、部屋、税金、追加項目で総額が変わるため、来店前に明細付きの最終料金をご確認ください。',
    discountCta: 'LINEで問い合わせ（優待あり） →',
    staff: 'セラピスト',
    staffValue: '多国籍セラピスト',
    staffTeam: '多国籍セラピストチーム',
    hours: '営業時間',
    openAllDay: '24時間営業',
    staffHours: 'セラピスト勤務時間',
    website: '公式サイト',
    overnight: '宿泊（24時間）',
    overnightAvailable: '宿泊OK',
    overnightUnavailable: '宿泊不可',
    overnightNoteAvailable: '',
    highlights: 'ポイント',
    bestFor: 'おすすめ',
    payment: '支払い方法',
    quickBook: '初めてでも安心。LINEで問い合わせ — 無料送迎＋優待料金、一人でもOK',
    allContacts: 'LINEで問い合わせ（優待あり） →',
    features: '特徴・サービス',
    gallery: '店内ギャラリー',
    viewLarger: '拡大して見る',
    previousPhoto: '前の写真',
    nextPhoto: '次の写真',
    gallerySwipeHint: '左右にスワイプして写真を切り替え',
    galleryPhotoCount: '全{total}枚中{current}枚目',
    flow: '詳しい流れ',
    moreInfo: 'もっと詳しく知りたい方は、LINEで問い合わせ（無料送迎つき）｜日本語対応で初めてでも安心',
    related: 'その他の人気サウナ',
    learnMore: '詳しく見る',
    officialWebsite: '公式サイト：',
  },
  paymentMethods: [
    '現金',
    'カード',
    'WeChat',
    'Alipay',
  ],
  concierge: {
    title: '帰りの無料送迎もご用意しています',
    body: 'お帰りの際は——お食事のあと、サービス終了直後、どのタイミングでも——LINEで一言ご連絡ください。同じ高級車がお迎えにあがり、ホテル・空港・フェリーターミナル、マカオ市内ならどこへでもお送りします。送迎と同じく、もちろん無料です。',
  },
  vipReminder: {
    title: 'リラックスケア2つを無料サービス',
    body: '8種類のケアメニューから、お好きな2つを無料でお選びいただけます。メニューは背中のアカスリ、レッグマッサージ、ヘッドマッサージ、足裏マッサージ、ハンドネイルケア、フットネイルケア、ハンドマッサージ、耳かきです。ご来店予定を事前に店舗へお知らせしますので、到着時にケアメニューをお選びいただけます。',
    cta: '8つの特典を見る →',
  },
  vipDrawer: {
    titleLead: 'リラックスケア',
    titleAccent: '2つ無料',
    note: '8種類のケアメニューから、お好きな2つを無料でお選びいただけます。ご来店予定を事前に店舗へお知らせしますので、到着時にケアメニューをお選びください。',
    close: '無料ケアメニューの一覧を閉じる',
  },
  cta: {
    headingLead: 'あなたの',
    headingAccent: 'VIP体験を',
    body: 'まずはLINEで問い合わせ。無料送迎・日本語対応で、初めてでも安心。あとはお任せください。',
  },
  breadcrumbHome: 'ホーム',
  breadcrumbList: 'サウナ一覧',
  placeholder: {
    ktv: 'KTVルーム',
    themeRooms: 'テーマルーム',
    overnight: '宿泊（24時間）',
    open24h: '24時間営業',
    noServiceFee: 'サービス料なし',
    peninsula: 'マカオ半島',
    taipa: 'タイパ',
  },
  venues: {
    'clube-rio': {
      aliases: '利澳薈、リオサウナ、Rio KTV、Clube Rio、マカオ ナイトクラブ、マカオ ビジネスKTV',
      highlights: [
        '2026年7月30日グランドオープン',
        'マカオでは珍しいKTV主役の店',
      ],
      bestFor: '友人とのカラオケに',
      features: [
        '飲み放題プラン',
        '完全個室×高音質',
        'リオホテル3階',
      ],
      flow: [
        {
          title: '個室を予約',
          body: '人数と希望時間を添えてご予約ください。オープン直後は個室の空き状況を事前にご確認ください。日本語OKです。',
        },
        {
          title: 'リオホテルへ',
          body: '新口岸のリオホテル（利澳酒店）3階へ。各ボーダーゲートや主要ホテルから数分、無料送迎の手配もできます。到着したら予約名を伝えるだけでスタッフがご案内します。',
        },
        {
          title: '翌4時まで',
          body: '営業は翌4時まで。歌って、乾杯して、マッサージで締める——ペースは自分次第です。宿泊はありませんが、新口岸なので深夜の帰りも安心です。',
        },
        {
          title: '帰りの送迎',
          body: '当サイト経由のご予約で無料専用送迎（相乗りなし）を手配できます。宿泊込みの過ごし方をお探しなら、ご予約時にご相談いただければ最適なプランをご提案します。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-clube-rio-01-main-lounge',
          caption: 'シャンデリアの下でまず一杯。メインラウンジのレザーソファと大理石のテーブルは、仲間を待ちながら気分を温めるのにちょうどいい場所です。',
          alt: 'クラブ・リオ（利澳薈）のメインラウンジ — シャンデリアとレザーソファ',
        },
        {
          file: 'macau-sauna-spa-clube-rio-02-vip-room-gold-leaf',
          caption: '金箔の龍と鷹のアートを飾ったVIPルーム。音響と照明を備えています。',
          alt: 'クラブ・リオのVIPルーム — 金箔の龍と鷹のアート',
        },
        {
          file: 'macau-sauna-spa-clube-rio-03-party-room',
          caption: '仲間全員でビッグルームを貸切。マイクを回しても余裕の広さで、音量全開のまま朝4時まで楽しめます。',
          alt: 'クラブ・リオのパーティールーム',
        },
        {
          file: 'macau-sauna-spa-clube-rio-04-theme-room-orange',
          caption: '暖色オレンジに名馬のアート。部屋ごとに個性が違うから、常連は毎回部屋替えで気分を変えるのが定番です。',
          alt: 'クラブ・リオのテーマルーム — オレンジ基調',
        },
        {
          file: 'macau-sauna-spa-clube-rio-05-lounge-suite',
          caption: 'リビングとカラオケが分かれたスイート仕様。歌い疲れたらソファでお茶を一杯、ペースは自分次第です。',
          alt: 'クラブ・リオのラウンジスイート',
        },
        {
          file: 'macau-sauna-spa-clube-rio-06-reception',
          caption: 'レセプション脇には温度管理されたワインセラー。予約名を伝えるだけでスタッフが個室までエスコートします。',
          alt: 'クラブ・リオのレセプション — ワインセラーと大理石のロビー',
        },
        {
          file: 'macau-sauna-spa-clube-rio-07-corridor',
          caption: '防音ドアの向こうはそれぞれの宴。廊下にかすかに漏れる歌声に、今夜への期待がふくらみます。',
          alt: 'クラブ・リオの個室コリドー',
        },
        {
          file: 'macau-sauna-spa-clube-rio-08-vip-room-crystal-art',
          caption: 'キルティングのオレンジソファに虎豹のクリスタルアート。スピーカーと照明を備えたVIPルームです。',
          alt: 'クラブ・リオのVIPルームの一角 — クリスタルアートと金縁ミラー',
        },
        {
          file: 'macau-sauna-spa-clube-rio-09-lounge-suite-orange',
          caption: 'チェック柄のカーテンにずらりと並ぶスツール。輪番カラオケも歌合戦も乾杯も、全員に席があります。',
          alt: 'クラブ・リオのオレンジスイート — チェック柄カーテン',
        },
      ],
      website: {
        url: 'https://rio-clube.com',
        label: 'クラブ・リオ（利澳薈）公式サイト ↗',
        display: 'rio-clube.com',
      },
    },
    'manhao-spa': {
      aliases: '曼濠水療、Manhao Spa',
      highlights: [
        '2026年 氹仔最新',
        'ゆとりある大きなステージ',
        '皇者の大理石ラグジュアリー',
      ],
      bestFor: '広いステージ／タイパでの贅沢なひととき',
      features: [
        '2026年5月1日 氹仔に新規オープン',
        '広々としたステージホール',
        'カラカッタ大理石のラウンジ＆ロッカールーム',
        '営業時間 毎日14:00–翌4:00',
      ],
      flow: [
        {
          title: '君怡酒店（タイパ）に到着',
          body: 'マンハオスパ（曼濠水療）は氹仔の君怡酒店（Grandview Hotel）内にあり、コタイ地区から車で約5分のアクセス。無料送迎を使えばタイパ側では最も行きやすい、最新の高級マカオ サウナです。ロビーでは、カラカッタ大理石に映えるゴールドの王冠 MH ロゴがお出迎え。フロントでチェックインを済ませ、コンシェルジュからリストバンドを受け取ります。',
        },
        {
          title: 'ラグジュアリーなロッカールーム',
          body: 'ロッカールームへ。カラカッタ大理石のフィーチャーウォールに、ゴールドの留め具が付いたダーク木製ロッカー、タフテッド仕様のベンチが並びます。実用一辺倒ではなく皇者ラグジュアリーで統一されたしつらえが、この後の体験のレベルを予感させます。',
        },
        {
          title: 'バス＆ウェットエリア',
          body: 'バスエリアへ。ダークモザイクタイルと緑の筋が入った大理石で仕上げられ、複数のシャワーブースと小さな浸かり湯を備えます。ウェットゾーンはすべて新設で広々。施術前にゆったりと湯に浸かってリラックスできます。',
        },
        {
          title: 'ダイニングラウンジ',
          body: '大理石トップのダイニングラウンジで、無料のフード＆ドリンクを。静かでホテル級の座席とプライベートバーのような雰囲気で、施術の前後にゆっくり過ごせます。',
        },
        {
          title: 'ゆとりある大きなステージ',
          body: 'マンハオスパの見どころは、ディープブルーのネオンと多層のガラス手すりが印象的なステージホール。ゆとりある舞台と立体的な照明が、館内の華やかな見せ場をつくります。',
        },
        {
          title: '60分のマッサージ',
          body: '60分のマッサージで、日常や旅の疲れをゆっくりとほぐしましょう。照明と音楽はお好みに合わせて調整でき、心地よい空間でくつろげます。',
        },
        {
          title: '休憩エリア',
          body: '施術後は専用の休憩エリアへ。星空のような柔らかな灯りのリクライナーが並ぶ静かな空間でくつろげます。営業は毎日 14:00–翌4:00 で、宿泊はご利用いただけません。退店時はフロントで精算、現金・カード・WeChat Pay・Alipay に対応しています。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-manhao-01-marble-gold-signage',
          caption: 'マンハオスパ（曼濠水療）のシンボル、王冠を頂いたゴールドの「MH」モノグラムがカラカッタ大理石に映える。エントランスに足を踏み入れた瞬間、皇室のような贅を尽くした世界観が告げられる。',
          alt: 'マンハオスパ 大理石のゴールド館銘｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-02-blue-showcase-hall',
          caption: "深いブルーのネオンに照らされたホール。多層の通路にガラスの手すりが設けられています。",
          alt: "マンハオスパ 青い照明とガラス手すりのホール｜マカオ サウナ",
        },
        {
          file: 'macau-sauna-spa-manhao-04-mural-bedroom-suite',
          caption: '壁画クロスをあしらったベッドルームスイート。大きめのベッドにソファ、やわらかな間接照明が並び、ゆったりと寛げるホテル級の上質なプライベート空間。',
          alt: 'マンハオスパ 壁画のベッドルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-05-tree-mural-luxury-suite',
          caption: '樹木を描いた壁画が広がるラグジュアリースイート。自然を写したウォールアートと落ち着いた照明が、静かな隠れ家のような安らぎを生み出す。',
          alt: 'マンハオスパ 樹木壁画のスイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-06-marble-locker-room',
          caption: '更衣室から格の違いが伝わる。カラカッタ大理石のフィーチャーウォールに、ゴールドの留め具を備えた特注ロッカー、そしてタフテッド仕様のベンチが整然と並ぶ。',
          alt: 'マンハオスパ 大理石の更衣室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-07-marble-shower-stalls',
          caption: '大理石のシャワーブースは、ひとりずつ使えるプライベートな洗い場。新品同様の清潔な設備が整い、サービス前のリンスも心地よく済ませられる。',
          alt: 'マンハオスパ 大理石のシャワーブース｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-08-jacuzzi-bathing-zone',
          caption: 'ダークなモザイクタイルとグリーンの石目が映える大理石の浴域。ゆったりとした浴池で、サービス前にくつろぎながら湯に浸かれる。',
          alt: 'マンハオスパ 浴池のバスゾーン｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-09-dark-steam-shower-room',
          caption: '隠れ家のように落ち着いたダークなスチームシャワールーム。隅々まで新しく、ウェットエリアで静かに没入できるひとときのために設えられている。',
          alt: 'マンハオスパ ダークなスチームルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-10-marble-dining-bar',
          caption: '大理石のダイニングラウンジは、ホテル級の座り心地にプライベートバーのような趣を重ねた空間。無料のフードとドリンクがここで供される。',
          alt: 'マンハオスパ 大理石のダイニング｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-11-starlight-recliner-lounge',
          caption: '星空をイメージした専用のリクライニングラウンジ。やわらかな光とふかふかのリクライナーが、サービスの前後にゆったりと身体を休ませてくれる。',
          alt: 'マンハオスパ 星空のリクライナーラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-12-mural-corridor',
          caption: '壁画に包まれた回廊が館内の各ゾーンをつなぐ。洗練されたウォールアートとやわらかな光が、サウナというよりブティックホテルのような佇まいを醸し出す。',
          alt: 'マンハオスパ 壁画の回廊｜マカオ サウナ',
        },
      ],
      website: {
        url: 'https://manhaosauna.com',
        label: 'マンハオスパ公式サイト ↗',
        display: 'manhaosauna.com',
      },
    },
    'number-nine-sauna': {
      aliases: '玖號水療、Number Nine Spa',
      highlights: [
        '2026年4月オープンの最新店',
        'モダンなステージ設備',
        '多彩な雰囲気テーマルーム',
        'バリ式＋日本式マッサージ',
      ],
      bestFor: '最新店を一番乗りで体験',
      features: [
        '多彩な客室デザイン',
        'ステージ照明',
        'LEDスクリーン',
        'モダンな入浴設備',
        'バリ式・日本式マッサージ',
      ],
      flow: [
        {
          title: '到着・入店',
          body: '2026年4月にオープンしたばかりのナンバーナインスパ（玖號水療）へ。マカオ半島・新口岸（皇朝区）の御龍酒店（Royal Dragon Hotel）内にあり、リスボアからもアクセスしやすい立地です。無料送迎をご利用いただければ、初めての方でも迷わず到着できます。マカオ最新の店だけあって設備はすべて真新しく、ゴールドと大理石を基調に、プロ仕様の照明システムを組み合わせた現代的でラグジュアリーなデザインです。',
        },
        {
          title: '入浴・リラックス',
          body: '真新しい現代的なバス＆サウナ設備をご利用いただけます。ロッカールームは木目調ロッカーで清潔かつ整然、バスエリアはグリーンのモザイクタイルで彩られ、爽やかで居心地のよい空間です。',
        },
        {
          title: '無料の飲食',
          body: '各種フード＆ドリンクを無料でご利用いただけます。多彩で高級志向のメニューにこだわり、お食事も体験全体の大切な一部としてお楽しみいただけます。',
        },
        {
          title: 'ホール設備',
          body: 'ホールにはステージ照明とLEDスクリーンを備え、ゴールドの装飾と大理石を組み合わせたモダンな空間が広がります。',
        },
        {
          title: 'テーマルームを選ぶ',
          body: 'ナンバーナインには雰囲気の異なるテーマルームが多彩に揃い、各室それぞれに赤・ピンクパープル・ブルーバイオレットなど独自のムード照明を採用。星空天井と上質な内装が没入感を演出します。一部の部屋には円形の特大ベッドという特徴的なデザインも見られます。',
        },
        {
          title: '60分のサービス',
          body: 'バリ式と日本式の2スタイルからお選びいただけ、東南アジアと日本の手技を融合しています。ナンバーナインは「独自の日本式＋バリの情緒」を売りに、従来の店とは一味違う体験をご提供。',
        },
        {
          title: '休憩・宿泊',
          body: '宿泊（24時間）でゆっくりお休みいただけます。真新しい設備で快適そのもの。新店だけあって当初は客足も少なめで、静かにお過ごしいただけます。料金や予約のご相談は、LINEで問い合わせ（無料送迎つき）が便利です。当サイト経由のお問い合わせで、最新の特別価格をご案内いたします。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-nine-01-modern-luxury-themed-suite',
          caption: 'ナンバーナインスパ（玖號水療）が誇るモダンラグジュアリーなスイート。柔らかな間接照明とゴールド＆大理石の上質な内装が、2026年4月オープンのマカオ屈指の新店を彩ります。',
          alt: 'ナンバーナインスパ モダンラグジュアリースイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-02-red-theme-room',
          caption: '満天の星空を映す天井と没入感のある光が包み込む、レッドテーマの円形ベッドルーム。ナンバーナインスパを象徴するムードルームのひとつです。',
          alt: 'ナンバーナインスパ レッド円形ベッドルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-03-aurora-bedroom-purple',
          caption: 'パープルのオーロラライトが灯るテーマルーム。柔らかなグラデーションが空間全体を静かなモダンラグジュアリーの趣で満たします。',
          alt: 'ナンバーナインスパ パープルオーロラルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-04-recliner-lounge',
          caption: '壁画に彩られ、優しい光に満ちたリクライニングラウンジ。ご利用の前後にゆったりとくつろげる、心地よい空間です。',
          alt: 'ナンバーナインスパ リクライニングラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-05-massage-chair-room',
          caption: '真新しいマッサージチェアルーム。清潔な設備とプライベートな一角で、心ゆくまでリラックスいただけます。',
          alt: 'ナンバーナインスパ マッサージチェアルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-06-premium-towel-locker',
          caption: '上質な木製ロッカーと整然としたタオルステーション。塵ひとつない清潔で秩序ある設備が、訪れた瞬間から店の格を物語ります。',
          alt: 'ナンバーナインスパ 木製ロッカーエリア｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-07-royal-dragon-exterior',
          caption: 'ナンバーナインスパは中心部のロイヤルドラゴンホテル（皇庭海景酒店）内に位置し、ドアをくぐった瞬間から格を感じさせる便利な立地です。',
          alt: 'ナンバーナインスパ ロイヤルドラゴンホテル外観｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-08-bath-wash-area',
          caption: '新設された浴池とシャワーエリア。真新しい設備と清潔なウェットゾーンで、一日の疲れを洗い流せます。',
          alt: 'ナンバーナインスパ 浴池・シャワーエリア｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-09-purple-light-bedroom',
          caption: 'パープルの光に照らされたテーマルーム。柔らかな灯りと上質な寝具が、ゆったりとした安らぎのひとときへ誘います。',
          alt: 'ナンバーナインスパ パープルライトの寝室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-10-ambient-themed-bedroom',
          caption: "ネオンの星空を背景に、プロ仕様の照明が輝くメインステージホール。",
          alt: 'ナンバーナインスパ メインステージホール｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '洗練されたダイニングエリア。ステーキやシーフード、麺類などが無料で楽しめ、食事もまた体験の一部となります。',
          alt: 'ナンバーナインスパ ダイニングエリア｜マカオ サウナ',
        },
      ],
      website: {
        url: 'https://numbernine-spa.com',
        label: 'ナンバーナインスパ公式サイト ↗',
        display: 'numbernine-spa.com',
      },
    },
    'shang-pin-spa': {
      aliases: '尚品國際水療、Shang Pin Spa',
      highlights: [
        'モダンな入浴設備',
      ],
      bestFor: '落ち着いた空間／モダンな設備',
      features: [
        'おすすめ度{ratingStars}',
        '指定のマッサージまたはケア施術を無料で提供します。対象の施術はご予約時にご確認ください。',
        '国際水準のサービス',
        'コスパ抜群',
      ],
      flow: [
        {
          title: '到着・受付',
          body: 'リスボエタ・マカオ（葡京人・コタイ）内のシャンピンスパに到着。館内はヨーロピアン・モダンの内装で、コンテンポラリーな雰囲気。フロントで受付を済ませ、リストバンドを受け取ります。',
        },
        {
          title: '入浴・リラックス',
          body: '浴室設備は新しく、充実しています。浴槽やサウナは明るく清潔で、従来の店とはまったく異なる雰囲気です。',
        },
        {
          title: '無料の食事',
          body: '各種の食事を無料で楽しめます。ダイニングは清潔で快適、館内全体のモダンなデザインと統一感があります。',
        },
        {
          title: '客室設備',
          body: '各部屋に専用の浴槽があり、プライベート性が高いのが特長。',
        },
        {
          title: '休憩・宿泊',
          body: "宿泊（24時間）も可能で、ロビーの無料リクライニングラウンジのほか有料の個室休憩室もあります。少人数制の落ち着いた規模ゆえ客足は少なめで、静かで快適。",
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: "コタイのリスボエタ・マカオ（葡京人）内にある、シャンピンスパ（尚品國際水療）の紫に照らされたステージ。",
          alt: "マカオ サウナ｜シャンピンスパの紫のステージ",
        },
        {
          file: 'macau-sauna-spa-elite-02-gold-signage-reception',
          caption: '金のサインが輝くレセプションが、到着の瞬間から上質な雰囲気を演出。コタイ新エリアに滞在するゲストにも選びやすい一軒です。',
          alt: 'シャンピンスパ 金サインのレセプション｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-03-arched-door-lounge',
          caption: 'アーチ扉のラウンジは、モダンで贅沢な仕上げと柔らかな光に包まれた空間。サービスの前後にくつろげる、静かなひとときをどうぞ。',
          alt: 'シャンピンスパ アーチ扉のラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-04-porthole-mirror-stage',
          caption: "丸窓ミラーと段状の座席を備えたステージ。",
          alt: 'シャンピンスパ 丸窓ミラーのステージ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '明るく清潔に整えられた、モダンなジャグジー付きの浴室エリアです。',
          alt: 'シャンピンスパ ジャグジーの浴池｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-06-blue-led-v88-corridor',
          caption: '青いLEDが導く客室への通路。館内全体に行き渡る、プライベートで現代的なレイアウトの一部です。',
          alt: 'シャンピンスパ 青LEDの通路｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-07-marble-private-corridor',
          caption: 'プライベートスイートへと続く洗練された通路。静かで落ち着き、視線からもしっかりと守られています。',
          alt: 'シャンピンスパ 個室への通路｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-08-mirror-headboard-bedroom',
          caption: 'ミラーヘッドボードのベッドルームは、モダンで贅沢なスタイリング。プライベートで、静かな心地よさに満ちています。',
          alt: 'シャンピンスパ ミラーヘッドボードの客室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-09-starlight-magenta-bedroom',
          caption: 'マゼンタの光に照らされた星空天井の特別ルーム。ロマンティックな雰囲気と新品の設備が魅力です。',
          alt: 'シャンピンスパ 星空天井の客室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-10-wide-recliner-theatre',
          caption: 'ゆったりとしたリクライナーラウンジ。無料のチェアで、宿泊（24時間）のゲストも朝までゆっくり休めます。',
          alt: 'シャンピンスパ リクライナーラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-11-selection-stage',
          caption: "シャンピンスパ館内のコンパクトなステージ。",
          alt: "シャンピンスパのステージ｜マカオ サウナ",
        },
        {
          file: 'macau-sauna-spa-elite-12-massage-chair-rest-area',
          caption: 'マッサージチェアの休憩エリア。無料の軽食とドリンクとともに、静かでくつろげる一角です。',
          alt: 'シャンピンスパ マッサージチェアの休憩エリア｜マカオ サウナ',
        },
      ],
      website: {
        url: 'https://shangpin-spa.com',
        label: 'シャンピンスパ公式サイト ↗',
        display: 'shangpin-spa.com',
      },
    },
    'majesty-spa': {
      aliases: '尊貴水療、Majesty Spa',
      highlights: [
        '最高峰の豪華内装',
        '最大級の客室',
        'サービス料無料',
      ],
      bestFor: '豪華な空間／宿泊（24時間）の本命',
      features: [
        'マカオ最高峰の豪華内装',
        '10種類以上の異なるスタイルの客室',
        'KTVルームでパーティーモード',
        '24時間営業',
        'サービス料無料',
      ],
      flow: [
        {
          title: '到着・受付',
          body: 'マジェスティスパに到着。マカオ サウナのなかでも内装の豪華さで随一とされる一軒です。ゴールドと大理石が館内を貫き、ひと目でトップクラスの会員制クラブの風格が感じられます。まずはフロントで受付を済ませ、リストバンドを受け取ります。',
        },
        {
          title: '入浴・リラックス',
          body: '豪華な入浴設備とサウナを満喫。浴槽はゆったり広く、照明は柔らかで、全体に上品で大らかな空気が流れます。マカオでも屈指のハードウェアを誇るので、ここでの入浴はぜひ時間をかけてじっくりと。',
        },
        {
          title: '無料のお食事',
          body: 'ステーキ、新鮮なフルーツ、よく冷えたビールなどを無料でどうぞ。食材もメニューも豊富で、マジェスティの食事クオリティは業界でも高く評価されています。滞在中は食べ放題・飲み放題です。',
        },
        {
          title: "マッサージプランを選ぶ",
          body: "受付で利用できるマッサージプラン、施術時間、含まれる内容を確認し、総額を確認してからお選びください。",
        },
        {
          title: '料金の確認',
          body: '料金はMOP 2,799〜MOP 6,699。',
        },
        {
          title: '60分のマッサージ',
          body: '広々とした客室で60分のマッサージを受けられます。照明や家具が落ち着いた空間を整えています。施術内容と料金は開始前にご確認ください。',
        },
        {
          title: '休憩・宿泊',
          body: 'マジェスティは24時間営業で宿泊OK。ロビーの無料リクライニングラウンジでゆっくり休めるほか、繁忙期は有料の個室休憩室も選べます。無料の食事も揃っており、朝まで快適に過ごせます。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-majesty-01-ktv-party-room',
          caption: 'マジェスティスパ（尊貴水療）を象徴するKTVパーティールーム。マカオで唯一KTVを備える二軒のうちの一軒で、夜更けまで賑わう宴のために誂えられた贅を尽くした個室です。',
          alt: 'マカオ サウナ｜マジェスティスパのKTVパーティールーム',
        },
        {
          file: 'macau-sauna-spa-majesty-02-majesty-entrance-signage',
          caption: '落ち着きと風格を湛えたエントランスのサイン。マカオでも屈指の豪奢な設えを誇る当店の世界へ、到着した瞬間から誘います。',
          alt: 'マジェスティスパ エントランスのサイン｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-03-gold-chandelier-bath-pool',
          caption: '金のシャンデリアが煌めく浴池。ゆったりと広く、柔らかな灯りに包まれ、夜の始まりまで身を委ねたくなる極上のウェットエリアです。',
          alt: 'マジェスティスパ 金シャンデリアの浴池｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-04-curved-wood-corridor',
          caption: '曲線を描く木目の廊下が各テーマルームを結びます。柔らかな照明と流れるようなラインが、静かで密やかな通り道を演出します。',
          alt: 'マジェスティスパ 曲線木目の廊下｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-05-chinese-marriage-bed-room',
          caption: '中華の婚礼ベッドをテーマにした一室。彫刻が施された伝統の寝台に紅と金の装いをまとい、十を超える精緻なテーマルームの一つを彩ります。',
          alt: 'マジェスティスパ 中華婚礼ベッドのテーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-06-egypt-pharaoh-room',
          caption: 'エジプトのファラオをテーマにした一室。金箔の壁面レリーフと神殿を思わせる意匠が、当店のテーマ性の幅広さを物語ります。',
          alt: 'マジェスティスパ エジプト ファラオのテーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-07-gym-boxing-theme-room',
          caption: 'ジムとボクシングをテーマにした一室。大胆でアスリートらしい設えが効いた、十数室のテーマルームの中でも遊び心あふれる選択肢です。',
          alt: 'マジェスティスパ ジム＆ボクシングのテーマルーム｜マカオ サウナ',
        },
      ],
    },
    'the-excellent-sauna': {
      aliases: '極品桑拿、The Excellent Sauna',
      highlights: [
        'グランドエンペラーホテル本館内',
        'さまざまなスタイルの客室',
      ],
      bestFor: '昼スタート／テーマ体験',
      features: [
        'グランドエンペラーホテル本館',
        '新しいテーマルーム',
        '多彩なテーマ',
        'DJルーム体験',
        '24時間営業・宿泊休憩エリア',
      ],
      flow: [
        {
          title: '到着・入場',
          body: 'マカオ半島・新口岸（皇朝区）のグランドエンペラーホテル本館内にあるエクセレントサウナ（極品桑拿）に到着。施設は24時間営業で、セラピストの時間帯は13:00〜05:00です。受付を済ませ、入浴して、静かなブティック型のペースで過ごせます。',
        },
        {
          title: '入浴・リラックス',
          body: 'シャワーやサウナでゆっくりと身体を温め、リラックス。エクセレントは比較的静かで落ち着いた環境。客数も多すぎず、大型店のような騒がしさとは無縁です。',
        },
        {
          title: '無料の食事',
          body: '各種フードを24時間無料で提供。午後でも深夜でも、自分のタイミングで食事を楽しめます。',
        },
        {
          title: 'マッサージの相談',
          body: '重点的にほぐしたい部位や好みの力加減を受付に伝え、利用できるマッサージの内容、時間、料金を確認してから申し込みます。',
        },
        {
          title: '60分のマッサージ',
          body: 'マッサージは約60分で、別途10%のサービス料がかかります。タイ式と上海式のマッサージがあり、施術の内容、力加減、料金は開始前にご確認ください。',
        },
        {
          title: '休憩・宿泊',
          body: '施術後は静かな24時間休憩エリアでひと息。そのままゆっくり宿泊でき、退店するときにフロントで精算します。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-excellent-01-blue-bathing-pool',
          caption: 'エクセレントサウナ（極品桑拿）を象徴する浴池は、ブルーの間接照明に静かに照らされます。扉が閉まったその瞬間から心をほどける、ゆとりあるウェットエリアです。',
          alt: 'マカオ サウナ｜エクセレントサウナの青い浴池',
        },
        {
          file: 'macau-sauna-spa-excellent-02-ambulance-theme-room',
          caption: 'エクセレントサウナに新設された、病院をテーマにした内装の部屋です。',
          alt: 'エクセレントサウナ 医院テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '模様タイルの回廊が、テーマルームの数々へと続きます。DJブース、オフィス、シネマほか、それぞれが柔らかな灯りの下であなたを待っています。',
          alt: 'マカオ サウナ｜エクセレントサウナのテーマルーム回廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: "革張りのヘッドボード、照明、ホテル仕様の寝具を備えたスイート。",
          alt: 'エクセレントサウナ レザーヘッドのスイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-06-mirror-vanity-area',
          caption: '明るいミラー付きパウダースペースには、整えられたアメニティと柔らかな灯り。ご利用の前後、さっと身支度を整えられます。',
          alt: 'エクセレントサウナ パウダースペース｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-07-wood-locker-room',
          caption: '木目調のロッカーと隅々まで行き届いた仕上がりが、到着後の着替えを控えめに、心地よく演出します。',
          alt: 'マカオ サウナ｜エクセレントサウナの木目ロッカールーム',
        },
        {
          file: 'macau-sauna-spa-excellent-08-diamond-accent-rest-area',
          caption: 'ダイヤモンドをあしらった休憩エリアは、柔らかな照明と心地よいソファが調和。ひと息つくにも、宿泊（24時間）で身を落ち着けるにもふさわしい場所です。',
          alt: 'エクセレントサウナ ダイヤ装飾の休憩エリア｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-09-purple-vip-lounge',
          caption: 'パープルに灯るVIPラウンジに身を沈めて。ふかふかのソファとプライベートな設えが、ひとときの合間の休息を心地よくしてくれます。',
          alt: 'マカオ サウナ｜エクセレントサウナの紫VIPラウンジ',
        },
        {
          file: 'macau-sauna-spa-excellent-10-recliner-reception-lounge',
          caption: '受付ラウンジには、柔らかな灯りの下にゆったりとしたリクライナーがずらり。そのまま宿泊（24時間）の無料休憩エリアとしてもお使いいただけます。',
          alt: 'エクセレントサウナ リクライナー休憩ラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-11-marble-dining-area',
          caption: '大理石のダイニングでは、24時間無料の食事をご用意。ステーキ、シーフード、麺類など、いつ到着しても温かくお迎えします。',
          alt: 'マカオ サウナ｜エクセレントサウナの大理石ダイニング',
        },
        {
          file: 'macau-sauna-spa-excellent-12-themed-scene-suite',
          caption: '間接照明と誂えのしつらえで仕上げたテーマスイート。エクセレントサウナ（極品桑拿）が誇る、日本テーマルームのひとつです。',
          alt: 'エクセレントサウナ 日本テーマのスイート｜マカオ サウナ',
        },
      ],
    },
    'empire-sauna': {
      aliases: '巨亨桑拿、Empire Sauna',
      highlights: [
        '2026年 最新オープン',
        '改装費は1,000米ドルとのこと',
        'ホテルスイート',
      ],
      bestFor: '最新の高級店／ホテルスイートを楽しみたい方',
      features: [
        '2026年4月オープン',
        '改装費は1,000米ドルとのこと',
        'ホテル級スイート',
        '24時間営業・宿泊（24時間）OK',
      ],
      flow: [
        {
          title: '到着・チェックイン（アクセス・無料送迎）',
          body: 'マカオ半島・新口岸エリアで最も新しい高級マカオ サウナ、エンパイアサウナ（巨亨桑拿）に到着。空港やホテルからの無料送迎をご利用いただけるのでアクセスも安心です。ロビーと階段の入口からすでに上質な雰囲気——東洋的な禅のラインとモダンな高級感が調和し、すべてが新装そのもの。フロントで受付を済ませ、コンシェルジュからリストバンドを受け取ります。',
        },
        {
          title: '入浴・リラックス',
          body: '看板の大理石バスへ。やわらかな間接照明とゆったりとした空間で、マカオでは珍しいリゾートスパのような静けさが広がります。ウェットエリアの設備はすべて新品で、本格的なサウナ室も完備。館内のハイライトとなる空間です。',
        },
        {
          title: 'ダイニングラウンジ',
          body: 'ダイニングへ移動し、無料の食事とドリンクをどうぞ。従来のサウナの食堂とは一線を画すホテル級の内装で、静かでプライベート感のある快適な座席をご用意。サービスの前後にゆっくりとお過ごしいただけます。',
        },
        {
          title: 'マッサージ内容と料金の確認',
          body: '受付でマッサージの内容、所要時間、料金の内訳を確認し、ご自身の希望に合うものを選びます。参考料金は MOP 2,488～7,388 です。利用前に内容と合計金額をご確認ください。',
        },
        {
          title: '60分のマッサージ',
          body: 'マッサージは60分です。手法や利用の流れは、事前に受付へお問い合わせください。客室には浴槽があり、照明と音響を室内で調整して、好みの落ち着いた環境を整えられます。',
        },
        {
          title: '休憩・宿泊（24時間）',
          body: 'サービス後は専用の休憩エリアへ。照明を落とした静かな空間で、仮眠ではなくしっかり眠るために設計されています。宿泊（24時間）も歓迎で、滞在中はウェットエリア・ダイニング・休憩エリアをいつでも利用できます。',
        },
        {
          title: '翌日のチェックアウト',
          body: 'フロントでチェックアウト。エンパイアサウナは現金・カード・WeChat Pay・Alipay に対応しています。事前にコンシェルジュ（LINEで問い合わせ）からご予約いただければ、当サイト限定特典（無料ミニサービス・無料送迎・入場料無料）もチェックアウト時に正確に精算されます。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-empire-01-twin-marble-bath-pools',
          caption: 'エンパイアサウナ（巨亨桑拿）の大理石の浴池に身を沈め、温かな湯と落ち着いた灯りに一日の疲れをほどいてください。',
          alt: 'マカオ サウナ｜エンパイアサウナの大理石の浴池',
        },
        {
          file: 'macau-sauna-spa-empire-02-grand-lobby-photo-wall',
          caption: '静寂に包まれた壮麗なロビーが、到着したあなたを最初の安らぎへと誘います。',
          alt: 'エンパイアサウナ 壮麗なロビー｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-empire-03-marble-entry-staircase',
          caption: '大理石の階段を上がるほどに、より深い静けさへと包まれていきます。',
          alt: 'エンパイアサウナ 大理石の階段｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-empire-04-white-marble-treatment-room',
          caption: '白い大理石の壁とキャンドルの温かな光が印象的なスイート。',
          alt: 'マカオ サウナ｜エンパイアサウナの白大理石スイート',
        },
        {
          file: 'macau-sauna-spa-empire-06-gold-ceiling-marble-suite',
          caption: '金箔の天井が誂えの灯りに輝くスイート。ホテルのように柔らかな寝具があなたを待っています。',
          alt: 'マカオ サウナ｜エンパイアサウナの金天井スイート',
        },
        {
          file: 'macau-sauna-spa-empire-07-dark-marble-private-wash-room',
          caption: 'ダークマーブルのプライベートな洗い場で、人目を気にせず清潔な空間で身を清めて。',
          alt: 'エンパイアサウナ 個室の洗い場｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-empire-08-forest-mural-bedroom',
          caption: '森の壁画に囲まれたスイートで、柔らかな光と静けさに身をゆだねて眠りにつくひととき。',
          alt: 'マカオ サウナ｜エンパイアサウナの森壁画ルーム',
        },
        {
          file: 'macau-sauna-spa-empire-09-chandelier-recliner-lounge',
          caption: 'シャンデリアの下のリクライナーに身を沈め、サービスの前後にゆったりとお休みください。',
          alt: 'エンパイアサウナ リクライナーラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-empire-10-marble-cafe-lounge',
          caption: '大理石のカフェラウンジで、あなただけの静かな一角にゆっくりと身を置いて。',
          alt: 'マカオ サウナ｜エンパイアサウナの大理石カフェラウンジ',
        },
        {
          file: 'macau-sauna-spa-empire-11-purple-led-dining-hall',
          caption: 'ムードある灯りの食事ホールで、ステーキやシーフード、温かな料理を無料でご自由にお楽しみください。',
          alt: 'エンパイアサウナ 食事ホール｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-empire-12-atrium-restaurant',
          caption: '開放的なアトリウムのレストランで、料金に含まれたお食事をゆっくりと味わって。',
          alt: 'マカオ サウナ｜エンパイアサウナのアトリウムレストラン',
        },
      ],
      website: {
        url: 'https://empire-sauna.com',
        label: 'エンパイアサウナ公式サイト ↗',
        display: 'empire-sauna.com',
      },
    },
    'east-castle-spa': {
      aliases: '東方皇堡水療、East Castle Spa',
      highlights: [
        '20種類以上の客室デザイン',
      ],
      bestFor: 'さまざまな客室デザインを楽しむ',
      features: [
        '20種類以上の客室デザイン',
        'プロのサービスチーム',
        '24時間営業',
        '広々とした浴場と休憩スペース',
      ],
      flow: [
        {
          title: '到着・チェックイン',
          body: 'イーストキャッスルスパに到着。ここはマカオにおけるテーマルームの元祖です。まずはフロントで受付を済ませ、リストバンドを受け取りましょう。参考料金帯は MOP 2,388〜6,498 で、詳しいメニューは予約時にご確認ください。',
        },
        {
          title: '入浴・リラックス',
          body: '浴槽やサウナを自分のペースで利用し、入浴や休憩をしながら旅の疲れを癒せます。',
        },
        {
          title: '無料の食事',
          body: '無料の食事と飲み物を用意しています。ダイニングでひと休みしてから、その後の予定をゆっくり決められます。',
        },
        {
          title: 'マッサージの確認',
          body: '受付でマッサージの内容、予約可能な時間、客室の空き状況を確認します。利用前に内容、所要時間、料金の内訳を確かめて、ご自身の予定に合わせてお選びください。',
        },
        {
          title: '20種類以上の客室デザイン',
          body: 'イーストキャッスルスパの魅力の一つは、20種類以上の個性ある客室デザインです。内装や雰囲気の異なる部屋から、好みに合った空間でマッサージを楽しめます。',
        },
        {
          title: 'サービス料・税金',
          body: '別途10%のサービス料と5%の観光税がかかります。',
        },
        {
          title: '休憩・宿泊',
          body: 'ロビーにはリクライニングチェアがあり、宿泊（24時間）も可能です。皇堡の体験の核はテーマルームであって休憩設備ではないため、宿泊時の快適さを最優先するならマジェスティスパ（尊貴水療）をおすすめします。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: 'イーストキャッスルスパのジム・テーマルームは、トレーニング機材と小道具を備えています。',
          alt: 'マカオ サウナ｜イーストキャッスルスパのジムルーム',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: 'ロビーに足を踏み入れると、ムード照明に浮かぶLEDのブランドウォールが、その先に広がるテーマ空間への期待を静かに高めます。',
          alt: 'イーストキャッスルスパ ブランドウォール｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: "ドラマティックな照明に包まれた広々とした浴池。",
          alt: 'マカオ サウナ｜イーストキャッスルスパの浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '机や黒板、小道具を備えた教室テーマのルームです。',
          alt: 'イーストキャッスルスパ 教室テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: '病室をテーマにしたルームは、ベッドや診療設備を模した内装です。',
          alt: 'マカオ サウナ｜イーストキャッスルスパの病室ルーム',
        },
        {
          file: 'macau-sauna-spa-east-castle-06-eye-exam-medical-room',
          caption: '視力検査をモチーフにした医療テーマルーム。臨場感ある設備と小道具を揃え、20を超えるシナリオルームから選べる一室です。',
          alt: 'イーストキャッスルスパ 視力検査ルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-07-jail-bars-room',
          caption: '鉄格子の取調室をテーマにしたルーム。リアルに作り込まれた空間が、スリルを求めるゲストを非日常へと引き込みます。',
          alt: 'マカオ サウナ｜イーストキャッスルスパの取調室ルーム',
        },
        {
          file: 'macau-sauna-spa-east-castle-08-airplane-cabin-room',
          caption: '座席からキャビンの細部まで再現した、機内テーマのルームです。',
          alt: 'イーストキャッスルスパ 機内テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-09-ufc-octagon-room',
          caption: 'オクタゴン型ボクシングリングをテーマにしたルーム。本格的なアリーナのしつらえが、ほかにはない特別なひとときを演出します。',
          alt: 'マカオ サウナ｜イーストキャッスルスパのリングルーム',
        },
      ],
    },
    'victoria-sauna': {
      aliases: '凱旋桑拿、Victoria Sauna',
      highlights: [
        '静かで丁寧に整えられた環境',
        'きめ細やかなサービス',
        '午前3時以降は個室休憩室が無料',
      ],
      bestFor: '静かで広々とした施設、宿泊におすすめ',
      features: [
        'サービスの質にこだわり',
        '広々とした休憩エリア',
        '静かでくつろげる空間',
        '宿泊（24時間）に最適',
        '24時間営業',
      ],
      flow: [
        {
          title: '到着・チェックイン',
          body: '凱旋門酒店（L\'Arc Hotel）5階のヴィクトリアサウナに到着。マカオ半島・新口岸（皇朝区）の中心に位置し、MGM・ウィン・グランドリスボアからも近いアクセスのよい立地です。フロントで受付を済ませてリストバンドを受け取りましょう。館内全体が静かでプライベートな雰囲気に包まれています。',
        },
        {
          title: '入浴・リラックス',
          body: '清潔で落ち着いた空間で、浴場設備とサウナを満喫。ヴィクトリアはあえて客数を抑えているため、混み合う時間帯でも窮屈さを感じません。',
        },
        {
          title: '無料のお食事',
          body: '各種お食事を無料で楽しめます。大型店のような騒がしさがなく、静かで快適な空間でゆっくり過ごせます。',
        },
        {
          title: "マッサージプランを相談",
          body: "希望するマッサージの種類、滞在時間、予算を受付にお伝えください。予定に合うプランと、それぞれに含まれる内容を確認できます。",
        },
        {
          title: "マッサージプランを確認",
          body: "施術を始める前に、マッサージの種類、所要時間、総額をご確認ください。料金・値段はMOP 2,298〜MOP 6,998で、別途10%のサービス料がかかります。",
        },
        {
          title: "60分のマッサージ",
          body: "所要時間の目安は60分です。開始前に、マッサージの内容、実際の所要時間と料金の内訳をフロントで確認してください。",
        },
        {
          title: '休憩・宿泊',
          body: '静かでプライベートな環境は、マカオでもゆっくり休んで宿泊するのに最適な一軒。リクライニングチェアの並ぶラウンジでゆっくり休め、客数が少なく騒音も控えめ。静けさとプライベート感を求める方にぴったりです。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-victoria-01-massage-chair-row',
          caption: 'ヴィクトリアサウナ（凱旋桑拿）に長く連なるマッサージリクライナー。広々として静寂に包まれた休憩ゾーンは混み合うことがなく、隠れた名店の風格を漂わせます。',
          alt: 'ヴィクトリアサウナ リクライナーの列｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-02-hotel-exterior-night',
          caption: 'マカオ半島の中心、ロカ・ホテル（L\'Arc Hotel）内に位置し、MGM・ウィン・グランドリスボアまで徒歩圏内という好立地です。',
          alt: 'マカオ サウナ｜ロカ・ホテル夜の外観',
        },
        {
          file: 'macau-sauna-spa-victoria-03-catwalk-show-stage',
          caption: "柔らかな照明に照らされたステージ。",
          alt: "ヴィクトリアサウナのステージ｜マカオ サウナ",
        },
        {
          file: 'macau-sauna-spa-victoria-04-mosaic-jacuzzi-pool',
          caption: 'モザイクタイルのジャグジー浴池が広々とした浴場の主役。ゆっくりと静かに身を沈めるための贅沢な空間です。',
          alt: 'ヴィクトリアサウナ モザイクの浴池｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-05-black-marble-corridor',
          caption: 'ブラックマーブルが落ち着いた色調を映す回廊。柔らかな灯りが各ゾーンをつなぐプライベートな小径へと誘います。',
          alt: 'ヴィクトリアサウナ 黒大理石の回廊｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-06-wood-locker-room',
          caption: '木目調のロッカールームは清潔でゆとりがあり、心穏やかに滞在を始められる空間です。',
          alt: 'ヴィクトリアサウナ 木目のロッカールーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-07-premium-recliner-lounge',
          caption: '広々と寛げるプレミアムなリクライナーラウンジ。ヴィクトリアサウナ自慢の宿泊（24時間）にも最適な安らぎの場です。',
          alt: 'ヴィクトリアサウナ プレミアムラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: "ステージに面した、ゆったり座れる客席。",
          alt: "ヴィクトリアサウナ ステージ前の客席｜マカオ サウナ",
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晉會MCLUB',
      highlights: [
        'イーストキャッスルの姉妹店',
        'KTV',
        '温泉房',
        'さらに豪華な内装',
      ],
      bestFor: '過去の設備情報（営業休止中）',
      features: [
        '近未来的な内装',
        '多彩な客室デザイン',
        'KTVルーム',
        '入浴設備',
        '営業休止中',
      ],
      flow: [
        {
          title: '営業休止中',
          body: 'MCLUBは現在営業を休止しており、来店や予約を受け付けていません。以下は過去の設備に関する情報です。',
        },
        {
          title: '施設と客室',
          body: '東方皇堡水療の姉妹店で、かつては異なるデザインの客室、KTVルーム、入浴設備を備えていました。',
        },
        {
          title: '入浴・飲食設備',
          body: '近未来的な内装の浴場、サウナ、飲食スペースがありました。現在は利用できません。',
        },
        {
          title: '過去の料金情報',
          body: '営業当時は別途10%のサービス料がかかりました。過去の記録であり、現在の料金案内や予約プランではありません。',
        },
        {
          title: '休憩設備',
          body: 'かつてロビーにリクライニング休憩スペースがありました。休業中は宿泊できません。営業再開については施設の最新発表をご確認ください。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-mclub-01-sports-tv-lounge',
          caption: 'エムクラブ（晉會MCLUB）名物のスポーツTVラウンジ。サイバーパンク調のテック空間に大型スクリーンの生中継が流れ、ご利用の前後にゆったりとくつろげる一室です。',
          alt: 'マカオ サウナ｜エムクラブのスポーツTVラウンジ',
        },
        {
          file: 'macau-sauna-spa-mclub-02-golf-cart-theme-room',
          caption: 'カートをあしらったゴルフテーマのルーム。訪れるたびに別世界へと誘う、数あるテーマ個室のひとつです。',
          alt: 'エムクラブ ゴルフテーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-03-neon-mirror-corridor',
          caption: 'サイバーパンクの光をまとったネオンの回廊が、マカオ随一のハイテクなサウナ空間の雰囲気を演出します。',
          alt: 'マカオ サウナ｜エムクラブのネオン回廊',
        },
        {
          file: 'macau-sauna-spa-mclub-04-marble-locker-room',
          caption: '大理石仕立てのロッカールーム。清潔で落ち着いた更衣スペースにも、近未来的な質感が隅々まで行き届いています。',
          alt: 'エムクラブ 大理石のロッカールーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-05-ktv-panoramic-room',
          caption: 'エムクラブ自慢のパーティーモードを象徴する、パノラマKTVルーム。カラオケを備えるマカオのサウナはわずか二軒のみです。',
          alt: 'マカオ サウナ｜エムクラブのパノラマKTVルーム',
        },
        {
          file: 'macau-sauna-spa-mclub-06-ktv-private-lounge',
          caption: "大型スクリーンと座席を備えたカラオケラウンジ。",
          alt: 'エムクラブ 大型スクリーンKTVラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: 'オーロラ調のムード照明に包まれたギャラクシーベッドルーム。エムクラブ名物のプラネットシリーズの一室で、テックの極みを体感できます。',
          alt: 'マカオ サウナ｜エムクラブのギャラクシールーム',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: "和風の内装を取り入れた浴室。",
          alt: 'エムクラブ 和風の浴室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: "ビリヤード台を備えた部屋。",
          alt: 'エムクラブ ビリヤードテーマ個室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '近未来的な内装とゲーミング機材を揃えたレーシングシミュレーターのゲームルーム。サイバーパンクな遊び心を堪能できます。',
          alt: 'マカオ サウナ｜エムクラブのレーシングゲームルーム',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: 'ダーツを備えたゲームラウンジ。充実した設備で、ハイテクな空間に溶け込む気軽な社交スペースです。',
          alt: 'マカオ サウナ｜エムクラブのダーツラウンジ',
        },
        {
          file: 'macau-sauna-spa-mclub-15-neon-m-logo-entrance',
          caption: 'ネオンに輝くMロゴのエントランス。サイバーパンクなファサードが、マカオ随一のハイテクなサウナを入口から告げます。',
          alt: 'マカオ サウナ｜エムクラブのネオンMロゴ入口',
        },
      ],
    },
    'number-one-sauna': {
      aliases: '壹號桑拿、Number One Sauna',
      highlights: [
        '広い更衣室',
        'ジャグジー',
        'ドライサウナ・スチームサウナ',
        '過去の飲食設備',
      ],
      bestFor: '過去の設備情報（営業休止中）',
      features: [
        '入浴設備',
        '広々としたホール',
        'ロッカー',
        '休憩スペース',
        '営業休止中',
      ],
      flow: [
        {
          title: '営業休止中',
          body: '壹號桑拿は現在営業を休止しており、来店や予約を受け付けていません。以下は過去の設備情報です。',
        },
        {
          title: '入浴・更衣設備',
          body: 'かつては広い更衣室、ロッカー、大型ジャグジー、ドライサウナ、スチームサウナを備えていました。',
        },
        {
          title: '飲食スペース',
          body: '以前は広いダイニングでステーキ、炒飯、麺類、果物、飲み物などを提供していました。現在は飲食サービスを行っていません。',
        },
        {
          title: '過去の料金',
          body: '記録上の過去の料金帯は MOP 2,199～7,699 でした。現在の料金案内ではなく、休業中は予約やサービスを受け付けていません。',
        },
        {
          title: '休憩設備',
          body: 'かつてリクライニング休憩スペースがありました。休業中は宿泊できません。営業再開については施設の最新発表をご確認ください。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: "ナンバーワンサウナ（壹號桑拿）のラウンジは、LEDキューブシートと柔らかな間接照明を備えた空間です。",
          alt: 'ナンバーワンサウナ LEDラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-02-changing-room-vanity-area',
          caption: '入口すぐに広がる更衣・パウダースペースは、明るく清潔感にあふれ、必要なものがすべて整えられた、ゆとりあるスタートを約束します。',
          alt: 'ナンバーワンサウナ 更衣室のパウダースペース｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-03-marble-brand-signage',
          caption: '磨き上げられた大理石を背景に佇むブランドサイン。到着の瞬間、洗練されたおもてなしが迎えてくれます。',
          alt: 'ナンバーワンサウナ 大理石のブランドサイン｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-04-wood-locker-corridor',
          caption: '温かみのある木目調のロッカー通路は、整然としてプライベート感に満ち、夜のひとときが静かに始まります。',
          alt: 'ナンバーワンサウナ 木目調ロッカー通路｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-05-indoor-bath-pool',
          caption: '柔らかな照明に包まれた広々とした屋内の浴池は、ドライサウナやスチームルームを併設。サービスの前にゆっくりと癒やされるひとときを。',
          alt: 'ナンバーワンサウナ 屋内の浴池｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-06-premium-spa-suite',
          caption: "ホテル仕様の寝具を備えた独立したスイート。",
          alt: 'ナンバーワンサウナ プレミアム個室スイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-08-glass-wall-bedroom',
          caption: 'ガラスウォールをテーマにしたベッドルームは、モダンなデザインと柔らかな照明が魅力。プライベートでありながら開放感のある空間です。',
          alt: 'ナンバーワンサウナ ガラスウォール個室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-09-chesterfield-tv-lounge',
          caption: 'チェスターフィールドの本革ソファと大画面を備えたTVラウンジ。深く沈み込む座り心地で、待ち時間も寛ぎのひとときに。',
          alt: 'ナンバーワンサウナ 本革TVラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-10-private-entertainment-room',
          caption: '間接照明と心地よいソファを備えたプライベートな娯楽ルーム。仲間と語らいながら過ごせる、贅沢な社交スペースです。',
          alt: 'ナンバーワンサウナ プライベート娯楽ルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-11-free-dining-spread',
          caption: '滞在中は飲食がすべて無料。看板メニューのステーキを筆頭に、海鮮、炒飯や麺類、各種スープ、よく冷えたビールまで存分にお楽しみいただけます。',
          alt: 'ナンバーワンサウナ 無料の飲食サービス｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-12-reception-lobby',
          caption: "ナンバーワンサウナ（壹號桑拿）のレセプションロビー。落ち着いた内装で来館者を迎えます。",
          alt: 'ナンバーワンサウナ レセプションロビー｜マカオ サウナ',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪門桑拿殿、Familia Nobre',
      highlights: [
        '広い浴場',
        '複数の客室',
        '休憩スペース',
      ],
      bestFor: '過去の設備情報（営業休止中）',
      features: [
        '広い浴場',
        '複数の客室',
        'ロッカー',
        'リクライニング休憩スペース',
        '営業休止中',
      ],
      flow: [
        {
          title: '営業休止中',
          body: '豪門桑拿は現在営業を休止しており、来店や予約を受け付けていません。以下は過去の設備に関する記録です。',
        },
        {
          title: '入浴・更衣設備',
          body: 'かつては広い更衣室、ロッカー、浴槽、サウナ室があり、入浴、飲食、休憩の各エリアに分かれていました。',
        },
        {
          title: '飲食・客室設備',
          body: '以前はステーキ、飲み物、温かい料理を提供し、複数の客室も備えていました。現在は飲食・客室設備を利用できません。',
        },
        {
          title: '過去の料金',
          body: '記録上の過去の料金帯は MOP 2,388～6,988 で、当時はサービス料を徴収していませんでした。過去の記録であり、現在の料金案内ではありません。',
        },
        {
          title: '休憩設備',
          body: 'かつて休憩エリアには間隔を空けて複数のリクライニングチェアを配置していました。休業中は宿泊できません。営業再開については施設の最新発表をご確認ください。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-familia-nobre-01-neon-entrance-night',
          caption: 'ファミリアノブレ（豪門桑拿殿）の堂々たる正面エントランスとロゴ。マカオ最大規模を誇るサウナの威厳ある佇まいが、喧騒を離れた特別な時間の幕開けを告げます。',
          alt: 'ファミリアノブレ 正面エントランスとロゴ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-02-hm-crown-lightbox-signage',
          caption: '入口で輝く王冠のライトボックス。到着した瞬間に、このヴェニューの格を静かに物語る上質な演出です。',
          alt: 'マカオ サウナ｜ファミリアノブレ 王冠ライトボックス',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-03-purple-grand-staircase',
          caption: '紫の照明に包まれた吹き抜けの大階段。マカオ随一の広さを誇るフロアが、どこを歩いてもゆとりある空間を生み出します。',
          alt: 'ファミリアノブレ 紫照明の大階段｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-04-red-lantern-theatre-hallway',
          caption: '赤提灯が連なる東洋的な劇場のような照明の回廊が、プライベートルームへと静かにいざないます。',
          alt: 'マカオ サウナ｜ファミリアノブレ 赤提灯の回廊',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-05-purple-led-bedroom',
          caption: "紫のLED照明とホテル仕様の寝具を備えた部屋。",
          alt: 'ファミリアノブレ 紫LEDのテーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-06-red-lattice-massage-room',
          caption: '赤い格子と古典東洋の意匠が映えるマッサージルーム。プライベートな造りで、豊富な部屋タイプの中から選べる一室です。',
          alt: 'マカオ サウナ｜ファミリアノブレ 赤格子のマッサージルーム',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-07-mirror-chandelier-massage-room',
          caption: '鏡とシャンデリアにクリスタルの光が降り注ぐ一室。広々と上質に整えられ、ゆったりとした時間を過ごせます。',
          alt: 'ファミリアノブレ 鏡とシャンデリアの部屋｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-08-mirror-sitting-massage-room',
          caption: '専用のソファスペースを備えた鏡張りのリビング付きスイート。マカオ最大級の客室数だからこそ、待つことなく寛げます。',
          alt: 'マカオ サウナ｜ファミリアノブレ 鏡張りスイート',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-10-marble-bar-dining',
          caption: '大理石のバーとダイニングエリア。無料のステーキや海鮮、炒め物、冷えたビールが、常連客を惹きつけてやみません。',
          alt: 'マカオ サウナ｜ファミリアノブレ 大理石のバー＆ダイニング',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-11-free-beer-menu-spread',
          caption: '冷えたビール、ソフトドリンク、ジュース、温かい料理まで揃った無料のおもてなし。滞在中は追加料金なしで好きなだけ楽しめます。',
          alt: 'ファミリアノブレ 無料ビールと料理の数々｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-12-selection-runway-wall',
          caption: "ファミリアノブレ館内のホール。",
          alt: "マカオ サウナ｜ファミリアノブレのホール",
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: 'オーシャニック・ロイヤル・スパ、帝湖水療、帝湖桑拿、Oceanic Royal Spa',
      highlights: [
        '参考料金 MOP 2,299〜7,099',
        'テーマルーム、ダイニング、リクライナーラウンジ',
      ],
      bestFor: '営業再開後にタイパで一晩ゆっくり過ごしたい方',
      features: [
        '現在一時休業中・利用および予約は不可',
        'クラシック／テーマ性のある個室',
        '24時間のラウンジと宿泊休憩',
        '食事・シーフードの提供',
      ],
      flow: [
        {
          title: '現在の営業状況を確認',
          body: 'オーシャニック・ロイヤル・スパは現在一時休業中で、利用および予約は承っていません。予定を立てる前にお問い合わせください。',
        },
        {
          title: '代わりの店舗を選ぶ',
          body: 'タイパかマカオ半島か、テーマルーム、24時間営業、宿泊ラウンジなどのご希望をお知らせいただければ、営業中の店舗をご案内します。',
        },
        {
          title: '再開後に改めて確認',
          body: '営業再開後は、その日の料金、在籍状況、部屋の案内を改めてご確認ください。店舗のスケジュールによって変動する場合があります。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-01',
          caption: 'タイパにあるオーシャニック・ロイヤル・スパの入口サイン。店舗の雰囲気が伝わる最初の一枚です。',
          alt: 'タイパのオーシャニック・ロイヤル・スパ入口サイン',
        },
        {
          file: 'macau-sauna-spa-oceanic-gallery-202607-03',
          caption: 'タイパの夜景の中にあるオーシャニックの外観。',
          alt: 'オーシャニック・ロイヤル・スパの夜の外観',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-11',
          caption: 'オーシャニック・ロイヤル・スパ館内のプールとステージ。',
          alt: 'オーシャニック・ロイヤル・スパのプールとステージ',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-12',
          caption: '照明と広がりのある室内が、少しドラマチックな雰囲気をつくります。',
          alt: 'オーシャニック・ロイヤル・スパのステージルーム',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-07',
          caption: '一晩の合間にゆっくり過ごすためのラウンジ空間。',
          alt: 'オーシャニック・ロイヤル・スパのラウンジ',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-02',
          caption: '温かみのあるしつらえのツインベッド個室。',
          alt: 'オーシャニック・ロイヤル・スパのツインベッド個室',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-08',
          caption: '縦長の構図で見るプライベートルームの一角。',
          alt: 'オーシャニック・ロイヤル・スパの個室',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-09',
          caption: '落ち着いた照明に包まれた、もう一つの個室の表情。',
          alt: 'オーシャニック・ロイヤル・スパのテーマ個室',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-04',
          caption: '長めの滞在に寄り添うダイニングの一例。',
          alt: 'オーシャニック・ロイヤル・スパの食事',
        },
      ],
      overnightValue: '営業再開後は宿泊OK',
      overnightNote: '— ご利用前に最新の案内をご確認ください',
    },
  },
};

const zhTW: SpaPageCopy = {
  backHome: '返回首頁',
  backToVenueList: '返回會所列表',
  inquiry: {
    booking: '你好，我想預約{venue}，可以安排嗎？',
    closed: '你好，我看到{venue}暫停營業，請問有類似的場所可以推薦嗎？',
  },
  alsoKnownAs: '亦稱：',
  labels: {
    referencePrice: '常見套餐價格範圍',
    separateServiceFee: '另收服務費',
    noSeparateSurcharge: '不另收服務費',
    priceDisclaimer: '最終總額會因套餐、房型、稅項及加購而變動，出發前請確認明細報價。',
    discountCta: '聯繫我們獲取優惠 →',
    staff: '技師',
    staffValue: '多國技師',
    staffTeam: '多國籍技師團隊',
    hours: '營業時間',
    openAllDay: '24小時營業',
    staffHours: '技師',
    website: '官方網站',
    overnight: '過夜',
    overnightAvailable: '可過夜',
    overnightUnavailable: '不設過夜',
    overnightNoteAvailable: '',
    highlights: '亮點',
    bestFor: '最適合',
    payment: '付款方式',
    quickBook: '首次前往？聯繫我們預約，有免費接送 + 優惠價格',
    allContacts: '聯繫我們獲取優惠 →',
    features: '特色服務',
    gallery: '會所相冊',
    viewLarger: '查看大圖',
    previousPhoto: '上一張相片',
    nextPhoto: '下一張相片',
    gallerySwipeHint: '左右滑動切換相片',
    galleryPhotoCount: '第 {current} 張相片，共 {total} 張',
    flow: '詳細流程',
    moreInfo: '想了解更多？聯繫我們獲取詳細資訊',
    related: '其他熱門會所',
    learnMore: '了解更多',
    officialWebsite: '官方網站：',
  },
  paymentMethods: [
    '現金',
    '刷卡',
    '微信',
    '支付寶',
  ],
  concierge: {
    title: '您的免費回程接送也已備妥',
    body: '當您結束時——餐飲後、服務剛結束、任何時間——只需傳訊息給我們。同一輛豪華專車會回來接您，送往您的酒店、機場、碼頭，或澳門境內任何地點。與接送同樣零費用。',
  },
  vipReminder: {
    title: '贈送 2 項舒緩按摩',
    body: '可從 8 項小工服務中免費任選 2 項。包含擦背服務、腿部按摩、頭部按摩、足底按摩、修手指甲、修腳指甲、手部按摩、採耳。我們會事先通知場地您的到訪，到場時可直接選擇護理項目。',
    cta: '查看全部 8 項 →',
  },
  vipDrawer: {
    titleLead: '贈送 2 項',
    titleAccent: '舒緩按摩',
    note: '可從 8 項小工服務中免費任選 2 項。我們會事先通知場地您的到訪，到場時可直接選擇護理項目。',
    close: '關閉贈送護理項目清單',
  },
  cta: {
    headingLead: '預約您的',
    headingAccent: 'VIP 體驗',
    body: '傳一則訊息給我們，剩下的交給我們處理。',
  },
  breadcrumbHome: '首頁',
  breadcrumbList: '會所',
  placeholder: {
    ktv: 'KTV 包廂',
    themeRooms: '主題房',
    overnight: '可過夜',
    open24h: '24 小時營業',
    noServiceFee: '免服務費',
    peninsula: '澳門半島',
    taipa: '氹仔',
  },
  venues: {
    'clube-rio': {
      aliases: '利澳薈KTV、利澳桑拿、利澳薈桑拿、Clube Rio、Rio KTV、澳門夜總會、澳門商K、澳門商務KTV',
      highlights: [
        '2026年7月30日全新開幕',
        '全澳少有KTV為主軸',
      ],
      bestFor: '朋友聚會唱K',
      features: [
        '酒水任飲',
        '私密包廂高清音響',
        '利澳酒店3樓',
      ],
      flow: [
        {
          title: '預約包廂',
          body: '透過我們預約，請告知人數與時段。開幕初期建議提前確認包廂的空位。',
        },
        {
          title: '抵達利澳酒店',
          body: '前往新口岸利澳酒店 3 樓，各口岸與主要酒店短程直達，亦可由我們安排免費私人專車接送。到場報預約名字即有專人帶位。',
        },
        {
          title: '暢玩至凌晨',
          body: '營業至凌晨 4 時。不設過夜——散場後新口岸截車方便，也可預約回程專車。',
        },
        {
          title: '回程安排',
          body: '透過我們預約可安排免費私人專車接送（非共乘）。如行程需要過夜，預約時可向我們查詢，專人會建議合適的安排。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-clube-rio-01-main-lounge',
          caption: '水晶吊燈下先來一杯——主廳酒廊的真皮梳化圍住雲石茶几，最適合等齊人、揀好包廂前把氣氛熱起來。',
          alt: '利澳薈主廳酒廊 — 水晶吊燈與真皮梳化',
        },
        {
          file: 'macau-sauna-spa-clube-rio-02-vip-room-gold-leaf',
          caption: '金箔龍鷹掛畫裝飾的 VIP 包廂，配備音響與燈光。',
          alt: '利澳薈 VIP 包廂 — 金箔龍鷹藝術掛畫',
        },
        {
          file: 'macau-sauna-spa-clube-rio-03-party-room',
          caption: '成班朋友開一間大房，咪高峰傳來傳去都夠位，音響開盡唱到凌晨四時先散場。',
          alt: '利澳薈派對包廂',
        },
        {
          file: 'macau-sauna-spa-clube-rio-04-theme-room-orange',
          caption: '暖橙主調配名駒掛畫，每間房性格不同——熟客最愛每次換一間、換一種心情。',
          alt: '利澳薈主題包廂 — 橙調主題裝潢',
        },
        {
          file: 'macau-sauna-spa-clube-rio-05-lounge-suite',
          caption: '廳房分區的套間規格——唱攰了退到梳化區斟茶傾偈，節奏由自己控制。',
          alt: '利澳薈豪華套間',
        },
        {
          file: 'macau-sauna-spa-clube-rio-06-reception',
          caption: '接待處連住恆溫藏酒櫃，報上預約名字即有專人帶位——由雲石大堂行到包廂，未開咪已有貴賓感。',
          alt: '利澳薈迎賓接待處 — 藏酒櫃與雲石大堂',
        },
        {
          file: 'macau-sauna-spa-clube-rio-07-corridor',
          caption: '隔音門後各有各精彩——沿廊道隱約聽到別房的歌聲，就知道今晚來對了地方。',
          alt: '利澳薈包廂廊道',
        },
        {
          file: 'macau-sauna-spa-clube-rio-08-vip-room-crystal-art',
          caption: '橙色絎縫梳化配虎豹水晶掛畫，VIP 包廂內設有喇叭與柔和燈光。',
          alt: '利澳薈 VIP 包廂一角 — 水晶動物掛畫與金框圓鏡',
        },
        {
          file: 'macau-sauna-spa-clube-rio-09-lounge-suite-orange',
          caption: '橙白格仔紗簾半掩、軟凳一排排——多人輪唱、鬥歌、乾杯，個個有位坐。',
          alt: '利澳薈橙調套間 — 格仔紗簾與黑金茶几',
        },
      ],
      website: {
        url: 'https://clube-rio.com',
        label: '利澳薈官方網站 ↗',
        display: 'clube-rio.com',
      },
    },
    'manhao-spa': {
      aliases: '曼濠桑拿、曼豪桑拿、漫濠水療、澳門曼濠水療',
      highlights: [
        '2026氹仔最新',
        '超大的舞台',
        '皇者奢華風格',
      ],
      bestFor: '寬敞舞台／氹仔奢華體驗',
      features: [
        '2026年5月1日氹仔全新開業',
        '超大的舞台大廳',
        '雲石主調奢華大堂與更衣室',
        '營業時間 14:00–04:00',
      ],
      flow: [
        {
          title: '抵達君怡酒店',
          body: '曼濠水療位於氹仔君怡酒店——距離路氹城僅5分鐘車程，是氹仔區最便捷的最新奢華桑拿選擇。大堂以雲石背景上的金色皇冠 MH 標誌迎賓；前台登記後，由禮賓接待領取手牌。',
        },
        {
          title: '奢華更衣室',
          body: '踏入更衣區——卡拉拉雲石主牆面、金色搭扣訂製木櫃、軟墊長椅。所有硬件貫徹皇者奢華格調而非實用主義設計，預示後續體驗的水準。',
        },
        {
          title: '沐浴與濕區',
          body: '前往沐浴區，採用深色馬賽克瓷磚與綠紋雲石搭配，配備多個沖涼位置及獨立泡池。整個濕區全新打造，空間寬敞，適合服務前從容浸泡放鬆。',
        },
        {
          title: '用餐廳',
          body: '於雲石桌面用餐廳享用免費餐飲——靜雅的酒店級座椅配私人酒吧氛圍，適合在服務前後慢慢享受。',
        },
        {
          title: '超大的舞台',
          body: '招牌賣點是寬敞的舞台大廳：多層玻璃欄杆配上深藍霓虹燈光，形成鮮明的視覺層次。宏大的舞台與燈光設計相互呼應，成為曼濠館內引人注目的焦點。',
        },
        {
          title: '60分鐘按摩',
          body: '以 60 分鐘按摩放慢步調，舒緩旅途與日常的疲憊。燈光和音樂可按喜好調整，讓您在舒適的氛圍中，安心享受放鬆時光。',
        },
        {
          title: '休息區',
          body: '前往專屬星空休息區——光線柔和、配備奢華躺椅，讓您於服務後放鬆。營業時間 14:00–04:00，暫不設過夜留宿。離場時於前台結算，現金、信用卡、微信支付及支付寶均可使用。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-manhao-01-marble-gold-signage',
          caption: '標誌性金色皇冠 MH 標誌映於卡拉拉雲石牆面，「皇者氣派」格調自入口一見即顯。',
          alt: '曼濠水療金色皇冠雲石招牌',
        },
        {
          file: 'macau-sauna-spa-manhao-02-blue-showcase-hall',
          caption: "大廳設有多層玻璃欄杆走道，搭配深藍霓虹燈光。",
          alt: "曼濠水療藍光玻璃欄杆大廳",
        },
        {
          file: 'macau-sauna-spa-manhao-04-mural-bedroom-suite',
          caption: '壁畫牆面睡房套房，超大床、沙發與柔和檯燈配置，酒店級舒適打造從容私密的休憩空間。',
          alt: '曼濠水療壁畫睡房套房',
        },
        {
          file: 'macau-sauna-spa-manhao-05-tree-mural-luxury-suite',
          caption: '樹影壁畫奢華套房，自然意境牆面配低調氛圍燈光，靜雅得宛如私人退隱之所。',
          alt: '曼濠水療樹影壁畫奢華套房',
        },
        {
          file: 'macau-sauna-spa-manhao-06-marble-locker-room',
          caption: '更衣室以卡拉拉雲石主牆、金色搭扣訂製木櫃與軟墊長椅立下格調基準。',
          alt: '曼濠水療雲石更衣室',
        },
        {
          file: 'macau-sauna-spa-manhao-07-marble-shower-stalls',
          caption: '雲石沖洗間設獨立私密淋浴位置，配全新潔淨設備，服務前從容梳洗。',
          alt: '曼濠水療雲石沖洗間',
        },
        {
          file: 'macau-sauna-spa-manhao-08-jacuzzi-bathing-zone',
          caption: '浸泡濕區採深色馬賽克瓷磚與綠紋雲石，獨立泡池空間寬敞，適合服務前舒緩浸泡。',
          alt: '曼濠水療浸泡濕區',
        },
        {
          file: 'macau-sauna-spa-manhao-09-dark-steam-shower-room',
          caption: '私密獨立的深色蒸氣淋浴間，全新設備帶來靜謐沉浸的濕區片刻。',
          alt: '曼濠水療深色蒸氣淋浴間',
        },
        {
          file: 'macau-sauna-spa-manhao-10-marble-dining-bar',
          caption: '雲石餐廳大堂以酒店級座椅配私人酒吧氛圍，免費餐飲在此從容享用。',
          alt: '曼濠水療雲石餐廳大堂',
        },
        {
          file: 'macau-sauna-spa-manhao-11-starlight-recliner-lounge',
          caption: '專屬星空休息區，光線柔和配奢華躺椅，讓您服務前後靜心歇息。',
          alt: '曼濠水療星空休息區',
        },
        {
          file: 'macau-sauna-spa-manhao-12-mural-corridor',
          caption: '壁畫迴廊串連各區，雅緻牆面藝術配柔和燈光，盡顯精品酒店般的場館格調。',
          alt: '曼濠水療壁畫迴廊',
        },
      ],
      website: {
        url: 'https://manhaospa.com',
        label: '曼濠水療官方網站 ↗',
        display: 'manhaospa.com',
      },
    },
    'number-nine-sauna': {
      aliases: '玖號桑拿、九號桑拿、9號桑拿、澳門玖號水療',
      highlights: [
        '2026年4月全新開業',
        '現代化舞台設施',
        '多款氛圍主題房',
        '巴厘島+日式按摩',
      ],
      bestFor: '嘗鮮最新場',
      features: [
        '不同風格房間',
        '舞台燈光設施',
        'LED螢幕',
        '現代化沐浴設施',
        '巴厘島式及日式按摩',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達2026年4月全新開業的玖號水療，位於澳門市中心御龍酒店內。作為全澳最新場所，所有設施均為全新狀態，整體設計走現代奢華路線，金色與大理石元素搭配專業燈光系統。',
        },
        {
          title: '沐浴放鬆',
          body: '享用全新裝修的現代化沐浴及桑拿設施，設備簇新。更衣室採用木質儲物櫃設計，整潔有序；沐浴區以綠色馬賽克瓷磚裝飾，環境清新。',
        },
        {
          title: '免費餐飲',
          body: '免費享用各式餐飲服務，場所強調多樣化的高端餐飲選擇，將用餐體驗納入整體享受的一部分。',
        },
        {
          title: '大廳設施',
          body: '大廳配備舞台燈光及 LED 螢幕，配合金色與大理石裝潢，呈現鮮明的現代風格。',
        },
        {
          title: '選擇主題房間',
          body: '玖號設有多款氛圍主題房間，每間房都配備獨特的氛圍燈光——紅色、粉紫色、藍紫色等不同色調，搭配星空天花及精緻裝潢，營造沉浸式體驗。圓形大床為部分房間的特色設計。',
        },
        {
          title: '60分鐘服務',
          body: '提供巴厘島式及日式按摩兩種風格選擇，結合東南亞與日本的按摩手法。玖號以「獨創日式+巴厘島風情」為賣點，服務體驗與傳統場所有所不同。',
        },
        {
          title: '休息過夜',
          body: '可過夜休息，全新設施確保舒適度。作為新場，初期客流量較少，環境安靜。透過我們預約可獲取最新優惠價格。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-nine-01-modern-luxury-themed-suite',
          caption: '玖號水療招牌現代奢華主題套房，柔和氛圍燈光配精緻金色大理石裝潢，2026 年 4 月全新開幕，全澳最新場館之一。',
          alt: '玖號水療現代奢華主題套房',
        },
        {
          file: 'macau-sauna-spa-number-nine-02-red-theme-room',
          caption: '沉入紅色氛圍圓床主題房，星空天花與沉浸式燈光定下基調——玖號多款情境主題房之一。',
          alt: '玖號水療紅色圓床主題房',
        },
        {
          file: 'macau-sauna-spa-number-nine-03-aurora-bedroom-purple',
          caption: '紫色極光氛圍主題房，柔和光暈將空間包裹於靜謐的現代奢華格調之中。',
          alt: '玖號水療紫色極光主題房',
        },
        {
          file: 'macau-sauna-spa-number-nine-04-recliner-lounge',
          caption: '壁畫主題休息廳，柔和光線下舒適躺椅相迎，服務前後從容歇息。',
          alt: '玖號水療壁畫休息廳',
        },
        {
          file: 'macau-sauna-spa-number-nine-05-massage-chair-room',
          caption: '全新按摩椅休息區，設備簇新，賓客可在私密角落放鬆身心。',
          alt: '玖號水療按摩椅休息區',
        },
        {
          file: 'macau-sauna-spa-number-nine-06-premium-towel-locker',
          caption: '高級木質儲物櫃與整潔毛巾區，全新設施整潔有序，細節盡顯場館格調。',
          alt: '玖號水療高級儲物櫃毛巾區',
        },
        {
          file: 'macau-sauna-spa-number-nine-07-royal-dragon-exterior',
          caption: '玖號水療坐落於市中心御龍酒店內，地段便利，入口即見場館格調。',
          alt: '玖號水療御龍酒店外觀',
        },
        {
          file: 'macau-sauna-spa-number-nine-08-bath-wash-area',
          caption: '全新裝修的沐浴及沖洗區，設備簇新整潔，清新濕區洗去一日疲憊。',
          alt: '玖號水療沐浴沖洗區',
        },
        {
          file: 'macau-sauna-spa-number-nine-09-purple-light-bedroom',
          caption: '紫光氛圍主題睡房，柔和燈光配精緻寢具，靜靜邀你歇息放鬆。',
          alt: '玖號水療紫光主題睡房',
        },
        {
          file: 'macau-sauna-spa-number-nine-10-ambient-themed-bedroom',
          caption: "主舞台大廳設有星形霓虹背景與專業燈光。",
          alt: '玖號水療主舞台大廳',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '格調餐飲區，免費供應牛排、海鮮、湯麵等多樣熱食，將用餐納入整體享受。',
          alt: '玖號水療餐飲區',
        },
      ],
      website: {
        url: 'https://numberninespa.com',
        label: '玖號水療官方網站 ↗',
        display: 'numberninespa.com',
      },
    },
    'shang-pin-spa': {
      aliases: '尚品水療、尚品桑拿、尚品、澳門尚品國際水療',
      highlights: [
        '現代化沐浴設施',
      ],
      bestFor: '安靜環境／現代化設施',
      features: [
        '推薦指數{ratingStars}',
        '贈送指定按摩／護理項目，具體項目請於預約時確認',
        '國際化的服務標準',
        '性價比極高',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達尚品國際水療，位於葡京人酒店內（路氹）。整體裝修採用歐式現代風格，富當代設計感。前台登記後領取手牌。',
        },
        {
          title: '沐浴放鬆',
          body: '沐浴設施簇新，設備完善。浴池及桑拿環境明亮整潔，與傳統場所風格截然不同。',
        },
        {
          title: '免費餐飲',
          body: '免費享用各式餐飲，餐區環境舒適整潔，與場所整體的現代設計風格一致。',
        },
        {
          title: '客房設施',
          body: '每間房間均設有獨立浴缸，私密度高。',
        },
        {
          title: '休息過夜',
          body: "可過夜休息，大堂設免費躺椅休息區，另有付費獨立休息房；因場所規模精品化，客流量較少，環境安靜舒適。",
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: "尚品國際水療位於路氹葡京人酒店內，舞台以紫色氛圍燈光照明。",
          alt: "尚品國際水療紫色舞台",
        },
        {
          file: 'macau-sauna-spa-elite-02-gold-signage-reception',
          caption: '金色招牌前台迎賓，一踏入即見高檔華麗的接待格調，新區旅客的便利之選。',
          alt: '尚品國際水療金色招牌前台',
        },
        {
          file: 'macau-sauna-spa-elite-03-arched-door-lounge',
          caption: '拱門設計休息廳，現代華麗裝潢配柔和燈光，服務前後皆可從容歇息。',
          alt: '尚品國際水療拱門休息廳',
        },
        {
          file: 'macau-sauna-spa-elite-04-porthole-mirror-stage',
          caption: "圓窗鏡面舞台配階梯座位。",
          alt: '尚品國際水療鏡面舞台階梯',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '現代化按摩浴池濕區，提供明亮整潔的泡浴環境。',
          alt: '尚品國際水療按摩浴池濕區',
        },
        {
          file: 'macau-sauna-spa-elite-06-blue-led-v88-corridor',
          caption: '藍色 LED 氛圍走廊通往各房間，高私密度動線貫穿全場，盡顯現代設計感。',
          alt: '尚品國際水療藍光走廊',
        },
        {
          file: 'macau-sauna-spa-elite-07-marble-private-corridor',
          caption: '通往私人套房的格調走廊，靜謐而私密。',
          alt: '尚品國際水療私人房走廊',
        },
        {
          file: 'macau-sauna-spa-elite-08-mirror-headboard-bedroom',
          caption: '鏡面床頭主題睡房，現代華麗裝潢，私密而舒適。',
          alt: '尚品國際水療鏡面床頭睡房',
        },
        {
          file: 'macau-sauna-spa-elite-09-starlight-magenta-bedroom',
          caption: '星光天花配紫紅燈光的特色睡房，氛圍浪漫，設備全新簇新。',
          alt: '尚品國際水療星光紫紅睡房',
        },
        {
          file: 'macau-sauna-spa-elite-10-wide-recliner-theatre',
          caption: '寬敞躺椅休息廳，過夜可於免費躺椅瞓到天光，舒適從容。',
          alt: '尚品國際水療躺椅休息廳',
        },
        {
          file: 'macau-sauna-spa-elite-11-selection-stage',
          caption: "尚品國際水療館內的小型舞台空間。",
          alt: "尚品國際水療舞台空間",
        },
        {
          file: 'macau-sauna-spa-elite-12-massage-chair-rest-area',
          caption: '按摩椅休息區，安靜舒適的歇息空間，搭配免費餐飲與飲品。',
          alt: '尚品國際水療按摩椅休息區',
        },
      ],
      website: {
        url: 'https://shangpinspa.com',
        label: '尚品國際水療官方網站 ↗',
        display: 'shangpinspa.com',
      },
    },
    'majesty-spa': {
      aliases: '尊貴桑拿、澳門尊貴水療',
      highlights: [
        '最豪華裝修',
        '最大房間',
        '免服務費',
      ],
      bestFor: '豪華環境／過夜首選',
      features: [
        '澳門最奢華裝修',
        '十多種不同風格房間',
        'KTV房派對模式',
        '24小時營業',
        '免服務費',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達尊貴水療，是全澳裝修最為豪華的桑拿場所。金色與大理石元素貫穿全場，第一眼即感受到頂級會所的氣派。前台登記後領取手牌。',
        },
        {
          title: '沐浴放鬆',
          body: '享用豪華沐浴設施及桑拿，浴池寬敞、燈光柔和，整體環境優雅大氣。建議花時間好好享受這裡的沐浴體驗，是全澳硬件配置最頂級的場所。',
        },
        {
          title: '免費餐飲',
          body: '免費享用牛排、新鮮水果、凍啤酒等餐飲，食材及菜式選擇豐富。尊貴的餐飲品質在業界備受讚譽，全程無限量供應。',
        },
        {
          title: "選擇按摩套餐",
          body: "向前台了解可用的按摩套餐、時長及所含項目，確認總費用後再選擇。",
        },
        {
          title: '確認價格',
          body: '價格區間 MOP 2,799 至 MOP 6,699。',
        },
        {
          title: '60分鐘按摩',
          body: '在寬敞舒適的房間享受 60 分鐘按摩，柔和燈光與精緻傢俱營造放鬆氛圍。開始前請確認按摩項目與費用。',
        },
        {
          title: '休息過夜',
          body: '尊貴 24 小時營業、可過夜——大堂設免費躺椅休息區，旺季另有付費獨立休息房可選，配合免費餐飲，是舒適過夜的選擇。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-majesty-01-ktv-party-room',
          caption: '尊貴水療招牌 KTV 派對房，澳門僅兩家設 KTV 的場館之一，奢華包廂氣氛熱鬧，最適合通宵盡興。',
          alt: '尊貴水療 KTV 派對房',
        },
        {
          file: 'macau-sauna-spa-majesty-02-majesty-entrance-signage',
          caption: '沉穩格調的入口招牌，一抵達便奠定基調——這裡是全澳最奢華的會所。',
          alt: '尊貴水療入口招牌',
        },
        {
          file: 'macau-sauna-spa-majesty-03-gold-chandelier-bath-pool',
          caption: '金色吊燈奢華浴池，寬敞濕區配柔和氛圍燈光，是值得在開場前慢慢享受的頂級硬件。',
          alt: '尊貴水療金色吊燈浴池',
        },
        {
          file: 'macau-sauna-spa-majesty-04-curved-wood-corridor',
          caption: '弧形木質走廊連接各主題套房，柔和燈光與曲線設計，營造靜謐私密的動線。',
          alt: '尊貴水療弧形木質走廊',
        },
        {
          file: 'macau-sauna-spa-majesty-05-chinese-marriage-bed-room',
          caption: '中式婚床主題房，傳統雕花婚床配紅金布置，是十多種精心設計主題房之一。',
          alt: '尊貴水療中式婚床主題房',
        },
        {
          file: 'macau-sauna-spa-majesty-06-egypt-pharaoh-room',
          caption: '埃及法老主題房，金色壁飾與神廟意境，盡顯這裡多元主題設計的巧思。',
          alt: '尊貴水療埃及法老主題房',
        },
        {
          file: 'macau-sauna-spa-majesty-07-gym-boxing-theme-room',
          caption: '健身拳擊主題房，運動風格佈置別具一格，為十多款主題套房增添趣味選擇。',
          alt: '尊貴水療健身拳擊主題房',
        },
      ],
      website: {
        url: 'https://majestysauna.com',
        label: '尊貴水療官方網站 ↗',
        display: 'majestysauna.com',
      },
    },
    'the-excellent-sauna': {
      aliases: '澳門極品桑拿、The Excellent Sauna',
      highlights: [
        '英皇娛樂酒店本館',
        '不同風格的房間',
      ],
      bestFor: '時間靈活／主題體驗',
      features: [
        '英皇娛樂酒店本館',
        '全新主題房間',
        '多種特色主題',
        'DJ室體驗',
        '24小時營業及過夜休息區',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達位於英皇娛樂酒店本館內的極品桑拿。會所 24 小時營業，技師時段為 13:00 至 05:00；前台登記後先沐浴，再按自己的節奏享受精品型場館的安靜氛圍。',
        },
        {
          title: '沐浴放鬆',
          body: '享用沐浴設施及桑拿放鬆身心。極品的環境相對安靜清幽，客流量較少，不會有大型場所的嘈雜感。',
        },
        {
          title: '免費餐飲',
          body: '24 小時免費享用各式餐飲，無論下午或深夜入場，都可按自己的時間用餐。',
        },
        {
          title: '了解按摩安排',
          body: '向接待人員說明希望放鬆的部位及按摩力度，了解可選項目、時長與收費後，再確認適合自己的安排。',
        },
        {
          title: '60分鐘按摩',
          body: '按摩時間約 60 分鐘，另收 10% 服務費。場內提供泰式及上海式按摩，具體手法、力度與費用請於開始前確認。',
        },
        {
          title: '休息過夜',
          body: '服務後可在安靜舒適的 24 小時休息區放鬆，也可按自己的節奏留宿過夜，離場前於前台結算即可。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-excellent-01-blue-bathing-pool',
          caption: '極品桑拿招牌浴池在藍調燈光下泛著柔光，寬敞濕區讓你一進門便沉澱下來，享受靜謐沐浴時光。',
          alt: '極品桑拿藍調浴池',
        },
        {
          file: 'macau-sauna-spa-excellent-02-ambulance-theme-room',
          caption: '極品桑拿新設的醫院主題房，採用細緻的場景佈置。',
          alt: '極品桑拿醫院主題房',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '圖案地磚走廊串連各情境主題房，柔和燈光一路引向 DJ 室、辦公室、電影院等房型。',
          alt: '極品桑拿主題房走廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: "套房設有皮革床頭、照明及酒店式寢具。",
          alt: '極品桑拿皮革床頭套房',
        },
        {
          file: 'macau-sauna-spa-excellent-06-mirror-vanity-area',
          caption: '明亮的梳妝鏡區備品整潔、燈光柔和，服務前後都能從容打理儀容。',
          alt: '極品桑拿梳妝鏡區',
        },
        {
          file: 'macau-sauna-spa-excellent-07-wood-locker-room',
          caption: '木質格調更衣間配獨立儲物櫃，環境整潔，入場更衣安心又私密。',
          alt: '極品桑拿木質更衣間',
        },
        {
          file: 'macau-sauna-spa-excellent-08-diamond-accent-rest-area',
          caption: '鑽飾牆面休息區以柔和燈光搭配舒適座位，可在此放鬆，也能留宿過夜。',
          alt: '極品桑拿鑽飾休息區',
        },
        {
          file: 'macau-sauna-spa-excellent-09-purple-vip-lounge',
          caption: '紫調氛圍 VIP 休息廳沙發柔軟、格局私密，服務前後都能舒適歇息。',
          alt: '極品桑拿紫調 VIP 廳',
        },
        {
          file: 'macau-sauna-spa-excellent-10-recliner-reception-lounge',
          caption: '躺椅接待廳座位寬敞、光線柔和，亦可作大堂過夜歇息區。',
          alt: '極品桑拿躺椅接待廳',
        },
        {
          file: 'macau-sauna-spa-excellent-11-marble-dining-area',
          caption: '大理石餐飲區 24 小時供應免費熱食，牛排、海鮮、湯麵等任何時段都吃得到。',
          alt: '極品桑拿大理石餐飲區',
        },
        {
          file: 'macau-sauna-spa-excellent-12-themed-scene-suite',
          caption: '情境主題套房以柔和氛圍燈光配特色佈置，是極品桑拿多款日式主題房之一。',
          alt: '極品桑拿情境主題套房',
        },
      ],
      website: {
        url: 'https://excellentsauna.com',
        label: '極品桑拿官方網站 ↗',
        display: 'excellentsauna.com',
      },
    },
    'empire-sauna': {
      aliases: '巨享桑拿、澳門巨亨桑拿、Empire Sauna',
      highlights: [
        '2026最新開業',
        '據介紹裝修花費1,000美元',
        '酒店套房',
      ],
      bestFor: '最新奢華／酒店套房首選',
      features: [
        '2026年4月開業',
        '據介紹裝修花費1,000美元',
        '酒店級套房',
        '24小時營業，可過夜休息',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達巨亨桑拿，澳門半島最新頂級桑拿會所。大堂與樓梯入口已揭示全場格調——東方禪意線條配現代奢華裝潢，所有設施均為全新狀態。前台登記後，由禮賓接待領取手牌。',
        },
        {
          title: '沐浴放鬆',
          body: '踏入招牌大理石浴池——柔和氛圍燈光、寬敞空間，整體靜謐氛圍媲美度假村級水療，在全澳桑拿中相當罕見。整個濕區設施全新打造，包括完整桑拿房，是場內的視覺核心。',
        },
        {
          title: '用餐廳',
          body: '前往用餐廳享用免費餐飲。場所裝潢採用酒店級格調，告別傳統桑拿食堂的氣氛，環境靜雅私密、配備舒適座椅，適合在服務前後從容享用。',
        },
        {
          title: '確認按摩項目與費用',
          body: '向接待人員了解按摩項目、時長及費用明細，再按自己的需要決定。參考價格為 MOP 2,488 至 7,388；服務內容及總費用請於開始前確認。',
        },
        {
          title: '60分鐘按摩',
          body: '按摩時長為 60 分鐘，具體手法及安排請事先向接待人員了解。房間設有浴缸，燈光與音響可在房內調節，方便按個人習慣營造舒適環境。',
        },
        {
          title: '休息過夜',
          body: '服務結束後可前往獨立休息區——光線柔和、環境靜謐，專為實際睡眠而非短暫休憩設計。歡迎過夜留宿，期間濕區、用餐廳及休息區全程開放。',
        },
        {
          title: '翌日離場',
          body: '於前台辦理離場手續。巨亨桑拿接受現金、信用卡、微信支付及支付寶。如預先透過我們預約，本站專屬禮遇（免費加點、免費接送、免入場費）均會在離場時準確結算。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-empire-01-twin-marble-bath-pools',
          caption: '沉入巨亨桑拿的大理石浴池，暖水與柔光間，一天的疲憊悄悄褪去。',
          alt: '巨亨桑拿大理石浴池',
        },
        {
          file: 'macau-sauna-spa-empire-02-grand-lobby-photo-wall',
          caption: '踏進大堂，喧囂止步，是抵達後放鬆的第一口呼吸。',
          alt: '巨亨桑拿大堂相片牆',
        },
        {
          file: 'macau-sauna-spa-empire-03-marble-entry-staircase',
          caption: '沿大理石樓梯拾級而上，走進更深的靜謐。',
          alt: '巨亨桑拿大理石樓梯',
        },
        {
          file: 'macau-sauna-spa-empire-04-white-marble-treatment-room',
          caption: '套房以白色雲石牆面搭配燭光與暖色照明。',
          alt: '巨亨桑拿大理石主題套房',
        },
        {
          file: 'macau-sauna-spa-empire-06-gold-ceiling-marble-suite',
          caption: '金頂套房在訂製燈光下泛著暖意，酒店級寢具等你躺下。',
          alt: '巨亨桑拿金頂大理石套房',
        },
        {
          file: 'macau-sauna-spa-empire-07-dark-marble-private-wash-room',
          caption: '在深色大理石私人沖洗間沖個澡，獨享一方潔淨與私密。',
          alt: '巨亨桑拿私人沖洗間',
        },
        {
          file: 'macau-sauna-spa-empire-08-forest-mural-bedroom',
          caption: '在森林壁畫睡房裡放空，柔光與自然意境相伴。',
          alt: '巨亨桑拿森林主題房',
        },
        {
          file: 'macau-sauna-spa-empire-09-chandelier-recliner-lounge',
          caption: '在水晶吊燈下窩進躺椅歇一會，服務前後都自在。',
          alt: '巨亨桑拿水晶燈休息廳',
        },
        {
          file: 'macau-sauna-spa-empire-10-marble-cafe-lounge',
          caption: '在大理石餐飲區待著，給自己一個安靜的角落。',
          alt: '巨亨桑拿大理石餐飲區',
        },
        {
          file: 'macau-sauna-spa-empire-11-purple-led-dining-hall',
          caption: '在氛圍燈光的用餐大廳，牛排、海鮮、熱食隨你享用，全部免費。',
          alt: '巨亨桑拿用餐大廳',
        },
        {
          file: 'macau-sauna-spa-empire-12-atrium-restaurant',
          caption: '在挑高中庭餐廳慢慢用餐，免費佳餚不必趕時間。',
          alt: '巨亨桑拿中庭餐廳',
        },
      ],
      website: {
        url: 'https://empiresauna.com',
        label: '巨亨桑拿官方網站 ↗',
        display: 'empiresauna.com',
      },
    },
    'east-castle-spa': {
      aliases: '東方皇堡、東方皇堡水療會所、澳門東方皇堡',
      highlights: [
        '20 多款不同風格的房間設計',
      ],
      bestFor: '體驗不同風格的房間設計',
      features: [
        '20+ 不同風格房間設計',
        '專業服務團隊',
        '24小時營業',
        '寬敞沐浴及休息空間',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達東方皇堡水療，這裡是澳門主題場景房的鼻祖。前台登記後領取手牌；參考價格為 MOP 2,388 至 6,498，詳細項目請於預約時確認。',
        },
        {
          title: '沐浴放鬆',
          body: '享用沐浴設施及桑拿，按自己的節奏泡浴、休息，放鬆旅途中的疲憊。',
        },
        {
          title: '免費餐飲',
          body: '場內提供免費餐飲，可在用餐區稍作休息，再安排接下來的行程。',
        },
        {
          title: '確認按摩安排',
          body: '向接待人員了解按摩項目、可預約時間及房間供應情況。開始前確認服務內容、時長和費用明細，按自己的需要安排。',
        },
        {
          title: '20+ 不同風格的房間設計',
          body: '東方皇堡水療的一大特色，是提供 20 多款不同風格的房間設計。各房間以不同的裝潢與氛圍呈現個性，讓顧客在喜歡的空間中享受按摩、放鬆身心。',
        },
        {
          title: '服務費與稅項',
          body: '另收 10% 服務費及 5% 旅遊稅。',
        },
        {
          title: '休息過夜',
          body: '大堂設有躺椅可過夜休息。皇堡的體驗核心在於主題房間而非休息設施，若以過夜舒適度為首要考慮，建議選擇尊貴水療。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: '東方皇堡水療招牌健身房主題情景房，完整器械佈景與道具，盡顯澳門劇本殺開創者的沉浸式格調。',
          alt: '東方皇堡健身房主題情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: '踏入大堂，LED 品牌牆與格調燈光交織，入場即見主題場館的精緻設計。',
          alt: '東方皇堡大堂品牌牆',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: "寬敞的造景浴池搭配絢麗燈光。",
          alt: '東方皇堡 LED 舞台浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '教室主題情景房，設有課桌、黑板等佈景與道具。',
          alt: '東方皇堡教室主題情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: '醫院病房主題情景房，病床與醫療佈景細緻還原，沉浸感十足。',
          alt: '東方皇堡醫院病房主題房',
        },
        {
          file: 'macau-sauna-spa-east-castle-06-eye-exam-medical-room',
          caption: '視力檢查醫療主題房，專業醫療佈景配道具，是東方皇堡水療二十多款主題情景之一。',
          alt: '東方皇堡視力檢查醫療主題房',
        },
        {
          file: 'macau-sauna-spa-east-castle-07-jail-bars-room',
          caption: '監獄鐵欄主題情景房，逼真佈景重現審訊室場景，刺激感拉滿。',
          alt: '東方皇堡監獄主題情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-08-airplane-cabin-room',
          caption: '飛機艙主題情景房，設有艙內座椅與細節佈景。',
          alt: '東方皇堡飛機艙主題情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-09-ufc-octagon-room',
          caption: '八角拳擊場主題情景房，運動場景佈景齊備，劇本殺式體驗別具一格。',
          alt: '東方皇堡拳擊場主題情景房',
        },
      ],
    },
    'victoria-sauna': {
      aliases: '凱旋門桑拿、澳門凱旋桑拿',
      highlights: [
        '環境安靜細緻',
        '服務細心周到',
        '凌晨3:00後免費獨立休息房',
      ],
      bestFor: '安靜，大場所，過夜首選',
      features: [
        '注重服務質量',
        '寬敞休息區域',
        '安靜放鬆環境',
        '過夜首選',
        '24小時營業',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達位於凱旋門酒店5樓的凱旋門桑拿，地點位於澳門半島中心，鄰近美高梅、永利及新葡京。前台登記後領取手牌，場所整體環境安靜私密。',
        },
        {
          title: '沐浴放鬆',
          body: '享用沐浴設施及桑拿，環境清幽整潔。凱旋門刻意控制客流量，即使在繁忙時段也不會感到擁擠。',
        },
        {
          title: '免費餐飲',
          body: '免費享用各式餐飲，用餐環境安靜舒適，不像大型場所般嘈雜。',
        },
        {
          title: "了解按摩套餐",
          body: "告知前台您希望的按摩類型、可用時間與預算，了解適合行程的套餐及各項內容。",
        },
        {
          title: "確認按摩套餐",
          body: "開始前確認按摩類型、時長與總費用。價格區間 MOP 2,298 至 MOP 6,998，另收 10% 服務費。",
        },
        {
          title: "60分鐘按摩",
          body: "按摩參考時長為60分鐘。開始前請與前台確認具體項目、實際時長及明細費用。",
        },
        {
          title: '休息過夜',
          body: '環境安靜私密，是全澳最適合安靜休息及過夜的場所之一。大堂設大量躺椅，客流量少、噪音低，讓你安心過夜，適合追求私密寧靜的客人。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-victoria-01-massage-chair-row',
          caption: '凱旋桑拿一整排按摩躺椅休息區，安靜寬敞、從不擁擠，正是這間隱藏寶石場館的招牌寫照。',
          alt: '凱旋桑拿按摩椅休息排',
        },
        {
          file: 'macau-sauna-spa-victoria-02-hotel-exterior-night',
          caption: '坐落凱旋門酒店，地處澳門半島中心，散步即達美高梅、永利及新葡京。',
          alt: '凱旋門酒店夜景外觀',
        },
        {
          file: 'macau-sauna-spa-victoria-03-catwalk-show-stage',
          caption: "舞台採用柔和燈光照明。",
          alt: "凱旋桑拿舞台",
        },
        {
          file: 'macau-sauna-spa-victoria-04-mosaic-jacuzzi-pool',
          caption: '馬賽克鑲嵌按摩池坐鎮寬敞大浴場，靜謐氛圍最適合慢慢浸泡放鬆。',
          alt: '凱旋桑拿馬賽克按摩池',
        },
        {
          file: 'macau-sauna-spa-victoria-05-black-marble-corridor',
          caption: '黑色大理石走廊格調簡約，柔和燈光引領通往各區的私密動線。',
          alt: '凱旋桑拿黑色大理石走廊',
        },
        {
          file: 'macau-sauna-spa-victoria-06-wood-locker-room',
          caption: '木質更衣室整潔寬敞，營造清幽自在的入場第一步。',
          alt: '凱旋桑拿木質更衣室',
        },
        {
          file: 'macau-sauna-spa-victoria-07-premium-recliner-lounge',
          caption: '高級躺椅休息廳寬敞安穩，是凱旋桑拿過夜首選的理想歇息空間。',
          alt: '凱旋桑拿高級躺椅休息廳',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: "舒適的座位區面向舞台。",
          alt: "凱旋桑拿舞台前座位區",
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晉會、澳門M Club',
      highlights: [
        '東方皇堡姊妹店',
        'KTV',
        '溫泉房',
        '裝修更豪華',
      ],
      bestFor: '歷史設施資料（暫停營業）',
      features: [
        '科技風格裝修',
        '不同風格房間',
        'KTV房間',
        '浴池設施',
        '暫停營業',
      ],
      flow: [
        {
          title: '暫停營業',
          body: '晉會 MCLUB 目前暫停營業，不接待客人或提供預約。以下為過往設施資料。',
        },
        {
          title: '場館與房間',
          body: '晉會為東方皇堡的姊妹店，過往設有不同風格的房間、KTV 房間及浴池設施。',
        },
        {
          title: '沐浴與餐飲',
          body: '過往設有沐浴、桑拿及餐飲區，整體採用科技感裝修。相關設施目前不對外開放。',
        },
        {
          title: '歷史收費說明',
          body: '過往另收 10% 服務費。此資料僅作歷史記錄，不是現行報價或預約方案。',
        },
        {
          title: '休息設施',
          body: '過往大堂設有躺椅休息區。停業期間不提供過夜住宿；如恢復營業，應以場館最新公告為準。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-mclub-01-sports-tv-lounge',
          caption: '晉會MCLUB招牌運動電視休息廳，賽博朋克科技風配大屏幕直播，服務前後從容歇息。',
          alt: '晉會MCLUB運動電視休息廳',
        },
        {
          file: 'macau-sauna-spa-mclub-02-golf-cart-theme-room',
          caption: '高爾夫主題房，球車造景配主題情境佈置，多款沉浸式主題套房之一，每次到訪都是不同場景。',
          alt: '晉會MCLUB高爾夫主題房',
        },
        {
          file: 'macau-sauna-spa-mclub-03-neon-mirror-corridor',
          caption: '霓虹長廊，賽博朋克燈光鋪陳，澳門最具科技感的場館動線就此展開。',
          alt: '晉會MCLUB霓虹鏡廊',
        },
        {
          file: 'macau-sauna-spa-mclub-04-marble-locker-room',
          caption: '大理石更衣室，整潔私密的更衣空間，未來感裝修延伸至每個角落。',
          alt: '晉會MCLUB大理石更衣室',
        },
        {
          file: 'macau-sauna-spa-mclub-05-ktv-panoramic-room',
          caption: '全景KTV房主打招牌派對模式，全澳僅兩家設KTV的場館之一。',
          alt: '晉會MCLUB全景KTV房',
        },
        {
          file: 'macau-sauna-spa-mclub-06-ktv-private-lounge',
          caption: "設有大型螢幕與座椅的卡拉OK休息廳。",
          alt: '晉會MCLUB大屏幕KTV廳',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: '星空宇宙主題睡房，極光氛圍燈光科技感拉滿，招牌星球系列場景之一。',
          alt: '晉會MCLUB星空極光房',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: "採用日式風格裝潢的沐浴房間。",
          alt: '晉會MCLUB日本溫泉房',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: "設有桌球檯的房間。",
          alt: '晉會MCLUB桌球主題套房',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '電玩遊戲房，未來科技裝修配遊戲設備，賽博朋克玩樂體驗。',
          alt: '晉會MCLUB賽車電玩房',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: '飛鏢遊戲休息廳，娛樂設施齊備，科技感裝修下的輕鬆社交空間。',
          alt: '晉會MCLUB飛鏢遊戲廳',
        },
        {
          file: 'macau-sauna-spa-mclub-15-neon-m-logo-entrance',
          caption: '霓虹M字招牌入口，賽博朋克門面格調，入口即見澳門最具科技感的場館。',
          alt: '晉會MCLUB霓虹M字招牌入口',
        },
      ],
    },
    'number-one-sauna': {
      aliases: '一號桑拿、1號桑拿、澳門壹號桑拿、The One Sauna',
      highlights: [
        '寬敞更衣室',
        '按摩浴缸',
        '乾蒸與濕蒸設施',
        '歷史餐飲設施',
      ],
      bestFor: '歷史設施資料（暫停營業）',
      features: [
        '浴池設施',
        '寬敞大廳',
        '儲物櫃',
        '休息區',
        '暫停營業',
      ],
      flow: [
        {
          title: '暫停營業',
          body: '壹號桑拿目前暫停營業，不接待客人或提供預約。以下僅保留過往設施資料。',
        },
        {
          title: '沐浴與更衣設施',
          body: '過往設有寬敞更衣室、儲物櫃、大型按摩浴缸、乾蒸房及濕蒸房。',
        },
        {
          title: '餐飲區',
          body: '過往餐飲供應包括牛排、炒飯、炒麵、水果及飲品，並設有寬敞用餐區；目前不提供餐飲服務。',
        },
        {
          title: '歷史價格',
          body: '過往記錄的價格區間為 MOP 2,199 至 MOP 7,699。此資料不構成現行報價，停業期間不接受預約或安排服務。',
        },
        {
          title: '休息設施',
          body: '過往設有躺椅休息區。停業期間不提供過夜住宿；如恢復營業，請以場館最新公告為準。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: "休息廳設有 LED 立方燈座，搭配柔和氛圍燈光。",
          alt: '壹號桑拿 LED 燈座休息廳',
        },
        {
          file: 'macau-sauna-spa-number-one-02-changing-room-vanity-area',
          caption: '入口即見的寬敞更衣與梳妝區，照明明亮、設施簇新，從容開啟整晚體驗。',
          alt: '壹號桑拿更衣梳妝區',
        },
        {
          file: 'macau-sauna-spa-number-one-03-marble-brand-signage',
          caption: '大理石牆面上的品牌標識，沉穩格調迎接每位入場賓客。',
          alt: '壹號桑拿大理石品牌標識',
        },
        {
          file: 'macau-sauna-spa-number-one-04-wood-locker-corridor',
          caption: '暖色木質儲物櫃走廊，動線寬敞清晰，私密更衣空間井然有序。',
          alt: '壹號桑拿木質儲物櫃走廊',
        },
        {
          file: 'macau-sauna-spa-number-one-05-indoor-bath-pool',
          caption: '大型室內按摩浴池在柔和燈光下，配以乾濕蒸房——泡澡放鬆，調整身心狀態。',
          alt: '壹號桑拿室內按摩浴池',
        },
        {
          file: 'macau-sauna-spa-number-one-06-premium-spa-suite',
          caption: "配備酒店式寢具的獨立套房。",
          alt: '壹號桑拿高級水療套房',
        },
        {
          file: 'macau-sauna-spa-number-one-08-glass-wall-bedroom',
          caption: '玻璃牆面主題睡房，現代設計配柔和燈光，私密而通透。',
          alt: '壹號桑拿玻璃牆主題房',
        },
        {
          file: 'macau-sauna-spa-number-one-09-chesterfield-tv-lounge',
          caption: '真皮沙發影音休息廳，舒適座位配大型屏幕，從容等候與歇息。',
          alt: '壹號桑拿真皮沙發影音廳',
        },
        {
          file: 'macau-sauna-spa-number-one-10-private-entertainment-room',
          caption: '私人娛樂房，氛圍燈光與舒適座椅，三五知己同遊的歡聚空間。',
          alt: '壹號桑拿私人娛樂房',
        },
        {
          file: 'macau-sauna-spa-number-one-11-free-dining-spread',
          caption: '全程無限量免費餐飲，招牌牛排最受歡迎，另有海鮮、炒飯炒麵、湯品與凍啤酒。',
          alt: '壹號桑拿免費餐飲',
        },
        {
          file: 'macau-sauna-spa-number-one-12-reception-lobby',
          caption: "壹號桑拿接待大堂以沉穩的室內格調迎接來客。",
          alt: '壹號桑拿接待大堂',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪門桑拿、新豪門桑拿殿、澳門豪門桑拿',
      highlights: [
        '寬敞浴區',
        '多間客房',
        '休息區',
      ],
      bestFor: '歷史設施資料（暫停營業）',
      features: [
        '寬敞浴區',
        '多間客房',
        '儲物櫃',
        '躺椅休息區',
        '暫停營業',
      ],
      flow: [
        {
          title: '暫停營業',
          body: '豪門桑拿目前暫停營業，不接待客人或提供預約。以下資料用於記錄過往場館設施。',
        },
        {
          title: '沐浴與更衣設施',
          body: '過往設有寬敞更衣室、儲物櫃、浴池及桑拿房。場內空間寬敞，分為沐浴、餐飲及休息區。',
        },
        {
          title: '餐飲與客房',
          body: '過往供應牛排、飲品及熱食，並設有多間客房。目前餐飲與客房設施均不對外開放。',
        },
        {
          title: '歷史價格',
          body: '過往記錄的價格區間為 MOP 2,388 至 MOP 6,988，當時免收服務費。此資料僅作歷史記錄，不是現行報價。',
        },
        {
          title: '休息設施',
          body: '過往休息區設有多張躺椅，間距寬敞。停業期間不提供過夜住宿；如恢復營業，請以場館最新公告為準。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-familia-nobre-01-neon-entrance-night',
          caption: '豪門桑拿殿入口大門與品牌招牌，澳門最大型桑拿會所的氣派門面——城市喧囂在此止步，許多人體驗澳門桑拿的第一站。',
          alt: '豪門桑拿殿入口招牌',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-02-hm-crown-lightbox-signage',
          caption: '入口處皇冠燈箱通明閃耀，奢華格調自門前便已定調，彰顯場館規格。',
          alt: '豪門桑拿殿皇冠燈箱招牌',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-03-purple-grand-staircase',
          caption: '挑高開揚的紫光主樓梯，盡顯全澳最大場地的寬敞氣派，處處留有餘裕。',
          alt: '豪門桑拿殿紫光大樓梯',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-04-red-lantern-theatre-hallway',
          caption: '紅燈籠走廊浸潤在東方戲院式氛圍燈光中，靜靜引領通往各間獨立房間。',
          alt: '豪門桑拿殿紅燈籠走廊',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-05-purple-led-bedroom',
          caption: "房間配有紫色LED燈光與酒店式寢具。",
          alt: '豪門桑拿殿紫光特色房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-06-red-lattice-massage-room',
          caption: '紅格柵按摩房，古典東方線條配私密布局，眾多房型之一任君選擇。',
          alt: '豪門桑拿殿紅格柵按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-07-mirror-chandelier-massage-room',
          caption: '水晶燈光灑落鏡面吊燈房，空間寬敞、陳設講究，盡情享受從容時光。',
          alt: '豪門桑拿殿鏡面吊燈按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-08-mirror-sitting-massage-room',
          caption: '鏡面起居按摩房設有獨立座區與寬敞布局，房間數量全澳最多，幾乎無需等候。',
          alt: '豪門桑拿殿鏡面起居按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-10-marble-bar-dining',
          caption: '大理石餐吧區，免費供應牛排、海鮮、熱炒與凍啤，口碑極佳令熟客回流。',
          alt: '豪門桑拿殿大理石餐吧區',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-11-free-beer-menu-spread',
          caption: '免費餐飲陳列，凍啤、汽水、果汁與熱食全程無限量供應，無需額外付費。',
          alt: '豪門桑拿殿免費啤酒餐飲',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-12-selection-runway-wall',
          caption: "豪門桑拿殿館內的大廳空間。",
          alt: "豪門桑拿殿大廳",
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: '帝湖桑拿、帝湖水療、Oceanic Royal Spa、Oceanic Royal Sauna',
      highlights: [
        '參考價格 MOP 2,299–7,099',
        '主題房、餐飲與躺椅休息區',
      ],
      bestFor: '恢復營業後，想在氹仔安排完整水療夜的客人',
      features: [
        '目前暫停營業，不接待客人或提供預約',
        '古典與主題風格房間',
        '24 小時躺椅休息與過夜安排',
        '餐飲與海鮮選擇',
      ],
      flow: [
        {
          title: '先確認營業狀態',
          body: '帝湖水療目前暫停營業，不接待客人或提供預約服務。計劃前請先聯繫我們確認最新情況。',
        },
        {
          title: '選擇替代會所',
          body: '告訴我們你偏好氹仔或澳門半島、主題房、24 小時營業或過夜躺椅休息區，我們可為你推薦目前營業中的選擇。',
        },
        {
          title: '恢復營業後再確認',
          body: '恢復營業後，請再確認當日價格、技師陣容與房間安排；這些資訊可能隨場館的實際營運而調整。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-01',
          caption: '氹仔帝湖水療入口招牌，最直接呈現會所識別的一張照片。',
          alt: '氹仔帝湖水療入口招牌',
        },
        {
          file: 'macau-sauna-spa-oceanic-gallery-202607-03',
          caption: '帝湖所在位置的夜景外觀。',
          alt: '帝湖水療夜景外觀',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-11',
          caption: '帝湖水療內的泳池與舞台空間。',
          alt: '帝湖水療泳池與舞台空間',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-12',
          caption: '舞台燈光配寬敞空間，室內氛圍更具戲劇感。',
          alt: '帝湖水療舞台房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-07',
          caption: '會所休息廳，適合在一晚不同環節之間慢慢放鬆。',
          alt: '帝湖水療休息廳',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-02',
          caption: '暖色調雙床私人房，陳設簡潔而安靜。',
          alt: '帝湖水療雙床私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-08',
          caption: '直幅視角下的私人房間一隅。',
          alt: '帝湖水療私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-09',
          caption: '低暖光營造的另一種主題房氛圍。',
          alt: '帝湖水療主題私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-04',
          caption: '餐飲供應的一個畫面，適合搭配長時間停留。',
          alt: '帝湖水療餐飲',
        },
      ],
      overnightValue: '恢復營業後可過夜',
      overnightNote: '— 到訪前請確認最新安排',
    },
  },
};

const zhCN: SpaPageCopy = {
  backHome: '返回首页',
  backToVenueList: '返回会所列表',
  inquiry: {
    booking: '你好，我想预约{venue}，可以安排吗？',
    closed: '你好，我看到{venue}暂停营业，请问有类似的场所可以推荐吗？',
  },
  alsoKnownAs: '亦称：',
  labels: {
    referencePrice: '常见套餐价格范围',
    separateServiceFee: '另收服务费',
    noSeparateSurcharge: '不另收服务费',
    priceDisclaimer: '最终总额会因套餐、房型、税费及加购而变化，出发前请确认明细报价。',
    discountCta: '联系我们获取优惠 →',
    staff: '技师',
    staffValue: '多国技师',
    staffTeam: '多国籍技师团队',
    hours: '营业时间',
    openAllDay: '24小时营业',
    staffHours: '技师',
    website: '官方网站',
    overnight: '过夜',
    overnightAvailable: '可过夜',
    overnightUnavailable: '不设过夜',
    overnightNoteAvailable: '',
    highlights: '亮点',
    bestFor: '最适合',
    payment: '付款方式',
    quickBook: '首次前往？联系我们预约，有免费接送 + 优惠价格',
    allContacts: '联系我们获取优惠 →',
    features: '特色服务',
    gallery: '会所相册',
    viewLarger: '查看大图',
    previousPhoto: '上一张照片',
    nextPhoto: '下一张照片',
    gallerySwipeHint: '左右滑动切换照片',
    galleryPhotoCount: '第 {current} 张照片，共 {total} 张',
    flow: '详细流程',
    moreInfo: '想了解更多？联系我们获取详细资讯',
    related: '其他热门会所',
    learnMore: '了解更多',
    officialWebsite: '官方网站：',
  },
  paymentMethods: [
    '现金',
    '刷卡',
    '微信',
    '支付宝',
  ],
  concierge: {
    title: '您的免费回程接送也已备妥',
    body: '当您结束时——餐饮后、服务刚结束、任何时间——只需发信息给我们。同一辆豪华专车会回来接您，送往您的酒店、机场、码头，或澳门境内任何地点。与接送同样零费用。',
  },
  vipReminder: {
    title: '赠送 2 项舒缓按摩',
    body: '可从 8 项小工服务中免费任选 2 项。包含擦背服务、腿部按摩、头部按摩、足底按摩、修手指甲、修脚指甲、手部按摩、采耳。我们会事先通知场地您的到访，到场时可直接选择护理项目。',
    cta: '查看全部 8 项 →',
  },
  vipDrawer: {
    titleLead: '赠送 2 项',
    titleAccent: '舒缓按摩',
    note: '可从 8 项小工服务中免费任选 2 项。我们会事先通知场地您的到访，到场时可直接选择护理项目。',
    close: '关闭赠送护理项目清单',
  },
  cta: {
    headingLead: '预约您的',
    headingAccent: 'VIP 体验',
    body: '给我们发个信息，剩下的交给我们处理。',
  },
  breadcrumbHome: '首页',
  breadcrumbList: '会所',
  placeholder: {
    ktv: 'KTV 包厢',
    themeRooms: '主题房',
    overnight: '可过夜',
    open24h: '24 小时营业',
    noServiceFee: '免服务费',
    peninsula: '澳门半岛',
    taipa: '氹仔',
  },
  venues: {
    'clube-rio': {
      aliases: '利澳荟KTV、利澳桑拿、利澳荟桑拿、Clube Rio、Rio KTV、澳门夜总会、澳门商K、澳门商务KTV',
      highlights: [
        '2026年7月30日全新开幕',
        '全澳少有KTV为主轴',
      ],
      bestFor: '朋友聚会唱K',
      features: [
        '酒水任饮',
        '私密包厢高清音响',
        '利澳酒店3楼',
      ],
      flow: [
        {
          title: '预约包厢',
          body: '通过我们预约，请告知人数与时段。开幕初期建议提前确认包厢的空位。',
        },
        {
          title: '抵达利澳酒店',
          body: '前往新口岸利澳酒店 3 楼，各口岸与主要酒店短程直达，亦可由我们安排免费私人专车接送。到场报预约名字即有专人带位。',
        },
        {
          title: '畅玩至凌晨',
          body: '营业至凌晨 4 时。不设过夜——散场后新口岸截车方便，也可预约回程专车。',
        },
        {
          title: '回程安排',
          body: '通过我们预约可安排免费私人专车接送（非共乘）。如行程需要过夜，预约时可向我们查询，专人会建议合适的安排。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-clube-rio-01-main-lounge',
          caption: '水晶吊灯下先来一杯——主厅酒廊的真皮沙发围住云石茶几，最适合等齐人、拣好包厢前把气氛热起来。',
          alt: '利澳荟主厅酒廊 — 水晶吊灯与真皮沙发',
        },
        {
          file: 'macau-sauna-spa-clube-rio-02-vip-room-gold-leaf',
          caption: '金箔龙鹰挂画装饰的 VIP 包厢，配备音响与灯光。',
          alt: '利澳荟 VIP 包厢 — 金箔龙鹰艺术挂画',
        },
        {
          file: 'macau-sauna-spa-clube-rio-03-party-room',
          caption: '成班朋友开一间大房，麦克风传来传去都够位，音响开尽唱到凌晨四时才散场。',
          alt: '利澳荟派对包厢',
        },
        {
          file: 'macau-sauna-spa-clube-rio-04-theme-room-orange',
          caption: '暖橙主调配名驹挂画，每间房性格不同——熟客最爱每次换一间、换一种心情。',
          alt: '利澳荟主题包厢 — 橙调主题装潢',
        },
        {
          file: 'macau-sauna-spa-clube-rio-05-lounge-suite',
          caption: '厅房分区的套间规格——唱累了退到沙发区斟茶聊天，节奏由自己控制。',
          alt: '利澳荟豪华套间',
        },
        {
          file: 'macau-sauna-spa-clube-rio-06-reception',
          caption: '接待处连着恒温藏酒柜，报上预约名字即有专人带位——由云石大堂走到包厢，未开麦已有贵宾感。',
          alt: '利澳荟迎宾接待处 — 藏酒柜与云石大堂',
        },
        {
          file: 'macau-sauna-spa-clube-rio-07-corridor',
          caption: '隔音门后各有各精彩——沿廊道隐约听到别房的歌声，就知道今晚来对了地方。',
          alt: '利澳荟包厢廊道',
        },
        {
          file: 'macau-sauna-spa-clube-rio-08-vip-room-crystal-art',
          caption: '橙色绗缝沙发配虎豹水晶挂画，VIP 包厢内设有音箱与柔和灯光。',
          alt: '利澳荟 VIP 包厢一角 — 水晶动物挂画与金框圆镜',
        },
        {
          file: 'macau-sauna-spa-clube-rio-09-lounge-suite-orange',
          caption: '橙白格仔纱帘半掩、软凳一排排——多人轮唱、斗歌、干杯，个个有位坐。',
          alt: '利澳荟橙调套间 — 格仔纱帘与黑金茶几',
        },
      ],
      website: {
        url: 'https://clube-rio.com',
        label: '利澳荟官方网站 ↗',
        display: 'clube-rio.com',
      },
    },
    'manhao-spa': {
      aliases: '曼濠桑拿、曼豪桑拿、漫濠水疗、澳门曼濠水疗',
      highlights: [
        '2026氹仔最新',
        '超大的舞台',
        '皇者奢华风格',
      ],
      bestFor: '宽敞舞台／氹仔奢华体验',
      staffValue: '多国籍技师团队',
      overnightValue: '不可过夜',
      overnightNote: '— 过渡期暂不提供过夜，即将恢复24小时及过夜',
      features: [
        '2026年5月1日氹仔全新开业',
        '超大的舞台大厅',
        '云石主调奢华大堂与更衣室',
        '营业时间 14:00–04:00',
      ],
      flow: [
        {
          title: '抵达君怡酒店',
          body: '曼濠水疗位于氹仔君怡酒店——距离路氹城仅5分钟车程，是氹仔区最便捷的最新奢华桑拿选择。大堂以云石背景上的金色皇冠 MH 标志迎宾；前台登记后，由礼宾接待领取手牌。',
        },
        {
          title: '奢华更衣室',
          body: '踏入更衣区——卡拉拉云石主墙面、金色搭扣订制木柜、软垫长椅。所有硬件贯彻皇者奢华格调而非实用主义设计，预示后续体验的水准。',
        },
        {
          title: '沐浴与湿区',
          body: '前往沐浴区，采用深色马赛克瓷砖与绿纹云石搭配，配备多个冲凉位置及独立泡池。整个湿区全新打造，空间宽敞，适合服务前从容浸泡放松。',
        },
        {
          title: '用餐厅',
          body: '于云石桌面用餐厅享用免费餐饮——静雅的酒店级座椅配私人酒吧氛围，适合在服务前后慢慢享受。',
        },
        {
          title: '超大的舞台',
          body: '招牌卖点是宽敞的舞台大厅：多层玻璃栏杆配上深蓝霓虹灯光，形成鲜明的视觉层次。宏大的舞台与灯光设计相互呼应，成为曼濠馆内引人注目的焦点。',
        },
        {
          title: '60分钟按摩',
          body: '以 60 分钟按摩放慢步调，舒缓旅途与日常的疲惫。灯光和音乐可按喜好调整，让您在舒适的氛围中，安心享受放松时光。',
        },
        {
          title: '休息区',
          body: '前往专属星空休息区——光线柔和、配备奢华躺椅，让您于服务后放松。营业时间 14:00–04:00，暂不设过夜留宿。离场时于前台结算，现金、信用卡、微信支付及支付宝均可使用。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-manhao-01-marble-gold-signage',
          caption: '标志性金色皇冠 MH 标志映于卡拉拉云石墙面，「皇者气派」格调自入口一见即显。',
          alt: '曼濠水疗金色皇冠云石招牌',
        },
        {
          file: 'macau-sauna-spa-manhao-02-blue-showcase-hall',
          caption: "大厅设有多层玻璃栏杆走道，搭配深蓝霓虹灯光。",
          alt: "曼濠水疗蓝光玻璃栏杆大厅",
        },
        {
          file: 'macau-sauna-spa-manhao-04-mural-bedroom-suite',
          caption: '壁画墙面睡房套房，超大床、沙发与柔和台灯配置，酒店级舒适打造从容私密的休憩空间。',
          alt: '曼濠水疗壁画睡房套房',
        },
        {
          file: 'macau-sauna-spa-manhao-05-tree-mural-luxury-suite',
          caption: '树影壁画奢华套房，自然意境墙面配低调氛围灯光，静雅得宛如私人退隐之所。',
          alt: '曼濠水疗树影壁画奢华套房',
        },
        {
          file: 'macau-sauna-spa-manhao-06-marble-locker-room',
          caption: '更衣室以卡拉拉云石主墙、金色搭扣订制木柜与软垫长椅立下格调基准。',
          alt: '曼濠水疗云石更衣室',
        },
        {
          file: 'macau-sauna-spa-manhao-07-marble-shower-stalls',
          caption: '云石冲洗间设独立私密淋浴位置，配全新洁净设备，服务前从容梳洗。',
          alt: '曼濠水疗云石冲洗间',
        },
        {
          file: 'macau-sauna-spa-manhao-08-jacuzzi-bathing-zone',
          caption: '浸泡湿区采深色马赛克瓷砖与绿纹云石，独立泡池空间宽敞，适合服务前舒缓浸泡。',
          alt: '曼濠水疗浸泡湿区',
        },
        {
          file: 'macau-sauna-spa-manhao-09-dark-steam-shower-room',
          caption: '私密独立的深色蒸气淋浴间，全新设备带来静谧沉浸的湿区片刻。',
          alt: '曼濠水疗深色蒸气淋浴间',
        },
        {
          file: 'macau-sauna-spa-manhao-10-marble-dining-bar',
          caption: '云石餐厅大堂以酒店级座椅配私人酒吧氛围，免费餐饮在此从容享用。',
          alt: '曼濠水疗云石餐厅大堂',
        },
        {
          file: 'macau-sauna-spa-manhao-11-starlight-recliner-lounge',
          caption: '专属星空休息区，光线柔和配奢华躺椅，让您服务前后静心歇息。',
          alt: '曼濠水疗星空休息区',
        },
        {
          file: 'macau-sauna-spa-manhao-12-mural-corridor',
          caption: '壁画回廊串连各区，雅致墙面艺术配柔和灯光，尽显精品酒店般的场馆格调。',
          alt: '曼濠水疗壁画回廊',
        },
      ],
      website: {
        url: 'https://manhaospa.com',
        label: '曼濠水疗官方网站 ↗',
        display: 'manhaospa.com',
      },
    },
    'number-nine-sauna': {
      aliases: '玖号桑拿、九号桑拿、9号水疗、澳门玖号水疗',
      highlights: [
        '2026年4月全新开业',
        '现代化舞台设施',
        '多款氛围主题房',
        '巴厘岛+日式按摩',
      ],
      bestFor: '尝鲜最新场',
      features: [
        '不同风格房间',
        '舞台灯光设施',
        'LED屏幕',
        '现代化沐浴设施',
        '巴厘岛式及日式按摩',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达2026年4月全新开业的玖号水疗，位于澳门市中心御龙酒店内。作为全澳最新场所，所有设施均为全新状态，整体设计走现代奢华路线，金色与大理石元素搭配专业灯光系统。',
        },
        {
          title: '沐浴放松',
          body: '享用全新装修的现代化沐浴及桑拿设施，设备簇新。更衣室采用木质储物柜设计，整洁有序；沐浴区以绿色马赛克瓷砖装饰，环境清新。',
        },
        {
          title: '免费餐饮',
          body: '免费享用各式餐饮服务，场所强调多样化的高端餐饮选择，将用餐体验纳入整体享受的一部分。',
        },
        {
          title: '大厅设施',
          body: '大厅配备舞台灯光及 LED 屏幕，配合金色与大理石装潢，呈现鲜明的现代风格。',
        },
        {
          title: '选择主题房间',
          body: '玖号设有多款氛围主题房间，每间房都配备独特的氛围灯光——红色、粉紫色、蓝紫色等不同色调，搭配星空天花及精致装潢，营造沉浸式体验。圆形大床为部分房间的特色设计。',
        },
        {
          title: '60分钟服务',
          body: '提供巴厘岛式及日式按摩两种风格选择，结合东南亚与日本的按摩手法。玖号以「独创日式+巴厘岛风情」为卖点，服务体验与传统场所有所不同。',
        },
        {
          title: '休息过夜',
          body: '可过夜休息，全新设施确保舒适度。作为新场，初期客流量较少，环境安静。通过我们预约可获取最新优惠价格。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-nine-01-modern-luxury-themed-suite',
          caption: '玖号水疗招牌现代奢华主题套房，柔和氛围灯光配精致金色大理石装潢，2026 年 4 月全新开幕，全澳最新场馆之一。',
          alt: '玖号水疗现代奢华主题套房',
        },
        {
          file: 'macau-sauna-spa-number-nine-02-red-theme-room',
          caption: '沉入红色氛围圆床主题房，星空天花与沉浸式灯光定下基调——玖号多款情境主题房之一。',
          alt: '玖号水疗红色圆床主题房',
        },
        {
          file: 'macau-sauna-spa-number-nine-03-aurora-bedroom-purple',
          caption: '紫色极光氛围主题房，柔和光晕将空间包裹于静谧的现代奢华格调之中。',
          alt: '玖号水疗紫色极光主题房',
        },
        {
          file: 'macau-sauna-spa-number-nine-04-recliner-lounge',
          caption: '壁画主题休息厅，柔和光线下舒适躺椅相迎，服务前后从容歇息。',
          alt: '玖号水疗壁画休息厅',
        },
        {
          file: 'macau-sauna-spa-number-nine-05-massage-chair-room',
          caption: '全新按摩椅休息区，设备簇新，宾客可在私密角落放松身心。',
          alt: '玖号水疗按摩椅休息区',
        },
        {
          file: 'macau-sauna-spa-number-nine-06-premium-towel-locker',
          caption: '高级木质储物柜与整洁毛巾区，全新设施整洁有序，细节尽显场馆格调。',
          alt: '玖号水疗高级储物柜毛巾区',
        },
        {
          file: 'macau-sauna-spa-number-nine-07-royal-dragon-exterior',
          caption: '玖号水疗坐落于市中心御龙酒店内，地段便利，入口即见场馆格调。',
          alt: '玖号水疗御龙酒店外观',
        },
        {
          file: 'macau-sauna-spa-number-nine-08-bath-wash-area',
          caption: '全新装修的沐浴及冲洗区，设备簇新整洁，清新湿区洗去一日疲惫。',
          alt: '玖号水疗沐浴冲洗区',
        },
        {
          file: 'macau-sauna-spa-number-nine-09-purple-light-bedroom',
          caption: '紫光氛围主题睡房，柔和灯光配精致寝具，静静邀你歇息放松。',
          alt: '玖号水疗紫光主题睡房',
        },
        {
          file: 'macau-sauna-spa-number-nine-10-ambient-themed-bedroom',
          caption: "主舞台大厅设有星形霓虹背景与专业灯光。",
          alt: '玖号水疗主舞台大厅',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '格调餐饮区，免费供应牛排、海鲜、汤面等多样热食，将用餐纳入整体享受。',
          alt: '玖号水疗餐饮区',
        },
      ],
      website: {
        url: 'https://numberninespa.com',
        label: '玖号水疗官方网站 ↗',
        display: 'numberninespa.com',
      },
    },
    'shang-pin-spa': {
      aliases: '尚品水疗、尚品桑拿、尚品、澳门尚品国际水疗',
      highlights: [
        '现代化沐浴设施',
      ],
      bestFor: '安静环境／现代化设施',
      features: [
        '推荐指数{ratingStars}',
        '赠送指定按摩／护理项目，具体项目请于预约时确认',
        '国际化的服务标准',
        '性价比极高',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达尚品国际水疗，位于葡京人酒店内（路氹）。整体装修采用欧式现代风格，富当代设计感。前台登记后领取手牌。',
        },
        {
          title: '沐浴放松',
          body: '沐浴设施簇新，设备完善。浴池及桑拿环境明亮整洁，与传统场所风格截然不同。',
        },
        {
          title: '免费餐饮',
          body: '免费享用各式餐饮，餐区环境舒适整洁，与场所整体的现代设计风格一致。',
        },
        {
          title: '客房设施',
          body: '每间房间均设有独立浴缸，私密度高。',
        },
        {
          title: '休息过夜',
          body: "可过夜休息，大堂设免费躺椅休息区，另有付费独立休息房；因场所规模精品化，客流量较少，环境安静舒适。",
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: "尚品国际水疗位于路氹葡京人酒店内，舞台以紫色氛围灯光照明。",
          alt: "尚品国际水疗紫色舞台",
        },
        {
          file: 'macau-sauna-spa-elite-02-gold-signage-reception',
          caption: '金色招牌前台迎宾，一踏入即见高档华丽的接待格调，新区旅客的便利之选。',
          alt: '尚品国际水疗金色招牌前台',
        },
        {
          file: 'macau-sauna-spa-elite-03-arched-door-lounge',
          caption: '拱门设计休息厅，现代华丽装潢配柔和灯光，服务前后皆可从容歇息。',
          alt: '尚品国际水疗拱门休息厅',
        },
        {
          file: 'macau-sauna-spa-elite-04-porthole-mirror-stage',
          caption: "圆窗镜面舞台配阶梯座位。",
          alt: '尚品国际水疗镜面舞台阶梯',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '现代化按摩浴池湿区，提供明亮整洁的泡浴环境。',
          alt: '尚品国际水疗按摩浴池湿区',
        },
        {
          file: 'macau-sauna-spa-elite-06-blue-led-v88-corridor',
          caption: '蓝色 LED 氛围走廊通往各房间，高私密度动线贯穿全场，尽显现代设计感。',
          alt: '尚品国际水疗蓝光走廊',
        },
        {
          file: 'macau-sauna-spa-elite-07-marble-private-corridor',
          caption: '通往私人套房的格调走廊，静谧而私密。',
          alt: '尚品国际水疗私人房走廊',
        },
        {
          file: 'macau-sauna-spa-elite-08-mirror-headboard-bedroom',
          caption: '镜面床头主题睡房，现代华丽装潢，私密而舒适。',
          alt: '尚品国际水疗镜面床头睡房',
        },
        {
          file: 'macau-sauna-spa-elite-09-starlight-magenta-bedroom',
          caption: '星光天花配紫红灯光的特色睡房，氛围浪漫，设备全新簇新。',
          alt: '尚品国际水疗星光紫红睡房',
        },
        {
          file: 'macau-sauna-spa-elite-10-wide-recliner-theatre',
          caption: '宽敞躺椅休息厅，过夜可于免费躺椅瞓到天光，舒适从容。',
          alt: '尚品国际水疗躺椅休息厅',
        },
        {
          file: 'macau-sauna-spa-elite-11-selection-stage',
          caption: "尚品国际水疗馆内的小型舞台空间。",
          alt: "尚品国际水疗舞台空间",
        },
        {
          file: 'macau-sauna-spa-elite-12-massage-chair-rest-area',
          caption: '按摩椅休息区，安静舒适的歇息空间，搭配免费餐饮与饮品。',
          alt: '尚品国际水疗按摩椅休息区',
        },
      ],
      website: {
        url: 'https://shangpinspa.com',
        label: '尚品国际水疗官方网站 ↗',
        display: 'shangpinspa.com',
      },
    },
    'majesty-spa': {
      aliases: '尊贵桑拿、澳门尊贵水疗',
      highlights: [
        '最豪华装修',
        '最大房间',
        '免服务费',
      ],
      bestFor: '豪华环境／过夜首选',
      features: [
        '澳门最奢华装修',
        '十多种不同风格房间',
        'KTV房派对模式',
        '24小时营业',
        '免服务费',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达尊贵水疗，是全澳装修最为豪华的桑拿场所。金色与大理石元素贯穿全场，第一眼即感受到顶级会所的气派。前台登记后领取手牌。',
        },
        {
          title: '沐浴放松',
          body: '享用豪华沐浴设施及桑拿，浴池宽敞、灯光柔和，整体环境优雅大气。建议花时间好好享受这里的沐浴体验，是全澳硬件配置最顶级的场所。',
        },
        {
          title: '免费餐饮',
          body: '免费享用牛排、新鲜水果、冻啤酒等餐饮，食材及菜式选择丰富。尊贵的餐饮品质在业界备受赞誉，全程无限量供应。',
        },
        {
          title: "选择按摩套餐",
          body: "向前台了解可用的按摩套餐、时长及所含项目，确认总费用后再选择。",
        },
        {
          title: '确认价格',
          body: '价格区间 MOP 2,799 至 MOP 6,699。',
        },
        {
          title: '60分钟按摩',
          body: '在宽敞舒适的房间享受 60 分钟按摩，柔和灯光与精致家具营造放松氛围。开始前请确认按摩项目与费用。',
        },
        {
          title: '休息过夜',
          body: '尊贵 24 小时营业、可过夜——大堂设免费躺椅休息区，旺季另有付费独立休息房可选，配合免费餐饮，是舒适过夜的选择。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-majesty-01-ktv-party-room',
          caption: '尊贵水疗招牌 KTV 派对房，澳门仅两家设 KTV 的场馆之一，奢华包厢气氛热闹，最适合通宵尽兴。',
          alt: '尊贵水疗 KTV 派对房',
        },
        {
          file: 'macau-sauna-spa-majesty-02-majesty-entrance-signage',
          caption: '沉稳格调的入口招牌，一抵达便奠定基调——这里是全澳最奢华的会所。',
          alt: '尊贵水疗入口招牌',
        },
        {
          file: 'macau-sauna-spa-majesty-03-gold-chandelier-bath-pool',
          caption: '金色吊灯奢华浴池，宽敞湿区配柔和氛围灯光，是值得在开场前慢慢享受的顶级硬件。',
          alt: '尊贵水疗金色吊灯浴池',
        },
        {
          file: 'macau-sauna-spa-majesty-04-curved-wood-corridor',
          caption: '弧形木质走廊连接各主题套房，柔和灯光与曲线设计，营造静谧私密的动线。',
          alt: '尊贵水疗弧形木质走廊',
        },
        {
          file: 'macau-sauna-spa-majesty-05-chinese-marriage-bed-room',
          caption: '中式婚床主题房，传统雕花婚床配红金布置，是十多种精心设计主题房之一。',
          alt: '尊贵水疗中式婚床主题房',
        },
        {
          file: 'macau-sauna-spa-majesty-06-egypt-pharaoh-room',
          caption: '埃及法老主题房，金色壁饰与神庙意境，尽显这里多元主题设计的巧思。',
          alt: '尊贵水疗埃及法老主题房',
        },
        {
          file: 'macau-sauna-spa-majesty-07-gym-boxing-theme-room',
          caption: '健身拳击主题房，运动风格布置别具一格，为十多款主题套房增添趣味选择。',
          alt: '尊贵水疗健身拳击主题房',
        },
      ],
      website: {
        url: 'https://majestysauna.com',
        label: '尊贵水疗官方网站 ↗',
        display: 'majestysauna.com',
      },
    },
    'the-excellent-sauna': {
      aliases: '澳门极品桑拿、The Excellent Sauna',
      highlights: [
        '英皇娱乐酒店本馆',
        '不同风格的房间',
      ],
      bestFor: '时间灵活／主题体验',
      features: [
        '英皇娱乐酒店本馆',
        '全新主题房间',
        '多种特色主题',
        'DJ室体验',
        '24小时营业及过夜休息区',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达位于英皇娱乐酒店本馆内的极品桑拿。会所 24 小时营业，技师时段为 13:00 至 05:00；前台登记后先沐浴，再按自己的节奏享受精品型场馆的安静氛围。',
        },
        {
          title: '沐浴放松',
          body: '享用沐浴设施及桑拿放松身心。极品的环境相对安静清幽，客流量较少，不会有大型场所的嘈杂感。',
        },
        {
          title: '免费餐饮',
          body: '24 小时免费享用各式餐饮，无论下午或深夜入场，都可按自己的时间用餐。',
        },
        {
          title: '了解按摩安排',
          body: '向接待人员说明希望放松的部位及按摩力度，了解可选项目、时长与收费后，再确认适合自己的安排。',
        },
        {
          title: '60分钟按摩',
          body: '按摩时间约 60 分钟，另收 10% 服务费。场内提供泰式及上海式按摩，具体手法、力度与费用请于开始前确认。',
        },
        {
          title: '休息过夜',
          body: '服务后可在安静舒适的 24 小时休息区放松，也可按自己的节奏留宿过夜，离场前于前台结算即可。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-excellent-01-blue-bathing-pool',
          caption: '极品桑拿招牌浴池在蓝调灯光下泛着柔光，宽敞湿区让你一进门便沉淀下来，享受静谧沐浴时光。',
          alt: '极品桑拿蓝调浴池',
        },
        {
          file: 'macau-sauna-spa-excellent-02-ambulance-theme-room',
          caption: '极品桑拿新设的医院主题房，采用细致的场景布置。',
          alt: '极品桑拿医院主题房',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '图案地砖走廊串连各情境主题房，柔和灯光一路引向 DJ 室、办公室、电影院等房型。',
          alt: '极品桑拿主题房走廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: "套房设有皮革床头、照明及酒店式寝具。",
          alt: '极品桑拿皮革床头套房',
        },
        {
          file: 'macau-sauna-spa-excellent-06-mirror-vanity-area',
          caption: '明亮的梳妆镜区备品整洁、灯光柔和，服务前后都能从容打理仪容。',
          alt: '极品桑拿梳妆镜区',
        },
        {
          file: 'macau-sauna-spa-excellent-07-wood-locker-room',
          caption: '木质格调更衣间配独立储物柜，环境整洁，入场更衣安心又私密。',
          alt: '极品桑拿木质更衣间',
        },
        {
          file: 'macau-sauna-spa-excellent-08-diamond-accent-rest-area',
          caption: '钻饰墙面休息区以柔和灯光搭配舒适座位，可在此放松，也能留宿过夜。',
          alt: '极品桑拿钻饰休息区',
        },
        {
          file: 'macau-sauna-spa-excellent-09-purple-vip-lounge',
          caption: '紫调氛围 VIP 休息厅沙发柔软、格局私密，服务前后都能舒适歇息。',
          alt: '极品桑拿紫调 VIP 厅',
        },
        {
          file: 'macau-sauna-spa-excellent-10-recliner-reception-lounge',
          caption: '躺椅接待厅座位宽敞、光线柔和，亦可作大堂过夜歇息区。',
          alt: '极品桑拿躺椅接待厅',
        },
        {
          file: 'macau-sauna-spa-excellent-11-marble-dining-area',
          caption: '大理石餐饮区 24 小时供应免费热食，牛排、海鲜、汤面等任何时段都吃得到。',
          alt: '极品桑拿大理石餐饮区',
        },
        {
          file: 'macau-sauna-spa-excellent-12-themed-scene-suite',
          caption: '情境主题套房以柔和氛围灯光配特色布置，是极品桑拿多款日式主题房之一。',
          alt: '极品桑拿情境主题套房',
        },
      ],
      website: {
        url: 'https://excellentsauna.com',
        label: '极品桑拿官方网站 ↗',
        display: 'excellentsauna.com',
      },
    },
    'empire-sauna': {
      aliases: '巨享桑拿、澳门巨亨桑拿、Empire Sauna',
      highlights: [
        '2026最新开业',
        '据介绍装修花费1,000美元',
        '酒店套房',
      ],
      bestFor: '最新奢华／酒店套房首选',
      features: [
        '2026年4月开业',
        '据介绍装修花费1,000美元',
        '酒店级套房',
        '24小时营业，可过夜休息',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达巨亨桑拿，澳门半岛最新顶级桑拿会所。大堂与楼梯入口已揭示全场格调——东方禅意线条配现代奢华装潢，所有设施均为全新状态。前台登记后，由礼宾接待领取手牌。',
        },
        {
          title: '沐浴放松',
          body: '踏入招牌大理石浴池——柔和氛围灯光、宽敞空间，整体静谧氛围媲美度假村级水疗，在全澳桑拿中相当罕见。整个湿区设施全新打造，包括完整桑拿房，是场内的视觉核心。',
        },
        {
          title: '用餐厅',
          body: '前往用餐厅享用免费餐饮。场所装潢采用酒店级格调，告别传统桑拿食堂的气氛，环境静雅私密、配备舒适座椅，适合在服务前后从容享用。',
        },
        {
          title: '确认按摩项目与费用',
          body: '向接待人员了解按摩项目、时长及费用明细，再按自己的需要决定。参考价格为 MOP 2,488 至 7,388；服务内容及总费用请于开始前确认。',
        },
        {
          title: '60分钟按摩',
          body: '按摩时长为 60 分钟，具体手法及安排请事先向接待人员了解。房间设有浴缸，灯光与音响可在房内调节，方便按个人习惯营造舒适环境。',
        },
        {
          title: '休息过夜',
          body: '服务结束后可前往独立休息区——光线柔和、环境静谧，专为实际睡眠而非短暂休憩设计。欢迎过夜留宿，期间湿区、用餐厅及休息区全程开放。',
        },
        {
          title: '翌日离场',
          body: '于前台办理离场手续。巨亨桑拿接受现金、信用卡、微信支付及支付宝。如预先通过我们预约，本站专属礼遇（免费加点、免费接送、免入场费）均会在离场时准确结算。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-empire-01-twin-marble-bath-pools',
          caption: '沉入巨亨桑拿的大理石浴池，暖水与柔光间，一天的疲惫悄悄褪去。',
          alt: '巨亨桑拿大理石浴池',
        },
        {
          file: 'macau-sauna-spa-empire-02-grand-lobby-photo-wall',
          caption: '踏进大堂，喧嚣止步，是抵达后放松的第一口呼吸。',
          alt: '巨亨桑拿大堂相片墙',
        },
        {
          file: 'macau-sauna-spa-empire-03-marble-entry-staircase',
          caption: '沿大理石楼梯拾级而上，走进更深的静谧。',
          alt: '巨亨桑拿大理石楼梯',
        },
        {
          file: 'macau-sauna-spa-empire-04-white-marble-treatment-room',
          caption: '套房以白色云石墙面搭配烛光与暖色照明。',
          alt: '巨亨桑拿大理石主题套房',
        },
        {
          file: 'macau-sauna-spa-empire-06-gold-ceiling-marble-suite',
          caption: '金顶套房在订制灯光下泛着暖意，酒店级寝具等你躺下。',
          alt: '巨亨桑拿金顶大理石套房',
        },
        {
          file: 'macau-sauna-spa-empire-07-dark-marble-private-wash-room',
          caption: '在深色大理石私人冲洗间冲个澡，独享一方洁净与私密。',
          alt: '巨亨桑拿私人冲洗间',
        },
        {
          file: 'macau-sauna-spa-empire-08-forest-mural-bedroom',
          caption: '在森林壁画睡房里放空，柔光与自然意境相伴。',
          alt: '巨亨桑拿森林主题房',
        },
        {
          file: 'macau-sauna-spa-empire-09-chandelier-recliner-lounge',
          caption: '在水晶灯下窝进躺椅歇一会，服务前后都自在。',
          alt: '巨亨桑拿水晶灯休息厅',
        },
        {
          file: 'macau-sauna-spa-empire-10-marble-cafe-lounge',
          caption: '在大理石餐饮区待着，给自己一个安静的角落。',
          alt: '巨亨桑拿大理石餐饮区',
        },
        {
          file: 'macau-sauna-spa-empire-11-purple-led-dining-hall',
          caption: '在氛围灯光的用餐大厅，牛排、海鲜、热食随你享用，全部免费。',
          alt: '巨亨桑拿用餐大厅',
        },
        {
          file: 'macau-sauna-spa-empire-12-atrium-restaurant',
          caption: '在挑高中庭餐厅慢慢用餐，免费佳肴不必赶时间。',
          alt: '巨亨桑拿中庭餐厅',
        },
      ],
      website: {
        url: 'https://empiresauna.com',
        label: '巨亨桑拿官方网站 ↗',
        display: 'empiresauna.com',
      },
    },
    'east-castle-spa': {
      aliases: '东方皇堡、东方皇堡水疗会所、澳门东方皇堡',
      highlights: [
        '20 多款不同风格的房间设计',
      ],
      bestFor: '体验不同风格的房间设计',
      features: [
        '20+ 不同风格房间设计',
        '专业服务团队',
        '24小时营业',
        '宽敞沐浴及休息空间',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达东方皇堡水疗，这里是澳门主题场景房的鼻祖。前台登记后领取手牌；参考价格为 MOP 2,388 至 6,498，详细项目请于预约时确认。',
        },
        {
          title: '沐浴放松',
          body: '享用沐浴设施及桑拿，按自己的节奏泡浴、休息，放松旅途中的疲惫。',
        },
        {
          title: '免费餐饮',
          body: '场内提供免费餐饮，可在用餐区稍作休息，再安排接下来的行程。',
        },
        {
          title: '确认按摩安排',
          body: '向接待人员了解按摩项目、可预约时间及房间供应情况。开始前确认服务内容、时长和费用明细，按自己的需要安排。',
        },
        {
          title: '20+ 不同风格的房间设计',
          body: '东方皇堡水疗的一大特色，是提供 20 多款不同风格的房间设计。各房间以不同的装潢与氛围呈现个性，让顾客在喜欢的空间中享受按摩、放松身心。',
        },
        {
          title: '服务费与税项',
          body: '另收 10% 服务费及 5% 旅游税。',
        },
        {
          title: '休息过夜',
          body: '大堂设有躺椅可过夜休息。皇堡的体验核心在于主题房间而非休息设施，若以过夜舒适度为首要考虑，建议选择尊贵水疗。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: '东方皇堡水疗招牌健身房主题情景房，完整器械布景与道具，尽显澳门剧本杀开创者的沉浸式格调。',
          alt: '东方皇堡健身房主题情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: '踏入大堂，LED 品牌墙与格调灯光交织，入场即见主题场馆的精致设计。',
          alt: '东方皇堡大堂品牌墙',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: "宽敞的造景浴池搭配绚丽灯光。",
          alt: '东方皇堡 LED 舞台浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '教室主题情景房，设有课桌、黑板等布景与道具。',
          alt: '东方皇堡教室主题情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: '医院病房主题情景房，病床与医疗布景细致还原，沉浸感十足。',
          alt: '东方皇堡医院病房主题房',
        },
        {
          file: 'macau-sauna-spa-east-castle-06-eye-exam-medical-room',
          caption: '视力检查医疗主题房，专业医疗布景配道具，是东方皇堡水疗二十多款主题情景之一。',
          alt: '东方皇堡视力检查医疗主题房',
        },
        {
          file: 'macau-sauna-spa-east-castle-07-jail-bars-room',
          caption: '监狱铁栏主题情景房，逼真布景重现审讯室场景，刺激感拉满。',
          alt: '东方皇堡监狱主题情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-08-airplane-cabin-room',
          caption: '飞机舱主题情景房，设有舱内座椅与细节布景。',
          alt: '东方皇堡飞机舱主题情景房',
        },
        {
          file: 'macau-sauna-spa-east-castle-09-ufc-octagon-room',
          caption: '八角拳击场主题情景房，运动场景布景齐备，剧本杀式体验别具一格。',
          alt: '东方皇堡拳击场主题情景房',
        },
      ],
    },
    'victoria-sauna': {
      aliases: '凯旋门桑拿、澳门凯旋桑拿',
      highlights: [
        '环境安静细致',
        '服务细心周到',
        '凌晨3:00后免费独立休息房',
      ],
      bestFor: '安静，大场所，过夜首选',
      features: [
        '注重服务质量',
        '宽敞休息区域',
        '安静放松环境',
        '过夜首选',
        '24小时营业',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达位于凯旋门酒店5楼的凯旋门桑拿，地点位于澳门半岛中心，邻近美高梅、永利及新葡京。前台登记后领取手牌，场所整体环境安静私密。',
        },
        {
          title: '沐浴放松',
          body: '享用沐浴设施及桑拿，环境清幽整洁。凯旋门刻意控制客流量，即使在繁忙时段也不会感到拥挤。',
        },
        {
          title: '免费餐饮',
          body: '免费享用各式餐饮，用餐环境安静舒适，不像大型场所般嘈杂。',
        },
        {
          title: "了解按摩套餐",
          body: "告知前台您希望的按摩类型、可用时间与预算，了解适合行程的套餐及各项内容。",
        },
        {
          title: "确认按摩套餐",
          body: "开始前确认按摩类型、时长与总费用。价格区间 MOP 2,298 至 MOP 6,998，另收 10% 服务费。",
        },
        {
          title: "60分钟按摩",
          body: "按摩参考时长为60分钟。开始前请与前台确认具体项目、实际时长及明细费用。",
        },
        {
          title: '休息过夜',
          body: '环境安静私密，是全澳最适合安静休息及过夜的场所之一。大堂设大量躺椅，客流量少、噪音低，让你安心过夜，适合追求私密宁静的客人。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-victoria-01-massage-chair-row',
          caption: '凯旋桑拿一整排按摩躺椅休息区，安静宽敞、从不拥挤，正是这间隐藏宝石场馆的招牌写照。',
          alt: '凯旋桑拿按摩椅休息排',
        },
        {
          file: 'macau-sauna-spa-victoria-02-hotel-exterior-night',
          caption: '坐落凯旋门酒店，地处澳门半岛中心，散步即达美高梅、永利及新葡京。',
          alt: '凯旋门酒店夜景外观',
        },
        {
          file: 'macau-sauna-spa-victoria-03-catwalk-show-stage',
          caption: "舞台采用柔和灯光照明。",
          alt: "凯旋桑拿舞台",
        },
        {
          file: 'macau-sauna-spa-victoria-04-mosaic-jacuzzi-pool',
          caption: '马赛克镶嵌按摩池坐镇宽敞大浴场，静谧氛围最适合慢慢浸泡放松。',
          alt: '凯旋桑拿马赛克按摩池',
        },
        {
          file: 'macau-sauna-spa-victoria-05-black-marble-corridor',
          caption: '黑色大理石走廊格调简约，柔和灯光引领通往各区的私密动线。',
          alt: '凯旋桑拿黑色大理石走廊',
        },
        {
          file: 'macau-sauna-spa-victoria-06-wood-locker-room',
          caption: '木质更衣室整洁宽敞，营造清幽自在的入场第一步。',
          alt: '凯旋桑拿木质更衣室',
        },
        {
          file: 'macau-sauna-spa-victoria-07-premium-recliner-lounge',
          caption: '高级躺椅休息厅宽敞安稳，是凯旋桑拿过夜首选的理想歇息空间。',
          alt: '凯旋桑拿高级躺椅休息厅',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: "舒适的座位区面向舞台。",
          alt: "凯旋桑拿舞台前座位区",
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晋会、澳门M Club',
      highlights: [
        '东方皇堡姊妹店',
        'KTV',
        '温泉房',
        '装修更豪华',
      ],
      bestFor: '历史设施资料（暂停营业）',
      features: [
        '科技风格装修',
        '不同风格房间',
        'KTV房间',
        '浴池设施',
        '暂停营业',
      ],
      flow: [
        {
          title: '暂停营业',
          body: '晋会 MCLUB 目前暂停营业，不接待客人或提供预约。以下为过往设施资料。',
        },
        {
          title: '场馆与房间',
          body: '晋会为东方皇堡的姊妹店，过往设有不同风格的房间、KTV 房间及浴池设施。',
        },
        {
          title: '沐浴与餐饮',
          body: '过往设有沐浴、桑拿及餐饮区，整体采用科技感装修。相关设施目前不对外开放。',
        },
        {
          title: '历史收费说明',
          body: '过往另收 10% 服务费。此资料仅作历史记录，不是现行报价或预约方案。',
        },
        {
          title: '休息设施',
          body: '过往大厅设有躺椅休息区。停业期间不提供过夜住宿；如恢复营业，应以场馆最新公告为准。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-mclub-01-sports-tv-lounge',
          caption: '晋会MCLUB招牌运动电视休息厅，赛博朋克科技风配大屏幕直播，服务前后从容歇息。',
          alt: '晋会MCLUB运动电视休息厅',
        },
        {
          file: 'macau-sauna-spa-mclub-02-golf-cart-theme-room',
          caption: '高尔夫主题房，球车造景配主题情境布置，多款沉浸式主题套房之一，每次到访都是不同场景。',
          alt: '晋会MCLUB高尔夫主题房',
        },
        {
          file: 'macau-sauna-spa-mclub-03-neon-mirror-corridor',
          caption: '霓虹长廊，赛博朋克灯光铺陈，澳门最具科技感的场馆动线就此展开。',
          alt: '晋会MCLUB霓虹镜廊',
        },
        {
          file: 'macau-sauna-spa-mclub-04-marble-locker-room',
          caption: '大理石更衣室，整洁私密的更衣空间，未来感装修延伸至每个角落。',
          alt: '晋会MCLUB大理石更衣室',
        },
        {
          file: 'macau-sauna-spa-mclub-05-ktv-panoramic-room',
          caption: '全景KTV房主打招牌派对模式，全澳仅两家设KTV的场馆之一。',
          alt: '晋会MCLUB全景KTV房',
        },
        {
          file: 'macau-sauna-spa-mclub-06-ktv-private-lounge',
          caption: "设有大型屏幕与座椅的卡拉OK休息厅。",
          alt: '晋会MCLUB大屏幕KTV厅',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: '星空宇宙主题睡房，极光氛围灯光科技感拉满，招牌星球系列场景之一。',
          alt: '晋会MCLUB星空极光房',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: "采用日式风格装修的沐浴房间。",
          alt: '晋会MCLUB日本温泉房',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: "设有桌球台的房间。",
          alt: '晋会MCLUB桌球主题套房',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '电玩游戏房，未来科技装修配游戏设备，赛博朋克玩乐体验。',
          alt: '晋会MCLUB赛车电玩房',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: '飞镖游戏休息厅，娱乐设施齐备，科技感装修下的轻松社交空间。',
          alt: '晋会MCLUB飞镖游戏厅',
        },
        {
          file: 'macau-sauna-spa-mclub-15-neon-m-logo-entrance',
          caption: '霓虹M字招牌入口，赛博朋克门面格调，入口即见澳门最具科技感的场馆。',
          alt: '晋会MCLUB霓虹M字招牌入口',
        },
      ],
    },
    'number-one-sauna': {
      aliases: '一号桑拿、1号桑拿、澳门壹号桑拿、The One Sauna',
      highlights: [
        '宽敞更衣室',
        '按摩浴缸',
        '干蒸与湿蒸设施',
        '历史餐饮设施',
      ],
      bestFor: '历史设施资料（暂停营业）',
      features: [
        '浴池设施',
        '宽敞大厅',
        '储物柜',
        '休息区',
        '暂停营业',
      ],
      flow: [
        {
          title: '暂停营业',
          body: '壹号桑拿目前暂停营业，不接待客人或提供预约。以下仅保留过往设施资料。',
        },
        {
          title: '沐浴与更衣设施',
          body: '过往设有宽敞更衣室、储物柜、大型按摩浴缸、干蒸房及湿蒸房。',
        },
        {
          title: '餐饮区',
          body: '过往餐饮供应包括牛排、炒饭、炒面、水果及饮品，并设有宽敞用餐区；目前不提供餐饮服务。',
        },
        {
          title: '历史价格',
          body: '过往记录的价格区间为 MOP 2,199 至 MOP 7,699。此资料不构成现行报价，停业期间不接受预约或安排服务。',
        },
        {
          title: '休息设施',
          body: '过往设有躺椅休息区。停业期间不提供过夜住宿；如恢复营业，请以场馆最新公告为准。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: "休息厅设有 LED 立方灯座，搭配柔和氛围灯光。",
          alt: '壹号桑拿 LED 灯座休息厅',
        },
        {
          file: 'macau-sauna-spa-number-one-02-changing-room-vanity-area',
          caption: '入口即见的宽敞更衣与梳妆区，照明明亮、设施簇新，从容开启整晚体验。',
          alt: '壹号桑拿更衣梳妆区',
        },
        {
          file: 'macau-sauna-spa-number-one-03-marble-brand-signage',
          caption: '大理石墙面上的品牌标识，沉稳格调迎接每位入场宾客。',
          alt: '壹号桑拿大理石品牌标识',
        },
        {
          file: 'macau-sauna-spa-number-one-04-wood-locker-corridor',
          caption: '暖色木质储物柜走廊，动线宽敞清晰，私密更衣空间井然有序。',
          alt: '壹号桑拿木质储物柜走廊',
        },
        {
          file: 'macau-sauna-spa-number-one-05-indoor-bath-pool',
          caption: '大型室内按摩浴池在柔和灯光下，配以干湿蒸房——泡澡放松，调整身心状态。',
          alt: '壹号桑拿室内按摩浴池',
        },
        {
          file: 'macau-sauna-spa-number-one-06-premium-spa-suite',
          caption: "配备酒店式寝具的独立套房。",
          alt: '壹号桑拿高级水疗套房',
        },
        {
          file: 'macau-sauna-spa-number-one-08-glass-wall-bedroom',
          caption: '玻璃墙面主题睡房，现代设计配柔和灯光，私密而通透。',
          alt: '壹号桑拿玻璃墙主题房',
        },
        {
          file: 'macau-sauna-spa-number-one-09-chesterfield-tv-lounge',
          caption: '真皮沙发影音休息厅，舒适座位配大型屏幕，从容等候与歇息。',
          alt: '壹号桑拿真皮沙发影音厅',
        },
        {
          file: 'macau-sauna-spa-number-one-10-private-entertainment-room',
          caption: '私人娱乐房，氛围灯光与舒适座椅，三五知己同游的欢聚空间。',
          alt: '壹号桑拿私人娱乐房',
        },
        {
          file: 'macau-sauna-spa-number-one-11-free-dining-spread',
          caption: '全程无限量免费餐饮，招牌牛排最受欢迎，另有海鲜、炒饭炒面、汤品与冻啤酒。',
          alt: '壹号桑拿免费餐饮',
        },
        {
          file: 'macau-sauna-spa-number-one-12-reception-lobby',
          caption: "壹号桑拿接待大堂以沉稳的室内格调迎接来客。",
          alt: '壹号桑拿接待大堂',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪门桑拿、新豪门桑拿殿、澳门豪门桑拿',
      highlights: [
        '宽敞浴区',
        '多间客房',
        '休息区',
      ],
      bestFor: '历史设施资料（暂停营业）',
      features: [
        '宽敞浴区',
        '多间客房',
        '储物柜',
        '躺椅休息区',
        '暂停营业',
      ],
      flow: [
        {
          title: '暂停营业',
          body: '豪门桑拿目前暂停营业，不接待客人或提供预约。以下资料用于记录过往场馆设施。',
        },
        {
          title: '沐浴与更衣设施',
          body: '过往设有宽敞更衣室、储物柜、浴池及桑拿房。场内空间宽敞，分为沐浴、餐饮及休息区。',
        },
        {
          title: '餐饮与客房',
          body: '过往供应牛排、饮品及热食，并设有多间客房。目前餐饮与客房设施均不对外开放。',
        },
        {
          title: '历史价格',
          body: '过往记录的价格区间为 MOP 2,388 至 MOP 6,988，当时免收服务费。此资料仅作历史记录，不是现行报价。',
        },
        {
          title: '休息设施',
          body: '过往休息区设有多张躺椅，间距宽敞。停业期间不提供过夜住宿；如恢复营业，请以场馆最新公告为准。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-familia-nobre-01-neon-entrance-night',
          caption: '豪门桑拿殿入口大门与品牌招牌，澳门最大型桑拿会所的气派门面——城市喧嚣在此止步，许多人体验澳门桑拿的第一站。',
          alt: '豪门桑拿殿入口招牌',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-02-hm-crown-lightbox-signage',
          caption: '入口处皇冠灯箱通明闪耀，奢华格调自门前便已定调，彰显场馆规格。',
          alt: '豪门桑拿殿皇冠灯箱招牌',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-03-purple-grand-staircase',
          caption: '挑高开扬的紫光主楼梯，尽显全澳最大场地的宽敞气派，处处留有余裕。',
          alt: '豪门桑拿殿紫光大楼梯',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-04-red-lantern-theatre-hallway',
          caption: '红灯笼走廊浸润在东方戏院式氛围灯光中，静静引领通往各间独立房间。',
          alt: '豪门桑拿殿红灯笼走廊',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-05-purple-led-bedroom',
          caption: "房间配有紫色LED灯光与酒店式寝具。",
          alt: '豪门桑拿殿紫光特色房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-06-red-lattice-massage-room',
          caption: '红格栅按摩房，古典东方线条配私密布局，众多房型之一任君选择。',
          alt: '豪门桑拿殿红格栅按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-07-mirror-chandelier-massage-room',
          caption: '水晶灯光洒落镜面吊灯房，空间宽敞、陈设讲究，尽情享受从容时光。',
          alt: '豪门桑拿殿镜面吊灯按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-08-mirror-sitting-massage-room',
          caption: '镜面起居按摩房设有独立座区与宽敞布局，房间数量全澳最多，几乎无需等候。',
          alt: '豪门桑拿殿镜面起居按摩房',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-10-marble-bar-dining',
          caption: '大理石餐吧区，免费供应牛排、海鲜、热炒与冻啤，口碑极佳令熟客回流。',
          alt: '豪门桑拿殿大理石餐吧区',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-11-free-beer-menu-spread',
          caption: '免费餐饮陈列，冻啤、汽水、果汁与热食全程无限量供应，无需额外付费。',
          alt: '豪门桑拿殿免费啤酒餐饮',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-12-selection-runway-wall',
          caption: "豪门桑拿殿馆内的大厅空间。",
          alt: "豪门桑拿殿大厅",
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: '帝湖桑拿、帝湖水疗、Oceanic Royal Spa、Oceanic Royal Sauna',
      highlights: [
        '参考价格 MOP 2,299–7,099',
        '主题房、餐饮与躺椅休息区',
      ],
      bestFor: '恢复营业后，想在氹仔安排完整水疗夜的客人',
      features: [
        '目前暂停营业，不接待客人或提供预约',
        '古典与主题风格房间',
        '24 小时躺椅休息与过夜安排',
        '餐饮与海鲜选择',
      ],
      flow: [
        {
          title: '先确认营业状态',
          body: '帝湖水疗目前暂停营业，不接待客人或提供预约服务。计划前请先联系我们确认最新情况。',
        },
        {
          title: '选择替代会所',
          body: '告诉我们你偏好氹仔或澳门半岛、主题房、24 小时营业或过夜躺椅休息区，我们可为你推荐目前营业中的选择。',
        },
        {
          title: '恢复营业后再确认',
          body: '恢复营业后，请再确认当日价格、技师阵容与房间安排；这些信息可能随场馆的实际营运而调整。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-01',
          caption: '氹仔帝湖水疗入口招牌，最直接呈现会所识别的一张照片。',
          alt: '氹仔帝湖水疗入口招牌',
        },
        {
          file: 'macau-sauna-spa-oceanic-gallery-202607-03',
          caption: '帝湖所在位置的夜景外观。',
          alt: '帝湖水疗夜景外观',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-11',
          caption: '帝湖水疗内的泳池与舞台空间。',
          alt: '帝湖水疗泳池与舞台空间',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-12',
          caption: '舞台灯光配宽敞空间，室内氛围更具戏剧感。',
          alt: '帝湖水疗舞台房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-07',
          caption: '会所休息厅，适合在一晚不同环节之间慢慢放松。',
          alt: '帝湖水疗休息厅',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-02',
          caption: '暖色调双床私人房，陈设简洁而安静。',
          alt: '帝湖水疗双床私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-08',
          caption: '直幅视角下的私人房间一隅。',
          alt: '帝湖水疗私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-09',
          caption: '低暖光营造的另一种主题房氛围。',
          alt: '帝湖水疗主题私人房',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-04',
          caption: '餐饮供应的一个画面，适合搭配长时间停留。',
          alt: '帝湖水疗餐饮',
        },
      ],
      overnightValue: '恢复营业后可过夜',
      overnightNote: '— 到访前请确认最新安排',
    },
  },
};

const ko: SpaPageCopy = {
  backHome: '홈으로 돌아가기',
  backToVenueList: '업소 목록으로 돌아가기',
  inquiry: {
    booking: '안녕하세요. {venue} 이용을 예약하고 싶습니다. 예약을 도와주실 수 있나요?',
    closed: '안녕하세요. {venue}의 임시 휴업 안내를 봤습니다. 비슷한 업소를 추천해 주실 수 있나요?',
  },
  alsoKnownAs: '다른 명칭:',
  labels: {
    referencePrice: '주요 패키지 가격대',
    separateServiceFee: '별도 서비스 요금',
    noSeparateSurcharge: '별도 부과 없음',
    priceDisclaimer:
      '코스, 룸, 세금 및 추가 항목에 따라 총액이 달라질 수 있으므로 방문 전 항목별 최종 견적을 확인하세요.',
    discountCta: '문의하여 할인 받기 →',
    staff: '테라피스트',
    staffValue: '다국적 테라피스트',
    staffTeam: '다국적 테라피스트 팀',
    hours: '영업시간',
    openAllDay: '24시간 영업',
    staffHours: '테라피스트:',
    website: '공식 웹사이트',
    overnight: '숙박',
    overnightAvailable: '숙박 가능',
    overnightUnavailable: '숙박 불가',
    overnightNoteAvailable: '',
    highlights: '하이라이트',
    bestFor: '이런 분께 추천',
    payment: '결제 방법',
    quickBook: '처음이신가요? 문의하여 예약하세요 — 무료 픽업 + 우대 가격',
    allContacts: '문의하여 할인 받기 →',
    features: '특징',
    gallery: '갤러리',
    viewLarger: '크게 보기',
    previousPhoto: '이전 사진',
    nextPhoto: '다음 사진',
    gallerySwipeHint: '좌우로 밀어 사진 보기',
    galleryPhotoCount: '사진 {total}장 중 {current}번째',
    flow: '이용 흐름',
    moreInfo: '더 궁금한 점이 있으신가요? 문의하시면 자세히 안내해 드립니다',
    related: '다른 인기 스파',
    learnMore: '자세히 보기',
    officialWebsite: '공식 웹사이트:',
  },
  paymentMethods: [
    '현금',
    '카드',
    '위챗',
    '알리페이',
  ],
  concierge: {
    title: '무료 귀가 차량도 준비되어 있습니다',
    body: '이용이 끝나면 — 식사 후, 서비스 직후, 언제든지 — 메시지 한 통만 보내주세요. 같은 고급 차량이 호텔, 공항, 페리 터미널 등 마카오 어디든 모셔다 드립니다. 픽업과 마찬가지로 완전 무료입니다.',
  },
  vipReminder: {
    title: '릴랙스 케어 2가지 무료 제공',
    body: '8가지 추가 케어 서비스 중 원하는 2가지를 무료로 이용하실 수 있습니다. 등밀이, 다리 마사지, 헤드 마사지, 발 마사지, 손톱 케어, 발톱 케어, 핸드 마사지, 귀 청소가 포함됩니다. 방문 예정 사실을 미리 업소에 전달하므로, 도착 후 원하는 케어 항목을 선택하시면 됩니다.',
    cta: '8가지 혜택 보기 →',
  },
  vipDrawer: {
    titleLead: '무료로 즐기는',
    titleAccent: '릴랙스 케어 2가지',
    note: '8가지 추가 케어 서비스 중 원하는 2가지를 무료로 이용하실 수 있습니다. 방문 예정 사실을 미리 업소에 전달하므로, 도착 후 원하는 케어 항목을 선택하시면 됩니다.',
    close: '무료 케어 항목 목록 닫기',
  },
  cta: {
    headingLead: '당신의',
    headingAccent: 'VIP 경험을 예약하세요',
    body: '메시지 한 통 보내주시면 나머지는 저희가 알아서 처리해 드립니다.',
  },
  breadcrumbHome: '홈',
  breadcrumbList: '스파',
  placeholder: {
    ktv: 'KTV 룸',
    themeRooms: '테마룸',
    overnight: '숙박 가능',
    open24h: '24시간 영업',
    noServiceFee: '서비스 요금 없음',
    peninsula: '마카오 반도',
    taipa: '타이파',
  },
  venues: {
    'clube-rio': {
      aliases: '클럽 리오, 클루브 리오 마카오, Rio KTV, 利澳薈, 마카오 나이트클럽 KTV, 마카오 비즈니스 KTV',
      highlights: [
        '2026년 7월 30일 그랜드 오픈',
        '마카오에서 드문 KTV 중심 클럽',
      ],
      bestFor: '친구들과 노래방을 즐기고 싶은 분',
      features: [
        '주류 무제한',
        '프라이빗 룸, 고급 사운드',
        '호텔 리오 3층',
      ],
      flow: [
        {
          title: '룸 예약',
          body: '인원과 희망 시간대를 알려주시고 저희를 통해 예약하세요. 오픈 초기에는 룸의 빈자리를 미리 확인하시는 것이 좋습니다.',
        },
        {
          title: '호텔 리오 도착',
          body: '신커우안(NAPE)의 호텔 리오 3층으로 오시면 됩니다. 각 출입경과 주요 호텔에서 가깝고, 저희가 무료 전용 차량도 배차해 드립니다. 예약자 성함을 말씀하시면 직원이 안내해 드립니다.',
        },
        {
          title: '새벽까지 이용',
          body: '새벽 4시까지 영업합니다. 노래, 술자리, 마사지를 본인 페이스에 맞춰 즐기세요. 숙박은 제공되지 않습니다 — 마친 후 신커우안에서 차량 이용이 편리하고, 귀가 차량 예약도 가능합니다.',
        },
        {
          title: '귀가 배차',
          body: '저희를 통해 예약하시면 무료 전용 차량(합승 아님)을 배차해 드립니다. 숙박이 필요한 경우 예약 시 문의해 주시면 적합한 방안을 안내해 드립니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-clube-rio-01-main-lounge',
          caption: '크리스털 샹들리에 아래에서 먼저 한잔 — 메인 라운지의 가죽 소파가 대리석 테이블을 감싸, 인원이 모이기 전 분위기를 돋우기에 좋습니다.',
          alt: '클루브 리오 메인 라운지 — 크리스털 샹들리에와 가죽 소파',
        },
        {
          file: 'macau-sauna-spa-clube-rio-02-vip-room-gold-leaf',
          caption: '금박 용·독수리 그림으로 장식된 VIP 룸에 사운드와 조명을 갖췄습니다.',
          alt: '클루브 리오 VIP 룸 — 금박 용·독수리 아트',
        },
        {
          file: 'macau-sauna-spa-clube-rio-03-party-room',
          caption: '친구들과 넓은 룸을 열어 마이크를 돌려가며 불러도 넉넉합니다. 사운드를 크게 틀고 새벽 4시까지 즐기세요.',
          alt: '클루브 리오 파티 룸',
        },
        {
          file: 'macau-sauna-spa-clube-rio-04-theme-room-orange',
          caption: '따뜻한 오렌지 톤에 명마 그림을 더한 룸 — 룸마다 개성이 달라 단골들은 매번 다른 룸, 다른 기분을 즐깁니다.',
          alt: '클루브 리오 테마 룸 — 오렌지 톤 인테리어',
        },
        {
          file: 'macau-sauna-spa-clube-rio-05-lounge-suite',
          caption: '거실과 룸이 분리된 스위트 구성 — 노래에 지치면 소파 공간에서 차를 마시며 쉴 수 있어 페이스 조절이 자유롭습니다.',
          alt: '클루브 리오 디럭스 스위트',
        },
        {
          file: 'macau-sauna-spa-clube-rio-06-reception',
          caption: '리셉션에는 항온 와인 캐비닛이 이어집니다. 예약자 성함을 말하면 바로 안내 — 대리석 로비에서 룸까지, 시작 전부터 VIP 기분입니다.',
          alt: '클루브 리오 리셉션 — 와인 캐비닛과 대리석 로비',
        },
        {
          file: 'macau-sauna-spa-clube-rio-07-corridor',
          caption: '방음문 너머로 각 방의 풍경이 다릅니다 — 복도를 따라 희미하게 들리는 다른 방의 노랫소리를 들으면 오늘 제대로 온 것을 알게 됩니다.',
          alt: '클루브 리오 룸 복도',
        },
        {
          file: 'macau-sauna-spa-clube-rio-08-vip-room-crystal-art',
          caption: '오렌지 퀼팅 소파와 호랑이·표범 크리스털 그림, 스피커와 은은한 조명을 갖춘 VIP 룸입니다.',
          alt: '클루브 리오 VIP 룸 — 크리스털 애니멀 아트와 골드 프레임 거울',
        },
        {
          file: 'macau-sauna-spa-clube-rio-09-lounge-suite-orange',
          caption: '오렌지·화이트 체크 커튼이 반쯤 드리워지고 긴 소파가 늘어선 공간 — 여럿이 번갈아 노래하고 건배해도 모두 자리가 있습니다.',
          alt: '클루브 리오 오렌지 스위트 — 체크 커튼과 블랙 골드 테이블',
        },
      ],
      website: {
        url: 'https://clube-rio.com',
        label: '클루브 리오 공식 웹사이트 ↗',
        display: 'clube-rio.com',
      },
    },
    'manhao-spa': {
      aliases: '만하오 사우나, 만하오 스파, 마카오 만하오 스파, Manhao Spa',
      highlights: [
        '2026 타이파 최신',
        '넓은 무대',
        '황제급 럭셔리 스타일',
      ],
      bestFor: '넓은 무대 / 타이파에서의 여유로운 휴식',
      features: [
        '2026년 5월 1일 타이파 그랜드 오픈',
        '넓은 무대 홀',
        '대리석 중심의 럭셔리 로비와 탈의실',
        '영업시간 14:00–04:00',
      ],
      flow: [
        {
          title: '그랜드뷰 호텔 도착',
          body: '만하오 스파는 타이파의 그랜드뷰 호텔(君怡酒店)에 있습니다 — 코타이에서 차로 5분 거리로, 타이파에서 가장 접근성 좋은 최신 럭셔리 사우나입니다. 대리석 배경 위 골드 크라운 MH 로고가 맞이하며, 프런트 등록 후 컨시어지가 손목밴드를 드립니다.',
        },
        {
          title: '럭셔리 탈의실',
          body: '탈의 공간에 들어서면 — 칼라카타 대리석 메인 벽, 골드 버클 맞춤 우드 락커, 패딩 벤치가 보입니다. 실용주의가 아닌 황제급 럭셔리로 통일된 하드웨어가 이후 경험의 수준을 예고합니다.',
        },
        {
          title: '목욕과 웻 구역',
          body: '목욕 구역은 다크 모자이크 타일과 그린 베인 대리석 조합으로, 여러 샤워 부스와 독립 풀을 갖추고 있습니다. 웻 구역 전체가 새로 만들어져 넓고, 서비스 전 여유롭게 몸을 담그기 좋습니다.',
        },
        {
          title: '다이닝 홀',
          body: '대리석 테이블의 다이닝 홀에서 무료 다과를 즐기세요 — 호텔급 좌석과 프라이빗 바 분위기로, 서비스 전후 천천히 즐기기에 적합합니다.',
        },
        {
          title: '넓은 무대',
          body: '만하오 스파의 대표 공간은 딥블루 네온과 여러 층의 유리 난간이 어우러진 넓은 무대 홀입니다. 웅장한 무대와 입체적인 조명이 조화를 이루며 시선을 끄는 공간을 완성합니다.',
        },
        {
          title: '60분 마사지',
          body: '60분 마사지로 여행과 일상에 지친 몸을 편안하게 풀어보세요. 조명과 음악을 취향에 맞게 조절하며 아늑한 분위기 속에서 여유롭게 쉴 수 있습니다.',
        },
        {
          title: '휴게 공간',
          body: '전용 스타라이트 휴게 구역으로 이동하세요 — 은은한 조명과 럭셔리 리클라이너로 서비스 후 휴식을 취할 수 있습니다. 영업시간은 14:00–04:00이며 현재 숙박은 제공되지 않습니다. 퇴장 시 프런트에서 결제하며 현금, 카드, 위챗페이, 알리페이를 사용할 수 있습니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-manhao-01-marble-gold-signage',
          caption: '상징적인 골드 크라운 MH 로고가 칼라카타 대리석 벽에 비칩니다 — 「황제의 품격」은 입구에서부터 드러납니다.',
          alt: '만하오 스파 골드 크라운 대리석 사이니지',
        },
        {
          file: 'macau-sauna-spa-manhao-02-blue-showcase-hall',
          caption: "여러 층으로 이어지는 유리 난간 통로에 짙은 푸른색 네온 조명을 더한 홀입니다.",
          alt: "만하오 스파 블루 조명과 유리 난간의 홀",
        },
        {
          file: 'macau-sauna-spa-manhao-04-mural-bedroom-suite',
          caption: '벽화 침실 스위트로 킹 침대, 소파, 은은한 스탠드를 갖춰 호텔급 편안함의 여유로운 휴식 공간을 완성합니다.',
          alt: '만하오 스파 벽화 침실 스위트',
        },
        {
          file: 'macau-sauna-spa-manhao-05-tree-mural-luxury-suite',
          caption: '나무 그림자 벽화의 럭셔리 스위트. 자연의 정취를 담은 벽면에 절제된 무드 조명을 더해 프라이빗한 은신처처럼 고요합니다.',
          alt: '만하오 스파 수목 벽화 럭셔리 스위트',
        },
        {
          file: 'macau-sauna-spa-manhao-06-marble-locker-room',
          caption: '탈의실은 칼라카타 대리석 메인 벽, 골드 버클 맞춤 우드 락커, 패딩 벤치로 품격의 기준을 세웁니다.',
          alt: '만하오 스파 대리석 탈의실',
        },
        {
          file: 'macau-sauna-spa-manhao-07-marble-shower-stalls',
          caption: '대리석 샤워 부스는 독립된 프라이빗 샤워 공간으로, 새롭고 깨끗한 설비를 갖춰 서비스 전 여유롭게 준비할 수 있습니다.',
          alt: '만하오 스파 대리석 샤워 부스',
        },
        {
          file: 'macau-sauna-spa-manhao-08-jacuzzi-bathing-zone',
          caption: '웻 구역은 다크 모자이크 타일과 그린 베인 대리석 조합, 넓은 독립 풀로 서비스 전 몸을 풀기에 좋습니다.',
          alt: '만하오 스파 웻 구역',
        },
        {
          file: 'macau-sauna-spa-manhao-09-dark-steam-shower-room',
          caption: '프라이빗한 다크 스팀 샤워룸. 새 설비가 조용히 몸을 담그는 웻 구역의 시간을 완성합니다.',
          alt: '만하오 스파 다크 스팀 샤워룸',
        },
        {
          file: 'macau-sauna-spa-manhao-10-marble-dining-bar',
          caption: '대리석 다이닝 홀은 호텔급 좌석과 프라이빗 바 분위기로, 무료 다과를 여유롭게 즐길 수 있습니다.',
          alt: '만하오 스파 대리석 다이닝 홀',
        },
        {
          file: 'macau-sauna-spa-manhao-11-starlight-recliner-lounge',
          caption: '전용 스타라이트 휴게 구역. 은은한 조명과 럭셔리 리클라이너로 서비스 전후 조용히 쉴 수 있습니다.',
          alt: '만하오 스파 스타라이트 휴게 구역',
        },
        {
          file: 'macau-sauna-spa-manhao-12-mural-corridor',
          caption: '벽화 회랑이 각 구역을 이어줍니다. 우아한 벽면 아트와 부드러운 조명이 부티크 호텔 같은 분위기를 완성합니다.',
          alt: '만하오 스파 벽화 회랑',
        },
      ],
      website: {
        url: 'https://manhaospa.com',
        label: '만하오 스파 공식 웹사이트 ↗',
        display: 'manhaospa.com',
      },
    },
    'number-nine-sauna': {
      aliases: '넘버 나인 사우나, 9호 사우나, 마카오 넘버 나인 스파, Number Nine Spa',
      highlights: [
        '2026년 4월 그랜드 오픈',
        '현대적인 무대 시설',
        '다양한 무드 테마룸',
        '발리식 + 일식 마사지',
      ],
      bestFor: '최신 매장을 먼저 경험하고 싶은 분',
      features: [
        '다양한 객실 디자인',
        '무대 조명',
        'LED 스크린',
        '현대적인 목욕 시설',
        '발리식 및 일본식 마사지',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '2026년 4월 그랜드 오픈한 넘버 나인 스파는 마카오 시내 로열 드래곤 호텔(御龍酒店) 안에 있습니다. 마카오에서 가장 최신 매장답게 모든 시설이 새것이며, 골드와 대리석 요소에 전문 조명 시스템을 결합한 모던 럭셔리 디자인입니다.',
        },
        {
          title: '목욕으로 휴식',
          body: '새로 단장한 모던 목욕·사우나 시설을 이용하세요. 탈의실은 우드 락커로 깔끔하게 정돈되어 있고, 목욕 구역은 그린 모자이크 타일로 꾸며 상쾌합니다.',
        },
        {
          title: '무료 다과',
          body: '다양한 식음료를 무료로 이용하세요. 매장은 다양한 고급 다이닝 선택지를 강조하며, 식사 경험을 전체 즐거움의 일부로 포함합니다.',
        },
        {
          title: '홀 시설',
          body: '홀에는 무대 조명과 LED 스크린이 설치되어 있으며, 금색 장식과 대리석 마감이 현대적인 분위기를 만듭니다.',
        },
        {
          title: '테마룸 선택',
          body: '넘버 나인에는 다양한 무드 테마룸이 있으며, 각 룸은 레드, 핑크 퍼플, 블루 퍼플 등 고유의 무드 조명과 스타 천장, 정교한 인테리어로 몰입감을 줍니다. 원형 킹 침대는 일부 룸의 특징입니다.',
        },
        {
          title: '60분 서비스',
          body: '발리식과 일식 마사지 두 가지 스타일을 선택할 수 있으며, 동남아시아와 일본의 마사지 기법을 결합합니다. 「독창적인 일식 + 발리 무드」를 내세워 전통 매장과 다른 서비스 경험을 제공합니다.',
        },
        {
          title: '휴식과 숙박',
          body: '야간 휴식이 가능하며, 새 시설이 쾌적함을 보장합니다. 신규 매장이라 초기에는 손님이 적어 조용합니다. 저희를 통해 예약하시면 최신 우대 가격을 안내해 드립니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-nine-01-modern-luxury-themed-suite',
          caption: '넘버 나인 스파의 대표 모던 럭셔리 테마 스위트. 부드러운 무드 조명에 정교한 골드 대리석 인테리어, 2026년 4월 그랜드 오픈한 마카오 최신 매장 중 하나입니다.',
          alt: '넘버 나인 스파 모던 럭셔리 테마 스위트',
        },
        {
          file: 'macau-sauna-spa-number-nine-02-red-theme-room',
          caption: '레드 무드의 원형 침대 테마룸. 스타 천장과 몰입형 조명이 톤을 정합니다 — 넘버 나인의 다양한 시추에이션 테마룸 중 하나입니다.',
          alt: '넘버 나인 스파 레드 원형 침대 테마룸',
        },
        {
          file: 'macau-sauna-spa-number-nine-03-aurora-bedroom-purple',
          caption: '퍼플 오로라 무드 테마룸. 부드러운 빛이 공간을 감싸 고요한 모던 럭셔리 분위기를 완성합니다.',
          alt: '넘버 나인 스파 퍼플 오로라 테마룸',
        },
        {
          file: 'macau-sauna-spa-number-nine-04-recliner-lounge',
          caption: '벽화 테마 휴게 홀. 부드러운 조명 아래 편안한 리클라이너가 서비스 전후 여유로운 휴식을 돕습니다.',
          alt: '넘버 나인 스파 벽화 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-number-nine-05-massage-chair-room',
          caption: '새로 마련된 안마의자 휴게 구역. 새 설비로, 프라이빗한 코너에서 몸과 마음을 풀 수 있습니다.',
          alt: '넘버 나인 스파 안마의자 휴게 구역',
        },
        {
          file: 'macau-sauna-spa-number-nine-06-premium-towel-locker',
          caption: '고급 우드 락커와 깔끔한 타월 구역. 새 시설이 정연하게 정돈되어 디테일에서 매장의 품격이 드러납니다.',
          alt: '넘버 나인 스파 고급 락커 타월 구역',
        },
        {
          file: 'macau-sauna-spa-number-nine-07-royal-dragon-exterior',
          caption: '넘버 나인 스파는 시내 로열 드래곤 호텔 안에 있어 위치가 편리하며, 입구에서부터 매장의 품격을 느낄 수 있습니다.',
          alt: '넘버 나인 스파 로열 드래곤 호텔 외관',
        },
        {
          file: 'macau-sauna-spa-number-nine-08-bath-wash-area',
          caption: '새로 단장한 목욕·샤워 구역. 깨끗한 새 설비의 상쾌한 웻 구역이 하루의 피로를 씻어줍니다.',
          alt: '넘버 나인 스파 목욕·샤워 구역',
        },
        {
          file: 'macau-sauna-spa-number-nine-09-purple-light-bedroom',
          caption: '퍼플 조명 무드의 테마 침실. 부드러운 조명과 정돈된 침구가 조용히 휴식을 권합니다.',
          alt: '넘버 나인 스파 퍼플 무드 침실',
        },
        {
          file: 'macau-sauna-spa-number-nine-10-ambient-themed-bedroom',
          caption: "별 모양 네온 배경과 전문 조명을 갖춘 메인 스테이지 홀입니다.",
          alt: '넘버 나인 스파 메인 스테이지 홀',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '품격 있는 다이닝 구역. 스테이크, 해산물, 국수 등 다양한 따뜻한 음식을 무료로 제공해 식사를 전체 즐거움의 일부로 만듭니다.',
          alt: '넘버 나인 스파 다이닝 구역',
        },
      ],
      website: {
        url: 'https://numberninespa.com',
        label: '넘버 나인 스파 공식 웹사이트 ↗',
        display: 'numberninespa.com',
      },
    },
    'shang-pin-spa': {
      aliases: '샹핀 스파, 샹핀 사우나, 마카오 샹핀 국제 스파, Shang Pin Spa',
      highlights: [
        '현대적인 입욕 시설',
      ],
      bestFor: '조용한 환경 / 현대적인 시설',
      features: [
        '추천 지수 {ratingStars}',
        '지정 마사지 또는 케어 서비스를 무료로 제공합니다. 제공 항목은 예약 시 확인해 주세요.',
        '국제적인 서비스 기준',
        '뛰어난 가성비',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '샹핀 스파는 리스보에타 호텔(葡京人) 안(코타이)에 있습니다. 전체 인테리어는 유러피언 모던 스타일로 현대적인 디자인 감각을 갖췄습니다. 프런트 등록 후 손목밴드를 받으세요.',
        },
        {
          title: '목욕으로 휴식',
          body: '목욕 시설은 새것처럼 관리되어 설비가 충실합니다. 욕조와 사우나가 밝고 깔끔해 전통 매장과는 확연히 다른 분위기입니다.',
        },
        {
          title: '무료 다과',
          body: '다양한 식음료를 무료로 이용하세요. 다이닝 구역은 매장 전체의 모던한 디자인과 조화를 이루는 쾌적한 환경입니다.',
        },
        {
          title: '객실 시설',
          body: '모든 룸에 독립 욕조가 있어 프라이버시가 높습니다.',
        },
        {
          title: '휴식과 숙박',
          body: "야간 휴식이 가능하며, 로비에 무료 리클라이너 휴게 구역이 있고 유료 독립 휴게실도 있습니다. 부티크 규모라 손님이 적어 조용하고 편안합니다.",
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: "코타이 리스보에타 마카오 안에 있는 샹핀 스파의 보랏빛 스테이지입니다.",
          alt: "샹핀 스파 퍼플 스테이지",
        },
        {
          file: 'macau-sauna-spa-elite-02-gold-signage-reception',
          caption: '골드 사이니지 프런트가 맞이합니다. 들어서는 순간 고급스러운 접객 품격이 느껴지는, 코타이 여행자에게 편리한 선택입니다.',
          alt: '샹핀 스파 골드 사이니지 프런트',
        },
        {
          file: 'macau-sauna-spa-elite-03-arched-door-lounge',
          caption: '아치 도어 디자인의 휴게 홀. 모던하고 화려한 인테리어에 부드러운 조명을 더해 서비스 전후 여유롭게 쉴 수 있습니다.',
          alt: '샹핀 스파 아치 도어 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-elite-04-porthole-mirror-stage',
          caption: "원형 창 모양 거울과 계단식 좌석을 갖춘 스테이지입니다.",
          alt: '샹핀 스파 미러 스테이지 계단',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '모던한 월풀 웻 구역으로, 밝고 깔끔한 입욕 환경입니다.',
          alt: '샹핀 스파 월풀 웻 구역',
        },
        {
          file: 'macau-sauna-spa-elite-06-blue-led-v88-corridor',
          caption: '블루 LED 무드 복도가 각 룸으로 이어지며, 높은 프라이버시 동선이 매장 전체를 관통합니다. 모던한 디자인 감각이 돋보입니다.',
          alt: '샹핀 스파 블루 라이트 복도',
        },
        {
          file: 'macau-sauna-spa-elite-07-marble-private-corridor',
          caption: '프라이빗 스위트로 이어지는 품격 있는 복도. 고요하고 프라이빗합니다.',
          alt: '샹핀 스파 프라이빗룸 복도',
        },
        {
          file: 'macau-sauna-spa-elite-08-mirror-headboard-bedroom',
          caption: '미러 헤드보드 테마 침실. 모던하고 화려한 인테리어로 프라이빗하면서도 편안합니다.',
          alt: '샹핀 스파 미러 헤드보드 침실',
        },
        {
          file: 'macau-sauna-spa-elite-09-starlight-magenta-bedroom',
          caption: '스타라이트 천장에 마젠타 조명을 더한 특별한 침실. 로맨틱한 분위기에 새 설비를 갖췄습니다.',
          alt: '샹핀 스파 스타라이트 마젠타 침실',
        },
        {
          file: 'macau-sauna-spa-elite-10-wide-recliner-theatre',
          caption: '넓은 리클라이너 휴게 홀. 야간에는 무료 리클라이너에서 아침까지 편안히 쉴 수 있습니다.',
          alt: '샹핀 스파 리클라이너 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-elite-11-selection-stage',
          caption: "샹핀 스파 내부의 아담한 스테이지 공간입니다.",
          alt: "샹핀 스파 스테이지 공간",
        },
        {
          file: 'macau-sauna-spa-elite-12-massage-chair-rest-area',
          caption: '안마의자 휴게 구역. 무료 다과와 음료를 곁들여 조용하고 편안하게 쉴 수 있는 공간입니다.',
          alt: '샹핀 스파 안마의자 휴게 구역',
        },
      ],
      website: {
        url: 'https://shangpinspa.com',
        label: '샹핀 스파 공식 웹사이트 ↗',
        display: 'shangpinspa.com',
      },
    },
    'majesty-spa': {
      aliases: '마제스티 사우나, 마카오 마제스티 스파, Majesty Spa, 尊貴水療',
      highlights: [
        '가장 럭셔리한 인테리어',
        '가장 넓은 객실',
        '서비스 요금 없음',
      ],
      bestFor: '럭셔리한 환경 / 야간 휴식을 원하는 분',
      features: [
        '마카오에서 가장 럭셔리한 인테리어',
        '10가지가 넘는 다양한 스타일의 객실',
        'KTV 룸 파티 모드',
        '24시간 영업',
        '서비스 요금 없음',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '마제스티 스파에 도착하세요 — 마카오에서 인테리어가 가장 럭셔리한 사우나입니다. 골드와 대리석 요소가 매장 전체를 관통해 첫눈에 최고급 클럽의 품격을 느낄 수 있습니다. 프런트 등록 후 손목밴드를 받으세요.',
        },
        {
          title: '목욕으로 휴식',
          body: '럭셔리한 목욕 시설과 사우나를 이용하세요. 넓은 욕조와 부드러운 조명으로 전체 분위기가 우아하고 대담합니다. 마카오에서 하드웨어 구성이 가장 뛰어난 매장이니 목욕 경험을 충분히 즐기시길 권합니다.',
        },
        {
          title: '무료 다과',
          body: '스테이크, 신선한 과일, 시원한 맥주 등을 무료로 즐기세요. 식재료와 메뉴 선택이 풍부하고, 마제스티의 다이닝 퀄리티는 업계에서 호평받으며 전 시간 무제한으로 제공됩니다.',
        },
        {
          title: "마사지 패키지 선택",
          body: "프런트에서 이용 가능한 마사지 패키지와 소요 시간, 포함 항목을 안내받고 총요금을 확인한 뒤 선택하세요.",
        },
        {
          title: '요금 확인',
          body: '가격대는 MOP 2,799 – 6,699입니다.',
        },
        {
          title: '60분 마사지',
          body: '넓고 편안한 객실에서 60분 마사지를 받으며 쉬어 갈 수 있습니다. 부드러운 조명과 가구가 차분한 분위기를 더합니다. 시작 전에 마사지 내용과 요금을 확인해 주세요.',
        },
        {
          title: '휴식과 숙박',
          body: '마제스티는 24시간 영업에 야간 휴식 가능 — 로비에 무료 리클라이너 휴게 구역이 있고, 성수기에는 유료 독립 휴게실도 선택할 수 있습니다. 무료 다과와 함께 편안한 야간 휴식을 보내는 선택입니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-majesty-01-ktv-party-room',
          caption: '마제스티 스파 대표 KTV 파티룸. 마카오에서 KTV를 갖춘 단 두 곳 중 하나로, 럭셔리한 룸에서 밤새 신나게 즐기기에 좋습니다.',
          alt: '마제스티 스파 KTV 파티룸',
        },
        {
          file: 'macau-sauna-spa-majesty-02-majesty-entrance-signage',
          caption: '차분한 품격의 입구 사이니지. 도착하는 순간 톤이 정해집니다 — 이곳은 마카오에서 가장 럭셔리한 클럽입니다.',
          alt: '마제스티 스파 입구 사이니지',
        },
        {
          file: 'macau-sauna-spa-majesty-03-gold-chandelier-bath-pool',
          caption: '골드 샹들리에 아래 럭셔리 욕조. 넓은 웻 구역에 부드러운 무드 조명을 더해, 시작 전 천천히 즐기기 좋은 최고급 하드웨어입니다.',
          alt: '마제스티 스파 골드 샹들리에 욕조',
        },
        {
          file: 'macau-sauna-spa-majesty-04-curved-wood-corridor',
          caption: '곡선 우드 복도가 각 테마 스위트를 이어줍니다. 부드러운 조명과 곡선 디자인이 고요하고 프라이빗한 동선을 만듭니다.',
          alt: '마제스티 스파 곡선 우드 복도',
        },
        {
          file: 'macau-sauna-spa-majesty-05-chinese-marriage-bed-room',
          caption: '중국 전통 혼례 침대 테마룸. 전통 조각 침대에 레드·골드 장식을 더한, 10여 종의 정교한 테마룸 중 하나입니다.',
          alt: '마제스티 스파 중국 전통 혼례 침대 테마룸',
        },
        {
          file: 'macau-sauna-spa-majesty-06-egypt-pharaoh-room',
          caption: '이집트 파라오 테마룸. 골드 벽 장식과 신전 같은 분위기로, 다양한 테마 디자인의 아이디어를 엿볼 수 있습니다.',
          alt: '마제스티 스파 이집트 파라오 테마룸',
        },
        {
          file: 'macau-sauna-spa-majesty-07-gym-boxing-theme-room',
          caption: '피트니스 복싱 테마룸. 스포츠 스타일의 독특한 구성으로, 10여 종 테마 스위트에 재미있는 선택지를 더합니다.',
          alt: '마제스티 스파 피트니스 복싱 테마룸',
        },
      ],
      website: {
        url: 'https://majestysauna.com',
        label: '마제스티 스파 공식 웹사이트 ↗',
        display: 'majestysauna.com',
      },
    },
    'the-excellent-sauna': {
      aliases: '마카오 디 엑설런트 사우나, The Excellent Sauna, 極品桑拿',
      highlights: [
        '그랜드 엠퍼러 호텔 본관',
        '다양한 스타일의 객실',
      ],
      bestFor: '시간이 유동적인 분 / 테마 체험',
      features: [
        '그랜드 엠퍼러 호텔 본관',
        '새로운 테마룸',
        '다양한 특색 테마',
        'DJ룸 체험',
        '24시간 영업 및 야간 휴게 구역',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '그랜드 엠퍼러 호텔 본관 안의 디 엑설런트 사우나에 도착하세요. 24시간 영업이며 테라피스트 시간은 13:00 – 05:00입니다. 프런트 등록 후 먼저 목욕을 하고, 부티크형 매장의 조용한 분위기를 본인 페이스로 즐기세요.',
        },
        {
          title: '목욕으로 휴식',
          body: '목욕 시설과 사우나로 몸과 마음을 풀어보세요. 디 엑설런트는 비교적 조용하고 한적해 손님이 적어, 대형 매장 특유의 시끄러움이 없습니다.',
        },
        {
          title: '무료 다과',
          body: '24시간 다양한 식음료를 무료로 이용할 수 있어, 오후든 심야든 본인 시간에 맞춰 식사할 수 있습니다.',
        },
        {
          title: '마사지 상담',
          body: '집중적으로 풀고 싶은 부위와 원하는 마사지 강도를 접수처에 알려 주세요. 이용 가능한 마사지 종류, 시간, 요금을 확인한 뒤 일정을 정할 수 있습니다.',
        },
        {
          title: '60분 마사지',
          body: '마사지 시간은 약 60분이며, 서비스 요금 10%가 별도로 부과됩니다. 태국식과 상하이식 마사지를 제공하며, 시작 전에 마사지 방식과 강도, 비용을 확인해 주세요.',
        },
        {
          title: '휴식과 숙박',
          body: '서비스 후 조용하고 편안한 24시간 휴게 구역에서 쉬거나, 본인 페이스로 야간 휴식을 보낼 수 있습니다. 퇴장 전 프런트에서 결제하면 됩니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-excellent-01-blue-bathing-pool',
          caption: '디 엑설런트 사우나의 대표 욕조가 블루 톤 조명 아래 은은하게 빛납니다. 넓은 웻 구역에서 들어서는 순간 마음이 차분해지는 조용한 입욕 시간을 즐기세요.',
          alt: '디 엑설런트 사우나 블루 욕조',
        },
        {
          file: 'macau-sauna-spa-excellent-02-ambulance-theme-room',
          caption: '디 엑설런트 사우나에 새로 마련된 병원 테마의 객실입니다.',
          alt: '디 엑설런트 사우나 병원 테마룸',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '패턴 타일 복도가 각 시추에이션 테마룸을 이어줍니다. 부드러운 조명이 DJ룸, 오피스, 시네마 등의 룸으로 안내합니다.',
          alt: '디 엑설런트 사우나 테마룸 복도',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: "가죽 헤드보드와 조명, 호텔식 침구를 갖춘 스위트입니다.",
          alt: '디 엑설런트 사우나 레더 헤드보드 스위트',
        },
        {
          file: 'macau-sauna-spa-excellent-06-mirror-vanity-area',
          caption: '밝은 화장 거울 구역은 비품이 깔끔하고 조명이 부드러워, 서비스 전후 단장하기에 편합니다.',
          alt: '디 엑설런트 사우나 화장 거울 구역',
        },
        {
          file: 'macau-sauna-spa-excellent-07-wood-locker-room',
          caption: '우드 톤 탈의실은 개별 락커를 갖춘 깔끔한 환경으로, 입장 시 안심하고 프라이빗하게 갈아입을 수 있습니다.',
          alt: '디 엑설런트 사우나 우드 탈의실',
        },
        {
          file: 'macau-sauna-spa-excellent-08-diamond-accent-rest-area',
          caption: '다이아 장식 벽면의 휴게 구역은 부드러운 조명과 편안한 좌석으로, 휴식은 물론 야간 휴식도 가능합니다.',
          alt: '디 엑설런트 사우나 다이아 휴게 구역',
        },
        {
          file: 'macau-sauna-spa-excellent-09-purple-vip-lounge',
          caption: '퍼플 톤 무드의 VIP 휴게 홀은 소파가 부드럽고 구성이 프라이빗해, 서비스 전후 편안히 쉴 수 있습니다.',
          alt: '디 엑설런트 사우나 퍼플 VIP 홀',
        },
        {
          file: 'macau-sauna-spa-excellent-10-recliner-reception-lounge',
          caption: '리클라이너 접객 홀은 좌석이 넓고 조명이 부드러워, 로비 야간 휴게 공간으로도 활용됩니다.',
          alt: '디 엑설런트 사우나 리클라이너 접객 홀',
        },
        {
          file: 'macau-sauna-spa-excellent-11-marble-dining-area',
          caption: '대리석 다이닝 구역은 24시간 무료 따뜻한 음식을 제공합니다. 스테이크, 해산물, 국수 등 어느 시간대든 드실 수 있습니다.',
          alt: '디 엑설런트 사우나 대리석 다이닝 구역',
        },
        {
          file: 'macau-sauna-spa-excellent-12-themed-scene-suite',
          caption: '시추에이션 테마 스위트는 부드러운 무드 조명과 특색 있는 구성으로, 디 엑설런트의 여러 일식 테마룸 중 하나입니다.',
          alt: '디 엑설런트 사우나 시추에이션 테마 스위트',
        },
      ],
      website: {
        url: 'https://excellentsauna.com',
        label: '디 엑설런트 사우나 공식 웹사이트 ↗',
        display: 'excellentsauna.com',
      },
    },
    'empire-sauna': {
      aliases: '엠파이어 사우나, 마카오 엠파이어 사우나, Empire Sauna, 巨亨桑拿',
      highlights: [
        '2026년 최신 오픈',
        '알려진 인테리어 비용: 미화 1,000달러',
        '호텔 스위트',
      ],
      bestFor: '최신 럭셔리 / 호텔 스위트를 원하는 분',
      features: [
        '2026년 4월 개업',
        '알려진 인테리어 비용: 미화 1,000달러',
        '호텔급 스위트',
        '24시간 영업, 야간 휴식 가능',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '엠파이어 사우나에 도착하세요 — 마카오 반도 최신의 최고급 사우나 클럽입니다. 로비와 계단 입구에서 이미 전체 품격이 드러납니다 — 동양의 선(禪)적 라인에 모던 럭셔리 인테리어, 모든 시설이 새것입니다. 프런트 등록 후 컨시어지가 손목밴드를 드립니다.',
        },
        {
          title: '목욕으로 휴식',
          body: '대표 대리석 욕조에 들어서세요 — 부드러운 무드 조명과 넓은 공간, 리조트급 스파에 견줄 만한 고요한 분위기로 마카오 사우나에서는 드문 수준입니다. 완비된 사우나룸을 포함한 웻 구역 전체가 새로 만들어진 매장의 비주얼 중심입니다.',
        },
        {
          title: '다이닝 홀',
          body: '다이닝 홀에서 무료 다과를 즐기세요. 호텔급 인테리어로 전통 사우나 식당 분위기가 아니며, 고요하고 프라이빗한 환경에 편안한 좌석을 갖춰 서비스 전후 여유롭게 이용할 수 있습니다.',
        },
        {
          title: '마사지 내용과 요금 확인',
          body: '접수처에서 마사지 종류, 소요 시간, 요금 내역을 확인한 뒤 필요에 맞게 선택하세요. 참고 요금은 MOP 2,488~7,388이며, 이용 전에 서비스 내용과 총금액을 확인해 주세요.',
        },
        {
          title: '60분 마사지',
          body: '마사지 시간은 60분입니다. 구체적인 마사지 방식과 이용 절차는 미리 접수처에 문의하세요. 객실에는 욕조가 있으며 조명과 음향을 조절해 편안한 분위기를 만들 수 있습니다.',
        },
        {
          title: '휴식과 숙박',
          body: '서비스 후 독립 휴게 구역으로 이동하세요 — 은은한 조명과 고요한 환경으로, 잠깐의 휴식이 아닌 실제 수면을 위해 설계되었습니다. 야간 휴식을 환영하며, 그동안 웻 구역, 다이닝 홀, 휴게 구역이 계속 열립니다.',
        },
        {
          title: '다음 날 퇴장',
          body: '프런트에서 퇴장 수속을 하세요. 엠파이어 사우나는 현금, 카드, 위챗페이, 알리페이를 받습니다. 저희를 통해 미리 예약하셨다면, 본 사이트 전용 혜택(무료 추가 시술, 무료 픽업, 입장료 면제)이 퇴장 시 정확히 정산됩니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-empire-01-twin-marble-bath-pools',
          caption: '엠파이어 사우나의 대리석 욕조에 몸을 담그면, 따뜻한 물과 부드러운 빛 사이로 하루의 피로가 스르륵 풀립니다.',
          alt: '엠파이어 사우나 대리석 욕조',
        },
        {
          file: 'macau-sauna-spa-empire-02-grand-lobby-photo-wall',
          caption: '로비에 들어서면 번잡함이 멈춥니다. 도착 후 처음으로 긴장을 푸는 한 호흡의 공간입니다.',
          alt: '엠파이어 사우나 로비 포토 월',
        },
        {
          file: 'macau-sauna-spa-empire-03-marble-entry-staircase',
          caption: '대리석 계단을 따라 한 걸음씩 오르며, 더 깊은 고요함으로 들어갑니다.',
          alt: '엠파이어 사우나 대리석 계단',
        },
        {
          file: 'macau-sauna-spa-empire-04-white-marble-treatment-room',
          caption: '흰 대리석 벽과 촛불, 따뜻한 조명이 어우러진 스위트룸입니다.',
          alt: '엠파이어 사우나 대리석 테마 스위트',
        },
        {
          file: 'macau-sauna-spa-empire-06-gold-ceiling-marble-suite',
          caption: '골드 천장 스위트가 맞춤 조명 아래 따뜻하게 빛나고, 호텔급 침구가 당신을 기다립니다.',
          alt: '엠파이어 사우나 골드 천장 대리석 스위트',
        },
        {
          file: 'macau-sauna-spa-empire-07-dark-marble-private-wash-room',
          caption: '다크 대리석 프라이빗 샤워룸에서 샤워하며, 나만의 깨끗하고 프라이빗한 공간을 누리세요.',
          alt: '엠파이어 사우나 프라이빗 샤워룸',
        },
        {
          file: 'macau-sauna-spa-empire-08-forest-mural-bedroom',
          caption: '포레스트 벽화 침실에서 멍하니 쉬어보세요. 부드러운 빛과 자연의 정취가 함께합니다.',
          alt: '엠파이어 사우나 포레스트 테마룸',
        },
        {
          file: 'macau-sauna-spa-empire-09-chandelier-recliner-lounge',
          caption: '크리스털 샹들리에 아래 리클라이너에 몸을 맡기고 잠시 쉬세요. 서비스 전후 모두 편안합니다.',
          alt: '엠파이어 사우나 크리스털 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-empire-10-marble-cafe-lounge',
          caption: '대리석 다이닝 구역에서 나만의 조용한 코너를 즐기세요.',
          alt: '엠파이어 사우나 대리석 다이닝 구역',
        },
        {
          file: 'macau-sauna-spa-empire-11-purple-led-dining-hall',
          caption: '무드 조명의 다이닝 홀에서 스테이크, 해산물, 따뜻한 음식을 마음껏 드세요. 전부 무료입니다.',
          alt: '엠파이어 사우나 다이닝 홀',
        },
        {
          file: 'macau-sauna-spa-empire-12-atrium-restaurant',
          caption: '탁 트인 아트리움 레스토랑에서 천천히 식사하세요. 무료 요리는 서두를 필요가 없습니다.',
          alt: '엠파이어 사우나 아트리움 레스토랑',
        },
      ],
      website: {
        url: 'https://empiresauna.com',
        label: '엠파이어 사우나 공식 웹사이트 ↗',
        display: 'empiresauna.com',
      },
    },
    'east-castle-spa': {
      aliases: '이스트 캐슬, 이스트 캐슬 스파, 마카오 이스트 캐슬, East Castle Spa, 東方皇堡',
      highlights: [
        '20종 이상의 다양한 객실 디자인',
      ],
      bestFor: '다양한 스타일의 객실 디자인 체험',
      features: [
        '20종 이상의 객실 디자인',
        '전문 서비스 팀',
        '24시간 영업',
        '넓은 목욕 구역과 휴게 공간',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '이스트 캐슬 스파에 도착하세요 — 마카오 테마룸의 원조입니다. 프런트 등록 후 손목밴드를 받으세요. 참고 가격은 MOP 2,388 – 6,498이며, 세부 항목은 예약 시 확인해 주세요.',
        },
        {
          title: '목욕으로 휴식',
          body: '목욕 시설과 사우나를 자신의 속도에 맞춰 이용하며 여행 중 쌓인 피로를 풀어 보세요.',
        },
        {
          title: '무료 다과',
          body: '무료 식음료가 제공됩니다. 식사 공간에서 잠시 쉬며 다음 일정을 계획해 보세요.',
        },
        {
          title: '마사지 이용 확인',
          body: '접수처에서 마사지 종류, 예약 가능한 시간, 객실 상황을 확인하세요. 이용 전에 서비스 내용과 소요 시간, 요금 내역을 확인한 뒤 일정에 맞게 선택할 수 있습니다.',
        },
        {
          title: '20종 이상의 다양한 객실 디자인',
          body: '이스트 캐슬 스파의 특징 중 하나는 20종 이상의 다양한 객실 디자인입니다. 각기 다른 인테리어와 분위기를 갖춰, 취향에 맞는 공간에서 마사지를 받으며 쉴 수 있습니다.',
        },
        {
          title: '서비스 요금과 세금',
          body: '10% 서비스 요금과 5% 관광세가 별도입니다.',
        },
        {
          title: '휴식과 숙박',
          body: '로비에 리클라이너가 있어 야간 휴식이 가능합니다. 이스트 캐슬의 핵심 경험은 휴게 시설이 아닌 테마룸이므로, 야간 휴식의 편안함이 최우선이라면 마제스티 스파를 권합니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: '이스트 캐슬 스파의 피트니스 테마룸에 운동 기구와 소품을 갖췄습니다.',
          alt: '이스트 캐슬 피트니스 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: '로비에 들어서면 LED 브랜드 월과 품격 있는 조명이 어우러져, 입장부터 테마 매장의 정교한 디자인을 만납니다.',
          alt: '이스트 캐슬 로비 브랜드 월',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: "화려한 조명을 갖춘 넓은 욕조 공간입니다.",
          alt: '이스트 캐슬 LED 스테이지 욕조',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '책상, 칠판 등 교실 세트와 소품을 갖춘 테마룸입니다.',
          alt: '이스트 캐슬 교실 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: '병원 병동 테마룸. 병상과 의료 세트를 정밀하게 재현해 몰입감이 충만합니다.',
          alt: '이스트 캐슬 병원 병동 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-06-eye-exam-medical-room',
          caption: '시력 검사 메디컬 테마룸. 전문 의료 세트와 소품으로, 이스트 캐슬 스파의 20여 가지 테마 장면 중 하나입니다.',
          alt: '이스트 캐슬 시력 검사 메디컬 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-07-jail-bars-room',
          caption: '감옥 철창 테마룸. 실감 나는 세트로 심문실 장면을 재현해 스릴이 넘칩니다.',
          alt: '이스트 캐슬 감옥 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-08-airplane-cabin-room',
          caption: '객실 좌석과 세부 장식을 재현한 비행기 객실 테마룸입니다.',
          alt: '이스트 캐슬 비행기 객실 테마룸',
        },
        {
          file: 'macau-sauna-spa-east-castle-09-ufc-octagon-room',
          caption: '옥타곤 복싱장을 재현한 스포츠 테마룸입니다.',
          alt: '이스트 캐슬 복싱장 테마룸',
        },
      ],
    },
    'victoria-sauna': {
      aliases: '빅토리아 사우나, 마카오 빅토리아 사우나, Victoria Sauna, 凱旋桑拿',
      highlights: [
        '조용하고 정교한 환경',
        '세심하고 친절한 서비스',
        '새벽 3시 이후 무료 독립 휴게실',
      ],
      bestFor: '조용하고 넓은 공간, 야간 휴식에 가장 추천',
      features: [
        '서비스 퀄리티 중시',
        '넓은 휴게 공간',
        '조용한 휴식 환경',
        '야간 휴식 추천',
        '24시간 영업',
      ],
      flow: [
        {
          title: '도착과 입장',
          body: '그랜드 리스보아 인근 빅토리아 호텔(凱旋門酒店) 5층의 빅토리아 사우나에 도착하세요. 마카오 반도 중심부로 MGM, 윈, 그랜드 리스보아와 가깝습니다. 프런트 등록 후 손목밴드를 받으며, 매장 전체가 조용하고 프라이빗합니다.',
        },
        {
          title: '목욕으로 휴식',
          body: '목욕 시설과 사우나를 조용하고 깔끔한 환경에서 이용하세요. 빅토리아는 의도적으로 손님 수를 조절해, 붐비는 시간대에도 복잡함을 느끼지 않습니다.',
        },
        {
          title: '무료 다과',
          body: '다양한 식음료를 무료로 이용하세요. 대형 매장처럼 시끄럽지 않고 조용하고 편안한 다이닝 환경입니다.',
        },
        {
          title: "마사지 패키지 상담",
          body: "원하는 마사지 종류와 이용 가능한 시간, 예산을 프런트에 알려 주세요. 일정에 맞는 패키지와 각 패키지에 포함된 항목을 확인할 수 있습니다.",
        },
        {
          title: "마사지 패키지 확인",
          body: "시작 전에 마사지 종류와 소요 시간, 총요금을 확인하세요. 가격대는 MOP 2,298 – 6,998이며 10% 서비스 요금이 별도입니다.",
        },
        {
          title: "60분 마사지",
          body: "안내된 마사지 시간은 약 60분입니다. 시작 전에 프런트에서 마사지 종류, 실제 소요 시간과 세부 요금을 확인해 주세요.",
        },
        {
          title: '휴식과 숙박',
          body: '조용하고 프라이빗한 환경으로, 마카오에서 조용한 휴식과 야간 휴식에 가장 적합한 매장 중 하나입니다. 로비에 많은 리클라이너가 있고 손님이 적고 소음이 낮아, 프라이빗하고 고요함을 원하는 손님에게 적합합니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-victoria-01-massage-chair-row',
          caption: '빅토리아 사우나의 안마의자가 늘어선 휴게 공간. 조용하고 넓으며 붐비지 않는, 숨은 보석 매장의 대표적인 모습입니다.',
          alt: '빅토리아 사우나 안마의자가 늘어선 휴게 공간',
        },
        {
          file: 'macau-sauna-spa-victoria-02-hotel-exterior-night',
          caption: '빅토리아 호텔에 위치해 마카오 반도 중심부에 있으며, MGM, 윈, 그랜드 리스보아까지 걸어갈 수 있습니다.',
          alt: '빅토리아 호텔 야간 외관',
        },
        {
          file: 'macau-sauna-spa-victoria-03-catwalk-show-stage',
          caption: "부드러운 조명으로 밝힌 스테이지입니다.",
          alt: "빅토리아 사우나 스테이지",
        },
        {
          file: 'macau-sauna-spa-victoria-04-mosaic-jacuzzi-pool',
          caption: '모자이크 월풀이 넓은 대형 욕장 중심에 있어, 고요한 분위기에서 천천히 몸을 담그기에 가장 좋습니다.',
          alt: '빅토리아 사우나 모자이크 월풀',
        },
        {
          file: 'macau-sauna-spa-victoria-05-black-marble-corridor',
          caption: '블랙 대리석 복도는 간결한 품격으로, 부드러운 조명이 각 구역으로의 프라이빗 동선을 안내합니다.',
          alt: '빅토리아 사우나 블랙 대리석 복도',
        },
        {
          file: 'macau-sauna-spa-victoria-06-wood-locker-room',
          caption: '우드 탈의실은 깔끔하고 넓어, 쾌적하고 편안한 입장의 첫걸음을 만듭니다.',
          alt: '빅토리아 사우나 우드 탈의실',
        },
        {
          file: 'macau-sauna-spa-victoria-07-premium-recliner-lounge',
          caption: '프리미엄 리클라이너 휴게 홀은 넓고 안정적이며, 빅토리아 사우나의 야간 휴식 추천 이유가 되는 이상적인 휴식 공간입니다.',
          alt: '빅토리아 사우나 프리미엄 리클라이너 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: "편안한 좌석 구역이 스테이지를 향해 있습니다.",
          alt: "빅토리아 사우나 스테이지 앞 좌석",
        },
      ],
    },
    'm-club': {
      aliases: 'M 클럽, 마카오 M 클럽, M Club Macau, 晉會',
      highlights: [
        '이스트 캐슬의 자매 매장',
        'KTV',
        '온천룸',
        '더 럭셔리한 인테리어',
      ],
      bestFor: '과거 시설 안내 · 임시 휴업',
      features: [
        '미래적인 인테리어',
        '다양한 객실 디자인',
        'KTV룸',
        '목욕 시설',
        '임시 휴업',
      ],
      flow: [
        {
          title: '임시 휴업',
          body: 'MCLUB은 현재 휴업 중으로 방문객이나 예약을 받지 않습니다. 아래 내용은 과거 시설에 관한 안내입니다.',
        },
        {
          title: '시설과 객실',
          body: '동방황보 스파의 자매 업장으로, 다양한 스타일의 객실과 KTV룸, 목욕 시설을 갖추고 있었습니다.',
        },
        {
          title: '목욕 및 식사 시설',
          body: '미래적인 인테리어의 목욕탕, 사우나, 식사 공간이 있었습니다. 현재는 해당 시설을 이용할 수 없습니다.',
        },
        {
          title: '과거 요금 안내',
          body: '과거에는 서비스 요금 10%가 별도로 부과되었습니다. 현재 요금이나 예약 상품이 아닌 과거 기록입니다.',
        },
        {
          title: '휴식 시설',
          body: '과거 로비에 리클라이너 휴식 공간이 있었습니다. 휴업 중에는 숙박할 수 없으며, 영업 재개 여부는 업장의 최신 공지를 확인해 주세요.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-mclub-01-sports-tv-lounge',
          caption: 'M 클럽 대표 스포츠 TV 휴게 홀. 사이버펑크 테크 감성에 대형 스크린 라이브를 더해, 서비스 전후 여유롭게 쉴 수 있습니다.',
          alt: 'M 클럽 스포츠 TV 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-mclub-02-golf-cart-theme-room',
          caption: '골프 테마룸. 카트 조형에 테마 장면 구성을 더한, 여러 몰입형 테마 스위트 중 하나로 방문할 때마다 다른 장면을 만납니다.',
          alt: 'M 클럽 골프 테마룸',
        },
        {
          file: 'macau-sauna-spa-mclub-03-neon-mirror-corridor',
          caption: '네온 회랑. 사이버펑크 조명이 깔린, 마카오에서 가장 테크 감성 넘치는 매장 동선이 펼쳐집니다.',
          alt: 'M 클럽 네온 미러 회랑',
        },
        {
          file: 'macau-sauna-spa-mclub-04-marble-locker-room',
          caption: '대리석 탈의실. 깔끔하고 프라이빗한 탈의 공간으로, 미래지향적 인테리어가 구석구석 이어집니다.',
          alt: 'M 클럽 대리석 탈의실',
        },
        {
          file: 'macau-sauna-spa-mclub-05-ktv-panoramic-room',
          caption: '파노라마 KTV룸이 대표 파티 모드를 이끕니다. 마카오에서 KTV를 갖춘 단 두 곳 중 하나입니다.',
          alt: 'M 클럽 파노라마 KTV룸',
        },
        {
          file: 'macau-sauna-spa-mclub-06-ktv-private-lounge',
          caption: "대형 스크린과 좌석을 갖춘 노래방 라운지입니다.",
          alt: 'M 클럽 대형 스크린 KTV 홀',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: '갤럭시 오로라 테마 침실. 오로라 무드 조명이 테크 감성을 극대화하는, 대표 플래닛 시리즈 장면 중 하나입니다.',
          alt: 'M 클럽 갤럭시 오로라룸',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: "일본식 인테리어로 꾸민 목욕 공간입니다.",
          alt: 'M 클럽 재패니즈 온천룸',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: "당구대를 갖춘 방입니다.",
          alt: 'M 클럽 당구 테마 스위트',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '레이싱 게임룸. 미래 테크 인테리어에 게임 장비를 갖춘 사이버펑크 플레이 체험입니다.',
          alt: 'M 클럽 레이싱 게임룸',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: '다트 게임 휴게 홀. 엔터테인먼트 시설을 완비한, 테크 감성 인테리어 속 편안한 소셜 공간입니다.',
          alt: 'M 클럽 다트 게임 홀',
        },
        {
          file: 'macau-sauna-spa-mclub-15-neon-m-logo-entrance',
          caption: '네온 M 로고 입구. 사이버펑크 파사드 품격으로, 입구에서 마카오에서 가장 테크 감성 넘치는 매장을 만납니다.',
          alt: 'M 클럽 네온 M 로고 입구',
        },
      ],
    },
    'number-one-sauna': {
      aliases: '넘버 원 사우나, 1호 사우나, 마카오 넘버 원 사우나, The One Sauna, 壹號桑拿',
      highlights: [
        '넓은 탈의실',
        '월풀 욕조',
        '건식·습식 사우나',
        '과거 식사 시설',
      ],
      bestFor: '과거 시설 안내 · 임시 휴업',
      features: [
        '목욕 시설',
        '넓은 홀',
        '사물함',
        '휴식 공간',
        '임시 휴업',
      ],
      flow: [
        {
          title: '임시 휴업',
          body: '일호 사우나는 현재 휴업 중으로 방문객이나 예약을 받지 않습니다. 아래 내용은 과거 시설에 관한 기록입니다.',
        },
        {
          title: '목욕 및 탈의 시설',
          body: '과거에는 넓은 탈의실, 사물함, 대형 월풀 욕조, 건식 사우나와 습식 사우나가 마련되어 있었습니다.',
        },
        {
          title: '식사 공간',
          body: '과거 넓은 식사 공간에서 스테이크, 볶음밥, 면 요리, 과일, 음료 등을 제공했습니다. 현재는 식사 서비스를 운영하지 않습니다.',
        },
        {
          title: '과거 요금',
          body: '기록된 과거 요금은 MOP 2,199~7,699였습니다. 현재 적용되는 요금이 아니며, 휴업 중에는 예약이나 서비스를 제공하지 않습니다.',
        },
        {
          title: '휴식 시설',
          body: '과거에는 리클라이너 휴식 공간이 있었습니다. 휴업 중에는 숙박할 수 없으며, 영업 재개 여부는 업장의 최신 공지를 확인해 주세요.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: "LED 큐브 조명 좌석과 부드러운 무드 조명을 갖춘 휴게 홀입니다.",
          alt: '넘버 원 사우나 LED 조명 좌석 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-number-one-02-changing-room-vanity-area',
          caption: '입구에서 바로 보이는 넓은 탈의·화장 구역. 밝은 조명과 새로운 설비로 밤의 경험을 여유롭게 시작합니다.',
          alt: '넘버 원 사우나 탈의·화장 구역',
        },
        {
          file: 'macau-sauna-spa-number-one-03-marble-brand-signage',
          caption: '대리석 벽면의 브랜드 사이니지. 차분한 품격으로 입장하는 모든 손님을 맞이합니다.',
          alt: '넘버 원 사우나 대리석 브랜드 사이니지',
        },
        {
          file: 'macau-sauna-spa-number-one-04-wood-locker-corridor',
          caption: '웜톤 우드 락커 복도. 동선이 넓고 명확하며, 프라이빗 탈의 공간이 정연하게 갖춰져 있습니다.',
          alt: '넘버 원 사우나 우드 락커 복도',
        },
        {
          file: 'macau-sauna-spa-number-one-05-indoor-bath-pool',
          caption: '대형 실내 월풀이 부드러운 조명 아래 있고, 드라이·스팀 사우나를 곁들입니다 — 입욕으로 몸과 마음을 가다듬으세요.',
          alt: '넘버 원 사우나 실내 월풀',
        },
        {
          file: 'macau-sauna-spa-number-one-06-premium-spa-suite',
          caption: "호텔식 침구를 갖춘 독립된 스위트입니다.",
          alt: '넘버 원 사우나 프리미엄 스파 스위트',
        },
        {
          file: 'macau-sauna-spa-number-one-08-glass-wall-bedroom',
          caption: '글라스 월 테마 침실. 모던한 디자인에 부드러운 조명으로, 프라이빗하면서도 개방감이 있습니다.',
          alt: '넘버 원 사우나 글라스 월 테마룸',
        },
        {
          file: 'macau-sauna-spa-number-one-09-chesterfield-tv-lounge',
          caption: '가죽 소파 AV 휴게 홀. 편안한 좌석에 대형 스크린을 갖춰 여유로운 대기와 휴식을 돕습니다.',
          alt: '넘버 원 사우나 가죽 소파 AV 홀',
        },
        {
          file: 'macau-sauna-spa-number-one-10-private-entertainment-room',
          caption: '프라이빗 엔터테인먼트룸. 무드 조명과 편안한 좌석으로, 친한 친구들과 함께하는 모임 공간입니다.',
          alt: '넘버 원 사우나 프라이빗 엔터테인먼트룸',
        },
        {
          file: 'macau-sauna-spa-number-one-11-free-dining-spread',
          caption: '전 시간 무제한 무료 다이닝. 대표 스테이크가 가장 인기 있으며, 해산물, 볶음밥·볶음면, 수프, 시원한 맥주도 있습니다.',
          alt: '넘버 원 사우나 무료 다이닝',
        },
        {
          file: 'macau-sauna-spa-number-one-12-reception-lobby',
          caption: "차분한 인테리어로 방문객을 맞이하는 넘버 원 사우나의 접수 로비입니다.",
          alt: '넘버 원 사우나 접객 로비',
        },
      ],
    },
    'familia-nobre': {
      aliases: '파밀리아 노브레, 마카오 파밀리아 노브레, Familia Nobre, 豪門桑拿',
      highlights: [
        '넓은 목욕 공간',
        '다수의 객실',
        '휴식 공간',
      ],
      bestFor: '과거 시설 안내 · 임시 휴업',
      features: [
        '넓은 목욕 공간',
        '다수의 객실',
        '사물함',
        '리클라이너 휴식 공간',
        '임시 휴업',
      ],
      flow: [
        {
          title: '임시 휴업',
          body: '호문 사우나는 현재 휴업 중으로 방문객이나 예약을 받지 않습니다. 아래 내용은 과거 시설에 관한 기록입니다.',
        },
        {
          title: '목욕 및 탈의 시설',
          body: '과거에는 넓은 탈의실, 사물함, 욕조와 사우나실이 있었으며, 목욕·식사·휴식 공간이 구분되어 있었습니다.',
        },
        {
          title: '식사 및 객실 시설',
          body: '과거 스테이크, 음료, 따뜻한 요리를 제공했으며 다수의 객실을 갖추고 있었습니다. 현재는 식사 및 객실 시설을 이용할 수 없습니다.',
        },
        {
          title: '과거 요금',
          body: '기록된 과거 요금은 MOP 2,388~6,988였으며 당시에는 서비스 요금이 없었습니다. 현재 요금이 아닌 과거 기록입니다.',
        },
        {
          title: '휴식 시설',
          body: '과거 휴식 공간에는 간격을 넓게 둔 리클라이너가 여러 개 있었습니다. 휴업 중에는 숙박할 수 없으며, 영업 재개 여부는 업장의 최신 공지를 확인해 주세요.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-familia-nobre-01-neon-entrance-night',
          caption: '파밀리아 노브레 입구 게이트와 브랜드 사이니지. 마카오 최대 규모 사우나 클럽의 위풍당당한 파사드 — 도시의 번잡함이 여기서 멈추고, 많은 이들이 마카오 사우나를 처음 경험하는 첫 관문입니다.',
          alt: '파밀리아 노브레 입구 사이니지',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-02-hm-crown-lightbox-signage',
          caption: '입구의 크라운 라이트박스가 환하게 빛납니다. 럭셔리한 품격이 문 앞에서부터 정해지며 매장의 규격을 보여줍니다.',
          alt: '파밀리아 노브레 크라운 라이트박스 사이니지',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-03-purple-grand-staircase',
          caption: '탁 트인 퍼플 메인 계단. 마카오 최대 공간의 넓은 품격을 드러내며, 곳곳에 여유가 있습니다.',
          alt: '파밀리아 노브레 퍼플 대계단',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-04-red-lantern-theatre-hallway',
          caption: '레드 랜턴 복도가 동양 극장식 무드 조명에 물들어, 조용히 각 독립 룸으로 안내합니다.',
          alt: '파밀리아 노브레 레드 랜턴 복도',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-05-purple-led-bedroom',
          caption: "보라색 LED 조명과 호텔식 침구를 갖춘 방입니다.",
          alt: '파밀리아 노브레 퍼플 특색룸',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-06-red-lattice-massage-room',
          caption: '레드 격자 마사지룸. 클래식 동양 라인에 프라이빗 구성을 더한, 여러 룸 타입 중 하나입니다.',
          alt: '파밀리아 노브레 레드 격자 마사지룸',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-07-mirror-chandelier-massage-room',
          caption: '크리스털 빛이 쏟아지는 미러 샹들리에룸. 공간이 넓고 구성이 정교해 여유로운 시간을 만끽할 수 있습니다.',
          alt: '파밀리아 노브레 미러 샹들리에 마사지룸',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-08-mirror-sitting-massage-room',
          caption: '미러 거실 마사지룸은 독립 좌석 구역과 넓은 구성을 갖췄습니다. 객실 수가 마카오에서 가장 많아 거의 대기가 필요 없습니다.',
          alt: '파밀리아 노브레 미러 거실 마사지룸',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-10-marble-bar-dining',
          caption: '대리석 바 다이닝 구역. 스테이크, 해산물, 따뜻한 요리, 시원한 맥주를 무료로 제공해 좋은 평판이 단골을 부릅니다.',
          alt: '파밀리아 노브레 대리석 바 다이닝 구역',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-11-free-beer-menu-spread',
          caption: '무료 다이닝 진열. 시원한 맥주, 탄산음료, 주스, 따뜻한 음식이 전 시간 무제한으로, 추가 비용 없이 제공됩니다.',
          alt: '파밀리아 노브레 무료 맥주 다이닝',
        },
        {
          file: 'macau-sauna-spa-familia-nobre-12-selection-runway-wall',
          caption: "파밀리아 노브레 내부의 홀 공간입니다.",
          alt: "파밀리아 노브레 홀",
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: '오셔닉 로열 스파, 오셔닉 로열 사우나, Oceanic Royal Spa, Oceanic Royal Sauna, 帝湖水療',
      highlights: [
        '참고 가격 MOP 2,299–7,099',
        '테마룸, 다이닝, 리클라이너 휴게 구역',
      ],
      bestFor: '영업 재개 후 타이파에서 완전한 스파의 밤을 계획하는 분',
      features: [
        '현재 일시 휴업 중으로, 손님 접수나 예약을 받지 않습니다',
        '클래식과 테마 스타일 객실',
        '24시간 리클라이너 휴게 및 숙박 배치',
        '다이닝과 해산물 선택지',
      ],
      flow: [
        {
          title: '영업 상태 먼저 확인',
          body: '오셔닉 로열 스파는 현재 일시 휴업 중으로, 손님 접수나 예약 서비스를 받지 않습니다. 계획 전에 저희에게 문의해 최신 상황을 확인해 주세요.',
        },
        {
          title: '대체 매장 선택',
          body: '타이파 또는 마카오 반도 선호, 테마룸, 24시간 영업, 야간 리클라이너 휴게 구역 등 원하시는 조건을 알려주시면, 현재 영업 중인 매장을 추천해 드립니다.',
        },
        {
          title: '영업 재개 후 재확인',
          body: '영업 재개 후에는 당일 가격, 마사지 메뉴와 객실 이용 가능 여부를 다시 확인해 주세요. 이 정보는 매장의 실제 운영에 따라 조정될 수 있습니다.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-01',
          caption: '타이파 오셔닉 로열 스파 입구 사이니지. 매장의 아이덴티티를 가장 직접적으로 보여주는 사진입니다.',
          alt: '타이파 오셔닉 로열 스파 입구 사이니지',
        },
        {
          file: 'macau-sauna-spa-oceanic-gallery-202607-03',
          caption: '오셔닉 로열이 위치한 곳의 야간 외관입니다.',
          alt: '오셔닉 로열 스파 야간 외관',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-11',
          caption: '오셔닉 로열 스파 내부의 풀과 무대 공간입니다.',
          alt: '오셔닉 로열 스파 풀과 스테이지 공간',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-12',
          caption: '스테이지 조명에 넓은 공간을 더해, 실내 분위기가 더욱 드라마틱합니다.',
          alt: '오셔닉 로열 스파 스테이지룸',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-07',
          caption: '매장 휴게 홀로, 밤의 여러 순간 사이에 천천히 쉬기에 적합합니다.',
          alt: '오셔닉 로열 스파 휴게 홀',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-02',
          caption: '웜톤 트윈 침대 프라이빗룸. 간결하고 조용한 구성입니다.',
          alt: '오셔닉 로열 스파 트윈 침대 프라이빗룸',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-08',
          caption: '세로 구도로 담은 프라이빗룸의 한켠입니다.',
          alt: '오셔닉 로열 스파 프라이빗룸',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-09',
          caption: '낮은 웜 조명이 만드는 또 다른 테마룸 분위기입니다.',
          alt: '오셔닉 로열 스파 테마 프라이빗룸',
        },
        {
          file: 'macau-sauna-spa-oceanic-placed-20260624-04',
          caption: '다이닝 제공의 한 장면으로, 오래 머무는 시간과 잘 어울립니다.',
          alt: '오셔닉 로열 스파 다이닝',
        },
      ],
      overnightValue: '영업 재개 후 숙박 가능',
      overnightNote: '— 방문 전 최신 안내를 확인해 주세요',
    },
  },
};

en.venues['yu-sauna'] = yuSaunaDetails.en;
ja.venues['yu-sauna'] = yuSaunaDetails.ja;
zhTW.venues['yu-sauna'] = yuSaunaDetails['zh-TW'];
zhCN.venues['yu-sauna'] = yuSaunaDetails['zh-CN'];
ko.venues['yu-sauna'] = yuSaunaDetails.ko;

en.venues['eighteen-sauna'] = eighteenSaunaDetails.en;
ja.venues['eighteen-sauna'] = eighteenSaunaDetails.ja;
zhTW.venues['eighteen-sauna'] = eighteenSaunaDetails['zh-TW'];
zhCN.venues['eighteen-sauna'] = eighteenSaunaDetails['zh-CN'];
ko.venues['eighteen-sauna'] = eighteenSaunaDetails.ko;

export const spaPageCopy: Partial<Record<Locale, SpaPageCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

export const getSpaPageCopy = createPageCopy(spaPageCopy);

export function spaBreadcrumbs(copy: SpaPageCopy, name: string, slug: string): Crumb[] {
  return [
    { name: copy.breadcrumbHome, path: '/' },
    { name: copy.breadcrumbList, path: '/ranking/' },
    { name, path: `/spa/${slug}/` },
  ];
}
