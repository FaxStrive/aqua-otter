"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── Types ────────────────────────────────────────────────── */
interface Particle {
  x: number;       // px within canvas width
  yn: number;      // normalized 0-1 position in tube
  r: number;       // radius px
  vyn: number;     // normalized fall speed per ms
  phase: number;   // wobble phase
}

interface Bubble {
  x: number;
  phaseY: number;
  r: number;
  speed: number;
}

/* ─── Constants ────────────────────────────────────────────── */
const CW = 52;          // canvas / tube inner pixel width
const NUM_PARTICLES = 70;
const NUM_BUBBLES = 10;

/* ─── Color science ────────────────────────────────────────── */
type RGB = [number, number, number];

const COLOR_STOPS: [number, RGB][] = [
  [0.00, [112, 58,  10 ]],  // raw brown mud
  [0.22, [80,  70,  35 ]],  // murky olive
  [0.42, [25,  115, 155]],  // filtering blue
  [0.65, [18,  175, 225]],  // near-clean cyan
  [1.00, [18,  225, 255]],  // crystal clear
];

function waterColorAt(progress: number): RGB {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [pa, ca] = COLOR_STOPS[i];
    const [pb, cb] = COLOR_STOPS[i + 1];
    if (p >= pa && p <= pb) {
      const t = (pb - pa) > 0 ? (p - pa) / (pb - pa) : 0;
      return [
        Math.round(ca[0] + (cb[0] - ca[0]) * t),
        Math.round(ca[1] + (cb[1] - ca[1]) * t),
        Math.round(ca[2] + (cb[2] - ca[2]) * t),
      ];
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1][1];
}

function turbidityAt(yn: number, scrollP: number): number {
  // yn = normalized position in the tube (0=top, 1=bottom)
  // higher yn within the filled section = further through the filter = clearer
  if (scrollP < 0.005) return 1;
  const posAlongFilter = yn / scrollP; // 0 = top of water, 1 = fill tip
  return Math.max(0, 1 - posAlongFilter * 1.15) * (1 - scrollP * 0.45);
}

/* ─── Draw ─────────────────────────────────────────────────── */
function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  scrollP: number,
  particles: Particle[],
  bubbles: Bubble[],
) {
  ctx.fillStyle = "rgb(2, 6, 16)";
  ctx.fillRect(0, 0, w, h);

  const safeP = Math.max(0.002, scrollP);
  const fillY = Math.max(6, scrollP * h);

  /* ── 1. Water column ─────────────────────────────────────── */
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w, fillY);
  ctx.clip();

  // a. Background gradient (brown → cyan, top to fill tip)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, fillY);
  COLOR_STOPS.forEach(([p, [r, g, b]]) => {
    if (p <= scrollP + 0.01) {
      const stop = Math.min(1, p / safeP);
      bgGrad.addColorStop(stop, `rgba(${r},${g},${b},0.88)`);
    }
  });
  // Ensure there's always a stop at 1.0
  const [cr, cg, cb] = waterColorAt(scrollP);
  bgGrad.addColorStop(1, `rgba(${cr},${cg},${cb},0.92)`);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, fillY);

  // b. Turbidity murk overlay (denser near top)
  const murkGrad = ctx.createLinearGradient(0, 0, 0, fillY);
  const topTurb = turbidityAt(0, safeP) * 0.55;
  const midTurb = turbidityAt(0.5, safeP) * 0.45;
  murkGrad.addColorStop(0,   `rgba(90,42,6,${topTurb})`);
  murkGrad.addColorStop(0.5, `rgba(75,35,5,${midTurb})`);
  murkGrad.addColorStop(1,   `rgba(30,15,2,0)`);
  ctx.fillStyle = murkGrad;
  ctx.fillRect(0, 0, w, fillY);

  // c. Vertical flow streaks (downward current)
  const numStreaks = 5;
  for (let i = 0; i < numStreaks; i++) {
    const baseX = w * ((i + 0.6) / (numStreaks + 0.3));
    const streakSpeed = 0.045 + i * 0.018;
    const streakLen = fillY * (0.18 + i * 0.04);
    const yStart = ((time * streakSpeed + i * fillY * 0.22) % fillY);

    const yn = yStart / h;
    const [sr, sg, sb] = waterColorAt(Math.min(yn, scrollP));
    const turb = turbidityAt(yn, safeP);
    const alpha = (0.18 + scrollP * 0.25) / (1 + turb * 2.5);

    const sGrad = ctx.createLinearGradient(0, yStart, 0, yStart + streakLen);
    sGrad.addColorStop(0, `rgba(${sr},${sg},${sb},0)`);
    sGrad.addColorStop(0.35, `rgba(${sr},${sg},${sb},${alpha})`);
    sGrad.addColorStop(0.75, `rgba(${sr},${sg},${sb},${alpha * 0.6})`);
    sGrad.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);

    ctx.beginPath();
    ctx.strokeStyle = sGrad;
    ctx.lineWidth = 1 + (i % 2);
    const points: [number, number][] = [];
    for (let dy = 0; dy <= streakLen; dy += 3) {
      const y = yStart + dy;
      if (y > fillY) break;
      const x = baseX + Math.sin(y * 0.055 + time * 0.0022 + i * 1.9) * (3 + i * 0.6);
      points.push([x, y]);
    }
    if (points.length > 1) {
      ctx.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }
  }

  // d. Horizontal micro-ripples (cross-current)
  for (let ri = 0; ri < 6; ri++) {
    const ry = ((time * 0.025 + ri * fillY * 0.2) % fillY);
    const ryn = ry / h;
    const turb = turbidityAt(ryn, safeP);
    const [rr, rg, rb] = waterColorAt(Math.min(ryn, scrollP));
    const rAlpha = (0.04 + scrollP * 0.07) / (1 + turb * 1.5);
    const rLen = w * (0.28 + Math.sin(time * 0.0025 + ri) * 0.12);
    ctx.beginPath();
    ctx.moveTo((w - rLen) / 2, ry);
    ctx.lineTo((w + rLen) / 2, ry);
    ctx.strokeStyle = `rgba(${rr},${rg},${rb},${rAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // e. Sediment particles
  particles.forEach(p => {
    p.yn += p.vyn;
    p.phase += 0.016;
    if (p.yn > 1) p.yn = 0;

    const py = p.yn * h;
    if (py > fillY) return;

    const turb = turbidityAt(p.yn, safeP);
    const alpha = turb * 0.8;
    if (alpha < 0.03) return;

    const px = p.x + Math.sin(p.phase) * 2.8;

    // Sediment body
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88, 44, 8, ${alpha})`;
    ctx.fill();

    // Mineral glint
    if (turb > 0.15) {
      ctx.beginPath();
      ctx.arc(px - p.r * 0.35, py - p.r * 0.35, p.r * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 145, 50, ${alpha * 0.45})`;
      ctx.fill();
    }
  });

  // f. Rising bubbles (more visible as water clears)
  bubbles.forEach(bub => {
    bub.phaseY += bub.speed;
    const by = fillY * (1 - (bub.phaseY % 1) * 0.85);
    if (by < 0 || by > fillY) return;
    const bx = bub.x + Math.sin(bub.phaseY * 4 + bub.x) * 3.5;
    const byn = by / h;
    const [br, bg, bb] = waterColorAt(Math.min(byn, scrollP));
    const turb = turbidityAt(byn, safeP);
    const bAlpha = (0.08 + scrollP * 0.4) * (1 - turb * 0.75);
    if (bAlpha < 0.04) return;
    ctx.beginPath();
    ctx.arc(bx, by, bub.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${br},${bg},${bb},${bAlpha})`;
    ctx.lineWidth = 0.9;
    ctx.stroke();
    // inner highlight
    ctx.beginPath();
    ctx.arc(bx - bub.r * 0.3, by - bub.r * 0.3, bub.r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${br},${bg},${bb},${bAlpha * 0.4})`;
    ctx.fill();
  });

  ctx.restore(); // end water clip

  /* ── 2. Filter membrane lines ────────────────────────────── */
  const membranes = [0.24, 0.50, 0.74];
  membranes.forEach(pct => {
    const my = pct * h;
    if (my > fillY + 2) return;
    const [mr, mg, mb] = waterColorAt(pct);
    const memAlpha = 0.5 + (scrollP - pct) * 0.3;

    // Dashed line across tube
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(0, my);
    ctx.lineTo(w, my);
    ctx.strokeStyle = `rgba(${mr},${mg},${mb},${Math.max(0.2, Math.min(0.7, memAlpha))})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // End dots
    [2, w - 2].forEach(ex => {
      ctx.beginPath();
      ctx.arc(ex, my, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${mr},${mg},${mb},0.55)`;
      ctx.fill();
    });
  });

  /* ── 3. Fill tip — where water currently reaches ─────────── */
  if (scrollP > 0.01) {
    const [tr, tg, tb] = waterColorAt(scrollP);

    // Soft glow band at fill line
    const tipGrad = ctx.createLinearGradient(0, fillY - 10, 0, fillY + 14);
    tipGrad.addColorStop(0, `rgba(${tr},${tg},${tb},0.0)`);
    tipGrad.addColorStop(0.4, `rgba(${tr},${tg},${tb},0.55)`);
    tipGrad.addColorStop(0.65, `rgba(${tr},${tg},${tb},0.35)`);
    tipGrad.addColorStop(1, `rgba(${tr},${tg},${tb},0.0)`);
    ctx.fillStyle = tipGrad;
    ctx.fillRect(0, fillY - 10, w, 24);

    // Solid line at fill tip
    ctx.beginPath();
    ctx.moveTo(0, fillY);
    ctx.lineTo(w, fillY);
    ctx.strokeStyle = `rgba(${tr},${tg},${tb},0.85)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Animated ripple rings expanding from fill tip
    const ripplePhase = (time * 0.0015) % 1;
    for (let rp = 0; rp < 2; rp++) {
      const phase = (ripplePhase + rp * 0.5) % 1;
      const rAlpha = (1 - phase) * 0.4;
      const rRadius = phase * (w * 0.55);
      if (rAlpha > 0.02) {
        ctx.beginPath();
        ctx.arc(w / 2, fillY, rRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${tr},${tg},${tb},${rAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Center droplet
    const dotGrd = ctx.createRadialGradient(w/2, fillY, 0, w/2, fillY, 10);
    dotGrd.addColorStop(0, `rgba(${tr},${tg},${tb},0.9)`);
    dotGrd.addColorStop(0.4, `rgba(${tr},${tg},${tb},0.5)`);
    dotGrd.addColorStop(1, `rgba(${tr},${tg},${tb},0)`);
    ctx.fillStyle = dotGrd;
    ctx.fillRect(w/2 - 10, fillY - 10, 20, 20);

    ctx.beginPath();
    ctx.arc(w/2, fillY, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${tr},${tg},${tb},1)`;
    ctx.fill();
  }

  /* ── 4. Glass sheen ──────────────────────────────────────── */
  const sheen = ctx.createLinearGradient(0, 0, w, 0);
  sheen.addColorStop(0,    "rgba(255,255,255,0.07)");
  sheen.addColorStop(0.08, "rgba(255,255,255,0.12)");
  sheen.addColorStop(0.25, "rgba(255,255,255,0.0)");
  sheen.addColorStop(0.75, "rgba(255,255,255,0.0)");
  sheen.addColorStop(0.92, "rgba(255,255,255,0.04)");
  sheen.addColorStop(1,    "rgba(255,255,255,0.06)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);
}

/* ─── Component ────────────────────────────────────────────── */
export default function WaterStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const animRef      = useRef<number>(0);
  const scrollRef    = useRef(0);
  const sizeRef      = useRef({ w: CW, h: 600 });
  const particlesRef = useRef<Particle[]>([]);
  const bubblesRef   = useRef<Bubble[]>([]);
  const startRef     = useRef(0);

  const initElements = useCallback((h: number) => {
    particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * CW,
      yn: Math.random(),
      r: 0.9 + Math.random() * 2.2,
      vyn: (0.00015 + Math.random() * 0.0003),
      phase: Math.random() * Math.PI * 2,
    }));

    bubblesRef.current = Array.from({ length: NUM_BUBBLES }, (_, i) => ({
      x: CW * (0.12 + (i / NUM_BUBBLES) * 0.76),
      phaseY: Math.random(),
      r: 1.4 + Math.random() * 2.2,
      speed: 0.0025 + Math.random() * 0.004,
    }));

    void h; // suppress unused warning
  }, []);

  // Measure container and size canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const measure = () => {
      const h = Math.round(container.clientHeight);
      if (h === sizeRef.current.h) return;
      sizeRef.current = { w: CW, h };
      canvas.width  = CW;
      canvas.height = h;
      initElements(h);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [initElements]);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // rAF animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const { w, h } = sizeRef.current;
      if (h > 0) {
        drawFrame(
          ctx, w, h,
          ts - startRef.current,
          scrollRef.current,
          particlesRef.current,
          bubblesRef.current,
        );
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-40 pointer-events-none hidden lg:flex flex-col"
      style={{ width: 72 }}
      aria-hidden
    >
      {/* Top cap — open end where raw water enters */}
      <div
        className="mx-auto flex-shrink-0"
        style={{
          width: CW + 8,
          height: 8,
          borderRadius: "4px 4px 0 0",
          background: "linear-gradient(to bottom, rgba(18,189,251,0.12), transparent)",
          border: "1px solid rgba(18,189,251,0.2)",
          borderBottom: "none",
        }}
      />

      {/* Glass tube body */}
      <div
        ref={containerRef}
        className="mx-auto flex-1 relative overflow-hidden"
        style={{
          width: CW + 8,
          border: "1px solid rgba(18,189,251,0.18)",
          borderTop: "none",
          borderBottom: "none",
          boxShadow: `
            0 0 24px rgba(18,189,251,0.07),
            0 0 80px rgba(18,189,251,0.04),
            inset 0 0 16px rgba(0,0,0,0.7),
            inset 1px 0 0 rgba(255,255,255,0.06),
            inset -1px 0 0 rgba(255,255,255,0.03)
          `,
          background: "rgb(2, 6, 16)",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CW}
          height={600}
          style={{
            display: "block",
            width: CW,
            height: "100%",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Bottom cap — pure water exits */}
      <div
        className="mx-auto flex-shrink-0"
        style={{
          width: CW + 8,
          height: 8,
          borderRadius: "0 0 4px 4px",
          background: "linear-gradient(to top, rgba(18,225,255,0.18), transparent)",
          border: "1px solid rgba(18,225,255,0.25)",
          borderTop: "none",
        }}
      />

      {/* "RAW" label at top */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 12, textAlign: "center" }}
      >
        <span style={{
          display: "block",
          fontSize: 7,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(110,58,10,0.7)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          lineHeight: 1,
        }}>
          Raw
        </span>
      </div>

      {/* "PURE" label at bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 12, textAlign: "center" }}
      >
        <span style={{
          display: "block",
          fontSize: 7,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(18,225,255,0.65)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          lineHeight: 1,
        }}>
          Pure
        </span>
      </div>
    </div>
  );
}
