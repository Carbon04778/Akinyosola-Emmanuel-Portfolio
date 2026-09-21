import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { getProject, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Next 16: params arrives as a Promise. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [from, to] = project.cover;
  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-6 pb-20 pt-32 md:pt-40">
      <Link
        href="/portfolio"
        className="text-sm font-semibold text-body transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-surface-2 px-3 py-1 text-sm font-semibold text-ink">
            {project.category}
          </span>
          {project.platform && (
            <span className="rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-white">
              {project.platform}
            </span>
          )}
          <span className="text-sm text-muted">{project.year}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-6 text-hero text-balance">{project.title}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-5 max-w-2xl text-lead text-body">{project.summary}</p>
      </Reveal>

      {project.liveUrl && (
        <Reveal delay={0.16}>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(255,122,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(255,122,0,0.7)]"
            >
              Visit live site
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
            <span className="text-sm text-muted">
              {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.18}>
        <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-line">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              preload
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              />
              <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-wider text-white/70">
                Replace with project image
              </span>
            </>
          )}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">
              Stack
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-surface-2 px-2.5 py-1 text-sm font-medium text-body"
                >
                  {t}
                </li>
              ))}
            </ul>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-block text-base font-semibold text-accent hover:underline"
              >
                Visit live site ↗
              </a>
            )}
          </Reveal>
        </div>

        <div className="space-y-12">
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold text-ink">
                The challenge
              </h2>
              <p className="mt-4 text-lead text-body">{project.challenge}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold text-ink">
                What I did
              </h2>
              <p className="mt-4 text-lead text-body">{project.solution}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold text-ink">
                What changed
              </h2>
              <ul className="mt-5 space-y-3">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-xl bg-accent-soft px-5 py-4"
                  >
                    <span aria-hidden className="mt-0.5 font-bold text-accent">
                      →
                    </span>
                    <span className="font-semibold text-ink">{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 border-t border-line pt-16">
          <p className="eyebrow">More like this</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}

      <Reveal>
        <div className="navy-panel mt-24 rounded-2xl p-12 text-center">
          <h2 className="text-section text-white text-balance">
            Building something like this?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lead text-on-navy/75">
            Tell me what you have in mind. I&apos;ll tell you what I think before
            you commit to anything.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact">Start a project</Button>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
