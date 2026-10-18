"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** A brief, optional opening stamp; the page is readable without JavaScript. */
export function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const dismiss = useRef<() => void>(() => {});

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let cancelled = false;
    const finish = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      setVisible(false);
      try {
        sessionStorage.setItem("vajra-weighed", "1");
      } catch {
        /* Optional flourish. */
      }
    };
    dismiss.current = finish;
    let seen = false;
    try {
      seen = sessionStorage.getItem("vajra-weighed") === "1";
    } catch {
      seen = true;
    }
    if (
      pathname !== "/" ||
      seen ||
      preference.matches ||
      document.documentElement.dataset.motionPreference === "reduce"
    ) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min(1, (now - start) / 650);
      setCount(Math.round(progress * 100));
      if (progress === 1) finish();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("form:motion", finish);
    window.addEventListener("keydown", escape);
    preference.addEventListener("change", finish);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("form:motion", finish);
      window.removeEventListener("keydown", escape);
      preference.removeEventListener("change", finish);
    };
  }, [pathname]);

  if (!visible) return null;
  return (
    <div className="weigh-in">
      <div>
        <p className="mono">OPENING YOUR TRAINING LOG</p>
        <div className="weigh-in-count" aria-hidden="true">
          {count}
        </div>
        <div className="weigh-in-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <p className="mono weigh-in-note">ONE ENTRY AT A TIME.</p>
        <button
          type="button"
          className="weigh-in-skip mono"
          onClick={() => dismiss.current()}
        >
          Skip intro ↗
        </button>
      </div>
    </div>
  );
}
