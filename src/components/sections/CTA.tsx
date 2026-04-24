"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

const guarantees = [
  "Free in-home water test",
  "No-pressure consultation",
  "Same-week installation available",
  "Lifetime warranty on all systems",
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#07111A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.1), transparent)" }}
      />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="py-24 md:py-36 lg:pr-16"
          >
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5 block"
              style={{ color: "#12BDFB" }}
            >
              Get Started Today
            </span>

            <h2
              className="font-display font-bold leading-[0.9] mb-5"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#ffffff" }}
            >
              Ready to see<br />
              what&apos;s in your<br />
              <span style={{ color: "#12BDFB", textShadow: "0 0 40px rgba(18,189,251,0.3)" }}>water?</span>
            </h2>

            <p
              className="text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              We test your water on-site, show you exactly what we find, and design a system built for your home&apos;s chemistry. No commitment required.
            </p>

            {/* Guarantees */}
            <ul className="space-y-2.5 mb-10">
              {guarantees.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                    style={{ backgroundColor: "rgba(18,189,251,0.12)", color: "#12BDFB" }}
                  >
                    ✓
                  </span>
                  {g}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "#12BDFB",
                  color: "#0C1F2E",
                  boxShadow: "0 4px 20px rgba(18,189,251,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0097C4";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(18,189,251,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#12BDFB";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(18,189,251,0.3)";
                }}
              >
                Schedule Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:+13179835919"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border text-sm font-medium transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)";
                  e.currentTarget.style.color = "#12BDFB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                (317) 983-5919
              </a>
            </div>

            <p
              className="mt-6 text-xs tracking-[0.08em] uppercase"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Available Mon–Sat &nbsp;·&nbsp; Indiana &amp; Michigan
            </p>
          </motion.div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/client/service-tech-handshake.jpg"
                alt="Aqua Otter technician with customer"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(7,17,26,0.85) 0%, rgba(7,17,26,0.3) 35%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 right-8 rounded-2xl border px-5 py-4"
              style={{
                backgroundColor: "rgba(10,24,37,0.88)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(18,189,251,0.16)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-semibold" style={{ color: "#ffffff" }}>
                500+ verified reviews
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                across Indiana &amp; Michigan
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
