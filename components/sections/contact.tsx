"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/data/resume";
import { MagneticButton } from "@/components/blocks/magnetic-button";

const META = [
  { k: "Base", v: contact.location },
  { k: "Local time", v: contact.timezone },
  { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
  { k: "Phone", v: contact.phone, href: `tel:${contact.phone.replace(/[\s-]/g, "")}` },
  { k: "GitHub", v: "shreyashTirpude", href: contact.links.github, external: true },
  { k: "LinkedIn", v: "shreyash-tirpude", href: contact.links.linkedin, external: true },
];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="contact-form rv">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
      <div className="form-head">
        <h3>Send a note</h3>
        <p>{"// opens your mail client prefilled"}</p>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="v12-name">Name</label>
          <input id="v12-name" name="name" type="text" required placeholder="Ada Lovelace" />
        </div>
        <div className="form-field">
          <label htmlFor="v12-email">Email</label>
          <input id="v12-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="form-field full">
          <label htmlFor="v12-msg">Message</label>
          <textarea id="v12-msg" name="message" rows={4} required placeholder="Scope, role, or the bug you want a second pair of eyes on." />
        </div>
      </div>
      <div className="form-foot">
        <MagneticButton>
          Send message <span className="arr" aria-hidden="true">→</span>
        </MagneticButton>
        <p className={`form-note ${sent ? "ok" : ""}`} role="status" aria-live="polite">
          {sent ? "// opening your mail client…" : "// no tracking, no third-party form service"}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard?.writeText(contact.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="sec-meta">
          <b>[07]</b>
          <i className="rule" aria-hidden="true" />
          <span>contact · open to work</span>
        </div>

        <h2 className="contact-statement rv">
          Building something that needs a <em>security engineer?</em>
        </h2>

        <div className="contact-body">
          <div className="rv rv-d1">
            <p className="contact-lead">
              <strong>AppSec roles, bounty collaborations, or product security reviews.</strong> My
              inbox is open — send the scope and I&apos;ll tell you how I&apos;d approach it.
            </p>
            <div className="contact-actions">
              <button className="copy-mail" type="button" onClick={copyEmail}>
                {contact.email} <span aria-hidden="true">{copied ? "copied" : "copy"}</span>
              </button>
              <a className="link-mono" href={`mailto:${contact.email}`}>
                Open mail <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <dl className="contact-meta rv rv-d2">
            {META.map((row) => (
              <div key={row.k}>
                <dt>{row.k}</dt>
                <dd>
                  {row.href ? (
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {row.v}
                    </a>
                  ) : row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
