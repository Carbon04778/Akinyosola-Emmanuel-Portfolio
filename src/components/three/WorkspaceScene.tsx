"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   MONOCHROME STUDIO PALETTE
   Everything is white / slate / navy. Orange appears in exactly four
   places: the screen accent, the keyboard underglow, the mug, the pen.

   No HDR environment map — drei's `preset` pulls ~500 KB from a
   third-party CDN at runtime and its docs say not to use it in
   production. A hemisphere + key + rim light rig does the job for a
   stylised scene at this size, and costs nothing to download.
------------------------------------------------------------------ */
const C = {
  white: "#f8fafc",
  offWhite: "#e2e8f0",
  slate: "#94a3b8",
  slateDark: "#475569",
  navy: "#071d49",
  navyLight: "#103f91",
  accent: "#ff7a00",
};

function useMaterials() {
  return useMemo(
    () => ({
      deskTop: new THREE.MeshStandardMaterial({ color: C.white, roughness: 0.5 }),
      deskEdge: new THREE.MeshStandardMaterial({ color: C.offWhite, roughness: 0.6 }),
      // Lower metalness than a PBR "metal" — without an env map, high
      // metalness just renders black. This reads as brushed aluminium.
      metal: new THREE.MeshStandardMaterial({ color: C.slate, roughness: 0.35, metalness: 0.35 }),
      dark: new THREE.MeshStandardMaterial({ color: C.navy, roughness: 0.45, metalness: 0.1 }),
      fabric: new THREE.MeshStandardMaterial({ color: C.slateDark, roughness: 0.95 }),
      light: new THREE.MeshStandardMaterial({ color: C.offWhite, roughness: 0.55 }),
      screen: new THREE.MeshStandardMaterial({
        color: C.navy,
        emissive: new THREE.Color(C.navyLight),
        emissiveIntensity: 0.55,
        roughness: 0.7, // matte — no hot-spot from the accent light
      }),
      accent: new THREE.MeshStandardMaterial({
        color: C.accent,
        emissive: new THREE.Color(C.accent),
        emissiveIntensity: 0.7,
        roughness: 0.4,
      }),
      chrome: new THREE.MeshStandardMaterial({ color: C.white, roughness: 0.25, metalness: 0.2 }),
      // Flat, unlit "ink" for the on-screen code lines — crisp at any angle.
      codeLight: new THREE.MeshBasicMaterial({ color: C.offWhite }),
      codeDim: new THREE.MeshBasicMaterial({ color: C.slate }),
      codeAccent: new THREE.MeshBasicMaterial({ color: C.accent }),
    }),
    [],
  );
}

type M = ReturnType<typeof useMaterials>;

/* ------------------------------------------------------------------ */
function Desk({ m }: { m: M }) {
  return (
    <group>
      <mesh castShadow receiveShadow material={m.deskTop}>
        <boxGeometry args={[4.5, 0.1, 2.15]} />
      </mesh>
      <mesh position={[0, -0.1, 0]} receiveShadow material={m.deskEdge}>
        <boxGeometry args={[4.35, 0.11, 2]} />
      </mesh>
      {[
        [-2.05, -1.1, -0.88],
        [2.05, -1.1, -0.88],
        [-2.05, -1.1, 0.88],
        [2.05, -1.1, 0.88],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow material={m.metal}>
          <cylinderGeometry args={[0.045, 0.045, 2, 12]} />
        </mesh>
      ))}
      {/* cross-brace, gives the frame some engineering */}
      <mesh position={[0, -1.9, 0]} castShadow material={m.metal}>
        <boxGeometry args={[3.9, 0.06, 0.06]} />
      </mesh>
    </group>
  );
}

/**
 * The screen shows a code editor: a sidebar, an accent tab, and lines of
 * "code" at varying indents — plus a blinking cursor. Fits a full-stack
 * developer better than a landing-page mock did.
 */
const CODE_LINES: { indent: number; width: number; tone: "light" | "dim" | "accent" }[] = [
  { indent: 0, width: 0.55, tone: "accent" },
  { indent: 1, width: 0.9, tone: "light" },
  { indent: 1, width: 0.7, tone: "dim" },
  { indent: 2, width: 1.05, tone: "light" },
  { indent: 2, width: 0.6, tone: "accent" },
  { indent: 2, width: 0.85, tone: "light" },
  { indent: 1, width: 0.45, tone: "dim" },
  { indent: 0, width: 0.3, tone: "light" },
  { indent: 1, width: 0.95, tone: "light" },
  { indent: 1, width: 0.5, tone: "dim" },
];

function Monitor({ m, reduced }: { m: M; reduced: boolean }) {
  const cursor = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!cursor.current || reduced) return;
    // Classic 1 Hz editor blink.
    cursor.current.visible = Math.floor(clock.elapsedTime * 2) % 2 === 0;
  });

  const tone = { light: m.codeLight, dim: m.codeDim, accent: m.codeAccent };
  const lastLine = CODE_LINES[CODE_LINES.length - 1];

  return (
    <group position={[0, 0.05, -0.6]}>
      <mesh position={[0, 0.03, 0]} castShadow material={m.chrome}>
        <cylinderGeometry args={[0.34, 0.4, 0.05, 28]} />
      </mesh>
      <mesh position={[0, 0.36, -0.02]} castShadow material={m.chrome}>
        <boxGeometry args={[0.09, 0.68, 0.07]} />
      </mesh>

      {/* chassis */}
      <mesh position={[0, 0.98, 0]} castShadow material={m.light}>
        <boxGeometry args={[2.72, 1.58, 0.06]} />
      </mesh>
      {/* panel */}
      <mesh position={[0, 0.98, 0.036]} material={m.screen}>
        <planeGeometry args={[2.58, 1.44]} />
      </mesh>

      {/* editor UI */}
      <group position={[0, 0.98, 0.042]}>
        {/* top bar with one accent "active tab" */}
        <mesh position={[0, 0.655, 0]} material={m.codeDim}>
          <planeGeometry args={[2.58, 0.004]} />
        </mesh>
        <mesh position={[-0.98, 0.69, 0]} material={m.codeAccent}>
          <planeGeometry args={[0.42, 0.05]} />
        </mesh>
        {/* sidebar */}
        <mesh position={[-1.15, -0.04, 0]} material={m.codeDim}>
          <planeGeometry args={[0.004, 1.38]} />
        </mesh>
        {[0.5, 0.36, 0.22, 0.08, -0.06].map((y, i) => (
          <mesh key={i} position={[-1.22, y, 0]} material={i === 1 ? m.codeLight : m.codeDim}>
            <planeGeometry args={[0.1, 0.03]} />
          </mesh>
        ))}
        {/* code lines */}
        {CODE_LINES.map((l, i) => {
          const x = -1.06 + l.indent * 0.12 + l.width / 2;
          const y = 0.5 - i * 0.117;
          return (
            <mesh key={i} position={[x, y, 0]} material={tone[l.tone]}>
              <planeGeometry args={[l.width, 0.04]} />
            </mesh>
          );
        })}
        {/* cursor after the last line */}
        <mesh
          ref={cursor}
          position={[
            -1.06 + lastLine.indent * 0.12 + lastLine.width + 0.03,
            0.5 - (CODE_LINES.length - 1) * 0.117,
            0,
          ]}
          material={m.codeAccent}
        >
          <planeGeometry args={[0.02, 0.07]} />
        </mesh>
      </group>
    </group>
  );
}

/** 52 keys in ONE draw call via instancing (was 52 separate meshes). */
function Keyboard({ m }: { m: M }) {
  const keys = useRef<THREE.InstancedMesh>(null);
  const COLS = 13;
  const ROWS = 4;

  useLayoutEffect(() => {
    const mesh = keys.current;
    if (!mesh) return;
    const mat = new THREE.Matrix4();
    let i = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        mat.setPosition(c * 0.105 - 0.63, 0.042, r * 0.105 - 0.16);
        mesh.setMatrixAt(i++, mat);
      }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0, 0.08, 0.45]}>
      <mesh castShadow receiveShadow material={m.light}>
        <boxGeometry args={[1.52, 0.055, 0.56]} />
      </mesh>
      <instancedMesh ref={keys} args={[undefined, undefined, COLS * ROWS]} material={m.chrome}>
        <boxGeometry args={[0.085, 0.025, 0.085]} />
      </instancedMesh>
      {/* underglow — one of the four orange moments */}
      <mesh position={[0, -0.021, 0]} material={m.accent}>
        <boxGeometry args={[1.44, 0.012, 0.48]} />
      </mesh>
    </group>
  );
}

function Mouse({ m }: { m: M }) {
  return (
    <mesh position={[1.08, 0.1, 0.45]} castShadow material={m.light}>
      <capsuleGeometry args={[0.068, 0.075, 4, 14]} />
    </mesh>
  );
}

function Mug({ m }: { m: M }) {
  return (
    <group position={[-1.52, 0.15, 0.42]}>
      <mesh castShadow material={m.accent}>
        <cylinderGeometry args={[0.098, 0.088, 0.2, 24]} />
      </mesh>
      <mesh position={[0.128, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.accent}>
        <torusGeometry args={[0.052, 0.013, 8, 22]} />
      </mesh>
      <mesh position={[0, 0.098, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.dark}>
        <circleGeometry args={[0.084, 22]} />
      </mesh>
    </group>
  );
}

function Plant({ m }: { m: M }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 0.095, 0.25 + (i % 3) * 0.055, Math.sin(a) * 0.095] as [number, number, number],
          rot: [Math.cos(a) * 0.55, a, Math.sin(a) * 0.55] as [number, number, number],
        };
      }),
    [],
  );

  return (
    <group position={[-2.0, 0.05, -0.52]}>
      <mesh castShadow material={m.light}>
        <cylinderGeometry args={[0.13, 0.1, 0.22, 20]} />
      </mesh>
      <mesh position={[0, 0.115, 0]} material={m.fabric}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 20]} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} position={l.pos} rotation={l.rot} castShadow material={m.metal}>
          <sphereGeometry args={[0.075, 10, 7]} />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ m }: { m: M }) {
  return (
    <group position={[0, -0.95, 1.9]}>
      <mesh position={[0, 0.35, 0]} castShadow material={m.fabric}>
        <boxGeometry args={[0.88, 0.1, 0.82]} />
      </mesh>
      <mesh position={[0, 0.97, 0.37]} rotation={[0.15, 0, 0]} castShadow material={m.fabric}>
        <boxGeometry args={[0.82, 1.12, 0.07]} />
      </mesh>
      <mesh position={[0, 1.63, 0.28]} rotation={[0.15, 0, 0]} castShadow material={m.dark}>
        <boxGeometry args={[0.46, 0.22, 0.08]} />
      </mesh>
      {[-0.49, 0.49].map((x) => (
        <mesh key={x} position={[x, 0.63, 0]} castShadow material={m.dark}>
          <boxGeometry args={[0.06, 0.055, 0.5]} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]} castShadow material={m.metal}>
        <cylinderGeometry args={[0.055, 0.055, 0.6, 14]} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.22, -0.25, Math.sin(a) * 0.22]}
            rotation={[0, -a, 0]}
            castShadow
            material={m.metal}
          >
            <boxGeometry args={[0.44, 0.035, 0.055]} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Notebook + pen on the left, a closed laptop on the right. */
function Accessories({ m }: { m: M }) {
  return (
    <group>
      <mesh position={[-1.06, 0.07, -0.18]} rotation={[0, 0.22, 0]} castShadow material={m.chrome}>
        <boxGeometry args={[0.32, 0.025, 0.42]} />
      </mesh>
      <mesh position={[-1.0, 0.093, -0.18]} rotation={[0, 0.22, Math.PI / 2]} castShadow material={m.accent}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
      </mesh>
      <mesh position={[1.72, 0.075, 0.1]} rotation={[0, -0.28, 0]} castShadow material={m.dark}>
        <boxGeometry args={[0.62, 0.04, 0.44]} />
      </mesh>
    </group>
  );
}


/* ------------------------------------------------------------------
   CONTROLLER
   Two nested groups:
     look  — pointer-follow parallax + user pitch (tilt)     [outer]
     spin  — user yaw (drag / flick / keys) + auto turntable  [inner]

   Input arrives through `WorkspaceControlApi` (the wrapper <div> in
   WorkspaceCanvas owns the DOM: cursor, focus, ARIA, listeners). All
   state lives in a ref mutated in callbacks and useFrame — no React
   state, so dragging never re-renders. Smoothing is frame-rate-
   independent exponential damping (1 - e^(-lambda * dt)).
------------------------------------------------------------------ */
const PITCH_MIN = -0.12; // can't look up from under the desk
const PITCH_MAX = 0.55; // can't flip over the top
const DRAG_YAW = Math.PI * 1.6; // radians per full canvas-width drag (sharp)
const DRAG_PITCH = Math.PI * 0.7; // radians per full canvas-height drag
const FLICK_FRICTION = 3.2; // higher = inertia dies faster
const AUTO_RESUME_MS = 3000; // idle time before the turntable resumes
const KEY_STEP = 0.9; // rad/s while an arrow key is held

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

export type ArrowKey = "left" | "right" | "up" | "down";

/** What the wrapper element calls. Coordinates are client px. */
export type WorkspaceControlApi = {
  dragStart: (x: number, y: number) => void;
  dragMove: (x: number, y: number) => void;
  dragEnd: () => void;
  reset: () => void;
  key: (k: ArrowKey, down: boolean) => void;
};

export default function WorkspaceScene({
  reduced,
  mobile = false,
  finePointer = true,
  onReady,
}: {
  reduced: boolean;
  mobile?: boolean;
  /** Mouse/trackpad present → pointer-follow parallax. */
  finePointer?: boolean;
  /** Receives the control API once the scene is mounted. */
  onReady?: (api: WorkspaceControlApi) => void;
}) {
  const m = useMaterials();
  const spin = useRef<THREE.Group>(null);
  const look = useRef<THREE.Group>(null);
  const { gl, size } = useThree();

  const c = useRef({
    yaw: 0, // user + auto yaw, applied to `spin`
    pitch: 0, // user tilt, applied to `look`
    vYaw: 0, // flick velocity (rad/s)
    vPitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    idleSince: -1e9, // performance.now() of the last interaction
    resetting: false, // double-click → glide back to front view
    keys: { left: false, right: false, up: false, down: false } as Record<ArrowKey, boolean>,
    par: { yaw: 0, pitch: 0, x: 0 }, // parallax targets from the window pointer
  });

  /* ---- input API, handed to the wrapper once ---- */
  const api = useMemo<WorkspaceControlApi>(() => {
    const s = c.current;
    return {
      dragStart(x, y) {
        s.dragging = true;
        s.resetting = false;
        s.vYaw = 0;
        s.vPitch = 0;
        s.lastX = x;
        s.lastY = y;
        s.lastT = performance.now();
      },
      dragMove(x, y) {
        if (!s.dragging) return;
        const now = performance.now();
        const dt = Math.max((now - s.lastT) / 1000, 1 / 240);
        const dYaw = ((x - s.lastX) / size.width) * DRAG_YAW;
        const dPitch = ((y - s.lastY) / size.height) * DRAG_PITCH;
        s.yaw += dYaw;
        s.pitch = clamp(s.pitch + dPitch, PITCH_MIN, PITCH_MAX);
        // velocity for the flick, lightly smoothed so one jittery sample can't spike it
        s.vYaw = s.vYaw * 0.4 + (dYaw / dt) * 0.6;
        s.vPitch = s.vPitch * 0.4 + (dPitch / dt) * 0.6;
        s.lastX = x;
        s.lastY = y;
        s.lastT = now;
      },
      dragEnd() {
        if (!s.dragging) return;
        s.dragging = false;
        s.idleSince = performance.now();
        // If the pointer paused before release, don't flick.
        if (performance.now() - s.lastT > 80) {
          s.vYaw = 0;
          s.vPitch = 0;
        }
      },
      reset() {
        s.resetting = true;
        s.vYaw = 0;
        s.vPitch = 0;
        s.idleSince = performance.now();
      },
      key(k, down) {
        s.keys[k] = down;
        if (down) s.resetting = false;
        s.idleSince = performance.now();
      },
    };
  }, [size.width, size.height]);

  useEffect(() => {
    onReady?.(api);
  }, [api, onReady]);

  /* ---- pointer-follow across the WHOLE hero, not just the canvas ---- */
  useEffect(() => {
    if (!finePointer || reduced) return;
    const el = gl.domElement;
    const s = c.current;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      // -1..1 relative to the canvas centre, normalised by the viewport so
      // the far edge of the hero still counts as "far".
      const nx = clamp(((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2, -1, 1);
      const ny = clamp(((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 2, -1, 1);
      s.par.yaw = nx * 0.45;
      s.par.pitch = ny * 0.18;
      s.par.x = nx * 0.2;
    };
    const onLeave = () => {
      s.par.yaw = 0;
      s.par.pitch = 0;
      s.par.x = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [gl, finePointer, reduced]);

  /* ---- per-frame integration ---- */
  useFrame(({ clock }, delta) => {
    if (!spin.current || !look.current) return;
    const s = c.current;
    const dt = Math.min(delta, 1 / 20); // never integrate a huge tab-switch delta
    const now = performance.now();

    if (!s.dragging) {
      // keys
      const kx = (s.keys.right ? 1 : 0) - (s.keys.left ? 1 : 0);
      const ky = (s.keys.down ? 1 : 0) - (s.keys.up ? 1 : 0);
      if (kx || ky) {
        s.yaw += kx * KEY_STEP * dt;
        s.pitch = clamp(s.pitch + ky * KEY_STEP * 0.6 * dt, PITCH_MIN, PITCH_MAX);
        s.idleSince = now;
      }

      // flick inertia
      if (Math.abs(s.vYaw) > 1e-3 || Math.abs(s.vPitch) > 1e-3) {
        s.yaw += s.vYaw * dt;
        s.pitch = clamp(s.pitch + s.vPitch * dt, PITCH_MIN, PITCH_MAX);
        const f = Math.exp(-FLICK_FRICTION * dt);
        s.vYaw *= f;
        s.vPitch *= f;
        s.idleSince = now;
      }

      // double-click / Home → glide back to the front view
      if (s.resetting) {
        const k = damp(6, dt);
        const twoPi = Math.PI * 2;
        const wrapped = ((s.yaw % twoPi) + twoPi) % twoPi;
        const toZero = wrapped > Math.PI ? twoPi - wrapped : -wrapped; // shortest way round
        s.yaw += toZero * k;
        s.pitch += (0 - s.pitch) * k;
        if (Math.abs(toZero) < 0.002 && Math.abs(s.pitch) < 0.002) {
          s.yaw = 0;
          s.pitch = 0;
          s.resetting = false;
        }
      }

      // auto turntable, only after the user has been idle for a while
      const idle = now - s.idleSince > AUTO_RESUME_MS;
      if (!reduced && idle && !s.resetting) s.yaw += dt * (mobile ? 0.18 : 0.1);
    }

    // apply yaw (spin) directly, no lag — this is what makes the drag feel sharp
    spin.current.rotation.y = s.yaw;

    // apply tilt + parallax (look), damped so it glides
    const interacting = s.dragging || now - s.idleSince < 400;
    const pYaw = interacting ? 0 : s.par.yaw;
    const pPitch = interacting ? 0 : s.par.pitch;
    const pX = interacting ? 0 : s.par.x;
    const kTilt = damp(s.dragging ? 30 : 5, dt); // tilt tracks the finger tightly while dragging
    const kPar = damp(5, dt);
    look.current.rotation.x += (s.pitch + pPitch - look.current.rotation.x) * kTilt;
    look.current.rotation.y += (pYaw - look.current.rotation.y) * kPar;
    look.current.position.x += (pX - look.current.position.x) * kPar;

    // slow float so the rig never feels frozen
    look.current.position.y = reduced ? 0.1 : 0.1 + Math.sin(clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <>
      {/* Studio lighting: sky/ground fill, one key with shadows, one cool rim. */}
      <hemisphereLight args={["#ffffff", "#334155", 1.1]} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={24}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#cbd5e1" />
      <pointLight position={[0, 1.2, 0.4]} intensity={5} color={C.accent} distance={4} />

      <group ref={look} position={[0, 0.1, 0]}>
        <group ref={spin}>
          <Desk m={m} />
          <Monitor m={m} reduced={reduced} />
          <Keyboard m={m} />
          <Mouse m={m} />
          <Mug m={m} />
          <Plant m={m} />
          <Accessories m={m} />
          <Chair m={m} />

          {/* Soft grounding shadow. Inside the turntable so it rotates WITH
              the desk — which means it can be baked once (frames=1) instead
              of re-rendered every frame. */}
          <ContactShadows
            position={[0, -2.05, 0]}
            opacity={0.42}
            scale={11}
            blur={2.6}
            far={4.5}
            resolution={mobile ? 256 : 512}
            color="#071d49"
            frames={1}
          />
        </group>
      </group>
    </>
  );
}
