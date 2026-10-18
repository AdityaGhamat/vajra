# VAJRA FITNESS

A complete Next.js App Router + TypeScript portfolio concept for a fictional neighbourhood gym in Baner, Pune. The visual idea is an independent sports magazine crossed with a training journal: warm chalk, ink, condensed type, documentary concept photography, numbered entries, and vermilion progress marks.

## Run locally

Requires Node.js 20.9 or newer. Developed with Node 22 and Next.js 16.4.2.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. No environment variables or service credentials are needed.

```sh
npm run typecheck
npm run build
npm start
```

The build produces the production Next.js application in `.next/`, including the homepage, `/book/`, all three `/training/[slug]/` pages, and a custom 404. `npm start` runs the Next.js server at http://127.0.0.1:3000. Production hosting must support a Next.js server; serving an old `out/` directory will not include these changes or the image optimizer.

All source photographs live in `public/images/` and use local `/images/...` paths with `next/image`. Next.js generates responsive `srcset` candidates from each image's `sizes`, optimizes the requested width through the same-origin `/_next/image` endpoint, and caches the result. Below-the-fold images lazy-load; the main hero image loads eagerly. No ChatGPT image host or external image service is required. A deployed copy naturally serves these local assets under that deployment's own domain.

When deploying, set `SITE_URL` to your own site's origin before building (for example, `https://your-domain.example`). This sets canonical social-image URLs; local development defaults to `http://localhost:3000`. Social artwork is also local, in `public/social.png`.

## What works

- Responsive editorial homepage, including first-session guidance, philosophy, coaches, membership comparison, captioned space essay, hours, and native FAQ disclosures.
- Training index with pointer, touch, and keyboard activation; selected state, image transitions, live detail announcements, and dedicated programme pages.
- A scroll-linked journal marker, GSAP headline/section/photo motion, and Lenis wheel smoothing with native touch and keyboard scrolling.
- Day and night editions with a persistent theme switch, circular theme reveal where supported, and an additional motion-preference control. Device reduced motion takes priority.
- Weekly timetable with day selection, training filters, session details, clear empty states, and prefilled enquiry links. Sunday is a rest day.
- Demo enquiry with email/phone/WhatsApp preference, validation summary, linked field errors, loading, error/retry, completion focus, and cleared personal entries.
- Mobile navigation with Escape and focus handling; a booking bar with safe-area padding.
- Local WebP images, self-hosted OFL fonts through next/font, next/image, semantic HTML, page metadata, favicon, and social sharing artwork.

## Demo boundaries

VAJRA FITNESS is fictional. Programme structures, named coach personas, prices, policies, hours, and sessions are illustrative. No awards, reviews, capacity claims, qualifications, or results are fabricated. Every person and facility in the photographs is AI-generated. No map, phone, email, or WhatsApp link represents an operating business.

The booking demo has **no network submission, personal-data storage, analytics, or CRM**. It accepts sample entries only in React memory and clears them on completion. A selected training/session ID can be carried in the URL; contact details never enter the URL. Closing or reloading the page discards entries. A real enquiry would still require the club to confirm a time.

To inspect the explicit demo error state, open `/book/?training=personal&preview=error`, enter valid sample details, and submit. The first valid attempt shows an identified demo error and preserves entries; retry completes. There is no fabricated network failure in the normal flow.

Appearance controls save only `form-theme` and `form-motion` locally. They never store booking entries. Theme follows the device until a visitor chooses an edition.

## Customize

| Location                      | Edit                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| `lib/content.ts`              | Programmes, typed sessions, coaches, sample membership prices, FAQs, hours |
| `lib/booking.ts`              | Validation, enquiry domain type, demo adapter seam                         |
| `components/booking-form.tsx` | Enquiry fields and accessible states                                       |
| `app/globals.css`             | Design tokens, grid, responsive styles, reduced motion                     |
| `app/layout.tsx`              | Fonts, shared navigation/footer, metadata and site origin                  |
| `public/images/`              | Final optimized concept photographs                                        |
| `public/fonts/`               | Self-hosted fonts and their OFL licenses                                   |

The homepage and programme pages are Server Components. Navigation, the journal, training selection, timetable filters, enquiry form, and appearance preferences use small client components. The GSAP/Lenis motion system is imported separately after the initial render. The page remains usable with motion disabled or unavailable.

## Production handoff

See [integration notes](docs/INTEGRATIONS.md), [asset and licensing manifest](docs/ASSETS.md), [creative references and portfolio outline](docs/CASE-STUDY.md), [OFFFORUM study and motion map](docs/MOTION-DIRECTION.md), and [validation record](docs/VALIDATION.md).

The application uses the Next.js server for local image optimization. A real booking adapter can use a server Route Handler or an external booking service. Never put CRM credentials in the browser bundle.

Motion is separated into route transitions, scroll ownership, reveals, scroll scenes, and UI interactions under `lib/motion/`. Booking uses native scroll; landing/programme pages use Lenis for wheel input. See `docs/MOTION-DIRECTION.md` for lifecycle and accessibility details. Stop the dev server before changing dependencies, then restart it; do not leave a running Turbopack process watching a dependency reinstall.
