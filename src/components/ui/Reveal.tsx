"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { viewportOnce } from "@/lib/motion";

/** Scroll-triggered reveal. Falls back to a plain div under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // data-reveal lets globals.css force these visible under prefers-reduced-motion,
  // regardless of the inline opacity:0 the server rendered for the motion variant.
  if (reduced) return <div data-reveal className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
