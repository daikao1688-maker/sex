import type { Locale } from '../config';
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
    pricing: { heading: string; priceRange: string; serviceFee: string };
    overnight: { heading: string; overnight: string; lounge: string };
    features: { heading: string; ktv: string; themeRooms: string; show: string; isNew: string };
  };
  values: { yes: string; no: string; none: string; multinational: string };
  districts: { peninsula: string; taipa: string };
  treatments: { heading: string; intro: string; free: string };
  cta: { heading: string; body: string };
}

const en: RankingCopy = {
  meta: {
    title: 'Macau Sauna Ranking 2026 - Macau Sauna Sites',
    description:
      'Compare 14 Macau sauna venue profiles by reference price range, area, hours, overnight options and facilities, with current closure notices.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Venue comparison', path: '/ranking/' },
  ],
  backHome: 'Back to home',
  heading: 'Macau Sauna Guide 2026 — Compare 14 Venues',
  intro:
    'This is an editorial comparison, not a fixed league table. Start with your budget, available time, preferred area and whether you need an overnight option. Prices, staff hours and operating status can change; the tables use the current venue data on this site, and a venue may remain listed for reference while temporarily closed. Open its detail page and confirm again before you travel.',
  topPicks: {
    heading: 'A useful starting point for different plans',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: 'For themed rooms',
        body: 'A compact choice if room concepts matter more to you than a large show hall.',
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
        label: 'For stage atmosphere',
        body: 'A newer Taipa venue centred on a prominent presentation hall; no overnight stay.',
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
        body: 'A 2026 opening with stage lighting and themed rooms in central Macau.',
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
      priceRange: 'Indicative range (MOP)',
      serviceFee: 'Service fee',
    },
    overnight: {
      heading: 'Overnight planning',
      overnight: 'Overnight available',
      lounge: 'Lounge recliner',
    },
    features: {
      heading: 'Experience and facilities',
      ktv: 'KTV',
      themeRooms: 'Theme rooms',
      show: 'Presentation show',
      isNew: 'Newer venue',
    },
  },
  values: { yes: 'Yes', no: '–', none: 'No fee', multinational: 'International team' },
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
      'マカオのサウナ14店を、料金目安・エリア・営業時間・宿泊可否・設備で比較。休業情報と来店前の確認ポイントもご案内します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: '店舗比較', path: '/ranking/' },
  ],
  backHome: 'ホームへ戻る',
  heading: 'マカオ・サウナ比較2026 — 14店の選び方',
  intro:
    'このページは編集部による選び方の目安で、順位が固定されたランキングではありません。まずは予算、滞在時間、希望エリア、宿泊の要否で候補を絞るのがおすすめです。料金、スタッフの出勤時間、営業状況は変わることがあります。表は当サイトの店舗データをもとに表示しており、一時休業中の店舗も資料として掲載されます。出発前に各詳細ページと当日の案内をご確認ください。',
  topPicks: {
    heading: '目的から探すなら、まずこの5店',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: 'テーマルーム重視',
        body: '大規模なショーより、趣向の異なる個室を楽しみたい方向けです。',
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
        label: 'ステージの雰囲気',
        body: 'タイパの新しい店舗。印象的な紹介ホールが中心で、宿泊には対応していません。',
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
        body: '2026年開業。ステージ照明とテーマルームを備えたマカオ中心部の店舗です。',
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
      priceRange: '参考料金（MOP）',
      serviceFee: 'サービス料',
    },
    overnight: {
      heading: '宿泊・休憩',
      overnight: '宿泊対応',
      lounge: 'リクライニング席',
    },
    features: {
      heading: '設備と楽しみ方',
      ktv: 'KTV',
      themeRooms: 'テーマルーム',
      show: '紹介ショー',
      isNew: '比較的新しい店舗',
    },
  },
  values: { yes: 'あり', no: '–', none: 'なし', multinational: '多国籍チーム' },
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
      '比較澳門 14 間桑拿場所的參考價格、地區、技師時段、過夜安排與設備，並清楚標示暫停營業狀態。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '會所比較', path: '/ranking/' },
  ],
  backHome: '返回首頁',
  heading: '澳門桑拿比較 2026 — 14 間場所怎樣選',
  intro:
    '這份名單是編輯整理的選擇建議，不是永遠不變的名次。先按預算、可用時間、所在區域及是否需要過夜縮窄範圍，會比只看星級實際。價格、技師時段與營業狀態都可能調整；表格以本站目前的會所資料顯示，暫停營業的會所仍會保留作資料參考。出發前請打開詳情頁，並再次確認當日情況。',
  topPicks: {
    heading: '按行程需要，先看這 5 間',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '想玩主題房',
        body: '比起大型走秀，更適合重視房間情境與私密節奏的客人。',
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
        label: '重視舞台氣氛',
        body: '氹仔新場，以顯眼的介紹大廳為特色；目前不設過夜。',
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
        body: '2026 年開業，位於澳門半島，設舞台燈光與主題房。',
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
      priceRange: '參考價格（MOP）',
      serviceFee: '服務費',
    },
    overnight: {
      heading: '過夜安排',
      overnight: '可否過夜',
      lounge: '大堂躺椅',
    },
    features: {
      heading: '設施與體驗',
      ktv: 'KTV',
      themeRooms: '主題房',
      show: '介紹表演',
      isNew: '較新會所',
    },
  },
  values: { yes: '有', no: '–', none: '免收', multinational: '多國籍團隊' },
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
      '对比澳门 14 家桑拿场所的参考价格、区域、技师时段、过夜安排与设施，并清楚标注暂停营业状态。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '会所对比', path: '/ranking/' },
  ],
  backHome: '返回首页',
  heading: '澳门桑拿对比 2026 — 14 家场所怎么选',
  intro:
    '这份名单是编辑整理的选择建议，并不是长期固定的名次。先按预算、可用时间、所在区域和是否需要过夜筛选，通常比只看星级更实用。价格、技师时段和营业状态都可能调整；表格以本站当前的会所数据为准，暂停营业的会所也会保留作为资料参考。出发前请打开详情页，并再次确认当天情况。',
  topPicks: {
    heading: '按行程需求，可以先看这 5 家',
    cards: [
      {
        slug: 'the-excellent-sauna',
        emoji: '🎬',
        label: '想体验主题房',
        body: '相比大型走秀，更适合看重房间场景和私密节奏的客人。',
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
        label: '看重舞台氛围',
        body: '氹仔新场，以醒目的介绍大厅为特色；目前不提供过夜。',
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
        body: '2026 年开业，位于澳门半岛，设有舞台灯光和主题房。',
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
      priceRange: '参考价格（MOP）',
      serviceFee: '服务费',
    },
    overnight: {
      heading: '过夜安排',
      overnight: '能否过夜',
      lounge: '大厅躺椅',
    },
    features: {
      heading: '设施与体验',
      ktv: 'KTV',
      themeRooms: '主题房',
      show: '介绍表演',
      isNew: '较新会所',
    },
  },
  values: { yes: '有', no: '–', none: '免收', multinational: '多国籍团队' },
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

export const rankingCopy: Partial<Record<Locale, RankingCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getRankingCopy = createPageCopy(rankingCopy);
