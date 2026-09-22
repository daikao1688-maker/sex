import type { Dictionary } from '../types';

const zhCN: Dictionary = {
  meta: {
    title: '澳门桑拿2026 - 澳门桑拿导航站',
    description: '整理 {venueCount} 家澳门桑拿及水疗场所，提供营业状态、参考价格、设施与专车接送信息，方便出发前比较。',
    siteName: '澳门桑拿导航站',
    ogImageAlt: '澳门巴黎人铁塔与路氹酒店群夜景',
  },

  nav: {
    brand: '澳门桑拿导航站',
    spas: '首页',
    ranking: '排名',
    guide: '新手指南',
    faq: '常见问题',
    about: '关于我们',
    blog: '桑拿攻略',
    languageLabel: '切换语言',
    menuLabel: '菜单',
    closeMenuLabel: '关闭菜单',
  },

  promo: {
    headlineShort: '庆贺新店开业',
    headlineLong: '庆贺新店开业',
    offer: '{month}起所有店预约即送按摩',
    cta: '立即领取 →',
  },

  hero: {
    title: '澳门桑拿．您的VIP体验',
    tagline: '24小时免费专车接送・送您去・接您回',
    venueGroups: [
      '利澳荟、八汤御桑拿、玖号水疗\n巨亨桑拿、曼濠水疗、尚品国际水疗',
      '豪门桑拿殿、东方皇堡水疗\n凯旋桑拿、尊贵水疗、晋会 MCLUB',
    ],
    steps: [
      {
        title: [{ text: '立即联系' }],
        desc: [[{ text: '一切交给', accent: true }], [{ text: '我们安排', accent: true }]],
      },
      {
        title: [{ text: '免费', accent: true }, { text: '专车接送' }],
        desc: [[{ text: '随时随地', accent: true }], [{ text: '全澳接送' }]],
      },
      {
        title: [{ text: '您只管享受' }],
        desc: [[{ text: 'VIP 尊享', accent: true }], [{ text: '优先入场' }]],
      },
    ],
    exploreCta: '探索会所',
    howItWorksCta: '服务流程',
    bookCta: '立即预约',
    motion: { pause: '暂停背景动效', resume: '继续背景动效' },
  },

  spas: {
    heading: '精选会所',
    intro: '收录澳门{venueCount}家桑拿会所，提供价格、营业状态与设施信息。',
    filterLabel: '筛选会所',
    filters: [
      { bucket: 'all', label: '全部' },
      { bucket: 'overnight', label: '过夜' },
      { bucket: 'value', label: '高性价' },
      { bucket: 'taipa', label: '氹仔' },
      { bucket: 'new', label: '新场' },
      { bucket: 'ktv', label: 'KTV' },
    ],
    learnMore: '了解更多',
    stats: {
      price: '参考价',
      hours: '当班时段',
      serviceFee: '服务费',
      open24h: '24 小时',
      noServiceFee: '免服务费',
      ratingLabel: '编辑评分 {rating} 分',
      ratingTitle: '编辑评级',
    },
    districts: { peninsula: '澳门半岛', taipa: '氹仔 · 路氹' },
    imageAltSuffix: '澳门高端桑拿会所',
    temporarilyClosed: '暂停营业',
    temporarilyClosedNotice:
      '此会所目前暂停营业，暂不接待客人或提供预约服务。欢迎浏览其他会所，或联系我们为您推荐合适选择。',
    pausedCard: { badge: '暂停营业', description: '以下场馆目前暂停营业，场馆页面保留供参考。' },
    browseOtherVenues: '查看其他会所',
    contactForAlternative: '联系我们推荐选择',
    hiddenNote: '另有 {count} 间未显示・',
    showAll: '查看全部',
    venues: {
      'clube-rio': {
        name: '利澳荟',
        badge: '全新 & KTV之王',
        description:
          '利澳荟是 2026 年 7 月 30 日全新开幕的商务 KTV 会所，位于新口岸利澳酒店 3 楼——在澳门桑拿场馆之中，它是唯一以卡拉OK为主轴的一家，熟客称之为「澳门桑拿 KTV 之王」，也是澳门夜总会与商K圈子的新答案。水晶吊灯配整幅玫瑰花墙的主厅酒廊、金箔龙鹰挂画的 VIP 包厢、可以成班朋友开房的派对包厢，每一间都是私密包厢配高清音响，商务应酬与朋友畅聚都找到位置。\n\n可以只安排水疗按摩。营业至凌晨 4 时，不设过夜。',
      },
      'yu-sauna': {
        name: '八汤御桑拿',
        badge: '新口岸・沐浴休息',
        summary: "八汤御于2026年8月在原皇家桑拿旧址开业，由帝湖水疗团队运营，设有浴池、桑拿房和宽敞的休息区。",
        description:
          "八汤御桑拿（YU SAUNA）于2026年8月在原皇家桑拿旧址开业，由帝湖水疗团队运营。会所位于新口岸新东方置地酒店三楼，靠近外港码头和渔人码头，住在澳门半岛的旅客前往也方便。\n\n馆内干净整齐，浴池、桑拿房和休息区都留有充足空间。泡过热水、蒸完桑拿，再找张躺椅歇一会儿，很适合在走了一天路之后放松下来。喜欢澳门式华丽装修、又在意环境舒适的旅客，可以把这里列入行程。",
      },
      'manhao-spa': {
        name: '曼濠水疗',
        badge: '2026 年新开业',
        description:
          "曼濠水疗（Manhao Spa）于2026年5月在氹仔君怡酒店开业，是澳门规模较大的桑拿会所之一。宽敞的大堂、云石浴区和带金色细节的装潢，让人一进门就能感受到澳门会所一贯的华丽气派。\n\n这里的吸引力不只在装修。两座浴池、芬兰式桑拿、蒸汽浴室和休息区各有空间，可以先泡浴，再蒸一会儿桑拿，最后坐下来休息。住在氹仔或路氹一带，想找一处设施齐全、能舒舒服服待上几小时的地方，曼濠值得考虑。",
      },
      'number-nine-sauna': {
        name: '玖号水疗',
        badge: '新场 & 现代设施',
        description:
          "玖号水疗（No.9 Spa）于2026年4月在御龙酒店开业。金色装饰配上天然大理石，大堂和走廊宽敞明亮，既有澳门会所的气派，也留出了让人自在休息的空间。\n\n会所设有独立餐饮区，采用自助任食的方式，泡浴或按摩前后都能坐下来好好吃一顿。餐饮与休息安排在同一个地方，和朋友结伴前往，或安排一场轻松的商务聚会，都比较从容。\n\n喜欢热闹一些，可以晚上来；想在白天的行程中留一段休息时间，这里同样合适。",
      },
      'shang-pin-spa': {
        name: '尚品国际水疗',
        badge: '性价比极高',
        description:
          "尚品国际水疗于2025年7月在澳门葡京人开业，位于二楼L2 R95。澳门不少桑拿会所集中在半岛，尚品则在路氹一侧，靠近机场，住在葡京人或附近度假酒店的旅客安排起来更顺路。\n\n馆内明亮整洁，以日式风格装修，设有按摩浴池、桑拿浴室和休息空间。比起追求热闹，这里更适合想泡泡水、蒸蒸桑拿，安静歇一会儿的人。如果这趟澳门行主要在氹仔和路氹活动，可以考虑把尚品安排在行程中。",
      },
      'majesty-spa': {
        name: '尊贵水疗',
        badge: '最豪华',
        description:
          "尊贵水疗位于渔人码头励庭海景酒店内，靠近外港客运码头。这里的特点是空间宽敞：大浴池、华丽的室内装饰，以及可以伸展身体休息的沙发区，适合想在澳门行程里留出几小时放松的旅客。\n\n浴区设有大电视，泡浴时可以看看节目；之后再安排按摩，或到休息区坐一会儿。比起匆匆进出，尊贵更适合慢慢享用设施，把走路和旅途的疲惫留在这里。",
      },
      'the-excellent-sauna': {
        name: '极品桑拿',
        badge: '24小时',
        description:
          "极品桑拿于2017年5月开业，位于英皇娱乐酒店十楼。精致的室内装潢、餐饮和休息设施，让这里成为澳门半岛市中心一处适合慢慢消磨时间的去处。\n\n逛完街或结束一天行程，可以来泡浴、享用一顿饭，再安排按摩。想体验澳门会所讲究的服务氛围，又希望位置方便，极品值得放进备选名单。",
      },
      'empire-sauna': {
        name: '巨亨桑拿',
        badge: '最新 & 最热门',
        description:
          "巨亨桑拿（Empire Sauna）于2026年4月在澳门半岛开业。大堂采用精品酒店式设计，大理石、灯光与细致陈设搭配在一起，第一眼就让人印象鲜明。\n\n宽敞的浴池、酒店风格套房和完善的休息区，适合想待久一点、好好享用设施的旅客。可以先泡浴，再用餐或安排按摩，给这趟澳门行留一段不赶时间的休闲。\n\n据介绍，会所装修花费为1,000美元。",
      },
      'east-castle-spa': {
        name: '东方皇堡水疗',
        badge: '多样房间设计',
        description:
          "东方皇堡水疗是澳门的老牌桑拿会所，位于皇家金堡酒店三、四楼。宽敞的浴区、齐全的设施和华丽但不喧闹的环境，是这里让人愿意慢慢待着的原因。\n\n如果想找一间有澳门经典会所气氛、又能安静休息的地方，可以考虑这里。泡过浴、安排完按摩，再坐下来歇一会儿，不需要把行程排得太满。",
      },
      'victoria-sauna': {
        name: '凯旋桑拿',
        badge: '最安静',
        description:
          "凯旋桑拿位于澳门凯旋门酒店五楼，邻近美高梅、永利澳门和新葡京。住在市中心，或刚在附近逛完街，前往都比较方便。\n\n这里有宽敞的大浴场、桑拿房和摆放多张躺椅的休息区，整体气氛比较安静。想避开热闹的大场，找个地方泡浴、歇脚，凯旋是值得考虑的选择。\n\n用餐区提供小吃和正餐，可以坐下来慢慢吃。它的吸引力在于位置方便、空间够用，适合把休息放在首位的旅客。",
      },
      'm-club': {
        name: '晋会MCLUB',
        badge: '科技感 & KTV',
        description:
          '晋会 MCLUB 位于华都酒店内，目前暂停营业，暂不接待客人或提供预约服务。本页保留既有场馆资料供参考。\n\n过往设施包括霓虹灯光、全景视觉、KTV、休息区及多款不同设计的房间。图片与设施记录不代表目前可使用；重新开业日期、服务项目与收费须以场馆日后公布的资料为准。',
      },
      'number-one-sauna': {
        name: '壹号桑拿',
        badge: '暂停营业',
        description:
          '壹号桑拿目前暂停营业，暂不接待客人或提供预约服务。本页保留以往的设施与运营资料，供历史参考。\n\n过往场馆设有大型浴池、干湿蒸房、餐饮区及躺椅休息空间。旧价格、营业时间及过夜安排并非现行服务承诺；如日后重新开业，请先核对最新设施、服务与收费。',
      },
      'familia-nobre': {
        name: '豪门桑拿殿',
        badge: '最高性价比',
        description:
          "豪门桑拿殿以宽敞的浴池、华丽的内装和齐全的设施见长，是澳门大型桑拿会所中的老面孔。以往无论第一次体验，还是熟悉澳门桑拿的常客，都能找到适合自己的休闲安排。\n\n泡过浴，再到休息区喝杯啤酒、聊聊天，是这里过去轻松的一面。想了解澳门大型会所的风格，豪门可以作为参考；会所目前暂停营业。",
      },
      'oceanic-royal-spa': {
        name: '帝湖水疗',
        badge: '大舞台 & 餐饮',
        description:
          "帝湖水疗位于氹仔盛世酒店，靠近威尼斯人一带。澳门不少桑拿会所设在半岛，帝湖则是氹仔一侧的选择，过往对住在氹仔、路氹或往返机场的旅客来说，位置比较方便。\n\n馆内曾设浴区、餐饮和休息空间，方便客人在一处完成泡浴、用餐与休息。会所目前暂停营业。",
      },
      'eighteen-sauna': {
        name: '十八桑拿',
        badge: '历史场馆资料',
        description:
          "十八桑拿曾设于金龙酒店六楼，是澳门经营多年的老牌会所。大浴场、干蒸房、蒸汽桑拿和热水浴池，是这里以往的主要设施，初次体验澳门桑拿的旅客也容易熟悉环境。\n\n亲切的工作人员和齐全的沐浴设施，让客人可以按自己的习惯泡浴、蒸桑拿，再到休息区坐一会儿。会所目前暂停营业。",
      },
    },
  },

  vip: {
    badge: '预约即享・无需加价',
    heading: '服务流程',
    intro: '我们将为您打点一切：推荐、接送、现场接待及回程车辆！',
    tabHow: '服务流程',
    tabGifts: 'VIP 尊享',
    giftsHeader: '任选 2 项按摩或护理',
    columns: { item: '服务项目', value: '价值', ours: 'VIP' },
    free: '免费',
    gifts: [
      { emoji: '🧎‍♀️', name: '擦背服务', desc: '以擦洗方式清洁背部皮肤。', value: '298 MOP' },
      { emoji: '🦵', name: '腿部按摩', desc: '大腿前后深层放松，桑拿后最对症。', value: '288 MOP' },
      { emoji: '💆', name: '头部按摩', desc: '头皮揉压，缓解头痛与精神疲劳。', value: '230 MOP' },
      { emoji: '🦶', name: '足底按摩', desc: '穴位按压，唤醒疲惫双足。', value: '230 MOP' },
      { emoji: '🤚', name: '修手指甲', desc: '修剪、塑形、护理甲缘。', value: '220 MOP' },
      { emoji: '🧴', name: '修脚指甲', desc: '泡脚、修甲、甲缘护理、足部放松。', value: '220 MOP' },
      { emoji: '🤲', name: '手部按摩', desc: '释放手腕与前臂的紧绷感。', value: '200 MOP' },
      { emoji: '👂', name: '采耳', desc: '传统采耳体验，意外地让人放松。', value: '200 MOP' },
    ],
    steps: [
      {
        title: '由我们为您推荐 💬',
        body: '我们将根据您的预算、时间和喜好，为您推荐最适合的桑拿房，不必烦恼该选哪一家。我们在澳门经营多年，熟知每一家桑拿房！',
      },
      {
        title: '即时专车接送 🚗',
        body: '酒店大堂、机场、外港码头、氹仔码头、甚至街角——告诉我们您在哪，我们几分钟内到达。结束后，澳门境内任何地点皆可送达。',
        note: {
          title: '与朋友同行？',
          body: '我们的七座车轻松容纳——同样的礼遇人人享有，毫无额外费用。',
        },
      },
      {
        title: 'VIP 入场・内部优惠价 ⚡',
        body: '通过内部网络预约，您可直接进场、无需排队。每家桑拿都为我们的客人保留专属优惠价——告诉我们您想去哪一家，我们替您锁定折扣。',
      },
      {
        title: '任选 2 项 VIP 尊享 🎁',
        body: '我们对您通过我们预约的小小心意——我们会事先通知场地您的到访，到场时您可直接挑选大堂按摩（头部按摩、足底按摩、修甲等）。',
      },
      {
        title: '回程专车接送 🚗',
        body: '当您结束时——餐饮后、服务刚结束、任何时间——只需发信息给我们。同一辆专车会回来接您，送往您的酒店、机场、码头，或澳门境内任何地点。与接送同样零费用。',
      },
    ],
  },

  quickMatch: {
    badge: '★ 智能匹配',
    heading: [{ text: '一分钟，找出最适合你的' }, { text: '桑拿', accent: true }],
    intro: '回答几个问题，我们即时为你匹配 {count} 间中最契合的一间。',
    questions: {
      group: '几位？',
      experience: '想要什么体验？',
      when: '什么时候？',
      from: '从哪里出发？',
    },
    groupOptions: {
      solo: '1 位',
      pair: '2 位',
      small: '3-4 位',
      large: '5 位以上',
    },
    experienceOptions: {
      value: '预算优先',
      theme: '不同风格房间',
      taipa: '氹仔・路氹',
      new: '全新登场',
      ktv: 'KTV 包厢',
      classic: '经典臻选',
    },
    whenOptions: {
      now: '即刻',
      tonight: '今晚',
      tomorrow: '明天',
      sat: '周六晚',
      sun: '周日晚',
      other: '其他',
    },
    fromOptions: {
      border: '口岸',
      hotel: '酒店',
      airport: '机场',
      other: '其他',
    },
    overnightOn: '要过夜',
    overnightOff: '不过夜',
    overnightHint: '24小时场馆・舒适过夜优先',
    resultLabel: '为你推荐',
    pickedFrom: '由 {count} 间中精选',
    bestMatch: '最佳匹配',
    matchSuffix: '% 契合',
    details: '详情',
    bookNow: '立即预订・选你惯用的',
    messageTemplate:
      '你好，我在网站上匹配好了心水。体验：{experience}\n・人数：{group}\n・时间：{when}\n・出发地：{from}\n・过夜：{overnight}\n・目前想去：{venue}\n麻烦帮我确认价钱及 VIP 安排，谢谢！',
    yes: '要',
    no: '不用',
  },

  features: {
    heading: '为何选择我们',
    items: [
      { icon: 'crown', title: "收费透明", desc: '各项费用提前说明' },
      { icon: 'shield', title: "帮你推荐适合的桑拿房", desc: "贵不代表好，适合才是关键！" },
      { icon: 'sparkles', title: "澳门合法桑拿房", desc: "本网站所有桑拿房均可通过澳门旅游局查询到经营牌照。" },
      { icon: 'clock', title: '可过夜不加价', desc: '12-15 小时自由停留，含早餐与洗浴' },
    ],
  },

  testimonials: {
    heading: '出发前，最常需要确认的事',
    regionLabel: '行前确认清单',
    served: '先把需求说清，再核对具体安排',
    motion: { pause: '暂停行前清单动效', resume: '继续行前清单动效' },
    items: [
      {
        quote:
          '选会所前先确定关注的区域、环境、体验方向和预算，不必只凭一张推荐榜决定。',
        author: '选择会所',
      },
      {
        quote:
          '咨询时带上计划到访的日期，并问清哪些信息已经核实、哪些会随当天情况变化。',
        author: '核对当前状态',
      },
      {
        quote:
          '预算不仅看一个总数，还要分别确认预计费用、可选项目和场馆可能另收的内容。',
        author: '费用构成',
      },
      {
        quote:
          '申请接送时一次发齐上车点、日期、希望时间、人数和行李信息，便于核对路线与车辆。',
        author: '申请接送',
      },
      {
        quote:
          '只有收到明确的集合位置和接送时间段，并完成确认，才算接送已经安排。',
        author: '确认上车',
      },
      {
        quote:
          '提前说明行李件数、大致尺寸和特殊物品，避免车辆空间与实际需求不符。',
        author: '行李情况',
      },
      {
        quote:
          '需要返程时尽早提交目的地和预计离场时间；去程已确认不等于返程也已确认。',
        author: '返程安排',
      },
      {
        quote:
          '航班、船班或其他行程延误后及时更新抵达时间，原接送时段可能需要重新核对。',
        author: '抵达时间变化',
      },
      {
        quote:
          '多人同行先整理各自的重点和不能接受的条件，再找共同适合的选项。',
        author: '同行需求',
      },
      {
        quote:
          '提前说明常用语言，同时确认到场后有哪些事项需要直接与场馆沟通。',
        author: '语言沟通',
      },
      {
        quote:
          '人员和现场状态会变化，出发当天再查询一次，比依赖较早的名单更稳妥。',
        author: '当天可用情况',
      },
      {
        quote:
          '按具体日期核实营业和入场时间，较晚抵达时更要确认当晚是否仍可安排。',
        author: '营业时段',
      },
      {
        quote:
          '准备留宿前，先确认场馆当前是否开放过夜，以及适用时间和使用条件。',
        author: '过夜条件',
      },
      {
        quote:
          '遇到繁忙时段或状态变化时，准备一个能接受的备用选择，调整起来更从容。',
        author: '备用方案',
      },
      {
        quote:
          '提前问清支持的支付方式、使用币种、付款节点，以及哪些费用在场馆确认。',
        author: '支付信息',
      },
      {
        quote:
          '出发前了解抵达后的联系人、集合说明和入场步骤，减少现场临时查找。',
        author: '抵达流程',
      },
      {
        quote:
          '只提交完成安排所需要的个人信息，对用途或保存方式有疑问时先询问。',
        author: '个人信息',
      },
      {
        quote:
          '保存包含会所、集合点、接送时段和下一步的最终确认，出发前再核对一遍。',
        author: '最终确认',
      },
    ],
  },

  blog: {
    heading: '最新桑拿攻略',
    viewAll: '查看全部 →',
  },

  ctaBand: {
    heading: '不知道选哪间？让我们帮你推荐',
    body: '联系我们，根据你的喜好推荐最适合的场所',
    chat: '与我们聊聊',
    ranking: '排名',
    guide: '新手指南',
    faq: '常见问题',
  },

  contact: {
    heading: '联系我们',
    intro: '随时欢迎您的咨询，我们将竭诚为您服务',
    inquiryMessage: '你好，我想预约澳门桑拿，可以安排吗？',
    viewQr: '查看 QR',
    channels: {
      whatsapp: '立即联系',
      telegram: '@am38876',
      wechat: 'gh34366',
      line: '@224vqwdv',
    },
  },

  mission: {
    quote: '把信息说清，把安排确认好，让行程少走弯路。',
    body: '我们重视场馆差异、当前状态、接送细节和下一步是否交代清楚。遇到变化会尽早更新并重新确认，让您出发前了解实际安排，少猜测，也少折腾。',
  },

  footer: {
    backToTop: '↑ 返回顶部',
    links: [
      { path: '/', label: '首页' },
      { path: '/ranking/', label: '排名' },
      { path: '/guide/', label: '新手指南' },
      { path: '/faq/', label: '常见问题' },
      { path: '/about/', label: '关于我们' },
      { path: '/blog/', label: '桑拿攻略' },
      { path: '/shuttle/', label: '免费接送' },
      { path: '/contact/', label: '联系我们' },
      { path: '/privacy/', label: '隐私政策' },
    ],
    editorialPolicy: '编辑政策',
    copyright: '© 2026 澳门桑拿导航站。保留所有权利。',
  },

  wechat: {
    title: '加我们的微信',
    optionScan: '方式一：扫描上方 QR code',
    optionCopy: '方式二：复制 ID，在微信中搜索',
    copy: '复制微信 ID：gh34366',
    copied: '✓ 已复制！打开微信搜索加我们',
    manualCopy: '自动复制无法使用，请选中并手动复制微信 ID。',
    close: '关闭',
  },

  kakaotalk: {
    name: 'KakaoTalk',
    title: '在 KakaoTalk 添加我们为好友',
    optionScan: '方式一：扫描上方二维码',
    optionCopy: '方式二：复制 ID {id}，在 KakaoTalk 中搜索',
    copy: '复制 KakaoTalk ID：{id}',
    copied: '✓ 已复制！请打开 KakaoTalk 搜索此 ID',
    manualCopy: '自动复制无法使用，请选中并手动复制 KakaoTalk ID。',
    close: '关闭',
    qrAlt: 'KakaoTalk ID {id} 的二维码',
  },

  floatingPill: {
    label: '客服',
    aria: '联系客服 — 前往联系区',
  },
};

export default zhCN;
