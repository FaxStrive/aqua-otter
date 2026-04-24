"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Wave from "@/components/ui/Wave";
import PhosphateDiagram from "@/components/sections/PhosphateDiagram";

const findings = [
  { n: "01", label: "brine discharge — zero environmental impact", stat: "Zero" },
  { n: "02", label: "pounds of salt purchased or hauled per year", stat: "0 lbs" },
  { n: "03", label: "scale prevention on pipes and appliances", stat: "99%" },
  { n: "04", label: "of healthy minerals retained in your water", stat: "100%" },
  { n: "05", label: "years of operation with virtually no maintenance", stat: "3+" },
  { n: "06", label: "chemical and salt free operation, guaranteed", stat: "100%" },
];

const scienceSteps = [
  {
    n: "01",
    title: "Hard water flows through TAC media",
    desc: "Water containing dissolved calcium and magnesium passes through a tank of template-assisted crystallization nucleation sites — tiny polymer beads with a specific surface structure.",
  },
  {
    n: "02",
    title: "Minerals crystallize into micro-particles",
    desc: "The TAC sites cause dissolved hard minerals to form stable, microscopic crystals. These crystals remain in the water but can no longer attach to surfaces — scale formation stops completely.",
  },
  {
    n: "03",
    title: "Conditioned water protects your home",
    desc: "The mineral crystals pass harmlessly through your pipes, fixtures, and appliances without depositing scale. No salt. No chemicals. No brine waste. The system runs indefinitely with no refills.",
  },
];

const products = [
  {
    name: "Quintex 5",
    badge: "Flagship",
    desc: "Our flagship no-salt water conditioner. Food-grade phosphate technology outperforms traditional TAC media at preventing scale while leaving the beneficial minerals in your water. Installs clean, runs silent, zero maintenance.",
    img: "/client/Quintex_5_RB-removebg-preview__1_.png",
    specs: ["Food-grade phosphate media", "Outperforms traditional TAC", "Retains beneficial minerals", "No electricity, no drain, no maintenance"],
  },
  {
    name: "Quintex 5 + Carbon",
    badge: "Complete City Water",
    desc: "The Quintex 5 paired with a carbon pre-filter. Conditions hard water and strips chlorine, chloramine, taste, and odor in one footprint. The most complete no-salt setup for city water.",
    img: "/client/Quintex_5_RB.png",
    specs: ["Food-grade phosphate conditioning", "Full chlorine and chloramine removal", "Taste and odor reduction", "Single install footprint"],
  },
  {
    name: "Water Conditioner Cartridge",
    badge: "Modular",
    desc: "Replaceable food-grade phosphate cartridge for use inside the AiO or other Aqua Otter housings. Ideal for well water setups where you want no-salt conditioning alongside iron and sulfur removal.",
    img: "/client/Water_Conditioner_Cartridge.png",
    specs: ["Drop-in cartridge format", "Compatible with AiO housings", "Annual replacement only", "Pairs with well water systems"],
  },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    prevRef.current = value;
    if (start === end) return;

    let step = 0;
    const steps = 25;
    const duration = 550;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (step >= steps) { setDisplay(end); clearInterval(timer); }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}

export default function NoSaltPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const findingsRef = useRef<HTMLDivElement>(null);
  const findingsInView = useInView(findingsRef, { once: true, margin: "-60px" });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
  const calcRef = useRef<HTMLDivElement>(null);
  const calcInView = useInView(calcRef, { once: true, margin: "-80px" });

  const [activeProduct, setActiveProduct] = useState(0);
  const [people, setPeople] = useState(3);

  // Salt usage calc: ~20 + 14 lbs/person/month
  const lbsPerMonth = 20 + people * 14;
  const lbsPerYear = lbsPerMonth * 12;
  const bagsPerYear = Math.ceil(lbsPerYear / 40);
  const annualCost = Math.round(lbsPerYear * 0.225);

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
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No-Salt Hard Water</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "#12BDFB" }}>
                <span className="text-xs font-bold" style={{ color: "#07111A" }}>Salt-Free Alternative</span>
              </div>
              <h1 className="font-display font-bold leading-[0.87] tracking-tight mb-6" style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", color: "#ffffff" }}>
                No salt.<br />No hassle.<br />No compromise.
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "42ch" }}>
                Template-assisted crystallization prevents scale without removing minerals, discharging brine, or requiring a single bag of salt. Ever.
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
                <Image src="/client/Quintex_5_RB-removebg-preview__1_.png" alt="Aqua Otter Quintex 5 No-Salt Conditioner" width={400} height={460} className="object-contain w-full h-full relative z-10" style={{ filter: "drop-shadow(0 16px 48px rgba(18,189,251,0.25))" }} />
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-4 -left-8 rounded-2xl border px-5 py-3.5" style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>Zero</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>brine discharge</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.95 }} className="absolute -top-2 -right-6 rounded-2xl border px-5 py-3.5 text-center" style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <p className="font-display font-bold" style={{ fontSize: "1.1rem", color: "#12BDFB", lineHeight: 1.2 }}>Virtually</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>maintenance-free</p>
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
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#f97316" }}>Why homeowners are switching</p>
              <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E", lineHeight: 0.95 }}>
                Soft water results.<br />Without the salt bag.
              </h2>
            </div>
            <div className="flex-shrink-0 sm:text-right">
              <div className="inline-flex items-center gap-2 border rounded-lg px-4 py-2.5" style={{ borderColor: "rgba(249,115,22,0.3)", backgroundColor: "#FFF7ED" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#f97316" }} />
                <span className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: "#f97316" }}>Proven Performance</span>
              </div>
              <p className="text-xs mt-2" style={{ color: "rgba(12,31,46,0.38)" }}>Lab-tested scale prevention</p>
            </div>
          </div>
          <div>
            {findings.map((f, i) => (
              <motion.div key={f.n} initial={{ opacity: 0, x: -16 }} animate={findingsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-center gap-6 md:gap-10"
                style={{ padding: "1.75rem 0", borderBottom: i < findings.length - 1 ? "1px solid rgba(12,31,46,0.07)" : "none", ...(i === findings.length - 1 && { borderLeft: "3px solid #12BDFB", paddingLeft: "1.5rem", marginLeft: "-1.5rem" }) }}>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] flex-shrink-0 hidden sm:block" style={{ color: "rgba(12,31,46,0.28)", minWidth: 72 }}>Finding {f.n}</span>
                <p className="text-sm flex-1" style={{ color: "rgba(12,31,46,0.62)", lineHeight: 1.55 }}>{f.label}</p>
                <p className="font-display font-bold flex-shrink-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E", letterSpacing: "-0.03em", lineHeight: 1 }}>{f.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#ffffff" to="#0C1F2E" variant="gentle" height={70} />

      {/* HOW IT WORKS — typographic steps */}
      <section ref={stepsRef} className="py-28 md:py-40" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}} className="mb-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: "#12BDFB" }}>The science</span>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff", lineHeight: 0.9 }}>
              How template-assisted<br />crystallization works.
            </h2>
          </motion.div>
          <div>
            {scienceSteps.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 24 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="grid gap-8 md:gap-12"
                style={{ gridTemplateColumns: "clamp(80px, 12vw, 140px) 1fr", alignItems: "flex-start", padding: "3rem 0", borderBottom: i < scienceSteps.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
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

      <Wave from="#0C1F2E" to="#ffffff" variant="gentle" height={70} />

      {/* SALT SAVINGS CALCULATOR */}
      <section ref={calcRef} className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-3" style={{ color: "rgba(18,189,251,0.7)" }}>
              Salt Savings Calculator
            </span>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E", lineHeight: 0.9 }}>
              See what you stop buying.
            </h2>
            <p className="mt-4 mx-auto text-base" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "42ch" }}>
              Based on typical household usage compared to a traditional ion exchange salt softener.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl mx-auto mb-12"
          >
            {/* Slider */}
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "#F0F8FF", border: "1px solid rgba(18,189,251,0.12)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <label className="text-sm font-semibold" style={{ color: "#0C1F2E" }}>
                  Household size
                </label>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: "#12BDFB" }}
                >
                  <span className="font-display font-bold text-sm" style={{ color: "#07111A" }}>
                    {people} {people === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={6}
                value={people}
                onChange={e => setPeople(Number(e.target.value))}
                className="w-full"
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  height: 6,
                  borderRadius: 99,
                  background: `linear-gradient(to right, #12BDFB ${((people - 1) / 5) * 100}%, rgba(18,189,251,0.18) ${((people - 1) / 5) * 100}%)`,
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              <div className="flex justify-between mt-3">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <span
                    key={n}
                    className="text-xs font-semibold cursor-pointer"
                    style={{ color: n === people ? "#12BDFB" : "rgba(12,31,46,0.28)" }}
                    onClick={() => setPeople(n)}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Metric cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                value: lbsPerYear,
                prefix: "",
                suffix: " lbs",
                label: "of salt per year",
                sub: "never purchased",
                color: "#12BDFB",
              },
              {
                value: annualCost,
                prefix: "$",
                suffix: "",
                label: "saved annually",
                sub: "salt cost eliminated",
                color: "#12BDFB",
              },
              {
                value: bagsPerYear,
                prefix: "",
                suffix: " bags",
                label: "of salt",
                sub: "never hauled inside",
                color: "#12BDFB",
              },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="rounded-3xl p-8 text-center"
                style={{ backgroundColor: "#0C1F2E" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <p
                  className="font-display font-bold leading-none mb-3"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", color: metric.color, letterSpacing: "-0.03em" }}
                >
                  <AnimatedNumber value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </p>
                <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {metric.label}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {metric.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={calcInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          >
            {["Zero salt, forever", "No brine waste", "100% minerals retained"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#12BDFB" }} />
                <span className="text-xs font-semibold" style={{ color: "rgba(12,31,46,0.55)" }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Wave from="#ffffff" to="#07111A" variant="double" height={60} />

      <PhosphateDiagram />

      <Wave from="#07111A" to="#F0F8FF" variant="gentle" height={60} />

      {/* SHOWROOM FLOOR */}
      <section className="py-28 md:py-40" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="mb-12">
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E", lineHeight: 0.9 }}>Our no-salt systems.</h2>
            <p className="mt-4" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "42ch" }}>We test your hardness level and recommend the right configuration for your water chemistry.</p>
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
                    {p.specs.map(s => (<li key={s} className="flex items-center gap-2 text-xs" style={{ color: "rgba(12,31,46,0.5)" }}><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#12BDFB" }} />{s}</li>))}
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
            <div className="flex justify-center gap-1 mb-8">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#fbbf24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>))}</div>
            <blockquote className="font-display font-light italic leading-[1.6] mb-10" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "rgba(255,255,255,0.75)" }}>
              &ldquo;Best purchase we have made. No issues in over three years. No salt to buy, no maintenance, and our fixtures look brand new. It just works and you never have to think about it.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">Shelly Ganger</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>Google Review — No-Salt Hard Water System</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Wave from="#07111A" to="#ffffff" variant="sharp" height={80} />

      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E", lineHeight: 0.9 }}>
            Stop hauling salt.<br />Start protecting your home.
          </h2>
          <p className="mb-10" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto 2.5rem" }}>
            Free in-home water hardness test. We find out exactly how hard your water is and show you the right solution.
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
