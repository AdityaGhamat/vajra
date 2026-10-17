# Validation record

Validated on 17 October 2026 in the Codex in-app Chromium browser against both the Next.js development server and the final static export. This is a development QA record, not a certification or a user-study result.

## Build and source

- `npm run typecheck`: passed.
- `npm run build`: passed with Next.js 16.4.2; exported homepage, booking, all three programme routes, and 404 output.
- Static source/asset audit: 8 emitted HTML files, 219 local `href`/`src` references checked, zero missing file/directory targets. Repeated references are counted.
- Original photographs visually inspected, optimized to WebP, and served locally. The homepage was scrolled through to verify every image loaded at its intended frame. All observed homepage images decoded at 1536 pixels wide.
- Source is formatted with Prettier. The moving edition adds locally bundled GSAP 3.15.0 with ScrollTrigger/SplitText and Lenis 1.3.27. It adds no remote photo dependency, CRM SDK, analytics script, video, or WebGL runtime.

## Responsive layout — moving edition

The homepage, `/book/`, `/training/coached-strength/`, `/training/small-group-conditioning/`, and `/training/personal-training/` were all loaded at each size in **both day and night editions**, with motion enabled. Document width and text-range bounds of visible headings were inspected after each entrance settled: **30 route/theme/viewport combinations**. Each had one main landmark, an initialized motion system, no overflow, no clipped visible heading, and no observed broken image.

| Viewport  | Route/theme combinations | Document overflow | Clipped visible headings | Observed broken images |
| --------- | ------------------------ | ----------------- | ------------------------ | ---------------------- |
| 360×800   | 10                       | None              | None                     | None                   |
| 768×1024  | 10                       | None              | None                     | None                   |
| 1440×1000 | 10                       | None              | None                     | None                   |

Desktop hero, training index, tablet hero, mobile hero, mobile training/timetable, programme detail, booking form, and demo completion were visually reviewed. A long mobile programme title was reduced slightly after inspection. At the bottom of the mobile page, footer content remains above the fixed booking bar. Safe-area padding is implemented in CSS; no physical notched-device test was performed.

## Interaction checks

- Training rows: pointer selection changes image and details; Enter selects personal training; Space selects coached strength; `aria-pressed` reflects selection. Keyboard focus measured as a visible 2px solid outline.
- Timetable: Tuesday/personal-training filter produces the empty state; “Show all training” restores Tuesday’s sessions. Day and training selection are independent. Sunday is deliberately closed.
- Preserved enquiry: Tuesday 07:00 conditioning arrived with the correct training, time, duration, and illustrative coach. A final static-export test also carried Monday 07:00 strength into the form and completed the demo.
- Empty submission: name and contact errors are listed with linked fields; focus moves to the error summary.
- Valid sample submission: loading text appears, controls are disabled, and completion states “Demo complete. No booking request was sent.” Focus moves to the completion heading, the form unmounts, and entered values are cleared.
- Explicit `/book/?training=personal&preview=error` path: valid WhatsApp sample details reach the labelled demo error state, focus returns to the summary, values are retained, and retry completes.
- Mobile menu: opens/closes; Escape closes and returns focus to the menu toggle. Keyboard cycling is contained while expanded. With Lenis enabled, opening stops its controller and closing resumes it; menu anchors reach their chosen section.
- FAQ: native summary disclosure responds to Enter and exposes its answer.
- Journal: the progress CSS variable changes with scrolling and section markers update without controlling scroll.

## Accessibility and motion

- Visible labels, required indicators, autocomplete, correct email/tel input types, field-level errors, status feedback, and programme/session announcements are present.
- Measured token contrast: primary action text `#090B08` on vermilion `#D84B32` is **4.68:1**; muted body `#62635B` on chalk is **5.24:1**; small red annotations use `#AA3623` on chalk at **5.55:1**. Large muted headline text is 3.53:1. These are calculated solid-colour pairs, not a full automated accessibility audit of every pixel/state.
- Focus styles on dark sections use chalk. All programme choices and essential descriptions remain visible without hover.
- `prefers-reduced-motion: reduce` skips optional motion and disables transitions/smooth scrolling. The footer preference was tested: motion becomes reduced, Lenis is removed, all split-line wrappers revert, and content remains visible. Re-enabling restores motion. Browser-level device-preference emulation was unavailable; the system branch was checked in source and uses the same teardown path.
- Theme preference persists across route changes and reloads. The circular reveal was exercised with motion enabled; the ordinary switch was exercised with motion disabled.
- Night contrast: button text on accent **6.67:1**; muted text on main surface **9.00:1**; red annotations **7.45:1**; primary text **15.14:1**. These are solid-colour calculations, not a full accessibility audit.
- No console errors were observed. Development warnings for image loading and smooth-scroll route handling were addressed with explicit eager/high-priority hero image loading and the framework’s `data-scroll-behavior` attribute.

## Performance facts and limits

- Six concept WebP photos total approximately 812 KB on disk; the hero is approximately 136 KB. Three Latin WOFF2 files total approximately 56 KB. Repeated image use shares local URLs.
- The site is prerendered, lower-page photography is lazy loaded, and font files are self-hosted. Only interactive regions are Client Components. The optional production motion chunk measures approximately **54 KB gzip**, including GSAP/ScrollTrigger/SplitText/Lenis. It loads after the first rendered frame and is skipped for reduced motion. This is an artifact-size measurement, not a network benchmark; no blocking intro was added.
- No Lighthouse run, throttled network benchmark, field Core Web Vitals collection, screen-reader session, real-device test, or conversion study was performed. No numerical performance score, conversion uplift, business result, or claim of full accessibility compliance is made.

## Local evidence

The ignored local `artifacts/` directory contains `layout-audit.json`, `desktop-1440.jpg`, `mobile-360.jpg`, full desktop/mobile homepage screenshots, and `demo-complete-mobile.jpg`. They are handoff evidence and are not included in the deployed public assets.

The `artifacts/moving-edition/` subdirectory adds the combined 30-case audit and updated day/night screenshots. See MOTION-DIRECTION.md for the reference study, section-by-section motion map, architecture, and tradeoffs.

Additional quiet-edition check: all five routes were reloaded at 360px with motion disabled. Each reported a 360px document, no Lenis class, and zero split-line wrappers. The programme-aware mobile booking bar was checked on personal training and preserved `training=personal`.

Final polish checks: browser-native smooth scrolling is disabled while Lenis is active, avoiding competing scroll controllers. Returning home on the same route resets scroll immediately; anchor timing is bounded and uses CSS scroll padding once. Headline masks no longer add line spacing: the two-line desktop hero measured 266.109px with a 133.056px line height. All four secondary routes were rechecked at 360px after that correction with no overflow and no browser errors.

## Scroll and route-transition regression — 17 October 2026

Tested the optimized static export on a separate local server, with no Fast Refresh in that preview. The updated production build and its TypeScript step pass. The production browser console reported zero warnings/errors over the recorded checks.

The 17-case local browser record in `artifacts/motion-revision/browser-regression.json` covers:

- A same-page training anchor settling at 107.89px against 108px CSS scroll padding, with one scroll owner.
- A visible, non-identity curtain transform during route exit, followed by unlocked arrival at scroll zero on all three programme pages.
- Programme-aware navigation into booking, retaining `training=personal`, with native scrolling, no Lenis class, and browser scroll behavior `auto`.
- Native wheel movement over the form, sample input retention, demo completion, and completion-heading focus.
- Mobile navigation with five links, day/night switching, Escape closure, continued native booking scroll, and no horizontal overflow at 390px.
- Mobile validation-summary focus, plus a cross-route `/#visit` arrival at 85.20px against 85px CSS padding.
- Quiet mode reverting split wrappers to zero and destroying Lenis; normal booking navigation remains usable. Re-enabling full motion restores route transitions.
- Actual scroll-linked changes in masked headline transforms and photo transforms, observed before scrolling and after wheel settling.
- Browser Back cancelling/releasing the curtain and restoring an unlocked native booking route.
- A focused desktop textarea remaining between the sticky header and the viewport bottom (top 465.66px, header bottom 95px, viewport 960px).
- Tablet booking arrival at scroll zero, native engine, idle curtain, and equal 768px document/viewport width.

Desktop (1280px and 1440px), mobile (390px), and tablet (768px) were exercised. Temporary viewport overrides were reset. Evidence screenshots include the route curtain, final homepage, and focused booking field. These checks are browser simulations; no physical mobile keyboard/device or screen reader was tested.
