import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/data/process";

export function Process() {
  return (
    <section id="process" className="navy-panel py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Process"
          title="How a project actually runs."
          lead="No mystery, no disappearing for three weeks. You see the product growing from the first day."
          onNavy
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line-navy bg-white/10 md:grid-cols-5">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.07}>
              <li className="group h-full bg-navy p-7 transition-colors duration-300 hover:bg-navy-2">
                <span className="font-display text-sm font-bold text-accent">
                  {p.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-base text-on-navy/70">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
