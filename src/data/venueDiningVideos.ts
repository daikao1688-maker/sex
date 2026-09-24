import type { VenueSlug } from "./venues";

/**
 * Dining-area clips. Rendered as a poster card inside the visit-flow dining
 * step (step 5) on every spa detail page; clicking the card opens a modal
 * player. The <video> uses preload="none", so nothing downloads until the
 * visitor actually asks for it.
 *
 * Every venue shows the shared reference clip by default; the UI identifies
 * it as a general example, not footage of the current venue. Add an entry to
 * override with venue-specific footage once it exists.
 */
export interface VenueDiningVideo {
  /** Path under /public, e.g. /videos/yu-sauna-dining.mp4 (H.264 + faststart). */
  src: string;
  /** Poster frame shown on the card and before playback. */
  poster: string;
  /** Intrinsic dimensions shared by the clip and its poster. */
  width: number;
  height: number;
  /** Seconds — interpolated into the localized card title ({duration}). */
  durationSeconds: number;
}

const sharedDiningVideo: VenueDiningVideo = {
  src: "/videos/yu-sauna-dining.mp4",
  poster: "/videos/yu-sauna-dining-poster.jpg",
  width: 720,
  height: 1280,
  durationSeconds: 11,
};

const venueDiningVideoOverrides: Partial<Record<VenueSlug, VenueDiningVideo>> = {
  // "yu-sauna": { src: "…", poster: "…", width: 720, height: 1280, durationSeconds: 11 },
};

export function getDiningVideo(slug: VenueSlug): VenueDiningVideo {
  return venueDiningVideoOverrides[slug] ?? sharedDiningVideo;
}
