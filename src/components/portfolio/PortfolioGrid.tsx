"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { categories, projects, type Category } from "@/data/projects";

const PAGE_SIZE = 9;

type Filter = Category | "All";

export function PortfolioGrid() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.category === filter;
      if (!matchesFilter) return false;
      if (!q) return true;

      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.platform?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [filter, query]);

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  const reset = (fn: () => void) => {
    fn();
    setShown(PAGE_SIZE);
  };

  return (
    <>
      {/* ---------------- controls ---------------- */}
      <div className="flex flex-col gap-5 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {(["All", ...categories] as Filter[]).map((c) => {
            const active = filter === c;
            return (
              <li key={c}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => reset(() => setFilter(c))}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-white text-body hover:border-ink/25 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative w-full md:w-64">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => reset(() => setQuery(e.target.value))}
            placeholder="Search projects, tags, platforms"
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* ---------------- count ---------------- */}
      <p
        aria-live="polite"
        className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted"
      >
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {/* ---------------- grid ---------------- */}
      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-white p-16 text-center">
          <p className="font-display text-lg font-bold text-ink">No projects match that.</p>
          <button
            type="button"
            onClick={() => reset(() => {
              setQuery("");
              setFilter("All");
            })}
            className="mt-3 text-sm font-semibold text-accent hover:underline"
          >
            Clear the filters
          </button>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {/* ---------------- load more ---------------- */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="rounded-xl border border-line bg-white px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
          >
            Load more ({filtered.length - shown} left)
          </button>
        </div>
      )}
    </>
  );
}
