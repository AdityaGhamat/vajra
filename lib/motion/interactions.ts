import { gsap, ScrollTrigger } from "./runtime";

/** Explicit UI events replace the old body-wide MutationObserver. */
export function mountInteractions(context: gsap.Context) {
  const cleanups: (() => void)[] = [];
  let refreshFrame = 0;
  const refresh = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  const listen = (
    target: EventTarget,
    name: string,
    callback: EventListener,
  ) => {
    target.addEventListener(name, callback);
    cleanups.push(() => target.removeEventListener(name, callback));
  };
  const animate = (callback: () => void) => context.add(callback);
  listen(window, "form:training", () =>
    animate(() => {
      gsap.fromTo(
        ".training-image img",
        { opacity: 0.2, scale: 1.06 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
      gsap.fromTo(
        ".training-details-copy > *",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.065,
          ease: "power3.out",
          clearProps: "transform,opacity",
          overwrite: "auto",
        },
      );
      refresh();
    }),
  );
  listen(window, "form:schedule", () =>
    animate(() => {
      gsap.fromTo(
        ".schedule-row, .empty-schedule",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.065,
          ease: "power3.out",
          clearProps: "transform,opacity",
          overwrite: "auto",
        },
      );
      refresh();
    }),
  );
  listen(window, "form:menu", () => {
    const panel = document.querySelector(".mobile-menu");
    if (!panel) return;
    animate(() => {
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.55,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
      );
      gsap.fromTo(
        panel.children,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          stagger: 0.07,
          clearProps: "transform,opacity",
        },
      );
    });
  });
  const seen = new WeakSet<Element>();
  listen(window, "form:booking", () => {
    document
      .querySelectorAll(".booking-complete, .form-error-summary")
      .forEach((panel) => {
        if (seen.has(panel)) return;
        seen.add(panel);
        animate(() =>
          gsap.fromTo(
            panel.children,
            { y: 18, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.05,
              clearProps: "transform,opacity",
            },
          ),
        );
      });
    refresh();
  });
  listen(document, "focusin", (event) => {
    const field =
      event.target instanceof Element ? event.target.closest(".field") : null;
    if (field) {
      gsap.killTweensOf(field);
      gsap.set(field, { clearProps: "transform,opacity" });
    }
  });
  document
    .querySelectorAll<HTMLDetailsElement>(".faq details")
    .forEach((detail) =>
      listen(detail, "toggle", () => {
        if (detail.open)
          animate(() =>
            gsap.fromTo(
              detail.querySelector("p"),
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                clearProps: "transform,opacity",
              },
            ),
          );
        refresh();
      }),
    );
  document.querySelectorAll<HTMLImageElement>("main img").forEach((image) => {
    if (!image.complete) listen(image, "load", refresh);
  });
  refresh();
  return () => {
    cancelAnimationFrame(refreshFrame);
    cleanups.forEach((cleanup) => cleanup());
  };
}
