"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Masked line reveal: each `.ln` translates up from under an overflow mask when `.in` is added. */
export function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`lines ${className}`} style={{ ["--ld" as string]: `${delay}s` }}>
      <span className="ln">{children}</span>
    </span>
  );
}
