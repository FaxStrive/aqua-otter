"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.7]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-water-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-water.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-primary-dark)]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Color tints for brand feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(18,189,251,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(251,191,132,0.06),transparent_50%)]" />

      <div className="max-w-content mx-auto px-6 relative z-10 w-full pt-28 lg:pt-32">
        <div className="grid lg:grid-cols-[1fr,420px] gap-8 items-end">
          <motion.div style={{ y: textY }} className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-5">
                <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                Family-Owned &middot; Serving 6 States &middot; 25+ Years Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading font-bold text-white leading-[1.08] mb-5 text-balance"
              style={{ fontSize: "var(--text-hero)" }}
            >
              The <span className="text-[var(--color-accent)]">LAST</span> Water System
              <br className="hidden sm:block" />
              You Will <span className="text-[var(--color-primary)]">EVER</span> Need
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/75 mb-8 max-w-lg leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              We test first, customize second, and don&apos;t stop until you&apos;re
              completely satisfied. Specializing in well water treatment and
              no-salt hard water solutions across the Midwest.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-[var(--color-text)] rounded-lg px-7 py-4 text-sm font-semibold hover:brightness-110 transition-all gold-glow group"
              >
                Schedule Your Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:6166121660"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-7 py-4 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (616) 612-1660
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/15"
            >
              {[
                "Free In-Home Water Testing",
                "Free Installation",
                "Made in USA",
                "Lifetime Warranty",
              ].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="text-xs text-white/60 font-medium flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Big otter mascot — arms crossed, confident */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative flex justify-center lg:block mt-8 lg:mt-0"
          >
            <Image
              src="/client/otter-arms-crossed.png"
              alt="Aqua Otter Mascot — Your Water Expert"
              width={400}
              height={500}
              className="w-48 sm:w-64 lg:w-[420px] h-auto object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
              priority
            />

            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute -top-4 -left-16 bg-white/95 backdrop-blur-sm rounded-2xl rounded-br-sm px-4 py-2.5 shadow-xl max-w-[180px]"
            >
              <p className="text-[11px] font-semibold text-[var(--color-primary-dark)] leading-tight">
                &ldquo;Your water&apos;s not as clean as you think.&rdquo;
              </p>
              <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5 font-medium">— The Aqua Otter</p>
            </motion.div>

            {/* Stat badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.4 }}
              className="absolute top-16 -right-4"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg"
              >
                <p className="text-[22px] font-bold text-white leading-none">2,500+</p>
                <p className="text-[9px] text-white/60 font-medium">Families Protected</p>
              </motion.div>
            </motion.div>

            {/* Badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.4 }}
              className="absolute bottom-24 -left-12"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-[var(--color-accent)] text-[var(--color-text)] rounded-full px-4 py-1.5 shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide">Free Water Test</p>
              </motion.div>
            </motion.div>

            {/* Experience badge — mid left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8, duration: 0.4 }}
              className="absolute top-1/2 -left-20"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="text-[var(--color-accent)] text-lg">★</span>
                <div>
                  <p className="text-[11px] font-bold text-white leading-none">25+ Years</p>
                  <p className="text-[8px] text-white/50">Trusted Experts</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
    </section>
  );
}
