"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(88px, 14vh, 160px)",
        paddingBottom: "clamp(40px, 6vh, 80px)",
      }}
    >
      {/* Mobile: dark background behind video */}
      <div className="absolute inset-0 lg:hidden" style={{ backgroundColor: "#07111A", zIndex: 0 }} />

      {/* Video — full-width on mobile, right 48% on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute top-0 bottom-0 right-0 pointer-events-none overflow-hidden w-full lg:w-[48%]"
        style={{ zIndex: 1 }}
      >
        <video
          autoPlay loop muted playsInline
          poster="/videos/hero-water-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-water.mp4" type="video/mp4" />
        </video>

        {/* Mobile overlay */}
        <div className="absolute inset-0 lg:hidden" style={{ background: "rgba(7,17,26,0.72)" }} />

        {/* Desktop: white fade left edge */}
        <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 8%, rgba(255,255,255,0) 22%)" }} />
        {/* Desktop: top/bottom softening */}
        <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.7) 100%)" }} />
      </motion.div>

      <div className="container-site relative z-10 w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "#12BDFB" }}>
            Manufacturer Direct
          </span>
          {/* Mobile divider */}
          <div className="h-px flex-1 lg:hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          {/* Desktop divider */}
          <div className="h-px flex-1 hidden lg:block" style={{ backgroundColor: "rgba(12,31,46,0.08)" }} />
          {/* Mobile label */}
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase lg:hidden" style={{ color: "rgba(255,255,255,0.3)" }}>
            Indiana &amp; Michigan
          </span>
          {/* Desktop label */}
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase hidden lg:inline" style={{ color: "rgba(12,31,46,0.3)" }}>
            Indiana &amp; Michigan
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,580px)_1fr] gap-12 lg:gap-16 items-center">
          <div className="relative z-10">

            {/* Headline — mobile white, desktop dark */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-display mb-6"
              style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontWeight: 400 }}
            >
              {/* Mobile */}
              <span className="text-white lg:hidden">
                The water system<br />no competitor{" "}
                <em style={{ color: "#12BDFB", fontStyle: "italic" }}>can&nbsp;replicate.</em>
              </span>
              {/* Desktop */}
              <span className="hidden lg:inline" style={{ color: "#0C1F2E" }}>
                The water system<br />no competitor{" "}
                <em style={{ color: "#12BDFB", fontStyle: "italic" }}>can&nbsp;replicate.</em>
              </span>
            </motion.h1>

            {/* Body — mobile white, desktop dark */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-[1.7] mb-8"
              style={{ fontSize: "clamp(0.95rem, 3vw, 1.06rem)", maxWidth: "40ch", fontWeight: 400 }}
            >
              <span className="lg:hidden" style={{ color: "rgba(255,255,255,0.55)" }}>
                We design, build, and install every system in-house. No middlemen. No compromises. Custom-engineered for your home&apos;s water chemistry and warranted for life.
              </span>
              <span className="hidden lg:inline" style={{ color: "rgba(12,31,46,0.5)" }}>
                We design, build, and install every system in-house. No middlemen. No compromises. Custom-engineered for your home&apos;s water chemistry and warranted for life.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: "#12BDFB", color: "#07111A", letterSpacing: "0.01em" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
              >
                Schedule Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:+13179835919"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border text-sm font-medium transition-all duration-200 lg:border-transparent lg:px-0"
                style={{ color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.18)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#12BDFB"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              >
                <Phone className="w-3.5 h-3.5" />
                (317) 983-5919
              </a>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
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
                <span className="text-xs font-semibold lg:hidden" style={{ color: "rgba(255,255,255,0.8)" }}>500+ reviews</span>
                <span className="text-xs font-semibold hidden lg:inline" style={{ color: "#0C1F2E" }}>500+ reviews</span>
              </div>
              <div className="w-px h-3 lg:hidden" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              <div className="w-px h-3 hidden lg:block" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
              <span className="text-xs lg:hidden" style={{ color: "rgba(255,255,255,0.4)" }}>Lifetime warranty</span>
              <span className="text-xs hidden lg:inline" style={{ color: "rgba(12,31,46,0.35)" }}>Lifetime warranty</span>
              <div className="w-px h-3 lg:hidden" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              <div className="w-px h-3 hidden lg:block" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
              <span className="text-xs lg:hidden" style={{ color: "rgba(255,255,255,0.4)" }}>Same-week installation</span>
              <span className="text-xs hidden lg:inline" style={{ color: "rgba(12,31,46,0.35)" }}>Same-week installation</span>
            </motion.div>

            {/* Mobile stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="lg:hidden flex items-center gap-6 mt-8 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              {[
                { val: "99.9%", lab: "Contaminant removal" },
                { val: "500+",  lab: "Homes served" },
                { val: "7 days", lab: "Avg install" },
              ].map((s, i) => (
                <div key={s.lab} className="flex items-center gap-6">
                  <div>
                    <p className="font-display leading-none mb-0.5 text-white" style={{ fontSize: "1.3rem", fontWeight: 400 }}>{s.val}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em" }}>{s.lab}</p>
                  </div>
                  {i < 2 && <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block" />
        </div>

        {/* Desktop floating stats card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="hidden lg:flex absolute bottom-10 right-8 items-center gap-6 rounded-xl px-6 py-4"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(12,31,46,0.06)", boxShadow: "0 8px 40px rgba(12,31,46,0.08)", zIndex: 10 }}
        >
          {[
            { val: "99.9%", lab: "Contaminant removal" },
            { val: "500+",  lab: "Homes served" },
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          className="w-px rounded-full mx-auto"
          style={{ height: 32, background: "linear-gradient(to bottom, rgba(12,31,46,0.15), rgba(12,31,46,0.03))" }}
          animate={!shouldReduce ? { opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
