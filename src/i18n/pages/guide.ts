import type { Locale } from '../config';
import { isVenueVisible, type VenueSlug } from '../../data/venues';
import { formatVenueCount } from '../venueVisibility';
import { createPageCopy, type Crumb } from './helpers';

export interface GuideCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  heading: string;
  intro: string;
  primaryCta: string;
  backHome: string;
  expect: {
    heading: string;
    cards: Array<{
      icon: 'shield' | 'sparkles' | 'message-circle' | 'gift';
      title: string;
      body: string;
      verifyLink?: { label: string; href: string };
      /** Opens the VIP Extras drawer. */
      drawerCta?: string;
    }>;
    rankingTeaser: { body: string; link: string };
  };
  steps: { heading: string; note: string; items: Array<{ title: string; body: string }> };
  quickAsk: { heading: string; allContacts: string };
  recommendations: {
    heading: string;
    browseHeading: string;
    wantLabel: string;
    cards: Array<{ want: string; slug: VenueSlug; body: string }>;
  };
  tips: { heading: string; items: string[] };
  testimonials: { heading: string };
  cta: { heading: string; body: string; faqLink: string };
  drawer: { titleLead: string; titleAccent: string; note: string; close: string };
}

const en: GuideCopy = {
  meta: {
    title: 'First-Time Macau Sauna Guide - Macau Sauna Sites',
    description:
      'A practical first-time guide to choosing a Macau sauna by budget, location, time and overnight needs, with a clear booking-to-departure checklist.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'First-time guide', path: '/guide/' },
  ],
  heading: 'Planning Your First Macau Sauna Visit?',
  intro:
    'Start with four decisions: budget, available time, location and whether you need to stay overnight. This guide takes you through the rest.',
  primaryCta: 'Ask about current options',
  backHome: 'Back to home',
  expect: {
    heading: 'Know this before you choose',
    cards: [
      {
        icon: 'shield',
        title: 'Check the venue, not just the name',
        body:
          'Licence and operating status should be checked before you go. The Macao Government Tourism Office publishes a searchable list of licensed entities. A venue can also be temporarily closed even if its profile remains online for reference.',
        verifyLink: {
          label: 'Check the MGTO register',
          href: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
        },
      },
      {
        icon: 'sparkles',
        title: 'The format differs by venue',
        body:
          "Bathing areas, dining, KTV rooms, room designs and rest lounges differ by venue. Decide which facilities matter most to you, then check the venue page and package details before booking.",
      },
      {
        icon: 'message-circle',
        title: 'Give useful details when you ask',
        body:
          'Share your date, budget range, hotel or district, preferred language, group size and expected departure time. If you need an overnight option, say so at the start. Those details make it much easier to compare venues that are actually open and suitable.',
      },
      {
        icon: 'gift',
        title: 'Offers and add-ons need confirmation',
        body:
          'Massage add-ons and seasonal promotions change by venue, date and package. Ask for an itemised quote and confirm what is included before travelling. Treat the list below as examples to discuss, not an automatic entitlement.',
        drawerCta: 'View common add-ons →',
      },
    ],
    rankingTeaser: {
      body:
        'Ready to compare price bands, areas, staff hours, overnight rules and facilities across all {venueCount} profiles?',
      link: 'Open the comparison',
    },
  },
  steps: {
    heading: 'A simple plan from enquiry to departure',
    note: 'Check the latest operating status, quote and timing before every visit.',
    items: [
      {
        title: 'Set your four priorities',
        body:
          'Choose a comfortable total budget, how many hours you have, which side of Macau you will be on, and whether overnight rest is essential. These four answers remove most unsuitable options immediately.',
      },
      {
        title: 'Ask what is open on your date',
        body:
          "Send your date and priorities. Request a shortlist of operating venues, then confirm massage appointment times, room availability and likely waiting time instead of relying on an old screenshot or promotion.",
      },
      {
        title: 'Review the full quote',
        body:
          'Confirm the package price, service fee, optional extras, payment methods and cancellation or late-arrival rules. If transport is offered, agree on the pickup point and time only after the venue is confirmed.',
      },
      {
        title: 'Arrive and check in',
        body:
          'Bring the identification and payment method you plan to use. At reception, reconfirm the package before changing, then store valuables and luggage according to the venue’s locker policy.',
      },
      {
        title: 'Use the bathing area at your pace',
        body:
          'Many guests start with a shower, bath or sauna, but the exact facilities vary. Do not rush through this part; it is a good time to settle in and check the timing of the next stage with staff.',
      },
      {
        title: "Check dining and facility hours",
        body:
          "Ask when dining, bathing and rest areas are available and which facilities your package includes. Plan your visit around the confirmed massage appointment and your departure time.",
      },
      {
        title: "Confirm the massage and room",
        body:
          "Before your massage, confirm the treatment, actual duration, room and any surcharge against the quote. Tell staff about your preferred pressure and any areas to avoid.",
      },
      {
        title: 'Decide whether to rest or leave',
        body:
          'If you plan to stay overnight, use only a venue that currently permits it and reconfirm the cut-off time, lounge arrangement and any private-room charge. A 24-hour venue and an overnight-eligible package are not always the same thing.',
      },
      {
        title: 'Check the bill before payment',
        body:
          'Review the package, service fee, drinks or room upgrades and any add-ons before paying. Keep the agreed quote handy so questions can be settled while you are still at reception.',
      },
      {
        title: 'Arrange the return journey',
        body:
          'If return transport was confirmed, message when you know your departure time and follow the stated pickup instructions. Otherwise, allow enough time for a taxi or hotel shuttle, especially around ferry and airport departures.',
      },
    ],
  },
  quickAsk: {
    heading: 'Short on time? Send us your date, budget, area and departure time.',
    allContacts: 'See every contact option →',
  },
  recommendations: {
    heading: 'Browse by the kind of visit you want',
    browseHeading: 'These profiles are starting points; check the live status on each detail page.',
    wantLabel: 'Good for:',
    cards: [
      {
        want: 'KTV and a social evening',
        slug: 'clube-rio',
        body:
          'A karaoke-led format on the Macau Peninsula. It suits guests who want the room and singing portion to be central to the night; overnight stay is not available.',
      },
      {
        want: "Comparing a large venue",
        slug: 'number-one-sauna',
        body:
          "This profile records the facilities and layout of a large venue. It is temporarily closed and cannot currently be booked; use the information only as a historical reference.",
      },
      {
        want: 'Comparing a large traditional venue',
        slug: 'familia-nobre',
        body:
          'Kept as a reference for guests comparing scale, service fee and overnight arrangements. The venue is temporarily closed; choose an operating alternative for current plans.',
      },
      {
        want: 'A longer overnight plan',
        slug: 'majesty-spa',
        body:
          "A 24-hour Macau Peninsula venue with overnight facilities, KTV and rooms in a range of styles. Confirm lounge or private-rest-room conditions for your visit.",
      },
      {
        want: "A variety of room designs",
        slug: 'east-castle-spa',
        body:
          "A Macau Peninsula venue with more than 20 room designs. Compare the available facilities and massage options, and confirm the room and treatment before booking.",
      },
      {
        want: "24-hour access and varied room designs",
        slug: 'the-excellent-sauna',
        body:
          "A 24-hour venue with overnight rest and varied room designs. Confirm massage appointment times and the facilities included before arrival.",
      },
      {
        want: 'A newer central-Macau option',
        slug: 'number-nine-sauna',
        body:
          "Opened in 2026 in central Macau, with newer interiors and overnight arrangements. Confirm the massage treatment, appointment time and full package price before booking.",
      },
      {
        want: 'A premium new venue',
        slug: 'empire-sauna',
        body:
          "A newer Macau Peninsula venue with a range of suite designs and overnight facilities. Request a quote for the massage treatment and facilities you intend to use.",
      },
      {
        want: 'Staying around Lisboeta',
        slug: 'shang-pin-spa',
        body:
          'A practical Cotai choice with 24-hour venue access and overnight facilities. Check staff duty hours and the exact package before leaving your hotel.',
      },
      {
        want: 'Researching a quieter format',
        slug: 'victoria-sauna',
        body:
          "Victoria Sauna has resumed operations and is an option for visitors who prefer a quieter, spacious venue. Confirm massage appointments, room availability and overnight arrangements before departure.",
      },
      {
        want: 'Researching KTV and cyber styling',
        slug: 'm-club',
        body:
          "A reference profile documenting KTV facilities and contemporary interiors. M CLUB is temporarily closed and is not accepting reservations.",
      },
    ],
  },
  tips: {
    heading: 'Seven checks that make the night easier',
    items: [
      'Budget for the total, not just the lowest advertised figure. Ask about the service fee, room upgrades, drinks and add-ons before you confirm.',
      "Check venue opening hours separately from massage appointment times. A venue may open around the clock without offering every treatment at every hour.",
      'If overnight rest matters, confirm both the venue policy and your package. Ask where you can rest, until what time, and whether a private room costs extra. Manhao Spa and Clube Rio currently do not offer overnight stays.',
      'Choose the area around your itinerary. Macau Peninsula suits many central-city plans; Taipa and Cotai are easier when your hotel and next-day activities are already there.',
      'Check the detail page for a temporary-closure notice, then verify again on the day. An online profile does not guarantee that a venue is accepting guests.',
      "State your preferred language, facilities and massage needs early. Confirm the available treatments and communication support before choosing a venue.",
      'Carry identification and a backup payment method. Payment support and exchange treatment differ by venue, and cash may be simpler in some cases.',
    ],
  },
  testimonials: { heading: 'Notes from recent guests' },
  cta: {
    heading: 'Want a shortlist for your dates?',
    body:
      'Tell us where you are staying, your budget, available time and whether you need overnight rest. We will help you compare the current options.',
    faqLink: 'Read the common questions',
  },
  drawer: {
    titleLead: 'Common',
    titleAccent: 'add-on treatments',
    note: 'Availability, price and promotional eligibility vary. Confirm the item and total in your quote.',
    close: 'Close add-on list',
  },
};

const ja: GuideCopy = {
  meta: {
    title: '初めてのマカオ・サウナ案内 - マカオ・サウナ・ガイド',
    description:
      '予算、滞在時間、エリア、宿泊の要否から店舗を選ぶための初心者向けガイド。問い合わせから退店までの流れも順番に説明します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: '初めての方へ', path: '/guide/' },
  ],
  heading: '初めてのマカオ・サウナ、どう選ぶ？',
  intro:
    'まず決めたいのは、予算・使える時間・滞在エリア・宿泊の要否の4点です。あとはこのページの順に確認すれば、候補を無理なく絞れます。',
  primaryCta: '営業中の候補を相談する',
  backHome: 'ホームへ戻る',
  expect: {
    heading: 'お店を選ぶ前に知っておきたいこと',
    cards: [
      {
        icon: 'shield',
        title: '店舗名だけでなく営業状況も確認',
        body:
          '訪問前に、ライセンスと現在の営業状況をご確認ください。マカオ政府観光局は認可事業者の検索ページを公開しています。紹介ページが残っていても、一時休業中で予約できない店舗があります。',
        verifyLink: {
          label: 'マカオ政府観光局の登録情報を確認',
          href: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
        },
      },
      {
        icon: 'sparkles',
        title: '設備や過ごし方は店舗ごとに違います',
        body:
          "入浴設備、食事、KTV、客室のデザイン、休憩スペースは店舗ごとに異なります。重視する設備を決め、各店舗ページとプランの利用条件を確認してから予約しましょう。",
      },
      {
        icon: 'message-circle',
        title: '相談時は条件を具体的に',
        body:
          '日付、予算、ホテルまたは希望エリア、人数、希望言語、退店したい時間をお知らせください。宿泊が必要な場合は最初に伝えると、営業中かつ条件に合う候補を比較しやすくなります。',
      },
      {
        icon: 'gift',
        title: '特典や追加ケアは都度確認',
        body:
          '追加ケアやキャンペーンは、店舗・日程・コースによって変わります。自動的に付くものとは考えず、予約前に見積もりの内訳と対象条件を確認してください。下の一覧は相談時の参考例です。',
        drawerCta: '追加ケアの例を見る →',
      },
    ],
    rankingTeaser: {
      body: '{venueCount}店の料金目安、エリア、出勤時間、宿泊条件、設備をまとめて比べたい方はこちら。',
      link: '店舗比較を見る',
    },
  },
  steps: {
    heading: '問い合わせから退店までの10ステップ',
    note: '営業状況・料金・時間は訪問のたびに最新情報をご確認ください。',
    items: [
      {
        title: '4つの希望を決める',
        body:
          '無理のない総予算、利用できる時間、マカオ半島かタイパ／コタイか、宿泊が必要かを決めます。この4点だけでも候補はかなり絞れます。',
      },
      {
        title: '当日営業している店舗を聞く',
        body:
          "日付と希望条件を送り、現在営業中の候補を確認します。古い画像や広告だけで判断せず、マッサージの予約枠、空室、待ち時間の目安も尋ねてください。",
      },
      {
        title: '見積もりの総額を確認する',
        body:
          'コース料金、サービス料、追加料金、支払い方法、遅刻時の扱いを確認します。送迎を希望する場合は、店舗確定後に乗車場所と時間を決めましょう。',
      },
      {
        title: '到着後に受付を済ませる',
        body:
          '必要な身分証と支払い手段を持参し、着替える前に予約内容を再確認します。貴重品や荷物は、その店舗のロッカー案内に従って保管してください。',
      },
      {
        title: '入浴設備でゆっくり整える',
        body:
          'シャワー、浴槽、サウナから始める方が多いですが、設備は店舗によって異なります。急がずに体を休め、次の案内時間をスタッフに確認しておくと安心です。',
      },
      {
        title: "食事と設備の利用時間を確認する",
        body:
          "食事、入浴設備、休憩スペースの利用時間と、プランに含まれる設備を確認します。確定したマッサージの予約時間と退店予定に合わせて過ごしましょう。",
      },
      {
        title: "マッサージの内容と部屋を確認する",
        body:
          "施術前に、マッサージの種類、実際の施術時間、部屋、追加料金が見積もりと一致しているか確認します。希望する強さや避けてほしい部位もスタッフに伝えてください。",
      },
      {
        title: '休憩するか退店するか決める',
        body:
          '宿泊する場合は、現在宿泊可能な店舗を選び、利用期限、休憩場所、個室料金を再確認してください。24時間営業でも、すべてのコースで宿泊できるとは限りません。',
      },
      {
        title: '支払い前に明細を見る',
        body:
          '基本コース、サービス料、飲食や部屋のアップグレード、追加ケアを確認してから支払います。事前の見積もりを手元に残しておくと確認がスムーズです。',
      },
      {
        title: '帰りの移動を手配する',
        body:
          '復路送迎を確定している場合は、退店時間が見えた時点で連絡し、指定された場所で待ちます。利用しない場合は、フェリーや空港の出発時刻から逆算してタクシー時間を確保しましょう。',
      },
    ],
  },
  quickAsk: {
    heading: 'お急ぎなら、日付・予算・エリア・退店希望時間をお送りください。',
    allContacts: '問い合わせ方法をすべて見る →',
  },
  recommendations: {
    heading: '過ごし方から店舗を探す',
    browseHeading: '以下は候補を探す入口です。各詳細ページで現在の営業状況をご確認ください。',
    wantLabel: 'こんな方に：',
    cards: [
      {
        want: 'KTVを中心に楽しみたい',
        slug: 'clube-rio',
        body:
          'マカオ半島にあるカラオケ中心の店舗です。歌と個室での時間を重視する方向けで、宿泊には対応していません。',
      },
      {
        want: "大型店舗の設備を比較したい",
        slug: 'number-one-sauna',
        body:
          "大型店舗の設備とレイアウトを記録した参考ページです。現在は一時休業中で予約を受け付けていないため、過去の施設情報としてご覧ください。",
      },
      {
        want: '大型の伝統的店舗を比較したい',
        slug: 'familia-nobre',
        body:
          '規模、サービス料、宿泊条件を比較するための参考ページです。現在は一時休業中のため、旅行計画では営業中の代替店をお選びください。',
      },
      {
        want: '夜を長く過ごしたい',
        slug: 'majesty-spa',
        body:
          "マカオ半島の24時間営業店で、宿泊休憩、KTV、さまざまな内装の部屋があります。利用日のラウンジや個室休憩の条件は事前にご確認ください。",
      },
      {
        want: "さまざまな客室デザインを見たい",
        slug: 'east-castle-spa',
        body:
          "20種類以上の客室デザインを備えたマカオ半島の店舗です。設備とマッサージの内容を比較し、予約前に利用する部屋と施術をご確認ください。",
      },
      {
        want: "24時間営業と多彩な客室デザイン",
        slug: 'the-excellent-sauna',
        body:
          "24時間営業で、宿泊休憩とさまざまな内装の部屋に対応しています。来店前に、マッサージの予約時間と利用できる設備をご確認ください。",
      },
      {
        want: 'マカオ中心部の新しい店舗',
        slug: 'number-nine-sauna',
        body:
          "2026年開業のマカオ中心部の店舗で、新しい内装と宿泊休憩の設備があります。施術内容、予約時間、プランの総額を確認してからご予約ください。",
      },
      {
        want: '新しい高価格帯の店舗',
        slug: 'empire-sauna',
        body:
          "さまざまなスイートのデザインと宿泊休憩の設備を備えた、マカオ半島の新しい店舗です。利用したいマッサージと設備について見積もりをお求めください。",
      },
      {
        want: '葡京人周辺に泊まる',
        slug: 'shang-pin-spa',
        body:
          'コタイで動きやすく、24時間営業と宿泊設備があります。ホテルを出る前に、スタッフ出勤時間と利用コースを確認してください。',
      },
      {
        want: '静かな店舗の参考を探す',
        slug: 'victoria-sauna',
        body:
          "ヴィクトリアサウナは営業を再開し、静かで広々とした店舗を好む方の選択肢です。出発前に、施術の予約枠、空室、宿泊休憩の条件をご確認ください。",
      },
      {
        want: 'KTVと近未来的な内装を比較',
        slug: 'm-club',
        body:
          "KTV設備と現代的な内装を記録した参考ページです。M CLUBは現在一時休業中で、予約を受け付けていません。",
      },
    ],
  },
  tips: {
    heading: '初めての方に役立つ7つの確認',
    items: [
      '広告の最安値ではなく総額で予算を立てましょう。サービス料、部屋変更、飲み物、追加ケアの有無を予約前に確認します。',
      "店舗の営業時間とマッサージの予約可能時間は別に確認しましょう。24時間営業でも、すべての施術を終日受けられるとは限りません。",
      '宿泊が必要なら、店舗の方針と利用コースの両方を確認します。休憩場所、利用期限、個室の追加料金まで聞いておくと安心です。マンハオスパ（曼濠水療）とクラブリオ（利澳薈）は現在宿泊に対応していないため、別の候補をご検討ください。',
      '旅程に合うエリアを選びましょう。市街地の予定が多ければマカオ半島、ホテルや翌日の予定がコタイならタイパ／コタイが便利です。',
      '詳細ページの一時休業表示を確認し、当日も再確認してください。紹介ページがあることと、現在予約できることは同じではありません。',
      "希望する言語、設備、マッサージの内容を事前に伝えましょう。受けられる施術と言語サポートを確認してから店舗を選んでください。",
      '身分証と予備の支払い手段をお持ちください。利用できる決済方法や換算条件は店舗によって異なります。',
    ],
  },
  testimonials: { heading: '利用者から届いた声' },
  cta: {
    heading: '日程に合う候補を一緒に探します',
    body:
      'ホテル、予算、使える時間、宿泊の要否をお知らせください。現在営業している選択肢を比較してご案内します。',
    faqLink: 'よくある質問を読む',
  },
  drawer: {
    titleLead: 'よくある',
    titleAccent: '追加ケア',
    note: '内容、料金、キャンペーン対象は変わります。見積もりに含まれる項目を事前にご確認ください。',
    close: '追加ケア一覧を閉じる',
  },
};

const zhTW: GuideCopy = {
  meta: {
    title: '澳門桑拿新手指南 - 澳門桑拿導航站',
    description:
      '第一次去澳門桑拿的實用指南：按預算、時間、地區及過夜需要揀會所，並逐步說明由查詢到離場的流程。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '新手指南', path: '/guide/' },
  ],
  heading: '第一次去澳門桑拿，應該怎樣選？',
  intro:
    '先想清楚預算、可用時間、所在區域及是否要過夜，四個答案已經可以排除大部分不合適的選項。其餘流程，照這份指南逐步確認即可。',
  primaryCta: '查詢目前可選會所',
  backHome: '返回首頁',
  expect: {
    heading: '揀會所前，先知道這些',
    cards: [
      {
        icon: 'shield',
        title: '不只看名字，也要查狀態',
        body:
          '出發前應核對牌照及最新營業狀態。澳門旅遊局設有持牌實體查詢頁；有些會所即使保留介紹頁供參考，也可能正值暫停營業，未必可以預約。',
        verifyLink: {
          label: '到旅遊局網站查詢牌照',
          href: 'https://www.dst.gov.mo/zh-hant/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
        },
      },
      {
        icon: 'sparkles',
        title: '每間的玩法與設施不同',
        body:
          "浴區、餐飲、KTV、房間設計及休息區因場所而異。先選出你最重視的設施，再查看各場所頁面及套餐內容，確認適合後再預約。",
      },
      {
        icon: 'message-circle',
        title: '查詢時講清楚條件',
        body:
          '提供日期、預算範圍、酒店或所在區域、同行人數、慣用語言及預計離場時間；需要過夜就一開始說明。資料愈完整，愈容易比較當日有營業而且真正合適的選項。',
      },
      {
        icon: 'gift',
        title: '優惠與加購項目要逐次確認',
        body:
          '按摩護理與期間優惠會按會所、日期和套式改變，不應視為自動附送。確認預約前先索取清楚報價，問明實際包含項目。下方清單只是常見例子，方便你查詢。',
        drawerCta: '查看常見加購項目 →',
      },
    ],
    rankingTeaser: {
      body: '想一次比較 {venueCount} 間會所的價格、地區、技師時段、過夜規則與設施？',
      link: '查看會所比較',
    },
  },
  steps: {
    heading: '由查詢到離場，照這 10 步走',
    note: '每次出發前，都應重新確認營業狀態、報價與時間。',
    items: [
      {
        title: '先定四個條件',
        body:
          '決定可接受的總預算、可以留多久、想去澳門半島還是氹仔／路氹，以及是否必須過夜。這四項比先揀會所名字更重要。',
      },
      {
        title: '查當日有哪些會所營業',
        body:
          "把日期和條件傳來，先取得目前營業的候選名單，再確認按摩預約時段、房間情況及預計等候時間。不要只靠舊截圖或過期優惠作決定。",
      },
      {
        title: '看清楚完整報價',
        body:
          '確認套式價格、服務費、可選升級、付款方式，以及遲到或改期安排。如需要接送，應在會所確認後才約定上車地點與時間。',
      },
      {
        title: '抵達後再次核對',
        body:
          '帶備證件及預計使用的付款方式，在換衣前向前台再核對套式內容。貴重物品及行李按該會所的儲物櫃規則存放。',
      },
      {
        title: '按自己節奏使用浴區',
        body:
          '不少人會先沖身、浸浴或蒸桑拿，但實際設施視乎會所。這一段不用趕，也可以順便向職員確認下一個環節大約何時開始。',
      },
      {
        title: "確認餐飲及設施使用時間",
        body:
          "先確認餐飲、沐浴及休息區的開放時間，以及套餐包含哪些設施，再配合已確認的按摩預約和離場時間安排行程。",
      },
      {
        title: "確認按摩項目與房間",
        body:
          "按摩前，請核對項目、實際時長、房間及附加收費是否與報價一致，並向工作人員說明希望的力度及需要避開的部位。",
      },
      {
        title: '決定休息還是離場',
        body:
          '需要過夜，就只揀目前容許過夜的會所，並核對最遲離場時間、休息位置及獨立房收費。會所 24 小時營業，不代表所有套式都可留宿。',
      },
      {
        title: '付款前核對帳單',
        body:
          '逐項查看套式、服務費、餐飲或房型升級及加購護理。保留事前報價，有疑問可在前台即時對清楚。',
      },
      {
        title: '預留回程時間',
        body:
          '如已確認回程接送，知道離場時間後再傳訊息，按指示到上車點等候；沒有接送就預留召的士時間，尤其要趕碼頭或機場時更要鬆動一點。',
      },
    ],
  },
  quickAsk: {
    heading: '時間有限？直接傳日期、預算、地區及離場時間給我們。',
    allContacts: '查看全部聯絡方式 →',
  },
  recommendations: {
    heading: '按你想要的行程找會所',
    browseHeading: '以下是篩選起點；請進入詳情頁查看目前營業狀態。',
    wantLabel: '適合：',
    cards: [
      {
        want: '唱 K 與社交氣氛',
        slug: 'clube-rio',
        body:
          '位於澳門半島、以卡拉 OK 為主軸，適合把唱歌及包廂時間放在行程中心的客人；目前不設過夜。',
      },
      {
        want: "比較大型會所設施",
        slug: 'number-one-sauna',
        body:
          "此頁保留大型會所的設施與空間資料。場所目前暫停營業，不接受預約，內容僅供歷史資料參考。",
      },
      {
        want: '比較傳統大型會所',
        slug: 'familia-nobre',
        body:
          '保留作場地規模、服務費及過夜安排的比較資料。會所現時暫停營業，計劃行程請改選仍在營業的選項。',
      },
      {
        want: '安排較長的過夜行程',
        slug: 'majesty-spa',
        body:
          "澳門半島的 24 小時會所，設過夜安排、KTV 及多種不同風格房間。到訪日期的躺椅及獨立休息房條件應先確認。",
      },
      {
        want: "多種不同風格的房間設計",
        slug: 'east-castle-spa',
        body:
          "澳門半島的會所，設有 20 多款不同風格房間。可按設施和按摩項目比較，預約前確認房間及療程內容。",
      },
      {
        want: "24 小時營業與多種房間設計",
        slug: 'the-excellent-sauna',
        body:
          "24 小時營業，設過夜休息與多種不同風格房間。到訪前，請確認按摩預約時段及套餐包含的設施。",
      },
      {
        want: '澳門市區較新選項',
        slug: 'number-nine-sauna',
        body:
          "2026 年開業，位於澳門半島，設有較新的裝潢及過夜安排。預約前，請確認按摩項目、預約時段及套餐總價。",
      },
      {
        want: '較新的高預算會所',
        slug: 'empire-sauna',
        body:
          "澳門半島的新場，設多種不同設計套房及過夜設施。請按想使用的按摩項目與設施索取明細報價。",
      },
      {
        want: '入住澳門葡京人附近',
        slug: 'shang-pin-spa',
        body:
          '路氹位置方便，會所 24 小時營業並有過夜設施。離開酒店前先核對技師時段及實際套式。',
      },
      {
        want: '研究清靜型會所',
        slug: 'victoria-sauna',
        body:
          "凱旋桑拿已恢復營業，可列入偏好清靜、寬敞環境的選擇。出發前請確認按摩預約時段、房間及過夜安排。",
      },
      {
        want: '研究 KTV 與未來感設計',
        slug: 'm-club',
        body:
          "此頁保留 KTV 設施及現代風格裝潢資料。晉會 M CLUB 現時暫停營業，不接受預約。",
      },
    ],
  },
  tips: {
    heading: '新手最實用的 7 個提醒',
    items: [
      '用總價做預算，不要只看宣傳上的最低數字。套式、服務費、房型升級、飲品及加購項目都要先問清楚。',
      "分開確認會所營業時間與按摩預約時段。即使會所 24 小時營業，也不代表所有按摩項目均全日提供。",
      '要過夜就同時確認會所政策及所選套式，問明休息位置、可留到幾點，以及獨立房是否另收費。曼濠水療與利澳薈目前不提供過夜，需要留宿請另選會所。',
      '配合旅遊路線揀地區：市中心行程較多可選澳門半島；酒店及翌日活動都在路氹，就以氹仔／路氹為先。',
      '先看詳情頁有沒有暫停營業提示，出發當日再查一次。有介紹頁不等於目前正在接待客人。',
      "及早說明慣用語言、希望使用的設施及按摩需求，確認可提供的療程與溝通支援後，再選擇場所。",
      '帶備證件及後備付款方式。不同會所支援的支付方法及兌換安排可能不同，部分情況用現金會較直接。',
    ],
  },
  testimonials: { heading: '客人實際回饋' },
  cta: {
    heading: '想按你的行程縮窄選擇？',
    body:
      '告訴我們入住地點、預算、可用時間及是否需要過夜，我們會協助比較目前營業的選項。',
    faqLink: '閱讀常見問題',
  },
  drawer: {
    titleLead: '常見',
    titleAccent: '加購護理',
    note: '項目、收費及優惠資格會有變動，請以確認預約時的報價內容為準。',
    close: '關閉加購護理清單',
  },
};

const zhCN: GuideCopy = {
  meta: {
    title: '澳门桑拿新手指南 - 澳门桑拿导航站',
    description:
      '第一次去澳门桑拿的实用指南：按预算、时间、区域和过夜需求筛选会所，并逐步说明从咨询到离场的完整流程。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '新手指南', path: '/guide/' },
  ],
  heading: '第一次去澳门桑拿，应该怎么选？',
  intro:
    '先想清楚预算、可用时间、所在区域和是否需要过夜，这四个答案已经能排除大部分不合适的选项。剩下的流程，按这份指南逐步确认就好。',
  primaryCta: '咨询当前可选会所',
  backHome: '返回首页',
  expect: {
    heading: '选会所前，先了解这些',
    cards: [
      {
        icon: 'shield',
        title: '不只看名字，也要查状态',
        body:
          '出发前应核对牌照和最新营业状态。澳门旅游局提供持牌实体查询页面；有些会所即使保留介绍页供参考，也可能正处于暂停营业阶段，暂时无法预约。',
        verifyLink: {
          label: '到旅游局网站查询牌照',
          href: 'https://www.dst.gov.mo/zh-hans/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
        },
      },
      {
        icon: 'sparkles',
        title: '每家的玩法和设施不同',
        body:
          "浴区、餐饮、KTV、房间设计及休息区因场所而异。先选出你最看重的设施，再查看各场所页面及套餐内容，确认适合后再预约。",
      },
      {
        icon: 'message-circle',
        title: '咨询时把条件说清楚',
        body:
          '提供日期、预算范围、酒店或所在区域、同行人数、常用语言和预计离场时间；需要过夜就一开始说明。信息越完整，越容易比较当天营业并且真正合适的选项。',
      },
      {
        icon: 'gift',
        title: '优惠和加购项目每次都要确认',
        body:
          '按摩护理和阶段性优惠会随会所、日期及套餐变化，不能视为自动赠送。确认预约前先索取清楚报价，问明实际包含哪些项目。下方清单只是常见示例，方便咨询。',
        drawerCta: '查看常见加购项目 →',
      },
    ],
    rankingTeaser: {
      body: '想一次对比 {venueCount} 家会所的价格、区域、技师时段、过夜规则和设施？',
      link: '查看会所对比',
    },
  },
  steps: {
    heading: '从咨询到离场，按这 10 步来',
    note: '每次出发前，都要重新确认营业状态、报价和时间。',
    items: [
      {
        title: '先确定四个条件',
        body:
          '想好可以接受的总预算、能够停留多久、准备去澳门半岛还是氹仔／路氹，以及是否必须过夜。这四项比先选会所名字更重要。',
      },
      {
        title: '查询当天有哪些会所营业',
        body:
          "把日期和条件发来，先获取当前营业的候选名单，再确认按摩预约时段、房间情况及预计等候时间。不要只靠旧截图或过期优惠做决定。",
      },
      {
        title: '看清完整报价',
        body:
          '确认套餐价格、服务费、可选升级、支付方式，以及迟到或改期安排。如果需要接送，应在会所确认后再约定上车地点与时间。',
      },
      {
        title: '到店后再次核对',
        body:
          '带好证件和准备使用的支付方式，在换衣前向前台再次核对套餐内容。贵重物品和行李按该会所的储物柜规则存放。',
      },
      {
        title: '按自己的节奏使用浴区',
        body:
          '不少客人会先冲澡、泡浴或蒸桑拿，但实际设施要看会所。这一段不用赶，也可以顺便向工作人员确认下一个环节大约什么时候开始。',
      },
      {
        title: "确认餐饮及设施使用时间",
        body:
          "先确认餐饮、沐浴及休息区的开放时间，以及套餐包含哪些设施，再配合已确认的按摩预约和离场时间安排行程。",
      },
      {
        title: "确认按摩项目与房间",
        body:
          "按摩前，请核对项目、实际时长、房间及附加收费是否与报价一致，并向工作人员说明希望的力度及需要避开的部位。",
      },
      {
        title: '决定休息还是离场',
        body:
          '需要过夜，就只选当前允许过夜的会所，并核对最晚离场时间、休息位置和独立房费用。会所 24 小时营业，不代表所有套餐都能留宿。',
      },
      {
        title: '付款前核对账单',
        body:
          '逐项查看套餐、服务费、餐饮或房型升级以及加购护理。保留事前报价，有疑问可以在前台当场核对。',
      },
      {
        title: '给返程留足时间',
        body:
          '如果已确认返程接送，确定离场时间后再发消息，并按指引到上车点等待；没有接送就预留打车时间，尤其需要赶码头或机场时不要卡得太紧。',
      },
    ],
  },
  quickAsk: {
    heading: '时间有限？直接把日期、预算、区域和离场时间发给我们。',
    allContacts: '查看全部联系方式 →',
  },
  recommendations: {
    heading: '按你想要的行程找会所',
    browseHeading: '以下是筛选起点；请进入详情页查看当前营业状态。',
    wantLabel: '适合：',
    cards: [
      {
        want: '唱 K 和社交氛围',
        slug: 'clube-rio',
        body:
          '位于澳门半岛，以卡拉 OK 为主轴，适合把唱歌和包厢时间放在行程中心的客人；目前不提供过夜。',
      },
      {
        want: "比较大型会所设施",
        slug: 'number-one-sauna',
        body:
          "此页保留大型会所的设施与空间资料。场所目前暂停营业，不接受预约，内容仅供历史资料参考。",
      },
      {
        want: '对比传统大型会所',
        slug: 'familia-nobre',
        body:
          '保留作为场地规模、服务费和过夜安排的对比资料。会所目前暂停营业，规划行程请改选仍在营业的选项。',
      },
      {
        want: '安排较长的过夜行程',
        slug: 'majesty-spa',
        body:
          "澳门半岛的 24 小时会所，设过夜安排、KTV 及多种不同风格房间。到访日期的躺椅及独立休息房条件应先确认。",
      },
      {
        want: "多种不同风格的房间设计",
        slug: 'east-castle-spa',
        body:
          "澳门半岛的会所，设有 20 多款不同风格房间。可按设施和按摩项目比较，预约前确认房间及疗程内容。",
      },
      {
        want: "24 小时营业与多种房间设计",
        slug: 'the-excellent-sauna',
        body:
          "24 小时营业，设过夜休息与多种不同风格房间。到访前，请确认按摩预约时段及套餐包含的设施。",
      },
      {
        want: '澳门市区较新选项',
        slug: 'number-nine-sauna',
        body:
          "2026 年开业，位于澳门半岛，设有较新的装潢及过夜安排。预约前，请确认按摩项目、预约时段及套餐总价。",
      },
      {
        want: '较新的高预算会所',
        slug: 'empire-sauna',
        body:
          "澳门半岛的新场，设多种不同设计套房及过夜设施。请按想使用的按摩项目与设施索取明细报价。",
      },
      {
        want: '住在澳门葡京人附近',
        slug: 'shang-pin-spa',
        body:
          '路氹位置方便，会所 24 小时营业并有过夜设施。离开酒店前先核对技师时段和实际套餐。',
      },
      {
        want: '了解安静型会所',
        slug: 'victoria-sauna',
        body:
          "凯旋桑拿已恢复营业，可列入偏好清静、宽敞环境的选择。出发前请确认按摩预约时段、房间及过夜安排。",
      },
      {
        want: '了解 KTV 和未来感设计',
        slug: 'm-club',
        body:
          "此页保留 KTV 设施及现代风格装潢资料。晋会 M CLUB 目前暂停营业，不接受预约。",
      },
    ],
  },
  tips: {
    heading: '新手最实用的 7 个提醒',
    items: [
      '按总价做预算，不要只看宣传中的最低数字。套餐、服务费、房型升级、饮品和加购项目都要提前问清楚。',
      "分开确认会所营业时间与按摩预约时段。即使会所 24 小时营业，也不代表所有按摩项目均全日提供。",
      '需要过夜就同时确认会所政策和所选套餐，问清休息位置、能够留到几点，以及独立房是否另外收费。曼濠水疗与利澳荟目前不提供过夜，需要留宿请另选会所。',
      '结合旅行路线选区域：市中心行程较多可以选澳门半岛；酒店和第二天活动都在路氹，就优先考虑氹仔／路氹。',
      '先看详情页有没有暂停营业提示，出发当天再确认一次。有介绍页不等于目前正在接待客人。',
      "尽早说明常用语言、希望使用的设施及按摩需求，确认可提供的疗程与沟通支持后，再选择场所。",
      '带好证件和备用支付方式。不同会所支持的支付方法和换算安排可能不同，部分情况下使用现金更直接。',
    ],
  },
  testimonials: { heading: '客人的实际反馈' },
  cta: {
    heading: '想按照你的行程缩小范围？',
    body:
      '告诉我们入住地点、预算、可用时间和是否需要过夜，我们会协助对比当前营业的选项。',
    faqLink: '查看常见问题',
  },
  drawer: {
    titleLead: '常见',
    titleAccent: '加购护理',
    note: '项目、收费和优惠资格会有变化，请以确认预约时的报价内容为准。',
    close: '关闭加购护理列表',
  },
};

const ko: GuideCopy = {
  meta: {
    title: '마카오 사우나 초보 가이드 - 마카오 사우나 가이드',
    description:
      '마카오 사우나 첫 방문을 위한 실용 가이드: 예산, 시간, 지역, 숙박 필요 여부로 매장을 고르고, 문의부터 퇴장까지의 흐름을 단계별로 안내합니다.',
  },
  breadcrumbs: [
    { name: '홈', path: '/' },
    { name: '초보 가이드', path: '/guide/' },
  ],
  heading: '마카오 사우나가 처음이라면, 어떻게 골라야 할까요?',
  intro:
    '예산, 사용 가능 시간, 소재 지역, 숙박 필요 여부를 먼저 정하세요. 이 네 가지 답만으로 대부분의 부적합한 선택지를 걸러낼 수 있습니다. 나머지 과정은 이 가이드대로 단계별로 확인하면 됩니다.',
  primaryCta: '현재 이용 가능한 매장 문의',
  backHome: '홈으로 돌아가기',
  expect: {
    heading: '매장을 고르기 전, 알아두세요',
    cards: [
      {
        icon: 'shield',
        title: '이름만 보지 말고 상태도 확인',
        body:
          '출발 전 라이선스와 최신 영업 상태를 확인해야 합니다. 마카오 관광청에 인가 사업자 조회 페이지가 있습니다. 소개 페이지가 남아 있는 매장도 일시 휴업 중일 수 있어 예약이 불가능할 수 있습니다.',
        verifyLink: {
          label: '관광청 사이트에서 라이선스 조회',
          href: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
        },
      },
      {
        icon: 'sparkles',
        title: '매장마다 이용법과 시설이 다릅니다',
        body:
          "목욕 시설, 다이닝, KTV, 객실 디자인, 휴게 공간은 매장마다 다릅니다. 중요하게 생각하는 시설을 정한 뒤, 매장 페이지와 패키지 내용을 확인하고 예약하세요.",
      },
      {
        icon: 'message-circle',
        title: '문의할 때 조건을 명확히',
        body:
          '날짜, 예산 범위, 호텔 또는 소재 지역, 동행 인원, 사용 언어, 예상 퇴장 시간을 알려주세요. 숙박이 필요하면 처음부터 말씀하세요. 정보가 완전할수록 당일 영업 중이면서 진짜 적합한 선택지를 비교하기 쉽습니다.',
      },
      {
        icon: 'gift',
        title: '혜택과 추가 항목은 매번 확인',
        body:
          '마사지 케어와 기간 혜택은 매장, 날짜, 코스에 따라 달라지므로 자동 포함으로 간주해서는 안 됩니다. 예약 확정 전 명확한 견적을 받아 실제 포함 항목을 확인하세요. 아래 목록은 문의를 돕기 위한 흔한 예시입니다.',
        drawerCta: '흔한 추가 항목 보기 →',
      },
    ],
    rankingTeaser: {
      body: '{venueCount}개 매장의 가격, 지역, 테라피스트 시간대, 숙박 규칙, 시설을 한 번에 비교하고 싶으신가요?',
      link: '매장 비교 보기',
    },
  },
  steps: {
    heading: '문의부터 퇴장까지, 이 10단계를 따라하세요',
    note: '매번 출발 전에 영업 상태, 견적, 시간을 다시 확인해야 합니다.',
    items: [
      {
        title: '네 가지 조건부터 정하기',
        body:
          '받아들일 수 있는 총예산, 머물 수 있는 시간, 마카오 반도와 타이파/코타이 중 어디로 갈지, 숙박이 반드시 필요한지를 정하세요. 이 네 가지가 매장 이름을 먼저 고르는 것보다 중요합니다.',
      },
      {
        title: '당일 영업 중인 매장 확인',
        body:
          "날짜와 원하는 조건을 보내 현재 영업 중인 후보를 확인하세요. 오래된 사진이나 혜택에만 의존하지 말고 마사지 예약 시간, 객실 상황, 예상 대기 시간도 확인해 주세요.",
      },
      {
        title: '전체 견적을 자세히 확인',
        body:
          '코스 가격, 서비스 요금, 선택 가능 업그레이드, 결제 방법, 지각·일정 변경 배치를 확인하세요. 픽업이 필요하면 매장 확인 후에 탑승 지점과 시간을 약속해야 합니다.',
      },
      {
        title: '도착 후 재확인',
        body:
          '신분증과 사용할 결제 수단을 지참하고, 탈의 전에 프런트에서 코스 내용을 다시 확인하세요. 귀중품과 짐은 해당 매장의 락커 규칙에 따라 보관합니다.',
      },
      {
        title: '본인 페이스로 욕장 이용',
        body:
          '많은 분들이 먼저 샤워, 입욕, 사우나를 하지만 실제 시설은 매장에 따라 다릅니다. 이 단계는 서두를 필요가 없으며, 직원에게 다음 순서가 언제쯤 시작되는지 확인해도 좋습니다.',
      },
      {
        title: "다이닝과 시설 이용 시간 확인",
        body:
          "다이닝, 목욕 시설, 휴게 공간의 이용 시간과 패키지에 포함된 시설을 확인하세요. 확정된 마사지 예약 시간과 퇴장 시간에 맞춰 일정을 잡으세요.",
      },
      {
        title: "마사지 항목과 객실 확인",
        body:
          "마사지 전에 항목, 실제 소요 시간, 객실, 추가 요금이 견적과 일치하는지 확인하세요. 원하는 압력과 피해야 할 부위도 직원에게 알려주세요.",
      },
      {
        title: '휴식할지 퇴장할지 결정',
        body:
          '숙박이 필요하면 현재 숙박을 허용하는 매장만 고르고, 최종 퇴장 시간, 휴식 위치, 독립룸 요금을 확인하세요. 매장이 24시간 영업이어도 모든 코스가 숙박 가능한 것은 아닙니다.',
      },
      {
        title: '결제 전 청구서 확인',
        body:
          '코스, 서비스 요금, 다이닝 또는 룸 타입 업그레이드, 추가 케어를 항목별로 확인하세요. 사전 견적을 보관해 두면 의문이 있을 때 프런트에서 바로 대조할 수 있습니다.',
      },
      {
        title: '귀가 시간 여유 확보',
        body:
          '귀가 픽업을 확정했다면 퇴장 시간을 알게 된 후 메시지를 보낸 뒤, 안내에 따라 탑승 지점에서 기다리세요. 픽업이 없다면 택시 호출 시간을 확보하고, 특히 터미널이나 공항을 가야 한다면 더 여유를 두세요.',
      },
    ],
  },
  quickAsk: {
    heading: '시간이 없으신가요? 날짜, 예산, 지역, 퇴장 시간을 바로 보내주세요.',
    allContacts: '전체 연락 방법 보기 →',
  },
  recommendations: {
    heading: '원하는 일정으로 매장 찾기',
    browseHeading: '아래는 필터링 출발점입니다. 상세 페이지에서 현재 영업 상태를 확인하세요.',
    wantLabel: '적합:',
    cards: [
      {
        want: '노래방과 소셜 분위기',
        slug: 'clube-rio',
        body:
          '마카오 반도에서 노래방을 중심으로 운영하며, 노래와 룸 시간을 일정의 중심에 두는 손님에게 적합합니다. 현재 숙박은 제공되지 않습니다.',
      },
      {
        want: "대형 매장 시설 비교",
        slug: 'number-one-sauna',
        body:
          "대형 매장의 시설과 공간 구성을 기록한 참고 페이지입니다. 현재 일시 휴업 중이며 예약을 받지 않으므로 과거 시설 정보로만 참고해 주세요.",
      },
      {
        want: '전통 대형 매장 비교',
        slug: 'familia-nobre',
        body:
          '공간 규모, 서비스 요금, 숙박 배치의 비교 자료로 유지됩니다. 현재 일시 휴업 중이니 일정 계획은 영업 중인 매장으로 선택하세요.',
      },
      {
        want: '긴 야간 휴식 일정',
        slug: 'majesty-spa',
        body:
          "마카오 반도의 24시간 매장으로 야간 휴식, KTV, 다양한 디자인의 객실이 있습니다. 방문일의 리클라이너와 독립 휴게실 이용 조건을 미리 확인하세요.",
      },
      {
        want: "다양한 객실 디자인",
        slug: 'east-castle-spa',
        body:
          "20가지가 넘는 객실 디자인을 갖춘 마카오 반도의 매장입니다. 시설과 마사지 항목을 비교하고, 예약 전에 이용할 객실과 코스 내용을 확인하세요.",
      },
      {
        want: "24시간 영업과 다양한 객실 디자인",
        slug: 'the-excellent-sauna',
        body:
          "24시간 영업하며 야간 휴식 공간과 다양한 디자인의 객실을 갖췄습니다. 방문 전에 마사지 예약 시간과 패키지에 포함된 시설을 확인하세요.",
      },
      {
        want: '마카오 시내의 비교적 새로운 선택지',
        slug: 'number-nine-sauna',
        body:
          "2026년 오픈한 마카오 반도의 매장으로 새로운 인테리어와 야간 휴식 시설을 갖췄습니다. 예약 전에 마사지 항목, 예약 시간, 패키지 총액을 확인하세요.",
      },
      {
        want: '비교적 새로운 고예산 매장',
        slug: 'empire-sauna',
        body:
          "다양한 스위트 디자인과 야간 휴식 시설을 갖춘 마카오 반도의 신규 매장입니다. 이용할 마사지 항목과 시설에 맞춰 상세 견적을 요청하세요.",
      },
      {
        want: '리스보에타 인근 숙박',
        slug: 'shang-pin-spa',
        body:
          '코타이 위치가 편리하며, 24시간 영업에 야간 휴식 시설이 있습니다. 호텔을 나서기 전 테라피스트 시간대와 실제 코스를 확인하세요.',
      },
      {
        want: '조용한 매장 알아보기',
        slug: 'victoria-sauna',
        body:
          "빅토리아 사우나는 영업을 재개했으며 조용하고 넓은 매장을 원하는 분들이 고려할 수 있습니다. 출발 전에 마사지 예약 시간, 객실, 야간 휴식 조건을 확인하세요.",
      },
      {
        want: 'KTV와 미래감각 디자인 알아보기',
        slug: 'm-club',
        body:
          "KTV 시설과 현대적인 인테리어를 기록한 참고 페이지입니다. M 클럽은 현재 일시 휴업 중이며 예약을 받지 않습니다.",
      },
    ],
  },
  tips: {
    heading: '초보에게 가장 실용적인 7가지 조언',
    items: [
      '총액으로 예산을 잡고, 홍보의 최저 숫자만 보지 마세요. 코스, 서비스 요금, 룸 타입 업그레이드, 음료, 추가 항목을 미리 확인하세요.',
      "매장 영업시간과 마사지 예약 시간을 따로 확인하세요. 24시간 영업한다고 해서 모든 마사지 항목을 하루 종일 제공하는 것은 아닙니다.",
      '숙박이 필요하면 매장 정책과 선택 코스를 함께 확인하고, 휴식 위치, 몇 시까지 머물 수 있는지, 독립룸 별도 요금 여부를 물어보세요. 만하오 스파와 클루브 리오는 현재 숙박을 제공하지 않으니 숙박이 필요하면 다른 매장을 선택하세요.',
      '여행 동선에 맞춰 지역을 고르세요: 시내 일정이 많다면 마카오 반도, 호텔과 다음 날 일정이 모두 코타이라면 타이파/코타이 우선.',
      '상세 페이지에 일시 휴업 안내가 있는지 먼저 보고, 출발 당일에 한 번 더 확인하세요. 소개 페이지가 있다고 해서 현재 손님을 받고 있는 것은 아닙니다.',
      "사용 언어, 이용할 시설, 원하는 마사지 항목을 미리 알려주세요. 제공 가능한 코스와 언어 지원을 확인한 뒤 매장을 선택하세요.",
      '신분증과 예비 결제 수단을 지참하세요. 매장마다 지원하는 결제 방법과 환전 배치가 다를 수 있으며, 경우에 따라 현금이 더 간단합니다.',
    ],
  },
  testimonials: { heading: '고객들의 실제 피드백' },
  cta: {
    heading: '일정에 맞춰 선택지를 좁히고 싶으신가요?',
    body:
      '숙박 위치, 예산, 사용 가능 시간, 숙박 필요 여부를 알려주시면 현재 영업 중인 선택지를 비교해 드립니다.',
    faqLink: '자주 묻는 질문 읽기',
  },
  drawer: {
    titleLead: '흔한',
    titleAccent: '추가 케어',
    note: '항목, 요금, 혜택 자격은 변동될 수 있으므로, 예약 확정 시의 견적 내용을 기준으로 하세요.',
    close: '추가 케어 목록 닫기',
  },
};

export const guideCopy: Partial<Record<Locale, GuideCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

const getRawGuideCopy = createPageCopy(guideCopy);

// Preserve the full source tip above so enabling Clube Rio restores its mention.
const overnightTipWithoutClubeRio: Record<Locale, string> = {
  en: 'If overnight rest matters, confirm both the venue policy and your package. Ask where you can rest, until what time, and whether a private room costs extra. Manhao Spa currently does not offer overnight stays.',
  ja: '宿泊が必要なら、店舗の方針と利用コースの両方を確認します。休憩場所、利用期限、個室の追加料金まで聞いておくと安心です。マンハオスパ（曼濠水療）は現在宿泊に対応していないため、別の候補をご検討ください。',
  'zh-TW': '要過夜就同時確認會所政策及所選套式，問明休息位置、可留到幾點，以及獨立房是否另收費。曼濠水療目前不提供過夜，需要留宿請另選會所。',
  'zh-CN': '需要过夜就同时确认会所政策和所选套餐，问清休息位置、能够留到几点，以及独立房是否另外收费。曼濠水疗目前不提供过夜，需要留宿请另选会所。',
  ko: '숙박이 필요하면 매장 정책과 선택 코스를 함께 확인하고, 휴식 위치, 몇 시까지 머물 수 있는지, 독립룸 별도 요금 여부를 물어보세요. 만하오 스파는 현재 숙박을 제공하지 않으니 숙박이 필요하면 다른 매장을 선택하세요.',
};

export function getGuideCopy(lang: Locale): GuideCopy {
  const copy = getRawGuideCopy(lang);
  return {
    ...copy,
    expect: {
      ...copy.expect,
      rankingTeaser: {
        ...copy.expect.rankingTeaser,
        body: formatVenueCount(copy.expect.rankingTeaser.body),
      },
    },
    recommendations: {
      ...copy.recommendations,
      cards: copy.recommendations.cards.filter((card) => isVenueVisible(card.slug)),
    },
    tips: {
      ...copy.tips,
      items: copy.tips.items.map((tip, index) =>
        index === 2 && !isVenueVisible('clube-rio') ? overnightTipWithoutClubeRio[lang] : tip),
    },
  };
}
