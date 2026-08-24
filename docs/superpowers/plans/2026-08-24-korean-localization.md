# Korean Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to execute this plan. Follow TDD and do not add production behavior until the corresponding test has failed for the expected reason.

**Goal:** Add a complete, native Korean `/ko/` version to the Astro site with 26 localized pages, full international SEO, complete gallery copy, and no silent English fallback.

**Architecture:** Extend the existing data-driven `Locale` registry so shared `[lang]` routes generate Korean automatically. Keep routing templates and visual components unchanged; add Korean-owned dictionaries/content and patch only handwritten locale maps, root detection, Korean date formatting, and SEO configuration.

**Tech Stack:** Astro 7.2, TypeScript/Astro components, Astro Content Collections, Markdown, Tailwind CSS 4, Node test runner, static sitemap output.

**Spec:** `docs/superpowers/specs/2026-08-24-korean-localization.md`

## Global Constraints

- Preserve all existing four-language URLs and copy except changing the advertised language count from four to five.
- Preserve venue facts, status, prices, times, contact details, slugs, media paths, ordering, and visual design.
- Korean public pages must not silently fall back to English.
- Use native Korean sentence structure; do not mechanically translate Chinese punctuation or word order.
- Do not push or deploy unless separately requested.

---

### Task 1: Establish Korean regression tests (RED)

**Files:**
- Create: `tests/korean-localization.test.mjs`
- Modify: existing locale-count expectations in relevant `tests/*.test.mjs`

**Assertions:**
- `ko` locale metadata is registered with `한국어`, `ko`, and `ko_KR`.
- root language detection routes `ko` and `ko-KR` to `/ko/`.
- Korean 404 copy and fallback link exist.
- Korean-owned dictionaries exist for every page module.
- both Korean Markdown posts exist and retain current slugs/dates.
- every active gallery item has Korean alt and caption.
- server and client month rendering use `월` and `년`.
- sitemap target is 130 localized URLs and Korean pages emit full reciprocal hreflang.

- [ ] Read `writing-good-tests.md` before editing tests.
- [ ] Add focused source/output assertions that test user-visible behavior rather than implementation trivia.
- [ ] Run the focused test and observe failures caused by missing Korean support.
- [ ] Record the expected failure groups before production edits.

### Task 2: Register Korean routing and site shell (GREEN)

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/i18n/config.ts`
- Modify: `src/i18n/index.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/layouts/PageShell.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/[lang]/index.astro`
- Modify: locale-specific shell maps found by the tests

**Behavior:**
- register `ko` in Astro i18n and sitemap configuration;
- add Korean locale metadata and dictionary loading;
- use a Korean system font stack;
- add Korean skip navigation and 404 actions;
- route `ko` and `ko-*` browser languages to `/ko/` while preserving query/hash;
- show `한국어` in root fallback and language controls.

- [ ] Implement the smallest shell changes that satisfy the routing and 404 tests.
- [ ] Run the focused tests until this group is green.
- [ ] Keep existing locale behavior unchanged.

### Task 3: Add Korean core and utility-page dictionaries

**Files:**
- Create: `src/i18n/locales/ko.ts`
- Modify: `src/i18n/testimonials.ts`
- Modify: `src/i18n/consent.ts`
- Modify: `src/i18n/pages/about.ts`
- Modify: `src/i18n/pages/bestOfMonth.ts`
- Modify: `src/i18n/pages/blog.ts`
- Modify: `src/i18n/pages/contact.ts`
- Modify: `src/i18n/pages/editorialPolicy.ts`
- Modify: `src/i18n/pages/faq.ts`
- Modify: `src/i18n/pages/guide.ts`
- Modify: `src/i18n/pages/privacy.ts`
- Modify: `src/i18n/pages/ranking.ts`
- Modify: `src/i18n/pages/shuttle.ts`

**Behavior:**
- provide Korean-owned copy for every active field;
- preserve current facts and cautious booking language;
- update language-count claims in all five locales from four to five;
- preserve contact handles and page structure.

- [ ] Add/extend tests that reject missing or obviously English-fallback Korean fields.
- [ ] Observe the focused failures.
- [ ] Add natural Korean copy module by module.
- [ ] Run focused tests after each module group.

### Task 4: Add all 14 Korean venue detail records

**Files:**
- Modify: `src/i18n/pages/spa.ts`
- Modify: `src/i18n/pages/eighteenSauna.ts`

**Behavior:**
- add Korean titles, summaries, descriptions, labels, highlights, services, aliases, and status copy for all 14 venues;
- preserve all numeric/business facts from the current data;
- use official brand name plus Korean reading on first meaningful mention;
- provide explicit Korean summaries for stable meta descriptions;
- let Korean sentence summarization use `.?!` punctuation;
- leave replaced legacy galleries empty for 13 venues and translate Oceanic Royal Spa's nine active legacy images.

- [ ] Add source assertions covering 14 owned Korean entries and critical fact parity.
- [ ] Observe failures before adding records.
- [ ] Add the Korean detail records and wire Eighteen Sauna into the spa map.
- [ ] Run venue and metadata tests until green.

### Task 5: Add Korean image SEO copy

**Files:**
- Modify: `src/data/galleryCopy/groupA.ts`
- Modify: `src/data/galleryCopy/groupB.ts`
- Modify: `src/data/galleryCopy/groupC.ts`
- Modify: `src/data/galleryCopy/groupD.ts`
- Modify: `src/data/galleryCopy/groupE.ts`

**Behavior:**
- add Korean alt text and captions for all 160 replacement-gallery images;
- describe the visible room, lighting, facility, or architectural feature;
- avoid repetitive venue-name keyword stuffing;
- keep alt text concise and captions useful to a human reader.

- [ ] Add a failing coverage assertion for 160 Korean records with non-empty, distinct alt/caption values.
- [ ] Add Korean copy in isolated file groups.
- [ ] Run gallery coverage and TypeScript/build checks.

### Task 6: Add the two Korean blog articles

**Files:**
- Create: `src/content/blog/ko/macau-sauna-august-guide-2026.md`
- Create: `src/content/blog/ko/macau-sauna-overnight-guide-2026.md`

**Behavior:**
- preserve existing slugs, authors, publication/update dates, images, categories, and factual scope;
- rewrite the prose naturally for Korean travelers;
- retain current caution around price, availability, closures, transport, and overnight confirmation;
- keep headings and internal links aligned with current Korean routes.

- [ ] Add failing tests for Korean collection entries and localized internal links.
- [ ] Add both Markdown articles.
- [ ] Build the collection and confirm Korean never falls back to English.

### Task 7: Fix Korean date and localized fallback behavior

**Files:**
- Modify: `src/components/PromoBar.astro`
- Modify: `src/components/BestOfMonth.astro`
- Modify: `src/i18n/pages/spa.ts`
- Modify: components with hard-coded English fallback or ARIA text identified by tests

**Behavior:**
- render Korean month/year forms correctly on the server and after client updates;
- prevent Korean summaries from consuming whole descriptions;
- localize public fallback image/landmark labels rather than exposing English.

- [ ] Run date/fallback tests and confirm expected failures.
- [ ] Implement locale-aware formatting and labels.
- [ ] Re-run focused tests until green.

### Task 8: Full international SEO and static-output verification

**Files:**
- Modify: `tests/seo-remediation.test.mjs`
- Modify: other hard-coded four-locale test fixtures under `tests/`
- Modify: implementation files only if verification exposes a real defect

**Verification:**
- 26 Korean localized URLs and 130 localized sitemap URLs;
- canonical equals Korean self hreflang on every Korean page;
- every equivalent page links reciprocally across five languages plus x-default;
- `html lang="ko"`, `og:locale="ko_KR"`, Korean title/description, and Korean JSON-LD locale;
- two Korean blog pages render from Korean Markdown;
- 14 Korean venue pages render without missing fields;
- no missing Korean gallery copy;
- all existing tests, Astro checks, and production build pass;
- representative 360/418/789/1280/1440 widths have no navigation or horizontal-overflow regression.

- [ ] Run the Korean focused suite.
- [ ] Run the complete test suite.
- [ ] Run Astro type/content checks.
- [ ] Run a production build.
- [ ] Parse output to validate URL count, canonical/hreflang mesh, language/OG metadata, internal links, and untranslated-fallback sentinels.
- [ ] Perform representative browser smoke checks.
- [ ] Review `git diff --check`, status, and final diff before committing implementation.
