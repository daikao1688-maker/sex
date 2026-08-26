import type { Locale } from '../config';
import type { VenueSlug } from '../../data/venues';
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
          'Bathing areas, dining, stage presentations, KTV rooms, themed rooms and rest lounges are not the same everywhere. Decide which one or two features matter to you, then read the venue page instead of assuming every package includes the same facilities.',
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
        'Ready to compare price bands, areas, staff hours, overnight rules and facilities across all 14 profiles?',
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
          'Send your date and priorities. Request a shortlist of currently operating venues, then ask about the latest staff duty window, room availability and likely waiting time instead of relying on an old screenshot or promotion.',
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
        title: 'Check dining and introductions',
        body:
          'Food service and staff introductions differ by venue and time of day. Ask what is available that evening and whether an introduction is scheduled, rather than planning the whole visit around a fixed show time.',
      },
      {
        title: 'Confirm the room and service',
        body:
          'Before entering the private room, make sure the selected service, duration, room type and any surcharge match the quote. Clear communication about preferences and boundaries makes the experience more comfortable for everyone.',
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
        want: 'Understanding a large-show format',
        slug: 'number-one-sauna',
        body:
          'This profile is useful for learning how a large venue and presentation hall operate. It is currently temporarily closed, so it should not be treated as a bookable first choice.',
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
          'A 24-hour Macau Peninsula venue with overnight facilities, KTV and themed rooms. Confirm lounge or private-rest-room conditions for the night you intend to visit.',
      },
      {
        want: 'Theme-room variety',
        slug: 'east-castle-spa',
        body:
          'A Macau Peninsula option focused on scenario rooms. Consider it when room design matters more than KTV or a large stage presentation.',
      },
      {
        want: 'A newer venue in Taipa',
        slug: 'manhao-spa',
        body:
          'Inside the Grandview Hotel, with a prominent presentation hall and newer interiors. It works well for Taipa-based guests who do not need an overnight stay.',
      },
      {
        want: '24-hour access and themed rooms',
        slug: 'the-excellent-sauna',
        body:
          'An operating 24-hour venue with overnight rest and themed rooms. Staff duty hours are narrower than the venue opening hours, so plan arrival time around the current roster.',
      },
      {
        want: 'A newer central-Macau option',
        slug: 'number-nine-sauna',
        body:
          'A 2026 venue with stage lighting, themed rooms and overnight arrangements. Check the current price tier and staff roster before setting a time.',
      },
      {
        want: 'A premium new venue',
        slug: 'empire-sauna',
        body:
          'A newer Macau Peninsula venue with themed suites and overnight facilities. It spans a broad price range, so request a package-specific quote rather than budgeting from the entry figure alone.',
      },
      {
        want: 'A stage-focused visit',
        slug: 'manhao-spa',
        body:
          'The presentation hall is the main reason to shortlist Manhao. Choose it for atmosphere and Taipa convenience, not for overnight rest, which is currently unavailable.',
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
          'The profile explains a quieter, spacious style for future comparison. Victoria Sauna is temporarily closed and is not a current booking option.',
      },
      {
        want: 'Researching KTV and cyber styling',
        slug: 'm-club',
        body:
          'A reference profile for a technology-led KTV and themed-room concept. M CLUB is temporarily closed, so use it for comparison only until operations resume.',
      },
    ],
  },
  tips: {
    heading: 'Seven checks that make the night easier',
    items: [
      'Budget for the total, not just the lowest advertised figure. Ask about the service fee, room upgrades, drinks and add-ons before you confirm.',
      'Separate venue hours from staff duty hours. A venue may be open around the clock while the available roster follows a narrower schedule.',
      'If overnight rest matters, confirm both the venue policy and your package. Ask where you can rest, until what time, and whether a private room costs extra. Manhao Spa and Clube Rio currently do not offer overnight stays.',
      'Choose the area around your itinerary. Macau Peninsula suits many central-city plans; Taipa and Cotai are easier when your hotel and next-day activities are already there.',
      'Check the detail page for a temporary-closure notice, then verify again on the day. An online profile does not guarantee that a venue is accepting guests.',
      'State your preferred language and any non-negotiable preferences early. Availability changes daily, so a clear shortlist is more useful than a promise about one person.',
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
          '入浴設備、食事、紹介ショー、KTV、テーマルーム、休憩スペースは全店共通ではありません。自分が重視するものを1〜2個決め、各店舗ページで実際の設備と利用条件を確認しましょう。',
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
      body: '14店の料金目安、エリア、出勤時間、宿泊条件、設備をまとめて比べたい方はこちら。',
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
          '日付と希望条件を送り、現在営業中の候補を確認します。古い画像や広告だけで判断せず、スタッフの出勤時間、空室、待ち時間の目安も尋ねてください。',
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
        title: '食事と紹介時間を確認する',
        body:
          '食事内容やスタッフ紹介の形式、時間帯は店舗ごとに異なります。その日の提供内容と予定を聞き、決まったショー時間があると思い込まないようにしましょう。',
      },
      {
        title: '個室とサービス内容を確認する',
        body:
          '入室前に、サービス内容、時間、部屋タイプ、追加料金が見積もりと一致しているか確認します。希望と避けたいことをはっきり伝えると、落ち着いて過ごせます。',
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
        want: '大型店舗の仕組みを知りたい',
        slug: 'number-one-sauna',
        body:
          '大型ホール型の流れを知る資料としてご覧いただけます。現在は一時休業中のため、予約可能な第一候補にはできません。',
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
          '24時間営業で宿泊設備、KTV、テーマルームがあります。利用日のラウンジや個室休憩の条件は事前にご確認ください。',
      },
      {
        want: 'テーマルームを選びたい',
        slug: 'east-castle-spa',
        body:
          'シチュエーション型の個室を重視するマカオ半島の店舗。KTVや大型ショーより、部屋の趣向を楽しみたい方向けです。',
      },
      {
        want: 'タイパの新しい店舗へ行きたい',
        slug: 'manhao-spa',
        body:
          'グランドビュー・ホテル内にあり、印象的な紹介ホールと新しい内装が特徴です。宿泊を必要としないタイパ滞在者に向いています。',
      },
      {
        want: '24時間営業とテーマルーム',
        slug: 'the-excellent-sauna',
        body:
          '24時間営業で宿泊休憩とテーマルームに対応しています。店舗営業時間とスタッフ出勤時間は異なるため、到着時刻を先に確認しましょう。',
      },
      {
        want: 'マカオ中心部の新しい店舗',
        slug: 'number-nine-sauna',
        body:
          '2026年開業で、ステージ照明、テーマルーム、宿泊設備があります。料金帯と当日の出勤状況を確認してから時間を決めるのがおすすめです。',
      },
      {
        want: '新しい高価格帯の店舗',
        slug: 'empire-sauna',
        body:
          'テーマスイートと宿泊設備を備えたマカオ半島の新しい店舗。料金幅が広いため、最低価格だけでなく希望コースの総額を確認してください。',
      },
      {
        want: '紹介ホールの雰囲気を重視',
        slug: 'manhao-spa',
        body:
          'マンハオは紹介ホールの雰囲気が大きな特徴です。タイパでのアクセスと舞台感を重視する方向けで、現在は宿泊できません。',
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
          '落ち着いた広めの空間を比較するための参考ページです。現在は一時休業中で、予約は受け付けていません。',
      },
      {
        want: 'KTVと近未来的な内装を比較',
        slug: 'm-club',
        body:
          'KTVとテーマルームを備えた近未来的なコンセプトの参考ページです。現在は一時休業中のため、再開までは比較用としてご覧ください。',
      },
    ],
  },
  tips: {
    heading: '初めての方に役立つ7つの確認',
    items: [
      '広告の最安値ではなく総額で予算を立てましょう。サービス料、部屋変更、飲み物、追加ケアの有無を予約前に確認します。',
      '店舗営業時間とスタッフ出勤時間は別です。24時間営業でも、希望する時間帯に同じ選択肢があるとは限りません。',
      '宿泊が必要なら、店舗の方針と利用コースの両方を確認します。休憩場所、利用期限、個室の追加料金まで聞いておくと安心です。マンハオスパ（曼濠水療）とクラブリオ（利澳薈）は現在宿泊に対応していないため、別の候補をご検討ください。',
      '旅程に合うエリアを選びましょう。市街地の予定が多ければマカオ半島、ホテルや翌日の予定がコタイならタイパ／コタイが便利です。',
      '詳細ページの一時休業表示を確認し、当日も再確認してください。紹介ページがあることと、現在予約できることは同じではありません。',
      '希望言語と譲れない条件は早めに伝えましょう。出勤状況は毎日変わるため、一人を確約するより複数候補を持つ方が現実的です。',
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
          '浴區、餐飲、技師介紹、KTV、主題房及休息區並非間間相同。先選一兩項你最重視的體驗，再細看會所頁面的實際設施與套式內容，比單看宣傳字眼可靠。',
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
      body: '想一次比較 14 間會所的價格、地區、技師時段、過夜規則與設施？',
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
          '把日期和條件傳來，先取得目前營業的候選名單，再問技師當班時段、房間情況及預計等候時間。不要只靠舊截圖或過期優惠作決定。',
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
        title: '了解當晚餐飲與介紹安排',
        body:
          '餐飲供應、技師介紹方式及時段各有不同。到場後先問清楚當晚安排，不要假設每間都有同一餐單或固定走秀時間。',
      },
      {
        title: '入房前確認服務內容',
        body:
          '確認服務項目、時間、房型及附加費與報價一致，再進入私人房間。清楚表達喜好和界線，雙方都會更自在。',
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
        want: '了解大型走秀會所',
        slug: 'number-one-sauna',
        body:
          '介紹頁可用來了解大型會所與大廳流程，但現時暫停營業，不應當作目前可預約的新手首選。',
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
          '澳門半島的 24 小時會所，設過夜安排、KTV 與主題房。指定日期的躺椅及獨立休息房條件應先確認。',
      },
      {
        want: '多款情境主題房',
        slug: 'east-castle-spa',
        body:
          '以場景房為重點的澳門半島選項。若你重視房間設計多於 KTV 或大型舞台，可以列入候選。',
      },
      {
        want: '氹仔較新的會所',
        slug: 'manhao-spa',
        body:
          '位於君怡酒店，介紹大廳醒目、裝修較新。適合住氹仔而且不需要過夜的客人。',
      },
      {
        want: '24 小時與主題房',
        slug: 'the-excellent-sauna',
        body:
          '24 小時營業，設過夜休息與主題房。會所營業時間與技師當班時段不同，應按最新時段安排到場。',
      },
      {
        want: '澳門市區較新選項',
        slug: 'number-nine-sauna',
        body:
          '2026 年開業，設舞台燈光、主題房及過夜安排。先確認當日價格層級與技師情況，再決定時間。',
      },
      {
        want: '較新的高預算會所',
        slug: 'empire-sauna',
        body:
          '澳門半島的新場，設主題套房及過夜安排。價格跨度較大，不要只用入門價做預算，應索取指定套式總價。',
      },
      {
        want: '以舞台氣氛為主',
        slug: 'manhao-spa',
        body:
          '曼濠最值得留意的是介紹大廳。適合重視舞台感和氹仔位置的人，但現階段不可過夜。',
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
          '頁面保留作比較清靜、寬敞路線的資料。凱旋桑拿現時暫停營業，並非當下可預約選項。',
      },
      {
        want: '研究 KTV 與未來感設計',
        slug: 'm-club',
        body:
          '可作 KTV、主題房與未來感風格的比較參考。晉會 M CLUB 現時暫停營業，重開前只宜作資料用途。',
      },
    ],
  },
  tips: {
    heading: '新手最實用的 7 個提醒',
    items: [
      '用總價做預算，不要只看宣傳上的最低數字。套式、服務費、房型升級、飲品及加購項目都要先問清楚。',
      '分清楚會所營業時間與技師當班時段。會所即使 24 小時營業，不同時段可選的陣容也會有差別。',
      '要過夜就同時確認會所政策及所選套式，問明休息位置、可留到幾點，以及獨立房是否另收費。曼濠水療與利澳薈目前不提供過夜，需要留宿請另選會所。',
      '配合旅遊路線揀地區：市中心行程較多可選澳門半島；酒店及翌日活動都在路氹，就以氹仔／路氹為先。',
      '先看詳情頁有沒有暫停營業提示，出發當日再查一次。有介紹頁不等於目前正在接待客人。',
      '及早說明慣用語言與不可妥協的要求。技師情況每天不同，準備幾個合適方向比要求保證某一位實際。',
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
          '浴区、餐饮、技师介绍、KTV、主题房和休息区并不是家家一样。先选一两项你最看重的体验，再查看会所详情页中的实际设施和套餐内容，比只看宣传词更可靠。',
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
      body: '想一次对比 14 家会所的价格、区域、技师时段、过夜规则和设施？',
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
          '把日期和条件发来，先获取当前营业的候选名单，再问技师当班时段、房间情况和预计等待时间。不要只凭旧截图或过期优惠做决定。',
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
        title: '了解当晚餐饮和介绍安排',
        body:
          '餐饮供应、技师介绍方式和时段各不相同。到店后先问清当晚安排，不要默认每家都有同一份菜单或固定走秀时间。',
      },
      {
        title: '进房前确认服务内容',
        body:
          '确认服务项目、时间、房型和附加费与报价一致，再进入独立房间。清楚表达喜好和边界，双方都会更自在。',
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
        want: '了解大型走秀会所',
        slug: 'number-one-sauna',
        body:
          '介绍页可以用来了解大型会所和大厅流程，但目前暂停营业，不应当作现在可以预约的新手首选。',
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
          '澳门半岛的 24 小时会所，提供过夜安排、KTV 和主题房。指定日期的躺椅及独立休息房条件需要提前确认。',
      },
      {
        want: '多种场景主题房',
        slug: 'east-castle-spa',
        body:
          '以场景房为重点的澳门半岛选项。如果你更看重房间设计，而不是 KTV 或大型舞台，可以列入候选。',
      },
      {
        want: '氹仔较新的会所',
        slug: 'manhao-spa',
        body:
          '位于君怡酒店，介绍大厅醒目、装修较新。适合住在氹仔并且不需要过夜的客人。',
      },
      {
        want: '24 小时和主题房',
        slug: 'the-excellent-sauna',
        body:
          '24 小时营业，设有过夜休息和主题房。会所营业时间与技师当班时段不同，应根据最新时段安排到店。',
      },
      {
        want: '澳门市区较新选项',
        slug: 'number-nine-sauna',
        body:
          '2026 年开业，设有舞台灯光、主题房和过夜安排。先确认当天价格档位与技师情况，再决定到店时间。',
      },
      {
        want: '较新的高预算会所',
        slug: 'empire-sauna',
        body:
          '澳门半岛的新场，设有主题套房和过夜安排。价格跨度较大，不要只按入门价做预算，应索取指定套餐总价。',
      },
      {
        want: '以舞台氛围为主',
        slug: 'manhao-spa',
        body:
          '曼濠最值得留意的是介绍大厅。适合看重舞台感和氹仔位置的人，但现阶段不能过夜。',
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
          '页面保留作为安静、宽敞路线的对比资料。凯旋桑拿目前暂停营业，并不是当前可预约选项。',
      },
      {
        want: '了解 KTV 和未来感设计',
        slug: 'm-club',
        body:
          '可作为 KTV、主题房和未来感风格的对比参考。晋会 M CLUB 目前暂停营业，恢复营业前只适合资料查阅。',
      },
    ],
  },
  tips: {
    heading: '新手最实用的 7 个提醒',
    items: [
      '按总价做预算，不要只看宣传中的最低数字。套餐、服务费、房型升级、饮品和加购项目都要提前问清楚。',
      '分清会所营业时间和技师当班时段。会所即使 24 小时营业，不同时段可选的阵容也会有差别。',
      '需要过夜就同时确认会所政策和所选套餐，问清休息位置、能够留到几点，以及独立房是否另外收费。曼濠水疗与利澳荟目前不提供过夜，需要留宿请另选会所。',
      '结合旅行路线选区域：市中心行程较多可以选澳门半岛；酒店和第二天活动都在路氹，就优先考虑氹仔／路氹。',
      '先看详情页有没有暂停营业提示，出发当天再确认一次。有介绍页不等于目前正在接待客人。',
      '尽早说明常用语言和不能妥协的要求。技师情况每天不同，准备几个合适方向比要求保证某一位更实际。',
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
          '욕장, 다이닝, 테라피스트 소개, KTV, 테마룸, 휴게 구역이 모든 매장에서 같지 않습니다. 가장 중시하는 경험 한두 가지를 먼저 정하고, 매장 페이지의 실제 시설과 코스 내용을 자세히 보는 것이 홍보 문구만 보는 것보다 확실합니다.',
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
      body: '14개 매장의 가격, 지역, 테라피스트 시간대, 숙박 규칙, 시설을 한 번에 비교하고 싶으신가요?',
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
          '날짜와 조건을 보내셔서 현재 영업 중인 후보 목록을 먼저 받고, 테라피스트 근무 시간대, 룸 상황, 예상 대기 시간을 물어보세요. 오래된 스크린샷이나 만료된 혜택만 믿고 결정하지 마세요.',
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
        title: '그날 밤의 다이닝과 소개 배치 파악',
        body:
          '다이닝 제공, 테라피스트 소개 방식, 시간대는 매장마다 다릅니다. 도착 후 그날 밤의 배치를 먼저 확인하고, 모든 매장이 같은 메뉴와 고정 쇼 시간을 갖는다고 가정하지 마세요.',
      },
      {
        title: '룸 입장 전 서비스 내용 확인',
        body:
          '서비스 항목, 시간, 룸 타입, 부가 요금이 견적과 일치하는지 확인한 뒤 프라이빗 룸에 들어가세요. 취향과 경계를 명확히 표현하면 양쪽 모두 더 편안합니다.',
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
        want: '대형 쇼 매장 알아보기',
        slug: 'number-one-sauna',
        body:
          '소개 페이지로 대형 매장과 로비 진행 방식을 알아볼 수 있지만, 현재 일시 휴업 중이므로 지금 예약 가능한 초보 추천 매장으로 삼아서는 안 됩니다.',
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
          '마카오 반도의 24시간 매장으로 숙박 배치, KTV, 테마룸이 있습니다. 지정 날짜의 리클라이너와 독립 휴게실 조건은 먼저 확인해야 합니다.',
      },
      {
        want: '다양한 시추에이션 테마룸',
        slug: 'east-castle-spa',
        body:
          '테마룸을 중심으로 하는 마카오 반도의 선택지입니다. KTV나 대형 무대보다 룸 디자인을 중시한다면 후보에 넣으세요.',
      },
      {
        want: '타이파의 비교적 새로운 매장',
        slug: 'manhao-spa',
        body:
          '그랜드뷰 호텔에 위치하며, 인상적인 소개 홀과 비교적 새로운 인테리어를 갖췄습니다. 타이파에 묵으며 숙박이 필요 없는 손님에게 적합합니다.',
      },
      {
        want: '24시간 영업과 테마룸',
        slug: 'the-excellent-sauna',
        body:
          '24시간 영업으로 야간 휴식과 테마룸이 있습니다. 매장 영업시간과 테라피스트 근무 시간대가 다르므로 최신 시간대에 맞춰 방문하세요.',
      },
      {
        want: '마카오 시내의 비교적 새로운 선택지',
        slug: 'number-nine-sauna',
        body:
          '2026년 오픈으로 무대 조명, 테마룸, 숙박 배치를 갖췄습니다. 당일 가격 등급과 테라피스트 상황을 먼저 확인한 뒤 시간을 정하세요.',
      },
      {
        want: '비교적 새로운 고예산 매장',
        slug: 'empire-sauna',
        body:
          '마카오 반도의 신규 매장으로 테마 스위트와 숙박 배치가 있습니다. 가격 폭이 크므로 입문가만으로 예산을 잡지 말고, 지정 코스 총액을 받아보세요.',
      },
      {
        want: '무대 분위기 중심',
        slug: 'manhao-spa',
        body:
          '만하오에서 가장 주목할 점은 소개 홀입니다. 무대 감각과 타이파 위치를 중시하는 분께 적합하지만, 현 단계에서는 숙박이 불가능합니다.',
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
          '조용하고 넓은 시설을 선호할 때 참고할 비교 자료로 페이지가 유지됩니다. 빅토리아 사우나는 현재 일시 휴업 중으로, 지금 예약 가능한 선택지가 아닙니다.',
      },
      {
        want: 'KTV와 미래감각 디자인 알아보기',
        slug: 'm-club',
        body:
          'KTV, 테마룸, 미래감각 스타일의 비교 참고로 활용하세요. M 클럽은 현재 일시 휴업 중이므로 재개 전까지 자료 용도로만 적합합니다.',
      },
    ],
  },
  tips: {
    heading: '초보에게 가장 실용적인 7가지 조언',
    items: [
      '총액으로 예산을 잡고, 홍보의 최저 숫자만 보지 마세요. 코스, 서비스 요금, 룸 타입 업그레이드, 음료, 추가 항목을 미리 확인하세요.',
      '매장 영업시간과 테라피스트 근무 시간대를 구분하세요. 매장이 24시간 영업이어도 시간대별로 선택 가능한 라인업이 다릅니다.',
      '숙박이 필요하면 매장 정책과 선택 코스를 함께 확인하고, 휴식 위치, 몇 시까지 머물 수 있는지, 독립룸 별도 요금 여부를 물어보세요. 만하오 스파와 클루브 리오는 현재 숙박을 제공하지 않으니 숙박이 필요하면 다른 매장을 선택하세요.',
      '여행 동선에 맞춰 지역을 고르세요: 시내 일정이 많다면 마카오 반도, 호텔과 다음 날 일정이 모두 코타이라면 타이파/코타이 우선.',
      '상세 페이지에 일시 휴업 안내가 있는지 먼저 보고, 출발 당일에 한 번 더 확인하세요. 소개 페이지가 있다고 해서 현재 손님을 받고 있는 것은 아닙니다.',
      '사용 언어와 양보할 수 없는 조건을 일찍 알려주세요. 테라피스트 상황은 매일 달라지므로, 한 명을 확정받기보다 여러 적합한 방향을 준비하는 편이 현실적입니다.',
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

export const getGuideCopy = createPageCopy(guideCopy);
