"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wave from "@/components/ui/Wave";
import HouseDiagram from "@/components/sections/HouseDiagram";

const steps = [
  {
    n: "01", title: "Free In-Home Water Test", headline: "We test first.\nAlways.",
    sub: "30 minutes. Your home. Zero cost.",
    desc: "A certified specialist comes to you and runs a comprehensive 12-point panel — hardness, iron, pH, chlorine, TDS, sulfur, manganese, and bacterial indicators. You watch it happen and see every result before we leave.",
    bullets: ["Tests 12+ water quality parameters","No cost, no obligation, no pressure","Results explained clearly in plain language","You see the data — you own it"],
    img: "/client/service-tech-consult.jpg", dark: true,
  },
  {
    n: "02", title: "Custom System Design", headline: "Engineered\nfor your water.",
    sub: "Not a catalog pick.",
    desc: "Your test results drive every single decision. We specify the exact equipment your water chemistry requires — the right tank size, the right media, the right configuration. Written quote. No hidden fees.",
    bullets: ["Sized to your household water usage","Equipment selected from your test data","Combination systems when needed","No upselling — only what your water needs"],
    img: "/client/service-consult.jpg", dark: false,
  },
  {
    n: "03", title: "Expert Installation", headline: "Clean water\nthe same day.",
    sub: "One visit. 2 to 4 hours.",
    desc: "A licensed, insured technician handles everything — plumbing connections, programming, bypass valves, and cleanup. Before we leave, we walk you through exactly how your system works.",
    bullets: ["Free installation on every system","Licensed and insured — no subcontractors","2 to 4 hours from start to finish","Full system walkthrough before we leave"],
    img: "/client/service-plumber.jpg", dark: true,
  },
  {
    n: "04", title: "Backed for Life", headline: "The last system\nyou'll ever need.",
    sub: "Lifetime warranty. Guaranteed.",
    desc: "Your system is covered — parts, valves, electronics, and labor on warranty repairs — for the life of the system. If your water quality is not right after installation, we come back and fix it.",
    bullets: ["Lifetime warranty on all systems","Annual maintenance programs available","Local team — reachable by call or text","Satisfaction guarantee, always"],
    img: "/client/service-tech-handshake.jpg", dark: false,
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const flip = index % 2 !== 0;

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: step.dark ? "#07111A" : "#ffffff", minHeight: "80vh" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(18,189,251,${step.dark ? "0.18" : "0.12"}), transparent)` }} />
      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: flip ? 32 : -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }} className={flip ? "lg:order-2" : ""}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ backgroundColor: "#12BDFB", color: "#07111A" }}>{step.n}</div>
              <span className="text-xs font-medium" style={{ color: step.dark ? "rgba(255,255,255,0.3)" : "rgba(12,31,46,0.35)" }}>{step.sub}</span>
            </div>
            <h2 className="font-display font-bold leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: step.dark ? "#ffffff" : "#0C1F2E", whiteSpace: "pre-line" }}>
              {step.headline}
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: step.dark ? "rgba(255,255,255,0.5)" : "rgba(12,31,46,0.58)", maxWidth: "42ch" }}>{step.desc}</p>
            <ul className="space-y-3">
              {step.bullets.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm" style={{ color: step.dark ? "rgba(255,255,255,0.45)" : "rgba(12,31,46,0.55)" }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#12BDFB" }} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: flip ? -32 : 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, delay: 0.1 }} className={flip ? "lg:order-1" : ""}>
            <div className="relative rounded-3xl overflow-hidden" style={{ border: step.dark ? "1px solid rgba(18,189,251,0.15)" : "1px solid rgba(18,189,251,0.1)", boxShadow: step.dark ? "0 32px 80px rgba(0,0,0,0.45)" : "0 24px 64px rgba(12,31,46,0.1)" }}>
              <Image src={step.img} alt={step.title} width={680} height={480} className="w-full object-cover" style={{ height: "clamp(300px, 42vh, 460px)" }} />
              <div className="absolute bottom-5 left-5 rounded-xl border px-4 py-3" style={{ backgroundColor: step.dark ? "rgba(10,24,37,0.85)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(18,189,251,0.22)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.1em] mb-0.5" style={{ color: "#12BDFB" }}>Step {step.n}</p>
                <p className="text-sm font-semibold" style={{ color: step.dark ? "#ffffff" : "#0C1F2E" }}>{step.title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);


  return (
    <>
      <section ref={heroRef} className="relative flex items-end overflow-hidden" style={{ minHeight: "90vh", backgroundColor: "#07111A", clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)", marginBottom: -60 }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image src="/client/service-tech-friendly.jpg" alt="Aqua Otter specialist" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.97) 0%, rgba(7,17,26,0.45) 55%, rgba(7,17,26,0.15) 100%)" }} />
        </motion.div>
        <motion.div className="relative z-10 container-site w-full" style={{ paddingBottom: "clamp(80px, 10vh, 120px)" }} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8" style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "rgba(18,189,251,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
            <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Four Steps to Pure Water</span>
          </div>
          <h1 className="font-display font-bold leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "#ffffff" }}>
            Test first.<br /><span style={{ color: "#12BDFB" }}>Customize<br />second.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "44ch", lineHeight: 1.7, fontSize: "1.05rem" }}>
            Every home gets a free water test. Every system is engineered specifically for that home. Nothing is guessed.
          </p>
        </motion.div>
      </section>

      <Step key={steps[0].n} step={steps[0]} index={0} />
      <Wave from="#07111A" to="#ffffff" variant="splash" height={80} />
      <Step key={steps[1].n} step={steps[1]} index={1} />
      <Wave from="#ffffff" to="#07111A" variant="double" height={70} />
      <Step key={steps[2].n} step={steps[2]} index={2} />
      <Wave from="#07111A" to="#ffffff" variant="gentle" height={80} />
      <Step key={steps[3].n} step={steps[3]} index={3} />
      <Wave from="#ffffff" to="#07111A" variant="sharp" height={80} />

      <HouseDiagram />

      <Wave from="#07111A" to="#0C1F2E" variant="gentle" height={50} />

      <section className="py-24 md:py-32" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", lineHeight: 0.9 }}>
                Ready to start<br /><span style={{ color: "#12BDFB" }}>step one?</span>
              </h2>
              <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "38ch" }}>
                The free water test is the only step that costs you nothing — and it is the one that changes everything.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}>
                  Schedule Free Water Test <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+13179835919" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                  Call (317) 983-5919
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
