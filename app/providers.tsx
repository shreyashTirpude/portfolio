"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

/** Smooth ease-out quart — responsive feel without overshoot */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 0.9,
        easing: easeOutQuart,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.8,
      }}
    >
      {children}
    </ReactLenis>
  );
}
