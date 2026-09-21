import type { Variants } from "motion/react";

/** Standard reveal. Small distance, long ease — expensive-feeling, not bouncy. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Parent that staggers its children. */
export const stagger = (
  delayChildren = 0,
  staggerChildren = 0.08,
): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
