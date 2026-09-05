"use client";

import { useEffect, type RefObject } from "react";

/** Magnetic pull on an element toward the cursor, with a springy return. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.18) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength * 1.4;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.transition = "transform 0.08s linear";
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        raf = 0;
      });
    };
    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(.22,1,.36,1)";
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ref, strength]);
}
