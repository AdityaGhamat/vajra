"use client";
import { useEffect, useState } from "react";
import { TransitionLink as Link } from "@/components/page-transitions";

const entries = [
  { id: "begin", label: "Begin" },
  { id: "training", label: "Train" },
  { id: "timetable", label: "Repeat" },
  { id: "membership", label: "Commit" },
  { id: "space", label: "Belong" },
  { id: "visit", label: "Show up" },
];
export function Journal() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 0;
      entries.forEach((entry, i) => {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45)
          current = i;
      });
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <nav aria-label="Training journal sections" className="journal">
        <span className="mono journal-caption">THE PRACTICE</span>
        {entries.map((entry, i) => (
          <Link
            href={`#${entry.id}`}
            key={entry.id}
            aria-label={`${String(i + 1).padStart(2, "0")} ${entry.label}`}
            aria-current={active === i ? "location" : undefined}
          >
            <span className="journal-tick" />
            <span className="journal-name mono">{entry.label}</span>
          </Link>
        ))}
        <span className="mono journal-page">0{active + 1} / 06</span>
      </nav>
    </>
  );
}
