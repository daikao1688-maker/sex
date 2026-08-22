# Design QA — 澳門桑拿 Astro 網站

Date: 2026-08-19

**Findings**

- No actionable P0/P1/P2 findings remain.
- [P3] The browser-comment reference images do not expose their original raster files or device pixel ratio. Their annotated CSS viewport (`319 × 622`) and visible interaction state were therefore normalized against an exact `319 × 622` implementation session instead of claiming false pixel-for-pixel precision. This does not block acceptance because the requested geometry, behavior, responsive layout, and visible states were directly verified.

**Source Visual Truth**

- File-backed hero/display reference: `/var/folders/fx/g6rf1wd52qq6n0pvqmx7l4lw0000gn/T/codex-clipboard-36e88109-dd1d-497d-8127-a011f5b088e0.png` — `1898 × 1420` raster pixels. The source includes browser chrome, so the page-content region was used for comparison.
- Additional user-provided visual targets were opened from the conversation annotations:
  - `conversation://browser-comment/best-of-month-reference`
  - `conversation://browser-comment/navbar-scroll-line-reference`
  - `conversation://browser-comment/features-two-column-reference`
  - `conversation://browser-comment/language-menu-reference`
  - `conversation://browser-comment/gallery-close-reference`
  - `conversation://browser-comment/related-spas-two-column-reference`
  - `conversation://browser-comment/blog-filter-reference`
  - `conversation://browser-comment/back-to-top-progress-reference`
  - `conversation://browser-comment/manhao-practical-info-icons-reference`
  - `conversation://browser-comment/venue-official-website-removal`
- Live practical-info reference: `http://127.0.0.1:4321/zh-CN/venues/manhao-spa/`, inspected at CSS viewports `319 × 622` and `319 × 1100`. The comparison source establishes the compact `20px` icon rail, `8px` icon/label gap, dark row separators, localized Manhao facts, and stacked mobile reading order.
- Intentional constraint: the existing gold brand palette, content, routes, and nearby design were preserved. The references governed the requested display behavior and layout rather than replacing the site's identity.

**Implementation Evidence**

Full-view comparison:

- `/Users/mac/.codex/visualizations/2026/08/19/01a0184b-a5d9-7d21-860f-40196a261067/design-qa/hero-source-vs-implementation.png` — normalized side-by-side content comparison, `1440 × 560` pixels.
- `/Users/mac/.codex/visualizations/2026/08/19/01a0184b-a5d9-7d21-860f-40196a261067/design-qa/hero-desktop-current-1440x1000.png` — rendered desktop hero, nominal CSS viewport `1440 × 1000`; captured content raster `1401 × 990`.
- `/Users/mac/.codex/visualizations/2026/08/19/01a0184b-a5d9-7d21-860f-40196a261067/design-qa/hero-mobile-current-390x844.png` — rendered mobile hero, nominal CSS viewport `390 × 844`; captured content raster `375 × 812`.
- `/Users/mac/.codex/visualizations/2026/08/19/01a0184b-a5d9-7d21-860f-40196a261067/design-qa/mobile-319-qa-contact-sheet.png` — focused mobile-state contact sheet, `912 × 1180` pixels.

Focused region evidence:

- Best-of-month carousel: `best-of-month-mobile-current-390x1100.png` (`375 × 886`) and `best-of-month-319x622.png` (`304 × 593`).
- Why-choose-us grid: `features-mobile-current-390x844.png` (`375 × 812`) and `features-319x622.png` (`304 × 593`).
- Transparent language trigger/menu: `language-menu-transparent-mobile-390x844.png` (`375 × 812`) and `language-trigger-transparent-319x622.png` (`304 × 593`).
- Gallery close state: `spa-gallery-close-mobile-390x844.png` (`390 × 844`) and `spa-gallery-close-319x622.png` (`319 × 622`).
- Related venues 2 × 2: `related-spas-mobile-390x844.png` (`375 × 812`) and `related-spas-319x622.png` (`304 × 593`).
- Non-sticky blog filter: `blog-filter-nonsticky-mobile-390x844.png` (`375 × 812`).
- Back-to-top/progress control: `article-progress-button-mobile-390x844.png` (`375 × 812`) and `article-progress-button-319x622.png` (`304 × 593`).
- Manhao practical-info reference: `manhao-practical-reference-319x622-final.png` (`319 × 622`) and `manhao-practical-reference-319x1100-final.png` (`319 × 1100`).
- Manhao practical-info implementation: `manhao-practical-implementation-319x622-final.png` (`319 × 622`) and `manhao-practical-implementation-319x1100-passed.png` (`319 × 1100`).
- Focused side-by-side archive: `manhao-practical-reference-vs-implementation-319x622-final.png` (`656 × 622`). Because the two localhost hosts render at different capture scales in the CDP surface despite both reporting `devicePixelRatio: 1`, acceptance is based on normalized CSS geometry plus the individual rasters, not a raw pixel diff.

All evidence files above live under:
`/Users/mac/.codex/visualizations/2026/08/19/01a0184b-a5d9-7d21-860f-40196a261067/design-qa/`

**Viewport and Density Normalization**

- Exact narrow-device interaction run: CSS viewport `319 × 622`, `deviceScaleFactor: 1`, `window.innerWidth: 319`, `documentElement.clientWidth: 304`, `scrollWidth: 304`; no horizontal overflow.
- The in-app browser's scrolled visible-content captures omit its surrounding chrome/scrollbar, yielding `304 × 593` rasters for some focused states. The gallery overlay capture retained the full `319 × 622`. Layout assertions use the CSS viewport and DOM geometry, not filename assumptions.
- Secondary mobile capture: nominal CSS viewport `390 × 844`; in-app content rasters are primarily `375 × 812`, with the gallery state captured at `390 × 844`.
- Desktop capture: nominal CSS viewport `1440 × 1000`; rendered content raster `1401 × 990`.
- The source hero screenshot includes external browser chrome and has no reliable CSS/device-density metadata. The content area was cropped and normalized in the `1440 × 560` comparison composite before judging hierarchy, crop, darkness, and display behavior.

**State and Interaction Coverage**

- Hero: dark overlay, cross-fading local backgrounds, alternating zoom-in/zoom-out treatment, stable text layout, and reduced-motion behavior.
- Monthly-best card: manual arrow, dot, and swipe navigation; active venue/title synchronization; no automatic rotation; mobile tilt removed at desktop.
- Navbar: before/after scroll geometry, stable `64px` mobile height, zero bottom border, transparent language trigger, open menu, active locale, check icon, outside click, Escape, and focus restoration.
- Gallery: open, explicit `44 × 44` close button, image click remains open, backdrop close, Escape close, focus restoration, and body-scroll restoration.
- Blog: filters remain in document flow and filtering still changes visible cards.
- Global back-to-top: hidden near page top, visible after threshold, smooth/reduced-motion return, and progress ring centered within `1px` of the button.
- Whole-site progress: at 50% document scroll, ring offset was `50` on `/zh-TW/`, `/zh-TW/spa/clube-rio/`, `/zh-TW/blog/`, and `/zh-TW/blog/macau-sauna-september-holidays-2026/`; top offset was `100` on every route.
- Contact fallback: pages without a local `#contact` navigate to `/zh-TW/contact/`; pages with the local section continue to scroll to it.
- Locale/responsive sweep: `en`, `zh-TW`, `zh-CN`, and `ja` at `319px`, plus desktop `1440px`; no tested horizontal overflow.
- Shared venue practical-info card: all seven rendered rows use the same inline SVG system (`price`, `staff`, `hours`, `overnight`, `highlights`, `best-for`, `payment`). At `319px`, every locale measured a `287px` card from `x=16` to `x=303`, document `scrollWidth=319`, and zero row overflow. The icon begins at `x=37` and the content rail at `x=65`, matching the reference's `20px + 8px` rhythm.
- Venue official-website removal: the practical-info website row and the contact-section website line were removed from the shared detail template. The production-output regression sweep covered all `4 × 12 = 48` venue detail pages; live browser checks covered all four locales on the formerly linked Shang Pin page at `319 × 622`, plus a `1440 × 1000` desktop pass. No website row, localized official-website label, visible venue host, empty separator, or horizontal overflow remained. Original venue website data remains available but is no longer rendered.
- Manhao data state: zh-CN two-paragraph introduction, `MOP 2,488 - 6,088`, `14:00 – 04:00`, eight-country staff note, and the temporary no-overnight note were verified in rendered text. Shared price/hour facts and JSON-LD match across `en`, `zh-TW`, `zh-CN`, and `ja`; venue-specific staff/overnight copy remains scoped to zh-CN Manhao. The four-language FAQ and eleven Manhao-related articles were also checked for stale `06:00` claims.
- Multi-venue facts state: the 10 requested venue profiles now derive reference price, 24-hour venue status, therapist count/team, eight-country lineup, and therapist duty window from shared data while keeping venue hours and therapist hours as separate rendered values. Eight revised introductions are synchronized across `en`, `zh-TW`, `zh-CN`, and `ja`; Majesty and Victoria highlight additions are localized. The Excellent's overnight availability and 10% service fee were also reconciled with FAQ, guide, and related blog content in all four languages. The generated-output regression covered all four locales, and a focused browser sweep covered eight representative venue/locale combinations at `319 × 622` with zero document or practical-card overflow.
- Browser console: no application errors or warnings; only expected Vite connection debug entries.
- Production build: `astro build` completed successfully with `118 page(s) built`.

**Required Fidelity Surfaces**

- Fonts and typography: existing CJK/Latin sans stack and optical hierarchy were preserved; headline, venue copy, menu labels, mobile card titles, line height, wrapping, and truncation were checked at `319px` and desktop. No clipped or unreadable strings remained across four locales.
- Spacing and layout rhythm: hero safe area for fixed chrome, centered hierarchy, compact two-column mobile grids, carousel control spacing, `44px` tap targets, card radii, and persistent floating-control separation match the requested proportions without collisions.
- Colors and visual tokens: the site's gold/ink tokens were intentionally retained. Hero darkness and vignette now match the reference display intent; active/selected states remain legible and consistent.
- Image quality and asset fidelity: existing real local Macau/venue imagery was retained at appropriate `object-cover` crops. No placeholder imagery, CSS art, emoji, or text-glyph substitutes remain for the requested visible assets or controls.
- Copy and content: existing localized copy was preserved. Current venue labels stay synchronized with carousel state; language names and accessibility labels are localized.
- Icons: shared icon components/SVG paths are used for arrows, check, close, language, and service icons; alignment, stroke weight, and tap targets were inspected in focused captures.
- Practical-info icon fidelity: dedicated Lucide-style badge-dollar, users, clock, moon, sparkles, tag, and credit-card paths replace text glyphs. Icons remain decorative (`aria-hidden`) while the enclosing `<dl>/<dt>/<dd>` preserves accessible label/value semantics.
- Responsiveness and accessibility: semantic buttons/links, keyboard close behavior, focus restoration, `aria-current`, visible focus rings, reduced motion, decorative-image semantics, stable two-column mobile grids, and no horizontal overflow were verified.

**Comparison History**

1. Pass 1 found text-glyph arrows, undersized dot targets, a non-contextual language trigger, and a carousel heading that did not follow the active card (P2). These were replaced with shared icons, `44px` controls, the full active language plus selected check, and live venue-title synchronization. Post-fix evidence: `best-of-month-mobile-current-390x1100.png`, `language-menu-transparent-mobile-390x844.png`, and `mobile-319-qa-contact-sheet.png`.
2. Pass 2 found the missing gallery close control, single-column related venues, sticky blog filters, no global floating back button, duplicate footer back text, the article-only top progress bar, and an opaque language trigger (P1/P2). All were corrected in the scoped components. Post-fix evidence: `spa-gallery-close-319x622.png`, `related-spas-319x622.png`, `blog-filter-nonsticky-mobile-390x844.png`, `article-progress-button-319x622.png`, and `language-trigger-transparent-319x622.png`.
3. Pass 3 found automatic carousel rotation could violate predictable interaction/reduced-motion expectations (P2). Autoplay was removed; arrow, dot, and swipe navigation remain. Post-fix browser test confirmed no card change after `5.4s`, followed by a successful manual next-state change.
4. Pass 4 independent review found the progress SVG lacked a local positioning context and the contact pill had a dead `#contact` fallback on blog routes (P2). The button received `position: relative`; the localized contact route became the fallback. Post-fix geometry showed a maximum `1px` center delta, and the blog CTA navigated to `/zh-TW/contact/`.
5. Pass 5 extended the progress ring from article pages to the entire site at the user's request. Four representative routes returned offsets `100 → 50` from top to midpoint, retained back-to-top behavior, and showed no `319px` overflow. Independent review found no P0/P1/P2 issue.
6. Pass 6 updated Manhao's requested facts and introduced the shared venue-detail icon card. The first implementation used a `44px` icon column plus `12px` gap; live comparison found its text rail `24px` too far right at `319px` (P2). It was tightened to the reference's `20px` icon plus `8px` gap (`x=65` content start). Four-locale mobile and two-route desktop sweeps then reported zero document or row overflow.
7. Pass 7 independent review found stale Manhao `06:00` closing times in the four-language FAQ and eleven editorial articles (P2). Only Manhao references were changed to `04:00`; a source-level consistency regression test was added. Final production build generated all `118` pages and the dedicated suite passed `4/4`; follow-up review found no remaining P0/P1/P2 issue.
8. Pass 8 removed both user-visible venue official-website areas from the shared detail template: the practical-info row and the contact-section line. The new regression test first failed against the old `en/clube-rio` website row, then passed across every generated locale/venue route after the minimal removal. The full suite passed `5/5`, the production build remained at `118` pages, and four-locale mobile plus desktop browser checks found no visual or console regression.
9. Pass 9 synchronized the user-supplied facts for 10 venue detail pages across all four languages. A data-model correction stopped reusing the therapist duty window as the venue's opening time; 24-hour venues now show the localized 24-hour label with a separate therapist line. Eight introductions, all 10 displayed price and overnight states, therapist counts/teams, nationality lists, duty windows, Excellent overnight availability and service fee, and the Majesty/Victoria highlights were regression-tested. FAQ, guide, and related blog claims were swept for stale hours and overnight wording, including venue-specific Japanese guidance and Manhao's 04:00 closing time. The `npm test` entry point now performs a fresh build before assertions. Final build produced `118` pages; the full suite passed `12/12`; eight live `319 × 622` browser checks found every expected value and no horizontal overflow.

**Open Questions**

- None blocking. The only residual limitation is unavailable original pixel-density metadata for conversation-only annotation images, documented above as P3.

**Implementation Checklist**

- [x] Preserve existing brand/content and limit changes to annotated regions.
- [x] Verify source and implementation visually in full and focused views.
- [x] Test primary interactions and keyboard close/focus behavior.
- [x] Test exact narrow mobile, secondary mobile, desktop, and four locales.
- [x] Check horizontal overflow and browser console.
- [x] Run independent P0/P1/P2 review.
- [x] Run full production build (`118` pages).
- [x] Verify shared practical-info icons across every generated venue detail page.
- [x] Verify venue official-website rows and contact lines are absent across all 48 generated detail pages.
- [x] Verify Manhao facts, four-locale structured data, and venue-specific copy isolation.
- [x] Verify the 10-venue fact batch and eight revised introductions across all four generated locales.

**Follow-up Polish**

- Optional P3 only: if the original full-resolution browser-comment image files become available, archive equal-density crops for a stricter historical pixel-diff. No visible or functional change is currently required.

final result: passed
