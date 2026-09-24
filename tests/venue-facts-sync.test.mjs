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
    staffValue: "Multinational therapists",
    overnightLabel: "Overnight",
    overnightAvailable: "Available",
  },
  "zh-TW": {
    openAllDay: "24小時營業",
    staffHours: "技師",
    staffValue: "多國技師",
    overnightLabel: "過夜",
    overnightAvailable: "可過夜",
  },
  "zh-CN": {
    openAllDay: "24小时营业",
    staffHours: "技师",
    staffValue: "多国技师",
    overnightLabel: "过夜",
    overnightAvailable: "可过夜",
  },
  ja: {
    openAllDay: "24時間営業",
    staffHours: "セラピスト勤務時間",
    staffValue: "多国籍セラピスト",
    overnightLabel: "宿泊（24時間）",
    overnightAvailable: "宿泊OK",
  },
  ko: {
    openAllDay: "24시간 영업",
    staffHours: "테라피스트:",
    staffValue: "다국적 테라피스트",
    overnightLabel: "숙박",
    overnightAvailable: "숙박 가능",
  },
};

const venueFacts = {
  "number-nine-sauna": { staffHours: "17:00 - 05:00", oldHours: "5:00 PM - 5:00 AM", price: "MOP 2,299 - 5,999", overnight: true },
  "shang-pin-spa": { staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 5:00 AM", price: "MOP 2,299 - 6,499", oldPrice: "MOP 999 - 5,999", overnight: true },
  "majesty-spa": { staffHours: "14:00 - 05:00", oldHours: "2:00 PM - 5:00 AM", price: "MOP 2,799 - 6,699", oldPrice: "MOP 1,099 - 5,899", overnight: true },
  "the-excellent-sauna": { staffHours: "13:00 - 05:00", oldHours: "12:00 PM - 4:00 AM", price: "MOP 2,488 - 6,388", oldPrice: "MOP 988 - 5,288", overnight: true },
  "empire-sauna": { staffHours: "17:00 - 06:00", oldHours: "5:00 PM - 6:00 AM", price: "MOP 2,488 - 7,388", oldPrice: "MOP 1,088 - 6,388", overnight: true },
  "east-castle-spa": { staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 6:00 AM", price: "MOP 2,388 - 6,498", oldPrice: "MOP 1,468 - 2,528", overnight: true },
  "victoria-sauna": { staffHours: "13:00 - 05:00", oldHours: "1:00 PM - 5:00 AM", price: "MOP 2,298 - 6,998", overnight: true },
  "m-club": { staffHours: "15:00 - 05:00", oldHours: "3:00 PM - 5:00 AM", price: "MOP 2,388 - 6,498", overnight: true },
  "number-one-sauna": { staffHours: "13:00 - 05:00", oldHours: "1:00 PM - 5:00 AM", price: "MOP 2,199 - 7,699", overnight: true },
  "familia-nobre": { staffHours: "16:00 - 06:00", oldHours: "4:00 PM - 6:00 AM", price: "MOP 2,388 - 6,988", overnight: true },
};

test("renders the revised venue facts in every locale", async () => {
  for (const [locale, copy] of Object.entries(localeFacts)) {
    const slugs = (await readdir(path.join(distRoot, locale, "spa"), { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    assert.equal(slugs.length, 14, `${locale} must render all visible venue profiles`);
    for (const slug of slugs) {
      const html = await readBuiltPage(locale, slug);
      const text = visibleText(html);
      const staffValue = html.match(/<div\b[^>]*data-info-icon="staff"[\s\S]*?<dd\b[^>]*>([\s\S]*?)<\/dd>/)?.[1];

      assert.ok(staffValue, `${locale}/${slug} is missing the staff value`);
      assert.equal(
        visibleText(staffValue),
        copy.staffValue,
        `${locale}/${slug} must show only the shared staff label without counts or nationalities`,
      );
      const facts = venueFacts[slug];
      if (!facts) continue;
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

function introductionText(html) {
  const introduction = html.match(/<p\b[^>]*class="[^"]*\bwhitespace-pre-line\b[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1];
  assert.ok(introduction, "Venue page is missing its introduction");
  return visibleText(introduction);
}

const zhCnDescriptionMarkers = {
  "number-nine-sauna": ["2026年4月", "御龙酒店", "自助任食"],
  "shang-pin-spa": ["2025年7月", "澳门葡京人", "二楼L2 R95", "按摩浴池"],
  "majesty-spa": ["渔人码头励庭海景酒店", "外港客运码头", "浴区设有大电视"],
  "the-excellent-sauna": ["2017年5月", "英皇娱乐酒店十楼", "餐饮和休息设施"],
  "empire-sauna": ["2026年4月", "澳门半岛", "酒店风格套房", "装修花费为1,000万美元"],
  "east-castle-spa": ["皇家金堡酒店三、四楼", "宽敞的浴区"],
  "victoria-sauna": ["凯旋门酒店五楼", "美高梅、永利澳门和新葡京", "小吃和正餐"],
  "m-club": [
    "晋会 MCLUB 位于华都酒店内，目前暂停营业，暂不接待客人或提供预约服务。",
    "图片与设施记录不代表目前可使用",
  ],
};

test("renders the approved Simplified Chinese introductions", async () => {
  for (const [slug, markers] of Object.entries(zhCnDescriptionMarkers)) {
    const text = introductionText(await readBuiltPage("zh-CN", slug));
    for (const marker of markers) {
      assert.ok(text.includes(marker), `zh-CN/${slug} is missing: ${marker}`);
    }
  }
});

const translatedDescriptionMarkers = {
  "zh-TW": {
    "number-nine-sauna": ["2026年4月", "御龍酒店", "任食餐飲"],
    "shang-pin-spa": ["2025年7月", "澳門葡京人", "二樓L2 R95", "按摩浴池"],
    "majesty-spa": ["漁人碼頭勵庭海景酒店", "外港客運碼頭", "浴區設有大電視"],
    "the-excellent-sauna": ["2017年5月", "英皇娛樂酒店十樓", "餐飲與休息設施"],
    "empire-sauna": ["2026年4月", "澳門半島", "酒店風格套房", "裝修花費為1,000萬美元"],
    "east-castle-spa": ["皇家金堡酒店三、四樓", "寬敞的浴區"],
    "victoria-sauna": ["凱旋門酒店五樓", "美高梅、永利澳門及新葡京", "小吃與正餐"],
    "m-club": ["晉會 MCLUB 位於華都酒店內，目前暫停營業", "圖片與設施記錄不代表目前可使用"],
  },
  en: {
    "number-nine-sauna": ["Royal Dragon Hotel in April 2026", "all-you-can-eat buffet"],
    "shang-pin-spa": ["July 2025", "Level 2 of Lisboeta Macau", "L2 R95", "whirlpool baths"],
    "majesty-spa": ["Harbourview Hotel at Macau Fisherman's Wharf", "Outer Harbour Ferry Terminal", "large television in the bathing area"],
    "the-excellent-sauna": ["May 2017", "tenth floor of Grand Emperor Hotel", "dining area and rest facilities"],
    "empire-sauna": ["April 2026", "Macau Peninsula", "hotel-style suites", "renovation cost was US$10 million"],
    "east-castle-spa": ["third and fourth floors of Casa Real Hotel", "Large bathing areas"],
    "victoria-sauna": ["fifth floor of L'Arc Hotel", "MGM Macau, Wynn Macau and Grand Lisboa", "snacks and full meals"],
    "m-club": ["MCLUB is located inside Waldo Hotel and is currently temporarily closed.", "Photos and facility descriptions do not indicate current availability."],
  },
  ja: {
    "number-nine-sauna": ["2026年4月", "御龍酒店", "ビュッフェ形式"],
    "shang-pin-spa": ["2025年7月", "リスボエタ・マカオ", "2階のL2 R95", "ジェットバス"],
    "majesty-spa": ["フィッシャーマンズ・ワーフ", "ハーバービュー・ホテル（勵庭海景酒店）", "外港フェリーターミナル", "浴場には大型テレビ"],
    "the-excellent-sauna": ["2017年5月", "英皇娛樂酒店）の10階", "食事や休憩の設備"],
    "empire-sauna": ["2026年4月", "マカオ半島", "ホテル風のスイート", "1,000万米ドル"],
    "east-castle-spa": ["皇家金堡酒店）の3階と4階", "広い浴場"],
    "victoria-sauna": ["凱旋門酒店）の5階", "MGMマカオ、ウィン・マカオ、グランド・リスボア", "軽食や食事"],
    "m-club": ["エムクラブ（MCLUB）はワルドホテル内の施設で、現在は一時休業中です。", "写真や設備紹介は現在利用できることを示すものではありません。"],
  },
};

test("renders the approved introductions in every translated locale", async () => {
  for (const [locale, venues] of Object.entries(translatedDescriptionMarkers)) {
    for (const [slug, markers] of Object.entries(venues)) {
      const text = introductionText(await readBuiltPage(locale, slug));
      for (const marker of markers) {
        assert.ok(text.includes(marker), `${locale}/${slug} is missing: ${marker}`);
      }
    }
  }
});

test("retains Victoria highlights while removing the retired Majesty feature-card copy", async () => {
  const majesty = visibleText(await readBuiltPage("zh-CN", "majesty-spa"));
  assert.ok(!majesty.includes("买一送一（详情预约时说明）"), "Majesty must not retain the removed BOGO promotion");
  assert.ok(!majesty.includes("十多种不同风格房间"), "the removed feature-card description must not remain visible");

  const victoria = visibleText(await readBuiltPage("zh-CN", "victoria-sauna"));
  assert.ok(!victoria.includes("水床买一送一"), "Victoria must not retain the withdrawn waterbed promotion");
  for (const highlight of [
    "环境安静细致",
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

  for (const locale of ["en", "ja", "zh-TW", "zh-CN", "ko"]) {
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
