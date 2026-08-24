import type { Locale } from '../config';
import { createPageCopy, type Crumb } from './helpers';

export interface AboutCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  /** `{brand}` is rendered in gold inside the intro paragraph. */
  intro: string;
  brand: string;
  backHome: string;
  services: {
    heading: string;
    cards: Array<{
      icon: 'message-circle' | 'car' | 'gift' | 'sparkles';
      title: string;
      body: string;
      link?: { label: string; path: string };
    }>;
  };
  trust: {
    heading: string;
    stats: Array<{ icon: 'users' | 'clock' | 'shield' | 'sparkles'; value: string; label: string }>;
    note: string;
  };
  why: { heading: string; paragraphs: string[]; kicker: string };
  cta: { headingLead: string; headingAccent: string; body: string };
}

const en: AboutCopy = {
  meta: {
    title: 'About Us - Macau Sauna Sites',
    description: 'Learn how Macau Sauna Sites organises information on 14 venue profiles, keeps changing details in view, and helps visitors compare their options before booking.',
  },
  breadcrumbs: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about/',
    },
  ],
  eyebrow: 'About',
  headingLead: 'A Clearer Way to',
  headingAccent: 'Navigate Macau Saunas',
  intro: '{brand} brings 14 venue profiles into one practical guide. We organise opening status, price ranges, locations, overnight arrangements and venue features, then reconfirm details that may change before a booking. The aim is simple: help you compare the options without having to piece everything together yourself.',
  brand: 'Macau Sauna Sites',
  backHome: 'Back to Home',
  services: {
    heading: 'How we help you make a choice',
    cards: [
      {
        icon: 'message-circle',
        title: 'Put the Details in One Place',
        body: 'Each profile brings together the venue\'s location, price range, opening status, overnight options and main features. You can compare the practical differences before deciding where to spend your time.',
      },
      {
        icon: 'car',
        title: 'Plan the Journey',
        body: 'If you need transport, tell us your pickup point, preferred time and destination. We will check whether a car can be arranged and confirm the pickup details with you before you set off.',
        link: {
          label: 'How the shuttle arrangement works →',
          path: '/shuttle/',
        },
      },
      {
        icon: 'gift',
        title: 'Check the Current Terms',
        body: 'Prices, opening hours, staff shifts, overnight arrangements and promotions can change. We check the points relevant to your visit and explain what is included before you confirm.',
      },
      {
        icon: 'sparkles',
        title: 'Keep the Conversation Simple',
        body: 'Your shortlist, venue questions and transport details stay in the same conversation. If plans change, send an update and we will explain the available next step as clearly as possible.',
      },
    ],
  },
  trust: {
    heading: 'What this guide is built around',
    stats: [
      {
        icon: 'users',
        value: '14',
        label: 'Venue profiles listed',
      },
      {
        icon: 'clock',
        value: '5',
        label: 'Language versions',
      },
      {
        icon: 'shield',
        value: 'Before you go',
        label: 'Changing details reconfirmed',
      },
      {
        icon: 'sparkles',
        value: 'One chat',
        label: 'Shortlist and logistics together',
      },
    ],
    note: 'The directory contains 14 venue profiles, including venues that may be temporarily closed. Opening status, prices, hours, staff availability, overnight arrangements and transport can change, so the latest details should always be reconfirmed before a visit.',
  },
  why: {
    heading: 'Why we built the site',
    paragraphs: [
      'Useful information about Macau saunas is often scattered across venue pages, old posts and private messages. Opening status and prices can change, while two venues that look similar in photos may suit very different plans.',
      'We built Macau Sauna Sites to make those differences easier to understand. The guide gives you a place to compare first; if you want help afterwards, tell us your date, area, budget and priorities, and we will narrow the list and check the details that matter to you.',
    ],
    kicker: 'Clear information first. A recommendation only after we understand what you need.',
  },
  cta: {
    headingLead: 'Need help choosing',
    headingAccent: 'a venue?',
    body: 'Send your date, preferred area, budget and any must-haves. We will help you compare the current options.',
  },
};

const ja: AboutCopy = {
  meta: {
    title: '私たちについて - マカオ・サウナ・ガイド',
    description: 'マカオのサウナ14店舗について、営業状況、料金の目安、場所、宿泊可否などを整理し、来店前の比較と確認をお手伝いするサイトです。',
  },
  breadcrumbs: [
    {
      name: 'ホーム',
      path: '/',
    },
    {
      name: '私たちについて',
      path: '/about/',
    },
  ],
  eyebrow: '私たちについて',
  headingLead: 'マカオのサウナ選びを',
  headingAccent: 'わかりやすく',
  intro: '{brand} は、マカオのサウナ14店舗について、営業状況、料金の目安、場所、宿泊可否、各店の特徴を一か所にまとめた案内サイトです。予約前には、変更されやすい情報をあらためて確認します。初めての方でも、必要な情報を探し回らずに比較できることを目指しています。',
  brand: 'マカオ・サウナ・ガイド',
  backHome: 'ホームに戻る',
  services: {
    heading: 'お店選びをお手伝いする方法',
    cards: [
      {
        icon: 'message-circle',
        title: '比較しやすく整理',
        body: '各店舗の場所、料金の目安、営業状況、宿泊可否、主な特徴を同じ形式で掲載しています。候補ごとの違いを見比べてから、行き先を考えられます。',
      },
      {
        icon: 'car',
        title: '移動方法も一緒に確認',
        body: '送迎をご希望の場合は、乗車場所、希望時刻、行き先をお知らせください。手配の可否を確認し、出発前に待ち合わせ方法をご案内します。',
        link: {
          label: '送迎の手配方法を見る →',
          path: '/shuttle/',
        },
      },
      {
        icon: 'gift',
        title: '当日の条件を確認',
        body: '料金、営業時間、スタッフの勤務時間、宿泊、キャンペーン内容は変わることがあります。ご希望に関係する項目を確認し、予約を決める前にお伝えします。',
      },
      {
        icon: 'sparkles',
        title: '相談を一つのチャットに',
        body: '候補の比較、店舗への質問、送迎の相談を同じチャットで進められます。予定が変わった場合も、最新の状況を確認しながら次の方法をご案内します。',
      },
    ],
  },
  trust: {
    heading: 'このガイドが大切にしていること',
    stats: [
      {
        icon: 'users',
        value: '14',
        label: '掲載している店舗',
      },
      {
        icon: 'clock',
        value: '5',
        label: '対応する言語ページ',
      },
      {
        icon: 'shield',
        value: '来店前',
        label: '変わりやすい情報を再確認',
      },
      {
        icon: 'sparkles',
        value: '1つの相談',
        label: '候補と移動をまとめて整理',
      },
    ],
    note: '当サイトには、営業中の店舗だけでなく、一時休業中の店舗を含む14件の情報を掲載しています。営業状況、料金、営業時間、スタッフの勤務状況、宿泊、送迎は変更される場合があるため、来店前に最新情報をご確認ください。',
  },
  why: {
    heading: 'このサイトを作った理由',
    paragraphs: [
      'マカオのサウナ情報は、店舗ページや古い記事、個別のメッセージに分かれていることが多く、初めての方には比較しにくいのが実情です。写真が似ていても、場所、営業時間、予算、宿泊のしやすさは店ごとに異なります。',
      'そこで、まず自分で比べられる案内サイトとしてマカオ・サウナ・ガイドを作りました。さらに相談したい場合は、日程、滞在エリア、ご予算、重視する点をお知らせください。候補を絞り、必要な最新情報を確認します。',
    ],
    kicker: 'まずは、判断できる情報をわかりやすく。おすすめは、ご希望を伺ってからお伝えします。',
  },
  cta: {
    headingLead: 'お店選びに',
    headingAccent: '迷っていますか？',
    body: '日程、滞在エリア、ご予算、希望条件をお送りください。現在選べる候補を一緒に整理します。',
  },
};

const zhTW: AboutCopy = {
  meta: {
    title: '關於我們 - 澳門桑拿導航站',
    description: '了解澳門桑拿導航站如何整理 14 間場所資料、標示營業狀態，並在預約前協助核實價格、時段、過夜及接送安排。',
  },
  breadcrumbs: [
    {
      name: '首頁',
      path: '/',
    },
    {
      name: '關於我們',
      path: '/about/',
    },
  ],
  eyebrow: '關於我們',
  headingLead: '把澳門桑拿資訊',
  headingAccent: '整理得更清楚',
  intro: '{brand} 收錄 14 間場所，將營業狀態、價格範圍、所在區域、過夜安排與場所特色放在同一個網站，方便您逐間比較。預約前，我們亦會就容易變動的資料再次核實，讓第一次接觸澳門桑拿的人也能先看懂、再決定。',
  brand: '澳門桑拿導航站',
  backHome: '返回首頁',
  services: {
    heading: '我們如何協助您做選擇',
    cards: [
      {
        icon: 'message-circle',
        title: '集中整理資料',
        body: '每個會所頁面都以相同方式整理位置、價格範圍、營業狀態、過夜選項與主要特色。您可以先看清楚實際差異，再決定哪些值得深入了解。',
      },
      {
        icon: 'car',
        title: '一併了解接送',
        body: '如需接送，請告訴我們上車位置、預計時間及目的地。我們會先查詢能否安排，再於出發前與您確認集合方式及行程。',
        link: {
          label: '查看接送安排方式 →',
          path: '/shuttle/',
        },
      },
      {
        icon: 'gift',
        title: '出發前核實細節',
        body: '價格、營業時間、技師時段、過夜及推廣內容都可能調整。我們會按您的行程查詢相關項目，確認後再把費用與包含內容說明清楚。',
      },
      {
        icon: 'sparkles',
        title: '同一對話跟進',
        body: '會所比較、預約問題與接送資料都留在同一個對話。如行程有變，只要補充最新情況，我們會按當時可行的選項說明下一步。',
      },
    ],
  },
  trust: {
    heading: '這份指南重視的事',
    stats: [
      {
        icon: 'users',
        value: '14',
        label: '收錄會所資料',
      },
      {
        icon: 'clock',
        value: '5',
        label: '語言版本',
      },
      {
        icon: 'shield',
        value: '出發前',
        label: '再核實變動資料',
      },
      {
        icon: 'sparkles',
        value: '一個對話',
        label: '整理選擇與行程',
      },
    ],
    note: '網站收錄 14 間場所，當中亦包括目前暫停營業的場所。營業狀態、價格、時段、技師安排、過夜及接送均可能變動，請在出發前以最新確認為準。',
  },
  why: {
    heading: '為何建立這個網站',
    paragraphs: [
      '澳門桑拿的資料往往散落在不同網站、舊文章與私人對話裡。營業狀態和價格會調整，看起來相似的會所，在位置、時段、預算與過夜安排上亦可能相差很遠，第一次來尤其難以判斷。',
      '因此我們建立澳門桑拿導航站，先把可比較的資料整理好，讓您自行了解各間會所。若仍想有人協助，只要告訴我們日期、住宿區域、預算及在意的條件，我們便可縮小範圍，再核實與行程相關的最新資料。',
    ],
    kicker: '先把資訊說清楚；了解您的需要後，才給出合適建議。',
  },
  cta: {
    headingLead: '還未選好',
    headingAccent: '哪一間會所？',
    body: '把日期、住宿區域、預算與偏好傳給我們，我們陪您比較目前可選的場所。',
  },
};

const zhCN: AboutCopy = {
  meta: {
    title: '关于我们 - 澳门桑拿导航站',
    description: '了解澳门桑拿导航站如何整理 14 家场所的信息和营业状态，并在预约前协助确认价格、时段、过夜及接送安排。',
  },
  breadcrumbs: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '关于我们',
      path: '/about/',
    },
  ],
  eyebrow: '关于我们',
  headingLead: '把澳门桑拿信息',
  headingAccent: '整理得更清楚',
  intro: '{brand} 收录了 14 家场所，把营业状态、价格范围、所在区域、过夜安排和场所特点集中到同一个网站，方便逐项比较。预约前，我们也会重新确认容易变化的信息，让第一次了解澳门桑拿的人可以先看明白，再做决定。',
  brand: '澳门桑拿导航站',
  backHome: '返回首页',
  services: {
    heading: '我们怎样帮您做选择',
    cards: [
      {
        icon: 'message-circle',
        title: '集中整理信息',
        body: '每个会所页面都按相同方式整理位置、价格范围、营业状态、过夜选项和主要特点。您可以先看清实际差别，再决定哪些值得进一步了解。',
      },
      {
        icon: 'car',
        title: '一起确认出行',
        body: '如果需要接送，请告诉我们上车地点、预计时间和目的地。我们会先查询是否可以安排，并在出发前与您确认集合方式和行程。',
        link: {
          label: '查看接送安排方式 →',
          path: '/shuttle/',
        },
      },
      {
        icon: 'gift',
        title: '出发前确认细节',
        body: '价格、营业时间、技师时段、过夜和活动内容都可能调整。我们会根据您的行程查询相关项目，确认后再把费用和包含内容说明白。',
      },
      {
        icon: 'sparkles',
        title: '在同一段对话中跟进',
        body: '会所比较、预约问题和接送信息都保留在同一段对话里。如果行程有变化，只要补充最新情况，我们会按当时可行的选项说明下一步。',
      },
    ],
  },
  trust: {
    heading: '这份指南重视什么',
    stats: [
      {
        icon: 'users',
        value: '14',
        label: '收录会所信息',
      },
      {
        icon: 'clock',
        value: '5',
        label: '语言版本',
      },
      {
        icon: 'shield',
        value: '出发前',
        label: '重新确认变动信息',
      },
      {
        icon: 'sparkles',
        value: '一段对话',
        label: '整理选择与行程',
      },
    ],
    note: '网站收录 14 家场所，其中也包括目前暂停营业的场所。营业状态、价格、时段、技师安排、过夜和接送都可能变化，请以出发前的最新确认为准。',
  },
  why: {
    heading: '为什么建立这个网站',
    paragraphs: [
      '澳门桑拿的信息常常分散在不同网站、旧文章和私人聊天中。营业状态与价格会调整，看上去相似的会所，在位置、时段、预算和过夜安排上也可能相差很大，第一次来尤其不容易判断。',
      '因此我们建立澳门桑拿导航站，先把方便比较的信息整理出来，让您可以自己了解每家会所。如果还想有人协助，只要告诉我们日期、住宿区域、预算和在意的条件，我们就能缩小范围，再确认与行程有关的最新信息。',
    ],
    kicker: '先把信息讲清楚；了解您的需求以后，再给出合适建议。',
  },
  cta: {
    headingLead: '还没有选好',
    headingAccent: '哪家会所？',
    body: '把日期、住宿区域、预算和偏好发给我们，我们陪您比较目前可选的场所。',
  },
};

const ko: AboutCopy = {
  meta: {
    title: '소개 - 마카오 사우나 가이드',
    description: '마카오 사우나 가이드가 14개 매장의 정보와 영업 상태를 어떻게 정리하는지, 그리고 예약 전 가격, 시간, 숙박, 픽업 배차를 어떻게 확인해 드리는지 알아보세요.',
  },
  breadcrumbs: [
    {
      name: '홈',
      path: '/',
    },
    {
      name: '소개',
      path: '/about/',
    },
  ],
  eyebrow: '소개',
  headingLead: '마카오 사우나 정보를',
  headingAccent: '더 알기 쉽게 정리합니다',
  intro: '{brand}은(는) 14개 매장을 수록하며, 영업 상태, 가격 범위, 소재 지역, 숙박 배치, 매장 특징을 한 사이트에 모아 항목별로 비교할 수 있게 합니다. 예약 전에는 변동되기 쉬운 정보를 다시 확인해, 마카오 사우나를 처음 알아보는 분도 먼저 이해하고 결정할 수 있도록 돕습니다.',
  brand: '마카오 사우나 가이드',
  backHome: '홈으로 돌아가기',
  services: {
    heading: '선택을 돕는 방식',
    cards: [
      {
        icon: 'message-circle',
        title: '정보를 한곳에 정리',
        body: '모든 매장 페이지는 위치, 가격 범위, 영업 상태, 숙박 옵션, 주요 특징을 같은 방식으로 정리합니다. 실제 차이를 먼저 파악한 뒤, 어떤 매장을 더 알아볼지 결정할 수 있습니다.',
      },
      {
        icon: 'car',
        title: '이동 수단 함께 확인',
        body: '픽업이 필요하면 탑승 지점, 예정 시간, 목적지를 알려주세요. 배차 가능 여부를 먼저 확인한 뒤, 출발 전 집결 방식과 일정을 확정해 드립니다.',
        link: {
          label: '픽업 배차 방식 보기 →',
          path: '/shuttle/',
        },
      },
      {
        icon: 'gift',
        title: '출발 전 세부 사항 확인',
        body: '가격, 영업시간, 테라피스트 시간대, 숙박, 행사 내용은 모두 조정될 수 있습니다. 일정에 맞춰 관련 항목을 확인한 뒤, 비용과 포함 내용을 명확히 안내해 드립니다.',
      },
      {
        icon: 'sparkles',
        title: '한 대화에서 이어서 진행',
        body: '매장 비교, 예약 문의, 픽업 정보를 같은 대화에 보관합니다. 일정이 바뀌면 최신 상황만 알려주세요. 그 시점에 가능한 선택지를 기준으로 다음 단계를 안내합니다.',
      },
    ],
  },
  trust: {
    heading: '이 가이드가 중시하는 것',
    stats: [
      {
        icon: 'users',
        value: '14',
        label: '수록 매장 정보',
      },
      {
        icon: 'clock',
        value: '5',
        label: '언어 버전',
      },
      {
        icon: 'shield',
        value: '출발 전',
        label: '변동 정보 재확인',
      },
      {
        icon: 'sparkles',
        value: '한 번의 대화',
        label: '선택과 일정 정리',
      },
    ],
    note: '사이트에는 현재 일시 휴업 중인 매장을 포함해 14개 매장이 수록되어 있습니다. 영업 상태, 가격, 시간대, 테라피스트 배치, 숙박, 픽업은 모두 변동될 수 있으니 출발 전 최신 확인을 기준으로 하세요.',
  },
  why: {
    heading: '이 사이트를 만든 이유',
    paragraphs: [
      '마카오 사우나 정보는 여러 웹사이트, 오래된 글, 개인 대화에 흩어져 있는 경우가 많습니다. 영업 상태와 가격은 조정되고, 비슷해 보이는 매장도 위치, 시간대, 예산, 숙박 배치에서 크게 다를 수 있어 처음 오는 분은 특히 판단하기 어렵습니다.',
      '그래서 마카오 사우나 가이드를 만들어 비교 가능한 정보를 먼저 정리했습니다. 각 매장을 직접 살펴 보실 수 있고, 도움이 필요하시면 날짜, 숙박 지역, 예산, 중요하게 생각하는 조건을 알려주세요. 범위를 좁힌 뒤 일정과 관련된 최신 정보를 확인해 드립니다.',
    ],
    kicker: '먼저 정보를 명확히 전하고, 필요를 파악한 뒤에야 적합한 제안을 드립니다.',
  },
  cta: {
    headingLead: '아직 고르지 못한',
    headingAccent: '매장이 있으신가요?',
    body: '날짜, 숙박 지역, 예산, 취향을 복내주시면 현재 이용 가능한 매장을 함께 비교해 드립니다.',
  },
};

export const aboutCopy: Partial<Record<Locale, AboutCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

export const getAboutCopy = createPageCopy(aboutCopy);
