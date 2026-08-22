import { galleryCopyGroupA } from "./groupA";
import { galleryCopyGroupB } from "./groupB";
import { galleryCopyGroupC } from "./groupC";
import { galleryCopyGroupD } from "./groupD";
import { galleryCopyGroupE } from "./groupE";
import type { GalleryCopyMap } from "./types";

export const replacementVenueGalleryCopy: GalleryCopyMap = {
  ...galleryCopyGroupA,
  ...galleryCopyGroupB,
  ...galleryCopyGroupC,
  ...galleryCopyGroupD,
  ...galleryCopyGroupE,
};
