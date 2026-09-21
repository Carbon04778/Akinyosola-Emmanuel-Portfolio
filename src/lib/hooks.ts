"use client";

import { useEffect, useState, type RefObject } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * Small screen (phone / narrow tablet) — used to LIGHTEN the 3D scenes
 * (lower DPR, no shadows, closer camera). Width only, on purpose: a
 * touchscreen laptop is not a phone.
 * `null` until measured — don't commit to a device profile before then.
 */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Does the user have a mouse/trackpad? Drives pointer-follow parallax.
 * `(hover: hover) and (pointer: fine)` is the correct test — checking
 * `(pointer: coarse)` alone misclassifies touchscreen laptops as phones.
 */
export function useHasFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * Is the element on (or near) screen? Used to switch a <Canvas> to
 * frameloop="never" when scrolled away — that stops the GPU entirely,
 * not just our animation maths.
 */
export function useOnScreen(ref: RefObject<HTMLElement | null>, margin = "150px") {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return visible;
}
