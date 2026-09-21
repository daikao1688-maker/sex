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
      'Compare {venueCount} Macau sauna venues by reference prices, opening status and facilities.',
    filterLabel: 'Filter venues',
    filters: [
      { bucket: 'all', label: 'All' },
      { bucket: 'theme', label: 'Theme' },
      { bucket: 'value', label: 'Value' },
      { bucket: 'taipa', label: 'Taipa' },
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
        badge: 'Opened in 2026',
        summary: 'Manhao Spa is a Taipa venue inside Grandview Hotel, with marble-and-gold interiors, a showcase hall and private treatment rooms.',
        description:
          "Manhao Spa opened in May 2026 inside Grandview Hotel in Taipa, near The Venetian Macao and Galaxy Macau. Generous spaces, marble finishes and gold accents give the venue an elegant, luxurious feel, with room to slow down after a day around the city.\n\nThe marble bathing area has two bathing pools, a Finnish sauna and a steam room. Whether you prefer a soak, dry heat or gentle steam, you can take your time and enjoy a relaxed break from your itinerary.",
      },
      'number-nine-sauna': {
        name: 'Number Nine Spa',
        badge: 'New & Modern Facilities',
        description:
          'Number Nine Spa opened in 2026 inside the Royal Dragon Hotel in central Macau. Gold and marble finishes, lighting, LED screens and a spacious hall give the venue a modern character.\n\nRooms combine red, pink-purple or blue-purple palettes with starry ceilings. Japanese, Korean and Balinese-style massage options sit alongside bathing and rest facilities. Compare the treatments, durations and prices before booking, and confirm which offers are available on your date.',
      },
      'shang-pin-spa': {
        name: 'Shang Pin Spa',
        badge: 'Great Value',
        description:
          'Shang Pin Spa occupies Level 2, unit L2 R95, at Lisboeta Macau in Cotai. Public descriptions put the venue at around 20,000 square feet, with Japanese-inspired interiors, whirlpool baths, sauna facilities and Japanese-style bathing rooms. The setting is bright and clean, with the feel of a modern hotel spa.\n\nSpacious bathing areas and quiet lounges offer a place to pause between sightseeing stops. Guests staying at Lisboeta, Grand Lisboa Palace or elsewhere in Cotai can plan a visit around their itinerary. Confirm treatment details, prices and current offers before booking.',
      },
      'majesty-spa': {
        name: 'Majesty Spa',
        badge: 'Most Luxury',
        description:
          'Majesty Spa is located inside Harbourview Hotel at Macau Fisherman\'s Wharf, with ornate interiors, a spacious hall and comfortable rest areas. Gold and marble finishes connect bathing facilities, KTV rooms, dining areas and more than ten room styles.\n\nGuests can bathe or dine before discussing massage options and room arrangements. If you plan to rest late into the night, confirm the availability and charges for recliners or private rest rooms. Check the treatment duration, included services and total price before booking.',
      },
      'the-excellent-sauna': {
        name: 'The Excellent Sauna',
        badge: '24 Hours',
        description:
          'The Excellent Sauna is located inside Grand Emperor Hotel on the Macau Peninsula. Its compact layout includes rooms with a variety of interior designs as well as traditional room types, alongside bathing, sauna and rest facilities.\n\nStart by checking the facilities, then compare massage options by treatment, duration and budget. The venue has a 24-hour rest area; confirm availability and charges before requesting an overnight stay or a particular room.',
      },
      'empire-sauna': {
        name: 'Empire Sauna',
        badge: 'Newest & Hottest',
        summary: 'Empire Sauna opened on the Macau Peninsula in 2026, combining modern luxury with Eastern-inspired interiors.',
        description:
          'Empire Sauna opened on the Macau Peninsula in 2026, combining modern luxury with Eastern-inspired interiors. Marble bathing areas, hotel-style suites, dining and rest spaces form a complete leisure setting.\n\nFacilities include waterbed rooms, suites in different styles and overnight rest arrangements, with Taiwanese, Japanese and other massage styles offered. Compare the treatment, duration and facilities you need, and confirm availability, the total price and any opening offers before booking.',
      },
      'east-castle-spa': {
        name: 'East Castle Spa',
        badge: 'Varied Room Designs',
        description:
          "East Castle Spa occupies the third and fourth floors of Casa Real Hotel. Spacious bathing areas and clean, well-appointed private rooms are central to the setting, with different room styles and carefully considered interiors.\n\nThe atmosphere is quiet and refined, suited to guests who want to slow down and rest. Professional staff and comfortable surroundings help keep the visit relaxed and unhurried.",
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
          'MCLUB is located inside Waldo Hotel and is currently temporarily closed. It is not accepting guests or bookings. This page retains earlier venue information for reference.\n\nPreviously documented facilities include neon lighting, panoramic visuals, KTV, lounge areas and rooms with varied interior designs. Photos and facility descriptions do not indicate current availability. Any reopening date, services and prices must be checked against future announcements from the venue.',
      },
      'number-one-sauna': {
        name: 'Number One Sauna',
        badge: 'Temporarily Closed',
        summary: 'Number One Sauna is currently temporarily closed and is not accepting guests or bookings.',
        description:
          'Number One Sauna is currently temporarily closed and is not accepting guests or bookings. This page retains former facilities and operating information for historical reference.\n\nEarlier facilities included a large bathing pool, dry and steam sauna rooms, dining areas and recliner lounges. Previous prices, hours and overnight arrangements are not current offers. If the venue reopens, confirm its latest facilities, services and charges before planning a visit.',
      },
      'familia-nobre': {
        name: 'Familia Nobre',
        badge: 'Best Value',
        summary: 'Familia Nobre is a Macau Peninsula venue that is currently temporarily closed, with no visits or bookings available.',
        description:
          'Familia Nobre is a Macau Peninsula venue that is currently temporarily closed, with no visits or bookings available. This page preserves former venue information for reference.\n\nEarlier records describe bathing areas, dining spaces, rooms and recliner lounges. Historical prices, the former no-service-fee policy and overnight arrangements are not current offers. Any reopening and updated terms must be checked against future announcements from the venue.',
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
    giftsHeader: 'Choose 1 massage or care extra',
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
      value: 'Budget first',
      theme: 'Room designs',
      taipa: 'Taipa / Cotai',
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
        title: "Transparent Pricing",
        desc: 'All charges explained in advance',
      },
      {
        icon: 'shield',
        title: "Find the Right Sauna for You",
        desc: "More expensive does not mean better. The right fit matters most!",
      },
      {
        icon: 'sparkles',
        title: "Licensed Saunas in Macau",
        desc: "You can look up the operating licences of all saunas listed on this website through the Macao Government Tourism Office.",
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
