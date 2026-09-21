import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "onNavy";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300";

const variants: Record<Variant, string> = {
  // The one loud element on the page.
  primary:
    "bg-accent text-white shadow-[0_10px_24px_-10px_rgba(255,122,0,0.6)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(255,122,0,0.7)]",
  outline:
    "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-ink/25",
  onNavy:
    "border border-white/25 text-white hover:-translate-y-0.5 hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
