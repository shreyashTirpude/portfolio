"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "SHREYASH.";

/** Loader: letters rise, a counter runs 00→100, then the curtain lifts. */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("portfolio-intro-seen") === "true";
    if (reduce || seen) {
      const frame = requestAnimationFrame(() => setHidden(true));
      return () => cancelAnimationFrame(frame);
    }
    sessionStorage.setItem("portfolio-intro-seen", "true");
    let c = 0;
    const tick = setInterval(() => {
      c = Math.min(100, c + Math.floor(Math.random() * 12) + 6);
      setPct(c);
      if (barRef.current) barRef.current.style.width = `${c}%`;
      if (c >= 100) {
        clearInterval(tick);
        setTimeout(() => setDone(true), 160);
        setTimeout(() => setHidden(true), 850);
      }
    }, 42);
    const safety = setTimeout(() => {
      clearInterval(tick);
      setDone(true);
      setTimeout(() => setHidden(true), 700);
    }, 1800);
    return () => {
      clearInterval(tick);
      clearTimeout(safety);
    };
  }, []);

  if (hidden) return null;

  return (
    <div id="preloader" className={done ? "done" : ""} aria-hidden="true">
      <div className="pl-word">
        {NAME.split("").map((ch, i) => (
          <span key={i} className={ch === "." ? "ch accent" : "ch"}>
            {ch}
          </span>
        ))}
      </div>
      <div className="pl-count">{String(pct).padStart(2, "0")}</div>
      <div className="pl-bar" ref={barRef} />
    </div>
  );
}
