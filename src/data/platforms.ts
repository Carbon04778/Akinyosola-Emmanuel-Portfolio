export type Platform = {
  id: "claude-code" | "lovable" | "base44" | "replit";
  name: string;
  logo: string;
  /** What I build with it. */
  blurb: string;
  /** The role it plays in the stack. */
  role: string;
};

/**
 * The four AI build platforms shown in the 3D orbit. Claude Code leads —
 * it's the primary tool (inside VS Code), the others are situational.
 * VS Code itself is listed in the About "Tools" strip rather than here,
 * since it's the editor everything runs in, not a separate build platform.
 */
export const platforms: Platform[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    logo: "/logos/claude-code.webp",
    role: "Primary",
    blurb:
      "My main build environment, running inside VS Code. Real repos, real architecture, typed and tested code — AI speed without the AI mess.",
  },
  {
    id: "lovable",
    name: "Lovable",
    logo: "/logos/lovable.webp",
    role: "Full-stack MVPs",
    blurb:
      "Fast full-stack products with Supabase and Stripe wired in properly, and code you can export and own.",
  },
  {
    id: "base44",
    name: "Base44",
    logo: "/logos/base44.webp",
    role: "Fastest to working",
    blurb:
      "Zero-config apps for founders who need something real in front of users this week.",
  },
  {
    id: "replit",
    name: "Replit",
    logo: "/logos/replit.webp",
    role: "Any language",
    blurb:
      "When the backend isn't JavaScript, or the whole thing needs to run and deploy from the browser.",
  },
];
