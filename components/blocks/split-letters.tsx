"use client";

import { useEffect, useRef } from "react";

/** Per-letter masked rise for a headline. Add `.in` (via reveal hook / effect) to animate. */
export function SplitLetters({
  text,
  className,
  delay = 300,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // letters already visible in the DOM fallback
    const t = setTimeout(() => el.classList.add("in"), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span ref={ref} className={`split ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          " "
        ) : (
          <span key={i} className="ltr" aria-hidden="true">
            {ch}
          </span>
        )
      )}
    </span>
  );
}
