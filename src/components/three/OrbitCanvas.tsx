"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { platforms } from "@/data/platforms";
import { useHasFinePointer, useIsMobile, useOnScreen } from "@/lib/hooks";

const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });

/**
 * Static "orbit" — used only when the user prefers reduced motion, so it
 * deliberately doesn't animate: four logos on two rings around the core.
 */
function LiteOrbit() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
      {/* the two rings */}
      <div aria-hidden className="absolute h-[13rem] w-[13rem] rounded-full border border-slate-300/70" />
      <div aria-hidden className="absolute h-[18rem] w-[18rem] rounded-full border border-slate-300/70" />
      <div className="absolute flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-300">
        <span className="h-8 w-8 rounded-full bg-accent" />
      </div>

      {platforms.map((p, i) => {
        const angle = -90 + i * 90; // top, right, bottom, left
        const r = i % 2 === 0 ? "6.5rem" : "9rem";
        return (
          <div
            key={p.id}
            className="absolute h-20 w-20"
            style={{ transform: `rotate(${angle}deg) translateX(${r}) rotate(${-angle}deg)` }}
          >
            <Image
              src={p.logo}
              alt={p.name}
              fill
              sizes="80px"
              className="object-contain drop-shadow-lg"
            />
          </div>
        );
      })}
    </div>
  );
}

export function OrbitCanvas() {
  const mobile = useIsMobile();
  const finePointer = useHasFinePointer();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(wrapRef);
  const [active, setActive] = useState<string | null>(null);

  const hovered = platforms.find((p) => p.id === active);

  if (mobile === null || finePointer === null) return <div className="aspect-square w-full" aria-hidden />;

  // Only skip WebGL when the user explicitly wants less motion.
  if (reduced) return <LiteOrbit />;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[520px] touch-none"
    >
      <Canvas
        // Scrolled away → "never": the GPU stops completely.
        frameloop={visible ? "always" : "never"}
        dpr={mobile ? [1, 1.3] : [1, 1.75]}
        camera={{ position: [0, 1.2, mobile ? 11 : 10], fov: 40 }}
        gl={{ antialias: !mobile, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <OrbitScene finePointer={finePointer} onActive={setActive} />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>

      {/* Readout — tap on mobile, hover on desktop. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22 }}
              className="card max-w-sm px-6 py-5 text-center shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {hovered.role}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ink">
                {hovered.name}
              </p>
              <p className="mt-2 text-base text-body">{hovered.blurb}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!hovered && (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm font-medium text-muted">
          {finePointer ? "Hover a platform" : "Tap a platform"}
        </p>
      )}
    </div>
  );
}
