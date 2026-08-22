import type { Locale } from '../config';
import { createPageCopy, type Crumb } from './helpers';

export interface PrivacyCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  backHome: string;
  heading: string;
  effectiveDate: string;
  summary: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  contactLink: string;
}

const en: PrivacyCopy = {
  meta: {
    title: 'Privacy Policy | Macau Sauna Sites',
    description: 'Macau Sauna Sites privacy policy: we do not collect or store any personal information. We take your privacy and discretion seriously.',
  },
  breadcrumbs: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Privacy Policy',
      path: '/privacy/',
    },
  ],
  backHome: 'Back to home',
  heading: 'Privacy Policy',
  effectiveDate: 'Effective date: 2026-06-14',
  summary: 'Macau Sauna Sites ("we", "us") takes your privacy seriously. In short: we do not collect, store or keep any personal information. This policy explains how we treat your information.',
  sections: [
    {
      heading: 'Our approach to your data',
      paragraphs: [
        'Your conversation stays inside whichever messaging app you choose (WhatsApp, WeChat, Line, Telegram), not with us.',
        'The details you provide (such as time and party size) are used only to complete that one booking, and nothing more.',
      ],
    },
    {
      heading: 'What we never ask for',
      paragraphs: [
        'We never ask for ID numbers or credit card details. All fees are paid directly on site.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We pass only the minimum a booking needs to the venue you chose, and never sell, rent or trade any of your information.',
        'This site uses only anonymous, aggregated analytics; any update to this policy is posted here with a revised date.',
      ],
    },
  ],
  contactLink: 'Questions about your privacy? Contact us →',
};

const ja: PrivacyCopy = {
  meta: {
    title: 'プライバシーポリシー｜マカオ・サウナ・ガイド',
    description: 'マカオ・サウナ・ガイドのプライバシーポリシー。個人情報は一切収集・保存しません。お客様のプライバシーと秘密厳守を最優先します。',
  },
  breadcrumbs: [
    {
      name: 'ホーム',
      path: '/',
    },
    {
      name: 'プライバシーポリシー',
      path: '/privacy/',
    },
  ],
  backHome: 'ホームに戻る',
  heading: 'プライバシーポリシー',
  effectiveDate: '施行日: 2026-06-14',
  summary: 'マカオ・サウナ・ガイド（以下「当サイト」）は、お客様のプライバシーを最優先に考えています。要点はシンプルです。当サイトは個人情報を一切収集・保存・保持しません。本ポリシーでは、お客様の情報の取り扱い方針についてご説明します。',
  sections: [
    {
      heading: '情報の取り扱い方針',
      paragraphs: [
        'お客様とのやり取りは、ご利用のメッセージアプリ（LINE・WhatsApp・WeChat・Telegram）の中だけに残り、当サイト側には送信されません。',
        'ご提供いただいた時間や人数などの情報は、そのご予約を完了するためだけに使用し、それ以上は利用しません。',
      ],
    },
    {
      heading: '当サイトが決してお伺いしない情報',
      paragraphs: [
        '身分証番号やクレジットカード情報をお伺いすることはありません。料金はすべて現地で直接お支払いいただきます（料金透明）。',
      ],
    },
    {
      heading: '情報の共有について',
      paragraphs: [
        'ご予約に必要な最小限の情報のみを、お客様がお選びになった店舗へお伝えします。お客様の情報を販売・貸与・交換することは一切ありません。',
        '当サイトは匿名かつ集計されたアクセス解析データのみを使用します。本ポリシーを更新した場合は、本ページに掲載し施行日を改めます。',
      ],
    },
  ],
  contactLink: 'プライバシーに関するご質問はお問い合わせください →',
};

const zhTW: PrivacyCopy = {
  meta: {
    title: '隱私政策 - 澳門桑拿導航站',
    description: '澳門桑拿導航站隱私政策：我們不會收集或保存任何個人資料，非常重視您的隱私與保密。',
  },
  breadcrumbs: [
    {
      name: '首頁',
      path: '/',
    },
    {
      name: '隱私政策',
      path: '/privacy/',
    },
  ],
  backHome: '返回首頁',
  heading: '隱私政策',
  effectiveDate: '生效日期: 2026-06-14',
  summary: '澳門桑拿導航站（以下稱「我們」）非常重視您的隱私。簡而言之：我們不會收集、儲存或保留任何個人資料。本政策說明我們對待您資料的原則。',
  sections: [
    {
      heading: '我們的資料原則',
      paragraphs: [
        '您與我們的對話，留在您所選用的通訊軟體（WhatsApp、WeChat、Line、Telegram）內，不會傳到我們這邊。',
        '您提供的時間、人數等資訊，只會用於完成該次預約，用畢即止。',
      ],
    },
    {
      heading: '我們絕不會要求的資料',
      paragraphs: [
        '我們不會要求身份證件號碼或信用卡資料。所有費用一律於現場直接支付。',
      ],
    },
    {
      heading: '資料分享',
      paragraphs: [
        '我們只會將完成預約所需的最少資訊轉達給您選擇的場館，絕不出售、出租或交換您的任何資料。',
        '本網站僅使用匿名且匯總的分析資料；本政策如有更新，將於本頁公布並更新生效日期。',
      ],
    },
  ],
  contactLink: '有任何隱私疑問？聯絡我們 →',
};

const zhCN: PrivacyCopy = {
  meta: {
    title: '隐私政策 - 澳门桑拿导航站',
    description: '澳门桑拿导航站隐私政策：我们不会收集或保存任何个人资料，非常重视您的隐私与保密。',
  },
  breadcrumbs: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '隐私政策',
      path: '/privacy/',
    },
  ],
  backHome: '返回首页',
  heading: '隐私政策',
  effectiveDate: '生效日期: 2026-06-14',
  summary: '澳门桑拿导航站（以下称“我们”）非常重视您的隐私。简而言之：我们不会收集、存储或保留任何个人资料。本政策说明我们对待您资料的原则。',
  sections: [
    {
      heading: '我们的资料原则',
      paragraphs: [
        '您与我们的对话，留在您所选用的通讯软件（WhatsApp、WeChat、Line、Telegram）内，不会传到我们这边。',
        '您提供的时间、人数等信息，只会用于完成该次预约，用毕即止。',
      ],
    },
    {
      heading: '我们绝不会要求的资料',
      paragraphs: [
        '我们不会要求身份证件号码或信用卡资料。所有费用一律于现场直接支付。',
      ],
    },
    {
      heading: '资料分享',
      paragraphs: [
        '我们只会将完成预约所需的最少信息转达给您选择的场馆，绝不出售、出租或交换您的任何资料。',
        '本网站仅使用匿名且汇总的分析数据；本政策如有更新，将于本页公布并更新生效日期。',
      ],
    },
  ],
  contactLink: '有任何隐私疑问？联系我们 →',
};

export const privacyCopy: Partial<Record<Locale, PrivacyCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getPrivacyCopy = createPageCopy(privacyCopy);
