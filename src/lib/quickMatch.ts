import { bookableVenues, type Venue } from "../data/venues";
import type {
  QuickMatchExperience,
  QuickMatchFrom,
  QuickMatchGroup,
  QuickMatchWhen,
} from "../i18n/types";

export interface QuickMatchSelection {
  group: QuickMatchGroup;
  experience: QuickMatchExperience;
  when: QuickMatchWhen;
  from: QuickMatchFrom;
  /** Guest wants to sleep over after the session. */
  overnight: boolean;
}

export const defaultSelection: QuickMatchSelection = {
  group: "pair",
  experience: "show",
  when: "tonight",
  from: "hotel",
  overnight: false,
};

const experienceMatches: Record<QuickMatchExperience, (venue: Venue) => boolean> = {
  show: (venue) => venue.recommendedShow,
  theme: (venue) => venue.themeRooms,
  jpkr: (venue) => venue.jpkr,
  new: (venue) => venue.isNew,
  ktv: (venue) => venue.ktv,
  classic: (venue) => !venue.isNew,
};

/**
 * Transparent additive score. The exact numbers only need to rank sensibly and
 * stay stable between server render and client re-render — never random.
 */
export function scoreVenue(venue: Venue, selection: QuickMatchSelection): number {
  let score = 50;

  if (experienceMatches[selection.experience](venue)) score += 32;

  score += (venue.rating - 3) * 4;

  if (selection.overnight) score += venue.overnightAllowed ? 14 : -12;

  if (selection.group === "large") score += venue.ktv ? 8 : 0;
  else if (selection.group === "small") score += venue.ktv ? 5 : 0;
  else if (selection.group === "pair" && venue.themeRooms) score += 2;

  if (selection.when === "now") score += venue.open24h ? 8 : -4;
  else if (venue.open24h) score += 4;

  // The airport sits on Taipa; the Gongbei border feeds the peninsula.
  if (selection.from === "airport") score += venue.district === "taipa" ? 8 : 0;
  else if (selection.from === "border") score += venue.district === "peninsula" ? 6 : 0;

  return Math.max(40, Math.min(99, Math.round(score)));
}

export interface QuickMatchResult {
  venue: Venue;
  score: number;
}

/** Best match first; ties keep the editorial order from `venues.ts`. */
export function rankVenues(selection: QuickMatchSelection): QuickMatchResult[] {
  return bookableVenues
    .map((venue, index) => ({ venue, score: scoreVenue(venue, selection), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ venue, score }) => ({ venue, score }));
}
