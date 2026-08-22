# Full-Site Remediation Specification

## Objective

Resolve every confirmed issue from the 2026-08-22 read-only audit of the four-locale Astro site without changing its established visual identity, information architecture, venue URLs, or contact channels.

## Required outcomes

- Keep the static Astro build and the four locale prefixes: `en`, `zh-TW`, `zh-CN`, and `ja`.
- Make canonical URLs, sitemap URLs, Open Graph URLs, and schema URLs derive from one deploy-time site origin.
- Make the current Cloudflare Pages deployment canonical by default, while allowing a future custom domain through `PUBLIC_SITE_ORIGIN`.
- Publish a generated sitemap and robots file from the same build artifact.
- Do not advertise temporarily closed venues as current offers in structured data or ranking schemas.
- Make tracking disclosure accurately describe Google tag/Ads and third-party messaging channels without inventing a legal entity or contact detail.
- Fix focus management, focus trapping, focus restoration, background inertness, skip navigation, main landmarks, keyboard tabs, Escape behavior, live result announcements, and hidden-control tab order.
- Keep auto-rotating visual content pausable, reduced-motion aware, accessibility-tree safe, and inactive while offscreen.
- Remove the render-blocking Google Fonts request and use performant locale-aware system font stacks.
- Reduce initial hero, venue-card, gallery, blog-cover, analytics, and 404 payloads while keeping current imagery and design.
- Add responsive image hints and intrinsic dimensions wherever the current public assets provide enough information.
- Add Cloudflare Pages security and immutable-asset cache headers without caching HTML immutably.
- Keep the root locale gateway functional and preserve query strings and hashes.
- Add regression tests before each behavior change and verify the failing state before implementation.

## Non-goals and truth constraints

- Do not invent venue licence numbers, street addresses, telephone numbers, official URLs, operating times, prices, or operator identity.
- Do not claim legal compliance; improve transparency and leave qualified legal review as an external requirement.
- Do not blanket-classify every page as explicit content.
- Do not add unsupported customer counts, reviews, guarantees, or booking claims.
- Do not deploy or push changes unless the user separately authorizes it.

## Acceptance

- `npm test` succeeds with no failing tests.
- `npx astro check` succeeds.
- Static output contains 128 content/utility pages plus sitemap and robots assets.
- The four locale homes, representative venue/detail/blog/ranking/privacy pages, root gateway, and unknown route pass rendered desktop and mobile checks.
- Dialogs and tabs pass keyboard interaction checks.
- No relevant browser console errors or layout overflow are present in tested viewports.
- A fresh Lighthouse comparison shows the blocking Google font request is gone and no performance metric regresses materially because of the remediation.
