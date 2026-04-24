"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: 2500, suffix: "+", label: "Families Served",    sub: "Across 6 states",                size: "15vw", col: "1 / 8",  row: "1 / 2", align: "left"  },
  { value: 100,  suffix: "%", label: "Satisfaction Rate",  sub: "Verified by every customer",     size: "11vw", col: "6 / 13", row: "2 / 3", align: "right" },
  { value: 25,   suffix: "+", label: "Years in Business",  sub: "Water treatment specialists",    size: "13vw", col: "1 / 7",  row: "3 / 4", align: "left"  },
  { value: 7,    suffix: "d", label: "Average Install",    sub: "From water test to clean water", size: "10vw", col: "7 / 13", row: "4 / 5", align: "right" },
];

function Counter({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) { setVal(0); return; }
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(ease * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

function StatBlock({ s, index }: { s: typeof stats[number]; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: true, margin: "-120px 0px -120px 0px" });

  return (
    <motion.div
      ref={blockRef}
      style={{
        gridColumn: s.col,
        gridRow: s.row,
        textAlign: s.align as "left" | "right",
        padding: "clamp(20px, 3vw, 48px) 0",
      }}
    >
      {/* Ghost number behind */}
      <div
        aria-hidden
        className="font-display font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: `calc(${s.size} + 3vw)`,
          color: "rgba(18,189,251,0.045)",
          lineHeight: 0.85,
          marginBottom: "-0.7em",
          letterSpacing: "-0.04em",
        }}
      >
        <Counter to={s.value} suffix={s.suffix} run={inView} />
      </div>

      {/* Real number — clipped reveal from below */}
      <div
        className="relative"
        style={{
          overflow: "hidden",
          paddingBottom: "0.12em",
        }}
      >
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : { y: "105%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display font-bold leading-none tabular-nums"
          style={{ fontSize: s.size, color: "#12BDFB", letterSpacing: "-0.04em", lineHeight: 0.9 }}
        >
          <Counter to={s.value} suffix={s.suffix} run={inView} />
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 40,
          height: 2,
          backgroundColor: "rgba(18,189,251,0.4)",
          borderRadius: 99,
          marginTop: "0.5em",
          marginBottom: "0.4em",
          marginLeft: s.align === "right" ? "auto" : 0,
          transformOrigin: s.align === "right" ? "right" : "left",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="text-xs font-bold uppercase tracking-[0.15em]"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        {s.label}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="text-xs mt-1"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        {s.sub}
      </motion.p>

      {/* Hidden — keeps index in closure signature */}
      <span hidden aria-hidden>{index}</span>
    </motion.div>
  );
}

function MobileStat({ s }: { s: typeof stats[number] }) {
  const cellRef = useRef<HTMLDivElement>(null);
  const seen = useInView(cellRef, { once: true, margin: "-80px" });
  return (
    <div ref={cellRef}>
      <div style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
        <motion.div
          initial={{ y: "105%" }}
          animate={seen ? { y: "0%" } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold leading-none mb-2 tabular-nums"
          style={{ fontSize: "clamp(2.8rem, 12vw, 4rem)", color: "#12BDFB", letterSpacing: "-0.04em" }}
        >
          <Counter to={s.value} suffix={s.suffix} run={seen} />
        </motion.div>
      </div>
      <div className="w-6 h-0.5 rounded-full mb-2" style={{ backgroundColor: "rgba(18,189,251,0.3)" }} />
      <p className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(ref, { once: true, margin: "-80px" });

  // Scroll-linked water motion
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const waveX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), { stiffness: 50, damping: 20 });
  const waveY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), { stiffness: 50, damping: 20 });
  const wave2X = useSpring(useTransform(scrollYProgress, [0, 1], [0, 260]), { stiffness: 50, damping: 20 });
  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "50%", "80%"]);
  const rippleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.55, 0.55, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#07111A" }}>
      <style>{`
        @keyframes aqua-drift-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes aqua-drift-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes aqua-bubble-rise {
          0%   { transform: translate3d(0, 0, 0) scale(0.9); opacity: 0; }
          15%  { opacity: 0.85; }
          85%  { opacity: 0.85; }
          100% { transform: translate3d(var(--drift, 40px), -120vh, 0) scale(1.1); opacity: 0; }
        }
        @keyframes aqua-caustic {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50%      { transform: translate(-20px, 14px) scale(1.06); opacity: 0.55; }
        }
      `}</style>

      {/* Deep water ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(18,189,251,0.16) 0%, transparent 55%), " +
            "radial-gradient(ellipse 60% 55% at 80% 70%, rgba(12,120,180,0.18) 0%, transparent 60%), " +
            "linear-gradient(180deg, rgba(7,17,26,0) 0%, rgba(8,40,70,0.4) 100%)",
        }}
      />

      {/* Caustic shimmer overlay — that dappled light-through-water look */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(18,189,251,0.25) 0%, transparent 22%), " +
            "radial-gradient(circle at 72% 38%, rgba(120,210,255,0.18) 0%, transparent 18%), " +
            "radial-gradient(circle at 45% 65%, rgba(18,189,251,0.22) 0%, transparent 25%), " +
            "radial-gradient(circle at 86% 82%, rgba(80,190,250,0.2) 0%, transparent 20%), " +
            "radial-gradient(circle at 12% 80%, rgba(18,189,251,0.18) 0%, transparent 22%)",
          filter: "blur(40px)",
          animation: "aqua-caustic 11s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 60% 15%, rgba(150,220,255,0.18) 0%, transparent 15%), " +
            "radial-gradient(circle at 28% 52%, rgba(18,189,251,0.22) 0%, transparent 18%), " +
            "radial-gradient(circle at 80% 55%, rgba(18,189,251,0.2) 0%, transparent 22%), " +
            "radial-gradient(circle at 55% 90%, rgba(120,210,255,0.2) 0%, transparent 20%)",
          filter: "blur(50px)",
          animation: "aqua-caustic 17s ease-in-out infinite reverse",
        }}
      />

      {/* FLOWING WAVE BAND #1 — top third, drifts left continuously, scroll-shifts */}
      <motion.div
        aria-hidden
        className="absolute left-0 pointer-events-none"
        style={{ top: "18%", height: 160, width: "200%", x: waveX }}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: "aqua-drift-left 28s linear infinite",
            width: "200%",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 160' preserveAspectRatio='none'><path d='M0,80 C150,20 350,140 600,80 C850,20 1050,140 1200,80 L1200,160 L0,160 Z' fill='%2312BDFB' fill-opacity='0.14'/></svg>\")",
            backgroundSize: "50% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
      </motion.div>

      {/* FLOWING WAVE BAND #2 — middle, drifts right, scroll-shifts opposite */}
      <motion.div
        aria-hidden
        className="absolute left-0 pointer-events-none"
        style={{ top: "46%", height: 200, width: "200%", x: wave2X }}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: "aqua-drift-right 38s linear infinite",
            width: "200%",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'><path d='M0,100 C200,40 400,160 600,100 C800,40 1000,160 1200,100 L1200,200 L0,200 Z' fill='%230a9ed9' fill-opacity='0.12'/></svg>\")",
            backgroundSize: "50% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
      </motion.div>

      {/* FLOWING WAVE BAND #3 — bottom, slowest */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: 220, x: waveX }}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: "aqua-drift-left 46s linear infinite",
            width: "200%",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 220' preserveAspectRatio='none'><path d='M0,110 C180,60 420,170 600,110 C780,50 1020,170 1200,110 L1200,220 L0,220 Z' fill='%2312BDFB' fill-opacity='0.09'/></svg>\")",
            backgroundSize: "50% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            animation: "aqua-drift-right 60s linear infinite",
            width: "200%",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 220' preserveAspectRatio='none'><path d='M0,140 C240,90 480,200 720,140 C960,80 1100,190 1200,140 L1200,220 L0,220 Z' fill='%2312BDFB' fill-opacity='0.06'/></svg>\")",
            backgroundSize: "50% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
      </motion.div>

      {/* Bubbles rising */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "6%",  size: 10, delay: 0,  dur: 14, drift: 30 },
          { left: "14%", size: 6,  delay: 4,  dur: 11, drift: -20 },
          { left: "22%", size: 14, delay: 8,  dur: 17, drift: 40 },
          { left: "31%", size: 5,  delay: 1,  dur: 9,  drift: 15 },
          { left: "39%", size: 9,  delay: 6,  dur: 13, drift: -25 },
          { left: "48%", size: 12, delay: 11, dur: 18, drift: 30 },
          { left: "57%", size: 7,  delay: 3,  dur: 12, drift: 18 },
          { left: "66%", size: 11, delay: 9,  dur: 16, drift: -30 },
          { left: "74%", size: 5,  delay: 2,  dur: 10, drift: 22 },
          { left: "82%", size: 13, delay: 7,  dur: 19, drift: -18 },
          { left: "90%", size: 8,  delay: 5,  dur: 14, drift: 25 },
          { left: "96%", size: 6,  delay: 10, dur: 12, drift: -22 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.left,
              bottom: -20,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(200,235,255,0.9), rgba(18,189,251,0.4) 60%, transparent 75%)",
              boxShadow: "0 0 12px rgba(18,189,251,0.4), inset 0 -2px 4px rgba(255,255,255,0.25)",
              animation: `aqua-bubble-rise ${b.dur}s ease-in ${b.delay}s infinite`,
              ["--drift" as string]: `${b.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Horizontal ripple that tracks scroll */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: glowY,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(18,189,251,0.9) 50%, transparent 100%)",
          opacity: rippleOpacity,
          boxShadow: "0 0 20px rgba(18,189,251,0.8)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: glowY,
          height: 120,
          marginTop: -60,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(18,189,251,0.22) 50%, transparent 100%)",
          opacity: rippleOpacity,
          filter: "blur(20px)",
        }}
      />

      {/* Scroll-drawn water spine connecting stats — only desktop */}
      <motion.svg
        aria-hidden
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 1200"
        preserveAspectRatio="none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id="stats-spine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(18,189,251,0)" />
            <stop offset="20%" stopColor="rgba(18,189,251,0.7)" />
            <stop offset="80%" stopColor="rgba(18,189,251,0.7)" />
            <stop offset="100%" stopColor="rgba(18,189,251,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 180 260 C 500 260, 700 500, 1020 500 S 500 760, 180 760 S 700 1020, 1020 1020"
          fill="none"
          stroke="url(#stats-spine)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray="6 8"
          style={{ pathLength: scrollYProgress, opacity: 0.7 }}
        />
        {/* Traveling drop */}
        <motion.circle r={6} fill="#12BDFB" style={{ filter: "drop-shadow(0 0 8px #12BDFB)", opacity: 0.85 }}>
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            path="M 180 260 C 500 260, 700 500, 1020 500 S 500 760, 180 760 S 700 1020, 1020 1020"
          />
        </motion.circle>
        <motion.circle r={4} fill="#7ed7ff" style={{ opacity: 0.6 }}>
          <animateMotion
            dur="14s"
            begin="4.5s"
            repeatCount="indefinite"
            path="M 180 260 C 500 260, 700 500, 1020 500 S 500 760, 180 760 S 700 1020, 1020 1020"
          />
        </motion.circle>
        <motion.circle r={4} fill="#7ed7ff" style={{ opacity: 0.6 }}>
          <animateMotion
            dur="14s"
            begin="9s"
            repeatCount="indefinite"
            path="M 180 260 C 500 260, 700 500, 1020 500 S 500 760, 180 760 S 700 1020, 1020 1020"
          />
        </motion.circle>
      </motion.svg>

      {/* Desktop: scattered diagonal layout */}
      <div
        className="hidden md:grid relative z-10 px-8 lg:px-16"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto auto auto auto",
          columnGap: "0",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
        }}
      >
        {stats.map((s, i) => (
          <StatBlock key={s.label} s={s} index={i} />
        ))}

        {/* CTA — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ gridColumn: "1 / 13", gridRow: "5", paddingTop: 48 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Free water test. Same-week install. Lifetime warranty.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="tel:3179835919"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-colors"
              style={{ borderColor: "rgba(18,189,251,0.3)", color: "#12BDFB" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#12BDFB" }} />
              (317) 983-5919
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
            >
              Get Free Water Test <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile: stacked, each counts independently */}
      <div className="md:hidden container-site relative z-10 py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10">
          {stats.map((s) => (
            <MobileStat key={s.label} s={s} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={sectionInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-10">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
            Get Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
