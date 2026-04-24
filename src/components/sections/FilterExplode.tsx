"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FPS         = 24;
const frameToTime = (f: number) => f / FPS;

/* ─── Annotation: a small label + SVG line pointing at a component ── */
type Annotation = {
  /* Where the line tip touches the component (% of viewport) */
  tx: number; ty: number;
  /* Where the label card sits (% of viewport) */
  lx: number; ly: number;
  title: string;
  desc: string;
  side: "left" | "right";
};

const STATIONS: {
  frame: number;
  headline: string;
  sub: string;
  accent: string;
  annotations: Annotation[];
}[] = [
  {
    frame: 0,
    headline: "Meet the Quintex 5",
    sub: "Complete salt-free whole-home water treatment.",
    accent: "#12BDFB",
    annotations: [
      { tx: 52, ty: 18, lx: 74, ly: 10, title: "Digital Control Valve",    desc: "Auto-schedules backwash. Zero manual effort.",      side: "right" },
      { tx: 54, ty: 52, lx: 76, ly: 46, title: "Multi-Media Filtration",   desc: "Removes chlorine, PFAs, heavy metals and more.",    side: "right" },
      { tx: 37, ty: 73, lx: 10, ly: 67, title: "5\u03bcm Pre-Filter",      desc: "Traps sediment and rust at the entry point.",        side: "left"  },
    ],
  },
  {
    frame: 18,
    headline: "Remove What Does Not Belong.",
    sub: "99% chemical reduction before water touches your pipes.",
    accent: "#0EA5E9",
    annotations: [
      { tx: 52, ty: 15, lx: 72, ly: 8,  title: "Smart Display",            desc: "Monitors hardness, flow rate, and service date.",    side: "right" },
      { tx: 60, ty: 28, lx: 78, ly: 33, title: "Bypass Valve",             desc: "Isolate the system for service without shutoffs.",   side: "right" },
      { tx: 44, ty: 38, lx: 14, ly: 30, title: "Multi-Stage Media Bed",    desc: "Carbon, KDF, and resin work in sequence.",          side: "left"  },
    ],
  },
  {
    frame: 70,
    headline: "Goodbye Scale. Hello Minerals.",
    sub: "No salt. No brine. Minerals stay — scale does not.",
    accent: "#06B6D4",
    annotations: [
      { tx: 53, ty: 32, lx: 74, ly: 22, title: "Ion-Exchange Resin",       desc: "Amber beads swap Ca\u00b2\u207a and Mg\u00b2\u207a ions for soft water.", side: "right" },
      { tx: 53, ty: 50, lx: 74, ly: 52, title: "Activated Carbon",         desc: "Absorbs chlorine, chemicals, and off-taste.",       side: "right" },
      { tx: 53, ty: 65, lx: 14, ly: 62, title: "Gravel Bed Support",       desc: "Even flow distribution across all media layers.",   side: "left"  },
    ],
  },
  {
    frame: 110,
    headline: "Nothing Gets Through.",
    sub: "5\u03bcm accuracy. Every stage protected.",
    accent: "#3B82F6",
    annotations: [
      { tx: 36, ty: 65, lx: 10, ly: 55, title: "5\u03bcm Cartridge",       desc: "Stops sediment, rust, sand, and fine particles.",   side: "left"  },
      { tx: 54, ty: 22, lx: 73, ly: 14, title: "Control Head",             desc: "Programmable cycles, diagnostics, and alerts.",     side: "right" },
      { tx: 54, ty: 50, lx: 73, ly: 48, title: "Conditioning Chamber",     desc: "TAC media converts hard minerals to harmless crystals.", side: "right" },
    ],
  },
];

function easeLinear(t: number) { return t; }

export default function FilterExplode() {
  const sectionRef      = useRef<HTMLDivElement>(null);
  const videoRef        = useRef<HTMLVideoElement>(null);

  const [stationIdx, setStationIdx] = useState(0);
  const [animating, setAnimating]             = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const stationRef      = useRef(0);
  const isAnimRef       = useRef(false);
  const activeRef       = useRef(false);
  const activatedAtRef  = useRef(0);
  const exitedAtRef     = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef          = useRef(0);

  const seekTo = useCallback((frame: number) => {
    const v = videoRef.current;
    if (v) v.currentTime = frameToTime(Math.max(0, Math.min(119, frame)));
  }, []);

  const animateTo = useCallback((target: number, onDone?: () => void) => {
    cancelAnimationFrame(rafRef.current);
    isAnimRef.current = true;
    setAnimating(true);
    setShowAnnotations(false); // hide annotations during transition
    const start    = currentFrameRef.current;
    const t0       = performance.now();
    const duration = 600; // fixed 600ms regardless of frame distance — always snappy
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const f = Math.round(start + (target - start) * t);
      if (f !== currentFrameRef.current) { currentFrameRef.current = f; seekTo(f); }
      if (t < 1) { rafRef.current = requestAnimationFrame(step); }
      else {
        currentFrameRef.current = target;
        seekTo(target);
        isAnimRef.current = false;
        setAnimating(false);
        setShowAnnotations(true); // show annotations only once we've landed
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [seekTo]);

  const advance = useCallback((dir: 1 | -1) => {
    if (isAnimRef.current) return;
    const next = stationRef.current + dir;
    if (next >= STATIONS.length || next < 0) {
      activeRef.current   = false;
      exitedAtRef.current = performance.now();
      setShowAnnotations(false);
      return;
    }
    stationRef.current = next;
    setStationIdx(next);
    animateTo(STATIONS[next].frame);
  }, [animateTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom > window.innerHeight * 0.5;
      const cooldown = performance.now() - exitedAtRef.current < 900;
      if (inView && !activeRef.current && !cooldown) {
        activeRef.current       = true;
        activatedAtRef.current  = performance.now();
        stationRef.current      = 0;
        currentFrameRef.current = 0;
        seekTo(0);
        setStationIdx(0);
        setShowAnnotations(true);
      }
      if (!activeRef.current) return;
      e.preventDefault();
      if (performance.now() - activatedAtRef.current < 500) return;
      if (Math.abs(e.deltaY) > 2) advance(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [advance, seekTo]);

  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      if (!activeRef.current) return;
      const delta = startY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) advance(delta > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); advance(1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); advance(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const station = STATIONS[stationIdx];
  const isLast  = stationIdx === STATIONS.length - 1;

  return (
    <section ref={sectionRef} style={{ height: "250vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#f7f9fb" }}>

        {/* Video */}
        <video
          ref={videoRef}
          src="/frames/filter.mp4"
          preload="auto"
          muted
          playsInline
          style={{
            position: "absolute",
            top: 68, left: 0, right: 0, bottom: 0,
            width: "100%", height: "calc(100% - 68px)",
            objectFit: "contain", objectPosition: "center center",
            display: "block",
          }}
        />

        {/* Annotation overlay — hidden on mobile, only shown after animation lands */}
        <AnimatePresence mode="wait">
          {showAnnotations && <motion.div
            key={stationIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="hidden md:block"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {/* SVG lines */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {station.annotations.map((a, i) => {
                /* midpoint for elbow */
                const mx = a.side === "right" ? a.lx + 2 : a.lx + (a.side === "left" ? 18 : 0);
                return (
                  <motion.polyline
                    key={i}
                    points={`${a.lx + (a.side === "right" ? 0 : 18)},${a.ly + 1.2} ${a.tx + (a.side === "right" ? -1 : 1)},${a.ly + 1.2} ${a.tx},${a.ty}`}
                    fill="none"
                    stroke={station.accent}
                    strokeWidth="0.18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                  />
                );
              })}
              {/* Dot at component target */}
              {station.annotations.map((a, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={a.tx} cy={a.ty} r="0.5"
                  fill={station.accent}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: 0.5 + i * 0.12 }}
                />
              ))}
            </svg>

            {/* Label cards */}
            {station.annotations.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
                style={{
                  position: "absolute",
                  left: `${a.side === "right" ? a.lx : a.lx - 2}%`,
                  top: `${a.ly - 1.5}%`,
                  transform: a.side === "right" ? "none" : "translateX(-100%)",
                  maxWidth: 190,
                  background: "rgba(247,249,251,0.9)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${station.accent}30`,
                  borderRadius: 10,
                  padding: "7px 11px 8px",
                  boxShadow: `0 4px 20px rgba(12,31,46,0.08), 0 0 0 1px ${station.accent}15`,
                }}
              >
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: station.accent, marginBottom: 3, fontFamily: "var(--font-heading, sans-serif)" }}>
                  {a.title}
                </p>
                <p style={{ fontSize: 11, color: "rgba(12,31,46,0.58)", lineHeight: 1.45, margin: 0 }}>
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>}
        </AnimatePresence>

        {/* Bottom headline — minimal, left-aligned */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 5vw clamp(24px, 5vh, 48px)", pointerEvents: "none" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`hl-${stationIdx}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: station.accent, marginBottom: 6, fontFamily: "var(--font-heading, sans-serif)" }}>
                {`0${stationIdx + 1}  —  Inside the Quintex 5`}
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", fontWeight: 800, lineHeight: 1.08, color: "#0C1F2E", marginBottom: 0, fontFamily: "var(--font-display, sans-serif)" }}>
                {station.headline}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Station dots */}
        <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
          {STATIONS.map((_, i) => (
            <div key={i} style={{ width: i === stationIdx ? 8 : 5, height: i === stationIdx ? 8 : 5, borderRadius: "50%", background: i === stationIdx ? station.accent : "rgba(12,31,46,0.18)", transition: "all 0.35s" }} />
          ))}
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {!animating && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              style={{ position: "absolute", bottom: "2vh", left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(12,31,46,0.25)", fontFamily: "var(--font-heading, sans-serif)", pointerEvents: "none", whiteSpace: "nowrap" }}
            >
              {isLast ? "Scroll to continue" : "Scroll to explore"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
