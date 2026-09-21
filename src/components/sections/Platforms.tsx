import Image from "next/image";
import { OrbitCanvas } from "@/components/three/OrbitCanvas";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { platforms } from "@/data/platforms";

export function Platforms() {
  return (
    <section id="platforms" className="dot-grid relative py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <p className="eyebrow">The AI stack</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-4 text-section text-balance">
              Four AI platforms. One developer who knows which to reach for.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-lead text-body">
              Claude Code inside VS Code is where I build most things — real
              repositories, real architecture. The others earn their place when
              the job calls for them. Choosing correctly is most of the work.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-9 space-y-4">
              {platforms.map((p) => (
                <li key={p.id} className="flex gap-4">
                  <span className="relative mt-1 h-12 w-12 shrink-0">
                    <Image
                      src={p.logo}
                      alt=""
                      aria-hidden
                      fill
                      sizes="48px"
                      className="object-contain drop-shadow-sm"
                    />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-ink">
                      {p.name}
                      <span className="ml-2 rounded-md bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                        {p.role}
                      </span>
                    </p>
                    <p className="mt-1 text-base text-body">{p.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10">
              <Button href="/#contact" variant="outline">
                Tell me what you&apos;re building
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <OrbitCanvas />
        </Reveal>
      </div>
    </section>
  );
}
