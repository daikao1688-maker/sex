import type { Locale } from '../config';
import { createPageCopy, type Crumb } from './helpers';

export interface ShuttleCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  eyebrow: string;
  heading: string;
  intro: string;
  backHome: string;
  coverage: { heading: string; body: string; areas: string[] };
  pickupPoints: { heading: string; items: string[] };
  howItWorks: { heading: string; steps: string[] };
  included: { heading: string; items: string[]; tip: string };
  cta: { heading: string; body: string };
  next: { heading: string; links: Array<{ label: string; path: string }> };
  schema: { name: string; description: string; serviceType: string };
}

const en: ShuttleCopy = {
  meta: {
    title: 'Macau Sauna Shuttle - Macau Sauna Sites',
    description: 'Request a shuttle for a confirmed sauna booking by sending your pickup point, date, time, party size and luggage details. Routes, vehicle availability and return trips are confirmed case by case.',
  },
  breadcrumbs: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Shuttle Planning',
      path: '/shuttle/',
    },
  ],
  eyebrow: 'Route checked · confirmation required',
  heading: 'Plan Your Macau Sauna Pickup',
  intro: 'To request a pickup, send your exact pickup point, date, preferred time, number of passengers and luggage details. We check the venue, route and available vehicle before replying with a meeting point and pickup window. The ride is arranged only after you receive and accept our confirmation. Return coverage is checked separately against the route and time.',
  backHome: 'Back to home',
  coverage: {
    heading: 'Coverage is confirmed for each route',
    body: 'Macau Peninsula and Taipa or Cotai are common service areas. Hotels, border facilities, ferry terminals and the airport may use designated meeting points, and every request remains subject to access, traffic and vehicle scheduling.',
    areas: [
      'Macau Peninsula · route confirmation required',
      'Taipa & Cotai · route confirmation required',
    ],
  },
  pickupPoints: {
    heading: 'Common pickup references',
    items: [
      'Border Gate, Qingmao or Hengqin meeting areas',
      'HZMB port designated pickup area',
      'Taipa or Outer Harbour ferry terminal meeting areas',
      'Macau International Airport meeting area',
      'Hotel lobby or an agreed nearby pickup point',
      'Cotai resort pickup zones',
    ],
  },
  howItWorks: {
    heading: 'How it works',
    steps: [
      'Send the pickup point, date, preferred time, party size and luggage details, plus your venue if already chosen.',
      'We check the route and vehicle schedule, then send a proposed meeting point and pickup window. The arrangement is complete only after confirmation.',
      'For a return trip, share the destination and preferred time early. We confirm it separately according to the route and available schedule.',
    ],
  },
  included: {
    heading: 'What a confirmed arrangement covers',
    items: [
      'Pickup from the agreed meeting point to the booked venue',
      'Return planning when the route and time are confirmed',
      'A vehicle selected for the declared party size and luggage',
      'Clear updates if traffic or scheduling changes the plan',
    ],
    tip: 'Return tip: send your likely finish time and destination as early as possible. A request is not a confirmed ride until we reply with the return details.',
  },
  cta: {
    heading: 'Ready to check a route?',
    body: 'Send your pickup point, date, time, party size and luggage details. We will check the booking and transport plan, then confirm what can be arranged.',
  },
  next: {
    heading: 'Not sure which sauna yet?',
    links: [
      {
        label: 'Macau sauna ranking & prices',
        path: '/ranking/',
      },
      {
        label: 'First time? Read the guide',
        path: '/guide/',
      },
    ],
  },
  schema: {
    name: 'Macau Sauna Shuttle Coordination',
    description: 'Shuttle coordination for confirmed sauna bookings. Pickup point, date, time, party size and luggage are checked against route and vehicle availability before confirmation.',
    serviceType: 'Sauna booking shuttle coordination',
  },
};

const ja: ShuttleCopy = {
  meta: {
    title: 'マカオ サウナ送迎 - マカオ・サウナ・ガイド',
    description: 'サウナ予約に合わせた送迎をご希望の方は、乗車場所・日付・希望時刻・人数・荷物をお知らせください。ルートと車両状況を確認し、確定連絡後に手配完了となります。',
  },
  breadcrumbs: [
    {
      name: 'ホーム',
      path: '/',
    },
    {
      name: '送迎のご相談',
      path: '/shuttle/',
    },
  ],
  eyebrow: 'ルート確認制・確定連絡で手配完了',
  heading: 'マカオ サウナ送迎のご相談',
  intro: '送迎をご希望の場合は、正確な乗車場所、日付、希望時刻、人数、荷物の量をお知らせください。店舗の予約状況とルート、手配可能な車両を確認したうえで、待ち合わせ場所と時間帯をご案内します。こちらから確定内容をお送りし、ご同意いただいた時点で手配完了です。復路も行き先と時間帯に応じて別途確認します。',
  backHome: 'トップページに戻る',
  coverage: {
    heading: '対応範囲はルートと時間帯ごとに確認',
    body: 'マカオ半島、タイパ、コタイは主なご相談エリアです。ホテル、各口岸、フェリーターミナル、空港では指定の乗車場所をご案内する場合があり、道路状況や車両スケジュールを確認してから回答します。',
    areas: [
      'マカオ半島・ルート確認制',
      'タイパ／コタイ・ルート確認制',
    ],
  },
  pickupPoints: {
    heading: 'よくある乗車場所の目安',
    items: [
      '関閘・青茂・横琴口岸周辺の指定場所',
      '港珠澳大橋口岸の指定乗車エリア',
      'タイパ／外港フェリーターミナルの乗車エリア',
      'マカオ国際空港の待ち合わせ場所',
      'ホテルロビーまたは近隣の指定場所',
      '新口岸・皇朝区・コタイの乗車ゾーン',
    ],
  },
  howItWorks: {
    heading: 'ご利用の流れ',
    steps: [
      '乗車場所、日付、希望時刻、人数、荷物をお送りください。店舗が決まっている場合は店名も添えてください。',
      'ルートと配車状況を確認し、待ち合わせ場所とお迎え時間帯をご提案します。確定の返信を受け取ってから手配完了となります。',
      '復路をご希望の場合は、行き先と希望時刻を早めにご連絡ください。往路とは別に、ルートと空き状況を確認してご案内します。',
    ],
  },
  included: {
    heading: '確定後の送迎内容',
    items: [
      '合意した乗車場所から予約店舗までの移動',
      'ルートと時刻を確認できた場合の復路調整',
      '申告いただいた人数と荷物に合わせた車両確認',
      '交通や配車状況に変更が出た場合のご連絡',
    ],
    tip: '復路のポイント：終了予定と行き先は早めにお知らせください。復路の待ち合わせ内容をこちらから確定するまでは、配車完了ではありません。',
  },
  cta: {
    heading: '送迎ルートを確認しますか？',
    body: '乗車場所、日付、希望時刻、人数、荷物をお送りください。サウナ予約とあわせて、対応できる送迎内容をご案内します。',
  },
  next: {
    heading: 'まだ店舗を選んでいませんか？',
    links: [
      {
        label: 'マカオ サウナ おすすめランキングと料金',
        path: '/ranking/',
      },
      {
        label: '初めての方へ｜遊び方ガイド',
        path: '/guide/',
      },
    ],
  },
  schema: {
    name: 'マカオ サウナ送迎のご相談',
    description: 'サウナ予約に合わせた送迎調整。乗車場所、日付、希望時刻、人数、荷物を確認し、ルートと車両状況に応じて確定内容をご案内します。',
    serviceType: 'Sauna booking shuttle coordination',
  },
};

const zhTW: ShuttleCopy = {
  meta: {
    title: '澳門桑拿接送 - 澳門桑拿導航站',
    description: '需要配合桑拿預約安排接送，請提供上車點、日期、時間、人數及行李資料。我們會核對路線與車輛狀況，收到確認後才算安排完成。',
  },
  breadcrumbs: [
    {
      name: '首頁',
      path: '/',
    },
    {
      name: '接送安排',
      path: '/shuttle/',
    },
  ],
  eyebrow: '先核對路線・收到確認才算完成',
  heading: '澳門桑拿接送安排',
  intro: '如需接送，請一次提供清楚的上車點、日期、希望時間、人數及行李數量；已選好會所也請一併告知。我們會先核對預約、行車路線及可用車輛，再回覆集合位置與接送時段。您收到並確認資料後，安排才正式完成。回程亦需按目的地、路線與時段另外確認。',
  backHome: '返回首頁',
  coverage: {
    heading: '接送範圍按路線與時段確認',
    body: '澳門半島、氹仔與路氹是常見查詢範圍。酒店、口岸、碼頭及機場可能需要在指定區域上車，實際能否安排會視乎道路、停車限制及當時車輛調度。',
    areas: [
      '澳門半島・需確認路線',
      '氹仔與路氹・需確認路線',
    ],
  },
  pickupPoints: {
    heading: '常見上車點參考',
    items: [
      '關閘、青茂或橫琴口岸指定集合點',
      '港珠澳大橋口岸上車區',
      '氹仔客運碼頭或外港碼頭上車區',
      '澳門國際機場指定集合點',
      '酒店大堂或附近協定上車點',
      '路氹城與金光大道上車區',
    ],
  },
  howItWorks: {
    heading: '如何安排',
    steps: [
      '傳送上車點、日期、希望時間、人數及行李資料；如已選好會所，請連同名稱一併告知。',
      '我們核對路線與車輛狀況後，提出集合點及接送時段。雙方確認內容後，才算完成安排。',
      '如需回程，請提早提供目的地及大概時間；回程會按當時路線與調度另行確認。',
    ],
  },
  included: {
    heading: '確認後的接送安排包括',
    items: [
      '由協定上車點前往已預約會所',
      '路線與時段可配合時的回程協調',
      '按申報人數與行李需要核對合適車輛',
      '交通或調度有變時提供更新',
    ],
    tip: '回程提示：請盡早提供離場時間及目的地。在我們回覆確定的回程集合資料前，請勿視作已完成配車。',
  },
  cta: {
    heading: '想先確認接送路線？',
    body: '把上車點、日期、時間、人數與行李資料傳給我們，我們會連同會所預約一起核對，再回覆可安排的接送內容。',
  },
  next: {
    heading: '還沒選好場館？',
    links: [
      {
        label: '14 間桑拿排名與價格',
        path: '/ranking/',
      },
      {
        label: '第一次來？看新手指南',
        path: '/guide/',
      },
    ],
  },
  schema: {
    name: '澳門桑拿接送安排',
    description: '配合桑拿預約的接送協調。提供上車點、日期、時間、人數及行李資料後，我們會按路線與車輛狀況確認安排。',
    serviceType: 'Sauna booking shuttle coordination',
  },
};

const zhCN: ShuttleCopy = {
  meta: {
    title: '澳门桑拿接送 - 澳门桑拿导航站',
    description: '申请桑拿接送时，请提供上车点、日期、时间、人数和行李信息。我们会核对路线与车辆情况，收到确认后才算安排完成。',
  },
  breadcrumbs: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '接送安排',
      path: '/shuttle/',
    },
  ],
  eyebrow: '先核对路线・确认后才完成安排',
  heading: '澳门桑拿接送安排',
  intro: '需要接送时，请把准确的上车点、日期、希望时间、人数和行李情况一次说清；已经选好会所，也请附上名称。我们先核对预约、路线和可调车辆，再回复集合位置与接送时间段。您确认这些信息后，接送才算正式安排完成。返程同样要结合目的地、路线和时段另行确认。',
  backHome: '返回首页',
  coverage: {
    heading: '接送范围按路线和时段确认',
    body: '澳门半岛、氹仔和路氹是常见咨询区域。酒店、口岸、码头和机场可能需要前往指定上车区，能否安排取决于道路、停靠限制和当时车辆调度。',
    areas: [
      '澳门半岛・需确认路线',
      '氹仔与路氹・需确认路线',
    ],
  },
  pickupPoints: {
    heading: '常见上车点参考',
    items: [
      '关闸、青茂或横琴口岸指定集合点',
      '港珠澳大桥口岸上车区',
      '氹仔客运码头或外港码头上车区',
      '澳门国际机场指定集合点',
      '酒店大堂或附近约定上车点',
      '路氹城及金光大道上车区',
    ],
  },
  howItWorks: {
    heading: '如何安排',
    steps: [
      '发送上车点、日期、希望时间、人数和行李信息；如果会所已确定，请一并告知。',
      '我们核对路线及车辆调度后，给出集合点和接送时间段。双方确认内容后，安排才正式生效。',
      '需要返程时，请提前提供目的地和大致时间；返程会根据当时路线与调度另行确认。',
    ],
  },
  included: {
    heading: '确认后的接送安排包括',
    items: [
      '从约定上车点前往已预约会所',
      '路线与时间可配合时的返程协调',
      '根据申报人数和行李需求核对合适车辆',
      '交通或车辆调度变化时及时更新',
    ],
    tip: '返程提示：请尽早提供离场时间和目的地。在我们回复明确的返程集合信息前，请不要把返程视为已经确认。',
  },
  cta: {
    heading: '想先核对接送路线？',
    body: '把上车点、日期、时间、人数和行李信息发给我们。我们会结合会所预约一起核对，再回复可安排的接送方案。',
  },
  next: {
    heading: '还没选好场馆？',
    links: [
      {
        label: '14 家桑拿排名与价格',
        path: '/ranking/',
      },
      {
        label: '第一次来？看新手指南',
        path: '/guide/',
      },
    ],
  },
  schema: {
    name: '澳门桑拿接送安排',
    description: '配合桑拿预约的接送协调。提供上车点、日期、时间、人数和行李信息后，我们会按路线与车辆情况确认安排。',
    serviceType: 'Sauna booking shuttle coordination',
  },
};

export const shuttleCopy: Partial<Record<Locale, ShuttleCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

export const getShuttleCopy = createPageCopy(shuttleCopy);
