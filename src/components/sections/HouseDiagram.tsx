"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Beaker, Droplets, Sparkles, ShieldCheck, Activity, Gauge, Waves } from "lucide-react";

type StageId = "sediment" | "carbon" | "softener";

type Stage = {
  id: StageId;
  label: string;
  subtitle: string;
  color: string;
  glowColor: string;
  xCenter: number;
  removes: { name: string; size: string; detail: string }[];
  what: string;
  why: string;
  micron: string;
  flow: string;
};

// Cinematic horizontal canvas
const VIEW_W = 1600;
const VIEW_H = 760;

// Three tanks, evenly spaced along horizontal flow
const TANK_W = 240;
const TANK_H = 360;
const TANK_Y = 220;
const PIPE_Y = TANK_Y + TANK_H / 2;
const PIPE_R = 28;

const TANK_X: Record<StageId, number> = {
  sediment: 320,
  carbon:   720,
  softener: 1120,
};

const STAGES: Stage[] = [
  {
    id: "sediment",
    label: "Sediment Pre-Filter",
    subtitle: "Stage 01 · Mechanical Capture",
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.55)",
    xCenter: TANK_X.sediment,
    micron: "5 μm pleated media",
    flow: "12 GPM",
    removes: [
      { name: "Rust flakes",     size: "20–500 μm", detail: "Iron oxide breaking off old galvanized pipes" },
      { name: "Sand & silt",     size: "10–250 μm", detail: "Fine particulate from wells & municipal mains" },
      { name: "Pipe debris",     size: "30–800 μm", detail: "Scale shed from aging municipal lines" },
      { name: "Visible matter",  size: "> 50 μm",   detail: "Anything you'd see in a clear glass" },
    ],
    what: "A precision-pleated 5-micron filter media catches everything large enough to clog downstream stages. The first line of defense.",
    why: "Without this, the carbon block fouls in weeks instead of years.",
  },
  {
    id: "carbon",
    label: "Catalytic Carbon",
    subtitle: "Stage 02 · Chemical Adsorption",
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.55)",
    xCenter: TANK_X.carbon,
    micron: "0.5 μm carbon block",
    flow: "10 GPM",
    removes: [
      { name: "Chlorine",        size: "Ionic",     detail: "What your city adds. We take it back out — fully." },
      { name: "Chloramine",      size: "Ionic",     detail: "Harder to remove than chlorine. Catalytic carbon handles it." },
      { name: "PFAS",            size: "Molecular", detail: "Forever chemicals. Adsorbed at the molecular surface." },
      { name: "VOCs & herbicides",size: "Molecular", detail: "Volatile organic compounds, pesticides, solvents" },
    ],
    what: "A coconut-shell carbon block compressed into a dense matrix. Dissolved chemicals stick to its surface and never let go.",
    why: "This is what makes water taste like water again. The single biggest flavor change you'll notice.",
  },
  {
    id: "softener",
    label: "Softener Resin",
    subtitle: "Stage 03 · Ion Exchange",
    color: "#12BDFB",
    glowColor: "rgba(18,189,251,0.65)",
    xCenter: TANK_X.softener,
    micron: "Cation resin beads",
    flow: "10 GPM",
    removes: [
      { name: "Calcium",         size: "Ca²⁺",      detail: "The mineral that builds scale on every fixture" },
      { name: "Magnesium",       size: "Mg²⁺",      detail: "Co-conspirator in hardness — ruins soap lather" },
      { name: "Iron (≤3 ppm)",   size: "Fe²⁺",      detail: "Dissolved iron that stains laundry and porcelain" },
      { name: "Manganese",       size: "Mn²⁺",      detail: "Black staining and metallic taste at trace levels" },
    ],
    what: "Ion-exchange resin beads. Every hardness ion gets swapped for a sodium ion as the water passes through the bed.",
    why: "Result: zero scale buildup, soaps actually lather, appliances last 2× longer.",
  },
];

// ─── Particle types ────────────────────────────────────────────────
type ParticleType = "rust" | "silt" | "chlorine" | "pfas" | "calcium" | "magnesium" | "clean";

type Particle = {
  id: number;
  type: ParticleType;
  yJitter: number;
  delay: number;
  duration: number;
  caughtAtStage: StageId | null;
  size: number;
  shape: "circle" | "hex" | "diamond" | "spike" | "star";
  color: string;
};

const TYPE_DEFS: { type: ParticleType; stage: StageId | null; size: number; shape: Particle["shape"]; color: string }[] = [
  { type: "rust",      stage: "sediment", size: 8,   shape: "spike",   color: "#dc2626" },
  { type: "silt",      stage: "sediment", size: 5.5, shape: "circle",  color: "#92400e" },
  { type: "chlorine",  stage: "carbon",   size: 7,   shape: "hex",     color: "#facc15" },
  { type: "pfas",      stage: "carbon",   size: 7.5, shape: "star",    color: "#a855f7" },
  { type: "calcium",   stage: "softener", size: 6.5, shape: "diamond", color: "#60a5fa" },
  { type: "magnesium", stage: "softener", size: 6,   shape: "diamond", color: "#fb923c" },
];

function buildParticles(count: number): Particle[] {
  const arr: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const t = TYPE_DEFS[i % TYPE_DEFS.length];
    arr.push({
      id: i,
      type: t.type,
      yJitter: (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * 0.5,
      delay: (i * 0.18) % 5,
      duration: 6 + ((i * 0.13) % 1.6),
      caughtAtStage: t.stage,
      size: t.size,
      shape: t.shape,
      color: t.color,
    });
  }
  // Pure cyan droplets that travel the full path
  for (let i = 0; i < 14; i++) {
    arr.push({
      id: 2000 + i,
      type: "clean",
      yJitter: (Math.sin(i * 2.1)) * 0.45,
      delay: (i * 0.42) % 5,
      duration: 5.4 + ((i * 0.17) % 1.2),
      caughtAtStage: null,
      size: 5.5,
      shape: "circle",
      color: "#12BDFB",
    });
  }
  return arr;
}

function ParticleShape({ shape, size, color }: { shape: Particle["shape"]; size: number; color: string }) {
  if (shape === "circle") {
    return <circle r={size / 2} fill={color} />;
  }
  if (shape === "hex") {
    const r = size / 2;
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");
    return <polygon points={pts} fill={color} />;
  }
  if (shape === "diamond") {
    const r = size / 2;
    return <polygon points={`0,-${r} ${r},0 0,${r} -${r},0`} fill={color} />;
  }
  if (shape === "star") {
    const r = size / 2;
    const inner = r * 0.45;
    const points: string[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : inner;
      points.push(`${(rad * Math.cos(a)).toFixed(2)},${(rad * Math.sin(a)).toFixed(2)}`);
    }
    return <polygon points={points.join(" ")} fill={color} />;
  }
  // spike (rust flake)
  const r = size / 2;
  return (
    <polygon
      points={`0,-${r} ${r * 0.4},-${r * 0.3} ${r},0 ${r * 0.3},${r * 0.4} 0,${r} -${r * 0.4},${r * 0.3} -${r},0 -${r * 0.3},-${r * 0.4}`}
      fill={color}
    />
  );
}

// Compute the x position where a particle gets "caught" (top of stage tank, falls into bed)
function caughtX(stage: StageId): number {
  return TANK_X[stage];
}

function FlowingParticle({ p, activeStage }: { p: Particle; activeStage: StageId }) {
  const startX = 60;
  const stageX = p.caughtAtStage ? caughtX(p.caughtAtStage) : VIEW_W - 100;
  const endX   = p.caughtAtStage ? stageX : VIEW_W - 60;

  // Y oscillates as it flows (water motion feel)
  const baseY = PIPE_Y;
  const yA = baseY + p.yJitter * (PIPE_R - 8);
  const yB = baseY - p.yJitter * (PIPE_R - 6);
  const yC = baseY + p.yJitter * (PIPE_R - 10);

  // If caught at a stage, the particle falls down into the resin/media bed (TANK_Y + TANK_H - 30)
  const yEnd = p.caughtAtStage ? TANK_Y + TANK_H - 50 - Math.random() * 20 : baseY;

  const isClean = p.type === "clean";
  const dimmed = !isClean && p.caughtAtStage !== null && p.caughtAtStage !== activeStage;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        x: p.caughtAtStage ? [startX, (startX + stageX) / 2, stageX, stageX + (Math.sin(p.id) * 6)] : [startX, VIEW_W / 3, (2 * VIEW_W) / 3, endX],
        y: p.caughtAtStage ? [yA, yB, baseY, yEnd] : [yA, yB, yC, baseY],
        opacity: [0, dimmed ? 0.18 : 0.95, dimmed ? 0.18 : 1, dimmed ? 0 : (isClean ? 1 : 0)],
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        repeatDelay: 0.15,
        delay: p.delay,
        ease: p.caughtAtStage ? [0.42, 0, 0.58, 1] : "linear",
        times: [0, 0.4, 0.75, 1],
      }}
    >
      <ParticleShape shape={p.shape} size={p.size} color={p.color} />
      {isClean && <circle r={p.size * 1.7} fill={p.color} opacity={0.18} />}
    </motion.g>
  );
}

// ─── Animated counter ──────────────────────────────────────────────
function StatCounter({ value, suffix, label, color, delay = 0 }: { value: number; suffix?: string; label: string; color: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => motionVal.set(value), delay);
      return () => clearTimeout(t);
    }
  }, [inView, value, motionVal, delay]);

  return (
    <div className="flex flex-col">
      <span ref={ref} className="font-display text-2xl md:text-3xl font-bold leading-none" style={{ color }}>
        <motion.span>{display}</motion.span>{suffix}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Bubble noise inside a tank (resin/media animation) ───────────
function TankInternals({ stage, isActive }: { stage: Stage; isActive: boolean }) {
  // Random beads/grains/fibers drifting inside the tank for that stage
  const items = useMemo(() => {
    const arr: { x: number; y: number; r: number; delay: number }[] = [];
    for (let i = 0; i < 28; i++) {
      arr.push({
        x: -TANK_W / 2 + 18 + Math.random() * (TANK_W - 36),
        y: 18 + Math.random() * (TANK_H - 36),
        r: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 4,
      });
    }
    return arr;
  }, []);

  return (
    <g>
      {items.map((it, idx) => (
        <motion.circle
          key={idx}
          cx={it.x}
          cy={it.y}
          r={it.r}
          fill={stage.color}
          opacity={isActive ? 0.28 : 0.12}
          animate={{
            cy: [it.y, it.y - 4, it.y],
            opacity: isActive ? [0.18, 0.4, 0.18] : [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 3 + (idx % 3), repeat: Infinity, delay: it.delay }}
        />
      ))}
    </g>
  );
}

// ─── Main ──────────────────────────────────────────────────────────
export default function HouseDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStage, setActiveStage] = useState<StageId>("sediment");
  const current = STAGES.find(s => s.id === activeStage)!;

  const particles = useMemo(() => buildParticles(54), []);

  // Cycle through stages automatically when not interacted with — feels alive
  const [hasInteracted, setHasInteracted] = useState(false);
  useEffect(() => {
    if (hasInteracted) return;
    const order: StageId[] = ["sediment", "carbon", "softener"];
    const t = setInterval(() => {
      setActiveStage(prev => {
        const i = order.indexOf(prev);
        return order[(i + 1) % order.length];
      });
    }, 5500);
    return () => clearInterval(t);
  }, [hasInteracted]);

  const handleStageClick = (id: StageId) => {
    setHasInteracted(true);
    setActiveStage(id);
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36" style={{ backgroundColor: "#050b13" }}>
      {/* Layered background — gridlines + radial glows */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 85% 50%, rgba(18,189,251,0.12) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* scan line */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.5), transparent)" }}
        animate={{ y: [0, 700, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5" style={{ backgroundColor: "rgba(18,189,251,0.08)", border: "1px solid rgba(18,189,251,0.2)" }}>
            <motion.span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#12BDFB" }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#12BDFB" }}>
              Live System View
            </span>
          </div>
          <h2
            className="font-display font-bold leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.8rem)", color: "#ffffff", letterSpacing: "-0.04em" }}
          >
            Dirty water in.<br />
            <span style={{
              background: "linear-gradient(90deg, #f59e0b 0%, #a855f7 50%, #12BDFB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Pure water out.
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "60ch", margin: "1.5rem auto 0" }}>
            Watch every contaminant in your tap water get caught at the molecular level. Three stages. Zero shortcuts. Lifetime warranty.
          </p>
        </motion.div>

        {/* Live HUD strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12 px-6 py-4 rounded-2xl mx-auto"
          style={{ maxWidth: "880px", backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4" style={{ color: "#22c55e" }} />
            <StatCounter value={99} suffix=".9%" label="Removal Rate" color="#22c55e" />
          </div>
          <div className="w-px h-10 hidden md:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2.5">
            <Gauge className="w-4 h-4" style={{ color: "#12BDFB" }} />
            <StatCounter value={12} suffix=" GPM" label="Flow Rate" color="#12BDFB" delay={200} />
          </div>
          <div className="w-px h-10 hidden md:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2.5">
            <Waves className="w-4 h-4" style={{ color: "#a855f7" }} />
            <StatCounter value={3} label="Stages" color="#a855f7" delay={400} />
          </div>
          <div className="w-px h-10 hidden md:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4" style={{ color: "#f59e0b" }} />
            <StatCounter value={42} label="Contaminants Removed" color="#f59e0b" delay={600} />
          </div>
        </motion.div>

        {/* THE PIECE — full width filter laboratory */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.25 }}
          className="relative rounded-[28px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(15,30,50,0.5) 0%, rgba(7,17,26,0.85) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 30px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top bezel */}
          <div className="px-6 py-3 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.25)" }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              </div>
              <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                aqua-otter / treatment.rig
              </span>
            </div>
            <div className="flex items-center gap-3">
              <motion.span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#22c55e" }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "rgba(34,197,94,0.8)" }}>
                System online · streaming
              </span>
            </div>
          </div>

          {/* Main canvas */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block" }}
              aria-label="Three-stage water treatment system showing live contaminant removal"
            >
              <defs>
                <linearGradient id="dirtyPipe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="cleanPipe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0e7490" />
                  <stop offset="100%" stopColor="#12BDFB" />
                </linearGradient>
                <linearGradient id="midPipe1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#92400e" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="midPipe2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0e7490" />
                </linearGradient>

                {STAGES.map(s => (
                  <linearGradient key={s.id} id={`tank-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                    <stop offset="50%" stopColor={s.color} stopOpacity="0.08" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0.18" />
                  </linearGradient>
                ))}

                {STAGES.map(s => (
                  <radialGradient key={s.id} id={`tank-glow-${s.id}`}>
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                  </radialGradient>
                ))}

                <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <pattern id="resinTexture" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1" fill="rgba(255,255,255,0.06)" />
                </pattern>
              </defs>

              {/* ── Source label, top-left ── */}
              <g>
                <text x="40" y="80" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="700" letterSpacing="3" fontFamily="monospace">
                  CITY MAIN / WELL
                </text>
                <text x="40" y="106" fill="#ffffff" fontSize="22" fontWeight="800" letterSpacing="-0.5">
                  Untreated supply
                </text>
                <text x="40" y="130" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="500">
                  Hardness · chlorine · sediment · PFAS
                </text>
                {/* connecting line down to inlet */}
                <line x1="60" y1="150" x2="60" y2={PIPE_Y - 20} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx="60" cy={PIPE_Y - 20} r="4" fill="#92400e" />
              </g>

              {/* ── Destination label, top-right ── */}
              <g>
                <text x={VIEW_W - 40} y="80" fill="rgba(18,189,251,0.7)" fontSize="11" fontWeight="700" letterSpacing="3" fontFamily="monospace" textAnchor="end">
                  HOUSE / EVERY TAP
                </text>
                <text x={VIEW_W - 40} y="106" fill="#12BDFB" fontSize="22" fontWeight="800" letterSpacing="-0.5" textAnchor="end">
                  Pure delivery
                </text>
                <text x={VIEW_W - 40} y="130" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="500" textAnchor="end">
                  99.9% pure · soft · safe to drink
                </text>
                <line x1={VIEW_W - 60} y1="150" x2={VIEW_W - 60} y2={PIPE_Y - 20} stroke="rgba(18,189,251,0.3)" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx={VIEW_W - 60} cy={PIPE_Y - 20} r="4" fill="#12BDFB" />
              </g>

              {/* ── Inlet pipe (dirty) ── */}
              <rect x="60" y={PIPE_Y - PIPE_R} width={TANK_X.sediment - TANK_W / 2 - 60} height={PIPE_R * 2} fill="url(#dirtyPipe)" rx={PIPE_R} />
              <rect x="60" y={PIPE_Y - PIPE_R} width={TANK_X.sediment - TANK_W / 2 - 60} height={PIPE_R * 2} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx={PIPE_R} />
              {/* pressure gauge on inlet */}
              <g transform={`translate(180, ${PIPE_Y - 70})`}>
                <circle r="22" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle r="18" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1" strokeDasharray="2 2" />
                <text y="2" fill="#f59e0b" fontSize="10" fontWeight="800" textAnchor="middle">65</text>
                <text y="14" fill="rgba(245,158,11,0.7)" fontSize="6" fontWeight="700" letterSpacing="1" textAnchor="middle">PSI</text>
                <line x1="0" y1="22" x2="0" y2={PIPE_Y - PIPE_R - (PIPE_Y - 70)} stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
              </g>

              {/* ── Pipes between tanks (gradient transitions) ── */}
              <rect
                x={TANK_X.sediment + TANK_W / 2}
                y={PIPE_Y - PIPE_R}
                width={TANK_X.carbon - TANK_X.sediment - TANK_W}
                height={PIPE_R * 2}
                fill="url(#midPipe1)"
                rx={PIPE_R}
              />
              <rect x={TANK_X.sediment + TANK_W / 2} y={PIPE_Y - PIPE_R} width={TANK_X.carbon - TANK_X.sediment - TANK_W} height={PIPE_R * 2} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx={PIPE_R} />

              <rect
                x={TANK_X.carbon + TANK_W / 2}
                y={PIPE_Y - PIPE_R}
                width={TANK_X.softener - TANK_X.carbon - TANK_W}
                height={PIPE_R * 2}
                fill="url(#midPipe2)"
                rx={PIPE_R}
              />
              <rect x={TANK_X.carbon + TANK_W / 2} y={PIPE_Y - PIPE_R} width={TANK_X.softener - TANK_X.carbon - TANK_W} height={PIPE_R * 2} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx={PIPE_R} />

              {/* ── Outlet pipe (clean) ── */}
              <rect
                x={TANK_X.softener + TANK_W / 2}
                y={PIPE_Y - PIPE_R}
                width={VIEW_W - 60 - (TANK_X.softener + TANK_W / 2)}
                height={PIPE_R * 2}
                fill="url(#cleanPipe)"
                rx={PIPE_R}
              />
              <rect
                x={TANK_X.softener + TANK_W / 2}
                y={PIPE_Y - PIPE_R}
                width={VIEW_W - 60 - (TANK_X.softener + TANK_W / 2)}
                height={PIPE_R * 2}
                fill="none"
                stroke="rgba(18,189,251,0.3)"
                strokeWidth="1.5"
                rx={PIPE_R}
              />

              {/* outlet pressure gauge */}
              <g transform={`translate(${VIEW_W - 220}, ${PIPE_Y - 70})`}>
                <circle r="22" fill="rgba(0,0,0,0.4)" stroke="rgba(18,189,251,0.3)" strokeWidth="1" />
                <circle r="18" fill="none" stroke="rgba(18,189,251,0.5)" strokeWidth="1" strokeDasharray="2 2" />
                <text y="2" fill="#12BDFB" fontSize="10" fontWeight="800" textAnchor="middle">62</text>
                <text y="14" fill="rgba(18,189,251,0.7)" fontSize="6" fontWeight="700" letterSpacing="1" textAnchor="middle">PSI</text>
                <line x1="0" y1="22" x2="0" y2={PIPE_Y - PIPE_R - (PIPE_Y - 70)} stroke="rgba(18,189,251,0.4)" strokeWidth="1" />
              </g>

              {/* ── Tanks ── */}
              {STAGES.map((s, idx) => {
                const isActive = activeStage === s.id;
                return (
                  <g key={s.id}>
                    {/* Active tank glow */}
                    {isActive && (
                      <motion.ellipse
                        cx={s.xCenter}
                        cy={TANK_Y + TANK_H / 2}
                        rx={TANK_W * 0.8}
                        ry={TANK_H * 0.7}
                        fill={`url(#tank-glow-${s.id})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    {/* Stage number badge above tank */}
                    <g transform={`translate(${s.xCenter}, ${TANK_Y - 60})`}>
                      <motion.circle
                        r="22"
                        fill={isActive ? s.color : "rgba(255,255,255,0.05)"}
                        stroke={isActive ? s.color : "rgba(255,255,255,0.12)"}
                        strokeWidth="1.5"
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <text y="5" fill={isActive ? "#0C1F2E" : "rgba(255,255,255,0.6)"} fontSize="14" fontWeight="900" textAnchor="middle">
                        {`0${idx + 1}`}
                      </text>
                    </g>

                    {/* Tank label above */}
                    <text x={s.xCenter} y={TANK_Y - 22} fill={isActive ? "#ffffff" : "rgba(255,255,255,0.7)"} fontSize="16" fontWeight="800" textAnchor="middle">
                      {s.label}
                    </text>
                    <text x={s.xCenter} y={TANK_Y - 6} fill={isActive ? s.color : "rgba(255,255,255,0.4)"} fontSize="9" fontWeight="700" letterSpacing="2" textAnchor="middle">
                      {s.subtitle.toUpperCase()}
                    </text>

                    {/* Tank top cap */}
                    <ellipse cx={s.xCenter} cy={TANK_Y} rx={TANK_W / 2} ry="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

                    {/* Tank body */}
                    <g
                      onClick={() => handleStageClick(s.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <rect
                        x={s.xCenter - TANK_W / 2}
                        y={TANK_Y}
                        width={TANK_W}
                        height={TANK_H}
                        fill={`url(#tank-${s.id})`}
                        stroke={isActive ? s.color : "rgba(255,255,255,0.18)"}
                        strokeWidth={isActive ? 2 : 1.5}
                      />

                      {/* Resin/media texture */}
                      <rect
                        x={s.xCenter - TANK_W / 2}
                        y={TANK_Y}
                        width={TANK_W}
                        height={TANK_H}
                        fill="url(#resinTexture)"
                      />

                      {/* internals */}
                      <g transform={`translate(${s.xCenter}, ${TANK_Y})`}>
                        <TankInternals stage={s} isActive={isActive} />
                      </g>

                      {/* fluid level wave at top */}
                      <motion.path
                        d={`M ${s.xCenter - TANK_W / 2} ${TANK_Y + 30} Q ${s.xCenter - TANK_W / 4} ${TANK_Y + 22}, ${s.xCenter} ${TANK_Y + 30} T ${s.xCenter + TANK_W / 2} ${TANK_Y + 30} L ${s.xCenter + TANK_W / 2} ${TANK_Y} L ${s.xCenter - TANK_W / 2} ${TANK_Y} Z`}
                        fill={s.color}
                        fillOpacity="0.12"
                        animate={{
                          d: [
                            `M ${s.xCenter - TANK_W / 2} ${TANK_Y + 30} Q ${s.xCenter - TANK_W / 4} ${TANK_Y + 22}, ${s.xCenter} ${TANK_Y + 30} T ${s.xCenter + TANK_W / 2} ${TANK_Y + 30} L ${s.xCenter + TANK_W / 2} ${TANK_Y} L ${s.xCenter - TANK_W / 2} ${TANK_Y} Z`,
                            `M ${s.xCenter - TANK_W / 2} ${TANK_Y + 30} Q ${s.xCenter - TANK_W / 4} ${TANK_Y + 38}, ${s.xCenter} ${TANK_Y + 30} T ${s.xCenter + TANK_W / 2} ${TANK_Y + 30} L ${s.xCenter + TANK_W / 2} ${TANK_Y} L ${s.xCenter - TANK_W / 2} ${TANK_Y} Z`,
                            `M ${s.xCenter - TANK_W / 2} ${TANK_Y + 30} Q ${s.xCenter - TANK_W / 4} ${TANK_Y + 22}, ${s.xCenter} ${TANK_Y + 30} T ${s.xCenter + TANK_W / 2} ${TANK_Y + 30} L ${s.xCenter + TANK_W / 2} ${TANK_Y} L ${s.xCenter - TANK_W / 2} ${TANK_Y} Z`,
                          ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Inlet/outlet ports on tank sides at PIPE_Y */}
                      <rect x={s.xCenter - TANK_W / 2 - 4} y={PIPE_Y - 12} width="8" height="24" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                      <rect x={s.xCenter + TANK_W / 2 - 4} y={PIPE_Y - 12} width="8" height="24" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

                      {/* Caught particle pile at the bottom of tank */}
                      {Array.from({ length: 18 }).map((_, idx2) => {
                        const angleSeed = (idx2 + 1) * (s.id.length + 3);
                        const px = s.xCenter - TANK_W / 2 + 18 + (idx2 % 9) * 22 + (Math.sin(angleSeed) * 5);
                        const row = Math.floor(idx2 / 9);
                        const py = TANK_Y + TANK_H - 14 - row * 8 - Math.abs(Math.cos(angleSeed)) * 3;
                        return (
                          <motion.circle
                            key={idx2}
                            cx={px}
                            cy={py}
                            r={isActive ? 3 : 2.2}
                            fill={s.color}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: isActive ? 0.85 : 0.5, scale: 1 }}
                            transition={{ delay: 0.2 + idx2 * 0.03, duration: 0.4 }}
                          />
                        );
                      })}

                      {/* Tank base */}
                      <ellipse cx={s.xCenter} cy={TANK_Y + TANK_H} rx={TANK_W / 2} ry="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

                      {/* Stage spec readout to the side */}
                      <g transform={`translate(${s.xCenter - TANK_W / 2 - 8}, ${TANK_Y + TANK_H + 30})`}>
                        <text fill={isActive ? s.color : "rgba(255,255,255,0.4)"} fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="monospace">
                          MEDIA
                        </text>
                        <text y="14" fill="rgba(255,255,255,0.65)" fontSize="11" fontWeight="600">
                          {s.micron}
                        </text>
                      </g>
                      <g transform={`translate(${s.xCenter + TANK_W / 2 + 8}, ${TANK_Y + TANK_H + 30})`}>
                        <text textAnchor="end" fill={isActive ? s.color : "rgba(255,255,255,0.4)"} fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="monospace">
                          FLOW
                        </text>
                        <text textAnchor="end" y="14" fill="rgba(255,255,255,0.65)" fontSize="11" fontWeight="600">
                          {s.flow}
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}

              {/* ── Particles streaming through ── */}
              {particles.map(p => (
                <FlowingParticle key={p.id} p={p} activeStage={activeStage} />
              ))}

              {/* ── Final delivery: glass of water at far right ── */}
              <g transform={`translate(${VIEW_W - 90}, ${PIPE_Y - 30})`}>
                <path
                  d="M -22 0 L -18 70 Q -18 80, -8 80 L 8 80 Q 18 80, 18 70 L 22 0 Z"
                  fill="rgba(18,189,251,0.08)"
                  stroke="rgba(18,189,251,0.4)"
                  strokeWidth="1.5"
                />
                <motion.path
                  d="M -20 28 Q -10 24, 0 28 T 20 28 L 18 70 Q 18 80, 8 80 L -8 80 Q -18 80, -18 70 Z"
                  fill="#12BDFB"
                  fillOpacity="0.55"
                  animate={{
                    d: [
                      "M -20 28 Q -10 24, 0 28 T 20 28 L 18 70 Q 18 80, 8 80 L -8 80 Q -18 80, -18 70 Z",
                      "M -20 26 Q -10 32, 0 26 T 20 26 L 18 70 Q 18 80, 8 80 L -8 80 Q -18 80, -18 70 Z",
                      "M -20 28 Q -10 24, 0 28 T 20 28 L 18 70 Q 18 80, 8 80 L -8 80 Q -18 80, -18 70 Z",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* glass shine */}
                <path d="M -16 6 L -14 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                <text y="100" fill="rgba(18,189,251,0.7)" fontSize="9" fontWeight="700" letterSpacing="2" textAnchor="middle">
                  TO YOUR TAP
                </text>
              </g>

              {/* ── Drip from outlet pipe into glass ── */}
              <motion.circle
                cx={VIEW_W - 90}
                cy={PIPE_Y}
                r={4}
                fill="#12BDFB"
                animate={{ cy: [PIPE_Y - 8, PIPE_Y + 6, PIPE_Y - 8], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                filter="url(#strongGlow)"
              />
            </svg>

            {/* Active stage detail panel — overlaid on bottom of canvas */}
            <div
              className="absolute bottom-6 left-6 right-6 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] divide-y md:divide-y-0 md:divide-x"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  {/* Left — title + why */}
                  <div className="p-5 flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: current.color }}>
                      {current.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white leading-tight" style={{ letterSpacing: "-0.025em" }}>
                      {current.label}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {current.what}
                    </p>
                  </div>

                  {/* Middle — what gets removed */}
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                      What gets removed at this stage
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {current.removes.map((r, idx) => (
                        <motion.div
                          key={r.name}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          className="flex gap-2.5 items-start"
                        >
                          <span
                            className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: current.color, boxShadow: `0 0 10px ${current.glowColor}` }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-bold text-white truncate">{r.name}</span>
                              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: current.color }}>
                                {r.size}
                              </span>
                            </div>
                            <p className="text-[10px] leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                              {r.detail}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right — why & CTA */}
                  <div className="p-5 flex flex-col justify-between gap-3" style={{ background: `linear-gradient(135deg, ${current.color}15 0%, transparent 100%)` }}>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: current.color }}>
                        Why this matters
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {current.why}
                      </p>
                    </div>
                    <Link
                      href="/get-started"
                      className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all"
                      style={{ backgroundColor: current.color, color: "#0C1F2E" }}
                    >
                      Free Water Test
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bezel — stage selector */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-center gap-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.25)" }}>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Inspect stage:
            </span>
            {STAGES.map((s, idx) => {
              const isActive = activeStage === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(s.id)}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: isActive ? `${s.color}22` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? `${s.color}66` : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? s.color : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="text-[9px] font-mono opacity-60">0{idx + 1}</span>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: s.color, boxShadow: isActive ? `0 0 10px ${s.color}` : "none" }}
                  />
                  {s.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Below the rig — proof row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
        >
          {[
            { icon: Beaker,      label: "Lab-tested at every install",  sub: "Free water test included" },
            { icon: Droplets,    label: "Whole-home coverage",            sub: "Every tap, every fixture" },
            { icon: Sparkles,    label: "Tastes like nothing",            sub: "The way water should" },
            { icon: ShieldCheck, label: "Lifetime warranty",              sub: "Parts, labor, electronics" },
          ].map((c, i) => (
            <div
              key={c.label}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <c.icon className="w-5 h-5 mb-3" style={{ color: i === 0 ? "#f59e0b" : i === 1 ? "#a855f7" : i === 2 ? "#22c55e" : "#12BDFB" }} />
              <p className="text-sm font-bold text-white">{c.label}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{c.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
