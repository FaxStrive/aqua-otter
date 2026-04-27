"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#07111A",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(88px, 14vh, 160px)",
        paddingBottom: "clamp(40px, 6vh, 80px)",
      }}
    >
      {/* ── Full-bleed cinematic video — mobile: full BG, desktop: right half ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute top-0 bottom-0 right-0 pointer-events-none overflow-hidden lg:w-[48%] w-full"
        style={{ zIndex: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-water-poster.jpg"
          className="w-full h-full object-cover"
          style={{ backgroundColor: "#07111A" }}
        >
          <source src="/videos/hero-water.mp4" type="video/mp4" />
        </video>

        {/* Mobile: dark overlay so text reads cleanly */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(7,17,26,0.72)" }}
        />

        {/* Desktop: white fade from left into headline */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 8%, rgba(255,255,255,0) 22%)",
          }}
        />

        {/* Desktop: top/bottom edge softening */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.7) 100%)",
          }}
        />
      </motion.div>

      <div className="container-site relative z-10 w-full">

        {/* ── Top eyebrow bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "#12BDFB" }}>
            Manufacturer Direct
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            Indiana &amp; Michigan
          </span>
        </motion.div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,580px)_1fr] gap-12 lg:gap-16 items-center">

          {/* Left: headline + copy + CTA */}
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-display mb-6"
              style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)", lineHeight: 0.95, color: "#ffffff", letterSpacing: "-0.02em", fontWeight: 400 }}
            >
              The water system<br />
              no competitor{" "}
              <em style={{ color: "#12BDFB", fontStyle: "italic" }}>can&nbsp;replicate.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-[1.7] mb-8"
              style={{ fontSize: "clamp(0.95rem, 3vw, 1.06rem)", color: "rgba(255,255,255,0.55)", maxWidth: "40ch", fontWeight: 400 }}
            >
              We design, build, and install every system in-house. No middlemen. No compromises. Custom-engineered for your home&apos;s water chemistry and warranted for life.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: "#12BDFB", color: "#07111A", letterSpacing: "0.01em" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
              >
                Schedule Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="tel:+13179835919"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border text-sm font-medium transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#12BDFB"; e.currentTarget.style.borderColor = "#12BDFB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              >
                <Phone className="w-3.5 h-3.5" />
                (317) 983-5919
              </a>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>500+ reviews</span>
              </div>
              <div className="w-px h-3" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Lifetime warranty</span>
              <div className="w-px h-3" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Same-week installation</span>
            </motion.div>

            {/* Mobile stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:hidden flex items-center gap-6 mt-8 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              {[
                { val: "99.9%", lab: "Contaminant removal" },
                { val: "500+", lab: "Homes served" },
                { val: "7 days", lab: "Avg install" },
              ].map((s, i) => (
                <div key={s.lab} className="flex items-center gap-6">
                  <div>
                    <p className="font-display leading-none mb-0.5" style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: 400 }}>{s.val}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em" }}>{s.lab}</p>
                  </div>
                  {i < 2 && <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — empty spacer, video is absolute behind */}
          <div className="hidden lg:block" />
        </div>

        {/* ── Floating stats strip over the video — desktop only ───── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="hidden lg:flex absolute bottom-10 right-8 items-center gap-6 rounded-xl px-6 py-4"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(12,31,46,0.06)", boxShadow: "0 8px 40px rgba(12,31,46,0.08)", zIndex: 10 }}
        >
          {[
            { val: "99.9%", lab: "Contaminant removal" },
            { val: "500+", lab: "Homes served" },
            { val: "7 days", lab: "Average install" },
          ].map((s, i) => (
            <div key={s.lab} className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-display leading-none mb-1" style={{ fontSize: "1.4rem", color: "#0C1F2E", fontWeight: 400 }}>{s.val}</p>
                <p className="text-[10px]" style={{ color: "rgba(12,31,46,0.45)", letterSpacing: "0.03em" }}>{s.lab}</p>
              </div>
              {i < 2 && <div className="w-px h-7" style={{ backgroundColor: "rgba(12,31,46,0.1)" }} />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          className="w-px rounded-full"
          style={{ height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.04))" }}
          animate={!shouldReduce ? { opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
