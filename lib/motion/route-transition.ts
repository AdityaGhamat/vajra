import { gsap } from "./runtime";

/** The curtain lives outside route content; navigation never remounts it. */
export function createRouteTransition(element: HTMLElement) {
  const panels = element.querySelectorAll(".route-curtain-panel");
  const word = element.querySelector(".route-curtain-word");
  let timeline: gsap.core.Timeline | undefined;
  let finish: (() => void) | undefined;
  const reset = () => {
    timeline?.kill();
    finish?.();
    finish = undefined;
    gsap.set(element, { visibility: "hidden" });
    gsap.set(panels, { y: 0, yPercent: 101, skewY: 0 });
    gsap.set(word, { y: 0, opacity: 1, scale: 1 });
  };
  const run = (cover: boolean) =>
    new Promise<void>((resolve) => {
      timeline?.kill();
      finish?.();
      finish = resolve;
      timeline = gsap.timeline({
        onComplete: () => {
          finish = undefined;
          resolve();
        },
      });
      if (cover) {
        gsap.set(element, { visibility: "visible" });
        timeline.fromTo(
          panels,
          { y: 0, yPercent: 101, skewY: 2 },
          {
            yPercent: 0,
            skewY: 0,
            duration: 0.46,
            stagger: 0.05,
            ease: "power4.inOut",
          },
          0,
        );
        timeline.fromTo(
          word,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out" },
          0.2,
        );
      } else {
        timeline.to(
          word,
          { y: -28, opacity: 0, scale: 0.98, duration: 0.24, ease: "power2.in" },
          0,
        );
        timeline.to(
          panels,
          {
            yPercent: -101,
            skewY: -2,
            duration: 0.66,
            stagger: 0.05,
            ease: "power4.inOut",
          },
          0.05,
        );
        timeline.set(element, { visibility: "hidden" });
      }
    });
  reset();
  return { cover: () => run(true), reveal: () => run(false), reset };
}
