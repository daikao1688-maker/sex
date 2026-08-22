import type { Locale } from '../config';
import type { VenueSlug } from '../../data/venues';
import { createPageCopy, type Crumb } from './helpers';
import { eighteenSaunaDetails } from './eighteenSauna';

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
}

export interface SpaPageCopy {
  backHome: string;
  alsoKnownAs: string;
  labels: {
    referencePrice: string;
    discountCta: string;
    staff: string;
    staffValue: string;
    staffTeam: string;
    staffNationalities: string;
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
    flow: string;
    moreInfo: string;
    related: string;
    learnMore: string;
    officialWebsite: string;
  };
  paymentMethods: string[];
  concierge: { title: string; body: string };
  cta: { headingLead: string; headingAccent: string; body: string };
  breadcrumbHome: string;
  breadcrumbList: string;
  /** Labels used when a venue has no written detail copy yet. */
  placeholder: {
    ktv: string;
    themeRooms: string;
    show: string;
    overnight: string;
    open24h: string;
    jpkr: string;
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
  alsoKnownAs: 'Also known as：',
  labels: {
    referencePrice: 'Reference Price',
    discountCta: 'Contact us for a discount →',
    staff: 'Staff',
    staffValue: 'Multinational',
    staffTeam: 'Multinational therapist team',
    staffNationalities: 'China, Vietnam, Thailand, Taiwan, Japan, Korea, Russia, Ukraine',
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
    show: 'Selection show',
    overnight: 'Overnight stay',
    open24h: 'Open 24 hours',
    jpkr: 'Japanese / Korean lineup',
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
        'Companion karaoke, 3 tiers',
        'KTV + spa in one package',
      ],
      bestFor: 'A singing night with company',
      features: [
        'Karaoke-first with companions',
        'Free-flow drinks',
        'Private rooms, premium sound',
        'KTV + spa package',
        '3/F Hotel Rio',
      ],
      flow: [
        {
          title: 'Book Your Room',
          body: 'Book through us with your headcount, timing and how you want to play (companion / package / spa). In the opening period, booking ahead gets the smoothest room and lineup arrangements.',
        },
        {
          title: 'Arrive at Hotel Rio',
          body: 'Head to the 3rd floor of Hotel Rio in NAPE — minutes from the border gates and major hotels, or let us arrange the free private car transfer. Give your booking name and staff walk you through.',
        },
        {
          title: 'Meet the Companions',
          body: 'In your room, companions are introduced in person and the tier differences are explained on the spot. Companion karaoke runs three price tiers: MOP 1,300 / 1,500 / 2,000.',
        },
        {
          title: 'Companion Karaoke',
          body: 'Your companion sits beside you, sings with you and keeps the drinks flowing — a fully private room with premium sound, so business talk and entertainment share the same table.',
        },
        {
          title: 'Switch to the Spa',
          body: 'On the signature package, one hour of companion karaoke flows into one hour of spa massage; the free-flow option makes drinks unlimited. Viet-style and Tang-style lines run MOP 3,288 – 5,088.',
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
          caption: 'Hosting under the gold-leaf dragon and eagle carries weight; close the door and the sound, lights and companions belong to your table alone.',
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
          caption: 'Quilted orange sofas under crystal tiger art — speakers rigged, lights low: this is the home ground of companion karaoke.',
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
        'Biggest model showcase',
        'Signature red waterbed',
        'Imperial marble luxe',
      ],
      bestFor: 'Largest model showcase / Taipa luxury debut',
      features: [
        'Recommended ⭐⭐⭐⭐⭐',
        'Newest Taipa opening — 1 May 2026',
        'Macau\'s largest model showcase / catwalk hall',
        'Signature red waterbed in spotlit suites',
        'Integrated bedroom + waterbed luxury suites',
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
          title: 'Macau\'s Largest Model Showcase',
          body: 'The marquee feature: a multi-tiered glass-railed catwalk hall lit in deep blue neon, which Manhao positions as the largest model showcase in Macau. The runway-scale presentation makes the selection process a centerpiece experience rather than a side step. Once you\'ve decided, the manager confirms the price tier (MOP 2,488 – 6,088).',
        },
        {
          title: 'Integrated Suite & Signature Waterbed',
          body: 'Treatment rooms are integrated suites — premium bedroom finishes (mural-papered walls, oversized bed, sofa, lamps) combined with the venue\'s signature red waterbed lit by a single dramatic spotlight. The two surfaces share one private room so you don\'t have to relocate during service.',
        },
        {
          title: '60-Minute Service',
          body: 'Settle into the 60-minute session in your private suite. The multinational therapist roster offers massage styles to match your preference. Lighting, sound, and bath are controllable from the room.',
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
          caption: 'Manhao Spa\'s headline feature: Macau\'s largest model showcase, a multi-tiered glass-railed catwalk lit in deep blue neon that makes selection feel like the main event.',
          alt: 'Manhao Spa model showcase hall',
        },
        {
          file: 'macau-sauna-spa-manhao-03-red-water-bed-suite',
          caption: 'The signature red waterbed glows under one dramatic spotlight — an integrated suite that keeps bedroom and waterbed in a single private room.',
          alt: 'Manhao Spa signature red waterbed suite',
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
        'Modern stage entertainment',
        'Multiple ambient themed rooms',
        'Balinese + Japanese massage',
      ],
      bestFor: 'Trying the newest venue',
      features: [
        'Unique rooms',
        'fashion show stage entertainment',
        'diverse auditions',
        'various props',
        'featuring Japanese and Korean themes.',
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
          title: 'Stage Selection Show',
          body: 'The entertainment hall features professional stage lighting and LED screens, delivering the most modern visual experience of any selection show in Macau. Multi-national therapists showcase on stage in a fresh, distinctive format.',
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
          caption: 'The main-stage hall glows under a neon star backdrop and professional lighting — Number Nine\'s signature immersive runway, the most modern selection show in Macau.',
          alt: 'Number Nine Spa main-stage hall',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: 'A refined dining area — complimentary steak, seafood, noodles and more turn the meal into part of the experience.',
          alt: 'Number Nine Spa dining area',
        },
        {
          file: 'macau-sauna-spa-number-nine-12-waterbed-room',
          caption: 'A waterbed feature room — mood lighting and a comfortable waterbed make for a distinctive, immersive stay.',
          alt: 'Number Nine Spa waterbed room',
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
        'Japanese bubble bath specialist',
      ],
      bestFor: 'Japanese-style experience',
      features: [
        'Recommended rating: ⭐⭐⭐⭐⭐',
        'Free therapist add-on with selected packages',
        'Japanese-style bubble bath',
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
          title: 'Boutique Selection',
          body: 'Shang Pin uses a boutique selection model — share your preferences and budget with the manager, who then arranges face-to-face introductions one at a time. No large-scale shows to watch; the entire process is private and unhurried, ideal for guests who prefer a quieter atmosphere.',
        },
        {
          title: 'Choose Your Therapist',
          body: 'Multinational quality-focused staff, primarily Chinese and Japanese, with consistently high standards in both appearance and service. Shang Pin positions itself as \'mid-range price, high-end quality\' — the value proposition is outstanding.',
        },
        {
          title: '60-Minute Session',
          body: 'Every room features its own private bathtub for a high level of privacy. Shang Pin specializes in Japanese-style soapland (bubble bath) service.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Overnight stays available — rest in the free lobby recliner lounge, or opt for a paid private rest room. As a boutique-scale venue, foot traffic is lower and the atmosphere is peaceful. Staff numbers may be smaller during off-peak hours — evening visits are recommended.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: 'Shang Pin Spa\'s signature purple showcase stage — a Cotai club inside Lisboeta Macau, mood-lit for a lavish first impression.',
          alt: 'Elite International Spa purple showcase stage',
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
          caption: 'A porthole-mirror stage with stepped seating: the boutique, private selection space that replaces large-scale shows.',
          alt: 'Elite International Spa porthole-mirror stage',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: 'A modern jacuzzi wet area, bright and immaculate — fitting bathing surroundings for a venue known for Japanese-style bubble bath.',
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
          caption: 'The boutique selection stage: share your preferences and budget, and the manager arranges introductions one by one.',
          alt: 'Elite International Spa selection stage',
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
        'Best dual-service price',
        'No service fee',
        'Buy one, get one free (ask for details when booking)',
      ],
      bestFor: 'Luxury environment / overnight stays',
      features: [
        'Rating ⭐⭐⭐⭐',
        'The most luxurious decor in Macau',
        'a talent show with scenic views',
        'over ten themed rooms',
        'a KTV-room party mode',
        'close-up interactive experiences',
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
          title: 'Scenic Line Show',
          body: 'The hall \'scenic line\' selection format features multinational therapists lined up in a row, with some proactively smiling and lightly engaging with guests. The atmosphere is relaxed and natural — less formal than other venues. You can observe up close with minimal selection pressure.',
        },
        {
          title: 'Choose Your Therapist',
          body: 'After selecting your preferred therapist, the manager confirms the price tier. Prices range from MOP 2,799 to MOP 6,699.',
        },
        {
          title: '60-Minute Session',
          body: 'Enter spacious luxury rooms with mood lighting and premium furniture. The sense of space is generous — a top choice for those who prioritize environment quality.',
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
        {
          file: 'macau-sauna-spa-majesty-08-medical-theme-room',
          caption: 'A medical themed room with a clean, cosplay-ready setting, part of the carefully curated themed collection.',
          alt: 'Majesty Spa medical themed room',
        },
        {
          file: 'macau-sauna-spa-majesty-09-cosplay-costume-room',
          caption: 'A cosplay themed room stocked with uniforms and props — one of the highlights among the ten-plus themed suites to play in.',
          alt: 'Majesty Spa cosplay themed room',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Overnight friendly — free lobby recliner lounge, paid private rest rooms in peak season',
    },
    'the-excellent-sauna': {
      aliases: 'The Excellent Sauna Macau, 極品桑拿',
      highlights: [
        'Inside the Grand Emperor Hotel main building',
        'Themed rooms (office, classroom, hospital)',
        'Water bed service',
      ],
      bestFor: 'Flexible schedule / themed rooms',
      features: [
        'Rating ⭐⭐⭐',
        'Grand Emperor Hotel main building',
        'brand new themed rooms',
        'various exciting themes',
        'DJ room experience',
        'role-play theme room',
        'cinema theme.',
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
          title: 'Boutique Selection',
          body: 'The Excellent uses a boutique face-to-face selection model — a carefully screened, high-quality multinational lineup following a \'fewer but finer\' philosophy, with each therapist vetted for both appearance and service standards. No large runway shows; the manager introduces options one by one based on your preferences in a private, unhurried setting.',
        },
        {
          title: 'Water Bed or Themed Room',
          body: 'The Excellent offers both water bed service and scenario-based themed rooms — choose a traditional Dongguan-style water bed experience, or pick a themed room (office, classroom, hospital, cinema, etc.). Themed rooms cost an extra MOP 440, and you can fully customize costumes and interaction style.',
        },
        {
          title: '60-Minute Session',
          body: 'Enter your chosen room for approximately 60 minutes of dedicated service. A 10% service fee applies. The Excellent\'s Thai- and Shanghai-style massage techniques remain a strong reason to visit even if you choose a simpler room setup.',
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
          caption: 'Step into the brand-new hospital-themed scene room, fully kitted out for immersive role-play as a MOP 440 themed-room upgrade.',
          alt: 'The Excellent Sauna hospital theme room',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: 'A patterned-tile hallway threads past the scenario rooms — DJ booth, office, cinema and more, each waiting under soft light.',
          alt: 'The Excellent Sauna themed-room hallway',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: 'A leather-headboard suite wrapped in custom mood lighting and hotel-grade bedding — a private, unhurried space for your session.',
          alt: 'The Excellent Sauna leather-headboard suite',
        },
        {
          file: 'macau-sauna-spa-excellent-05-mosaic-waterbed-room',
          caption: 'A mosaic-tiled water bed room, set for a relaxed, unhurried session.',
          alt: 'The Excellent Sauna mosaic waterbed room',
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
        'HK$80M luxury',
        'Themed suites',
        'Signature waterbed',
      ],
      bestFor: 'Newest luxury / themed-suite debut',
      features: [
        'Recommended ⭐⭐⭐⭐⭐',
        'Newest premium opening — 15 May 2026',
        'HK$80M luxury build',
        'Themed suites with hotel-grade amenities',
        'Taiwanese & Japanese headlining therapists',
        'Signature waterbed massage rooms',
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
          title: 'Therapist Selection',
          body: 'Meet the multinational lineup, including influencer- and celebrity-level headliners. Selection is conducted in a private viewing format rather than a stage, in keeping with the brand\'s quieter, concierge-led tone. Once you\'ve decided, the manager confirms the price tier (MOP 2,488 – 7,388); detailed menu items are shared on the spot.',
        },
        {
          title: 'Themed Suite or Waterbed Room',
          body: 'Choose from multiple themed suites — each with custom mood lighting, premium bedding, and luxury hotel finishings — or one of the signature waterbed massage rooms designed specifically for Empire\'s signature service. Optional themed costume / signature attire service is available on request.',
        },
        {
          title: '60-Minute Service',
          body: 'Settle into the 60-minute session in your private room. Massage styles span Taiwan-style, Japanese-style, and the venue\'s signature waterbed treatments. Rooms are sized for comfort, with bath, lighting, and sound all controllable from the bed.',
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
          caption: 'Unwind in a candlelit white-marble suite — Calacatta walls and warm light from the HK$80-million build.',
          alt: 'Empire Sauna white-marble suite',
        },
        {
          file: 'macau-sauna-spa-empire-05-ocean-led-waterbed-room',
          caption: 'Drift on the signature waterbed beneath ocean-blue light — Empire Sauna\'s hallmark indulgence.',
          alt: 'Empire Sauna signature waterbed room',
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
        'Narrative-style service',
        'Roleplay interaction experience',
      ],
      bestFor: 'Themed rooms / roleplay',
      features: [
        'Rating ⭐⭐⭐⭐',
        '20+ Themed Scenario Rooms',
        'Macau Script-Killing Pioneer',
        'Japanese Themed Experiences',
        'Professional Service Team',
        'Open 24 Hours',
        'Private & Secure Environment',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at East Castle Spa, the original pioneer of themed rooms in Macau, famous for its narrative-driven roleplay services. Register at the front desk and collect your wristband. The reference price range is MOP 2,388 – 6,498; detailed menu items are confirmed when booking.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy the bathing facilities and sauna to unwind. A unique feature of East Castle is that therapists mingle throughout the venue, so you can observe and browse while soaking.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining available — enjoy a meal in the dining area while keeping an eye on the therapists moving around the venue.',
        },
        {
          title: 'Browse & Pick',
          body: 'East Castle uses a \'free browse\' model — there\'s no fixed show schedule. Multinational therapists are spread across different areas of the venue, and you can approach or select anyone you like at any time by telling the manager. This format makes the selection process feel natural and pressure-free.',
        },
        {
          title: 'Themed Rooms',
          body: 'East Castle\'s biggest draw — over 20 meticulously designed themed rooms including a prison interrogation room, classroom, office, airplane cabin, hospital, ambulance (signature room), boxing ring, and golf course. Each room has full set design, props, and costumes, with therapists professionally trained in roleplay.',
        },
        {
          title: '60-Minute Session',
          body: 'A fully immersive, narrative-driven interactive session where you can customize the entire script — choose the scene, specify costumes, design dialogue and interactions. Therapists stay in character throughout for an intensely engaging experience. A 10% service charge and a 5% tourism tax apply.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Lobby reclining chairs are available for overnight rest. East Castle\'s core experience centers on the themed rooms rather than rest facilities — if overnight comfort is your priority, Majesty Spa is a better choice.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: 'East Castle Spa\'s signature gym-themed room comes with a full equipment set and props — pure proof of why this is Macau\'s pioneer of immersive roleplay.',
          alt: 'East Castle Spa gym theme room',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: 'Step into the lobby and an LED brand wall with mood lighting sets the tone for the themed venue waiting beyond.',
          alt: 'East Castle Spa lobby brand wall',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: 'A spacious bathing pool with dramatic lighting — soak here and quietly scout the floor before you choose.',
          alt: 'East Castle Spa LED stage bath pool',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: 'The classroom-themed room — desks, blackboard and full props turn a roleplay session into something seamless and convincing.',
          alt: 'East Castle Spa classroom theme room',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: 'A hospital-ward themed room with a detailed bed-and-clinic set, built for fully immersive roleplay.',
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
          caption: 'An airplane-cabin themed room — seats and cabin detailing that take roleplay scenarios to another level.',
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
        'Buy one, get one free on waterbed rooms',
        'Attentive service',
        'Free private rest room after 3:00 AM',
      ],
      bestFor: 'Quiet, private experience',
      features: [
        'Rating ⭐⭐⭐⭐',
        'Focus on Service Quality',
        'Spacious Rest Areas',
        'Quiet & Relaxing Environment',
        'Hidden Gem Spa',
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
          title: 'Relaxed Matching',
          body: 'Victoria has no fixed selection shows or runway events — simply tell the manager your preferences and they\'ll arrange suitable therapists to meet you. The entire process moves at your own pace with zero pressure or rushing, making it the most relaxed selection experience in Macau.',
        },
        {
          title: 'Choose Your Therapist',
          body: 'Multinational therapists on-site, including Chinese, Vietnamese, Japanese, and Korean nationalities. Victoria is known for meticulous, attentive service with consistently high standards. Prices range from MOP 2,298 to MOP 6,998, plus a 10% service fee.',
        },
        {
          title: '60-Minute Session',
          body: 'Enter a room for a 60-minute one-on-one session. The signature water-bed rooms are quiet and private — quality on par with Oceanic Royal at a friendlier price. Service quality rivals Oceanic Royal but at more affordable prices.',
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
          caption: 'The catwalk stage glows under soft runway lighting, set for a relaxed, unhurried show.',
          alt: 'Victoria Sauna catwalk show stage',
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
          file: 'macau-sauna-spa-victoria-08-private-waterbed-room',
          caption: 'A private water bed room — a quiet space for one-on-one service.',
          alt: 'Victoria Sauna private waterbed room',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: 'A comfortable show viewing area faces the stage for an unhurried look before you choose.',
          alt: 'Victoria Sauna show viewing area',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Quiet environment, good for rest',
    },
    'm-club': {
      aliases: 'M Club Macau, 晉會MCLUB',
      highlights: [
        'Sister venue to East Castle',
        'KTV themed rooms',
        'Hot spring rooms',
        'More luxurious decor',
      ],
      bestFor: 'Luxury themed experience',
      features: [
        'Rating ⭐⭐⭐⭐',
        'High-Tech Cyberpunk Style',
        'Rich Themed Room Selection',
        'Script-Killing Experiences',
        'KTV Party Mode',
        'Futuristic Décor',
        'Open 24 Hours',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at M Club, the luxury sister venue to East Castle Spa, positioned as a more premium, upscale experience. The decor is more refined than East Castle, featuring exclusive KTV rooms and hot spring rooms. Register at the front desk and collect your wristband.',
        },
        {
          title: 'Bathe & Relax',
          body: 'Enjoy the bathing facilities and sauna. M Club features hot spring rooms where you can enjoy a private hot spring soak — a unique facility not found at other venues.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary dining in a setting that matches the overall luxurious decor, providing a comfortable dining experience.',
        },
        {
          title: 'Browse & Pick',
          body: 'Same free-browse model as East Castle — multinational therapists move freely throughout the venue and you can choose at any time. No fixed show schedule to wait for.',
        },
        {
          title: 'KTV & Themed Rooms',
          body: 'M Club\'s exclusive KTV themed rooms let you sing karaoke while enjoying service. Additional luxury themed options include hot spring rooms, with higher-end decor and more expensive room builds than East Castle.',
        },
        {
          title: '60-Minute Session',
          body: 'A fully immersive, narrative-driven interactive service where you can customize the script and scene. Prices are somewhat higher than East Castle, but room facilities and decor are more luxurious. A 10% service fee applies.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'Lobby reclining chairs available for overnight rest. M Club has lower foot traffic than East Castle, making for a relatively quieter environment.',
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
          caption: 'A private big-screen KTV lounge where you sing while you enjoy service, party-mode energy turned all the way up.',
          alt: 'M Club big-screen KTV lounge',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: 'A galaxy bedroom glowing under aurora mood lighting — part of M Club\'s signature planet-series scenes at peak tech.',
          alt: 'M Club galaxy aurora room',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: 'A Japanese hot-spring bubble-bath room for a private soak in a fully styled Japanese setting.',
          alt: 'M Club Japanese hot-spring room',
        },
        {
          file: 'macau-sauna-spa-mclub-09-masquerade-prop-display',
          caption: 'A cosplay-theme display with candlelight and themed-uniform props, setting an immersive scene.',
          alt: 'M Club cosplay theme display',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: 'A pool-table themed suite blending billiards staging with the scene — play and service in one room.',
          alt: 'M Club pool-table suite',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: 'A racing-simulator game room with futuristic décor and gaming gear for a cyberpunk play experience.',
          alt: 'M Club racing simulator room',
        },
        {
          file: 'macau-sauna-spa-mclub-12-tatami-classroom-room',
          caption: 'A classroom-themed room staged for an immersive cosplay scenario.',
          alt: 'M Club classroom theme room',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: 'A dart-games lounge — well-equipped entertainment and an easy social space within the high-tech interior.',
          alt: 'M Club dart games lounge',
        },
        {
          file: 'macau-sauna-spa-mclub-14-red-theme-playroom',
          caption: 'A bold red-themed playroom dressed for an immersive cosplay scene.',
          alt: 'M Club red theme playroom',
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
        'Most staff in Macau',
        'Widest international selection',
        'Recommended for first-timers',
        'Famous complimentary steak',
      ],
      bestFor: 'First-time visitors',
      features: [
        'Rating ⭐⭐⭐⭐⭐',
        'Popular sauna in Macau',
        'multi-nationality options',
        'high quality guaranteed',
        'visually stunning',
        'open 24 hours.',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Number One Sauna and register at the front desk to collect your wristband and locker key. The changing rooms are spacious with brand-new facilities.',
        },
        {
          title: 'Bathe & Relax',
          body: 'The venue features a large jacuzzi, dry sauna, and steam room with soft, ambient lighting. We recommend spending 20-30 minutes soaking first to unwind and ease into the experience.',
        },
        {
          title: 'Free Dining',
          body: 'Unlimited complimentary food throughout your stay — the signature steak is Number One\'s most popular dish, alongside fried rice, fried noodles, fresh fruit platters, and cold beer. The spacious dining area overlooks the main hall activity.',
        },
        {
          title: 'Grand Selection Show',
          body: 'Each night, multinational staff walk the hall runway in groups with professional lighting and sound — a spectacular sight. Each round takes about 30 minutes, featuring staff from China, Vietnam, Thailand, Taiwan, Japan, Korea, Russia, and Ukraine — the largest and most international show in all of Macau.',
        },
        {
          title: 'Choose Your Therapist',
          body: 'Tell the manager your preferred number and they\'ll confirm the service tier and corresponding price. Prices range from MOP 2,199 to MOP 7,699 depending on the staff category. During peak hours (22:00-00:00 on weekends), popular therapists may require a wait — arriving early is recommended.',
        },
        {
          title: '60-Minute Session',
          body: 'Enter a private room for an exclusive one-on-one water bed session — Number One is famous across Macau for its water bed service. You can add a dual service with a second therapist for an additional fee (charged on-site). Additional paid mini-services include ear cleaning, nail care, and back massage.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'After your session, rest in reclining chairs or stay overnight. Note that the rest area gets lively during peak hours; for quiet sleep, aim to settle in after 2 AM, with 6-8 AM being the quietest. Enjoy a complimentary breakfast the next morning before heading out.',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: 'The signature lounge glows with LED cube seating and soft mood lighting — an easy place to settle before or after the selection show.',
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
          caption: 'A premium spa suite: a secluded private room with hotel-grade bedding made for the one-on-one session.',
          alt: 'Number One Sauna premium suite',
        },
        {
          file: 'macau-sauna-spa-number-one-07-gold-water-bed-room',
          caption: 'A gold-toned water bed room finished with refined mood lighting.',
          alt: 'Number One Sauna gold waterbed room',
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
          caption: 'The reception lobby at Number One Sauna — a composed welcome where check-in opens the selection-show experience.',
          alt: 'Number One Sauna reception lobby',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Reclining chairs available; busy during peak hours',
    },
    'familia-nobre': {
      aliases: 'Familia Nobre Macau, 豪門桑拿殿',
      highlights: [
        'Largest venue',
        'No service fee',
        'Best quality-to-value ratio',
      ],
      bestFor: 'Best value seekers',
      features: [
        'Rating ⭐⭐⭐⭐⭐',
        'Macau\'s largest sauna',
        'with the most rooms',
        'stable service',
        'best value for money',
        'No service fee',
        'open 24 hours.',
      ],
      flow: [
        {
          title: 'Arrive & Check In',
          body: 'Arrive at Familia Nobre and register at the front desk to collect your wristband and locker key. The changing room has secure lockers for free luggage storage — slip into a robe and you\'re ready to go.',
        },
        {
          title: 'Bathe & Relax',
          body: 'The bathing area is the largest in all of Macau, with multiple jacuzzis and sauna rooms in a spacious, uncrowded setting. Even during peak hours, you won\'t find yourself waiting in line.',
        },
        {
          title: 'Free Dining',
          body: 'Complimentary steak, cold beer, and various stir-fry dishes — Familia Nobre\'s steak and beer are highly praised among regulars. The dining area is spacious and comfortable, with unlimited servings at no extra charge.',
        },
        {
          title: 'Selection',
          body: 'The manager lines up a row of therapists for you to observe up close and choose at your own pace. Price tiers for each group are announced in advance so you know the cost before selecting.',
        },
        {
          title: 'Choose Your Therapist',
          body: 'Zero service fee — the listed price is the final price with no hidden charges or surcharges. Prices range from MOP 2,388 to MOP 6,988, making it the best value in Macau. With ample space and rooms, there\'s virtually no waiting.',
        },
        {
          title: '60-Minute Session',
          body: 'Enter a private room for an exclusive one-on-one session. Familia Nobre has the most rooms of any venue in Macau, so even during busy periods you\'ll rarely have to wait — a smooth and seamless experience.',
        },
        {
          title: 'Rest & Stay Overnight',
          body: 'The most reclining chairs of any venue in a spacious rest area with generous spacing between seats for comfortable overnight stays. No noisy entertainment shows to disturb you — ideal for quiet rest. Enjoy a complimentary breakfast the next morning before leaving.',
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
          caption: 'A purple-LED themed room with soft lighting and hotel-grade bedding, set for private one-on-one service.',
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
          file: 'macau-sauna-spa-familia-nobre-09-silver-water-bed-room',
          caption: 'A silver-toned waterbed room glows under mood lighting, the soft waterbed inviting you to sink in.',
          alt: 'Familia Nobre silver waterbed room',
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
          caption: 'The therapist selection area, where a multinational roster meets you face-to-face before 18:00, then takes to a hall runway after.',
          alt: 'Familia Nobre therapist selection area',
        },
      ],
      overnightValue: 'Available',
      overnightNote: '— Spacious with the most reclining chairs',
    },
    'oceanic-royal-spa': {
      aliases: 'Oceanic Royal Spa, Oceanic Royal Sauna, 帝湖水療, 帝湖水疗, 帝湖桑拿',
      highlights: [
        'Reference price MOP 2,299–7,099',
        '24-hour venue and staff rota',
        'Showcase-style introductions',
        'Themed rooms, dining and recliner lounge',
      ],
      bestFor: 'A full Taipa spa evening once the venue resumes operations',
      staffValue: '140+',
      staffNote: 'China, Vietnam, Thailand, Taiwan, Japan, Korea, Russia, Ukraine',
      features: [
        'Temporarily closed — no guests or bookings accepted',
        'Japanese / Korean lineup',
        'Showcase-style introductions',
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
          caption: 'A pool and stage area that suggests the venue’s presentation-led atmosphere.',
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
  alsoKnownAs: '別名：',
  labels: {
    referencePrice: '料金（目安）',
    discountCta: 'LINEで問い合わせ（優待あり） →',
    staff: '在籍（女の子）',
    staffValue: '多国籍',
    staffTeam: '多国籍セラピストチーム',
    staffNationalities: '中国、ベトナム、タイ、台湾、日本、韓国、ロシア、ウクライナ',
    hours: '営業時間',
    openAllDay: '24時間営業',
    staffHours: '女の子',
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
    show: 'ショータイム',
    overnight: '宿泊（24時間）',
    open24h: '24時間営業',
    jpkr: '日本・韓国の女の子',
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
        '同伴カラオケは3ランク',
        'セットで歌もスパも一晩で',
      ],
      bestFor: '歌って乾杯したい夜に',
      features: [
        'カラオケ×同伴が主役',
        '飲み放題プラン',
        '完全個室×高音質',
        'KTV＋スパのセット',
        'リオホテル3階',
      ],
      flow: [
        {
          title: '個室を予約',
          body: '人数・時間・遊び方（同伴／セット／スパ）を添えてご予約ください。オープン直後は事前予約が確実で、個室もラインナップもスムーズにご用意できます。日本語OKです。',
        },
        {
          title: 'リオホテルへ',
          body: '新口岸のリオホテル（利澳酒店）3階へ。各ボーダーゲートや主要ホテルから数分、無料送迎の手配もできます。到着したら予約名を伝えるだけでスタッフがご案内します。',
        },
        {
          title: '女の子を選ぶ',
          body: '個室に入ると、その場で女の子をご紹介。同伴やセットのランクの違いもここで説明があります。同伴カラオケは MOP 1,300 / 1,500 / 2,000 の3ランクです。',
        },
        {
          title: '同伴カラオケ',
          body: '女の子が隣に座って一緒に歌い、乾杯に付き合ってくれます。完全個室×高音質サウンドだから、接待の会話も盛り上がりも同じテーブルで両立します。',
        },
        {
          title: 'スパへ切り替え',
          body: '名物セットなら、同伴1時間のあとスパマッサージ1時間へ。飲み放題プランならお酒は追加なし。ベトナム式と唐式の2系統で、公開価格は MOP 3,288〜5,088 です。',
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
          caption: '金箔の龍と鷹のアートの下での接待は格別。ドアを閉めれば音響も照明も同伴も、このテーブルだけのものになります。',
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
          caption: 'キルティングのオレンジソファに虎豹のクリスタルアート。スピーカーと照明を整えた、同伴カラオケの主戦場です。',
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
        '最大のショータイム舞台',
        '看板の赤いウォーターベッド',
        '皇者の大理石ラグジュアリー',
      ],
      bestFor: '最大のショータイム舞台／氹仔の高級マカオ サウナ',
      features: [
        'おすすめ度⭐⭐⭐⭐⭐',
        '2026年5月1日 氹仔に新規オープン',
        '全マカオ最大のショータイム・キャットウォークホール',
        '看板の赤いウォーターベッド（スポットライト個室）',
        '寝室＋ウォーターベッドの一体型スイート',
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
          title: '全マカオ最大のショータイム',
          body: '目玉は、ディープブルーのネオンに照らされた多層ガラス手すりのキャットウォークホール。マンハオはこれを全マカオ最大のショータイムと位置づけており、ランウェイさながらの演出が、女の子を選ぶ時間そのものを主役級の体験へと変えてくれます。指名が決まったら、マネージャーが料金帯（MOP 2,488〜6,088）をご案内します。',
        },
        {
          title: '一体型スイートと看板ウォーターベッド',
          body: '客室は一体型スイート。プレミアムな寝室仕様（壁画調の壁、特大ベッド、ソファ、ランプ）に、ひと筋のドラマチックなスポットライトで照らされた看板の赤いウォーターベッドを組み合わせています。寝室とウォーターベッドは同じ個室に収まり、施術中に部屋を移動する必要はありません。',
        },
        {
          title: '60分の施術',
          body: 'プライベートスイートで、60分の施術をお楽しみください。多国籍の女の子が在籍し、マッサージのスタイルもお好みに合わせて選べます。照明・音響・浴槽はすべて室内から操作できます。',
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
          caption: 'マンハオスパの目玉は、マカオ最大級を誇る女の子のショータイム。深いブルーのネオンに照らされたガラス手すりの多段ステージが、選ぶひとときをまるで主役のイベントへと変える。',
          alt: 'マンハオスパ ショータイムのステージ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-manhao-03-red-water-bed-suite',
          caption: 'ひとすじのドラマティックなスポットライトに浮かび上がる、象徴の赤いウォーターベッド。ベッドルームとウォーターベッドをひとつの個室にまとめた一体型スイート。',
          alt: 'マンハオスパ 赤いウォーターベッドの個室｜マカオ サウナ',
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
        'モダンなステージ演出',
        '多彩な雰囲気テーマルーム',
        'バリ式＋日本式マッサージ',
      ],
      bestFor: '最新店を一番乗りで体験',
      features: [
        '特色テーマルーム',
        'ファッションショー風ステージ演出',
        '多彩なショータイム',
        '豊富なプレイ小物',
        '日本・韓国勢が主力',
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
          title: 'ステージでの女の子紹介（ショータイム）',
          body: 'エンタメホールはプロ仕様のステージ照明とLEDスクリーンを備え、女の子の紹介はマカオ随一のモダンな映像演出で楽しめます。多国籍の女の子がステージに登場する、新鮮で個性的なスタイルです。',
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
          caption: 'ネオンの星空を背景に、プロ仕様の照明が輝くメインステージホール。ナンバーナインスパ象徴の没入型ランウェイで、マカオで最もモダンなショータイムが楽しめます。',
          alt: 'ナンバーナインスパ メインステージホール｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '洗練されたダイニングエリア。ステーキやシーフード、麺類などが無料で楽しめ、食事もまた体験の一部となります。',
          alt: 'ナンバーナインスパ ダイニングエリア｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-nine-12-waterbed-room',
          caption: 'ウォーターベッドを備えた特別ルーム。ムードライトと心地よいウォーターベッドが、ほかにない没入感のあるひとときを演出します。',
          alt: 'ナンバーナインスパ ウォーターベッドルーム｜マカオ サウナ',
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
        '日本式 泡泡浴のスペシャリスト',
      ],
      bestFor: '日本式の体験を求める方',
      features: [
        'おすすめ度⭐⭐⭐⭐⭐',
        '対象コースでセラピスト無料特典',
        '日本式 泡泡浴',
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
          title: '精品セレクション',
          body: 'シャンピンは「精品セレクション」方式——好みと予算をマネージャーに伝えると、女の子が一人ずつ対面で挨拶に来ます。大がかりな紹介ショーを見る必要はなく、静かでプライベート。にぎやかな場が苦手な方に向いています。',
        },
        {
          title: '女の子を選ぶ',
          body: '在籍は数より質で勝負。中心は中国・日本の女の子で、容姿・サービスとも高水準です。シャンピンの方針は「中価格・高品質」、コスパは抜群です。',
        },
        {
          title: '60分のサービス',
          body: '各部屋に専用の浴槽があり、プライベート性が高いのが特長。看板は日本式の泡泡浴です。',
        },
        {
          title: '休憩・宿泊',
          body: '宿泊（24時間）も可能で、ロビーの無料リクライニングラウンジのほか有料の個室休憩室もあります。少人数制の落ち着いた規模ゆえ客足は少なめで、静かで快適。オフピークは女の子の人数が少ないこともあるため、夜の入場がおすすめです。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: 'シャンピンスパ（尚品國際水療）を象徴する紫に染まったショーステージ。リスボエタ・マカオ（葡京人）内のコタイのクラブが、贅を尽くした照明で訪れる人を迎えます。',
          alt: 'マカオ サウナ｜シャンピンスパの紫のショーステージ',
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
          caption: '丸窓ミラーと段状の座席を備えたステージ。大規模なショーに代わる、ブティックでプライベートなショータイムの空間です。',
          alt: 'シャンピンスパ 丸窓ミラーのステージ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '明るく清潔感あふれるモダンなジャグジーの浴池。日本式の泡風呂で知られる店にふさわしい、上質な入浴環境です。',
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
          caption: 'ブティックなショータイムのステージ。ご希望とご予算を伝えれば、マネージャーが一人ずつ女の子をご紹介します。',
          alt: 'シャンピンスパ ショータイムのステージ｜マカオ サウナ',
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
        '女の子2名指名がいちばんお得',
        'サービス料無料',
        '1名分の料金で2名利用（詳細は予約時にご確認ください）',
      ],
      bestFor: '豪華な空間／宿泊（24時間）の本命',
      features: [
        'おすすめ度⭐⭐⭐⭐',
        'マカオ最高峰の豪華内装',
        '景色を眺めるショータイム形式',
        '10種類以上のテーマルーム',
        'KTVルームでパーティーモード',
        '近距離での濃厚な接客',
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
          title: '景色を眺めるショータイム',
          body: '大広間の「景色を眺める」ショータイム形式——多国籍の女の子が一列に並び、なかには自分から微笑みかけ、軽く触れてくる子もいます。雰囲気は他店ほど堅苦しくなく、あくまで自然体。間近でじっくり眺められるので、選ぶときのプレッシャーも少なめです。',
        },
        {
          title: '女の子を選ぶ',
          body: '気に入った女の子を選んだら、マネージャーが料金ランクを確認します。料金はMOP 2,799〜MOP 6,699。',
        },
        {
          title: '60分のサービス',
          body: 'ゆったりとした豪華な客室へ。雰囲気のある照明と高級家具を備え、空間にゆとりがあります。環境の質を重視する方の本命です。',
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
        {
          file: 'macau-sauna-spa-majesty-08-medical-theme-room',
          caption: '医院をテーマにした一室。清潔感のあるコスプレ向きの設えで、丹念に揃えられたテーマコレクションの一翼を担います。',
          alt: 'マジェスティスパ 医院テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-majesty-09-cosplay-costume-room',
          caption: 'コスプレをテーマにした一室。制服や小道具を取り揃え、十を超えるテーマルームの中でも一際楽しめる目玉のひとつです。',
          alt: 'マジェスティスパ コスプレ テーマルーム｜マカオ サウナ',
        },
      ],
    },
    'the-excellent-sauna': {
      aliases: '極品桑拿、The Excellent Sauna',
      highlights: [
        'グランドエンペラーホテル本館内',
        'テーマルーム（オフィス・教室・病院）',
        'ウォーターベッド',
      ],
      bestFor: '昼スタート／テーマ体験',
      features: [
        '推奨度⭐⭐⭐',
        'グランドエンペラーホテル本館',
        '新しいテーマルーム',
        '多彩なテーマ',
        'DJルーム体験',
        'ロールプレイ個室',
        '映画館テーマ',
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
          title: '精品セレクション',
          body: 'エクセレントは一人ずつ対面で選ぶ「精品（少数精鋭）」スタイル。厳選された質の高い多国籍の女の子が在籍し、容姿もサービスもしっかり管理されています。大がかりなショータイムはなく、マネージャーが好みに合わせて一人ずつ紹介してくれるので、落ち着いた雰囲気でじっくり選べます。',
        },
        {
          title: 'ウォーターベッド／テーマルーム',
          body: 'エクセレントではウォーターベッドとシチュエーション型テーマルームの両方を用意。伝統的な莞式ウォーターベッド体験を選ぶことも、テーマルーム（オフィス・教室・病院など）を選ぶこともできます。テーマルームは MOP 440 の追加で、衣装や演出を自由にカスタマイズできます。',
        },
        {
          title: '60分のサービス',
          body: '選んだお部屋で約60分の専属サービスを満喫。サービス料は10%です。エクセレントのタイ式・上海式マッサージは、シンプルな部屋を選んでも十分に楽しめる本格的な内容です。',
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
          caption: '新設の「医院」テーマルームへ。没入感あふれるロールプレイのために細部まで設えられた、MOP 440 のテーマルーム・アップグレードです。',
          alt: 'エクセレントサウナ 医院テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '模様タイルの回廊が、テーマルームの数々へと続きます。DJブース、オフィス、シネマほか、それぞれが柔らかな灯りの下であなたを待っています。',
          alt: 'マカオ サウナ｜エクセレントサウナのテーマルーム回廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: 'レザーヘッドボードのスイートは、誂えの間接照明とホテル仕様の寝具に包まれます。時間に追われず過ごせる、あなただけのプライベート空間です。',
          alt: 'エクセレントサウナ レザーヘッドのスイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-excellent-05-mosaic-waterbed-room',
          caption: 'モザイクタイルが彩るウォーターベッドルーム。ゆったりと、急がず寛ぐひとときのために整えられています。',
          alt: 'マカオ サウナ｜エクセレントサウナのウォーターベッドルーム',
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
        '8,000万の高級内装',
        'テーマスイート',
        '看板ウォーターベッド',
      ],
      bestFor: '最新の高級店／テーマスイート狙いに',
      features: [
        'おすすめ度⭐⭐⭐⭐⭐',
        '【2026年最新版】2026年5月15日 新規オープン',
        '港幣8,000万の高級内装',
        'ホテル級テーマスイート',
        'インフルエンサー級／有名級が在籍',
        '看板のウォーターベッド特別ルーム',
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
          title: '女の子の指名',
          body: '人気インフルエンサー級や有名級も在籍する多国籍の顔ぶれと対面。指名はステージ形式ではなく、落ち着いた高級店らしいプライベートな観賞スタイル（ショータイム）で行います。決まったらマネージャーが料金帯（MOP 2,488〜7,388）を確認します。詳しいメニューはその場でご案内します。',
        },
        {
          title: 'テーマスイートまたはウォーターベッドルーム',
          body: 'オーダーメイドの間接照明・上質な寝具・ホテル級の装飾を備えた多彩なテーマスイート、または看板のウォーターベッド特別ルームから選択。ご希望に応じて特別コスチューム体験のオプションも追加できます。',
        },
        {
          title: '60分のサービス',
          body: '個室で60分のサービスを満喫。マッサージは台湾式・日本式、そして看板のウォーターベッド特別サービスまで対応しています。お部屋は快適さを重視した造りで、バス・照明・音響はすべてベッドサイドから操作できます。',
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
          caption: 'キャンドルの灯る白大理石のスイートでくつろぐひととき。HK$8,000万を投じたカラカッタの壁と温かな光が迎えます。',
          alt: 'マカオ サウナ｜エンパイアサウナの白大理石スイート',
        },
        {
          file: 'macau-sauna-spa-empire-05-ocean-led-waterbed-room',
          caption: '海のような青い光の下、名物のウォーターベッドに身をゆだねて。エンパイアサウナを象徴する贅沢なひとときです。',
          alt: 'エンパイアサウナ ウォーターベッドルーム｜マカオ サウナ',
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
        'シチュエーション型サービス',
        'ロールプレイ型のふれあい体験',
      ],
      bestFor: 'テーマルーム／ロールプレイ体験',
      features: [
        'おすすめ度⭐⭐⭐⭐',
        'テーマルーム20室以上',
        'マカオ・テーマ系の元祖',
        'シチュエーション体験',
        'プロのサービスチーム',
        '24時間営業',
        'プライベートで安心の空間',
      ],
      flow: [
        {
          title: '到着・チェックイン',
          body: 'イーストキャッスルスパに到着。ここはマカオにおけるテーマルームの元祖で、シチュエーション型のサービスで知られています。まずはフロントで受付を済ませ、リストバンドを受け取りましょう。参考料金帯は MOP 2,388〜6,498 で、詳しいメニューは予約時にご確認ください。',
        },
        {
          title: '入浴・リラックス',
          body: '浴室設備やサウナで心身をゆったりとほぐしましょう。皇堡ならではの特徴は、女の子が場内のあちこちを動き回っていること。お湯に浸かりながら、その様子を眺めて選べます。',
        },
        {
          title: '無料の食事',
          body: '各種の食事を無料で楽しめます。ダイニングでひと息つきながら、場内を動き回る女の子の様子をチェックしておきましょう。',
        },
        {
          title: '自由に指名',
          body: '皇堡は「自由閲覧」スタイル。固定のショータイムはなく、多国籍の女の子が場内の各エリアに散らばっています。どのエリアでも、気になった子にその場で声をかけてマネージャーに伝えるだけ。だから選ぶ流れがとても自然で、プレッシャーを感じることもありません。',
        },
        {
          title: 'テーマルーム',
          body: '皇堡最大の目玉——作り込まれたテーマルームが20室以上。監獄の取調室、教室、オフィス、飛行機の客室、病院、救急車（看板の部屋）、ボクシングリング、ゴルフ場など。各部屋にセット・小道具・衣装が完備され、女の子はシチュエーション体験の専門トレーニングを受けています。',
        },
        {
          title: '60分のサービス',
          body: '全編シチュエーション型のふれあいサービスです。場面を選び、衣装を指定し、やり取りの流れを自分で組み立てるなど、体験は自由自在にカスタマイズできます。女の子は最後まで役になりきって演じてくれるので、没入感は抜群。なかでも日本・韓国の女の子は、シチュエーションへの入り込み度で最も高い評価を得ています。別途10%のサービス料と5%の観光税がかかります。',
        },
        {
          title: '休憩・宿泊',
          body: 'ロビーにはリクライニングチェアがあり、宿泊（24時間）も可能です。皇堡の体験の核はテーマルームであって休憩設備ではないため、宿泊時の快適さを最優先するならマジェスティスパ（尊貴水療）をおすすめします。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-east-castle-01-gym-theme-room',
          caption: 'イーストキャッスルスパ（東方皇堡水療）を代表するジム・テーマルームは、本格的なトレーニング機材と小道具を完備。没入型ロールプレイの先駆けたる所以を体感できます。',
          alt: 'マカオ サウナ｜イーストキャッスルスパのジムルーム',
        },
        {
          file: 'macau-sauna-spa-east-castle-02-east-castle-brand-wall',
          caption: 'ロビーに足を踏み入れると、ムード照明に浮かぶLEDのブランドウォールが、その先に広がるテーマ空間への期待を静かに高めます。',
          alt: 'イーストキャッスルスパ ブランドウォール｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-03-led-stage-bath-pool',
          caption: 'ドラマティックな照明に包まれた広々とした浴池。湯に浸かりながら、フロアの様子をゆったり見渡してお選びいただけます。',
          alt: 'マカオ サウナ｜イーストキャッスルスパの浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '机に黒板、細部まで揃えた小道具——教室をテーマにしたルームが、ロールプレイをよりリアルで途切れない世界へと誘います。',
          alt: 'イーストキャッスルスパ 教室テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-east-castle-05-hospital-ward-room',
          caption: '病室をテーマにしたルームは、ベッドや診療設備まで作り込んだ本格的なしつらえ。完全没入のロールプレイのために設えられた空間です。',
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
          caption: '機内をテーマにしたルームは、座席からキャビンの細部まで再現。ロールプレイのシナリオを次のステージへと押し上げます。',
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
        'ウォーターベッドルームは1名分の料金で2名利用',
        'きめ細やかなサービス',
        '午前3時以降は個室休憩室が無料',
      ],
      bestFor: '静かでプライベートな体験を求める方',
      features: [
        'おすすめ度⭐⭐⭐⭐',
        'サービスの質にこだわり',
        '広々とした休憩エリア',
        '静かでくつろげる空間',
        '知る人ぞ知る隠れ家',
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
          title: '気軽な女の子選び',
          body: 'ヴィクトリアには決まったショータイム（セレクションショー）はありません。マネージャーに好みを伝えれば、ご希望に合った女の子を手配してもらえます。すべてあなたのペースで進み、急かされることもプレッシャーもない、マカオで最もリラックスできる選び方です。',
        },
        {
          title: '女の子を選ぶ',
          body: '在籍する女の子は中国・ベトナム・日本・韓国などの多国籍。ヴィクトリアはきめ細やかで丁寧なサービスに定評があり、口コミでも全体のサービスの質が安定していると評判です。料金・値段はMOP 2,298〜MOP 6,998で、別途10%のサービス料がかかります。',
        },
        {
          title: '60分のサービス',
          body: '個室に入り、60分の1対1サービスを楽しみます。看板のウォーターベッドルームは静かでプライベート。オーシャニックロイヤルに匹敵するサービスを、よりお手頃な料金で味わえます。',
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
          caption: 'キャットウォークのステージが柔らかなランウェイ照明に輝き、ゆったりと寛げるショータイムへの準備が整います。',
          alt: 'ヴィクトリアサウナ ショータイムの舞台｜マカオ サウナ',
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
          file: 'macau-sauna-spa-victoria-08-private-waterbed-room',
          caption: 'プライベートなウォーターベッドルーム。一対一の上質なサービスのための静かな空間です。',
          alt: 'ヴィクトリアサウナ 個室ウォーターベッド｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: 'ステージに面した快適な観賞エリア。お選びになる前に、ゆったりとショータイムをご覧いただけます。',
          alt: 'ヴィクトリアサウナ ショータイム観賞席｜マカオ サウナ',
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晉會MCLUB',
      highlights: [
        'イーストキャッスルの姉妹店',
        'KTVテーマ個室',
        '温泉房',
        'さらに豪華な内装',
      ],
      bestFor: '豪華なテーマ体験',
      features: [
        'おすすめ度⭐⭐⭐⭐',
        'テック感あふれる内装',
        '豊富なテーマ個室',
        'テーマ演出体験',
        'KTVパーティーモード',
        '近未来デザイン',
        '24時間営業',
      ],
      flow: [
        {
          title: '到着・チェックイン',
          body: 'イーストキャッスルスパ（東方皇堡水療）の姉妹店であるエムクラブに到着します。よりプレミアムでハイエンドな位置づけで、内装も皇堡よりさらに洗練されています。KTV房や温泉房といった独自の設備を備えています。フロントで受付を済ませ、リストバンドを受け取りましょう。',
        },
        {
          title: '入浴・リラックス',
          body: 'バスエリアとサウナを満喫。エムクラブには温泉房があり、プライベートな温泉の湯浴みを体験できます。他店にはない独自の設備です。',
        },
        {
          title: '無料の食事',
          body: '各種の食事を無料でお楽しみいただけます。ダイニングは全体の豪華な内装に調和した、居心地のよい空間です。',
        },
        {
          title: '自由に指名',
          body: '皇堡と同じく自由に見て回るスタイルで、多国籍の女の子が館内の各エリアにいるので、いつでもお選びいただけます。決まったショータイムを待つ必要はありません。',
        },
        {
          title: 'KTV・テーマ個室',
          body: 'エムクラブ独自のKTVテーマ個室では、歌いながらサービスを楽しめます。温泉房など豪華なテーマの選択肢もあり、皇堡よりハイグレードな内装で、1室あたりの造りもより贅沢です。',
        },
        {
          title: '60分のサービス',
          body: '全編にわたるテーマ演出のインタラクティブサービスで、体験やシーンを自分好みにカスタマイズできます。料金は皇堡よりやや高めですが、個室の設備と内装はより豪華です。別途 10% のサービス料がかかります。',
        },
        {
          title: '休憩・宿泊',
          body: 'ロビーのリクライニングチェアで、宿泊（24時間）してゆっくり休めます。エムクラブは皇堡より客足が少なく、比較的静かな環境です。',
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
          caption: '大型スクリーンを備えたプライベートKTVラウンジ。歌を楽しみながらサービスを満喫できる、パーティーモード全開の空間です。',
          alt: 'エムクラブ 大型スクリーンKTVラウンジ｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: 'オーロラ調のムード照明に包まれたギャラクシーベッドルーム。エムクラブ名物のプラネットシリーズの一室で、テックの極みを体感できます。',
          alt: 'マカオ サウナ｜エムクラブのギャラクシールーム',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: '日本の温泉を模したバブルバスルーム。和の意匠で統一された空間で、プライベートな湯浴みをお楽しみいただけます。',
          alt: 'エムクラブ 和風バブルバスの浴槽｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-09-masquerade-prop-display',
          caption: 'キャンドルの灯りと衣装小物をしつらえたコスプレテーマの演出が、没入感あふれるシーンを描き出します。',
          alt: 'マカオ サウナ｜エムクラブのコスプレテーマ演出',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: 'ビリヤード台を配したプールテーブルテーマの個室。遊びとサービスをひと部屋で味わえます。',
          alt: 'エムクラブ ビリヤードテーマ個室｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '近未来的な内装とゲーミング機材を揃えたレーシングシミュレーターのゲームルーム。サイバーパンクな遊び心を堪能できます。',
          alt: 'マカオ サウナ｜エムクラブのレーシングゲームルーム',
        },
        {
          file: 'macau-sauna-spa-mclub-12-tatami-classroom-room',
          caption: '教室をテーマにしたルーム。没入感のあるコスプレシーンを楽しめるよう設えられています。',
          alt: 'エムクラブ 教室テーマルーム｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: 'ダーツを備えたゲームラウンジ。充実した設備で、ハイテクな空間に溶け込む気軽な社交スペースです。',
          alt: 'マカオ サウナ｜エムクラブのダーツラウンジ',
        },
        {
          file: 'macau-sauna-spa-mclub-14-red-theme-playroom',
          caption: '鮮やかな赤で統一されたプレイルーム。没入感あふれるコスプレシーンへと誘う一室です。',
          alt: 'エムクラブ 赤テーマのプレイルーム｜マカオ サウナ',
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
        '在籍する女の子はマカオ最多',
        '国際色がもっとも豊富',
        '初めての体験におすすめ',
        '名物の無料ステーキ',
      ],
      bestFor: '初めての方',
      features: [
        'おすすめ度⭐⭐⭐⭐⭐',
        'マカオの人気サウナ',
        '多国籍から選べる',
        '日本語対応・無料送迎',
        '圧巻のショータイム',
        '宿泊OK・24時間営業',
      ],
      flow: [
        {
          title: '到着・チェックイン',
          body: 'ナンバーワンサウナに到着したら、フロントで受付し、リストバンドとロッカーの鍵を受け取ります。ロッカールームは広々としていて、設備も新しく快適です。',
        },
        {
          title: '入浴・リラックス',
          body: '館内には大型のジャグジー、ドライサウナ、スチームサウナがあり、照明はやわらかく落ち着いた雰囲気。まずは20〜30分ほど湯に浸かって心身をほぐし、コンディションを整えるのがおすすめです。',
        },
        {
          title: '無料のお食事',
          body: '滞在中はずっと無料・食べ放題。名物のステーキはナンバーワンで一番人気のメニューで、ほかにもチャーハン、焼きそば、新鮮なフルーツの盛り合わせ、冷えたビールが揃います。広々としたダイニングで、大ホールの様子を眺めながら食事を楽しめます。',
        },
        {
          title: '大規模なショータイム',
          body: '毎晩多国籍の女の子がグループに分かれて大ホールのランウェイを巡り、プロ仕様の照明と音響で登場——まさに圧巻の光景です。1ラウンドは約30分。中国・ベトナム・タイ・台湾・日本・韓国・ロシア・ウクライナなど多彩な顔ぶれが揃い、マカオ最大規模かつ最も国際色豊かなショータイムです。',
        },
        {
          title: '女の子を選ぶ',
          body: '気になった番号をマネージャーに伝えると、その女の子のサービスのランクと対応する料金を確認してくれます。料金はランクに応じてMOP 2,199〜MOP 7,699。ピーク時（週末の22:00〜00:00）は人気の女の子に待ちが出ることもあるので、早めの入場がおすすめです。',
        },
        {
          title: '60分のサービス',
          body: '個室へ移動し、一対一のウォーターベッドによる専属サービスへ。ナンバーワンはこのウォーターベッドのサービスでマカオ中に名を知られています。女の子2名による同時サービスを追加することも可能です（料金は現地にてご確認ください）。そのほか、耳かき・ネイルケア・背中マッサージなどの有料の小サービスもあります。',
        },
        {
          title: '休憩・宿泊（24時間）',
          body: 'サービスの後は、リクライニングチェアの休憩スペースで休んだり、そのまま宿泊（24時間）したりできます。ピーク時の休憩スペースはにぎやかになるため、静かに眠りたい方は深夜2時以降の就寝がおすすめ。6〜8時が最も静かな時間帯です。翌日は無料の朝食を楽しんでから、ゆっくりと退館できます。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: 'ナンバーワンサウナ（壹號桑拿）のシグネチャーラウンジは、LEDキューブシートと柔らかな間接照明が織りなす上質な空間。ショータイムの前後にゆったりとくつろげます。',
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
          caption: 'プレミアムスパスイートは、ホテル仕様の上質な寝具を備えた完全個室。マンツーマンのひとときのために設えられた特別な空間です。',
          alt: 'ナンバーワンサウナ プレミアム個室スイート｜マカオ サウナ',
        },
        {
          file: 'macau-sauna-spa-number-one-07-gold-water-bed-room',
          caption: 'ゴールドトーンで統一されたウォーターベッドルームは、洗練された間接照明が際立つ上質な仕上がり。',
          alt: 'ナンバーワンサウナ ゴールドのウォーターベッド個室｜マカオ サウナ',
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
          caption: 'ナンバーワンサウナ（壹號桑拿）のレセプションロビーは、洗練されたおもてなしの舞台。チェックインから、ショータイムの体験が幕を開けます。',
          alt: 'ナンバーワンサウナ レセプションロビー｜マカオ サウナ',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪門桑拿殿、Familia Nobre',
      highlights: [
        '全店最大級',
        'サービス料無料',
        '高品質なコスパの一軒',
      ],
      bestFor: 'コスパ重視の方に',
      features: [
        'おすすめ度⭐⭐⭐⭐⭐',
        'マカオ最大級のサウナ',
        '部屋数が最多',
        '安定したサービス',
        '最高のコストパフォーマンス',
        'サービス料無料',
        '24時間営業',
      ],
      flow: [
        {
          title: '到着・入店',
          body: 'マカオ半島・新口岸エリアのファミリアノブレへは無料送迎でアクセス可能。到着したらフロントで受付し、リストバンドとロッカーキーを受け取ります。更衣室には荷物を無料で預けられる安全なロッカーを完備。バスローブに着替えれば、すぐに体験スタートです。',
        },
        {
          title: '入浴・リラックス',
          body: 'バスエリアはマカオ最大級の広さで、複数のジャグジーとサウナルームを備え、ゆったりとして混雑しません。ピーク時でも行列に並んで待つことはありません。',
        },
        {
          title: '無料の飲食',
          body: 'ステーキ・冷えたビール・各種炒め物を無料でお楽しみいただけます。ファミリアノブレのステーキとビールは常連客からの評価が高い一品。ダイニングエリアは広く快適で、追加料金なしの食べ放題・飲み放題です。',
        },
        {
          title: '女の子のセレクション',
          body: 'マネージャーの案内で女の子が目の前に一列に並ぶので、間近で見ながら自分のペースで選べます。各グループの料金ランクは事前に案内されるため、選ぶ前に金額がはっきり分かります。',
        },
        {
          title: '女の子を選ぶ',
          body: '全行程サービス料は無料。表示価格がそのまま最終価格で、隠れた費用や追加料金は一切ありません。料金は MOP 2,388 〜 MOP 6,988 で、マカオで最もコスパの高い選択肢。広い館内と豊富な部屋数のため、待ち時間はほぼありません。',
        },
        {
          title: '60分のサービス',
          body: '個室に入り、一対一のプライベートなサービスをお楽しみいただけます。ファミリアノブレは部屋数がマカオ最多のため、混雑時でもほとんど待つことなく、スムーズに体験いただけます。',
        },
        {
          title: '休憩・宿泊',
          body: 'リクライニングチェアが全店最多の広々とした休憩エリア。チェアの間隔も広く、宿泊（24時間）の快適さは抜群です。騒がしいショータイムに邪魔されることもなく、静かに休めます。翌日は無料の飲食を楽しんでから退店できます。',
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
          caption: '紫のLEDと柔らかな灯りに満たされたテーマルーム。ホテル仕様の上質な寝具を整え、一対一のプライベートな時間にふさわしい設えです。',
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
          file: 'macau-sauna-spa-familia-nobre-09-silver-water-bed-room',
          caption: 'ムード照明に輝くシルバートーンのウォーターベッドルーム。柔らかなウォーターベッドが、深く身を委ねるひとときを誘います。',
          alt: 'ファミリアノブレ シルバーのウォーターベッド室｜マカオ サウナ',
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
          caption: '女の子を選ぶセレクションエリア。8カ国の女の子が18時までは対面で、それ以降はホールのランウェイでのショータイムでお出迎えします。',
          alt: 'マカオ サウナ｜ファミリアノブレ 女の子のセレクションエリア',
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: 'オーシャニック・ロイヤル・スパ、帝湖水療、帝湖桑拿、Oceanic Royal Spa',
      highlights: [
        '参考料金 MOP 2,299〜7,099',
        '24時間営業・スタッフも24時間対応',
        'ショーケース形式の紹介',
        'テーマルーム、ダイニング、リクライナーラウンジ',
      ],
      bestFor: '営業再開後にタイパで一晩ゆっくり過ごしたい方',
      staffValue: '140+',
      staffNote: '中国、ベトナム、タイ、台湾、日本、韓国、ロシア、ウクライナ',
      features: [
        '現在一時休業中・利用および予約は不可',
        '日本・韓国系のラインアップ',
        'ショーケース形式の紹介',
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
          caption: 'プールとステージを備えた空間。紹介演出を感じさせる室内です。',
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
  alsoKnownAs: '亦稱：',
  labels: {
    referencePrice: '參考價格',
    discountCta: '聯繫我們獲取優惠 →',
    staff: '技師',
    staffValue: '多國籍技師',
    staffTeam: '多國籍技師團隊',
    staffNationalities: '中、越、泰、台、日、韓、俄、烏',
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
    show: '技師走秀',
    overnight: '可過夜',
    open24h: '24 小時營業',
    jpkr: '日韓技師',
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
        '坐檯陪唱三個等級',
        '套票唱K+水療一晚完成',
      ],
      bestFor: '唱K兼有人陪飲',
      features: [
        'KTV連坐檯',
        '酒水任飲',
        '私密包廂高清音響',
        'KTV+水療套票',
        '利澳酒店3樓',
      ],
      flow: [
        {
          title: '預約包廂',
          body: '透過我們預約，講明人數、時段與想玩的方式（坐檯 / 套票 / 水療）。開幕初期建議提前預約，包廂與陣容安排會較順。',
        },
        {
          title: '抵達利澳酒店',
          body: '前往新口岸利澳酒店 3 樓，各口岸與主要酒店短程直達，亦可由我們安排免費私人專車接送。到場報預約名字即有專人帶位。',
        },
        {
          title: '入包廂選技師',
          body: '入包廂後由現場介紹技師供您選擇，坐檯與套票的詳細等級此時會逐一說明。坐檯項目分三個價位等級（MOP 1,300 / 1,500 / 2,000）。',
        },
        {
          title: '坐檯陪唱',
          body: '技師入包廂陪坐、陪唱、陪飲——私密包廂配高清音響，商務應酬洽談娛樂兩不誤，朋友暢聚亦夠氣氛。',
        },
        {
          title: '套票轉場水療',
          body: '選招牌套票的話，陪唱陪飲 1 小時後轉場水療按摩 1 小時，暢飲版酒水任飲。套票分越式與唐式系列，公開價位 MOP 3,288 至 5,088。',
        },
        {
          title: '暢玩至凌晨',
          body: '營業至凌晨 4 時，唱K、陪飲、按摩按自己節奏進行。不設過夜——散場後新口岸截車方便，也可預約回程專車。',
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
          caption: '金箔龍鷹掛畫下宴客最有面子；門一關，音響、燈光與陪唱都只屬於你們這一枱。',
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
          caption: '橙色絎縫梳化配虎豹水晶掛畫——喇叭掛好、燈光調暗，坐檯陪唱的主場就是這種包廂。',
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
        '最大走秀舞台',
        '招牌紅色水床',
        '皇者奢華風格',
      ],
      bestFor: '最大走秀舞台／氹仔奢華首選',
      features: [
        '推薦指數⭐⭐⭐⭐⭐',
        '2026年5月1日氹仔全新開業',
        '全澳最大走秀大廳',
        '招牌紅色水床聚光燈房型',
        '睡房結合水床整合式套房',
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
          title: '全澳最大走秀大廳',
          body: '招牌賣點：多層玻璃欄杆走秀大廳配深藍霓虹燈光，曼濠定位為全澳最大規模的走秀體驗，宏大的舞台讓挑選技師成為主場體驗而非例行步驟。確定後由經理確認價格檔次（MOP 2,488 至 6,088）。',
        },
        {
          title: '整合式套房與招牌水床',
          body: '客房採用整合式設計——奢華睡房配置（壁畫牆面、超大床、沙發、檯燈）結合招牌紅色水床及戲劇性聚光燈效果。睡房與水床設於同一私密房間，服務期間無需轉移房間。',
        },
        {
          title: '60分鐘服務',
          body: '於私密套房享受 60 分鐘服務。多國籍技師陣容，按摩風格相應配對。燈光、音響、浴缸均可在房內操控。',
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
          caption: '曼濠水療的招牌亮點——全澳最大規模走秀大廳，多層玻璃欄杆走道配深藍霓虹燈光，讓挑選技師化作主場時刻。',
          alt: '曼濠水療走秀大廳',
        },
        {
          file: 'macau-sauna-spa-manhao-03-red-water-bed-suite',
          caption: '招牌紅色水床在單束戲劇性聚光燈下發亮，睡房結合水床的整合式套房，盡顯私密格調。',
          alt: '曼濠水療招牌紅色水床套房',
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
        '現代化舞台娛樂',
        '多款氛圍主題房',
        '巴厘島+日式按摩',
      ],
      bestFor: '嘗鮮最新場',
      features: [
        '特色房間',
        '時裝秀舞台娛樂',
        '多元化海選',
        '花樣道具',
        '主打日韓',
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
          title: '舞台技師介紹環節',
          body: '娛樂大廳配備專業舞台燈光及 LED 螢幕，技師介紹環節的視覺效果為全澳最具現代感。國際技師團隊在舞台上介紹，場面新穎獨特。',
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
          caption: '主舞台大廳在星形霓虹背景與專業燈光下熠熠生輝——玖號招牌的沉浸式走秀，全澳最具現代感的海選體驗。',
          alt: '玖號水療主舞台大廳',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '格調餐飲區，免費供應牛排、海鮮、湯麵等多樣熱食，將用餐納入整體享受。',
          alt: '玖號水療餐飲區',
        },
        {
          file: 'macau-sauna-spa-number-nine-12-waterbed-room',
          caption: '水床特色房，氛圍燈光配舒適水床，營造獨特的沉浸式停留。',
          alt: '玖號水療水床特色房',
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
        '日式泡泡浴專家',
      ],
      bestFor: '日式體驗愛好者',
      features: [
        '推薦指數⭐⭐⭐⭐⭐',
        '惠顧指定套式送師傅工',
        '日式泡泡浴',
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
          title: '精品挑選',
          body: '尚品採用精品式挑選模式——告知經理你的喜好及預算後，經理會逐一安排技師面對面見面。無需觀看大型技師介紹，整個過程私密、從容，適合不喜歡熱鬧場面的客人。',
        },
        {
          title: '選擇技師',
          body: '全場多國籍技師以質素取勝，主要為中國及日本籍，外貌及服務質素均屬上乘。尚品的定位為「中等價位、高端質素」，性價比極為突出。',
        },
        {
          title: '60分鐘服務',
          body: '每間房間均設有獨立浴缸，私密度高。尚品以日式泡泡浴（ソープランド）為招牌服務。',
        },
        {
          title: '休息過夜',
          body: '可過夜休息，大堂設免費躺椅休息區，另有付費獨立休息房；因場所規模精品化，客流量較少，環境安靜舒適。非高峰時段技師數量可能較少，建議晚間入場。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: '尚品國際水療招牌紫色展示舞台，葡京人酒店內的路氹會所，氛圍燈光盡顯華麗格調。',
          alt: '尚品國際水療紫色展示舞台',
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
          caption: '圓窗鏡面舞台配階梯座位，私密精品式挑選空間，告別傳統大型走秀。',
          alt: '尚品國際水療鏡面舞台階梯',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '現代化按摩浴池濕區，明亮整潔的泡浴環境，正合這家日式泡泡浴特色場館。',
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
          caption: '精品式挑選舞台，告知喜好與預算後由經理逐一安排，過程私密從容。',
          alt: '尚品國際水療挑選舞台',
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
        '兩位技師同行最抵',
        '免服務費',
        '買一送一（詳情於預約時說明）',
      ],
      bestFor: '豪華環境／過夜首選',
      features: [
        '推薦指數⭐⭐⭐⭐',
        '澳門最奢華裝修',
        '走秀看風景模式',
        '十多種主題房間',
        'KTV房派對模式',
        '近距離互動體驗',
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
          title: '景觀線走秀',
          body: '大廳「景觀線」走秀形式——多國籍技師排列成線，部分技師會主動微笑、輕觸互動，氣氛輕鬆自然，不像其他場所那麼拘謹。走秀過程中可以近距離觀察，挑選壓力較小。',
        },
        {
          title: '選擇技師',
          body: '選擇心儀技師後，經理確認價格檔次。價格區間 MOP 2,799 至 MOP 6,699。',
        },
        {
          title: '60分鐘服務',
          body: '進入寬敞的豪華房間，配氣氛燈光及高級傢俱。空間感舒適，是追求環境質素的首選。',
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
        {
          file: 'macau-sauna-spa-majesty-08-medical-theme-room',
          caption: '醫療主題房，潔淨格調的角色扮演佈置，是精心設計主題系列的一員。',
          alt: '尊貴水療醫療主題房',
        },
        {
          file: 'macau-sauna-spa-majesty-09-cosplay-costume-room',
          caption: '角色扮演主題房，備有特色制服與道具佈置，是十多種主題房的亮點之一。',
          alt: '尊貴水療角色扮演主題房',
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
        '主題房間（辦公室、教室、醫院）',
        '水床服務',
      ],
      bestFor: '時間靈活／主題體驗',
      features: [
        '推薦指數⭐⭐⭐',
        '英皇娛樂酒店本館',
        '全新主題房間',
        '多種特色主題',
        'DJ室體驗',
        '電影院主題',
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
          title: '精品挑選',
          body: '極品採用精品式面對面挑選——經過嚴格篩選的多國籍高質技師，走的是「少而精」路線，每位技師的外貌及服務質素都經過把關。沒有大型走秀，經理會根據你的喜好逐一介紹，挑選過程從容私密。',
        },
        {
          title: '水床或主題房間',
          body: '極品提供水床及情境主題房——你可以選擇傳統莞式水床體驗，或選擇主題房間（辦公室、教室、醫院等）。主題房間另加 MOP 440，可完全自選服飾及互動風格。',
        },
        {
          title: '60分鐘服務',
          body: '進入房間享受約60分鐘的專屬服務，另收 10% 服務費。極品的泰式及上海式按摩即使選擇較簡單的房型，專業水準也相當高。',
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
          caption: '走進全新醫院情境主題房，逼真佈景打造沉浸式角色扮演，可加點 MOP 440 升級體驗。',
          alt: '極品桑拿醫院主題房',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '圖案地磚走廊串連各情境主題房，柔和燈光一路引向 DJ 室、辦公室、電影院等房型。',
          alt: '極品桑拿主題房走廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: '皮革床頭主題套房，訂製氛圍燈光配酒店級寢具，是私密從容的專屬服務空間。',
          alt: '極品桑拿皮革床頭套房',
        },
        {
          file: 'macau-sauna-spa-excellent-05-mosaic-waterbed-room',
          caption: '馬賽克水床特色房，氛圍靜謐，適合純粹放鬆。',
          alt: '極品桑拿馬賽克水床房',
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
        '8,000萬奢華打造',
        '主題套房',
        '招牌水床',
      ],
      bestFor: '最新奢華／主題套房首選',
      features: [
        '推薦指數⭐⭐⭐⭐⭐',
        '2026年5月15日全新開業',
        '港幣8,000萬奢華打造',
        '酒店級主題套房',
        '網紅級／明星級技師領銜',
        '招牌水床特色房',
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
          title: '選擇技師',
          body: '認識國際技師陣容，包括網紅級及明星級技師領銜駐場。技師媒合以私密觀賞模式進行而非舞台表演，配合品牌靜雅尊貴的整體格調。確認後由經理確認價格檔次（MOP 2,488 至 7,388），詳細項目可即場查詢。',
        },
        {
          title: '主題套房或水床房型',
          body: '選擇多款主題套房——每間配備訂製氛圍燈光、優質寢具及酒店級裝飾——或選擇巨亨招牌水床特色房型。如有興趣，亦可加配特色情趣制服體驗。',
        },
        {
          title: '60分鐘服務',
          body: '進入私密房間享受60分鐘服務。按摩風格涵蓋台式、日式及巨亨招牌水床特色服務。房間以舒適為先，浴缸、燈光、音響均可在床邊操控。',
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
          caption: '在燭光大理石套房裡安頓下來，全白雲石牆面與暖光，盡顯港幣 8,000 萬的奢華工藝。',
          alt: '巨亨桑拿大理石主題套房',
        },
        {
          file: 'macau-sauna-spa-empire-05-ocean-led-waterbed-room',
          caption: '躺上招牌水床，海洋藍光緩緩流動——巨亨桑拿最迷人的享受。',
          alt: '巨亨桑拿招牌水床房',
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
        '主題情境服務',
        '主題場景互動體驗',
      ],
      bestFor: '主題場景房／情境體驗',
      features: [
        '推薦指數⭐⭐⭐⭐',
        '20+ 主題情景房間',
        '澳門主題情境開創者',
        '情景主題體驗',
        '專業服務團隊',
        '24小時營業',
        '私密安全環境',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達東方皇堡水療，這裡是澳門主題場景房的鼻祖，以主題情境服務聞名。前台登記後領取手牌；參考價格為 MOP 2,388 至 6,498，詳細項目請於預約時確認。',
        },
        {
          title: '沐浴放鬆',
          body: '享用沐浴設施及桑拿放鬆身心。皇堡的特色在於技師會在場所各處活動互動，你可以邊泡澡邊觀察挑選。',
        },
        {
          title: '免費餐飲',
          body: '免費享用各式餐飲，可在用餐區休息的同時留意場內技師動態。',
        },
        {
          title: '自由挑選',
          body: '皇堡採用「自由瀏覽」模式——沒有固定技師介紹時間，多國籍技師分佈在場所各區域，你可隨時在任何區域遇到並挑選心儀技師，告知經理即可。這種模式讓整個挑選過程更自然、無壓力。',
        },
        {
          title: '主題房間',
          body: '皇堡最大賣點——超過 20 款精心設計的主題房間，包括監獄審訊室、教室、辦公室、飛機艙、醫院、救護車（招牌房型）、拳擊場、高爾夫球場等。每間房都有完整的佈景、道具及服飾，技師經過專業情境體驗培訓。',
        },
        {
          title: '60分鐘服務',
          body: '全程主題情境互動服務，您可自訂體驗——選擇場景、指定服飾、設計互動方式。技師會全程配合場景演出，體驗感極強。日韓技師在情境投入度方面評價最高。另收 10% 服務費及 5% 旅遊稅。',
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
          caption: '寬敞的造景浴池配絢麗燈光，泡浴同時靜靜觀賞場內動態、慢慢挑選。',
          alt: '東方皇堡 LED 舞台浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '教室主題情景房，課桌、黑板等完整佈景與道具，角色扮演體驗一氣呵成。',
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
          caption: '飛機艙主題情景房，艙內座椅與細節佈景，將角色扮演主題推向新高度。',
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
        '水床買一送一',
        '服務細心周到',
        '凌晨3:00後免費獨立休息房',
      ],
      bestFor: '追求安靜私密體驗',
      features: [
        '推薦指數⭐⭐⭐⭐',
        '注重服務質量',
        '寬敞休息區域',
        '安靜放鬆環境',
        '隱藏寶藏會所',
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
          title: '自由配對',
          body: '凱旋門沒有固定的技師介紹表演或走秀環節——告知經理你的喜好後，經理會根據你的要求安排合適的技師見面。整個過程完全按照你的節奏進行，沒有任何壓力或催促，是全澳最輕鬆自在的挑選方式。',
        },
        {
          title: '選擇技師',
          body: '多國籍技師在場，包括中國、越南、日本及韓國籍。凱旋門的服務以細緻周到著稱，技師整體服務質素穩定。價格區間 MOP 2,298 至 MOP 6,998，另收 10% 服務費。',
        },
        {
          title: '60分鐘服務',
          body: '進入房間享受60分鐘一對一服務。招牌水床房型私密安靜，服務品質與帝湖相若但價格更實惠，性價比極高。',
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
          caption: '走秀舞台在柔和伸展台燈光下亮起，主打輕鬆寫意的觀賞氛圍。',
          alt: '凱旋桑拿走秀舞台',
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
          file: 'macau-sauna-spa-victoria-08-private-waterbed-room',
          caption: '私人水床房——私密安靜的一對一服務空間。',
          alt: '凱旋桑拿私人水床房',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: '舒適的走秀觀賞區面向舞台，悠閒欣賞後再從容挑選。',
          alt: '凱旋桑拿走秀觀賞區',
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晉會、澳門M Club',
      highlights: [
        '東方皇堡姊妹店',
        'KTV主題房間',
        '溫泉房',
        '裝修更豪華',
      ],
      bestFor: '豪華主題體驗',
      features: [
        '推薦指數⭐⭐⭐⭐',
        '科技感風格',
        '豐富主題房間',
        '主題情境體驗',
        'KTV房派對模式',
        '未來科技裝修',
        '24小時營業',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達晉會MCLUB，作為東方皇堡的姊妹店，定位更為豪華高端。裝修風格比皇堡更為精緻，設有KTV房間及溫泉房等獨家設施。前台登記後領取手牌。',
        },
        {
          title: '沐浴放鬆',
          body: '享用沐浴設施及桑拿，晉會設有溫泉房，可體驗私密溫泉泡湯，是其他場所沒有的獨特設施。',
        },
        {
          title: '免費餐飲',
          body: '免費享用各式餐飲，用餐環境配合整體豪華裝修風格，環境舒適。',
        },
        {
          title: '自由挑選',
          body: '與皇堡相同的自由瀏覽模式，多國籍技師在場所各區域活動，可隨時選擇。無需等候固定技師介紹時間。',
        },
        {
          title: 'KTV及主題房間',
          body: '晉會獨有的KTV主題房間，可邊唱歌邊享受服務。另設有溫泉房等豪華主題選擇，裝修比皇堡更高級，每間房造價更高。',
        },
        {
          title: '60分鐘服務',
          body: '全程主題情境互動服務，可自訂體驗及場景。價格比皇堡略高，但房間設施及裝修更為豪華。另收 10% 服務費。',
        },
        {
          title: '休息過夜',
          body: '大堂設有躺椅可過夜休息。晉會客流量較皇堡少，環境相對安靜。',
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
          caption: '大屏幕私人KTV廳，邊唱歌邊享受服務，派對模式氣氛拉滿。',
          alt: '晉會MCLUB大屏幕KTV廳',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: '星空宇宙主題睡房，極光氛圍燈光科技感拉滿，招牌星球系列場景之一。',
          alt: '晉會MCLUB星空極光房',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: '日本溫泉泡泡浴主題房，私密泡湯體驗，日式主題情境佈置。',
          alt: '晉會MCLUB日本溫泉房',
        },
        {
          file: 'macau-sauna-spa-mclub-09-masquerade-prop-display',
          caption: '角色扮演主題佈置，燭光與特色制服道具，營造沉浸式主題情境。',
          alt: '晉會MCLUB角色扮演主題佈置',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: '桌球主題套房，桌球檯造景配主題情境，娛樂與服務一房兼備。',
          alt: '晉會MCLUB桌球主題套房',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '電玩遊戲房，未來科技裝修配遊戲設備，賽博朋克玩樂體驗。',
          alt: '晉會MCLUB賽車電玩房',
        },
        {
          file: 'macau-sauna-spa-mclub-12-tatami-classroom-room',
          caption: '教室主題房，課堂情境佈置，角色扮演主題沉浸式體驗之一。',
          alt: '晉會MCLUB教室主題房',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: '飛鏢遊戲休息廳，娛樂設施齊備，科技感裝修下的輕鬆社交空間。',
          alt: '晉會MCLUB飛鏢遊戲廳',
        },
        {
          file: 'macau-sauna-spa-mclub-14-red-theme-playroom',
          caption: '紅色主題Playroom，角色扮演主題情境佈置，營造大膽沉浸氛圍。',
          alt: '晉會MCLUB紅色主題遊戲房',
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
        '全澳技師最多',
        '國際化選擇最豐富',
        '推薦首次體驗',
        '招牌免費牛排',
      ],
      bestFor: '首次體驗者',
      features: [
        '推薦指數⭐⭐⭐⭐⭐',
        '澳門熱門桑拿',
        '多國籍選擇',
        '高質量保證',
        '視覺享受',
        '24小時營業',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達壹號桑拿後，在前台登記領取手牌及儲物櫃鑰匙。更衣室空間寬敞，設施簇新。',
        },
        {
          title: '沐浴放鬆',
          body: '場內設有大型按摩浴缸、乾蒸房及濕蒸房，燈光柔和舒適。建議先花20-30分鐘泡澡放鬆，調整身心狀態。',
        },
        {
          title: '免費餐飲',
          body: '全程無限量免費供應，招牌牛排是壹號最受歡迎的菜式，另有炒飯、炒麵、新鮮水果拼盤及凍啤酒。餐區寬敞，可邊用餐邊觀賞大廳動態。',
        },
        {
          title: '大型技師介紹會',
          body: '每晚多國籍技師分批沿大廳走秀介紹，燈光音響專業，場面壯觀。每輪約 30 分鐘，技師團隊涵蓋亞洲（中國、日本、韓國、台灣、越南、泰國）及歐洲（俄羅斯、烏克蘭）多國背景，為全澳規模最大、國際化程度最高的技師媒合會。',
        },
        {
          title: '選擇技師',
          body: '看中心儀號碼後告知經理，經理會確認該技師的服務檔次及對應價格。價格區間由 MOP 2,199 至 MOP 7,699，視技師類別而定。高峰時段（22:00-00:00週末）熱門技師可能需等候，建議提早入場。',
        },
        {
          title: '60分鐘服務',
          body: '進入獨立房間享受一對一專屬水床服務，壹號以水床服務聞名全澳。可加購兩位技師同行體驗，安排第二位技師同時服務（費用以現場為準）。另有付費小工服務：掏耳、修甲、捶背等。',
        },
        {
          title: '休息過夜',
          body: '服務後可在休息區躺椅休息或直接過夜。注意高峰時段休息區較為熱鬧，想安靜休息建議凌晨2點後入眠，6-8點為最安靜時段。翌日可享用免費餐飲後從容離場。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: '招牌休息廳以 LED 立方燈座配柔和氛圍燈光，是動態走秀前後從容歇息的角落。',
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
          caption: '高級水療套房，獨立私密空間配酒店級寢具，專為一對一服務打造。',
          alt: '壹號桑拿高級水療套房',
        },
        {
          file: 'macau-sauna-spa-number-one-07-gold-water-bed-room',
          caption: '金色調水床特色房，氛圍燈光細緻講究。',
          alt: '壹號桑拿金色水床房',
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
          caption: '壹號桑拿接待大堂，沉穩格調迎賓，前台登記後即展開動態走秀體驗。',
          alt: '壹號桑拿接待大堂',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪門桑拿、新豪門桑拿殿、澳門豪門桑拿',
      highlights: [
        '全場最大',
        '免收服務費',
        '高質素性價比之選',
      ],
      bestFor: '追求性價比',
      features: [
        '推薦指數⭐⭐⭐⭐⭐',
        '澳門最大型桑拿',
        '房間數量最多',
        '服務穩定',
        '最高性價比',
        '免服務費',
      ],
      flow: [
        {
          title: '抵達入場',
          body: '抵達豪門桑拿殿後在前台登記，領取手牌及儲物櫃鑰匙。更衣室設有安全儲物櫃可免費寄存行李，換上浴袍後即可開始體驗。',
        },
        {
          title: '沐浴放鬆',
          body: '場內沐浴空間為全澳面積最大，設有多個按摩浴缸及桑拿房，環境寬敞不擁擠。即使在高峰時段，也不會出現排隊等候的情況。',
        },
        {
          title: '免費餐飲',
          body: '免費享用牛排、凍啤及各式熱炒，豪門的牛排及凍啤在客人中口碑極佳。用餐區域寬敞舒適，全程無限量供應，無需額外付費。',
        },
        {
          title: '技師媒合環節',
          body: '經理會安排一排技師站在你面前，近距離觀察後從容挑選。每組技師對應的價格檔次會提前告知，讓你在選擇前清楚了解價格。',
        },
        {
          title: '選擇技師',
          body: '全程免收服務費，標價即為最終價格，無任何隱藏收費或額外加價。價格區間MOP 2,388至MOP 6,988，為全澳性價比最高的選擇。因場地及房間數量充裕，幾乎無需排隊等候。',
        },
        {
          title: '60分鐘服務',
          body: '進入獨立房間享受一對一專屬服務。豪門房間數量為全澳最多，即使在繁忙時段也幾乎不用等位，體驗流暢順利。',
        },
        {
          title: '休息過夜',
          body: '擁有全澳最多躺椅的寬敞休息區，躺椅間距較大，過夜舒適度高。沒有嘈雜的娛樂表演打擾，適合安靜休息。翌日可享用免費餐飲後離場。',
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
          caption: '紫色 LED 氛圍特色房，柔和燈光配酒店級寢具，為私密一對一服務而設。',
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
          file: 'macau-sauna-spa-familia-nobre-09-silver-water-bed-room',
          caption: '銀色水床特色房在氛圍燈光下泛著柔光，柔軟水床邀你沉浸放鬆。',
          alt: '豪門桑拿殿銀色水床房',
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
          caption: '技師媒合區，多國籍技師陣容，18:00 前面對面近距挑選，之後轉為大廳走秀模式。',
          alt: '豪門桑拿殿技師媒合區',
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: '帝湖桑拿、帝湖水療、Oceanic Royal Spa、Oceanic Royal Sauna',
      highlights: [
        '參考價格 MOP 2,299–7,099',
        '24 小時營業與技師輪值',
        '展示式技師介紹',
        '主題房、餐飲與躺椅休息區',
      ],
      bestFor: '恢復營業後，想在氹仔安排完整水療夜的客人',
      staffValue: '140+',
      staffNote: '中、越、泰、台、日、韓、俄、烏',
      features: [
        '目前暫停營業，不接待客人或提供預約',
        '日韓技師陣容',
        '展示式技師介紹',
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
          caption: '泳池與舞台空間，帶出展示式介紹的氛圍。',
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
  alsoKnownAs: '亦称：',
  labels: {
    referencePrice: '参考价格',
    discountCta: '联系我们获取优惠 →',
    staff: '技师',
    staffValue: '多国籍技师',
    staffTeam: '多国籍技师团队',
    staffNationalities: '中、越、泰、台、日、韩、俄、乌',
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
    viewLarger: '查看大圖',
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
    show: '技师走秀',
    overnight: '可过夜',
    open24h: '24 小时营业',
    jpkr: '日韩技师',
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
        '坐台陪唱三个等级',
        '套票唱K+水疗一晚完成',
      ],
      bestFor: '唱K兼有人陪饮',
      features: [
        'KTV连坐台',
        '酒水任饮',
        '私密包厢高清音响',
        'KTV+水疗套票',
        '利澳酒店3楼',
      ],
      flow: [
        {
          title: '预约包厢',
          body: '通过我们预约，讲明人数、时段与想玩的方式（坐台 / 套票 / 水疗）。开幕初期建议提前预约，包厢与阵容安排会较顺。',
        },
        {
          title: '抵达利澳酒店',
          body: '前往新口岸利澳酒店 3 楼，各口岸与主要酒店短程直达，亦可由我们安排免费私人专车接送。到场报预约名字即有专人带位。',
        },
        {
          title: '入包厢选技师',
          body: '入包厢后由现场介绍技师供您选择，坐台与套票的详细等级此时会逐一说明。坐台项目分三个价位等级（MOP 1,300 / 1,500 / 2,000）。',
        },
        {
          title: '坐台陪唱',
          body: '技师入包厢陪坐、陪唱、陪饮——私密包厢配高清音响，商务应酬洽谈娱乐两不误，朋友畅聚亦够气氛。',
        },
        {
          title: '套票转场水疗',
          body: '选招牌套票的话，陪唱陪饮 1 小时后转场水疗按摩 1 小时，畅饮版酒水任饮。套票分越式与唐式系列，公开价位 MOP 3,288 至 5,088。',
        },
        {
          title: '畅玩至凌晨',
          body: '营业至凌晨 4 时，唱K、陪饮、按摩按自己节奏进行。不设过夜——散场后新口岸截车方便，也可预约回程专车。',
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
          caption: '金箔龙鹰挂画下宴客最有面子；门一关，音响、灯光与陪唱都只属于你们这一台。',
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
          caption: '橙色绗缝沙发配虎豹水晶挂画——喇叭挂好、灯光调暗，坐台陪唱的主场就是这种包厢。',
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
        '最大走秀舞台',
        '招牌红色水床',
        '皇者奢华风格',
      ],
      bestFor: '最大走秀舞台／氹仔奢华首选',
      staffValue: '多国籍技师团队',
      staffNote: '中、越、泰、台、日、韩、俄、乌',
      overnightValue: '不可过夜',
      overnightNote: '— 过渡期暂不提供过夜，即将恢复24小时及过夜',
      features: [
        '推荐指数⭐⭐⭐⭐⭐',
        '2026年5月1日氹仔全新开业',
        '全澳最大走秀大厅',
        '招牌红色水床聚光灯房型',
        '睡房结合水床整合式套房',
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
          title: '全澳最大走秀大厅',
          body: '招牌卖点：多层玻璃栏杆走秀大厅配深蓝霓虹灯光，曼濠定位为全澳最大规模的走秀体验，宏大的舞台让挑选技师成为主场体验而非例行步骤。确定后由经理确认价格档次（MOP 2,488 至 6,088）。',
        },
        {
          title: '整合式套房与招牌水床',
          body: '客房采用整合式设计——奢华睡房配置（壁画墙面、超大床、沙发、台灯）结合招牌红色水床及戏剧性聚光灯效果。睡房与水床设于同一私密房间，服务期间无需转移房间。',
        },
        {
          title: '60分钟服务',
          body: '于私密套房享受 60 分钟服务。多国籍技师阵容，按摩风格相应配对。灯光、音响、浴缸均可在房内操控。',
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
          caption: '曼濠水疗的招牌亮点——全澳最大规模走秀大厅，多层玻璃栏杆走道配深蓝霓虹灯光，让挑选技师化作主场时刻。',
          alt: '曼濠水疗走秀大厅',
        },
        {
          file: 'macau-sauna-spa-manhao-03-red-water-bed-suite',
          caption: '招牌红色水床在单束戏剧性聚光灯下发亮，睡房结合水床的整合式套房，尽显私密格调。',
          alt: '曼濠水疗招牌红色水床套房',
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
        '现代化舞台娱乐',
        '多款氛围主题房',
        '巴厘岛+日式按摩',
      ],
      bestFor: '尝鲜最新场',
      features: [
        '特色房间',
        '时装秀舞台娱乐',
        '多元化海选',
        '花样道具',
        '主打日韩',
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
          title: '舞台技师介绍环节',
          body: '娱乐大厅配备专业舞台灯光及 LED 屏幕，技师介绍环节的视觉效果为全澳最具现代感。国际技师团队在舞台上介绍，场面新颖独特。',
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
          caption: '主舞台大厅在星形霓虹背景与专业灯光下熠熠生辉——玖号招牌的沉浸式走秀，全澳最具现代感的海选体验。',
          alt: '玖号水疗主舞台大厅',
        },
        {
          file: 'macau-sauna-spa-number-nine-11-dining-area',
          caption: '格调餐饮区，免费供应牛排、海鲜、汤面等多样热食，将用餐纳入整体享受。',
          alt: '玖号水疗餐饮区',
        },
        {
          file: 'macau-sauna-spa-number-nine-12-waterbed-room',
          caption: '水床特色房，氛围灯光配舒适水床，营造独特的沉浸式停留。',
          alt: '玖号水疗水床特色房',
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
        '日式泡泡浴专家',
      ],
      bestFor: '日式体验爱好者',
      features: [
        '推荐指数⭐⭐⭐⭐⭐',
        '惠顾指定套式送师傅工',
        '日式泡泡浴',
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
          title: '精品挑选',
          body: '尚品采用精品式挑选模式——告知经理你的喜好及预算后，经理会逐一安排技师面对面见面。无需观看大型技师介绍，整个过程私密、从容，适合不喜欢热闹场面的客人。',
        },
        {
          title: '选择技师',
          body: '全场多国籍技师以质素取胜，主要为中国及日本籍，外貌及服务质素均属上乘。尚品的定位为「中等价位、高端质素」，性价比极为突出。',
        },
        {
          title: '60分钟服务',
          body: '每间房间均设有独立浴缸，私密度高。尚品以日式泡泡浴（ソープランド）为招牌服务。',
        },
        {
          title: '休息过夜',
          body: '可过夜休息，大堂设免费躺椅休息区，另有付费独立休息房；因场所规模精品化，客流量较少，环境安静舒适。非高峰时段技师数量可能较少，建议晚间入场。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-elite-01-purple-showcase-stage',
          caption: '尚品国际水疗招牌紫色展示舞台，葡京人酒店内的路氹会所，氛围灯光尽显华丽格调。',
          alt: '尚品国际水疗紫色展示舞台',
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
          caption: '圆窗镜面舞台配阶梯座位，私密精品式挑选空间，告别传统大型走秀。',
          alt: '尚品国际水疗镜面舞台阶梯',
        },
        {
          file: 'macau-sauna-spa-elite-05-jacuzzi-wet-area',
          caption: '现代化按摩浴池湿区，明亮整洁的泡浴环境，正合这家日式泡泡浴特色场馆。',
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
          caption: '精品式挑选舞台，告知喜好与预算后由经理逐一安排，过程私密从容。',
          alt: '尚品国际水疗挑选舞台',
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
        '两位技师同行最抵',
        '免服务费',
        '买一送一（详情预约时说明）',
      ],
      bestFor: '豪华环境／过夜首选',
      features: [
        '推荐指数⭐⭐⭐⭐',
        '澳门最奢华装修',
        '走秀看风景模式',
        '十多种主题房间',
        'KTV房派对模式',
        '近距离互动体验',
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
          title: '景观线走秀',
          body: '大厅「景观线」走秀形式——多国籍技师排列成线，部分技师会主动微笑、轻触互动，气氛轻松自然，不像其他场所那么拘谨。走秀过程中可以近距离观察，挑选压力较小。',
        },
        {
          title: '选择技师',
          body: '选择心仪技师后，经理确认价格档次。价格区间 MOP 2,799 至 MOP 6,699。',
        },
        {
          title: '60分钟服务',
          body: '进入宽敞的豪华房间，配气氛灯光及高级家具。空间感舒适，是追求环境质素的首选。',
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
        {
          file: 'macau-sauna-spa-majesty-08-medical-theme-room',
          caption: '医疗主题房，洁净格调的角色扮演布置，是精心设计主题系列的一员。',
          alt: '尊贵水疗医疗主题房',
        },
        {
          file: 'macau-sauna-spa-majesty-09-cosplay-costume-room',
          caption: '角色扮演主题房，备有特色制服与道具布置，是十多种主题房的亮点之一。',
          alt: '尊贵水疗角色扮演主题房',
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
        '主题房间（办公室、教室、医院）',
        '水床服务',
      ],
      bestFor: '时间灵活／主题体验',
      features: [
        '推荐指数⭐⭐⭐',
        '英皇娱乐酒店本馆',
        '全新主题房间',
        '多种特色主题',
        'DJ室体验',
        '电影院主题',
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
          title: '精品挑选',
          body: '极品采用精品式面对面挑选——经过严格筛选的多国籍高质技师，走的是「少而精」路线，每位技师的外貌及服务质素都经过把关。没有大型走秀，经理会根据你的喜好逐一介绍，挑选过程从容私密。',
        },
        {
          title: '水床或主题房间',
          body: '极品提供水床及情境主题房——你可以选择传统莞式水床体验，或选择主题房间（办公室、教室、医院等）。主题房间另加 MOP 440，可完全自选服饰及互动风格。',
        },
        {
          title: '60分钟服务',
          body: '进入房间享受约60分钟的专属服务，另收 10% 服务费。极品的泰式及上海式按摩即使选择较简单的房型，专业水准也相当高。',
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
          caption: '走进全新医院情境主题房，逼真布景打造沉浸式角色扮演，可加点 MOP 440 升级体验。',
          alt: '极品桑拿医院主题房',
        },
        {
          file: 'macau-sauna-spa-excellent-03-patterned-tile-hallway',
          caption: '图案地砖走廊串连各情境主题房，柔和灯光一路引向 DJ 室、办公室、电影院等房型。',
          alt: '极品桑拿主题房走廊',
        },
        {
          file: 'macau-sauna-spa-excellent-04-leather-headboard-suite',
          caption: '皮革床头主题套房，订制氛围灯光配酒店级寝具，是私密从容的专属服务空间。',
          alt: '极品桑拿皮革床头套房',
        },
        {
          file: 'macau-sauna-spa-excellent-05-mosaic-waterbed-room',
          caption: '马赛克水床特色房，氛围静谧，适合纯粹放松。',
          alt: '极品桑拿马赛克水床房',
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
        '8,000万奢华打造',
        '主题套房',
        '招牌水床',
      ],
      bestFor: '最新奢华／主题套房首选',
      features: [
        '推荐指数⭐⭐⭐⭐⭐',
        '2026年5月15日全新开业',
        '港币8,000万奢华打造',
        '酒店级主题套房',
        '网红级／明星级技师领衔',
        '招牌水床特色房',
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
          title: '选择技师',
          body: '认识国际技师阵容，包括网红级及明星级技师领衔驻场。技师媒合以私密观赏模式进行而非舞台表演，配合品牌静雅尊贵的整体格调。确认后由经理确认价格档次（MOP 2,488 至 7,388），详细项目可即场查询。',
        },
        {
          title: '主题套房或水床房型',
          body: '选择多款主题套房——每间配备订制氛围灯光、优质寝具及酒店级装饰——或选择巨亨招牌水床特色房型。如有兴趣，亦可加配特色情趣制服体验。',
        },
        {
          title: '60分钟服务',
          body: '进入私密房间享受60分钟服务。按摩风格涵盖台式、日式及巨亨招牌水床特色服务。房间以舒适为先，浴缸、灯光、音响均可在床边操控。',
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
          caption: '在烛光大理石套房里安顿下来，全白云石墙面与暖光，尽显港币 8,000 万的奢华工艺。',
          alt: '巨亨桑拿大理石主题套房',
        },
        {
          file: 'macau-sauna-spa-empire-05-ocean-led-waterbed-room',
          caption: '躺上招牌水床，海洋蓝光缓缓流动——巨亨桑拿最迷人的享受。',
          alt: '巨亨桑拿招牌水床房',
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
        '主题情境服务',
        '主题场景互动体验',
      ],
      bestFor: '主题场景房／情境体验',
      features: [
        '推荐指数⭐⭐⭐⭐',
        '20+ 主题情景房间',
        '澳门主题情境开创者',
        '情景主题体验',
        '专业服务团队',
        '24小时营业',
        '私密安全环境',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达东方皇堡水疗，这里是澳门主题场景房的鼻祖，以主题情境服务闻名。前台登记后领取手牌；参考价格为 MOP 2,388 至 6,498，详细项目请于预约时确认。',
        },
        {
          title: '沐浴放松',
          body: '享用沐浴设施及桑拿放松身心。皇堡的特色在于技师会在场所各处活动互动，你可以边泡澡边观察挑选。',
        },
        {
          title: '免费餐饮',
          body: '免费享用各式餐饮，可在用餐区休息的同时留意场内技师动态。',
        },
        {
          title: '自由挑选',
          body: '皇堡采用「自由浏览」模式——没有固定技师介绍时间，多国籍技师分布在场所各区域，你可随时在任何区域遇到并挑选心仪技师，告知经理即可。这种模式让整个挑选过程更自然、无压力。',
        },
        {
          title: '主题房间',
          body: '皇堡最大卖点——超过 20 款精心设计的主题房间，包括监狱审讯室、教室、办公室、飞机舱、医院、救护车（招牌房型）、拳击场、高尔夫球场等。每间房都有完整的布景、道具及服饰，技师经过专业情境体验培训。',
        },
        {
          title: '60分钟服务',
          body: '全程主题情境互动服务，您可自订体验——选择场景、指定服饰、设计互动方式。技师会全程配合场景演出，体验感极强。日韩技师在情境投入度方面评价最高。另收 10% 服务费及 5% 旅游税。',
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
          caption: '宽敞的造景浴池配绚丽灯光，泡浴同时静静观赏场内动态、慢慢挑选。',
          alt: '东方皇堡 LED 舞台浴池',
        },
        {
          file: 'macau-sauna-spa-east-castle-04-classroom-theme-room',
          caption: '教室主题情景房，课桌、黑板等完整布景与道具，角色扮演体验一气呵成。',
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
          caption: '飞机舱主题情景房，舱内座椅与细节布景，将角色扮演主题推向新高度。',
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
        '水床买一送一',
        '服务细心周到',
        '凌晨3:00后免费独立休息房',
      ],
      bestFor: '追求安静私密体验',
      features: [
        '推荐指数⭐⭐⭐⭐',
        '注重服务质量',
        '宽敞休息区域',
        '安静放松环境',
        '隐藏宝藏会所',
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
          title: '自由配对',
          body: '凯旋门没有固定的技师介绍表演或走秀环节——告知经理你的喜好后，经理会根据你的要求安排合适的技师见面。整个过程完全按照你的节奏进行，没有任何压力或催促，是全澳最轻松自在的挑选方式。',
        },
        {
          title: '选择技师',
          body: '多国籍技师在场，包括中国、越南、日本及韩国籍。凯旋门的服务以细致周到著称，技师整体服务质素稳定。价格区间 MOP 2,298 至 MOP 6,998，另收 10% 服务费。',
        },
        {
          title: '60分钟服务',
          body: '进入房间享受60分钟一对一服务。招牌水床房型私密安静，服务品质与帝湖相若但价格更实惠，性价比极高。',
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
          caption: '走秀舞台在柔和伸展台灯光下亮起，主打轻松写意的观赏氛围。',
          alt: '凯旋桑拿走秀舞台',
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
          file: 'macau-sauna-spa-victoria-08-private-waterbed-room',
          caption: '私人水床房——私密安静的一对一服务空间。',
          alt: '凯旋桑拿私人水床房',
        },
        {
          file: 'macau-sauna-spa-victoria-09-show-viewing-area',
          caption: '舒适的走秀观赏区面向舞台，悠闲欣赏后再从容挑选。',
          alt: '凯旋桑拿走秀观赏区',
        },
      ],
    },
    'm-club': {
      aliases: 'M Club、晋会、澳门M Club',
      highlights: [
        '东方皇堡姊妹店',
        'KTV主题房间',
        '温泉房',
        '装修更豪华',
      ],
      bestFor: '豪华主题体验',
      features: [
        '推荐指数⭐⭐⭐⭐',
        '科技感风格',
        '丰富主题房间',
        '主题情境体验',
        'KTV房派对模式',
        '未来科技装修',
        '24小时营业',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达晋会MCLUB，作为东方皇堡的姊妹店，定位更为豪华高端。装修风格比皇堡更为精致，设有KTV房间及温泉房等独家设施。前台登记后领取手牌。',
        },
        {
          title: '沐浴放松',
          body: '享用沐浴设施及桑拿，晋会设有温泉房，可体验私密温泉泡汤，是其他场所没有的独特设施。',
        },
        {
          title: '免费餐饮',
          body: '免费享用各式餐饮，用餐环境配合整体豪华装修风格，环境舒适。',
        },
        {
          title: '自由挑选',
          body: '与皇堡相同的自由浏览模式，多国籍技师在场所各区域活动，可随时选择。无需等候固定技师介绍时间。',
        },
        {
          title: 'KTV及主题房间',
          body: '晋会独有的KTV主题房间，可边唱歌边享受服务。另设有温泉房等豪华主题选择，装修比皇堡更高级，每间房造价更高。',
        },
        {
          title: '60分钟服务',
          body: '全程主题情境互动服务，可自订体验及场景。价格比皇堡略高，但房间设施及装修更为豪华。另收 10% 服务费。',
        },
        {
          title: '休息过夜',
          body: '大堂设有躺椅可过夜休息。晋会客流量较皇堡少，环境相对安静。',
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
          caption: '大屏幕私人KTV厅，边唱歌边享受服务，派对模式气氛拉满。',
          alt: '晋会MCLUB大屏幕KTV厅',
        },
        {
          file: 'macau-sauna-spa-mclub-07-galaxy-aurora-bedroom',
          caption: '星空宇宙主题睡房，极光氛围灯光科技感拉满，招牌星球系列场景之一。',
          alt: '晋会MCLUB星空极光房',
        },
        {
          file: 'macau-sauna-spa-mclub-08-japanese-hot-spring-room',
          caption: '日本温泉泡泡浴主题房，私密泡汤体验，日式主题情境布置。',
          alt: '晋会MCLUB日本温泉房',
        },
        {
          file: 'macau-sauna-spa-mclub-09-masquerade-prop-display',
          caption: '角色扮演主题布置，烛光与特色制服道具，营造沉浸式主题情境。',
          alt: '晋会MCLUB角色扮演主题布置',
        },
        {
          file: 'macau-sauna-spa-mclub-10-pool-table-suite',
          caption: '桌球主题套房，桌球台造景配主题情境，娱乐与服务一房兼备。',
          alt: '晋会MCLUB桌球主题套房',
        },
        {
          file: 'macau-sauna-spa-mclub-11-racing-simulator-room',
          caption: '电玩游戏房，未来科技装修配游戏设备，赛博朋克玩乐体验。',
          alt: '晋会MCLUB赛车电玩房',
        },
        {
          file: 'macau-sauna-spa-mclub-12-tatami-classroom-room',
          caption: '教室主题房，课堂情境布置，角色扮演主题沉浸式体验之一。',
          alt: '晋会MCLUB教室主题房',
        },
        {
          file: 'macau-sauna-spa-mclub-13-dart-games-lounge',
          caption: '飞镖游戏休息厅，娱乐设施齐备，科技感装修下的轻松社交空间。',
          alt: '晋会MCLUB飞镖游戏厅',
        },
        {
          file: 'macau-sauna-spa-mclub-14-red-theme-playroom',
          caption: '红色主题Playroom，角色扮演主题情境布置，营造大胆沉浸氛围。',
          alt: '晋会MCLUB红色主题游戏房',
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
        '全澳技师最多',
        '国际化选择最丰富',
        '推荐首次体验',
        '招牌免费牛排',
      ],
      bestFor: '首次体验者',
      features: [
        '推荐指数⭐⭐⭐⭐⭐',
        '澳门热门桑拿',
        '多国籍选择',
        '高质量保证',
        '视觉享受',
        '24小时营业',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达壹号桑拿后，在前台登记领取手牌及储物柜钥匙。更衣室空间宽敞，设施簇新。',
        },
        {
          title: '沐浴放松',
          body: '场内设有大型按摩浴缸、干蒸房及湿蒸房，灯光柔和舒适。建议先花20-30分钟泡澡放松，调整身心状态。',
        },
        {
          title: '免费餐饮',
          body: '全程无限量免费供应，招牌牛排是壹号最受欢迎的菜式，另有炒饭、炒面、新鲜水果拼盘及冻啤酒。餐区宽敞，可边用餐边观赏大厅动态。',
        },
        {
          title: '大型技师介绍会',
          body: '每晚多国籍技师分批沿大厅走秀介绍，灯光音响专业，场面壮观。每轮约 30 分钟，技师团队涵盖亚洲（中国、日本、韩国、台湾、越南、泰国）及欧洲（俄罗斯、乌克兰）多国背景，为全澳规模最大、国际化程度最高的技师媒合会。',
        },
        {
          title: '选择技师',
          body: '看中心仪号码后告知经理，经理会确认该技师的服务档次及对应价格。价格区间由 MOP 2,199 至 MOP 7,699，视技师类别而定。高峰时段（22:00-00:00周末）热门技师可能需等候，建议提早入场。',
        },
        {
          title: '60分钟服务',
          body: '进入独立房间享受一对一专属水床服务，壹号以水床服务闻名全澳。可加购两位技师同行体验，安排第二位技师同时服务（费用以现场为准）。另有付费小工服务：掏耳、修甲、捶背等。',
        },
        {
          title: '休息过夜',
          body: '服务后可在休息区躺椅休息或直接过夜。注意高峰时段休息区较为热闹，想安静休息建议凌晨2点后入眠，6-8点为最安静时段。翌日可享用免费餐饮后从容离场。',
        },
      ],
      gallery: [
        {
          file: 'macau-sauna-spa-number-one-01-led-cube-chair-lounge',
          caption: '招牌休息厅以 LED 立方灯座配柔和氛围灯光，是动态走秀前后从容歇息的角落。',
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
          caption: '高级水疗套房，独立私密空间配酒店级寝具，专为一对一服务打造。',
          alt: '壹号桑拿高级水疗套房',
        },
        {
          file: 'macau-sauna-spa-number-one-07-gold-water-bed-room',
          caption: '金色调水床特色房，氛围灯光细致讲究。',
          alt: '壹号桑拿金色水床房',
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
          caption: '壹号桑拿接待大堂，沉稳格调迎宾，前台登记后即展开动态走秀体验。',
          alt: '壹号桑拿接待大堂',
        },
      ],
    },
    'familia-nobre': {
      aliases: '豪门桑拿、新豪门桑拿殿、澳门豪门桑拿',
      highlights: [
        '全场最大',
        '免收服务费',
        '高质素性价比之选',
      ],
      bestFor: '追求性价比',
      features: [
        '推荐指数⭐⭐⭐⭐⭐',
        '澳门最大型桑拿',
        '房间数量最多',
        '服务稳定',
        '最高性价比',
        '免服务费',
      ],
      flow: [
        {
          title: '抵达入场',
          body: '抵达豪门桑拿殿后在前台登记，领取手牌及储物柜钥匙。更衣室设有安全储物柜可免费寄存行李，换上浴袍后即可开始体验。',
        },
        {
          title: '沐浴放松',
          body: '场内沐浴空间为全澳面积最大，设有多个按摩浴缸及桑拿房，环境宽敞不拥挤。即使在高峰时段，也不会出现排队等候的情况。',
        },
        {
          title: '免费餐饮',
          body: '免费享用牛排、冻啤及各式热炒，豪门的牛排及冻啤在客人中口碑极佳。用餐区域宽敞舒适，全程无限量供应，无需额外付费。',
        },
        {
          title: '技师媒合环节',
          body: '经理会安排一排技师站在你面前，近距离观察后从容挑选。每组技师对应的价格档次会提前告知，让你在选择前清楚了解价格。',
        },
        {
          title: '选择技师',
          body: '全程免收服务费，标价即为最终价格，无任何隐藏收费或额外加价。价格区间MOP 2,388至MOP 6,988，为全澳性价比最高的选择。因场地及房间数量充裕，几乎无需排队等候。',
        },
        {
          title: '60分钟服务',
          body: '进入独立房间享受一对一专属服务。豪门房间数量为全澳最多，即使在繁忙时段也几乎不用等位，体验流畅顺利。',
        },
        {
          title: '休息过夜',
          body: '拥有全澳最多躺椅的宽敞休息区，躺椅间距较大，过夜舒适度高。没有嘈杂的娱乐表演打扰，适合安静休息。翌日可享用免费餐饮后离场。',
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
          caption: '紫色 LED 氛围特色房，柔和灯光配酒店级寝具，为私密一对一服务而设。',
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
          file: 'macau-sauna-spa-familia-nobre-09-silver-water-bed-room',
          caption: '银色水床特色房在氛围灯光下泛着柔光，柔软水床邀你沉浸放松。',
          alt: '豪门桑拿殿银色水床房',
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
          caption: '技师媒合区，多国籍技师阵容，18:00 前面对面近距挑选，之后转为大厅走秀模式。',
          alt: '豪门桑拿殿技师媒合区',
        },
      ],
    },
    'oceanic-royal-spa': {
      aliases: '帝湖桑拿、帝湖水疗、Oceanic Royal Spa、Oceanic Royal Sauna',
      highlights: [
        '参考价格 MOP 2,299–7,099',
        '24 小时营业与技师轮值',
        '展示式技师介绍',
        '主题房、餐饮与躺椅休息区',
      ],
      bestFor: '恢复营业后，想在氹仔安排完整水疗夜的客人',
      staffValue: '140+',
      staffNote: '中、越、泰、台、日、韩、俄、乌',
      features: [
        '目前暂停营业，不接待客人或提供预约',
        '日韩技师阵容',
        '展示式技师介绍',
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
          caption: '泳池与舞台空间，带出展示式介绍的氛围。',
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

en.venues['eighteen-sauna'] = eighteenSaunaDetails.en;
ja.venues['eighteen-sauna'] = eighteenSaunaDetails.ja;
zhTW.venues['eighteen-sauna'] = eighteenSaunaDetails['zh-TW'];
zhCN.venues['eighteen-sauna'] = eighteenSaunaDetails['zh-CN'];

export const spaPageCopy: Partial<Record<Locale, SpaPageCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getSpaPageCopy = createPageCopy(spaPageCopy);

export function spaBreadcrumbs(copy: SpaPageCopy, name: string, slug: string): Crumb[] {
  return [
    { name: copy.breadcrumbHome, path: '/' },
    { name: copy.breadcrumbList, path: '/ranking/' },
    { name, path: `/spa/${slug}/` },
  ];
}
