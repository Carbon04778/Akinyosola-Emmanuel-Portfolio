"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { techRow1, techRow2, type Tech } from "@/data/tech";

/**
 * Two marquee rows of brand marks, drifting in opposite directions.
 *
 * Each row renders its logos TWICE and slides by exactly -50%, so the loop
 * is seamless. Marks are monochrome slate and take their real brand colour
 * on hover. The whole thing pauses on hover and falls back to a static
 * wrapped grid under prefers-reduced-motion.
 */
function Logo({ item }: { item: Tech }) {
  return (
    <li
      className="group/logo flex shrink-0 items-center gap-2.5 px-5 py-3"
      style={{ ["--brand" as string]: item.color }}
    >
      <span className="relative h-7 w-7 text-muted transition-colors duration-300 group-hover/logo:text-[var(--brand)]">
        <Image
          src={`/tech/${item.slug}.svg`}
          alt=""
          aria-hidden
          fill
          sizes="28px"
          className="object-contain opacity-55 grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
        />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-body transition-colors duration-300 group-hover/logo:text-ink">
        {item.name}
      </span>
    </li>
  );
}

function Row({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  return (
    <div className="group/row relative flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center group-hover/row:[animation-play-state:paused]"
          style={{
            animation: `marquee ${reverse ? 46 : 38}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {items.map((t) => (
            <Logo key={`${copy}-${t.slug}`} item={t} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function TechStrip() {
  const reduced = useReducedMotion();
  const all = [...techRow1, ...techRow2];

  return (
    <section
      aria-labelledby="tech-heading"
      className="border-y border-line bg-surface py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Integrations</p>
            <h2 id="tech-heading" className="mt-3 font-display text-2xl font-bold text-ink text-balance">
              The tools I wire into your product.
            </h2>
            <p className="mt-3 text-base text-body">
              Payments, databases, AI, automation, CMS, hosting and domains —
              connected properly, logged and monitored.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        {reduced ? (
          // Static, wrapped, centred — no motion at all.
          <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6">
            {all.map((t) => (
              <Logo key={t.slug} item={t} />
            ))}
          </ul>
        ) : (
          // Faded edges so logos drift in and out rather than clipping.
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Row items={techRow1} />
            <Row items={techRow2} reverse />
          </div>
        )}
      </div>
    </section>
  );
}
