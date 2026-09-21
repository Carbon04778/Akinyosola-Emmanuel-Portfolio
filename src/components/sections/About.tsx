import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { hasFiverr, site } from "@/lib/site";

const stack = [
  "Claude Code",
  "VS Code",
  "Lovable",
  "Base44",
  "Replit",
  "Next.js",
  "React",
  "TypeScript",
  "Node",
  "Tailwind",
  "Supabase",
  "PostgreSQL",
  "Stripe",
  "Claude API",
  "OpenAI API",
  "Vercel",
  "n8n",
  "Git & GitHub",
  "Figma",
];

export function About() {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* ---------------- photo ---------------- */}
        <Reveal>
          <div className="relative">
            {/* Offset navy plate behind the photo — gives it weight. */}
            <div
              aria-hidden
              className="absolute -bottom-5 -left-5 h-full w-full rounded-2xl bg-navy"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-2">
              {/*
                YOUR PHOTO: replace src/assets/portrait.jpg (4:5, ~1200×1500).
                It's a static import, so the URL carries a content hash — a new
                photo is never served stale from Next's image cache or the
                browser. You also get a blur-up placeholder for free.
              */}
              <Image
                src={portrait}
                alt={`${site.name} — full-stack developer and AI MVP builder`}
                fill
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 right-6 rounded-xl bg-accent px-5 py-3 shadow-lg">
              <p className="font-display text-sm font-bold text-white">
                Full-stack · AI MVPs
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---------------- bio ---------------- */}
        <div>
          <Reveal>
            <p className="eyebrow">About</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-4 text-section text-balance">
              A full-stack developer who ships the whole product, not just the
              demo.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-6 space-y-5 text-lead text-body">
              <p>
                I&apos;m {site.name}. I build web products end to end — the
                interface, the API, the database, the deploy — and I build them
                fast, because most of my work happens in AI-native tools:
                Claude Code inside VS Code first, then Lovable, Base44 or Replit
                depending on the job.
              </p>
              <p>
                My specialty is the AI MVP: getting a founder from an idea to a
                live product with real users in weeks, with an AI feature that
                actually earns its place. Speed comes from the tools. Reliability
                comes from the part I bring — types, tests, auth, error handling,
                monitoring. The unglamorous work that keeps it standing.
              </p>
              <p>
                Most of my clients find me on{" "}
                <a
                  href={site.hire.upwork}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  Upwork
                </a>
                {hasFiverr ? (
                  <>
                    {" "}and{" "}
                    <a
                      href={site.hire.fiverr}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                    >
                      Fiverr
                    </a>
                  </>
                ) : (
                  " and Fiverr"
                )}
                , or{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  email me
                </a>{" "}
                directly. And when someone arrives with an AI-built app
                that&apos;s fallen over, I already know where to look.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-3xl font-bold text-ink">
                      <Counter to={s.value} suffix={s.suffix} />
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-12 text-sm font-semibold uppercase tracking-wider text-muted">
              Tools I work in
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-body"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href="/#contact">Work with me</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
