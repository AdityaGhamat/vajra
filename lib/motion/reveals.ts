import { gsap, SplitText } from "./runtime";

export function mountReveals(desktop: boolean) {
  const select = gsap.utils.selector(document.body);
  // Reveal the line, rather than flashing a whole block of type at once.
  select("main h1, main h2").forEach((heading: HTMLElement) => {
    if (heading.closest(".booking-complete")) return;
    const isHero = !!heading.closest(
      ".hero, .detail-hero, .booking-story, .not-found",
    );
    // Reading chapters enter as complete headings; only the opening owns a line mask.
    if (!isHero) {
      gsap.fromTo(
        heading,
        { y: 18, opacity: 0.7 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 95%", once: true },
          clearProps: "transform,opacity",
        },
      );
      return;
    }
    const textTarget =
      heading.querySelector<HTMLElement>(".display-solid") ?? heading;
    const spokenLabel = textTarget.innerText.replace(/\s+/g, " ").trim();
    SplitText.create(textTarget, {
      type: "lines",
      mask: "lines",
      linesClass: "motion-line",
      autoSplit: true,
      onSplit(split) {
        heading.setAttribute("aria-label", spokenLabel);
        return gsap.fromTo(
          split.lines,
          { yPercent: 120, rotate: 1.5 },
          {
            yPercent: 0,
            rotate: 0,
            duration: isHero ? 1.05 : 1.1,
            stagger: 0.12,
            ease: "power4.out",
            delay: isHero ? 0.05 : 0,
            ...(isHero
              ? {}
              : {
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 94%",
                    once: true,
                  },
                }),
            clearProps: "transform",
          },
        );
      },
    });
  });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  document.documentElement.dataset.motionState = "entering";
  function enter(
    selector: string,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
    at: number,
  ) {
    const targets = select(selector);
    if (targets.length) intro.fromTo(targets, from, to, at);
  }
  enter(
    ".hero-meta > span, .back-link",
    { y: 12, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.09,
      duration: 0.6,
      clearProps: "transform,opacity",
    },
    0,
  );
  enter(
    ".hero-description, .hero-actions, .detail-line, .detail-description, .detail-hero .button, .detail-reassurance, .booking-story > p",
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.09,
      clearProps: "transform,opacity",
    },
    0.2,
  );
  enter(
    ".hero .photo-viewport, .detail-photo, .booking-photo",
    { clipPath: "inset(12% 0 0 0)", opacity: 0.55 },
    {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      duration: 1.15,
      clearProps: "clipPath,opacity",
    },
    0.05,
  );
  enter(
    ".hero-proof > *",
    { y: 10, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      clearProps: "transform,opacity",
    },
    0.55,
  );

  intro.call(
    () => {
      document.documentElement.dataset.motionState = "settled";
    },
    [],
    "+=0.15",
  );

  // Each section gets a cadence; information enters as related groups.
  const groups = [
    [".first-steps", ":scope > li"],
    [".training-rows", ".training-row"],
    [
      ".timetable",
      ".timetable-controls, .schedule-head, .schedule-row, .schedule-footer",
    ],
    [".coach-grid", ".coach-profile"],
    [".membership-grid", ".membership-option"],
    [".visit-grid", ".visit-location, .visit-intro, .hours, .contact-note"],
    [".faq", "details"],
    [".session-outline", "li"],
    [".other-training", "a"],
    [
      ".booking-form",
      ".demo-banner, fieldset > legend, .field, .privacy-note, .booking-submit, .booking-story-note",
    ],
    [".footer", ".footer-top > *, .footer-bottom > *"],
  ];
  groups.forEach(([parent, children]) =>
    select(parent).forEach((group: HTMLElement) => {
      const targets = group.querySelectorAll(children);
      if (!targets.length) return;
      targets.forEach((target, index) => {
        const field = (target as HTMLElement).closest(".booking-form");
        gsap.fromTo(
          target,
          { y: field ? 16 : desktop ? 48 : 28, opacity: field ? 0.55 : 0 },
          {
            y: 0,
            opacity: 1,
            duration: field ? 0.6 : 0.9,
            delay: field ? 0 : Math.min(index * 0.035, 0.14),
            ease: "power3.out",
            scrollTrigger: { trigger: target, start: "top 94%", once: true },
            clearProps: "transform,opacity",
          },
        );
      });
    }),
  );

  // Section labels draw their rule via --rule-progress in scroll-scenes;
  // no second wipe here.
  select(
    ".section-heading > p, .section-heading > div, .packing-note, .first-small, .section-intro, .philosophy-copy > p, .practice-notation, .membership-terms, .gallery-note, .detail-overview > div, .detail-next > div:last-child, .closing-bottom",
  ).forEach((element: HTMLElement) => {
    gsap.fromTo(
      element,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 93%", once: true },
        clearProps: "transform,opacity",
      },
    );
  });

  // Frame entrances are separate from the image depth owned by parallax.ts.
  select(
    ".photo-viewport, .philosophy-image, .coach-photo, .gallery-frame, .detail-photo, .booking-photo",
  ).forEach((frame: HTMLElement) => {
    const image = frame.querySelector("img");
    if (!image) return;
    if (!frame.closest(".hero, .detail-hero")) {
      gsap.fromTo(
        frame,
        { clipPath: "inset(8% 0 8% 0)" },
        {
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 92%", once: true },
          clearProps: "clipPath",
        },
      );
    }
  });
}
