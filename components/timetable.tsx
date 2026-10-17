"use client";
import { TransitionLink as Link } from "@/components/page-transitions";
import { useEffect, useState } from "react";
import {
  days,
  sessions,
  trainings,
  getTraining,
  bookingUrl,
  type Day,
  type TrainingId,
} from "@/lib/content";
import { Arrow } from "./ui";

export function Timetable() {
  const [day, setDay] = useState<Day>("Monday");
  const [filter, setFilter] = useState<TrainingId | "all">("all");
  const shown = sessions.filter(
    (s) => s.day === day && (filter === "all" || s.training === filter),
  );
  useEffect(() => {
    window.dispatchEvent(new Event("form:schedule"));
  }, [day, filter]);
  return (
    <div className="timetable">
      <div className="timetable-controls">
        <div className="day-selector" role="group" aria-label="Choose day">
          {days.map((d) => (
            <button
              key={d}
              aria-label={d}
              aria-pressed={d === day}
              onClick={() => setDay(d)}
            >
              <span className="day-short">{d.slice(0, 3)}</span>
              <span className="day-long">{d}</span>
            </button>
          ))}
        </div>
        <div className="type-filter">
          <label htmlFor="training-filter" className="mono">
            TRAINING
          </label>
          <select
            id="training-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All training</option>
            {trainings.map((t) => (
              <option value={t.id} key={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="schedule-head mono" aria-hidden="true">
        <span>TIME / IST</span>
        <span>SESSION</span>
        <span>COACH</span>
        <span>LEVEL</span>
        <span />
      </div>
      <div className="schedule-list" aria-live="polite" aria-atomic="true">
        <h3 className="sr-only">{day} sessions</h3>
        {shown.length ? (
          shown.map((s) => {
            const t = getTraining(s.training)!;
            return (
              <article className="schedule-row" key={s.id}>
                <div className="session-time">
                  <time>{s.time}</time>
                  <span className="mono">{t.duration} MIN</span>
                </div>
                <div className="session-title">
                  <span className={`session-dot ${s.training}`} />
                  <h4>{t.title}</h4>
                </div>
                <div className="session-coach">
                  <span className="mobile-label mono">COACH </span>
                  {s.coach}
                </div>
                <div className="session-level">{s.level}</div>
                <Link
                  className="session-book"
                  href={bookingUrl(s.training, s.id)}
                  aria-label={`Request ${t.title} on ${s.day} at ${s.time}`}
                >
                  Request session
                  <Arrow />
                </Link>
              </article>
            );
          })
        ) : (
          <div className="empty-schedule">
            <span className="mono">REST / RESET</span>
            <h4>
              {day === "Sunday"
                ? "A little room to recover."
                : "No sessions with this filter."}
            </h4>
            <p>
              {day === "Sunday"
                ? "The club is closed on Sundays. Choose another day to find your next session."
                : "Try another day or show all training for this day."}
            </p>
            {filter !== "all" && (
              <button className="text-link" onClick={() => setFilter("all")}>
                Show all training <Arrow />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="schedule-footer mono">
        <span>ILLUSTRATIVE TIMETABLE · COACH PROFILES ARE FICTIONAL</span>
        <span>ALL TIMES / INDIA STANDARD TIME</span>
      </div>
    </div>
  );
}
