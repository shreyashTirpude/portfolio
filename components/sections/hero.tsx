"use client";

import { profile } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";

export default function Hero() {
  return (
    <section className="hero hero-v11" id="top">
      <div className="hero-forensic" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-kicker rv">
          <span>/ application security engineer · bug bounty researcher</span>
          <span className="hero-live">Available for security roles</span>
          <span>{profile.location}</span>
        </div>
        <h1 aria-label={profile.name} className="rv rv-d1">
          <LineReveal>Shreyash</LineReveal>
          <LineReveal delay={0.12} className="hero-outline">Tirpude</LineReveal>
        </h1>
        <div className="hero-bottom rv rv-d2">
          <div>
            <p className="hero-statement">
              <strong>I identify and validate security vulnerabilities.</strong> I document the
              impact and support effective remediation.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#work" aria-label="See selected work">View selected projects <span className="arr">→</span></a>
              <a className="hero-secondary" href="#contact">Contact me</a>
            </div>
          </div>
          <div className="hero-proof" aria-label="Career highlights">
            <div><strong>3+</strong><span>years bounty</span></div>
            <div><strong>2+</strong><span>years AppSec</span></div>
            <div><strong>100%</strong><span>responsible</span></div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span>scroll</span><span className="mouse" />
      </a>
    </section>
  );
}
