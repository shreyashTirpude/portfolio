"use client";

import { useEffect } from "react";

/** Global ambient layer: hairline grid, vignette, grain, scroll-progress bar. */
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
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
