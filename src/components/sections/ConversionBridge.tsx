"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";

const PROOF = [
  { icon: Shield, value: "Lifetime", label: "Warranty on every system" },
  { icon: Clock,  value: "7 Days",   label: "Average install time" },
  { icon: Award,  value: "500+",     label: "5-star reviews" },
];

export default function ConversionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Top edge line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.2), transparent)" }}
      />

      <div className="container-site py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Left: urgency + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "#12BDFB" }}
            >
              Your Water. Your Health.
            </span>

            <h2
              className="font-display font-bold leading-[0.88] mb-5"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                color: "#0C1F2E",
                letterSpacing: "-0.03em",
              }}
            >
              You just saw what&apos;s<br />
              in your water.<br />
              <span style={{ color: "rgba(12,31,46,0.16)" }}>Now fix it.</span>
            </h2>

            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "rgba(12,31,46,0.45)", maxWidth: "38ch" }}
            >
              We test your water on-site for free. No pressure, no commitment.
              Just a clear picture of what&apos;s in your water and exactly how
              to fix it.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: "#0C1F2E",
                  color: "#ffffff",
                  boxShadow: "0 4px 24px rgba(12,31,46,0.22)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#12BDFB";
                  e.currentTarget.style.color = "#0C1F2E";
                  e.currentTarget.style.boxShadow = "0 4px 28px rgba(18,189,251,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0C1F2E";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(12,31,46,0.22)";
                }}
              >
                Schedule Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="tel:+13179835919"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: "rgba(12,31,46,0.14)",
                  color: "rgba(12,31,46,0.55)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#12BDFB";
                  e.currentTarget.style.color = "#12BDFB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(12,31,46,0.14)";
                  e.currentTarget.style.color = "rgba(12,31,46,0.55)";
                }}
              >
                Call (317) 983-5919
              </a>
            </div>

            <p className="text-[11px]" style={{ color: "rgba(12,31,46,0.25)" }}>
              Available Mon through Sat &middot; Indiana &amp; Michigan
            </p>
          </motion.div>

          {/* Right: proof cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROOF.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border p-6 text-center"
                style={{
                  backgroundColor: "#F8FCFF",
                  borderColor: "rgba(18,189,251,0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(18,189,251,0.08)" }}
                >
                  <p.icon className="w-4.5 h-4.5" style={{ color: "#12BDFB" }} />
                </div>
                <p
                  className="font-display font-bold leading-none mb-1.5"
                  style={{ fontSize: "1.5rem", color: "#0C1F2E" }}
                >
                  {p.value}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: "rgba(12,31,46,0.4)" }}>
                  {p.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
