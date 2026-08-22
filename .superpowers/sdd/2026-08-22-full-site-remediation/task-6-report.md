# Task 6 report — root routing, mobile density, and final integration

## Outcome

Implemented the resilient root locale gateway and final mobile integration while preserving the Task 1–5 accessibility, motion, metadata, trust, availability, and performance contracts.

- The root gateway keeps automatic locale selection and preserves `location.search` plus `location.hash`, while a no-script or failed-redirect visitor can choose any of the four shipped locales from visible, keyboard-accessible links.
- Best of Month renders all three cards in a labelled, native horizontal snap scroller on narrow screens. At `640px` and above, the existing controlled carousel remains in place. All cards remain in the built HTML.
- Ranking top picks use a labelled mobile snap row, and all four horizontally scrollable comparison tables are named keyboard-focusable regions.
- Every temporarily closed venue is visibly labelled in every comparison table while remaining excluded from the current ranking `ItemList` schema.
- The duplicate `loungeRecliner` model field was removed because it exactly duplicated `overnightAllowed` for all 14 venues. The ranking now presents one localized overnight-and-lounge-rest field rather than two equivalent columns.
- Floating contact/back-to-top controls use bottom and right safe-area insets and a viewport-constrained maximum width.

## TDD evidence

### RED

Focused command before production edits:

```sh
npm run build && node --test tests/root-locale-redirect.test.mjs tests/task-6-integration.test.mjs
```

Result: 132 pages built; 2 passed and 5 failed for the intended missing behaviors:

- no visible four-locale fallback navigation;
- no indexable labelled Best of Month mobile scroller;
- no labelled mobile ranking collection or table regions;
- no explicit ranking closure badges and a duplicated overnight/rest column;
- no safe-area offsets on floating actions.

A narrow follow-up RED changed the fallback contract to the exact shipped `zh-TW` and `zh-CN` locale codes:

```sh
node --test tests/root-locale-redirect.test.mjs
```

Result: 2 passed and 1 failed because the fallback still emitted the broader `zh-Hant`/`zh-Hans` tags.

Installing the required checker exposed a separate final-integration RED:

```sh
npx astro check
```

Result: 11 errors in the existing Hero and Testimonials client scripts. The errors were missing DOM narrowing and numeric parameter types that had never been exercised because `@astrojs/check` and TypeScript were absent. The runtime tests initially exposed that their source-execution harness did not transpile TypeScript; the harness now transpiles extracted scripts before executing them.

### GREEN

Focused Task 6 suite:

```sh
npm run build && node --test tests/root-locale-redirect.test.mjs tests/task-6-integration.test.mjs
```

Result: 132 pages built; 7 passed, 0 failed.

Focused integration preservation suite:

```sh
npm run build && node --test tests/root-locale-redirect.test.mjs tests/task-6-integration.test.mjs tests/accessibility-interactions.test.mjs tests/accessibility-interactions-runtime.test.mjs tests/motion-and-contrast.test.mjs tests/seo-remediation.test.mjs tests/trust-and-editorial.test.mjs tests/performance-remediation.test.mjs tests/venue-availability.test.mjs tests/venue-facts-sync.test.mjs
```

Result: 132 pages built; 50 passed, 0 failed.

Fresh full suite after all refinements:

```sh
npm test
```

Result: 132 pages built; 85 passed, 0 failed, 1 pre-existing live unknown-route test skipped.

Required non-interactive diagnostics:

```sh
npx astro check
```

Result: 97 files checked; 0 errors, 0 warnings, 1 existing deprecation hint for the `document.execCommand("copy")` clipboard fallback.

Generated-artifact audit:

```text
Static audit passed: 132 HTML files, 268 JSON-LD blocks, 8788 local references.
```

The audit parsed every generated JSON-LD block and resolved every site-local `href`/`src` to a built page or asset.

```sh
git diff --check
```

Result: clean.

## Dependency change

Added only the direct dev dependencies required for the mandated checker:

- `@astrojs/check@^0.9.10`
- `typescript@^6.0.3`

`npm install --save-dev @astrojs/check typescript` added 77 resolved packages, audited 298 packages, and reported 0 vulnerabilities. npm also reported that the local allow-scripts policy had not approved the `esbuild` and `fsevents` install scripts; no approval was needed for the successful build, tests, or checker run.

## Files

Created:

- `tests/task-6-integration.test.mjs`
- `.superpowers/sdd/2026-08-22-full-site-remediation/task-6-report.md`

Modified:

- `src/pages/index.astro`
- `src/components/BestOfMonth.astro`
- `src/pages/[lang]/ranking.astro`
- `src/components/FloatingContactPill.astro`
- `src/data/venues.ts`
- `src/i18n/pages/ranking.ts`
- `src/components/Hero.astro`
- `src/components/Testimonials.astro`
- `tests/root-locale-redirect.test.mjs`
- `tests/motion-and-contrast.test.mjs`
- `tests/performance-remediation.test.mjs`
- `package.json`
- `package-lock.json`

## Self-review and concerns

- Root auto-forwarding still uses one `location.replace` and the regression executes the real built script across Japanese, Traditional Chinese, Simplified Chinese, English, unsupported, and empty-language cases, including a combined query-and-fragment case.
- Best of Month and ranking mobile presentations use native scrolling and CSS snap without adding a hydrated framework island. All content stays server-rendered and present in the HTML.
- The Task 3 schema contract remains intact: six closed venues are visible and labelled in ranking UI but absent from the current `ItemList` schema.
- TypeScript changes in Hero and Testimonials are type-only. Their runtime tests now transpile the extracted TypeScript and cover cadence, offscreen behavior, and image preparation without changing timing or ARIA logic.
- Browser viewport and Lighthouse runs are intentionally left to the controller's post-review pass. No field or lab Core Web Vitals claim is made here.
- The one skipped test still requires a running development server to exercise an unknown URL through the live custom 404 route; its static 404 companions pass.
