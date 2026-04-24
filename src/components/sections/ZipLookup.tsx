"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, AlertTriangle, Beaker, Droplets } from "lucide-react";
import { lookupWaterByZip, hardnessLevel, type WaterProfile } from "@/lib/water-data";

type ResultState =
  | { kind: "idle" }
  | { kind: "not-found"; zip: string }
  | { kind: "found"; profile: WaterProfile };

function Metric({ label, value, unit, color, emphasis }: { label: string; value: string | number; unit?: string; color?: string; emphasis?: boolean }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        backgroundColor: emphasis ? `${color}14` : "rgba(255,255,255,0.03)",
        border: `1px solid ${emphasis ? color + "40" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display font-bold leading-none tabular-nums" style={{ fontSize: "1.8rem", color: emphasis ? color : "#ffffff", letterSpacing: "-0.02em" }}>
          {value}
        </span>
        {unit && <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function ZipLookup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ResultState>({ kind: "idle" });
  const [loading, setLoading] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const clean = zip.replace(/\D/g, "").slice(0, 5);
    if (clean.length !== 5) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 450)); // tiny delay feels more trustworthy
    const profile = lookupWaterByZip(clean);
    setResult(profile ? { kind: "found", profile } : { kind: "not-found", zip: clean });
    setLoading(false);
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36" style={{ backgroundColor: "#07111A" }}>
      {/* Background accents */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(18,189,251,0.08) 0%, transparent 65%)" }} />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            Instant Water Report
          </p>
          <h2
            className="font-display font-bold leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", color: "#ffffff", letterSpacing: "-0.03em" }}
          >
            What&apos;s actually<br />in your water?
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Type your ZIP code. We&apos;ll show you hardness, chlorine, and flagged contaminants from the latest municipal reports for your area.
          </p>
        </motion.div>

        {/* Search form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div
            className="relative flex items-center rounded-2xl p-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(18,189,251,0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
          >
            <Search className="w-5 h-5 ml-3" style={{ color: "rgba(18,189,251,0.6)" }} />
            <input
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              placeholder="Enter your ZIP code"
              value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              className="flex-1 bg-transparent outline-none px-3 py-3 text-base tabular-nums"
              style={{ color: "#ffffff" }}
            />
            <button
              type="submit"
              disabled={zip.length !== 5 || loading}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                backgroundColor: zip.length === 5 ? "#12BDFB" : "rgba(18,189,251,0.25)",
                color: zip.length === 5 ? "#0C1F2E" : "rgba(255,255,255,0.4)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Checking..." : "Check My Water"}
            </button>
          </div>
          <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.28)" }}>
            Try 46060 · 46032 · 46204 · 46802 · 49503 · 48104
          </p>
        </motion.form>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result.kind === "found" && (
            <motion.div
              key={result.profile.zip}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              <ResultCard profile={result.profile} />
            </motion.div>
          )}
          {result.kind === "not-found" && (
            <motion.div
              key={`nf-${result.zip}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto rounded-2xl p-6 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                We don&apos;t have a profile cached for <b style={{ color: "#12BDFB" }}>{result.zip}</b> yet. But a free in-home test will tell you exactly what&apos;s in your water.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}
              >
                Book a free test <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ResultCard({ profile }: { profile: WaterProfile }) {
  const hl = hardnessLevel(profile.hardness_gpg);
  const isBad = profile.contaminants_flagged.length > 0;

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: "#0C1F2E",
        border: `1px solid ${hl.color}40`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.45), 0 0 60px ${hl.color}14`,
      }}
    >
      {/* Accent */}
      <div style={{ height: 4, backgroundColor: hl.color }} />

      <div className="p-7 md:p-9">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {profile.county} County · {profile.source}
            </p>
            <h3 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#ffffff" }}>
              {profile.city}, {profile.state} <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{profile.zip}</span>
            </h3>
          </div>
          <div
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ backgroundColor: `${hl.color}18`, border: `1px solid ${hl.color}50` }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hl.color, boxShadow: `0 0 8px ${hl.color}` }} />
            <span className="text-sm font-bold" style={{ color: hl.color }}>{hl.label}</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-7">
          <Metric label="Hardness" value={profile.hardness_gpg} unit="GPG" color={hl.color} emphasis />
          <Metric label="Chlorine" value={profile.chlorine_ppm.toFixed(1)} unit="ppm" />
          <Metric label="TDS" value={profile.tds_ppm} unit="ppm" />
          <Metric label="Iron" value={profile.iron_ppm.toFixed(2)} unit="ppm" color={profile.iron_ppm >= 0.3 ? "#f59e0b" : undefined} emphasis={profile.iron_ppm >= 0.3} />
          <Metric label="pH" value={profile.pH.toFixed(1)} />
        </div>

        {/* Contaminants flagged */}
        {isBad && (
          <div
            className="rounded-2xl p-5 mb-6 flex items-start gap-4"
            style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
            <div>
              <p className="text-sm font-bold mb-1.5" style={{ color: "#ffffff" }}>
                {profile.contaminants_flagged.length} contaminant{profile.contaminants_flagged.length > 1 ? "s" : ""} above EWG health guidelines
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.contaminants_flagged.map(c => (
                  <span
                    key={c}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "58ch" }}>
                These are legally permitted by the EPA but exceed Environmental Working Group health-protective thresholds. A whole-home filter or RO handles all of them.
              </p>
            </div>
          </div>
        )}

        <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.58)", maxWidth: "64ch" }}>
          {profile.notes}
        </p>

        {/* Recommended action */}
        <div
          className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ backgroundColor: "rgba(18,189,251,0.06)", border: "1px solid rgba(18,189,251,0.2)" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(18,189,251,0.15)" }}>
              <Beaker className="w-5 h-5" style={{ color: "#12BDFB" }} />
            </div>
            <div>
              <p className="text-sm font-bold mb-0.5" style={{ color: "#ffffff" }}>Recommended for your water</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                {profile.hardness_gpg >= 11 ? "Water Softener" : ""}{profile.hardness_gpg >= 11 && isBad ? " + " : ""}{isBad ? "Whole-Home Filtration" : ""}{!isBad && profile.hardness_gpg < 11 ? "A water test to verify in your home" : ""}
                {(profile.hardness_gpg >= 11 || isBad) ? " + 5-Stage RO for drinking water" : ""}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold flex-shrink-0 transition-all"
            style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 16px rgba(18,189,251,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
          >
            <Droplets className="w-4 h-4" />
            Book my free test
          </Link>
        </div>

        {/* Footer source */}
        <p className="text-[10px] mt-5 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
          Data: municipal Consumer Confidence Reports, EPA SDWIS, EWG Tap Water Database. Your specific home may test differently.
        </p>
      </div>
    </div>
  );
}
