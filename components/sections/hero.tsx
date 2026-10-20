"use client";

import { heroProof, profile } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";

const TOPOLOGY = [
  {
    code: "A",
    label: "map",
    nodes: [
      { title: "recon", meta: "S-01 · subdomains" },
      { title: "API surface", meta: "S-02 · endpoints" },
    ],
  },
  {
    code: "B",
    label: "validate",
    nodes: [
      { title: "auth flows", meta: "S-03 · oauth / jwt" },
      { title: "logic probes", meta: "S-04 · idor / ssrf", hot: true },
    ],
  },
  {
    code: "C",
    label: "prove",
    nodes: [
      { title: "exploit chain", meta: "S-05 · minimized" },
      { title: "impact", meta: "S-06 · business risk" },
    ],
  },
  {
    code: "D",
    label: "disclose",
    nodes: [
      { title: "report", meta: "S-07 · coordinated" },
      { title: "retest", meta: "S-08 · fix verified" },
    ],
  },
];

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero-kicker rv">
        <span className="live"><i aria-hidden="true" />{profile.status}</span>
        <span>{profile.location} — {profile.timezone}</span>
        <span>Application security · bug bounty</span>
      </div>

      <h1 aria-label={profile.name} className="rv rv-d1">
        <LineReveal className="l1">Shreyash</LineReveal>
        <LineReveal delay={0.1} className="l2">Tirpude</LineReveal>
      </h1>

      <div className="hero-body rv rv-d2">
        <div>
          <p className="hero-statement">
            I find and <u>prove</u> security vulnerabilities, then help fix them.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#work" aria-label="See selected work">
              View systems <span className="arr" aria-hidden="true">→</span>
            </a>
            <a className="link-mono" href="#contact">Get in touch <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <p className="hero-aside">
          <strong>Application security engineer &amp; independent researcher.</strong> Threat
          modeling, SAST/DAST, and secure-by-design at HERE Technology; 3+ years of web, mobile,
          and API research on HackerOne. Apple Hall of Fame 2024.
        </p>
      </div>

      <figure className="topology rv rv-d3">
        <div className="topo-head">
          <span>Attack surface · reference topology</span>
          <span>ST-024 / trace</span>
        </div>
        <div className="topo-grid">
          {TOPOLOGY.map((stage) => (
            <div className="stage" key={stage.code}>
              <div className="stage-label"><b>{stage.code}</b> {stage.label}</div>
              {stage.nodes.map((node) => (
                <div className={node.hot ? "node hot" : "node"} key={node.title}>
                  <strong>{node.title}</strong>
                  <span>{node.meta}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <figcaption className="topo-foot">
          <span><code>trace_8f3a</code> · map &gt; validate &gt; prove &gt; disclose</span>
          <span>simulated trace · illustrative timings · no client data</span>
        </figcaption>
      </figure>

      <div className="proof rv rv-d4" aria-label="Career highlights">
        {heroProof.map((item) => (
          <div key={item.label}>
            <i aria-hidden="true" />
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
