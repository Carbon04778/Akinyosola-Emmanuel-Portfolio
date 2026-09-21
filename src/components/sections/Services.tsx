import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service } from "@/data/services";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="card group flex h-full flex-col p-7 hover:card-hover">
        <h3 className="font-display text-lg font-bold text-ink">
          {service.title}
        </h3>

        <p className="mt-3 grow text-base text-body">{service.body}</p>

        <p className="mt-6 border-t border-line pt-5 text-sm font-semibold text-accent">
          {service.outcome}
        </p>
      </article>
    </Reveal>
  );
}

export function Services() {
  const build = services.filter((s) => s.tier === "build");
  const support = services.filter((s) => s.tier === "support");

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I build."
          lead="Most of my work is building products from nothing. The rest is making sure what's already built doesn't fall over."
        />

        <Reveal>
          <p className="mt-14 font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Build
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {build.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-16 font-display text-sm font-semibold uppercase tracking-wider text-ink">
            Fix, refine, automate
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {support.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
