// Single source of truth for all portfolio content.
// Every claim here is drawn from the verified resume facts.

export const profile = {
  name: "Shreyash Tirpude",
  role: "Application Security Engineer",
  altRole: "Bug Bounty Researcher",
  tagline: "I find and prove security vulnerabilities, then help fix them.",
  heroTag: "Application security engineer — I find and prove vulnerabilities, then help fix them",
  statement:
    "Application security engineer & independent researcher — Apple Hall of Fame 2024 · Bentley reward · 3 yrs industry",
  location: "Mumbai, India",
  timezone: "IST · UTC+5:30",
  email: "tshreyash2002@gmail.com",
  phone: "+91 93568 80446",
  status: "Available for security roles",
  summary:
    "Security-focused software engineer with 2+ years in industry (HERE Technology) and 3+ years in bug bounty. I find and prove vulnerabilities, then help fix them.",
  summary2:
    "Apple Hall of Fame 2024, Bentley Systems reward, and a steady stream of valid reports. OWASP Top 10 / ASVS, SAST/DAST, Burp Suite, AWS security.",
  aboutFootnote: "// currently hunting on bug bounty platforms · code on GitHub",
  decryptLine: "access granted — 0x hall-of-fame 2024",
};

export const socials = {
  github: { label: "github", href: "https://github.com/shreyashTirpude" },
  linkedin: { label: "linkedin", href: "https://www.linkedin.com/in/shreyash-tirpude-7782a31b4/" },
  email: { label: "email", href: "mailto:tshreyash2002@gmail.com" },
  hackerone: { label: "hackerone", href: "https://hackerone.com/shreyashcipher?type=user" },
};

export const heroProof = [
  { value: "3+", label: "years bug bounty", note: "hackerone, 2022 → now" },
  { value: "2+", label: "years appsec", note: "here technology, 2024 →" },
  { value: "100%", label: "responsible", note: "coordinated disclosure" },
  { value: "2024", label: "apple hall of fame", note: "bentley systems reward" },
];

export const stats = [
  { value: 3, suffix: "+", label: "years bug bounty" },
  { value: 2, suffix: "+", label: "years industry appsec" },
  { value: 5, suffix: "", label: "programs / advisories" },
  { value: 100, suffix: "%", label: "responsible disclosure" },
];

export const aboutFacts = [
  ["Role", "Application security eng."],
  ["Awards", "Apple HOF · Bentley"],
  ["Platform", "HackerOne"],
  ["Education", "B.Tech · comp eng minor"],
  ["Base", "Mumbai, India"],
];

export const awards = [
  { org: "Apple", label: "hall of fame 2024" },
  { org: "Bentley", label: "systems reward" },
  { org: "HackerOne", label: "researcher" },
  { org: "OWASP", label: "top 10 / ASVS" },
];

export type AuditEntry = {
  date: string;
  role: string;
  org: string;
  desc: string;
  refs: string[];
  dim?: boolean;
  caption?: string;
};

export const audit: AuditEntry[] = [
  {
    date: "2024 → now",
    role: "Software Engineer II — Security & AI",
    org: "HERE Technology · Mumbai",
    desc: "Embedded security in the SDLC: threat modeling, code review, and SAST/DAST pipelines against OWASP Top 10 and ASVS. Secure-by-design work at the security + AI intersection.",
    refs: ["threat modeling", "sast · dast", "owasp · asvs"],
    caption: "current",
  },
  {
    date: "2022 → now",
    role: "Independent Security Researcher",
    org: "HackerOne · Apple · Bentley Systems",
    desc: "3+ years of bug bounty across web, mobile, and API programs. Apple Hall of Fame 2024, Bentley Systems reward. Burp Suite, reconnaissance, and OWASP Top 10 exploitation.",
    refs: ["apple hof 2024", "bentley reward", "web · mobile · api"],
    caption: "research",
  },
  {
    date: "2020 → 2024",
    role: "B.Tech, Electronics Engineering",
    org: "Sardar Patel Institute of Technology · minor: computer engineering",
    desc: "Founded the security focus here — first CTFs, first disclosures, the shift into bug bounty.",
    refs: ["ctf", "disclosure"],
    dim: true,
    caption: "education",
  },
];

export type CaseStudy = {
  no: string;
  name: string;
  desc: string;
  tags: string[];
  link: string;
  linkLabel: string;
  visual: "terminal" | "pipeline" | "route";
  feature?: boolean;
  results: { k: string; v: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    no: "S-01 / research · 3+ years",
    name: "Independent vulnerability research",
    desc: "Web, mobile and API programs on HackerOne. Recon, exploit validation, a minimized proof-of-concept, coordinated disclosure, and retest after remediation.",
    tags: ["Burp Suite", "OWASP Top 10", "Recon", "Disclosure"],
    link: "https://hackerone.com/shreyashcipher?type=user",
    linkLabel: "View researcher profile",
    visual: "terminal",
    results: [
      { k: "Recognition", v: "Apple Hall of Fame 2024" },
      { k: "Programs", v: "Web · mobile · API" },
      { k: "Disclosure", v: "Coordinated, 100%" },
    ],
  },
  {
    no: "S-02 / elastic hackathon · top 5",
    name: "Legalese-to-Simplese",
    desc: "Legal text simplification tool. A search-driven pipeline over legal documents that turns dense clauses into plain-language explanations. Top 5 at Elastic Hackathon.",
    tags: ["Elastic", "NLP", "Hackathon"],
    link: "https://github.com/shreyashTirpude/legalese-to-simplese",
    linkLabel: "Read the case",
    visual: "pipeline",
    feature: true,
    results: [
      { k: "Result", v: "Top 5, Elastic Hackathon" },
      { k: "Pipeline", v: "Ingest → retrieve → simplify" },
      { k: "Output", v: "Plain-language clauses" },
    ],
  },
  {
    no: "S-03 / amazon smbhav · top 20",
    name: "BorderlessBiz",
    desc: "Cross-border business platform that helps small businesses sell globally. Product, full-stack implementation, and commerce flows. Top 20 at Amazon Smbhav.",
    tags: ["Amazon Smbhav", "Product", "Full-stack"],
    link: "https://github.com/shreyashTirpude",
    linkLabel: "View GitHub profile",
    visual: "route",
    results: [
      { k: "Result", v: "Top 20, Amazon Smbhav" },
      { k: "Scope", v: "Cross-border commerce" },
      { k: "Build", v: "Full-stack product" },
    ],
  },
];

export type SkillGroup = {
  group: string;
  skills: string[];
  script: string;
  desc: string;
  no: string;
};

export const skillGroups: SkillGroup[] = [
  {
    group: "AppSec & Pentesting",
    no: "01 / offensive + defensive",
    script: "Offensive + defensive",
    desc: "OWASP Top 10, ASVS, Burp Suite, reconnaissance, and reproducible reports — across web, mobile, and API.",
    skills: ["OWASP", "ASVS", "Burp Suite", "Recon"],
  },
  {
    group: "Secure SDLC",
    no: "02 / shift-left",
    script: "Shift-left, not afterthought",
    desc: "Threat modeling, code review, and SAST/DAST pipelines — security embedded from design to deploy.",
    skills: ["SAST", "DAST", "Threat Modeling", "Code Review"],
  },
  {
    group: "Cloud Security",
    no: "03 / hardened by default",
    script: "Hardened by default",
    desc: "AWS-native hardening — IAM least-privilege, KMS, CloudTrail, and GuardDuty detection.",
    skills: ["IAM", "KMS", "CloudTrail", "GuardDuty"],
  },
  {
    group: "Protocols & Auth",
    no: "04 / auth that holds up",
    script: "Auth that holds up",
    desc: "Auth flows and the attacks that break them — OAuth 2.0, OIDC, JWT, IDOR, and SSRF.",
    skills: ["OAuth 2.0", "OIDC", "JWT", "SSRF", "IDOR"],
  },
  {
    group: "Languages & automation",
    no: "05 / ship it all",
    script: "Ship it all",
    desc: "Python, JS/TS, Go, Bash — scripting recon and exploits, then shipping Docker-ised tooling around them.",
    skills: ["Python", "JS / TS", "Go", "Bash", "Docker"],
  },
];

export const stackNotes = [
  { k: "reading / writing", v: "reports, advisories, and remediation guidance" },
  { k: "tooling", v: "burp extensions, recon scripts, docker images" },
  { k: "standards", v: "owasp top 10 · asvs · cvss scoring" },
];

export const method = [
  {
    no: "01 / recon",
    title: "Map the attack surface.",
    body: "Every engagement starts with mapping what you expose — subdomains, APIs, forgotten endpoints. Attack surface you can't see, you can't defend.",
  },
  {
    no: "02 / exploit",
    title: "Exploit, with proof.",
    body: 'Not just "this looks wrong" — a reproducible chain, minimized impact, and the business risk spelled out in plain English.',
  },
  {
    no: "03 / disclose",
    title: "Report, and fix it.",
    body: "Coordinated disclosure only. I stay through remediation — retest, verify, and make sure the fix actually holds.",
  },
];

export const nav = [
  { num: "01", label: "about", href: "#about" },
  { num: "02", label: "career", href: "#experience" },
  { num: "03", label: "systems", href: "#work" },
  { num: "04", label: "stack", href: "#skills" },
  { num: "05", label: "method", href: "#showcase" },
  { num: "06", label: "contact", href: "#contact" },
];

export const contact = {
  email: "tshreyash2002@gmail.com",
  phone: "+91 93568 80446",
  location: "Mumbai, India",
  timezone: "IST · UTC+5:30",
  note: "// open to security roles and engineering collaboration",
  links: {
    github: "https://github.com/shreyashTirpude",
    linkedin: "https://www.linkedin.com/in/shreyash-tirpude-7782a31b4/",
    hackerone: "https://hackerone.com/shreyashcipher?type=user",
  },
};
