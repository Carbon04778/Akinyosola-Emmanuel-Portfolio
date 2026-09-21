import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * Cover is a gradient placeholder until the project has an `image`.
 * Add `image: "/projects/x.jpg"` in src/data/projects.ts and it's used here.
 */
export function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const [from, to] = project.cover;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="card group flex h-full flex-col overflow-hidden hover:card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          />
        )}

        <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
          {project.category}
        </span>

        {project.platform && (
          <span className="absolute right-4 top-4 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-white">
            {project.platform}
          </span>
        )}
      </div>

      <div className="flex grow flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-ink transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <span className="text-sm text-muted">{project.year}</span>
        </div>

        <p className="mt-3 text-base text-body">{project.summary}</p>

        {detailed && (
          <dl className="mt-6 space-y-4 border-t border-line pt-5 text-base">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                Challenge
              </dt>
              <dd className="mt-1 text-body">{project.challenge}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                What I did
              </dt>
              <dd className="mt-1 text-body">{project.solution}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                Result
              </dt>
              <dd className="mt-1 font-semibold text-ink">{project.results[0]}</dd>
            </div>
          </dl>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-body"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
