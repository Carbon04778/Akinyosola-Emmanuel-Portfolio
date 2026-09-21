/**
 * ONE place for who you are. Everything else — nav, footer, metadata,
 * contact section, SEO, sitemap — reads from here.
 *
 * Any link left as "" is simply not rendered, so you can fill them in
 * whenever you're ready without touching a component.
 */
export const site = {
  name: "Akinyosola Emmanuel",
  /** Short form used in the logo and anywhere space is tight. */
  shortName: "Emmanuel",
  role: "Full-Stack Developer · AI MVP Builder",
  tagline: "I build full-stack products and AI MVPs — fast.",
  /**
   * Public URL of the deployed site. Set NEXT_PUBLIC_SITE_URL in your
   * hosting env (Vercel → Settings → Environment Variables) so metadata,
   * sitemap.xml and robots.txt point at the real domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akinyosola-emmanuel.vercel.app",
  email: "akinyosolaemmanuel9@gmail.com",
  available: true,

  /**
   * Where clients hire me. Upwork is primary. Fiverr buttons appear
   * automatically once a URL is added here.
   */
  hire: {
    upwork: "https://www.upwork.com/freelancers/~01da564cdc07f9f699",
    fiverr: "", // paste your Fiverr profile URL to show the Fiverr buttons
  },

  /** Shown in the footer and contact section. Empty href = hidden. */
  socials: [
    { label: "X", href: "https://x.com/emmanuelg116086" },
    { label: "Email", href: "mailto:akinyosolaemmanuel9@gmail.com" },
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "" },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Design", href: "/design" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],

  /** Numbers shown in the hero and About. Edit freely — keep them honest. */
  stats: [
    { value: 50, suffix: "+", label: "Products shipped" },
    { value: 4, suffix: " yrs", label: "Building for the web" },
    { value: 20, suffix: "+", label: "AI MVPs launched" },
    { value: 5, suffix: "", label: "Platforms, fluently" },
  ],
} as const;

/** Only the socials that actually have a link. */
export const activeSocials = site.socials.filter((s) => s.href !== "");

/** True once a Fiverr URL has been added. */
export const hasFiverr = site.hire.fiverr !== "";
