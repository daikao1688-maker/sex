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
    title: 'Privacy Notice | Macau Sauna Sites',
    description: 'How this site uses Google measurement and advertising tags, and what happens when you contact us through an external messaging app.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Privacy Notice', path: '/privacy/' },
  ],
  backHome: 'Back to home',
  heading: 'Privacy Notice',
  effectiveDate: 'Last updated: 2026-08-22',
  summary: 'This site uses Google technology for site measurement and advertising. WhatsApp, Telegram and LINE contact links open external services; the WeChat button opens an on-site WeChat QR code and account ID modal. The sections below explain these flows and the information involved.',
  sections: [
    {
      heading: 'Google measurement and advertising',
      paragraphs: [
        'On production pages we load the Google tag GT-TXHFV3C5 and Google Ads tag AW-18058018185. They can send Google information about page visits, browser or device details, referring and campaign data, and interactions used to measure site and advertising performance.',
        'Google may use cookies or similar browser technologies when those tags run. How Google processes that information is governed by Google’s own privacy terms and the controls available in your browser or Google account.',
      ],
    },
    {
      heading: 'WhatsApp, WeChat, Telegram and LINE',
      paragraphs: [
        'WhatsApp and Telegram links open the external service with a short enquiry pre-filled in the link. LINE opens our LINE contact profile. The WeChat button displays our QR code and account ID on this site; any message you then send is handled in WeChat.',
        'Once you open or use WhatsApp, WeChat, Telegram or LINE, that provider may process your account, device, network and message data under its own terms. These services are separate from this website.',
      ],
    },
    {
      heading: 'Information in an enquiry',
      paragraphs: [
        'A message may include the date, group size, budget, pickup point and venue you ask about. We use those details to answer the enquiry and, where needed, coordinate the arrangement with the selected venue.',
        'Please do not send identity-document numbers, card details or personal information that is not needed for the request. Payments are made directly at the venue.',
      ],
    },
    {
      heading: 'Changes and questions',
      paragraphs: [
        'If the site’s measurement setup or contact flow changes, we will revise this notice and its date. You can use the same contact channels to ask a privacy question or flag an inaccurate description of how the site works.',
      ],
    },
  ],
  contactLink: 'Ask a privacy question →',
};

const zhTW: PrivacyCopy = {
  meta: {
    title: '隱私說明 - 澳門桑拿導航站',
    description: '說明本站使用的 Google 成效評估與廣告標籤，以及轉到外部通訊軟體聯絡我們時會發生甚麼。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '隱私說明', path: '/privacy/' },
  ],
  backHome: '返回首頁',
  heading: '隱私說明',
  effectiveDate: '最近更新：2026-08-22',
  summary: '本站使用 Google 技術了解網站及廣告成效。WhatsApp、Telegram 及 LINE 的聯絡連結會開啟外部服務；WeChat 按鈕則開啟站內 WeChat QR code 與帳戶 ID 視窗。以下說明各個流程及當中涉及的資料。',
  sections: [
    {
      heading: 'Google 成效評估與廣告',
      paragraphs: [
        '正式上線的頁面會載入 Google tag GT-TXHFV3C5 及 Google Ads tag AW-18058018185。標籤可把瀏覽頁面、瀏覽器或裝置資料、來源與廣告活動資料，以及用作評估網站和廣告成效的互動資料傳送給 Google。',
        '標籤運作時，Google 可能使用 Cookie 或類似的瀏覽器技術。相關資料由 Google 按其私隱條款處理；您亦可使用瀏覽器或 Google 帳戶所提供的控制選項。',
      ],
    },
    {
      heading: 'WhatsApp、WeChat、Telegram 與 LINE',
      paragraphs: [
        'WhatsApp 及 Telegram 連結會打開外部服務，並在連結中預先填入一段簡短查詢文字；LINE 會開啟我們的聯絡帳戶。按下 WeChat 時，本站只顯示 QR code 與帳戶 ID，之後實際發出的訊息由 WeChat 處理。',
        '當您開啟或使用 WhatsApp、WeChat、Telegram 或 LINE，服務商可按其條款處理帳戶、裝置、網絡及訊息資料。這些平台並非本站的一部分。',
      ],
    },
    {
      heading: '查詢內容',
      paragraphs: [
        '訊息可能包括日期、人數、預算、接送地點及想查詢的場館。我們會用這些內容回覆問題；如需要安排，也會把相關部分用於與您選擇的場館協調。',
        '請勿傳送身份證件號碼、信用卡資料，或與查詢無關的個人資訊。費用在場館直接支付。',
      ],
    },
    {
      heading: '更新與提問',
      paragraphs: [
        '如網站的成效評估設定或聯絡流程有改動，我們會更新本頁及日期。您亦可透過現有聯絡方式提出私隱問題，或指出本說明與網站實際運作不符之處。',
      ],
    },
  ],
  contactLink: '提出私隱相關問題 →',
};

const zhCN: PrivacyCopy = {
  meta: {
    title: '隐私说明 - 澳门桑拿导航站',
    description: '说明本站使用的 Google 效果衡量与广告标签，以及跳转到外部通讯软件联系我们时会发生什么。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '隐私说明', path: '/privacy/' },
  ],
  backHome: '返回首页',
  heading: '隐私说明',
  effectiveDate: '最近更新：2026-08-22',
  summary: '本站使用 Google 技术了解网站和广告效果。WhatsApp、Telegram 和 LINE 的联系链接会打开外部服务；WeChat 按钮则打开站内 WeChat 二维码与账户 ID 弹窗。下面说明各个流程和其中涉及的资料。',
  sections: [
    {
      heading: 'Google 效果衡量与广告',
      paragraphs: [
        '正式上线的页面会加载 Google tag GT-TXHFV3C5 和 Google Ads tag AW-18058018185。标签可以向 Google 发送页面访问、浏览器或设备资料、来源与广告活动资料，以及用来衡量网站和广告效果的互动资料。',
        '标签运行时，Google 可能使用 Cookie 或类似的浏览器技术。相关资料由 Google 按照其隐私条款处理；您也可以使用浏览器或 Google 账户提供的控制选项。',
      ],
    },
    {
      heading: 'WhatsApp、WeChat、Telegram 与 LINE',
      paragraphs: [
        'WhatsApp 和 Telegram 链接会打开外部服务，并在链接中预先填入一段简短的咨询文字；LINE 会打开我们的联系账户。点击 WeChat 时，本站只显示二维码和账户 ID，之后实际发送的消息由 WeChat 处理。',
        '当您打开或使用 WhatsApp、WeChat、Telegram 或 LINE，服务商可以根据其条款处理账户、设备、网络和消息资料。这些平台不属于本站。',
      ],
    },
    {
      heading: '咨询内容',
      paragraphs: [
        '消息可能包括日期、人数、预算、接送地点和想咨询的场馆。我们会用这些内容回复问题；如需安排，也会将相关部分用于和您选择的场馆协调。',
        '请勿发送身份证件号码、信用卡资料，或与咨询无关的个人信息。费用在场馆直接支付。',
      ],
    },
    {
      heading: '更新与提问',
      paragraphs: [
        '如果网站的效果衡量设置或联系流程发生变化，我们会更新本页和日期。您也可以通过现有联系方式提出隐私问题，或指出本说明与网站实际运行不符的地方。',
      ],
    },
  ],
  contactLink: '提出隐私相关问题 →',
};

const ja: PrivacyCopy = {
  meta: {
    title: 'プライバシーについて｜マカオ・サウナ・ガイド',
    description: 'Googleの計測・広告タグと、外部メッセージアプリからお問い合わせいただく際の情報の流れをご案内します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: 'プライバシーについて', path: '/privacy/' },
  ],
  backHome: 'ホームに戻る',
  heading: 'プライバシーについて',
  effectiveDate: '更新日：2026-08-22',
  summary: '当サイトでは、サイトと広告の効果を確認するためにGoogleの技術を使用しています。WhatsApp、Telegram、LINEのリンクは外部サービスを開き、WeChatボタンはサイト内のWeChat QRコード・ID画面を表示します。それぞれの場面でどのような情報が扱われるかを説明します。',
  sections: [
    {
      heading: 'Googleによる計測と広告',
      paragraphs: [
        '公開中のページでは、Google tag GT-TXHFV3C5とGoogle Ads tag AW-18058018185を読み込みます。閲覧ページ、ブラウザや端末、参照元やキャンペーン、サイトと広告の効果測定に使う操作情報などがGoogleへ送信される場合があります。',
        'タグの動作時には、GoogleがCookieなどのブラウザ技術を使用する場合があります。Googleでの情報処理には同社のプライバシー規約が適用され、ブラウザやGoogleアカウントの設定から利用できる管理機能もあります。',
      ],
    },
    {
      heading: 'WhatsApp、WeChat、Telegram、LINE',
      paragraphs: [
        'WhatsAppとTelegramは、短い問い合わせ文をリンク内に入れた状態で外部サービスを開きます。LINEは当サイトの連絡先プロフィールを開きます。WeChatボタンは、このサイト上でQRコードとIDを表示するだけで、その後に送るメッセージはWeChat内で扱われます。',
        '各アプリを開いた後は、WhatsApp、WeChat、Telegram、LINEの各運営会社が、自社の規約に基づいてアカウント、端末、通信、メッセージの情報を処理する場合があります。これらは当サイトとは別のサービスです。',
      ],
    },
    {
      heading: 'お問い合わせに含まれる情報',
      paragraphs: [
        'メッセージには、希望日、人数、予算、送迎場所、検討中の店舗などが含まれることがあります。お問い合わせへの回答と、必要な場合に選択された店舗との調整を行うために使用します。',
        '身分証明書の番号、カード情報、手配に不要な個人情報は送らないでください。料金は店舗で直接お支払いいただきます。',
      ],
    },
    {
      heading: '変更とお問い合わせ',
      paragraphs: [
        '計測設定やお問い合わせの流れを変更した場合は、本ページの内容と日付を更新します。プライバシーに関するご質問や、実際のサイト動作と説明が異なる点も、既存のお問い合わせ窓口からお知らせいただけます。',
      ],
    },
  ],
  contactLink: 'プライバシーについて問い合わせる →',
};

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getPrivacyCopy = createPageCopy(privacyCopy);
