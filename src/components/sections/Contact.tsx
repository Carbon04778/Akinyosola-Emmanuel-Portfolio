"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { activeSocials, hasFiverr, site } from "@/lib/site";

const projectTypes = [
  "AI MVP",
  "Full-stack web app",
  "Fix / debug an AI-built app",
  "AI feature, agent or chatbot",
  "Automation / integration",
  "UX/UI design",
  "Something else",
];

/**
 * Sends through Web3Forms (https://web3forms.com) — free, no backend,
 * straight to the inbox in src/lib/site.ts.
 *
 * SETUP (one time):
 *   1. Go to web3forms.com, enter akinyosolaemmanuel9@gmail.com, get a key.
 *   2. Put it in .env.local (and in Vercel → Environment Variables):
 *        NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *   3. Restart `npm run dev`. Done.
 *
 * Until the key is set, the form falls back to opening the user's email
 * client with the message pre-filled, so nothing is ever lost.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";

const elsewhere = activeSocials.filter((s) => !s.href.startsWith("mailto:"));

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field, humans never see this one.
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("type") ?? "");
    const message = String(data.get("message") ?? "");

    // No key yet → mailto fallback, pre-filled.
    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`[Portfolio] ${type} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfolio] ${type} — ${name}`,
          from_name: `${site.shortName} portfolio`,
          name,
          email,
          project_type: type,
          message,
        }),
      });
      const json = (await res.json()) as { success: boolean; message?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Something went wrong sending that.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong sending that.");
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* ---------------- pitch ---------------- */}
          <div>
            <Reveal>
              <p className="eyebrow">Contact</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 text-section text-balance">
                Tell me what you&apos;re building.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-body">
                Whether it&apos;s an idea on a napkin or an app that stopped
                working last Tuesday — send it over. I&apos;ll tell you what I
                think before you commit to anything.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Hire me on
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={site.hire.upwork}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    >
                      Upwork ↗
                    </a>
                    {hasFiverr && (
                      <a
                        href={site.hire.fiverr}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/25"
                      >
                        Fiverr ↗
                      </a>
                    )}
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/25"
                    >
                      Email
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block break-all font-display text-lg font-bold text-ink transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </div>

                {/* Email already has its own block above, so only show
                    the non-email profiles here (X, GitHub…) once added. */}
                {elsewhere.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                      Elsewhere
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {elsewhere.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-block rounded-lg border border-line px-4 py-2 text-sm font-medium text-body transition-all hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2.5 rounded-xl bg-accent-soft px-4 py-3">
                  <span
                    className="h-2 w-2 rounded-full bg-accent"
                    style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                  />
                  <p className="text-sm font-semibold text-accent">
                    {site.available
                      ? "Available for new projects"
                      : "Booked — join the waitlist"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- form ---------------- */}
          <Reveal delay={0.1}>
            <div className="card p-8 md:p-10">
              {status === "sent" ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
                    ✓
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-xs text-base text-body">
                    I read everything myself and reply within a day. Talk soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-accent hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* honeypot — hidden from humans, irresistible to bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={sending}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={sending}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="mb-2 block text-sm font-semibold text-ink">
                      What do you need?
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      disabled={sending}
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                      Tell me about it
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={sending}
                      placeholder="What are you building, what's it for, and where are you stuck?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {error} You can also email me directly at{" "}
                      <a href={`mailto:${site.email}`} className="underline">
                        {site.email}
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(255,122,0,0.7)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {sending ? "Sending…" : "Send message"}
                    {!sending && (
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted">
                    I reply to everything within one working day.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
