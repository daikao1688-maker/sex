# Task 5 report — fonts, images, analytics, caching, and lightweight utility pages

## Outcome

Implemented Task 5 without changing the Task 1–4 interaction, metadata, schema,
trust, privacy, or venue-availability contracts. The production build now uses
locale-aware system fonts, defers Google analytics behind idle/interaction
signals with exactly-once initialization, fetches only the active Hero image at
first render, uses real responsive image candidates and measured intrinsic
dimensions, omits analytics from the branded 404, and publishes Cloudflare
security/cache rules without a brittle CSP.

The performance specialist's required pre-check found no `.seo-cache/`
directory. `.seo-cache/` is now ignored and no cache data is committed.

## TDD evidence

### RED

Command:

```sh
npm run build && node --test tests/performance-remediation.test.mjs
```

Result: 132 pages built; 0 passed and 6 failed. The failures mapped to the
unimplemented contracts:

- generated locale pages still requested Google Fonts and had no locale-aware
  system stack;
- Google Tag Manager loaded eagerly and no deferred loader existed;
- the shared 404 still included analytics and remote font payloads;
- Hero had no responsive candidates and all hidden images had fetchable `src`
  attributes;
- spa/blog/gallery media lacked the required responsive candidates, priority,
  loading roles, or correct intrinsic dimensions;
- `public/_headers` did not exist and `.seo-cache/` was not ignored.

The first RED run also exposed an incorrect test assumption of 15 spa cards.
The site inventory contains 14 venues, so that assertion was corrected before
production edits and the focused suite was rerun: the same 6 tests failed for
the intended missing behaviors.

### GREEN

Focused Task 5 and preserved Task 1–4 contracts:

```sh
npm run build && node --test \
  tests/performance-remediation.test.mjs \
  tests/motion-and-contrast.test.mjs \
  tests/seo-remediation.test.mjs \
  tests/trust-and-editorial.test.mjs \
  tests/not-found-page.test.mjs
```

Result: 132 pages built; 31 passed, 0 failed.

Fresh full suite:

```sh
npm test
```

Result: 132 pages built; 80 passed, 0 failed, 1 pre-existing environment-only
custom-404 test skipped (81 tests total).

Additional verification:

- `git diff --check`: clean.
- Responsive asset audit: 42 generated files have their expected 400, 640, or
  768 pixel widths.
- Generated `srcset` regression coverage verifies every referenced candidate
  exists in `public/`.
- `.seo-cache/` remains absent.

`npx astro check` could not run diagnostics because this repository does not
install `@astrojs/check`; Astro only displayed an interactive dependency-install
prompt. Task 5 did not add that unrelated toolchain dependency.

## Implementation

### Fonts and analytics

- Removed Google Fonts stylesheet and preconnect requests.
- Applied locale-aware system stacks for English, Traditional Chinese,
  Simplified Chinese, and Japanese through the shared `<html>` font variable.
- Replaced eager Google Tag Manager markup with an inline loader that waits for
  idle time, the first pointer/keyboard/touch/scroll interaction, or the
  `relaxmacau:analytics-consent` integration event.
- Added both local and global initialization guards, so concurrent signals
  append one external tag script and configure `GT-TXHFV3C5` and
  `AW-18058018185` exactly once.
- Added an `analytics` Layout opt-out and used it on the branded localized 404.
  Canonical, hreflang, social metadata, JSON-LD, and origin derivation are
  unchanged.

### Hero and responsive media

- Hero renders one fetchable source initially. Hidden slides keep only
  `data-src`/`data-srcset`, remain lazy/low-priority and `aria-hidden`, and the
  next slide is prepared at 5 seconds before the existing 6-second rotation.
- Hero keeps its independent 4.5-second venue-copy cadence, pause control,
  visibility/offscreen suspension, reduced-motion state, active-slide classes,
  and synchronized ARIA/alternative text.
- Added 768-pixel Hero candidates, 400-pixel JPEG/WebP spa-card candidates, and
  640-pixel blog-cover candidates generated from the checked-in originals with
  Sharp. The 42 new assets total approximately 1.5 MB.
- Spa cards now use real 400/800 candidates, responsive `sizes`, measured
  800×800 dimensions, and lazy/low priority for every card because the grid
  follows the full-screen Hero and BestOfMonth sections.
- Blog covers now use real 640/full-width candidates, responsive `sizes`,
  measured 1280×720 or 1360×768 dimensions, and explicit above-fold priority.
- Gallery thumbnails now declare their measured 600×600 dimensions and load
  lazily because the gallery is below the venue-page introduction. Fallback
  card artwork uses its measured 800×800 ratio. No dimensions were fabricated
  for the dynamically selected large lightbox assets.

### Cloudflare and local cache hygiene

- Added baseline `nosniff`, same-origin framing/opener, strict-origin referrer,
  restricted camera/microphone/geolocation, and cross-domain-policy headers.
- Added one-year immutable caching only for Astro's fingerprinted `/_astro/*`
  output and the versioned `/media/*` gallery inventory. HTML and mutable cover
  or blog paths are not marked immutable.
- Intentionally omitted Content Security Policy because the current inline
  scripts require a deliberate nonce/hash design; a blanket policy here would
  be brittle.
- Added `.seo-cache/` to `.gitignore` without creating or committing cache data.

## Files

Created:

- `tests/performance-remediation.test.mjs`
- `public/_headers`
- 28 spa-card responsive variants under `public/covers/`
- 3 Hero responsive variants under `public/covers/`
- 11 blog-cover responsive variants under `public/blog/`
- `.superpowers/sdd/2026-08-22-full-site-remediation/task-5-report.md`

Modified:

- `.gitignore`
- `src/layouts/Layout.astro`
- `src/components/Hero.astro`
- `src/components/SpaGrid.astro`
- `src/components/SpaGallery.astro`
- `src/pages/[lang]/blog/[slug].astro`
- `src/pages/404.astro`

## Concerns

- The separate Astro checker remains unavailable until the project deliberately
  adds `@astrojs/check` and `typescript`; the build and complete automated test
  suite are green.
- The full suite's one skipped live unknown-route check still requires a running
  development server. Its static 404 and localization tests pass, and Task 5's
  404 analytics/font regression passes.
- A fresh Lighthouse/browser comparison is reserved for Task 6 final
  integration. Task 5 verifies the network/markup contracts deterministically
  but does not claim field or lab Core Web Vitals measurements.

## Fix Round 1 — below-fold SpaGrid image priority

### Finding addressed

The first SpaGrid card was marked `loading="eager"` and
`fetchpriority="high"`, although SpaGrid renders after the full-screen Hero and
BestOfMonth. That below-fold request could compete with the actual Hero LCP.
All SpaGrid images now use `loading="lazy"` and `fetchpriority="low"`.

### RED

Updated the generated-output regression so every SpaGrid image must be
lazy/low priority, then ran it against the current build before changing the
component:

```sh
node --test tests/performance-remediation.test.mjs
```

Result: 5 passed, 1 failed. The viewport-role test failed on card 1 with
`'eager' !== 'lazy'`, directly reproducing the priority defect.

### GREEN

Focused Task 1–5 preservation suite:

```sh
npm run build && node --test \
  tests/performance-remediation.test.mjs \
  tests/motion-and-contrast.test.mjs \
  tests/seo-remediation.test.mjs \
  tests/trust-and-editorial.test.mjs \
  tests/not-found-page.test.mjs
```

Result: 132 pages built; 31 passed, 0 failed.

Fresh full suite:

```sh
npm test
```

Result: 132 pages built; 80 passed, 0 failed, 1 pre-existing environment-only
custom-404 test skipped (81 tests total).

`git diff --check` is clean. The deferred Hero `srcset` ordering Minor and all
unrelated files were intentionally left unchanged.
