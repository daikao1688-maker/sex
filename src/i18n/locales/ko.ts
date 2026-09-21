import type { Dictionary } from '../types';

const ko: Dictionary = {
  meta: {
    title: '마카오 사우나 가이드 | 럭셔리 VIP 예약 및 무료 셔틀',
    description:
      '현재 휴업 안내, 참고 가격, 시설, 전용 셔틀 지원을 포함해 마카오의 사우나·스파 {venueCount}곳을 비교해 보세요.',
    siteName: '마카오 사우나 가이드',
    ogImageAlt: '마카오 수변 야경을 배경으로 샴페인색 드레스를 입은 여성',
  },

  nav: {
    brand: '마카오 사우나 가이드',
    spas: '홈',
    ranking: '랭킹',
    guide: '이용 가이드',
    faq: '자주 묻는 질문',
    about: '소개',
    blog: '블로그',
    languageLabel: '언어',
    menuLabel: '메뉴',
    closeMenuLabel: '메뉴 닫기',
  },

  promo: {
    headlineShort: '신규 사우나 오픈',
    headlineLong: '신규 사우나 오픈 기념',
    offer: '{month} 무료 추가 서비스',
    cta: '지금 신청 →',
  },

  hero: {
    title: '마카오 사우나 & 스파 — 나만의 VIP 경험',
    tagline: '마카오 전역 24시간 무료 전용 픽업·귀환 셔틀',
    venueGroups: [
      'Clube Rio, YU SAUNA\nNumber Nine Spa, Empire Sauna\nManhao Spa, Shang Pin Spa',
      'Familia Nobre, East Castle Spa\nVictoria Sauna\nMajesty Spa, M CLUB',
    ],
    steps: [
      {
        title: [{ text: '지금 문의' }],
        desc: [[{ text: '처음부터 끝까지 도와드립니다', accent: true }]],
      },
      {
        title: [{ text: '무료', accent: true }, { text: ' 픽업' }],
        desc: [[{ text: '마카오 어디서나, 언제든지' }]],
      },
      {
        title: [{ text: '편안하게 즐기기' }],
        desc: [[{ text: 'VIP 추가 혜택', accent: true }, { text: '과 우선 입장' }]],
      },
    ],
    exploreCta: '사우나 둘러보기',
    howItWorksCta: '이용 방법',
    bookCta: '지금 문의',
    motion: { pause: '배경 움직임 일시 정지', resume: '배경 움직임 다시 재생' },
  },

  spas: {
    heading: '추천 사우나',
    intro:
      '마카오 사우나 {venueCount}곳의 참고 가격, 영업 상태, 시설 정보를 비교해 보세요.',
    filterLabel: '업소 필터',
    filters: [
      { bucket: 'all', label: '전체' },
      { bucket: 'theme', label: '테마' },
      { bucket: 'value', label: '가성비' },
      { bucket: 'taipa', label: '타이파' },
      { bucket: 'new', label: '신규' },
      { bucket: 'ktv', label: 'KTV' },
    ],
    learnMore: '자세히 보기',
    stats: {
      price: '가격',
      hours: '관리사 근무 시간',
      serviceFee: '서비스료',
      open24h: '24시간',
      noServiceFee: '서비스료 없음',
      ratingLabel: '편집자 평점 {rating}점',
      ratingTitle: '편집자 평가',
    },
    districts: { peninsula: '마카오 반도', taipa: '타이파 · 코타이' },
    imageAltSuffix: '마카오 프리미엄 사우나 시설',
    temporarilyClosed: '임시 휴업',
    temporarilyClosedNotice:
      '현재 임시 휴업 중으로 방문과 예약을 받지 않습니다. 다른 업소를 살펴보거나 적합한 대안을 문의해 주세요.',
    pausedCard: { badge: '일시 휴업', description: '아래 업소는 현재 일시 휴업 중입니다. 업소 페이지는 참고용으로 유지됩니다.' },
    browseOtherVenues: '다른 업소 보기',
    contactForAlternative: '대안 문의하기',
    hiddenNote: '{count}곳 더 숨김 ·',
    showAll: '모두 보기',
    venues: {
      'clube-rio': {
        name: 'Clube Rio (클루브 리오)',
        badge: '신규 & KTV 대표',
        summary:
          'Clube Rio는 NAPE 지역 Hotel Rio 3층에 자리한 비즈니스 KTV 클럽으로, 독립 노래방과 스파 옵션을 갖추고 있습니다.',
        description:
          'Clube Rio(클루브 리오)는 2026년 7월 30일 NAPE 지역 Hotel Rio 3층에서 그랜드 오픈한 비즈니스 KTV 클럽입니다. 마카오 사우나 업계에서 노래방을 앞세운 유일한 업소라 단골들은 이곳을 마카오 사우나 나이트라이프의 “KTV 킹”이라고 부릅니다. 메인 라운지의 붉은 장미 벽 위 크리스털 샹들리에, VIP룸의 금박 용·독수리 장식, 일행 전체가 들어갈 대형 파티룸까지 모든 공간이 고급 음향을 갖춘 완전 독립형이라 비즈니스 접대와 친구들과의 밤 모두에 어울립니다.\n\n조용한 시간을 원한다면 스파 마사지만 별도로 예약할 수도 있습니다. 새벽 4시까지 운영하며 야간 숙박은 제공하지 않습니다.',
      },
      'yu-sauna': {
        name: 'YU SAUNA',
        badge: 'NAPE · 목욕과 휴식',
        summary:
          'YU SAUNA는 NAPE의 New Orient Landmark Hotel 안에 있으며 드라이·스팀 사우나, 온탕, 샤워, 다이닝과 리클라이너 라운지를 갖췄습니다.',
        description:
          'YU SAUNA(八湯御桑拿)는 2026년 8월 26일 새롭게 개장했으며 마카오 NAPE의 New Orient Landmark Hotel 3층에 있습니다. 마카오 피셔맨스 워프와 외항 페리 터미널에 가깝고 NAPE 중심부의 교통 이점을 갖춰, 페리로 입국하거나 마카오 반도 호텔가에서 이동할 때 모두 편리합니다.\n\n시설은 2025년에 전면 리노베이션을 마쳤으며 일본식 젠의 차분함과 중국식 우아함을 조화시켰습니다. 일본식 편백나무 드라이 사우나, 전면 유리 스팀룸, 넓은 온탕 홀, 독립 욕조가 있는 마사지 룸을 갖췄고, 우드 격자와 붉은 등롱 복도, 다이닝 휴게 공간이 어우러져 조용하고 세련되며 깊이감 있는 스파 분위기를 만듭니다.\n\nYU SAUNA는 24시간 운영합니다. 테라피스트의 주요 근무 시간은 13:00부터 다음 날 06:00까지이며 다국적 팀을 운영합니다. 요금 항목은 사우나 단독 이용, 상하이식 마사지, 여러 등급의 스파 패키지로 구성되고 일본식 테마 패키지가 매장 내 최고 등급입니다. 모든 이용 금액에는 10% 서비스 요금이 별도로 부과됩니다.',
      },
      'manhao-spa': {
        name: 'Manhao Spa (만하오 스파)',
        badge: '2026년 신규 개장',
        summary:
          'Manhao Spa는 타이파 Grandview Hotel 안에 자리하며, 대리석과 골드 인테리어, 쇼케이스 홀, 독립 관리실을 갖춘 업소입니다.',
        description:
          "Manhao Spa(만하오 스파, 曼濠水療)는 2026년 5월 타이파의 Grandview Hotel(君怡酒店) 안에 문을 열었습니다. 베네시안 마카오와 갤럭시 마카오에서 가까우며, 여유로운 공간에 대리석과 골드 장식을 더해 차분하면서도 고급스러운 분위기를 만들었습니다.\n\n대리석 목욕 공간에는 두 개의 욕조가 있고, 핀란드식 사우나와 스팀룸도 갖췄습니다. 따뜻한 물에 몸을 담그거나 건식 사우나와 증기욕을 즐기며 자신의 속도로 쉬어갈 수 있습니다. 관광 중간이나 하루 일정을 마친 뒤 잠시 여유를 갖기에 어울립니다.",
      },
      'number-nine-sauna': {
        name: 'Number Nine Spa (넘버 나인 스파)',
        badge: '신규 & 현대적인 시설',
        summary:
          'Number Nine Spa는 2026년 마카오 중심부 Royal Dragon Hotel 안에 문을 연 시설입니다.',
        description:
          'Number Nine Spa는 2026년 마카오 중심부 Royal Dragon Hotel 안에 문을 연 시설입니다. 골드와 대리석 마감에 조명, LED 스크린, 넓은 홀을 더해 현대적인 분위기를 갖추었습니다.\n\n객실은 빨강, 분홍·보라, 파랑·보라 계열 색상과 별빛 천장을 조합해 각기 다른 분위기를 냅니다. 일본식·한국식·발리식 마사지와 함께 목욕 및 휴식 시설을 이용할 수 있습니다. 예약 전 관리 내용, 시간, 예산을 비교하고 당일 가격과 혜택을 확인해 주세요.',
      },
      'shang-pin-spa': {
        name: 'Shang Pin Spa (샹핀 스파)',
        badge: '우수한 가성비',
        summary:
          'Shang Pin Spa는 Lisboeta Macau 2층 L2 R95에 위치한 코타이 지역의 스파입니다.',
        description:
          'Shang Pin Spa는 Lisboeta Macau 2층 L2 R95에 위치한 코타이 지역의 스파입니다. 공개 소개에 따르면 약 20,000제곱피트 규모이며, 일본풍 인테리어와 마사지 욕조, 사우나, 일본식 목욕 공간을 갖추고 있습니다. 밝고 깔끔한 분위기는 현대적인 호텔 스파에 가깝습니다.\n\n넓은 목욕 공간과 조용한 휴게실에서 관광 사이에 잠시 쉬어 갈 수 있습니다. Lisboeta, Grand Lisboa Palace 또는 코타이 일대에 머문다면 일정에 맞춰 방문 시간을 정하기 편리합니다. 관리 내용, 가격, 진행 중인 혜택은 예약 전에 확인해 주세요.',
      },
      'majesty-spa': {
        name: 'Majesty Spa (마제스티 스파)',
        badge: '최고급 럭셔리',
        summary:
          'Majesty Spa는 마카오 피셔맨스워프의 Harbourview Hotel 안에 있으며, 화려한 인테리어와 넓은 홀, 편안한 휴식 공간이 특징입니다.',
        description:
          'Majesty Spa는 마카오 피셔맨스워프의 Harbourview Hotel 안에 있으며, 화려한 인테리어와 넓은 홀, 편안한 휴식 공간이 특징입니다. 골드와 대리석 마감을 바탕으로 10여 가지 스타일의 객실, 목욕 시설, KTV룸, 식사 공간을 갖추고 있습니다.\n\n목욕이나 식사를 즐긴 뒤 필요한 마사지 프로그램과 객실 이용에 대해 문의할 수 있습니다. 늦은 밤까지 쉬고 싶다면 리클라이너와 독립 휴게실의 이용 가능 여부 및 비용을 미리 확인해 주세요. 예약 시 관리 시간, 포함 항목, 총금액도 함께 확인하는 것이 좋습니다.',
      },
      'the-excellent-sauna': {
        name: 'The Excellent Sauna (디 엑설런트 사우나)',
        badge: '24시간 운영',
        summary:
          'The Excellent Sauna는 마카오 반도 Grand Emperor Hotel 안에 있습니다.',
        description:
          'The Excellent Sauna는 마카오 반도 Grand Emperor Hotel 안에 있습니다. 아담한 공간에 다양한 인테리어의 객실과 일반 객실, 목욕·사우나·휴식 시설을 갖추고 있습니다.\n\n시설을 먼저 살펴본 뒤 마사지 내용, 시간, 예산에 맞춰 프로그램을 비교할 수 있습니다. 24시간 휴게 공간이 있으며, 숙박 휴식이나 특정 객실을 원한다면 예약 전에 이용 가능 여부와 비용을 확인해 주세요.',
      },
      'empire-sauna': {
        name: 'Empire Sauna (엠파이어 사우나)',
        badge: '최신 & 인기',
        summary:
          'Empire Sauna는 2026년 마카오 반도에 문을 연 시설로, 현대적인 고급스러움과 동양적인 인테리어를 조합했습니다.',
        description:
          'Empire Sauna는 2026년 마카오 반도에 문을 연 시설로, 현대적인 고급스러움과 동양적인 인테리어를 조합했습니다. 대리석 욕장, 호텔형 객실, 식사 및 휴식 공간이 이어집니다.\n\n워터베드룸과 서로 다른 디자인의 객실, 숙박 휴식 시설을 갖추고 있으며 대만식·일본식 등 마사지 프로그램을 제공합니다. 원하는 관리 내용, 시간, 시설을 비교하고 예약 전에 당일 이용 가능 여부, 총금액, 개업 혜택을 확인해 주세요.',
      },
      'east-castle-spa': {
        name: 'East Castle Spa (이스트 캐슬 스파)',
        badge: '다양한 객실 디자인',
        summary:
          'East Castle Spa(이스트 캐슬 스파)는 Casa Real Hotel(皇家金堡酒店) 3·4층에 있습니다.',
        description:
          "East Castle Spa(이스트 캐슬 스파)는 Casa Real Hotel(皇家金堡酒店) 3·4층에 있습니다. 넓은 목욕 공간과 깨끗하고 시설이 잘 갖춰진 독립실이 특징이며, 객실마다 다른 스타일과 세심한 실내 장식으로 공간의 개성을 살렸습니다.\n\n전체적으로 조용하고 단정한 분위기여서 바쁜 일정에서 벗어나 쉬고 싶은 분에게 어울립니다. 전문 직원의 응대와 편안한 환경 속에서 서두르지 않고 여유롭게 시간을 보낼 수 있습니다.",
      },
      'victoria-sauna': {
        name: 'Victoria Sauna (빅토리아 사우나)',
        badge: '가장 조용한 분위기',
        summary:
          'Victoria Sauna는 조용한 목욕·사우나·리클라이너 공간과 워터베드룸이 특징이며, 야간 휴식 조건은 당일 확인이 필요합니다.',
        description:
          'Victoria Sauna(빅토리아 사우나)는 차분한 마카오 사우나입니다. 인플루언서 중심의 강한 이미지보다 조용함, 넉넉한 공간, 붐비지 않는 분위기가 장점입니다. 대욕장과 사우나 구역, 리클라이너 라운지 모두 느긋해 인기 대형 업소의 소음을 피하고 평온하게 저녁을 쉬고 싶은 이용객에게 알맞습니다.\n\n가성비와 야간 휴식의 편의성이 핵심입니다. 워터베드룸, 1+1 형태의 혜택, 자정 이후 독립 휴게실 이용이 예산을 아끼면서도 온전한 경험을 원하는 이들에게 선택지를 줍니다. 입장 직후 서둘러 정할 필요 없이 목욕과 식사, 선택을 천천히 진행하고 남은 밤은 휴식에 쓸 수 있습니다. 화려한 쇼보다 조용함을 선호한다면 잘 맞습니다.',
      },
      'm-club': {
        name: 'M CLUB (엠클럽)',
        badge: '사이버펑크 & KTV',
        summary:
          'MCLUB은 Waldo Hotel 안에 있는 시설로 현재 임시 휴업 중이며 방문과 예약을 받지 않습니다.',
        description:
          'MCLUB은 Waldo Hotel 안에 있는 시설로 현재 임시 휴업 중이며 방문과 예약을 받지 않습니다. 이 페이지는 이전 시설 정보를 참고용으로 보관하고 있습니다.\n\n과거 기록에는 네온 조명, 파노라마 영상, KTV, 라운지, 다양한 인테리어의 객실이 포함되어 있습니다. 사진과 시설 소개는 현재 이용 가능하다는 뜻이 아닙니다. 재개장 날짜, 서비스 내용, 요금은 향후 업소 공지를 확인해 주세요.',
      },
      'number-one-sauna': {
        name: 'Number One Sauna (넘버 원 사우나)',
        badge: '임시 휴업',
        summary:
          'Number One Sauna는 현재 임시 휴업 중이며 방문과 예약을 받지 않습니다.',
        description:
          'Number One Sauna는 현재 임시 휴업 중이며 방문과 예약을 받지 않습니다. 이 페이지는 이전 시설 및 운영 정보를 과거 자료로 보관하고 있습니다.\n\n이전 시설에는 대형 욕조, 건식·습식 사우나, 식사 공간, 리클라이너 휴게실이 있었습니다. 과거 가격, 영업시간, 숙박 휴식 조건은 현재 제공되는 서비스가 아닙니다. 향후 재개장 시 최신 시설, 서비스, 요금을 확인해 주세요.',
      },
      'familia-nobre': {
        name: 'Familia Nobre (파밀리아 노브레)',
        badge: '최고의 가성비',
        summary:
          'Familia Nobre는 마카오 반도에 있는 시설로 현재 임시 휴업 중이며 방문이나 예약을 안내하지 않습니다.',
        description:
          'Familia Nobre는 마카오 반도에 있는 시설로 현재 임시 휴업 중이며 방문이나 예약을 안내하지 않습니다. 이 페이지는 이전 시설 정보를 참고용으로 남겨 두고 있습니다.\n\n과거 자료에는 욕장, 식사 공간, 객실, 리클라이너 휴게 공간이 기록되어 있습니다. 예전 가격, 서비스료 면제 조건, 숙박 휴식 안내는 현재의 혜택이 아닙니다. 재개장 여부와 새로운 이용 조건은 향후 업소 공지를 확인해 주세요.',
      },
      'oceanic-royal-spa': {
        name: 'Oceanic Royal Spa (오셔닉 로열 스파)',
        badge: '대형 무대 & 다이닝',
        summary:
          'Oceanic Royal Spa는 현재 임시 휴업 중인 타이파 업소로, 클래식한 인테리어와 대형 쇼케이스 홀, 다이닝 공간으로 알려졌습니다.',
        description:
          'Oceanic Royal Spa(오셔닉 로열 스파)는 한곳에서 저녁 전체를 보내는 경험을 중심으로 구성된 타이파 업소입니다. 클래식한 인테리어와 대형 쇼케이스 구역, 활동 사이에 쉴 수 있는 공간을 갖춰 단일 목적의 스파보다 종합 레저 클럽에 가까운 분위기입니다. 갤러리에서는 입구, 라운지, 무대형 홀, 식사 공간, 독립 객실을 확인할 수 있습니다.\n\n현재 임시 휴업으로 표시되어 방문과 예약을 받지 않습니다. 이 페이지는 참고용으로만 유지되며, 재개장 날짜와 최신 가격, 영업시간, 이용 가능한 서비스는 계획 전에 공식 최신 채널을 통해 확인해야 합니다.',
      },
      'eighteen-sauna': {
        name: '18 Sauna (18 사우나)',
        badge: '클래식 & 쇼 홀',
        summary:
          '18 Sauna는 현재 임시 휴업 중이며, 과거 Hotel Golden Dragon 6층에서 대형 목욕 시설과 저녁 프레젠테이션 홀을 운영했습니다.',
        description:
          '18 Sauna(18 사우나)는 과거 마카오 반도 Hotel Golden Dragon 6층에서 운영했습니다. 이전 자료에는 대형 목욕 공간, 건식·습식 사우나, 냉탕, 리클라이너 라운지, 저녁 프레젠테이션 홀이 소개되어 있습니다. 그룹 소개와 참여형 프로그램이 이 업소를 대표하던 특징이었습니다.\n\n현재는 임시 휴업 중입니다. 여기에 표시된 MOP 1,780~5,550 가격대, 과거 24시간 운영, 야간 휴식 옵션, 서비스 요금 없음 정책은 모두 과거 참고 정보이며 현재 제공 조건이 아닙니다. 방문을 계획하기 전에 재개장 여부와 모든 새 조건을 확인해야 합니다.',
      },
    },
  },

  vip: {
    badge: '무료 컨시어지 서비스',
    heading: '이용 방법',
    intro: '추천부터 이동, VIP 입장, 추가 혜택, 귀환 차량까지 전 과정을 도와드립니다.',
    tabHow: '이용 방법',
    tabGifts: 'VIP 추가 혜택',
    giftsHeader: '마사지·케어 혜택 1가지 선택',
    columns: { item: '서비스 항목', value: '정상가', ours: 'VIP 혜택' },
    free: '무료',
    gifts: [
      { emoji: '🧎‍♀️', name: '등 마사지', desc: '등과 목, 어깨를 부드럽게 풀어주는 마사지입니다.', value: '298 MOP' },
      { emoji: '🦵', name: '허벅지 릴랙스 마사지', desc: '사우나 후 대퇴부 앞뒤 근육을 깊게 풀어줍니다.', value: '288 MOP' },
      { emoji: '💆', name: '두피 마사지', desc: '두피를 부드럽게 눌러 피로와 긴장을 덜어줍니다.', value: '230 MOP' },
      { emoji: '🦶', name: '발 반사 마사지', desc: '지친 발의 압점을 자극해 편안하게 풀어줍니다.', value: '230 MOP' },
      { emoji: '🤚', name: '매니큐어', desc: '손톱 정리, 모양 다듬기, 큐티클 관리, 광택을 제공합니다.', value: '220 MOP' },
      { emoji: '🧴', name: '페디큐어', desc: '족욕과 발톱·큐티클 관리, 가벼운 발 마사지를 제공합니다.', value: '220 MOP' },
      { emoji: '🤲', name: '손 마사지', desc: '손목과 팔뚝의 긴장을 풀어줍니다.', value: '200 MOP' },
      { emoji: '👂', name: '귀 청소', desc: '전통 방식의 귀 청소로 편안한 휴식을 돕습니다.', value: '200 MOP' },
      { emoji: '🚗', name: '마카오 전역 전용 셔틀', desc: '확정된 업소 방문 일정에 맞춰 마카오 전역 픽업 또는 귀환 이동을 제공합니다.', value: '500 MOP' },
    ],
    steps: [
      {
        title: '맞춤 추천 받기 💬',
        body: '내부 네트워크를 통해 예약을 도와드립니다. 어느 사우나가 맞을지 미리 정하지 않아도 됩니다. 관심사를 알려주시거나 저희 팀의 추천을 받아보세요. 각 업소의 장점을 바탕으로 안내합니다.',
      },
      {
        title: '전용 셔틀 배차 🚗',
        body: '호텔 로비, 공항, Outer Harbour Pier, Taipa Pier, 거리의 지정 지점까지 위치를 알려주시면 픽업을 조율합니다. 이용 후에도 마카오 내 목적지로 이동을 요청할 수 있습니다.',
        note: {
          title: '친구와 함께 오시나요?',
          body: '7인승 차량 이용 가능 여부를 확인해 드리며, 일행 모두 같은 혜택을 추가 비용 없이 받을 수 있습니다.',
        },
      },
      {
        title: 'VIP 입장과 전용 조건 확인 ⚡',
        body: '내부 네트워크 예약으로 입장 절차를 간소화할 수 있습니다. 업소별 조건은 달라질 수 있으므로 원하는 곳을 알려주시면 당일 적용 가능한 가격과 혜택을 확인해 드립니다.',
      },
      {
        title: 'VIP 추가 혜택 1개 선택 🎁',
        body: '예약에 대한 감사 혜택입니다. 방문 사실을 업소에 전달한 뒤, 도착 시 두피 마사지, 발 반사 마사지, 매니큐어 등 제공 가능한 항목 중 하나를 선택합니다.',
      },
      {
        title: '무료 귀환 차량 요청 🚗',
        body: '식사나 서비스가 끝난 뒤 메시지를 보내주세요. 차량 가능 시간을 확인해 호텔, 공항, 페리 터미널 등 마카오 내 목적지로 이동을 조율합니다. 픽업과 마찬가지로 추가 비용은 없습니다.',
      },
    ],
  },

  quickMatch: {
    badge: '★ 스마트 매칭',
    heading: [{ text: '1분 만에 찾는 ' }, { text: '나에게 맞는 사우나', accent: true }],
    intro: '몇 가지 질문에 답하면 {count}곳 중 가장 잘 맞는 업소를 바로 추천합니다.',
    questions: { group: '인원은?', experience: '원하는 경험은?', when: '언제 방문하나요?', from: '출발지는?' },
    groupOptions: { solo: '1명', pair: '2명', small: '3~4명', large: '5명 이상' },
    experienceOptions: {
      value: '예산 우선',
      theme: '객실 디자인',
      taipa: '타이파·코타이',
      new: '최신 시설',
      ktv: 'KTV룸',
      classic: '전통 명소',
    },
    whenOptions: { now: '지금 바로', tonight: '오늘 밤', tomorrow: '내일', sat: '토요일 밤', sun: '일요일 밤', other: '기타' },
    fromOptions: { border: '국경', hotel: '호텔', airport: '공항', other: '기타' },
    overnightOn: '야간 휴식 희망',
    overnightOff: '야간 휴식 불필요',
    overnightHint: '편안한 야간 휴식 환경을 우선 추천',
    resultLabel: '맞춤 추천 결과',
    pickedFrom: '{count}곳 중 선정',
    bestMatch: '최적 매칭',
    matchSuffix: '% 일치',
    details: '자세히',
    bookNow: '지금 문의 · 채널 선택',
    messageTemplate:
      '안녕하세요. 사이트에서 추천 업소를 확인했습니다. 희망 경험: {experience}\n· 인원: {group}\n· 시간: {when}\n· 출발지: {from}\n· 야간 휴식: {overnight}\n· 관심 업소: {venue}\n가격과 VIP 이용 조건을 확인해 주세요. 감사합니다.',
    yes: '예',
    no: '아니요',
  },

  features: {
    heading: '저희를 선택하는 이유',
    items: [
      { icon: 'crown', title: "투명한 요금", desc: '모든 비용을 미리 안내합니다' },
      { icon: 'shield', title: "나에게 맞는 사우나 추천", desc: "비싸다고 더 좋은 것은 아닙니다. 나에게 맞는 곳이 중요합니다!" },
      { icon: 'sparkles', title: "마카오의 정식 허가 사우나", desc: "이 웹사이트에 소개된 모든 사우나의 영업 허가는 마카오정부관광청에서 조회할 수 있습니다." },
      { icon: 'clock', title: '추가 요금 없는 야간 휴식', desc: '업소 조건에 따라 조식과 목욕을 포함해 12~15시간 휴식 가능' },
    ],
  },

  testimonials: {
    heading: '방문 전에 확인할 사항',
    regionLabel: '여행 전 준비 항목',
    served: '세부 조건을 확인하는 실용적인 체크리스트',
    motion: { pause: '여행 준비 항목 움직임 일시 정지', resume: '여행 준비 항목 움직임 다시 재생' },
    items: [
      { quote: '업소의 분위기와 위치, 최신 영업시간, 원하는 경험을 비교한 뒤 선택하세요.', author: '업소 선택' },
      { quote: '방문 날짜 기준으로 확인된 정보와 출발 전까지 바뀔 수 있는 정보를 구분해 문의하세요.', author: '최신 상태' },
      { quote: '예산을 정한 뒤 예상 비용, 선택 항목, 업소별 수수료를 구분해 안내해 달라고 요청하세요.', author: '예산과 비용' },
      { quote: '픽업 요청 시 정확한 장소, 날짜, 희망 시간, 인원, 수하물 정보를 함께 전달하세요.', author: '픽업 요청' },
      { quote: '만남 장소와 픽업 가능 시간대가 확정된 뒤에만 차량이 준비된 것으로 판단하세요.', author: '픽업 확인' },
      { quote: '실제 일행에 맞는 차량을 확인할 수 있도록 짐의 개수와 대략적인 크기를 알려주세요.', author: '수하물 동반' },
      { quote: '귀환 차량이 필요하면 목적지와 예상 종료 시간을 미리 알려주세요. 경로와 시간은 별도 확인이 필요합니다.', author: '귀환 계획' },
      { quote: '도착 시간이 바뀌면 즉시 알려주세요. 기존 픽업 시간대를 지키기 어려울 수 있습니다.', author: '일정 변경' },
      { quote: '단체라면 각자의 핵심 취향을 먼저 모으고 모두에게 중요한 조건을 정하세요.', author: '단체 우선순위' },
      { quote: '선호 언어를 미리 알리고 어떤 내용을 업소에서 다시 확인해야 하는지 물어보세요.', author: '언어 지원' },
      { quote: '당일 이용 가능 인원은 달라질 수 있으므로 이전 목록보다 최신 확인을 요청하세요.', author: '당일 이용 가능 여부' },
      { quote: '늦은 시간에 도착하거나 출발한다면 해당 날짜의 영업시간을 반드시 확인하세요.', author: '영업시간' },
      { quote: '야간 휴식을 계획하기 전에 현재 허용 여부와 이용 시간, 객실 조건을 확인하세요.', author: '야간 휴식 조건' },
      { quote: '선호 업소가 붐비거나 운영 상태가 바뀔 때를 대비해 적합한 대안을 하나 더 정해두세요.', author: '대안 계획' },
      { quote: '가능한 결제 수단과 통화, 현장 결제 항목, 결제 시점을 확인하세요.', author: '결제 정보' },
      { quote: '출발 전에 도착 담당자와 만남 방법, 입장 순서를 확인하세요.', author: '도착 절차' },
      { quote: '예약에 필요한 개인정보만 제공하고 해당 정보가 어떻게 사용되는지 확인하세요.', author: '개인정보' },
      { quote: '업소, 만남 장소, 시간대, 다음 행동이 적힌 최종 메시지를 저장해 두세요.', author: '최종 확인' },
    ],
  },

  blog: { heading: '최신 블로그 글', viewAll: '전체 보기 →' },

  ctaBand: {
    heading: '고르기 어렵다면 추천을 받아보세요',
    body: '원하는 조건을 알려주시면 알맞은 이용 계획을 함께 정리해 드립니다.',
    chat: '채팅으로 문의',
    ranking: '랭킹',
    guide: '가이드 & 팁',
    faq: '자주 묻는 질문',
  },

  contact: {
    heading: '궁금한 점을 알려주세요',
    intro: '필요한 정보를 언제든 문의하세요. 하루 24시간 가능한 한 빠르게 답변드립니다.',
    inquiryMessage: '마카오 사우나 이용에 관심이 있습니다. 예약과 이동을 도와주실 수 있나요?',
    viewQr: 'QR 보기',
    channels: { whatsapp: '메시지 보내기', telegram: '@am38876', wechat: 'gh34366', line: '@224vqwdv' },
  },

  mission: {
    quote: '정확한 정보를 먼저, 신뢰할 수 있는 준비는 그다음에.',
    body: '업소 정보와 최신 운영 상태, 픽업 계획, 다음 단계를 이해하기 쉽게 정리합니다. 변경 사항이 생기면 가능한 한 일찍 알리고 일정을 다시 확인해, 추측을 줄이고 불필요한 이동을 피할 수 있도록 돕습니다.',
  },

  footer: {
    backToTop: '↑ 맨 위로',
    links: [
      { path: '/', label: '홈' },
      { path: '/ranking/', label: '랭킹' },
      { path: '/guide/', label: '이용 가이드' },
      { path: '/faq/', label: '자주 묻는 질문' },
      { path: '/about/', label: '소개' },
      { path: '/blog/', label: '블로그' },
      { path: '/shuttle/', label: '셔틀' },
      { path: '/contact/', label: '문의' },
      { path: '/privacy/', label: '개인정보처리방침' },
    ],
    editorialPolicy: '편집 정책',
    copyright: '© 2026 마카오 사우나 가이드. 모든 권리 보유.',
  },

  wechat: {
    title: 'WeChat에서 추가하기',
    optionScan: '방법 1: 위 QR 코드 스캔',
    optionCopy: '방법 2: ID를 복사해 WeChat에서 검색',
    copy: 'WeChat ID 복사: gh34366',
    copied: '✓ 복사했습니다. WeChat을 열어 추가하세요.',
    manualCopy: '자동 복사를 사용할 수 없습니다. WeChat ID를 선택해 직접 복사해 주세요.',
    close: '닫기',
  },

  kakaotalk: {
    name: '카카오톡',
    title: '카카오톡에서 친구 추가',
    optionScan: '방법 1: 위 QR 코드 스캔',
    optionCopy: '방법 2: ID를 복사한 뒤 카카오톡에서 {id} 검색',
    copy: '카카오톡 ID 복사: {id}',
    copied: '✓ 복사했습니다. 카카오톡을 열어 ID를 검색해 주세요.',
    manualCopy: '자동 복사를 사용할 수 없습니다. 카카오톡 ID를 선택해 직접 복사해 주세요.',
    close: '닫기',
    qrAlt: '카카오톡 ID {id} QR 코드',
  },

  floatingPill: { label: '채팅', aria: '채팅 문의 — 연락처 섹션으로 이동' },
};

export default ko;
