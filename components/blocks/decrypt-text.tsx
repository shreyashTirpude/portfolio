"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&01@";

/** Decrypts gibberish into the final text on load (security motif). */
export function DecryptText({ text, delay = 1500 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = text;
      return;
    }
    let cancelled = false;
    const run = () => {
      const frames = Math.max(6, Math.min(16, Math.round(text.length / 2)));
      let f = 0;
      const frame = () => {
        if (cancelled) return;
        if (f >= frames) {
          el.textContent = text;
          return;
        }
        f++;
        const resolved = Math.floor(text.length * (f / frames));
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") out += " ";
          else if (i < resolved) out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.textContent = out;
        setTimeout(frame, 20);
      };
      frame();
    };
    const t = setTimeout(run, delay);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className="decrypt" aria-label={text}>
      {text}
    </span>
  );
}
