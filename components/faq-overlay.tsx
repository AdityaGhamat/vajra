"use client";
import { useEffect, useState } from "react";
import { faqs } from "@/lib/content";

export function FaqTrigger() {
  return (
    <button
      className="faq-trigger text-link"
      onClick={() => window.dispatchEvent(new CustomEvent("form:faq-open"))}
    >
      A few things you might be wondering{" "}
      <span aria-hidden="true" className="faq-trigger-plus">
        +
      </span>
    </button>
  );
}

export function FaqOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("form:faq-open", show);
    return () => window.removeEventListener("form:faq-open", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="faq-overlay" data-lenis-prevent>
      <div className="faq-overlay-inner">
        <div className="faq-overlay-header">
          <span className="mono">A FEW THINGS YOU MIGHT BE WONDERING</span>
          <button
            className="faq-overlay-close mono"
            onClick={() => setOpen(false)}
          >
            CLOSE <span aria-hidden="true">−</span>
          </button>
        </div>
        <div className="faq-overlay-content">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <span aria-hidden="true" className="faq-plus">
                  +
                </span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
