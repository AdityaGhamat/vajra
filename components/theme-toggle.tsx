"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const transition = useRef<ViewTransition | null>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const sync = () =>
      setDark(document.documentElement.dataset.theme === "dark");
    window.addEventListener("form:theme", sync);
    return () => window.removeEventListener("form:theme", sync);
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = dark ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try {
        localStorage.setItem("form-theme", next);
      } catch {
        /* Optional preference. */
      }
      setDark(next === "dark");
      window.dispatchEvent(new Event("form:theme"));
    };
    if (
      typeof document.startViewTransition !== "function" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      root.dataset.motionPreference === "reduce"
    ) {
      apply();
      return;
    }
    transition.current?.skipTransition();
    const rect = event.currentTarget.getBoundingClientRect();
    root.style.setProperty("--theme-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--theme-y", `${rect.top + rect.height / 2}px`);
    root.classList.add("theme-changing");
    transition.current = document.startViewTransition(apply);
    transition.current.finished
      .catch(() => {})
      .finally(() => root.classList.remove("theme-changing"));
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      title={dark ? "Switch to day edition" : "Switch to night edition"}
    >
      <span className="theme-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span className="theme-moon" />
      </span>
      <span className="mono theme-label" aria-hidden="true">
        {dark ? "NIGHT" : "DAY"}
      </span>
    </button>
  );
}
