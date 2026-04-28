"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Beaker, Droplets, Sparkles, ShieldCheck } from "lucide-react";

type StageId = "sediment" | "carbon" | "softener";

type Stage = {
  id: StageId;
  label: string;
  subtitle: string;
  color: string;
  glowColor: string;
  yTop: number;
  yBottom: number;
  removes: { name: string; detail: string }[];
  what: string;
  why: string;
};

const STAGES: Stage[] = [
  {
    id: "sediment",
    label: "Sediment Pre-Filter",
    subtitle: "Stage 1 · Mechanical",
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.45)",
    yTop: 130,
    yBottom: 240,
    removes: [
      { name: "Rust flakes",   detail: "Iron oxide breaking off old pipes" },
      { name: "Sand & silt",   detail: "Fine particulate from wells & mains" },
      { name: "Pipe debris",   detail: "Scale shed from municipal lines" },
      { name: "Visible matter",detail: "Anything you'd see in a clear glass" },
    ],
    what: "A precision-pleated filter media catches everything large enough to see. The first defense — protects every stage downstream from clogging.",
    why: "Without this, the carbon block fouls in weeks instead of years.",
  },
  {
    id: "carbon",
    label: "Catalytic Carbon",
    subtitle: "Stage 2 · Chemical",
    color: "#7c3aed",
    glowColor: "rgba(124,58,237,0.45)",
    yTop: 240,
    yBottom: 360,
    removes: [
      { name: "Chlorine",      detail: "What your city adds. We take it back out." },
      { name: "Chloramine",    detail: "Harder to remove than chlorine. Catalytic carbon handles it." },
      { name: "PFAS",          detail: "Forever chemicals. Adsorbed at the molecular level." },
      { name: "VOCs",          detail: "Volatile organic compounds, herbicides, pesticides" },
    ],
    what: "A coconut-shell carbon block compressed into a dense matrix. Dissolved chemicals stick to its surface and never leave.",
    why: "This is what makes water taste like water again. The single biggest flavor change you'll notice.",
  },
  {
    id: "softener",
    label: "Softener Resin",
    subtitle: "Stage 3 · Ionic",
    color: "#12BDFB",
    glowColor: "rgba(18,189,251,0.55)",
    yTop: 360,
    yBottom: 480,
    removes: [
      { name: "Calcium",       detail: "The mineral that builds scale on every fixture" },
      { name: "Magnesium",     detail: "Co-conspirator in hardness; ruins soap" },
      { name: "Iron (≤3 ppm)", detail: "Dissolved iron that stains laundry and porcelain" },
      { name: "Scale-formers", detail: "Anything that crystalizes inside your appliances" },
    ],
    what: "Ion-exchange resin beads. Every hardness ion gets swapped for a sodium ion as the water passes through.",
    why: "Result: zero scale buildup, soaps actually lather, appliances last 2× longer.",
  },
];

type ParticleType = "rust" | "sediment" | "chlorine" | "pfas" | "calcium" | "iron" | "clean";

type Particle = {
  id: number;
  type: ParticleType;
  xJitter: number;     // -1..1 horizontal offset
  delay: number;
  duration: number;
  caughtAtY: number;   // y where it gets stopped (pure ones reach 510)
  size: number;
  shape: "circle" | "hex" | "diamond" | "spike";
  color: string;
};

// Centerline of the tube
const CENTER_X = 330;
const TUBE_HALF_W = 70;
const ENTRY_Y = 80;
const EXIT_Y = 520;

function buildParticles(count: number): Particle[] {
  const types: { type: ParticleType; stageY: number; size: number; shape: Particle["shape"]; color: string }[] = [
    { type: "rust",     stageY: 235, size: 6.5, shape: "spike",   color: "#dc2626" },
    { type: "sediment", stageY: 235, size: 4.5, shape: "circle",  color: "#92400e" },
    { type: "chlorine", stageY: 355, size: 5.5, shape: "hex",     color: "#facc15" },
    { type: "pfas",     stageY: 355, size: 6,   shape: "hex",     color: "#a855f7" },
    { type: "calcium",  stageY: 475, size: 5,   shape: "diamond", color: "#60a5fa" },
    { type: "iron",     stageY: 475, size: 5.5, shape: "diamond", color: "#fb923c" },
  ];

  const arr: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const t = types[i % types.length];
    arr.push({
      id: i,
      type: t.type,
      xJitter: (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * 0.5,
      delay: (i * 0.32) % 4.5,
      duration: 4.2 + ((i * 0.13) % 1.4),
      caughtAtY: t.stageY,
      size: t.size,
      shape: t.shape,
      color: t.color,
    });
  }
  // Add cleaner droplets that pass all the way through
  for (let i = 0; i < 10; i++) {
    arr.push({
      id: 1000 + i,
      type: "clean",
      xJitter: (Math.sin(i * 2.1)) * 0.4,
      delay: 0.6 + (i * 0.45) % 4,
      duration: 4.6 + ((i * 0.17) % 1.2),
      caughtAtY: EXIT_Y + 8,
      size: 5,
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
  // spike (rust flake)
  const r = size / 2;
  return (
    <polygon
      points={`0,-${r} ${r * 0.4},-${r * 0.3} ${r},0 ${r * 0.3},${r * 0.4} 0,${r} -${r * 0.4},${r * 0.3} -${r},0 -${r * 0.3},-${r * 0.4}`}
      fill={color}
    />
  );
}

function FlowingParticle({ p, activeStage }: { p: Particle; activeStage: StageId }) {
  // x position varies subtly during fall to feel like water motion
  const xStart = CENTER_X + p.xJitter * (TUBE_HALF_W - 20);
  const xMid   = CENTER_X + p.xJitter * (TUBE_HALF_W - 30) * -1;
  const xEnd   = CENTER_X + p.xJitter * (TUBE_HALF_W - 25) * 0.6;

  // dim if user is focused on a different stage
  const isCleanType = p.type === "clean";
  const stageOfThisParticle: StageId | null =
    p.caughtAtY < 250 ? "sediment" :
    p.caughtAtY < 370 ? "carbon"   :
    p.caughtAtY < 490 ? "softener" : null;

  const dimmed = !isCleanType && stageOfThisParticle !== null && stageOfThisParticle !== activeStage;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        x: [xStart, xMid, xEnd],
        y: [ENTRY_Y, (ENTRY_Y + p.caughtAtY) / 2, p.caughtAtY],
        opacity: [0, dimmed ? 0.25 : 1, dimmed ? 0.2 : (isCleanType ? 1 : 0)],
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        repeatDelay: 0.2,
        delay: p.delay,
        ease: "easeIn",
        times: [0, 0.55, 1],
      }}
    >
      <ParticleShape shape={p.shape} size={p.size} color={p.color} />
      {isCleanType && (
        <circle r={p.size * 1.6} fill={p.color} opacity={0.18} />
      )}
    </motion.g>
  );
}

export default function HouseDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStage, setActiveStage] = useState<StageId>("sediment");
  const current = STAGES.find(s => s.id === activeStage)!;

  const particles = useMemo(() => buildParticles(36), []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: "#07111A" }}>
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(18,189,251,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            Inside The System
          </p>
          <h2
            className="font-display font-bold leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", letterSpacing: "-0.035em" }}
          >
            Dirty water in.<br /><span style={{ color: "#12BDFB" }}>Pure water out.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "52ch", margin: "1.25rem auto 0" }}>
            Watch your water travel through three stages of treatment. Click any stage to see exactly what gets removed and how.
          </p>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {[
            { icon: Beaker,       label: "Three-stage treatment" },
            { icon: Droplets,     label: "99.9% contaminant removal" },
            { icon: Sparkles,     label: "Tastes like nothing" },
            { icon: ShieldCheck,  label: "Lifetime warranty" },
          ].map((chip) => (
            <div key={chip.label} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(18,189,251,0.06)", border: "1px solid rgba(18,189,251,0.15)", color: "rgba(255,255,255,0.7)" }}>
              <chip.icon className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              {chip.label}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-14 items-start">

          {/* LEFT — Animated filter cross-section */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl p-4 md:p-6"
            style={{
              background: "linear-gradient(180deg, rgba(245,158,11,0.04) 0%, rgba(124,58,237,0.04) 50%, rgba(18,189,251,0.06) 100%)",
              border: "1px solid rgba(18,189,251,0.1)",
            }}
          >
            <svg
              viewBox="0 0 660 600"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block" }}
              aria-label="Cross-section of three-stage water treatment showing contaminants being filtered"
            >
              <defs>
                <linearGradient id="tubeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(245,158,11,0.10)" />
                  <stop offset="50%"  stopColor="rgba(124,58,237,0.10)" />
                  <stop offset="100%" stopColor="rgba(18,189,251,0.14)" />
                </linearGradient>

                <linearGradient id="dirtyInlet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>

                <linearGradient id="cleanOutlet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e7490" />
                  <stop offset="100%" stopColor="#12BDFB" />
                </linearGradient>

                {STAGES.map(s => (
                  <radialGradient key={s.id} id={`stageGlow-${s.id}`}>
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                  </radialGradient>
                ))}

                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              {/* Section title labels at top */}
              <text x="60" y="50" fill="rgba(255,255,255,0.35)" fontSize="11" fontWeight="600" letterSpacing="2">
                MAIN SUPPLY
              </text>
              <text x="60" y="68" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="700">
                Untreated water in
              </text>

              <text x="600" y="50" fill="rgba(18,189,251,0.7)" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="end">
                YOUR HOME
              </text>
              <text x="600" y="68" fill="#12BDFB" fontSize="13" fontWeight="700" textAnchor="end">
                Pure water out
              </text>

              {/* Inlet pipe (dirty) */}
              <rect x={CENTER_X - 18} y="20" width="36" height={ENTRY_Y - 20} fill="url(#dirtyInlet)" rx="3" />
              <rect x={CENTER_X - 18} y="20" width="36" height={ENTRY_Y - 20} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" rx="3" />

              {/* Inlet flange */}
              <rect x={CENTER_X - 30} y={ENTRY_Y - 6} width="60" height="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2" />

              {/* Main tube body */}
              <rect
                x={CENTER_X - TUBE_HALF_W}
                y={ENTRY_Y}
                width={TUBE_HALF_W * 2}
                height={EXIT_Y - ENTRY_Y}
                fill="url(#tubeGrad)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
                rx="6"
              />

              {/* Stage chambers */}
              {STAGES.map((s) => {
                const isActive = activeStage === s.id;
                return (
                  <g key={s.id} onClick={() => setActiveStage(s.id)} style={{ cursor: "pointer" }}>
                    {/* Stage background tint */}
                    <motion.rect
                      x={CENTER_X - TUBE_HALF_W + 1}
                      y={s.yTop}
                      width={TUBE_HALF_W * 2 - 2}
                      height={s.yBottom - s.yTop}
                      fill={s.color}
                      animate={{ fillOpacity: isActive ? 0.14 : 0.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Stage divider line */}
                    <line
                      x1={CENTER_X - TUBE_HALF_W}
                      y1={s.yBottom}
                      x2={CENTER_X + TUBE_HALF_W}
                      y2={s.yBottom}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />

                    {/* Stage glow when active */}
                    {isActive && (
                      <motion.ellipse
                        cx={CENTER_X}
                        cy={(s.yTop + s.yBottom) / 2}
                        rx={TUBE_HALF_W + 40}
                        ry={(s.yBottom - s.yTop) / 2 + 10}
                        fill={`url(#stageGlow-${s.id})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Stage label tag - left side */}
                    <g transform={`translate(${CENTER_X - TUBE_HALF_W - 200}, ${(s.yTop + s.yBottom) / 2 - 22})`}>
                      <motion.rect
                        x="0" y="0" width="180" height="44" rx="22"
                        fill={isActive ? s.color : "rgba(255,255,255,0.04)"}
                        animate={{ fillOpacity: isActive ? 0.18 : 1 }}
                        stroke={isActive ? s.color : "rgba(255,255,255,0.08)"}
                        strokeWidth="1"
                      />
                      <text x="20" y="18" fill={isActive ? s.color : "rgba(255,255,255,0.4)"} fontSize="9" fontWeight="700" letterSpacing="1.5">
                        {s.subtitle.toUpperCase()}
                      </text>
                      <text x="20" y="34" fill={isActive ? "#ffffff" : "rgba(255,255,255,0.7)"} fontSize="13" fontWeight="700">
                        {s.label}
                      </text>
                      {/* connector line to tube */}
                      <line x1="180" y1="22" x2="200" y2="22" stroke={isActive ? s.color : "rgba(255,255,255,0.15)"} strokeWidth="1.5" />
                    </g>

                    {/* Trapped particle pile at bottom of stage (visual: caught contaminants) */}
                    {Array.from({ length: 7 }).map((_, idx) => {
                      const angleSeed = (idx + 1) * (s.id.length + 2);
                      const px = CENTER_X - TUBE_HALF_W + 18 + idx * 16 + (Math.sin(angleSeed) * 6);
                      const py = s.yBottom - 8 - Math.abs(Math.cos(angleSeed)) * 4;
                      return (
                        <motion.circle
                          key={idx}
                          cx={px}
                          cy={py}
                          r={2.4}
                          fill={s.color}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: isActive ? 0.85 : 0.45, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Tube outline overlay (so chambers don't paint over the border) */}
              <rect
                x={CENTER_X - TUBE_HALF_W}
                y={ENTRY_Y}
                width={TUBE_HALF_W * 2}
                height={EXIT_Y - ENTRY_Y}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
                rx="6"
              />

              {/* Outlet flange */}
              <rect x={CENTER_X - 30} y={EXIT_Y - 6} width="60" height="12" fill="rgba(18,189,251,0.15)" stroke="rgba(18,189,251,0.3)" strokeWidth="1" rx="2" />

              {/* Outlet pipe (clean) */}
              <rect x={CENTER_X - 18} y={EXIT_Y} width="36" height={580 - EXIT_Y} fill="url(#cleanOutlet)" rx="3" />

              {/* Particles flowing through */}
              {particles.map(p => (
                <FlowingParticle key={p.id} p={p} activeStage={activeStage} />
              ))}

              {/* Inlet droplet animation (water entering) */}
              <motion.circle
                cx={CENTER_X}
                cy={ENTRY_Y - 4}
                r={4}
                fill="#92400e"
                animate={{ cy: [ENTRY_Y - 14, ENTRY_Y - 4, ENTRY_Y - 14], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />

              {/* Outlet droplet pulse */}
              <motion.circle
                cx={CENTER_X}
                cy={EXIT_Y + 6}
                r={4}
                fill="#12BDFB"
                animate={{ cy: [EXIT_Y + 4, EXIT_Y + 14, EXIT_Y + 4], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }}
                filter="url(#softGlow)"
              />
            </svg>

            {/* Footer hint */}
            <div className="flex items-center justify-between text-xs px-2 mt-2">
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                <span style={{ color: current.color, fontWeight: 700 }}>●</span> Active stage:{" "}
                <span style={{ color: "#ffffff", fontWeight: 600 }}>{current.label}</span>
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>Click any stage label</span>
            </div>
          </motion.div>

          {/* RIGHT — Stage detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {/* Header band */}
                <div
                  className="px-7 py-6 border-b"
                  style={{
                    background: `linear-gradient(135deg, ${current.color}22 0%, transparent 60%)`,
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: current.color }}>
                      {current.subtitle}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${current.color}22`, color: current.color }}
                    >
                      <motion.span
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: current.color }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      Live
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white" style={{ letterSpacing: "-0.025em" }}>
                    {current.label}
                  </h3>
                </div>

                {/* What it does */}
                <div className="px-7 py-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                      What it does
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {current.what}
                    </p>
                  </div>

                  {/* Removes list */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                      What gets removed
                    </p>
                    <ul className="space-y-2.5">
                      {current.removes.map((r, idx) => (
                        <motion.li
                          key={r.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.3 }}
                          className="flex gap-3 items-start"
                        >
                          <span
                            className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: current.color, boxShadow: `0 0 10px ${current.glowColor}` }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">{r.name}</p>
                            <p className="text-xs leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                              {r.detail}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Why it matters */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      backgroundColor: `${current.color}0d`,
                      border: `1px solid ${current.color}33`,
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: current.color }}>
                      Why this stage matters
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {current.why}
                    </p>
                  </div>

                  <Link
                    href="/get-started"
                    className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-all"
                    style={{ backgroundColor: "#f59e0b", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(245,158,11,0.3)" }}
                  >
                    Get a free water test
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stage selector pills under the diagram */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-10"
        >
          {STAGES.map(s => {
            const isActive = activeStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: isActive ? `${s.color}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? `${s.color}66` : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? s.color : "rgba(255,255,255,0.5)",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
