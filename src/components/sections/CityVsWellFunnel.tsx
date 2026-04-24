"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Trees, CheckCircle2 } from "lucide-react";

type Source = "city" | "well" | null;
type Concern = "scale" | "iron" | "smell" | "taste" | "bottled" | "bacteria";

const CONCERNS: { id: Concern; label: string; emoji: string; worksFor: ("city" | "well")[] }[] = [
  { id: "scale",    label: "Scale on fixtures / spots on dishes", emoji: "✨", worksFor: ["city", "well"] },
  { id: "iron",     label: "Orange / rust stains",                emoji: "🟠", worksFor: ["well"] },
  { id: "smell",    label: "Rotten egg or sulfur smell",          emoji: "🥚", worksFor: ["well"] },
  { id: "taste",    label: "Bad taste or chlorine smell",         emoji: "👃", worksFor: ["city", "well"] },
  { id: "bottled",  label: "We drink bottled water",              emoji: "🍶", worksFor: ["city", "well"] },
  { id: "bacteria", label: "Well never been tested",              emoji: "🧫", worksFor: ["well"] },
];

type SystemRec = {
  id: string;
  name: string;
  why: string;
  href: string;
  image: string;
  color: string;
};

const SYSTEMS: Record<string, SystemRec> = {
  softener: {
    id: "softener",
    name: "Water Softener",
    why: "Removes calcium and magnesium via ion exchange. Fixes scale, spots, dry skin, and protects every appliance.",
    href: "/systems/water-softener",
    image: "/client/AiO_and_Softener.jpeg",
    color: "#12BDFB",
  },
  filtration: {
    id: "filtration",
    name: "Whole-Home Filtration",
    why: "Catalytic carbon removes chlorine, chloramine, taste, odor, and reduces PFAS across every tap.",
    href: "/systems/filtration",
    image: "/client/Quintex_5_RB-removebg-preview__1_.png",
    color: "#12BDFB",
  },
  aio: {
    id: "aio",
    name: "AiO Well Filtration",
    why: "Air injection ozone handles iron, sulfur, manganese, and bacteria. The foundation of any well setup.",
    href: "/systems/well-water",
    image: "/client/AiO_Well_Filtration_RB.png",
    color: "#f59e0b",
  },
  uv: {
    id: "uv",
    name: "UV Purification",
    why: "Inactivates bacteria, viruses, giardia, cryptosporidium. Essential whenever a well shows any bacterial indicator.",
    href: "/systems/uv-purification",
    image: "/client/21_GPG_UV_Light.png",
    color: "#a78bfa",
  },
  ro: {
    id: "ro",
    name: "5-Stage Reverse Osmosis",
    why: "Under-sink with a dedicated faucet. 99% TDS removal. Lead, PFAS, nitrate, arsenic all gone. Replaces bottled water.",
    href: "/systems/reverse-osmosis",
    image: "/client/5_Stage_Reverse_Osmosis_RB.png",
    color: "#22c55e",
  },
};

function recommendFor(source: "city" | "well", concerns: Set<Concern>): SystemRec[] {
  const recs: SystemRec[] = [];
  if (source === "well") {
    if (concerns.has("iron") || concerns.has("smell") || concerns.has("bacteria")) recs.push(SYSTEMS.aio);
    if (concerns.has("bacteria")) recs.push(SYSTEMS.uv);
    if (concerns.has("scale")) recs.push(SYSTEMS.softener);
  } else {
    if (concerns.has("scale")) recs.push(SYSTEMS.softener);
    if (concerns.has("taste")) recs.push(SYSTEMS.filtration);
  }
  if (concerns.has("bottled") || concerns.has("taste")) recs.push(SYSTEMS.ro);
  // Dedupe
  const seen = new Set<string>();
  const out = recs.filter(r => (seen.has(r.id) ? false : (seen.add(r.id), true)));
  // Default fallback: always suggest a starting point
  if (out.length === 0) {
    if (source === "well") out.push(SYSTEMS.aio);
    else out.push(SYSTEMS.softener);
  }
  return out;
}

export default function CityVsWellFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [source, setSource] = useState<Source>(null);
  const [concerns, setConcerns] = useState<Set<Concern>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const reset = () => { setSource(null); setConcerns(new Set()); setShowResult(false); };
  const toggleConcern = (c: Concern) => {
    setConcerns(prev => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c); else next.add(c);
      return next;
    });
  };

  const recs = source ? recommendFor(source, concerns) : [];

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36" style={{ backgroundColor: "#ffffff" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(18,189,251,0.08) 0%, transparent 60%)" }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            How clean is your water?
          </p>
          <h2
            className="font-display font-bold leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}
          >
            Let&apos;s find out<br />what you need.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }}>
            Tell us how you get your water and what you&apos;ve noticed. Two taps. Real recommendation.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ─── STEP 1 — CITY vs WELL ─────────────────────────────── */}
          {!source && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto"
            >
              <SourceCard
                icon={Building2}
                label="City Water"
                subtitle="Municipal / Utility supply"
                desc="Treated at a plant. Usually hard, chlorinated, sometimes with chromium-6 or TTHMs."
                color="#12BDFB"
                onClick={() => setSource("city")}
              />
              <SourceCard
                icon={Trees}
                label="Well Water"
                subtitle="Private well on your property"
                desc="Untreated groundwater. Often has iron, sulfur, manganese, and can carry bacteria."
                color="#f59e0b"
                onClick={() => setSource("well")}
              />
            </motion.div>
          )}

          {/* ─── STEP 2 — CONCERNS ─────────────────────────────────── */}
          {source && !showResult && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: source === "city" ? "#12BDFB" : "#f59e0b" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: source === "city" ? "#12BDFB" : "#f59e0b" }} />
                  {source === "city" ? "City Water" : "Well Water"}
                </div>
                <button onClick={reset} className="text-xs font-semibold" style={{ color: "rgba(12,31,46,0.45)" }}>
                  ← Change
                </button>
              </div>
              <h3 className="font-display font-bold text-center mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
                What have you noticed?
              </h3>
              <p className="text-sm text-center mb-7" style={{ color: "rgba(12,31,46,0.5)" }}>
                Pick as many as apply. We&apos;ll match systems to exactly what you said.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {CONCERNS.filter(c => c.worksFor.includes(source)).map(c => {
                  const on = concerns.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleConcern(c.id)}
                      className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                      style={{
                        backgroundColor: on ? "rgba(18,189,251,0.08)" : "#ffffff",
                        border: `1.5px solid ${on ? "#12BDFB" : "rgba(12,31,46,0.08)"}`,
                        boxShadow: on ? "0 4px 16px rgba(18,189,251,0.15)" : "0 1px 3px rgba(12,31,46,0.04)",
                      }}
                    >
                      <span className="text-xl" aria-hidden>{c.emoji}</span>
                      <span className="text-sm font-semibold flex-1" style={{ color: on ? "#0C1F2E" : "rgba(12,31,46,0.75)" }}>
                        {c.label}
                      </span>
                      {on && <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#12BDFB" }} />}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  disabled={concerns.size === 0}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold transition-all"
                  style={{
                    backgroundColor: concerns.size === 0 ? "rgba(18,189,251,0.3)" : "#12BDFB",
                    color: concerns.size === 0 ? "rgba(255,255,255,0.6)" : "#0C1F2E",
                    boxShadow: concerns.size === 0 ? "none" : "0 6px 24px rgba(18,189,251,0.3)",
                  }}
                >
                  Show my match <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3 — RESULT ───────────────────────────────────── */}
          {showResult && source && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#22c55e" }}>Your match</p>
                <h3 className="font-display font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
                  Here&apos;s what your home needs.
                </h3>
              </div>

              <div className="space-y-4">
                {recs.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-3xl overflow-hidden flex flex-col sm:flex-row"
                    style={{ backgroundColor: "#0C1F2E", border: `1px solid ${r.color}40` }}
                  >
                    <div
                      className="relative sm:w-48 flex-shrink-0 flex items-center justify-center p-6"
                      style={{ background: `linear-gradient(135deg, ${r.color}18 0%, transparent 100%)` }}
                    >
                      <Image src={r.image} alt={r.name} width={180} height={180} className="object-contain h-32 sm:h-36 w-auto" />
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${r.color}20`, color: r.color }}
                      >
                        #{i + 1} Priority
                      </span>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="font-display font-bold text-white mb-2" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>
                          {r.name}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {r.why}
                        </p>
                      </div>
                      <Link
                        href={r.href}
                        className="inline-flex items-center gap-2 text-sm font-bold self-start"
                        style={{ color: r.color }}
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5"
                style={{ backgroundColor: "rgba(18,189,251,0.06)", border: "1px solid rgba(18,189,251,0.22)" }}
              >
                <div>
                  <p className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "#0C1F2E" }}>
                    Confirm it with a free water test.
                  </p>
                  <p className="text-sm" style={{ color: "rgba(12,31,46,0.55)" }}>
                    A specialist comes to your home, tests your water, and finalizes the system. No cost, no pressure.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={reset} className="text-sm font-semibold" style={{ color: "rgba(12,31,46,0.5)" }}>
                    Start over
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold"
                    style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }}
                  >
                    Book my free test <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SourceCard({ icon: Icon, label, subtitle, desc, color, onClick }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  subtitle: string;
  desc: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="relative rounded-3xl p-8 text-left overflow-hidden group"
      style={{
        background: `linear-gradient(145deg, ${color}0c 0%, #ffffff 60%)`,
        border: `1.5px solid ${color}24`,
        boxShadow: "0 8px 28px rgba(12,31,46,0.06)",
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: `${color}15`, border: `1.5px solid ${color}30` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color }}>{subtitle}</p>
      <h3 className="font-display font-bold mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
        {label}
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>
        {desc}
      </p>
      <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color }}>
        That&apos;s me <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.button>
  );
}
