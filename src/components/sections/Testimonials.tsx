import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={i < n ? "text-accent" : "text-line"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say afterwards."
          lead="The measure of the work isn't how fast it shipped. It's whether it was still standing three months later."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="card flex h-full flex-col p-8 hover:card-hover">
                <div className="flex items-center justify-between gap-4">
                  <Stars n={t.rating} />
                  <span className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-semibold text-body">
                    via {t.source}
                  </span>
                </div>

                <blockquote className="mt-5 grow text-lead text-ink">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                  {/* Drop a photo at /public/clients/… and set `avatar` to use it. */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {t.name
                      .split(/[\s.]+/)
                      .filter(Boolean)
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-ink">
                      {t.name}
                    </p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
