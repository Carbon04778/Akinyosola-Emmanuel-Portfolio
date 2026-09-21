import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { hasFiverr, site } from "@/lib/site";

/**
 * A masonry gallery of review screenshots from Upwork, Fiverr and direct
 * clients. CSS `columns` gives the Pinterest-style layout — tall and short
 * cards both sit flush. Add/remove images in src/data/reviews.ts.
 */
export function Reviews() {
  return (
    <section id="reviews" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="From previous clients."
          lead="Real reviews from Upwork, Fiverr and direct clients — screenshots, unedited, exactly as they were left."
          align="center"
        />

        <div className="mt-12 [column-count:1] [column-gap:1.25rem] sm:[column-count:2] lg:[column-count:3]">
          {reviews.map((review, i) => (
            <Reveal key={review.src} delay={(i % 3) * 0.08}>
              <figure className="relative mb-5 break-inside-avoid overflow-hidden rounded-xl border border-line bg-white shadow-[0_2px_12px_-6px_rgba(7,29,73,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-14px_rgba(7,29,73,0.28)]">
                <Image
                  src={review.src}
                  alt={review.alt}
                  width={review.width}
                  height={review.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full"
                />
                <figcaption className="absolute right-3 top-3 rounded-md bg-navy/90 px-2 py-0.5 text-[0.7rem] font-semibold text-white">
                  {review.platform}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-base text-muted">
            <a
              href={site.hire.upwork}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-accent hover:underline"
            >
              See all reviews on Upwork →
            </a>
            {hasFiverr && (
              <a
                href={site.hire.fiverr}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-accent hover:underline"
              >
                See reviews on Fiverr →
              </a>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
