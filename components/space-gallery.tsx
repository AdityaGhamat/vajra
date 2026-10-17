"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageAction } from "./image-action";
import { TransitionLink } from "./page-transitions";

const spaces = [
  {
    key: "wide",
    image: "space",
    title: "The training floor",
    caption: "Room for the basics. Space to focus.",
    detail:
      "An open floor for coached group sessions and independent practice. Explore the training formats to see how each session works.",
    alt: "Generated concept: an open training floor with squat racks, rubber flooring, and tall windows.",
    sizes: "80vw",
  },
  {
    key: "coaching",
    image: "coaching",
    title: "The coaching corner",
    caption: "A place to pause, ask, and plan.",
    detail:
      "Coaching starts with a conversation about your experience and the routine you want to build. There’s room to ask questions before you begin.",
    alt: "Generated concept: a coach and trainee discuss training notes in the coaching area.",
    sizes: "43vw",
  },
  {
    key: "equipment",
    image: "equipment",
    title: "The tools",
    caption: "Simple equipment. Plenty of possibility.",
    detail:
      "Barbells, kettlebells, and the basics. In a coached session, your coach explains the movements and helps you choose a manageable starting weight.",
    alt: "Generated concept: a hand loading a metal weight plate onto a barbell sleeve.",
    sizes: "34vw",
  },
  {
    key: "changing",
    image: "changing",
    title: "The everyday details",
    caption: "Changing space for the rest of your day.",
    detail:
      "A concept for a place that fits around everyday life. For a first session, bring comfortable clothes, clean trainers, water, and a towel.",
    alt: "Generated concept: olive lockers, a bench, and a private changing cubicle in a quiet changing room.",
    sizes: "45vw",
  },
];

export function SpaceGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const isOpen = active !== null;
  const space = active === null ? null : spaces[active];
  const close = () => {
    // Release the scroll engine before a same-page link starts its anchor move.
    if (dialog.current?.open) {
      dialog.current.close();
      window.dispatchEvent(new Event("form:viewer"));
    }
    setActive(null);
  };

  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const panel = dialog.current;
    const overflow = document.body.style.overflow;
    panel.showModal();
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("form:viewer"));
    return () => {
      panel.close();
      document.body.style.overflow = overflow;
      window.dispatchEvent(new Event("form:viewer"));
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <>
      <div className="space-gallery">
        {spaces.map((s, i) => (
          <figure className={`space-${s.key}`} key={s.key}>
            <ImageAction
              className="gallery-frame"
              label={`View ${s.title.toLowerCase()}`}
              cue="Take a closer look"
              onClick={() => {
                opener.current = document.activeElement as HTMLElement;
                setActive(i);
              }}
            >
              <Image
                src={`/images/${s.image}.webp`}
                alt={s.alt}
                fill
                sizes={`(max-width: 760px) 100vw, ${s.sizes}`}
              />
            </ImageAction>
            <figcaption>
              <span className="mono">
                0{i + 1} / {s.title.toUpperCase()}
              </span>
              <span>{s.caption}</span>
            </figcaption>
          </figure>
        ))}
        <div className="gallery-note">
          <span className="mono red">THE SPACE, IN PRINCIPLE.</span>
          <p>
            Light. Order. A sense of belonging.
            <br />A club should make it easier to begin.
          </p>
          <span className="mono muted">
            GENERATED CONCEPT IMAGERY
            <br />
            NOT AN OPERATING FACILITY
          </span>
        </div>
      </div>
      {space && (
        <dialog
          ref={dialog}
          className="space-viewer"
          aria-labelledby="space-viewer-title"
          data-lenis-prevent
          onCancel={close}
          onClose={close}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              const items = event.currentTarget.querySelectorAll<HTMLElement>(
                "button:not(:disabled), a[href]",
              );
              const first = items[0],
                last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setActive((i) => ((i ?? 0) + 1) % spaces.length);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setActive((i) => ((i ?? 0) + spaces.length - 1) % spaces.length);
            }
          }}
        >
          <div className="space-viewer-head">
            <span className="mono">THE SPACE / 0{(active ?? 0) + 1} OF 04</span>
            <button
              type="button"
              className="viewer-control mono"
              onClick={close}
              autoFocus
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="space-viewer-image">
            <Image
              key={space.image}
              src={`/images/${space.image}.webp`}
              alt={space.alt}
              fill
              sizes="(max-width: 760px) 100vw, 1000px"
            />
          </div>
          <div
            className="space-viewer-copy"
            aria-live="polite"
            aria-atomic="true"
          >
            <h2 id="space-viewer-title">{space.title}</h2>
            <p>{space.detail}</p>
          </div>
          <div className="space-viewer-foot">
            <div className="viewer-pagination">
              <button
                type="button"
                className="viewer-control"
                aria-label="Previous space photo"
                onClick={() => setActive((i) => ((i ?? 0) + 3) % 4)}
              >
                ←
              </button>
              <button
                type="button"
                className="viewer-control"
                aria-label="Next space photo"
                onClick={() => setActive((i) => ((i ?? 0) + 1) % 4)}
              >
                →
              </button>
            </div>
            <TransitionLink
              className="text-link"
              href="/#training"
              onClick={() => {
                opener.current = null;
                close();
                const training = document.getElementById("training");
                training?.setAttribute("tabindex", "-1");
                training?.focus({ preventScroll: true });
              }}
            >
              Find your training <span aria-hidden="true">↗</span>
            </TransitionLink>
          </div>
          <p className="viewer-disclosure mono">
            GENERATED CONCEPT IMAGERY · NOT AN OPERATING FACILITY
          </p>
        </dialog>
      )}
    </>
  );
}
