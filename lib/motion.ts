import { gsap, ScrollTrigger } from "./motion/runtime";
import { mountScroll } from "./motion/scroll";
import { mountReveals } from "./motion/reveals";
import { mountScrollScenes } from "./motion/scroll-scenes";
import { mountInteractions } from "./motion/interactions";

/** A route owns its scroll engine, scenes, listeners, and animation context. */
export function mountMotion() {
  const media = gsap.matchMedia();
  try {
    media.add(
      { desktop: "(min-width: 901px)", compact: "(max-width: 900px)" },
      (context) => {
        const desktop = !!context.conditions?.desktop;
        const stopScroll = mountScroll();
        let stopInteractions: (() => void) | undefined;
        try {
          mountReveals(desktop);
          mountScrollScenes(desktop);
          stopInteractions = mountInteractions(context);
          ScrollTrigger.refresh();
        } catch (error) {
          stopInteractions?.();
          stopScroll();
          throw error;
        }
        return () => {
          stopInteractions?.();
          stopScroll();
          delete document.documentElement.dataset.motionState;
        };
      },
    );
  } catch (error) {
    media.revert();
    throw error;
  }
  return () => media.revert();
}
