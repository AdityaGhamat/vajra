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
        sessionStorage.setItem("vajra-first-set-v2", "1");
      } catch {
        /* Optional flourish. */
      }
    };
    dismiss.current = finish;
    let seen = false;
    try {
      seen = sessionStorage.getItem("vajra-first-set-v2") === "1";
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
    setCount(0);
    setVisible(true);
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min(1, (now - start) / 1550);
      const reps = Math.min(2, Math.floor((now - start) / 700));
      setCount((previous) => (previous === reps ? previous : reps));
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
        <p className="mono" role="status">
          YOUR FIRST SET / VAJRA FITNESS
        </p>
        <svg
          className="weigh-in-lifter"
          viewBox="0 0 260 310"
          aria-hidden="true"
          focusable="false"
        >
          <path className="lifter-ground" d="M58 286H205" />
          <path className="lifter-neck" d="M115 50l-2 17 16 10 9-10-8-18Z" />
          <g transform="translate(18 9) scale(.85)">
            <path
              className="lifter-skin"
              d="M111 23q14-12 25 2l2 12 6 7-8 3-2 9-10 6-12-9-5-15Z"
            />
            <path
              className="lifter-hair"
              d="M108 40l-3-12 7-12 17-3 11 9-2 13-7-8-10 2-7 12-1 9-5-5Z"
            />
            <path
              className="lifter-beard"
              d="M116 45l8 6 12-5-2 11-10 5-11-8-1-7Z"
            />
            <path
              className="lifter-detail"
              d="M129 35h5m-1 5 2 4m-17-6q-5-5-5 1l4 6"
            />
          </g>
          <path
            className="lifter-skin lifter-back-arm"
            d="M94 73q-10 0-15 17l-8 33 8 32 4 16 8 2 3-5-6-20-2-23 12-32Z"
          />
          <path
            className="lifter-detail"
            d="M81 95l-4 29 6 23m2 10 6 10m-7-5 5 10"
          />
          <path
            className="lifter-trousers lifter-back-leg"
            d="M103 154l-9 35-1 39-6 41 17 3 13-43 9-47 9-23Z"
          />
          <path
            className="lifter-trousers"
            d="M117 156l25-1 3 37 6 28 2 48-17 3-12-43-10-37-9-17Z"
          />
          <path
            className="lifter-seam"
            d="M118 177l13 49 12 37m-37-72-4 36-7 34M105 165h30"
          />
          <path
            className="lifter-shoes"
            d="M87 266l17 2 1 12-32 1q-2-6 8-10Zm48 2 18-2 5 7 13 5v4h-35Z"
          />
          <path
            className="lifter-shoe-detail"
            d="M74 279h30m33 1h31m-26-9 9 3m-65-1 10 2"
          />
          <path
            className="lifter-shirt"
            d="M110 63l-13 5-8 14 9 25 4 47q16 10 40 0l4-45 9-22-12-17-10-5q-10 17-23-2Z"
          />
          <path
            className="lifter-fabric"
            d="M111 82q10 8 24-1m-30 19 6 31m23-29-6 31m-23 12 30 3"
          />
          <path
            className="lifter-skin"
            d="M145 77q15 1 17 17l3 24-8 11-9-8-6-20-4-13Z"
          />
          <path className="lifter-detail" d="M150 88q9 5 6 16m-6 5 4 10" />
          <g className="lifter-forearm">
            <path
              className="lifter-skin"
              d="M154 118q8-3 12 7l11 25 4 7-4 10-8 1-7-14-12-23q-3-8 4-13Z"
            />
            <path className="lifter-detail" d="M158 130l10 25m2 2 5 4" />
            <g className="lifter-dumbbell">
              <path className="lifter-weight-bar" d="M152 164h45" />
              <path d="M148 150h9v28h-9l-4-5v-18Zm43 0h9l4 5v18l-4 5h-9Z" />
              <path className="lifter-weight-edge" d="M148 155v18m52-18v18" />
            </g>
            <path className="lifter-grip" d="M168 160q8-5 11 1l-1 7-8 2" />
          </g>
          <path className="lifter-motion-mark" d="M193 104l8-6m-6 16h10" />
        </svg>
        <div className="weigh-in-reps" aria-hidden="true">
          <span className="weigh-in-count">
            {String(count).padStart(2, "0")}
          </span>
          <span className="mono">/ 02 REPS</span>
        </div>
        <p className="mono weigh-in-note">EVERY REP IS A BEGINNING.</p>
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
