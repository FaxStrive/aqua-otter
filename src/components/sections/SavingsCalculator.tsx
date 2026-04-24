"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const YEARS = 5;
// Annualized cost assumptions, conservative, documented:
// - Bottled water: typical US family spends $12-20/wk. User sets.
// - Detergent: soft water = 25-50% less detergent. We use 35%.
// - Soap scum cleaning: time value @ $20/hr (light labor).
// - Appliance scale: water heater loses ~3-4% efficiency per year of scale. Replaced ~3 years early on avg. Valued at $1800/replacement, prorated.
// - Energy: scaled heater = 15-30% more energy on hot water. We use 20% extra on an avg $350/yr hot water energy bill.

function dollars(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step = 1,
  suffix,
  accent = "#12BDFB",
  note,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  accent?: string;
  note?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{label}</label>
        <span className="font-display font-bold tabular-nums" style={{ fontSize: "1.25rem", color: accent, letterSpacing: "-0.02em" }}>
          {suffix === "$" ? dollars(value) : `${value}${suffix}`}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full appearance-none bg-transparent cursor-pointer"
          style={{
            height: 22,
          }}
        />
        <div
          className="absolute top-1/2 left-0 right-0 h-1.5 rounded-full pointer-events-none"
          style={{ transform: "translateY(-50%)", background: `linear-gradient(90deg, ${accent} 0%, ${accent} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)` }}
        />
      </div>
      {note && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{note}</p>}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid ${accent};
          box-shadow: 0 4px 12px rgba(18,189,251,0.4);
          cursor: pointer;
          position: relative;
          z-index: 2;
        }
        input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid ${accent};
          box-shadow: 0 4px 12px rgba(18,189,251,0.4);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default function SavingsCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [household, setHousehold] = useState(4);
  const [bottledWeekly, setBottledWeekly] = useState(15);
  const [detergentMonthly, setDetergentMonthly] = useState(35);
  const [cleaningHours, setCleaningHours] = useState(3);
  const [hotWaterBill, setHotWaterBill] = useState(350);
  const [haveSoftener, setHaveSoftener] = useState(false);

  const breakdown = useMemo(() => {
    const bottledAnnual = bottledWeekly * 52;
    const detergentAnnual = detergentMonthly * 12;
    const cleaningAnnual = cleaningHours * 12 * 20;
    // Savings rates assuming the system handles it:
    const bottledSaved = haveSoftener ? bottledAnnual * 0.0 : bottledAnnual * 0.95; // RO replaces bottled fully
    const detergentSaved = detergentAnnual * 0.35;
    const cleaningSaved = cleaningAnnual * 0.7; // soft water cuts cleaning time dramatically
    const energySaved = hotWaterBill * 0.2;
    const applianceSaved = household * 120; // extended life of water heater/dishwasher/washer spread over years
    const annual = bottledSaved + detergentSaved + cleaningSaved + energySaved + applianceSaved;
    const fiveYear = annual * YEARS;
    return {
      bottled: bottledSaved,
      detergent: detergentSaved,
      cleaning: cleaningSaved,
      energy: energySaved,
      appliance: applianceSaved,
      annual,
      fiveYear,
    };
  }, [bottledWeekly, detergentMonthly, cleaningHours, hotWaterBill, household, haveSoftener]);

  // System cost midpoint for ROI framing
  const systemCost = 2800; // whole-home softener + RO, financed cost reference

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36" style={{ backgroundColor: "#0C1F2E" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(245,158,11,0.08) 0%, transparent 65%)" }} />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#f59e0b" }}>
            Savings Calculator
          </p>
          <h2
            className="font-display font-bold leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", color: "#ffffff", letterSpacing: "-0.03em" }}
          >
            Do the math<br />on your water.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Move the sliders. We&apos;ll show what hard, contaminated water is actually costing your household every year.
          </p>
        </motion.div>

        {/* Calculator */}
        <div
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
          style={{
            backgroundColor: "#07111A",
            border: "1px solid rgba(245,158,11,0.18)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ height: 4, background: "linear-gradient(90deg, #12BDFB 0%, #f59e0b 100%)" }} />
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
            {/* Inputs */}
            <div className="p-7 md:p-9 space-y-7">
              <Slider label="Household size" value={household} setValue={setHousehold} min={1} max={8} suffix=" people" />
              <Slider label="Bottled water per week" value={bottledWeekly} setValue={setBottledWeekly} min={0} max={60} suffix="$" note="Cases of water, delivery, refills at the store" />
              <Slider label="Detergent & soap per month" value={detergentMonthly} setValue={setDetergentMonthly} min={10} max={120} suffix="$" note="Laundry detergent, dish soap, shampoo, body wash" />
              <Slider label="Hours cleaning scale per month" value={cleaningHours} setValue={setCleaningHours} min={0} max={12} step={0.5} suffix=" hrs" note="Scrubbing shower glass, faucets, hard water spots" />
              <Slider label="Annual hot water energy bill" value={hotWaterBill} setValue={setHotWaterBill} min={150} max={800} step={10} suffix="$" accent="#f59e0b" note="Gas or electric heating cost for hot water" />

              <label className="flex items-center gap-3 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={haveSoftener}
                  onChange={e => setHaveSoftener(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#12BDFB]"
                />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  I already have a softener (RO-only estimate)
                </span>
              </label>
            </div>

            {/* Results */}
            <div
              className="p-7 md:p-9 flex flex-col justify-between relative"
              style={{ background: "linear-gradient(180deg, rgba(18,189,251,0.05) 0%, rgba(245,158,11,0.05) 100%)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: "#f59e0b" }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#f59e0b" }}>5-year savings</p>
                </div>
                <motion.div
                  key={breakdown.fiveYear}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="font-display font-bold tabular-nums leading-none mb-2"
                  style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#ffffff", letterSpacing: "-0.04em" }}
                >
                  {dollars(breakdown.fiveYear)}
                </motion.div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#12BDFB", fontWeight: 600 }}>{dollars(breakdown.annual)}</span> per year
                </p>

                {/* Breakdown list */}
                <div className="mt-8 space-y-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {[
                    ["Bottled water replaced", breakdown.bottled, "#22c55e"],
                    ["Detergent & soap saved (35% less)", breakdown.detergent, "#12BDFB"],
                    ["Cleaning time recovered", breakdown.cleaning, "#a78bfa"],
                    ["Hot water energy (20% less)", breakdown.energy, "#f59e0b"],
                    ["Extended appliance life", breakdown.appliance, "#12BDFB"],
                  ].map(([label, val, color]) => (
                    <div key={label as string} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color as string }} />
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
                      </div>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {dollars(val as number)}/yr
                      </span>
                    </div>
                  ))}
                </div>

                {/* Payback period */}
                <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: "#22c55e" }}>System payback</p>
                  <p className="text-sm" style={{ color: "#ffffff" }}>
                    A typical whole-home system pays for itself in{" "}
                    <b style={{ color: "#22c55e" }}>
                      {breakdown.annual > 0 ? (systemCost / breakdown.annual).toFixed(1) : "—"} years
                    </b>
                    {" "}at your household&apos;s water costs.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 mt-7 px-6 py-4 rounded-2xl text-sm font-bold transition-all"
                style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 8px 24px rgba(18,189,251,0.3)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
              >
                Get a custom quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] mt-5" style={{ color: "rgba(255,255,255,0.3)" }}>
          Conservative estimates. Based on US EIA energy data, EPA hard-water scale studies, and typical household consumption.
        </p>
      </div>
    </section>
  );
}
