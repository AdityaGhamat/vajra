import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./runtime";

/** Forms use one native scroll owner. Editorial routes may use wheel inertia. */
export function mountScroll() {
  const root = document.documentElement;
  const booking = !!document.querySelector(".booking-page");
  root.dataset.scrollEngine = booking ? "native" : "lenis";
  if (booking)
    return () => {
      delete root.dataset.scrollEngine;
    };

  const lenis = new Lenis({
    autoRaf: false,
    lerp: 0.14,
    smoothWheel: true,
    syncTouch: false,
    // Next owns URL/history. A single explicit event owns anchor movement.
    anchors: false,
    stopInertiaOnNavigate: true,
    prevent: (node) => !!node.closest("[data-lenis-prevent], .mobile-menu"),
  });
  const tick = (seconds: number) => lenis.raf(seconds * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  const sync = () => {
    const busy =
      document.querySelector(".mobile-menu") ||
      root.dataset.routeTransition === "covering" ||
      root.dataset.routeTransition === "covered";
    if (busy) lenis.stop();
    else {
      lenis.resize();
      lenis.start();
    }
  };
  const top = (event: MouseEvent) => {
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (
      link &&
      !link.hash &&
      link.origin === location.origin &&
      link.pathname === "/" &&
      location.pathname === "/"
    )
      lenis.scrollTo(0, { immediate: true, force: true });
  };
  const anchor = (event: Event) => {
    const hash = (event as CustomEvent<string>).detail;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) lenis.scrollTo(target, { duration: 0.85, lerp: 0 });
  };
  window.addEventListener("form:menu", sync);
  window.addEventListener("form:route-leave", sync);
  window.addEventListener("form:route-enter", sync);
  window.addEventListener("click", top);
  window.addEventListener("form:anchor", anchor);
  sync();
  return () => {
    window.removeEventListener("form:menu", sync);
    window.removeEventListener("form:route-leave", sync);
    window.removeEventListener("form:route-enter", sync);
    window.removeEventListener("click", top);
    window.removeEventListener("form:anchor", anchor);
    gsap.ticker.remove(tick);
    lenis.destroy();
    delete root.dataset.scrollEngine;
  };
}
