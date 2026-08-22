import type { Locale } from '../config';
import { createPageCopy, type Crumb } from './helpers';

export interface ContactPageCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  eyebrow: string;
  heading: string;
  intro: string;
  backHome: string;
  channelsHeading: string;
  promises: Array<{ icon: 'clock' | 'car' | 'gift'; title: string; body: string }>;
  whatToSend: { heading: string; intro: string; items: string[] };
  discreet: { heading: string; body: string; link: string };
  faq: { heading: string; items: Array<{ question: string; answer: string }> };
  next: { heading: string; links: Array<{ label: string; path: string }> };
}

const en: ContactPageCopy = {
  meta: {
    title: 'Contact Us - Macau Sauna Sites',
    description: 'Contact Macau Sauna Sites to compare current venue options. Send your date, group size, budget and pickup point so we can check opening status, prices and transport arrangements.',
  },
  breadcrumbs: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Contact',
      path: '/contact/',
    },
  ],
  eyebrow: 'Start with the details you know',
  heading: 'Contact Us',
  intro: 'Planning a visit, comparing prices or asking about transport? Choose any contact method below and send the date, time and number of guests. We will check which venues are operating and confirm the details that apply to your plan before anything is booked.',
  backHome: 'Back to home',
  channelsHeading: 'Choose the app you normally use',
  promises: [
    {
      icon: 'clock',
      title: 'Begin with a date and time',
      body: 'Availability changes through the day. A preferred date and arrival time lets us check the relevant venue status and staff shift first.',
    },
    {
      icon: 'car',
      title: 'Add your pickup point',
      body: 'If you need transport, include your hotel, border, ferry terminal or airport and the time you expect to be ready. We will confirm whether a car can be arranged and where to meet it.',
    },
    {
      icon: 'gift',
      title: 'Confirm the current terms',
      body: 'Venue prices, hours, overnight rules and promotions can change. We will state what has been confirmed for your visit, including any separate charge that the venue tells us about.',
    },
  ],
  whatToSend: {
    heading: 'What to include in your first message',
    intro: 'A short message with the following details is enough for us to start checking:',
    items: [
      'The venue you are considering, or the kind of atmosphere you want',
      'Your preferred date and approximate arrival time',
      'How many people are going',
      'Your pickup point, if transport is needed',
      'Your budget range and any must-have requirements',
    ],
  },
  discreet: {
    heading: 'Your enquiry stays focused on the arrangement',
    body: 'We only ask for information needed to answer your enquiry and coordinate the booking or transport you request. Please avoid sending unnecessary personal details. Our Privacy Policy explains how submitted information is handled.',
    link: 'Privacy Policy →',
  },
  faq: {
    heading: 'Before you send a message',
    items: [
      {
        question: 'What happens after I message you?',
        answer: 'We first check the venue\'s current operating status and the details relevant to your request. If anything is missing, we will ask a short follow-up question before presenting the available option.',
      },
      {
        question: 'When will I know the final price?',
        answer: 'We will share the price and known inclusions after the venue confirms them for your date. Ask us to clarify any deposit, service fee or add-on before you agree to the booking.',
      },
      {
        question: 'What personal information should I send?',
        answer: 'Start with only your date, group size, budget and pickup point. We will tell you if any additional information is genuinely needed for the arrangement.',
      },
      {
        question: 'Which app should I use?',
        answer: 'Use whichever is most convenient: WhatsApp, WeChat, Line or Telegram. Keeping the conversation on one app makes later updates easier to follow.',
      },
      {
        question: 'Can I ask about a same-day visit?',
        answer: 'Yes. Include the earliest time you can leave and your current area. Same-day venue and transport availability will be checked before we confirm anything.',
      },
    ],
  },
  next: {
    heading: 'Useful before you decide',
    links: [
      {
        label: 'Compare venue rankings and price ranges',
        path: '/ranking/',
      },
      {
        label: 'First visit? Read the step-by-step guide',
        path: '/guide/',
      },
      {
        label: 'See how transport arrangements work',
        path: '/shuttle/',
      },
    ],
  },
};

const ja: ContactPageCopy = {
  meta: {
    title: 'お問い合わせ - マカオ・サウナ・ガイド',
    description: '希望日時、人数、予算、送迎希望場所をお送りください。各店の営業状況、料金、宿泊可否、送迎の手配可否を確認してご案内します。',
  },
  breadcrumbs: [
    {
      name: 'ホーム',
      path: '/',
    },
    {
      name: 'お問い合わせ',
      path: '/contact/',
    },
  ],
  eyebrow: 'わかる範囲からお知らせください',
  heading: 'マカオのサウナについて相談する',
  intro: '予約候補を比べたい、料金を確認したい、送迎について相談したいという方は、下記の連絡方法からご希望の日時と人数をお送りください。営業中の店舗と当日の条件を確認し、予約を決める前に必要な内容をご案内します。',
  backHome: 'ホームに戻る',
  channelsHeading: '普段お使いのアプリをお選びください',
  promises: [
    {
      icon: 'clock',
      title: '希望日時を最初に',
      body: '空き状況は時間帯によって変わります。希望日とおおよその到着時刻がわかれば、営業状況とスタッフの勤務時間から確認できます。',
    },
    {
      icon: 'car',
      title: '乗車場所もお知らせください',
      body: '送迎をご希望の場合は、ホテル、国境、フェリーターミナル、空港などの場所と、出発できる時刻をお知らせください。手配の可否と待ち合わせ方法を確認します。',
    },
    {
      icon: 'gift',
      title: '料金と条件を確認',
      body: '店舗の料金、営業時間、宿泊条件、キャンペーンは変更されることがあります。来店日に確認できた内容と、店舗から案内された追加費用があれば予約前にお伝えします。',
    },
  ],
  whatToSend: {
    heading: '最初のメッセージに書くこと',
    intro: '次の内容を短くまとめていただければ、確認を始められます。',
    items: [
      '気になっている店舗、または希望する雰囲気',
      '希望日とおおよその到着時刻',
      'ご利用人数',
      '送迎が必要な場合の乗車場所',
      'ご予算の目安と外せない条件',
    ],
  },
  discreet: {
    heading: '必要な情報だけをお送りください',
    body: 'お問い合わせへの回答と、ご希望の予約・送迎の調整に必要な範囲で情報をお預かりします。不要な個人情報は送らないでください。取り扱いについてはプライバシーポリシーをご確認いただけます。',
    link: 'プライバシーポリシー →',
  },
  faq: {
    heading: 'メッセージを送る前の確認',
    items: [
      {
        question: '問い合わせ後はどのように進みますか？',
        answer: 'まず店舗の営業状況と、ご希望に関係する項目を確認します。情報が足りない場合は、候補をご案内する前に必要な点だけお尋ねします。',
      },
      {
        question: '最終的な料金はいつわかりますか？',
        answer: 'ご希望日の料金と含まれる内容を店舗に確認してからお伝えします。予約を決める前に、デポジット、サービス料、追加オプションの有無もご確認ください。',
      },
      {
        question: 'どの個人情報を送ればよいですか？',
        answer: '最初は希望日時、人数、ご予算、送迎場所だけで構いません。手配に追加情報が必要な場合は、その理由とあわせてお知らせします。',
      },
      {
        question: 'どのアプリを使えばよいですか？',
        answer: 'LINE、WhatsApp、WeChat、Telegramのうち、普段使うものをお選びください。その後の変更も同じアプリで連絡すると、内容を確認しやすくなります。',
      },
      {
        question: '当日の相談もできますか？',
        answer: 'はい。出発できる最も早い時刻と現在地をお知らせください。当日の店舗と送迎の状況を確認してから、可能な選択肢をご案内します。',
      },
    ],
  },
  next: {
    heading: '決める前に役立つページ',
    links: [
      {
        label: '店舗のランキングと料金目安を比べる',
        path: '/ranking/',
      },
      {
        label: '初めての方向けの流れを確認する',
        path: '/guide/',
      },
      {
        label: '送迎の手配方法を確認する',
        path: '/shuttle/',
      },
    ],
  },
};

const zhTW: ContactPageCopy = {
  meta: {
    title: '聯絡我們 - 澳門桑拿導航站',
    description: '把日期、人數、預算與接送地點傳給澳門桑拿導航站，我們會查詢會所營業狀態、當日價格、過夜及接送安排，再讓您決定是否預約。',
  },
  breadcrumbs: [
    {
      name: '首頁',
      path: '/',
    },
    {
      name: '聯絡我們',
      path: '/contact/',
    },
  ],
  eyebrow: '先告訴我們已確定的資料',
  heading: '聯絡我們',
  intro: '想比較會所、查詢價格，或了解接送如何安排？任選下方一種通訊方式，傳來日期、時間與人數。我們會先查看哪些場所正在營業，再核實與您行程有關的細節，確認清楚後才進行預約。',
  backHome: '返回首頁',
  channelsHeading: '選擇您平常使用的通訊方式',
  promises: [
    {
      icon: 'clock',
      title: '先提供日期與時間',
      body: '場所供應與技師時段每日不同。告訴我們想前往的日期及大約到達時間，我們便可先查詢當時的營業與安排。',
    },
    {
      icon: 'car',
      title: '需要接送就附上位置',
      body: '如需接送，請提供酒店、口岸、碼頭或機場，以及預計可出發的時間。我們會查詢能否安排，並在出發前確認集合位置。',
    },
    {
      icon: 'gift',
      title: '預約前確認當日條件',
      body: '價格、營業時間、過夜規則及推廣可能調整。我們會說明本次查詢已確認的內容，如場館另有費用亦會一併列明。',
    },
  ],
  whatToSend: {
    heading: '第一則訊息可這樣寫',
    intro: '簡單附上以下資料，我們便可以開始查詢：',
    items: [
      '正在考慮的會所，或您想要的氣氛與類型',
      '想前往的日期與大約到達時間',
      '人數',
      '如需接送，請附上上車地點',
      '預算範圍及不能缺少的條件',
    ],
  },
  discreet: {
    heading: '只需提供安排所需資料',
    body: '我們只會索取回覆查詢及處理您所要求的預約、接送所需資料；不相關的個人資料毋須傳送。資料處理方式可參閱隱私政策。',
    link: '隱私政策 →',
  },
  faq: {
    heading: '傳訊前常見問題',
    items: [
      {
        question: '傳訊後會怎樣處理？',
        answer: '我們會先查詢場館的營業狀態，以及與您需求相關的時段和安排。如資料不足，會先問一兩項必要問題，再提供目前可行的選擇。',
      },
      {
        question: '何時知道實際價格？',
        answer: '待場館確認您所選日期的價格與包含內容後，我們會先說明再請您決定。訂金、服務費或加購項目如有適用，亦應在確認預約前問清楚。',
      },
      {
        question: '需要提供哪些個人資料？',
        answer: '最初只需提供日期、人數、預算及接送位置。如後續安排確實需要其他資料，我們會先解釋用途再請您補充。',
      },
      {
        question: '應該使用哪個通訊軟體？',
        answer: 'WhatsApp、WeChat、Line 或 Telegram 都可以，選擇您最常用的一個即可。之後如要更改行程，沿用同一個對話會較容易跟進。',
      },
      {
        question: '臨時即日出發也可以查詢嗎？',
        answer: '可以。請告訴我們您最早可出發的時間及目前所在區域，我們會先核實當日場所與車輛情況，再回覆可行選項。',
      },
    ],
  },
  next: {
    heading: '決定前可先參考',
    links: [
      {
        label: '比較會所排名與價格範圍',
        path: '/ranking/',
      },
      {
        label: '第一次來？先看完整流程',
        path: '/guide/',
      },
      {
        label: '了解接送如何安排',
        path: '/shuttle/',
      },
    ],
  },
};

const zhCN: ContactPageCopy = {
  meta: {
    title: '联系我们 - 澳门桑拿导航站',
    description: '把日期、人数、预算和接送地点发给澳门桑拿导航站，我们会查询会所营业状态、当日价格、过夜与接送安排，再由您决定是否预约。',
  },
  breadcrumbs: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '联系我们',
      path: '/contact/',
    },
  ],
  eyebrow: '先告诉我们已经确定的信息',
  heading: '联系我们',
  intro: '想比较会所、查询价格，或了解接送怎样安排？从下方选择一种联系方式，把日期、时间和人数发给我们。我们会先查看哪些场所正在营业，再确认与您行程有关的细节，说明清楚后才进行预约。',
  backHome: '返回首页',
  channelsHeading: '选择您平时使用的联系方式',
  promises: [
    {
      icon: 'clock',
      title: '先提供日期与时间',
      body: '场所供应和技师时段每天不同。告诉我们计划前往的日期和大概到达时间，我们就能先查询当时的营业与安排。',
    },
    {
      icon: 'car',
      title: '需要接送就附上位置',
      body: '如需接送，请提供酒店、口岸、码头或机场，以及预计可以出发的时间。我们会查询能否安排，并在出发前确认集合地点。',
    },
    {
      icon: 'gift',
      title: '预约前确认当日条件',
      body: '价格、营业时间、过夜规则和活动都可能调整。我们会说明本次查询已经确认的内容，如场馆另有费用也会一并列出。',
    },
  ],
  whatToSend: {
    heading: '第一条消息可以这样写',
    intro: '简单附上以下信息，我们就可以开始查询：',
    items: [
      '正在考虑的会所，或您想要的氛围和类型',
      '计划前往的日期和大概到达时间',
      '人数',
      '如需接送，请附上上车地点',
      '预算范围和不能缺少的条件',
    ],
  },
  discreet: {
    heading: '只需提供安排所需的信息',
    body: '我们只会索取回复查询以及处理您所要求的预约、接送所需的信息；无关的个人资料不必发送。具体处理方式可查看隐私政策。',
    link: '隐私政策 →',
  },
  faq: {
    heading: '发消息前的常见问题',
    items: [
      {
        question: '发消息后会怎样处理？',
        answer: '我们会先查询场馆的营业状态，以及与您需求有关的时段和安排。如果信息不足，会先问一两项必要问题，再提供目前可行的选择。',
      },
      {
        question: '什么时候知道实际价格？',
        answer: '等场馆确认您所选日期的价格和包含内容后，我们会先说明，再由您决定。订金、服务费或加购项目如有适用，也应在确认预约前问清楚。',
      },
      {
        question: '需要提供哪些个人信息？',
        answer: '最初只需提供日期、人数、预算和接送地点。如果后续安排确实需要其他信息，我们会先说明用途再请您补充。',
      },
      {
        question: '应该使用哪个通讯软件？',
        answer: 'WhatsApp、WeChat、Line 或 Telegram 都可以，选择您最常用的一个即可。之后如需变更行程，继续使用同一段对话会更方便跟进。',
      },
      {
        question: '临时当天出发也能查询吗？',
        answer: '可以。请告诉我们您最早能出发的时间和目前所在区域，我们会先确认当天的场所与车辆情况，再回复可行选项。',
      },
    ],
  },
  next: {
    heading: '决定前可以先参考',
    links: [
      {
        label: '比较会所排名与价格范围',
        path: '/ranking/',
      },
      {
        label: '第一次来？先看完整流程',
        path: '/guide/',
      },
      {
        label: '了解接送怎样安排',
        path: '/shuttle/',
      },
    ],
  },
};

export const contactPageCopy: Partial<Record<Locale, ContactPageCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getContactPageCopy = createPageCopy(contactPageCopy);
