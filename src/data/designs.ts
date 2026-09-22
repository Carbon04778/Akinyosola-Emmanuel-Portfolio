/**
 * DESIGN CONCEPTS — UI/UX work designed end-to-end in Figma.
 *
 * These are concept designs, not live products: full website layouts,
 * web-app dashboards and mobile-app flows. Any of them can be turned
 * into a working product on Base44 or Lovable, or built in custom code
 * with Claude Code. Shown in the home "Design" section and at /design.
 *
 * HOW TO ADD ONE: export the artboard from Figma as PNG/JPG, convert to
 * WebP (squoosh.app), drop it in public/designs/, add an entry with the
 * exact pixel width/height so the masonry layout doesn't jump.
 */
export type DesignKind = "Website" | "Web App" | "Mobile App";

export type Design = {
  slug: string;
  title: string;
  kind: DesignKind;
  industry: string;
  /** One or two lines: what the concept solves. */
  blurb: string;
  image: string;
  width: number;
  height: number;
  /** Canvas colour the artboard floats on — pulled from the design's own palette. */
  tint: string;
  /** Shown on the home page (pick a balanced mix of kinds). */
  featured?: boolean;
};

export const designKinds: DesignKind[] = ["Website", "Web App", "Mobile App"];

/** Where a concept can go next — used in the section copy and CTA. */
export const buildTargets = ["Base44", "Lovable", "Claude Code"] as const;

export const designs: Design[] = [
  {
    slug: "merlin-booking-dashboard",
    title: "Merlin Booking — Property Dashboard",
    kind: "Web App",
    industry: "Real estate",
    blurb:
      "A luxury-property portal: personalised recommendations, viewings calendar, saved homes, alerts, enquiries and a rich property detail page with mortgage estimator.",
    image: "/designs/merlin-booking-dashboard.webp",
    width: 680,
    height: 668,
    tint: "#e8ede7",
    featured: true,
  },
  {
    slug: "transport-logistics",
    title: "Transport Logistics — Company Website",
    kind: "Website",
    industry: "Logistics",
    blurb:
      "A bold, conversion-led site for a freight and delivery company: services grid, process, stats, team, FAQ, projects and a newsletter footer.",
    image: "/designs/transport-logistics.webp",
    width: 506,
    height: 680,
    tint: "#fdece1",
    featured: true,
  },
  {
    slug: "realestate-app-onboarding",
    title: "Real Estate App — Onboarding",
    kind: "Mobile App",
    industry: "Real estate",
    blurb:
      "Three-step onboarding that sells the app before sign-up: explore every detail, search by location, discover your dream home.",
    image: "/designs/realestate-app-onboarding.webp",
    width: 680,
    height: 537,
    tint: "#fdf0d9",
    featured: true,
  },
  {
    slug: "digital-agency",
    title: "Digital Agency — Website",
    kind: "Website",
    industry: "Agency",
    blurb:
      "An energetic agency site: mission and vision, achievements, service accordion, results gallery, pricing tiers, team, testimonials and a quote form.",
    image: "/designs/digital-agency.webp",
    width: 504,
    height: 680,
    tint: "#fdece4",
    featured: true,
  },
  {
    slug: "savour-auth",
    title: "Savour — Food Delivery Auth Flow",
    kind: "Mobile App",
    industry: "Food delivery",
    blurb:
      "Splash, log-in and create-account screens for a Ghana-based delivery app — phone-number first, Google and Apple sign-in, warm brand photography.",
    image: "/designs/savour-auth.webp",
    width: 680,
    height: 537,
    tint: "#fbe9e2",
    featured: true,
  },
  {
    slug: "marlin-motors",
    title: "Marlin Motors — Dealership Website",
    kind: "Website",
    industry: "Automotive",
    blurb:
      "New and used car search with filters, premium brand strip, buy/sell paths, recently added inventory, services, team, testimonials and an app download banner.",
    image: "/designs/marlin-motors.webp",
    width: 532,
    height: 680,
    tint: "#e7ecf5",
    featured: true,
  },
  {
    slug: "conroys-flowers",
    title: "Conroy's Flowers — App Landing Page",
    kind: "Website",
    industry: "E-commerce",
    blurb:
      "A marketing site for a flower-delivery app: app-store badges, how it works, feature tour, team, pricing plans, QR download and contact.",
    image: "/designs/conroys-flowers.webp",
    width: 532,
    height: 680,
    tint: "#efe9fb",
  },
  {
    slug: "vantage-consulting",
    title: "Vantage Consulting — Finance Website",
    kind: "Website",
    industry: "Finance & consulting",
    blurb:
      "A gold-and-charcoal consultancy site: booking form in the hero, solutions, vision, growth accelerators, results, team, testimonials, FAQ and news.",
    image: "/designs/vantage-consulting.webp",
    width: 484,
    height: 680,
    tint: "#f4efe2",
  },
  {
    slug: "realestate-app-listing",
    title: "Real Estate App — Listing & Details",
    kind: "Mobile App",
    industry: "Real estate",
    blurb:
      "Listing agent profile with map and similar properties, an amenities sheet, and a property detail screen with gallery, price, specs and contact.",
    image: "/designs/realestate-app-listing.webp",
    width: 680,
    height: 537,
    tint: "#fdf3de",
  },
  {
    slug: "turf-booking-onboarding",
    title: "Turf Booking App — Onboarding",
    kind: "Mobile App",
    industry: "Sports & leisure",
    blurb:
      "Find football, basketball and cricket pitches in Kampala, check real-time availability, and book and pay with MTN MoMo or Airtel Money.",
    image: "/designs/turf-booking-onboarding.webp",
    width: 680,
    height: 537,
    tint: "#e6f3ea",
  },
  {
    slug: "marketing-agency",
    title: "Digital Marketing Agency — Website",
    kind: "Website",
    industry: "Marketing",
    blurb:
      "A purple-gradient agency site: services, why-us, quote form, success stories, process timeline, team and a strong call-to-action band.",
    image: "/designs/marketing-agency.webp",
    width: 488,
    height: 680,
    tint: "#f0e9fb",
  },
  {
    slug: "business-consulting",
    title: "Business Consulting — Website",
    kind: "Website",
    industry: "Consulting",
    blurb:
      "A calm, editorial consultancy site: mission/vision/goals/values, tabbed services, research and insights, client outcomes with stats, and a connect CTA.",
    image: "/designs/business-consulting.webp",
    width: 488,
    height: 680,
    tint: "#e6f1ee",
  },
  {
    slug: "riverstone-haven",
    title: "Riverstone Haven — Residential Website",
    kind: "Website",
    industry: "Real estate",
    blurb:
      "A development showcase: hero with key stats, lifestyle story, room-by-room gallery, floor plans, leadership, feedback and an advice form.",
    image: "/designs/riverstone-haven.webp",
    width: 461,
    height: 680,
    tint: "#f8e9e4",
  },
  {
    slug: "dealership-app-vehicle",
    title: "Dealership App — Vehicle Details",
    kind: "Mobile App",
    industry: "Automotive",
    blurb:
      "Dark-mode vehicle page with gallery, price and MSRP, key specs, dealer card, features and technical specification sheet — plus a sold-out state with similar-vehicle recovery.",
    image: "/designs/dealership-app-vehicle.webp",
    width: 680,
    height: 537,
    tint: "#e6eaf0",
  },
  {
    slug: "marlin-realty",
    title: "Marlin Realty — Property Listings Website",
    kind: "Website",
    industry: "Real estate",
    blurb:
      "Search-first property portal: browse by category and city, sought-after homes grid, services, leadership, testimonial, news and app download.",
    image: "/designs/marlin-realty.webp",
    width: 488,
    height: 680,
    tint: "#f8e7ef",
  },
  {
    slug: "realestate-app-profile",
    title: "Real Estate App — Profile & Settings",
    kind: "Mobile App",
    industry: "Real estate",
    blurb:
      "Account area: profile summary with saved/viewings/enquiries counts, personal information form, and a settings screen with security and notification toggles.",
    image: "/designs/realestate-app-profile.webp",
    width: 680,
    height: 537,
    tint: "#fdf3de",
  },
  {
    slug: "transport-logistics-v2",
    title: "Transport Logistics — Alternate Layout",
    kind: "Website",
    industry: "Logistics",
    blurb:
      "A second take on the logistics site with a request-a-quote form near the top, a warehouse photo section, and a tighter process strip.",
    image: "/designs/transport-logistics-v2.webp",
    width: 484,
    height: 680,
    tint: "#fdece1",
  },
];

export const featuredDesigns = designs.filter((d) => d.featured).slice(0, 6);
