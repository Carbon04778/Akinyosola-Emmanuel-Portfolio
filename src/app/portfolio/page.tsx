import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Full-stack web apps, AI MVPs, agents and interfaces — built with Claude Code, Lovable, Base44 and Replit.",
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-4 max-w-3xl text-hero text-balance">
          Everything I&apos;ve designed, built and shipped.
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-xl text-lead text-body">
          Filter by what you need, or search for the platform you&apos;re working
          in. Every case study is written the same way: the problem, what I did,
          what changed.
        </p>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-5 text-base text-body">
          Looking for UI/UX concepts rather than shipped sites?{" "}
          <Link href="/design" className="font-semibold text-accent hover:underline">
            See the Figma design gallery →
          </Link>
        </p>
      </Reveal>

      <div className="mt-14">
        <PortfolioGrid />
      </div>
    </section>
  );
}
