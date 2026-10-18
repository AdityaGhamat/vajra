import { gsap } from "./runtime";

/** Scroll-linked compositions, separate from entrances and form interactions. */
export function mountScrollScenes() {
  document
    .querySelectorAll<SVGPathElement>("[data-plan-outline]")
    .forEach((outline) => {
      gsap.fromTo(
        outline,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: outline.closest(".club-plan-board"),
            start: "top 90%",
            once: true,
          },
        },
      );
    });
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

  // The journal rail stamps each entry as its section locks in.
  document.querySelectorAll<HTMLElement>(".journal a").forEach((link) => {
    const hash = link.getAttribute("href") ?? "";
    const target = hash.startsWith("#")
      ? document.getElementById(hash.slice(1))
      : null;
    if (!target) return;
    gsap.to(link, {
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => link.classList.add("stamped"),
        onEnterBack: () => link.classList.add("stamped"),
      },
    });
  });

  // The space essay uses native horizontal scrolling: no pin spacer or extra page length.

  // Interstitial words: one keyframed pass each way, no competing tweens.
  document.querySelectorAll<HTMLElement>(".interstitial").forEach((el) => {
    const word = el.querySelector(".interstitial-word");
    const sub = el.querySelector(".interstitial-sub");
    if (word) {
      gsap.set(word, { opacity: 0.04, scale: 0.92 });
      gsap.to(word, {
        keyframes: [
          { opacity: 0.15, scale: 1 },
          { opacity: 0.03, scale: 0.98 },
        ],
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.6,
        },
      });
    }
    if (sub) {
      gsap.fromTo(
        sub,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 55%",
            once: true,
          },
          clearProps: "transform,opacity",
        },
      );
    }
  });
}
