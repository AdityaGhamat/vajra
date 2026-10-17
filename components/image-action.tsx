"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { TransitionLink } from "./page-transitions";

/** A local pointer cue; pointer movement never updates React state. */
export function ImageAction({
  children,
  className = "",
  label,
  cue,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  cue: string;
  href?: string;
  onClick?: () => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const pending = useRef(0);
  const point = useRef({ x: 0, y: 0 });
  const hide = () => {
    cancelAnimationFrame(pending.current);
    pending.current = 0;
    frame.current?.removeAttribute("data-cursor-active");
  };
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("form:motion", hide);
    preference.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("form:motion", hide);
      preference.removeEventListener("change", hide);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motionPreference === "reduce"
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    point.current = {
      x: Math.max(84, Math.min(rect.width - 84, event.clientX - rect.left)),
      y: Math.max(32, Math.min(rect.height - 32, event.clientY - rect.top)),
    };
    if (!pending.current)
      pending.current = requestAnimationFrame(() => {
        pending.current = 0;
        const element = frame.current;
        if (!element) return;
        element.style.setProperty("--cursor-x", `${point.current.x}px`);
        element.style.setProperty("--cursor-y", `${point.current.y}px`);
        element.dataset.cursorActive = "true";
      });
  };
  const content = (
    <>
      <span className="image-action-media">{children}</span>
      <span className="image-action-hint mono" aria-hidden="true">
        {cue} <span>↗</span>
      </span>
    </>
  );
  return (
    <div
      ref={frame}
      className={`${className} image-action`}
      onPointerEnter={move}
      onPointerMove={move}
      onPointerLeave={hide}
      onPointerDown={hide}
    >
      {href ? (
        <TransitionLink
          href={href}
          className="image-action-target"
          aria-label={label}
        >
          {content}
        </TransitionLink>
      ) : (
        <button
          type="button"
          className="image-action-target"
          onClick={onClick}
          aria-label={label}
          aria-haspopup="dialog"
        >
          {content}
        </button>
      )}
      <span className="image-cursor mono" aria-hidden="true">
        {cue}
        <span>↗</span>
      </span>
    </div>
  );
}
