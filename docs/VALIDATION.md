# Validation record

Validated on 17 October 2026 in the Codex in-app Chromium browser against both the Next.js development server and the final static export. This is a development QA record, not a certification or a user-study result.

## Build and source

- `npm run typecheck`: passed.
- `npm run build`: passed with Next.js 16.4.2; exported homepage, booking, all three programme routes, and 404 output.
- Static source/asset audit: 8 emitted HTML files, 219 local `href`/`src` references checked, zero missing file/directory targets. Repeated references are counted.
- Original photographs visually inspected, optimized to WebP, and served locally. The homepage was scrolled through to verify every image loaded at its intended frame. All observed homepage images decoded at 1536 pixels wide.
- Source is formatted with Prettier. No animation library, remote photo dependency, CRM SDK, analytics script, or WebGL runtime was added.

## Responsive layout

The homepage, `/book/`, `/training/coached-strength/`, `/training/small-group-conditioning/`, and `/training/personal-training/` were all loaded at each size. DOM document width and text-range bounds of headings were inspected.

| Viewport  | Routes checked | Document overflow | Clipped heading text | Observed broken images |
| --------- | -------------- | ----------------- | -------------------- | ---------------------- |
| 360×800   | 5              | None              | None                 | None                   |
| 768×1024  | 5              | None              | None                 | None                   |
| 1440×1000 | 5              | None              | None                 | None                   |

Desktop hero, training index, tablet hero, mobile hero, mobile training/timetable, programme detail, booking form, and demo completion were visually reviewed. A long mobile programme title was reduced slightly after inspection. At the bottom of the mobile page, footer content remains above the fixed booking bar. Safe-area padding is implemented in CSS; no physical notched-device test was performed.

## Interaction checks

- Training rows: pointer selection changes image and details; Enter selects personal training; Space selects coached strength; `aria-pressed` reflects selection. Keyboard focus measured as a visible 2px solid outline.
- Timetable: Tuesday/personal-training filter produces the empty state; “Show all training” restores Tuesday’s sessions. Day and training selection are independent. Sunday is deliberately closed.
- Preserved enquiry: Tuesday 07:00 conditioning arrived with the correct training, time, duration, and illustrative coach. A final static-export test also carried Monday 07:00 strength into the form and completed the demo.
- Empty submission: name and contact errors are listed with linked fields; focus moves to the error summary.
- Valid sample submission: loading text appears, controls are disabled, and completion states “Demo complete. No booking request was sent.” Focus moves to the completion heading, the form unmounts, and entered values are cleared.
- Explicit `/book/?training=personal&preview=error` path: valid WhatsApp sample details reach the labelled demo error state, focus returns to the summary, values are retained, and retry completes.
- Mobile menu: opens/closes; Escape closes and returns focus to the menu toggle. Keyboard cycling is contained while expanded.
- FAQ: native summary disclosure responds to Enter and exposes its answer.
- Journal: the progress CSS variable changes with scrolling and section markers update without controlling scroll.

## Accessibility and motion

- Visible labels, required indicators, autocomplete, correct email/tel input types, field-level errors, status feedback, and programme/session announcements are present.
- Measured token contrast: primary action text `#090B08` on vermilion `#D84B32` is **4.68:1**; muted body `#62635B` on chalk is **5.24:1**; small red annotations use `#AA3623` on chalk at **5.55:1**. Large muted headline text is 3.53:1. These are calculated solid-colour pairs, not a full automated accessibility audit of every pixel/state.
- Focus styles on dark sections use chalk. All programme choices and essential descriptions remain visible without hover.
- `prefers-reduced-motion: reduce` disables animation/transitions and smooth scrolling. Reveals start with content visible; no animation is required for access to content. This behaviour was verified in source; browser-level reduced-motion emulation was not available through the selected QA interface.
- No console errors were observed. Development warnings for image loading and smooth-scroll route handling were addressed with explicit eager/high-priority hero image loading and the framework’s `data-scroll-behavior` attribute.

## Performance facts and limits

- Six concept WebP photos total approximately 812 KB on disk; the hero is approximately 136 KB. Three Latin WOFF2 files total approximately 56 KB. Repeated image use shares local URLs.
- The site is prerendered, lower-page photography is lazy loaded, and font files are self-hosted. Only interactive regions are Client Components.
- No Lighthouse run, throttled network benchmark, field Core Web Vitals collection, screen-reader session, real-device test, or conversion study was performed. No numerical performance score, conversion uplift, business result, or claim of full accessibility compliance is made.

## Local evidence

The ignored local `artifacts/` directory contains `layout-audit.json`, `desktop-1440.jpg`, `mobile-360.jpg`, full desktop/mobile homepage screenshots, and `demo-complete-mobile.jpg`. They are handoff evidence and are not included in the deployed public assets.
