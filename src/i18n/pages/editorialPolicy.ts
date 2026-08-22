import type { Locale } from '../config';
import type { EditorialEvidenceCopy } from '../types';
import { createPageCopy, type Crumb } from './helpers';

export interface EditorialPolicyCopy {
  meta: { title: string; description: string };
  breadcrumbs: Crumb[];
  backHome: string;
  eyebrow: string;
  heading: string;
  lastReviewed: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[]; items?: string[] }>;
  directory: { heading: string; body: string; label: string; url: string };
  correctionCta: string;
}

const directoryUrls = {
  en: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  ja: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  'zh-TW': 'https://www.dst.gov.mo/zh-hant/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  'zh-CN': 'https://www.dst.gov.mo/zh-hans/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
} satisfies Record<Locale, string>;

const en: EditorialPolicyCopy = {
  meta: {
    title: 'Editorial and Corrections Policy - Macau Sauna Sites',
    description: 'How Macau Sauna Sites reviews venue facts, prices, opening status, sources and reader corrections.',
  },
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Editorial and Corrections Policy', path: '/editorial-policy/' },
  ],
  backHome: 'Back to home',
  eyebrow: 'How we handle changing venue information',
  heading: 'Editorial and Corrections Policy',
  lastReviewed: 'Policy reviewed: 2026-08-22',
  intro: 'This directory is an editorial guide, not an official venue or government register. We separate what is recorded on a profile from what has been independently verified, and we make uncertainty visible when a current primary source is unavailable.',
  sections: [
    {
      heading: 'What we review',
      paragraphs: [
        'Before a new profile or material revision is published, we compare names, location details, operating notes, prices, hours and services against the sources available to us. Photos are checked for the venue they are intended to show.',
        'A published profile can remain useful as a historical reference even when a venue closes. Closed profiles are clearly marked and are removed from current rankings and booking offers.',
      ],
    },
    {
      heading: 'Prices and opening status',
      paragraphs: [
        'Prices, staff schedules, promotions, overnight rules and opening status can change without notice. They are presented as reference information, not a live quote. Readers should reconfirm the details for their date before travelling or booking.',
        'We review these high-change fields when credible new information arrives, when a correction is reported, and during scheduled site reviews. Venue pages show the date of the latest editorial review; that date does not guarantee nothing changed afterward.',
      ],
    },
    {
      heading: 'Sources and verification',
      paragraphs: [
        'Where a venue-specific official source is not available, the page says that its facts have not been independently verified against one. We do not create licence numbers, operator names or source attributions to fill a gap.',
        'The Macao Government Tourism Office licensed-entities directory is linked as a general place to check official listings. A directory link does not, by itself, verify every price, service or operating claim on a venue profile.',
      ],
    },
    {
      heading: 'Corrections',
      paragraphs: [
        'If you spot an outdated price, closure, reopening, venue fact or image, send the page URL, the item that needs correction and any source you can share through our existing contact channels. We review the report, update or qualify the claim, and correct related pages where the same fact appears.',
        'Material corrections are made directly in the affected content. We do not silently turn an unverified report into a confirmed fact.',
      ],
    },
  ],
  directory: {
    heading: 'Official general directory',
    body: 'Search the MGTO licensed-entities directory for the latest official listing information.',
    label: 'Open the MGTO directory ↗',
    url: directoryUrls.en,
  },
  correctionCta: 'Send a correction through our contact channels →',
};

const zhTW: EditorialPolicyCopy = {
  meta: {
    title: '編輯與更正政策 - 澳門桑拿導航站',
    description: '了解本站如何審閱場館資料、價格、營業狀態、來源及讀者更正。',
  },
  breadcrumbs: [
    { name: '首頁', path: '/' },
    { name: '編輯與更正政策', path: '/editorial-policy/' },
  ],
  backHome: '返回首頁',
  eyebrow: '面對會隨時變動的場館資訊',
  heading: '編輯與更正政策',
  lastReviewed: '政策審閱日期：2026-08-22',
  intro: '本站是編輯整理的實用指南，並非場館官方網站或政府名錄。我們會分清楚「目前頁面記錄」與「已有獨立來源核實」；找不到可靠的一手資料時，也會把未核實狀態直接寫明。',
  sections: [
    {
      heading: '我們怎樣審閱資料',
      paragraphs: [
        '新場館頁面上線或內容有重要改動前，我們會對照手上可查的資料，檢視名稱、地點、營業備註、價格、時間及服務項目；圖片亦會核對其所指的場館。',
        '場館停業後，舊頁面仍可能保留作歷史參考，但必須清楚標示暫停營業，並退出現行排名及預約推介。',
      ],
    },
    {
      heading: '價格與營業狀態',
      paragraphs: [
        '價目、技師時段、優惠、過夜規則與開門狀態都可能臨時改變。頁面所列只供比較，不是即時報價；出發或確認預約前，請再查詢當日安排。',
        '收到可信的新消息、更正通知，或進行網站例行審閱時，我們會優先重查這些易變項目。場館頁會列出最近審閱日期，但該日期不代表其後一定沒有變動。',
      ],
    },
    {
      heading: '來源與核實界線',
      paragraphs: [
        '如沒有可用的場館官方來源，頁面會說明場館個別資料尚未獨立核實。我們不會為了補齊欄位而虛構牌照編號、營運者名稱或官方出處。',
        '澳門特別行政區政府旅遊局的持牌實體名錄，是查閱官方登記的一般入口；連結至該名錄，不等於名錄已證實頁面上的每一項價格、服務或營業說法。',
      ],
    },
    {
      heading: '資料更正',
      paragraphs: [
        '如發現價格過時、停業或重開狀態有誤、場館資料不準確或圖片放錯，請透過本站現有聯絡方式，傳送頁面網址、需要修正的內容及可供查核的來源。',
        '我們會覆核報料，把內容更正或加上適當限制，並同步檢查其他出現同一資料的頁面；未核實的消息不會在沒有說明下改寫成確定事實。',
      ],
    },
  ],
  directory: {
    heading: '政府一般查核入口',
    body: '可到澳門旅遊局持牌實體名錄搜尋最新官方登記資料。',
    label: '開啟澳門旅遊局名錄 ↗',
    url: directoryUrls['zh-TW'],
  },
  correctionCta: '透過現有聯絡方式提交更正 →',
};

const zhCN: EditorialPolicyCopy = {
  meta: {
    title: '编辑与更正政策 - 澳门桑拿导航站',
    description: '了解本站如何审核场馆资料、价格、营业状态、来源及读者更正。',
  },
  breadcrumbs: [
    { name: '首页', path: '/' },
    { name: '编辑与更正政策', path: '/editorial-policy/' },
  ],
  backHome: '返回首页',
  eyebrow: '怎样处理随时可能变化的场馆信息',
  heading: '编辑与更正政策',
  lastReviewed: '政策审核日期：2026-08-22',
  intro: '本站是经过编辑整理的实用指南，不是场馆官网，也不是政府名录。我们会区分“当前页面记录”和“已有独立来源核实”；缺少可靠的一手资料时，会直接说明尚未核实。',
  sections: [
    {
      heading: '我们如何审核资料',
      paragraphs: [
        '新场馆页面发布或内容有重要修改前，我们会根据手头可查的资料，检查名称、地点、营业备注、价格、时间和服务项目；图片也会核对其对应的场馆。',
        '场馆停业后，旧页面仍可能保留作历史参考，但会明确标示暂停营业，并从当前排名和预约推荐中移除。',
      ],
    },
    {
      heading: '价格与营业状态',
      paragraphs: [
        '价格、技师时段、优惠、过夜规定和开门状态都可能临时变化。页面内容只供比较，不是实时报价；出发或确认预约前，请重新查询当日安排。',
        '收到可信的新消息、更正通知，或进行网站例行审核时，我们会优先复查这些易变信息。场馆页会显示最近审核日期，但该日期不代表之后一定没有变化。',
      ],
    },
    {
      heading: '来源与核实范围',
      paragraphs: [
        '如果没有可用的场馆官方来源，页面会说明场馆个别资料尚未独立核实。我们不会为了填满栏目而编造牌照编号、运营者名称或官方出处。',
        '澳门特别行政区政府旅游局的持牌实体名录，是查询官方登记的一般入口；链接到该名录，不表示名录已经证明页面上的每一项价格、服务或营业说法。',
      ],
    },
    {
      heading: '资料更正',
      paragraphs: [
        '如果发现价格过时、停业或重开状态有误、场馆资料不准确或图片放错，请通过本站现有联系方式，发送页面网址、需要修改的内容和可供核查的来源。',
        '我们会复核信息，对内容进行更正或加上适当说明，并同步检查其他出现同一资料的页面；未经核实的消息不会在没有说明的情况下写成确定事实。',
      ],
    },
  ],
  directory: {
    heading: '政府一般核查入口',
    body: '可到澳门旅游局持牌实体名录搜索最新官方登记资料。',
    label: '打开澳门旅游局名录 ↗',
    url: directoryUrls['zh-CN'],
  },
  correctionCta: '通过现有联系方式提交更正 →',
};

const ja: EditorialPolicyCopy = {
  meta: {
    title: '編集・訂正方針｜マカオ・サウナ・ガイド',
    description: '店舗情報、料金、営業状況、情報源、訂正依頼をどのように確認するかをご案内します。',
  },
  breadcrumbs: [
    { name: 'ホーム', path: '/' },
    { name: '編集・訂正方針', path: '/editorial-policy/' },
  ],
  backHome: 'ホームに戻る',
  eyebrow: '変わりやすい店舗情報を扱うために',
  heading: '編集・訂正方針',
  lastReviewed: '方針確認日：2026-08-22',
  intro: '当サイトは編集部がまとめる案内サイトであり、店舗公式サイトや行政機関の登録簿ではありません。掲載中の情報と、一次情報で確認できた事実を区別し、確認できない項目はその状態がわかるように表示します。',
  sections: [
    {
      heading: '掲載前に確認すること',
      paragraphs: [
        '新しい店舗ページの公開時や大きな改訂時には、確認可能な資料をもとに、名称、場所、営業に関する注記、料金、時間、サービス内容を見直します。写真も、どの店舗を示すものか確認します。',
        '休業した店舗のページは、過去の参考情報として残す場合があります。その際は一時休業を明記し、現在のランキングや予約案内から外します。',
      ],
    },
    {
      heading: '料金と営業状況',
      paragraphs: [
        '料金、スタッフの勤務時間、キャンペーン、宿泊条件、営業状況は予告なく変わることがあります。掲載内容は比較のための参考情報であり、当日の確定料金ではありません。来店や予約を決める前に、最新情報をご確認ください。',
        '信頼できる更新情報や訂正連絡を受けたとき、またサイトの定期見直し時に、変動しやすい項目を優先して確認します。各店舗ページの最終確認日は、その後に変更がないことを保証するものではありません。',
      ],
    },
    {
      heading: '情報源と確認の範囲',
      paragraphs: [
        '店舗ごとの公式情報が見つからない場合は、掲載項目を店舗公式情報と照合できていない旨を表示します。空欄を埋めるために、ライセンス番号、運営者名、公式情報源を作り出すことはありません。',
        'マカオ政府観光局（MGTO）の認可事業者検索ページは、公的な登録情報を調べるための一般的な入口です。このリンクだけで、店舗ページの料金、サービス、営業状況がすべて裏付けられるわけではありません。',
      ],
    },
    {
      heading: '訂正について',
      paragraphs: [
        '古い料金、休業・再開情報の誤り、店舗情報や写真の取り違えを見つけた場合は、既存のお問い合わせ方法から、該当ページのURL、訂正箇所、確認に使える資料をお送りください。',
        '内容を確認したうえで、訂正または注記を行い、同じ情報を使っている関連ページも見直します。未確認の連絡を、説明なしに確定情報として掲載することはありません。',
      ],
    },
  ],
  directory: {
    heading: '公的登録情報の確認先',
    body: 'MGTOの認可事業者検索ページで、最新の公的登録情報を検索できます。',
    label: 'MGTOの検索ページを開く ↗',
    url: directoryUrls.ja,
  },
  correctionCta: 'お問い合わせ窓口から訂正を送る →',
};

const policyCopy: Record<Locale, EditorialPolicyCopy> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};

const evidenceCopy: Record<Locale, EditorialEvidenceCopy> = {
  en: {
    heading: 'Source and review notes',
    lastReviewedLabel: 'Last reviewed: ',
    lastReviewedDate: '2026-08-22',
    profileBasisLabel: 'Profile basis',
    profileBasis: 'Prices, hours, services and closure markers shown here come from this site’s current editorial record.',
    verificationLabel: 'Current verification',
    activeStatus: 'This profile is not marked closed in our editorial record. Confirm the current opening status before travelling.',
    closedStatus: 'This profile is marked temporarily closed and is retained for reference only.',
    unverifiedLabel: 'The venue-specific fields are not independently verified against a current official venue source.',
    directoryLabel: 'General official source',
    directoryDescription: 'Use the official MGTO licensed-entities directory for a general listing check. It does not verify every claim on this page.',
    directoryLink: 'Check the MGTO directory ↗',
    directoryUrl: directoryUrls.en,
    correctionPrompt: 'Found a change or a source we should review?',
    correctionLink: 'Send a correction',
  },
  'zh-TW': {
    heading: '資料來源與審閱說明',
    lastReviewedLabel: '最近審閱：',
    lastReviewedDate: '2026-08-22',
    profileBasisLabel: '頁面資料依據',
    profileBasis: '本頁所列價格、時間、服務及停業標記，來自本站目前保存的編輯記錄。',
    verificationLabel: '目前核實狀態',
    activeStatus: '本站記錄未把此場館列為停業；出發前仍請確認最新營業狀態。',
    closedStatus: '本站目前把此場館標示為暫停營業，頁面只保留作參考。',
    unverifiedLabel: '上述場館個別資料尚未經場館官方資料獨立核實。',
    directoryLabel: '政府一般查核來源',
    directoryDescription: '可使用澳門旅遊局持牌實體名錄作一般登記查核；該名錄不會證明本頁的每項說法。',
    directoryLink: '查閱澳門旅遊局名錄 ↗',
    directoryUrl: directoryUrls['zh-TW'],
    correctionPrompt: '發現資料變動，或有來源可供我們覆核？',
    correctionLink: '提交更正',
  },
  'zh-CN': {
    heading: '资料来源与审阅说明',
    lastReviewedLabel: '最近审核：',
    lastReviewedDate: '2026-08-22',
    profileBasisLabel: '页面资料依据',
    profileBasis: '本页所列价格、时间、服务和停业标记，来自本站当前保存的编辑记录。',
    verificationLabel: '当前核实状态',
    activeStatus: '本站记录未将该场馆列为停业；出发前仍请确认最新营业状态。',
    closedStatus: '本站当前将该场馆标示为暂停营业，页面仅保留作参考。',
    unverifiedLabel: '上述场馆个别资料尚未通过场馆官方资料独立核实。',
    directoryLabel: '政府一般核查来源',
    directoryDescription: '可使用澳门旅游局持牌实体名录作一般登记核查；该名录不能证明本页的每项说法。',
    directoryLink: '查看澳门旅游局名录 ↗',
    directoryUrl: directoryUrls['zh-CN'],
    correctionPrompt: '发现资料变化，或有来源可供我们复核？',
    correctionLink: '提交更正',
  },
  ja: {
    heading: '情報源と確認状況',
    lastReviewedLabel: '最終確認：',
    lastReviewedDate: '2026-08-22',
    profileBasisLabel: '掲載内容の根拠',
    profileBasis: '料金、時間、サービス、休業表示は、当サイトが現在保有する編集記録に基づきます。',
    verificationLabel: '現在の確認状況',
    activeStatus: '当サイトの記録では休業扱いではありません。来店前に最新の営業状況をご確認ください。',
    closedStatus: '当サイトでは一時休業として掲載し、参考情報としてページを残しています。',
    unverifiedLabel: '店舗ごとの掲載項目について、店舗公式情報による独立確認はできていません。',
    directoryLabel: '公的情報の確認先',
    directoryDescription: '一般的な登録確認にはMGTOの認可事業者検索ページをご利用ください。本ページの全項目を裏付けるものではありません。',
    directoryLink: 'MGTOの検索ページを確認 ↗',
    directoryUrl: directoryUrls.ja,
    correctionPrompt: '変更点や、確認に使える資料をご存じですか？',
    correctionLink: '訂正を知らせる',
  },
};

export const getEditorialPolicyCopy = createPageCopy(policyCopy);
export const getEditorialEvidenceCopy = createPageCopy(evidenceCopy);
