"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const impacts = [
  { value: "$800+", label: "spent on bottled water per year" },
  { value: "30%",   label: "shorter appliance lifespan from scale" },
  { value: "2×",    label: "more soap used in hard water" },
  { value: "85%",   label: "of Indiana homes affected" },
];

const waterReadings = [
  { label: "Hardness (GPG)", value: "17.2", pct: 86, status: "HIGH",     color: "#f97316" },
  { label: "Iron (mg/L)",    value: "0.8",  pct: 64, status: "ELEVATED", color: "#ef4444" },
  { label: "Chlorine (ppm)", value: "1.9",  pct: 58, status: "MODERATE", color: "#f59e0b" },
  { label: "TDS (ppm)",      value: "380",  pct: 76, status: "HIGH",     color: "#f97316" },
];

export default function WhyItMatters() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#F0F8FF" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.12), transparent)" }}
      />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "#12BDFB" }}
              >
                The Reality
              </span>

              {/* Big stat */}
              <div
                className="font-display font-bold leading-none mb-3 select-none"
                style={{
                  fontSize: "clamp(5rem, 14vw, 10rem)",
                  color: "#12BDFB",
                  letterSpacing: "-0.04em",
                  opacity: 0.9,
                }}
              >
                85%
              </div>

              <p
                className="font-display font-light leading-[1.2] mb-3"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: "#0C1F2E" }}
              >
                of Indiana homes have{" "}
                <span className="italic" style={{ color: "rgba(12,31,46,0.4)" }}>
                  hard water.
                </span>
              </p>

              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "rgba(12,31,46,0.52)", maxWidth: "36ch" }}
              >
                Most families don&apos;t know until appliances break early, stains won&apos;t lift, or the water just doesn&apos;t taste right.
              </p>
            </motion.div>

            {/* Impact mini-cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {impacts.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-2xl border bg-white p-4"
                  style={{
                    borderColor: "rgba(18,189,251,0.15)",
                    boxShadow: "0 4px 16px rgba(12,31,46,0.08)",
                  }}
                >
                  <p
                    className="font-display font-bold text-2xl mb-1"
                    style={{ color: "#0C1F2E" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "rgba(12,31,46,0.48)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "#12BDFB" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0097C4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#12BDFB")}
              >
                Get your free water test
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — water quality report card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border bg-white overflow-hidden lg:sticky lg:top-28"
            style={{
              borderColor: "rgba(18,189,251,0.2)",
              boxShadow: "0 8px 44px rgba(12,31,46,0.09)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.12)" }}
            >
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "#12BDFB" }}
                >
                  Water Quality Report
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.4)" }}>
                  Indiana Average · 2024
                </p>
              </div>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#f97316" }}
              >
                Action Needed
              </span>
            </div>

            {/* Readings */}
            <div className="p-6 space-y-5">
              {waterReadings.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "rgba(12,31,46,0.6)" }}
                    >
                      {row.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: "rgba(12,31,46,0.75)" }}
                      >
                        {row.value}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${row.color}22`,
                          color: row.color,
                        }}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(12,31,46,0.07)" }}
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${row.pct}%` } : {}}
                      transition={{
                        duration: 1.1,
                        delay: 0.5 + i * 0.12,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${row.color}99, ${row.color})`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t flex items-center justify-between"
              style={{
                borderColor: "rgba(18,189,251,0.1)",
                backgroundColor: "rgba(18,189,251,0.02)",
              }}
            >
              <p className="text-xs" style={{ color: "rgba(12,31,46,0.38)" }}>
                Your results may vary — we test on-site, free.
              </p>
              <Link
                href="/contact"
                className="text-xs font-semibold flex items-center gap-1.5 transition-colors"
                style={{ color: "#12BDFB" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0097C4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#12BDFB")}
              >
                Book Free Test <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
