"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wave from "@/components/ui/Wave";

const IndianaHardnessMap = dynamic(() => import("@/components/ui/IndianaHardnessMap"), {
  ssr: false,
  loading: () => <div style={{ height: 480, borderRadius: 24, backgroundColor: "#EEF5FF" }} />,
});

const findings = [
  { n: "01", label: "spent per year on bottled water in the average hard-water household", stat: "$800+" },
  { n: "02", label: "shorter appliance lifespan caused by scale buildup inside pipes and water heaters", stat: "30%" },
  { n: "03", label: "drop in water heater efficiency for every 1/4 inch of scale on heating elements", stat: "29%" },
  { n: "04", label: "more soap, shampoo, and detergent needed because hard water won't lather", stat: "2×" },
  { n: "05", label: "of Indiana homes have hard water above 7 grains per gallon — most above 15", stat: "85%" },
];

const scienceSteps = [
  {
    n: "01",
    badge: "Step 1",
    title: "Hard water enters the resin tank",
    desc: "Water carrying dissolved calcium and magnesium ions flows into the softener tank, which is packed with thousands of resin beads carrying a sodium charge. The minerals are attracted to the resin on contact.",
  },
  {
    n: "02",
    badge: "Step 2",
    title: "Ion exchange captures the minerals",
    desc: "Calcium and magnesium ions bind to the resin beads. Sodium ions are released into the water in their place. The hard minerals are physically captured inside the tank — not filtered around, but removed.",
  },
  {
    n: "03",
    badge: "Step 3",
    title: "Soft water flows to every tap",
    desc: "Softened water exits the tank and distributes throughout your home. No scale forming on heating elements, no mineral buildup in pipes, no film on dishes or skin. The resin regenerates automatically overnight.",
  },
];

const products = [
  {
    name: "Water Softener",
    badge: "Most Popular",
    img: "/client/Softener_RB.png",
    desc: "Single-tank ion exchange softener for 1 to 4 person households. High-efficiency demand-initiated regeneration uses salt only when needed — not on a fixed schedule — minimizing operating cost.",
    specs: [
      ["Capacity", "48,000 grain"],
      ["Regeneration", "Demand-initiated"],
      ["Valve", "High-efficiency"],
      ["Household Size", "1 to 4 persons"],
    ] as [string, string][],
  },
  {
    name: "Twin Softener",
    badge: "Best for Large Homes",
    img: "/client/Twin_Softener_RB.png",
    desc: "Dual alternating tanks deliver continuous soft water 24 hours a day, 7 days a week — even during regeneration. One tank regenerates while the other stays online. Ideal for larger families with high demand.",
    specs: [
      ["Capacity", "96,000 grain"],
      ["Tanks", "Dual alternating"],
      ["Soft Water", "Uninterrupted 24/7"],
      ["Household Size", "4+ persons"],
    ] as [string, string][],
  },
  {
    name: "Dual City Softener",
    badge: "Best Value Combo",
    img: "/client/Dual_City_Softener___Filtration-removebg-preview__1_.png",
    desc: "Softening and whole-home carbon filtration in a single unit. Removes hardness and chlorine simultaneously in one installation footprint. Eliminates the chlorine taste and smell common in city water.",
    specs: [
      ["Function", "Softening + filtration"],
      ["Removes", "Chlorine, chloramines"],
      ["Footprint", "Single installation"],
      ["Best For", "City water"],
    ] as [string, string][],
  },
  {
    name: "Tannin Softener",
    badge: "Well Water Specialty",
    img: "/client/Tannin_Softener_Solution_RB.png",
    desc: "Purpose-built for well water with high tannin content. Removes iron, hardness, and the tannins that cause tea-colored or brownish water. Problems that standard softeners cannot handle alone.",
    specs: [
      ["Media", "Ion exchange resin"],
      ["Removes", "Tannins, iron, hardness"],
      ["Water Color", "Tea-colored wells"],
      ["Best For", "Well water specialty"],
    ] as [string, string][],
  },
  {
    name: "Quintex 5 (No-Salt)",
    badge: "No-Salt Alternative",
    img: "/client/Quintex_5_RB-removebg-preview__1_.png",
    desc: "Food-grade phosphate conditioner for homes that prefer no salt, no drain, no electricity. Outperforms traditional TAC media at preventing scale while leaving the beneficial minerals in your water.",
    specs: [
      ["Media", "Food-grade phosphate"],
      ["Salt", "None required"],
      ["Maintenance", "Zero ongoing"],
      ["Best For", "Moderately hard water, no-salt preference"],
    ] as [string, string][],
  },
];

export default function WaterSoftenerPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const findingsRef = useRef<HTMLDivElement>(null);
  const findingsInView = useInView(findingsRef, { once: true, margin: "-80px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

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
          clipPath: "polygon(0 0, 100% 0, 100% 91%, 0 100%)",
          marginBottom: -50,
        }}
      >
        <video autoPlay loop muted playsInline poster="/videos/system-softener-poster.jpg" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.28 }}>
          <source src="/videos/system-softener.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 65% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(7,17,26,0.85) 0%, rgba(7,17,26,0.4) 55%, rgba(7,17,26,0.1) 100%)" }} />

        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Water Softeners</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "#12BDFB" }}>
                <span className="text-xs font-bold" style={{ color: "#07111A" }}>Most Popular System</span>
              </div>
              <h1
                className="font-display font-bold leading-[0.87] tracking-tight mb-6"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "#ffffff" }}
              >
                Hard water<br />ends here.
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "42ch" }}>
                Ion exchange removes calcium and magnesium at the source. Scale stops forming. Appliances last longer. Skin feels better. You notice the difference in the first week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#12BDFB", color: "#07111A", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
                >
                  Get Free Water Test <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+13179835919"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full border text-sm font-medium"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
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
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(18,189,251,0.12) 0%, transparent 70%)" }} />
                <div className="absolute inset-[-30px] rounded-full animate-pulse" style={{ background: "radial-gradient(circle, rgba(18,189,251,0.04) 0%, transparent 60%)" }} />
                <Image
                  src="/client/Softener_RB.png"
                  alt="Water Softener System"
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
                  style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                >
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>85%</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>of IN homes have hard water</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.95 }}
                  className="absolute -top-2 -right-6 rounded-2xl border px-5 py-3.5 text-center"
                  style={{ backgroundColor: "rgba(10,24,37,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(18,189,251,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                >
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>Week 1</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>families notice results</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM PHOTO */}
      <section className="relative overflow-hidden" style={{ height: "50vh", minHeight: 340 }}>
        <Image src="/client/hero-hard-water.png" alt="Hard water scale damage" fill className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(7,17,26,0.82) 0%, rgba(7,17,26,0.4) 50%, transparent 100%)" }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container-site">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#f97316" }}>
              This is what hard water does
            </p>
            <p
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#ffffff", maxWidth: "16ch" }}
            >
              Scale. Stains. Damage. Every single day.
            </p>
          </div>
        </div>
      </section>

      <Wave from="#07111A" to="#ffffff" variant="splash" height={80} />

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
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(12,31,46,0.35)" }}>
                The Real Cost — Hard Water Data
              </p>
              <h2
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E" }}
              >
                What you&apos;re paying for.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={findingsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs hidden md:block"
              style={{ color: "rgba(12,31,46,0.3)", maxWidth: "22ch", textAlign: "right", lineHeight: 1.6 }}
            >
              Industry data from U.S. Geological Survey and appliance efficiency studies.
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
                <p className="text-sm flex-1" style={{ color: "rgba(12,31,46,0.62)", lineHeight: 1.55 }}>
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

      {/* FULL-BLEED LIFESTYLE PHOTO */}
      <div className="relative overflow-hidden" style={{ height: "clamp(260px, 38vw, 520px)" }}>
        <Image
          src="/client/service-family-sink.jpg"
          alt="Family enjoying soft water at the kitchen sink"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,17,26,0.72) 0%, rgba(7,17,26,0.3) 55%, transparent 100%)" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#12BDFB" }}>The difference</p>
            <p className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "#ffffff", maxWidth: "14ch" }}>
              Soft water.<br />You&apos;ll notice<br />day one.
            </p>
          </div>
        </div>
      </div>

      <Wave from="#ffffff" to="#F0F8FF" variant="gentle" height={60} />

      {/* INDIANA HARDNESS MAP */}
      <section className="py-28 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <IndianaHardnessMap />
        </div>
      </section>

      <Wave from="#F0F8FF" to="#0C1F2E" variant="gentle" height={70} />

      {/* TYPOGRAPHIC STEPS — HOW IT WORKS */}
      <section ref={stepsRef} className="py-24 md:py-32" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(18,189,251,0.6)" }}>
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
            Ion exchange.<br />
            <span style={{ color: "rgba(255,255,255,0.28)" }}>Three steps. Permanent results.</span>
          </motion.h2>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {scienceSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
                      <span className="text-xs font-semibold" style={{ color: "#12BDFB" }}>{step.badge}</span>
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
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "55ch" }}>
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(12,31,46,0.35)" }}>
                Our Systems
              </p>
              <h2
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E" }}
              >
                The right softener<br />for your home.
              </h2>
            </div>
            <p
              className="text-sm hidden md:block"
              style={{ color: "rgba(12,31,46,0.45)", maxWidth: "32ch", lineHeight: 1.6 }}
            >
              We test your hardness level first. Every system is sized to match your household demand.
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
                  <div className="inline-flex items-center px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "#12BDFB" }}>
                    <span className="text-xs font-bold" style={{ color: "#07111A" }}>{products[activeProduct].badge}</span>
                  </div>
                  <h3
                    className="font-display font-bold mb-2"
                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "#0C1F2E", letterSpacing: "-0.02em", lineHeight: 1.1 }}
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
                      style={{ maxHeight: 180, filter: "drop-shadow(0 8px 24px rgba(18,189,251,0.25))" }}
                    />
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.58)" }}>
                    {products[activeProduct].desc}
                  </p>
                  <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(12,31,46,0.08)" }}>
                    {products[activeProduct].specs.map(([label, value], i) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#F8FBFF" : "#ffffff",
                          borderBottom: i < products[activeProduct].specs.length - 1 ? "1px solid rgba(12,31,46,0.06)" : "none",
                        }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(12,31,46,0.38)" }}>
                          {label}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: "#0C1F2E" }}>{value}</span>
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
            <div className="flex flex-col gap-1.5" style={{ backgroundColor: "#EAF6FE", padding: "1rem" }}>
              {products.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActiveProduct(i)}
                  className="text-left rounded-2xl p-5 transition-all duration-200"
                  style={{
                    backgroundColor: i === activeProduct ? "#ffffff" : "transparent",
                    boxShadow: i === activeProduct ? "0 2px 16px rgba(12,31,46,0.08)" : "none",
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
                      <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: "#12BDFB" }} />
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

              <div className="rounded-2xl p-5 mt-auto" style={{ backgroundColor: "#0C1F2E" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#ffffff" }}>
                  Not sure which system fits your home?
                </p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
                  We test your hardness on-site before recommending anything. Free test, no obligation.
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

          {/* Mobile stacked cards */}
          <div className="flex flex-col gap-5 lg:hidden">
            {products.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-3xl overflow-hidden border"
                style={{ borderColor: "rgba(18,189,251,0.12)", boxShadow: "0 4px 24px rgba(12,31,46,0.07)" }}
              >
                <div className="relative flex items-center justify-center" style={{ backgroundColor: "#EAF6FE", height: 200 }}>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#07111A" }}>
                    {p.badge}
                  </div>
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={160}
                    height={160}
                    className="object-contain"
                    style={{ maxHeight: 160, filter: "drop-shadow(0 8px 20px rgba(18,189,251,0.2))" }}
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: "1.2rem", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
                    {p.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>{p.desc}</p>
                  <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(12,31,46,0.08)" }}>
                    {p.specs.map(([label, value], i) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-4 py-2.5"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#F8FBFF" : "#ffffff",
                          borderBottom: i < p.specs.length - 1 ? "1px solid rgba(12,31,46,0.06)" : "none",
                        }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(12,31,46,0.38)" }}>{label}</span>
                        <span className="text-xs font-semibold" style={{ color: "#0C1F2E" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#07111A" variant="splash" height={80} />

      {/* TESTIMONIAL */}
      <section className="py-28" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
              &ldquo;We had orange stains on everything. Aqua Otter came out, tested our well water, and installed a system that weekend. Two months later, not a single stain. I wish we&apos;d done it years ago.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-white">Mike &amp; Sarah T.</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>
                Noblesville, IN — Water Softener + Well Filtration
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
            Find out if you need<br />a water softener.
          </h2>
          <p
            className="mb-10"
            style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto 2.5rem" }}
          >
            Free in-home water test. We test first, recommend second. No pressure, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
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
