import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** One route, one GSAP context, one shared animation clock. */
export function mountMotion() {
  const media = gsap.matchMedia();

  try {
    media.add(
      {
        desktop: "(min-width: 901px)",
        compact: "(max-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduce) return;
        const desktop = !!context.conditions?.desktop;
        const cleanups: (() => void)[] = [];
        const select = gsap.utils.selector(document.body);
        const listen = (
          target: EventTarget,
          name: string,
          handler: EventListener,
          options?: AddEventListenerOptions,
        ) => {
          target.addEventListener(name, handler, options);
          cleanups.push(() =>
            target.removeEventListener(name, handler, options),
          );
        };
        const interaction = (callback: () => void) => context.add(callback);

        // Leave touch/keyboard scrolling native. Wheel smoothing shares GSAP's ticker.
        const lenis = new Lenis({
          autoRaf: false,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: { duration: 0.85, lerp: 0 },
          stopInertiaOnNavigate: true,
          prevent: (node) =>
            !!node.closest(
              "[data-lenis-prevent], .mobile-menu, textarea, select",
            ),
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (seconds: number) => lenis.raf(seconds * 1000);
        gsap.ticker.add(tick);
        // A suspended tab should not play a long catch-up transition when resumed.
        gsap.ticker.lagSmoothing(0);
        const syncMenu = () =>
          document.querySelector(".mobile-menu") ? lenis.stop() : lenis.start();
        listen(window, "form:menu", syncMenu);
        syncMenu();
        listen(window, "click", (event) => {
          const link =
            event.target instanceof Element
              ? event.target.closest<HTMLAnchorElement>("a[href]")
              : null;
          if (
            link &&
            !link.hash &&
            link.origin === location.origin &&
            link.pathname === "/" &&
            location.pathname === "/"
          ) {
            lenis.scrollTo(0, { immediate: true, force: true });
          }
        });

        // Reveal the line, rather than flashing a whole block of type at once.
        select("main h1, main h2").forEach((heading: HTMLElement) => {
          if (heading.closest(".booking-complete")) return;
          const isHero = !!heading.closest(
            ".hero, .detail-hero, .booking-story, .not-found",
          );
          const spokenLabel = heading.innerText.replace(/\s+/g, " ").trim();
          SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            linesClass: "motion-line",
            autoSplit: true,
            onSplit(split) {
              heading.setAttribute("aria-label", spokenLabel);
              return gsap.fromTo(
                split.lines,
                { yPercent: 108, rotate: 0.6 },
                {
                  yPercent: 0,
                  rotate: 0,
                  duration: isHero ? 0.95 : 0.85,
                  stagger: 0.09,
                  ease: "power4.out",
                  delay: isHero ? 0.05 : 0,
                  ...(isHero
                    ? {}
                    : {
                        scrollTrigger: {
                          trigger: heading,
                          start: "top 90%",
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
          ".hero-description, .hero-actions, .hero-fact, .detail-line, .detail-description, .detail-hero .button, .detail-reassurance, .booking-story > p",
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
          ".hero-stamp",
          { scale: 0.7, rotation: -38, opacity: 0 },
          {
            scale: 1,
            rotation: -12,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            clearProps: "transform,opacity",
          },
          0.45,
        );
        enter(
          ".hero-baseline > *",
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
          [
            ".visit-grid",
            ".visit-location, .visit-intro, .hours, .contact-note",
          ],
          [".faq", "details"],
          [".session-outline", "li"],
          [".other-training", "a"],
          [
            ".booking-form",
            ".demo-banner, fieldset > legend, .field, .privacy-note, .booking-submit",
          ],
          [".footer", ".footer-top > *, .footer-bottom > *"],
        ];
        groups.forEach(([parent, children]) =>
          select(parent).forEach((group: HTMLElement) => {
            const targets = group.querySelectorAll(children);
            if (!targets.length) return;
            gsap.fromTo(
              targets,
              { y: desktop ? 30 : 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: Math.min(0.1, 0.6 / targets.length),
                ease: "power3.out",
                scrollTrigger: { trigger: group, start: "top 90%", once: true },
                clearProps: "transform,opacity",
              },
            );
          }),
        );

        select(".section-label").forEach((label: HTMLElement) => {
          gsap.fromTo(
            label,
            { clipPath: "inset(0 95% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: label, start: "top 93%", once: true },
              clearProps: "clipPath",
            },
          );
        });
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

        // Images move inside their reserved frames. No section pins or extra scroll distance.
        select(
          ".photo-viewport, .training-image, .philosophy-image, .coach-photo, .gallery-frame, .detail-photo",
        ).forEach((frame: HTMLElement) => {
          const image = frame.querySelector("img");
          if (!image) return;
          gsap.fromTo(
            image,
            { scale: desktop ? 1.13 : 1.07, yPercent: desktop ? -4 : -2 },
            {
              scale: desktop ? 1.05 : 1.02,
              yPercent: desktop ? 4 : 2,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: desktop ? 0.8 : 0.4,
              },
            },
          );
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
        if (desktop) {
          select(".space-gallery figure").forEach(
            (figure: HTMLElement, i: number) => {
              gsap.fromTo(
                figure,
                { y: i % 2 ? 24 : 8 },
                {
                  y: i % 2 ? -24 : -8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: figure,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.1,
                  },
                },
              );
            },
          );
          if (document.querySelector(".hero-stamp"))
            gsap.to(".hero-stamp", {
              rotation: 12,
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
        }

        const trainingChanged = () =>
          interaction(() => {
            gsap.fromTo(
              ".training-image img",
              { opacity: 0.3, scale: 1.08 },
              {
                opacity: 1,
                scale: 1.04,
                duration: 0.65,
                ease: "power3.out",
                overwrite: "auto",
              },
            );
            gsap.fromTo(
              ".training-details-copy > *",
              { y: 14, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.055,
                ease: "power3.out",
                clearProps: "transform,opacity",
                overwrite: "auto",
              },
            );
          });
        const scheduleChanged = () =>
          interaction(() => {
            gsap.fromTo(
              ".schedule-row, .empty-schedule",
              { y: 14, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.055,
                ease: "power3.out",
                clearProps: "transform,opacity",
                overwrite: "auto",
              },
            );
            ScrollTrigger.refresh();
          });
        listen(window, "form:training", trainingChanged);
        listen(window, "form:schedule", scheduleChanged);
        document
          .querySelectorAll<HTMLDetailsElement>(".faq details")
          .forEach((detail) =>
            listen(detail, "toggle", () => {
              if (detail.open)
                interaction(() =>
                  gsap.fromTo(
                    detail.querySelector("p"),
                    { y: 10, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.4,
                      clearProps: "transform,opacity",
                    },
                  ),
                );
              ScrollTrigger.refresh();
            }),
          );

        // React may mount a menu, a validation summary, or a completion panel later.
        const observer = new MutationObserver((records) => {
          for (const record of records)
            for (const node of record.addedNodes) {
              if (!(node instanceof HTMLElement)) continue;
              const panels = [
                ...(node.matches(
                  ".mobile-menu, .booking-complete, .form-error-summary",
                )
                  ? [node]
                  : []),
                ...node.querySelectorAll<HTMLElement>(
                  ".mobile-menu, .booking-complete, .form-error-summary",
                ),
              ];
              panels.forEach((panel) =>
                interaction(() => {
                  if (panel.matches(".mobile-menu")) {
                    gsap.fromTo(
                      panel,
                      { clipPath: "inset(0 0 100% 0)" },
                      {
                        clipPath: "inset(0 0 0% 0)",
                        duration: 0.5,
                        ease: "power3.inOut",
                        clearProps: "clipPath",
                      },
                    );
                    gsap.fromTo(
                      panel.children,
                      { y: 22, opacity: 0 },
                      {
                        y: 0,
                        opacity: 1,
                        stagger: 0.06,
                        duration: 0.5,
                        delay: 0.15,
                        clearProps: "transform,opacity",
                      },
                    );
                  } else {
                    gsap.fromTo(
                      panel.children,
                      { y: 16, opacity: 0.4 },
                      {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.04,
                        clearProps: "transform,opacity",
                      },
                    );
                  }
                  ScrollTrigger.refresh();
                }),
              );
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        // Image dimensions are reserved, but refresh after decoding keeps all landmarks exact.
        document
          .querySelectorAll<HTMLImageElement>("main img")
          .forEach((image) => {
            if (!image.complete)
              listen(image, "load", () => ScrollTrigger.refresh(), {
                once: true,
              });
          });
        ScrollTrigger.refresh();

        return () => {
          observer.disconnect();
          cleanups.forEach((cleanup) => cleanup());
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          delete document.documentElement.dataset.motionState;
        };
      },
    );
  } catch (error) {
    media.revert();
    throw error;
  }
  return () => media.revert();
}
