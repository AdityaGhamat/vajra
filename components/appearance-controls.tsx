"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { MotionToggle } from "./motion-toggle";

export function AppearanceControls({ onOpen }: { onOpen: () => void }) {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        details.current &&
        !details.current.contains(event.target)
      )
        details.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        summary.current?.focus();
      }
    };
    const menu = () => {
      if (document.querySelector(".mobile-menu") && details.current)
        details.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    window.addEventListener("form:menu", menu);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("form:menu", menu);
    };
  }, []);

  return (
    <details
      ref={details}
      className="appearance-controls"
      onToggle={() => {
        if (details.current?.open) onOpen();
      }}
    >
      <summary
        ref={summary}
        role="button"
        aria-label="Appearance settings"
        aria-controls="appearance-preferences"
        title="Appearance settings"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M12 4a8 8 0 0 1 0 16V4Z" fill="currentColor" />
        </svg>
        <span className="mono">APPEARANCE</span>
      </summary>
      <div
        className="appearance-panel"
        id="appearance-preferences"
        role="group"
        aria-label="Appearance preferences"
      >
        <p className="mono">YOUR EDITION</p>
        <div className="appearance-row">
          <span>Night edition</span>
          <ThemeToggle />
        </div>
        <div className="appearance-row">
          <span>Animations</span>
          <MotionToggle />
        </div>
        <p className="appearance-note">Make yourself comfortable.</p>
      </div>
    </details>
  );
}
