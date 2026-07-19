import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Shared pointer (canvas has pointer-events disabled, so listen globally) */
function useGlobalPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pointer;
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.15;
      inner.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });
  return (
    <group ref={group}>
      {/* outer wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[2.15, 1]} />
        <meshBasicMaterial color="#e9a23b" wireframe transparent opacity={0.16} />
      </mesh>
      {/* rotating facet core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.12, 0]} />
        <meshStandardMaterial
          color="#17171f"
          emissive="#e9a23b"
          emissiveIntensity={0.14}
          metalness={0.85}
          roughness={0.3}
          flatShading
        />
      </mesh>
      {/* glowing nucleus */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#ffc86b" />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={26} distance={14} color="#e9a23b" />
    </group>
  );
}

function Rings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.12;
    if (r2.current) r2.current.rotation.z -= delta * 0.09;
    if (r3.current) r3.current.rotation.z += delta * 0.05;
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.15, 0.3, 0]}>
        <torusGeometry args={[3.2, 0.012, 8, 160]} />
        <meshBasicMaterial color="#e9a23b" transparent opacity={0.5} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 1.75, -0.5, 0.4]}>
        <torusGeometry args={[3.9, 0.01, 8, 160]} />
        <meshBasicMaterial color="#5b6478" transparent opacity={0.55} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 2.6, 0.9, -0.3]}>
        <torusGeometry args={[4.7, 0.008, 8, 160]} />
        <meshBasicMaterial color="#3a3d4a" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const angle = (i / 11) * Math.PI * 2 + Math.random() * 0.6;
        const radius = 4.4 + Math.random() * 2.6;
        return {
          pos: [Math.cos(angle) * radius, (Math.random() - 0.5) * 3.4, Math.sin(angle) * radius] as [number, number, number],
          scale: 0.14 + Math.random() * 0.3,
          speed: 1 + Math.random() * 1.4,
          gold: Math.random() > 0.55,
        };
      }),
    []
  );
  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.4} floatIntensity={1.8}>
          <mesh position={s.pos} scale={s.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.gold ? "#2b2113" : "#191923"}
              emissive={s.gold ? "#e9a23b" : "#40465c"}
              emissiveIntensity={s.gold ? 0.45 : 0.2}
              metalness={0.7}
              roughness={0.35}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig() {
  const pointer = useGlobalPointer();
  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, pointer.current.x * 1.0, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.55 + pointer.current.y * 0.55, 2, delta);
    state.camera.lookAt(0, 0.15, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.55, 9.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#07070a", 9, 24]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[7, 6, 5]} intensity={70} color="#e9a23b" />
      <pointLight position={[-7, 3, -5]} intensity={50} color="#5b7cff" />

      <Core />
      <Rings />
      <Shards />

      <Sparkles count={150} scale={[17, 8, 17]} size={1.7} speed={0.25} opacity={0.55} color="#ffc86b" position={[0, 1, 0]} />
      <Sparkles count={70} scale={[18, 9, 18]} size={1.1} speed={0.18} opacity={0.35} color="#cdd3e0" position={[0, 0.6, 0]} />

      <Grid
        position={[0, -3.3, 0]}
        args={[40, 40]}
        cellSize={0.85}
        cellThickness={0.55}
        cellColor="#1a1a22"
        sectionSize={4.2}
        sectionThickness={0.8}
        sectionColor="#7a5514"
        fadeDistance={26}
        fadeStrength={2.4}
        infiniteGrid
      />
      <Rig />
    </Canvas>
  );
}
