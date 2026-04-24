"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, MapPin, Droplets, CheckCircle, Quote } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyClient({ cs }: { cs: CaseStudy }) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const resultsInView = useInView(resultsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(18,189,251,0.08)",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(56px, 7vh, 88px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 70% at 70% 50%, rgba(18,189,251,0.05) 0%, transparent 60%)" }} />
        <div className="container-site relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs mb-8" style={{ color: "rgba(12,31,46,0.4)" }}>
            <Link href="/case-studies" className="flex items-center gap-1 hover:text-[#12BDFB] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Case Studies
            </Link>
            <span>/</span>
            <span style={{ color: "rgba(12,31,46,0.6)" }}>{cs.city}, {cs.state}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>{cs.category}</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                  <MapPin className="w-3 h-3" />{cs.city}, {cs.state} &middot; {cs.date}
                </span>
              </div>
              <h1 className="font-display font-bold leading-[1.05] mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#0C1F2E" }}>
                {cs.title}
              </h1>
              <p className="leading-relaxed mb-8" style={{ fontSize: "1rem", color: "rgba(12,31,46,0.55)", maxWidth: "44ch" }}>
                {cs.subtitle}
              </p>

              {/* System installed */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border" style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "rgba(18,189,251,0.05)" }}>
                <Droplets className="w-4 h-4" style={{ color: "#12BDFB" }} />
                <span className="text-sm font-semibold" style={{ color: "#0C1F2E" }}>System: {cs.system}</span>
              </div>
            </motion.div>

            {/* Water profile card */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div className="rounded-3xl border p-8" style={{ borderColor: "rgba(18,189,251,0.15)", backgroundColor: "#F0F8FF" }}>
                <h3 className="font-display font-bold mb-5" style={{ fontSize: "1.1rem", color: "#0C1F2E" }}>Water profile</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {cs.water.hardness_gpg && (
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: "rgba(12,31,46,0.4)" }}>Hardness</p>
                      <p className="text-2xl font-bold" style={{ color: "#0C1F2E" }}>{cs.water.hardness_gpg} <span className="text-sm font-normal" style={{ color: "rgba(12,31,46,0.4)" }}>GPG</span></p>
                    </div>
                  )}
                  {cs.water.tds_ppm && (
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: "rgba(12,31,46,0.4)" }}>TDS</p>
                      <p className="text-2xl font-bold" style={{ color: "#0C1F2E" }}>{cs.water.tds_ppm} <span className="text-sm font-normal" style={{ color: "rgba(12,31,46,0.4)" }}>ppm</span></p>
                    </div>
                  )}
                  {cs.water.iron_ppm && (
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: "rgba(12,31,46,0.4)" }}>Iron</p>
                      <p className="text-2xl font-bold" style={{ color: "#0C1F2E" }}>{cs.water.iron_ppm} <span className="text-sm font-normal" style={{ color: "rgba(12,31,46,0.4)" }}>ppm</span></p>
                    </div>
                  )}
                  {cs.water.ph && (
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: "rgba(12,31,46,0.4)" }}>pH</p>
                      <p className="text-2xl font-bold" style={{ color: "#0C1F2E" }}>{cs.water.ph}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: "rgba(12,31,46,0.4)" }}>Contaminants of concern</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.water.contaminants.map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.15)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs mt-4" style={{ color: "rgba(12,31,46,0.4)" }}>Source: {cs.water.source}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "clamp(280px, 35vw, 480px)" }}>
        <Image src={cs.img} alt={cs.title} fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(240,248,255,0.6) 100%)" }} />
      </div>

      {/* Problem */}
      <section className="py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site max-w-4xl">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#0C1F2E" }}>
            {cs.problem.headline}
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: "rgba(12,31,46,0.6)", fontSize: "1.05rem", maxWidth: "60ch" }}>
            {cs.problem.body}
          </p>
          <div className="space-y-3">
            {cs.problem.symptoms.map(s => (
              <div key={s} className="flex items-start gap-3 text-sm" style={{ color: "rgba(12,31,46,0.65)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#ef4444" }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.05)" }}>
            <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>The Solution</span>
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#0C1F2E" }}>
            {cs.solution.headline}
          </h2>
          <p className="leading-relaxed mb-10" style={{ color: "rgba(12,31,46,0.6)", fontSize: "1.05rem", maxWidth: "60ch" }}>
            {cs.solution.body}
          </p>
          <div className="space-y-4">
            {cs.solution.systems.map((sys, i) => (
              <div key={sys.name} className="rounded-2xl border p-6" style={{ borderColor: "rgba(18,189,251,0.15)", backgroundColor: "#F0F8FF" }}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "#0C1F2E" }}>{sys.name}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }}>{sys.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block" style={{ color: "#12BDFB" }}>The Outcome</span>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#ffffff" }}>
              Before vs. after
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={resultsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 border"
              style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Before Installation</p>
              <div className="space-y-5">
                {cs.results.before.map(b => (
                  <div key={b.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{b.label}</span>
                    <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>{b.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={resultsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl p-8 border"
              style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "rgba(18,189,251,0.06)" }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#12BDFB" }}>After Installation</p>
              <div className="space-y-5">
                {cs.results.after.map(a => (
                  <div key={a.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(18,189,251,0.12)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{a.label}</span>
                    <span className="text-sm font-bold" style={{ color: "#12BDFB" }}>{a.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="rounded-3xl p-10 border text-center"
            style={{ borderColor: "rgba(18,189,251,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <Quote className="w-8 h-8 mx-auto mb-5 opacity-30" style={{ color: "#12BDFB" }} />
            <blockquote className="text-lg leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "56ch", margin: "0 auto 1.25rem", fontStyle: "italic" }}>
              &ldquo;{cs.results.quote ?? cs.quote}&rdquo;
            </blockquote>
            <p className="text-sm font-semibold" style={{ color: "#12BDFB" }}>
              {cs.customerFirstName} &mdash; {cs.city}, {cs.state}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0C1F2E" }}>
            Ready for your own before and after?
          </h2>
          <p className="mb-8" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto 2rem" }}>
            We test your water on-site and show you exactly what we find. Free. No commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
            >
              Schedule Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium transition-all duration-200"
              style={{ borderColor: "rgba(12,31,46,0.15)", color: "rgba(12,31,46,0.55)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)"; e.currentTarget.style.color = "#12BDFB"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(12,31,46,0.15)"; e.currentTarget.style.color = "rgba(12,31,46,0.55)"; }}
            >
              See more case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
