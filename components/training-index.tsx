"use client";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/page-transitions";
import { Fragment, useEffect, useRef, useState } from "react";
import { trainings, bookingUrl } from "@/lib/content";
import { Arrow } from "./ui";
import { ImageAction } from "./image-action";

export function TrainingIndex() {
  const [selected, setSelected] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const previewTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const cancelPreview = () => clearTimeout(previewTimer.current);
  useEffect(() => cancelPreview, []);
  const training = trainings[selected];
  useEffect(() => {
    window.dispatchEvent(new Event("form:training"));
  }, [selected]);
  // Intentional hover previews; crossing the index must not keep replacing copy.
  const preview = (i: number) => {
    cancelPreview();
    if (
      i !== selected &&
      matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      previewTimer.current = setTimeout(() => setSelected(i), 180);
  };
  return (
    <div className="training-index training-takeover">
      <div className="training-takeover-layer" aria-hidden="true">
        <Image src={training.image} alt="" fill sizes="100vw" />
        <span className="takeover-word">
          {training.shortTitle.toUpperCase()}
        </span>
      </div>
      <div className="training-rows">
        <div className="index-heading mono">
          <span>THE TRAINING INDEX</span>
          <span>01—03</span>
        </div>
        {trainings.map((t, i) => (
          <Fragment key={t.id}>
            <button
              className={`training-row ${selected === i ? "selected" : ""}`}
              onClick={() => {
                cancelPreview();
                setSelected(i);
                setAnnouncement(
                  `${t.title} selected. Programme details follow the training index.`,
                );
              }}
              onMouseEnter={() => preview(i)}
              onMouseLeave={cancelPreview}
              onFocus={cancelPreview}
              aria-pressed={selected === i}
              aria-controls="training-detail"
            >
              <span className="mono row-number">{t.number}</span>
              <span>
                <span className="training-row-title">{t.title}</span>
                <span className="training-row-description">{t.suits}</span>
                <span className="mono training-row-meta">
                  {t.duration} MIN <span> / </span>{" "}
                  {i === 2 ? "ONE TO ONE" : "SMALL GROUP"}
                </span>
              </span>
              <svg
                className="selection-mark"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={selected === i ? "M5 12l4 4L19 6" : "M6 9l6 6 6-6"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            {selected === i && (
              <Link href="#training-detail" className="training-detail-jump">
                Read about {t.shortTitle.toLowerCase()}{" "}
                <span aria-hidden="true">↓</span>
              </Link>
            )}
          </Fragment>
        ))}
        <p className="index-footnote">
          Different starting points. The same thoughtful coaching.
        </p>
        <p className="training-help">
          Still deciding?{" "}
          <Link href="/book/">
            Find your starting point with a coach{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </p>
      </div>
      <span className="sr-only" role="status">
        {announcement}
      </span>
      <div
        id="training-detail"
        className="training-detail"
        role="region"
        aria-labelledby="training-detail-title"
        tabIndex={-1}
      >
        <ImageAction
          className="training-image"
          href={`/training/${training.slug}/`}
          label={`Explore ${training.title.toLowerCase()}`}
          cue={`Explore ${training.shortTitle.toLowerCase()}`}
        >
          <Image
            key={training.image}
            src={training.image}
            alt={training.alt}
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <span className="photo-note mono">
            FIELD NOTES / {training.number}
          </span>
        </ImageAction>
        <div className="training-details-copy">
          <div className="mono training-format">{training.format}</div>
          <h3 id="training-detail-title">{training.line}</h3>
          <p>{training.description}</p>
          <p className="training-start">
            <span className="mono">YOUR STARTING POINT</span>
            {training.experience}
          </p>
          <div className="training-detail-links">
            <Link className="text-link" href={`/training/${training.slug}/`}>
              Explore {training.shortTitle.toLowerCase()}
              <Arrow />
            </Link>
            <Link
              href={bookingUrl(training.id)}
              className="small-book"
              aria-label={`Book your first ${training.title.toLowerCase()} session`}
            >
              Book your first session <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
