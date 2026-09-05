"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";

const WIDE_INDEX = 4;

/** A restrained border spotlight follows fine pointers without implying clickability. */
function useSpotlightTilt() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-spot]"));
    const handles: { card: HTMLElement; move: (e: PointerEvent) => void; leave: () => void }[] = [];
    cards.forEach((card) => {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      };
      const leave = () => {
        card.style.removeProperty("--gx");
        card.style.removeProperty("--gy");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      handles.push({ card, move, leave });
    });
    return () => {
      handles.forEach(({ card, move, leave }) => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    };
  }, []);
}

function SkillCard({ group, index }: { group: (typeof skillGroups)[number]; index: number }) {
  const isWide = index === WIDE_INDEX;
  return (
    <article
      className={`skill-card ${isWide ? "wide" : ""} rv ${index % 2 === 1 ? "rv-d1" : ""}`}
      data-spot
    >
      <div>
        <div className="s-no">{group.no}</div>
        <h3>{group.group}</h3>
        <p className="s-desc">{group.desc}</p>
        <div className="chips">
          {group.skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {isWide ? (
        <div className="s-icon" aria-hidden="true">
          ship it all →
        </div>
      ) : null}
    </article>
  );
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  useSpotlightTilt();
  void gridRef;
  return (
    <section id="skills">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow rv">04 · toolbox</div>
          <h2 className="section-title rv rv-d1">
            <LineReveal>
              The <span className="serif">toolbox.</span>
            </LineReveal>{" "}
            <LineReveal delay={0.1}>Everything I ship with.</LineReveal>
          </h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.group} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
