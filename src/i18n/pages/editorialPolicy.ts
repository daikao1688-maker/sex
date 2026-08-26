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
  contactEmailLabel: string;
}

const directoryUrls = {
  en: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  ja: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  'zh-TW': 'https://www.dst.gov.mo/zh-hant/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  'zh-CN': 'https://www.dst.gov.mo/zh-hans/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
  ko: 'https://www.dst.gov.mo/en/public-services/licensed-entities.html?comType=10&ps=20&pn=1',
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
  contactEmailLabel: 'Email: '
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
        '價目、技師時段、優惠、過夜規則與營業狀態都可能臨時改變。頁面所列只供比較，不是即時報價；出發或確認預約前，請再查詢當日安排。',
        '收到可信的新消息、更正通知，或進行網站例行審閱時，我們會優先重查這些易變項目。場館頁會列出最近審閱日期，但該日期不代表其後一定沒有變動。',
      ],
    },
    {
      heading: '來源與核實界線',
      paragraphs: [
        '如沒有可用的場館官方來源，頁面會說明場館個別資料尚未獨立核實。我們不會為了補齊欄位而虛構牌照編號、營運者名稱或官方出處。',
        '澳門特別行政區政府旅遊局的持牌實體名錄，是查閱官方登記的一般入口；連結至該名錄，不代表該名錄已核實頁面上的每一項價格、服務或營業說法。',
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
  contactEmailLabel: '電郵聯絡：'
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
        '价格、技师时段、优惠、过夜规定和营业状态都可能临时变化。页面内容只供比较，不是实时报价；出发或确认预约前，请重新查询当日安排。',
        '收到可信的新消息、更正通知，或进行网站例行审核时，我们会优先复查这些易变信息。场馆页会显示最近审核日期，但该日期不代表之后一定没有变化。',
      ],
    },
    {
      heading: '来源与核实范围',
      paragraphs: [
        '如果没有可用的场馆官方来源，页面会说明场馆个别资料尚未独立核实。我们不会为了填满栏目而编造牌照编号、运营者名称或官方出处。',
        '澳门特别行政区政府旅游局的持牌实体名录，是查询官方登记的一般入口；链接到该名录，不代表该名录已核实页面上的每一项价格、服务或营业说法。',
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
  contactEmailLabel: '邮件联系：'
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
  contactEmailLabel: 'メール：'
};

const ko: EditorialPolicyCopy = {
  meta: {
    title: '편집 및 정정 정책 - 마카오 사우나 사이트',
    description: '마카오 사우나 사이트가 매장 정보, 가격, 영업 상태, 출처, 독자 정정을 어떻게 검토하는지 안내합니다.',
  },
  breadcrumbs: [
    { name: '홈', path: '/' },
    { name: '편집 및 정정 정책', path: '/editorial-policy/' },
  ],
  backHome: '홈으로 돌아가기',
  eyebrow: '수시로 변하는 매장 정보를 다루는 방식',
  heading: '편집 및 정정 정책',
  lastReviewed: '정책 검토일: 2026-08-22',
  intro: '이 디렉터리는 편집 가이드이며, 공식 매장 사이트나 정부 등록부가 아닙니다. 프로필에 기록된 내용과 독립적으로 확인된 사실을 구분하고, 현재의 1차 출처를 확인할 수 없을 때는 그 불확실성을 명확히 표시합니다.',
  sections: [
    {
      heading: '검토 대상',
      paragraphs: [
        '새 프로필이나 중요한 수정이 게시되기 전에, 저희가 확보한 출처와 대조하여 명칭, 위치 정보, 영업 메모, 가격, 시간, 서비스를 비교합니다. 사진도 의도한 매장을 보여주는지 확인합니다.',
        '게시된 프로필은 매장이 폐업한 후에도 과거 참고 자료로 유용할 수 있습니다. 폐업 프로필은 명확히 표시되며 현재 랭킹과 예약 안내에서 제외됩니다.',
      ],
    },
    {
      heading: '가격과 영업 상태',
      paragraphs: [
        '가격, 테라피스트 스케줄, 프로모션, 숙박 규칙, 영업 상태는 예고 없이 변경될 수 있습니다. 게시 내용은 참고 정보이며 실시간 견적이 아닙니다. 방문이나 예약 전에 해당 날짜의 정보를 반드시 재확인하세요.',
        '신뢰할 수 있는 새 정보가 도착하거나, 정정 신고가 접수되거나, 정기 사이트 검토 시 변동성이 큰 항목을 우선 재확인합니다. 매장 페이지에는 최근 편집 검토일이 표시되지만, 그 날짜 이후 변경이 없었음을 보장하지는 않습니다.',
      ],
    },
    {
      heading: '출처와 검증 범위',
      paragraphs: [
        '매장별 공식 출처를 확인할 수 없는 경우, 해당 사실을 공식 출처와 독립적으로 대조하지 못했음을 페이지에 명시합니다. 공백을 메우기 위해 라이선스 번호, 운영자 명칭, 출처 표기를 만들어내지 않습니다.',
        '마카오 정부 관광청(MGTO) 인가 사업자 디렉터리는 공식 등록 정보를 확인하는 일반적인 입구로 링크됩니다. 디렉터리 링크만으로 매장 프로필의 모든 가격, 서비스, 영업 주장이 검증되는 것은 아닙니다.',
      ],
    },
    {
      heading: '정정',
      paragraphs: [
        '오래된 가격, 폐업·재개 정보 오류, 매장 정보 부정확, 사진 오류를 발견하시면 기존 연락 채널로 페이지 URL, 정정이 필요한 항목, 공유 가능한 출처를 보내주세요. 저희가 신고를 검토하고 내용을 정정하거나 단서를 달며, 같은 사실이 나타나는 관련 페이지도 함께 수정합니다.',
        '중요한 정정은 해당 콘텐츠에 직접 반영합니다. 미검증 신고를 설명 없이 확정 사실로 바꾸지 않습니다.',
      ],
    },
  ],
  directory: {
    heading: '공식 일반 디렉터리',
    body: 'MGTO 인가 사업자 디렉터리에서 최신 공식 등록 정보를 검색할 수 있습니다.',
    label: 'MGTO 디렉터리 열기 ↗',
    url: directoryUrls.ko,
  },
  correctionCta: '연락 채널로 정정 보내기 →',
  contactEmailLabel: '이메일: '
};

const policyCopy: Record<Locale, EditorialPolicyCopy> = {
  en,
  ja,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ko,
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
  ko: {
    heading: '출처 및 검토 안내',
    lastReviewedLabel: '최근 검토: ',
    lastReviewedDate: '2026-08-22',
    profileBasisLabel: '페이지 정보 근거',
    profileBasis: '이 페이지의 가격, 시간, 서비스, 휴업 표시는 본 사이트가 현재 보유한 편집 기록에서 비롯됩니다.',
    verificationLabel: '현재 검증 상태',
    activeStatus: '본 사이트 기록에서 이 매장은 휴업으로 표시되어 있지 않습니다. 방문 전 최신 영업 상태를 확인해 주세요.',
    closedStatus: '본 사이트는 이 매장을 일시 휴업으로 표시하며, 페이지는 참고용으로만 유지됩니다.',
    unverifiedLabel: '위의 매장별 정보는 현재의 공식 매장 출처와 독립적으로 검증되지 않았습니다.',
    directoryLabel: '공식 일반 확인처',
    directoryDescription: '일반적인 등록 확인에는 MGTO 인가 사업자 디렉터리를 이용하세요. 이 페이지의 모든 주장을 입증하지는 않습니다.',
    directoryLink: 'MGTO 디렉터리 확인 ↗',
    directoryUrl: directoryUrls.ko,
    correctionPrompt: '변경 사항이나 검토할 만한 출처를 알고 계신가요?',
    correctionLink: '정정 보내기',
  },
};

export const getEditorialPolicyCopy = createPageCopy(policyCopy);
export const getEditorialEvidenceCopy = createPageCopy(evidenceCopy);
