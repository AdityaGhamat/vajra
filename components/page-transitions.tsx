"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import type { createRouteTransition } from "@/lib/motion/route-transition";
import { ScrollProgress } from "./scroll-progress";

type Driver = ReturnType<typeof createRouteTransition>;
const Navigation = createContext<(href: string, replace?: boolean) => boolean>(
  () => false,
);
const allowed = () =>
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  document.documentElement.dataset.motionPreference !== "reduce";
const normalized = (path: string) => path.replace(/\/$/, "") || "/";

export function PageTransitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const driver = useRef<Driver | null>(null);
  const pending = useRef<URL | null>(null);
  const generation = useRef(0);
  const watchdog = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const release = useCallback(() => {
    clearTimeout(watchdog.current);
    pending.current = null;
    document.documentElement.dataset.routeTransition = "idle";
    window.dispatchEvent(new Event("form:route-enter"));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    // Warm the small route controller while the first page is already usable.
    const warm = () => {
      if (allowed() && !driver.current)
        import("@/lib/motion/route-transition")
          .then((module) => {
            if (!cancelled && curtain.current)
              driver.current = module.createRouteTransition(curtain.current);
          })
          .catch(() => {});
    };
    warm();
    const cancel = () => {
      generation.current++;
      driver.current?.reset();
      release();
    };
    const preferenceChanged = () => {
      cancel();
      warm();
    };
    window.addEventListener("popstate", cancel);
    window.addEventListener("form:motion", preferenceChanged);
    preference.addEventListener("change", preferenceChanged);
    return () => {
      cancelled = true;
      window.removeEventListener("popstate", cancel);
      window.removeEventListener("form:motion", preferenceChanged);
      preference.removeEventListener("change", preferenceChanged);
      cancel();
    };
  }, [release]);

  useEffect(() => {
    const target = pending.current;
    if (!target || normalized(target.pathname) !== normalized(pathname)) return;
    const current = generation.current;
    const frame = requestAnimationFrame(() => {
      // Route scroll and wheel inertia must never compete. Anchor offset comes from CSS.
      const anchor = target.hash
        ? document.getElementById(decodeURIComponent(target.hash.slice(1)))
        : null;
      if (anchor)
        anchor.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.dataset.routeTransition = "revealing";
      window.dispatchEvent(new Event("form:route-enter"));
      const heading = document.querySelector<HTMLElement>("main h1");
      if (heading && !target.hash) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
      driver.current?.reveal().finally(() => {
        if (current === generation.current) release();
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, release]);

  const navigate = useCallback(
    (href: string, replace = false) => {
      const target = new URL(href, location.href);
      if (
        target.origin === location.origin &&
        normalized(target.pathname) === normalized(location.pathname) &&
        target.hash &&
        document.documentElement.dataset.scrollEngine === "lenis"
      ) {
        const destination = target.pathname + target.search + target.hash;
        if (replace) router.replace(destination, { scroll: false });
        else router.push(destination, { scroll: false });
        window.dispatchEvent(
          new CustomEvent("form:anchor", { detail: target.hash }),
        );
        return true;
      }
      if (
        target.origin !== location.origin ||
        normalized(target.pathname) === normalized(location.pathname) ||
        !allowed() ||
        !driver.current
      )
        return false;
      if (pending.current) return true;
      pending.current = target;
      const current = ++generation.current;
      document.documentElement.dataset.routeTransition = "covering";
      window.dispatchEvent(new Event("form:route-leave"));
      watchdog.current = setTimeout(() => {
        generation.current++;
        driver.current?.reset();
        release();
      }, 5000);
      driver.current
        .cover()
        .then(() => {
          if (current !== generation.current) return;
          document.documentElement.dataset.routeTransition = "covered";
          const destination = target.pathname + target.search + target.hash;
          if (replace) router.replace(destination, { scroll: false });
          else router.push(destination, { scroll: false });
        })
        .catch(() => {
          driver.current?.reset();
          release();
          router.push(href);
        });
      return true;
    },
    [router, release],
  );

  return (
    <Navigation.Provider value={navigate}>
      {children}
      <div className="route-curtain" ref={curtain} aria-hidden="true">
        <div className="route-curtain-panel" />
        <div className="route-curtain-panel" />
        <div className="route-curtain-panel" />
        <div className="route-curtain-word">
          <span>
            VAJRA<span className="route-curtain-slash">/</span>
          </span>
          <span className="mono">PROGRESS IS A PRACTICE.</span>
        </div>
      </div>
      <ScrollProgress />
    </Navigation.Provider>
  );
}

/** Keep Next's prefetching, keyboard, modifier keys, and new-tab behavior. */
export function TransitionLink({
  onNavigate,
  ...props
}: ComponentProps<typeof NextLink>) {
  const navigate = useContext(Navigation);
  return (
    <NextLink
      {...props}
      onNavigate={(event) => {
        let prevented = false;
        onNavigate?.({
          preventDefault() {
            prevented = true;
            event.preventDefault();
          },
        });
        if (
          !prevented &&
          typeof props.href === "string" &&
          navigate(props.href, props.replace)
        )
          event.preventDefault();
      }}
    />
  );
}
