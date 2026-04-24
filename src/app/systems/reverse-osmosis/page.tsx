"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Wave from "@/components/ui/Wave";

const findings = [
  { n: "01", label: "of lead removed at the point of use", stat: "99%" },
  { n: "02", label: "of arsenic eliminated per NSF certification", stat: "99%" },
  { n: "03", label: "of nitrates and nitrites removed", stat: "97%" },
  { n: "04", label: "of PFAS per-and polyfluoroalkyl substances removed", stat: "95%+" },
  { n: "05", label: "saved per year compared to buying bottled water", stat: "$600+" },
  { n: "06", label: "TDS reduction — dissolved solids effectively gone", stat: "99%" },
];

const scienceSteps = [
  {
    n: "01",
    title: "Pre-filtration removes sediment and chlorine",
    desc: "Water first passes through a sediment filter and two carbon stages that remove particles, chlorine, and chloramines — protecting the delicate RO membrane from damage.",
  },
  {
    n: "02",
    title: "The RO membrane blocks 99% of contaminants",
    desc: "Water is forced through a semi-permeable membrane with pores measured in nanometers. Lead, arsenic, nitrates, PFAS, heavy metals, and most pharmaceuticals cannot pass through.",
  },
  {
    n: "03",
    title: "Post-carbon polishing delivers perfect taste",
    desc: "A final carbon stage removes any remaining trace tastes or odors before water flows to your dedicated drinking faucet — cleaner than most bottled water brands.",
  },
];

const products = [
  {
    name: "5-Stage Reverse Osmosis",
    badge: "Most Popular",
    desc: "Under-sink 5-stage RO system with sediment, carbon, and membrane filtration plus post-carbon polish. The most comprehensive point-of-use drinking water system available.",
    img: "/client/5_Stage_Reverse_Osmosis_RB.png",
    specs: [
      "5-stage filtration process",
      "99% TDS reduction",
      "Removes lead, arsenic, PFAS, nitrates",
      "Dedicated filtered water faucet included",
    ],
  },
  {
    name: "4-Stage Reverse Osmosis",
    badge: "Great Value",
    desc: "Compact 4-stage under-sink RO system for homes with limited cabinet space. Same membrane technology as the 5-stage, delivering exceptional purity in a smaller footprint.",
    img: "/client/4_Stage_RO_RB.png",
    specs: [
      "4-stage compact design",
      "Full RO membrane filtration",
      "Ideal for smaller under-sink spaces",
      "Easy DIY filter replacement",
    ],
  },
  {
    name: "Alkaline Reverse Osmosis",
    badge: "Premium Health",
    desc: "The 5-stage RO system with an added alkaline remineralization stage. Adds back calcium, magnesium, and potassium for pH-balanced, clean mineral taste.",
    img: "/client/Alkaline_RO-removebg-preview-removebg-preview.png",
    specs: [
      "Full RO purification",
      "Alkaline remineralization stage",
      "Balanced pH water",
      "Enhanced mineral taste",
    ],
  },
  {
    name: "Whole-Home Reverse Osmosis",
    badge: "Total Home Coverage",
    desc: "Commercial-grade whole-home RO system that delivers reverse osmosis water to every tap, shower, and appliance. Best for homes with severe contamination concerns.",
    img: "/client/Whole_House_RO_Set-up_RB.png",
    specs: [
      "Whole-home RO protection",
      "High-flow commercial membrane",
      "Every tap, shower, appliance",
      "Built-in storage tank",
    ],
  },
];

const roStages = [
  {
    n: 1, name: "Sediment", short: "5-micron filter", color: "#f59e0b",
    removes: ["Sand & dirt", "Rust particles", "Sediment", "Physical debris"],
    desc: "A 5-micron polypropylene filter captures physical particles before they reach the carbon stages. Without this stage, sediment clogs downstream media and destroys the membrane prematurely.",
  },
  {
    n: 2, name: "Carbon Block", short: "Pre-filter stage 1", color: "#94a3b8",
    removes: ["Chlorine", "Chloramines", "VOCs", "Chemical tastes"],
    desc: "Activated carbon removes chlorine and chloramines — oxidants that degrade the RO membrane on contact. This stage is what makes the membrane's multi-year lifespan achievable.",
  },
  {
    n: 3, name: "Carbon Block", short: "Pre-filter stage 2", color: "#94a3b8",
    removes: ["Organics", "Pesticides", "Herbicides", "Trace chemicals"],
    desc: "A second carbon stage catches any remaining organic compounds before water contacts the membrane, keeping the membrane surface clean and performing at full efficiency.",
  },
  {
    n: 4, name: "RO Membrane", short: "0.0001 micron pore", color: "#12BDFB",
    removes: ["Lead (99%)", "Arsenic (99%)", "Nitrates (97%)", "PFAS (95%+)", "Heavy metals", "Pharmaceuticals"],
    desc: "The core of the system. Water is forced through a semi-permeable membrane with pores measured in nanometers. 99% of dissolved contaminants — lead, arsenic, PFAS, nitrates — cannot pass through.",
    isPrimary: true,
  },
  {
    n: 5, name: "Post Carbon", short: "Polish stage", color: "#22c55e",
    removes: ["Residual tastes", "Trace odors", "Final impurities"],
    desc: "A final activated carbon stage removes any remaining trace tastes or odors before water flows to your dedicated faucet. This is what makes RO taste noticeably better than most bottled water.",
  },
] as const;

export default function ReverseOsmosisPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const findingsRef = useRef<HTMLDivElement>(null);
  const findingsInView = useInView(findingsRef, { once: true, margin: "-60px" });

  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-60px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const [activeProduct, setActiveProduct] = useState(0);
  const [activeStage, setActiveStage] = useState(3);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "100vh", backgroundColor: "#07111A", clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)", marginBottom: -60 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 65% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.018, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />

        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 mb-5">
                <Link href="/systems" className="text-xs transition-colors" style={{ color: "rgba(18,189,251,0.5)" }} onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(18,189,251,0.5)")}>All Systems</Link>
                <span style={{ color: "rgba(255,255,255,0.18)" }}>/</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Reverse Osmosis</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "#12BDFB" }}>
                <span className="text-xs font-bold" style={{ color: "#07111A" }}>Highest Purity Available</span>
              </div>
              <h1 className="font-display font-bold leading-[0.87] tracking-tight mb-6" style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "#ffffff" }}>
                99% of<br />contaminants.<br />Gone.
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "42ch" }}>
                Reverse osmosis pushes water through a semi-permeable membrane that blocks lead, arsenic, nitrates, PFAS, and pharmaceuticals. The purest drinking water you can get at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#12BDFB", color: "#07111A", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}>
                  Get Free Water Test <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+13179835919" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border text-sm font-medium" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}>
                  (317) 983-5919
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="hidden lg:flex items-center justify-center" style={{ y: imgY }}>
              <div className="relative" style={{ width: 420, height: 480 }}>
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(18,189,251,0.12) 0%, transparent 70%)" }} />
                <div className="absolute inset-[-30px] rounded-full animate-pulse" style={{ background: "radial-gradient(circle, rgba(18,189,251,0.04) 0%, transparent 60%)" }} />
                <Image src="/client/5_Stage_Reverse_Osmosis_RB.png" alt="5-Stage Reverse Osmosis System" width={400} height={460} className="object-contain w-full h-full relative z-10" style={{ filter: "drop-shadow(0 16px 48px rgba(18,189,251,0.25))" }} />
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-4 -left-8 rounded-2xl border px-5 py-3.5" style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>99%</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>TDS removal</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.95 }} className="absolute -top-2 -right-6 rounded-2xl border px-5 py-3.5 text-center" style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <p className="font-display font-bold" style={{ fontSize: "1.1rem", color: "#12BDFB", lineHeight: 1.2 }}>Stop buying</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>bottled water</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FIELD REPORT */}
      <section ref={findingsRef} className="py-28 md:py-40" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-14 pb-6" style={{ borderBottom: "2px solid #0C1F2E" }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#f97316" }}>What standard filtration misses</p>
              <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E", lineHeight: 0.95 }}>
                Lead. Arsenic. PFAS.<br />RO removes them all.
              </h2>
            </div>
            <div className="flex-shrink-0 sm:text-right">
              <div className="inline-flex items-center gap-2 border rounded-lg px-4 py-2.5" style={{ borderColor: "rgba(249,115,22,0.3)", backgroundColor: "#FFF7ED" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#f97316" }} />
                <span className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: "#f97316" }}>NSF/ANSI 58 Certified</span>
              </div>
              <p className="text-xs mt-2" style={{ color: "rgba(12,31,46,0.38)" }}>Independent third-party tested</p>
            </div>
          </div>
          <div>
            {findings.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, x: -16 }}
                animate={findingsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-center gap-6 md:gap-10"
                style={{
                  padding: "1.75rem 0",
                  borderBottom: i < findings.length - 1 ? "1px solid rgba(12,31,46,0.07)" : "none",
                  ...(i === findings.length - 1 && { borderLeft: "3px solid #12BDFB", paddingLeft: "1.5rem", marginLeft: "-1.5rem" }),
                }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] flex-shrink-0 hidden sm:block" style={{ color: "rgba(12,31,46,0.28)", minWidth: 72 }}>Finding {f.n}</span>
                <p className="text-sm flex-1" style={{ color: "rgba(12,31,46,0.62)", lineHeight: 1.55 }}>{f.label}</p>
                <p className="font-display font-bold flex-shrink-0" style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)", color: "#0C1F2E", letterSpacing: "-0.03em", lineHeight: 1 }}>{f.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#ffffff" to="#07111A" variant="gentle" height={70} />

      {/* 5-STAGE MEMBRANE DIAGRAM — redesigned */}
      <section ref={diagramRef} className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#07111A" }}>
        <style>{`
          @keyframes water-drip {
            0%   { transform: translateY(-100%); opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(260px); opacity: 0; }
          }
          @keyframes ro-flow {
            0% { left: -5px; opacity: 0; }
            8% { opacity: 1; }
            92% { opacity: 1; }
            100% { left: calc(100% + 5px); opacity: 0; }
          }
          .water-drop { position: absolute; left: 50%; width: 4px; height: 10px; margin-left: -2px; border-radius: 0 0 4px 4px; background: #12BDFB; animation: water-drip linear infinite; }
        `}</style>

        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={diagramInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(18,189,251,0.5)" }}>
              How It Works
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#ffffff", letterSpacing: "-0.03em" }}>
                5 stages. 99% removal.
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)", maxWidth: "32ch", lineHeight: 1.6 }}>
                Click any stage to see exactly what it targets and why it matters.
              </p>
            </div>
          </motion.div>

          {/* MAIN DIAGRAM: filter canisters + animated water + detail panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

            {/* LEFT: Physical canister diagram */}
            <div>
              {/* Water inlet label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={diagramInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#94a3b8" }} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.25)" }}>Tap water in</span>
              </motion.div>

              {/* Canisters row */}
              <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
                <div className="flex items-end gap-0" style={{ minWidth: "max-content" }}>
                  {roStages.map((stage, i) => {
                    const isActive = i === activeStage;
                    const isPrimary = "isPrimary" in stage;
                    const cW = isPrimary ? 130 : 104;
                    const cH = isPrimary ? 280 : 220;

                    const patterns: Record<number, React.ReactNode> = {
                      0: (
                        <svg width={cW - 24} height={cH - 60} style={{ position: "absolute", top: 30, left: 12, opacity: 0.22 }}>
                          {Array.from({ length: 8 }).map((_, r) =>
                            Array.from({ length: 5 }).map((_, c) => (
                              <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 22 + 11} r={4} fill="#f59e0b" />
                            ))
                          )}
                        </svg>
                      ),
                      1: (
                        <svg width={cW - 24} height={cH - 60} style={{ position: "absolute", top: 30, left: 12, opacity: 0.2 }}>
                          {Array.from({ length: 10 }).map((_, r) => (
                            <line key={r} x1={0} y1={r * 18 + 9} x2={cW - 24} y2={r * 18 + 9} stroke="#94a3b8" strokeWidth={2} />
                          ))}
                        </svg>
                      ),
                      2: (
                        <svg width={cW - 24} height={cH - 60} style={{ position: "absolute", top: 30, left: 12, opacity: 0.2 }}>
                          {Array.from({ length: 10 }).map((_, r) => (
                            <line key={r} x1={0} y1={r * 18 + 9} x2={cW - 24} y2={r * 18 + 9} stroke="#94a3b8" strokeWidth={2} />
                          ))}
                        </svg>
                      ),
                      3: (
                        <svg width={cW - 24} height={cH - 60} style={{ position: "absolute", top: 30, left: 12, opacity: 0.18 }}>
                          {Array.from({ length: 16 }).map((_, r) =>
                            Array.from({ length: 7 }).map((_, c) => (
                              <rect key={`${r}-${c}`} x={c * 15} y={r * 14 + 4} width={10} height={8} rx={1} fill="#12BDFB" />
                            ))
                          )}
                        </svg>
                      ),
                      4: (
                        <svg width={cW - 24} height={cH - 60} style={{ position: "absolute", top: 30, left: 12, opacity: 0.22 }}>
                          {Array.from({ length: 8 }).map((_, r) =>
                            Array.from({ length: 5 }).map((_, c) => (
                              <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 22 + 11} r={3} fill="#22c55e" />
                            ))
                          )}
                        </svg>
                      ),
                    };

                    return (
                      <div key={stage.n} className="flex items-end">
                        {/* Connecting pipe before this stage */}
                        {i > 0 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={diagramInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                            style={{
                              width: 36,
                              height: 4,
                              backgroundColor: "rgba(18,189,251,0.25)",
                              flexShrink: 0,
                              marginBottom: isPrimary ? 0 : (280 - cH) / 2,
                              transformOrigin: "left center",
                              position: "relative",
                            }}
                          >
                            {/* Animated water bead */}
                            {diagramInView && (
                              <div style={{
                                position: "absolute",
                                top: -3,
                                left: 0,
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: "#12BDFB",
                                animation: `ro-flow ${1.8 + i * 0.2}s linear infinite`,
                              }} />
                            )}
                          </motion.div>
                        )}

                        {/* Filter canister */}
                        <motion.button
                          onClick={() => setActiveStage(i)}
                          initial={{ opacity: 0, y: 32 }}
                          animate={diagramInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                          whileHover={{ y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex flex-col items-center focus:outline-none"
                          style={{ gap: 0 }}
                        >
                          {/* Stage label above */}
                          <div className="mb-3 text-center" style={{ width: cW }}>
                            <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: isActive ? stage.color : "rgba(255,255,255,0.25)", transition: "color 0.2s" }}>
                              Stage {stage.n}
                            </span>
                          </div>

                          {/* Canister top cap */}
                          <div style={{
                            width: cW * 0.5,
                            height: 14,
                            borderRadius: "6px 6px 0 0",
                            backgroundColor: isActive ? stage.color : "rgba(255,255,255,0.12)",
                            transition: "background-color 0.25s",
                            margin: "0 auto",
                          }} />

                          {/* Canister body */}
                          <div style={{
                            width: cW,
                            height: cH,
                            borderRadius: 14,
                            border: `2px solid ${isActive ? stage.color : "rgba(255,255,255,0.1)"}`,
                            backgroundColor: isActive
                              ? stage.color === "#12BDFB" ? "rgba(18,189,251,0.09)" : `${stage.color}12`
                              : "rgba(255,255,255,0.03)",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.25s ease",
                            boxShadow: isActive ? `0 0 36px ${stage.color}33` : "none",
                            cursor: "pointer",
                          }}>
                            {/* Big ghost stage number */}
                            <span className="font-display font-black select-none" style={{
                              position: "absolute",
                              bottom: -10,
                              right: 8,
                              fontSize: isPrimary ? "5.5rem" : "4.5rem",
                              color: isActive ? `${stage.color}18` : "rgba(255,255,255,0.04)",
                              lineHeight: 1,
                              letterSpacing: "-0.05em",
                              pointerEvents: "none",
                              transition: "color 0.25s",
                            }}>
                              {stage.n}
                            </span>

                            {/* Media pattern */}
                            {patterns[i]}

                            {/* Water fill animation when active */}
                            {isActive && diagramInView && (
                              <>
                                <div className="water-drop" style={{ animationDuration: "1.2s", top: 0 }} />
                                <div className="water-drop" style={{ animationDuration: "1.2s", animationDelay: "0.4s", top: 0 }} />
                                <div className="water-drop" style={{ animationDuration: "1.2s", animationDelay: "0.8s", top: 0 }} />
                              </>
                            )}

                            {/* Active glow stripe */}
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: 3,
                                  backgroundColor: stage.color,
                                  borderRadius: "12px 12px 0 0",
                                }}
                              />
                            )}

                            {/* RO membrane — special spiral indicator */}
                            {isPrimary && (
                              <div style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                border: `2px solid ${isActive ? "rgba(18,189,251,0.4)" : "rgba(18,189,251,0.12)"}`,
                                boxShadow: isActive ? "0 0 20px rgba(18,189,251,0.25)" : "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s",
                              }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${isActive ? "rgba(18,189,251,0.3)" : "rgba(18,189,251,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: isActive ? "rgba(18,189,251,0.25)" : "rgba(18,189,251,0.06)" }} />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Canister bottom cap */}
                          <div style={{
                            width: cW * 0.4,
                            height: 12,
                            borderRadius: "0 0 6px 6px",
                            backgroundColor: isActive ? stage.color : "rgba(255,255,255,0.1)",
                            transition: "background-color 0.25s",
                            margin: "0 auto",
                          }} />

                          {/* Name below */}
                          <div className="mt-3 text-center" style={{ width: cW + 16 }}>
                            <p className="text-xs font-bold" style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.32)", transition: "color 0.2s" }}>
                              {stage.name}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: isActive ? stage.color : "rgba(255,255,255,0.18)", transition: "color 0.2s" }}>
                              {stage.short}
                            </p>
                          </div>
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clean water outlet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={diagramInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center justify-end gap-2 mt-4"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(18,189,251,0.5)" }}>Pure water out</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#12BDFB", boxShadow: "0 0 8px rgba(18,189,251,0.7)" }} />
              </motion.div>
            </div>

            {/* RIGHT: Stage detail panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={diagramInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pt-2"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>
                Stage detail
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Stage identity */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${roStages[activeStage].color}18`, border: `2px solid ${roStages[activeStage].color}50` }}
                    >
                      <span className="font-display font-black text-lg" style={{ color: roStages[activeStage].color, lineHeight: 1 }}>
                        {roStages[activeStage].n}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: roStages[activeStage].color }}>
                        Stage {roStages[activeStage].n} — {roStages[activeStage].short}
                      </p>
                      <h3 className="font-display font-bold text-white" style={{ fontSize: "1.25rem", lineHeight: 1.1 }}>
                        {roStages[activeStage].name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "40ch" }}>
                    {roStages[activeStage].desc}
                  </p>

                  {/* What it removes */}
                  <div
                    className="rounded-2xl p-5"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.28)" }}>
                      What it removes
                    </p>
                    <div className="space-y-2.5">
                      {roStages[activeStage].removes.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${roStages[activeStage].color}18` }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roStages[activeStage].color }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dot nav */}
                  <div className="flex items-center gap-2 mt-6">
                    {roStages.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStage(i)}
                        style={{
                          width: i === activeStage ? 22 : 7,
                          height: 7,
                          borderRadius: 4,
                          backgroundColor: i === activeStage ? roStages[i].color : "rgba(255,255,255,0.15)",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Wave from="#07111A" to="#0C1F2E" variant="gentle" height={50} />

      {/* HOW IT WORKS — typographic steps */}
      <section ref={stepsRef} className="py-28 md:py-40" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}} className="mb-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: "#12BDFB" }}>The science</span>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff", lineHeight: 0.9 }}>
              How 5-stage reverse osmosis<br />delivers pure water.
            </h2>
          </motion.div>
          <div>
            {scienceSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="grid gap-8 md:gap-12"
                style={{ gridTemplateColumns: "clamp(80px, 12vw, 140px) 1fr", alignItems: "flex-start", padding: "3rem 0", borderBottom: i < scienceSteps.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
              >
                <div className="relative">
                  <span className="font-display font-black select-none block" style={{ fontSize: "clamp(5rem, 10vw, 9rem)", color: "rgba(18,189,251,0.06)", lineHeight: 1, letterSpacing: "-0.05em" }}>{step.n}</span>
                  <div className="absolute top-6 left-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#12BDFB" }}>
                    <span className="font-display font-bold text-xs" style={{ color: "#07111A" }}>{step.n}</span>
                  </div>
                </div>
                <div style={{ paddingTop: "0.75rem" }}>
                  <h3 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#ffffff", lineHeight: 1.15 }}>{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "50ch" }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#0C1F2E" to="#F0F8FF" variant="double" height={70} />

      {/* SHOWROOM FLOOR */}
      <section className="py-28 md:py-40" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="mb-12">
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E", lineHeight: 0.9 }}>Our RO systems.</h2>
            <p className="mt-4" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "42ch" }}>From under-sink drinking water to whole-home RO protection.</p>
          </div>

          <div className="hidden lg:grid rounded-3xl overflow-hidden" style={{ gridTemplateColumns: "1.2fr 1fr", gap: 2, backgroundColor: "rgba(18,189,251,0.12)" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "2.5rem 3rem" }}>
              <AnimatePresence mode="wait">
                <motion.div key={products[activeProduct].name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div>
                      <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: "#12BDFB", color: "#07111A" }}>{products[activeProduct].badge}</div>
                      <h3 className="font-display font-bold" style={{ fontSize: "1.65rem", color: "#0C1F2E", lineHeight: 1.1 }}>{products[activeProduct].name}</h3>
                    </div>
                    <div className="flex items-center justify-center rounded-2xl flex-shrink-0" style={{ backgroundColor: "#EAF6FE", width: 120, height: 120 }}>
                      <Image src={products[activeProduct].img} alt={products[activeProduct].name} width={100} height={100} className="object-contain" style={{ maxHeight: 96, filter: "drop-shadow(0 4px 12px rgba(18,189,251,0.25))" }} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.55)", maxWidth: "44ch" }}>{products[activeProduct].desc}</p>
                  <div style={{ borderTop: "1px solid rgba(12,31,46,0.07)" }}>
                    {products[activeProduct].specs.map(s => (
                      <div key={s} className="flex items-center gap-3 py-3.5" style={{ borderBottom: "1px solid rgba(12,31,46,0.05)" }}>
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#12BDFB" }} />
                        <span className="text-sm" style={{ color: "rgba(12,31,46,0.65)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 mt-7 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                    Get a quote for this system <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col gap-1.5" style={{ backgroundColor: "#EAF6FE", padding: "1rem" }}>
              {products.map((p, i) => (
                <button key={p.name} onClick={() => setActiveProduct(i)} className="text-left w-full rounded-2xl transition-all duration-200"
                  style={{ padding: "1.25rem 1.5rem", backgroundColor: i === activeProduct ? "#ffffff" : "transparent", border: "none", cursor: "pointer", boxShadow: i === activeProduct ? "0 2px 12px rgba(12,31,46,0.06)" : "none" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: "#0C1F2E" }}>{p.name}</span>
                    <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{ color: "#12BDFB", backgroundColor: "rgba(18,189,251,0.12)" }}>{p.badge}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(12,31,46,0.42)" }}>{p.desc.split(".")[0]}.</p>
                </button>
              ))}
              <div className="rounded-2xl p-5 mt-auto" style={{ backgroundColor: "#0C1F2E" }}>
                <p className="text-sm font-semibold text-white mb-1">Not sure which system?</p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>A free water test determines exactly what you need.</p>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#12BDFB" }}>
                  Book free water test <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:hidden grid grid-cols-1 gap-5">
            {products.map(p => (
              <div key={p.name} className="bg-white rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(18,189,251,0.12)", boxShadow: "0 4px 24px rgba(12,31,46,0.07)" }}>
                <div className="relative flex items-center justify-center" style={{ backgroundColor: "#EAF6FE", height: 200 }}>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#07111A" }}>{p.badge}</div>
                  <Image src={p.img} alt={p.name} width={160} height={160} className="object-contain" style={{ maxHeight: 160, filter: "drop-shadow(0 8px 20px rgba(18,189,251,0.2))" }} />
                </div>
                <div className="p-7">
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: "1.15rem", color: "#0C1F2E" }}>{p.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>{p.desc}</p>
                  <ul className="space-y-2">
                    {p.specs.map(s => (
                      <li key={s} className="flex items-center gap-2 text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#12BDFB" }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#07111A" variant="splash" height={80} />

      <section className="py-28" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#fbbf24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
            </div>
            <blockquote className="font-display font-light italic leading-[1.6] mb-10" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "rgba(255,255,255,0.75)" }}>
              &ldquo;Our water tastes incredible now — better than bottled. We stopped buying cases of water the week it was installed. The quality is unbelievable for what comes right out of our tap.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">Val Fowler</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>Google Review — 5-Stage Reverse Osmosis</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Wave from="#07111A" to="#ffffff" variant="sharp" height={80} />

      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E", lineHeight: 0.9 }}>
            Test your water.<br />See what RO removes.
          </h2>
          <p className="mb-10" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto 2.5rem" }}>
            Free in-home water test. We show you exactly what is in your water before recommending a system.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}>
            Get Your Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
