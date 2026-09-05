"use client";

import { useRef, type ReactNode } from "react";
import { useMagnetic } from "@/components/blocks/use-magnetic";

export function MagneticButton({
  children,
  className = "btn",
  strength = 0.18,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, strength);
  return (
    <button ref={ref} type="submit" className={className}>
      {children}
    </button>
  );
}
