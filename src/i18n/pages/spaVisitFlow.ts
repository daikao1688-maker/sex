import type { Locale } from '../config';

interface VisitStep {
  title: string;
  body: string;
}

type VisitFlow = [VisitStep, VisitStep, VisitStep, VisitStep, VisitStep, VisitStep, VisitStep, VisitStep];

// Owner-supplied eight-step flow, with faithful translations and localized venue names.
// The VIP extras and return-ride reminder cards retain their existing copy.
const visitFlowCopy: Record<Locale, VisitFlow> = {
  "en": [
    {
      "title": "Book in advance, private pickup and a complimentary massage",
      "body": "Book {venue} through us and let us know the number of guests, your arrival time and your location. We will arrange a private luxury MPV to pick you up. Pickup is available anywhere in Macau, with arrival within 10 minutes."
    },
    {
      "title": "Arriving at {venue}",
      "body": "We will have staff ready to welcome you on arrival and escort you into the sauna. You will receive your own numbered wristband, and all your purchases will be recorded under this number."
    },
    {
      "title": "Shower and change",
      "body": "Everyone at the sauna needs to wear the same style of clothing. The loose-fitting clothes help you relax and enjoy your massage more comfortably."
    },
    {
      "title": "Facilities",
      "body": "You can enjoy the facilities free of charge, including the sauna and steam room, hot and cold pools, and whirlpool baths."
    },
    {
      "title": "A complimentary buffet restaurant with plenty of choice",
      "body": "{venue} offers a wide selection of food and drinks free of charge. Tell a member of staff what you would like to eat, and they will ask the kitchen to prepare it. The sauna's menu caters to guests from around the world."
    },
    {
      "title": "Choose a package",
      "body": "The staff on site will introduce the different packages to help you make your choice."
    },
    {
      "title": "After your massage",
      "body": "You can rest on a recliner in the lounge. Because you booked through us, we will also give you an additional complimentary 40-minute lounge massage."
    },
    {
      "title": "Stay overnight or arrange your return ride",
      "body": "Most saunas in Macau offer overnight stays at no extra charge. If you need to return to another location in Macau, contact us and we will arrange a private car to take you there!"
    }
  ],
  "zh-TW": [
    {
      "title": "提前預約，專車接送，贈送按摩：",
      "body": "透過我們預約{venue}，說明人數，到場時間，以及所在的位置，我們將安排專屬的豪華商務車進行接送，澳門境內任何區域都可以接送，10分鐘內抵達。"
    },
    {
      "title": "抵達{venue}",
      "body": "抵達後，現場我們已經安排人員接待，會接待你們進入桑拿房，領取您的專屬號碼手牌（你的所有消費都會記錄在這個號碼當中）。"
    },
    {
      "title": "沐浴更衣",
      "body": "在桑拿房，所有人都需要統一服飾，寬鬆的衣服是為了更好的放鬆以及更好的進行按摩。"
    },
    {
      "title": "內部設施",
      "body": "可以免費的享用設施（三溫暖汗蒸，冷熱水池，按摩浴缸）"
    },
    {
      "title": "免費、豐富的自助餐廳",
      "body": "{venue}：提供豐富的餐飲，這是免費的，可以告知服務員，你想吃什麼，她會安排廚房進行烹飪，值得一提的是，桑拿房的菜品顧及了全球各地的人。"
    },
    {
      "title": "選擇套餐",
      "body": "現場的工作人員會為您介紹不同的套餐，以便您進行選擇。"
    },
    {
      "title": "按摩結束",
      "body": "可以在休息大廳的躺椅進行休息，由於您是透過我們進行預約，因此我們將再贈送40分鐘的大廳按摩。"
    },
    {
      "title": "過夜或回程",
      "body": "澳門的桑拿房基本上都提供過夜留宿服務，這個不需要額外加收費用，如果你需要回澳門其他的地方，請你聯絡我們，我們將安排專車送你前往！"
    }
  ],
  "zh-CN": [
    {
      "title": "提前预约，专车接送，赠送按摩：",
      "body": "通过我们预约{venue}，说明人数，到场时间，以及所在的位置，我们将安排专属的豪华商务车进行接送，澳门境内任何区域都可以接送，10分钟内抵达。"
    },
    {
      "title": "抵达{venue}",
      "body": "抵达后，现场我们已经安排人员接待，会接待你们进入桑拿房，领取您的专属号码手牌（你的所有消费都会记录在这个号码当中）。"
    },
    {
      "title": "沐浴更衣",
      "body": "在桑拿房，所有人都需要统一服饰，宽松的衣服是为了更好的放松以及更好的进行按摩。"
    },
    {
      "title": "内部设施",
      "body": "可以免费的享用设施（三温暖汗蒸，冷热水池，按摩浴缸）"
    },
    {
      "title": "免费、丰富的自助餐厅",
      "body": "{venue}：提供丰富的餐饮，这是免费的，可以告知服务员，你想吃什么，她会安排厨房进行烹饪，值得一提的是，桑拿房的菜品顾及了全球各地的人。"
    },
    {
      "title": "选择套餐",
      "body": "现场的工作人员会为您介绍不同的套餐，以便您进行选择。"
    },
    {
      "title": "按摩结束",
      "body": "可以在休息大厅的躺椅进行休息，由于您是通过我们进行预约，因此我们将再赠送40分钟的大厅按摩。"
    },
    {
      "title": "过夜或回程",
      "body": "澳门的桑拿房基本上都通过过夜留宿服务，这个不需要额外加收费用，如果你需要回澳门其他的地方，请你联系我们，我们将安排专车送你前往！"
    }
  ],
  "ja": [
    {
      "title": "事前予約・専用車でのお迎え・マッサージのプレゼント",
      "body": "当サイトを通じて{venue}をご予約のうえ、人数、到着時刻、現在地をお知らせください。専用の高級ミニバンでお迎えに伺います。マカオ内のどこからでもお迎え可能で、10分以内に到着します。"
    },
    {
      "title": "{venue}に到着",
      "body": "到着時には、あらかじめ手配したスタッフがお迎えし、サウナ内へご案内します。専用の番号付きリストバンドをお受け取りください。館内でのすべてのご利用料金は、この番号に記録されます。"
    },
    {
      "title": "シャワーと着替え",
      "body": "サウナでは、皆さまに統一の館内着を着用していただきます。ゆったりとした服装で、よりリラックスしてマッサージを受けられます。"
    },
    {
      "title": "館内施設",
      "body": "サウナ・スチームルーム、温水・冷水プール、ジェットバスなどの施設を無料でご利用いただけます。"
    },
    {
      "title": "無料で種類豊富なビュッフェレストラン",
      "body": "{venue}では、豊富なお食事やお飲み物を無料で提供しています。食べたいものをスタッフにお伝えいただければ、厨房で調理するよう手配します。世界各地からのお客様の好みに配慮した料理がそろっているのも特徴です。"
    },
    {
      "title": "プランを選ぶ",
      "body": "現地スタッフが各種プランをご紹介し、お客様のプラン選びをお手伝いします。"
    },
    {
      "title": "マッサージ終了後",
      "body": "休憩ラウンジのリクライニングチェアでお休みいただけます。当サイトを通じてご予約いただいたお客様には、さらに40分間のラウンジマッサージを無料でプレゼントします。"
    },
    {
      "title": "夜を越して滞在する、または帰りの送迎を利用する",
      "body": "マカオのほとんどのサウナでは、追加料金なしで夜を越して滞在できます。マカオ内の別の場所へお戻りになる場合は、当サイトまでご連絡ください。専用車でお送りするよう手配します！"
    }
  ],
  "ko": [
    {
      "title": "사전 예약, 전용 차량 픽업, 무료 마사지",
      "body": "저희를 통해 {venue} 예약을 하시고 인원수, 도착 시간, 현재 위치를 알려 주세요. 전용 고급 밴으로 모시러 가겠습니다. 마카오 내 어느 지역이든 픽업이 가능하며, 10분 이내에 도착합니다."
    },
    {
      "title": "{venue} 도착",
      "body": "도착하시면 미리 배정된 직원이 맞이하여 사우나 안으로 안내해 드립니다. 고객님 전용 번호가 있는 손목밴드를 받으시면 됩니다. 모든 이용 금액은 이 번호에 기록됩니다."
    },
    {
      "title": "샤워 및 환복",
      "body": "사우나에서는 모든 고객이 동일한 실내복을 착용해야 합니다. 품이 넉넉한 옷은 더욱 편안하게 휴식을 취하고 마사지를 받는 데 도움이 됩니다."
    },
    {
      "title": "내부 시설",
      "body": "사우나와 찜질 시설, 온탕과 냉탕, 월풀 욕조 등의 시설을 무료로 이용하실 수 있습니다."
    },
    {
      "title": "무료로 즐기는 풍성한 뷔페 레스토랑",
      "body": "{venue}에서는 다양한 음식과 음료를 무료로 제공합니다. 드시고 싶은 음식을 직원에게 말씀하시면 주방에 조리를 요청해 드립니다. 전 세계에서 온 고객들의 입맛을 고려한 메뉴가 준비되어 있다는 점도 특징입니다."
    },
    {
      "title": "패키지 선택",
      "body": "현장 직원이 다양한 패키지를 소개해 드려 선택하실 수 있도록 도와드립니다."
    },
    {
      "title": "마사지 종료 후",
      "body": "휴게 라운지의 리클라이너에서 쉬실 수 있습니다. 저희를 통해 예약하신 고객님께는 40분간의 라운지 마사지를 추가로 무료 제공해 드립니다."
    },
    {
      "title": "밤새 머무르기 또는 귀가",
      "body": "마카오의 대부분 사우나는 추가 요금 없이 밤새 머무를 수 있는 서비스를 제공합니다. 마카오 내 다른 장소로 돌아가셔야 한다면 저희에게 연락해 주세요. 전용 차량으로 모셔다드리겠습니다!"
    }
  ]
};

export function getSpaVisitFlow(lang: Locale, name: string): VisitStep[] {
  return visitFlowCopy[lang].map((step) => ({
    title: step.title.replaceAll('{venue}', () => name),
    body: step.body.replaceAll('{venue}', () => name),
  }));
}
