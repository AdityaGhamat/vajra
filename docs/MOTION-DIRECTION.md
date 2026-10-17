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

| Part                | Treatment                                                                                  | Role                                                   |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Masthead/navigation | Underline feedback, rolling action labels, travelling arrows                               | Make affordances clear without moving the navigation   |
| Hero                | Masked line entrance, staged supporting content, photograph reveal, settling journal stamp | Establish the identity and first action immediately    |
| Section annotations | Rules and labels reveal from left to right                                                 | Connect the page to a training log                     |
| First-session story | Steps enter as a staggered group                                                           | Make the sequence easy to follow                       |
| Training index      | Selected rule draws; photograph and details change with a short reveal                     | Explain the current choice                             |
| Philosophy          | Line masks, paragraph entrances, image movement within its frame                           | Change pace without adding a scroll trap               |
| Timetable           | Group entrance and short re-entry after filtering, including empty state                   | Keep state changes understandable                      |
| Coach studies       | Staggered profiles and photographs moving inside stable frames                             | Keep people and their approach together                |
| Membership          | Aligned columns reveal in sequence; prices remain ordinary text                            | Preserve comparison and reading                        |
| The space           | Offset figure movement on desktop, contained image parallax at every size                  | Add depth to the photographic sequence                 |
| Visit/FAQs          | Practical information enters in groups; native disclosures get short answer feedback       | Preserve immediate access to answers                   |
| Closing/footer      | Large line entrance, action-label feedback, grouped footer details                         | End with the same clear first-session action           |
| Programme pages     | Route-specific type/image entrances, session outline, related links                        | Carry the visual system beyond the homepage            |
| Booking             | Grouped field entrances, error/completion feedback, existing focus management              | Confirm changes without implying a real booking        |
| Mobile menu         | Short masked panel and staggered link entrance                                             | Keep navigation understandable on touch screens        |
| Theme               | A circular reveal from the edition switch where supported; ordinary theme change otherwise | Make day/night feel like two editions of the same club |

Typical reveals last 0.45–1.2 seconds. The complete route entrance settles in roughly 1.4 seconds, but it is not a loader and never gates use of the page. Scroll-linked imagery has modest travel inside reserved dimensions. There are no pinned sections, forced horizontal segments, continuous marquees, or fake loading screens.

## Implementation

- `components/motion-system.tsx` dynamically imports `lib/motion.ts` after the first rendered frame. HTML, typography, imagery, navigation, and form controls do not depend on that import to render.
- GSAP **3.15.0**, ScrollTrigger, and SplitText provide the animation timelines. Only lines are split, not every character. Accessible heading labels preserve spaces across manual line breaks. Responsive splitting follows font/width changes.
- Lenis **1.3.27** smooths wheel scrolling and shares GSAP's ticker. Touch and keyboard scrolling remain native. The menu stops/resumes the wheel controller. Textareas, selects, and the menu are excluded from smoothing.
- Each route owns a matchMedia context, ScrollTriggers, observers, event handlers, and Lenis instance. Cleanup removes them on navigation, breakpoint change, or motion-preference change.
- Native view transitions provide the theme reveal where available. Reduced motion and unsupported browsers use the normal, fully functional change.
- Day/night tokens cover content surfaces, utility labels, selected states, errors, controls, and inverse sections. A small pre-paint script applies the saved or system theme before hydration.
- Only `form-theme` and `form-motion` preference values use local storage. Booking entries remain in page memory and are not transmitted or persisted.

Implementation references: [GSAP React lifecycle/cleanup](https://gsap.com/resources/React/), [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>), [SplitText accessibility and responsive splitting](https://gsap.com/docs/v3/Plugins/SplitText/), and [Lenis integration](https://github.com/darkroomengineering/lenis).

## Motion preferences and loading limits

Device reduced-motion settings always take priority. The footer's Animations switch additionally lets a visitor choose the quiet edition. This skips the optional motion import on subsequent loads, destroys an active Lenis instance, restores original text markup, and disables transition effects. Static content remains visible when the animation module cannot load.

The production motion chunk is approximately **54 KB gzip** as a local build artifact, including GSAP, ScrollTrigger, SplitText, and Lenis. This is a size measurement, not a network or Core Web Vitals score. No extra photographs, video, font families, animation CDN, or blocking intro were added. No Lighthouse or field-speed claim is made.

## Libraries and licenses

GSAP uses its published [standard license](https://gsap.com/standard-license/). Lenis is MIT licensed. Versions are pinned by `package-lock.json`. The existing font licenses and generated-photo manifest remain in ASSETS.md. The new `public/images/print-grain.svg` is an original small procedural texture, not a third-party photograph.
