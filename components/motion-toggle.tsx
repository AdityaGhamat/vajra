"use client";

import { useEffect, useState } from "react";

export function MotionToggle() {
  const [enabled, setEnabled] = useState(true);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setSystemReduced(media.matches);
      setEnabled(
        !media.matches &&
          document.documentElement.dataset.motionPreference !== "reduce",
      );
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("form:motion", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("form:motion", sync);
    };
  }, []);
  function toggle() {
    const next = enabled ? "reduce" : "full";
    document.documentElement.dataset.motionPreference = next;
    try {
      localStorage.setItem("form-motion", next);
    } catch {
      /* Optional preference only. */
    }
    setEnabled(!enabled);
    window.dispatchEvent(new Event("form:motion"));
  }
  return (
    <button
      className="motion-toggle mono"
      type="button"
      role="switch"
      aria-label="Animations"
      aria-checked={enabled}
      disabled={systemReduced}
      onClick={toggle}
      title={
        systemReduced
          ? "Reduced motion is enabled in your device settings"
          : "Choose your motion preference"
      }
    >
      <span className="motion-toggle-dot" aria-hidden="true" />
      MOTION {enabled ? "ON" : "OFF"}
    </button>
  );
}
