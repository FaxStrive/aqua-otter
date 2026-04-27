"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wave from "@/components/ui/Wave";

const values = [
  { label: "Test first.", sub: "Never guess." },
  { label: "No pressure.", sub: "Ever." },
  { label: "Lifetime warranty.", sub: "On every system." },
  { label: "Made in USA.", sub: "Every product." },
];

const stats = [
  { value: "1999", label: "Founded", sub: "Indiana" },
  { value: "5,000+", label: "Families served", sub: "6 states" },
  { value: "25+", label: "Years of expertise", sub: "Water treatment" },
  { value: "5.0★", label: "Google rating", sub: "BBB A+" },
];

const timeline = [
  { year: "1999", event: "Aqua Otter founded in Indiana. First 10 systems installed in the Indianapolis area." },
  { year: "2005", event: "Expanded to Michigan. Well water treatment becomes our specialty." },
  { year: "2012", event: "Crossed 500 families served. Added reverse osmosis and no-salt systems." },
  { year: "2018", event: "Expanded to Ohio, Kentucky, and Tennessee. Over 1,000 families treated." },
  { year: "2022", event: "Added North Carolina. 2,000+ families. Regional expansion with the same test-first playbook." },
  { year: "2024", event: "5,000+ families served. Lifetime warranty extended to all systems." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  const [activeChapter, setActiveChapter] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > activeChapter ? 1 : -1);
    setActiveChapter(idx);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <>
      {/* FULL-SCREEN PARALLAX HERO */}
      <section ref={heroRef} className="relative flex items-end overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "#07111A" }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image src="/client/about-family-hero.jpg" alt="Aqua Otter family" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.97) 0%, rgba(7,17,26,0.5) 50%, rgba(7,17,26,0.15) 100%)" }} />
        </motion.div>

        <motion.div className="relative z-10 container-site pb-20 md:pb-32 w-full" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8" style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "rgba(18,189,251,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>The regional water experts</span>
            </div>
            <h1 className="font-display font-bold leading-[0.85] tracking-tight mb-6" style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "#ffffff" }}>
              Your water.<br /><span style={{ color: "#12BDFB" }}>Our obsession.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", maxWidth: "46ch", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Two and a half decades. 5,000 homes. Six states. The only people in the region who test your water first and design your system second.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Wave from="#07111A" to="#0C1F2E" variant="gentle" height={60} />

      {/* STATS BAR */}
      <section style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site py-16 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="font-display font-bold leading-none mb-2" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#12BDFB", letterSpacing: "-0.03em" }}>{s.value}</p>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#0C1F2E" to="#ffffff" variant="sharp" height={80} />

      {/* STORY */}
      <section ref={storyRef} className="py-28 md:py-40" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -32 }} animate={storyInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="relative">
                <div className="absolute -inset-8 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 60%, rgba(18,189,251,0.08) 0%, transparent 65%)" }} />
                <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(18,189,251,0.1)", boxShadow: "0 24px 64px rgba(12,31,46,0.1)" }}>
                  <Image src="/client/family-water.jpg" alt="Family enjoying clean water" width={640} height={480} className="w-full object-cover" style={{ height: 420 }} />
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} animate={storyInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.12 }}>
              <h2 className="font-display font-bold leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#0C1F2E" }}>Regional experts. One principle.</h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.62)" }}>
                <p>Aqua Otter started in 1999 in Indiana with a belief that was radical at the time: <strong style={{ color: "#0C1F2E" }}>test the water first. Recommend second.</strong> Every other company showed up with a system to sell. We showed up with a test kit and a lot of questions.</p>
                <p>Two and a half decades later, nothing about that has changed. We carry only products manufactured in the USA. Our technicians install them. No subcontractors. Free installation on every system. Lifetime warranty on every product. We now serve Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina with the same local care we started with in Noblesville.</p>
                <p>Our tagline is real: <strong style={{ color: "#0C1F2E" }}>&ldquo;The LAST Water System You Will EVER Need.&rdquo;</strong></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Wave from="#ffffff" to="#F0F8FF" variant="gentle" height={60} />

      {/* VALUES — Typographic treatment */}
      <section ref={valuesRef} className="py-20 md:py-32" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} className="text-xs font-semibold uppercase tracking-[0.2em] mb-12" style={{ color: "#12BDFB" }}>How we operate</motion.p>
          <div className="divide-y" style={{ borderColor: "rgba(18,189,251,0.12)" }}>
            {values.map((v, i) => (
              <motion.div key={v.label} initial={{ opacity: 0, x: -24 }} animate={valuesInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.1 }} className="flex items-baseline justify-between py-8">
                <span className="font-display font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>{v.label}</span>
                <span className="font-display font-light text-lg hidden sm:block" style={{ color: "rgba(12,31,46,0.28)" }}>{v.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#0C1F2E" variant="double" height={70} />

      {/* TIMELINE — interactive chapter navigator */}
      <section ref={timelineRef} className="py-28 md:py-40" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={timelineInView ? { opacity: 1, y: 0 } : {}} className="font-display font-bold mb-16" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", lineHeight: 0.9 }}>
            25 years.<br /><span style={{ color: "#12BDFB" }}>One chapter at a time.</span>
          </motion.h2>

          {/* Progress bar */}
          <div className="w-full h-px mb-12" style={{ backgroundColor: "rgba(18,189,251,0.12)" }}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#12BDFB" }}
              animate={{ width: `${((activeChapter + 1) / timeline.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>

          {/* Card area */}
          <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
            {/* Ghost year */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.span
                  key={timeline[activeChapter].year + "-ghost"}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "clamp(7rem, 18vw, 15rem)", color: "rgba(18,189,251,0.04)", letterSpacing: "-0.05em" }}
                >
                  {timeline[activeChapter].year}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Chapter card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeChapter}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "1px solid rgba(18,189,251,0.2)" }}>
                    <span className="font-display font-bold" style={{ fontSize: "0.75rem", color: "#12BDFB", letterSpacing: "0.05em" }}>{timeline[activeChapter].year}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "52ch" }}>
                    {timeline[activeChapter].event}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(18,189,251,0.5)" }}>
                    Chapter {activeChapter + 1} of {timeline.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-14">
            {/* Dot pills */}
            <div className="flex items-center gap-2">
              {timeline.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Chapter ${i + 1}: ${timeline[i].year}`}
                  style={{
                    height: 8,
                    width: i === activeChapter ? 24 : 8,
                    borderRadius: 4,
                    backgroundColor: i === activeChapter ? "#12BDFB" : "rgba(18,189,251,0.2)",
                    transition: "all 0.3s ease",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => goTo(Math.max(0, activeChapter - 1))}
                disabled={activeChapter === 0}
                whileHover={activeChapter > 0 ? { scale: 1.08 } : {}}
                whileTap={activeChapter > 0 ? { scale: 0.94 } : {}}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  border: "1px solid rgba(18,189,251,0.25)",
                  backgroundColor: "rgba(18,189,251,0.06)",
                  color: activeChapter === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)",
                  cursor: activeChapter === 0 ? "default" : "pointer",
                }}
                aria-label="Previous chapter"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
              <motion.button
                onClick={() => goTo(Math.min(timeline.length - 1, activeChapter + 1))}
                disabled={activeChapter === timeline.length - 1}
                whileHover={activeChapter < timeline.length - 1 ? { scale: 1.08 } : {}}
                whileTap={activeChapter < timeline.length - 1 ? { scale: 0.94 } : {}}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  border: "1px solid rgba(18,189,251,0.25)",
                  backgroundColor: activeChapter < timeline.length - 1 ? "rgba(18,189,251,0.12)" : "rgba(18,189,251,0.04)",
                  color: activeChapter === timeline.length - 1 ? "rgba(255,255,255,0.18)" : "#12BDFB",
                  cursor: activeChapter === timeline.length - 1 ? "default" : "pointer",
                }}
                aria-label="Next chapter"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <Wave from="#0C1F2E" to="#ffffff" variant="splash" height={80} />

      {/* CERTS */}
      <section className="py-12 border-b" style={{ borderColor: "rgba(18,189,251,0.08)", backgroundColor: "#ffffff" }}>
        <div className="container-site flex flex-wrap items-center justify-center gap-10">
          {[["🏆","BBB A+ Accredited"],["✓","Licensed & Insured"],["🇺🇸","Made in USA Products"],["🔧","Free Installation"],["⭐","5.0 Google Rating"]].map(([emoji, text]) => (
            <div key={text} className="flex items-center gap-2.5">
              <span className="text-lg">{emoji}</span>
              <span className="text-sm font-medium" style={{ color: "rgba(12,31,46,0.55)" }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0C1F2E" }}>Meet us at your door.</h2>
          <p className="mb-10 mx-auto" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", lineHeight: 1.7 }}>Schedule a free water test and see how we work firsthand. No pressure, no obligation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(18,189,251,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(18,189,251,0.35)"; }}>
            Get Your Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
