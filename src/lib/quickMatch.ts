import type { Venue } from "../data/venues";
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

function parseClockMinutes(value: string): number | undefined {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/iu);
  if (!match) return undefined;

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (minute > 59) return undefined;

  if (meridiem) {
    if (hour < 1 || hour > 12) return undefined;
    hour %= 12;
    if (meridiem === "PM") hour += 12;
  } else if (hour > 23) {
    return undefined;
  }

  return hour * 60 + minute;
}

function currentMacauMinute(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Macau",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function isStaffOnDuty(venue: Venue, macauMinute: number): boolean {
  const [startText, endText] = venue.hours.split(/\s*[-–—]\s*/u);
  const start = startText ? parseClockMinutes(startText) : undefined;
  const end = endText ? parseClockMinutes(endText) : undefined;
  if (start === undefined || end === undefined) return false;

  const minute = ((macauMinute % 1440) + 1440) % 1440;
  if (start === end) return true;
  return start < end ? minute >= start && minute < end : minute >= start || minute < end;
}

/**
 * Transparent additive score. The exact numbers only need to rank sensibly and
 * stay stable between server render and client re-render — never random.
 */
export function scoreVenue(
  venue: Venue,
  selection: QuickMatchSelection,
  macauMinute?: number,
): number {
  let score = 50;

  if (experienceMatches[selection.experience](venue)) score += 32;

  score += (venue.rating - 3) * 4;

  if (selection.overnight) {
    score += venue.overnightRequiresConfirmation
      ? -2
      : venue.overnightAllowed
        ? 14
        : -12;
  }

  if (selection.group === "large") score += venue.ktv ? 8 : 0;
  else if (selection.group === "small") score += venue.ktv ? 5 : 0;
  else if (selection.group === "pair" && venue.themeRooms) score += 2;

  if (selection.when === "now") {
    score += isStaffOnDuty(venue, macauMinute ?? currentMacauMinute()) ? 8 : -4;
  }
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
export function rankVenues(selection: QuickMatchSelection, candidates: readonly Venue[]): QuickMatchResult[] {
  return candidates
    .map((venue, index) => ({ venue, score: scoreVenue(venue, selection), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ venue, score }) => ({ venue, score }));
}
