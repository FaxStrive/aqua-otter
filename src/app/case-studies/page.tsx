"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, MapPin, Droplets } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";

const categoryColors: Record<string, string> = {
  "Water Softener + RO": "#12BDFB",
  "Whole-Home Filtration + RO": "#0a9ed9",
  "All-In-One Iron Filter": "#f59e0b",
  "No-Salt Conditioning": "#22d3ee",
  "Reverse Osmosis": "#6366f1",
};

export default function CaseStudiesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const featured = CASE_STUDIES.find(c => c.featured)!;
  const rest = CASE_STUDIES.filter(c => !c.featured);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(18,189,251,0.08)",
          minHeight: "46vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(56px, 7vh, 88px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 65% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.022, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <Award className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Real Results</span>
            </div>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
              Before and after.<br />
              <span style={{ color: "#12BDFB" }}>Real numbers.</span>
            </h1>
            <p style={{ color: "rgba(12,31,46,0.5)", maxWidth: "44ch", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7 }}>
              Every case study is from an actual Aqua Otter install. Real water test data, real contaminants, real outcomes. No stock photo homeowners.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-8 mt-12"
          >
            {[
              { val: "500+", lab: "Homes treated" },
              { val: "6", lab: "States served" },
              { val: "25+", lab: "Years of experience" },
              { val: "0 GPG", lab: "Target hardness" },
            ].map((s, i) => (
              <div key={s.lab} className="flex items-center gap-8">
                <div>
                  <p className="font-display font-bold leading-none" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>{s.val}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.4)" }}>{s.lab}</p>
                </div>
                {i < 3 && <div className="w-px h-8" style={{ backgroundColor: "rgba(12,31,46,0.1)" }} />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured case study */}
      <section className="pt-20 pb-10" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/case-studies/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border bg-white transition-shadow duration-300 hover:shadow-2xl"
              style={{ borderColor: "rgba(18,189,251,0.15)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ minHeight: 380 }}>
                <Image src={featured.img} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,31,46,0.5) 0%, transparent 50%)" }} />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: categoryColors[featured.category] ?? "#12BDFB", color: "#0C1F2E" }}>
                    {featured.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "rgba(12,31,46,0.7)" }}>
                    Featured
                  </span>
                </div>
                {/* Water data badge */}
                <div className="absolute bottom-5 left-5 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Droplets className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                    <span className="text-xs font-bold" style={{ color: "#12BDFB" }}>Water Profile</span>
                  </div>
                  <p className="text-sm font-bold" style={{ color: "#0C1F2E" }}>{featured.water.hardness_gpg} GPG hardness</p>
                  <p className="text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>{featured.water.contaminants.join(", ")}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(12,31,46,0.45)" }}>{featured.city}, {featured.state} &middot; {featured.date}</span>
                </div>
                <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", color: "#0C1F2E", lineHeight: 1.15 }}>
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(12,31,46,0.55)", maxWidth: "44ch" }}>
                  {featured.subtitle}
                </p>

                {/* Before/after snapshot */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {featured.results.before.slice(0, 2).map((b, i) => (
                    <div key={b.label} className="rounded-xl p-4 border" style={{ borderColor: "rgba(12,31,46,0.08)", backgroundColor: "#F0F8FF" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(12,31,46,0.35)" }}>Before</p>
                      <p className="text-sm font-bold mb-0.5" style={{ color: "rgba(12,31,46,0.7)" }}>{b.value}</p>
                      <p className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>{b.label}</p>
                    </div>
                  ))}
                  {featured.results.after.slice(0, 2).map((a, i) => (
                    <div key={a.label} className="rounded-xl p-4 border" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.05)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#12BDFB" }}>After</p>
                      <p className="text-sm font-bold mb-0.5" style={{ color: "#0C1F2E" }}>{a.value}</p>
                      <p className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>{a.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                  Read full case study <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="py-16 pb-28" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group flex flex-col rounded-3xl overflow-hidden border bg-white h-full transition-shadow duration-300 hover:shadow-xl"
                  style={{ borderColor: "rgba(18,189,251,0.1)" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <Image src={cs.img} alt={cs.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: categoryColors[cs.category] ?? "#12BDFB", color: "#0C1F2E" }}>
                        {cs.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3 h-3" style={{ color: "#12BDFB" }} />
                      <span className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>{cs.city}, {cs.state}</span>
                    </div>
                    <h3 className="font-display font-bold mb-3 flex-1" style={{ fontSize: "1.1rem", color: "#0C1F2E", lineHeight: 1.25 }}>
                      {cs.title}
                    </h3>

                    {/* Mini before/after */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      <div className="rounded-lg p-3" style={{ backgroundColor: "#F0F8FF" }}>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(12,31,46,0.35)" }}>Before</p>
                        <p className="text-xs font-bold" style={{ color: "rgba(12,31,46,0.65)" }}>{cs.results.before[0].value}</p>
                        <p className="text-[10px]" style={{ color: "rgba(12,31,46,0.4)" }}>{cs.results.before[0].label}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(18,189,251,0.07)" }}>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "#12BDFB" }}>After</p>
                        <p className="text-xs font-bold" style={{ color: "#0C1F2E" }}>{cs.results.after[0].value}</p>
                        <p className="text-[10px]" style={{ color: "rgba(12,31,46,0.4)" }}>{cs.results.after[0].label}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#12BDFB" }}>
                      Read case study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#ffffff" }}>
            Want to see what we find in your water?
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "38ch", margin: "0 auto 2rem" }}>
            Free in-home water test. We bring the equipment, show you the data, and design a system around your actual results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
          >
            Schedule Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
