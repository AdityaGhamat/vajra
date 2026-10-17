# FORM / the moving edition

## Reference study

The live [OFFFORUM homepage](https://www.offforum.com/) and [About page](https://www.offforum.com/about/) were inspected on 17 October 2026, including the landing, scroll into the footer, navigation into About, and the staggered photograph sequence within About.

Observed principles:

- A very large typographic identity can remain paired with simple, legible navigation and a clear action.
- The landing uses changing photographic media with restrained overlaid information. The rendered DOM exposed a video player after navigation; no assumption is made about its production animation library.
- Moving from the landing into About creates an overlapping transition between outgoing photographic content and incoming editorial type.
- About uses an offset photograph sequence whose relative positions and scales change during scrolling, followed by a large contrasting type composition.
- Large blocks, open space, and changes between light/dark imagery provide the rhythm. Motion is part of that hierarchy rather than decoration applied identically to every item.

FORM interprets these principles through its own training-journal identity. No reference composition, brand asset, image, or source code was copied. The site retains readable programme comparisons, schedule filters, prices, and the first-session journey.

## Photograph treatment

The original local colour WebP files remain intact. Presentation now uses one non-destructive monochrome print treatment across the hero, programmes, coach studies, equipment, gallery, and booking page:

- Day edition: grayscale, contrast 1.15, brightness 0.94.
- Night edition: grayscale, contrast 1.12, brightness 0.85.
- A small repeating procedural grain tile adds a restrained printed surface.
- All photographs use the same family of tonal adjustments; vermilion belongs to the interface, not artificial skin grading.

The aim is a coherent editorial finish with less glossy colour rendering. A filter cannot establish authenticity or guarantee that a generated image will not be recognised. The concept-image disclosure remains accurate. A real shoot remains the strongest production upgrade.

## Motion map

| Part                | Treatment                                                                                        | Role                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Masthead/navigation | Underline feedback, rolling action labels, travelling arrows                                     | Make affordances clear without moving the navigation   |
| Hero                | Masked line entrance, staged supporting content, photograph reveal, settling journal stamp       | Establish the identity and first action immediately    |
| Section annotations | Rules and labels reveal from left to right                                                       | Connect the page to a training log                     |
| First-session story | Steps enter as a staggered group                                                                 | Make the sequence easy to follow                       |
| Training index      | Selected rule draws; photograph and details change with a short reveal                           | Explain the current choice                             |
| Philosophy          | Line masks, paragraph entrances, image movement within its frame                                 | Change pace without adding a scroll trap               |
| Timetable           | Group entrance and short re-entry after filtering, including empty state                         | Keep state changes understandable                      |
| Coach studies       | Staggered profiles and photographs moving inside stable frames                                   | Keep people and their approach together                |
| Membership          | Aligned columns reveal in sequence; prices remain ordinary text                                  | Preserve comparison and reading                        |
| The space           | Offset figure movement on desktop, contained image parallax at every size                        | Add depth to the photographic sequence                 |
| Visit/FAQs          | Practical information enters in groups; native disclosures get short answer feedback             | Preserve immediate access to answers                   |
| Closing/footer      | Large line entrance, action-label feedback, grouped footer details                               | End with the same clear first-session action           |
| Programme pages     | Route-specific type/image entrances, session outline, related links                              | Carry the visual system beyond the homepage            |
| Booking             | Individual field reveals, native scrolling, error/completion feedback, guarded focus positioning | Confirm changes without implying a real booking        |
| Mobile menu         | Short masked panel and staggered link entrance                                                   | Keep navigation understandable on touch screens        |
| Theme               | A circular reveal from the edition switch where supported; ordinary theme change otherwise       | Make day/night feel like two editions of the same club |

Typical reveals last 0.45–1.2 seconds. The complete route entrance settles in roughly 1.4 seconds, but it is not a loader and never gates use of the page. Scroll-linked imagery has modest travel inside reserved dimensions. There are no pinned sections, forced horizontal segments, continuous marquees, or fake loading screens.

## Implementation

- `components/motion-system.tsx` dynamically imports `lib/motion.ts` after the first rendered frame. HTML, typography, imagery, navigation, and form controls do not depend on that import to render.
- GSAP **3.15.0**, ScrollTrigger, and SplitText provide the animation timelines. Only lines are split, not every character. Accessible heading labels preserve spaces across manual line breaks. Responsive splitting follows font/width changes.
- Lenis **1.3.27** smooths wheel scrolling on editorial routes and shares GSAP’s ticker. Booking uses native scrolling throughout. Touch and keyboard scrolling remain native everywhere. Next owns anchor URL/history changes; a single explicit event gives Lenis ownership of same-page anchor movement. Native browser anchor movement and Next scroll restoration do not run concurrently with that animation. The menu and route curtain pause the wheel controller.
- Each route owns a matchMedia context, ScrollTriggers, event handlers, and its selected scroll engine. Cleanup removes them on navigation, breakpoint change, or motion-preference change. Explicit menu, schedule, programme, and booking events replace the body-wide MutationObserver. Layout refresh requests are coalesced into one frame.
- Native view transitions provide the theme reveal where available. Reduced motion and unsupported browsers use the normal, fully functional change.
- Day/night tokens cover content surfaces, utility labels, selected states, errors, controls, and inverse sections. A small pre-paint script applies the saved or system theme before hydration.
- Only `form-theme` and `form-motion` preference values use local storage. Booking entries remain in page memory and are not transmitted or persisted.

Implementation references: [GSAP React lifecycle/cleanup](https://gsap.com/resources/React/), [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>), [SplitText accessibility and responsive splitting](https://gsap.com/docs/v3/Plugins/SplitText/), and [Lenis integration](https://github.com/darkroomengineering/lenis).

## Motion preferences and loading limits

Device reduced-motion settings always take priority. The footer's Animations switch additionally lets a visitor choose the quiet edition. This skips the optional motion import on subsequent loads, destroys an active Lenis instance, restores original text markup, and disables transition effects. Static content remains visible when the animation module cannot load.

The production motion chunk is approximately **54 KB gzip** as a local build artifact, including GSAP, ScrollTrigger, SplitText, and Lenis. This is a size measurement, not a network or Core Web Vitals score. No extra photographs, video, font families, animation CDN, or blocking intro were added. No Lighthouse or field-speed claim is made.

## Libraries and licenses

GSAP uses its published [standard license](https://gsap.com/standard-license/). Lenis is MIT licensed. Versions are pinned by `package-lock.json`. The existing font licenses and generated-photo manifest remain in ASSETS.md. The new `public/images/print-grain.svg` is an original small procedural texture, not a third-party photograph.

## Route transitions and scroll revision

The original implementation had entrance animation but no coordinated route exit/arrival. Routes now use a persistent three-panel vermilion curtain: a 0.51-second staggered cover, a real Next client navigation, then a 0.76-second staggered uncover. There is no artificial minimum loading wait. In the static production build, link prefetching remains provided by Next. Modifier/new-tab actions and same-page links retain their normal meaning. Browser Back/Forward cancels any active curtain and retains router scroll restoration. A five-second watchdog releases a failed or interrupted curtain. Quiet/system-reduced preferences bypass it.

Headlines below the hero play a one-time masked entrance when they reach the viewport. They complete while scrolling is stopped and remain readable when scrolling back. Rows reveal at their own viewport landmarks instead of firing all at once when a large parent first enters. Photographs have a broader contained parallax range, with a separate offset sequence in the space gallery. The hero has opposing text/image movement, section rules draw with scroll, the philosophy copy brightens as it enters, and the closing type gently expands. Form fields retain a visible starting opacity and reveal individually; focusing a field immediately clears its animation and only repositions it if it would be obscured by the header or viewport.

Code responsibilities are separate:

- `components/page-transitions.tsx`: Next navigation, lifecycle, cancellation, history, and focus.
- `lib/motion/route-transition.ts`: curtain timelines only.
- `lib/motion/scroll.ts`: scroll ownership and Lenis lifecycle; native booking exception.
- `lib/motion/reveals.ts`: typography, image, and content entrances.
- `lib/motion/scroll-scenes.ts`: continuous scroll-linked compositions.
- `lib/motion/interactions.ts`: explicit UI feedback and coalesced layout refresh.
- `lib/motion/runtime.ts`: shared GSAP plugins.
- `lib/motion.ts`: route-scoped composition and cleanup.

The theme view transition remains independent of the route curtain. No dependency installation was needed for this revision.


## UI consistency correction

The shared reading scale now has an 11px label minimum, 12px supporting notes, and 14px explanatory copy. Photo captions wrap within their own columns. Membership descriptions reserve the same two-line space on multi-column layouts so prices remain aligned.

Navigation uses a single 1000px breakpoint for the header booking action and fixed booking bar. Header heights and anchor gaps are tokens. Bottom space is reserved only when a fixed booking bar is present; booking itself has no reserved bar padding.

The header Appearance disclosure groups day/night and animation preferences on every viewport. Escape and outside pointer interaction close it, navigation closes it, and opening mobile navigation and Appearance is mutually exclusive. The footer remains an additional motion shortcut; both motion controls synchronize via the same event.

A single passive scroll-progress component serves every route and both motion modes. The journal owns only chapter markers. Photo hover uses an outer wrapper while GSAP owns the image transform, and quiet/system-reduced preferences suppress hover movement. Selection rows use a chevron/check and an explicit details jump; navigation links retain arrows. Shared divider tokens cover every membership sibling and session action in both themes.
