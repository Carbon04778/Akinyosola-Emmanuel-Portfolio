"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { WorkspaceCanvas } from "@/components/three/WorkspaceCanvas";
import { site } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    animate: reduced ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // min-h (not a fixed h): on short viewports the section grows instead of
  // centring-overflow pushing the top under the fixed navbar. The grid's
  // padding-top (7rem) clears the navbar's 87px bottom edge with room to spare.
  return (
    <section className="navy-panel relative flex min-h-[100svh] items-center overflow-hidden py-8 lg:py-0">
      {/* one soft light source, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "rgba(255,122,0,0.18)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 pt-28 pb-8 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-28 lg:pb-16">
        {/* ---------------- copy ---------------- */}
        <div>
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5"
          >
            <span
              className="h-2 w-2 rounded-full bg-accent"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="text-sm font-medium text-on-navy">
              {site.available
                ? "Available on Upwork & Fiverr"
                : "Booked — join the waitlist"}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-white text-balance text-[clamp(2.25rem,5.2vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            I build full-stack products and{" "}
            <span className="text-accent">AI MVPs</span> — fast.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-4 max-w-lg text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-on-navy/80"
          >
            I&apos;m {site.name}, a full-stack developer and AI MVP builder. I
            design in <span className="font-semibold text-white">Figma</span> and
            ship real products in{" "}
            <span className="font-semibold text-white">Claude Code</span> and{" "}
            <span className="font-semibold text-white">VS Code</span>, plus{" "}
            <span className="font-semibold text-white">
              Lovable, Base44 and Replit
            </span>{" "}
            &mdash; and I fix them when they break.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-6 flex flex-wrap gap-3">
            <Button href="/#contact">Start a project</Button>
            <Button href="/portfolio" variant="onNavy">
              See my work
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.32)}
            className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-navy pt-5"
          >
            {[
              [`${site.stats[0].value}${site.stats[0].suffix}`, site.stats[0].label],
              ["Days", "Not months"],
              ["100%", "Code you own"],
            ].map(([big, small]) => (
              <div key={small}>
                <p className="font-display text-xl font-bold text-white">
                  {big}
                </p>
                <p className="mt-0.5 text-sm text-on-navy/60">{small}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------------- 3D workspace, centered ---------------- */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, scale: 0.93 }}
          animate={reduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <WorkspaceCanvas />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex">
        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 text-on-navy/40"
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-on-navy/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
