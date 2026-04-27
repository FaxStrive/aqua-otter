"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wave from "@/components/ui/Wave";

const findings = [
  { n: "01", label: "mg/L of iron removed from well water without chemicals", stat: "10+" },
  { n: "02", label: "of rotten egg hydrogen sulfide odor eliminated on contact", stat: "100%" },
  { n: "03", label: "mg/L — EPA manganese limit our systems consistently hit", stat: "0.05" },
  { n: "04", label: "less water wasted vs traditional chemical-feed systems", stat: "50%" },
  { n: "05", label: "saved annually on cleaning products, fixtures, and appliance repairs", stat: "$400+" },
];

const scienceSteps = [
  {
    n: "01",
    badge: "Step 1",
    title: "Air creates an oxidation pocket",
    desc: "As well water enters the tank, a trapped air pocket at the top oxidizes dissolved iron, manganese, and hydrogen sulfide on contact — converting invisible dissolved metals into solid particles the media can capture.",
  },
  {
    n: "02",
    badge: "Step 2",
    title: "Filtration media traps the solids",
    desc: "Oxidized particles are too large to pass through the media bed. They collect inside the tank while filtered water continues through to every tap in your home — clear, odor-free, and metal-free.",
  },
  {
    n: "03",
    badge: "Step 3",
    title: "Automatic backwash resets overnight",
    desc: "On a timed cycle, the system reverses flow and flushes captured contaminants to drain. No chemicals. No stains. No manual intervention. The air pocket regenerates and the system is ready for the next day.",
  },
];

const products = [
  {
    name: "AiO Well Filtration",
    badge: "Most Popular",
    img: "/client/AiO_Well_Filtration_RB.png",
    desc: "Air injection oxidation removes iron, manganese, and hydrogen sulfide from well water without a single chemical. The oxygen pocket oxidizes contaminants; the media bed captures them; automatic backwash flushes them away.",
    specs: [
      ["Iron Removal", "Up to 10+ mg/L"],
      ["Sulfur Odor", "Eliminated"],
      ["Chemicals", "None required"],
      ["Maintenance", "Automatic backwash"],
    ],
  },
  {
    name: "AiO Ozone",
    badge: "Premium Oxidation",
    img: "/client/AiO_Ozone-removebg-preview.png",
    desc: "Ozone-enhanced air injection for the most challenging well water. Ozone is 50× more powerful than chlorine as an oxidizer — it destroys iron, manganese, sulfur, and bacteria simultaneously with zero chemical byproducts.",
    specs: [
      ["Oxidation Power", "50× stronger than chlorine"],
      ["Bacteria", "Destroyed on contact"],
      ["Severe Iron", "Handles high contamination"],
      ["Byproducts", "Zero chemical residue"],
    ],
  },
  {
    name: "AiO + Softener",
    badge: "Complete Well Solution",
    img: "/client/AiO_well_filtration_and_Softener.jpg",
    desc: "AiO filtration paired with a water softener for well water that has both iron and hardness. Iron removal happens first — protecting the softener resin from fouling and extending its service life by years.",
    specs: [
      ["Iron + Hardness", "Both eliminated"],
      ["Resin Protection", "Iron removed upstream"],
      ["Installation", "Single system, dual function"],
      ["Ideal For", "Iron + hard mineral wells"],
    ],
  },
];

const ironParticles = [
  { size: 4, left: 22, delay: 0.1, dur: 3.2 },
  { size: 3, left: 55, delay: 0.5, dur: 2.6 },
  { size: 5, left: 78, delay: 0.9, dur: 3.5 },
  { size: 3, left: 38, delay: 1.4, dur: 2.9 },
  { size: 4, left: 65, delay: 0.3, dur: 3.1 },
  { size: 2, left: 15, delay: 0.7, dur: 3.8 },
  { size: 3, left: 88, delay: 1.1, dur: 2.7 },
];

export default function WellWaterPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const findingsRef = useRef<HTMLDivElement>(null);
  const findingsInView = useInView(findingsRef, { once: true, margin: "-80px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  const glassRef = useRef<HTMLDivElement>(null);
  const glassInView = useInView(glassRef, { once: true, margin: "-60px" });

  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#07111A",
          clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
          marginBottom: -60,
        }}
      >
        <video autoPlay loop muted playsInline poster="/videos/system-well-poster.jpg" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.28 }}>
          <source src="/videos/system-well.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 65% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(7,17,26,0.85) 0%, rgba(7,17,26,0.4) 55%, rgba(7,17,26,0.1) 100%)" }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.018,
            backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Link
                  href="/systems"
                  className="text-xs transition-colors"
                  style={{ color: "rgba(18,189,251,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#12BDFB")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(18,189,251,0.5)")}
                >
                  All Systems
                </Link>
                <span style={{ color: "rgba(255,255,255,0.18)" }}>/</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Well Water Solutions
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: "#12BDFB" }}
              >
                <span className="text-xs font-bold" style={{ color: "#07111A" }}>
                  Well Water Specialist
                </span>
              </div>
              <h1
                className="font-display font-bold leading-[0.87] tracking-tight mb-6"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "#ffffff" }}
              >
                Well water.<br />Fixed for good.
              </h1>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.48)", maxWidth: "42ch" }}
              >
                Air injection oxidation removes iron, sulfur, and manganese from well water without
                chemicals. No staining. No smell. Just clean, clear water from every tap. Pair it with a softener when hardness is high.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: "#12BDFB",
                    color: "#07111A",
                    boxShadow: "0 4px 24px rgba(18,189,251,0.35)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
                >
                  Get Free Water Test <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+13179835919"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full border text-sm font-medium"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  (317) 983-5919
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="hidden lg:flex items-center justify-center"
              style={{ y: imgY }}
            >
              <div className="relative" style={{ width: 420, height: 480 }}>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(18,189,251,0.12) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute inset-[-30px] rounded-full animate-pulse"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(18,189,251,0.04) 0%, transparent 60%)",
                  }}
                />
                <Image
                  src="/client/AiO_Well_Filtration_RB.png"
                  alt="AiO Well Water Filtration System"
                  width={400}
                  height={460}
                  className="object-contain w-full h-full relative z-10"
                  style={{ filter: "drop-shadow(0 16px 48px rgba(18,189,251,0.25))" }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -left-8 rounded-2xl border px-5 py-3.5"
                  style={{
                    backgroundColor: "rgba(10,24,37,0.9)",
                    backdropFilter: "blur(16px)",
                    borderColor: "rgba(18,189,251,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <p className="font-display font-bold" style={{ fontSize: "1.4rem", color: "#12BDFB", lineHeight: 1 }}>
                    10+ mg/L
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>iron removed</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.95 }}
                  className="absolute -top-2 -right-6 rounded-2xl border px-5 py-3.5 text-center"
                  style={{
                    backgroundColor: "rgba(10,24,37,0.9)",
                    backdropFilter: "blur(16px)",
                    borderColor: "rgba(18,189,251,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>
                    50%
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>less water waste</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#ef4444" }}>
              This is what iron does to your home
            </p>
            <p
              className="font-display font-bold leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}
            >
              Orange stains. Rotten egg smell.{" "}
              <span style={{ color: "rgba(12,31,46,0.25)" }}>Bacteria risk.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FIELD REPORT — STATS */}
      <section ref={findingsRef} className="py-28 md:py-36" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div
            className="flex items-end justify-between mb-10 pb-5"
            style={{ borderBottom: "2px solid #0C1F2E" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={findingsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "rgba(12,31,46,0.35)" }}
              >
                Lab Report — AiO Systems
              </p>
              <h2
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E" }}
              >
                What the data shows.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={findingsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs hidden md:block"
              style={{ color: "rgba(12,31,46,0.3)", maxWidth: "22ch", textAlign: "right", lineHeight: 1.6 }}
            >
              Field measurements from AiO installations across Indiana well water systems.
            </motion.p>
          </div>

          <div>
            {findings.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, x: -12 }}
                animate={findingsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-center gap-6 md:gap-10"
                style={{
                  padding: "1.75rem 0",
                  borderBottom: i < findings.length - 1 ? "1px solid rgba(12,31,46,0.07)" : "none",
                  ...(i === findings.length - 1 && {
                    borderLeft: "3px solid #12BDFB",
                    paddingLeft: "1.5rem",
                    marginLeft: "-1.5rem",
                  }),
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-[0.12em] flex-shrink-0 hidden sm:block"
                  style={{ color: "rgba(12,31,46,0.28)", minWidth: 72 }}
                >
                  Finding {f.n}
                </span>
                <p
                  className="text-sm flex-1"
                  style={{ color: "rgba(12,31,46,0.62)", lineHeight: 1.55 }}
                >
                  {f.label}
                </p>
                <p
                  className="font-display font-bold flex-shrink-0"
                  style={{
                    fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
                    color: "#0C1F2E",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {f.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED LIFESTYLE */}
      <div className="relative overflow-hidden" style={{ height: "clamp(240px, 34vw, 480px)" }}>
        <Image
          src="/client/service-well-water.jpg"
          alt="Well water system serving a family home"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,17,26,0.78) 0%, rgba(7,17,26,0.35) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container-site">
            <p className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#ffffff", maxWidth: "16ch" }}>
              Whatever your well throws at you,<br /><span style={{ color: "#12BDFB" }}>we handle it.</span>
            </p>
          </div>
        </div>
      </div>

      <Wave from="#ffffff" to="#07111A" variant="gentle" height={70} />

      {/* IRON GLASS — BEFORE & AFTER */}
      <section ref={glassRef} className="py-24 md:py-32" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={glassInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(18,189,251,0.5)" }}>
              AiO Iron Removal — Visual Proof
            </p>
            <h2
              className="font-display font-bold leading-[0.9]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#ffffff", letterSpacing: "-0.03em" }}
            >
              See what your well carries.
            </h2>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.38)", maxWidth: "44ch", margin: "1rem auto 0" }}>
              A typical Indiana well tests between 5 and 12 mg/L iron. The AiO removes all of it. No chemicals, no stains, no smell.
            </p>
          </motion.div>

          {/* 3-column: problem images | glasses | lifestyle images */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-center">

          {/* ── LEFT: Iron problem images ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={glassInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="hidden lg:flex flex-col gap-3"
          >
            {/* Top: big problem image */}
            <div className="relative overflow-hidden rounded-2xl group" style={{ height: 220 }}>
              <Image src="/client/hero-iron-problems.png" alt="Iron stains on fixtures" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(155,52,8,0.55) 0%, rgba(120,40,5,0.3) 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.7) 0%, transparent 55%)" }} />
              <div className="absolute bottom-3 left-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5" style={{ color: "#f97316" }}>Before treatment</p>
                <p className="text-xs font-medium text-white">Iron stains every surface</p>
              </div>
            </div>
            {/* Bottom two: side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-2xl group" style={{ height: 130 }}>
                <Image src="/client/service-shower.jpg" alt="Iron-stained shower" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="12vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(180,70,10,0.5) 0%, rgba(100,35,5,0.35) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.65) 0%, transparent 60%)" }} />
                <div className="absolute bottom-2 left-2.5">
                  <p className="text-[9px] font-semibold text-white leading-tight">Rust in<br />your shower</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group" style={{ height: 130 }}>
                <Image src="/client/service-tap-closeup.jpg" alt="Discolored tap water" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="12vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(155,60,10,0.6) 0%, rgba(90,30,5,0.4) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.65) 0%, transparent 60%)" }} />
                <div className="absolute bottom-2 left-2.5">
                  <p className="text-[9px] font-semibold text-white leading-tight">Discolored<br />tap water</p>
                </div>
              </div>
            </div>
            {/* Problem tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {["Orange stains", "Metallic taste", "Bacteria risk", "Appliance damage"].map(tag => (
                <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── CENTER: Glasses ── */}
          <div className="flex items-end justify-center gap-8 md:gap-16">

            {/* BEFORE glass */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={glassInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                Your well water
              </p>
              <div className="mb-4 text-center">
                <span className="font-display font-bold" style={{ fontSize: "2.2rem", color: "#f97316", lineHeight: 1 }}>7.8</span>
                <span className="text-xs ml-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>mg/L iron</span>
              </div>

              {/* Glass container */}
              <div
                style={{
                  width: 112,
                  height: 224,
                  position: "relative",
                  borderRadius: "4px 4px 26px 26px",
                  border: "2px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.015)",
                  overflow: "hidden",
                }}
              >
                {/* Glass highlight strip */}
                <div style={{ position: "absolute", top: 0, left: 11, bottom: 0, width: 7, background: "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
                {/* Water fill */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "hidden",
                    background: "linear-gradient(to top, rgba(155,52,8,0.74) 0%, rgba(195,90,25,0.56) 100%)",
                  }}
                  initial={{ height: "0%" }}
                  animate={glassInView ? { height: "78%" } : { height: "0%" }}
                  transition={{ duration: 1.4, delay: 0.35, type: "spring", stiffness: 50, damping: 13 }}
                >
                  {/* Wave surface */}
                  <motion.div
                    style={{ position: "absolute", top: -5, left: -2, right: -2, height: 13, background: "rgba(200,95,30,0.72)" }}
                    animate={{
                      clipPath: [
                        "polygon(0 55%, 17% 0%, 34% 55%, 51% 0%, 68% 55%, 85% 0%, 100% 55%, 100% 100%, 0 100%)",
                        "polygon(0 0%, 17% 55%, 34% 0%, 51% 55%, 68% 0%, 85% 55%, 100% 0%, 100% 100%, 0 100%)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                  {/* Floating iron particles */}
                  {ironParticles.map((p, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: "rgba(120,45,5,0.78)",
                        left: `${p.left}%`,
                        bottom: "5%",
                      }}
                      animate={glassInView ? { y: [0, -50, -100, -150] } : {}}
                      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
                    />
                  ))}
                </motion.div>
              </div>

              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2" style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#f97316" }} />
                  <span className="text-xs font-semibold" style={{ color: "#f97316" }}>Iron detected</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)", maxWidth: "14ch" }}>
                  Stains, odor,<br />bacteria risk
                </p>
              </div>
            </motion.div>

            {/* Center: AiO badge + arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={glassInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75, type: "spring", stiffness: 200, damping: 18 }}
              className="flex flex-col items-center gap-3 pb-16"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#12BDFB", boxShadow: "0 0 28px rgba(18,189,251,0.45)" }}
              >
                <span className="text-xs font-bold" style={{ color: "#07111A" }}>AiO</span>
              </div>
              <ArrowRight className="w-5 h-5" style={{ color: "rgba(18,189,251,0.45)" }} />
            </motion.div>

            {/* AFTER glass */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={glassInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col items-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                After AiO filtration
              </p>
              <div className="mb-4 text-center">
                <span className="font-display font-bold" style={{ fontSize: "2.2rem", color: "#12BDFB", lineHeight: 1 }}>0.0</span>
                <span className="text-xs ml-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>mg/L iron</span>
              </div>

              {/* Glass container */}
              <div
                style={{
                  width: 112,
                  height: 224,
                  position: "relative",
                  borderRadius: "4px 4px 26px 26px",
                  border: "2px solid rgba(18,189,251,0.18)",
                  backgroundColor: "rgba(18,189,251,0.02)",
                  overflow: "hidden",
                }}
              >
                {/* Glass highlight strip */}
                <div style={{ position: "absolute", top: 0, left: 11, bottom: 0, width: 7, background: "linear-gradient(90deg, rgba(18,189,251,0.1) 0%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
                {/* Water fill */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "hidden",
                    background: "linear-gradient(to top, rgba(18,189,251,0.3) 0%, rgba(18,189,251,0.14) 100%)",
                  }}
                  initial={{ height: "0%" }}
                  animate={glassInView ? { height: "78%" } : { height: "0%" }}
                  transition={{ duration: 1.4, delay: 0.82, type: "spring", stiffness: 50, damping: 13 }}
                >
                  {/* Wave surface */}
                  <motion.div
                    style={{ position: "absolute", top: -5, left: -2, right: -2, height: 13, background: "rgba(18,189,251,0.38)" }}
                    animate={{
                      clipPath: [
                        "polygon(0 0%, 17% 55%, 34% 0%, 51% 55%, 68% 0%, 85% 55%, 100% 0%, 100% 100%, 0 100%)",
                        "polygon(0 55%, 17% 0%, 34% 55%, 51% 0%, 68% 55%, 85% 0%, 100% 55%, 100% 100%, 0 100%)",
                      ],
                    }}
                    transition={{ duration: 1.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2" style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "1px solid rgba(18,189,251,0.2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#12BDFB" }} />
                  <span className="text-xs font-semibold" style={{ color: "#12BDFB" }}>Iron removed</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)", maxWidth: "14ch" }}>
                  Crystal clear.<br />Safe. Pure.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Lifestyle images ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={glassInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="hidden lg:flex flex-col gap-3"
          >
            {/* Top: big lifestyle hero */}
            <div className="relative overflow-hidden rounded-2xl group" style={{ height: 220 }}>
              <Image src="/client/service-couple-drinking.jpg" alt="Family enjoying clean water" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(18,189,251,0.18) 0%, transparent 60%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.7) 0%, transparent 55%)" }} />
              <div className="absolute bottom-3 left-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5" style={{ color: "#12BDFB" }}>After AiO</p>
                <p className="text-xs font-medium text-white">Pure water, every tap</p>
              </div>
            </div>
            {/* Bottom two: side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-2xl group" style={{ height: 130 }}>
                <Image src="/client/service-kid-drinking.jpg" alt="Child drinking clean water" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="12vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.6) 0%, transparent 60%)" }} />
                <div className="absolute bottom-2 left-2.5">
                  <p className="text-[9px] font-semibold text-white leading-tight">Safe for<br />your kids</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group" style={{ height: 130 }}>
                <Image src="/client/service-woman-glass.jpg" alt="Woman with a glass of clear water" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="12vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.6) 0%, transparent 60%)" }} />
                <div className="absolute bottom-2 left-2.5">
                  <p className="text-[9px] font-semibold text-white leading-tight">Crystal<br />clear</p>
                </div>
              </div>
            </div>
            {/* Result tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {["Zero staining", "Safe to drink", "Great taste", "Appliance safe"].map(tag => (
                <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "1px solid rgba(18,189,251,0.2)", color: "#12BDFB" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          </div>{/* end 3-col grid */}

          {/* Footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={glassInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="text-center text-xs mt-14"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Results from AiO field installations. Actual reduction depends on incoming water chemistry.
          </motion.p>
        </div>
      </section>

      <Wave from="#07111A" to="#0C1F2E" variant="gentle" height={50} />

      {/* TYPOGRAPHIC STEPS — HOW IT WORKS */}
      <section ref={stepsRef} className="py-24 md:py-32" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "rgba(18,189,251,0.6)" }}
            >
              The Science
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-bold mb-16"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#ffffff",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            Air injection oxidation.<br />
            <span style={{ color: "rgba(255,255,255,0.28)" }}>Three steps. Zero chemicals.</span>
          </motion.h2>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {scienceSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="grid gap-8 md:gap-12"
                  style={{
                    gridTemplateColumns: "clamp(80px, 12vw, 140px) 1fr",
                    alignItems: "flex-start",
                    padding: "3rem 0",
                  }}
                >
                  <div className="relative">
                    <span
                      className="font-display font-black select-none block"
                      style={{
                        fontSize: "clamp(5rem, 10vw, 9rem)",
                        color: "rgba(18,189,251,0.06)",
                        lineHeight: 1,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="absolute top-6 left-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#12BDFB" }}
                    >
                      <span className="font-display font-bold text-xs" style={{ color: "#07111A" }}>
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div style={{ paddingTop: "0.75rem" }}>
                    <div
                      className="inline-flex items-center px-2.5 py-1 rounded-full mb-4"
                      style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "1px solid rgba(18,189,251,0.2)" }}
                    >
                      <span className="text-xs font-semibold" style={{ color: "#12BDFB" }}>
                        {step.badge}
                      </span>
                    </div>
                    <h3
                      className="font-display font-bold mb-3"
                      style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                        color: "#ffffff",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)", maxWidth: "55ch" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#0C1F2E" to="#F0F8FF" variant="double" height={70} />

      {/* SHOWROOM FLOOR — PRODUCTS */}
      <section className="py-28 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(12,31,46,0.35)" }}
              >
                Our Systems
              </p>
              <h2
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E" }}
              >
                Built for your well.
              </h2>
            </div>
            <p
              className="text-sm hidden md:block"
              style={{ color: "rgba(12,31,46,0.45)", maxWidth: "32ch", lineHeight: 1.6 }}
            >
              We test your water first. Every system is sized to your specific iron and mineral levels.
            </p>
          </div>

          {/* Desktop 2-panel selector */}
          <div
            className="hidden lg:grid rounded-3xl overflow-hidden"
            style={{
              gridTemplateColumns: "1.2fr 1fr",
              gap: 2,
              backgroundColor: "rgba(18,189,251,0.12)",
            }}
          >
            {/* Left featured panel */}
            <div style={{ backgroundColor: "#ffffff", padding: "2.5rem 3rem" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={products[activeProduct].name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full mb-6"
                    style={{ backgroundColor: "#12BDFB" }}
                  >
                    <span className="text-xs font-bold" style={{ color: "#07111A" }}>
                      {products[activeProduct].badge}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold mb-2"
                    style={{
                      fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                      color: "#0C1F2E",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {products[activeProduct].name}
                  </h3>
                  <div
                    className="flex justify-center my-6 rounded-2xl"
                    style={{ backgroundColor: "#EAF6FE", padding: "1.5rem", minHeight: 200 }}
                  >
                    <Image
                      src={products[activeProduct].img}
                      alt={products[activeProduct].name}
                      width={180}
                      height={180}
                      className="object-contain"
                      style={{
                        maxHeight: 180,
                        filter: "drop-shadow(0 8px 24px rgba(18,189,251,0.25))",
                      }}
                    />
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "rgba(12,31,46,0.58)" }}
                  >
                    {products[activeProduct].desc}
                  </p>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(12,31,46,0.08)" }}
                  >
                    {products[activeProduct].specs.map(([label, value], i) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#F8FBFF" : "#ffffff",
                          borderBottom:
                            i < products[activeProduct].specs.length - 1
                              ? "1px solid rgba(12,31,46,0.06)"
                              : "none",
                        }}
                      >
                        <span
                          className="text-xs font-semibold uppercase tracking-wide"
                          style={{ color: "rgba(12,31,46,0.38)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "#0C1F2E" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold"
                    style={{ color: "#12BDFB" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0aa8e0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#12BDFB")}
                  >
                    Ask about this system <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right selector panel */}
            <div
              className="flex flex-col gap-1.5"
              style={{ backgroundColor: "#EAF6FE", padding: "1rem" }}
            >
              {products.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActiveProduct(i)}
                  className="text-left rounded-2xl p-5 transition-all duration-200"
                  style={{
                    backgroundColor: i === activeProduct ? "#ffffff" : "transparent",
                    boxShadow:
                      i === activeProduct
                        ? "0 2px 16px rgba(12,31,46,0.08)"
                        : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span
                      className="font-display font-bold text-sm leading-tight"
                      style={{ color: i === activeProduct ? "#0C1F2E" : "rgba(12,31,46,0.5)" }}
                    >
                      {p.name}
                    </span>
                    {i === activeProduct && (
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#12BDFB" }}
                      />
                    )}
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wide block mb-2"
                    style={{ color: i === activeProduct ? "#12BDFB" : "rgba(12,31,46,0.3)" }}
                  >
                    {p.badge}
                  </span>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: i === activeProduct ? "rgba(12,31,46,0.5)" : "rgba(12,31,46,0.3)" }}
                  >
                    {p.desc.split(". ")[0]}.
                  </p>
                </button>
              ))}

              <div
                className="rounded-2xl p-5 mt-auto"
                style={{ backgroundColor: "#0C1F2E" }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#ffffff" }}
                >
                  Not sure which system fits your well?
                </p>
                <p
                  className="text-xs mb-4"
                  style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}
                >
                  We test your water on-site before recommending anything. Iron levels, hardness, pH. Free.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "#12BDFB" }}
                >
                  Book a free water test <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile — horizontal scroll carousel */}
          <div className="lg:hidden overflow-x-auto -mx-4 px-4 pb-4">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {products.map((p) => (
                <div key={p.name} className="flex-shrink-0 bg-white rounded-3xl overflow-hidden border" style={{ width: "82vw", borderColor: "rgba(18,189,251,0.12)", boxShadow: "0 4px 24px rgba(12,31,46,0.07)" }}>
                  <div className="relative flex items-center justify-center" style={{ backgroundColor: "#EAF6FE", height: 180 }}>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#07111A" }}>{p.badge}</div>
                    <Image src={p.img} alt={p.name} width={140} height={140} className="object-contain" style={{ maxHeight: 140, filter: "drop-shadow(0 8px 20px rgba(18,189,251,0.2))" }} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold mb-1.5" style={{ fontSize: "1.1rem", color: "#0C1F2E" }}>{p.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }}>{p.desc.split(".")[0]}.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#07111A" variant="splash" height={80} />

      {/* TESTIMONIAL */}
      <section className="py-28" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#fbbf24">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote
              className="font-display font-light italic leading-[1.6] mb-10"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "rgba(255,255,255,0.75)" }}
            >
              &ldquo;We had iron stains on everything — sinks, toilets, the shower. The system fixed
              it completely. Not a single stain since installation. I wish we had done this
              years ago.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">Gerald Mitchell</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>
                Google Review — AiO Well Water Filtration
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Wave from="#07111A" to="#ffffff" variant="sharp" height={80} />

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E", lineHeight: 0.9 }}
          >
            Get your well water<br />tested for free.
          </h2>
          <p
            className="mb-10"
            style={{
              color: "rgba(12,31,46,0.5)",
              maxWidth: "38ch",
              margin: "0 auto 2.5rem",
            }}
          >
            We test your iron, manganese, hardness, and sulfur levels on-site. No lab. No waiting.
            No obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#12BDFB",
              color: "#0C1F2E",
              boxShadow: "0 4px 24px rgba(18,189,251,0.35)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
          >
            Get Your Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
