"use client";

import { useState } from "react";
import { LineReveal } from "@/components/blocks/line-reveal";

const FAQS = [
  {
    q: "What kind of roles are you open to?",
    a: "Application security engineer roles, bug bounty collaborations, and security consulting. Also open to speaking or writing on AppSec topics.",
  },
  {
    q: "How do you approach responsible disclosure?",
    a: "Coordinated disclosure only: reproduce, minimize impact, document, and report through the vendor's program. 100% of my reports have been handled responsibly.",
  },
  {
    q: "How can we discuss a security or engineering project?",
    a: "Email or LinkedIn works well for roles, product security reviews, research collaboration, and technical discussions.",
  },
  {
    q: "Can you help secure an existing product?",
    a: "Absolutely. Threat modeling, code review, SAST/DAST pipeline setup, and AWS security hardening — from assessment to remediation.",
  },
  {
    q: "Where can I verify your claims?",
    a: "Apple Hall of Fame 2024 (public), HackerOne profile, Bentley Systems reward, GitHub, and LinkedIn — all linked in the contact section.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow rv">06 · faq</div>
          <h2 className="section-title rv rv-d1">
            <LineReveal>
              Common <span className="serif">questions.</span>
            </LineReveal>
          </h2>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className={`faq-item rv ${isOpen ? "open" : ""}`}>
                <button
                  id={`faq-trigger-${i}`}
                  className="faq-q"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="faq-a"
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="in">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
