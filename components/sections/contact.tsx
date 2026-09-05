"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";
import { MagneticButton } from "@/components/blocks/magnetic-button";

const ROWS = [
  { label: "email", value: contact.email, href: `mailto:${contact.email}`, external: false },
  {
    label: "phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[\s-]/g, "")}`,
    external: false,
  },
  { label: "location", value: contact.location, href: undefined, external: false },
  { label: "github", value: "shreyashTirpude", href: contact.links.github, external: true },
  { label: "linkedin", value: "shreyash-tirpude", href: contact.links.linkedin, external: true },
  { label: "hackerone", value: "shreyashcipher", href: contact.links.hackerone, external: true },
] as const;

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
    <form onSubmit={onSubmit} className="form-card rv rv-d1">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        aria-hidden="true"
      />
      <div className="form-field">
        <label htmlFor="v8-name">Name</label>
        <input id="v8-name" name="name" type="text" required placeholder="Ada Lovelace" />
      </div>
      <div className="form-field">
        <label htmlFor="v8-email">Email</label>
        <input id="v8-email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor="v8-msg">Message</label>
        <textarea id="v8-msg" name="message" rows={4} required placeholder="Found a bug? Let's talk." />
      </div>
      <MagneticButton>
        Send message <span className="arr">→</span>
      </MagneticButton>
      {sent ? (
        <p role="status" aria-live="polite" className="mono" style={{ marginTop: "0.9rem", fontSize: "0.75rem", color: "var(--accent-bright)" }}>
          {"// opening your mail client…"}
        </p>
      ) : (
        <p className="mono" style={{ marginTop: "0.9rem", fontSize: "0.75rem", color: "var(--muted2)" }}>
          {"// opens your mail client with the message prefilled"}
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow rv">07 · contact</div>
          <h2 className="section-title rv rv-d1">
            <LineReveal>
              Let&apos;s <span className="serif">work together.</span>
            </LineReveal>
          </h2>
          <p className="rv rv-d2" style={{ color: "var(--muted)", marginTop: "1rem", maxWidth: "48ch" }}>
            AppSec roles, bounty collabs, or just to talk shop — my inbox is open.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-list rv">
            {ROWS.map((row) => (
              <div className="contact-row" key={row.label}>
                <span className="k">{row.label}</span>
                {row.href ? (
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className="v">{row.value}</span>
                )}
              </div>
            ))}
            <p className="pgp-note">{contact.note}</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
