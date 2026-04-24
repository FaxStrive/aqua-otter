"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Shield, Wrench, Phone, Star } from "lucide-react";

const covered = [
  { label: "All system components", detail: "Tanks, media, valves, controllers, and all internal parts are covered under the lifetime warranty." },
  { label: "Control valve and electronics", detail: "The brain of your system — every electronic component and the control head — is covered for life." },
  { label: "Manufacturing defects", detail: "If it fails due to how it was made, we fix or replace it. Period. No questions asked." },
  { label: "Media and filtration material", detail: "Core media is covered for its rated lifespan. We guarantee it performs as specified." },
  { label: "Labor for warranty repairs", detail: "When a covered repair is needed, we send a technician. You don't pay for labor on warranty work." },
  { label: "System performance guarantee", detail: "If your water quality is not what it should be after installation, we make it right — guaranteed." },
];

const notCovered = [
  "Consumables you replace yourself (salt, annual filter cartridges)",
  "Damage from misuse, unauthorized modification, or improper bypass",
  "Damage from external causes (flooding, freeze damage, electrical surge)",
  "Systems transferred to a new property owner (warranty is non-transferable)",
];

const steps = [
  { icon: Phone, n: "01", title: "Call or text us", desc: "Contact us at (317) 983-5919 and describe what you&apos;re experiencing with your system." },
  { icon: Wrench, n: "02", title: "We diagnose remotely", desc: "We troubleshoot over the phone — many issues are resolved with a 5-minute call." },
  { icon: Star, n: "03", title: "We schedule a visit", desc: "If a technician visit is needed, we schedule within days at no charge for covered repairs." },
  { icon: Shield, n: "04", title: "Repaired or replaced", desc: "We fix the issue completely and confirm your system is performing as designed before we leave." },
];

export default function WarrantyPage() {
  const coveredRef = useRef<HTMLDivElement>(null);
  const coveredInView = useInView(coveredRef, { once: true, margin: "-60px" });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(18,189,251,0.08)", minHeight: "54vh", paddingTop: "clamp(120px, 14vh, 160px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 65% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
                <Shield className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Lifetime Warranty</span>
              </div>
              <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
                The last system<br />
                <span style={{ color: "#12BDFB" }}>you&apos;ll ever need.</span>
              </h1>
              <p className="leading-relaxed mb-8" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", color: "rgba(12,31,46,0.5)", maxWidth: "42ch" }}>
                Every system we install is backed by a lifetime warranty. Not 5 years. Not 10. For life. If it fails due to a manufacturing defect, we fix it or replace it — at no charge to you.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
                Get Your System <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="hidden lg:flex flex-col items-center gap-0">
              <Image src="/client/otter-thumbsup.png" alt="" width={220} height={260} className="object-contain" />
              <div className="rounded-3xl p-7 border text-center w-full" style={{ backgroundColor: "#0C1F2E", borderColor: "rgba(18,189,251,0.15)" }}>
                <p className="font-display font-bold mb-1" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#12BDFB", lineHeight: 1 }}>Lifetime</p>
                <p className="text-lg font-semibold mb-3" style={{ color: "#ffffff" }}>Warranty Coverage</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)", maxWidth: "28ch", margin: "0 auto" }}>
                  Parts, valves, electronics, and labor — covered for the life of every system we install.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's covered */}
      <section ref={coveredRef} className="py-24 md:py-36" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={coveredInView ? { opacity: 1, y: 0 } : {}} className="font-display font-bold mb-10" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>
                What&apos;s covered
              </motion.h2>
              <div className="space-y-6">
                {covered.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -16 }} animate={coveredInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#12BDFB" }} />
                    <div>
                      <p className="font-semibold mb-1" style={{ color: "#0C1F2E" }}>{item.label}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }}>{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, x: 16 }} animate={coveredInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}>
                <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#0C1F2E" }}>
                  What&apos;s not covered
                </h2>
                <div className="rounded-3xl p-8 border" style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(12,31,46,0.08)" }}>
                  <ul className="space-y-3">
                    {notCovered.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "rgba(12,31,46,0.3)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(12,31,46,0.08)" }}>
                    <p className="text-sm" style={{ color: "rgba(12,31,46,0.5)" }}>
                      The things not covered are consumables you replace yourself, or damage from external causes outside our control. If you&apos;re unsure whether something is covered, call us — we&apos;ll tell you honestly.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl p-8 border" style={{ backgroundColor: "#EAF6FE", borderColor: "rgba(18,189,251,0.2)" }}>
                  <p className="font-semibold mb-2" style={{ color: "#0C1F2E" }}>Satisfaction Guarantee</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.6)" }}>
                    Beyond the lifetime warranty: if your water quality is not right after installation, we come back and fix it. Your satisfaction is not negotiable. We haven&apos;t left a customer unhappy in 25 years and we don&apos;t intend to start.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Claim process */}
      <section ref={stepsRef} className="py-24 md:py-32" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}} className="font-display font-bold mb-16 text-center" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>
            How to make a warranty claim
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              const Icon = step.icon;
              return (
                <motion.div key={step.n} ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-3xl p-7 border" style={{ borderColor: "rgba(18,189,251,0.1)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(18,189,251,0.08)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#12BDFB" }} />
                  </div>
                  <p className="font-display font-bold text-2xl mb-2" style={{ color: "rgba(18,189,251,0.2)" }}>{step.n}</p>
                  <h3 className="font-semibold mb-2" style={{ color: "#0C1F2E" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.55)" }} dangerouslySetInnerHTML={{ __html: step.desc }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#ffffff" }}>Protected for life.</h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "40ch", margin: "0 auto 2rem" }}>
            Every system we install comes backed by our lifetime warranty and satisfaction guarantee. Start with a free water test.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
              Get Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+13179835919" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}>
              <Phone className="w-4 h-4" style={{ color: "#12BDFB" }} />
              (317) 983-5919
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
