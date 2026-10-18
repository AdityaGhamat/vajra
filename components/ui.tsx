import { TransitionLink as Link } from "@/components/page-transitions";
import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function BookLink({
  children = "Book your first session",
  href = "/book/",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`button ${className}`}>
      <span className="button-copy">
        <span>{children}</span>
        <span className="button-copy-echo" aria-hidden="true">
          {children}
        </span>
      </span>
      <Arrow />
    </Link>
  );
}
export function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label mono ${light ? "light" : ""}`}>
      <span className="section-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}
export function Wordmark() {
  return (
    <Link className="brand" href="/" aria-label="VAJRA FITNESS home">
      <span className="wordmark">
        VAJRA<span className="brand-slash">/</span>
      </span>
      <span className="brand-descriptor">FITNESS</span>
    </Link>
  );
}
export function Closing() {
  return (
    <section className="closing section-pad chapter-iron">
      <div className="closing-top mono">
        <span>YOUR NEXT ENTRY</span>
        <span className="stamp-in">LOG SIGNED — 01 / BEGIN</span>
      </div>
      <h2>
        START WHERE
        <br />
        YOU ARE<span className="red">.</span>
      </h2>
      <div className="closing-bottom">
        <p>
          Meet a coach. Try a session.
          <br />
          Find your rhythm.
        </p>
        <BookLink />
      </div>
    </section>
  );
}
