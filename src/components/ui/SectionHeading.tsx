import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onNavy = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  onNavy?: boolean;
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <Reveal>
        <p className={onNavy ? "eyebrow text-accent" : "eyebrow"}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={`mt-4 text-section text-balance ${onNavy ? "text-white" : ""}`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className={`mt-5 text-lead ${onNavy ? "text-on-navy/80" : "text-body"}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
