"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, DollarSign, Clock, Shield, Zap } from "lucide-react";

const options = [
  {
    name: "0% Interest — 12 Months",
    tag: "Most Popular",
    tagColor: "#12BDFB",
    desc: "No interest, no fees — pay off your system over 12 months with equal monthly payments. Same-as-cash financing for qualified applicants.",
    details: [
      "0% APR for 12 months",
      "No prepayment penalty",
      "Apply in under 5 minutes",
      "Same-day approval possible",
    ],
    example: "A $2,400 system = $200/mo for 12 months.",
  },
  {
    name: "Extended 60-Month Terms",
    tag: "Low Monthly Payment",
    tagColor: "#7c3aed",
    desc: "Spread the cost over 5 years for the lowest possible monthly payment. Competitive rates for qualified buyers.",
    details: [
      "Terms up to 60 months",
      "Competitive fixed APR",
      "Low monthly payment",
      "Available on all systems",
    ],
    example: "A $3,600 system = as low as $65/mo for 60 months (example rate).",
  },
  {
    name: "Deferred Payment — 90 Days",
    tag: "No Payments Now",
    tagColor: "#f59e0b",
    desc: "Get your system installed today and make no payments for 90 days. Pay in full within 90 days and pay zero interest.",
    details: [
      "90 days same-as-cash",
      "No payments for 3 months",
      "No interest if paid in full",
      "Perfect for tax season timing",
    ],
    example: "Install now, pay in full by day 90, pay $0 in interest.",
  },
];

const steps = [
  { n: "01", title: "Get your free water test", desc: "We test and design your custom system first — no cost." },
  { n: "02", title: "Choose your system", desc: "We give you a written quote with the full system price." },
  { n: "03", title: "Apply for financing", desc: "Fill out a simple online application — takes 3 to 5 minutes." },
  { n: "04", title: "Get approved + installed", desc: "Same-day approval in most cases. Installation scheduled immediately." },
];

const faqs = [
  {
    q: "Does applying affect my credit score?",
    a: "The initial application uses a soft pull and does not affect your credit score. A hard pull occurs only if you proceed to full approval.",
  },
  {
    q: "What credit score do I need?",
    a: "We work with multiple lenders and financing is available for a wide range of credit scores. Customers with scores of 620+ typically qualify for standard terms.",
  },
  {
    q: "Can I pay off early?",
    a: "Yes — all financing options carry no prepayment penalty. Pay it off any time and you will owe nothing additional.",
  },
  {
    q: "Does financing cover the full system including installation?",
    a: "Yes. Installation is always free, so your financed amount is only the equipment cost. Nothing hidden.",
  },
  {
    q: "What if I&apos;m not approved?",
    a: "We have multiple lending partners and will work to find a solution. We also accept cash, check, and all major credit cards.",
  },
];

export default function FinancingPage() {
  const optionsRef = useRef<HTMLDivElement>(null);
  const optionsInView = useInView(optionsRef, { once: true, margin: "-60px" });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(18,189,251,0.08)", minHeight: "52vh", paddingTop: "clamp(120px, 14vh, 160px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 65% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        {/* Otter mascot */}
        <div className="absolute bottom-0 right-8 hidden lg:block" style={{ width: 200, opacity: 0.95 }}>
          <Image src="/client/otter-piggybank.png" alt="" width={200} height={240} className="object-contain w-full" />
        </div>
        <div className="container-site relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <DollarSign className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Flexible Financing</span>
            </div>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
              Clean water<br />
              <span style={{ color: "#12BDFB" }}>on your terms.</span>
            </h1>
            <p className="leading-relaxed mb-8" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", color: "rgba(12,31,46,0.5)", maxWidth: "42ch" }}>
              Don&apos;t let budget be the reason your family drinks subpar water. We offer flexible financing options including 0% interest for 12 months, extended 60-month terms, and 90-day deferred payment.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Zap, text: "Same-day approval" },
                { icon: Shield, text: "No prepayment penalty" },
                { icon: Clock, text: "Apply in 5 minutes" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(12,31,46,0.55)" }}>
                  <item.icon className="w-4 h-4" style={{ color: "#12BDFB" }} />
                  {item.text}
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
              Get Free Water Test First <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Options */}
      <section ref={optionsRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={optionsInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>Financing options</h2>
            <p className="mx-auto" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "44ch" }}>Multiple programs to fit every budget. Your specialist will walk you through what makes sense for your situation.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {options.map((opt, i) => (
              <motion.div
                key={opt.name}
                initial={{ opacity: 0, y: 24 }}
                animate={optionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border flex flex-col"
                style={{ borderColor: "rgba(18,189,251,0.12)" }}
              >
                <div className="inline-flex mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: opt.tagColor, color: "#ffffff" }}>{opt.tag}</span>
                </div>
                <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.2rem", color: "#0C1F2E" }}>{opt.name}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>{opt.desc}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {opt.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#12BDFB" }} />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-4 text-sm" style={{ backgroundColor: "#F0F8FF", color: "rgba(12,31,46,0.55)", fontStyle: "italic" }}>
                  {opt.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <h2 className="font-display font-bold mb-16 text-center" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>
            How financing works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={step.n}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl p-7 border"
                  style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.1)" }}
                >
                  <p className="font-display font-bold mb-3 text-3xl" style={{ color: "rgba(18,189,251,0.25)" }}>{step.n}</p>
                  <h3 className="font-semibold mb-2" style={{ color: "#0C1F2E" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-24" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site max-w-2xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} className="font-display font-bold mb-10 text-center" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#0C1F2E" }}>
            Financing questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }} className="bg-white rounded-2xl p-6 border" style={{ borderColor: "rgba(18,189,251,0.1)" }}>
                <p className="font-semibold mb-2" style={{ color: "#0C1F2E" }}>{faq.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }} dangerouslySetInnerHTML={{ __html: faq.a }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#ffffff" }}>
            Start with the free water test.
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "40ch", margin: "0 auto 2rem" }}>
            We test your water, design your system, give you a written quote, and then discuss financing options — in that order. No pressure, ever.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
            Get Your Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
