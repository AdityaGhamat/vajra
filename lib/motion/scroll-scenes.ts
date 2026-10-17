import { gsap } from "./runtime";

/** Scroll-linked compositions, separate from entrances and form interactions. */
export function mountScrollScenes(desktop: boolean) {
  gsap.fromTo(
    ".page-scroll-progress",
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: true },
    },
  );
  document.querySelectorAll<HTMLElement>(".section-label").forEach((label) => {
    gsap.fromTo(
      label,
      { "--rule-progress": 0 },
      {
        "--rule-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: label,
          start: "top 95%",
          end: "top 55%",
          scrub: 0.5,
        },
      },
    );
  });
  if (desktop && document.querySelector(".hero-copy")) {
    gsap.to(".hero-copy", {
      y: -65,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });
    gsap.to(".hero-photo", {
      clipPath: "inset(0% 3% 7% 3%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });
  }
  document
    .querySelectorAll<HTMLElement>(".philosophy-copy > p")
    .forEach((text) => {
      gsap.fromTo(
        text,
        { color: "#7f8477" },
        {
          color: "#f1eee6",
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top 88%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
    });
  document
    .querySelectorAll<HTMLElement>(".closing h2, .detail-next h2")
    .forEach((title) => {
      gsap.fromTo(
        title,
        { scale: 0.94, transformOrigin: "left center" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "top 30%",
            scrub: 0.65,
          },
        },
      );
    });
  document
    .querySelectorAll<HTMLElement>(".footer .wordmark")
    .forEach((word) => {
      gsap.fromTo(
        word,
        { y: 25, rotation: -3 },
        {
          y: 0,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: word, start: "top bottom", once: true },
          clearProps: "transform",
        },
      );
    });
}
