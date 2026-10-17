import type { ReactNode } from "react";

export function Interstitial({
  word,
  subtitle,
}: {
  word: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="interstitial" aria-hidden="true">
      <span className="interstitial-word">
        {word}
        <span className="red">.</span>
      </span>
      {subtitle && <span className="interstitial-sub mono">{subtitle}</span>}
    </div>
  );
}
