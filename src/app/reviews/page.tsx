"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight, Quote } from "lucide-react";
import Wave from "@/components/ui/Wave";

const reviews = [
  { name: "Daniel Hernandez", location: "Google Review", date: "April 2026", stars: 5, quote: "Morgan took the time to walk me through all the options and helped me find the perfect system for my home. The installation was fast and clean, and the water quality change was immediately noticeable. Could not be happier." },
  { name: "Travis Stelly", location: "Google Review", date: "April 2026", stars: 5, quote: "Sierra was super helpful and made the whole process easy to understand. Great team, great product. Our water tastes incredible now and we have not had a single issue since installation." },
  { name: "Ernie Bojrab", location: "Google Review", date: "March 2026", stars: 5, quote: "Justin Robb did an incredible job handling the situation I had replacing our water filter. Professional, knowledgeable, and got everything done fast. This company is the real deal." },
  { name: "Jeff Krauter", location: "Google Review", date: "December 2025", stars: 5, quote: "Excellent customer service and the water quality has been fantastic since installation. The team was professional and efficient. I recommend Aqua Otter to everyone who asks about water treatment." },
  { name: "Benjamin T.", location: "Google Review", date: "December 2025", stars: 5, quote: "The system has been running perfectly with zero issues. Best investment we made for our home. Our water tastes better than bottled and we are saving so much money not buying water anymore." },
  { name: "Gerald Mitchell", location: "Google Review", date: "November 2025", stars: 5, quote: "Above and beyond on the install. The team was professional and took the time to explain everything about how the system works. We had well water issues for years and this solved everything completely." },
  { name: "Mike & Sarah T.", location: "Noblesville, IN", date: "2025", stars: 5, quote: "We had orange stains on everything — sinks, toilets, the shower. Aqua Otter came out, tested our well water, and installed a system that weekend. Two months later, not a single stain. I wish we had done it years ago." },
  { name: "The Johnson Family", location: "Fishers, IN", date: "2025", stars: 5, quote: "Best decision we ever made for our family. The water tastes incredible and our skin feels so much better. My daughter's eczema has basically disappeared. The free water test was genuinely eye-opening." },
  { name: "Brittany Hobbs", location: "Google Review", date: "October 2025", stars: 5, quote: "The difference in our water quality is night and day. We noticed it immediately after installation. The team was friendly, on time, and left everything spotless. Absolutely love our new system." },
  { name: "David R.", location: "Carmel, IN", date: "2025", stars: 5, quote: "I was skeptical — seemed too good to be true. But the water test showed things I never expected, and the system they recommended was exactly right. Zero pressure, just results." },
  { name: "Shelly Ganger", location: "Google Review", date: "August 2025", stars: 5, quote: "Best purchase we have made. The water quality is amazing and we haven't had a single issue in over three years. The annual maintenance service is easy to schedule and they are always professional." },
  { name: "Michelle Rhodes", location: "Google Review", date: "February 2025", stars: 5, quote: "Aqua Otter solved it completely. The team was professional, on time, and thorough. They explained every step of the process and followed up after installation to make sure everything was working perfectly." },
  { name: "Val Fowler", location: "Google Review", date: "October 2024", stars: 5, quote: "Our water tastes incredible now — better than bottled. The whole process from the free water test to installation was seamless. I have already recommended them to three neighbors." },
  { name: "Mike Jameson", location: "Google Review", date: "June 2024", stars: 5, quote: "The water tastes great and our appliances are already showing less scale buildup. The technician was incredibly knowledgeable and explained exactly why he was recommending the system he chose for us." },
  { name: "Cathy Tooley", location: "Google Review", date: "July 2023", stars: 5, quote: "Have not had a single issue. The water quality is consistently excellent and the system runs quietly in the background. Best home investment we have made in years." },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#f59e0b" }} />
      ))}
    </div>
  );
}

function RibbonCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-5"
      style={{
        width: 320,
        marginRight: 16,
        backgroundColor: "#ffffff",
        border: "1px solid rgba(18,189,251,0.1)",
        boxShadow: "0 2px 12px rgba(12,31,46,0.05)",
      }}
    >
      <Stars count={review.stars} />
      <p
        className="text-xs leading-relaxed mt-3 mb-4"
        style={{ color: "rgba(12,31,46,0.62)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        &ldquo;{review.quote}&rdquo;
      </p>
      <div>
        <p className="text-xs font-semibold" style={{ color: "#0C1F2E" }}>{review.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.35)" }}>{review.location}</p>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const row1 = [...reviews.slice(0, 8), ...reviews.slice(0, 8)];
  const row2 = [...reviews.slice(7), ...reviews.slice(7)];

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left { animation: marquee-left 48s linear infinite; }
        .marquee-right { animation: marquee-right 52s linear infinite; }
        .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "50vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(48px, 6vh, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 55% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none" style={{ width: 400, height: 400, borderRadius: "50%", backgroundColor: "rgba(18,189,251,0.04)", border: "1px solid rgba(18,189,251,0.08)" }} />
        <div className="container-site relative z-10 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>5-Star Google Rating</span>
            </div>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#0C1F2E" }}>
              500+ families.<br />
              <span style={{ color: "#12BDFB" }}>All 5 stars.</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Stars count={5} />
              <span className="font-semibold">5.0</span>
              <span style={{ color: "rgba(12,31,46,0.4)" }}>BBB A+ Accredited</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEW RIBBON */}
      <section
        className="overflow-hidden"
        style={{ backgroundColor: "#F0F8FF", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        {/* Row 1: scrolls left */}
        <div className="mb-3" style={{ overflow: "hidden" }}>
          <div className="flex marquee-left" style={{ width: "max-content" }}>
            {row1.map((r, i) => <RibbonCard key={i} review={r} />)}
          </div>
        </div>

        {/* Row 2: scrolls right */}
        <div style={{ overflow: "hidden" }}>
          <div className="flex marquee-right" style={{ width: "max-content" }}>
            {row2.map((r, i) => <RibbonCard key={i} review={r} />)}
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#F0F8FF" variant="gentle" height={0} />

      {/* Reviews grid */}
      <section ref={gridRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-12 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(12,31,46,0.35)" }}>
              Every review, every customer
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E", lineHeight: 0.9 }}>
              Read them all.
            </h2>
          </motion.div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.6) }}
                className="break-inside-avoid rounded-3xl p-7 bg-white border"
                style={{ borderColor: "rgba(18,189,251,0.1)" }}
              >
                <Quote className="w-5 h-5 mb-4" style={{ color: "rgba(18,189,251,0.3)" }} />
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.65)" }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0C1F2E" }}>{r.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.38)" }}>
                      {r.location} &middot; {r.date}
                    </p>
                  </div>
                  <Stars count={r.stars} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#F0F8FF" to="#0C1F2E" variant="splash" height={80} />

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff" }}>
            Join 2,500+ satisfied families.
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36ch", margin: "0 auto 2rem" }}>
            Start with a free in-home water test. No cost, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#07111A", boxShadow: "0 0 30px rgba(18,189,251,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
          >
            Get Your Free Water Test
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
