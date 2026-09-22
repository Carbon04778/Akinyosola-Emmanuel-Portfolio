"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { Design } from "@/data/designs";

/**
 * A "shot" card, the way design work is presented on Dribbble/Behance:
 * the artboard floats on a tinted canvas drawn from its own palette,
 * cropped to a consistent 4:3 window so the grid stays even no matter
 * how tall the source artboard is. The full thing opens in the lightbox.
 *
 * Motion (all skipped under prefers-reduced-motion):
 *   • the card lifts and leans a few degrees toward the cursor
 *   • a soft spotlight follows the pointer
 *   • the artboard rises and scales, revealing more of the design
 *   • a scrim + caption fade up on hover / keyboard focus
 *
 * `layoutId` hands the artboard to the lightbox so it expands in place.
 */
export function DesignCard({
  design,
  onOpen,
  wide = false,
  priority = false,
}: {
  design: Design;
  onOpen: () => void;
  /** Featured card — spans two columns on large screens. */
  wide?: boolean;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const spring = { stiffness: 260, damping: 26, mass: 0.5 };
  const rotX = useSpring(0, spring);
  const rotY = useSpring(0, spring);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,255,255,0.55), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x * 100);
    my.set(y * 100);
    // Max 5°/4° — reads as depth, never as a gimmick.
    rotY.set((x - 0.5) * 10);
    rotX.set((0.5 - y) * 8);
  };

  const rest = () => {
    rotX.set(0);
    rotY.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={rest}
      onBlur={rest}
      aria-label={`View ${design.title}`}
      style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
      whileHover={reduced ? undefined : { y: -6 }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative flex h-full w-full flex-col text-left outline-none"
    >
      {/* ---------- the shot ---------- */}
      <div
        className="relative flex-1 overflow-hidden rounded-2xl border border-line shadow-[0_2px_16px_-8px_rgba(7,29,73,0.18)] transition-shadow duration-500 group-hover:shadow-[0_32px_64px_-28px_rgba(7,29,73,0.4)] group-focus-visible:ring-2 group-focus-visible:ring-accent"
        style={{ backgroundColor: design.tint }}
      >
        <div className={`relative w-full overflow-hidden ${wide ? "h-full min-h-[22rem]" : "aspect-[4/3]"}`}>
          {/* artboard: anchored to the top, oversized, so the hover rise
              reveals more of the page rather than just zooming pixels */}
          <motion.div
            layoutId={`design-${design.slug}`}
            className="absolute inset-x-[8%] top-[7%] origin-top"
            style={{ borderRadius: 10 }}
          >
            <Image
              src={design.image}
              alt={`${design.title} — ${design.kind} concept designed in Figma`}
              width={design.width}
              height={design.height}
              sizes={wide ? "(max-width: 1024px) 92vw, 60vw" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"}
              preload={priority}
              className="h-auto w-full rounded-[10px] shadow-[0_18px_40px_-18px_rgba(7,29,73,0.45)] ring-1 ring-black/5 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[6%] group-hover:scale-[1.03]"
            />
          </motion.div>

          {/* pointer spotlight */}
          {!reduced && (
            <motion.span
              aria-hidden
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* reveal scrim + caption */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-navy via-navy/85 to-transparent p-5 pt-20 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            <p className="line-clamp-2 text-sm leading-relaxed text-on-navy/85">{design.blurb}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              View full design
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </div>

          {/* badges */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm">
            {design.kind}
          </span>
          <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm">
            <FigmaMark />
            Figma
          </span>
        </div>
      </div>

      {/* ---------- caption (always visible, incl. reduced motion) ---------- */}
      <div className="mt-4 flex items-start justify-between gap-4 px-0.5">
        <div>
          <p className="font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-accent">
            {design.title}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {design.industry}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-muted transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>
    </motion.button>
  );
}

/** The Figma mark, inline so it costs nothing. */
function FigmaMark() {
  return (
    <svg viewBox="0 0 38 57" aria-hidden className="h-3 w-auto text-accent" fill="currentColor">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0zM19 0v19h9.5a9.5 9.5 0 1 0 0-19H19zM0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5zm0 19A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}
