"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import ScrollVideo from "@/components/ScrollVideo";

const CDN = "https://le-cdn.hibuwebsites.com/83d9b94b401e4aacb1d20946298c17ad/dms3rep/multi/opt/";

/* ─── STAGE 1: THE PROBLEM ──────────────────────────────────── */
const waterReport = [
  { label: "Hardness (GPG)", value: "17.2", pct: 86, status: "HIGH",     color: "#f97316" },
  { label: "Iron (mg/L)",    value: "0.8",  pct: 64, status: "ELEVATED", color: "#ef4444" },
  { label: "Chlorine (ppm)", value: "1.9",  pct: 58, status: "MODERATE", color: "#f59e0b" },
  { label: "TDS (ppm)",      value: "380",  pct: 76, status: "HIGH",     color: "#f97316" },
];

const impacts = [
  { n: "$800+", label: "avg. bottled water spend per year"   },
  { n: "30%",   label: "appliance lifespan lost to scale"    },
  { n: "2×",    label: "more soap used — washed right out"   },
  { n: "Years", label: "of pipe damage before you notice it" },
];

export function StageContamination() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="stage-contamination"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "#F0F8FF" }}
    >
      {/* Ambient blob */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(18,189,251,0.07) 0%, transparent 70%)" }}
        />
      </motion.div>

      <div className="container-site relative z-10">
        {/* Stage label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="w-8 h-[2px] rounded" style={{ backgroundColor: "#12BDFB" }} />
          <span className="text-xs font-heading font-semibold tracking-[0.22em] uppercase" style={{ color: "#12BDFB" }}>
            Stage 01 — Contamination
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — big stat + impact grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div
                className="font-display font-bold leading-none mb-6 select-none"
                style={{ fontSize: "clamp(7rem, 20vw, 16rem)", color: "#12BDFB", opacity: 0.85, letterSpacing: "-0.04em" }}
              >
                85%
              </div>
              <p
                className="font-display font-light leading-[1.2] mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: "#0C1F2E" }}
              >
                of Indiana homes have{" "}
                <span className="italic" style={{ color: "rgba(12,31,46,0.4)" }}>hard water.</span>
              </p>
              <p className="text-base leading-relaxed max-w-sm mb-10" style={{ color: "rgba(12,31,46,0.5)" }}>
                Most families don&apos;t know — until the appliances break early, the stains won&apos;t wash out, or the water just doesn&apos;t taste right.
              </p>

              {/* Impact stats 2×2 */}
              <div className="grid grid-cols-2 gap-3">
                {impacts.map((stat, i) => (
                  <motion.div
                    key={stat.n}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.09 }}
                    className="rounded-xl border p-4 bg-white"
                    style={{ borderColor: "rgba(18,189,251,0.13)", boxShadow: "0 2px 12px rgba(12,31,46,0.04)" }}
                  >
                    <p className="font-heading font-bold text-xl mb-1" style={{ color: "#0C1F2E" }}>{stat.n}</p>
                    <p className="text-xs leading-snug" style={{ color: "rgba(12,31,46,0.45)" }}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — animated water quality report card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <TiltCard
              className="rounded-2xl border bg-white overflow-hidden"
              style={{ borderColor: "rgba(18,189,251,0.18)", boxShadow: "0 8px 44px rgba(12,31,46,0.09)" }}
              intensity={5}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.12)" }}
              >
                <div>
                  <p className="text-xs font-heading font-semibold tracking-[0.14em] uppercase" style={{ color: "#12BDFB" }}>
                    Water Quality Report
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.4)" }}>Indiana Average · 2024</p>
                </div>
                <span
                  className="text-xs font-heading font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#f97316" }}
                >
                  Action Needed
                </span>
              </div>

              {/* Readings */}
              <div className="p-6 space-y-5">
                {waterReport.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading" style={{ color: "rgba(12,31,46,0.6)" }}>{row.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-heading font-bold tabular-nums" style={{ color: "rgba(12,31,46,0.75)" }}>{row.value}</span>
                        <span
                          className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: `${row.color}18`, color: row.color }}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(12,31,46,0.07)" }}>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={inView ? { width: `${row.pct}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${row.color}aa, ${row.color})` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Card footer */}
              <div
                className="px-6 py-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(18,189,251,0.1)", backgroundColor: "rgba(18,189,251,0.02)" }}
              >
                <p className="text-xs" style={{ color: "rgba(12,31,46,0.38)" }}>
                  Your results may vary — we test on-site, free.
                </p>
                <Link
                  href="/contact"
                  className="text-xs font-heading font-semibold flex items-center gap-1.5 transition-colors"
                  style={{ color: "#12BDFB" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#3DCFFF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#12BDFB")}
                >
                  Book Free Test <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── STAGE 2: THE FILTER ───────────────────────────────────── */
// Water purity color per step — visually shows the water clearing
const filterStages = [
  {
    n: "01",
    label: "Pre-Filtration",
    desc: "Sediment and particles are captured before they reach your system.",
    waterColor: "#7a4a1e",
  },
  {
    n: "02",
    label: "Softening",
    desc: "Ion exchange removes calcium and magnesium — hardness eliminated.",
    waterColor: "#6b8c80",
  },
  {
    n: "03",
    label: "Carbon Filtration",
    desc: "Chlorine, chloramines, and chemicals are pulled from the water.",
    waterColor: "#7abccc",
  },
  {
    n: "04",
    label: "Final Polish",
    desc: "A clean, pure result exits — ready for every tap in your home.",
    waterColor: "#12BDFB",
  },
];

export function StageFilter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <section
      id="stage-filter"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.1), transparent)" }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="w-8 h-[2px] rounded" style={{ backgroundColor: "#12BDFB" }} />
          <span className="text-xs font-heading font-semibold tracking-[0.22em] uppercase" style={{ color: "#12BDFB" }}>
            Stage 02 — Filtration
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — scroll video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border aspect-[4/3]"
            style={{ borderColor: "rgba(18,189,251,0.15)", boxShadow: "0 8px 40px rgba(12,31,46,0.1)" }}
          >
            <motion.div style={{ scale: videoScale }} className="absolute inset-0">
              <ScrollVideo
                src="/videos/service-water-1.mp4"
                className="w-full h-full object-cover"
                threshold={0.2}
              />
            </motion.div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,31,46,0.55) 0%, transparent 50%)" }} />

            {/* Water purity legend overlay */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-1 mb-2">
                {filterStages.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: "easeOut" }}
                    className="flex-1 h-1 rounded-full origin-left"
                    style={{ backgroundColor: s.waterColor }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading font-medium tracking-widest uppercase" style={{ color: "rgba(122,74,30,0.8)" }}>Raw</span>
                <span className="text-[10px] font-heading font-medium tracking-widest uppercase" style={{ color: "#12BDFB" }}>Pure</span>
              </div>
            </div>
          </motion.div>

          {/* Right — filter stages with water color dots */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold leading-[0.9] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#0C1F2E" }}
            >
              Water enters.<br />
              <span style={{ color: "#12BDFB" }}>Science</span> takes over.
            </motion.h2>

            <div className="space-y-0">
              {filterStages.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  className="flex gap-5 pb-7 relative"
                  style={{
                    borderBottom: i < filterStages.length - 1 ? "1px solid rgba(12,31,46,0.07)" : "none",
                    marginBottom: i < filterStages.length - 1 ? "1.75rem" : "0",
                  }}
                >
                  {/* Connecting line */}
                  {i < filterStages.length - 1 && (
                    <motion.div
                      className="absolute left-[1.35rem] top-8 bottom-0 w-[1px]"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: "easeOut" }}
                      style={{
                        backgroundColor: s.waterColor,
                        opacity: 0.35,
                        originY: 0,
                      }}
                    />
                  )}

                  {/* Water-colored step dot */}
                  <div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-heading font-bold z-10 transition-all duration-500"
                    style={{
                      borderColor: s.waterColor,
                      backgroundColor: "#FFFFFF",
                      color: s.waterColor,
                      boxShadow: `0 0 10px ${s.waterColor}33`,
                    }}
                  >
                    {i + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-heading font-semibold" style={{ color: "#0C1F2E" }}>{s.label}</p>
                      {/* Tiny water drop showing purity at this stage */}
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: s.waterColor, opacity: 0.7 }}
                      />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.5)" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STAGE 3: THE SYSTEMS ──────────────────────────────────── */
const systems = [
  {
    name: "Quintex 5™",
    tag: "Salt-Free City Water",
    desc: "Five-media whole-house treatment. No salt, no brine tank, no waste. American-engineered for city water.",
    specs: ["Chlorine & chemical removal", "Salt-free conditioning", "Maintenance-free", "Lifetime warranty"],
    img: `${CDN}Quintex_5_RB-removebg-preview+%281%29-1920w.png`,
    href: "/services/city-water",
    badge: "Best for City Water",
  },
  {
    name: "AiO Well System",
    tag: "Well Water Treatment",
    desc: "Air injection oxidation removes iron, sulfur, and manganese without chemicals. 50% less water waste than comparable systems.",
    specs: ["Iron & sulfur removal", "No chemical additives", "Quiet regeneration", "Lifetime warranty"],
    img: `${CDN}well-water-solutions-Aio-Well+Filter-1-1920w.png`,
    href: "/services/well-water",
    badge: "Best for Well Water",
  },
  {
    name: "5-Stage Alkaline RO",
    tag: "Drinking Water",
    desc: "Ultra-pure under-sink reverse osmosis with remineralization. Removes 99% of contaminants, restores healthy pH.",
    specs: ["99% contaminant removal", "Alkaline remineralization", "Under-sink install", "Dedicated faucet"],
    img: `${CDN}5+Stage+Reverse+Osmosis+RB-4f93437a-1920w.png`,
    href: "/services/reverse-osmosis",
    badge: "Best for Drinking",
  },
  {
    name: "Twin Softener",
    tag: "Hard Water Solution",
    desc: "Dual-tank continuous soft water 24/7. One regenerates while the other runs — zero service interruptions.",
    specs: ["Continuous soft water", "24/7 operation", "Zero interruptions", "Made in USA"],
    img: `${CDN}Twin+Softener+RB-1920w.png`,
    href: "/services/water-softening",
    badge: "Best for Hard Water",
  },
];

export function StageSystems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="stage-systems"
      ref={ref}
      className="relative py-32 md:py-48"
      style={{ backgroundColor: "#F0F8FF" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.1), transparent)" }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[2px] rounded" style={{ backgroundColor: "#12BDFB" }} />
          <span className="text-xs font-heading font-semibold tracking-[0.22em] uppercase" style={{ color: "#12BDFB" }}>
            What We Install
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-5 gap-6"
        >
          <h2
            className="font-display font-bold leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#0C1F2E" }}
          >
            Our Systems
          </h2>
          <Link
            href="/systems"
            className="inline-flex items-center gap-2 text-sm font-heading font-medium transition-colors"
            style={{ color: "rgba(12,31,46,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.45)")}
          >
            View all systems <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Intro copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          className="text-base max-w-xl leading-relaxed mb-14"
          style={{ color: "rgba(12,31,46,0.5)" }}
        >
          No two homes have the same water. We design every system from your actual test results — not a one-size-fits-all shelf unit.
        </motion.p>

        {/* 2×2 grid of tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1 }}
            >
              <TiltCard
                className="group relative flex rounded-2xl border overflow-hidden h-full bg-white"
                style={{ borderColor: "rgba(18,189,251,0.15)", boxShadow: "0 2px 24px rgba(12,31,46,0.07)" }}
                intensity={10}
              >
                <Link href={sys.href} className="flex flex-col sm:flex-row gap-0 w-full">
                  {/* Image column */}
                  <div
                    className="relative sm:w-44 h-44 sm:h-auto flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "radial-gradient(ellipse at 50% 100%, rgba(18,189,251,0.08) 0%, transparent 70%)",
                      backgroundColor: "#F0F8FF",
                    }}
                  >
                    <Image
                      src={sys.img}
                      alt={sys.name}
                      width={160}
                      height={160}
                      className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="absolute top-3 left-3 text-xs font-heading font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}
                    >
                      {sys.badge}
                    </span>
                  </div>

                  {/* Content column */}
                  <div
                    className="flex flex-col flex-1 p-5 border-t sm:border-t-0 sm:border-l"
                    style={{ borderColor: "rgba(18,189,251,0.1)" }}
                  >
                    <span className="text-xs font-heading font-medium tracking-[0.12em] uppercase mb-1" style={{ color: "rgba(18,189,251,0.8)" }}>
                      {sys.tag}
                    </span>
                    <h3 className="text-lg font-heading font-bold mb-2" style={{ color: "#0C1F2E" }}>{sys.name}</h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(12,31,46,0.5)" }}>{sys.desc}</p>
                    <ul className="space-y-1.5">
                      {sys.specs.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <Check className="w-3 h-3 flex-shrink-0" style={{ color: "#12BDFB" }} />
                          <span className="text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center gap-1 text-xs font-heading font-medium" style={{ color: "#12BDFB" }}>
                      Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STAGE 4: THE RESULT ───────────────────────────────────── */
const transformations = [
  { before: "Scale destroys appliances early",     after: "Pipes & systems protected for decades"    },
  { before: "Orange stains on every fixture",       after: "Spotless surfaces — every single time"    },
  { before: "Dry, itchy skin after every shower",   after: "Noticeably softer skin within 2 weeks"    },
  { before: "$80+/month on bottled water",          after: "Pure from every tap, completely free"      },
  { before: "Laundry fades faster, feels rough",    after: "Colors last 33% more washes"              },
];

export function StageResult() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="stage-result"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-14"
        >
          <div className="w-8 h-[2px] rounded" style={{ backgroundColor: "#12BDFB" }} />
          <span className="text-xs font-heading font-semibold tracking-[0.22em] uppercase" style={{ color: "#12BDFB" }}>
            Stage 04 — The Result
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — before / after comparison */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold leading-[0.9] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#0C1F2E" }}
            >
              Water in.<br />
              <span style={{ color: "#12BDFB" }}>Life</span> changed.
            </motion.h2>

            {/* Before / After card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border overflow-hidden mb-10"
              style={{ borderColor: "rgba(18,189,251,0.15)", boxShadow: "0 4px 28px rgba(12,31,46,0.07)" }}
            >
              {/* Header row */}
              <div className="grid grid-cols-2 divide-x divide-[rgba(18,189,251,0.12)]">
                <div
                  className="px-5 py-3 border-b border-r"
                  style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(18,189,251,0.1)" }}
                >
                  <span className="text-xs font-heading font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(239,68,68,0.65)" }}>
                    Before
                  </span>
                </div>
                <div
                  className="px-5 py-3 border-b"
                  style={{ backgroundColor: "rgba(18,189,251,0.04)", borderColor: "rgba(18,189,251,0.1)" }}
                >
                  <span className="text-xs font-heading font-bold tracking-[0.15em] uppercase" style={{ color: "#12BDFB" }}>
                    After Aqua Otter
                  </span>
                </div>
              </div>

              {/* Transformation rows */}
              {transformations.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="grid grid-cols-2 divide-x border-b last:border-b-0"
                  style={{ borderColor: "rgba(12,31,46,0.05)" }}
                >
                  <div
                    className="flex items-start gap-2 px-5 py-3.5 border-r"
                    style={{ borderColor: "rgba(12,31,46,0.05)" }}
                  >
                    <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "rgba(239,68,68,0.45)" }} />
                    <span className="text-xs leading-snug" style={{ color: "rgba(12,31,46,0.45)" }}>{t.before}</span>
                  </div>
                  <div className="flex items-start gap-2 px-5 py-3.5">
                    <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#12BDFB" }} />
                    <span className="text-xs leading-snug font-medium" style={{ color: "rgba(12,31,46,0.72)" }}>{t.after}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-heading font-semibold transition-all duration-300"
                style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 0 40px rgba(18,189,251,0.2)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
              >
                Start with a Free Water Test
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — parallax video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border aspect-[3/4]"
            style={{ borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 12px 60px rgba(12,31,46,0.12)" }}
          >
            <motion.div style={{ y: videoY }} className="absolute inset-[-10%]">
              <ScrollVideo
                src="/videos/service-water-2.mp4"
                className="w-full h-full object-cover"
                threshold={0.15}
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(12,31,46,0.5) 0%, transparent 40%)" }}
            />

            {/* Pure overlay text */}
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, opacity: 0.9 }}
              >
                Pure.<br />
                <span className="font-light italic" style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.6)" }}>
                  Every tap. Every day.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
