"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DesignCard } from "./DesignCard";
import { designKinds, type Design, type DesignKind } from "@/data/designs";

type Filter = DesignKind | "All";

/**
 * The gallery: an even grid of "shot" cards (see DesignCard) with an
 * animated filter and a shared-element lightbox.
 *
 * Layout notes
 *   • Even grid, not masonry — consistent card sizes read as curated work
 *     rather than a pile of screenshots (the Dribbble/Behance convention).
 *   • The first card spans two columns on large screens, so the eye has a
 *     clear entry point (bento-style featured cell).
 *   • `motion.div layout` reflows the grid smoothly when filtering.
 */
export function DesignGallery({
  designs,
  filters = false,
  featureFirst = true,
}: {
  designs: Design[];
  /** Show the kind filter row (used on /design, not the home teaser). */
  filters?: boolean;
  featureFirst?: boolean;
}) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const visible = filter === "All" ? designs : designs.filter((d) => d.kind === filter);
  const current = open === null ? null : visible[open];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? null : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Native <dialog> gives us focus trapping, Esc and the backdrop for free.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (current && !dlg.open) {
      lastFocused.current = document.activeElement as HTMLElement;
      dlg.showModal();
    }
    if (!current && dlg.open) {
      dlg.close();
      lastFocused.current?.focus();
    }
  }, [current]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <>
      {filters && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2" role="tablist" aria-label="Filter designs">
            {(["All", ...designKinds] as Filter[]).map((k) => {
              const active = filter === k;
              const count = k === "All" ? designs.length : designs.filter((d) => d.kind === k).length;
              return (
                <li key={k} className="relative">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setFilter(k);
                      setOpen(null);
                    }}
                    className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      active ? "text-white" : "text-body hover:text-ink"
                    }`}
                  >
                    {k}
                    <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-muted"}`}>
                      {count}
                    </span>
                  </button>
                  {active && (
                    <motion.span
                      layoutId="design-filter-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent shadow-[0_8px_20px_-8px_rgba(255,122,0,0.8)]"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <p aria-live="polite" className="text-sm text-muted">
            {visible.length} {visible.length === 1 ? "design" : "designs"}
          </p>
        </div>
      )}

      <motion.div
        layout={!reduced}
        className={`${filters ? "mt-10" : ""} grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3`}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((d, i) => (
            <motion.div
              key={d.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: reduced ? 0 : (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={featureFirst && i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <DesignCard
                design={d}
                wide={featureFirst && i === 0}
                priority={i === 0}
                onOpen={() => setOpen(i)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ---------------- lightbox ---------------- */}
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-navy/92 backdrop:backdrop-blur-md"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.slug}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-5 p-4 sm:p-8"
            >
              {/* The artboard, full height, scrollable if very tall. */}
              <div
                className="pointer-events-auto relative overflow-hidden rounded-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]"
                style={{
                  backgroundColor: current.tint,
                  aspectRatio: `${current.width} / ${current.height}`,
                  width: `min(94vw, calc(76vh * ${current.width / current.height}))`,
                }}
              >
                <motion.div layoutId={`design-${current.slug}`} className="absolute inset-0">
                  <Image
                    src={current.image}
                    alt={`${current.title} — full artboard`}
                    fill
                    sizes="(max-width: 1024px) 94vw, 1100px"
                    className="object-contain"
                    preload
                  />
                </motion.div>
              </div>

              {/* controls */}
              <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-between gap-6 text-white">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous design"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-lg transition-all hover:-translate-x-0.5 hover:bg-white/10"
                >
                  ←
                </button>
                <div className="min-w-0 text-center">
                  <p className="truncate font-display text-base font-bold">{current.title}</p>
                  <p className="mt-0.5 text-xs text-white/60">
                    {current.kind} · {current.industry} · Designed in Figma ·{" "}
                    {(open ?? 0) + 1} / {visible.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next design"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-lg transition-all hover:translate-x-0.5 hover:bg-white/10"
                >
                  →
                </button>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="pointer-events-auto absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
