import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const temporarilyClosedSlugs = [
  "m-club",
  "number-one-sauna",
  "familia-nobre",
  "oceanic-royal-spa",
  "victoria-sauna",
  "eighteen-sauna",
];

const closedCopy = {
  en: {
    label: "Temporarily Closed",
    notice: "This venue is temporarily closed and is not accepting guests or bookings at this time.",
  },
  "zh-TW": {
    label: "暫停營業",
    notice: "此會所目前暫停營業，暫不接待客人或提供預約服務。",
  },
  "zh-CN": {
    label: "暂停营业",
    notice: "此会所目前暂停营业，暂不接待客人或提供预约服务。",
  },
  ja: {
    label: "一時休業中",
    notice: "この店舗は現在一時休業中で、ご利用およびご予約は承っておりません。",
  },
};

test("labels temporarily closed venues accurately and shows a clear detail-page notice", async () => {
  for (const [locale, copy] of Object.entries(closedCopy)) {
    const homepage = await readFile(path.join(distRoot, locale, "index.html"), "utf8");
    assert.equal(
      (homepage.match(/data-testid="spa-temporarily-closed-badge"/g) ?? []).length,
      temporarilyClosedSlugs.length,
      `${locale} homepage must label every temporarily closed venue`,
    );

    for (const slug of temporarilyClosedSlugs) {
      const detail = await readFile(path.join(distRoot, locale, "spa", slug, "index.html"), "utf8");
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-notice"'),
        `${locale}/${slug} is missing its temporarily closed notice`,
      );
      assert.ok(detail.includes(copy.label), `${locale}/${slug} has the wrong closed label`);
      assert.ok(detail.includes(copy.notice), `${locale}/${slug} has the wrong closed explanation`);
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-actions"'),
        `${locale}/${slug} still shows booking actions instead of alternatives`,
      );
      assert.ok(
        detail.includes('data-testid="spa-temporarily-closed-contact"'),
        `${locale}/${slug} still uses a booking-focused contact heading`,
      );
    }

    const activeDetail = await readFile(
      path.join(distRoot, locale, "spa", "number-nine-sauna", "index.html"),
      "utf8",
    );
    assert.ok(
      !activeDetail.includes('data-testid="spa-temporarily-closed-notice"'),
      `${locale}/number-nine-sauna must not show a closure notice`,
    );
    assert.ok(
      !activeDetail.includes('data-testid="spa-temporarily-closed-actions"'),
      `${locale}/number-nine-sauna must retain its normal booking actions`,
    );
  }
});
