import type { Metadata } from "next";
import { DesignGallery } from "@/components/design/DesignGallery";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { designs } from "@/data/designs";

export const metadata: Metadata = {
  title: "Design",
  description:
    "UI/UX concept designs for websites, web apps and mobile apps — designed end to end in Figma, ready to build on Base44, Lovable or in custom code with Claude Code.",
};

export default function DesignPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Design</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-4 max-w-3xl text-hero text-balance">
          UI/UX concepts, designed in Figma.
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-2xl text-lead text-body">
          Websites, web-app dashboards and mobile-app flows — every screen,
          state and flow designed end to end. These are concepts, not live
          products: pick one as a starting point, or bring your own brief, and
          I&apos;ll build it on Base44, Lovable, or in custom code with Claude
          Code. Click any design to see it full size.
        </p>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#contact">Build one of these</Button>
          <Button href="/portfolio" variant="outline">
            See shipped work
          </Button>
        </div>
      </Reveal>

      <div className="mt-14 border-t border-line pt-8">
        <DesignGallery designs={designs} filters />
      </div>
    </section>
  );
}
