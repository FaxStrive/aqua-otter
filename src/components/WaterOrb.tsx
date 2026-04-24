"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* Positions as viewport fractions — orb drifts through these as you scroll */
const WAYPOINTS = [
  { x: 0.78, y: 0.22 }, // hero — top right
  { x: 0.15, y: 0.55 }, // marquee — left mid
  { x: 0.72, y: 0.65 }, // step 01 — bottom right
  { x: 0.18, y: 0.30 }, // step 02 — top left
  { x: 0.75, y: 0.40 }, // step 03 — mid right
  { x: 0.20, y: 0.68 }, // step 04 — bottom left
  { x: 0.65, y: 0.25 }, // step 05 — top right
  { x: 0.30, y: 0.50 }, // stats
  { x: 0.70, y: 0.70 }, // gallery
  { x: 0.25, y: 0.35 }, // testimonials
  { x: 0.60, y: 0.50 }, // cta
];

/* Color per scroll progress — interpolated smoothly */
const COLOR_STOPS: [number, [number, number, number]][] = [
  [0.00, [18,  189, 251]], // cyan (hero)
  [0.18, [112, 58,  10 ]], // brown (contamination)
  [0.32, [18,  150, 220]], // blue (test)
  [0.45, [18,  189, 251]], // cyan (systems)
  [0.58, [251, 191, 132]], // gold (install)
  [0.70, [18,  225, 255]], // bright cyan (result)
  [1.00, [18,  189, 251]], // cyan (end)
];

function lerpColor(p: number): [number, number, number] {
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [pa, ca] = COLOR_STOPS[i];
    const [pb, cb] = COLOR_STOPS[i + 1];
    if (p >= pa && p <= pb) {
      const t = (p - pa) / (pb - pa);
      return [
        Math.round(ca[0] + (cb[0] - ca[0]) * t),
        Math.round(ca[1] + (cb[1] - ca[1]) * t),
        Math.round(ca[2] + (cb[2] - ca[2]) * t),
      ];
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1][1];
}

function lerpWaypoint(p: number): { x: number; y: number } {
  const fIdx = p * (WAYPOINTS.length - 1);
  const lo = Math.floor(fIdx);
  const hi = Math.min(lo + 1, WAYPOINTS.length - 1);
  const t = fIdx - lo;
  return {
    x: WAYPOINTS[lo].x + (WAYPOINTS[hi].x - WAYPOINTS[lo].x) * t,
    y: WAYPOINTS[lo].y + (WAYPOINTS[hi].y - WAYPOINTS[lo].y) * t,
  };
}

export default function WaterOrb() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 18, damping: 16 });
  const y = useSpring(rawY, { stiffness: 18, damping: 16 });

  const [color, setColor] = useState<[number, number, number]>([18, 189, 251]);

  useEffect(() => {
    // Set initial position
    rawX.set(WAYPOINTS[0].x * window.innerWidth);
    rawY.set(WAYPOINTS[0].y * window.innerHeight);

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      const wp = lerpWaypoint(p);
      rawX.set(wp.x * window.innerWidth);
      rawY.set(wp.y * window.innerHeight);

      setColor(lerpColor(p));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawX, rawY]);

  const [r, g, b] = color;
  const cA = `rgba(${r},${g},${b},0.4)`;
  const cB = `rgba(${r},${g},${b},0.12)`;
  const cC = `rgba(${r},${g},${b},0.05)`;

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        x, y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 15,
        width: 200,
        height: 200,
      }}
    >
      {/* Far outer glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${cB} 0%, ${cC} 55%, transparent 75%)`, filter: "blur(30px)" }}
      />

      {/* Ripple rings */}
      {[0, 1.2, 2.4].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ inset: "28%", border: `1px solid ${cA}` }}
          animate={{ scale: [0.5, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Glass sphere body */}
      <motion.div
        animate={{ rotateY: [0, 12, -8, 0], rotateX: [0, -6, 4, 0], scale: [1, 1.04, 0.97, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: "20%",
          background: `radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.25) 0%, ${cA} 40%, rgba(0,10,28,0.6) 100%)`,
          boxShadow: `0 0 40px ${cA}, 0 0 80px ${cB}, inset 0 0 25px rgba(0,0,0,0.4), inset -6px -6px 18px rgba(0,0,0,0.25)`,
          backdropFilter: "blur(6px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Primary specular highlight */}
        <div style={{
          position: "absolute", top: "14%", left: "18%",
          width: "36%", height: "22%",
          background: "rgba(255,255,255,0.48)",
          borderRadius: "50%",
          filter: "blur(5px)",
          transform: "rotate(-18deg)",
        }} />
        {/* Secondary glint */}
        <div style={{
          position: "absolute", bottom: "22%", right: "18%",
          width: "13%", height: "8%",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          filter: "blur(3px)",
        }} />
        {/* Internal shimmer */}
        <motion.div
          animate={{ x: ["-30%", "30%", "-30%"], y: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(115deg, transparent 35%, ${cA} 50%, transparent 65%)`,
            opacity: 0.28,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
