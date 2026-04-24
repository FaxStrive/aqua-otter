"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Check, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

// ── Stages ────────────────────────────────────────────────────────────────────

// ── Quintex 5 actual media stages (bottom-up through tank) ───────────────────

const STAGES = [
  {
    n: "01",
    name: "Coconut Shell Carbon",
    tag: "Better skin. Better hair. Better taste.",
    desc: "The chlorine in your water strips your hair and dries out your skin every single shower. Remove it and you feel the difference within days — softer skin, healthier hair, water that actually tastes like water.",
    removes: ["Softer skin", "Healthier hair", "Better taste", "No chlorine smell"],
    accent: "#64748b",
  },
  {
    n: "02",
    name: "Catalytic Carbon",
    tag: "The chemicals you never knew were there.",
    desc: "Forever chemicals, pharmaceuticals, and industrial byproducts that pass right through standard municipal treatment. This stage removes what your city water plant doesn't — protecting your family from what you can't see or taste.",
    removes: ["Forever chemicals", "Pharmaceuticals", "Safer for your family", "Cleaner water"],
    accent: "#475569",
  },
  {
    n: "03",
    name: "KDF-55",
    tag: "Lead and mercury. Not in your home.",
    desc: "Old pipes and fixtures leach heavy metals into your water before it ever reaches the tap. Lead and mercury removed before they reach your family's glasses, your kids' bath, your morning coffee.",
    removes: ["Lead free", "Mercury free", "Bacteria controlled", "Longer filter life"],
    accent: "#d4a017",
  },
  {
    n: "04",
    name: "Food-Grade Phosphate",
    tag: "Your home. Protected for life.",
    desc: "Hard water silently destroys water heaters, dishwashers, and pipes — costing thousands in repairs. This salt-free stage conditions minerals so they stop sticking. Everything runs better. Everything lasts longer.",
    removes: ["Appliances last longer", "No scale buildup", "Fixtures stay clean", "Zero salt needed"],
    accent: "#12BDFB",
  },
] as const;

// ── Stream colours ────────────────────────────────────────────────────────────

// Water appearance at each stage — changes when filter band passes through
// Index 0 = raw city water, index 1-4 = after each filter stage clears
const STAGE_WATER = [
  { r: 192, g: 190, b: 155, a: 0.90 }, // 0: raw chlorinated city water — yellow-gray
  { r: 148, g: 170, b: 182, a: 0.78 }, // 1: post coconut carbon — gray-blue
  { r: 105, g: 160, b: 185, a: 0.65 }, // 2: post catalytic carbon — clear blue-gray
  { r:  50, g: 172, b: 215, a: 0.55 }, // 3: post KDF-55 — pale cyan
  { r:  18, g: 189, b: 251, a: 0.72 }, // 4: post phosphate — pure vivid cyan
];

// ── Filter texture drawers ────────────────────────────────────────────────────

const BAND_H = 140;
const SW     = 90; // stream width — cinematic size

function bandRange(prog: number, s0: number, mid: number, s1: number, H: number) {
  if (prog <= s0) return H * 1.15;
  if (prog >= s1) return -H * 1.15;
  const t = prog <= mid
    ? (prog - s0) / (mid - s0)
    : 1 - (prog - mid) / (s1 - mid) * 0;
  if (prog <= mid) return H * 1.15 * (1 - t);
  const t2 = (prog - mid) / (s1 - mid);
  return -H * 1.15 * t2;
}

// Sediment — white fibrous filter paper
function drawSediment(ctx: CanvasRenderingContext2D, cy: number, W: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cy - BAND_H / 2, W, BAND_H);
  ctx.clip();

  // Base — off-white slightly warm
  ctx.fillStyle = "rgba(242, 238, 233, 0.96)";
  ctx.fillRect(0, cy - BAND_H / 2, W, BAND_H);

  // Fibres
  const rng = mulberry32(42);
  for (let i = 0; i < 420; i++) {
    const y  = cy - BAND_H / 2 + rng() * BAND_H;
    const x0 = rng() * W * 0.15;
    const x1 = W - rng() * W * 0.15;
    const thick = 0.3 + rng() * 0.9;
    const alpha = 0.08 + rng() * 0.22;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    // slight waver
    const mx = (x0 + x1) / 2;
    ctx.quadraticCurveTo(mx, y + (rng() - 0.5) * 3, x1, y + (rng() - 0.5) * 2);
    ctx.strokeStyle = `rgba(140,130,120,${alpha})`;
    ctx.lineWidth = thick;
    ctx.stroke();
  }

  // Faint vertical threads
  for (let i = 0; i < 60; i++) {
    const x = rng() * W;
    ctx.beginPath();
    ctx.moveTo(x, cy - BAND_H / 2);
    ctx.lineTo(x + (rng()-0.5)*4, cy + BAND_H / 2);
    ctx.strokeStyle = `rgba(150,140,130,${0.04 + rng()*0.08})`;
    ctx.lineWidth = 0.4 + rng() * 0.6;
    ctx.stroke();
  }

  ctx.restore();
}

// Coconut Shell Carbon — deep black granules, slightly larger
function drawCoconutCarbon(ctx: CanvasRenderingContext2D, cy: number, W: number) {
  drawCarbonBase(ctx, cy, W, 4.8, "#424242", "#232323", "#0d0d0d", 16);
}

// Catalytic Carbon — finer black granules, slightly lighter shade
function drawCatalyticCarbon(ctx: CanvasRenderingContext2D, cy: number, W: number) {
  drawCarbonBase(ctx, cy, W, 3.5, "#3a3a3a", "#1c1c1c", "#090909", 21);
}

function drawCarbonBase(
  ctx: CanvasRenderingContext2D, cy: number, W: number,
  GR: number, hi: string, mid: string, lo: string, seed: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cy - BAND_H / 2, W, BAND_H);
  ctx.clip();

  ctx.fillStyle = "#080808";
  ctx.fillRect(0, cy - BAND_H / 2, W, BAND_H);

  const rng = mulberry32(seed);
  const SP  = GR * 2.05;

  for (let x = -SP; x < W + SP; x += SP*(0.82+rng()*0.36)) {
    for (let y = cy-BAND_H/2-SP; y < cy+BAND_H/2+SP; y += SP*(0.82+rng()*0.36)) {
      const jx = x+(rng()-0.5)*SP*0.6;
      const jy = y+(rng()-0.5)*SP*0.6;
      const r  = GR*(0.65+rng()*0.55);

      ctx.beginPath();
      ctx.arc(jx+1.2, jy+1.2, r, 0, Math.PI*2);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      const grad = ctx.createRadialGradient(jx-r*0.25, jy-r*0.25, 0, jx, jy, r);
      grad.addColorStop(0, hi);
      grad.addColorStop(0.5, mid);
      grad.addColorStop(1, lo);
      ctx.beginPath();
      ctx.arc(jx, jy, r, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(jx-r*0.32, jy-r*0.32, r*0.22, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      ctx.fill();
    }
  }
  ctx.restore();
}

// KDF-55 — golden/brass granules (matches spec sheet photo)
function drawKDF55(ctx: CanvasRenderingContext2D, cy: number, W: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cy - BAND_H/2, W, BAND_H);
  ctx.clip();

  ctx.fillStyle = "#2a1e00";
  ctx.fillRect(0, cy - BAND_H/2, W, BAND_H);

  const rng = mulberry32(55);
  const GR  = 4.0;
  const SP  = GR * 2.1;

  for (let x = -SP; x < W+SP; x += SP*(0.80+rng()*0.40)) {
    for (let y = cy-BAND_H/2-SP; y < cy+BAND_H/2+SP; y += SP*(0.80+rng()*0.40)) {
      const jx = x+(rng()-0.5)*SP*0.65;
      const jy = y+(rng()-0.5)*SP*0.65;
      const r  = GR*(0.6+rng()*0.6);

      ctx.beginPath();
      ctx.arc(jx+1.5, jy+1.5, r, 0, Math.PI*2);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fill();

      const g = ctx.createRadialGradient(jx-r*0.28, jy-r*0.28, 0, jx, jy, r);
      g.addColorStop(0.0, "#FFE066");
      g.addColorStop(0.25, "#D4A017");
      g.addColorStop(0.6,  "#A07800");
      g.addColorStop(1.0,  "#5C4400");
      ctx.beginPath();
      ctx.arc(jx, jy, r, 0, Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(jx-r*0.35, jy-r*0.35, r*0.30, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,248,180,0.85)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(jx-r*0.18, jy-r*0.18, r*0.12, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fill();
    }
  }
  ctx.restore();
}

// Food-Grade Phosphate — white/cream crystalline beads (matches spec sheet photo)
function drawPhosphate(ctx: CanvasRenderingContext2D, cy: number, W: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cy - BAND_H/2, W, BAND_H);
  ctx.clip();

  ctx.fillStyle = "#e8e4de";
  ctx.fillRect(0, cy - BAND_H/2, W, BAND_H);

  const rng = mulberry32(88);
  const R   = 5.5;
  const SX  = R * 2.05;
  const SY  = R * 1.78;
  let row   = 0;

  for (let y = cy-BAND_H/2+R; y < cy+BAND_H/2+R; y += SY, row++) {
    const offX = (row%2)*SX*0.5;
    for (let x = offX; x < W+R; x += SX) {
      const jx = x+(rng()-0.5)*1.5;
      const jy = y+(rng()-0.5)*1.5;

      ctx.beginPath();
      ctx.arc(jx+1.2, jy+1.2, R, 0, Math.PI*2);
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fill();

      const g = ctx.createRadialGradient(jx-R*0.3, jy-R*0.3, 0, jx, jy, R);
      g.addColorStop(0.0, "#ffffff");
      g.addColorStop(0.3, "#f0ece4");
      g.addColorStop(0.7, "#d8d0c4");
      g.addColorStop(1.0, "#c0b8ac");
      ctx.beginPath();
      ctx.arc(jx, jy, R, 0, Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(jx-R*0.36, jy-R*0.36, R*0.30, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(jx-R*0.18, jy-R*0.18, R*0.12, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();
    }
  }
  ctx.restore();
}

// ── Tiny PRNG (no Math.random in draw so textures are stable) ────────────────

function mulberry32(seed: number) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ── Particle system ───────────────────────────────────────────────────────────

type PType = "flake" | "speck" | "bubble";
type Particle = {
  type: PType; x: number; y: number; vy: number; vx: number;
  vr: number; rot: number; w: number; h: number; size: number;
  baseOpacity: number; opacity: number;
  r: number; g: number; b: number;
  removedAtStage: number;
  // Extraction state
  extracting: boolean;
  extractVx: number;
  extractVy: number;
  extractScale: number;
  extractTrail: number; // trail opacity
};

// Extraction burst particles — short-lived sparks that fly out when filter captures contaminant
type Spark = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number;
  r: number; g: number; b: number;
  size: number;
};

function mkParticles(H: number): Particle[] {
  const ps: Particle[] = [];
  const rng = () => Math.random();

  // Chlorine/chemical particles — yellow-gray, larger, more visible
  for (let i = 0; i < 18; i++) {
    const br = 155 + rng()*40;
    ps.push({ type:"flake", x:rng()*SW*0.8-SW*0.4, y:rng()*H,
      vy:0.3+rng()*0.6, vx:rng()*0.12-0.06, vr:rng()*0.025-0.0125, rot:rng()*6,
      w:2.5+rng()*5, h:1.2+rng()*3, size:0,
      baseOpacity:0.42+rng()*0.3, opacity:0.35,
      r:br, g:br, b:Math.floor(br*0.65),
      removedAtStage:Math.floor(rng()*2),
      extracting:false, extractVx:0, extractVy:0, extractScale:1, extractTrail:0 });
  }

  // Fine chemical specks — more of them, varied sizes
  for (let i = 0; i < 55; i++) {
    const v = 145+rng()*50;
    ps.push({ type:"speck", x:rng()*SW*0.88-SW*0.44, y:rng()*H,
      vy:0.15+rng()*0.4, vx:rng()*0.08-0.04, vr:0, rot:0, w:0, h:0,
      size:0.5+rng()*1.8,
      baseOpacity:0.22+rng()*0.38, opacity:0.25,
      r:v, g:v, b:Math.floor(v*0.72),
      removedAtStage:Math.floor(rng()*4),
      extracting:false, extractVx:0, extractVy:0, extractScale:1, extractTrail:0 });
  }

  // Bubbles — rise up through stream
  for (let i = 0; i < 14; i++) {
    ps.push({ type:"bubble", x:rng()*SW*0.76-SW*0.38, y:rng()*H,
      vy:-(0.35+rng()*0.5), vx:rng()*0.08-0.04, vr:0, rot:0, w:0, h:0,
      size:1.2+rng()*3.5,
      baseOpacity:0.12+rng()*0.25, opacity:0.15,
      r:210, g:230, b:248,
      removedAtStage:3,
      extracting:false, extractVx:0, extractVy:0, extractScale:1, extractTrail:0 });
  }

  return ps;
}

// ── Splash/Burst system — particles that spray when filter meets stream ─────

type SplashParticle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
  r: number; g: number; b: number;
};

// ── Glow flash system — radial pulse when stage clears ──────────────────────
type GlowFlash = {
  x: number; y: number; life: number; maxLife: number;
  r: number; g: number; b: number; maxRadius: number;
};

function noise(x: number, y: number, t: number) {
  return (Math.sin(x*0.08+y*0.06+t*0.65)*0.45
        + Math.sin(x*0.17-y*0.09+t*1.1 )*0.35
        + Math.sin(x*0.05+y*0.13-t*0.5 )*0.20);
}

// ── Component ─────────────────────────────────────────────────────────────────

// Each band: [enter, center, exit]
// Scroll-driven position, but scroll SNAPS between stages so you can't
// land between two filters. Each filter sweeps as a complete action.
//
// Timeline (within 650vh section):
// 0.00–0.12  Intro hold — snap point
// 0.12–0.20  Band 1 sweeps through
// 0.20–0.35  Stage 1 hold — snap point
// 0.35–0.43  Band 2 sweeps through
// 0.43–0.58  Stage 2 hold — snap point
// 0.58–0.66  Band 3 sweeps through
// 0.66–0.81  Stage 3 hold — snap point
// 0.81–0.89  Band 4 sweeps through
// 0.89–1.00  Completion hold — snap point
const BAND_RANGES = [
  [0.12, 0.16, 0.20],
  [0.35, 0.39, 0.43],
  [0.58, 0.62, 0.66],
  [0.81, 0.85, 0.89],
] as const;

export default function WaterJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const pRef         = useRef<Particle[]>([]);
  const sparksRef    = useRef<Spark[]>([]);
  const splashRef    = useRef<SplashParticle[]>([]);
  const glowRef      = useRef<GlowFlash[]>([]);
  const prevStageRef = useRef(-1);
  const scrollProg   = useRef(0);
  const rafRef       = useRef<number>();
  const timeRef      = useRef(0);
  // Smoothly animated water colour — lerps toward target when stage changes
  const waterCol     = useRef({ ...STAGE_WATER[0] });
  // Smoothly animated cleanliness 0→1
  const cleanAnim    = useRef(0);
  const [activeStage, setActiveStage] = useState(-1);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    pRef.current = mkParticles(window.innerHeight);
  }, []);

  // ── JS scroll snap — locks scroll to hold zones between filters ──────
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Hold zones as fractions of scroll progress where we want to snap
    // These are the midpoints of the hold zones (between filter sweeps)
    const snapTargets = [0.06, 0.27, 0.50, 0.73, 0.94];

    let scrollTimeout: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const onScroll = () => {
      if (isSnapping) return;
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionH = rect.height - window.innerHeight;

        // Only snap if we're inside the section
        if (rect.top > 0 || rect.bottom < window.innerHeight) return;

        const currentProg = (window.scrollY - sectionTop) / sectionH;

        // Don't snap if we're in a filter sweep zone — let it play through
        const inSweep = BAND_RANGES.some(([s0, , s1]) =>
          currentProg >= s0 - 0.02 && currentProg <= s1 + 0.02
        );
        if (inSweep) return;

        // Find nearest snap target
        let nearest = snapTargets[0];
        let minDist = Math.abs(currentProg - nearest);
        for (const st of snapTargets) {
          const d = Math.abs(currentProg - st);
          if (d < minDist) { minDist = d; nearest = st; }
        }

        // Only snap if we're close enough (within 5% scroll)
        if (minDist < 0.05 && minDist > 0.005) {
          isSnapping = true;
          const targetScroll = sectionTop + nearest * sectionH;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
          setTimeout(() => { isSnapping = false; }, 600);
        }
      }, 120); // Wait 120ms after scroll stops
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ── Draw loop ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || shouldReduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      pRef.current  = mkParticles(canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      timeRef.current = ts;
      const t    = ts * 0.001;
      const W    = canvas.width;
      const H    = canvas.height;
      const cx   = W / 2;
      const prog = scrollProg.current;

      // Stage clears once band passes center (midpoint of its sweep)
      let stageCleared = -1;
      if (prog > 0.16) stageCleared = 0;
      if (prog > 0.39) stageCleared = 1;
      if (prog > 0.62) stageCleared = 2;
      if (prog > 0.85) stageCleared = 3;

      // Target water colour based on which stage has cleared — NOT scroll progress
      const targetCol   = STAGE_WATER[stageCleared + 1];
      const targetClean = (stageCleared + 1) / 4;
      const speed       = 0.035; // lerp speed — how fast water changes after filter

      const wc = waterCol.current;
      wc.r += (targetCol.r - wc.r) * speed;
      wc.g += (targetCol.g - wc.g) * speed;
      wc.b += (targetCol.b - wc.b) * speed;
      wc.a += (targetCol.a - wc.a) * speed;
      cleanAnim.current += (targetClean - cleanAnim.current) * speed;

      const col   = wc;
      const clean = cleanAnim.current;

      ctx.clearRect(0, 0, W, H);

      // ── 0. ATMOSPHERIC BACKGROUND — shifts from murky haze to crystal ────
      // Full-screen atmosphere that responds to cleanliness
      const hazeA = Math.max(0, (1 - clean) * 0.06);
      if (hazeA > 0.002) {
        const haze = ctx.createRadialGradient(cx, H*0.5, 0, cx, H*0.5, W*0.6);
        haze.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${hazeA})`);
        haze.addColorStop(0.5, `rgba(${col.r*0.8},${col.g*0.75},${col.b*0.6},${hazeA*0.5})`);
        haze.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.fillStyle = haze;
        ctx.fillRect(0, 0, W, H);
      }

      // Ambient floating motes — dust/atmosphere particles
      const moteRng = mulberry32(999);
      for (let m = 0; m < 35; m++) {
        const mx = moteRng() * W;
        const baseY = moteRng() * H;
        const my = baseY + Math.sin(t * 0.3 + m * 0.7) * 15;
        const mSz = 0.5 + moteRng() * 2;
        const mA = (0.03 + moteRng() * 0.06) * (1 - clean * 0.6);
        if (mA > 0.005) {
          ctx.beginPath();
          ctx.arc(mx, my, mSz, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${mA})`;
          ctx.fill();
        }
      }

      // GOD RAYS — emerge as water gets cleaner (light beams from above)
      const rayStrength = Math.max(0, (clean - 0.3) * 1.5);
      if (rayStrength > 0.01) {
        for (let ray = 0; ray < 5; ray++) {
          const rayX = cx + (ray - 2) * (W * 0.12) + Math.sin(t * 0.2 + ray) * 30;
          const rayW = 40 + ray * 15 + Math.sin(t * 0.4 + ray * 1.3) * 10;
          const rayA = rayStrength * (0.02 + Math.sin(t * 0.3 + ray * 0.9) * 0.01);
          const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + rayW * 0.3, H);
          rayGrad.addColorStop(0, `rgba(255,255,255,${rayA * 1.5})`);
          rayGrad.addColorStop(0.3, `rgba(${col.r},${col.g},${col.b},${rayA})`);
          rayGrad.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.moveTo(rayX - rayW*0.3, 0);
          ctx.lineTo(rayX + rayW*0.7, 0);
          ctx.lineTo(rayX + rayW*1.2, H);
          ctx.lineTo(rayX - rayW*0.1, H);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();
        }
      }

      // ── 1. Filter band textures ──────────────────────────────────────────
      BAND_RANGES.forEach(([s0, mid, s1], i) => {
        let offsetY: number;
        if (prog <= s0)        offsetY = H * 1.15;
        else if (prog >= s1)   offsetY = -H * 1.15;
        else if (prog <= mid)  offsetY = H * 1.15 * (1 - (prog-s0)/(mid-s0));
        else                   offsetY = -H * 1.15 * ((prog-mid)/(s1-mid));

        const bandCY = H / 2 + offsetY;
        if (bandCY < -BAND_H || bandCY > H + BAND_H) return;

        if (i === 0) drawCoconutCarbon(ctx, bandCY, W);
        if (i === 1) drawCatalyticCarbon(ctx, bandCY, W);
        if (i === 2) drawKDF55(ctx, bandCY, W);
        if (i === 3) drawPhosphate(ctx, bandCY, W);
      });

      // ── Compute filter band Y positions ──
      const bandYPositions: number[] = [];
      BAND_RANGES.forEach(([s0, mid, s1]) => {
        let oY: number;
        if (prog <= s0)        oY = H * 1.15;
        else if (prog >= s1)   oY = -H * 1.15;
        else if (prog <= mid)  oY = H * 1.15 * (1 - (prog-s0)/(mid-s0));
        else                   oY = -H * 1.15 * ((prog-mid)/(s1-mid));
        bandYPositions.push(H / 2 + oY);
      });

      // ── Helper: variable stream half-width with filter squeeze ──
      const sHW = (y: number) => {
        const base = SW / 2;
        const neck = Math.sin(y * 0.011 + t * 0.4) * 0.18
                   + Math.sin(y * 0.028 + t * 0.72) * 0.08
                   + Math.sin(y * 0.006 + t * 0.22) * 0.10;
        let squeeze = 0;
        for (const bandY of bandYPositions) {
          const dist = Math.abs(y - bandY);
          if (dist < BAND_H * 0.8) {
            const proximity = 1 - dist / (BAND_H * 0.8);
            squeeze = Math.max(squeeze, proximity * 0.45);
          }
        }
        return base * Math.max(0.25, (1 + neck) * (1 - squeeze));
      };

      const sDx = (y: number) =>
        Math.sin(y * 0.007 + t * 0.28) * 8
      + Math.sin(y * 0.018 + t * 0.52) * 4
      + Math.sin(y * 0.003 + t * 0.12) * 6;

      const streamPath = (exp: number) => {
        ctx.beginPath();
        for (let y = 0; y <= H; y += 2) {
          const x = cx + sDx(y) - sHW(y) - exp;
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        for (let y = H; y >= 0; y -= 2) {
          const x = cx + sDx(y) + sHW(y) + exp;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
      };

      // ── 2. Stream ambient glow — wide atmospheric wash around stream ─────
      ctx.save();
      ctx.shadowBlur  = 55;
      ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},${0.15 + clean * 0.2})`;
      streamPath(20);
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},0.001)`;
      ctx.fill();
      ctx.restore();

      // ── 3. Stream body — multi-layer cinematic rendering ─────────────────

      // Layer 1: outer soft glow
      ctx.save();
      ctx.shadowBlur  = 35;
      ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},${0.25 + clean * 0.15})`;
      streamPath(10);
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${col.a * 0.3})`;
      ctx.fill();
      ctx.restore();

      // Layer 2: mid body
      ctx.save();
      ctx.shadowBlur  = 14;
      ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},${0.4 + clean * 0.12})`;
      streamPath(3);
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${col.a * 0.55})`;
      ctx.fill();
      ctx.restore();

      // Layer 3: solid core
      streamPath(0);
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${col.a * 0.92})`;
      ctx.fill();

      // Layer 4: depth — 3D cylinder shadow
      streamPath(0);
      const depthG = ctx.createLinearGradient(cx - SW, 0, cx + SW, 0);
      depthG.addColorStop(0,    "rgba(0,0,0,0)");
      depthG.addColorStop(0.3,  "rgba(0,0,0,0)");
      depthG.addColorStop(0.5,  `rgba(0,0,0,${0.14 + (1-clean)*0.12})`);
      depthG.addColorStop(0.7,  "rgba(0,0,0,0)");
      depthG.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = depthG;
      ctx.fill();

      // Layer 5: bright left edge highlight
      ctx.save();
      ctx.shadowBlur  = 8;
      ctx.shadowColor = `rgba(255,255,255,${0.3 + clean * 0.3})`;
      ctx.beginPath();
      for (let y = 0; y <= H; y += 2) {
        const x = cx + sDx(y) - sHW(y) + 2;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      for (let y = H; y >= 0; y -= 2) {
        const x = cx + sDx(y) - sHW(y) + 8;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${0.2 + clean * 0.28})`;
      ctx.fill();
      ctx.restore();

      // Layer 6: right edge subtle highlight
      ctx.beginPath();
      for (let y = 0; y <= H; y += 2) {
        const x = cx + sDx(y) + sHW(y) - 5;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      for (let y = H; y >= 0; y -= 2) {
        const x = cx + sDx(y) + sHW(y) - 1;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${0.06 + clean * 0.1})`;
      ctx.fill();

      // Layer 7: inner core light refraction
      ctx.beginPath();
      for (let y = 0; y <= H; y += 2) {
        const hw2 = sHW(y) * 0.3;
        const x   = cx + sDx(y) - hw2;
        y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      for (let y = H; y >= 0; y -= 2) {
        const hw2 = sHW(y) * 0.3;
        const x   = cx + sDx(y) + hw2;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${0.06 + clean * 0.15})`;
      ctx.fill();

      // Layer 8: flowing shimmer bands — light catching the surface
      for (let i = 0; i < 8; i++) {
        const phase = ((t * 0.45 + i * 0.125) % 1);
        const shimY  = phase * H;
        const shimHW = sHW(shimY) * 0.9;
        const shimDx = sDx(shimY);
        const shimA  = Math.sin(phase * Math.PI) * (0.12 + clean * 0.18);
        ctx.beginPath();
        ctx.ellipse(cx + shimDx, shimY, shimHW, 3 + clean * 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${shimA})`;
        ctx.fill();
      }

      // Layer 9: velocity lines — sense of downward flow motion
      for (let vl = 0; vl < 12; vl++) {
        const vlRng = mulberry32(vl + 500);
        const vlX = (vlRng()-0.5) * SW * 0.7;
        const vlPhase = (t * (0.8 + vlRng() * 0.4) + vl * 0.33) % 1;
        const vlY = vlPhase * H;
        const vlLen = 15 + vlRng() * 30;
        const vlA = Math.sin(vlPhase * Math.PI) * (0.08 + clean * 0.12);
        if (vlA > 0.01) {
          ctx.beginPath();
          ctx.moveTo(cx + sDx(vlY) + vlX, vlY);
          ctx.lineTo(cx + sDx(vlY + vlLen) + vlX, vlY + vlLen);
          ctx.strokeStyle = `rgba(255,255,255,${vlA})`;
          ctx.lineWidth = 0.6 + vlRng() * 0.8;
          ctx.stroke();
        }
      }

      // Layer 10: murk swirls — dirty water turbulence (fades as water cleans)
      const mS = Math.max(0, 1 - clean * 1.6);
      if (mS > 0.01) {
        for (let y = 0; y < H; y += 7) {
          const n   = noise(0, y, t);
          const nhw = sHW(y);
          const nx  = sDx(y) + n * nhw * 0.55;
          const ew  = 4 + Math.abs(n) * 8;
          const dr  = n > 0;
          ctx.beginPath();
          ctx.ellipse(cx + nx, y, ew, 3.5, n * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dr?col.r*0.45:col.r*1.12},${dr?col.g*0.38:col.g*1.08},${dr?col.b*0.28:col.b*0.88},${mS*0.14})`;
          ctx.fill();
        }
      }

      // Layer 11: caustic diamond pattern — clean water only
      const cS = Math.max(0, (clean - 0.35) * 2.5);
      if (cS > 0.01) {
        for (let dir = -1; dir <= 1; dir += 2) {
          ctx.beginPath();
          for (let y = 0; y <= H; y += 2) {
            const nhw = sHW(y);
            const ndx = sDx(y);
            const x   = cx + ndx + dir * (
              Math.sin(y * 0.016 + t * 1.0 * dir) * nhw * 0.75
            + Math.sin(y * 0.035 + t * 0.55 * dir) * nhw * 0.2
            );
            y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${cS * 0.25})`;
          ctx.lineWidth   = 1.0 + Math.sin(t * 0.6 + dir) * 0.4;
          ctx.stroke();
        }
        // Centre caustic line
        ctx.beginPath();
        for (let y = 0; y <= H; y += 2) {
          const ndx = sDx(y);
          const x   = cx + ndx + Math.sin(y * 0.012 + t * 0.8) * sHW(y) * 0.25;
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${cS * 0.16})`;
        ctx.lineWidth   = 1.4;
        ctx.stroke();
      }

      // ── 4. Filter band impact effects — dramatic spray + shockwave ───────
      BAND_RANGES.forEach(([s0, mid, s1], i) => {
        let offsetY: number;
        if (prog <= s0)        offsetY = H * 1.15;
        else if (prog >= s1)   offsetY = -H * 1.15;
        else if (prog <= mid)  offsetY = H * 1.15 * (1 - (prog-s0)/(mid-s0));
        else                   offsetY = -H * 1.15 * ((prog-mid)/(s1-mid));

        const bandCY = H / 2 + offsetY;
        if (bandCY < -BAND_H || bandCY > H + BAND_H) return;

        const proximity = Math.max(0, 1 - Math.abs(bandCY - H/2) / (H * 0.35));

        if (proximity > 0.03) {
          // HEAVY spray — water exploding off both sides of the filter
          const sprayN = Math.floor(proximity * 14);
          for (let s = 0; s < sprayN; s++) {
            const side = s % 2 === 0 ? -1 : 1;
            const spread = SW/2 + 5 + Math.sin(t*5.2+s*1.8+i*3)*14 + Math.random()*8;
            const sprayX = cx + side * spread;
            const sprayY = bandCY + (Math.random()-0.5) * 24;
            const sz = 1.5 + Math.random() * 3.5;
            // Water drop with glow
            ctx.save();
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},${proximity * 0.3})`;
            ctx.beginPath();
            ctx.arc(sprayX, sprayY, sz, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${proximity * 0.45})`;
            ctx.fill();
            ctx.restore();
          }

          // Shockwave rings — cinematic pressure waves
          for (let ring = 0; ring < 5; ring++) {
            const rPhase = (t * 2.5 + ring * 0.5 + i * 1.5) % 3;
            const rR = SW * 0.6 + rPhase * 50;
            const rA = Math.max(0, (1 - rPhase/3)) * proximity * 0.18;
            if (rA > 0.008) {
              ctx.beginPath();
              ctx.ellipse(cx, bandCY, rR, 5 + ring * 2, 0, 0, Math.PI*2);
              ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${rA})`;
              ctx.lineWidth = 1.2 - ring * 0.15;
              ctx.stroke();
            }
          }

          // Captured contaminants stuck to filter — accumulate
          const captI = proximity * (prog > mid ? 0.4 : 0.9);
          if (captI > 0.1 && i <= stageCleared) {
            const captRng = mulberry32(i * 100 + 7);
            const captN = Math.floor(captI * 14);
            for (let c = 0; c < captN; c++) {
              const cX = cx + (captRng()-0.5) * SW * 0.8;
              const cY = bandCY + (captRng()-0.5) * BAND_H * 0.35;
              const cSz = 2 + captRng() * 3;
              ctx.beginPath();
              ctx.arc(cX, cY, cSz, 0, Math.PI*2);
              ctx.fillStyle = `rgba(${col.r*0.35},${col.g*0.3},${col.b*0.25},${captI * 0.55})`;
              ctx.fill();
              ctx.beginPath();
              ctx.arc(cX, cY, cSz + 1, 0, Math.PI*2);
              ctx.strokeStyle = `rgba(0,0,0,${captI * 0.18})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }

          // Impact glow at intersection — warm light at collision point
          const impGrad = ctx.createRadialGradient(cx, bandCY, 0, cx, bandCY, SW * 1.2);
          impGrad.addColorStop(0, `rgba(255,255,255,${proximity * 0.08})`);
          impGrad.addColorStop(0.3, `rgba(${col.r},${col.g},${col.b},${proximity * 0.06})`);
          impGrad.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
          ctx.fillStyle = impGrad;
          ctx.fillRect(cx - SW * 1.2, bandCY - SW, SW * 2.4, SW * 2);
        }
      });

      // ── 5. Stage change — CINEMATIC shockwave + burst ──────────────────
      if (stageCleared !== prevStageRef.current && stageCleared > prevStageRef.current) {
        const accentR = stageCleared === 3 ? 18 : stageCleared === 2 ? 212 : 100;
        const accentG = stageCleared === 3 ? 189 : stageCleared === 2 ? 160 : 116;
        const accentB = stageCleared === 3 ? 251 : stageCleared === 2 ? 23 : 130;

        // Screen-wide glow flash
        glowRef.current.push({
          x: cx, y: H/2, life: 1, maxLife: 1,
          r: accentR, g: accentG, b: accentB, maxRadius: W * 0.7,
        });

        // Massive splash burst — 48 particles
        for (let s = 0; s < 48; s++) {
          const angle = (s / 48) * Math.PI * 2 + Math.random() * 0.5;
          const speed = 4 + Math.random() * 10;
          splashRef.current.push({
            x: cx + (Math.random()-0.5) * SW * 0.6,
            y: H/2 + (Math.random()-0.5) * 40,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.5 - 3,
            life: 1, maxLife: 1,
            size: 2 + Math.random() * 5,
            r: col.r, g: col.g, b: col.b,
          });
        }

        prevStageRef.current = stageCleared;
      }
      if (stageCleared < prevStageRef.current) {
        prevStageRef.current = stageCleared;
      }

      // ── 6. Particles — LIVE extraction as filter band sweeps past ────────
      pRef.current.forEach(p => {
        const cleared = stageCleared >= p.removedAtStage;

        // Find the filter band for this particle's stage
        const bandIdx = p.removedAtStage;
        const [bs0, bMid, bs1] = BAND_RANGES[bandIdx];
        let bandOffsetY: number;
        if (prog <= bs0)        bandOffsetY = H * 1.15;
        else if (prog >= bs1)   bandOffsetY = -H * 1.15;
        else if (prog <= bMid)  bandOffsetY = H * 1.15 * (1 - (prog-bs0)/(bMid-bs0));
        else                    bandOffsetY = -H * 1.15 * ((prog-bMid)/(bs1-bMid));
        const bandCY = H / 2 + bandOffsetY;

        // LIVE EXTRACTION: if band is near this particle's Y position, SUCK IT IN
        const distToBand = Math.abs(p.y - bandCY);
        const inCaptureZone = distToBand < BAND_H * 1.2 && prog >= bs0 && prog <= bs1 && !p.extracting;

        if (inCaptureZone && p.opacity > 0.05) {
          // Attract toward band — stronger the closer it is
          const attraction = Math.max(0, 1 - distToBand / (BAND_H * 1.2));

          if (attraction > 0.3) {
            // Start full extraction — particle gets captured
            p.extracting = true;
            // Pull TOWARD band vertically AND outward horizontally
            const side = p.x >= 0 ? 1 : -1;
            p.extractVx = side * (1.5 + Math.random() * 3) * attraction;
            p.extractVy = (bandCY - p.y) * 0.08; // pull toward band center
            p.extractTrail = 1;

            // Sparks at capture point
            for (let sp = 0; sp < 5; sp++) {
              sparksRef.current.push({
                x: cx + p.x, y: p.y,
                vx: (Math.random()-0.5) * 8 * attraction,
                vy: (Math.random()-0.5) * 5,
                life: 1, maxLife: 1,
                r: p.r, g: p.g, b: p.b,
                size: 0.6 + Math.random() * 2,
              });
            }
          } else if (attraction > 0.1) {
            // Wobble/tremble — particle knows the filter is coming
            p.vx += (Math.random()-0.5) * 0.4 * attraction;
            p.vy += (bandCY > p.y ? 0.15 : -0.15) * attraction;
          }
        }

        // Also trigger extraction if stage already cleared but particle hasn't been captured yet
        if (cleared && !p.extracting && p.opacity > 0.05) {
          p.extracting = true;
          const side = p.x >= 0 ? 1 : -1;
          p.extractVx = side * (2 + Math.random() * 3.5);
          p.extractVy = (Math.random() - 0.5) * 2.5;
          p.extractTrail = 1;
          for (let sp = 0; sp < 3; sp++) {
            sparksRef.current.push({
              x: cx + p.x, y: p.y,
              vx: (Math.random()-0.5) * 5,
              vy: (Math.random()-0.5) * 3,
              life: 1, maxLife: 1,
              r: p.r, g: p.g, b: p.b,
              size: 0.5 + Math.random() * 1.5,
            });
          }
        }

        if (p.extracting) {
          // Fly toward band then outward — two-phase extraction
          p.x += p.extractVx;
          p.y += p.extractVy;
          p.extractVx *= 1.06; // accelerate outward
          p.extractVy *= 0.88; // dampen vertical
          p.extractScale *= 0.94;
          p.extractTrail *= 0.90;
          p.opacity *= 0.91;

          // Reset once gone
          if (p.opacity < 0.01 || Math.abs(p.x) > SW * 4) {
            p.extracting = false;
            p.opacity = 0;
            p.extractScale = 1;
            p.extractTrail = 0;
            p.x = (Math.random()-0.5) * SW * 0.8;
            p.y = Math.random() * H;
            p.extractVx = 0;
            p.extractVy = 0;
          }
        } else if (!cleared) {
          // Normal drift in stream
          p.opacity += (p.baseOpacity - p.opacity) * 0.025;
          p.y   += p.vy;
          p.x   += p.vx;
          p.rot += p.vr;

          const lim = SW * 0.44;
          if (p.x >  lim) p.vx -= 0.05;
          if (p.x < -lim) p.vx += 0.05;
          p.vx *= 0.97;

          if (p.type === "bubble") { if (p.y < -8) p.y = H + 8; }
          else                     { if (p.y > H+8) p.y = -8; }
        }

        if (p.opacity < 0.008) return;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        // Motion trail while being extracted
        if (p.extracting && p.extractTrail > 0.05) {
          const trailLen = Math.abs(p.extractVx) * 5;
          const trailDir = p.extractVx > 0 ? -1 : 1;
          // Multi-segment trail for smoother look
          for (let seg = 0; seg < 3; seg++) {
            const segAlpha = p.extractTrail * (0.4 - seg * 0.12);
            const segOff = (seg + 1) * trailLen * 0.35;
            ctx.beginPath();
            ctx.arc(cx + p.x + trailDir * segOff, p.y + p.extractVy * -seg,
              (p.size || p.w) * p.extractScale * (1 - seg * 0.25), 0, Math.PI*2);
            ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${segAlpha})`;
            ctx.fill();
          }
        }

        const scale = p.extractScale;

        if (p.type === "flake") {
          ctx.translate(cx + p.x, p.y);
          ctx.rotate(p.rot + (p.extracting ? p.extractVx * 0.3 : 0));
          ctx.scale(scale, scale);
          const fg = ctx.createLinearGradient(-p.w/2, -p.h/2, p.w/2, p.h/2);
          fg.addColorStop(0, `rgb(${Math.min(255,p.r+28)},${Math.min(255,p.g+18)},${Math.min(255,p.b+10)})`);
          fg.addColorStop(1, `rgb(${Math.max(0,p.r-16)},${Math.max(0,p.g-10)},${Math.max(0,p.b-6)})`);
          ctx.fillStyle = fg;
          ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
          ctx.strokeStyle = `rgba(255,255,255,0.2)`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-p.w/2, -p.h/2, p.w, p.h);

        } else if (p.type === "speck") {
          const sz = p.size * scale;
          const sg = ctx.createRadialGradient(
            cx + p.x - sz*0.3, p.y - sz*0.3, 0,
            cx + p.x, p.y, sz
          );
          sg.addColorStop(0, `rgba(${Math.min(255,p.r+35)},${Math.min(255,p.g+25)},${Math.min(255,p.b+15)},1)`);
          sg.addColorStop(0.6, `rgba(${p.r},${p.g},${p.b},1)`);
          sg.addColorStop(1,   `rgba(${Math.max(0,p.r-20)},${Math.max(0,p.g-15)},${Math.max(0,p.b-8)},0.8)`);
          ctx.beginPath();
          ctx.arc(cx + p.x, p.y, sz, 0, Math.PI*2);
          ctx.fillStyle = sg;
          ctx.fill();

        } else {
          const bx = cx + p.x;
          const by = p.y;
          const br = p.size * scale;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(180,220,245,0.5)`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(bx, by, br * 0.75, 0, Math.PI*2);
          ctx.fillStyle = `rgba(200,235,255,0.08)`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(bx - br*0.32, by - br*0.32, br*0.28, 0, Math.PI*2);
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(bx + br*0.28, by + br*0.2, br*0.10, 0, Math.PI*2);
          ctx.fillStyle = "rgba(255,255,255,0.25)";
          ctx.fill();
        }

        ctx.restore();
      });

      // ── 7. Sparks — tiny extraction burst particles ──────────────────────
      sparksRef.current = sparksRef.current.filter(s => {
        s.life -= 0.035;
        if (s.life <= 0) return false;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        const alpha = s.life * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`;
        ctx.fill();
        return true;
      });

      // ── 8. Splash burst particles — outward spray on stage clear ─────────
      splashRef.current = splashRef.current.filter(s => {
        s.life -= 0.025;
        if (s.life <= 0) return false;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12; // gravity
        s.vx *= 0.97;
        const alpha = s.life * 0.55;
        const sz = s.size * (0.4 + s.life * 0.6);
        ctx.beginPath();
        ctx.arc(s.x, s.y, sz, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`;
        ctx.fill();
        // Tiny glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, sz * 2.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha * 0.15})`;
        ctx.fill();
        return true;
      });

      // ── 9. Glow flashes — radial pulse on stage clear ────────────────────
      glowRef.current = glowRef.current.filter(g => {
        g.life -= 0.02;
        if (g.life <= 0) return false;
        const progress = 1 - g.life;
        const radius = g.maxRadius * progress;
        const alpha = g.life * 0.35;
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, radius);
        grad.addColorStop(0, `rgba(${g.r},${g.g},${g.b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${g.r},${g.g},${g.b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${g.r},${g.g},${g.b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - radius, g.y - radius, radius*2, radius*2);
        return true;
      });

      // ── 10. Pour-in at top — dramatic funnel entry ───────────────────────
      const pourW = SW * 0.5;
      const pourGrad = ctx.createLinearGradient(cx, 0, cx, 70);
      pourGrad.addColorStop(0, `rgba(${col.r},${col.g},${col.b},0)`);
      pourGrad.addColorStop(0.15, `rgba(${col.r},${col.g},${col.b},${col.a * 0.35})`);
      pourGrad.addColorStop(1, `rgba(${col.r},${col.g},${col.b},${col.a * 0.9})`);
      ctx.beginPath();
      ctx.moveTo(cx - pourW * 0.5, 0);
      ctx.quadraticCurveTo(cx - pourW * 0.7, 35, cx - sHW(70), 70);
      ctx.lineTo(cx + sHW(70), 70);
      ctx.quadraticCurveTo(cx + pourW * 0.7, 35, cx + pourW * 0.5, 0);
      ctx.closePath();
      ctx.fillStyle = pourGrad;
      ctx.fill();

      // Falling drips at top
      for (let d = 0; d < 5; d++) {
        const dPhase = (t * 0.7 + d * 0.95) % 2.8;
        if (dPhase < 1.8) {
          const dY = dPhase * 42;
          const dAlpha = Math.max(0, 1 - dPhase / 1.8) * 0.55;
          const dSize = 2.5 + dPhase * 2;
          ctx.save();
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},${dAlpha * 0.4})`;
          ctx.beginPath();
          ctx.ellipse(cx + (d-2)*8 + Math.sin(t+d)*3, dY, dSize * 0.6, dSize, 0, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${dAlpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 11. Collection pool at bottom — cinematic spreading pool ─────────
      const poolY = H - 20;
      const poolW = SW * (1.5 + clean * 1.2);
      // Multi-layer pool
      for (let pl = 0; pl < 3; pl++) {
        const plW = poolW * (1 - pl * 0.25);
        const plA = (0.15 + pl * 0.12) * col.a;
        const plH = 14 + clean * 8 - pl * 3;
        const plGrad = ctx.createRadialGradient(cx, poolY, 0, cx, poolY, plW);
        plGrad.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${plA})`);
        plGrad.addColorStop(0.6, `rgba(${col.r},${col.g},${col.b},${plA * 0.4})`);
        plGrad.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.beginPath();
        ctx.ellipse(cx, poolY, plW, plH, 0, 0, Math.PI*2);
        ctx.fillStyle = plGrad;
        ctx.fill();
      }

      // Animated ripple rings
      for (let r = 0; r < 4; r++) {
        const ripPhase = (t * 0.55 + r * 0.9) % 3.5;
        const ripRadius = 10 + ripPhase * poolW * 0.3;
        const ripAlpha = Math.max(0, 1 - ripPhase / 3.5) * 0.14 * col.a;
        ctx.beginPath();
        ctx.ellipse(cx, poolY, ripRadius, ripRadius * 0.28, 0, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${ripAlpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Pool specular highlight
      ctx.beginPath();
      ctx.ellipse(cx - poolW * 0.15, poolY - 4, poolW * 0.2, 3, 0, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${0.05 + clean * 0.1})`;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce]);

  // ── Scroll tracking ───────────────────────────────────────────────────────

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProg.current = v;
    // Stage activates once its band reaches center — holds through the rest zone
    if      (v < 0.16) setActiveStage(-1);
    else if (v < 0.39) setActiveStage(0);
    else if (v < 0.62) setActiveStage(1);
    else if (v < 0.85) setActiveStage(2);
    else               setActiveStage(3);
  });

  // ── Filter band DOM transforms ────────────────────────────────────────────

  const b0y = useMotionValue_vh(scrollYProgress, BAND_RANGES[0]);
  const b1y = useMotionValue_vh(scrollYProgress, BAND_RANGES[1]);
  const b2y = useMotionValue_vh(scrollYProgress, BAND_RANGES[2]);
  const b3y = useMotionValue_vh(scrollYProgress, BAND_RANGES[3]);
  const bandLabelYs = [b0y, b1y, b2y, b3y];

  const removedSoFar = activeStage >= 0
    ? STAGES.slice(0, activeStage+1).flatMap(s => [...s.removes])
    : [];
  const isComplete  = activeStage === 3;
  const pct         = activeStage < 0 ? 0 : (activeStage+1)/4*100;
  const accent      = activeStage >= 0 ? STAGES[activeStage].accent : "rgba(12,31,46,0.22)";

  return (
    <section
      ref={containerRef}
      style={{ height: "650vh", position: "relative" }}
    >

      {/* Hidden SVG — water displacement filter */}
      <svg
        className="absolute w-0 h-0 overflow-hidden"
        aria-hidden="true"
        style={{ position: "fixed" }}
      >
        <defs>
          <filter id="aqua-ripple" colorInterpolationFilters="sRGB"
            x="-30%" y="-5%" width="160%" height="110%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.008 0.016"
              numOctaves="3"
              result="turb"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.008 0.016;0.010 0.020;0.008 0.016"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", backgroundColor: "#ffffff",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Canvas — stream + textures + particles, with SVG water distortion */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* ── Filter band label overlays — big bold text ── */}
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.n}
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              y: bandLabelYs[i],
              height: BAND_H,
              top: "50%",
              marginTop: -BAND_H / 2,
              zIndex: 4,
            }}
          >
            {/* Left: stage number + full name */}
            <div
              className="absolute inset-y-0 left-0 flex flex-col justify-center gap-1"
              style={{ paddingLeft: "clamp(1rem,4vw,2.5rem)", maxWidth: "38%" }}
            >
              <span
                className="text-[9px] font-black tracking-[0.32em] uppercase"
                style={{ color: stage.accent, opacity: 0.6 }}
              >
                Stage {stage.n} — 04
              </span>
              <span
                className="font-display font-bold leading-[0.88]"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
                  color: stage.accent,
                  letterSpacing: "-0.025em",
                }}
              >
                {stage.name}
              </span>
            </div>

            {/* Right: tag + removes */}
            <div
              className="absolute inset-y-0 right-0 flex flex-col justify-center gap-1.5 text-right"
              style={{ paddingRight: "clamp(1rem,4vw,2.5rem)", maxWidth: "38%" }}
            >
              <span
                className="text-[9px] font-black tracking-[0.22em] uppercase"
                style={{ color: stage.accent, opacity: 0.6 }}
              >
                {stage.tag}
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {stage.removes.slice(0, 2).map(r => (
                  <span
                    key={r}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${stage.accent}14`,
                      color: stage.accent,
                      border: `1px solid ${stage.accent}28`,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── Top bar ── */}
        <div className="relative z-10 container-site pt-8 pb-3 flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-5 h-[1.5px] rounded"
              animate={{ backgroundColor: accent }}
              transition={{ duration: 0.5 }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{ color: "rgba(12,31,46,0.28)" }}
            >
              How We Clean Your Water
            </span>
          </div>
          {/* Stage dots */}
          <div className="flex items-center gap-2">
            {STAGES.map((s, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: activeStage === i ? 22 : 7,
                  backgroundColor: activeStage >= i ? s.accent : "rgba(12,31,46,0.1)",
                }}
                style={{ height: 7 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 relative z-10 overflow-hidden">

          {/* Desktop */}
          <div className="hidden lg:flex h-full items-center px-[clamp(1rem,4vw,2.5rem)]">

            {/* Left: BIG animated headline + info */}
            <div className="flex flex-col justify-center" style={{ width: "42%" }}>
              <AnimatePresence mode="wait">
                {activeStage === -1 ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 48, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <h2
                      className="font-display font-bold leading-[0.86] mb-6"
                      style={{
                        fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                        color: "#0C1F2E",
                        letterSpacing: "-0.035em",
                      }}
                    >
                      Your water<br />
                      <span style={{ color: "rgba(12,31,46,0.16)" }}>starts here.</span>
                    </h2>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(12,31,46,0.42)", maxWidth: "28ch" }}
                    >
                      Scroll down to see exactly what we remove — and what changes in your home when we do.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`stage-${activeStage}`}
                    initial={{ opacity: 0, y: 48, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {/* Stage number */}
                    <p
                      className="text-[10px] font-black tracking-[0.3em] uppercase mb-4"
                      style={{ color: STAGES[activeStage].accent, opacity: 0.7 }}
                    >
                      Stage {STAGES[activeStage].n} — 04
                    </p>

                    {/* BIG headline */}
                    <h2
                      className="font-display font-bold leading-[0.86] mb-4"
                      style={{
                        fontSize: "clamp(2.8rem, 5vw, 5rem)",
                        color: "#0C1F2E",
                        letterSpacing: "-0.035em",
                      }}
                    >
                      {STAGES[activeStage].name}
                    </h2>

                    {/* Tag line */}
                    <div
                      className="flex items-center gap-2 mb-5"
                    >
                      <div
                        className="w-6 h-[1.5px] rounded flex-shrink-0"
                        style={{ backgroundColor: STAGES[activeStage].accent }}
                      />
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: STAGES[activeStage].accent }}
                      >
                        {STAGES[activeStage].tag}
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "rgba(12,31,46,0.48)", maxWidth: "32ch" }}
                    >
                      {STAGES[activeStage].desc}
                    </p>

                    {/* Removes as pills */}
                    <div className="flex flex-wrap gap-2">
                      {STAGES[activeStage].removes.map((r, ri) => (
                        <motion.span
                          key={r}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + ri * 0.06, duration: 0.3 }}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: `${STAGES[activeStage].accent}10`,
                            color: STAGES[activeStage].accent,
                            border: `1px solid ${STAGES[activeStage].accent}25`,
                          }}
                        >
                          {r}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Live water purity dashboard */}
            <div
              className="flex flex-col justify-center ml-auto"
              style={{ width: "34%" }}
            >
              {/* Purity ring + score */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative" style={{ width: 88, height: 88 }}>
                  {/* Background ring */}
                  <svg viewBox="0 0 88 88" className="absolute inset-0">
                    <circle
                      cx="44" cy="44" r="38"
                      fill="none"
                      stroke="rgba(12,31,46,0.06)"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="44" cy="44" r="38"
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 38}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 38 * (1 - pct / 100),
                        stroke: accent,
                      }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                      }}
                    />
                  </svg>
                  {/* Score number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="font-display font-bold tabular-nums"
                      style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                      animate={{ color: activeStage >= 0 ? "#0C1F2E" : "rgba(12,31,46,0.15)" }}
                      transition={{ duration: 0.4 }}
                    >
                      {Math.round(pct)}
                    </motion.span>
                  </div>
                </div>
                <div>
                  <motion.p
                    className="text-[9px] font-black tracking-[0.28em] uppercase mb-1"
                    animate={{ color: accent }}
                    transition={{ duration: 0.5 }}
                  >
                    Water Purity
                  </motion.p>
                  <p className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>
                    {activeStage < 0
                      ? "Unfiltered city water"
                      : activeStage === 3
                        ? "Pure. Every tap."
                        : `Stage ${activeStage + 1} of 4 complete`}
                  </p>
                </div>
              </div>

              {/* Stage cards — stacked, light up as cleared */}
              <div className="space-y-2">
                {STAGES.map((stage, i) => {
                  const isActive = activeStage === i;
                  const isCleared = activeStage > i;
                  const isLocked = activeStage < i;
                  return (
                    <motion.div
                      key={stage.n}
                      className="rounded-xl px-4 py-3 relative overflow-hidden"
                      animate={{
                        backgroundColor: isActive
                          ? `${stage.accent}12`
                          : isCleared
                            ? `${stage.accent}08`
                            : "rgba(12,31,46,0.02)",
                        borderColor: isActive
                          ? `${stage.accent}35`
                          : isCleared
                            ? `${stage.accent}18`
                            : "rgba(12,31,46,0.05)",
                      }}
                      style={{ border: "1px solid" }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Status indicator */}
                        <motion.div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          animate={{
                            backgroundColor: isActive || isCleared
                              ? `${stage.accent}20`
                              : "rgba(12,31,46,0.04)",
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {isCleared ? (
                            <Check
                              className="w-3.5 h-3.5"
                              style={{ color: stage.accent }}
                            />
                          ) : (
                            <span
                              className="text-[9px] font-black"
                              style={{
                                color: isActive
                                  ? stage.accent
                                  : "rgba(12,31,46,0.18)",
                              }}
                            >
                              {stage.n}
                            </span>
                          )}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <motion.p
                            className="text-[11px] font-bold leading-tight"
                            animate={{
                              color: isActive || isCleared
                                ? "#0C1F2E"
                                : "rgba(12,31,46,0.22)",
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {stage.name}
                          </motion.p>
                          <AnimatePresence>
                            {isActive && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-[10px] mt-0.5"
                                style={{ color: stage.accent }}
                              >
                                {stage.tag}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Benefit pills — only show for active stage */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col gap-1"
                            >
                              {stage.removes.slice(0, 2).map((r, ri) => (
                                <motion.span
                                  key={r}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.1 + ri * 0.06 }}
                                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                                  style={{
                                    backgroundColor: `${stage.accent}12`,
                                    color: stage.accent,
                                    border: `1px solid ${stage.accent}20`,
                                  }}
                                >
                                  {r}
                                </motion.span>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Active stage glow bar */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1, backgroundColor: stage.accent }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: "top" }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Completion state — HIGH INTENT CTA */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-5 pt-5 border-t"
                    style={{ borderColor: "rgba(18,189,251,0.15)" }}
                  >
                    <p
                      className="font-display font-bold leading-[0.92] mb-2"
                      style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}
                    >
                      This is what comes<br />out of every tap.
                    </p>
                    <p className="text-xs mb-5" style={{ color: "rgba(12,31,46,0.35)" }}>
                      No chemicals. No scale. No compromise.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="flex flex-col gap-2.5"
                    >
                      <Link
                        href="/contact"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200"
                        style={{
                          backgroundColor: "#0C1F2E",
                          color: "#ffffff",
                          boxShadow: "0 4px 20px rgba(12,31,46,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#12BDFB";
                          e.currentTarget.style.color = "#0C1F2E";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#0C1F2E";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                      >
                        Get Your Free Water Test
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <a
                        href="tel:+13179835919"
                        className="inline-flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                        style={{ color: "rgba(12,31,46,0.35)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#12BDFB")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(12,31,46,0.35)")}
                      >
                        <Phone className="w-3 h-3" />
                        (317) 983-5919
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile */}
          <div
            className="flex lg:hidden flex-col h-full justify-end pb-20 gap-4"
            style={{ padding: "0 clamp(1rem,4vw,2.5rem)" }}
          >
            <AnimatePresence mode="wait">
              {activeStage === -1 ? (
                <motion.div
                  key="mi"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                >
                  <h2
                    className="font-display font-bold leading-[0.86] mb-3"
                    style={{ fontSize: "clamp(2.4rem, 9vw, 3.2rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}
                  >
                    Your water<br />
                    <span style={{ color: "rgba(12,31,46,0.18)" }}>starts here.</span>
                  </h2>
                  <p className="text-sm" style={{ color: "rgba(12,31,46,0.42)" }}>
                    Scroll to travel through four stages of filtration.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`ms${activeStage}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                >
                  <p
                    className="text-[10px] font-black tracking-[0.28em] uppercase mb-2"
                    style={{ color: STAGES[activeStage].accent }}
                  >
                    Stage {STAGES[activeStage].n} — 04
                  </p>
                  <h2
                    className="font-display font-bold leading-[0.86] mb-3"
                    style={{ fontSize: "clamp(2.2rem, 8vw, 3rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}
                  >
                    {STAGES[activeStage].name}
                  </h2>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.16em] mb-3"
                    style={{ color: STAGES[activeStage].accent }}
                  >
                    {STAGES[activeStage].tag}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.45)", maxWidth: "30ch" }}>
                    {STAGES[activeStage].desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {STAGES[activeStage].removes.map(r => (
                      <span
                        key={r}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${STAGES[activeStage].accent}12`,
                          color: STAGES[activeStage].accent,
                          border: `1px solid ${STAGES[activeStage].accent}22`,
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 container-site pb-7 flex-shrink-0 flex items-center justify-between">
          <AnimatePresence>
            {!isComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-bold tracking-[0.22em] uppercase"
                style={{ color: "rgba(12,31,46,0.18)" }}
              >
                {activeStage === -1 ? "Scroll to begin" : "Keep scrolling"}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="ml-auto">
            <span
              className="text-[9px] font-bold tracking-[0.22em] uppercase tabular-nums"
              style={{ color: "rgba(12,31,46,0.2)" }}
            >
              {activeStage < 0 ? "0" : activeStage + 1} / 4
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hook: vh band motion value ────────────────────────────────────────────────

function useMotionValue_vh(
  sp: MotionValue<number>,
  range: readonly [number, number, number]
): MotionValue<string> {
  return useTransform(sp, [range[0], range[1], range[2]], ["115vh", "0vh", "-115vh"]);
}
