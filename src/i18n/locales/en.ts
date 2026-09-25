import type { Dictionary } from '../types';

const en: Dictionary = {
  meta: {
    title: 'Macau Sauna Sites | Luxury VIP Booking & Free Shuttle',
    description:
      'Compare {venueCount} Macau sauna and spa listings, including current closure notices, reference prices, facilities and private shuttle support.',
    siteName: 'Macau Sauna Sites',
    ogImageAlt: 'The Parisian Macao Eiffel Tower and Cotai hotels at night',
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
    offer: '{month} Free massage with booking',
    cta: 'Claim Now →',
  },

  hero: {
    title: 'Macau Sauna & Spa — Your VIP Experience',
    tagline: 'Complimentary 24/7 Private Shuttle Pickup & Return',
    venueGroups: [
      'Clube Rio, Yu Sauna, Number Nine Spa\nEmpire Sauna\nShang Pin Spa, Majesty Spa',
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
      { bucket: 'overnight', label: 'Overnight' },
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
          "Yu Sauna opened in August 2026 at the former Royal Sauna premises. Run by the Oceanic Royal Spa team, it has bathing pools, saunas and a spacious lounge.",
        description:
          "Yu Sauna opened in August 2026 at the former Royal Sauna premises, with the Oceanic Royal Spa team in charge. It occupies the third floor of New Orient Landmark Hotel in NAPE, close to the Outer Harbour Ferry Terminal and Macau Fisherman's Wharf. The location is handy for visitors staying on the Macau Peninsula.\n\nThe bathing pools, saunas and lounge have plenty of space, and the rooms are clean and tidy. After a day on foot, a hot soak, some time in the sauna and a recliner to stretch out on make a welcome break. The ornate interiors will also appeal if you want a taste of Macau's grander leisure clubs.",
      },
      'manhao-spa': {
        name: 'Manhao Spa',
        badge: 'Opened in 2026',
        summary: "Manhao Spa opened at Grandview Hotel in Taipa in May 2026. Its large bathing area and lounges are best enjoyed with a few hours to spare.",
        description:
          "Manhao Spa opened in May 2026 at Grandview Hotel in Taipa and is one of Macau's larger sauna venues. A broad lobby, marble bathing areas and gold details give it the grand appearance associated with the city's leisure clubs.\n\nThere is room to move between two bathing pools, a Finnish sauna, a steam room and the lounge without rushing. You could spend a few hours trying the baths and saunas, with time to sit down between them. For visitors based in Taipa or Cotai, Manhao offers a comfortable place to take a longer break from sightseeing.",
      },
      'number-nine-sauna': {
        name: 'Number Nine Spa',
        badge: 'New & Modern Facilities',
        description:
          "Number Nine Spa opened at Royal Dragon Hotel in April 2026. Gold detailing and natural marble dress up the bright lobby and wide corridors, while the lounges give guests plenty of room to sit and relax.\n\nA separate dining area serves an all-you-can-eat buffet, so you can have a proper meal before or after a bath or massage. Having food and somewhere to rest in one place makes it an easy choice for a group of friends or an informal business gathering.\n\nCome in the evening for a livelier atmosphere, or use a daytime visit to break up a busy sightseeing schedule.",
      },
      'shang-pin-spa': {
        name: 'Shang Pin Spa',
        badge: 'Great Value',
        description:
          "Shang Pin Spa opened in July 2025 on Level 2 of Lisboeta Macau, in unit L2 R95. While many of Macau's saunas are on the peninsula, this one is in Cotai, near the airport. It is a convenient stop if you are staying at Lisboeta or one of the surrounding resort hotels.\n\nThe bright, tidy interior has a Japanese influence, with whirlpool baths, saunas and places to sit and rest. The appeal is a quiet spell in the water or sauna between outings. If most of your trip is centred on Taipa and Cotai, Shang Pin fits into the day without a journey across town.",
      },
      'majesty-spa': {
        name: 'Majesty Spa',
        badge: 'Most Luxury',
        description:
          "Majesty Spa is inside Harbourview Hotel at Macau Fisherman's Wharf, close to the Outer Harbour Ferry Terminal. Space is a large part of its appeal: generous bathing pools, ornate interiors and a sofa lounge where you can stretch out after a journey.\n\nA large television in the bathing area lets you watch a programme while you soak. Follow that with a massage or a spell in the lounge. This is somewhere to set aside a few hours, especially if you have spent the day walking around Macau.",
      },
      'the-excellent-sauna': {
        name: 'The Excellent Sauna',
        badge: '24 Hours',
        description:
          "The Excellent Sauna opened in May 2017 on the tenth floor of Grand Emperor Hotel. Its detailed interiors, dining area and rest facilities make it a convenient place to spend a few quiet hours in the centre of the Macau Peninsula.\n\nAfter shopping or a day of sightseeing, you can have a bath, sit down to a meal and arrange a massage. It suits visitors who want to experience the attentive service of a Macau leisure club while keeping close to the city centre.",
      },
      'empire-sauna': {
        name: 'Empire Sauna',
        badge: 'Newest & Hottest',
        summary: "Empire Sauna opened on the Macau Peninsula in April 2026, with a boutique hotel-style lobby, spacious bathing pools and comfortable rest areas.",
        description:
          "Empire Sauna opened on the Macau Peninsula in April 2026. The lobby takes its cues from a boutique hotel, using marble, carefully placed lighting and detailed furnishings to make a striking first impression.\n\nLarge bathing pools, hotel-style suites and well-equipped rest areas give you reasons to stay for more than a quick visit. Start with a soak, then take time for a meal or massage before returning to the rest of your Macau trip.\n\nThe reported renovation cost was US$10 million.",
      },
      'east-castle-spa': {
        name: 'East Castle Spa',
        badge: 'Varied Room Designs',
        description:
          "East Castle Spa is one of Macau's long-established sauna venues, occupying the third and fourth floors of Casa Real Hotel. Large bathing areas, a full range of facilities and ornate interiors give it the feel of a traditional Macau leisure club.\n\nThe quiet atmosphere makes it a good option when rest matters more than a busy programme. Leave enough time for a bath and massage, then settle into the lounge for a while. There is no need to fit another stop into every hour of the day.",
      },
      'victoria-sauna': {
        name: 'Victoria Sauna',
        badge: 'Most Quiet',
        description:
          "Victoria Sauna occupies the fifth floor of L'Arc Hotel, near MGM Macau, Wynn Macau and Grand Lisboa. It is easy to fit into a day in central Macau, whether you are staying nearby or stopping after a shopping trip.\n\nA large bathing hall, saunas and a lounge lined with recliners provide plenty of room to rest. The atmosphere is quiet, making Victoria a useful choice if you would rather soak and put your feet up than spend the evening somewhere busy.\n\nThe dining area serves snacks and full meals, so you can eat at your own pace. A central location and generous space are the main draws here.",
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
        summary: "Familia Nobre was known for its spacious pools, ornate interiors and extensive facilities. This long-established Macau sauna is currently temporarily closed.",
        description:
          "Familia Nobre was a familiar name among Macau's larger sauna venues, known for spacious bathing pools, ornate interiors and an extensive range of facilities. It welcomed both first-time visitors and regulars who already knew how they liked to spend their time.\n\nAfter a bath, a beer and a chat in the lounge were part of its more relaxed side. The venue offers a glimpse of the style of Macau's large leisure clubs; it is currently temporarily closed.",
      },
      'oceanic-royal-spa': {
        name: 'Oceanic Royal Spa',
        badge: 'Grand Stage & Dining',
        description:
          "Oceanic Royal Spa was based at Inn Hotel Macau in Taipa, near The Venetian Macao. Its location offered an alternative to the many sauna venues on the peninsula, particularly for visitors staying in Taipa or Cotai, or travelling to and from the airport.\n\nBathing facilities, dining areas and lounges brought a soak, a meal and time to rest together in one place. The venue is currently temporarily closed.",
      },
      'eighteen-sauna': {
        name: '18 Sauna',
        badge: 'Historical Venue Information',
        description:
          "18 Sauna was a long-established Macau venue on the sixth floor of Hotel Golden Dragon. A large bathing hall, dry sauna, steam room and hot pool formed the core of its facilities.\n\nFriendly staff and the range of bathing facilities let guests follow their own routine: a soak, some time in the sauna and a seat in the lounge afterwards. The venue is currently temporarily closed.",
      },
    },
  },

  vip: {
    badge: 'Complimentary concierge service',
    heading: 'How It Works',
    intro:
      'We handle the details: venue recommendations, pickup, a welcome on arrival and your return ride.',
    tabHow: 'How It Works',
    tabGifts: 'VIP Extras',
    giftsHeader: 'Choose 2 massage or care extras',
    columns: { item: 'Service Item', value: 'Value', ours: 'Our VIP' },
    free: 'Free',
    gifts: [
      {
        emoji: '🧎‍♀️',
        name: 'Back scrub',
        desc: 'A back scrub to cleanse the skin.',
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
    ],
    steps: [
      {
        title: 'Let us recommend 💬',
        body: "Tell us your budget, available time and preferences, and we'll recommend the sauna that suits you best. No need to worry about which one to choose — we've been working in Macau for years and know each venue well.",
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
        title: 'Pick 2 VIP Extras 🎁',
        body: "A small thank-you for booking through us: we let the venue know you're coming, so you can choose lounge massages and care treatments, such as a head massage, foot massage or manicure, on arrival.",
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
