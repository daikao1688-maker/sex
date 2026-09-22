import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");

async function readBuiltHome(locale) {
  return readFile(path.join(distRoot, locale, "index.html"), "utf8");
}

async function readBuiltPage(locale, slug) {
  return readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();
}

const localeFacts = {
  en: {
    openAllDay: "Open 24 hours",
    staffHours: "Staff:",
    nationalities: "Multinational therapists",
    team: "Multinational therapist team",
    overnightLabel: "Overnight",
    overnightAvailable: "Available",
  },
  "zh-TW": {
    openAllDay: "24小時營業",
    staffHours: "技師",
    nationalities: "多國技師",
    team: "多國籍技師團隊",
    overnightLabel: "過夜",
    overnightAvailable: "可過夜",
  },
  "zh-CN": {
    openAllDay: "24小时营业",
    staffHours: "技师",
    nationalities: "多国技师",
    team: "多国籍技师团队",
    overnightLabel: "过夜",
    overnightAvailable: "可过夜",
  },
  ja: {
    openAllDay: "24時間営業",
    staffHours: "女の子",
    nationalities: "多国籍セラピスト",
    team: "多国籍セラピストチーム",
    overnightLabel: "宿泊（24時間）",
    overnightAvailable: "宿泊OK",
  },
};

const venueFacts = {
  "number-nine-sauna": { staff: "80+", staffHours: "17:00 - 05:00", oldHours: "5:00 PM - 5:00 AM", price: "MOP 2,299 - 5,999", overnight: true },
  "shang-pin-spa": { staff: "90+", staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 5:00 AM", price: "MOP 2,299 - 6,499", oldPrice: "MOP 999 - 5,999", overnight: true },
  "majesty-spa": { staff: "70+", staffHours: "14:00 - 05:00", oldHours: "2:00 PM - 5:00 AM", price: "MOP 2,799 - 6,699", oldPrice: "MOP 1,099 - 5,899", overnight: true },
  "the-excellent-sauna": { staff: "40+", staffHours: "13:00 - 05:00", oldHours: "12:00 PM - 4:00 AM", price: "MOP 2,488 - 6,388", oldPrice: "MOP 988 - 5,288", overnight: true },
  "empire-sauna": { staff: "team", staffHours: "17:00 - 06:00", oldHours: "5:00 PM - 6:00 AM", price: "MOP 2,488 - 7,388", oldPrice: "MOP 1,088 - 6,388", overnight: true },
  "east-castle-spa": { staff: "60+", staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 6:00 AM", price: "MOP 2,388 - 6,498", oldPrice: "MOP 1,468 - 2,528", overnight: true },
  "victoria-sauna": { staff: "70+", staffHours: "13:00 - 05:00", oldHours: "1:00 PM - 5:00 AM", price: "MOP 2,298 - 6,998", overnight: true },
  "m-club": { staff: "60+", staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 5:00 AM", price: "MOP 2,388 - 6,498", overnight: true },
  "number-one-sauna": { staff: "130+", staffHours: "13:00 - 05:00", oldHours: "1:00 PM - 5:00 AM", price: "MOP 2,199 - 7,699", overnight: true },
  "familia-nobre": { staff: "80+", staffHours: "16:00 - 06:00", oldHours: "4:00 PM - 6:00 AM", price: "MOP 2,388 - 6,988", overnight: true },
};

test("renders the revised venue facts in every locale", async () => {
  for (const [locale, copy] of Object.entries(localeFacts)) {
    for (const [slug, facts] of Object.entries(venueFacts)) {
      const text = visibleText(await readBuiltPage(locale, slug));
      const staffValue = facts.staff === "team" ? copy.team : facts.staff;

      assert.ok(
        text.includes(facts.staff === "team" ? staffValue : `${staffValue} | ${copy.nationalities}`),
        `${locale}/${slug} is missing the revised staff lineup`,
      );
      assert.ok(
        text.includes(`${copy.openAllDay} ${copy.staffHours} ${facts.staffHours}`),
        `${locale}/${slug} is missing the revised opening and staff hours`,
      );
      if (facts.price) {
        assert.ok(text.includes(facts.price), `${locale}/${slug} is missing ${facts.price}`);
      }
      assert.ok(!text.includes(facts.oldHours), `${locale}/${slug} still contains ${facts.oldHours}`);
      if (facts.oldPrice) {
        assert.ok(!text.includes(facts.oldPrice), `${locale}/${slug} still contains ${facts.oldPrice}`);
      }
      if (facts.overnight) {
        assert.ok(
          text.includes(`${copy.overnightLabel} ${copy.overnightAvailable}`),
          `${locale}/${slug} is missing the revised overnight availability`,
        );
      }
    }
  }
});

test("Shang Pin stays out of the new-venue filter when its venue fact is not new", async () => {
  for (const locale of ["en", "zh-TW", "zh-CN", "ja", "ko"]) {
    const html = await readBuiltHome(locale);
    const card = html.match(
      new RegExp(`data-buckets="([^"]*)"[\\s\\S]{0,600}href="/${locale}/spa/shang-pin-spa/"`),
    );

    assert.ok(card, `${locale} homepage is missing the Shang Pin card`);
    assert.ok(
      !card[1].split(/\s+/).includes("new"),
      `${locale} puts Shang Pin in the new filter although its isNew fact is false`,
    );
  }
});

test("ranking prices describe package ranges and distinguish fees included in the displayed price", async () => {
  const expectations = {
    en: {
      range: "Typical package range (MOP)",
      note: "not entry-only prices",
      noSurcharge: "No separate surcharge",
    },
    "zh-TW": {
      range: "一般套餐參考範圍（MOP）",
      note: "並非單獨入場費",
      noSurcharge: "不另收服務費",
    },
    "zh-CN": {
      range: "一般套餐参考范围（MOP）",
      note: "并非单独入场费",
      noSurcharge: "不另收服务费",
    },
    ja: {
      range: "一般パッケージ目安（MOP）",
      note: "入場料のみの表示ではありません",
      noSurcharge: "別途加算なし",
    },
    ko: {
      range: "일반 패키지 참고 범위 (MOP)",
      note: "입장료만을 뜻하지 않습니다",
      noSurcharge: "별도 부과 없음",
    },
  };

  for (const [locale, expected] of Object.entries(expectations)) {
    const html = await readFile(path.join(distRoot, locale, "ranking", "index.html"), "utf8");
    const pricingStart = html.indexOf('id="ranking-pricing-title"');
    const pricingEnd = html.indexOf('id="ranking-overnight-title"', pricingStart);
    const pricingSection = html.slice(pricingStart, pricingEnd);
    const empireRow = (pricingSection.match(/<tr\b[\s\S]*?<\/tr>/g) ?? []).find((row) =>
      row.includes(`href="/${locale}/spa/empire-sauna/"`),
    ) ?? "";

    assert.ok(pricingSection.includes(expected.range), `${locale} ranking must identify the values as package ranges`);
    assert.ok(pricingSection.includes(expected.note), `${locale} ranking must explain what the range includes`);
    assert.ok(
      empireRow.includes(expected.noSurcharge),
      `${locale} Empire row must describe the fee as having no separate surcharge`,
    );
  }
});

const zhCnDescriptionMarkers = {
  "number-nine-sauna": [
    "玖号水疗位于御龙酒店内，是 2026 年开业的市中心水疗会所。",
    "房间以红色、粉紫和蓝紫等色调搭配星空天花",
  ],
  "shang-pin-spa": [
    "尚品国际水疗位于澳门葡京人二楼 L2 R95，属于路氹区较新的高端水疗场所。",
    "宽敞的沐浴区与安静的休息空间，适合在游览之间放慢脚步。",
  ],
  "majesty-spa": [
    "尊贵水疗位于澳门渔人码头励庭海景酒店内，以华丽装修、宽敞大厅和舒适的休息空间为特色。",
    "客人可先泡浴或用餐，再按需要了解按摩项目与房间安排。",
  ],
  "the-excellent-sauna": [
    "极品桑拿位于澳门半岛英皇娱乐酒店内，采用较精致的空间规划",
    "馆内设 24 小时休息区；需要过夜或指定房型，请于预约前确认供应及费用。",
  ],
  "empire-sauna": [
    "巨亨桑拿是澳门半岛于 2026 年开业的水疗会所",
    "馆内设有水床房、多款不同设计的套房及过夜休息安排",
  ],
  "east-castle-spa": [
    "东方皇堡水疗位于皇家金堡酒店 3、4 楼，以宽敞的沐浴空间和整洁完善的私人房间为特色。",
    "会所整体氛围安静雅致，适合希望放慢节奏、从容休息的客人。",
  ],
  "victoria-sauna": [
    "凯旋桑拿是一间低调型澳门桑拿，没有太强的网红感",
    "它的亮点在性价比与留宿便利。",
  ],
  "m-club": [
    "晋会 MCLUB 位于华都酒店内，目前暂停营业，暂不接待客人或提供预约服务。",
    "图片与设施记录不代表目前可使用",
  ],
};

test("renders the approved Simplified Chinese introductions", async () => {
  for (const [slug, markers] of Object.entries(zhCnDescriptionMarkers)) {
    const text = visibleText(await readBuiltPage("zh-CN", slug));
    for (const marker of markers) {
      assert.ok(text.includes(marker), `zh-CN/${slug} is missing: ${marker}`);
    }
  }
});

const translatedDescriptionMarkers = {
  "zh-TW": {
    "number-nine-sauna": ["玖號水療位於御龍酒店內", "房間以紅色、粉紫和藍紫等色調搭配星空天花"],
    "shang-pin-spa": ["尚品國際水療位於澳門葡京人二樓 L2 R95", "寬敞的沐浴區與安靜的休息空間"],
    "majesty-spa": ["尊貴水療位於澳門漁人碼頭勵庭海景酒店內", "客人可先泡浴或用餐，再按需要了解按摩項目與房間安排。"],
    "the-excellent-sauna": ["極品桑拿位於澳門半島英皇娛樂酒店內", "館內設 24 小時休息區"],
    "empire-sauna": ["巨亨桑拿是澳門半島於 2026 年開業的水療會所", "館內設有水床房、多款不同設計的套房及過夜休息安排"],
    "east-castle-spa": ["東方皇堡水療位於皇家金堡酒店 3、4 樓", "會所整體氛圍安靜雅緻，適合希望放慢節奏、從容休息的客人。"],
    "victoria-sauna": ["凱旋桑拿是一間低調型澳門桑拿", "它的亮點在性價比與留宿便利。"],
    "m-club": ["晉會 MCLUB 位於華都酒店內，目前暫停營業", "圖片與設施記錄不代表目前可使用"],
  },
  en: {
    "number-nine-sauna": ["Number Nine Spa opened in 2026 inside the Royal Dragon Hotel", "Rooms combine red, pink-purple or blue-purple palettes with starry ceilings."],
    "shang-pin-spa": ["Shang Pin Spa occupies Level 2, unit L2 R95, at Lisboeta Macau", "Spacious bathing areas and quiet lounges offer a place to pause between sightseeing stops."],
    "majesty-spa": ["Majesty Spa is located inside Harbourview Hotel at Macau Fisherman's Wharf", "Guests can bathe or dine before discussing massage options and room arrangements."],
    "the-excellent-sauna": ["The Excellent Sauna is located inside Grand Emperor Hotel", "The venue has a 24-hour rest area"],
    "empire-sauna": ["Empire Sauna opened on the Macau Peninsula in 2026", "Facilities include waterbed rooms, suites in different styles and overnight rest arrangements"],
    "east-castle-spa": ["East Castle Spa occupies the third and fourth floors of Casa Real Hotel.", "The atmosphere is quiet and refined, suited to guests who want to slow down and rest."],
    "victoria-sauna": ["Victoria Sauna is a low-key Macau sauna.", "Its highlights are value for money"],
    "m-club": ["MCLUB is located inside Waldo Hotel and is currently temporarily closed.", "Photos and facility descriptions do not indicate current availability."],
  },
  ja: {
    "number-nine-sauna": ["ナンバーナインスパは、2026年にマカオ中心部の御龍酒店", "客室は赤、ピンクパープル、ブルーパープル"],
    "shang-pin-spa": ["シャンピンスパは、リスボエタ・マカオの2階、L2 R95", "広い入浴エリアと落ち着いた休憩スペース"],
    "majesty-spa": ["マジェスティスパは、マカオ・フィッシャーマンズワーフ", "リクライニングチェアや個別休憩室の空きと料金を事前に確認してください。"],
    "the-excellent-sauna": ["エクセレントサウナは、マカオ半島のグランドエンペラーホテル内", "24時間利用の休憩エリアがあります"],
    "empire-sauna": ["エンパイアサウナは、2026年にマカオ半島で開業した施設です。", "ウォーターベッドを備えた部屋や異なる内装の客室、宿泊休憩の設備"],
    "east-castle-spa": ["イーストキャッスルスパ（東方皇堡水療）は、カーサ・レアル・ホテル（皇家金堡酒店）の3階と4階にあります。", "館内は静かで上品な雰囲気に包まれ、慌ただしさを離れて休みたい方に向いています。"],
    "victoria-sauna": ["ヴィクトリアサウナ（凱旋桑拿）は、控えめなタイプ", "魅力はコストパフォーマンスと宿泊のしやすさです。"],
    "m-club": ["エムクラブ（MCLUB）はワルドホテル内の施設で、現在は一時休業中です。", "写真や設備紹介は現在利用できることを示すものではありません。"],
  },
};

test("renders the approved introductions in every translated locale", async () => {
  for (const [locale, venues] of Object.entries(translatedDescriptionMarkers)) {
    for (const [slug, markers] of Object.entries(venues)) {
      const text = visibleText(await readBuiltPage(locale, slug));
      for (const marker of markers) {
        assert.ok(text.includes(marker), `${locale}/${slug} is missing: ${marker}`);
      }
    }
  }
});

test("renders the revised Majesty and Victoria highlights in Simplified Chinese", async () => {
  const majesty = visibleText(await readBuiltPage("zh-CN", "majesty-spa"));
  assert.ok(!majesty.includes("买一送一（详情预约时说明）"), "Majesty must not retain the removed BOGO promotion");
  assert.ok(majesty.includes("十多种不同风格房间"), "Majesty must retain the requested room-design description");

  const victoria = visibleText(await readBuiltPage("zh-CN", "victoria-sauna"));
  for (const highlight of [
    "环境安静细致",
    "水床买一送一",
    "服务细心周到",
    "凌晨3:00后免费独立休息房",
  ]) {
    assert.ok(victoria.includes(highlight), `zh-CN/victoria-sauna is missing: ${highlight}`);
  }
});

test("keeps The Excellent service fee consistent with the shared venue fact", async () => {
  const staleFeeCopy = [
    "zero service fee",
    "サービス料は一切かかりません",
    "全程免收服務費",
    "全程免收服务费",
  ];

  for (const locale of ["en", "ja", "ko", "zh-TW", "zh-CN"]) {
    const html = await readBuiltPage(locale, "the-excellent-sauna");
    const relatedStart = html.indexOf('id="related"');
    assert.ok(relatedStart > 0, `${locale}/the-excellent-sauna is missing the related-venues boundary`);
    const text = visibleText(html.slice(0, relatedStart));
    const feeRow = html.slice(0, relatedStart).match(/<p\b[^>]*\bdata-spa-service-fee\b[^>]*>([\s\S]*?)<\/p>/);
    assert.ok(feeRow, `${locale}/the-excellent-sauna is missing the service-fee row`);
    assert.match(visibleText(feeRow[1]), /:\s*10%\s*$/, `${locale}/the-excellent-sauna must show the 10% service fee`);
    for (const stale of staleFeeCopy) {
      assert.ok(!text.includes(stale), `${locale}/the-excellent-sauna still contains: ${stale}`);
    }
  }
});

test("does not publish stale The Excellent hours or overnight claims", async () => {
  const sources = [
    "src/i18n/pages/faq.ts",
    "src/i18n/pages/guide.ts",
  ];
  const blogDir = path.join(projectRoot, "src", "content", "blog");
  const blogEntries = await readdir(blogDir, { recursive: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  for (const entry of blogEntries.filter((name) => name.endsWith(".md"))) {
    sources.push(path.join("src", "content", "blog", entry));
  }

  const staleLinePattern =
    /12:00\s*(?:PM\s*-\s*4:00\s*AM|[–—〜~-]\s*04:00)|no overnight|does not offer overnight|doesn't take overnight|不設過夜|不设过夜|宿泊不可|宿泊はできません|宿泊には対応していない|宿泊は不可/i;
  const excellentPattern = /the-excellent-sauna|The Excellent|極品|极品|エクセレント/i;
  const staleGuideClaims = [
    "The only venue in Macau with therapists on duty 24 hours",
    "マカオで唯一、24時間ずっと女の子が出勤しているお店",
    "全澳唯一24小時有技師在班的場所",
    "全澳唯一24小时有技师在班的场所",
  ];

  for (const relativePath of sources) {
    const source = await readFile(path.join(projectRoot, relativePath), "utf8");
    for (const [index, line] of source.split("\n").entries()) {
      const statements = line.split(/[.!?。！？]+(?:\s*|$)|[；;]+/);
      for (const statement of statements.filter((value) => excellentPattern.test(value))) {
        assert.ok(
          !staleLinePattern.test(statement),
          `${relativePath}:${index + 1} still publishes a stale The Excellent claim`,
        );
      }
    }
    for (const stale of staleGuideClaims) {
      assert.ok(!source.includes(stale), `${relativePath} still contains: ${stale}`);
    }
  }
});

test("keeps shared FAQ and guide claims aligned with venue-specific facts", async () => {
  const faq = await readFile(path.join(projectRoot, "src/i18n/pages/faq.ts"), "utf8");
  assert.ok(
    !faq.includes("女の子の出勤時間は13:00〜翌05:00なので"),
    "Japanese FAQ still presents one therapist shift as universal",
  );
  assert.ok(
    faq.includes("店舗が24時間営業でも、すべてのマッサージを終日受けられるとは限りません"),
    "Japanese FAQ must distinguish venue opening hours from massage availability",
  );

  const guide = await readFile(path.join(projectRoot, "src/i18n/pages/guide.ts"), "utf8");
  for (const stale of [
    "All venues have rest areas with recliners where you can relax or stay overnight for free",
    "各店ともリクライニングチェアの休憩エリアがあり、無料で休んだりそのまま宿泊",
    "所有場所均設有休息區躺椅，可免費休息或直接過夜",
    "所有场所均设有休息区躺椅，可免费休息或直接过夜",
  ]) {
    assert.ok(!guide.includes(stale), `Guide still contains: ${stale}`);
  }
  const currentOvernightClaims = {
    en: "Manhao Spa currently does not offer overnight stays",
    ja: "マンハオスパ（曼濠水療）は現在宿泊に対応していない",
    "zh-TW": "曼濠水療目前不提供過夜",
    "zh-CN": "曼濠水疗目前不提供过夜",
    ko: "만하오 스파는 현재 숙박을 제공하지 않으니",
  };
  for (const [locale, current] of Object.entries(currentOvernightClaims)) {
    const renderedGuide = visibleText(await readFile(path.join(distRoot, locale, "guide", "index.html"), "utf8"));
    assert.ok(renderedGuide.includes(current), `${locale} guide is missing: ${current}`);
    assert.doesNotMatch(renderedGuide, /Clube Rio|クラブリオ|利澳[薈荟]|클루브 리오/);
  }
});
