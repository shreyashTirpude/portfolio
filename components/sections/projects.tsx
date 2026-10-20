import type { ReactNode } from "react";
import { caseStudies, type CaseStudy } from "@/lib/data/resume";

function TerminalVisual() {
  return (
    <>
      <span className="viz-label">Scan trace / disclosure</span>
      <div className="scan" aria-hidden="true" />
      <div className="viz-window">
        <div className="viz-bar" aria-hidden="true"><i /><i /><i /></div>
        <div className="viz-body">
          <span className="dim">$</span> map surface --scope target{"\n"}
          <span className="dim">↳</span> 148 hosts · 62 endpoints{"\n"}
          <span className="dim">$</span> validate --auth-flow{"\n"}
          <span className="hl">! idor confirmed</span> · object ref{"\n"}
          <span className="dim">$</span> minimize --impact{"\n"}
          <span className="dim">↳</span> poc + business risk{"\n"}
          <span className="ok">✓ reported</span> · coordinated{"\n"}
          <span className="ok">✓ retest</span> · fix verified
        </div>
      </div>
    </>
  );
}

function PipelineVisual() {
  return (
    <>
      <span className="viz-label">Document pipeline</span>
      <div className="pipe">
        <div className="pipe-node"><b>legal document</b><span>pdf · clauses</span></div>
        <div className="pipe-arrow" aria-hidden="true">↓</div>
        <div className="pipe-grid">
          <div className="pipe-node"><b>extract</b><span>elastic</span></div>
          <div className="pipe-node"><b>retrieve</b><span>search</span></div>
        </div>
        <div className="pipe-arrow" aria-hidden="true">↓</div>
        <div className="pipe-node wide"><b>simplify</b><span>plain-language output</span></div>
        <div className="pipe-arrow" aria-hidden="true">↓</div>
        <div className="pipe-node wide"><b>complexity reduced</b><span>status / verified</span></div>
      </div>
    </>
  );
}

function RouteVisual() {
  return (
    <>
      <span className="viz-label">Commerce route</span>
      <div className="pipe">
        <div className="pipe-node"><b>seller</b><span>local business</span></div>
        <div className="pipe-arrow" aria-hidden="true">↓</div>
        <div className="pipe-grid">
          <div className="pipe-node"><b>catalog</b><span>product data</span></div>
          <div className="pipe-node"><b>payments</b><span>cross-border</span></div>
        </div>
        <div className="pipe-arrow" aria-hidden="true">↓</div>
        <div className="pipe-node wide"><b>buyer</b><span>global market</span></div>
      </div>
    </>
  );
}

const VISUALS: Record<CaseStudy["visual"], () => ReactNode> = {
  terminal: TerminalVisual,
  pipeline: PipelineVisual,
  route: RouteVisual,
};

export default function Projects() {
  return (
    <section id="work">
      <div className="container">
        <div className="sec-meta">
          <b>[03]</b>
          <i className="rule" aria-hidden="true" />
          <span>systems · selected work</span>
        </div>

        <div className="systems-head">
          <div className="sec-head">
            <h2 className="rv">Systems and research outcomes.</h2>
          </div>
          <p className="rv rv-d1">
            Each entry states the problem, the approach, the methods used, and what came out of it.
          </p>
        </div>

        <div className="case-list">
          {caseStudies.map((study, index) => {
            const Visual = VISUALS[study.visual];
            const classes = [
              "case",
              index % 2 === 1 ? "reverse" : "",
              study.feature ? "feature" : "",
            ].filter(Boolean).join(" ");
            return (
              <article className={classes} key={study.name}>
                <div className="case-copy rv">
                  <div>
                    <div className="case-no">{study.no}</div>
                    <h3>{study.name}</h3>
                    <p>{study.desc}</p>
                    <div className="tags">
                      {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <dl className="case-result">
                      {study.results.map((result) => (
                        <div key={result.k}>
                          <dt>{result.k}</dt>
                          <dd>{result.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <a className="case-link" href={study.link} target="_blank" rel="noopener noreferrer">
                    {study.linkLabel} <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="case-visual-shell rv">
                  <div className="case-visual" aria-hidden="true">
                    <Visual />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
