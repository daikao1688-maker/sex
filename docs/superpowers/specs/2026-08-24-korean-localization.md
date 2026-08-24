# Korean Localization Design

Date: 2026-08-24
Status: Approved

## Goal

Add Korean as the site's fifth fully supported language at `/ko/`, with the same page coverage, current facts, interaction behavior, media, and SEO integrity as the existing English, Traditional Chinese, Simplified Chinese, and Japanese versions.

The Korean version must read like native Korean editorial copy rather than a sentence-by-sentence machine translation. Existing venue slugs, prices, operating status, staff counts, contact details, images, components, and visual design remain unchanged.

## Current Baseline

- Production site: `https://macao-sex.com/`
- Framework: Astro 7 static output
- Existing locales: `en`, `zh-TW`, `zh-CN`, `ja`
- Existing localized URLs: 104 (26 per locale)
- Target localized URLs: 130 (26 per locale across five locales)
- Current content per locale:
  - 1 homepage
  - 8 standard pages
  - 1 blog index
  - 2 blog articles
  - 14 venue detail pages

## Locale Contract

Korean will use the following identifiers consistently:

- URL locale: `ko`
- HTML language: `ko`
- hreflang: `ko`
- Open Graph locale: `ko_KR`
- Language label: `한국어`
- Short label: `KO`
- Text direction: `ltr`
- Site name: `마카오 사우나 가이드`
- Preferred font stack: `Apple SD Gothic Neo`, `Noto Sans KR`, `Malgun Gothic`, followed by the existing system sans-serif fallback

The root language detector will send browser languages `ko` and `ko-*` to `/ko/`. Other current locale behavior remains unchanged, and unmatched languages continue to fall back to English.

## Content Design

### Naming

Venue slugs and stored identifiers do not change. Venue display names use the official brand name with a Korean reading on first meaningful mention where useful; subsequent prose uses the natural Korean form. Official English and Chinese aliases remain available in venue metadata so users can match signage and search results.

### Voice

Korean copy will be professional, natural, and direct. It will:

- explain facts before making recommendations;
- preserve cautious wording around prices, availability, overnight arrangements, and promotions;
- avoid exaggerated guarantees;
- use Korean travel and booking vocabulary rather than literal Chinese syntax;
- translate `overnight` as `야간 휴식` or `숙박 가능 여부` according to context, never as a guaranteed hotel stay;
- preserve all current operational facts and closure labels.

### Coverage

Korean must have owned copy in every active content source. Silent English fallback is not acceptable for public Korean pages.

Required coverage:

- main site dictionary and homepage venue cards;
- About, Best of Month, Blog, Contact, Editorial Policy, FAQ, Guide, Privacy, Ranking, Shuttle, and Spa dictionaries;
- Eighteen Sauna's separate detail data;
- testimonials and dormant typed consent copy;
- all 14 venue detail pages;
- two Korean Markdown blog articles using the existing slugs;
- Korean 404 copy;
- active gallery alt text and captions for 169 images.

Thirteen venues use replacement galleries at runtime. Their unused legacy gallery copy will not be duplicated into Korean. Oceanic Royal Spa's nine active legacy images and all 160 replacement-gallery images will receive Korean alt text and captions.

## Technical Design

### Locale Registration

Add `ko` to both Astro i18n configuration and sitemap language mapping, then register Korean in the central locale metadata and dictionary loader. Existing `[lang]` routes continue to generate localized pages from the shared route templates.

### Handwritten Locale Entry Points

Update the places not fully derived from the locale registry:

- root language redirect and fallback links;
- localized 404 content and 404 language detection;
- Korean skip-link labels;
- Korean font selection;
- any explicit `Record<Locale, ...>` maps;
- server-rendered and client-rendered month labels.

Korean dates use `8월` and `2026년 8월`, not Chinese/Japanese `月` or `年` suffixes.

### Blog Integrity

Both Korean Markdown articles ship in the same change as locale registration. A Korean route must never be generated from the English fallback. Blog alternate-language metadata will include Korean only when the Korean entry exists, preserving HTML and sitemap parity.

### Venue Metadata

All Korean venue entries will provide explicit summaries so meta descriptions remain concise. The generic sentence splitter will also treat Korean like English for `.`, `?`, and `!` punctuation.

### Accessibility

Korean labels are added to language controls, skip navigation, image alternatives, 404 actions, navigation landmarks, and interactive controls. Existing focus, menu, and keyboard behavior remain unchanged.

## International SEO Design

Every Korean page must provide:

- a self-referencing canonical URL;
- `html lang="ko"`;
- `og:locale="ko_KR"`;
- full reciprocal hreflang links for `en`, `zh-TW`, `zh-CN`, `ja`, and `ko`;
- the existing English `x-default` fallback;
- Korean localized title, description, image alt, and JSON-LD language fields;
- a Korean sitemap entry with the full alternate set.

The generated sitemap target is exactly 130 localized URLs. All paths use HTTPS and the site's trailing-slash convention.

## Data Preservation

The following values are copied from the current production/local source of truth and are not invented during translation:

- prices and currency;
- opening hours and staff time windows;
- staff counts and nationalities;
- temporary closure status;
- venue ordering, scores, categories, and monthly recommendation;
- contact handles and channels;
- image paths and primary images;
- article dates, authors, slugs, and factual claims.

About-page statements that currently say the site has four languages will be updated in all locales to five.

## Testing Strategy

Implementation follows test-driven development.

1. Add failing tests for Korean locale registration, root redirect, 404 copy, date formatting, owned dictionary content, blog presence, and gallery coverage.
2. Confirm failures are caused by the missing Korean feature.
3. Add the minimal infrastructure and copy needed to pass each group.
4. Run the full existing suite to catch regressions in the original four locales.
5. Build the static site and validate:
   - 26 Korean localized URLs;
   - 130 localized sitemap URLs;
   - canonical and reciprocal hreflang integrity;
   - `ko_KR` Open Graph locale;
   - no public Korean page silently falling back to English;
   - no missing Korean gallery descriptions;
   - successful rendering of both Korean articles;
   - no horizontal overflow at representative mobile and desktop widths.

## Non-Goals

- No redesign or component restructuring.
- No changes to the four existing locale URLs.
- No changes to venue facts, images, prices, or contact details except the site-wide language count from four to five.
- No new articles beyond Korean versions of the two current production articles.
- No deployment until the local implementation and verification are complete.
