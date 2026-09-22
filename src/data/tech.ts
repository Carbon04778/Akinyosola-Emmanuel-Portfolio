/**
 * TECH I INTEGRATE — the logo strip under the platform orbit.
 *
 * Marks come from Simple Icons (CC0). Each SVG in public/tech/ has had its
 * brand fill swapped for `currentColor`, so the strip renders monochrome
 * and each mark picks up its real brand colour on hover.
 *
 * TO ADD ONE:
 *   curl -o public/tech/<slug>.svg https://cdn.simpleicons.org/<slug>
 *   then replace fill="#XXXXXX" with fill="currentColor" on the <svg> tag
 *   and add an entry below with the brand colour.
 *
 * Third-party trademarks, used descriptively to say what I build with.
 * Not an endorsement, and no brand is restyled.
 */
export type Tech = {
  name: string;
  /** File in public/tech/ (without .svg). */
  slug: string;
  /** Official brand colour — applied on hover. */
  color: string;
  /** Which row of the strip. */
  row: 1 | 2;
};

export const tech: Tech[] = [
  // ---- row 1: what products are built and paid with ----
  { name: "Next.js", slug: "nextdotjs", color: "#000000", row: 1 },
  { name: "React", slug: "react", color: "#61DAFB", row: 1 },
  { name: "TypeScript", slug: "typescript", color: "#3178C6", row: 1 },
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E", row: 1 },
  { name: "Astro", slug: "astro", color: "#BC52EE", row: 1 },
  { name: "Vite", slug: "vite", color: "#9135FF", row: 1 },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4", row: 1 },
  { name: "Supabase", slug: "supabase", color: "#3FCF8E", row: 1 },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1", row: 1 },
  { name: "Stripe", slug: "stripe", color: "#635BFF", row: 1 },
  { name: "Shopify", slug: "shopify", color: "#7AB55C", row: 1 },

  // ---- row 2: AI, automation, CMS, hosting & domains ----
  { name: "Claude API", slug: "anthropic", color: "#D97757", row: 2 },
  { name: "n8n", slug: "n8n", color: "#EA4B71", row: 2 },
  { name: "Calendly", slug: "calendly", color: "#006BFF", row: 2 },
  { name: "WordPress", slug: "wordpress", color: "#21759B", row: 2 },
  { name: "Squarespace", slug: "squarespace", color: "#000000", row: 2 },
  { name: "Vercel", slug: "vercel", color: "#000000", row: 2 },
  { name: "Cloudflare", slug: "cloudflare", color: "#F38020", row: 2 },
  { name: "Hostinger", slug: "hostinger", color: "#673DE6", row: 2 },
  { name: "GoDaddy", slug: "godaddy", color: "#1BDBDB", row: 2 },
  { name: "GitHub", slug: "github", color: "#181717", row: 2 },
  { name: "Figma", slug: "figma", color: "#F24E1E", row: 2 },
];

export const techRow1 = tech.filter((t) => t.row === 1);
export const techRow2 = tech.filter((t) => t.row === 2);
