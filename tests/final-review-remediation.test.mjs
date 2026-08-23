import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");

const readPage = (...segments) => readFile(path.join(distRoot, ...segments, "index.html"), "utf8");

const rgb = (hex) => {
  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const value = Number.parseInt(normalized.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const luminance = (color) => {
  const linear = color.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

const contrast = (foreground, background) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

const compositeWhite = (background, alpha) =>
  background.map((channel) => Math.round(255 * alpha + channel * (1 - alpha)));

test("representative dark and paper secondary text tokens meet WCAG AA", async () => {
  for (const background of [rgb("#0a0a0a"), rgb("#141414")]) {
    assert.ok(
      contrast(compositeWhite(background, 0.6), background) >= 4.5,
      "text-white/60 must stay AA-safe on site dark surfaces",
    );
  }

  const styles = await readFile(path.join(projectRoot, "src/styles/global.css"), "utf8");
  const paperBackground = rgb(styles.match(/--paper-bg:\s*(#[0-9a-f]{6})/i)?.[1] ?? "#000000");
  const paperCard = rgb(styles.match(/--paper-card:\s*(#[0-9a-f]{3,6})/i)?.[1] ?? "#000000");
  const paperSoft = rgb(styles.match(/--paper-soft:\s*(#[0-9a-f]{6})/i)?.[1] ?? "#ffffff");
  assert.ok(contrast(paperSoft, paperBackground) >= 4.5, "paper-soft must be AA-safe on the paper background");
  assert.ok(contrast(paperSoft, paperCard) >= 4.5, "paper-soft must be AA-safe on white article cards");

  const informativeSources = [
    "src/pages/404.astro",
    "src/pages/[lang]/about.astro",
    "src/pages/[lang]/contact.astro",
    "src/pages/[lang]/guide.astro",
    "src/pages/[lang]/ranking.astro",
    "src/pages/[lang]/editorial-policy.astro",
    "src/pages/[lang]/privacy.astro",
    "src/pages/[lang]/shuttle.astro",
    "src/pages/[lang]/spa/[slug].astro",
    "src/components/BlogTeaser.astro",
    "src/components/EditorialEvidence.astro",
    "src/components/Footer.astro",
    "src/components/HowItWorks.astro",
    "src/components/QuickMatch.astro",
    "src/components/Testimonials.astro",
    "src/components/VipExtrasDrawer.astro",
  ];
  for (const sourcePath of informativeSources) {
    const source = await readFile(path.join(projectRoot, sourcePath), "utf8");
    assert.doesNotMatch(
      source,
      /text-white\/(?:25|30|35|40|45)\b/,
      `${sourcePath} still assigns a sub-AA opacity to informative text`,
    );
  }
});

test("Chinese editorial policy wording uses natural operating-status and verification language", async () => {
  const traditional = await readPage("zh-TW", "editorial-policy");
  assert.match(traditional, /營業狀態都可能臨時改變/);
  assert.match(traditional, /不代表該名錄已核實頁面上的每一項價格、服務或營業說法/);
  assert.doesNotMatch(traditional, /開門狀態|不等於名錄已證實/);

  const simplified = await readPage("zh-CN", "editorial-policy");
  assert.match(simplified, /营业状态都可能临时变化/);
  assert.match(simplified, /不代表该名录已核实页面上的每一项价格、服务或营业说法/);
  assert.doesNotMatch(simplified, /开门状态|不表示名录已经证明/);
});

test("all locales omit the removed consent controls and analytics rule", async () => {
  for (const locale of ["en", "zh-TW", "zh-CN", "ja"]) {
    const [home, privacy] = await Promise.all([readPage(locale), readPage(locale, "privacy")]);
    for (const html of [home, privacy]) {
      assert.doesNotMatch(
        html,
        /data-consent-(?:panel|accept|decline|settings|controller)|data-analytics-loader|GT-TXHFV3C5|AW-18058018185|googletagmanager\.com/,
      );
    }
  }
});
