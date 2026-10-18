import { gsap } from "./runtime";

/** Interior depth only: frames keep their size and reading content stays still.
 * Function-based values recalculate the safe overscan after every refresh.
 * The enclosing route's GSAP context restores all styles on teardown.
 */
export function mountParallax(desktop: boolean) {
  const profiles = [
    { selector: ".hero .photo-viewport, .detail-photo", depth: 0.09, cap: 64 },
    { selector: ".philosophy-image", depth: 0.08, cap: 52 },
    { selector: ".coach-photo", depth: 0.065, cap: 38 },
    { selector: ".gallery-frame", depth: 0.075, cap: 40 },
    { selector: ".booking-photo", depth: 0.035, cap: 20 },
  ];

  profiles.forEach(({ selector, depth, cap }) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((frame) => {
      const image = frame.querySelector("img");
      if (!image) return;
      const travel = () =>
        Math.min(desktop ? cap : 16, frame.clientHeight * (desktop ? depth : 0.025));
      // Translation is in frame pixels, not scaled image percentages. The
      // overscan always exceeds maximum travel, so no empty edge can appear.
      const scale = () => 1.025 + (travel() * 2) / Math.max(frame.clientHeight, 1);
      gsap.fromTo(
        image,
        { y: () => -travel(), scale },
        {
          y: travel,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: desktop ? 0.65 : 0.3,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  });

  if (!desktop) return;
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!hero) return;
  // Outlined type and the photograph's annotation occupy different depth
  // planes. The solid headline, copy and booking controls remain readable.
  const layers = [
    { selector: ".display-ghost", distance: -78 },
    { selector: ".hero-photo-caption", distance: -30 },
  ];
  layers.forEach(({ selector, distance }) => {
    const layer = hero.querySelector(selector);
    if (!layer) return;
    gsap.to(layer, {
      y: distance,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  });
}
