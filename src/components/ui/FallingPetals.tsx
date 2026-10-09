import { motion } from "framer-motion";
import { useMemo } from "react";

const PETAL_COLORS = [
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#e11d48",
  "#c026d3",
  "#a855f7",
  "#fb7185",
];

function fract(n: number) {
  return n - Math.floor(n);
}

function pseudo(i: number, salt: number) {
  return fract(Math.sin(i * 127.1 + salt * 311.7) * 43758.5453);
}

type Petal = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  spin: number;
  color: string;
  opacity: number;
};

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 54" className="w-full h-full">
      <path d="M20 3 C33 12 34 39 20 51 C6 39 7 12 20 3 Z" fill={color} />
      <path
        d="M20 7 C24 19 24 35 20 47"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

export function FallingPetals({
  count = 16,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: pseudo(i, 1) * 100,
        size: 14 + pseudo(i, 2) * 22,
        delay: pseudo(i, 3) * 8,
        duration: 7 + pseudo(i, 4) * 7,
        sway: 16 + pseudo(i, 5) * 54,
        spin: (pseudo(i, 6) > 0.5 ? 1 : -1) * (160 + pseudo(i, 7) * 360),
        color: PETAL_COLORS[Math.floor(pseudo(i, 8) * PETAL_COLORS.length)],
        opacity: 0.55 + pseudo(i, 9) * 0.45,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.35,
            filter: `drop-shadow(0 0 6px ${p.color}88)`,
          }}
          initial={{ top: "-12%", opacity: 0 }}
          animate={{
            top: ["-12%", "112%"],
            x: [0, p.sway, -p.sway, 0],
            rotate: [0, p.spin],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <PetalShape color={p.color} />
        </motion.div>
      ))}
    </div>
  );
}
