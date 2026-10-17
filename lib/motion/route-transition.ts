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
    gsap.set(panels, { y: 0, yPercent: 101 });
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
          { y: 0, yPercent: 101 },
          { yPercent: 0, duration: 0.42, stagger: 0.045, ease: "power3.inOut" },
          0,
        );
        timeline.fromTo(
          word,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
          0.19,
        );
      } else {
        timeline.to(
          word,
          { y: -24, opacity: 0, duration: 0.22, ease: "power2.in" },
          0,
        );
        timeline.to(
          panels,
          {
            yPercent: -101,
            duration: 0.62,
            stagger: 0.045,
            ease: "power3.inOut",
          },
          0.05,
        );
        timeline.set(element, { visibility: "hidden" });
      }
    });
  reset();
  return { cover: () => run(true), reveal: () => run(false), reset };
}
