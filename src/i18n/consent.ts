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
};

export const getConsentCopy = (lang: Locale) => consentCopy[lang];
