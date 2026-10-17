"use client";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/page-transitions";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BookLink, Wordmark } from "./ui";
import { AppearanceControls } from "./appearance-controls";
import { trainings, bookingUrl } from "@/lib/content";

const links = [
  ["Training", "/#training"],
  ["Timetable", "/#timetable"],
  ["Membership", "/#membership"],
  ["The space", "/#space"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [bookVisible, setBookVisible] = useState(false);
  const pathname = usePathname();
  const programme = trainings.find(
    (training) => pathname.replace(/\/$/, "") === `/training/${training.slug}`,
  );
  const bookHref = bookingUrl(programme?.id);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    window.dispatchEvent(new Event("form:menu"));
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);
  useEffect(() => {
    // One scroll owner: shrink and hide the masthead, reveal the booking bar
    // only once the hero is behind and no booking action is already in view.
    const root = document.documentElement;
    const bookingRoute = pathname.startsWith("/book");
    const bumper = new Set<Element>();
    let frame = 0;
    let lastY = window.scrollY;
    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const engaged =
        open ||
        !!document.querySelector(".appearance-controls[open]") ||
        !!document.activeElement?.closest(".site-header");
      root.dataset.scrolled = y > 24 ? "true" : "false";
      if (y > lastY + 4 && y > 320 && !engaged && !bookingRoute)
        root.dataset.navHidden = "true";
      else if (y < lastY - 4 || y <= 320 || engaged || bookingRoute)
        root.dataset.navHidden = "false";
      lastY = y;
      setBookVisible(
        !bookingRoute &&
          !open &&
          bumper.size === 0 &&
          y > window.innerHeight * 0.55,
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? bumper.add(entry.target)
            : bumper.delete(entry.target),
        );
        queue();
      },
      { threshold: 0.05 },
    );
    document
      .querySelectorAll(".closing, .detail-next, .footer")
      .forEach((el) => observer.observe(el));
    apply();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    document.addEventListener("focusin", queue);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      document.removeEventListener("focusin", queue);
      delete root.dataset.scrolled;
      delete root.dataset.navHidden;
    };
  }, [open, pathname]);
  return (
    <>
      <header className="site-header">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </nav>
        <AppearanceControls onOpen={() => setOpen(false)} />
        <BookLink className="header-book" href={bookHref} />
        <button
          ref={toggle}
          className="menu-toggle mono"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "CLOSE −" : "MENU +"}
        </button>
        {open && (
          <nav
            ref={menu}
            id="mobile-menu"
            className="mobile-menu"
            data-lenis-prevent
            aria-label="Mobile navigation"
          >
            {links.map(([name, href], i) => (
              <Link key={name} href={href} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {name}
              </Link>
            ))}
            <BookLink href={bookHref} />
            <div className="mobile-menu-foot">
              <span className="mobile-menu-thumb" aria-hidden="true">
                <Image src="/images/strength.webp" alt="" fill sizes="120px" />
              </span>
              <span className="mono">
                BANER, PUNE
                <br />
                PROGRESS IS A PRACTICE.
              </span>
            </div>
          </nav>
        )}
      </header>
      {!pathname.startsWith("/book") && (
        <div className={`mobile-book${bookVisible ? " visible" : ""}`}>
          <span className="mono">YOUR FIRST STEP</span>
          <BookLink href={bookHref} />
        </div>
      )}
    </>
  );
}
