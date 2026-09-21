export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Where the review came from — shown as a small chip. */
  source: "Upwork" | "Fiverr" | "Direct";
  /** Drop a photo at /public/clients/<file> to replace the initials avatar. */
  avatar?: string;
  rating: number;
};

/*
 * ⚠️ EXAMPLE COPY — replace with real client quotes.
 * Copy the exact wording from your Upwork / Fiverr reviews (that's allowed —
 * it's your feedback), set `source` to where it came from, and use the
 * client's first name + initial unless they've agreed to their full name.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We had an idea, a deadline and no engineer. Emmanuel scoped it in a day and had a working MVP with auth, payments and an AI assistant live in under two weeks.",
    name: "A. Okonkwo",
    role: "Founder, logistics startup",
    source: "Upwork",
    rating: 5,
  },
  {
    quote:
      "He designs it first, then builds it. Everything looked considered, not generated — and it kept working after we started adding real users.",
    name: "M. Reyes",
    role: "Product lead, fintech",
    source: "Upwork",
    rating: 5,
  },
  {
    quote:
      "Fast, clear, and he explains what he's doing in language I understand. I never once had to chase him for an update.",
    name: "S. Ibrahim",
    role: "Agency owner",
    source: "Fiverr",
    rating: 5,
  },
  {
    quote:
      "Our Lovable app broke the day before a demo. He found the actual problem in an hour and had it fixed and deployed the same evening.",
    name: "J. Whitfield",
    role: "Solo founder",
    source: "Fiverr",
    rating: 5,
  },
];
