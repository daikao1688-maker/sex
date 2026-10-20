import type { Locale } from '../config';
import { formatVenueCount } from '../venueVisibility';
import { createPageCopy, type Crumb } from './helpers';

export interface FaqCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  backHome: string;
  heading: string;
  intro: string;
  /** Answers are HTML; `{base}` expands to the locale prefix, e.g. "/en". */
  categories: Array<{
    title: string;
    items: Array<{ question: string; answer: string }>;
  }>;
  cta: { headingLead: string; headingAccent: string; body: string };
}

const en: FaqCopy = {
  meta: {
    title: 'FAQ - Macau Sauna',
    description: 'Macau sauna FAQ: pricing, safety, hours, overnight stays, payment methods and practical info',
  },
  breadcrumbs: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'FAQ',
      path: '/faq/',
    },
  ],
  backHome: 'Back to Home',
  heading: 'FAQ',
  intro: 'Macau sauna FAQ: pricing, safety, hours, overnight stays, payment methods and practical info',
  categories: [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'What is a Macau sauna?',
          answer: 'A Macau sauna is a modern entertainment venue combining spa facilities, dining, and leisure. All legitimate venues hold valid licences issued by the Macao Government Tourism Office (MGTO). They offer bathing facilities, complimentary dining, and professional massage. Most venues allow stays of 12-15 hours, including overnight.',
        },
        {
          question: 'Are Macau saunas safe and legal?',
          answer: 'Yes. All mainstream Macau saunas hold a license issued by the Macao Government Tourism Office (MGTO) and undergo regular health, fire, and safety inspections — the same regulatory framework as casinos. You can verify any venue\'s license on the MGTO website.',
        },
        {
          question: 'What should I do for my first visit?',
          answer: 'Contact us first! We’ll recommend the best venue based on your preferences, arrange complimentary transport, and get you exclusive pricing. Walking in alone may mean a 1-2 hour wait and higher prices.',
        },
      ],
    },
    {
      title: 'Pricing & Payment',
      items: [
        {
          question: 'How much does it cost?',
          answer: "Prices depend on the venue, massage treatment, duration and facilities included. Ask for an itemized quote for the treatment you want, including any service charge, taxes and optional extras. Confirm the total before booking.",
        },
        {
          question: 'How can I confirm what is included in a package?',
          answer: 'Before booking, ask the venue to confirm the included services, their duration, and the total price. Check whether service charges and optional extras are included. Refer to the itemized quote provided by the venue at the time of booking.',
        },
        {
          question: 'Are there hidden fees?',
          answer: 'Some venues add a service charge of 10-15%. Before booking, confirm what your package includes, which extras are charged separately and the itemized total with the venue.',
        },
        {
          question: 'Can I pay by card?',
          answer: 'Yes. Most venues accept Visa, Mastercard, UnionPay, cash (MOP/HKD), Alipay, WeChat Pay, and Apple Pay. Tip: paying in MOP cash saves 1-3% on exchange fees.',
        },
      ],
    },
    {
      title: 'Practical Info',
      items: [
        {
          question: 'What are the operating hours?',
          answer: 'Yu Sauna, Empire, Shang Pin, Number Nine, Majesty and The Excellent are publicly listed as running 24 hours. Manhao opens 14:00–04:00. Yu Sauna lists therapist hours of 13:00–06:00, while shifts at other venues vary — see each venue page, or we\'ll confirm when you book.',
        },
        {
          question: "When is a quieter time to visit?",
          answer: "The afternoon, around 3–6 PM, is generally quieter. Crowding and treatment availability vary by venue and date, so confirm your preferred arrival time before travelling.",
        },
        {
          question: "How long is a massage treatment?",
          answer: "Duration varies by venue and treatment. Before booking, confirm the type of massage, its actual duration, what the package includes and the total price. Use the treatment details confirmed by the venue when planning your visit.",
        },
        {
          question: 'Can I stay overnight?',
          answer: 'At most mainstream saunas, yes — Empire, Shang Pin, Number Nine and Majesty all offer overnight stays (typically 12-15 hours) with free reclining chairs, meals, and bathing facilities. <a class="text-gold hover:underline" href="{base}/spa/majesty-spa/">Majesty Spa</a> is open 24 hours with a comfortable recliner lounge (paid private rest rooms in peak season) — the best choice for overnight. The Excellent also allows overnight stays in its 24-hour rest area. Manhao does not offer overnight stays.',
        },
        {
          question: 'Can I store luggage?',
          answer: 'Yes. All venues provide free luggage storage with secure lockers in the changing room.',
        },
        {
          question: 'Is food available?',
          answer: 'Yes — completely free and unlimited. The menu spans premium steak, fresh seafood, slow-simmered Cantonese soups, Sichuan-style stir-fries, fried rice, fried noodles, fresh fruit, beer, soft drinks, and snacks. The cuisine leans Hong Kong / Cantonese with Sichuan accents, and Taiwan visitors find it very accessible — many regulars say the steak and fried rice rival outside restaurants. Some venues also serve abalone and fish maw at no extra charge.',
        },
        {
          question: "Can I request help in my preferred language?",
          answer: "Tell us which language you use when you enquire. We can help check whether a venue can explain its facilities, massage treatments and prices in that language. Language support depends on the venue and time of visit; please confirm it before booking.",
        },
        {
          question: 'Is the return ride free too?',
          answer: 'Yes — pickup and return are both included at zero cost. Just text us when you\'re ready to leave (after your meal, right after your service, anytime) and we\'ll send the same private car to take you back to your hotel, the airport, the ferry terminal, or anywhere in Macau.',
        },
      ],
    },
    {
      title: 'Why Contact Us',
      items: [
        {
          question: 'Why should I book through you?',
          answer: "We offer exclusive partner pricing, complimentary 7-seater private car pickup and return anywhere in Macau, 2 complimentary VIP Extras of your choice, priority entry, current venue information and recommendations based on your budget, location, facilities and massage needs.",
        },
        {
          question: 'Can I cancel last minute?',
          answer: 'Yes — free cancellation, no deposit required.',
        },
        {
          question: 'What are the extra services?',
          answer: 'Every booking through us includes 2 complimentary VIP Extras — pick from back scrub, leg massage, head massage, reflexology, manicure, pedicure, hand massage, and ear cleaning. We let the venue know you\'re coming — simply pick what you want on arrival.',
        },
      ],
    },
    {
      title: 'Massage & Treatments',
      items: [
        {
          question: 'Do Macau saunas include a massage?',
          answer: "Yes. Bookings through us include a choice of 2 complimentary treatments, such as back scrub, foot massage (reflexology), head massage or hand massage, which are normally charged separately. Confirm the available treatment, duration and package details with the venue before booking.",
        },
        {
          question: 'What massages and treatments are included free?',
          answer: 'Each booking lets you pick 2 free: back scrub, leg massage, head massage, foot massage, hand massage, manicure, pedicure and ear cleaning. These are normally charged separately (around 200–298 MOP each) but are complimentary when you book through us. The full list is on our ranking page.',
        },
        {
          question: 'Is there a foot massage / reflexology?',
          answer: 'Yes — foot massage (reflexology) is one of the free VIP treatments. Pressure-point work revives tired feet, perfect after a bath or sauna. Just tell us when you book and we\'ll have the venue ready for you.',
        },
        {
          question: 'Can I get a full-body massage?',
          answer: 'Yes. We can help you find a suitable venue.',
        },
        {
          question: 'Is this a spa or a sauna? What\'s the difference?',
          answer: 'In Macau, "sauna" and "spa" usually mean the same kind of all-in-one club — bathing, dry and wet steam, dining, massage treatments and, at some venues, overnight rest in one place. Our directory covers {venueCount} venue profiles, including temporarily closed locations; always reconfirm the operator, licence and current status before visiting.',
        },
      ],
    },
  ],
  cta: {
    headingLead: 'Still Have Questions',
    headingAccent: '?',
    body: 'Contact us anytime — happy to help',
  },
};

const ja: FaqCopy = {
  meta: {
    title: 'マカオサウナ よくある質問（FAQ）｜料金・営業時間・日本語・送迎・予約の疑問を解決',
    description: 'マカオ サウナのよくある質問。料金・値段、営業時間、日本語対応、無料送迎、宿泊（24時間）、初めてでも安心して遊べる流れまで、気になる疑問をマカオ・サウナ・ガイドがまとめて解決します。',
  },
  breadcrumbs: [
    {
      name: 'ホーム',
      path: '/',
    },
    {
      name: 'よくある質問',
      path: '/faq/',
    },
  ],
  backHome: 'トップページに戻る',
  heading: 'マカオサウナ よくある質問（FAQ）',
  intro: 'マカオ サウナのよくある質問。料金・値段、営業時間、日本語対応、無料送迎、宿泊（24時間）、初めてでも安心して遊べる流れまで、気になる疑問をマカオ・サウナ・ガイドがまとめて解決します。',
  categories: [
    {
      title: '初めての方へ',
      items: [
        {
          question: 'マカオ サウナ（桑拿）とはどんな施設ですか？',
          answer: 'マカオ サウナ（桑拿）は、スパ、食事、休憩を一か所で楽しめる現代的な娯楽施設です。正規店はすべてマカオ観光局（MGTO）が発行する有効な営業ライセンスを取得しています。入浴設備、無料の食事、専門のマッサージを提供しており、多くの店舗では12〜15時間滞在でき、夜を越して休むこともできます。',
        },
        {
          question: 'マカオ サウナは合法ですか？安全性や口コミは？',
          answer: 'はい、完全に合法です。正規のマカオ サウナはすべてマカオ観光局（MGTO）のライセンスの下で営業しており、衛生・消防・安全面の検査も定期的に実施されています——管理体制はカジノと同レベルと考えていただいて構いません。ライセンスの有無はMGTO公式サイトでいつでも照会可能です。口コミでも「安心して遊べた」という声が多く、日本語対応・無料送迎付きなので、一人旅の方や初めての方にも選ばれています。',
        },
        {
          question: '初めてのマカオ サウナ、どう遊べばいいですか？',
          answer: '一番かんたんな方法は、LINEでひと言ご相談いただくことです。日本語でご希望を伺い、ランキングの中からベストなお店をご提案、無料送迎の手配と会員限定価格のご案内までまとめて対応します。もちろんお一人様も大歓迎。なお予約なしで直接お店へ向かうと、混雑時は1〜2時間待ちになったり、当日料金で割高になったりしがちなのでご注意ください。',
        },
        {
          question: '日本語は通じますか？日本語だけで大丈夫？',
          answer: "当サイトのLINEは日本語に対応しており、店舗選び、料金の確認、送迎の手配を日本語でご相談いただけます。ご希望のマッサージ、予算、設備、必要な言語サポートを事前にお知らせください。館内での日本語対応は店舗や時間帯によって異なるため、予約時に確認します。",
        },
        {
          question: '一人で行っても大丈夫ですか？',
          answer: "もちろんです。お一人での来店もご相談いただけます。LINEで店舗や利用内容を確認し、送迎をご希望の場合は乗車場所と時間を決めます。到着後はスタッフの案内に沿って受付を済ませ、入浴、食事、マッサージ、休憩をご自分のペースでお楽しみください。",
        },
        {
          question: '予約なしで直接お店に行ってもいいですか？',
          answer: '直接のご来店も可能ですが、おすすめはしません。混雑する時間帯は1〜2時間ほど待つことがあり、料金も当日現地払いのほうが割高になりがちです。LINEで事前にご一報いただくだけで、会員限定の特別価格・優先入場・無料送迎がすべて付きます。前金不要・直前キャンセル無料なので、予定が未定でもまずお気軽にどうぞ。',
        },
        {
          question: 'マカオ サウナはどの店がおすすめですか？',
          answer: "おすすめは、ご予算、エリア、設備、希望するマッサージ、宿泊休憩の要否によって変わります。当サイトでは{venueCount}店舗の情報と休業状況を整理しています。LINEで条件をお知らせいただければ、営業中の候補をご案内します。料金、営業状況、許可情報は来店前にあらためてご確認ください。",
        },
      ],
    },
    {
      title: '料金・お支払い',
      items: [
        {
          question: '料金・値段の相場はどれくらいですか？',
          answer: "料金は店舗、マッサージの種類と時間、利用する設備やプランによって異なります。ご希望の施術について、サービス料・税金・追加項目を含む明細付きの見積もりを取り、予約前に総額をご確認ください。",
        },
        {
          question: 'プランに含まれる内容はどう確認すればよいですか？',
          answer: 'ご予約前に、プランに含まれる項目、それぞれの所要時間、総額を店舗にご確認ください。サービス料や追加オプションが別料金かどうかも確認しましょう。具体的な内容は、予約時に店舗が提示する明細付きの見積もりをご確認ください。',
        },
        {
          question: '追加料金や隠れた費用が発生することはありますか？',
          answer: '店舗によっては10〜15%のサービス料が加算されます。予約前に、プランに含まれる項目、別料金になるもの、明細を含めた総額を店舗に確認してください。',
        },
        {
          question: 'クレジットカードや電子マネーで支払えますか？',
          answer: '支払えます。大半のマカオ サウナで Visa・Mastercard・銀聯のカード類に加え、Alipay・WeChat Pay・Apple Pay、そして現金（マカオパタカ／香港ドル）に対応しています。ちなみに、マカオパタカの現金払いを選ぶと為替手数料が1〜3%浮くため、少しでも料金を抑えたい方には現金がおすすめです。',
        },
        {
          question: '日本円はそのまま使えますか？両替は必要？',
          answer: '日本円の現金がそのまま使えるお店はほとんどありません。ただし Visa・Mastercard・銀聯・Alipay・WeChat Pay・Apple Pay が使えるため、両替なしでも問題なく遊べます。現金派の方は MOP（マカオ・パタカ）または香港ドルへの両替を——MOP現金払いなら為替手数料を1〜3%節約できて一番お得です。両替は国境ゲートやホテルのATMで可能です。',
        },
      ],
    },
    {
      title: '営業時間・実用情報',
      items: [
        {
          question: '営業時間を教えてください。何時に行くのがいい？',
          answer: 'YU SAUNA・巨亨・尚品・玖号・尊貴・極品は公開情報で24時間営業と案内されています。曼濠は14:00〜翌4:00です。YU SAUNAのスタッフ対応時間は13:00〜翌6:00で、その他の店舗も勤務時間帯が異なります。詳細は各店舗ページをご確認いただくか、ご予約時にご案内します。',
        },
        {
          question: "比較的落ち着いて利用できる時間帯はいつですか？",
          answer: "午後15〜18時は比較的空いている傾向があります。ただし、混雑状況と施術の予約枠は店舗や日程によって異なるため、来店前に希望する時間帯の状況をご確認ください。",
        },
        {
          question: "マッサージの施術時間はどのくらいですか？",
          answer: "施術時間は店舗とメニューによって異なります。予約前に、マッサージの種類、実際の施術時間、プランに含まれる項目、総額をご確認ください。利用計画は、店舗が確認した施術内容をもとにお立てください。",
        },
        {
          question: 'そのまま宿泊することはできますか？',
          answer: '多くの店で可能です——巨亨・尚品・玖号・尊貴は12〜15時間の滞在・宿泊ができ、リクライニングチェア、お食事、バスエリアはそのまま無料で使えます。とりわけマジェスティスパ（尊貴水療）は24時間営業でラウンジが快適（繁忙期は有料個室もあり）なので、宿泊が目的なら第一候補です。極品も24時間利用できる休憩エリアで宿泊可能です。なお曼濠は宿泊不可です。',
        },
        {
          question: 'スーツケースなどの荷物は預けられますか？',
          answer: '預けられます。マカオ サウナは全店舗でスーツケース等の大型荷物を無料でお預かりしているほか、ロッカールームには鍵付きのセキュリティロッカーも完備しています。空港・フェリーターミナルから無料送迎で直行し、手ぶらのまま宿泊（24時間利用）まで済ませる——そんな使い方もできるので、当日のマカオ観光プランとも柔軟に組み合わせられます。',
        },
        {
          question: '館内での食事は無料ですか？どんなメニューがありますか？',
          answer: '館内ダイニングは全品無料・食べ放題で、追加料金は一切かかりません。ラインナップは厳選ステーキ、新鮮なシーフード、広東式の煮込みスープ、四川風の炒め物、チャーハン、焼きそば、フルーツ、ビール・ソフトドリンク、軽食まで幅広くそろっています。香港・広東ベースに四川のアクセントを効かせた味付けは日本人の舌にもよく合い、口コミでは「ステーキとチャーハンは外のレストラン級」との評判も。店舗によってはアワビやフカヒレといった高級食材まで、追加料金なしで楽しめます。',
        },
        {
          question: "希望する言語で案内を受けられますか？",
          answer: "お問い合わせの際に、ご希望の言語をお知らせください。設備、マッサージの内容、料金について、その言語で案内を受けられるか店舗に確認します。対応状況は店舗や利用時間によって異なるため、予約前にご確認ください。",
        },
        {
          question: '帰りも無料で送ってもらえますか？',
          answer: 'もちろんです。マカオ サウナの送迎は往路だけでなく復路も無料。お食事のあとでも、サービスの直後でも、宿泊明けでも、タイミングはいつでも構いません。LINEでメッセージをいただければ、同じ7人乗りの私人専車がホテル・空港・フェリーターミナルをはじめ、マカオ市内のご希望の場所までお送りします。',
        },
        {
          question: '空港やフェリーターミナルからも無料送迎してもらえますか？',
          answer: 'はい。無料送迎はマカオ内どこでも対応しています——マカオ国際空港、タイパ／外港（アウターハーバー）の各フェリーターミナル、コタイのホテル・カジノ、マカオ半島のどこからでも、7人乗りの私人専車がお迎えに上がります。香港からフェリーでお越しの場合も、到着ターミナルからそのまま乗車OK。もちろん帰りの送迎も無料です。',
        },
        {
          question: 'カジノや観光の合間に利用できますか？深夜でも大丈夫？',
          answer: "観光の合間や深夜のご利用も、店舗の営業時間と施術の予約枠が合えば可能です。店舗が24時間営業でも、すべてのマッサージを終日受けられるとは限りません。希望する日時と施術内容を予約前にご確認ください。無料送迎と宿泊休憩の利用条件も店舗ごとに異なります。",
        },
      ],
    },
    {
      title: 'お問い合わせのメリット',
      items: [
        {
          question: 'LINEで手配してもらうと何がお得なのですか？',
          answer: "LINEでは、提携特別価格、マカオ市内全域の無料往復送迎、選べる無料VIP特典2つ、優先入場、店舗の最新情報をご案内します。ご予算、エリア、設備、希望するマッサージの内容に合わせて店舗をご提案し、日本語で予約や宿泊休憩の相談に対応します。",
        },
        {
          question: '予約後のキャンセルは可能ですか？',
          answer: '可能です。マカオ サウナのご予約は直前であっても無料でキャンセルでき、前金（デポジット）もかかりません。ご予定が変わったらLINEでひと言送っていただくだけでOK。気軽に相談して気軽に変更できる体制なので、旅程が固まっていない段階でも安心してお問い合わせください。',
        },
        {
          question: '無料でもらえるVIP特典にはどんなものがありますか？',
          answer: '当サイト経由でお問い合わせいただいたお客様には、マカオ サウナのVIP特典を2つ無料でプレゼントしています。選択肢は背中のアカスリ／脚・太ももマッサージ／ヘッドマッサージ／足ツボ（足裏マッサージ）／マニキュア／ペディキュア／ハンドマッサージ／耳かきの8種類。どれも通常は別料金の施術なので、料金面のメリットは小さくありません。ご来店予定は店舗へ事前に申し送りしておくため、当日は着いてからお好きな特典を選ぶだけ。日本語対応・無料送迎で、初めての方もスムーズです。',
        },
        {
          question: 'LINEでの予約・手配はどんな流れですか？',
          answer: "①LINEで友だち追加 → ②日時、ご予算、エリア、希望する設備とマッサージ、必要な言語サポートを送信 → ③営業中の候補、施術内容、所要時間、総額、予約可能な時間を確認 → ④店舗を決め、送迎をご希望の場合は乗車場所と時間を確定します。前金は不要で、直前キャンセルも無料です。",
        },
      ],
    },
    {
      title: 'マッサージ・施術',
      items: [
        {
          question: 'マッサージも料金に含まれていますか？',
          answer: "当サイト経由の予約では、通常は別料金の背中のアカスリ、足裏マッサージ、ヘッドマッサージ、ハンドマッサージなどから2項目を無料特典としてお選びいただけます。対象となる施術、所要時間、プランの内容は予約前に店舗へご確認ください。",
        },
        {
          question: '無料施術のラインナップを教えてください',
          answer: '毎回のご来店ごとに、背中のアカスリ／脚・太ももマッサージ／ヘッドマッサージ／足裏マッサージ／ハンドマッサージ／マニキュア／ペディキュア／耳かきの中から、お好きな2項目を無料でご利用いただけます。通常はどれも1項目あたり約 200–298 MOP の有料メニューですが、当サイト経由なら無料特典として付いてきます。全ラインナップは「サウナおすすめランキング」ページにまとめています。',
        },
        {
          question: '足ツボ・足裏マッサージは受けられますか？',
          answer: '受けられます。マカオ サウナの足裏マッサージ（足ツボ）は、当サイト経由なら無料VIP特典の1つとして選べます（通常は別料金のメニューです）。ツボをしっかり刺激して歩き疲れた足をリセットでき、入浴やサウナのあととの相性も抜群。ご希望の場合はお問い合わせ時に一言添えていただければ、店舗側が事前に準備を整えておきます。日本語対応・無料送迎なので、初めての方も安心です。',
        },
        {
          question: '全身をしっかりほぐしてもらうことはできますか？',
          answer: 'できます。ご希望に合う店舗をご案内します。',
        },
        {
          question: 'スパ（水療）とサウナ（桑拿）はどう違うのですか？',
          answer: 'マカオでは、「サウナ（桑拿）」と「スパ（水療）」が、入浴、ドライ／スチームサウナ、食事、施術、店舗によっては宿泊休憩までをまとめた施設を指すことがあります。日本の一般的なサウナ施設とは内容が異なります。当サイトは一時休業中を含む{venueCount}店舗を掲載しています。営業状況、料金、営業許可、送迎条件は変わるため、来店前に最新情報をご確認ください。',
        },
      ],
    },
  ],
  cta: {
    headingLead: 'まだ疑問がありますか',
    headingAccent: '?',
    body: 'LINEで問い合わせ・無料送迎。日本語対応スタッフがいつでもお答えします',
  },
};

const zhTW: FaqCopy = {
  meta: {
    title: '常見問題 - 澳門桑拿',
    description: '澳門桑拿常見問題解答：價格、安全、營業時間、過夜、付款方式等實用資訊',
  },
  breadcrumbs: [
    {
      name: '首頁',
      path: '/',
    },
    {
      name: '常見問題',
      path: '/faq/',
    },
  ],
  backHome: '返回首頁',
  heading: '常見問題',
  intro: '澳門桑拿常見問題解答：價格、安全、營業時間、過夜、付款方式等實用資訊',
  categories: [
    {
      title: '新手入門',
      items: [
        {
          question: '澳門桑拿是什麼？',
          answer: '澳門桑拿是集水療、餐飲與休閒於一體的現代化娛樂會所，所有正規場所均持有澳門旅遊局（MGTO）核發的合法執照。提供沐浴設施、免費餐飲、專業按摩，大部分場所可逗留 12-15 小時，亦可過夜。',
        },
        {
          question: '澳門桑拿安全合法嗎？',
          answer: '合法。所有正規澳門桑拿均持有旅遊局發出的「蒸汽浴及按摩場所准照」，定期接受衛生、消防及安全檢查，監管制度與賭場同級。可於澳門旅遊局官網查核任何場所的牌照狀態。',
        },
        {
          question: '第一次去應該怎麼做？',
          answer: '先聯繫我們！我們會根據你的喜好推薦最適合的場所，安排免費接送，並為你爭取專屬優惠價。自行前往可能需要等候1-2小時，且價格較高。',
        },
      ],
    },
    {
      title: '價格與付款',
      items: [
        {
          question: '大概要花多少錢？',
          answer: "費用因場所、按摩項目、時長及套餐包含的設施而異。請按想預約的按摩項目索取明細報價，確認服務費、稅項及自選項目是否另收費，並在預約前核對總價。",
        },
        {
          question: '如何確認套餐包含哪些項目？',
          answer: '預約前，請向場所確認套餐包含的項目、各項目時長及總價，並核對服務費和其他自選項目是否另行收費。具體內容以場所當時提供的明細報價為準。',
        },
        {
          question: '有隱藏收費嗎？',
          answer: '部分場所另收 10-15% 服務費。預約前，請向場所確認套餐包含哪些項目、哪些自選項目需另付費，並索取包含各項費用的總價。',
        },
        {
          question: '可以刷卡嗎？',
          answer: '可以。大部分場所接受 Visa、Mastercard、銀聯、現金（澳門幣/港幣）、支付寶、微信支付、Apple Pay。小提示：使用澳門幣現金可節省1-3%匯率手續費。',
        },
      ],
    },
    {
      title: '實用資訊',
      items: [
        {
          question: '營業時間？',
          answer: '八湯御、巨亨、尚品、玖號、尊貴與極品的公開資料標示 24 小時營業；曼濠為 14:00–04:00。八湯御技師時段為 13:00–06:00，其他場館亦有不同當班時段，詳情見各場館頁面，或預約時由專人確認。',
        },
        {
          question: "什麼時段比較清靜？",
          answer: "下午 3–6 點通常較為清靜。不過，人流及按摩預約時段會因場所和日期而異，出發前請先確認希望到訪的時間。",
        },
        {
          question: "按摩項目需要多久？",
          answer: "時長視乎場所及所選按摩項目。預約前，請確認按摩類型、實際時長、套餐包含內容及總價，並以場所確認的療程安排為準。",
        },
        {
          question: '可以過夜嗎？',
          answer: '大部分主流桑拿可以——巨亨、尚品、玖號與尊貴均設過夜（一般可逗留 12-15 小時），免費使用躺椅、餐飲、沐浴設施。尊貴水療 24 小時營業、大堂躺椅舒適（旺季另設付費獨立休息房），是過夜首選。極品亦可在 24 小時休息區過夜；曼濠不設過夜留宿。',
        },
        {
          question: '能寄存行李嗎？',
          answer: '可以。所有場所均提供免費行李寄存，更衣室設有安全儲物櫃。',
        },
        {
          question: '裡面有吃的嗎？',
          answer: '有。全部免費、無限量供應。餐飲包含精選牛排、新鮮海鮮、粵式燉湯、川式精緻小炒、炒飯、炒麵、新鮮水果、啤酒、汽水、小食。口味偏港式／粵式，並融合川菜風味，對台灣旅客來說都很好接受——很多老饕說澳門桑拿的牛排和炒飯水準不輸外面餐廳。部分場所還有鮑魚、花膠魚翅、燕窩、牛鞭湯等高級菜餚，無需額外收費。',
        },
        {
          question: "可以使用我熟悉的語言溝通嗎？",
          answer: "查詢時告訴我們你的慣用語言，我們可協助確認場所能否以該語言說明設施、按摩項目及收費。語言支援因場所和到訪時段而異，請在預約前確認。",
        },
        {
          question: '回程也免費嗎？',
          answer: '是的——接送與回程同樣免費。完成後（餐飲後、服務後或任何時候）發訊息給我們，我們會派同一輛私人專車送您回酒店、機場、碼頭或澳門任何地點。',
        },
      ],
    },
    {
      title: '為什麼聯繫我們',
      items: [
        {
          question: '為什麼要透過你們預約？',
          answer: "我們提供專屬合作價、澳門全境免費私人專車接送與回程、2 項自選 VIP 尊享、優先入場及最新場館資訊，並按你的預算、地點、設施和按摩需求推薦合適場所。",
        },
        {
          question: '可以臨時取消嗎？',
          answer: '可以，免費取消，無需預付訂金。',
        },
        {
          question: 'VIP 尊享有哪些？',
          answer: '透過我們預約可獲 2 項 VIP 尊享——可任選擦背服務、腿部按摩、頭部按摩、足底按摩、修手指甲、修腳指甲、手部按摩、採耳。我們會事先通知場地您的到訪，到場時可直接挑選。',
        },
      ],
    },
    {
      title: '按摩與服務',
      items: [
        {
          question: '澳門桑拿有按摩服務嗎？',
          answer: "有。透過我們預約可任選 2 項免費護理，包括擦背服務、足底按摩、頭部按摩或手部按摩等，這些項目平時需另行收費。可選項目、時長及套餐內容，請在預約前向場所確認。",
        },
        {
          question: '預約包含哪些免費按摩與護理項目？',
          answer: '每次預約可免費任選 2 項，包括擦背服務、腿部按摩、頭部按摩、足底按摩、手部按摩、修手指甲、修腳指甲及採耳。平時這些都需單獨收費（約 200–298 MOP），透過我們預約則免費贈送。完整清單可在「桑拿排名」頁查看。',
        },
        {
          question: '有提供足底按摩（足療）嗎？',
          answer: '有，足底按摩（足療）是免費 VIP 項目之一，透過穴位按壓喚醒疲憊雙足，泡完澡或桑拿後做最對症。預約時告訴我們，我們會請場所為你準備。',
        },
        {
          question: '可以做全身按摩嗎？',
          answer: '可以。我們會為你配對合適的場所。',
        },
        {
          question: '這是 spa（水療）還是桑拿？有什麼分別？',
          answer: '在澳門，「桑拿」與「水療（spa）」通常指結合沐浴、乾濕蒸、餐飲、按摩護理，以及部分場所的過夜休息設施，並非單純的三溫暖或單項按摩店。本站收錄 {venueCount} 間場所，當中包括暫停營業的舊場資料；營業狀態、營運方及牌照資訊均應在到訪前再次確認。',
        },
      ],
    },
  ],
  cta: {
    headingLead: '仍有疑問',
    headingAccent: '?',
    body: '歡迎隨時聯繫我們，專人為您解答',
  },
};

const zhCN: FaqCopy = {
  meta: {
    title: '常见问题 - 澳门桑拿',
    description: '澳门桑拿常见问题解答：价格、安全、营业时间、过夜、付款方式等实用资讯',
  },
  breadcrumbs: [
    {
      name: '首页',
      path: '/',
    },
    {
      name: '常见问题',
      path: '/faq/',
    },
  ],
  backHome: '返回首页',
  heading: '常见问题',
  intro: '澳门桑拿常见问题解答：价格、安全、营业时间、过夜、付款方式等实用资讯',
  categories: [
    {
      title: '新手入门',
      items: [
        {
          question: '澳门桑拿是什么？',
          answer: '澳门桑拿是集水疗、餐饮与休闲于一体的现代化娱乐会所，所有正规场所均持有澳门旅游局（MGTO）核发的合法执照。提供沐浴设施、免费餐饮、专业按摩，大部分场所可逗留 12-15 小时，亦可过夜。',
        },
        {
          question: '澳门桑拿安全合法吗？',
          answer: '合法。所有正规澳门桑拿均持有旅游局发出的「蒸汽浴及按摩场所准照」，定期接受卫生、消防及安全检查，监管制度与赌场同级。可于澳门旅游局官网查核任何场所的牌照状态。',
        },
        {
          question: '第一次去应该怎么做？',
          answer: '先联系我们！我们会根据你的喜好推荐最适合的场所，安排免费接送，并为你争取专属优惠价。自行前往可能需要等候1-2小时，且价格较高。',
        },
      ],
    },
    {
      title: '价格与付款',
      items: [
        {
          question: '大概要花多少钱？',
          answer: "费用因场所、按摩项目、时长及套餐包含的设施而异。请按想预约的按摩项目索取明细报价，确认服务费、税项及自选项目是否另收费，并在预约前核对总价。",
        },
        {
          question: '如何确认套餐包含哪些项目？',
          answer: '预约前，请向场所确认套餐包含的项目、各项目时长及总价，并核对服务费和其他自选项目是否另行收费。具体内容以场所当时提供的明细报价为准。',
        },
        {
          question: '有隐藏收费吗？',
          answer: '部分场所另收 10-15% 服务费。预约前，请向场所确认套餐包含哪些项目、哪些自选项目需另付费，并索取包含各项费用的总价。',
        },
        {
          question: '可以刷卡吗？',
          answer: '可以。大部分场所接受 Visa、Mastercard、银联、现金（澳门币/港币）、支付宝、微信支付、Apple Pay。小提示：使用澳门币现金可节省1-3%汇率手续费。',
        },
      ],
    },
    {
      title: '实用资讯',
      items: [
        {
          question: '营业时间？',
          answer: '八汤御、巨亨、尚品、玖号、尊贵与极品的公开资料标注 24 小时营业；曼濠为 14:00–04:00。八汤御技师时段为 13:00–06:00，其他场馆也有不同当班时段，详情见各场馆页面，或预约时由专人确认。',
        },
        {
          question: "什么时段比较清静？",
          answer: "下午 3–6 点通常较为清静。不过，人流及按摩预约时段会因场所和日期而异，出发前请先确认希望到访的时间。",
        },
        {
          question: "按摩项目需要多久？",
          answer: "时长取决于场所及所选按摩项目。预约前，请确认按摩类型、实际时长、套餐包含内容及总价，并以场所确认的疗程安排为准。",
        },
        {
          question: '可以过夜吗？',
          answer: '大部分主流桑拿可以——巨亨、尚品、玖号与尊贵均设过夜（一般可逗留 12-15 小时），免费使用躺椅、餐饮、沐浴设施。尊贵水疗 24 小时营业、大堂躺椅舒适（旺季另设付费独立休息房），是过夜首选。极品亦可在 24 小时休息区过夜；曼濠不设过夜留宿。',
        },
        {
          question: '能寄存行李吗？',
          answer: '可以。所有场所均提供免费行李寄存，更衣室设有安全储物柜。',
        },
        {
          question: '里面有吃的吗？',
          answer: '有。全部免费、无限量供应。餐饮包含精选牛排、新鲜海鲜、粤式炖汤、川式精致小炒、炒饭、炒面、新鲜水果、啤酒、汽水、小食。口味偏港式／粤式，并融合川菜风味，对台湾旅客来说都很好接受——很多老饕说澳门桑拿的牛排和炒饭水准不输外面餐厅。部分场所还有鲍鱼、花胶鱼翅、燕窝、牛鞭汤等高级菜肴，无需额外收费。',
        },
        {
          question: "可以使用我熟悉的语言沟通吗？",
          answer: "咨询时告诉我们你的常用语言，我们可协助确认场所能否以该语言说明设施、按摩项目及收费。语言支持因场所和到访时段而异，请在预约前确认。",
        },
        {
          question: '回程也免费吗？',
          answer: '是的——接送与回程同样免费。完成后（餐饮后、服务后或任何时候）发讯息给我们，我们会派同一辆私人专车送您回酒店、机场、码头或澳门任何地点。',
        },
      ],
    },
    {
      title: '为什么联系我们',
      items: [
        {
          question: '为什么要通过你们预约？',
          answer: "我们提供专属合作价、澳门全境免费私人专车接送与回程、2 项自选 VIP 尊享、优先入场及最新场馆资讯，并按你的预算、地点、设施和按摩需求推荐合适场所。",
        },
        {
          question: '可以临时取消吗？',
          answer: '可以，免费取消，无需预付订金。',
        },
        {
          question: 'VIP 尊享有哪些？',
          answer: '通过我们预约可获 2 项 VIP 尊享——可任选擦背服务、腿部按摩、头部按摩、足底按摩、修手指甲、修脚指甲、手部按摩、采耳。我们会事先通知场地您的到访，到场时可直接挑选。',
        },
      ],
    },
    {
      title: '按摩与服务',
      items: [
        {
          question: '澳门桑拿有按摩服务吗？',
          answer: "有。通过我们预约可任选 2 项免费护理，包括擦背服务、足底按摩、头部按摩或手部按摩等，这些项目平时需另行收费。可选项目、时长及套餐内容，请在预约前向场所确认。",
        },
        {
          question: '预约包含哪些免费按摩与护理项目？',
          answer: '每次预约可免费任选 2 项，包括擦背服务、腿部按摩、头部按摩、足底按摩、手部按摩、修手指甲、修脚指甲及采耳。平时这些都需单独收费（约 200–298 MOP），通过我们预约则免费赠送。完整清单可在「桑拿排名」页查看。',
        },
        {
          question: '有提供足底按摩（足疗）吗？',
          answer: '有，足底按摩（足疗）是免费 VIP 项目之一，通过穴位按压唤醒疲惫双足，泡完澡或桑拿后做最对症。预约时告诉我们，我们会请场所为你准备。',
        },
        {
          question: '可以做全身按摩吗？',
          answer: '可以。我们会为你配对合适的场所。',
        },
        {
          question: '这是 spa（水疗）还是桑拿？有什么分别？',
          answer: '在澳门，「桑拿」与「水疗（spa）」通常指结合沐浴、干湿蒸、餐饮、按摩护理，以及部分场所的过夜休息设施，并非单纯的三温暖或单项按摩店。本站收录 {venueCount} 家场所，其中包括暂停营业的旧场资料；营业状态、运营方和牌照信息都应在到访前再次确认。',
        },
      ],
    },
  ],
  cta: {
    headingLead: '仍有疑问',
    headingAccent: '?',
    body: '欢迎随时联系我们，专人为您解答',
  },
};

const ko: FaqCopy = {
  meta: {
    title: '자주 묻는 질문 - 마카오 사우나',
    description: '마카오 사우나 자주 묻는 질문: 가격, 안전, 영업시간, 숙박, 결제 방법 등 실용 정보',
  },
  breadcrumbs: [
    {
      name: '홈',
      path: '/',
    },
    {
      name: '자주 묻는 질문',
      path: '/faq/',
    },
  ],
  backHome: '홈으로 돌아가기',
  heading: '자주 묻는 질문',
  intro: '마카오 사우나 자주 묻는 질문: 가격, 안전, 영업시간, 숙박, 결제 방법 등 실용 정보',
  categories: [
    {
      title: '초보 입문',
      items: [
        {
          question: '마카오 사우나는 무엇인가요?',
          answer: '마카오 사우나는 스파, 다이닝, 레저를 결합한 현대식 엔터테인먼트 클럽으로, 정규 매장은 모두 마카오 관광청(MGTO)이 발급한 합법 라이선스를 보유하고 있습니다. 목욕 시설, 무료 다이닝, 전문 마사지를 제공하며, 대부분 매장에서 12-15시간 머물 수 있고 야간 휴식도 가능합니다.',
        },
        {
          question: '마카오 사우나는 안전하고 합법적인가요?',
          answer: '합법입니다. 모든 정규 마카오 사우나는 관광청이 발급한 「증기욕 및 마사지 장소 허가」를 보유하고, 위생, 소방, 안전 점검을 정기적으로 받으며, 규제 수준은 카지노와 동급입니다. 마카오 관광청 공식 사이트에서 모든 매장의 라이선스 상태를 확인할 수 있습니다.',
        },
        {
          question: '처음 가는데 어떻게 해야 하나요?',
          answer: '먼저 저희에게 문의하세요! 취향에 맞는 매장을 추천하고, 무료 픽업을 배차하며, 전속 우대 가격도 받아드립니다. 직접 방문하면 1-2시간 대기할 수 있고 가격도 더 높습니다.',
        },
      ],
    },
    {
      title: '가격과 결제',
      items: [
        {
          question: '비용은 대략 얼마인가요?',
          answer: "요금은 매장, 마사지 종류와 시간, 패키지에 포함된 시설에 따라 달라집니다. 원하는 마사지 항목의 상세 견적을 받아 서비스 요금, 세금, 선택 옵션의 추가 비용을 확인하고, 예약 전에 총액을 확인해 주세요.",
        },
        {
          question: '패키지에 포함된 항목은 어떻게 확인하나요?',
          answer: '예약 전에 매장에 패키지에 포함된 항목, 각 항목의 소요 시간과 총액을 확인하세요. 서비스 요금과 선택 옵션에 별도 요금이 있는지도 확인해 주세요. 구체적인 내용은 예약 시 매장에서 제공하는 항목별 견적을 기준으로 확인하세요.',
        },
        {
          question: '숨은 요금이 있나요?',
          answer: '일부 매장은 10-15%의 서비스 요금을 별도로 받습니다. 예약 전에 패키지에 포함된 항목과 별도 비용이 드는 옵션을 확인하고, 모든 비용을 포함한 총액을 매장에 문의하세요.',
        },
        {
          question: '카드 결제가 가능한가요?',
          answer: '가능합니다. 대부분 매장에서 Visa, Mastercard, 유니온페이, 현금(마카오 파타카/홍콩달러), 알리페이, 위챗페이, Apple Pay를 받습니다. 팁: 마카오 파타카 현금을 사용하면 1-3% 환전 수수료를 아낄 수 있습니다.',
        },
      ],
    },
    {
      title: '실용 정보',
      items: [
        {
          question: '영업시간은 어떻게 되나요?',
          answer: 'YU SAUNA, 엠파이어, 샹핀, 넘버 나인, 마제스티, 디 엑설런트는 공개 정보상 24시간 영업이며, 만하오는 14:00–04:00입니다. YU SAUNA의 직원 대응 시간은 13:00–06:00이고 다른 매장도 근무 시간대가 각각 다릅니다. 자세한 내용은 각 매장 페이지를 보시거나 예약 시 담당자가 확인해 드립니다.',
        },
        {
          question: "비교적 한산한 시간대는 언제인가요?",
          answer: "오후 3–6시는 비교적 한산한 편입니다. 다만 혼잡도와 마사지 예약 가능 시간은 매장과 날짜마다 다르므로, 출발 전에 원하는 방문 시간을 확인해 주세요.",
        },
        {
          question: "마사지 시간은 얼마나 되나요?",
          answer: "소요 시간은 매장과 선택한 마사지 항목에 따라 다릅니다. 예약 전에 마사지 종류, 실제 소요 시간, 패키지 포함 항목과 총액을 확인하세요. 매장이 확인한 코스 내용을 기준으로 이용 일정을 잡아주세요.",
        },
        {
          question: '야간 휴식이 가능한가요?',
          answer: '대부분의 주류 사우나에서 가능합니다 — 엠파이어, 샹핀, 넘버 나인, 마제스티 모두 야간 휴식을 제공하며(일반적으로 12-15시간 체류), 리클라이너, 다이닝, 목욕 시설을 무료로 이용할 수 있습니다. 마제스티 스파는 24시간 영업에 편안한 로비 리클라이너(성수기에는 유료 독립 휴게실 추가)를 갖춰 야간 휴식의 첫 번째 선택입니다. 디 엑설런트도 24시간 휴게 구역에서 야간 휴식이 가능하며, 만하오는 숙박을 제공하지 않습니다.',
        },
        {
          question: '짐을 맡길 수 있나요?',
          answer: '가능합니다. 모든 매장에서 무료 짐 보관을 제공하며, 탈의실에 안전 락커가 있습니다.',
        },
        {
          question: '안에 먹을 것이 있나요?',
          answer: '있습니다. 전부 무료로 무제한 제공됩니다. 다이닝에는 엄선 스테이크, 신선한 해산물, 광둥식 탕, 쓰촨식 볶음 요리, 볶음밥, 볶음면, 신선한 과일, 맥주, 탄산음료, 스낵이 포함됩니다. 맛은 홍콩식/광둥식에 쓰촨 풍미를 더해 대만 여행자도 부담 없이 드실 수 있으며 — 미식가들 사이에서 마카오 사우나의 스테이크와 볶음밥이 바깥 레스토랑 못지않다는 평이 많습니다. 일부 매장에는 전복, 해삼·상어 지느러미, 제비집, 소 힘줄탕 같은 고급 요리도 추가 비용 없이 있습니다.',
        },
        {
          question: "익숙한 언어로 안내받을 수 있나요?",
          answer: "문의할 때 사용하는 언어를 알려주세요. 해당 언어로 시설, 마사지 항목, 요금 안내가 가능한지 매장에 확인해 드립니다. 언어 지원은 매장과 방문 시간에 따라 다르므로 예약 전에 확인해 주세요.",
        },
        {
          question: '귀가 차량도 무료인가요?',
          answer: '네 — 픽업과 귀가 모두 무료입니다. 이용 완료 후(다이닝 후, 서비스 후, 언제든지) 메시지를 보내주시면, 같은 전용 차량으로 호텔, 공항, 터미널 등 마카오 어디든 모셔다 드립니다.',
        },
      ],
    },
    {
      title: '왜 저희에게 문의하나요',
      items: [
        {
          question: '왜 저희를 통해 예약해야 하나요?',
          answer: "제휴 특별가, 마카오 전역 무료 전용 차량 왕복 송영, 선택 가능한 VIP 특전 2가지, 우선 입장, 최신 매장 정보를 제공합니다. 예산, 위치, 시설, 원하는 마사지 항목에 맞춰 적합한 매장을 추천해 드립니다.",
        },
        {
          question: '갑자기 취소해도 되나요?',
          answer: '가능합니다. 무료 취소이며 예약금을 미리 낼 필요가 없습니다.',
        },
        {
          question: 'VIP 특전에는 무엇이 있나요?',
          answer: '저희를 통해 예약하시면 VIP 특전 2가지를 받습니다 — 등밀이, 레그 마사지, 헤드 마사지, 발 마사지, 손톱 정리, 발톱 정리, 핸드 마사지, 귀이개 중 선택 가능합니다. 방문 사실을 매장에 미리 알려, 도착 후 바로 선택하실 수 있습니다.',
        },
      ],
    },
    {
      title: '마사지와 서비스',
      items: [
        {
          question: '마카오 사우나에 마사지 서비스가 있나요?',
          answer: "있습니다. 저희를 통해 예약하면 평소 별도 요금인 등밀이, 발 마사지, 헤드 마사지, 핸드 마사지 등에서 2가지를 무료로 선택할 수 있습니다. 선택 가능한 항목, 소요 시간, 패키지 내용은 예약 전에 매장에 확인해 주세요.",
        },
        {
          question: '예약에 포함되는 무료 마사지·케어 항목은 무엇인가요?',
          answer: '매회 예약 시 2가지를 무료로 선택할 수 있으며, 등밀이, 레그 마사지, 헤드 마사지, 발 마사지, 핸드 마사지, 손톱 정리, 발톱 정리, 귀이개가 포함됩니다. 평소에는 모두 별도 요금(약 200–298 MOP)이지만, 저희를 통해 예약하시면 무료로 드립니다. 전체 목록은 「사우나 랭킹」 페이지에서 확인할 수 있습니다.',
        },
        {
          question: '발 마사지(족욕)를 받을 수 있나요?',
          answer: '있습니다. 발 마사지(족욕)는 무료 VIP 항목 중 하나로, 경혈 지압으로 피로한 발을 깨워주며, 입욕이나 사우나 후에 받으면 가장 좋습니다. 예약 시 알려주시면 매장에서 준비해 드립니다.',
        },
        {
          question: '전신 마사지를 받을 수 있나요?',
          answer: '가능합니다. 원하시는 조건에 맞는 매장을 안내해 드립니다.',
        },
        {
          question: '스파(水療)와 사우나(桑拿)는 무엇이 다른가요?',
          answer: '마카오에서 「사우나」와 「스파(spa)」는 일반적으로 입욕, 드라이·스팀 사우나, 다이닝, 마사지 케어, 일부 매장의 야간 휴식 시설을 결합한 곳을 가리키며, 단순한 찜질방이나 단일 마사지숍이 아닙니다. 본 사이트는 일시 휴업 매장의 과거 자료를 포함해 {venueCount}개 매장을 수록하고 있습니다. 영업 상태, 운영사, 라이선스 정보는 방문 전 반드시 다시 확인하세요.',
        },
      ],
    },
  ],
  cta: {
    headingLead: '아직 궁금한 점이',
    headingAccent: '있으신가요?',
    body: '언제든 문의해 주세요. 담당자가 친절히 답변해 드립니다',
  },
};

export const faqCopy: Partial<Record<Locale, FaqCopy>> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
};

const getRawFaqCopy = createPageCopy(faqCopy);

export function getFaqCopy(lang: Locale): FaqCopy {
  const copy = getRawFaqCopy(lang);
  return {
    ...copy,
    categories: copy.categories.map((category) => ({
      ...category,
      items: category.items.map((item) => ({
        ...item,
        answer: formatVenueCount(item.answer),
      })),
    })),
  };
}
