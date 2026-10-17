"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** The page is usable before this optional, separately loaded enhancement. */
export function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let revision = 0;
    let frame = 0;
    const start = () => {
      const current = ++revision;
      dispose?.();
      dispose = undefined;
      if (
        media.matches ||
        document.documentElement.dataset.motionPreference === "reduce"
      ) {
        document.documentElement.dataset.motion = "reduced";
        return;
      }
      frame = requestAnimationFrame(async () => {
        try {
          const { mountMotion } = await import("@/lib/motion");
          await document.fonts.ready;
          if (current !== revision) return;
          dispose = mountMotion();
          document.documentElement.dataset.motion = "ready";
        } catch {
          document.documentElement.dataset.motion = "fallback";
        }
      });
    };
    start();
    media.addEventListener("change", start);
    window.addEventListener("form:motion", start);
    return () => {
      revision++;
      cancelAnimationFrame(frame);
      media.removeEventListener("change", start);
      window.removeEventListener("form:motion", start);
      dispose?.();
      delete document.documentElement.dataset.motion;
    };
  }, [pathname]);

  return null;
}
