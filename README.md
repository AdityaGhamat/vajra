# VAJRA FITNESS — Progress is a practice.

A portfolio example of a complete gym website: a fictional neighbourhood strength club in Baner, Pune, designed and built to show what a production-quality fitness site feels like end to end — brand, editorial design, motion, timetable, programme pages, and a booking enquiry flow. Nothing here is a real business; everything is illustrative, and the site says so wherever it matters.

The concept is an independent sports magazine crossed with a training journal: warm chalk and ink, condensed display type, documentary-style concept photography, numbered log entries, and a single vermilion signal colour. Scrolling the site is framed as writing your training log — every section stamps another entry.

## What this example demonstrates

- **Full site, not a landing page.** Editorial homepage (hero, first-session guide, philosophy, coaches, memberships, space essay with interactive floor plan, visit info, FAQ), three dedicated programme pages (`/training/[slug]/`), a booking enquiry page (`/book/`), and a custom 404.
- **A booking flow without a backend.** The enquiry form has contact-preference selection (email / phone / WhatsApp), validation with a linked error summary, loading / error-retry / completion states, and prefilled links from training programmes and timetable sessions. Submissions stay in React memory and are cleared on completion — there is deliberately no network call, storage, analytics, or CRM.
- **Motion with manners.** GSAP line reveals, scroll-linked scenes, a three-panel route curtain, Lenis wheel smoothing, a magnetic CTA treatment, and an animated lifter preloader — all gated behind `prefers-reduced-motion` and an in-site motion toggle, with a fully usable static page underneath.
- **Day and night editions.** A persistent theme switch with a circular reveal, following the device until the visitor chooses.
- **Accessibility as a feature.** Semantic landmarks, skip link, focus management on route change and dialogs, live-region announcements, keyboard-operable gallery / timetable / training index, and 44px+ touch targets.
- **Honest fiction.** Every person and place in the photography is AI-generated concept imagery, coach personas and prices are labelled illustrative, and the location block explicitly refuses to fake a map pin or phone number.

## Tech stack

| Layer     | Choice                                                              |
| --------- | ------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router) + TypeScript + React 19                     |
| Motion    | GSAP (SplitText, ScrollTrigger) + Lenis, loaded after first render  |
| Styling   | Hand-written CSS (tokens, editorial grid, chapters, reduced motion) |
| Type      | Barlow Condensed + DM Sans, self-hosted via `next/font` (OFL)       |
| Imagery   | Local WebP concept photos, served through `next/image`              |

No CMS, no database, no environment variables, no external image or font services.

## Run locally

Requires Node.js 20.9 or newer (developed with Node 22).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run typecheck
npm run build
npm start
```

To inspect the demo error state, open `/book/?training=personal&preview=error`, enter valid sample details, and submit: the first attempt shows an identified demo error and preserves your entries; retrying completes. The normal flow never fabricates a failure.

## Project structure

```text
app/
  page.tsx               Homepage — the training log, section by section
  layout.tsx             Fonts, header/footer, motion + transition providers
  training/[slug]/       One page per programme (strength, conditioning, personal)
  book/                  Enquiry page: story column + demo form
  globals.css            Tokens, type scale, editorial grid
  experience.css         Chapters, motion, preloader, gallery, theme editions
  controls.css           Forms, timetable, booking states
  floor-plan.css         Interactive club floor plan
components/
  preloader.tsx          Animated lifter intro (two reps, then racks away)
  training-index.tsx     Programme selector with full-bleed takeover previews
  timetable.tsx          Day filter + session rows with enquiry links
  space-gallery.tsx      Photo essay with keyboard-navigable viewer dialog
  club-floor-plan.tsx    Interactive zone map of the concept club
  club-location.tsx      Concept address block (never a fake venue pin)
  booking-form.tsx       Demo enquiry with accessible validation states
  journal.tsx            Scroll-linked "practice" rail with stamped entries
  page-transitions.tsx   Route curtain + focus management
lib/
  content.ts             Programmes, sessions, coaches, memberships, FAQs, hours
  booking.ts             Validation rules and the demo adapter seam
  motion/                Scroll engine, reveals, scenes, interactions, routes
public/
  images/                WebP concept photography + print grain texture
  fonts/                 Self-hosted woff2 + OFL license texts
```

The homepage and programme pages are Server Components; navigation, the journal, training selection, timetable, enquiry form, and appearance preferences are small client components. Motion is an enhancement layer — the page is complete before it loads.

## Make it yours

| To change                                          | Edit                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------ |
| Programmes, sessions, coaches, prices, FAQs, hours | `lib/content.ts`                                                   |
| Enquiry fields, validation, demo behaviour         | `lib/booking.ts`, `components/booking-form.tsx`                    |
| Design tokens, layout, theme editions              | `app/globals.css`, `app/experience.css`, `app/controls.css`        |
| Fonts, metadata, site origin                       | `app/layout.tsx` (`SITE_URL` env at build time for canonical URLs) |
| Photography                                        | `public/images/` (local paths only; `next/image` handles the rest) |

Swap the demo adapter in `lib/booking.ts` for a server Route Handler or booking service to go live — and never put CRM credentials in the browser bundle.

## Demo boundaries

- VAJRA FITNESS is fictional. Programmes, coaches, prices, policies, hours, and sessions are illustrative; no awards, reviews, qualifications, or results are claimed.
- All imagery is AI-generated concept work, labelled as such on the site.
- The booking demo sends nothing anywhere. Entries live in memory, contact details never enter the URL, and closing or reloading discards everything.
- Appearance controls persist only `form-theme` and `form-motion` in `localStorage`.

## Deploying

Any host that runs a Next.js server works (`npm run build` → `npm start`). Static-only hosting is not suitable — the site relies on the Next.js server for image optimization. Set `SITE_URL` to the site's origin before building so social metadata uses canonical URLs (local development defaults to `http://localhost:3000`).
