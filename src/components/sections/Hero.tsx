"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Otter placeholder shown until the hero video has buffered enough to play.
const VIDEO_BACKDROP =
  "linear-gradient(rgba(7,17,26,0.25), rgba(7,17,26,0.55)), url('/client/otter-closeup.png') center/cover no-repeat, #07111A";

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const [mobileReady, setMobileReady] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);

  useEffect(() => {
    const tryPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay(mobileVideoRef.current);
    tryPlay(desktopVideoRef.current);
  }, []);

  return (
    <>
      {/* ────────────────────────── MOBILE LAYOUT ────────────────────────── */}
      <section
        className="relative overflow-hidden lg:hidden"
        style={{ backgroundColor: "#ffffff", minHeight: "100svh", paddingTop: "clamp(80px, 11vh, 120px)" }}
      >
        {/* Soft cyan glow accent */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 40% at 50% 25%, rgba(18,189,251,0.08) 0%, transparent 65%)" }}
        />

        {/* Eyebrow */}
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-5 mb-6"
          >
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "#12BDFB" }}>
              Manufacturer Direct
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(12,31,46,0.08)" }} />
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase" style={{ color: "rgba(12,31,46,0.3)" }}>
              Indiana &amp; Michigan
            </span>
          </motion.div>
        </div>

        {/* Video showcase — top stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-4 rounded-3xl overflow-hidden mb-8"
          style={{
            height: "clamp(280px, 42vh, 420px)",
            border: "1px solid rgba(18,189,251,0.18)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(18,189,251,0.08)",
            background: VIDEO_BACKDROP,
          }}
        >
          <video
            ref={mobileVideoRef}
            autoPlay loop muted playsInline
            preload="auto"
            src="/videos/hero-water-mobile.mp4"
            onCanPlayThrough={() => setMobileReady(true)}
            onPlaying={() => setMobileReady(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: mobileReady ? 1 : 0 }}
          />


          {/* Subtle inner vignette so card edges feel premium without darkening the video */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 80px rgba(7,17,26,0.4)" }}
          />

          {/* Soft bottom fade so floating chip stays readable */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(7,17,26,0.7), transparent)" }}
          />

          {/* Top status pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(7,17,26,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(18,189,251,0.25)" }}
          >
            <motion.span
              className="block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#12BDFB" }}
              animate={!shouldReduce ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#ffffff" }}>
              Pure Water · Live
            </span>
          </motion.div>

          {/* Bottom floating stat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
            style={{ backgroundColor: "rgba(7,17,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              <p className="font-display leading-none mb-0.5" style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 500 }}>
                99.9% pure
              </p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                Three-stage filtration
              </p>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3" viewBox="0 0 20 20" fill="#f59e0b">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Content below video */}
        <div className="container-site relative z-10 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-display mb-5"
            style={{ fontSize: "clamp(2.6rem, 11vw, 4rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontWeight: 400, color: "#0C1F2E" }}
          >
            The water system<br />no competitor{" "}
            <em style={{ color: "#12BDFB", fontStyle: "italic" }}>can&nbsp;replicate.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="leading-[1.7] mb-7"
            style={{ fontSize: "0.98rem", maxWidth: "40ch", color: "rgba(12,31,46,0.55)", fontWeight: 400 }}
          >
            We design, build, and install every system in-house. No middlemen. No compromises. Custom-engineered for your home&apos;s water chemistry and warranted for life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-7"
          >
            <Link
              href="/get-started"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#07111A", letterSpacing: "0.01em", boxShadow: "0 4px 24px rgba(18,189,251,0.3)" }}
            >
              Schedule Free Water Test
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="tel:+13179835919"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border text-sm font-medium transition-all duration-200"
              style={{ color: "rgba(12,31,46,0.7)", borderColor: "rgba(12,31,46,0.18)" }}
            >
              <Phone className="w-3.5 h-3.5" />
              (317) 983-5919
            </a>
          </motion.div>

          {/* Proof strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="flex items-center gap-4 flex-wrap mb-8"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: "#0C1F2E" }}>500+ reviews</span>
            </div>
            <div className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
            <span className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>Lifetime warranty</span>
            <div className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
            <span className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>Same-week installation</span>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex items-center gap-6 pt-7"
            style={{ borderTop: "1px solid rgba(12,31,46,0.1)" }}
          >
            {[
              { val: "99.9%", lab: "Contaminant removal" },
              { val: "5,000+", lab: "Homes served" },
              { val: "7 days", lab: "Avg install" },
            ].map((s, i) => (
              <div key={s.lab} className="flex items-center gap-6">
                <div>
                  <p className="font-display leading-none mb-0.5" style={{ fontSize: "1.3rem", fontWeight: 400, color: "#0C1F2E" }}>{s.val}</p>
                  <p className="text-[10px]" style={{ color: "rgba(12,31,46,0.45)", letterSpacing: "0.03em" }}>{s.lab}</p>
                </div>
                {i < 2 && <div className="w-px h-6" style={{ backgroundColor: "rgba(12,31,46,0.1)" }} />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── DESKTOP LAYOUT ────────────────────────── */}
      <section
        className="relative overflow-hidden hidden lg:flex"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "100svh",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(88px, 14vh, 160px)",
          paddingBottom: "clamp(40px, 6vh, 80px)",
        }}
      >
        {/* Video — right 48% */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute top-0 bottom-0 right-0 pointer-events-none overflow-hidden w-[48%]"
          style={{ zIndex: 1, background: VIDEO_BACKDROP }}
        >
          <video
            ref={desktopVideoRef}
            autoPlay loop muted playsInline
            preload="auto"
            src="/videos/hero-water.mp4"
            onCanPlayThrough={() => setDesktopReady(true)}
            onPlaying={() => setDesktopReady(true)}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: desktopReady ? 1 : 0 }}
          />

          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 8%, rgba(255,255,255,0) 22%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.7) 100%)" }} />
        </motion.div>

        <div className="container-site relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-5 mb-10"
          >
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "#12BDFB" }}>
              Manufacturer Direct
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(12,31,46,0.08)" }} />
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase" style={{ color: "rgba(12,31,46,0.3)" }}>
              Indiana &amp; Michigan
            </span>
          </motion.div>

          <div className="grid grid-cols-[minmax(0,580px)_1fr] gap-16 items-center">
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="font-display mb-6"
                style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em", fontWeight: 400, color: "#0C1F2E" }}
              >
                The water system<br />no competitor{" "}
                <em style={{ color: "#12BDFB", fontStyle: "italic" }}>can&nbsp;replicate.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="leading-[1.7] mb-8"
                style={{ fontSize: "clamp(0.95rem, 3vw, 1.06rem)", maxWidth: "40ch", fontWeight: 400, color: "rgba(12,31,46,0.5)" }}
              >
                We design, build, and install every system in-house. No middlemen. No compromises. Custom-engineered for your home&apos;s water chemistry and warranted for life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  href="/get-started"
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
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ color: "rgba(12,31,46,0.65)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#12BDFB"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(12,31,46,0.65)"; }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  (317) 983-5919
                </a>
              </motion.div>

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
                  <span className="text-xs font-semibold" style={{ color: "#0C1F2E" }}>500+ reviews</span>
                </div>
                <div className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
                <span className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>Lifetime warranty</span>
                <div className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.12)" }} />
                <span className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>Same-week installation</span>
              </motion.div>
            </div>

            <div />
          </div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="flex absolute bottom-10 right-8 items-center gap-6 rounded-xl px-6 py-4"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(12,31,46,0.06)", boxShadow: "0 8px 40px rgba(12,31,46,0.08)", zIndex: 10 }}
          >
            {[
              { val: "99.9%", lab: "Contaminant removal" },
              { val: "5,000+", lab: "Homes served" },
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
    </>
  );
}
