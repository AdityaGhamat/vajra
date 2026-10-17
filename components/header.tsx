"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BookLink, Wordmark } from "./ui";

const links = [
  ["Training", "/#training"],
  ["Timetable", "/#timetable"],
  ["Membership", "/#membership"],
  ["The space", "/#space"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
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
        <BookLink className="header-book" />
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
            aria-label="Mobile navigation"
          >
            {links.map(([name, href], i) => (
              <Link key={name} href={href} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {name}
              </Link>
            ))}
            <BookLink />
          </nav>
        )}
      </header>
      {!pathname.startsWith("/book") && (
        <div className="mobile-book">
          <span className="mono">YOUR FIRST STEP</span>
          <BookLink />
        </div>
      )}
    </>
  );
}
