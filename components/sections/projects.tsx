"use client";

import { projects } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";

export default function Projects() {
  return (
    <section id="work" className="projects-v11">
      <span className="chapter-number" aria-hidden="true">03</span>
      <div className="container">
        <div className="project-heading">
          <div>
            <div className="eyebrow rv">03 · selected projects</div>
            <h2 className="section-title v11-title rv rv-d1">
              <LineReveal>Engineering projects</LineReveal>
              <LineReveal delay={0.1}><span className="serif">and outcomes.</span></LineReveal>
            </h2>
          </div>
          <p className="rv rv-d2">Each project presents the problem, implementation approach, technologies, and result.</p>
        </div>
        <div className="case-list">
          {projects.map((project, index) => (
            <article className={`case-study ${index % 2 ? "reverse" : ""}`} key={project.name}>
              <div className="case-copy rv">
                <div>
                  <span className="case-no">0{index + 1} / {index === 0 ? "ELASTIC HACKATHON · TOP 5" : "AMAZON SMBHAV · TOP 20"}</span>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">{index === 0 ? "Open repository" : "View GitHub profile"}<i>↗</i></a>
              </div>
              <div className={`case-visual rv ${index === 0 ? "terminal-visual" : "globe-visual"}`} aria-hidden="true">
                <span className="scan-label">Scanning evidence</span>
                {index === 0 ? (
                  <div className="case-terminal"><div className="terminal-lights"><i /><i /><i /></div><code>$ ingest legal_document.pdf<br />$ map clauses --plain-language</code><strong>Complexity reduced.</strong><p>INPUT / dense legal clause<br />OUTPUT / clear human explanation<br />STATUS / VERIFIED</p></div>
                ) : <div className="case-globe"><i /></div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
