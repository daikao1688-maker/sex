import type { Locale } from '../config';
import { formatVenueCount } from '../venueVisibility';
import type { VenueSlug } from '../../data/venues';
import { createPageCopy, type Crumb } from './helpers';

export interface RankingCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  backHome: string;
  heading: string;
  intro: string;
  topPicks: {
    heading: string;
    cards: Array<{ emoji: string; label: string; slug: VenueSlug; body: string }>;
  };
  includes: { heading: string; items: string[] };
  swipeHint: string;
  /** Column labels, shared by the four comparison tables. */
  tables: {
    basics: {
      heading: string;
      venue: string;
      district: string;
      therapists: string;
      hours: string;
      open24h: string;
      rating: string;
    };
    pricing: { heading: string; priceRange: string; serviceFee: string; note: string };
    overnight: { heading: string; overnight: string };
    features: { heading: string; ktv: string; themeRooms: string; isNew: string };
  };
  values: { yes: string; no: string; confirm: string; none: string; multinational: string };
  districts: { peninsula: string; taipa: string };
  treatments: { heading: string; intro: string; free: string };
  cta: { heading: string; body: string };
}

const en: RankingCopy = {
  meta: {
    title: 'Macau Sauna Ranking 2026 - Macau Sauna Sites',
    description:
      'Compare {venueCount} Macau sauna venue profiles by reference price range, area, hours, overnight options and facilities, with current closure notices.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Venue comparison', path: '/ranking/' },
  ],
  backHome: 'Back to home',
  heading: 'Macau Sauna Guide 2026 — Compare {venueCount} Venues',
  intro:
    'This is an editorial comparison, not a fixed league table. Start with your budget, available time, preferred area and whether you need an overnight option. Prices, staff hours and operating status can change; the tables use the current venue data on this site, and a venue may remain listed for reference while temporarily closed. Open its detail page and confirm again before you travel.',
  topPicks: {
    heading: 'A useful starting point for different plans',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: 'For varied room designs',
        body: "A compact venue with rooms in different styles; confirm the facilities and massage options included in your package.",
      },
      {
        slug: 'shang-pin-spa',
        emoji: '📍',
        label: 'For Cotai stays',
        body: 'Convenient for guests based around Lisboeta and the Cotai resort area.',
      },
      {
        slug: 'manhao-spa',
        emoji: '🎭',
        label: 'For a spacious hall',
        body: "A newer Taipa venue with a spacious hall and bathing facilities; no overnight stay.",
      },
      {
        slug: 'majesty-spa',
        emoji: '🛏️',
        label: 'For a longer night',
        body: 'A 24-hour venue with overnight facilities; check room and lounge arrangements for your date.',
      },
      {
        slug: 'number-nine-sauna',
        emoji: '✨',
        label: 'For newer facilities',
        body: "A 2026 opening with newer interiors in central Macau.",
      },
    ],
  },
  includes: {
    heading: 'Check these details before choosing',
    items: [
      'Current operating status',
      'Total price and service fee',
      'Venue hours and staff duty hours',
      'Overnight and lounge rules',
      'Dining and bathing facilities by venue',
      'Pickup and payment arrangements after confirmation',
    ],
  },
  swipeHint: '← Swipe sideways to view every column →',
  tables: {
    basics: {
      heading: 'Current venue facts',
      venue: 'Venue',
      district: 'Area',
      therapists: 'Team',
      hours: 'Staff duty hours',
      open24h: '24h schedule when operating',
      rating: 'Editorial score',
    },
    pricing: {
      heading: 'Budget reference',
      priceRange: 'Typical package range (MOP)',
      serviceFee: 'Separate service fee',
      note:
        "These ranges describe venue package prices, not entry-only prices. Ask which massage treatment, duration and facilities the quote covers, and confirm taxes, service charges and optional extras. “No separate surcharge” may mean the fee is already included in the displayed price.",
    },
    overnight: {
      heading: 'Overnight planning',
      overnight: 'Overnight and lounge rest',
    },
    features: {
      heading: 'Experience and facilities',
      ktv: 'KTV',
      themeRooms: 'Theme rooms',
      isNew: 'Newer venue',
    },
  },
  values: {
    yes: 'Yes',
    no: '–',
    confirm: 'Confirm before departure',
    none: 'No separate surcharge',
    multinational: 'International team',
  },
  districts: { peninsula: 'Macau Peninsula', taipa: 'Taipa / Cotai' },
  treatments: {
    heading: 'Optional treatments and current offers',
    intro:
      'These are common add-on treatments, not an automatic inclusion at every venue. Availability, price and promotional eligibility vary by date and package. Ask what is actually included in your quote before confirming.',
    free: 'Check offer',
  },
  cta: {
    heading: 'Need help narrowing it down?',
    body:
      'Send us your budget, date, area and expected departure time. We can compare the currently operating options and confirm the latest quote and transport arrangement.',
  },
};

const ja: RankingCopy = {
  meta: {
    title: 'マカオ・サウナ比較2026 - マカオ・サウナ・ガイド',
    description:
      'マカオのサウナ{venueCount}店を、料金目安・エリア・営業時間・宿泊可否・設備で比較。休業情報と来店前の確認ポイントもご案内します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: '店舗比較', path: '/ranking/' },
  ],
  backHome: 'ホームへ戻る',
  heading: 'マカオ・サウナ比較2026 — {venueCount}店の選び方',
  intro:
    'このページは編集部による選び方の目安で、順位が固定されたランキングではありません。まずは予算、滞在時間、希望エリア、宿泊の要否で候補を絞るのがおすすめです。料金、スタッフの出勤時間、営業状況は変わることがあります。表は当サイトの店舗データをもとに表示しており、一時休業中の店舗も資料として掲載されます。出発前に各詳細ページと当日の案内をご確認ください。',
  topPicks: {
    heading: '目的から探すなら、まずこの5店',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '客室デザインを重視',
        body: "さまざまな内装の部屋を備えたコンパクトな店舗。利用できる設備とプランに含まれるマッサージをご確認ください。",
      },
      {
        slug: 'shang-pin-spa',
        emoji: '📍',
        label: 'コタイ滞在に便利',
        body: '葡京人やコタイのホテルを拠点にする旅行者が動きやすい立地です。',
      },
      {
        slug: 'manhao-spa',
        emoji: '🎭',
        label: '広いホールを重視',
        body: "広いホールと入浴設備を備えたタイパの新しい店舗。宿泊休憩には対応していません。",
      },
      {
        slug: 'majesty-spa',
        emoji: '🛏️',
        label: '長めに滞在したい',
        body: '24時間営業で宿泊設備あり。利用日の休憩スペースと客室条件は事前確認が安心です。',
      },
      {
        slug: 'number-nine-sauna',
        emoji: '✨',
        label: '新しい設備',
        body: "2026年開業。新しい内装が特徴のマカオ中心部の店舗です。",
      },
    ],
  },
  includes: {
    heading: '比較するときに確認したい6項目',
    items: [
      '当日の営業状況',
      '総額とサービス料',
      '店舗営業時間とスタッフ出勤時間',
      '宿泊・休憩スペースの条件',
      '店舗ごとの食事・入浴設備',
      '予約確定後の送迎・支払い方法',
    ],
  },
  swipeHint: '← 横にスワイプすると全項目を確認できます →',
  tables: {
    basics: {
      heading: '店舗の基本情報',
      venue: '店舗',
      district: 'エリア',
      therapists: 'スタッフ',
      hours: 'スタッフ出勤時間',
      open24h: '営業時は24時間',
      rating: '編集部スコア',
    },
    pricing: {
      heading: '予算の目安',
      priceRange: '一般パッケージ目安（MOP）',
      serviceFee: '別途サービス料',
      note:
        "各レンジは店舗のプラン料金の目安で、入場料のみの表示ではありません。見積もりに含まれるマッサージの種類、時間、設備に加え、税金、サービス料、追加項目をご確認ください。「別途加算なし」は表示料金に含まれる場合もあります。",
    },
    overnight: {
      heading: '宿泊・休憩',
      overnight: '宿泊・ラウンジ休憩',
    },
    features: {
      heading: '設備と楽しみ方',
      ktv: 'KTV',
      themeRooms: 'テーマルーム',
      isNew: '比較的新しい店舗',
    },
  },
  values: {
    yes: 'あり',
    no: '–',
    confirm: '出発前に確認',
    none: '別途加算なし',
    multinational: '多国籍チーム',
  },
  districts: { peninsula: 'マカオ半島', taipa: 'タイパ／コタイ' },
  treatments: {
    heading: '追加ケアとキャンペーンの確認',
    intro:
      '以下はよく見られる追加ケアの例です。すべての店舗・コースに自動で含まれるものではありません。内容、料金、キャンペーン対象は日程やプランで変わるため、予約前に見積もりの内訳をご確認ください。',
    free: '要確認',
  },
  cta: {
    heading: '候補を絞りきれない方へ',
    body:
      'ご予算、日程、滞在エリア、退店したい時間をお知らせください。営業中の候補を比較し、最新料金と送迎条件を確認してご案内します。',
  },
};

const zhTW: RankingCopy = {
  meta: {
    title: '澳門桑拿比較 2026 - 澳門桑拿導航站',
    description:
      '比較澳門 {venueCount} 間桑拿場所的參考價格、地區、技師時段、過夜安排與設備，並清楚標示暫停營業狀態。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '會所比較', path: '/ranking/' },
  ],
  backHome: '返回首頁',
  heading: '澳門桑拿比較 2026 — {venueCount} 間場所怎樣選',
  intro:
    '這份名單是編輯整理的選擇建議，不是永遠不變的名次。先按預算、可用時間、所在區域及是否需要過夜縮窄範圍，會比只看星級實際。價格、技師時段與營業狀態都可能調整；表格以本站目前的會所資料顯示，暫停營業的會所仍會保留作資料參考。出發前請打開詳情頁，並再次確認當日情況。',
  topPicks: {
    heading: '按行程需要，先看這 5 間',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '多種房間設計',
        body: "設有多種不同風格房間的小型會所，預約前請確認套餐包含的設施及按摩項目。",
      },
      {
        slug: 'shang-pin-spa',
        emoji: '📍',
        label: '住路氹較方便',
        body: '適合入住澳門葡京人或路氹酒店、希望減少來回交通的人。',
      },
      {
        slug: 'manhao-spa',
        emoji: '🎭',
        label: '重視寬敞大廳',
        body: "氹仔較新的會所，設寬敞大廳與沐浴設施，不提供過夜留宿。",
      },
      {
        slug: 'majesty-spa',
        emoji: '🛏️',
        label: '想留久一點',
        body: '24 小時營業並有過夜安排；指定日期的房間與休息區條件需先確認。',
      },
      {
        slug: 'number-nine-sauna',
        emoji: '✨',
        label: '喜歡較新設施',
        body: "2026 年開業，位於澳門半島，設有較新的裝潢。",
      },
    ],
  },
  includes: {
    heading: '比較時，先核對這 6 件事',
    items: [
      '當日是否正常營業',
      '總價與服務費',
      '會所營業及技師當班時段',
      '過夜與休息區規則',
      '各會所實際餐飲及沐浴設施',
      '確認預約後的接送與付款安排',
    ],
  },
  swipeHint: '← 左右滑動查看全部欄位 →',
  tables: {
    basics: {
      heading: '會所現況資料',
      venue: '會所',
      district: '地區',
      therapists: '技師團隊',
      hours: '技師當班時段',
      open24h: '正常營業時 24 小時',
      rating: '編輯評分',
    },
    pricing: {
      heading: '預算參考',
      priceRange: '一般套餐參考範圍（MOP）',
      serviceFee: '另收服務費',
      note:
        "表內範圍為會所套餐參考價，並非單獨入場費。請確認報價包含的按摩項目、時長及設施，以及稅項、服務費和自選項目。「不另收服務費」也可能表示費用已包含在展示價格內。",
    },
    overnight: {
      heading: '過夜安排',
      overnight: '過夜與大堂休息',
    },
    features: {
      heading: '設施與體驗',
      ktv: 'KTV',
      themeRooms: '主題房',
      isNew: '較新會所',
    },
  },
  values: {
    yes: '有',
    no: '–',
    confirm: '出發前確認',
    none: '不另收服務費',
    multinational: '多國籍團隊',
  },
  districts: { peninsula: '澳門半島', taipa: '氹仔／路氹' },
  treatments: {
    heading: '加購護理與當期優惠',
    intro:
      '以下是常見的附加護理項目，並非每間會所、每個套式都會自動包含。可選項目、收費及優惠資格會隨日期和方案改變，確認預約前請先看清楚報價包含甚麼。',
    free: '優惠待確認',
  },
  cta: {
    heading: '仍未決定去哪一間？',
    body:
      '把預算、日期、所在區域及預計離場時間告訴我們，我們會從目前營業的選項中協助比較，再確認最新報價與接送安排。',
  },
};

const zhCN: RankingCopy = {
  meta: {
    title: '澳门桑拿对比 2026 - 澳门桑拿导航站',
    description:
      '对比澳门 {venueCount} 家桑拿场所的参考价格、区域、技师时段、过夜安排与设施，并清楚标注暂停营业状态。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '会所对比', path: '/ranking/' },
  ],
  backHome: '返回首页',
  heading: '澳门桑拿对比 2026 — {venueCount} 家场所怎么选',
  intro:
    '这份名单是编辑整理的选择建议，并不是长期固定的名次。先按预算、可用时间、所在区域和是否需要过夜筛选，通常比只看星级更实用。价格、技师时段和营业状态都可能调整；表格以本站当前的会所数据为准，暂停营业的会所也会保留作为资料参考。出发前请打开详情页，并再次确认当天情况。',
  topPicks: {
    heading: '按行程需求，可以先看这 5 家',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '多种房间设计',
        body: "设有多种不同风格房间的小型会所，预约前请确认套餐包含的设施及按摩项目。",
      },
      {
        slug: 'shang-pin-spa',
        emoji: '📍',
        label: '住路氹更方便',
        body: '适合住在澳门葡京人或路氹酒店、希望少花时间往返的游客。',
      },
      {
        slug: 'manhao-spa',
        emoji: '🎭',
        label: '看重宽敞大厅',
        body: "氹仔较新的会所，设宽敞大厅与沐浴设施，不提供过夜留宿。",
      },
      {
        slug: 'majesty-spa',
        emoji: '🛏️',
        label: '准备停留较久',
        body: '24 小时营业并有过夜安排；当天的房间和休息区条件需要提前确认。',
      },
      {
        slug: 'number-nine-sauna',
        emoji: '✨',
        label: '喜欢较新设施',
        body: "2026 年开业，位于澳门半岛，设有较新的装潢。",
      },
    ],
  },
  includes: {
    heading: '对比时，先核对这 6 件事',
    items: [
      '当天是否正常营业',
      '总价与服务费',
      '会所营业和技师当班时段',
      '过夜与休息区规则',
      '各会所实际餐饮和沐浴设施',
      '确认预约后的接送与付款安排',
    ],
  },
  swipeHint: '← 左右滑动查看全部栏目 →',
  tables: {
    basics: {
      heading: '会所当前资料',
      venue: '会所',
      district: '区域',
      therapists: '技师团队',
      hours: '技师当班时段',
      open24h: '正常营业时 24 小时',
      rating: '编辑评分',
    },
    pricing: {
      heading: '预算参考',
      priceRange: '一般套餐参考范围（MOP）',
      serviceFee: '另收服务费',
      note:
        "表内范围为会所套餐参考价，并非单独入场费。请确认报价包含的按摩项目、时长及设施，以及税项、服务费和自选项目。“不另收服务费”也可能表示费用已包含在展示价格内。",
    },
    overnight: {
      heading: '过夜安排',
      overnight: '过夜与大厅休息',
    },
    features: {
      heading: '设施与体验',
      ktv: 'KTV',
      themeRooms: '主题房',
      isNew: '较新会所',
    },
  },
  values: {
    yes: '有',
    no: '–',
    confirm: '出发前确认',
    none: '不另收服务费',
    multinational: '多国籍团队',
  },
  districts: { peninsula: '澳门半岛', taipa: '氹仔／路氹' },
  treatments: {
    heading: '加购护理与当期优惠',
    intro:
      '以下是常见的附加护理项目，并非每家会所、每个套餐都会自动包含。可选项目、收费和优惠资格会随日期与方案变化，确认预约前请先看清报价具体包含哪些内容。',
    free: '优惠待确认',
  },
  cta: {
    heading: '还是不知道选哪一家？',
    body:
      '把预算、日期、所在区域和预计离场时间告诉我们，我们会从当前营业的选项中协助对比，再确认最新报价与接送安排。',
  },
};

const ko: RankingCopy = {
  meta: {
    title: '마카오 사우나 비교 2026 - 마카오 사우나 가이드',
    description:
      '마카오 {venueCount}개 사우나 매장의 참고 가격, 지역, 테라피스트 시간대, 숙박 배치, 시설을 비교하고, 일시 휴업 상태도 명확히 표시합니다.',
  },
  breadcrumbs: [
    { name: '홈', path: '/' },
    { name: '매장 비교', path: '/ranking/' },
  ],
  backHome: '홈으로 돌아가기',
  heading: '마카오 사우나 비교 2026 — {venueCount}개 매장 선택법',
  intro:
    '이 목록은 편집부가 정리한 선택 제안이며, 장기간 고정된 순위가 아닙니다. 예산, 이용 가능 시간, 소재 지역, 숙박 필요 여부로 먼저 좁히는 편이 별점만 보는 것보다 실용적입니다. 가격, 테라피스트 시간대, 영업 상태는 모두 조정될 수 있으며, 표는 본 사이트의 현재 매장 데이터를 기준으로 합니다. 일시 휴업 매장도 자료 참고용으로 유지됩니다. 출발 전 상세 페이지를 열어 당일 상황을 다시 확인하세요.',
  topPicks: {
    heading: '일정 목적별로, 먼저 보기 좋은 5곳',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '다양한 객실 디자인',
        body: "다양한 디자인의 객실을 갖춘 아담한 매장입니다. 패키지에 포함된 시설과 마사지 항목을 확인하세요.",
      },
      {
        slug: 'shang-pin-spa',
        emoji: '📍',
        label: '코타이 숙박이라면 편리',
        body: '리스보에타나 코타이 호텔에 묵으며 이동 시간을 줄이고 싶은 여행자에게 적합합니다.',
      },
      {
        slug: 'manhao-spa',
        emoji: '🎭',
        label: '넓은 홀을 중시한다면',
        body: "넓은 홀과 목욕 시설을 갖춘 타이파의 신규 매장으로, 숙박은 제공하지 않습니다.",
      },
      {
        slug: 'majesty-spa',
        emoji: '🛏️',
        label: '오래 머물 계획이라면',
        body: '24시간 영업에 숙박 배치가 있습니다. 당일의 룸과 휴게 구역 조건은 미리 확인이 필요합니다.',
      },
      {
        slug: 'number-nine-sauna',
        emoji: '✨',
        label: '새로운 시설을 좋아한다면',
        body: "2026년 오픈한 마카오 반도의 매장으로 새로운 인테리어가 특징입니다.",
      },
    ],
  },
  includes: {
    heading: '비교할 때, 먼저 확인할 6가지',
    items: [
      '당일 정상 영업 여부',
      '총액과 서비스 요금',
      '매장 영업 및 테라피스트 근무 시간대',
      '숙박 및 휴게 구역 규칙',
      '매장별 실제 다이닝과 목욕 시설',
      '예약 확정 후 픽업과 결제 배치',
    ],
  },
  swipeHint: '← 좌우로 밀어 전체 항목 보기 →',
  tables: {
    basics: {
      heading: '매장 현재 정보',
      venue: '매장',
      district: '지역',
      therapists: '테라피스트 팀',
      hours: '테라피스트 근무 시간대',
      open24h: '정상 영업 시 24시간',
      rating: '편집부 평점',
    },
    pricing: {
      heading: '예산 참고',
      priceRange: '일반 패키지 참고 범위 (MOP)',
      serviceFee: '별도 서비스 요금',
      note:
        "표의 범위는 매장 패키지 참고 가격이며 입장료만을 뜻하지 않습니다. 견적에 포함된 마사지 항목, 시간, 시설과 함께 세금, 서비스 요금, 선택 옵션을 확인하세요. 별도 부과가 없다는 표현은 표시 가격에 이미 포함되어 있다는 뜻일 수도 있습니다.",
    },
    overnight: {
      heading: '숙박 배치',
      overnight: '숙박 및 로비 휴식',
    },
    features: {
      heading: '시설과 경험',
      ktv: 'KTV',
      themeRooms: '테마룸',
      isNew: '비교적 새로운 매장',
    },
  },
  values: {
    yes: '있음',
    no: '–',
    confirm: '출발 전 확인',
    none: '별도 부과 없음',
    multinational: '다국적 팀',
  },
  districts: { peninsula: '마카오 반도', taipa: '타이파／코타이' },
  treatments: {
    heading: '추가 케어와 진행 중 혜택',
    intro:
      '아래는 흔한 추가 케어 항목으로, 모든 매장·모든 코스에 자동으로 포함되지는 않습니다. 선택 가능 항목, 요금, 혜택 자격은 날짜와 플랜에 따라 달라지므로, 예약 확정 전 견적에 무엇이 포함되는지 먼저 확인하세요.',
    free: '혜택 확인 필요',
  },
  cta: {
    heading: '아직 어디로 갈지 못 정하셨나요?',
    body:
      '예산, 날짜, 계신 지역, 예상 퇴장 시간을 알려주시면 현재 영업 중인 선택지에서 함께 비교하고, 최신 견적과 픽업 배차를 확인해 드립니다.',
  },
};

export const rankingCopy: Partial<Record<Locale, RankingCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

const getRawRankingCopy = createPageCopy(rankingCopy);

export function getRankingCopy(lang: Locale): RankingCopy {
  const copy = getRawRankingCopy(lang);
  return {
    ...copy,
    meta: { ...copy.meta, description: formatVenueCount(copy.meta.description) },
    heading: formatVenueCount(copy.heading),
  };
}
