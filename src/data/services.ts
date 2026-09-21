export type Service = {
  title: string;
  body: string;
  outcome: string;
  tier: "build" | "support";
};

export const services: Service[] = [
  /* ---- what I do most ---- */
  {
    title: "AI MVP Development",
    body: "Idea to a live, usable product in days. I pick the right platform — Claude Code, Lovable, Base44 or Replit — then wire up auth, database, payments and hosting properly.",
    outcome: "Something real to put in front of users and investors",
    tier: "build",
  },
  {
    title: "Full-Stack Web Apps",
    body: "SaaS products, dashboards, portals and internal tools built end-to-end with Next.js, React, TypeScript, Node and Supabase or Postgres. Real architecture underneath.",
    outcome: "A production app your users can actually rely on",
    tier: "build",
  },
  {
    title: "AI Features & Agents",
    body: "Chat, RAG over your own data, agents that triage, qualify, research and draft — built on the Claude and OpenAI APIs with proper guardrails and a clean human handoff.",
    outcome: "AI that does a real job inside your product",
    tier: "build",
  },
  {
    title: "Frontend Engineering",
    body: "Interfaces that are fast, accessible and responsive. Next.js, Tailwind and Motion, with the details — states, empty screens, loading, errors — actually designed.",
    outcome: "An interface that scores well and feels better",
    tier: "build",
  },
  {
    title: "API & Payments Integration",
    body: "Stripe, Supabase, Claude, OpenAI, webhooks and third-party APIs — connected, retried, logged and monitored so failures are loud, never silent.",
    outcome: "Integrations you stop thinking about",
    tier: "build",
  },
  {
    title: "UX/UI Design",
    body: "Websites, web apps and mobile apps designed end to end in Figma — flows, states, hierarchy and a small design system — then built on Base44, Lovable or in custom code with Claude Code.",
    outcome: "A Figma file you own, and a product that matches it",
    tier: "build",
  },

  /* ---- and when something's already built ---- */
  {
    title: "Fix a Broken AI-Built App",
    body: "An app generated on Lovable, Base44, Replit or Cursor that stopped working. I find the real root cause — broken auth, bad RLS, state loops, API calls that never fire — and fix it.",
    outcome: "A working app, and a note on what went wrong",
    tier: "support",
  },
  {
    title: "Vibe Code → Production",
    body: "Refactor generated code into something typed, tested and maintainable before it collapses under real users.",
    outcome: "A codebase another developer could pick up",
    tier: "support",
  },
  {
    title: "Workflow Automation",
    body: "n8n, Make, Zapier and custom scripts connecting the tools you already pay for — with AI in the loop where it earns its place.",
    outcome: "The manual step, deleted",
    tier: "support",
  },
  {
    title: "Deployment & Migration",
    body: "Vercel, Supabase, Railway, environments, CI, secrets. Or moving off a platform you've outgrown with your code and data intact.",
    outcome: "You own your product and your infrastructure",
    tier: "support",
  },
  {
    title: "Chatbots & Support Bots",
    body: "Support and sales bots grounded in your real content, with citations and a handoff to a human that actually works.",
    outcome: "Fewer repeat questions in your inbox",
    tier: "support",
  },
  {
    title: "Ongoing Development",
    body: "Retainer-style support after launch: new features, fixes, upgrades and monitoring, on Upwork or Fiverr so the paperwork is already handled.",
    outcome: "A developer who already knows your codebase",
    tier: "support",
  },
];
