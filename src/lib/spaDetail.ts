import type { Venue } from '../data/venues';
import type { Dictionary } from '../i18n/types';
import type { SpaPageCopy, VenueDetail } from '../i18n/pages/spa';

/**
 * Detail copy for a venue page. Venues the client has written editorial copy
 * for use it verbatim; the rest get a placeholder assembled from the venue
 * flags and the shared dictionary, so the page is complete and obviously
 * provisional. Delete the placeholder path once every venue has real copy.
 */
export interface ResolvedVenueDetail extends VenueDetail {
  /** True when the copy was derived rather than written. */
  isPlaceholder: boolean;
}

export function resolveVenueDetail(
  venue: Venue,
  copy: SpaPageCopy,
  t: Dictionary,
): ResolvedVenueDetail {
  const written = copy.venues[venue.slug];
  if (written) return { ...written, isPlaceholder: false };

  const badge = t.spas.venues[venue.slug].badge;

  const p = copy.placeholder;
  const features = [
    venue.ktv ? p.ktv : null,
    venue.themeRooms ? p.themeRooms : null,
    venue.recommendedShow ? p.show : null,
    venue.overnightAllowed ? p.overnight : null,
    venue.open24h ? p.open24h : null,
    venue.jpkr ? p.jpkr : null,
    venue.serviceFee === 'none' ? p.noServiceFee : null,
  ].filter((value): value is string => Boolean(value));

  return {
    isPlaceholder: true,
    highlights: [
      badge,
      `MOP ${venue.priceMin.toLocaleString('en-US')} – ${venue.priceMax.toLocaleString('en-US')}`,
      venue.hours,
      venue.district === 'taipa' ? p.taipa : p.peninsula,
    ],
    bestFor: badge,
    features,
    // The generic concierge flow, used until per-venue steps are written.
    flow: t.vip.steps.map((step) => ({ title: step.title, body: step.body })),
    gallery: [],
    overnightValue: venue.overnightAllowed
      ? copy.labels.overnightAvailable
      : copy.labels.overnightUnavailable,
    overnightNote: venue.overnightAllowed ? copy.labels.overnightNoteAvailable : undefined,
  };
}
