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
  contactEmailLabel: string;
}

const en: PrivacyCopy = {
  meta: {
    title: 'Privacy Notice | Macau Sauna Sites',
    description: 'How external messaging links work, what information an enquiry may include, and how those details are used to answer and arrange your request.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Privacy Notice', path: '/privacy/' },
  ],
  backHome: 'Back to home',
  heading: 'Privacy Notice',
  effectiveDate: 'Last updated: 2026-08-22',
  summary: 'WhatsApp, Telegram and LINE contact links open external services; the WeChat button opens an on-site QR code and account ID modal. The sections below explain these contact flows, the information an enquiry may contain and how it is used.',
  sections: [
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
        'If the contact flow or the way enquiry details are handled changes, we will revise this notice and its date. You can use the same contact channels to ask a privacy question or flag an inaccurate description of how the site works.',
      ],
    },
  ],
  contactLink: 'Ask a privacy question →',
  contactEmailLabel: 'Email: '
};

const zhTW: PrivacyCopy = {
  meta: {
    title: '隱私說明 - 澳門桑拿導航站',
    description: '說明外部通訊軟體的聯絡流程、查詢可能包含的資料，以及我們如何使用這些內容回覆和協助安排。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '隱私說明', path: '/privacy/' },
  ],
  backHome: '返回首頁',
  heading: '隱私說明',
  effectiveDate: '最近更新：2026-08-22',
  summary: 'WhatsApp、Telegram 及 LINE 的聯絡連結會開啟外部服務；WeChat 按鈕則開啟站內 QR code 與帳戶 ID 視窗。以下說明這些聯絡流程、查詢可能包含的內容，以及我們如何使用相關資料。',
  sections: [
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
        '如聯絡流程或查詢資料的處理方式有改動，我們會更新本頁及日期。您亦可透過現有聯絡方式提出私隱問題，或指出本說明與網站實際運作不符之處。',
      ],
    },
  ],
  contactLink: '提出私隱相關問題 →',
  contactEmailLabel: '電郵聯絡：'
};

const zhCN: PrivacyCopy = {
  meta: {
    title: '隐私说明 - 澳门桑拿导航站',
    description: '说明外部通讯软件的联系流程、咨询可能包含的资料，以及我们如何使用这些内容回复和协助安排。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '隐私说明', path: '/privacy/' },
  ],
  backHome: '返回首页',
  heading: '隐私说明',
  effectiveDate: '最近更新：2026-08-22',
  summary: 'WhatsApp、Telegram 和 LINE 的联系链接会打开外部服务；WeChat 按钮则打开站内二维码与账户 ID 弹窗。下面说明这些联系流程、咨询可能包含的内容，以及我们如何使用相关资料。',
  sections: [
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
        '如果联系流程或咨询资料的处理方式发生变化，我们会更新本页和日期。您也可以通过现有联系方式提出隐私问题，或指出本说明与网站实际运行不符的地方。',
      ],
    },
  ],
  contactLink: '提出隐私相关问题 →',
  contactEmailLabel: '邮件联系：'
};

const ja: PrivacyCopy = {
  meta: {
    title: 'プライバシーについて｜マカオ・サウナ・ガイド',
    description: '外部メッセージアプリでのお問い合わせの流れ、メッセージに含まれる情報、その利用目的をご案内します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: 'プライバシーについて', path: '/privacy/' },
  ],
  backHome: 'ホームに戻る',
  heading: 'プライバシーについて',
  effectiveDate: '更新日：2026-08-22',
  summary: 'WhatsApp、Telegram、LINEのリンクは外部サービスを開き、WeChatボタンはサイト内のQRコード・ID画面を表示します。ここでは、各お問い合わせ方法の流れ、メッセージに含まれる情報、その利用目的をご案内します。',
  sections: [
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
        'お問い合わせの流れや、ご相談内容の取り扱いを変更した場合は、本ページの内容と日付を更新します。プライバシーに関するご質問や、実際のサイト動作と説明が異なる点も、既存のお問い合わせ窓口からお知らせいただけます。',
      ],
    },
  ],
  contactLink: 'プライバシーについて問い合わせる →',
  contactEmailLabel: 'メール：'
};

const ko: PrivacyCopy = {
  meta: {
    title: '개인정보 안내 - 마카오 사우나 가이드',
    description: '외부 메신저를 통한 문의 절차, 문의에 포함될 수 있는 정보, 그리고 그 정보를 답변과 예약 지원에 어떻게 사용하는지 안내합니다.',
  },
  breadcrumbs: [
    { name: '홈', path: '/' },
    { name: '개인정보 안내', path: '/privacy/' },
  ],
  backHome: '홈으로 돌아가기',
  heading: '개인정보 안내',
  effectiveDate: '최근 업데이트: 2026-08-22',
  summary: 'WhatsApp, Telegram, LINE 연락 링크는 외부 서비스를 열고, WeChat 버튼은 사이트 내 QR 코드와 계정 ID 모달을 엽니다. 아래에서 이러한 연락 절차, 문의에 포함될 수 있는 내용, 그리고 저희가 해당 정보를 어떻게 사용하는지 설명합니다.',
  sections: [
    {
      heading: 'WhatsApp, WeChat, Telegram, LINE',
      paragraphs: [
        'WhatsApp과 Telegram 링크는 짧은 문의 문구가 미리 채워진 상태로 외부 서비스를 엽니다. LINE은 저희 연락처 프로필을 엽니다. WeChat 버튼은 이 사이트에서 QR 코드와 계정 ID만 표시하며, 이후 보내시는 메시지는 WeChat에서 처리됩니다.',
        'WhatsApp, WeChat, Telegram, LINE을 열거나 사용하면, 각 사업자가 자사 약관에 따라 계정, 기기, 네트워크, 메시지 정보를 처리할 수 있습니다. 이러한 플랫폼은 본 사이트의 일부가 아닙니다.',
      ],
    },
    {
      heading: '문의 내용에 포함되는 정보',
      paragraphs: [
        '메시지에는 날짜, 인원, 예산, 픽업 장소, 문의하려는 매장 등이 포함될 수 있습니다. 저희는 이 내용을 답변에 사용하며, 예약이 필요한 경우 선택하신 매장과의 조율에도 관련 부분을 사용합니다.',
        '신분증 번호, 카드 정보, 문의와 무관한 개인 정보는 보내지 마세요. 비용은 매장에서 직접 결제합니다.',
      ],
    },
    {
      heading: '변경 및 문의',
      paragraphs: [
        '연락 절차나 문의 정보의 처리 방식이 변경되면 이 페이지와 날짜를 업데이트합니다. 기존 연락 채널을 통해 개인정보 관련 질문을 하시거나, 이 안내와 실제 사이트 운영이 다른 부분을 알려주실 수도 있습니다.',
      ],
    },
  ],
  contactLink: '개인정보 관련 질문하기 →',
  contactEmailLabel: '이메일: '
};

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

export const getPrivacyCopy = createPageCopy(privacyCopy);
