"use client";

/**
 * SiteOrb — one persistent water orb across the whole site.
 *
 * Outside the journey section: drifts smoothly with page scroll.
 * Inside the journey section:
 *   - position interpolated CONTINUOUSLY from scrollY (no jumps)
 *   - wheel events captured so each scroll tick advances exactly
 *     one filter stage (with a 1.1 s pause while the orb travels)
 *   - a content card slides in when the orb is near each waypoint
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Check } from "lucide-react";

/* ─── Journey waypoints: viewport % coords + orb colour ─────── */
const STAGE_WP = [
  { x: 62, y: 14, r: 112, g: 55,  b: 8   }, // 0 — intro       brown
  { x: 78, y: 30, r: 90,  g: 70,  b: 20  }, // 1 — pre-filter  olive
  { x: 22, y: 52, r: 28,  g: 130, b: 178 }, // 2 — softening   blue
  { x: 76, y: 70, r: 18,  g: 185, b: 248 }, // 3 — carbon      cyan
  { x: 50, y: 86, r: 18,  g: 225, b: 255 }, // 4 — pure        bright cyan
];

/* ─── Free path outside the journey (scroll% → position) ───── */
const FREE_PATH = [
  { s: 0,   x: 76, y: 26 }, // hero
  { s: 0.1, x: 72, y: 30 }, // approaching journey
];
const POST_PATH = [
  { x: 28, y: 45 }, // stats
  { x: 72, y: 58 }, // gallery
  { x: 30, y: 50 }, // testimonials
  { x: 62, y: 52 }, // cta
];

/* ─── Filter cards (stages 1-3) ─────────────────────────────── */
const CARDS = [
  {
    side: "left" as const, top: "18%", accent: "#f97316",
    n: "01", name: "Pre-Filtration",
    headline: "Sediment & particles — first out.",
    body: "A multi-stage pre-filter captures sand, rust, and debris before they reach any core component — protecting everything downstream.",
    removes: ["Sediment & sand", "Rust particles", "Dirt & debris", "Visible particulates"],
    stat: "5μm", statLabel: "filtration accuracy",
  },
  {
    side: "right" as const, top: "42%", accent: "#12BDFB",
    n: "02", name: "Water Softening",
    headline: "Hard minerals — completely gone.",
    body: "Ion-exchange resin swaps calcium and magnesium for softening ions. Scale, spotted dishes, dry skin — permanently eliminated.",
    removes: ["Calcium (hardness)", "Magnesium", "Scale buildup", "Limescale"],
    stat: "30%", statLabel: "longer appliance lifespan",
  },
  {
    side: "left" as const, top: "60%", accent: "#12BDFB",
    n: "03", name: "Carbon Filtration",
    headline: "Chemicals & taste — absorbed.",
    body: "A 5-media carbon block captures chlorine, chloramines, and chemical compounds at the molecular level.",
    removes: ["Chlorine & chloramines", "Chemical compounds", "Bad taste & odor", "VOCs"],
    stat: "100K", statLabel: "gallon filter lifespan",
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ─── Orb visual ────────────────────────────────────────────── */
function OrbVisual({ r, g, b }: { r: number; g: number; b: number }) {
  const cA = `rgba(${r},${g},${b},0.42)`;
  const cF = `rgba(${r},${g},${b},0.1)`;
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${cA} 0%, ${cF} 55%, transparent 78%)`, filter: "blur(28px)" }}
      />
      {[0, 1.2, 2.4].map((d, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ inset: "30%", border: `1px solid ${cA}` }}
          animate={{ scale: [0.5, 2.6], opacity: [0.45, 0] }}
          transition={{ duration: 3.5, delay: d, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div
        animate={{ rotateY: [0, 12, -8, 0], rotateX: [0, -6, 4, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: "20%",
          background: `radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.28) 0%, ${cA} 42%, rgba(0,10,28,0.65) 100%)`,
          boxShadow: `0 0 35px ${cA}, 0 0 70px ${cF}, 0 8px 32px rgba(0,0,0,0.18), inset 0 0 22px rgba(0,0,0,0.45), inset -5px -5px 15px rgba(0,0,0,0.25)`,
          backdropFilter: "blur(6px)", transformStyle: "preserve-3d",
        }}
      >
        <div style={{ position:"absolute", top:"14%", left:"18%", width:"36%", height:"22%", background:"rgba(255,255,255,0.5)", borderRadius:"50%", filter:"blur(5px)", transform:"rotate(-18deg)" }} />
        <div style={{ position:"absolute", bottom:"22%", right:"18%", width:"13%", height:"8%", background:"rgba(255,255,255,0.2)", borderRadius:"50%", filter:"blur(3px)" }} />
        <motion.div
          animate={{ x:["-30%","30%","-30%"], y:["-20%","20%","-20%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position:"absolute", inset:0, background:`linear-gradient(115deg, transparent 35%, ${cA} 50%, transparent 65%)`, opacity:0.3 }}
        />
      </motion.div>
    </>
  );
}

/* ─── Stage card ────────────────────────────────────────────── */
function StageCard({ card }: { card: typeof CARDS[0] }) {
  const fromLeft = card.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: fromLeft ? -40 : 40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed pointer-events-none"
      style={{
        ...(fromLeft ? { left: "4vw" } : { right: "4vw" }),
        top: card.top,
        width: "clamp(260px, 28vw, 380px)",
        zIndex: 45,
      }}
    >
      <div className="rounded-2xl border overflow-hidden"
        style={{ background: "rgba(8,16,26,0.92)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.09)", boxShadow: "0 8px 50px rgba(0,0,0,0.5)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-heading font-bold tracking-[0.2em] uppercase" style={{ color: card.accent }}>
              Stage {card.n} — {card.name}
            </span>
            <div className="text-right">
              <p className="text-lg font-heading font-bold leading-none" style={{ color: card.accent }}>{card.stat}</p>
              <p className="text-[9px] font-heading mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{card.statLabel}</p>
            </div>
          </div>
          <h3 className="text-sm font-display font-bold text-white leading-snug">{card.headline}</h3>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{card.body}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {card.removes.map(r => (
              <div key={r} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 flex-shrink-0" style={{ color: card.accent }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function SiteOrb() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 28, damping: 18 });
  const y = useSpring(rawY, { stiffness: 28, damping: 18 });

  const [color, setColor]     = useState({ r: 18, g: 189, b: 251 });
  const [activeCard, setActiveCard] = useState(-1);

  /* Refs that wheel handler reads without needing re-registration */
  const stageScrollsRef  = useRef<number[]>([]);
  const inJourneyRef     = useRef(false);
  const currentStageRef  = useRef(0);
  const lockedRef        = useRef(false);
  const lastWheelRef     = useRef(0);

  /* ── Measure stage element positions ─────────────────────── */
  const measure = useCallback(() => {
    const scrolls: number[] = [];
    for (let i = 0; i < 5; i++) {
      const el = document.getElementById(`journey-stage-${i}`);
      if (el) scrolls.push(el.offsetTop);
    }
    stageScrollsRef.current = scrolls;
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("load",   measure);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("load",   measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ── Smooth-scroll to a specific journey stage ────────────── */
  const goToStage = useCallback((idx: number) => {
    const stageScrolls = stageScrollsRef.current;
    if (!stageScrolls[idx] && stageScrolls[idx] !== 0) return;
    lockedRef.current      = true;
    currentStageRef.current = idx;
    window.scrollTo({ top: stageScrolls[idx], behavior: "smooth" });
    setTimeout(() => { lockedRef.current = false; }, 1100);
  }, []);

  /* ── Continuous scroll → orb position ────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const stageScrolls = stageScrollsRef.current;
      if (stageScrolls.length < 5) return;

      const sy   = window.scrollY;
      const W    = window.innerWidth;
      const H    = window.innerHeight;
      const max  = document.body.scrollHeight - H;

      const journeyStart = stageScrolls[0] - H * 0.35;
      const journeyEnd   = stageScrolls[4] + H * 0.55;

      /* ── Inside journey: interpolate along waypoint path ── */
      if (sy >= journeyStart && sy <= journeyEnd) {
        inJourneyRef.current = true;

        const jp  = (sy - journeyStart) / (journeyEnd - journeyStart); // 0→1
        const fi  = jp * (STAGE_WP.length - 1);
        const lo  = Math.min(Math.floor(fi), STAGE_WP.length - 2);
        const hi  = lo + 1;
        const t   = fi - lo;
        const wA  = STAGE_WP[lo], wB = STAGE_WP[hi];

        rawX.set(lerp(wA.x, wB.x, t) * W / 100);
        rawY.set(lerp(wA.y, wB.y, t) * H / 100);
        setColor({
          r: Math.round(lerp(wA.r, wB.r, t)),
          g: Math.round(lerp(wA.g, wB.g, t)),
          b: Math.round(lerp(wA.b, wB.b, t)),
        });

        /* Show card when orb is within 12% of a waypoint (stages 1-3) */
        const nearStage = Math.round(fi);
        const dist      = Math.abs(fi - nearStage);
        if (dist < 0.12 && nearStage >= 1 && nearStage <= 3) {
          setActiveCard(nearStage - 1);
        } else {
          setActiveCard(-1);
        }

        /* Keep currentStage in sync with scroll position */
        currentStageRef.current = Math.max(0, Math.min(4, Math.round(fi)));

      /* ── Pre-journey ───────────────────────────────────── */
      } else if (sy < journeyStart) {
        inJourneyRef.current = false;
        setActiveCard(-1);
        const pp = journeyStart > 0 ? sy / journeyStart : 0;
        rawX.set(lerp(FREE_PATH[0].x, FREE_PATH[1].x, pp) * W / 100);
        rawY.set(lerp(FREE_PATH[0].y, FREE_PATH[1].y, pp) * H / 100);
        setColor({ r: 18, g: 189, b: 251 });

      /* ── Post-journey ──────────────────────────────────── */
      } else {
        inJourneyRef.current = false;
        setActiveCard(-1);
        const postRange = Math.max(1, max - journeyEnd);
        const pp        = (sy - journeyEnd) / postRange;
        const fi        = pp * (POST_PATH.length - 1);
        const lo        = Math.min(Math.floor(fi), POST_PATH.length - 2);
        const hi        = lo + 1;
        const t         = fi - lo;
        rawX.set(lerp(POST_PATH[lo].x, POST_PATH[hi].x, t) * W / 100);
        rawY.set(lerp(POST_PATH[lo].y, POST_PATH[hi].y, t) * H / 100);
        setColor({ r: 18, g: 189, b: 251 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawX, rawY]);

  /* ── Wheel capture: forced pause in journey zone ─────────── */
  useEffect(() => {
    const PAUSE_MS = 1100; // ms between stage advances

    const onWheel = (e: WheelEvent) => {
      if (!inJourneyRef.current) return;

      /* While locked, eat the event so the page can't scroll past */
      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      if (now - lastWheelRef.current < PAUSE_MS) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 15) return; // ignore tiny twitches

      const forward = e.deltaY > 0;
      const cur     = currentStageRef.current;

      if (forward && cur < 4) {
        e.preventDefault();
        lastWheelRef.current = now;
        goToStage(cur + 1);
      } else if (!forward && cur > 0) {
        e.preventDefault();
        lastWheelRef.current = now;
        goToStage(cur - 1);
      }
      // At boundaries (stage 0 going up, stage 4 going down) → let scroll pass through
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goToStage]);

  const { r, g, b } = color;

  return (
    <>
      {/* The single site-wide orb */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: 0, top: 0,
          x, y,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 40,
          width: 190, height: 190,
        }}
      >
        <OrbVisual r={r} g={g} b={b} />
      </motion.div>

      {/* Filter stage cards — appear when orb dwells near a waypoint */}
      <AnimatePresence mode="wait">
        {activeCard >= 0 && (
          <StageCard key={activeCard} card={CARDS[activeCard]} />
        )}
      </AnimatePresence>
    </>
  );
}
