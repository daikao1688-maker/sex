import type { Locale } from '../config';
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
          answer: 'A modern entertainment spa combining wellness, dining, and leisure. Includes bathing facilities, complimentary dining, a staff selection show, and a 60-minute one-on-one service. Most venues allow 12-15 hour stays, including overnight.',
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
          answer: 'Depends on venue and service tier. General range: MOP 1,800 - 7,000+. Vietnamese/Thai: ~MOP 2,400-3,200. Chinese/model: ~MOP 3,200-4,200. Japanese/Korean: ~MOP 5,800-6,800. Contact us for current promotions.',
        },
        {
          question: 'Can I book a dual session with two therapists?',
          answer: 'Yes. Choose one therapist and add a second for a dual-service experience. The surcharge varies by venue and some run very reasonable rates — tell us when you book and we\'ll compare the current dual-session offers and recommend the best value.',
        },
        {
          question: 'Are there hidden fees?',
          answer: 'Some venues charge 10-15% service fee, themed rooms cost extra (MOP 400-1,000), and costume requests add MOP 200-350. Book through us and we’ll disclose all costs upfront — no surprises.',
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
          answer: 'Empire, Shang Pin, Number Nine, Majesty and The Excellent run 24 hours. Manhao opens 14:00–04:00. At The Excellent, therapist shifts run 13:00–05:00; therapist shifts at other venues vary — see each venue page, or we\'ll confirm when you book.',
        },
        {
          question: 'When are the most staff available?',
          answer: 'Most staff come on duty after 7 PM, offering the widest selection. For a quieter experience, arrive between 3-6 PM.',
        },
        {
          question: 'How long is the service?',
          answer: 'Standard service is 60 minutes. Pure massage is 90 minutes.',
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
          question: 'Which venues have the most Japanese/Korean staff?',
          answer: '<a class="text-gold hover:underline" href="{base}/spa/number-nine-sauna/">Number Nine Spa</a> and <a class="text-gold hover:underline" href="{base}/spa/victoria-sauna/">Victoria Sauna</a> have the strongest Japanese/Korean selection. <a class="text-gold hover:underline" href="{base}/spa/number-one-sauna/">Number One Sauna</a> also offers them but at higher price tiers. Lineups change daily — ask us when you book for the latest.',
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
          answer: 'We offer: exclusive partner pricing (lower than walk-in), complimentary 7-seater private car pickup AND return anywhere in Macau, 1 complimentary VIP Extra (your choice), priority entry — no front-desk queue, real-time staff availability info, and honest recommendations based on your preferences.',
        },
        {
          question: 'Can I cancel last minute?',
          answer: 'Yes — free cancellation, no deposit required.',
        },
        {
          question: 'What are the extra services?',
          answer: 'Every booking through us includes 1 complimentary VIP Extra — pick from Back Rubbing, head massage, reflexology, manicure, pedicure, hand massage, and ear cleaning. We let the venue know you\'re coming — simply pick what you want on arrival.',
        },
      ],
    },
    {
      title: 'Massage & Treatments',
      items: [
        {
          question: 'Do Macau saunas include a massage?',
          answer: 'Yes. Every Macau sauna booked through us includes a complimentary massage — you choose 1 each visit, including full-body back massage, foot massage (reflexology), head massage and hand massage, all normally charged separately. A 60-minute one-on-one service is provided on top of that.',
        },
        {
          question: 'What massages and treatments are included free?',
          answer: 'Each booking lets you pick 1 free: full-body back massage, leg massage, head massage, foot massage, hand massage, manicure, pedicure and ear cleaning. These are normally charged separately (around 200–298 MOP each) but are complimentary when you book through us. The full list is on our ranking page.',
        },
        {
          question: 'Is there a foot massage / reflexology?',
          answer: 'Yes — foot massage (reflexology) is one of the free VIP treatments. Pressure-point work revives tired feet, perfect after a bath or sauna. Just tell us when you book and we\'ll have the venue ready for you.',
        },
        {
          question: 'Can I get a full-body massage?',
          answer: 'Yes. The full-body back massage is a popular free option, working down the back, neck and shoulders. For a deeper 60-minute one-on-one massage, tell us your preferences and we\'ll match you with the right venue and therapist.',
        },
        {
          question: 'Is this a spa or a sauna? What\'s the difference?',
          answer: 'In Macau, "sauna" and "spa" usually mean the same kind of all-in-one club — bathing, dry and wet steam, dining, massage treatments and, at some venues, overnight rest in one place. Our directory covers 14 venue profiles, including temporarily closed locations; always reconfirm the operator, licence and current status before visiting.',
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
          answer: '入浴・お食事・休憩・エンターテインメントをまるごと1か所で楽しめる、マカオならではの大型複合施設——それがマカオ サウナ（桑拿）です。街中のマッサージ店とはまったくの別物で、正規店はすべてマカオ観光局（MGTO）の営業ライセンスを持っています。広々としたバスエリア、無料ダイニング、女の子を選べるショータイム、そして60分の一対一サービスまでがワンセット。滞在は多くの店舗で12〜15時間までOK、そのまま宿泊（24時間）することもできます。日本語対応と無料送迎が付くので、初めてでも迷うことはありません。',
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
          answer: 'はい、大丈夫です。当サイトのLINEは日本語に完全対応しており、お店選びから送迎の手配まですべて日本語で完結します。店内スタッフは中国語（広東語）が中心で英語は簡単な程度のことが多いですが、ご希望・ご予算を事前にLINEでお伝えいただければ、当日は入店から退店までほとんど会話不要でスムーズに楽しめます。日本語が話せる女の子が在籍するお店のご案内も可能です。',
        },
        {
          question: '一人で行っても大丈夫ですか？',
          answer: 'もちろんです。マカオ サウナはお一人でのご利用がむしろ多数派です。LINEでお問い合わせいただければ、無料送迎車がホテルまでお迎えに上がり、到着後はスタッフがご案内しますので、初めての方でも流れに迷うことはありません。お一人だからこそ、女の子選びもサービスも自分のペースでゆっくり楽しめます。',
        },
        {
          question: '予約なしで直接お店に行ってもいいですか？',
          answer: '直接のご来店も可能ですが、おすすめはしません。混雑する時間帯は1〜2時間ほど待つことがあり、料金も当日現地払いのほうが割高になりがちです。LINEで事前にご一報いただくだけで、会員限定の特別価格・優先入場・無料送迎がすべて付きます。前金不要・直前キャンセル無料なので、予定が未定でもまずお気軽にどうぞ。',
        },
        {
          question: 'マカオ サウナはどの店がおすすめですか？',
          answer: 'ご予算・エリア・好みのタイプ（日本人／韓国人のスタッフが多い店、設備が新しい店、宿泊向きの店など）によっておすすめは変わります。当サイトでは14店舗の情報と休業状況を整理しています。LINEでご希望をお知らせいただければ、営業中の選択肢から条件に合う店舗をご案内します。料金、営業状況、許可情報は来店前にあらためてご確認ください。',
        },
      ],
    },
    {
      title: '料金・お支払い',
      items: [
        {
          question: '料金・値段の相場はどれくらいですか？',
          answer: 'マカオ サウナの料金はお店のグレードと女の子のランクで決まり、全体の目安は MOP 1,800 〜 7,000+ です。相場の内訳は、ベトナム／タイ系が約 MOP 2,400-3,200、中国／モデル系が約 MOP 3,200-4,200、日本／韓国系が約 MOP 5,800-6,800。値段はすべて明朗会計です。時期によってお得なプランも出ますので、最新の料金はLINEでお気軽にご確認ください。',
        },
        {
          question: '2人同時（女の子2名）のサービスは頼めますか？',
          answer: 'はい。お好みの女の子を1人指名したうえで、もう1人を追加して2人同時のサービスを体験できます。追加料金の設定は店舗ごとに異なり、かなりお得な設定の店舗もあります。ご予約時にお声がけいただければ、各店舗の最新の2人同時プランを比較して、いちばんお得な組み合わせをご案内します。',
        },
        {
          question: '追加料金や隠れた費用が発生することはありますか？',
          answer: '店舗によっては、サービス料10〜15%、テーマルームの利用料（MOP 400〜1,000）、特別な衣装リクエストの別途料金（MOP 200〜350）がかかるケースがあります。ただし当サイトを通していただければ、こうした値段も含めた総額を事前に日本語でご案内します。マカオ サウナの料金が後から思わぬ形で膨らむことは一切ありません。',
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
          answer: '巨亨・尚品・玖号・尊貴・極品は24時間営業。曼濠は14:00〜翌4:00です。極品の女の子の出勤時間帯は13:00〜翌5:00で、その他の店舗は異なります。詳細は各店舗ページをご確認いただくか、ご予約時にご案内します。',
        },
        {
          question: '女の子の人数が一番そろう時間帯はいつですか？',
          answer: '夜19時を過ぎると大半の女の子が出勤してくるため、マカオ サウナのショータイムはこの時間帯が選択肢最多になります。一方で、混雑を避けて待ち時間なくじっくり選びたい方には、比較的すいている15〜18時の入店も人気です。',
        },
        {
          question: 'サービス時間はどのくらいありますか？',
          answer: 'マカオ サウナの標準のマンツーマンサービスは60分間です（マッサージのみのご利用なら90分）。時間を気にせずくつろぎたい方は、そのまま宿泊（24時間）まで延ばす使い方もおすすめです。',
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
          question: '日本人・韓国人の女の子が多いのはどの店ですか？',
          answer: '日本・韓国系の在籍が多いマカオ サウナは、ナンバーナインスパ（玖號水療）とヴィクトリアサウナ（凱旋桑拿）の2店です。ナンバーワンサウナ（壹號桑拿）にも在籍はありますが、こちらは料金がやや高めのクラスになります。その日の出勤状況・指名の空き・日本語の可否は日々変わるものなので、ご来店前にLINEで聞いていただければ最新情報をリアルタイムでお答えします。',
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
          answer: 'はい。主要なマカオ サウナは24時間営業なので、カジノで遊んだ後や観光の合間、深夜着の便の後でも利用できます。ただし店舗の営業時間と女の子の出勤時間は別で、出勤時間は店ごとにおおむね13:00〜翌06:00の範囲です。ご希望の店舗の当日状況は予約前にご確認ください。コタイ・マカオ半島どちらのホテル・カジノからも無料送迎で向かえます。宿泊対応も店舗ごとに異なります。',
        },
      ],
    },
    {
      title: 'お問い合わせのメリット',
      items: [
        {
          question: 'LINEで手配してもらうと何がお得なのですか？',
          answer: 'LINE経由の手配には特典が満載です。具体的には——現地での当日払いより安い提携特別価格／行き帰りとも無料の7人乗り私人専車送迎（マカオ市内全域対応）／お好みで選べる無料VIP特典1つ／行列をスキップできる優先入場／女の子の最新出勤状況のリアルタイム共有／ご希望に沿った忖度なしのおすすめ提案。もちろん料金（値段）は明朗会計で、やり取りは日本語で完結。宿泊（24時間）のご相談もそのまま承ります。',
        },
        {
          question: '予約後のキャンセルは可能ですか？',
          answer: '可能です。マカオ サウナのご予約は直前であっても無料でキャンセルでき、前金（デポジット）もかかりません。ご予定が変わったらLINEでひと言送っていただくだけでOK。気軽に相談して気軽に変更できる体制なので、旅程が固まっていない段階でも安心してお問い合わせください。',
        },
        {
          question: '無料でもらえるVIP特典にはどんなものがありますか？',
          answer: '当サイト経由でお問い合わせいただいたお客様には、マカオ サウナのVIP特典を1つ無料でプレゼントしています。選択肢はアカスリ／ヘッドマッサージ／足ツボ（足裏マッサージ）／マニキュア／ペディキュア／ハンドマッサージ／耳かきの7種類。どれも通常は別料金の施術なので、料金面のメリットは小さくありません。ご来店予定は店舗へ事前に申し送りしておくため、当日は着いてからお好きな特典を選ぶだけ。日本語対応・無料送迎で、初めての方もスムーズです。',
        },
        {
          question: 'LINEでの予約・手配はどんな流れですか？',
          answer: '流れはとてもシンプルです。①LINEで友だち追加 → ②ご希望（日時・ご予算・エリア・好みのタイプ）を日本語で送る → ③ぴったりのお店と会員価格、当日の女の子の出勤状況をご提案 → ④送迎車のお迎え場所と時間を確定。あとは当日、お迎えの車に乗るだけです。前金（デポジット）は不要、直前キャンセルも無料なので、気軽に相談だけでも大丈夫です。',
        },
      ],
    },
    {
      title: 'マッサージ・施術',
      items: [
        {
          question: 'マッサージも料金に含まれていますか？',
          answer: '含まれています。当サイト経由のマカオ サウナ（桑拿）では、ご来店のたびに全身アカスリ・足裏マッサージ（足ツボ）・ヘッドマッサージ・ハンドマッサージの中から1項目を無料でお選びいただけます——いずれも本来は別料金の施術です。これに加えて、60分のマンツーマン（一対一）サービスが標準で付いてきます。',
        },
        {
          question: '無料施術のラインナップを教えてください',
          answer: '毎回のご来店ごとに、全身アカスリ／脚・太ももマッサージ／ヘッドマッサージ／足裏マッサージ／ハンドマッサージ／マニキュア／ペディキュア／耳かきの中から、お好きな1項目を無料でご利用いただけます。通常はどれも1項目あたり約 200–298 MOP の有料メニューですが、当サイト経由なら無料特典として付いてきます。全ラインナップは「サウナおすすめランキング」ページにまとめています。',
        },
        {
          question: '足ツボ・足裏マッサージは受けられますか？',
          answer: '受けられます。マカオ サウナの足裏マッサージ（足ツボ）は、当サイト経由なら無料VIP特典の1つとして選べます（通常は別料金のメニューです）。ツボをしっかり刺激して歩き疲れた足をリセットでき、入浴やサウナのあととの相性も抜群。ご希望の場合はお問い合わせ時に一言添えていただければ、店舗側が事前に準備を整えておきます。日本語対応・無料送迎なので、初めての方も安心です。',
        },
        {
          question: '全身をしっかりほぐしてもらうことはできますか？',
          answer: 'できます。マカオ サウナで人気No.1の無料項目は全身アカスリで、背中から首・肩まで丸ごとすっきりほぐせます（通常は別料金）。さらに本格的な60分のマンツーマン（一対一）マッサージをご希望なら、お好みをLINEでお聞かせください。日本語対応・無料送迎で、相性のいい店舗と女の子をセットでご案内します。',
        },
        {
          question: 'スパ（水療）とサウナ（桑拿）はどう違うのですか？',
          answer: 'マカオでは、「サウナ（桑拿）」と「スパ（水療）」が、入浴、ドライ／スチームサウナ、食事、施術、店舗によっては宿泊休憩までをまとめた施設を指すことがあります。日本の一般的なサウナ施設とは内容が異なります。当サイトは一時休業中を含む14店舗を掲載しています。営業状況、料金、営業許可、送迎条件は変わるため、来店前に最新情報をご確認ください。',
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
          answer: '澳門桑拿是集水療、餐飲與休閒於一體的現代化娛樂會所，所有正規場所均持有澳門旅遊局（MGTO）核發的合法執照。提供沐浴設施、免費餐飲、專業按摩、技師媒合環節及 60 分鐘一對一服務，大部分場所可逗留 12-15 小時，亦可過夜。',
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
          answer: '視乎場所及技師類別，一般範圍為 MOP 1,800 - 7,000+。越南/泰國技師約 MOP 2,400-3,200，中國/模特約 MOP 3,200-4,200，日韓技師約 MOP 5,800-6,800。聯繫我們了解最新優惠。',
        },
        {
          question: '可以安排雙人（兩位技師）同時服務嗎？',
          answer: '可以。選一位技師後可加選第二位一同服務，即雙人同時服務體驗。加價幅度視場所而定，部分場館加幅相當划算。預約時告訴我們，我們會即時比較各場館的雙人優惠，推薦最抵的安排。',
        },
        {
          question: '有隱藏收費嗎？',
          answer: '部分場所收取10-15%服務費，主題房間需額外付費（MOP 400-1,000），特殊服裝要求另計（MOP 200-350）。透過我們預約，所有費用提前告知，絕無隱藏收費。',
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
          answer: '巨亨、尚品、玖號、尊貴與極品 24 小時營業；曼濠為 14:00–04:00。極品技師當班時段為 13:00–05:00，其他場館技師當班時段不一，詳情見各場館頁面，或預約時由專人確認。',
        },
        {
          question: '幾點技師比較多？',
          answer: '晚上7點後大部分技師上班，選擇最豐富。想避開人潮，下午3-6點入場最為清靜。',
        },
        {
          question: '服務時間多久？',
          answer: '標準服務60分鐘，純按摩90分鐘。',
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
          question: '日韓技師哪家比較多？',
          answer: '玖號水療和凱旋桑拿的日韓技師選擇最多。壹號桑拿亦有日韓選擇，但屬較高消費檔次。當日陣容以現場為準，預約時問我們即可取得最新資訊。',
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
          answer: '我們提供：專屬合作價（低於自行到場價格）、免費私人專車接送與回程（澳門任何地點）、1 項 VIP 尊享（由你選）、優先入場免排隊、實時技師在線資訊、根據你的喜好作出真誠推薦。',
        },
        {
          question: '可以臨時取消嗎？',
          answer: '可以，免費取消，無需預付訂金。',
        },
        {
          question: 'VIP 尊享有哪些？',
          answer: '透過我們預約可獲 1 項 VIP 尊享——可任選擦背服務、頭部按摩、足底按摩、修手指甲、修腳指甲、手部按摩、採耳。我們會事先通知場地您的到訪，到場時可直接挑選。',
        },
      ],
    },
    {
      title: '按摩與服務',
      items: [
        {
          question: '澳門桑拿有按摩服務嗎？',
          answer: '有。透過我們預約任何一間澳門桑拿，都包含免費按摩——每次可任選 1 項，包括全身擦背按摩、足底按摩（足療）、頭部按摩與手部按摩，平時這些項目都需單獨收費。此外還有 60 分鐘一對一專屬服務。',
        },
        {
          question: '預約包含哪些免費按摩與護理項目？',
          answer: '每次預約可免費任選 1 項，包括全身擦背按摩、腿部按摩、頭部按摩、足底按摩、手部按摩、修手指甲、修腳指甲及採耳。平時這些都需單獨收費（約 200–298 MOP），透過我們預約則免費贈送。完整清單可在「桑拿排名」頁查看。',
        },
        {
          question: '有提供足底按摩（足療）嗎？',
          answer: '有，足底按摩（足療）是免費 VIP 項目之一，透過穴位按壓喚醒疲憊雙足，泡完澡或桑拿後做最對症。預約時告訴我們，我們會請場所為你準備。',
        },
        {
          question: '可以做全身按摩嗎？',
          answer: '可以。全身擦背按摩是熱門的免費項目，沿背部、肩頸放鬆全身；若想要更深層的 60 分鐘一對一按摩，告訴我們你的偏好，我們會為你配對合適的場所與技師。',
        },
        {
          question: '這是 spa（水療）還是桑拿？有什麼分別？',
          answer: '在澳門，「桑拿」與「水療（spa）」通常指結合沐浴、乾濕蒸、餐飲、按摩護理，以及部分場所的過夜休息設施，並非單純的三溫暖或單項按摩店。本站收錄 14 間場所，當中包括暫停營業的舊場資料；營業狀態、營運方及牌照資訊均應在到訪前再次確認。',
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
          answer: '澳门桑拿是集水疗、餐饮与休闲于一体的现代化娱乐会所，所有正规场所均持有澳门旅游局（MGTO）核发的合法执照。提供沐浴设施、免费餐饮、专业按摩、技师媒合环节及 60 分钟一对一服务，大部分场所可逗留 12-15 小时，亦可过夜。',
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
          answer: '视乎场所及技师类别，一般范围为 MOP 1,800 - 7,000+。越南/泰国技师约 MOP 2,400-3,200，中国/模特约 MOP 3,200-4,200，日韩技师约 MOP 5,800-6,800。联系我们了解最新优惠。',
        },
        {
          question: '可以安排双人（两位技师）同时服务吗？',
          answer: '可以。选一位技师后可加选第二位一同服务，即双人同时服务体验。加价幅度视场所而定，部分场馆加幅相当划算。预约时告诉我们，我们会即时比较各场馆的双人优惠，推荐最抵的安排。',
        },
        {
          question: '有隐藏收费吗？',
          answer: '部分场所收取10-15%服务费，主题房间需额外付费（MOP 400-1,000），特殊服装要求另计（MOP 200-350）。通过我们预约，所有费用提前告知，绝无隐藏收费。',
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
          answer: '巨亨、尚品、玖号、尊贵与极品 24 小时营业；曼濠为 14:00–04:00。极品技师当班时段为 13:00–05:00，其他场馆技师当班时段不一，详情见各场馆页面，或预约时由专人确认。',
        },
        {
          question: '几点技师比较多？',
          answer: '晚上7点后大部分技师上班，选择最丰富。想避开人潮，下午3-6点入场最为清静。',
        },
        {
          question: '服务时间多久？',
          answer: '标准服务60分钟，纯按摩90分钟。',
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
          question: '日韩技师哪家比较多？',
          answer: '玖号水疗和凯旋桑拿的日韩技师选择最多。壹号桑拿亦有日韩选择，但属较高消费档次。当日阵容以现场为准，预约时问我们即可获取最新资讯。',
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
          answer: '我们提供：专属合作价（低于自行到场价格）、免费私人专车接送与回程（澳门任何地点）、1 项 VIP 尊享（由你选）、优先入场免排队、实时技师在线资讯、根据你的喜好作出真诚推荐。',
        },
        {
          question: '可以临时取消吗？',
          answer: '可以，免费取消，无需预付订金。',
        },
        {
          question: 'VIP 尊享有哪些？',
          answer: '通过我们预约可获 1 项 VIP 尊享——可任选擦背服务、头部按摩、足底按摩、修手指甲、修脚指甲、手部按摩、采耳。我们会事先通知场地您的到访，到场时可直接挑选。',
        },
      ],
    },
    {
      title: '按摩与服务',
      items: [
        {
          question: '澳门桑拿有按摩服务吗？',
          answer: '有。通过我们预约任何一间澳门桑拿，都包含免费按摩——每次可任选 1 项，包括全身擦背按摩、足底按摩（足疗）、头部按摩与手部按摩，平时这些项目都需单独收费。此外还有 60 分钟一对一专属服务。',
        },
        {
          question: '预约包含哪些免费按摩与护理项目？',
          answer: '每次预约可免费任选 1 项，包括全身擦背按摩、腿部按摩、头部按摩、足底按摩、手部按摩、修手指甲、修脚指甲及采耳。平时这些都需单独收费（约 200–298 MOP），通过我们预约则免费赠送。完整清单可在「桑拿排名」页查看。',
        },
        {
          question: '有提供足底按摩（足疗）吗？',
          answer: '有，足底按摩（足疗）是免费 VIP 项目之一，通过穴位按压唤醒疲惫双足，泡完澡或桑拿后做最对症。预约时告诉我们，我们会请场所为你准备。',
        },
        {
          question: '可以做全身按摩吗？',
          answer: '可以。全身擦背按摩是热门的免费项目，沿背部、肩颈放松全身；若想要更深层的 60 分钟一对一按摩，告诉我们你的偏好，我们会为你配对合适的场所与技师。',
        },
        {
          question: '这是 spa（水疗）还是桑拿？有什么分别？',
          answer: '在澳门，「桑拿」与「水疗（spa）」通常指结合沐浴、干湿蒸、餐饮、按摩护理，以及部分场所的过夜休息设施，并非单纯的三温暖或单项按摩店。本站收录 14 家场所，其中包括暂停营业的旧场资料；营业状态、运营方和牌照信息都应在到访前再次确认。',
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
          answer: '마카오 사우나는 스파, 다이닝, 레저를 결합한 현대식 엔터테인먼트 클럽으로, 정규 매장은 모두 마카오 관광청(MGTO)이 발급한 합법 라이선스를 보유하고 있습니다. 목욕 시설, 묾셔 다이닝, 전문 마사지, 테라피스트 매칭, 60분 1:1 서비스를 제공하며, 대부분 매장에서 12-15시간 머물 수 있고 야간 휴식도 가능합니다.',
        },
        {
          question: '마카오 사우나는 안전하고 합법적인가요?',
          answer: '합법입니다. 모든 정규 마카오 사우나는 관광청이 발급한 「증기욕 및 마사지 장소 허가」를 보유하고, 위생, 소방, 안전 점검을 정기적으로 받으며, 규제 수준은 카지노와 동급입니다. 마카오 관광청 공식 사이트에서 모든 매장의 라이선스 상태를 확인할 수 있습니다.',
        },
        {
          question: '처음 가는데 어떻게 해야 하나요?',
          answer: '먼저 저희에게 문의하세요! 취향에 맞는 매장을 추천하고, 묾셔 픽업을 배차하며, 전속 우대 가격도 받아드립니다. 직접 방문하면 1-2시간 대기할 수 있고 가격도 더 높습니다.',
        },
      ],
    },
    {
      title: '가격과 결제',
      items: [
        {
          question: '비용은 대략 얼마인가요?',
          answer: '매장과 테라피스트 유형에 따라 일반적으로 MOP 1,800 - 7,000+입니다. 베트남/태국 테라피스트 약 MOP 2,400-3,200, 중국/모델 약 MOP 3,200-4,200, 일본·한국 테라피스트 약 MOP 5,800-6,800입니다. 최신 혜택은 문의해 주세요.',
        },
        {
          question: '테라피스트 2명 동반 서비스를 배치할 수 있나요?',
          answer: '가능합니다. 한 명을 선택한 뒤 두 번째를 추가해 동시에 서비스받는, 2명 동반 체험입니다. 추가 요금 폭은 매장에 따라 다륾니다. 예약 시 알려주시면 각 매장의 2명 동반 혜택을 바로 비교해 가장 유리한 배치를 추천해 드립니다.',
        },
        {
          question: '숨은 요금이 있나요?',
          answer: '일부 매장은 10-15% 서비스 요금을 받고, 테마룸은 추가 요금(MOP 400-1,000)이 있으며, 특별 의상 요청은 별도(MOP 200-350)입니다. 저희를 통해 예약하시면 모든 비용을 미리 안내해, 숨은 요금이 전혀 없습니다.',
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
          answer: '엠파이어, 샹핀, 넘버 나인, 마제스티, 디 엑설런트는 24시간 영업, 만하오는 14:00–04:00입니다. 디 엑설런트의 테라피스트 근무 시간대는 13:00–05:00이고, 다른 매장은 시간대가 각각 다릅니다. 자세한 내용은 각 매장 페이지를 보시거나 예약 시 담당자가 확인해 드립니다.',
        },
        {
          question: '몇 시에 테라피스트가 가장 많나요?',
          answer: '저녁 7시 이후 대부분의 테라피스트가 출근해 선택지가 가장 풍부합니다. 인파를 피하고 싶다면 오후 3-6시 입장이 가장 한산합니다.',
        },
        {
          question: '서비스 시간은 얼마나 되나요?',
          answer: '표준 서비스 60분, 마사지만 받는 코스는 90분입니다.',
        },
        {
          question: '야간 휴식이 가능한가요?',
          answer: '대부분의 주류 사우나에서 가능합니다 — 엠파이어, 샹핀, 넘버 나인, 마제스티 모두 야간 휴식을 제공하며(일반적으로 12-15시간 체류), 리큐라이너, 다이닝, 목욕 시설을 묾셔로 이용할 수 있습니다. 마제스티 스파는 24시간 영업에 편안한 로비 리큐라이너(성수기에는 유료 독립 휴게실 추가)를 갖춰 야간 휴식의 첫 번째 선택입니다. 디 엑설런트도 24시간 휴게 구역에서 야간 휴식이 가능하며, 만하오는 숙박을 제공하지 않습니다.',
        },
        {
          question: '짐을 맡길 수 있나요?',
          answer: '가능합니다. 모든 매장에서 묾셔 짐 보관을 제공하며, 탈의실에 안전 락커가 있습니다.',
        },
        {
          question: '안에 먹을 것이 있나요?',
          answer: '있습니다. 전부 묾셔로 무제한 제공됩니다. 다이닝에는 엄선 스테이크, 신선한 해산물, 광둥식 탕, 쓰촨식 볶음 요리, 볶음밥, 볶음면, 신선한 과일, 맥주, 탄산음료, 스낵이 포함됩니다. 맛은 홍콩식/광둥식에 쓰촨 풍미를 더해 대만 여행자도 부담 없이 드실 수 있으며 — 미식가들 사이에서 마카오 사우나의 스테이크와 볶음밥이 바깥 레스토랑 못지않다는 평이 많습니다. 일부 매장에는 전복, 해삼·상어 지느러미, 제비집, 소 힘줄탕 같은 고급 요리도 추가 비용 없이 있습니다.',
        },
        {
          question: '일본·한국 테라피스트는 어느 매장에 많나요?',
          answer: '넘버 나인 스파와 빅토리아 사우나의 일본·한국 테라피스트 선택지가 가장 많습니다. 넘버 원 사우나에도 일본·한국 선택지가 있지만 더 높은 가격대입니다. 당일 라인업은 현장 기준이며, 예약 시 문의하시면 최신 정보를 안내해 드립니다.',
        },
        {
          question: '귀가 차량도 묾셔인가요?',
          answer: '네 — 픽업과 귀가 모두 묾셔입니다. 이용 완료 후(다이닝 후, 서비스 후, 언제든지) 메시지를 복내주시면, 같은 전용 차량으로 호텔, 공항, 터미널 등 마카오 어디든 모셔다 드립니다.',
        },
      ],
    },
    {
      title: '왜 저희에게 문의하나요',
      items: [
        {
          question: '왜 저희를 통해 예약해야 하나요?',
          answer: '저희는 다음을 제공합니다: 전속 협력가(직접 방문 가격보다 저렴), 묾셔 전용 차량 픽업 및 귀가(마카오 전역), VIP 특전 1가지(선택 가능), 우선 입장 대기 면제, 실시간 테라피스트 정보, 취향에 맞는 진심 어린 추천.',
        },
        {
          question: '갑자기 취소핫도 되나요?',
          answer: '가능합니다. 묾셔 취소이며 예약금을 미리 낼 필요가 없습니다.',
        },
        {
          question: 'VIP 특전에는 무엇이 있나요?',
          answer: '저희를 통해 예약하시면 VIP 특전 1가지를 받습니다 — 등밀이(아카스리), 헤드 마사지, 발 마사지, 손톱 정리, 발톱 정리, 핸드 마사지, 귀이개 중 선택 가능합니다. 방문 사실을 매장에 미리 알려, 도착 후 바로 선택하실 수 있습니다.',
        },
      ],
    },
    {
      title: '마사지와 서비스',
      items: [
        {
          question: '마카오 사우나에 마사지 서비스가 있나요?',
          answer: '있습니다. 저희를 통해 마카오 사우나 어디를 예약핫든 묾셔 마사지가 포함됩니다 — 매회 1가지를 선택할 수 있으며, 전신 등밀이 마사지, 발 마사지(족욕), 헤드 마사지, 핸드 마사지가 있고, 평소에는 모두 별도 요금입니다. 이 밖에 60분 1:1 전속 서비스도 있습니다.',
        },
        {
          question: '예약에 포함되는 묾셔 마사지·케어 항목은 무엇인가요?',
          answer: '매회 예약 시 1가지를 묾셔로 선택할 수 있으며, 전신 등밀이 마사지, 레그 마사지, 헤드 마사지, 발 마사지, 핸드 마사지, 손톱 정리, 발톱 정리, 귀이개가 포함됩니다. 평소에는 모두 별도 요금(약 200–298 MOP)이지만, 저희를 통해 예약하시면 묾셔로 드립니다. 전체 목록은 「사우나 랭킹」 페이지에서 확인할 수 있습니다.',
        },
        {
          question: '발 마사지(족욕)를 받을 수 있나요?',
          answer: '있습니다. 발 마사지(족욕)는 묾셔 VIP 항목 중 하나로, 경혈 지압으로 피로한 발을 깨워주며, 입욕이나 사우나 후에 받으면 가장 좋습니다. 예약 시 알려주시면 매장에서 준비해 드립니다.',
        },
        {
          question: '전신 마사지를 받을 수 있나요?',
          answer: '가능합니다. 전신 등밀이 마사지는 인기 있는 묾셔 항목으로, 등과 어깨·목을 따라 전신을 풀어줍니다. 더 깊은 60분 1:1 마사지를 원하시면 취향을 알려주세요. 적합한 매장과 테라피스트를 매칭해 드립니다.',
        },
        {
          question: '스파(水療)와 사우나(桑拿)는 무엇이 다른가요?',
          answer: '마카오에서 「사우나」와 「스파(spa)」는 일반적으로 입욕, 드라이·스팀 사우나, 다이닝, 마사지 케어, 일부 매장의 야간 휴식 시설을 결합한 곳을 가리키며, 단순한 찜질방이나 단일 마사지숍이 아닙니다. 본 사이트는 일시 휴업 매장의 과거 자료를 포함해 14개 매장을 수록하고 있습니다. 영업 상태, 운영사, 라이선스 정보는 방문 전 반드시 다시 확인하세요.',
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

export const getFaqCopy = createPageCopy(faqCopy);
