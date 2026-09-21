"use client";

import dynamic from "next/dynamic";
import {
  Suspense,
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHasFinePointer, useIsMobile, useOnScreen } from "@/lib/hooks";
import type { ArrowKey, WorkspaceControlApi } from "./WorkspaceScene";

const WorkspaceScene = dynamic(() => import("./WorkspaceScene"), { ssr: false });

const ARROWS: Record<string, ArrowKey> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
};

export function WorkspaceCanvas() {
  const mobile = useIsMobile();
  const finePointer = useHasFinePointer();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(wrapRef);

  // The scene hands us its control API once mounted; we forward DOM input to it.
  const api = useRef<WorkspaceControlApi | null>(null);
  const onReady = useCallback((a: WorkspaceControlApi) => {
    api.current = a;
  }, []);

  // Ref = instant gate for move events; state = cursor class (re-render is fine).
  const dragRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(true);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // Capture so the drag keeps working when the pointer leaves the box.
    e.currentTarget.setPointerCapture(e.pointerId);
    api.current?.dragStart(e.clientX, e.clientY);
    dragRef.current = true;
    setDragging(true);
    setHint(false);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) api.current?.dragMove(e.clientX, e.clientY);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = false;
    api.current?.dragEnd();
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const k = ARROWS[e.key];
    if (k) {
      e.preventDefault();
      api.current?.key(k, true);
      setHint(false);
    } else if (e.key === "Home") {
      e.preventDefault();
      api.current?.reset();
    }
  };
  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const k = ARROWS[e.key];
    if (k) api.current?.key(k, false);
  };

  // Don't commit to a device profile until we've measured it.
  if (mobile === null || finePointer === null) {
    return (
      <div className="mx-auto aspect-square w-full max-h-[48svh] lg:max-h-[min(520px,62svh)]" aria-hidden />
    );
  }

  return (
    <div
      ref={wrapRef}
      role="img"
      tabIndex={0}
      aria-label="Interactive 3D desk. Drag to rotate, double-click to reset, or use the arrow keys."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={() => api.current?.reset()}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      // touch-pan-y: a horizontal drag rotates, a vertical swipe still scrolls the page.
      className={`relative mx-auto aspect-square w-full max-h-[48svh] touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-2xl lg:max-h-[min(520px,62svh)] ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <Canvas
        /**
         * "always" while on screen so drag/flick/keys render every frame
         * (reduced-motion only disables the ambient motion, not the user's
         * own input); "never" when scrolled away so the GPU fully idles.
         * (recommended by the R3F "scaling performance" docs)
         */
        frameloop={visible ? "always" : "never"}
        shadows={!mobile}
        // Cap pixel ratio harder on phones to keep it smooth.
        dpr={mobile ? [1, 1.3] : [1, 1.75]}
        camera={{ position: [0, 0.8, mobile ? 10.5 : 9.5], fov: 34 }}
        gl={{
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <WorkspaceScene
            reduced={!!reduced}
            mobile={mobile}
            finePointer={finePointer}
            onReady={onReady}
          />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>

      {/* One-time hint; fades after the first drag or key press. */}
      <AnimatePresence>
        {hint && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="pointer-events-none absolute inset-x-0 bottom-1 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-on-navy/45"
          >
            {finePointer ? "Drag to rotate · double-click to reset" : "Drag to rotate"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
