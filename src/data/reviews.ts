/**
 * Review screenshots from Upwork, Fiverr and direct clients.
 *
 * HOW TO ADD:
 *   1. Screenshot each review (the whole review card).
 *   2. Save it in  public/reviews/  as review-1.png, review-2.png, etc.
 *   3. Add a line below with the platform it came from. That's it.
 *
 * IMAGE SPEC:
 *   • Width  ~600px, height whatever the review is (they can vary — the
 *     layout is masonry-style, so tall and short cards both fit).
 *   • PNG, JPG or WebP. Under ~150KB each (compress at squoosh.app).
 *   • width/height below must match the file so the layout doesn't jump.
 *
 * ⚠️ The current files are blank SAMPLE cards — replace them before launch.
 */
export type Review = {
  src: string;
  alt: string;
  platform: "Upwork" | "Fiverr" | "Direct";
  width: number;
  height: number;
};

export const reviews: Review[] = [
  { src: "/reviews/review-1.png", alt: "5-star Upwork review — fast delivery", platform: "Upwork", width: 600, height: 300 },
  { src: "/reviews/review-2.png", alt: "5-star Fiverr review — fixed a broken app", platform: "Fiverr", width: 600, height: 300 },
  { src: "/reviews/review-3.png", alt: "5-star Upwork review — great communication", platform: "Upwork", width: 600, height: 300 },
  { src: "/reviews/review-4.png", alt: "5-star Upwork review — MVP delivered in days", platform: "Upwork", width: 600, height: 300 },
  { src: "/reviews/review-5.png", alt: "5-star Fiverr review — clean code", platform: "Fiverr", width: 600, height: 300 },
  { src: "/reviews/review-6.png", alt: "5-star direct client review — went above and beyond", platform: "Direct", width: 600, height: 300 },
];
