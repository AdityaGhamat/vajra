"use client";

import { useEffect, useRef } from "react";

/** A pointer-only accent. Image actions keep their own descriptive local cue. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    const fine = matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 901px)",
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = -100,
      y = -100,
      visible = false;
    const enabled = () =>
      fine.matches &&
      !reduced.matches &&
      document.documentElement.dataset.motionPreference !== "reduce";
    const render = () => {
      frame = 0;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = visible && enabled() ? "1" : "0";
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const hide = () => {
      visible = false;
      queue();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled()) {
        hide();
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      visible = !target?.closest(
        ".image-action, .space-viewer, input, select, textarea, .appearance-panel",
      );
      x = event.clientX;
      y = event.clientY;
      const action = target?.closest<HTMLElement>(".button, [data-cursor]");
      if (action) dot.dataset.label = action.dataset.cursor || "BOOK ↗";
      else delete dot.dataset.label;
      queue();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("form:motion", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("form:motion", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="cursor-dot"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
