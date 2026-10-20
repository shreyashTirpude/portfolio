"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "@/lib/data/resume";

const SECTION_ITEMS = [
  { id: "about", label: "About", hint: "01 / evidence" },
  { id: "experience", label: "Career", hint: "02 / dated evidence" },
  { id: "work", label: "Systems", hint: "03 / selected work" },
  { id: "skills", label: "Stack", hint: "04 / capabilities" },
  { id: "showcase", label: "Method", hint: "05 / how I work" },
  { id: "faq", label: "FAQ", hint: "06 / before you ask" },
  { id: "contact", label: "Contact", hint: "07 / open to work" },
];

type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
  keepOpen?: boolean;
};

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<PaletteItem[]>(() => {
    const sections = SECTION_ITEMS.map((section) => ({
      id: `section-${section.id}`,
      label: `Go to ${section.label}`,
      hint: section.hint,
      keywords: `${section.label} ${section.id} ${section.hint}`,
      run: () => {
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${section.id}`);
      },
    }));
    const links = [
      { id: "github", label: "Open GitHub", href: contact.links.github, keywords: "github code source" },
      { id: "linkedin", label: "Open LinkedIn", href: contact.links.linkedin, keywords: "linkedin profile work" },
      { id: "hackerone", label: "Open HackerOne", href: contact.links.hackerone, keywords: "hackerone bounty researcher reports" },
    ].map((link) => ({
      id: `link-${link.id}`,
      label: link.label,
      hint: "external",
      keywords: link.keywords,
      run: () => window.open(link.href, "_blank", "noopener,noreferrer"),
    }));
    const actions: PaletteItem[] = [
      {
        id: "copy-email",
        label: copied ? "Email copied" : "Copy email address",
        hint: contact.email,
        keywords: `copy email contact ${contact.email}`,
        keepOpen: true,
        run: () => {
          void navigator.clipboard?.writeText(contact.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          });
        },
      },
      {
        id: "mail",
        label: "Write an email",
        hint: "mailto",
        keywords: "mail message contact write",
        run: () => {
          window.location.href = `mailto:${contact.email}`;
        },
      },
    ];
    return [...sections, ...actions, ...links];
  }, [copied]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.keywords.toLowerCase().includes(q) || item.label.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
    };
  }, []);

  const choose = (item: PaletteItem | undefined) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) onClose();
  };

  return (
    <div
      className="palette-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          value={query}
          placeholder="Jump to a section, link, or action…"
          aria-label="Search commands"
          aria-controls="palette-results"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              onClose();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => (results.length ? (index + 1) % results.length : 0));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              choose(results[active]);
            }
          }}
        />
        {results.length ? (
          <ul className="palette-list" id="palette-results" role="listbox" aria-label="Commands">
            {results.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  className={index === active ? "active" : undefined}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item)}
                >
                  {item.label}
                  <small>{item.hint}</small>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="palette-empty">No command matches “{query}”.</p>
        )}
        <div className="palette-foot">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <PaletteDialog onClose={onClose} />;
}
