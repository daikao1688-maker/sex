import type { Locale } from "./config";

export interface ConsentCopy {
  heading: string;
  body: string;
  accept: string;
  decline: string;
  manage: string;
  privacyLink: string;
}

const consentCopy: Record<Locale, ConsentCopy> = {
  en: {
    heading: "Privacy choices",
    body: "Google measurement and advertising tags stay blocked unless you accept. You can change this choice later.",
    accept: "Accept",
    decline: "Reject",
    manage: "Privacy choices",
    privacyLink: "Read the privacy notice",
  },
  "zh-TW": {
    heading: "隱私選擇",
    body: "除非您同意，Google 成效評估與廣告標籤會維持封鎖。您日後可隨時更改選擇。",
    accept: "同意",
    decline: "拒絕",
    manage: "隱私選擇",
    privacyLink: "閱讀隱私說明",
  },
  "zh-CN": {
    heading: "隐私选择",
    body: "除非您同意，Google 效果衡量与广告标签会保持拦截。您之后可以随时更改选择。",
    accept: "同意",
    decline: "拒绝",
    manage: "隐私选择",
    privacyLink: "阅读隐私说明",
  },
  ja: {
    heading: "プライバシー設定",
    body: "同意するまでGoogleの計測・広告タグは読み込まれません。選択は後から変更できます。",
    accept: "同意する",
    decline: "拒否する",
    manage: "プライバシー設定",
    privacyLink: "プライバシー説明を読む",
  },
  ko: {
    heading: "개인정보 선택",
    body: "동의하기 전까지 Google 측정 및 광고 태그는 차단된 상태로 유지됩니다. 선택은 나중에 언제든 변경할 수 있습니다.",
    accept: "동의",
    decline: "거부",
    manage: "개인정보 선택",
    privacyLink: "개인정보 처리방침 읽기",
  },
};

export const getConsentCopy = (lang: Locale) => consentCopy[lang];
