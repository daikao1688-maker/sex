import type { Locale } from "../../i18n/config";

export interface GalleryText {
  alt: string;
  caption: string;
}

export type LocalizedGalleryText = Record<Locale, GalleryText>;

export type GalleryCopyMap = Record<string, LocalizedGalleryText>;
