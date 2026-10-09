import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import * as THREE from "three";

const PETAL_COLORS = [
  "#5b0f2e",
  "#7e1d46",
  "#9d174d",
  "#4a0d24",
  "#6d28d9",
  "#a83b5e",
];

const GROUND_Y = -16;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useSoftTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.28, "rgba(255,255,255,0.5)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function useSkyTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, "#0b0726");
    gradient.addColorStop(0.28, "#150a33");
    gradient.addColorStop(0.52, "#25103f");
    gradient.addColorStop(0.72, "#3a1236");
    gradient.addColorStop(0.88, "#511531");
    gradient.addColorStop(1, "#5e1730");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 512);

    const nebula = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 512);
    };
    nebula(52, 90, 120, "rgba(120,80,220,0.35)");
    nebula(14, 160, 140, "rgba(190,70,170,0.28)");
    nebula(40, 250, 110, "rgba(90,50,180,0.25)");

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function useStarTexture() {
  return useMemo(() => {
    const w = 1024;
    const h = 512;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const rand = mulberry32(13579);
    for (let i = 0; i < 560; i++) {
      const x = rand() * w;
      const y = Math.pow(rand(), 0.7) * h * 0.9;
      const r = rand() * rand() * 2.4 + 0.3;
      const a = 0.3 + rand() * 0.7;
      const tint = rand();
      const color =
        tint > 0.85 ? "185,205,255" : tint < 0.15 ? "255,220,190" : "255,255,255";
      if (r > 1.7) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        g.addColorStop(0, `rgba(${color},${a * 0.5})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = `rgba(${color},${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function useMoonTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const rand = mulberry32(4242);

    const base = ctx.createRadialGradient(
      size * 0.38,
      size * 0.34,
      size * 0.05,
      size * 0.5,
      size * 0.5,
      size * 0.62
    );
    base.addColorStop(0, "#fff4dc");
    base.addColorStop(0.6, "#ecd6ab");
    base.addColorStop(1, "#c3a97c");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 6; i++) {
      const mx = size * (0.18 + rand() * 0.64);
      const my = size * (0.18 + rand() * 0.64);
      const mr = size * (0.08 + rand() * 0.15);
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
      g.addColorStop(0, "rgba(139,120,92,0.55)");
      g.addColorStop(0.7, "rgba(150,131,100,0.32)");
      g.addColorStop(1, "rgba(163,144,110,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 110; i++) {
      const cx = rand() * size;
      const cy = rand() * size;
      const cr = size * (0.006 + rand() * 0.032);
      const gi = ctx.createRadialGradient(
        cx - cr * 0.3,
        cy - cr * 0.3,
        cr * 0.1,
        cx,
        cy,
        cr
      );
      gi.addColorStop(0, "rgba(112,96,72,0.5)");
      gi.addColorStop(1, "rgba(150,132,102,0)");
      ctx.fillStyle = gi;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,250,235,0.32)";
      ctx.lineWidth = Math.max(1, cr * 0.18);
      ctx.beginPath();
      ctx.arc(cx, cy, cr * 0.9, Math.PI * 0.15, Math.PI * 0.95);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function usePetalGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.25, 0.42, 1.0, 0, 1.35);
    shape.bezierCurveTo(-0.42, 1.0, -0.4, 0.25, 0, 0);
    const geometry = new THREE.ShapeGeometry(shape, 18);
    geometry.center();
    return geometry;
  }, []);
}

type PetalData = {
  x: number;
  y: number;
  z: number;
  speed: number;
  sway: number;
  phase: number;
  rot: number;
  scale: number;
  color: string;
};

function Petal({
  data,
  geometry,
}: {
  data: PetalData;
  geometry: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    group.position.y -= data.speed * delta;
    if (group.position.y < GROUND_Y - 2) group.position.y = 14;
    group.position.x = data.x + Math.sin(t * data.sway + data.phase) * 1.1;
    group.rotation.x += delta * data.rot;
    group.rotation.y += delta * data.rot * 0.6;
    group.rotation.z += delta * data.rot * 0.4;
  });

  return (
    <group ref={ref} position={[data.x, data.y, data.z]} scale={data.scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={data.color}
          side={THREE.DoubleSide}
          roughness={0.45}
          metalness={0.12}
          emissive={data.color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

function Mist({ texture }: { texture: THREE.Texture }) {
  const items = useMemo(() => {
    const rand = mulberry32(77);
    return Array.from({ length: 5 }, () => ({
      position: [
        (rand() - 0.5) * 44,
        GROUND_Y + rand() * 6,
        -10 - rand() * 18,
      ] as [number, number, number],
      scale: 12 + rand() * 12,
      opacity: 0.06 + rand() * 0.07,
      speed: 0.1 + rand() * 0.2,
    }));
  }, []);

  const refs = useRef<(THREE.Sprite | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((sprite, i) => {
      if (!sprite) return;
      const item = items[i];
      sprite.position.x =
        item.position[0] + Math.sin(t * item.speed * 0.3 + i) * 6;
      const mat = sprite.material as THREE.SpriteMaterial;
      mat.opacity = item.opacity * (0.7 + Math.sin(t * 0.3 + i) * 0.3);
    });
  });

  return (
    <>
      {items.map((m, i) => (
        <sprite
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={m.position}
          scale={[m.scale * 2, m.scale, 1]}
        >
          <spriteMaterial
            map={texture}
            color="#3a2450"
            transparent
            opacity={m.opacity}
            depthWrite={false}
          />
        </sprite>
      ))}
    </>
  );
}

function Spire({
  position,
  radius,
  height,
  roofHeight,
}: {
  position: [number, number, number];
  radius: number;
  height: number;
  roofHeight: number;
}) {
  const windows = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        y: height * 0.32 + (i * height * 0.42) / 2,
        lit: i !== 1,
      })),
    [height]
  );

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius * 1.12, height, 12]} />
        <meshStandardMaterial color="#0b0913" roughness={0.85} metalness={0.28} />
      </mesh>
      <mesh position={[0, height + roofHeight / 2, 0]}>
        <coneGeometry args={[radius * 1.4, roofHeight, 12]} />
        <meshStandardMaterial color="#120a18" roughness={0.7} metalness={0.32} />
      </mesh>
      <mesh position={[0, height + roofHeight + 0.7, 0]}>
        <coneGeometry args={[0.22, 1.7, 6]} />
        <meshBasicMaterial color="#09050f" fog={false} />
      </mesh>
      {windows.map((w, i) => (
        <mesh key={i} position={[0, w.y, radius * 0.99]}>
          <planeGeometry args={[radius * 0.5, radius * 0.95]} />
          <meshBasicMaterial
            color={w.lit ? "#ff8a3d" : "#6b1220"}
            toneMapped={false}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

const SPIRES: {
  position: [number, number, number];
  radius: number;
  height: number;
  roofHeight: number;
}[] = [
  { position: [-6.4, 0, 3.2], radius: 2.2, height: 20, roofHeight: 7 },
  { position: [6.4, 0, 3.2], radius: 2.2, height: 19, roofHeight: 7 },
  { position: [-4.6, 0, -4.6], radius: 1.9, height: 22, roofHeight: 7.5 },
  { position: [4.6, 0, -4.6], radius: 1.9, height: 21, roofHeight: 7.5 },
  { position: [-9.4, 0, -0.6], radius: 1.5, height: 16, roofHeight: 6 },
  { position: [9.4, 0, -0.6], radius: 1.5, height: 17, roofHeight: 6 },
];

function Battlements({
  y,
  z,
  length,
  axis = "x",
}: {
  y: number;
  z: number;
  length: number;
  axis?: "x" | "z";
}) {
  return (
    <>
      {Array.from({ length }, (_, i) => {
        const offset = -(length - 1) / 2 + i;
        const jag = i % 3 === 0 ? 1.5 : 1.1;
        return (
          <mesh
            key={i}
            position={axis === "x" ? [offset, y, z] : [z, y, offset]}
          >
            <boxGeometry args={[0.7, jag, 0.7]} />
            <meshStandardMaterial color="#0b0913" roughness={0.9} metalness={0.2} />
          </mesh>
        );
      })}
    </>
  );
}

function Castle({ texture }: { texture: THREE.Texture }) {
  const gate = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!gate.current) return;
    const t = state.clock.elapsedTime;
    const mat = gate.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.4 + Math.sin(t * 3.1) * 0.14 + Math.sin(t * 7.3) * 0.06;
  });

  return (
    <group position={[-4, GROUND_Y, -36]} scale={[1.5, 1.05, 1.5]}>
      <mesh position={[0, -5, 0]} scale={[1.5, 1, 1]}>
        <cylinderGeometry args={[30, 34, 10, 48]} />
        <meshStandardMaterial color="#050409" roughness={1} />
      </mesh>

      <sprite position={[0, 12, -16]} scale={[80, 46, 1]}>
        <spriteMaterial
          map={texture}
          color="#7a0f22"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>

      <mesh position={[0, 9, 0]}>
        <boxGeometry args={[8.5, 18, 8.5]} />
        <meshStandardMaterial color="#0b0913" roughness={0.88} metalness={0.22} />
      </mesh>
      <mesh position={[0, 21, 0]}>
        <boxGeometry args={[4.5, 8, 4.5]} />
        <meshStandardMaterial color="#0b0913" roughness={0.88} metalness={0.22} />
      </mesh>
      <mesh position={[0, 28.6, 0]}>
        <coneGeometry args={[3.2, 9.5, 4]} />
        <meshStandardMaterial color="#120a18" roughness={0.65} metalness={0.34} />
      </mesh>
      <mesh position={[0, 34, 0]}>
        <coneGeometry args={[0.28, 2.1, 6]} />
        <meshBasicMaterial color="#09050f" fog={false} />
      </mesh>

      <Battlements y={18.6} z={4.1} length={9} />
      <Battlements y={18.6} z={-4.1} length={9} />
      <Battlements y={18.6} z={4.1} length={9} axis="z" />

      {[
        [-2.4, 7],
        [2.4, 7],
        [-2.4, 12],
        [2.4, 12],
        [-2.4, 16],
        [2.4, 16],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 4.31]}>
          <planeGeometry args={[1, 1.7]} />
          <meshBasicMaterial color="#ff8a3d" toneMapped={false} fog={false} />
        </mesh>
      ))}
      <mesh position={[0, 16, 4.31]}>
        <planeGeometry args={[1.6, 2]} />
        <meshBasicMaterial color="#a8102a" toneMapped={false} fog={false} />
      </mesh>

      <mesh position={[0, 15.5, 4.31]}>
        <planeGeometry args={[6.6, 15.4]} />
        <meshBasicMaterial color="#050409" fog={false} />
      </mesh>

      <mesh position={[0, 2.8, 4.28]}>
        <boxGeometry args={[3.2, 5.6, 0.5]} />
        <meshStandardMaterial color="#030105" roughness={1} />
      </mesh>
      <mesh ref={gate} position={[0, 2.8, 4.38]}>
        <planeGeometry args={[2.4, 4.8]} />
        <meshBasicMaterial
          color="#d61f3f"
          toneMapped={false}
          transparent
          opacity={0.45}
          fog={false}
        />
      </mesh>

      {SPIRES.map((s, i) => (
        <Spire key={i} {...s} />
      ))}

      <group position={[8.4, 8, -6]}>
        <mesh>
          <cylinderGeometry args={[1.6, 1.8, 16, 10]} />
          <meshStandardMaterial color="#0b0913" roughness={0.9} metalness={0.2} />
        </mesh>
        {[-1, -0.3, 0.5, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 8.6 + i * 0.2, 0]}>
            <coneGeometry args={[0.35, 1.4 + i * 0.4, 5]} />
            <meshBasicMaterial color="#09050f" fog={false} />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 3, 8]} color="#ff5a3c" intensity={9} distance={30} />
      <pointLight position={[0, 26, 4]} color="#e11d48" intensity={5} distance={24} />
    </group>
  );
}

function Moon({
  texture,
  moonTexture,
}: {
  texture: THREE.Texture;
  moonTexture: THREE.Texture;
}) {
  return (
    <group position={[18, 24, -84]}>
      <mesh>
        <sphereGeometry args={[6.5, 64, 64]} />
        <meshBasicMaterial map={moonTexture} toneMapped={false} fog={false} />
      </mesh>
      <mesh scale={1.04}>
        <sphereGeometry args={[6.5, 48, 48]} />
        <meshBasicMaterial
          color="#ffe6bd"
          transparent
          opacity={0.06}
          toneMapped={false}
          fog={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <sprite scale={[26, 26, 1]}>
        <spriteMaterial
          map={texture}
          color="#ffcf9a"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>
    </group>
  );
}

function DeadTree({
  position,
  scale,
  flip,
}: {
  position: [number, number, number];
  scale: number;
  flip: boolean;
}) {
  const branches = useMemo(() => {
    const rand = mulberry32(flip ? 321 : 123);
    return Array.from({ length: 6 }, (_, i) => ({
      y: 4 + i * 1.3 + rand() * 0.6,
      length: 3 + rand() * 2.6,
      angle: 0.5 + rand() * 0.7,
      dir: i % 2 === 0 ? 1 : -1,
    }));
  }, [flip]);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[0.18, 0.55, 12, 7]} />
        <meshStandardMaterial color="#030207" roughness={1} />
      </mesh>
      {branches.map((b, i) => (
        <mesh
          key={i}
          position={[b.dir * b.length * 0.35, b.y, 0]}
          rotation={[0, 0, -b.dir * b.angle]}
        >
          <cylinderGeometry args={[0.06, 0.16, b.length, 5]} />
          <meshStandardMaterial color="#030207" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function ParallaxRig({ children }: { children: ReactNode }) {
  const pointer = useRef({ x: 0, y: 0 });

  const base = useMemo(() => new THREE.Vector3(0, 5, 16), []);
  const focus = useMemo(() => new THREE.Vector3(-4, 0, -36), []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state) => {
    const { x, y } = pointer.current;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, base.x + x * 4, 0.07);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, base.y - y * 3, 0.07);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, base.z, 0.07);
    cam.lookAt(focus);
  });

  return <>{children}</>;
}

function Scene() {
  const petalGeometry = usePetalGeometry();
  const softTexture = useSoftTexture();
  const skyTexture = useSkyTexture();
  const starTexture = useStarTexture();
  const moonTexture = useMoonTexture();

  const petals = useMemo<PetalData[]>(() => {
    const rand = mulberry32(90210);
    return Array.from({ length: 40 }, () => ({
      x: (rand() - 0.5) * 34,
      y: (rand() - 0.5) * 28,
      z: -6 + rand() * 14,
      speed: 0.4 + rand() * 0.9,
      sway: 0.4 + rand() * 0.9,
      phase: rand() * Math.PI * 2,
      rot: 0.2 + rand() * 0.8,
      scale: 0.3 + rand() * 0.75,
      color: PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)],
    }));
  }, []);

  return (
    <ParallaxRig>
      <color attach="background" args={["#040208"]} />
      <fog attach="fog" args={["#0a0712", 50, 170]} />

      <mesh position={[0, 40, -220]}>
        <planeGeometry args={[1000, 560]} />
        <meshBasicMaterial map={skyTexture} toneMapped={false} fog={false} />
      </mesh>

      <mesh position={[0, 40, -218]}>
        <planeGeometry args={[1000, 560]} />
        <meshBasicMaterial
          map={starTexture}
          transparent
          depthWrite={false}
          fog={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <ambientLight intensity={0.13} color="#453657" />
      <directionalLight position={[20, 34, -60]} intensity={1.2} color="#93a6ff" />
      <pointLight position={[0, 8, 24]} intensity={0.3} color="#6d5b8a" />
      <pointLight position={[0, 0, -34]} intensity={2.6} color="#7f1d3a" distance={48} />

      <Moon texture={softTexture} moonTexture={moonTexture} />

      <Castle texture={softTexture} />
      <DeadTree position={[-18, GROUND_Y, -14]} scale={1.7} flip />
      <DeadTree position={[17, GROUND_Y, -10]} scale={1.4} flip={false} />

      {petals.map((p, i) => (
        <Petal key={i} data={p} geometry={petalGeometry} />
      ))}

      <Mist texture={softTexture} />

      <Sparkles
        count={40}
        scale={[36, 24, 16]}
        size={2.2}
        speed={0.16}
        opacity={0.4}
        color="#f0a36a"
      />

      <EffectComposer>
        <Bloom
          intensity={1.05}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.72}
        />
      </EffectComposer>
    </ParallaxRig>
  );
}

export function MultiverseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#040208]">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 5, 16], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_38%,_rgba(3,1,6,0.6)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
    </div>
  );
}
