import type { Locale } from './config';

interface VenueLicenseCopy {
  intro: string;
  /** {venue} is replaced with the page's localized venue name. */
  link: string;
  directory: string;
}

export const venueLicenseCopy: Record<Locale, VenueLicenseCopy> = {
  'zh-TW': {
    intro: '牌照資料以澳門旅遊局公示為準',
    link: '查詢 {venue} 牌照',
    directory: '澳門旅遊局持牌場所名錄',
  },
  'zh-CN': {
    intro: '牌照资料以澳门旅游局公示为准',
    link: '查询 {venue} 牌照',
    directory: '澳门旅游局持牌场所名录',
  },
  en: {
    intro: 'For licence information, refer to the Macao Government Tourism Office.',
    link: 'View licence information for {venue}',
    directory: 'MGTO licensed establishments directory',
  },
  ja: {
    intro: '営業許可情報はマカオ政府観光局の公表内容をご確認ください。',
    link: '{venue} の営業許可情報を確認',
    directory: 'マカオ政府観光局の許可施設一覧',
  },
  ko: {
    intro: '영업허가 정보는 마카오정부관광청의 공시 내용을 확인해 주세요.',
    link: '{venue} 영업허가 정보 확인',
    directory: '마카오정부관광청 허가 시설 목록',
  },
};
