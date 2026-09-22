import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DesignGallery } from "@/components/design/DesignGallery";
import { designs, featuredDesigns } from "@/data/designs";
import { platforms } from "@/data/platforms";

/** The three platforms a Figma concept can be built on, with their logos. */
const targets = [
  { name: "Claude Code", note: "custom code, full control", logo: platforms.find((p) => p.id === "claude-code")!.logo },
  { name: "Lovable", note: "full-stack in days", logo: platforms.find((p) => p.id === "lovable")!.logo },
  { name: "Base44", note: "fastest to working", logo: platforms.find((p) => p.id === "base44")!.logo },
];

export function DesignWork() {
  return (
    <section id="design" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="UX/UI design"
            title="Designed in Figma. Ready to build."
            lead="Concept designs for websites, web apps and mobile apps — every screen, state and flow designed end to end in Figma. Pick one, or bring your own brief, and I'll turn it into a working product."
          />

          {/* Design → build path */}
          <Reveal delay={0.12}>
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                From Figma to a live product on
              </p>
              <ul className="mt-4 space-y-3">
                {targets.map((t) => (
                  <li key={t.name} className="flex items-center gap-3">
                    <span className="relative h-9 w-9 shrink-0">
                      <Image src={t.logo} alt="" aria-hidden fill sizes="36px" className="object-contain" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs text-body">{t.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-sm text-body">
                Same design, your choice of speed vs. control. The Figma file is
                yours either way.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <DesignGallery designs={featuredDesigns} />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/design" variant="outline">
              See all {designs.length} designs
            </Button>
            <Button href="/#contact">Build one of these</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
