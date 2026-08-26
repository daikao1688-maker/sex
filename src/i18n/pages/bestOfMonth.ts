import type { Locale } from '../config';
import type { VenueSlug } from '../../data/venues';
import { createPageCopy } from './helpers';

/**
 * "Best sauna of the month" band under the hero: an editors' shortlist of three
 * venues on a rotating scorecard.
 *
 * The three picks and their award labels are editorial — update `cards` each
 * month. Everything factual (price band, hours, service charge) is read from
 * `src/data/venues.ts`, so it stays in step with the ranking tables.
 */
export interface BestOfMonthCopy {
  eyebrow: string;
  /** `{venue}` is the first card's venue name. */
  heading: string;
  intro: string;
  rankingLink: string;
  /** `{month}` is the current month, formatted for the locale. */
  reviewedStamp: string;
  stats: { price: string; hours: string; serviceFee: string };
  values: { open24h: string; noServiceFee: string };
  viewVenue: string;
  districts: { peninsula: string; taipa: string };
  ratingLabel: string;
  controls: {
    carousel: string;
    previous: string;
    next: string;
    /** `{index}`, `{total}`, and `{venue}` identify the requested card. */
    slide: string;
  };
  cards: Array<{ slug: VenueSlug; award: string; quote: string }>;
}

const en: BestOfMonthCopy = {
  eyebrow: 'Best Sauna of the Month',
  heading: "{venue} leads this month's shortlist",
  intro:
    'Our monthly picks reflect recent guest feedback. Tell us your budget, timing and preferences, and we can suggest the venues that suit you best.',
  rankingLink: 'See the full ranking →',
  reviewedStamp: 'Reviewed · {month}',
  stats: { price: 'Typical package', hours: 'Hours', serviceFee: 'Separate service fee' },
  values: { open24h: '24 hours', noServiceFee: 'No separate surcharge' },
  viewVenue: 'View venue →',
  districts: { peninsula: 'Peninsula', taipa: 'Taipa' },
  ratingLabel: 'Rated {rating} out of 5',
  controls: {
    carousel: 'Best sauna of the month carousel',
    previous: 'Show previous venue',
    next: 'Show next venue',
    slide: 'Show venue {index} of {total}: {venue}',
  },
  cards: [
    {
      slug: 'majesty-spa',
      award: 'Best of the Month',
      quote:
        "The Fisherman's Wharf veteran with the clearest overnight positioning in town — Southeast Asian value, extra daytime discounts and no service charge.",
    },
    {
      slug: 'manhao-spa',
      award: 'Best new opening',
      quote:
        "Taipa's May-2026 debut — the most theatrical interior in Macau, built inside the Grandview Hotel.",
    },
    {
      slug: 'number-nine-sauna',
      award: 'Best stage show',
      quote:
        'April 2026 opening in the Royal Dragon Hotel with the best stage production in the city.',
    },
  ],
};

const ja: BestOfMonthCopy = {
  eyebrow: '今月のベストサウナ',
  heading: '今月のイチオシは{venue}',
  intro:
    '今月のお客様の声をもとにおすすめ店を選んでいます。ご予算・ご希望の時間・お好みを伺い、条件に合う店舗もご案内します。',
  rankingLink: 'ランキングをすべて見る →',
  reviewedStamp: 'レビュー · {month}',
  stats: { price: '主なコース目安', hours: '営業時間', serviceFee: '別途サービス料' },
  values: { open24h: '24時間営業', noServiceFee: '別途加算なし' },
  viewVenue: '店舗を見る →',
  districts: { peninsula: 'マカオ半島', taipa: 'タイパ' },
  ratingLabel: '5段階中{rating}',
  controls: {
    carousel: '今月のベストサウナ カルーセル',
    previous: '前の店舗を表示',
    next: '次の店舗を表示',
    slide: '{total}件中{index}件目の店舗を表示：{venue}',
  },
  cards: [
    {
      slug: 'majesty-spa',
      award: '今月のベスト',
      quote:
        'フィッシャーマンズワーフの老舗。東南アジア系のコスパと明確な宿泊対応に加え、昼の追加割引とサービス料無料が魅力。',
    },
    {
      slug: 'manhao-spa',
      award: '新店ベスト',
      quote: '2026年5月、氹仔の君怡酒店にオープン。マカオでもっとも劇場的な内装が味わえます。',
    },
    {
      slug: 'number-nine-sauna',
      award: 'ショータイムがベスト',
      quote: '2026年4月、御龍酒店にオープン。市内随一の演出を誇るメインステージのショータイム。',
    },
  ],
};

const zhTW: BestOfMonthCopy = {
  eyebrow: '本月最佳桑拿',
  heading: '本月首選：{venue}',
  intro:
    '我們根據當月客戶反饋，做出推薦，我們也會根據您的預算，時間，喜好推薦適合的桑拿房！',
  rankingLink: '查看完整排名 →',
  reviewedStamp: '評測 · {month}',
  stats: { price: '常見套餐價格', hours: '營業時間', serviceFee: '另收服務費' },
  values: { open24h: '24 小時營業', noServiceFee: '不另收服務費' },
  viewVenue: '查看會所 →',
  districts: { peninsula: '澳門半島', taipa: '氹仔' },
  ratingLabel: '五星中的 {rating} 星',
  controls: {
    carousel: '本月最佳桑拿輪播',
    previous: '顯示上一間會所',
    next: '顯示下一間會所',
    slide: '顯示第 {index} 間（共 {total} 間）：{venue}',
  },
  cards: [
    {
      slug: 'majesty-spa',
      award: '本月最佳',
      quote: '漁人碼頭老牌場館，東南亞性價比與過夜定位最清楚，日場加碼優惠與免服務費同樣到位。',
    },
    {
      slug: 'manhao-spa',
      award: '最佳新場',
      quote: '2026 年 5 月進駐氹仔君怡酒店，全澳最具戲劇感的裝潢。',
    },
    {
      slug: 'number-nine-sauna',
      award: '最佳走秀',
      quote: '2026 年 4 月於御龍酒店開幕，擁有全城最出色的舞台走秀。',
    },
  ],
};

const zhCN: BestOfMonthCopy = {
  eyebrow: '本月最佳桑拿',
  heading: '本月首选：{venue}',
  intro: '我们会根据当月客户反馈给出推荐，也会结合您的预算、时间和喜好，帮您筛选合适的桑拿会所。',
  rankingLink: '查看完整排名 →',
  reviewedStamp: '评测 · {month}',
  stats: { price: '常见套餐价格', hours: '营业时间', serviceFee: '另收服务费' },
  values: { open24h: '24 小时营业', noServiceFee: '不另收服务费' },
  viewVenue: '查看会所 →',
  districts: { peninsula: '澳门半岛', taipa: '氹仔' },
  ratingLabel: '五星中的 {rating} 星',
  controls: {
    carousel: '本月最佳桑拿轮播',
    previous: '显示上一间会所',
    next: '显示下一间会所',
    slide: '显示第 {index} 间（共 {total} 间）：{venue}',
  },
  cards: [
    {
      slug: 'majesty-spa',
      award: '本月最佳',
      quote: '渔人码头老牌场馆，东南亚性价比与过夜定位最清楚，日场加码优惠与免服务费同样到位。',
    },
    {
      slug: 'manhao-spa',
      award: '最佳新场',
      quote: '2026 年 5 月进驻氹仔君怡酒店，全澳最具戏剧感的装潢。',
    },
    {
      slug: 'number-nine-sauna',
      award: '最佳走秀',
      quote: '2026 年 4 月于御龙酒店开幕，拥有全城最出色的舞台走秀。',
    },
  ],
};

const ko: BestOfMonthCopy = {
  eyebrow: '이달의 베스트 사우나',
  heading: '이달의 추천은 {venue}',
  intro:
    '이번 달 고객 피드백을 바탕으로 추천 매장을 선정합니다. 예산, 시간, 취향을 알려주시면 조건에 맞는 매장도 안내해 드립니다.',
  rankingLink: '전체 랭킹 보기 →',
  reviewedStamp: '리뷰 · {month}',
  stats: { price: '주요 패키지', hours: '영업시간', serviceFee: '별도 서비스 요금' },
  values: { open24h: '24시간 영업', noServiceFee: '별도 부과 없음' },
  viewVenue: '매장 보기 →',
  districts: { peninsula: '마카오 반도', taipa: '타이파' },
  ratingLabel: '5점 만점에 {rating}점',
  controls: {
    carousel: '이달의 베스트 사우나 캐러셀',
    previous: '이전 매장 보기',
    next: '다음 매장 보기',
    slide: '매장 {total}곳 중 {index}번째 보기: {venue}',
  },
  cards: [
    {
      slug: 'majesty-spa',
      award: '이달의 베스트',
      quote:
        '피셔맨즈 워프의 노포. 야간 휴식 포지셔닝이 마카오에서 가장 뚜렷하며, 동남아 가성비와 낮 추가 할인, 서비스 요금 무료까지 갖췄습니다.',
    },
    {
      slug: 'manhao-spa',
      award: '베스트 신규 오픈',
      quote:
        '타이파의 2026년 5월 데뷔 — 그랜드뷰 호텔 안에 지어진, 마카오에서 가장 극적인 인테리어.',
    },
    {
      slug: 'number-nine-sauna',
      award: '베스트 스테이지 쇼',
      quote:
        '로열 드래곤 호텔의 2026년 4월 오픈 매장으로, 도시 최고 수준의 무대 연출을 자랑합니다.',
    },
  ],
};

export const bestOfMonthCopy: Partial<Record<Locale, BestOfMonthCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

export const getBestOfMonthCopy = createPageCopy(bestOfMonthCopy);
