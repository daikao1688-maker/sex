import { getVenueRating } from '../../data/venueRatings';
import type { Dictionary } from '../types';

const en: Dictionary = {
  meta: {
    title: 'Macau Sauna Sites | Luxury VIP Booking & Free Shuttle',
    description:
      'Compare {venueCount} Macau sauna and spa listings, including current closure notices, reference prices, facilities and private shuttle support.',
    siteName: 'Macau Sauna Sites',
    ogImageAlt: 'A woman in a champagne-colored dress beside the Macau waterfront at night',
  },

  nav: {
    brand: 'Macau Sauna Sites',
    spas: 'Home',
    ranking: 'Ranking',
    guide: 'Guide',
    faq: 'FAQ',
    about: 'About',
    blog: 'Blog',
    languageLabel: 'Language',
    menuLabel: 'Menu',
    closeMenuLabel: 'Close menu',
  },

  promo: {
    headlineShort: 'New Sauna Opening',
    headlineLong: 'Celebrate New Sauna Opening',
    offer: '{month} Free service add-on',
    cta: 'Claim Now →',
  },

  hero: {
    title: 'Macau Sauna & Spa — Your VIP Experience',
    tagline: 'Complimentary 24/7 Private Shuttle Pickup & Return',
    venueGroups: [
      'Clube Rio, Yu Sauna, Number Nine Spa\nEmpire Sauna, Manhao Spa\nShang Pin Spa, Majesty Spa',
      'Familia Nobre, East Castle Spa\nVictoria Sauna\nMajesty Spa, M CLUB',
    ],
    steps: [
      {
        title: [{ text: 'Request Now' }],
        desc: [[{ text: 'We take care of everything', accent: true }]],
      },
      {
        title: [{ text: 'Free', accent: true }, { text: ' Pickup' }],
        desc: [[{ text: 'Anytime, Anywhere in Macau' }]],
      },
      {
        title: [{ text: 'You Enjoy' }],
        desc: [[{ text: 'VIP Extras', accent: true }, { text: ', Priority Entry' }]],
      },
    ],
    exploreCta: 'Explore Saunas',
    howItWorksCta: 'How It Works',
    bookCta: 'Request Now',
    motion: { pause: 'Pause background motion', resume: 'Resume background motion' },
  },

  spas: {
    heading: 'Featured Saunas',
    intro:
      'Explore {venueCount} popular Macau sauna venues, with updates on prices, opening status, team size and other practical details.',
    filterLabel: 'Filter venues',
    filters: [
      { bucket: 'all', label: 'All' },
      { bucket: 'theme', label: 'Theme' },
      { bucket: 'value', label: 'Value' },
      { bucket: 'lineup', label: 'Lineup' },
      { bucket: 'new', label: 'New' },
      { bucket: 'ktv', label: 'KTV' },
    ],
    learnMore: 'Learn More',
    stats: {
      price: 'Price',
      hours: 'Therapist hours',
      serviceFee: 'Service fee',
      open24h: '24 hours',
      noServiceFee: 'No service fee',
      ratingLabel: 'Editor rating {rating} out of 5',
      ratingTitle: 'Editor rating',
    },
    districts: { peninsula: 'Macau Peninsula', taipa: 'Taipa · Cotai' },
    imageAltSuffix: 'Macau premium sauna venue',
    temporarilyClosed: 'Temporarily Closed',
    temporarilyClosedNotice:
      'This venue is temporarily closed and is not accepting guests or bookings at this time. Please browse other venues or contact us for a suitable alternative.',
    pausedCard: { badge: 'Temporarily closed', description: 'These venues are currently closed — pages kept for reference.' },
    browseOtherVenues: 'Browse other venues',
    contactForAlternative: 'Contact us for an alternative',
    hiddenNote: '{count} more hidden ·',
    showAll: 'show all',
    venues: {
      'clube-rio': {
        name: 'Clube Rio',
        badge: 'New & KTV King',
        summary: 'Clube Rio is a business-KTV club on the third floor of Hotel Rio in NAPE, with private karaoke rooms and spa options.',
        description:
          'Clube Rio is a business-KTV club that held its grand opening on 30 July 2026 on the 3rd floor of Hotel Rio in the NAPE district — the only karaoke-first venue in the Macau sauna scene, which is why regulars call it the "KTV King" of Macau sauna nightlife. Crystal chandeliers over a wall of red roses in the main lounge, gold-leaf dragon-and-eagle art in the VIP rooms, big party rooms for a whole crew — every room is fully private with premium sound, equally right for business hosting and a night with friends.\n\nSpa massage can be booked on its own. Open until 4 am, no overnight stay — the freshest pick for a singing, toasting kind of night.',
      },
      'yu-sauna': {
        name: 'Yu Sauna',
        badge: 'NAPE · Bathing & Rest',
        summary:
          'Yu Sauna is a NAPE venue inside New Orient Landmark Hotel, with dry and steam rooms, showers, a hot pool and a recliner lounge.',
        description:
          'Yu Sauna (YU SAUNA) opened on 26 August 2026 on the third floor of New Orient Landmark Hotel in NAPE, Macau, close to Macau Fisherman\'s Wharf and the Outer Harbour Ferry Terminal. Its central NAPE location makes it convenient whether arriving by ferry or staying in the Macau Peninsula hotel district.\n\nThe venue was fully refurbished in 2025, blending Japanese Zen restraint with refined Chinese details. Facilities include a Japanese cypress dry sauna, a full-height glass steam room, a spacious hot-pool hall and treatment rooms with private bathtubs. Timber latticework, a red-lantern corridor and the dining-rest area echo one another to create a quiet, polished and layered spa atmosphere.\n\nYu Sauna operates 24 hours. Therapists are mainly on duty from 13:00 to 06:00 the following day, with a multinational team. Charges cover sauna-only access, Shanghai-style massage and several spa-package tiers; the Japanese-themed package is the venue\'s highest tier. A 10% service fee applies to all spending.',
      },
      'manhao-spa': {
        name: 'Manhao Spa',
        badge: 'Newest & Biggest Show',
        summary: 'Manhao Spa is a Taipa venue inside Grandview Hotel, with marble-and-gold interiors, a showcase hall and private treatment rooms.',
        description:
          "Manhao Spa is Macau's newest luxury sauna — a Taipa debut that opened 1 May 2026 inside the Grandview Hotel (氹仔君怡酒店), and from the moment you step in, an imperial-luxe tone takes over. A gold crowned 'MH' monogram glows against calacatta marble, and that aesthetic carries through gold-trimmed lockers, marble dining lounges and mural-wrapped corridors that feel more boutique-hotel than typical sauna.\n\nThe marquee draw is Macau's largest model showcase — a multi-tiered, glass-railed catwalk hall washed in deep blue neon that turns selection into a centerpiece moment rather than a side step. Settle afterward into an integrated suite that pairs a hotel-grade bedroom with the venue's signature red waterbed under a single dramatic spotlight, where a multinational therapist team tailors a calm, private massage. Doors run 14:00–04:00, and overnight stays are not offered for now.",
      },
      'number-nine-sauna': {
        name: 'Number Nine Spa',
        badge: 'Newest & Japan-Korea',
        description:
          "Number Nine Spa is located inside the Royal Dragon Hotel and is one of the new venues in central Macau attracting considerable attention in 2026. Its strengths are its newness and sense of stagecraft: clean-lined gold and marble elements, together with a main stage, lighting and an LED screen, turn therapist introductions into a small-scale performance and create a stronger visual impression than a traditional hall.\n\nRooms in red, pink-purple, blue-violet and other moods are paired with starry ceilings, suiting guests who want to move from lively energy to quiet within a single evening. Japanese-, Korean- and Balinese-style massages are frequently mentioned selling points. Opening promotions for the new venue change from time to time, making it suitable for guests who want to try new facilities, prefer a Japanese and Korean therapist lineup, and value a clean, straightforward process.",
      },
      'shang-pin-spa': {
        name: 'Shang Pin Spa',
        badge: 'Great Value',
        description:
          "Shang Pin Spa is located at L2 R95 on the second floor of Lisboeta Macau and is one of the newer upscale spa venues in Cotai. Public information describes a space of about 20,000 square feet, designed in a Japanese style and equipped with a whirlpool bath, sauna and Japanese bathing room. The overall atmosphere is bright and clean, feeling more like a modern hotel spa than a traditional older venue.\n\nIts appeal lies in being refined without being noisy. Waterbed rooms and two-person package promotions are frequently mentioned features. For guests staying at Lisboeta Macau, Grand Lisboa Palace or elsewhere in Cotai who want a mid-to-high-priced venue with a comfortable pace, Shang Pin is a good fit.",
      },
      'majesty-spa': {
        name: 'Majesty Spa',
        badge: 'Most Luxury',
        description:
          "Majesty Spa is located inside Harbourview Hotel at Macau Fisherman's Wharf and focuses on an opulent setting and comfortable overnight stays. Gold, marble, a spacious hall and a range of themed suites shape the first impression. Rather than relying simply on a large lineup, it brings bathing, therapist selection, room choice, KTV and rest arrangements together in one complete flow.\n\nMajesty Spa best suits guests who see a sauna visit as a full evening of relaxation, not just a short massage. You can begin with the introductions in the hall, then choose a KTV party room or a role-play themed room. If you want to stay and rest late at night, its private-room arrangements are a particularly notable selling point. For guests with a mid-to-high budget who value the setting and quality of sleep, it should feel like a good match.",
      },
      'the-excellent-sauna': {
        name: 'The Excellent Sauna',
        badge: '24 Hours',
        description:
          'The Excellent Sauna is tucked inside the Grand Emperor Hotel on the Macau Peninsula and follows a boutique themed-room concept. It does not rely on oversized spectacle. Instead, it turns DJ, office, medical and cinema settings into distinctive room types. Guests who simply want to relax can choose a traditional private room.\n\nThe pace here is relatively quiet, making it suitable for guests who do not want to choose in a crowded hall. Bathe and use the sauna first, then choose a room type and therapist according to your mood; afterwards, you can settle in for an overnight stay in the 24-hour rest area. If your schedule is flexible and your budget is mid-range, The Excellent is a lighter alternative to a large venue.',
      },
      'empire-sauna': {
        name: 'Empire Sauna',
        badge: 'Newest & Hottest',
        summary: 'Empire Sauna is a Macau Peninsula venue with a modern, Eastern-influenced interior and a flow built around bathing, private rooms, dining and rest.',
        description:
          'Empire Sauna follows a new-generation high-end direction for 2026: a new venue on the Macau Peninsula with an HK$80 million-class fit-out that blends modern luxury with Eastern Zen aesthetics. From the marble bathing area to the hotel-style suites, the emphasis is not on noisy spectacle, but on connecting arrival, bathing, therapist selection, dining and rest into a more private evening.\n\nIf you want to try a new venue, the features most worth noting at Empire Sauna are its waterbed rooms, themed suites and overnight rest arrangements. Taiwanese, Japanese and other massage styles can be chosen according to your mood. Opening-period offers also change frequently, making it suitable for guests with a higher budget who value the quality of the surroundings and want to avoid the usual routines of older venues. Confirm the same-day therapist schedule and current offers before setting out for a smoother experience.',
      },
      'east-castle-spa': {
        name: 'East Castle Spa',
        badge: 'Theme Rooms',
        description:
          'East Castle Spa is memorable not because the venue is extravagant, but because it turns its “theme” into a complete experience. Located on the third and fourth floors of the Casa Real Hotel, a team from the same group has built prison, classroom, medical, aircraft-cabin, office, boxing-ring and other settings into the rooms.\n\nThis venue suits people who are no longer satisfied with the conventional bath-and-massage routine. Relax in the bathing area, take your time over a meal, then choose a therapist and room type according to how you feel that day. There is no pressuring fixed rhythm inside, which leaves more room for exploration. If you want a distinctive Macau themed sauna at a mid-range budget that can feel fresh on each visit, East Castle Spa should be a good fit.',
      },
      'victoria-sauna': {
        name: 'Victoria Sauna',
        badge: 'Most Quiet',
        description:
          'Victoria Sauna is a low-key Macau sauna. It does not have a strong influencer-driven image; instead, its strengths are quiet, space and a lack of crowds. The main bath, sauna area and recliner lounge all feel unhurried, making it suitable for people who want to avoid the noise of large popular venues and simply relax in peace for the evening.\n\nIts highlights are value for money and the convenience of staying overnight. Waterbed rooms, buy-one-get-one-style offers and private rest-room arrangements after midnight give budget-conscious guests another option for a complete experience. There is no need to decide immediately after entering—you can take your time bathing, dining and choosing, then leave the rest of the night for sleep. If you prefer quiet over spectacle, Victoria Sauna should suit you well.',
      },
      'm-club': {
        name: 'M CLUB',
        badge: 'Cyberpunk & KTV',
        description:
          'MCLUB has a clear positioning: rather than following the traditional large-pool-and-lobby format, it focuses on a tech-forward look, a party atmosphere and themed rooms. Located inside the Waldo Hotel, neon lighting, panoramic visuals, KTV rooms and Japanese hot-spring rooms give the venue a younger feel. It suits groups of friends as well as guests who want to try a different kind of experience.\n\nThe themed DNA it shares with East Castle Spa is presented here in a more forward-looking way. You can first warm up in the KTV or lounge, then choose from 3D, starry-sky, office, gaming or soaking room types according to availability. The overall pace is not built around the pressure of a crowd, but around taking time to explore. If you prefer visual impact, interaction and a nightlife atmosphere, MCLUB will be more memorable than a traditional sauna.',
      },
      'number-one-sauna': {
        name: 'Number One Sauna',
        badge: 'Biggest Lineup',
        summary: 'Number One Sauna is marked temporarily closed; this profile retains its former facilities and service details for historical reference.',
        description:
          "Number One Sauna is one of Macau's most popular saunas, fielding one of the largest therapist rosters in the city — more than 130 multinational therapists, spanning Asia and Europe. Its signature dynamic runway showcase has the team appear in groups along the main hall, a spectacular sight you watch unfold before you choose. From the moment you check in, the pace is unhurried: soak in the large bathing pool, ease into the dry and steam rooms, then take your time as this Macau sauna's famous selection show brings the choice to you.\n\nWhen you've found your number, slip into a private room for a one-on-one session — the unhurried indulgence Number One is known for — and round out the night with unlimited complimentary dining, the celebrated steak included. Reclining chairs let you rest or stay overnight at your leisure, so there's no rush to leave. The venue runs on the intimate side, so popular therapists can draw a wait at peak hours — arrive a little early and the evening flows beautifully.",
      },
      'familia-nobre': {
        name: 'Familia Nobre',
        badge: 'Best Value',
        summary: 'Familia Nobre is a temporarily closed Macau Peninsula venue; this profile is retained for historical reference.',
        description:
          "Familia Nobre is Macau's largest sauna club, sitting on the Macau Peninsula with the most rooms of any venue in the city — so even at peak hours, you step in and a room is waiting, never a queue. What truly sets this Macau sauna apart is the value: it's one of only two venues in Macau that charge no service fee, where the price you see is the price you pay, across a multinational roster of therapists and a range of MOP 2,388 to 6,988.\n\nSettle into the spacious bathing area, then enjoy complimentary steak and cold beer that regulars rave about. When the night winds down, the best overnight facilities in town take over — the most reclining chairs of any venue, generously spaced in a quiet rest area with no noisy shows to disturb you. Rated {rating} out of five stars, Familia Nobre is the easy first stop for newcomers and the natural home for overnight guests and anyone who wants the most for their money.".replace('{rating}', String(getVenueRating('familia-nobre'))),
      },
      'oceanic-royal-spa': {
        name: 'Oceanic Royal Spa',
        badge: 'Grand Stage & Dining',
        description:
          'Oceanic Royal Spa is a Taipa venue shaped around an evening-in-one-place experience. Its public-facing identity centres on a classical interior, a large showcase area and spaces to pause between activities, so the atmosphere reads more like a full leisure clubhouse than a single-purpose spa stop. The gallery highlights an arrival space, lounge, stage-like hall, dining moments and private room settings.\n\nThe venue is currently marked as temporarily closed and is not accepting guests or bookings. This page is kept as a reference only; any reopening date, current prices, hours and available services should be confirmed through official, up-to-date channels before making plans.',
      },
      'eighteen-sauna': {
        name: '18 Sauna',
        badge: 'Classic & Show Hall',
        description:
          '18 Sauna formerly operated on the sixth floor of Hotel Golden Dragon on the Macau Peninsula. Historical listings describe a large bathing area with dry and steam sauna rooms, a cold pool, a recliner lounge and an evening presentation hall. Its group introductions and interactive programme were the features most closely associated with the venue.\n\nThe venue is currently temporarily closed. The MOP 1,780–5,550 range, former 24-hour schedule, overnight arrangements and no-service-fee policy shown here are historical reference points only, not a current offer. Confirm a reopening and all new terms before planning a visit.',
      },
    },
  },

  vip: {
    badge: 'Complimentary concierge service',
    heading: 'How It Works',
    intro:
      'We take care of everything for you — recommendation, transport, VIP entry, VIP Extras, and your ride home.',
    tabHow: 'How It Works',
    tabGifts: 'VIP Extras',
    giftsHeader: 'Pick 1 — served by pretty girls!',
    columns: { item: 'Service Item', value: 'Value', ours: 'Our VIP' },
    free: 'Free',
    gifts: [
      {
        emoji: '🧎‍♀️',
        name: 'Back Rubbing',
        desc: 'Body-glide rub down the back, neck and shoulders.',
        value: '298 MOP',
      },
      {
        emoji: '🦵',
        name: 'Relaxable Thigh Massage',
        desc: 'Deep work on quads & hamstrings — perfect after the sauna.',
        value: '288 MOP',
      },
      {
        emoji: '💆',
        name: 'Head Massage',
        desc: 'Scalp kneading that clears mental fog and headaches.',
        value: '230 MOP',
      },
      {
        emoji: '🦶',
        name: 'Reflexology',
        desc: 'Pressure-point work that revives tired feet.',
        value: '230 MOP',
      },
      { emoji: '🤚', name: 'Manicure', desc: 'Trim, shape, cuticle care, polish.', value: '220 MOP' },
      {
        emoji: '🧴',
        name: 'Pedicure',
        desc: 'Foot soak, nail and cuticle care, light foot rub.',
        value: '220 MOP',
      },
      {
        emoji: '🤲',
        name: 'Hand Massage',
        desc: 'Releases wrist and forearm tension.',
        value: '200 MOP',
      },
      {
        emoji: '👂',
        name: 'Ear Cleaning',
        desc: 'Traditional ear-cleaning ritual. Surprisingly relaxing.',
        value: '200 MOP',
      },
      {
        emoji: '🚗',
        name: 'Macau-wide private shuttle',
        desc: 'Private pickup or return transfer across Macau, arranged with a confirmed venue visit.',
        value: '500 MOP',
      },
    ],
    steps: [
      {
        title: 'Let us recommend 💬',
        body: "We'll book for you through our internal network. You don't need to know which sauna is right. Tell us what interests you — or let our team match you. We have years of experience and know each sauna's strengths.",
      },
      {
        title: 'Instant private shuttle 🚗',
        body: "Hotel lobby, airport, Outer Harbour Pier, Taipa Pier, even a street corner — tell us where, we collect you in minutes. Drop-off anywhere in Macau when you're done.",
        note: {
          title: 'Coming with friends?',
          body: 'Our 7-seater handles it easily — everyone gets the same perks, no extra cost.',
        },
      },
      {
        title: 'VIP Entry + special pricing ⚡',
        body: "Internal-network booking means you skip the front desk and walk straight in. Each sauna has special pricing for our guests — tell us where you'd like to go and we'll secure the discount for you.",
      },
      {
        title: 'Pick 1 VIP Extra 🎁',
        body: "Our way of saying thanks for booking through us — we let the venue know you're coming, then you pick your VIP Extras (head massage, reflexology, manicure, and more) on arrival.",
      },
      {
        title: 'Complimentary return ride 🚗',
        body: "When you're done — after your meal, right after your service, anytime — just text us. We'll send the same shuttle back to take you to your hotel, the airport, the ferry terminal, or anywhere in Macau. Same zero cost as the pickup.",
      },
    ],
  },

  quickMatch: {
    badge: '★ Smart Match',
    heading: [{ text: 'Find your perfect ' }, { text: 'sauna in a minute', accent: true }],
    intro: 'Answer a few questions — we instantly match you to the best of our {count} venues.',
    questions: {
      group: 'How many?',
      experience: 'What experience?',
      when: 'When?',
      from: 'Coming from?',
    },
    groupOptions: {
      solo: '1 person',
      pair: '2 people',
      small: '3-4 people',
      large: '5+ people',
    },
    experienceOptions: {
      show: 'Main Stage Show',
      theme: 'Theme Rooms',
      jpkr: 'JP / KR Staff',
      new: 'Newest',
      ktv: 'KTV Rooms',
      classic: 'Classic Names',
    },
    whenOptions: {
      now: 'Right now',
      tonight: 'Tonight',
      tomorrow: 'Tomorrow',
      sat: 'Sat night',
      sun: 'Sun night',
      other: 'Other',
    },
    fromOptions: {
      border: 'Border',
      hotel: 'Hotel',
      airport: 'Airport',
      other: 'Other',
    },
    overnightOn: 'Want overnight',
    overnightOff: 'No overnight',
    overnightHint: 'Comfortable overnight setups first',
    resultLabel: 'Recommended for you',
    pickedFrom: 'picked from {count} venues',
    bestMatch: 'BEST MATCH',
    matchSuffix: '% match',
    details: 'Details',
    bookNow: 'Book now · pick your channel',
    messageTemplate:
      'Hi, I matched a venue on your site. Experience: {experience}\n· Group: {group}\n· Time: {when}\n· Coming from: {from}\n· Overnight: {overnight}\n· Interested in: {venue}\nPlease confirm pricing and VIP arrangements. Thanks!',
    yes: 'yes',
    no: 'no',
  },

  features: {
    heading: 'Why Choose Us',
    items: [
      {
        icon: 'crown',
        title: 'Selection Show',
        desc: 'See therapists live and pick your match — widest selection in Macau',
      },
      {
        icon: 'shield',
        title: 'Private 1-on-1 Sessions',
        desc: 'Private room, completely undisturbed — just you and your therapist',
      },
      {
        icon: 'sparkles',
        title: 'Themed Rooms',
        desc: '20+ themed scenarios with fully customizable roleplay',
      },
      {
        icon: 'clock',
        title: 'Overnight at No Extra Cost',
        desc: '12–15 hours of free stay including breakfast and bathing',
      },
    ],
  },

  testimonials: {
    heading: 'Questions Worth Sorting Out Before You Go',
    regionLabel: 'Pre-trip planning topics',
    served: 'A practical checklist for confirming the details',
    motion: { pause: 'Pause pre-trip planning motion', resume: 'Resume pre-trip planning motion' },
    items: [
      {
        quote:
          'Compare the venue style, location, current hours and the kind of experience you want before settling on an option.',
        author: 'Choosing a venue',
      },
      {
        quote:
          'Ask which details have been checked for your date and which ones can still change before you travel.',
        author: 'Current status',
      },
      {
        quote:
          'Set a working budget and request a clear distinction between the expected charge, optional items and venue-specific fees.',
        author: 'Budget and charges',
      },
      {
        quote:
          'When requesting transport, provide the exact pickup point, date, preferred time, party size and luggage details together.',
        author: 'Pickup request',
      },
      {
        quote:
          'Treat a pickup as arranged only after the meeting point and pickup window have been confirmed.',
        author: 'Pickup confirmation',
      },
      {
        quote:
          'Mention the number and approximate size of bags so the vehicle can be checked against the actual travelling party.',
        author: 'Travelling with luggage',
      },
      {
        quote:
          'If you need a return ride, share the destination and likely finish time early; the route and schedule require separate confirmation.',
        author: 'Return planning',
      },
      {
        quote:
          'Send an update if your arrival time changes, because the original pickup window may no longer be workable.',
        author: 'Schedule changes',
      },
      {
        quote:
          'For a group, collect each person’s key preferences first and decide which requirements matter to everyone.',
        author: 'Group priorities',
      },
      {
        quote:
          'Share your preferred language in advance and ask which points should be reconfirmed directly at the venue.',
        author: 'Language support',
      },
      {
        quote:
          'Availability can change during the day, so request an up-to-date check instead of relying on an earlier list.',
        author: 'Day-of availability',
      },
      {
        quote:
          'Confirm the operating hours for your specific date, especially when arrival or departure falls late in the day.',
        author: 'Opening hours',
      },
      {
        quote:
          'Before planning to stay overnight, check whether the venue currently permits it and what time or room conditions apply.',
        author: 'Overnight conditions',
      },
      {
        quote:
          'Keep a second suitable option in mind in case the preferred venue is busy or its current status changes.',
        author: 'Alternative plan',
      },
      {
        quote:
          'Ask which payment methods and currencies are accepted, what is paid at the venue and when payment is expected.',
        author: 'Payment details',
      },
      {
        quote:
          'Clarify the arrival contact, meeting instructions and check-in sequence before setting off.',
        author: 'Arrival process',
      },
      {
        quote:
          'Share only the personal information needed for the arrangement and ask how those details will be used.',
        author: 'Personal information',
      },
      {
        quote:
          'Save the final message showing the venue, meeting point, time window and next action so every detail is easy to retrieve.',
        author: 'Final confirmation',
      },
    ],
  },

  blog: {
    heading: 'Latest from the Blog',
    viewAll: 'View all →',
  },

  ctaBand: {
    heading: 'Not Sure? Let Us Recommend',
    body: "Contact us and we'll arrange the perfect experience for you",
    chat: 'Chat with us',
    ranking: 'Ranking',
    guide: 'Guide & Tips',
    faq: 'FAQ',
  },

  contact: {
    heading: 'Answer Your Questions',
    intro:
      'We take pride in your satisfaction. Reach out anytime — we reply within minutes, 24 hours a day.',
    inquiryMessage: "I'm interested in Macau sauna. Could you help arrange this?",
    viewQr: 'View QR',
    channels: {
      whatsapp: 'Message us',
      telegram: '@am38876',
      wechat: 'gh34366',
      line: '@224vqwdv',
    },
  },

  mission: {
    quote: 'Clear information first. Reliable arrangements follow.',
    body: 'We keep venue details, current status, pickup plans and next steps easy to understand. When something changes, we share the update early and confirm the arrangement again, helping you make a decision with less guesswork and avoid unnecessary detours.',
  },

  footer: {
    backToTop: '↑ Back to Top',
    links: [
      { path: '/', label: 'Home' },
      { path: '/ranking/', label: 'Ranking' },
      { path: '/guide/', label: 'Guide' },
      { path: '/faq/', label: 'FAQ' },
      { path: '/about/', label: 'About' },
      { path: '/blog/', label: 'Blog' },
      { path: '/shuttle/', label: 'Shuttle' },
      { path: '/contact/', label: 'Contact' },
      { path: '/privacy/', label: 'Privacy' },
    ],
    editorialPolicy: 'Editorial policy',
    copyright: '© 2026 Macau Sauna Sites. All rights reserved.',
  },

  wechat: {
    title: 'Add us on WeChat',
    optionScan: 'Option 1: Scan the QR code above',
    optionCopy: 'Option 2: Copy the ID and search in WeChat',
    copy: 'Copy WeChat ID: gh34366',
    copied: '✓ Copied! Open WeChat to add us.',
    manualCopy: 'Automatic copy unavailable. Select and copy the WeChat ID manually.',
    close: 'Close',
  },

  kakaotalk: {
    name: 'KakaoTalk',
    title: 'Add us on KakaoTalk',
    optionScan: 'Option 1: Scan the QR code above',
    optionCopy: 'Option 2: Copy ID {id} and search in KakaoTalk',
    copy: 'Copy KakaoTalk ID: {id}',
    copied: '✓ Copied! Open KakaoTalk and search for our ID.',
    manualCopy: 'Automatic copy unavailable. Select and copy the KakaoTalk ID manually.',
    close: 'Close',
    qrAlt: 'KakaoTalk QR code for ID {id}',
  },

  floatingPill: {
    label: 'Chat',
    aria: 'Chat with us — jump to contact section',
  },
};

export default en;
