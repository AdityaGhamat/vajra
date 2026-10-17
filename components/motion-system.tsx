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
    let waiting = false;
    const start = () => {
      const current = ++revision;
      cancelAnimationFrame(frame);
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
          if (
            ["covering", "covered"].includes(
              document.documentElement.dataset.routeTransition ?? "",
            )
          ) {
            waiting = true;
            return;
          }
          dispose = mountMotion();
          document.documentElement.dataset.motion = "ready";
        } catch (error) {
          document.documentElement.dataset.motion = "fallback";
          if (process.env.NODE_ENV === "development")
            console.error("FORM motion could not start", error);
        }
      });
    };
    start();
    media.addEventListener("change", start);
    window.addEventListener("form:motion", start);
    const enter = () => {
      if (waiting) {
        waiting = false;
        start();
      }
    };
    window.addEventListener("form:route-enter", enter);
    return () => {
      revision++;
      cancelAnimationFrame(frame);
      media.removeEventListener("change", start);
      window.removeEventListener("form:motion", start);
      window.removeEventListener("form:route-enter", enter);
      dispose?.();
      delete document.documentElement.dataset.motion;
    };
  }, [pathname]);

  return null;
}
