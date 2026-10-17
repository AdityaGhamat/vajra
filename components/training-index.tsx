"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trainings, bookingUrl } from "@/lib/content";
import { Arrow } from "./ui";

export function TrainingIndex() {
  const [selected, setSelected] = useState(0);
  const training = trainings[selected];
  useEffect(() => {
    window.dispatchEvent(new Event("form:training"));
  }, [selected]);
  return (
    <div className="training-index">
      <div className="training-rows">
        <div className="index-heading mono">
          <span>THE TRAINING INDEX</span>
          <span>01—03</span>
        </div>
        {trainings.map((t, i) => (
          <button
            className={`training-row ${selected === i ? "selected" : ""}`}
            key={t.id}
            onClick={() => setSelected(i)}
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
            <Arrow diagonal />
          </button>
        ))}
        <p className="index-footnote">
          Different starting points. The same thoughtful coaching.
        </p>
      </div>
      <div
        id="training-detail"
        className="training-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="training-image">
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
        </div>
        <div className="training-details-copy">
          <div className="mono training-format">{training.format}</div>
          <h3>{training.line}</h3>
          <p>{training.description}</p>
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
