"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Free Water Test",
    detail: "In your home. 30 minutes.",
    desc: "A certified specialist comes to you and tests for hardness, iron, pH, chlorine, TDS, sulfur, and bacterial indicators. You see the results before we leave.",
    bullets: ["Tests 12+ water quality parameters", "No cost, no obligation, no pressure", "Results explained in plain language"],
  },
  {
    n: "02",
    title: "Custom System Design",
    detail: "Engineered for your water.",
    desc: "Your test data drives every decision. We specify the exact equipment your water chemistry requires — the right tank size, media, configuration. Written quote, no hidden fees.",
    bullets: ["Sized to your household usage", "Combination systems when needed", "No upselling, ever"],
  },
  {
    n: "03",
    title: "Expert Installation",
    detail: "Same-day clean water.",
    desc: "A licensed, insured technician installs your system in a single visit — plumbing, programming, bypass valves, cleanup, and full walkthrough before we leave.",
    bullets: ["Free installation on every system", "2 to 4 hours, start to finish", "Lifetime warranty activated at install"],
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.1), transparent)" }} />

      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block" style={{ color: "#12BDFB" }}>Simple Process</span>
            <h2 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#0C1F2E" }}>
              How you get<br />
              <span style={{ color: "rgba(12,31,46,0.2)" }}>pure water.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "rgba(12,31,46,0.4)" }} onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.4)")}>
              See the full process <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-10 left-[calc(33.33%_-_0px)] right-[calc(33.33%_-_0px)] h-px" style={{ backgroundColor: "rgba(18,189,251,0.25)", top: 40 }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="rounded-3xl border p-8"
              style={{ backgroundColor: "#F8FCFF", borderColor: "rgba(18,189,251,0.14)", boxShadow: "0 4px 24px rgba(12,31,46,0.05)" }}
            >
              {/* Number circle */}
              <div className="flex items-center gap-4 mb-7">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: "#12BDFB", color: "#ffffff" }}
                >
                  {step.n}
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(18,189,251,0.7)" }}>
                  {step.detail}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#0C1F2E" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.58)" }}>
                {step.desc}
              </p>
              <ul className="space-y-2">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#12BDFB" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
