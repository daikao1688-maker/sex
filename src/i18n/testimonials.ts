import type { Locale } from './config';
import type { Dictionary } from './types';

type TestimonialCopy = Dictionary['testimonials'];

export const testimonials: Record<Locale, TestimonialCopy> = {
  en: {
    heading: 'Guest Reviews',
    regionLabel: 'Guest review carousel',
    served: 'Anonymised summaries of feedback shared after bookings',
    motion: { pause: 'Pause guest review motion', resume: 'Resume guest review motion' },
    items: [
      {
        quote:
          'As a first-time visitor, I did not know how the venues differed. The team asked about my budget and timing, narrowed down the options, and explained the pickup clearly.',
        author: 'First-time guest',
      },
      {
        quote:
          'When my arrival time changed at short notice, the reply was quick and the available venues and expected costs were checked again. That made the evening much easier to plan.',
        author: 'Independent traveller',
      },
      {
        quote:
          'I cared more about the atmosphere and room style than choosing the most expensive option. The suggestions matched what I asked for, and the conversation stayed straightforward.',
        author: 'Returning guest',
      },
    ],
  },
  'zh-TW': {
    heading: '客戶評價',
    regionLabel: '客戶評價輪播',
    served: '以下內容為預約後回饋的匿名整理',
    motion: { pause: '暫停客戶評價動效', resume: '繼續客戶評價動效' },
    items: [
      {
        quote:
          '第一次到澳門，不熟悉每間會所的差別。客服先問我的預算和時間，再把選擇縮小，接送方式也說得很清楚。',
        author: '首次到訪客人',
      },
      {
        quote:
          '臨時更改抵達時間，訊息回覆得很快，也先提醒我當晚可選的會所與費用，整個安排比較放心。',
        author: '自由行客人',
      },
      {
        quote:
          '我比較在意環境和房型，客服沒有只推最貴的，而是按喜好列出幾個選擇，溝通很直接。',
        author: '回訪客人',
      },
    ],
  },
  'zh-CN': {
    heading: '客户评价',
    regionLabel: '客户评价轮播',
    served: '以下内容根据预约后的反馈匿名整理',
    motion: { pause: '暂停客户评价动效', resume: '继续客户评价动效' },
    items: [
      {
        quote:
          '第一次到澳门，不熟悉每家会所的区别。客服先问了我的预算和时间，再帮我缩小选择，接送方式也讲得很清楚。',
        author: '首次到访客人',
      },
      {
        quote:
          '临时更改抵达时间，消息回复得很快，也重新确认了当晚可选的会所和费用，整个安排让人更放心。',
        author: '自由行客人',
      },
      {
        quote:
          '我比较在意环境和房型，客服没有只推荐最贵的，而是按喜好列出几个选择，沟通很直接。',
        author: '回访客人',
      },
    ],
  },
  ja: {
    heading: 'お客様の声',
    regionLabel: 'お客様の声カルーセル',
    served: '予約後に寄せられた感想を、個人が特定されない形で要約しています',
    motion: { pause: 'お客様の声の動きを一時停止', resume: 'お客様の声の動きを再開' },
    items: [
      {
        quote:
          '初めてのマカオで店舗ごとの違いが分かりませんでしたが、予算と時間を伝えると候補を絞ってくれ、送迎の流れも分かりやすく説明してもらえました。',
        author: '初めて利用されたお客様',
      },
      {
        quote:
          '到着時間が直前に変わりましたが、返信が早く、その夜に案内できる店舗と料金も改めて確認してくれたので、安心して予定を立てられました。',
        author: '個人旅行のお客様',
      },
      {
        quote:
          '内装や部屋の雰囲気を重視していると伝えると、高い店を勧めるのではなく、希望に合う候補をいくつか案内してくれました。やり取りも簡潔でした。',
        author: 'リピーターのお客様',
      },
    ],
  },
  ko: {
    heading: '고객 후기',
    regionLabel: '고객 후기 캐러셀',
    served: '예약 후 받은 피드백을 익명으로 정리한 내용입니다',
    motion: { pause: '고객 후기 모션 일시 정지', resume: '고객 후기 모션 재개' },
    items: [
      {
        quote:
          '처음 방문이라 매장마다 어떻게 다른지 몰랐는데, 팀에서 예산과 시간을 먼저 물어보고 선택지를 좁혀 주었으며 픽업 방식도 명확히 설명해 주었습니다.',
        author: '첫 방문 고객',
      },
      {
        quote:
          '도착 시간이 갑자기 바뀌었는데 답변이 빨랐고, 그날 밤 이용 가능한 매장과 예상 비용도 다시 확인해 주어 저녁 계획을 훨씬 편하게 세울 수 있었습니다.',
        author: '개인 여행 고객',
      },
      {
        quote:
          '가장 비싼 곳보다 분위기와 룸 스타일이 더 중요했는데, 제가 원하는 조건에 맞는 후보를 몇 곳 제안해 주었고 대화도 간결했습니다.',
        author: '재방문 고객',
      },
    ],
  },
};
