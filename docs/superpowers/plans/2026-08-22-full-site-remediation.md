# Full-Site Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the four-language Astro site to launch-ready functional, accessibility, SEO, trust, and performance quality using regression-tested changes.

**Architecture:** Keep the current static Astro architecture and data-driven locale templates. Split work into independent accessibility/interaction, SEO/content truth, and media/performance domains; reserve shared layout/configuration changes for integration so agents do not edit the same files concurrently.

**Tech Stack:** Astro 7.2, TypeScript/Astro components, Tailwind CSS 4, Node test runner, Cloudflare Pages static hosting.

**Spec:** `docs/superpowers/specs/2026-08-22-full-site-remediation.md`

## Global Constraints

- Preserve four locale prefixes and existing public URLs.
- Preserve the current design system and contact-channel behavior.
- Never invent business facts, legal identity, or source evidence.
- Write and observe a failing regression test before each production behavior change.
- Do not push or deploy without separate authorization.

---

### Task 1: Accessibility landmarks and keyboard interactions

**Files:**
- Create: `tests/accessibility-interactions.test.mjs`
- Modify: `src/layouts/PageShell.astro`
- Modify: `src/pages/[lang]/index.astro`
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/WeChatModal.astro`
- Modify: `src/components/VipExtrasDrawer.astro`
- Modify: `src/components/FloatingContactPill.astro`
- Modify: `src/components/PromoBar.astro`
- Modify: `src/components/HowItWorks.astro`
- Modify: `src/components/QuickMatch.astro`

**Interfaces:**
- Produces: `#main-content`, skip link, dialog focus contracts, keyboard tab behavior, live result status, and hidden-control tab-order synchronization.

- [ ] Add generated-output tests asserting one main landmark, a skip link, correctly labelled tablists, live result region, and hidden control state on all four locale homes.
- [ ] Run the focused tests and record failures for the missing behaviors.
- [ ] Implement landmarks and skip navigation without changing page layout.
- [ ] Implement dialog open/close helpers that focus the first control, trap Tab/Shift+Tab, inert the page background, restore the trigger, and preserve Escape/backdrop closure.
- [ ] Implement ArrowLeft/ArrowRight/Home/End tab behavior with roving `tabindex`.
- [ ] Remove hidden floating/promo links from sequential focus order and restore them when visible.
- [ ] Add Escape-close and `aria-current="page"` to navigation.
- [ ] Add live-region status and fieldset/group labelling to dynamic recommendations.
- [ ] Rebuild and run focused tests until green.

### Task 2: Motion, carousel, contrast, and touch quality

**Files:**
- Create: `tests/motion-and-contrast.test.mjs`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Testimonials.astro`
- Modify: `src/components/ContactChannels.astro`
- Modify: `src/components/SpaGrid.astro`
- Modify: `src/components/QuickMatch.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: pausable/visibility-aware carousel behavior, synchronized `aria-hidden`, non-duplicated accessible testimonials, AA-readable action colors, and minimum mobile target sizing.

- [ ] Add tests for pause controls, reduced-motion state, accessible duplicate hiding, hero ARIA synchronization, and minimum control classes.
- [ ] Run tests and confirm the current output fails those assertions.
- [ ] Replace the testimonial 30ms `scrollLeft` loop with requestAnimationFrame/transform behavior that stops offscreen, on hover/focus, and for reduced motion.
- [ ] Add an accessible pause/resume control and hide cloned testimonials from assistive technology.
- [ ] Synchronize hero visual state and `aria-hidden`; stop timers when hidden/offscreen and expose pause/resume.
- [ ] Adjust button foreground/background tokens and secondary text opacity to meet AA contrast.
- [ ] Raise touch targets to at least 44 CSS pixels where space permits.
- [ ] Rebuild and run focused tests until green.

### Task 3: Canonical origin, sitemap, metadata, and structured-data truth

**Files:**
- Create: `tests/seo-remediation.test.mjs`
- Create: `src/pages/robots.txt.ts`
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/data/site.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/[lang]/spa/[slug].astro`
- Modify: `src/pages/[lang]/ranking.astro`
- Modify: `src/pages/[lang]/privacy.astro`
- Modify: `src/pages/[lang]/blog/[slug].astro`
- Modify: `src/content.config.ts`

**Interfaces:**
- Consumes: `PUBLIC_SITE_ORIGIN` build-time environment variable.
- Produces: one canonical origin, sitemap index, robots sitemap declaration, valid WebPage privacy schema, honest closed-venue schema, article modification metadata, and complete social image alternatives.

- [ ] Add output tests for canonical host consistency, sitemap/robots, OG locale alternates, Twitter image alt, schema types, `dateModified`, and absence of offers for closed venues.
- [ ] Run focused tests and confirm failure on current output.
- [ ] Add the official Astro sitemap integration with four-locale configuration.
- [ ] Derive Astro `site` and runtime metadata origin from `PUBLIC_SITE_ORIGIN`, defaulting to the current public Cloudflare Pages hostname.
- [ ] Add sitemap links to head/robots and social locale/image-alt metadata.
- [ ] Replace invalid privacy schema and enrich article author/publisher/update identities without inventing facts.
- [ ] Remove price/offer/opening-hour schema from closed venue pages and exclude closed venues from current ranking ItemLists.
- [ ] Rebuild and run focused tests until green.

### Task 4: Trust copy and editorial evidence

**Files:**
- Create: `tests/trust-and-editorial.test.mjs`
- Create: `src/components/EditorialEvidence.astro`
- Create: `src/pages/[lang]/editorial-policy.astro`
- Create: `src/i18n/pages/editorialPolicy.ts`
- Modify: `src/i18n/index.ts`
- Modify: `src/i18n/types.ts`
- Modify: `src/i18n/pages/privacy.ts`
- Modify: `src/i18n/pages/spa.ts`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/[lang]/spa/[slug].astro`

**Interfaces:**
- Produces: four-language privacy disclosure, editorial/correction policy, source and last-reviewed panel, and natural dedicated venue summaries.

- [ ] Add tests asserting each locale discloses Google measurement/advertising and external messaging platforms, publishes an editorial/correction route, and renders a sourced evidence panel.
- [ ] Run focused tests and verify failure.
- [ ] Rewrite privacy disclosure to match deployed technology while avoiding legal conclusions.
- [ ] Add a four-language editorial policy explaining verification, corrections, closures, prices, and update cadence.
- [ ] Add an evidence panel with last-reviewed date and the official MGTO directory; explicitly label unverified venue-specific fields rather than inventing them.
- [ ] Replace blind English `.slice(0, 180)` descriptions with dedicated localized summaries or sentence-safe truncation.
- [ ] Add footer links and rebuild until focused tests pass.

### Task 5: Fonts, images, analytics, caching, and lightweight utility pages

**Files:**
- Create: `tests/performance-remediation.test.mjs`
- Create: `public/_headers`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/SpaGrid.astro`
- Modify: `src/components/SpaGallery.astro`
- Modify: `src/pages/[lang]/blog/[slug].astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Produces: no third-party font stylesheet, delayed analytics, active-only hero image loading, responsive image candidates/intrinsic dimensions, light 404, immutable fingerprinted asset caching, and baseline security headers.

- [ ] Add tests ensuring no Google Fonts URL, no eager hidden hero sources, responsive image markup, delayed analytics, and expected `_headers` rules.
- [ ] Run focused tests and record failures.
- [ ] Replace remote fonts with locale-aware system font stacks.
- [ ] Defer analytics until idle/consent-compatible interaction while preserving one tag initialization.
- [ ] Render only the active hero source initially and preload the next slide immediately before rotation.
- [ ] Add responsive image candidates, sizes, dimensions, priority, and lazy-loading by actual viewport role.
- [ ] Keep 404 on the shared brand but skip analytics and heavy font behavior.
- [ ] Add Cloudflare security headers plus immutable caching for `/_astro/*` and versioned media.
- [ ] Rebuild and run focused tests until green.

### Task 6: Root routing, mobile density, and final integration

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/BestOfMonth.astro`
- Modify: `src/pages/[lang]/ranking.astro`
- Modify: relevant tests under `tests/`

**Interfaces:**
- Consumes: all earlier tasks.
- Produces: resilient locale gateway fallback, labelled horizontal regions, non-obscured floating actions, and complete integration.

- [ ] Add tests for four static locale fallbacks, query/hash preservation, labelled horizontal regions, and closed-status ranking display.
- [ ] Run focused tests and confirm failures.
- [ ] Add accessible fallback locale links while retaining automatic language selection.
- [ ] Improve long mobile sections with progressive disclosure or controlled carousel presentation without removing content.
- [ ] Label horizontal scrolling regions and maintain safe bottom/right spacing around floating actions.
- [ ] Remove duplicated data fields and resolve cross-task merge conflicts.
- [ ] Run `npm test`, `npx astro check`, full static link/schema audit, and browser checks at 360, 789, 1024, 1279, 1280, and 1440 pixels.
- [ ] Run fresh mobile/desktop Lighthouse comparisons and document remaining field-data limitations.

