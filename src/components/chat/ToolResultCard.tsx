"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Droplets, PiggyBank, Sparkles, TrendingUp, Wrench } from "lucide-react";
import type { ToolResultPayload } from "@/lib/chat-tools";

function dollars(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function ToolResultCard({ payload }: { payload: ToolResultPayload }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="my-2"
    >
      {payload.kind === "water_profile" && <WaterProfileCard payload={payload} />}
      {payload.kind === "recommendation" && <RecommendationCard payload={payload} />}
      {payload.kind === "savings" && <SavingsCard payload={payload} />}
      {payload.kind === "booking" && <BookingCard payload={payload} />}
    </motion.div>
  );
}

function WaterProfileCard({ payload }: { payload: Extract<ToolResultPayload, { kind: "water_profile" }> }) {
  if (!payload.ok || !payload.profile) {
    return (
      <div className="rounded-2xl p-4 text-sm" style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#fca5a5" }}>
        <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4" /><span className="font-bold">ZIP {payload.zip} not in database</span></div>
        <p style={{ color: "rgba(255,255,255,0.55)" }}>{payload.error}</p>
      </div>
    );
  }
  const p = payload.profile;
  const color = payload.hardnessColor ?? "#12BDFB";
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(12,31,46,0.6)", border: `1px solid ${color}40` }}>
      <div style={{ height: 3, backgroundColor: color }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Water report</p>
            <p className="text-sm font-bold text-white">{p.city}, {p.state} <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{p.zip}</span></p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>{payload.hardnessLabel}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            { label: "GPG", value: p.hardness_gpg, emp: true },
            { label: "Cl", value: p.chlorine_ppm.toFixed(1) },
            { label: "TDS", value: p.tds_ppm },
            { label: "pH", value: p.pH.toFixed(1) },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-2" style={{ backgroundColor: m.emp ? `${color}14` : "rgba(255,255,255,0.04)" }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</p>
              <p className="font-display font-bold tabular-nums" style={{ fontSize: "1rem", color: m.emp ? color : "#fff" }}>{m.value}</p>
            </div>
          ))}
        </div>
        {p.contaminants_flagged.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {p.contaminants_flagged.map(c => (
              <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.14)", color: "#fca5a5" }}>{c}</span>
            ))}
          </div>
        )}
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{p.notes}</p>
      </div>
    </div>
  );
}

function RecommendationCard({ payload }: { payload: Extract<ToolResultPayload, { kind: "recommendation" }> }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(12,31,46,0.6)", border: "1px solid rgba(18,189,251,0.3)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4" style={{ color: "#12BDFB" }} />
          <p className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#12BDFB" }}>Recommended setup</p>
        </div>
        {payload.systems.length > 0 ? (
          <ol className="space-y-2.5 mb-3">
            {payload.systems.map((s) => (
              <li key={s.id} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                  {s.priority}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{s.why}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.45)" }}>{payload.rationale}</p>
      </div>
    </div>
  );
}

function SavingsCard({ payload }: { payload: Extract<ToolResultPayload, { kind: "savings" }> }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(12,31,46,0.6)", border: "1px solid rgba(245,158,11,0.3)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <PiggyBank className="w-4 h-4" style={{ color: "#f59e0b" }} />
          <p className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#f59e0b" }}>5-year savings</p>
        </div>
        <p className="font-display font-bold tabular-nums leading-none mb-1" style={{ fontSize: "2rem", color: "#ffffff", letterSpacing: "-0.02em" }}>
          {dollars(payload.fiveYear)}
        </p>
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
          {dollars(payload.annual)}/yr · pays back in <b style={{ color: "#22c55e" }}>{payload.payback_years} yrs</b>
        </p>
        <div className="space-y-1 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {Object.entries(payload.breakdown).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-xs">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{k.replace(/_/g, " ")}</span>
              <span className="tabular-nums font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{dollars(v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingCard({ payload }: { payload: Extract<ToolResultPayload, { kind: "booking" }> }) {
  if (!payload.ok) {
    return (
      <div className="rounded-2xl p-4 text-sm" style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}>
        <p style={{ color: "#fca5a5" }}>{payload.error}</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e" }} />
          <p className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#22c55e" }}>Test booked</p>
        </div>
        <p className="text-sm font-bold text-white mb-1">Thanks, {payload.name.split(" ")[0]}!</p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
          We&apos;ll reach out at <b>{payload.email}</b> within one business day to confirm your free water test for ZIP {payload.zip}.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold"
          style={{ color: "#22c55e" }}
        >
          Or call now →
        </Link>
      </div>
    </div>
  );
}
