"use client";

import { useEffect, useRef } from "react";

/** Counts up from 0 to `value` when scrolled into view. */
export function NumberTicker({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = () => {
      el.textContent = String(value);
    };
    if (!("IntersectionObserver" in window) || reduce) {
      render();
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const dur = 1400;
        const t0 = performance.now();
        const step = (ts: number) => {
          const p = Math.min(1, (ts - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(step);
          else el.textContent = String(value);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span className="num">
      <span ref={ref} className="val" data-count={value}>
        0
      </span>
      {suffix ? <span className="suffix">{suffix}</span> : null}
    </span>
  );
}
