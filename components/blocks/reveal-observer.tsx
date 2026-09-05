"use client";

import { useEffect } from "react";

/** Global in-view observer: adds `.in` to `.rv` / `.blurin` / `.lines` elements. Mount once in the app shell. */
export function useRevealObserver() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".rv, .blurin, .lines")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Small client component that runs the reveal observer once at the app root. */
export function RevealObserver() {
  useRevealObserver();
  return null;
}
