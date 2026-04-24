"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowDown, Layers, Wind, AlertTriangle,
  Leaf, Microscope, Droplets, Zap, Home, ShieldAlert, Settings,
} from "lucide-react";
import Wave from "@/components/ui/Wave";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { id: "scale",      Icon: Layers,       label: "Scale buildup",        system: "water-softener",  color: "#0891b2" },
  { id: "skin",       Icon: Droplets,     label: "Dry skin & hair",      system: "water-softener",  color: "#0891b2" },
  { id: "appliances", Icon: Settings,     label: "Appliances failing",   system: "water-softener",  color: "#0891b2" },
  { id: "iron",       Icon: AlertTriangle,label: "Iron stains",          system: "well-water",      color: "#dc2626" },
  { id: "sulfur",     Icon: Wind,         label: "Rotten egg smell",     system: "well-water",      color: "#dc2626" },
  { id: "well",       Icon: Home,         label: "Private well water",   system: "well-water",      color: "#dc2626" },
  { id: "chlorine",   Icon: Zap,          label: "Chlorine taste",       system: "filtration",      color: "#7c3aed" },
  { id: "drinking",   Icon: Droplets,     label: "Bottled water habit",  system: "reverse-osmosis", color: "#059669" },
  { id: "lead",       Icon: ShieldAlert,  label: "Lead or arsenic",      system: "reverse-osmosis", color: "#059669" },
  { id: "bacteria",   Icon: Microscope,   label: "Bacteria concern",     system: "uv-purification", color: "#d97706" },
  { id: "eco",        Icon: Leaf,         label: "Salt-free option",     system: "no-salt",         color: "#16a34a" },
  { id: "unsure",     Icon: Microscope,   label: "Not sure — test me",   system: "contact",         color: "#12BDFB" },
];

const SYSTEMS = [
  {
    id: "water-softener", name: "Water Softeners", accent: "#0891b2",
    headline: "Hard water ends here.",
    desc: "Ion-exchange physically removes calcium and magnesium — the minerals behind scale, dry skin, and shortened appliance lifespans. You'll notice the difference in week one.",
    img: "/client/Softener_RB.png", otter: "/client/otter-arms-crossed.png",
    href: "/systems/water-softener", badge: "Most Popular",
    solves: ["Scale buildup gone from every fixture", "Softer skin and hair", "Appliances last years longer", "Soap lathers the way it's supposed to"],
    problemIds: ["scale", "skin", "appliances"],
  },
  {
    id: "well-water", name: "Well Water Solutions", accent: "#dc2626",
    headline: "Whatever your well throws at you.",
    desc: "Iron, sulfur, manganese, bacteria — removed without chemicals or salt using air injection oxidation. Built specifically for the problems city water systems never see.",
    img: "/client/AiO_Well_Filtration_RB.png", otter: "/client/otter-wrench.png",
    href: "/systems/well-water", badge: "Well Water Specialist",
    solves: ["Iron stains eliminated completely", "Rotten egg smell gone", "Manganese removed", "Bacteria treated without chemicals"],
    problemIds: ["iron", "sulfur", "well"],
  },
  {
    id: "filtration", name: "Whole-Home Filtration", accent: "#7c3aed",
    headline: "Every tap. Zero chlorine.",
    desc: "Multi-stage catalytic carbon removes chlorine, chloramines, VOCs, and odors from every faucet, shower, and appliance — not just the kitchen sink.",
    img: "/client/Alpha_3000_RB-removebg-preview.png", otter: "/client/otter-thumbsup.png",
    href: "/systems/filtration", badge: null,
    solves: ["Chlorine taste and smell gone", "Chemical byproducts removed", "Sediment and rust filtered", "Full flow, no pressure drop"],
    problemIds: ["chlorine"],
  },
  {
    id: "reverse-osmosis", name: "Reverse Osmosis", accent: "#059669",
    headline: "99% of contaminants. Gone.",
    desc: "The most comprehensive drinking water treatment available. Removes lead, arsenic, nitrates, PFAS, pharmaceuticals, and dissolved solids at the molecular level.",
    img: "/client/5_Stage_Reverse_Osmosis_RB.png", otter: "/client/otter-clipboard.png",
    href: "/systems/reverse-osmosis", badge: null,
    solves: ["Lead and arsenic removed (99%)", "PFAS and forever chemicals gone", "Nitrates and fluoride removed", "Stop buying bottled water for good"],
    problemIds: ["drinking", "lead"],
  },
  {
    id: "uv-purification", name: "UV Purification", accent: "#d97706",
    headline: "Bacteria destroyed. No chemicals.",
    desc: "Ultraviolet light eliminates 99.99% of bacteria, viruses, and parasites without adding anything to your water. No taste change. No chemical residual.",
    img: "/client/11_GPG_UV_Light.png", otter: "/client/otter-thinking.png",
    href: "/systems/uv-purification", badge: "Chemical-Free",
    solves: ["E. coli and coliform eliminated", "Viruses destroyed at 99.99%", "Giardia and cryptosporidium killed", "Nothing added to your water"],
    problemIds: ["bacteria"],
  },
  {
    id: "no-salt", name: "No-Salt Systems", accent: "#16a34a",
    headline: "Scale prevention. Zero salt.",
    desc: "Template-assisted crystallization stops scale without removing minerals, adding salt, or discharging brine. Eco-friendly, virtually maintenance-free.",
    img: "/client/No-Salt_Hard_Water_Treatment.png", otter: "/client/otter-globe-1.png",
    href: "/systems/no-salt", badge: "Eco-Friendly",
    solves: ["Scale prevention without salt bags", "No brine discharge to drain", "Healthy minerals stay in water", "Zero maintenance required"],
    problemIds: ["eco"],
  },
];

// ── Floating bubbles background ───────────────────────────────────────────────

const BUBBLES = [
  { w: 360, h: 360, top: "8%",  left: "-5%",  delay: 0 },
  { w: 240, h: 240, top: "60%", left: "88%",  delay: 1.5 },
  { w: 160, h: 160, top: "35%", left: "78%",  delay: 3 },
  { w: 120, h: 120, top: "78%", left: "15%",  delay: 2 },
  { w: 80,  h: 80,  top: "20%", left: "55%",  delay: 4 },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function SystemsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const systemsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-80px" });

  const selectedProblem = PROBLEMS.find(p => p.id === selected);
  const recommendedSystem = selectedProblem ? SYSTEMS.find(s => s.id === selectedProblem.system) : null;

  function handleSelect(id: string) {
    const prob = PROBLEMS.find(p => p.id === id);
    if (prob?.system === "contact") { window.location.href = "/contact"; return; }
    setSelected(prev => prev === id ? null : id);
    if (selected !== id) {
      setTimeout(() => systemsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 280);
    }
  }

  return (
    <>
      {/* ── DIAGONAL HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#07111A",
          paddingTop: "clamp(130px, 15vh, 170px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          marginBottom: -40,
        }}
      >
        {/* Decorative floating bubbles */}
        {BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: b.w, height: b.h, top: b.top, left: b.left, backgroundColor: "rgba(18,189,251,0.04)", border: "1px solid rgba(18,189,251,0.06)" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6 + i, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 70% at 60% 40%, rgba(18,189,251,0.06) 0%, transparent 65%)" }} />

        {/* Otter pointing — bottom right */}
        <div className="absolute bottom-0 right-0 hidden lg:block z-10" style={{ width: 260 }}>
          <Image src="/client/otter-pointing.png" alt="" width={260} height={300} className="object-contain w-full" style={{ transform: "scaleX(-1)" }} />
        </div>

        <div className="container-site relative z-20">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8" style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "rgba(18,189,251,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Test First. Recommend Second.</span>
            </div>
            <h1 className="font-display font-bold leading-[0.87] tracking-tight mb-6" style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", color: "#ffffff" }}>
              Tell us what&apos;s<br />wrong with your<br />
              <span style={{ color: "#12BDFB" }}>water.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "40ch" }}>
              Pick your problem below. We&apos;ll show you exactly which system fixes it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BUBBLE PROBLEM SELECTOR ────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-center"
            style={{ color: "rgba(12,31,46,0.38)" }}
          >
            Select what you&apos;re dealing with
          </motion.p>

          {/* Circular bubble grid */}
          <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto mb-8">
            {PROBLEMS.map((p, i) => {
              const isSelected = selected === p.id;
              const Icon = p.Icon;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelect(p.id)}
                  className="flex flex-col items-center justify-center rounded-full text-center transition-all duration-300"
                  style={{
                    width: 110,
                    height: 110,
                    backgroundColor: isSelected ? p.color : "#ffffff",
                    border: `2px solid ${isSelected ? p.color : "rgba(18,189,251,0.18)"}`,
                    boxShadow: isSelected ? `0 8px 32px ${p.color}40` : "0 4px 16px rgba(12,31,46,0.07)",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    className="w-5 h-5 mb-1.5"
                    style={{ color: isSelected ? "#ffffff" : p.color }}
                  />
                  <p
                    className="text-[10px] font-bold leading-tight px-3"
                    style={{ color: isSelected ? "#ffffff" : "#0C1F2E" }}
                  >
                    {p.label}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Recommendation banner */}
          <AnimatePresence>
            {recommendedSystem && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="max-w-xl mx-auto rounded-2xl p-4 flex items-center justify-between gap-4"
                style={{ backgroundColor: recommendedSystem.accent + "12", border: `1.5px solid ${recommendedSystem.accent}30` }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: recommendedSystem.accent, flexShrink: 0 }} />
                  <p className="text-sm" style={{ color: "#0C1F2E" }}>
                    Your water needs: <strong>{recommendedSystem.name}</strong>
                  </p>
                </div>
                <button
                  onClick={() => systemsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="flex items-center gap-1 text-xs font-bold flex-shrink-0"
                  style={{ color: recommendedSystem.accent }}
                >
                  See it <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Wave into systems */}
      <Wave from="#F0F8FF" to="#ffffff" variant="gentle" height={60} />

      {/* ── SYSTEMS ────────────────────────────────────────────────────────── */}
      <div ref={systemsRef}>
        {SYSTEMS.map((sys, si) => {
          const isRecommended = recommendedSystem?.id === sys.id;
          const isOdd = si % 2 !== 0;
          const sectionBg = isOdd ? "#F8FCFF" : "#ffffff";

          return (
            <div key={sys.id}>
              {si > 0 && <Wave from={si % 2 === 0 ? "#F8FCFF" : "#ffffff"} to={isOdd ? "#F8FCFF" : "#ffffff"} variant="double" height={50} />}
              <section
                id={sys.id}
                className="relative py-20 md:py-28 overflow-hidden transition-all duration-700"
                style={{
                  backgroundColor: isRecommended ? `${sys.accent}08` : sectionBg,
                }}
              >
                {/* Decorative background circle */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    backgroundColor: `${sys.accent}05`,
                    top: "50%",
                    [isOdd ? "left" : "right"]: "-80px",
                    transform: "translateY(-50%)",
                  }}
                />

                {isRecommended && (
                  <div
                    className="absolute top-6 left-0 px-5 py-2 text-xs font-bold text-white"
                    style={{ backgroundColor: sys.accent, borderRadius: "0 20px 20px 0" }}
                  >
                    Recommended for you ↓
                  </div>
                )}

                <div className="container-site relative z-10">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isOdd ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: isOdd ? 24 : -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.65 }}
                    >
                      {sys.badge && (
                        <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5" style={{ backgroundColor: sys.accent, color: "#ffffff" }}>
                          {sys.badge}
                        </span>
                      )}
                      <h2 className="font-display font-bold leading-[0.9] mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E" }}>
                        {sys.headline}
                      </h2>
                      <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(12,31,46,0.58)", maxWidth: "44ch" }}>
                        {sys.desc}
                      </p>
                      <ul className="space-y-2.5 mb-10">
                        {sys.solves.map(s => (
                          <li key={s} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: sys.accent }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-5">
                        <Link
                          href={sys.href}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
                          style={{ backgroundColor: sys.accent, color: "#ffffff", boxShadow: `0 4px 20px ${sys.accent}35` }}
                        >
                          Learn more <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/contact" className="text-sm font-medium" style={{ color: "rgba(12,31,46,0.38)" }}>
                          or get tested free →
                        </Link>
                      </div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                      initial={{ opacity: 0, x: isOdd ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.65, delay: 0.1 }}
                      className={`relative flex items-center justify-center ${isOdd ? "lg:order-1" : ""}`}
                      style={{ minHeight: 360 }}
                    >
                      {/* Large decorative circle behind product */}
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: 320,
                          height: 320,
                          backgroundColor: `${sys.accent}0D`,
                          border: `1px solid ${sys.accent}20`,
                        }}
                      />
                      <div
                        className="absolute rounded-full"
                        style={{ width: 240, height: 240, backgroundColor: `${sys.accent}08` }}
                      />

                      {/* Product image */}
                      <Image
                        src={sys.img}
                        alt={sys.name}
                        width={260}
                        height={300}
                        className="object-contain relative z-10"
                        style={{ maxHeight: 280, filter: `drop-shadow(0 12px 36px ${sys.accent}35)` }}
                      />

                      {/* Otter character — floating corner */}
                      <div className="absolute bottom-0 right-0 z-20" style={{ width: 110 }}>
                        <Image src={sys.otter} alt="" width={110} height={130} className="object-contain w-full" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {/* Wave into cost chart */}
      <Wave from="#ffffff" to="#07111A" variant="splash" height={80} />

      {/* ── 5-YEAR COST CHART ──────────────────────────────────────────────── */}
      <section ref={chartRef} className="py-24 md:py-32" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={chartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>5-year cost comparison</p>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#ffffff", lineHeight: 0.95 }}>
              The system pays for itself.<br />
              <span style={{ color: "#12BDFB" }}>Usually by year two.</span>
            </h2>
          </motion.div>

          <div className="mx-auto" style={{ maxWidth: 680 }}>
            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={chartInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-8 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Without treatment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#12BDFB" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>With Aqua Otter</span>
              </div>
            </motion.div>

            {/* SVG Chart */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(18,189,251,0.1)" }}>
              <svg viewBox="0 0 520 300" style={{ width: "100%", display: "block" }}>
                {/* Grid lines */}
                {[260, 191, 123, 54].map((y) => (
                  <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}

                {/* Y-axis labels */}
                {[["$0", 260], ["$2k", 191], ["$4k", 123], ["$6k", 54]].map(([label, y]) => (
                  <text key={label} x="42" y={Number(y) + 4} textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">{label}</text>
                ))}

                {/* X-axis labels */}
                {["Yr 0", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"].map((label, i) => (
                  <text key={label} x={50 + i * 84} y="278" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">{label}</text>
                ))}

                {/* Break-even vertical line */}
                <motion.line
                  x1="188" y1="54" x2="188" y2="260"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  initial={{ opacity: 0 }}
                  animate={chartInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.4 }}
                />
                <motion.text
                  x="192" y="75"
                  fill="rgba(255,255,255,0.28)"
                  fontSize="8"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={chartInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.6 }}
                >
                  Break-even
                </motion.text>

                {/* Without treatment area fill */}
                <motion.path
                  d="M 50,260 L 134,219 L 218,178 L 302,137 L 386,95 L 470,54 L 470,260 Z"
                  fill="rgba(245,158,11,0.07)"
                  initial={{ opacity: 0 }}
                  animate={chartInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />

                {/* With Aqua Otter area fill */}
                <motion.path
                  d="M 50,198 L 134,195 L 218,191 L 302,188 L 386,185 L 470,181 L 470,260 Z"
                  fill="rgba(18,189,251,0.07)"
                  initial={{ opacity: 0 }}
                  animate={chartInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                />

                {/* Without treatment line */}
                <motion.path
                  d="M 50,260 L 134,219 L 218,178 L 302,137 L 386,95 L 470,54"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={chartInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                />

                {/* With Aqua Otter line */}
                <motion.path
                  d="M 50,198 L 134,195 L 218,191 L 302,188 L 386,185 L 470,181"
                  fill="none"
                  stroke="#12BDFB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={chartInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                />

                {/* End-point dots */}
                <motion.circle cx="470" cy="54" r="4" fill="#f59e0b"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={chartInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.7 }}
                />
                <motion.circle cx="470" cy="181" r="4" fill="#12BDFB"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={chartInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.9 }}
                />

                {/* End labels */}
                <motion.text x="476" y="58" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold"
                  initial={{ opacity: 0 }} animate={chartInView ? { opacity: 1 } : {}} transition={{ delay: 1.8 }}>
                  $6,000
                </motion.text>
                <motion.text x="476" y="185" fill="#12BDFB" fontSize="9" fontFamily="monospace" fontWeight="bold"
                  initial={{ opacity: 0 }} animate={chartInView ? { opacity: 1 } : {}} transition={{ delay: 2.0 }}>
                  $2,300
                </motion.text>
              </svg>
            </div>

            {/* Callout stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={chartInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { value: "~18 mo", label: "Average break-even" },
                { value: "$3,700+", label: "5-year savings" },
                { value: "$0", label: "Service calls covered" },
              ].map(stat => (
                <div key={stat.label} className="text-center rounded-xl py-4 px-3" style={{ backgroundColor: "rgba(18,189,251,0.06)", border: "1px solid rgba(18,189,251,0.12)" }}>
                  <p className="font-display font-bold mb-0.5" style={{ fontSize: "1.4rem", color: "#12BDFB", letterSpacing: "-0.03em" }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave into CTA */}
      <Wave from="#07111A" to="#0C1F2E" variant="gentle" height={50} />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-28" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff", lineHeight: 0.9 }}>
                Still not sure<br /><span style={{ color: "#12BDFB" }}>what you need?</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "38ch", lineHeight: 1.7 }}>
                We test your water first. Free, in your home, 30 minutes. Then we tell you exactly which system — and why.
              </p>
            </div>
            <div className="flex flex-col gap-4 flex-shrink-0">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}>
                Get Free Water Test <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+13179835919" className="text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>or call (317) 983-5919</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
