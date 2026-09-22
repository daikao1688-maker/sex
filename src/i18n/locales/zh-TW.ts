import type { Dictionary } from '../types';

const zhTW: Dictionary = {
  meta: {
    title: '澳門桑拿2026 - 澳門桑拿導航站',
    description: '整理 {venueCount} 間澳門桑拿及水療場所，提供營業狀態、參考價格、設施與專車接送資訊，方便出發前比較。',
    siteName: '澳門桑拿導航站',
    ogImageAlt: '澳門巴黎人鐵塔與路氹酒店群夜景',
  },

  nav: {
    brand: '澳門桑拿導航站',
    spas: '首頁',
    ranking: '排名',
    guide: '新手指南',
    faq: '常見問題',
    about: '關於我們',
    blog: '桑拿攻略',
    languageLabel: '切換語言',
    menuLabel: '選單',
    closeMenuLabel: '關閉選單',
  },

  promo: {
    headlineShort: '慶賀新店開業',
    headlineLong: '慶賀新店開業',
    offer: '{month}起所有店預約即送按摩',
    cta: '立即領取 →',
  },

  hero: {
    title: '澳門桑拿．您的VIP體驗',
    tagline: '24小時免費專車接送・送您去・接您回',
    venueGroups: [
      '利澳薈、八湯御桑拿、玖號水療\n巨亨桑拿、曼濠水療、尚品國際水療',
      '豪門桑拿殿、東方皇堡水療\n凱旋桑拿、尊貴水療、晉會 MCLUB',
    ],
    steps: [
      {
        title: [{ text: '立即聯繫' }],
        desc: [[{ text: '一切交給', accent: true }], [{ text: '我們安排', accent: true }]],
      },
      {
        title: [{ text: '免費', accent: true }, { text: '專車接送' }],
        desc: [[{ text: '隨時隨地', accent: true }], [{ text: '全澳接送' }]],
      },
      {
        title: [{ text: '您只管享受' }],
        desc: [[{ text: 'VIP 尊享', accent: true }], [{ text: '優先入場' }]],
      },
    ],
    exploreCta: '探索會所',
    howItWorksCta: '服務流程',
    bookCta: '立即預約',
    motion: { pause: '暫停背景動效', resume: '繼續背景動效' },
  },

  spas: {
    heading: '精選會所',
    intro: '收錄澳門{venueCount}家桑拿會所，提供價格、營業狀態與設施資訊。',
    filterLabel: '篩選會所',
    filters: [
      { bucket: 'all', label: '全部' },
      { bucket: 'overnight', label: '過夜' },
      { bucket: 'value', label: '高性價' },
      { bucket: 'taipa', label: '氹仔' },
      { bucket: 'new', label: '新場' },
      { bucket: 'ktv', label: 'KTV' },
    ],
    learnMore: '了解更多',
    stats: {
      price: '參考價',
      hours: '當班時段',
      serviceFee: '服務費',
      open24h: '24 小時',
      noServiceFee: '免服務費',
      ratingLabel: '編輯評分 {rating} 分',
      ratingTitle: '編輯評級',
    },
    districts: { peninsula: '澳門半島', taipa: '氹仔 · 路氹' },
    imageAltSuffix: '澳門高級桑拿會所',
    temporarilyClosed: '暫停營業',
    temporarilyClosedNotice:
      '此會所目前暫停營業，暫不接待客人或提供預約服務。歡迎瀏覽其他會所，或聯絡我們為您推薦合適選擇。',
    pausedCard: { badge: '暫停營業', description: '以下場館目前暫停營業，場館頁面保留供參考。' },
    browseOtherVenues: '查看其他會所',
    contactForAlternative: '聯絡我們推薦選擇',
    hiddenNote: '另有 {count} 間未顯示・',
    showAll: '查看全部',
    venues: {
      'clube-rio': {
        name: '利澳薈',
        badge: '全新 & KTV之王',
        description:
          '利澳薈是 2026 年 7 月 30 日全新開幕的商務 KTV 會所，位於新口岸利澳酒店 3 樓——在澳門桑拿場館之中，它是唯一以卡拉OK為主軸的一家，熟客稱之為「澳門桑拿 KTV 之王」，也是澳門夜總會與商K圈子的新答案。水晶吊燈配整幅玫瑰花牆的主廳酒廊、金箔龍鷹掛畫的 VIP 包廂、可以成班朋友開房的派對包廂，每一間都是私密包廂配高清音響，商務應酬與朋友暢聚都找到位置。\n\n可以只安排水療按摩。營業至凌晨 4 時，不設過夜。',
      },
      'yu-sauna': {
        name: '八湯御桑拿',
        badge: '新口岸・沐浴休息',
        summary: "八湯御於2026年8月在原皇家桑拿舊址開業，由帝湖水療團隊營運，設有浴池、桑拿房及寬敞的休息區。",
        description:
          "八湯御桑拿（YU SAUNA）於2026年8月在原皇家桑拿舊址開業，由帝湖水療團隊營運。會所位於新口岸新東方置地酒店三樓，鄰近外港碼頭及漁人碼頭，住在澳門半島的旅客前往也方便。\n\n館內乾淨整齊，浴池、桑拿房與休息區都有充裕空間。浸過熱水、蒸完桑拿，再找張躺椅歇一會兒，很適合在走了一天路後放鬆下來。喜歡澳門式華麗裝潢、又重視環境舒適的旅客，可以把這裡列入行程。",
      },
      'manhao-spa': {
        name: '曼濠水療',
        badge: '2026 年新開業',
        description:
          "曼濠水療（Manhao Spa）於2026年5月在氹仔君怡酒店開業，是澳門規模較大的桑拿會所之一。寬敞的大堂、雲石浴區，加上金色裝飾，一進門便能感受到澳門會所慣有的華麗氣派。\n\n這裡的吸引力不只在裝潢。兩座浴池、芬蘭式桑拿、蒸汽浴室及休息區各有空間，可以先浸浴，再蒸一會兒桑拿，最後坐下來休息。住在氹仔或路氹一帶，想找一處設施齊全、能舒舒服服待上幾小時的地方，曼濠值得考慮。",
      },
      'number-nine-sauna': {
        name: '玖號水療',
        badge: '新場 & 現代設施',
        description:
          "玖號水療（No.9 Spa）於2026年4月在御龍酒店開業。金色裝飾配上天然雲石，大堂與走廊寬敞明亮，既有澳門會所的氣派，也留出了讓人自在休息的空間。\n\n會所設有獨立餐飲區，提供任食餐飲，浸浴或按摩前後都能坐下來好好吃一頓。餐飲與休息安排在同一地方，與朋友結伴前往，或安排一場輕鬆的商務聚會，都比較從容。\n\n喜歡熱鬧一點，可以晚上來；想在白天的行程中留一段休息時間，這裡同樣合適。",
      },
      'shang-pin-spa': {
        name: '尚品國際水療',
        badge: '性價比極高',
        description:
          "尚品國際水療於2025年7月在澳門葡京人開業，位於二樓L2 R95。澳門不少桑拿會所集中在半島，尚品則在路氹一側，鄰近機場，住在葡京人或附近度假酒店的旅客安排起來更順路。\n\n館內明亮整潔，以日式風格裝修，設有按摩浴池、桑拿浴室及休息空間。比起追求熱鬧，這裡更適合想浸浸浴、蒸蒸桑拿，安靜歇一會兒的人。如果這趟澳門行主要在氹仔和路氹活動，不妨考慮尚品。",
      },
      'majesty-spa': {
        name: '尊貴水療',
        badge: '最豪華',
        description:
          "尊貴水療位於漁人碼頭勵庭海景酒店內，鄰近外港客運碼頭。這裡的特點是空間寬敞：大浴池、華麗的室內裝飾，以及可以伸展身體休息的梳化區，適合想在澳門行程中留幾個小時放鬆的旅客。\n\n浴區設有大電視，浸浴時可以看看節目；之後再安排按摩，或到休息區坐一會兒。比起匆匆進出，尊貴更適合慢慢享用設施，舒緩走路與旅途的疲累。",
      },
      'the-excellent-sauna': {
        name: '極品桑拿',
        badge: '24小時',
        description:
          "極品桑拿於2017年5月開業，位於英皇娛樂酒店十樓。精緻的室內裝潢、餐飲與休息設施，讓這裡成為澳門半島市中心一處適合慢慢消磨時間的地方。\n\n逛完街或結束一天行程，可以來浸浴、吃一頓飯，再安排按摩。想體驗澳門會所講究的服務氣氛，又希望位置方便，極品值得放進備選名單。",
      },
      'empire-sauna': {
        name: '巨亨桑拿',
        badge: '最新 & 最熱門',
        description:
          "巨亨桑拿（Empire Sauna）於2026年4月在澳門半島開業。大堂採用精品酒店式設計，雲石、燈光與細緻陳設搭配起來，第一眼便令人印象鮮明。\n\n寬敞的浴池、酒店風格套房及完善的休息區，適合想多待一會兒、好好享用設施的旅客。可以先浸浴，再用餐或安排按摩，為這趟澳門行留一段不趕時間的休閒。\n\n據介紹，會所裝修花費為1,000美元。",
      },
      'east-castle-spa': {
        name: '東方皇堡水療',
        badge: '多樣房間設計',
        description:
          "東方皇堡水療是澳門的老牌桑拿會所，位於皇家金堡酒店三、四樓。寬敞的浴區、齊全的設施，加上華麗而不喧鬧的環境，是這裡讓人願意慢慢待著的原因。\n\n如果想找一間有澳門經典會所氣氛、又能安靜休息的地方，可以考慮這裡。浸過浴、安排完按摩，再坐下來歇一會兒，不必把行程排得太滿。",
      },
      'victoria-sauna': {
        name: '凱旋桑拿',
        badge: '最安靜',
        description:
          "凱旋桑拿位於澳門凱旋門酒店五樓，鄰近美高梅、永利澳門及新葡京。住在市中心，或剛在附近逛完街，前往都比較方便。\n\n這裡有寬敞的大浴場、桑拿房，以及擺放多張躺椅的休息區，整體氣氛比較安靜。想避開熱鬧的大場，找個地方浸浴、歇腳，凱旋值得考慮。\n\n用餐區提供小吃與正餐，可以坐下來慢慢吃。它的吸引力在於位置方便、空間充裕，適合把休息放在首位的旅客。",
      },
      'm-club': {
        name: '晉會MCLUB',
        badge: '科技感 & KTV',
        description:
          '晉會 MCLUB 位於華都酒店內，目前暫停營業，暫不接待客人或提供預約服務。本頁保留既有場館資料供參考。\n\n過往設施包括霓虹燈光、全景視覺、KTV、休息區及多款不同設計的房間。圖片與設施記錄不代表目前可使用；重新開業日期、服務項目與收費須以場館日後公布的資料為準。',
      },
      'number-one-sauna': {
        name: '壹號桑拿',
        badge: '暫停營業',
        description:
          '壹號桑拿目前暫停營業，暫不接待客人或提供預約服務。本頁保留以往的設施與營運資料，供歷史參考。\n\n過往場館設有大型浴池、乾濕蒸房、餐飲區及躺椅休息空間。舊價格、營業時間及過夜安排並非現行服務承諾；如日後重新開業，請先核對最新設施、服務與收費。',
      },
      'familia-nobre': {
        name: '豪門桑拿殿',
        badge: '最高性價比',
        description:
          "豪門桑拿殿以寬敞的浴池、華麗的內裝及齊全的設施見長，是澳門大型桑拿會所中的老面孔。以往無論第一次體驗，還是熟悉澳門桑拿的常客，都能找到適合自己的休閒安排。\n\n浸過浴，再到休息區喝杯啤酒、聊聊天，是這裡過去輕鬆的一面。想了解澳門大型會所的風格，豪門可以作為參考；會所目前暫停營業。",
      },
      'oceanic-royal-spa': {
        name: '帝湖水療',
        badge: '大舞台 & 餐飲',
        description:
          "帝湖水療位於氹仔盛世酒店，鄰近威尼斯人一帶。澳門不少桑拿會所設在半島，帝湖則是氹仔一側的選擇，過往對住在氹仔、路氹或往返機場的旅客而言，位置比較方便。\n\n館內曾設浴區、餐飲與休息空間，讓客人可以在同一地方浸浴、用餐及休息。會所目前暫停營業。",
      },
      'eighteen-sauna': {
        name: '十八桑拿',
        badge: '歷史場館資料',
        description:
          "十八桑拿曾設於金龍酒店六樓，是澳門經營多年的老牌會所。大浴場、乾蒸房、蒸汽桑拿與熱水浴池，是這裡以往的主要設施，初次體驗澳門桑拿的旅客也容易熟悉環境。\n\n親切的工作人員與齊全的沐浴設施，讓客人可以按自己的習慣浸浴、蒸桑拿，再到休息區坐一會兒。會所目前暫停營業。",
      },
    },
  },

  vip: {
    badge: '預約即享・無需加價',
    heading: '服務流程',
    intro: '我們將為您打點一切：推薦、接送、現場接待及回程車輛！',
    tabHow: '服務流程',
    tabGifts: 'VIP 尊享',
    giftsHeader: '任選 2 項按摩或護理',
    columns: { item: '服務項目', value: '價值', ours: 'VIP' },
    free: '免費',
    gifts: [
      { emoji: '🧎‍♀️', name: '擦背服務', desc: '以擦洗方式清潔背部皮膚。', value: '298 MOP' },
      { emoji: '🦵', name: '腿部按摩', desc: '大腿前後深層放鬆，桑拿後最對症。', value: '288 MOP' },
      { emoji: '💆', name: '頭部按摩', desc: '頭皮揉壓，緩解頭痛與精神疲勞。', value: '230 MOP' },
      { emoji: '🦶', name: '足底按摩', desc: '穴位按壓，喚醒疲憊雙足。', value: '230 MOP' },
      { emoji: '🤚', name: '修手指甲', desc: '修剪、塑形、護理甲緣。', value: '220 MOP' },
      { emoji: '🧴', name: '修腳指甲', desc: '泡腳、修甲、甲緣護理、足部放鬆。', value: '220 MOP' },
      { emoji: '🤲', name: '手部按摩', desc: '釋放手腕與前臂的緊繃感。', value: '200 MOP' },
      { emoji: '👂', name: '採耳', desc: '傳統採耳體驗，意外地讓人放鬆。', value: '200 MOP' },
    ],
    steps: [
      {
        title: '由我們為您推薦 💬',
        body: '我們將根據您的預算、時間和喜好，為您推薦最適合的桑拿房，不必煩惱該選哪一間。我們在澳門經營多年，熟知每一間桑拿房！',
      },
      {
        title: '即時專車接送 🚗',
        body: '酒店大堂、機場、外港碼頭、氹仔碼頭、甚至街角——告訴我們您在哪，我們幾分鐘內到達。完成後，澳門境內任何地點皆可送達。',
        note: {
          title: '與朋友同行？',
          body: '我們的七人座輕鬆容納——同樣的禮遇人人享有，毫無額外費用。',
        },
      },
      {
        title: 'VIP 入場・內部優惠價 ⚡',
        body: '透過內部網絡預約，您可直接進場、無需排隊。每間桑拿都為我們的客人保留專屬優惠價——告訴我們您想去哪一間，我們替您鎖定折扣。',
      },
      {
        title: '任選 2 項 VIP 尊享 🎁',
        body: '我們對您透過我們預約的小小心意——我們會事先通知場地您的到訪，到場時您可直接挑選大堂按摩（頭部按摩、足底按摩、修甲等）。',
      },
      {
        title: '回程專車接送 🚗',
        body: '當您結束時——餐飲後、服務剛結束、任何時間——只需傳訊息給我們。同一輛專車會回來接您，送往您的酒店、機場、碼頭，或澳門境內任何地點。與接送同樣零費用。',
      },
    ],
  },

  quickMatch: {
    badge: '★ 智能配對',
    heading: [{ text: '一分鐘，找出最適合你的' }, { text: '桑拿', accent: true }],
    intro: '回答幾條問題，我們即時為你配對 {count} 間中最契合的一間。',
    questions: {
      group: '幾位？',
      experience: '想要什麼體驗？',
      when: '什麼時候？',
      from: '從哪裡出發？',
    },
    groupOptions: {
      solo: '1 位',
      pair: '2 位',
      small: '3-4 位',
      large: '5 位以上',
    },
    experienceOptions: {
      value: '預算優先',
      theme: '不同風格房間',
      taipa: '氹仔・路氹',
      new: '全新登場',
      ktv: 'KTV 包廂',
      classic: '經典臻選',
    },
    whenOptions: {
      now: '即刻',
      tonight: '今晚',
      tomorrow: '明天',
      sat: '週六晚',
      sun: '週日晚',
      other: '其他',
    },
    fromOptions: {
      border: '口岸',
      hotel: '酒店',
      airport: '機場',
      other: '其他',
    },
    overnightOn: '要過夜',
    overnightOff: '不過夜',
    overnightHint: '24小時場館・舒適過夜優先',
    resultLabel: '為你推薦',
    pickedFrom: '由 {count} 間中精選',
    bestMatch: '最佳配對',
    matchSuffix: '% 契合',
    details: '詳情',
    bookNow: '立即預訂・選你慣用的',
    messageTemplate:
      '你好，我在網站上配對好了心水。體驗：{experience}\n・人數：{group}\n・時間：{when}\n・出發地：{from}\n・過夜：{overnight}\n・目前想去：{venue}\n麻煩幫我確認價錢及 VIP 安排，謝謝！',
    yes: '要',
    no: '不用',
  },

  features: {
    heading: '為何選擇我們',
    items: [
      { icon: 'crown', title: "收費透明", desc: '各項費用提前說明' },
      { icon: 'shield', title: "幫你推薦適合的桑拿房", desc: "貴不代表好，適合才是關鍵！" },
      { icon: 'sparkles', title: "澳門合法桑拿房", desc: "本網站所有桑拿房均可透過澳門旅遊局查詢到經營牌照。" },
      { icon: 'clock', title: '可過夜不加價', desc: '12-15 小時自由停留，含早餐與洗浴' },
    ],
  },

  testimonials: {
    heading: '出發前，最常需要確認的事',
    regionLabel: '行前規劃清單',
    served: '先整理關鍵資料，再確認實際安排',
    motion: { pause: '暫停行前清單動效', resume: '繼續行前清單動效' },
    items: [
      {
        quote:
          '先列出重視的區域、環境、體驗方向與預算，才容易比較不同會所。',
        author: '選會所',
      },
      {
        quote:
          '查詢時要說明到訪日期，並分清哪些資料已核實、哪些仍可能按當日狀況調整。',
        author: '查當日狀態',
      },
      {
        quote:
          '價格要拆開看：基本費用、可選項目與場館另收內容，確認後再決定。',
        author: '價格組成',
      },
      {
        quote:
          '申請接送時，一次提供上車點、日期、希望時間、人數及行李資料，避免來回補問。',
        author: '提交接送資料',
      },
      {
        quote:
          '收到明確的集合位置與接送時段，並完成雙方確認後，才可視作已安排。',
        author: '確認上車安排',
      },
      {
        quote:
          '行李件數、大小或有否大型物品都應預先說明，方便按實際需要核對車輛。',
        author: '攜帶行李',
      },
      {
        quote:
          '需要回程便提早提供目的地與大概離場時間；去程確認不代表回程已完成安排。',
        author: '規劃回程',
      },
      {
        quote:
          '航班、船班或行程延誤時要盡早更新抵達時間，原本的接送時段可能需要重排。',
        author: '時間有變',
      },
      {
        quote:
          '多人同行可先整合每人的偏好與不能接受的條件，再選出共同合適的方案。',
        author: '同行需求',
      },
      {
        quote:
          '預先說明慣用語言，也要問清到場後哪些內容需再與場館確認。',
        author: '語言溝通',
      },
      {
        quote:
          '人員與現場狀態可能隨時變動，出發當日應再查一次，不宜只看較早的資料。',
        author: '即日狀況',
      },
      {
        quote:
          '按實際日期確認營業與入場時段，較晚抵達時尤其不要單靠一般營業資料。',
        author: '營業時間',
      },
      {
        quote:
          '打算留宿前，先查場館目前是否提供過夜、適用時段及相關條件。',
        author: '過夜條件',
      },
      {
        quote:
          '熱門日子或現場狀況有變時，預先準備另一個能接受的選擇會較好調整。',
        author: '備選方案',
      },
      {
        quote:
          '先問清接受的付款方式、使用幣種、付款時間，以及哪些項目需要到場處理。',
        author: '付款資料',
      },
      {
        quote:
          '出發前掌握抵達後的聯絡方式、集合指示與入場步驟，現場會較容易銜接。',
        author: '抵達流程',
      },
      {
        quote:
          '只提供安排所需的個人資料；如有疑問，可先了解資料用途及處理方式。',
        author: '個人資料',
      },
      {
        quote:
          '保留列明會所、集合點、接送時段與下一步的最終確認訊息，方便隨時核對。',
        author: '最終確認',
      },
    ],
  },

  blog: {
    heading: '最新桑拿攻略',
    viewAll: '查看全部 →',
  },

  ctaBand: {
    heading: '不知道選哪間？讓我們幫你推薦',
    body: '聯繫我們，根據你的喜好推薦最適合的場所',
    chat: '與我們聊聊',
    ranking: '排名',
    guide: '新手指南',
    faq: '常見問題',
  },

  contact: {
    heading: '聯繫我們',
    intro: '隨時歡迎您的諮詢，我們將竭誠為您服務',
    inquiryMessage: '你好，我想預約澳門桑拿，可以安排嗎？',
    viewQr: '查看 QR',
    channels: {
      whatsapp: '立即聯繫',
      telegram: '@am38876',
      wechat: 'gh34366',
      line: '@224vqwdv',
    },
  },

  mission: {
    quote: '資訊講清楚，安排確認好，旅程自然少繞路。',
    body: '我們重視的是把場館差異、即時狀態、接送細節與下一步交代清楚。遇到變動便盡早更新、重新確認，讓您在出發前知道實際安排，少猜測，也少走冤枉路。',
  },

  footer: {
    backToTop: '↑ 返回頂部',
    links: [
      { path: '/', label: '首頁' },
      { path: '/ranking/', label: '排名' },
      { path: '/guide/', label: '新手指南' },
      { path: '/faq/', label: '常見問題' },
      { path: '/about/', label: '關於我們' },
      { path: '/blog/', label: '桑拿攻略' },
      { path: '/shuttle/', label: '免費接送' },
      { path: '/contact/', label: '聯絡我們' },
      { path: '/privacy/', label: '隱私政策' },
    ],
    editorialPolicy: '編輯政策',
    copyright: '© 2026 澳門桑拿導航站。版權所有。',
  },

  wechat: {
    title: '加我們的微信',
    optionScan: '方式一：掃描上方 QR code',
    optionCopy: '方式二：複製 ID，在微信中搜尋',
    copy: '複製微信 ID：gh34366',
    copied: '✓ 已複製！打開微信搜尋加我們',
    manualCopy: '自動複製無法使用，請選取並手動複製微信 ID。',
    close: '關閉',
  },

  kakaotalk: {
    name: 'KakaoTalk',
    title: '在 KakaoTalk 加我們為好友',
    optionScan: '方式一：掃描上方 QR 碼',
    optionCopy: '方式二：複製 ID {id}，在 KakaoTalk 中搜尋',
    copy: '複製 KakaoTalk ID：{id}',
    copied: '✓ 已複製！請打開 KakaoTalk 搜尋此 ID',
    manualCopy: '自動複製無法使用，請選取並手動複製 KakaoTalk ID。',
    close: '關閉',
    qrAlt: 'KakaoTalk ID {id} 的 QR 碼',
  },

  floatingPill: {
    label: '客服',
    aria: '聯繫客服 — 前往聯繫區',
  },
};

export default zhTW;
