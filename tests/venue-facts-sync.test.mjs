import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");

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
    nationalities: "China, Vietnam, Thailand, Taiwan, Japan, Korea, Russia, Ukraine",
    team: "Multinational therapist team",
    overnightLabel: "Overnight",
    overnightAvailable: "Available",
  },
  "zh-TW": {
    openAllDay: "24小時營業",
    staffHours: "技師",
    nationalities: "中、越、泰、台、日、韓、俄、烏",
    team: "多國籍技師團隊",
    overnightLabel: "過夜",
    overnightAvailable: "可過夜",
  },
  "zh-CN": {
    openAllDay: "24小时营业",
    staffHours: "技师",
    nationalities: "中、越、泰、台、日、韩、俄、乌",
    team: "多国籍技师团队",
    overnightLabel: "过夜",
    overnightAvailable: "可过夜",
  },
  ja: {
    openAllDay: "24時間営業",
    staffHours: "女の子",
    nationalities: "中国、ベトナム、タイ、台湾、日本、韓国、ロシア、ウクライナ",
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
        text.includes(`${staffValue} | ${copy.nationalities}`),
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

const zhCnDescriptionMarkers = {
  "number-nine-sauna": [
    "玖号水疗位于御龙酒店内，是 2026 年澳门市中心很受关注的新场之一。",
    "房型方面，红色、粉紫、蓝紫等不同氛围房搭配星空天花",
  ],
  "shang-pin-spa": [
    "尚品国际水疗位于澳门葡京人二楼 L2 R95，属于路氹区较新的高端水疗场。",
    "它的吸引力在于精致而不吵。",
  ],
  "majesty-spa": [
    "尊贵水疗位于澳门渔人码头励庭海景酒店内，主打的是华丽环境与留宿舒适度。",
    "最适合尊贵水疗的客人，是想把桑拿当成一晚放松行程",
  ],
  "the-excellent-sauna": [
    "极品桑拿藏在澳门半岛英皇娱乐酒店内，走的是精品型主题房路线。",
    "这里的节奏相对清静，适合不想在人海大厅里做选择的客人。",
  ],
  "empire-sauna": [
    "巨亨桑拿走的是 2026 新派高端路线",
    "如果你想试新场，巨亨最值得留意的是水床房、主题套房与可过夜休息安排。",
  ],
  "east-castle-spa": [
    "东方皇堡水疗的记忆点，不在于把场地做得多浮夸，而是把「主题」做成完整体验。",
    "这里适合已经不满足于传统泡浴加按摩流程的人。",
  ],
  "victoria-sauna": [
    "凯旋桑拿是一间低调型澳门桑拿，没有太强的网红感",
    "它的亮点在性价比与留宿便利。",
  ],
  "m-club": [
    "晋会 MCLUB 的定位很清楚：不是传统大池大厅路线，而是科技感、派对感和主题房。",
    "与东方皇堡同系的主题基因在这里被做得更前卫。",
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
    "number-nine-sauna": ["玖號水療位於御龍酒店內", "房型方面，紅色、粉紫、藍紫"],
    "shang-pin-spa": ["尚品國際水療位於澳門葡京人二樓 L2 R95", "它的吸引力在於精緻而不吵。"],
    "majesty-spa": ["尊貴水療位於澳門漁人碼頭勵庭海景酒店內", "最適合尊貴水療的客人"],
    "the-excellent-sauna": ["極品桑拿藏在澳門半島英皇娛樂酒店內", "這裡的節奏相對清靜"],
    "empire-sauna": ["巨亨桑拿走的是 2026 新派高端路線", "如果你想試新場"],
    "east-castle-spa": ["東方皇堡水療的記憶點", "這裡適合已經不滿足於傳統泡浴加按摩流程的人。"],
    "victoria-sauna": ["凱旋桑拿是一間低調型澳門桑拿", "它的亮點在性價比與留宿便利。"],
    "m-club": ["晉會 MCLUB 的定位很清楚", "與東方皇堡同系的主題基因"],
  },
  en: {
    "number-nine-sauna": ["Number Nine Spa is located inside the Royal Dragon Hotel", "Rooms in red, pink-purple, blue-violet"],
    "shang-pin-spa": ["Shang Pin Spa is located at L2 R95 on the second floor of Lisboeta Macau", "Its appeal lies in being refined without being noisy."],
    "majesty-spa": ["Majesty Spa is located inside Harbourview Hotel at Macau Fisherman's Wharf", "Majesty Spa best suits guests"],
    "the-excellent-sauna": ["The Excellent Sauna is tucked inside the Grand Emperor Hotel", "The pace here is relatively quiet"],
    "empire-sauna": ["Empire Sauna follows a new-generation high-end direction for 2026", "If you want to try a new venue"],
    "east-castle-spa": ["East Castle Spa is memorable not because the venue is extravagant", "This venue suits people who are no longer satisfied"],
    "victoria-sauna": ["Victoria Sauna is a low-key Macau sauna.", "Its highlights are value for money"],
    "m-club": ["MCLUB has a clear positioning", "The themed DNA it shares with East Castle Spa"],
  },
  ja: {
    "number-nine-sauna": ["ナンバーナインスパは御龍酒店", "客室は、赤、ピンクパープル、ブルーパープル"],
    "shang-pin-spa": ["シャンピンスパは、リスボエタ・マカオの2階、L2 R95", "魅力は、洗練されていながら騒がしくないことです。"],
    "majesty-spa": ["マジェスティスパは、マカオ・フィッシャーマンズワーフ", "マジェスティスパに特に合うのは"],
    "the-excellent-sauna": ["エクセレントサウナはマカオ半島のグランドエンペラーホテル内", "ここは比較的静かなペース"],
    "empire-sauna": ["エンパイアサウナ（巨亨桑拿）は、2026年らしい新世代の高級路線", "新しい施設を試したいなら"],
    "east-castle-spa": ["イーストキャッスルスパ（東方皇堡水療）の印象に残る点", "従来の入浴とマッサージだけの流れでは物足りない方"],
    "victoria-sauna": ["ヴィクトリアサウナ（凱旋桑拿）は、控えめなタイプ", "魅力はコストパフォーマンスと宿泊のしやすさです。"],
    "m-club": ["エムクラブ（晉會 MCLUB）の方向性は明確です。", "イーストキャッスルスパ（東方皇堡水療）と同系列"],
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
  assert.ok(majesty.includes("买一送一（详情预约时说明）"));

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
  const expectedFeeCopy = {
    en: "A 10% service fee applies",
    ja: "サービス料は10%です",
    "zh-TW": "另收 10% 服務費",
    "zh-CN": "另收 10% 服务费",
  };
  const staleFeeCopy = [
    "zero service fee",
    "サービス料は一切かかりません",
    "全程免收服務費",
    "全程免收服务费",
  ];

  for (const [locale, expected] of Object.entries(expectedFeeCopy)) {
    const text = visibleText(await readBuiltPage(locale, "the-excellent-sauna"));
    assert.ok(text.includes(expected), `${locale}/the-excellent-sauna is missing the 10% service fee`);
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
  for (const locale of ["en", "ja", "zh-TW", "zh-CN"]) {
    const blogDir = path.join(projectRoot, "src", "content", "blog", locale);
    const entries = await readdir(blogDir);
    for (const entry of entries.filter((name) => name.endsWith(".md"))) {
      sources.push(path.join("src", "content", "blog", locale, entry));
    }
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
    faq.includes("出勤時間は店ごとにおおむね13:00〜翌06:00の範囲"),
    "Japanese FAQ is missing the venue-specific therapist-hours guidance",
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
  for (const current of [
    "Manhao Spa and Clube Rio currently do not offer overnight stays",
    "マンハオスパ（曼濠水療）とクラブリオ（利澳薈）は現在宿泊に対応していない",
    "曼濠水療與利澳薈目前不提供過夜",
    "曼濠水疗与利澳荟目前不提供过夜",
  ]) {
    assert.ok(guide.includes(current), `Guide is missing: ${current}`);
  }
});
