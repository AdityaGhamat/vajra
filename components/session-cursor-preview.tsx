"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type RefObject } from "react";
import { sessionFocuses, type SessionFocusId } from "@/lib/content";

/** One viewport-level preview. React changes the photo only when the row changes;
 * animation frames handle pointer travel without rerendering the timetable. */
export function SessionCursorPreview({
  container,
}: {
  container: RefObject<HTMLDivElement | null>;
}) {
  const [focus, setFocus] = useState<SessionFocusId | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const pointer = matchMedia(
      "(min-width: 901px) and (hover: hover) and (pointer: fine)",
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;
    let currentFocus: SessionFocusId | null = null;
    let target = { x: 0, y: 0 };
    let position = { x: 0, y: 0 };
    let lastTime = 0;
    const hide = () => {
      active = false;
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      preview.current?.removeAttribute("data-active");
    };
    const tick = (time: number) => {
      frame = 0;
      if (!active) return;
      const ease =
        1 - Math.exp(-Math.min(time - (lastTime || time - 16), 64) / 65);
      lastTime = time;
      position.x += (target.x - position.x) * ease;
      position.y += (target.y - position.y) * ease;
      const tilt = Math.max(-3, Math.min(3, (target.x - position.x) * 0.035));
      if (preview.current) {
        preview.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${tilt}deg)`;
        preview.current.dataset.active = "true";
      }
      if (
        !preview.current ||
        Math.abs(target.x - position.x) + Math.abs(target.y - position.y) > 0.15
      )
        frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const row = element?.closest<HTMLElement>(".exercise-row");
      const key = row?.dataset.sessionFocus as SessionFocusId | undefined;
      if (
        !pointer.matches ||
        reduced.matches ||
        document.documentElement.dataset.motionPreference === "reduce" ||
        event.pointerType !== "mouse" ||
        !key ||
        !(key in sessionFocuses) ||
        element?.closest(".session-book, .session-exercises")
      ) {
        hide();
        return;
      }
      const width = Math.min(280, innerWidth * 0.24);
      const height = width * 0.75;
      const x =
        event.clientX + width + 28 < innerWidth - 16
          ? event.clientX + 28
          : event.clientX - width - 28;
      target = {
        x: Math.max(16, x),
        y: Math.max(
          16,
          Math.min(innerHeight - height - 16, event.clientY - height * 0.55),
        ),
      };
      if (!active) position = { ...target };
      active = true;
      if (key !== currentFocus) {
        currentFocus = key;
        setFocus(key);
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", hide);
    root.addEventListener("pointerdown", hide);
    pointer.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("form:motion", hide);
    window.addEventListener("form:schedule", hide);
    window.addEventListener("keydown", hide);
    window.addEventListener("form:route-leave", hide);
    return () => {
      hide();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", hide);
      root.removeEventListener("pointerdown", hide);
      pointer.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("form:motion", hide);
      window.removeEventListener("form:schedule", hide);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("form:route-leave", hide);
    };
  }, [container]);
  if (!focus) return null;
  const study = sessionFocuses[focus];
  return createPortal(
    <div ref={preview} className="session-cursor-preview" aria-hidden="true">
      <div className="session-cursor-card">
        <Image
          key={study.image}
          src={study.image}
          alt=""
          fill
          sizes="280px"
          loading="eager"
        />
        <span className="mono">
          {study.label} <span>↗</span>
        </span>
      </div>
    </div>,
    document.body,
  );
}
