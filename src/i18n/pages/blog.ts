import type { Locale } from '../config';
import { createPageCopy, type Crumb } from './helpers';

export type BlogCategory = 'beginner' | 'price' | 'compare' | 'itinerary' | 'experience' | 'news';

export interface BlogCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  backHome: string;
  heading: string;
  intro: string;
  allTopics: string;
  categories: Record<BlogCategory, string>;
  emptyFilter: string;
  post: {
    allArticles: string;
    backToAllArticles: string;
    inThisArticle: string;
    related: string;
    ctaHeading: string;
    ctaBody: string;
    placeholderNotice: string;
  };
}


const en: BlogCopy = {
  meta: {
    title: 'Macau Sauna Blog — Comparisons, Picks & Market Updates | Macau Sauna Sites',
    description:
      'Hands-on Macau sauna guides, new-venue comparisons and market updates. New to Macau? Start with our sauna guides.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
  ],
  backHome: 'Back to Home',
  heading: 'Blog',
  intro: 'Hands-on Macau sauna guides, new-venue comparisons and market updates.',
  allTopics: 'All topics',
  categories: {
    beginner: 'Beginner Guides',
    price: 'Prices & Budget',
    compare: 'Comparisons',
    itinerary: 'Itinerary & Pickup',
    experience: 'Experience & Service',
    news: 'Latest News',
  },
  emptyFilter: 'No articles in this topic yet.',
  post: {
    allArticles: 'All articles',
    backToAllArticles: 'Back to all articles',
    inThisArticle: 'In this article',
    related: 'Keep reading',
    ctaHeading: 'Ready to book?',
    ctaBody: 'Free private 7-seater shuttle across Macau & Taipa. Contact us to arrange.',
    placeholderNotice: 'Placeholder article — final copy pending.',
  },
};

const ja: BlogCopy = {
  meta: {
    title: '【2026年最新版】マカオサウナ攻略ガイド｜おすすめランキング・遊び方・最新情報｜マカオ・サウナ・ガイド',
    description:
      '実地取材によるマカオ サウナの攻略ガイド、おすすめランキングと最新情報。初めてでも安心、日本語対応・無料送迎。まずはこのガイドから。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: 'サウナ攻略', path: '/blog/' },
  ],
  backHome: 'トップページに戻る',
  heading: 'マカオ サウナ 攻略ガイド',
  intro: '実地取材したマカオ サウナの攻略ガイド、新店のおすすめランキングと最新情報をお届けします。',
  allTopics: 'すべて',
  categories: {
    beginner: '初心者ガイド',
    price: '料金と予算',
    compare: '店舗比較',
    itinerary: '行程と送迎',
    experience: '体験とサービス',
    news: '最新情報',
  },
  emptyFilter: 'このトピックの記事はまだありません。',
  post: {
    allArticles: '記事一覧',
    backToAllArticles: '記事一覧に戻る',
    inThisArticle: 'この記事の内容',
    related: 'あわせて読みたい',
    ctaHeading: 'まずはLINEで問い合わせ',
    ctaBody: '無料の専用7人乗り送迎をマカオ半島・タイパ全域で手配。日本語対応・初めてでも安心、LINEでお気軽にどうぞ。',
    placeholderNotice: '仮の記事です。',
  },
};

const zhTW: BlogCopy = {
  meta: {
    title: '澳門桑拿攻略 — 比較、推薦與市場更新 | 澳門桑拿導航站',
    description:
      '澳門桑拿實地攻略、新場比較與市場更新。第一次來澳門想找桑拿水療，先看我們的桑拿攻略。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '桑拿攻略', path: '/blog/' },
  ],
  backHome: '返回首頁',
  heading: '桑拿攻略',
  intro: '實地走訪的澳門桑拿攻略、新場比較與市場更新。',
  allTopics: '全部主題',
  categories: {
    beginner: '新手攻略',
    price: '價格與預算',
    compare: '場所比較',
    itinerary: '行程與接送',
    experience: '體驗與服務',
    news: '最新情報',
  },
  emptyFilter: '此主題目前沒有文章。',
  post: {
    allArticles: '所有文章',
    backToAllArticles: '返回所有文章',
    inThisArticle: '本文重點',
    related: '延伸閱讀',
    ctaHeading: '準備預約？',
    ctaBody: '免費私人七人座專車，澳門與氹仔皆可接送。聯絡我們安排。',
    placeholderNotice: '佔位文章。',
  },
};

const zhCN: BlogCopy = {
  meta: {
    title: '澳门桑拿攻略 — 比较、推荐与市场更新 | 澳门桑拿导航站',
    description:
      '澳门桑拿实地攻略、新场比较与市场更新。第一次来澳门想找桑拿水疗，先看我们的桑拿攻略。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '桑拿攻略', path: '/blog/' },
  ],
  backHome: '返回首页',
  heading: '桑拿攻略',
  intro: '实地走访的澳门桑拿攻略、新场比较与市场更新。',
  allTopics: '全部主题',
  categories: {
    beginner: '新手攻略',
    price: '价格与预算',
    compare: '场所比较',
    itinerary: '行程与接送',
    experience: '体验与服务',
    news: '最新情报',
  },
  emptyFilter: '此主题暂无文章。',
  post: {
    allArticles: '所有文章',
    backToAllArticles: '返回所有文章',
    inThisArticle: '本文重点',
    related: '延伸阅读',
    ctaHeading: '准备预约？',
    ctaBody: '免费私人七人座专车，澳门与氹仔皆可接送。联系我们安排。',
    placeholderNotice: '占位文章。',
  },
};

const ko: BlogCopy = {
  meta: {
    title: '마카오 사우나 블로그 — 비교, 추천, 시장 업데이트 | 마카오 사우나 사이트',
    description:
      '직접 취재한 마카오 사우나 가이드, 신규 매장 비교와 시장 업데이트. 마카오가 처음이라면 사우나 가이드부터 시작하세요.',
  },
  breadcrumbs: [
    { name: '홈', path: '/' },
    { name: '사우나 공략', path: '/blog/' },
  ],
  backHome: '홈으로 돌아가기',
  heading: '사우나 공략',
  intro: '직접 발로 뛴 마카오 사우나 공략, 신규 매장 비교와 시장 업데이트.',
  allTopics: '전체 주제',
  categories: {
    beginner: '초보 가이드',
    price: '가격과 예산',
    compare: '매장 비교',
    itinerary: '일정과 픽업',
    experience: '경험과 서비스',
    news: '최신 소식',
  },
  emptyFilter: '이 주제의 글이 아직 없습니다.',
  post: {
    allArticles: '전체 글',
    backToAllArticles: '전체 글 목록으로 돌아가기',
    inThisArticle: '이 글의 내용',
    related: '함께 읽기',
    ctaHeading: '예약할 준비가 되셨나요?',
    ctaBody: '마카오와 타이파 전역 무료 전용 7인승 차량. 문의하여 배차하세요.',
    placeholderNotice: '플레이스홀더 글 — 최종 원고 준비 중.',
  },
};

export const blogCopy: Partial<Record<Locale, BlogCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

export const getBlogCopy = createPageCopy(blogCopy);
