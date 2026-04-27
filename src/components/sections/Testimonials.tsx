"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Otter from "@/components/ui/Otter";

const reviews = [
  {
    quote: "We had orange stains on everything. Sinks, toilets, the shower. Aqua Otter came out, tested our well water, and installed a system that weekend. Two months later, not a single stain. I wish we'd done it years ago.",
    name: "Mike & Sarah T.",
    location: "Noblesville, IN",
    stars: 5,
    system: "Well Water",
    featured: true,
  },
  {
    quote: "Best decision we ever made for our family. The water tastes incredible and our skin feels so much better. My daughter's eczema has basically disappeared.",
    name: "The Johnson Family",
    location: "Fishers, IN",
    stars: 5,
    system: "Water Softener",
  },
  {
    quote: "I was skeptical. Seemed too good to be true. But the water test showed things I never expected, and the system they recommended was exactly right. Zero pressure, just results.",
    name: "David R.",
    location: "Carmel, IN",
    stars: 5,
    system: "Whole-Home",
  },
  {
    quote: "Our dishwasher used to leave spots on every glass. Within a week of the softener going in, everything came out crystal clear. Small thing, but I notice it every single day.",
    name: "Jennifer L.",
    location: "Indianapolis, IN",
    stars: 5,
    system: "Water Softener",
  },
  {
    quote: "Installed a reverse osmosis system under our sink. Bottled water has been off our grocery list for 8 months now. The math pays for itself.",
    name: "Tom K.",
    location: "Greenwood, IN",
    stars: 5,
    system: "Reverse Osmosis",
  },
  {
    quote: "They found bacteria in our well that the county tests never flagged. UV system and filtration got installed the next day. Peace of mind is worth every penny.",
    name: "Rachel M.",
    location: "Zionsville, IN",
    stars: 5,
    system: "UV Purification",
  },
  {
    quote: "Professional from the quote to the clean-up. Didn't upsell us on anything we didn't need. Three neighbors asked who did our install after seeing the work.",
    name: "Brian H.",
    location: "Westfield, IN",
    stars: 5,
    system: "Whole-Home",
  },
  {
    quote: "The free water test was no gimmick. They walked us through everything they found, what it meant, and what our options were. Bought a softener, haven't looked back.",
    name: "Angela P.",
    location: "Fishers, IN",
    stars: 5,
    system: "Water Softener",
  },
  {
    quote: "Our hair and skin feel different. That's the quietest pitch I can give, but it's the most honest one.",
    name: "Monica D.",
    location: "Carmel, IN",
    stars: 5,
    system: "Water Softener",
  },
  {
    quote: "I'm an engineer. I read every spec sheet they put in front of me. The system they recommended was the right one. No fluff.",
    name: "Steven W.",
    location: "Noblesville, IN",
    stars: 5,
    system: "Reverse Osmosis",
  },
  {
    quote: "We had a showroom install. Eight-year warranty, lifetime support. They've been out twice for free checkups without me even asking.",
    name: "Karen B.",
    location: "Fort Wayne, IN",
    stars: 5,
    system: "Whole-Home",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ r, featured = false, delay = 0 }: { r: typeof reviews[number]; featured?: boolean; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative break-inside-avoid mb-5 rounded-2xl p-6 transition-all duration-200"
      style={{
        backgroundColor: featured ? "#0C1F2E" : "#ffffff",
        border: featured ? "1px solid rgba(18,189,251,0.2)" : "1px solid rgba(12,31,46,0.08)",
        boxShadow: featured
          ? "0 10px 40px rgba(12,31,46,0.12)"
          : "0 2px 10px rgba(12,31,46,0.04)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <Stars n={r.stars} />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: featured ? "rgba(18,189,251,0.14)" : "rgba(18,189,251,0.08)",
            color: "#12BDFB",
          }}
        >
          {r.system}
        </span>
      </div>

      <blockquote
        className={featured ? "font-display font-light italic leading-[1.3]" : "leading-[1.6]"}
        style={{
          fontSize: featured ? "clamp(1.4rem, 2.2vw, 1.9rem)" : "0.95rem",
          color: featured ? "rgba(255,255,255,0.92)" : "#0C1F2E",
        }}
      >
        &ldquo;{r.quote}&rdquo;
      </blockquote>

      <div
        className="flex items-center gap-3 mt-5 pt-4"
        style={{ borderTop: `1px solid ${featured ? "rgba(255,255,255,0.08)" : "rgba(12,31,46,0.06)"}` }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            backgroundColor: featured ? "rgba(18,189,251,0.18)" : "rgba(18,189,251,0.1)",
            color: "#12BDFB",
          }}
        >
          {r.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: featured ? "#ffffff" : "#0C1F2E" }}
          >
            {r.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: featured ? "rgba(255,255,255,0.45)" : "rgba(12,31,46,0.45)" }}
          >
            {r.location}
          </p>
        </div>
        {/* Google mark */}
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" aria-hidden>
          <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = reviews.find(r => r.featured)!;
  const rest = reviews.filter(r => !r.featured);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F7FAFC" }}
    >
      {/* Subtle decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 10%, rgba(18,189,251,0.07) 0%, transparent 55%), " +
            "radial-gradient(ellipse 40% 35% at 10% 90%, rgba(18,189,251,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Ghost quote mark */}
      <div
        aria-hidden
        className="absolute select-none pointer-events-none font-display font-bold"
        style={{
          fontSize: "38vw",
          color: "rgba(12,31,46,0.025)",
          lineHeight: 1,
          top: "-4vw",
          left: "-3vw",
          letterSpacing: "-0.05em",
        }}
      >
        &ldquo;
      </div>

      <div
        className="container-site relative z-10"
        style={{
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#12BDFB" }}>
              What Homeowners Say
            </span>
            <div className="flex items-start gap-4">
              <h2
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}
              >
                Proof that<br />it actually works.
              </h2>
              <Otter pose="thumbsup" width={100} shadow="soft" className="hidden md:block flex-shrink-0" style={{ marginTop: -6 }} alt="Otter giving a thumbs up" />
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(12,31,46,0.08)", boxShadow: "0 2px 8px rgba(12,31,46,0.04)" }}>
              <Stars n={5} />
              <span className="text-sm font-bold" style={{ color: "#0C1F2E" }}>5.0</span>
              <span className="text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>· 500+ reviews</span>
              <svg className="w-4 h-4 ml-1" viewBox="0 0 48 48" aria-hidden>
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(12,31,46,0.5)" }}>
              <span><b style={{ color: "#0C1F2E" }}>5,000+</b> families served</span>
              <span className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.15)" }} />
              <span><b style={{ color: "#0C1F2E" }}>100%</b> satisfaction</span>
              <span className="w-px h-3" style={{ backgroundColor: "rgba(12,31,46,0.15)" }} />
              <span><b style={{ color: "#0C1F2E" }}>25+</b> years</span>
            </div>
          </div>
        </motion.div>

        {/* Masonry layout — featured spans 2 cols on desktop */}
        <div
          className="gap-5"
          style={{
            columnCount: 1,
            columnGap: "1.25rem",
          }}
        >
          <div className="hidden">{/* spacer */}</div>
        </div>
        <div
          style={{
            columnGap: "1.25rem",
          }}
          className="[column-count:1] md:[column-count:2] lg:[column-count:3]"
        >
          <ReviewCard r={featured} featured delay={0} />
          {rest.map((r, i) => (
            <ReviewCard key={r.name} r={r} delay={0.06 + i * 0.04} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5"
          style={{ backgroundColor: "#0C1F2E", border: "1px solid rgba(18,189,251,0.18)" }}
        >
          <div>
            <p className="font-display font-bold text-white" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
              Join 5,000+ Indiana families with cleaner water.
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              Free water test. Same-week install. No pressure.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/reviews" className="text-sm font-semibold transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              Read all reviews
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.35)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
            >
              Get Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
