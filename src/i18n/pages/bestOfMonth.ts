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
    "Our editors' pick before you browse all thirteen partner venues — suites, stage, and value, ranked with the same scorecard.",
  rankingLink: 'See the full ranking →',
  reviewedStamp: 'Reviewed · {month}',
  stats: { price: 'Typical price', hours: 'Hours', serviceFee: 'Service charge' },
  values: { open24h: '24 hours', noServiceFee: 'None' },
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
      slug: 'empire-sauna',
      award: 'Best of the Month',
      quote:
        'The HK$80M new build that resets the bar for Macau saunas — and one of only two with no service charge.',
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
    '掲載14軒をご覧いただく前に、編集部の一押しを。内装・ショータイム・コスパを同じ基準で採点しました。',
  rankingLink: 'ランキングをすべて見る →',
  reviewedStamp: 'レビュー · {month}',
  stats: { price: '料金の目安', hours: '営業時間', serviceFee: 'サービス料' },
  values: { open24h: '24時間営業', noServiceFee: 'なし' },
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
      slug: 'empire-sauna',
      award: '今月のベスト',
      quote:
        '港幣8,000万を投じた完全新装。マカオ サウナの基準を塗り替えた一軒で、サービス料無料は全澳で2軒だけ。',
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
    '在瀏覽 14 間收錄場所之前，先看編輯精選——裝潢、走秀與性價比，以同一套評分標準排出。',
  rankingLink: '查看完整排名 →',
  reviewedStamp: '評測 · {month}',
  stats: { price: '參考價格', hours: '營業時間', serviceFee: '服務費' },
  values: { open24h: '24 小時營業', noServiceFee: '免服務費' },
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
      slug: 'empire-sauna',
      award: '本月最佳',
      quote: '斥資港幣 8,000 萬的全新會所，重新定義澳門桑拿標準，也是全澳僅兩家免服務費之一。',
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
  intro: '在浏览 14 家收录场所之前，先看编辑精选——装潢、走秀与性价比，以同一套评分标准排出。',
  rankingLink: '查看完整排名 →',
  reviewedStamp: '评测 · {month}',
  stats: { price: '参考价格', hours: '营业时间', serviceFee: '服务费' },
  values: { open24h: '24 小时营业', noServiceFee: '免服务费' },
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
      slug: 'empire-sauna',
      award: '本月最佳',
      quote: '斥资港币 8,000 万的全新会所，重新定义澳门桑拿标准，也是全澳仅两家免服务费之一。',
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

export const bestOfMonthCopy: Partial<Record<Locale, BestOfMonthCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getBestOfMonthCopy = createPageCopy(bestOfMonthCopy);
