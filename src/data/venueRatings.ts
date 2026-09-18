import type { VenueSlug } from './venues';

/** 五星满分；只填写 1、2、3、4、5，暂不使用半星。 */
export type VenueRating = 1 | 2 | 3 | 4 | 5;

/**
 * 会所编辑评级统一维护清单。
 * 更新评级时，只修改对应会所后面的数字，不要修改左侧英文标识。
 * 详情页、首页卡片、排行榜和推荐功能共用此处；五种语言同步生效。
 * 修改后需要重新构建并发布网站。历史文章中的专题评价不属于此清单。
 */
export const venueRatings: Record<VenueSlug, VenueRating> = {
  'clube-rio': 5,           // 利澳荟
  'yu-sauna': 4,            // 八汤御桑拿
  'manhao-spa': 5,          // 曼濠水疗
  'number-nine-sauna': 5,   // 玖号水疗
  'shang-pin-spa': 5,       // 尚品国际水疗
  'majesty-spa': 4,         // 尊贵水疗
  'the-excellent-sauna': 3, // 极品桑拿
  'empire-sauna': 5,        // 巨亨桑拿
  'east-castle-spa': 4,     // 东方皇堡水疗
  'victoria-sauna': 4,      // 凯旋桑拿
  'm-club': 4,             // 晋会 MCLUB
  'number-one-sauna': 5,   // 壹号桑拿
  'familia-nobre': 5,      // 豪门桑拿殿
  'oceanic-royal-spa': 5,  // 帝湖水疗
  'eighteen-sauna': 4,     // 十八桑拿
};

/** Stop the build with a clear error if a manual edit leaves an invalid score. */
export function getVenueRating(slug: VenueSlug): VenueRating {
  const rating = venueRatings[slug];
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error(`Invalid rating for ${slug}: use an integer from 1 to 5 in src/data/venueRatings.ts`);
  }
  return rating;
}
