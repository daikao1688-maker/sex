import type { VenueSlug } from "./venues";

/**
 * Venue interior walkthrough clips, shown as a cinema card before the
 * photo gallery on spa detail pages. Only venues
 * with their own footage get the card — never substitute another venue's
 * interior. Playback shares the click-to-load modal (preload="none").
 */
export interface VenueInteriorVideo {
  /** Path under /public, H.264 + faststart. */
  src: string;
  /** Poster frame shown on the card and before playback. */
  poster: string;
  /** Intrinsic dimensions shared by the clip and its poster. */
  width: number;
  height: number;
  /** Seconds — interpolated into the localized badge ({duration}). */
  durationSeconds: number;
}

const video = (
  slug: VenueSlug,
  durationSeconds: number,
  width = 720,
  height = 1280,
): VenueInteriorVideo => ({
  src: `/videos/${slug}-interior.mp4`,
  poster: `/videos/${slug}-interior-poster.jpg`,
  width,
  height,
  durationSeconds,
});

export const venueInteriorVideos: Partial<Record<VenueSlug, VenueInteriorVideo>> = {
  "yu-sauna": video("yu-sauna", 34),
  "east-castle-spa": video("east-castle-spa", 33),
  "familia-nobre": video("familia-nobre", 23),
  "number-nine-sauna": video("number-nine-sauna", 34, 544, 960),
  "empire-sauna": video("empire-sauna", 22, 720, 1080),
  "victoria-sauna": video("victoria-sauna", 45),
  "manhao-spa": video("manhao-spa", 40),
  "shang-pin-spa": video("shang-pin-spa", 29),
  "eighteen-sauna": video("eighteen-sauna", 34),
  "number-one-sauna": video("number-one-sauna", 20),
  "majesty-spa": video("majesty-spa", 23),
};
