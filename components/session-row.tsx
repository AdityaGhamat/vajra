"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TransitionLink } from "./page-transitions";
import { Arrow } from "./ui";
import {
  bookingUrl,
  getTraining,
  sessionFocuses,
  type Session,
} from "@/lib/content";

/** Exercise details remain available by keyboard and touch. */
export function SessionRow({ session: s }: { session: Session }) {
  const t = getTraining(s.training)!;
  const focus = sessionFocuses[s.focus];
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    window.dispatchEvent(new Event("form:layout"));
  }, [expanded]);
  return (
    <article
      className="schedule-row exercise-row"
      data-preview={expanded || undefined}
      data-session-focus={s.focus}
    >
      <div className="session-time">
        <time>{s.time}</time>
        <span className="mono">{t.duration} MIN</span>
      </div>
      <div className="session-title">
        <span className={`session-dot ${s.training}`} />
        <div className="session-description">
          <h4>{t.title}</h4>
          <p className="session-focus">{focus.label}</p>
          <button
            type="button"
            className="session-preview-toggle mono"
            aria-expanded={expanded}
            aria-controls={`exercises-${s.id}`}
            aria-label={`${expanded ? "Hide" : "Show"} exercise preview for ${t.title} at ${s.time}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "CLOSE STUDY" : "EXERCISE STUDY"}{" "}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </div>
      </div>
      <div className="session-coach">
        <span className="mobile-label mono">COACH </span>
        {s.coach}
      </div>
      <div className="session-level">{s.level}</div>
      <TransitionLink
        className="session-book"
        href={bookingUrl(s.training, s.id)}
        aria-label={`Request ${t.title} on ${s.day} at ${s.time}`}
      >
        Request session <Arrow />
      </TransitionLink>
      <div
        className="session-exercises"
        id={`exercises-${s.id}`}
        hidden={!expanded}
      >
        <div className="session-mobile-image">
          <Image
            src={focus.image}
            alt={`Generated training concept illustrating ${focus.label.toLowerCase()}.`}
            fill
            sizes="(max-width:760px) 85vw, 300px"
          />
        </div>
        <div>
          <span className="mono">A LOOK INSIDE / {focus.label}</span>
          <ul>
            {focus.exercises.map((exercise) => (
              <li key={exercise}>{exercise}</li>
            ))}
          </ul>
          <p>
            Example movements. Your coach adjusts the session to your starting
            point.
          </p>
        </div>
      </div>
    </article>
  );
}
