"use client";

import { useEffect } from "react";

/** Global ambient layer: lightweight wave field, vignette, grain, scroll-progress bar. */
export function AmbientFX() {
  useEffect(() => {
    const bar = document.getElementById("scrollBar");
    if (!bar) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const y = h.scrollTop;
        bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="scrollBar" aria-hidden="true" />
      <div className="bg-scene" aria-hidden="true">
        <div className="grid-field" />
        <svg className="wave-field" viewBox="0 0 1440 900" preserveAspectRatio="none">
          {Array.from({ length: 9 }, (_, index) => (
            <path
              key={index}
              d="M-180 560 C 120 390, 320 760, 610 570 S 1080 380, 1620 590"
              transform={`translate(0 ${index * 34})`}
            />
          ))}
        </svg>
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
