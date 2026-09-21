"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { designKinds, type Design, type DesignKind } from "@/data/designs";

type Filter = DesignKind | "All";

/**
 * Masonry gallery of Figma concepts with an accessible lightbox.
 * CSS `columns` handles the mixed portrait/landscape artboards; the
 * lightbox is a native <dialog> (Esc, backdrop click, ← → to move).
 */
export function DesignGallery({
  designs,
  filters = false,
  columns = 3,
}: {
  designs: Design[];
  /** Show the kind filter row (used on /design, not on the home teaser). */
  filters?: boolean;
  columns?: 2 | 3;
}) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = filter === "All" ? designs : designs.filter((d) => d.kind === filter);
  const current = open === null ? null : visible[open];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? null : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Native dialog owns focus trapping + Esc; we mirror its state.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (current && !dlg.open) dlg.showModal();
    if (!current && dlg.open) dlg.close();
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

  const colClass =
    columns === 2
      ? "[column-count:1] sm:[column-count:2]"
      : "[column-count:1] sm:[column-count:2] lg:[column-count:3]";

  return (
    <>
      {filters && (
        <ul className="flex flex-wrap gap-2" role="tablist" aria-label="Filter designs">
          {(["All", ...designKinds] as Filter[]).map((k) => {
            const active = filter === k;
            const count = k === "All" ? designs.length : designs.filter((d) => d.kind === k).length;
            return (
              <li key={k}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(k);
                    setOpen(null);
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-white text-body hover:border-ink/25 hover:text-ink"
                  }`}
                >
                  {k}
                  <span className={`ml-1.5 text-xs ${active ? "text-white/80" : "text-muted"}`}>{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className={`${filters ? "mt-8" : ""} ${colClass} [column-gap:1.25rem]`}>
        {visible.map((d, i) => (
          <Reveal key={d.slug} delay={(i % 3) * 0.06}>
            <figure className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${d.title}`}
                className="card group block w-full overflow-hidden text-left hover:card-hover focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative overflow-hidden bg-surface-2">
                  <Image
                    src={d.image}
                    alt={`${d.title} — ${d.kind} concept designed in Figma`}
                    width={d.width}
                    height={d.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink">
                    {d.kind}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-navy/90 px-2.5 py-1 text-xs font-semibold text-white">
                    Figma
                  </span>
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-base font-bold text-ink transition-colors group-hover:text-accent">
                    {d.title}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    {d.industry}
                  </p>
                  <p className="mt-2 text-sm text-body">{d.blurb}</p>
                </figcaption>
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* ---------------- lightbox ---------------- */}
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          // click on the backdrop (the dialog itself), not its content
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-navy/90 backdrop:backdrop-blur-sm"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.slug}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
            >
              {/* Sized from the artboard's own ratio so the box exists before
                  the image arrives: as wide as fits, never taller than 78vh. */}
              <div
                className="pointer-events-auto relative overflow-hidden rounded-xl bg-white shadow-2xl"
                style={{
                  aspectRatio: `${current.width} / ${current.height}`,
                  width: `min(95vw, calc(78vh * ${current.width / current.height}), ${Math.max(current.width, 900)}px)`,
                }}
              >
                <Image
                  src={current.image}
                  alt={`${current.title} — full artboard`}
                  fill
                  sizes="(max-width: 1024px) 95vw, 1000px"
                  className="object-contain"
                  preload
                />
              </div>
              <div className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 text-white">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous design"
                  className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  ←
                </button>
                <div className="text-center">
                  <p className="font-display text-base font-bold">{current.title}</p>
                  <p className="text-xs text-white/60">
                    {current.kind} · {current.industry} · Designed in Figma · {open! + 1} / {visible.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next design"
                  className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="pointer-events-auto absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
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
