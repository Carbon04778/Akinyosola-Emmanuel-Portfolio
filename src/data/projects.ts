export type Category = "Business Website" | "Nonprofit" | "Web App";

export type Project = {
  slug: string;
  title: string;
  /** One line. What it is, who it's for. */
  summary: string;
  category: Category;
  /** Platform it was built on (Claude Code, Lovable, Base44, Replit…). Shown as a chip. */
  platform?: string;
  year: number;
  tags: string[];
  challenge: string;
  solution: string;
  results: string[];
  /** Two hex stops used for the placeholder cover when there's no image. */
  cover: [string, string];
  /** Cover image in public/projects/ — 1200×750 (16:10) WebP. */
  image?: string;
  /** Set true for the three shown on the home page. */
  featured?: boolean;
  /** Live site — shows a "Visit live site" button on the case study when set. */
  liveUrl?: string;
};

/* ------------------------------------------------------------------
   REAL PROJECTS. Covers are live screenshots taken 2026-09-21.
   The home showcase, /portfolio grid, filters, search and the
   case-study pages all read from this one array.

   Platforms are inferred from hosting + build fingerprints (five sites on
   Vercel with Astro/Vite/React builds = the Claude Code → Vercel workflow;
   Ebmeyer is a static build on the client's Apache host; MIXX carries the
   Lovable badge). `results` describe what is verifiably live — add real
   numbers (bookings, donations, traffic) whenever you have them.
------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    slug: "k9-claw",
    title: "K9 Claw",
    summary:
      "A product launch site for a motorized pooper scooper — hand-coded in Next.js with Shopify checkout, hero-to-purchase in one scroll.",
    category: "Business Website",
    platform: "VS Code",
    year: 2026,
    tags: ["Hand-coded", "Next.js", "React", "Shopify checkout", "Product launch", "Vercel"],
    challenge:
      "A physical product with one job — sell — needed a landing page that explains the benefit in a sentence, answers the six objections a buyer has (hygiene, back strain, ease, portability, eco, durability), shows it in action, and hands off to checkout without friction.",
    solution:
      "Written by hand in VS Code, no builder: a Next.js site with an editorial serif identity, a benefit-led hero, a six-point 'Why K9 Claw' grid, product features, an 'In Action' walkthrough, and a persistent 'Get K9 Claw' call to action that links straight into Shopify checkout. Deployed on Vercel.",
    results: [
      "Hero to Shopify checkout in one click from every section",
      "Six buyer objections answered above the fold",
      "Deployed on Vercel · getk9claw.com",
    ],
    cover: ["#1c1917", "#a8a29e"],
    image: "/projects/k9-claw.webp",
    liveUrl: "https://www.getk9claw.com/",
  },
  {
    slug: "eustress-and-demeter",
    title: "Eustress & Demeter",
    summary:
      "A full-service restaurant consulting and franchise development firm — six service lines, a methodology, a client roster and a qualifying contact form.",
    category: "Business Website",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "Multi-page", "Lead qualification", "SEO", "CDN images", "Vercel"],
    challenge:
      "A consultancy with 100+ restaurant engagements behind it needed a site that sells expertise, not a template: six distinct services, a three-phase engagement model, a readiness diagnostic, a methodology and playbook, and a client roster of 60+ brands — all without feeling like a brochure.",
    solution:
      "Designed an editorial, authoritative layout with a service mega-menu, dedicated pages for methodology and playbook, a clients section, an FAQ, and a contact form that qualifies leads by brand stage and objective before anyone gets on a call. Optimised images are served from a CDN so the long pages stay fast.",
    results: [
      "Six service lines, methodology and playbook — all live",
      "Contact form qualifies leads by brand stage before the first call",
      "Deployed on Vercel · eustressanddemeter.com",
    ],
    cover: ["#1c1917", "#ff7a00"],
    image: "/projects/eustress-and-demeter.webp",
    liveUrl: "https://www.eustressanddemeter.com/",
    featured: true,
  },
  {
    slug: "art-future-club",
    title: "Art Future Club",
    summary:
      "A global contemporary-art community platform with city chapters, artist and gallery directories, events, open calls, an editorial section and member sign-in.",
    category: "Web App",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "React", "Vite", "Auth", "Directories", "Events", "Maps", "Vercel"],
    challenge:
      "The club needed more than a website: a network across Hong Kong, London, New York, Los Angeles, Bangkok, Milano, Toronto and Zurich, each with its own chapter page, local exhibitions, upcoming gatherings, artist spotlights, and a member area — with a bold editorial identity to match the art world.",
    solution:
      "Built as a client-side React app: chapter portals with live \"local pulse\" details, artist / gallery / venue directories, an events calendar, open calls, an editorial section, a map, and sign-in for members. The typography-led design gives each chapter its own colour and voice while the navigation stays consistent.",
    results: [
      "Eight city chapters on one platform",
      "Artist, gallery and venue directories, events, open calls, editorial and member sign-in",
      "Deployed on Vercel · artfutureclub.com",
    ],
    cover: ["#0a0a0a", "#ff7a00"],
    image: "/projects/art-future-club.webp",
    liveUrl: "https://www.artfutureclub.com/",
    featured: true,
  },
  {
    slug: "lead-futures-foundation",
    title: "LEAD Futures Foundation",
    summary:
      "A San Diego 501(c)(3) nonprofit site — four programs, events, impact, ways to get involved and online donations.",
    category: "Nonprofit",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "Nonprofit", "Givebutter", "Programs", "Storytelling", "Vercel"],
    challenge:
      "The foundation runs four programs under the letters L-E-A-D (Women in Tech scholarships, EVOKicks, LEAD Connect mentoring, Life Skills) and needed one site that explains the framework, moves people emotionally, and converts them into donors, mentors and volunteers.",
    solution:
      "Designed a warm, photography-led site around the LEAD framework: a hero with the mission, a scrolling values ticker, a four-doorway programs section, a featured-program story, events, impact and get-involved paths. Donations run through Givebutter so the team never touches card data.",
    results: [
      "Four programs presented as one clear LEAD framework",
      "Donate, mentor and volunteer paths live from day one",
      "Deployed on Vercel · leadfuturesfoundation.org",
    ],
    cover: ["#3f2a14", "#ff7a00"],
    image: "/projects/lead-futures-foundation.webp",
    liveUrl: "https://www.leadfuturesfoundation.org/",
    featured: true,
  },
  {
    slug: "evokicks",
    title: "EVOKicks",
    summary:
      "A program site for LEAD Futures: nominate a school, see how it works, sponsor or donate — new shoes and mentorship for 8th graders.",
    category: "Nonprofit",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "Vite", "Nonprofit", "Nomination form", "Givebutter", "Vercel"],
    challenge:
      "EVOKicks needed its own identity separate from the parent foundation — a single-purpose campaign site that explains the idea in seconds, lets schools nominate themselves, and turns sponsors and donors into supporters without friction.",
    solution:
      "A bold, high-contrast one-page campaign site with a clear narrative (mission → how it works → get involved → impact), a school nomination flow, sponsor tiers and Givebutter donations, built as a fast Vite app that loads instantly on the phones most visitors use.",
    results: [
      "School nomination and sponsor flows live",
      "Card-free donations through Givebutter",
      "Deployed on Vercel · evokicks.org",
    ],
    cover: ["#071d49", "#2563eb"],
    image: "/projects/evokicks.webp",
    liveUrl: "https://www.evokicks.org/",
  },
  {
    slug: "starting-point-consulting",
    title: "Starting Point Consulting",
    summary:
      "Nervous-system education and resilience programs for individuals, healthcare teams and first responders — with Calendly booking and HIPAA-aware policies.",
    category: "Business Website",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "Astro", "Calendly", "Newsletter", "Accessibility", "Vercel"],
    challenge:
      "A practice serving very different audiences — individuals, therapists, educators, healthcare teams, first responders and leadership teams — needed a site that speaks to each without fragmenting, books discovery calls, and meets the policy bar of healthcare work (privacy, HIPAA, accessibility, non-discrimination).",
    solution:
      "Built on Astro for fast, mostly-static pages: Services, Speaking, Starting Points, About and Contact, an audience-aware contact form, Calendly for organisational discovery calls, a newsletter signup, and a full policy set. Calm, science-meets-humanity design with generous whitespace.",
    results: [
      "Audience-specific paths for six client types",
      "Calendly discovery calls and newsletter wired in",
      "Full privacy, HIPAA, accessibility and non-discrimination policies",
    ],
    cover: ["#fef3c7", "#b45309"],
    image: "/projects/starting-point-consulting.webp",
    liveUrl: "https://www.startingpointconsulting.com/",
  },
  {
    slug: "ebmeyer-consulting",
    title: "Ebmeyer Consulting",
    summary:
      "A bilingual (EN / DE) site for a Swiss AI strategy & enablement consultancy — two programmes, credentials and a 30-minute intro-call booking.",
    category: "Business Website",
    platform: "Claude Code",
    year: 2026,
    tags: ["Claude Code", "Bilingual EN/DE", "i18n routing", "Booking", "Static hosting"],
    challenge:
      "A consultant who builds AI assistants for entrepreneurs and founders needed a site that makes two structured programmes (4–6 weeks and 12 weeks) instantly understandable, works equally well in English and German, and gets prospects onto a free intro call.",
    solution:
      "Designed a premium editorial layout with a language switch (EN/DE routes), a programme comparison with phases and durations, proof points (21+ years, 50+ assistants built), an About section and a single conversion action — Book a call — repeated where it matters.",
    results: [
      "Complete English and German versions on /en and /de",
      "Two programmes explained phase by phase with durations",
      "Delivered as a static build on the client's own Swiss hosting",
    ],
    cover: ["#1e1b4b", "#e11d48"],
    image: "/projects/ebmeyer-consulting.webp",
    liveUrl: "https://www.ebmeyer-consulting.ch/",
  },
  {
    slug: "mixx-fitness",
    title: "MIXX Fitness",
    summary:
      "A boutique Pilates and personal-training studio site with services, teacher training, pricing, schedule and class booking — built on Lovable.",
    category: "Business Website",
    platform: "Lovable",
    year: 2026,
    tags: ["Lovable", "Booking", "Pricing", "Schedule", "Small business"],
    challenge:
      "A Los Altos studio running small-group Reformer Pilates, strength, TRX and jump-board classes plus private sessions and teacher training needed a site that gets people to book a class fast, and that the owner can keep updated.",
    solution:
      "Built on Lovable for speed: Home, Services, Teacher Training, Pricing, Schedule, About and Contact, with 'Book a Class' as the primary action throughout, a class-format grid, and a contact form. Clean, light design that puts the studio photography first.",
    results: [
      "Book-a-class from every page",
      "Services, pricing and schedule fully self-serve",
      "Owner can edit copy and schedule without a developer",
    ],
    cover: ["#eff6ff", "#1d4ed8"],
    image: "/projects/mixx-fitness.webp",
    liveUrl: "https://mixx-fitness.lovable.app/",
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export const categories: Category[] = ["Business Website", "Web App", "Nonprofit"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
