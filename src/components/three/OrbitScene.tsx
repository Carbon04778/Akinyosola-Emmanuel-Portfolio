"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { platforms, type Platform } from "@/data/platforms";

/* ------------------------------------------------------------------
   Each platform gets its OWN orbit: different radius, tilt, phase,
   direction and speed. They weave past each other instead of marching
   around one flat ring. The path is drawn as a faint ring so the eye
   can follow it; the hovered tile's ring lights up orange.
------------------------------------------------------------------ */
const ORBITS = [
  { radius: 2.0, tiltX: 0.35, tiltZ: -0.2, speed: 0.22, phase: 0, squash: 0.62 },
  { radius: 2.4, tiltX: -0.28, tiltZ: 0.4, speed: -0.17, phase: 1.6, squash: 0.7 },
  { radius: 1.85, tiltX: 0.55, tiltZ: 0.25, speed: 0.28, phase: 3.1, squash: 0.55 },
  { radius: 2.55, tiltX: -0.12, tiltZ: -0.45, speed: -0.14, phase: 4.7, squash: 0.75 },
];
type Orbit = (typeof ORBITS)[number];

const RING_GREY = new THREE.Color("#cbd5e1");
const RING_ACCENT = new THREE.Color("#ff7a00");

/** The elliptical path itself — 96 points, one draw call, ~free. */
function OrbitRing({ orbit, active }: { orbit: Orbit; active: boolean }) {
  const mat = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const euler = new THREE.Euler(orbit.tiltX, 0, orbit.tiltZ);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius * orbit.squash).applyEuler(euler),
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [orbit]);

  useFrame(() => {
    // Ease colour + opacity toward the hover state. No React state involved.
    const m = mat.current;
    if (!m) return;
    m.color.lerp(active ? RING_ACCENT : RING_GREY, 0.12);
    m.opacity += ((active ? 0.9 : 0.35) - m.opacity) * 0.12;
  });

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial ref={mat} color={RING_GREY} transparent opacity={0.35} />
    </lineLoop>
  );
}

/** Small deterministic PRNG (mulberry32) — same dust every render, no Math.random in render. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function PlatformTile({
  platform,
  orbit,
  active,
  onHover,
}: {
  platform: Platform;
  orbit: Orbit;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const t = useRef(orbit.phase);

  // Colour space is set in the load callback, not during render.
  const logo = useTexture(platform.logo, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const euler = useMemo(() => new THREE.Euler(orbit.tiltX, 0, orbit.tiltZ), [orbit.tiltX, orbit.tiltZ]);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Hovering slows the tile almost to a stop so it's readable.
    const rate = active ? 0.08 : 1;
    t.current += delta * orbit.speed * rate;

    const a = t.current;
    const bob = Math.sin(state.clock.elapsedTime * 0.8 + orbit.phase) * 0.12;

    vec.set(Math.cos(a) * orbit.radius, bob, Math.sin(a) * orbit.radius * orbit.squash);
    vec.applyEuler(euler);
    group.current.position.copy(vec);

    // Scale up + halo in on hover, both damped.
    const target = active ? 1.25 : 1;
    const s = group.current.scale.x + (target - group.current.scale.x) * 0.12;
    group.current.scale.setScalar(s);

    if (halo.current) {
      const mat = halo.current.material as THREE.MeshBasicMaterial;
      mat.opacity += ((active ? 0.35 : 0) - mat.opacity) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Billboard>
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(platform.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            onHover(null);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            // Tap toggles on touch devices (no hover there).
            onHover(active ? null : platform.id);
          }}
        >
          {/* soft orange halo, only visible on hover */}
          <mesh ref={halo} position={[0, 0, -0.02]}>
            <circleGeometry args={[1.1, 32]} />
            <meshBasicMaterial color="#ff7a00" transparent opacity={0} depthWrite={false} />
          </mesh>
          {/* the logo — a self-contained glass object, no tile behind it */}
          <mesh>
            <planeGeometry args={[1.6, 1.6]} />
            <meshBasicMaterial map={logo} transparent toneMapped={false} />
          </mesh>
        </group>
      </Billboard>
    </group>
  );
}

/** The centre: a slowly turning wireframe shell around a pulsing orange core. */
function Core() {
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.15;
      shell.current.rotation.x += delta * 0.06;
    }
    if (inner.current) {
      inner.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.07);
    }
  });

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#ff7a00" emissive="#ff7a00" emissiveIntensity={0.45} roughness={0.35} />
      </mesh>
      <pointLight intensity={6} color="#ff7a00" distance={7} />
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = seeded(44);
    const arr = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      const r = 3 + rand() * 3;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.cos(ph) * 0.5;
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#94a3b8" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function OrbitScene({
  finePointer = true,
  onActive,
}: {
  /** Mouse present → the whole rig leans toward the cursor. */
  finePointer?: boolean;
  onActive: (id: string | null) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const rig = useRef<THREE.Group>(null);

  const handleHover = (id: string | null) => {
    setActive(id);
    onActive(id);
  };

  useFrame((state) => {
    if (!rig.current || !finePointer) return;
    const tx = state.pointer.y * 0.1;
    const ty = state.pointer.x * 0.15;
    rig.current.rotation.x += (tx - rig.current.rotation.x) * 0.04;
    rig.current.rotation.y += (ty - rig.current.rotation.y) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#ffffff" distance={10} />

      <group ref={rig}>
        <Core />
        {platforms.map((p, i) => (
          <group key={p.id}>
            <OrbitRing orbit={ORBITS[i]} active={active === p.id} />
            <PlatformTile
              platform={p}
              orbit={ORBITS[i]}
              active={active === p.id}
              onHover={handleHover}
            />
          </group>
        ))}
        <Dust />
      </group>
    </>
  );
}
