"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Wave from "@/components/ui/Wave";

const categories = [
  {
    label: "Water Testing",
    faqs: [
      {
        q: "What does the free water test include?",
        a: "Our certified water specialist tests for hardness (GPG), iron content (mg/L), pH levels, chlorine (ppm), total dissolved solids (TDS), hydrogen sulfide, manganese, and bacterial indicators. You get a full written report and an on-the-spot explanation of what each reading means for your family.",
      },
      {
        q: "How long does the water test take?",
        a: "About 30 to 45 minutes from start to finish. We test right there in your home, explain the results clearly, and answer every question you have before we leave — with no pressure to do anything afterward.",
      },
      {
        q: "Is the water test really free? No hidden costs?",
        a: "Completely free. No cost, no obligation, and no credit card required. We believe every family deserves to know what is in their water, regardless of whether they buy a system from us.",
      },
      {
        q: "How do I prepare for a water test?",
        a: "No preparation needed. Just let us know if you have a water softener already installed, or if there are any specific concerns you want us to focus on. We bring all testing equipment.",
      },
      {
        q: "Is my water safe to drink right now?",
        a: "In most cases, municipal water meets EPA standards for immediate safety, but standards do not account for taste, hardness, or longer-term concerns like chlorine byproducts. Well water can vary significantly and should be tested annually. Our free test gives you a definitive answer for your specific water.",
      },
    ],
  },
  {
    label: "Treatment & Systems",
    faqs: [
      {
        q: "What is no-salt water treatment?",
        a: "No-salt systems use template-assisted crystallization (TAC) to convert dissolved calcium and magnesium into harmless crystals that cannot stick to surfaces. Unlike traditional softeners, they do not remove minerals from the water — they just change the form so scale cannot form. No salt bags, no brine discharge, virtually no maintenance.",
      },
      {
        q: "What is the difference between well water and city water treatment?",
        a: "City water is pre-treated by your municipality but typically contains chlorine, chloramines, and often elevated hardness. Well water is untreated and can contain iron, sulfur (hydrogen sulfide), manganese, bacteria, pH imbalances, and sediment depending on your aquifer. The treatment approach and equipment are different for each source, which is exactly why we test first.",
      },
      {
        q: "What systems do you carry?",
        a: "We carry a full range: water softeners (single, twin, and dual city), whole-home carbon filtration (Alpha 3000, Quintex 5), well water air injection systems, reverse osmosis (5-stage, 4-stage, whole-home, and alkaline), no-salt conditioners, UV purification systems, and specialty media for arsenic, fluoride, tannins, and more. All products are made in the USA.",
      },
      {
        q: "How long does installation take?",
        a: "Most installations are completed in 2 to 4 hours. Our technician handles all plumbing connections, system programming, and bypass valve installation. We clean up completely and walk you through your new system before leaving.",
      },
      {
        q: "Is installation really free?",
        a: "Yes — free installation on every system we sell. The system price is the full price. No separate labor fee, no trip charge.",
      },
      {
        q: "What maintenance do the systems require?",
        a: "Water softeners need salt refills approximately every 6 to 8 weeks depending on household size and water hardness. Filter-based systems require media or cartridge replacement every 1 to 3 years. Reverse osmosis membranes typically last 2 to 3 years. We offer annual maintenance programs with filter replacement reminders and service visits.",
      },
      {
        q: "What warranty do your systems come with?",
        a: "We offer a lifetime warranty on our systems. If anything fails due to manufacturing defect, we repair or replace it at no charge. We also offer a satisfaction guarantee — if your water quality is not right after installation, we make it right.",
      },
    ],
  },
  {
    label: "Service & Scheduling",
    faqs: [
      {
        q: "What areas do you serve?",
        a: "We serve homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina. In Indiana, we cover Indianapolis, Fishers, Carmel, Noblesville, Westfield, Zionsville, Greenwood, Columbus, Bloomington, South Bend, Fort Wayne, and surrounding areas. In Michigan, we cover Grand Rapids, Detroit Metro, Kalamazoo, and surrounding areas.",
      },
      {
        q: "How do I schedule a water test?",
        a: "Call or text us at (317) 983-5919, email info@myaquaotter.com, or fill out the form on our contact page. We respond within one business day and can often schedule within the same week.",
      },
      {
        q: "Do you offer emergency service?",
        a: "Yes. For system issues or urgent water quality concerns, call or text (317) 983-5919. We do our best to respond to existing customers promptly.",
      },
    ],
  },
  {
    label: "Pricing & Payment",
    faqs: [
      {
        q: "How much do water treatment systems cost?",
        a: "System pricing varies based on your water chemistry and the treatment required. Entry-level filtration systems start around $1,200. Full softening and filtration combinations run $2,500 to $4,500. Whole-home reverse osmosis systems are priced separately. We provide a written quote after your free water test — no guessing, no surprises.",
      },
      {
        q: "What payment options do you accept?",
        a: "We accept cash, check, and all major credit cards. Financing options are also available for qualified customers — ask your specialist during your water test appointment.",
      },
    ],
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(18,189,251,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-sm leading-snug" style={{ color: "#0C1F2E" }}>{q}</span>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: open ? "#12BDFB" : "rgba(18,189,251,0.08)" }}
        >
          {open
            ? <Minus className="w-3.5 h-3.5" style={{ color: "#07111A" }} />
            : <Plus className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: "rgba(12,31,46,0.58)", maxWidth: "64ch" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "46vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(48px, 6vh, 80px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 55% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>
                Common Questions
              </span>
            </div>
            <h1
              className="font-display font-bold leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#0C1F2E" }}
            >
              Everything you<br />
              <span style={{ color: "#12BDFB" }}>want to know.</span>
            </h1>
            <p style={{ color: "rgba(12,31,46,0.48)" }}>Can&apos;t find your answer? Call us at <a href="tel:+13179835919" className="font-medium" style={{ color: "#12BDFB" }}>(317) 983-5919</a> — we pick up.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="hidden lg:flex justify-end items-end">
            <Image src="/client/otter-thinking.png" alt="" width={220} height={260} className="object-contain" />
          </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section ref={contentRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="max-w-3xl mx-auto space-y-12">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <h2
                  className="font-display font-bold mb-6 pb-4 border-b"
                  style={{ fontSize: "1.35rem", color: "#0C1F2E", borderColor: "rgba(18,189,251,0.15)" }}
                >
                  {cat.label}
                </h2>
                <div className="bg-white rounded-3xl px-6 border" style={{ borderColor: "rgba(18,189,251,0.1)" }}>
                  {cat.faqs.map((faq, fi) => (
                    <FAQItem key={fi} q={faq.q} a={faq.a} index={fi} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0C1F2E" }}>
            Still have questions?
          </h2>
          <p className="mb-8" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "36ch", margin: "0 auto 2rem" }}>
            Call or text us at{" "}
            <a href="tel:+13179835919" className="font-semibold" style={{ color: "#12BDFB" }}>
              (317) 983-5919
            </a>{" "}
            or schedule a free water test and we will answer everything in person.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#07111A", boxShadow: "0 0 30px rgba(18,189,251,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
          >
            Schedule Free Water Test
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
