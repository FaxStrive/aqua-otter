"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  XCircle,
  Leaf,
  Droplets,
  ChevronDown,
  Sparkles,
  Ban,
  Recycle,
  Heart,
  Zap,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const benefits = [
  {
    icon: Ban,
    title: "No Salt Bags",
    desc: "Never lug heavy salt bags again. Our systems require zero salt — ever.",
    traditional: "40-80 lbs of salt per month",
  },
  {
    icon: Droplets,
    title: "No Slippery Feel",
    desc: "Water feels natural, not slimy. Great for drinking, cooking, and bathing.",
    traditional: "Soft, slippery water feel",
  },
  {
    icon: Recycle,
    title: "No Brine Discharge",
    desc: "Zero wastewater from regeneration cycles. Better for your septic and the environment.",
    traditional: "Gallons of brine waste per cycle",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "No chemicals, no electricity for regeneration, no environmental impact.",
    traditional: "Salt + water waste + electricity",
  },
  {
    icon: Heart,
    title: "Retains Minerals",
    desc: "Keeps beneficial calcium and magnesium in your water while preventing scale.",
    traditional: "Strips all minerals via ion exchange",
  },
];

const systems = [
  {
    src: "/client/Alpha_3000_RB.png",
    name: "Alpha 3000",
    desc: "Our flagship city water treatment system. Multi-stage filtration with automatic electric backwash — handles the toughest water without salt.",
  },
  {
    src: "/client/No-Salt_Hard_Water_Treatment.png",
    name: "Quintex 5",
    desc: "Advanced no-salt conditioning system using template-assisted crystallization (TAC) to prevent scale and protect your home without chemicals.",
  },
];

const faqs = [
  {
    q: "Does no-salt treatment actually work on hard water?",
    a: "Yes. No-salt systems use Template Assisted Crystallization (TAC) technology to change the structure of hardness minerals so they can't stick to surfaces. You get all the scale prevention benefits without salt, chemicals, or wasted water. The technology is proven and backed by third-party testing.",
  },
  {
    q: "Will my water still feel different from untreated water?",
    a: "Your water will feel clean and natural — not slippery like salt-softened water. You'll notice the difference in reduced scale buildup on fixtures, cleaner dishes, and softer laundry without that 'slimy' feeling some people dislike about traditional softeners.",
  },
  {
    q: "How much maintenance does a no-salt system need?",
    a: "Very little. Most no-salt systems need a media replacement every 3-5 years — that's it. No salt bags to refill, no regeneration cycles, no backwash settings. It's essentially set-it-and-forget-it.",
  },
  {
    q: "Is no-salt better than a traditional water softener?",
    a: "It depends on your water. No-salt is ideal for moderate hardness and homeowners who want an eco-friendly, low-maintenance solution. For extremely hard water (25+ grains), a traditional softener may be more effective. We test your water and recommend the right fit — no upselling.",
  },
];

export default function NoSaltClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/service-shower.jpg"
          alt="Soft water flowing from shower — no-salt hard water treatment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/75" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3"
          >
            Eco-Friendly Hard Water Treatment
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          >
            No-Salt Hard Water{" "}
            <span className="text-[var(--color-accent)]">Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Treat hard water without salt, chemicals, or wasted water. Keep
            healthy minerals in your water while eliminating scale — the
            modern, eco-friendly way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:6166121660"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              (616) 612-1660
            </a>
          </motion.div>
        </div>
      </section>

      {/* What Is No-Salt Treatment */}
      <Section background="white" gradient="radial-left">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              What Is No-Salt Water Treatment?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              No-salt water treatment uses a process called{" "}
              <strong>Template Assisted Crystallization (TAC)</strong> to
              transform dissolved hardness minerals into microscopic crystals
              that can't stick to pipes, fixtures, or appliances.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Unlike traditional softeners that remove calcium and magnesium
              (and replace them with sodium), no-salt systems keep those
              healthy minerals in your water. You get scale prevention without
              the downsides of salt-based softening.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The result? Clean fixtures, longer-lasting appliances, and water
              that tastes great — all without hauling salt bags or wasting
              water on regeneration cycles.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-dark">Scale Prevention</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <Leaf className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-dark">Zero Waste</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-dark">Keeps Minerals</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <Zap className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-dark">Auto Backwash</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Curious If No-Salt Is Right for You?"
        message="Book a free water test and we'll recommend the best solution for your home."
      />

      {/* Benefits vs Traditional */}
      <Section background="surface" gradient="radial-right">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            No-Salt vs. Traditional Softeners
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            See how no-salt treatment stacks up against traditional salt-based softeners.
          </p>
        </div>
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 md:w-1/3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark">{b.title}</h3>
                </div>
                <div className="md:w-1/3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{b.desc}</p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-500">Traditional: {b.traditional}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Want the eco-friendly option? Let's talk about no-salt for your home"
      />

      {/* Lifestyle Images */}
      <div className="py-6 px-6 max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-woman-glass.jpg" alt="Woman drinking clean filtered water" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-glass-fill.jpg" alt="Filling glass with clean water at modern faucet" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      {/* Our No-Salt Systems */}
      <Section background="white" gradient="radial-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our No-Salt Systems
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Premium no-salt equipment sized and configured for your specific water.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-56 bg-gray-50 p-6">
                <Image
                  src={sys.src}
                  alt={sys.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-dark text-lg mb-2">{sys.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{sys.desc}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
                >
                  Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Get My No-Salt Quote"
        trustLine="Free estimate — no salt, no obligation"
      />

      {/* FAQ */}
      <Section background="primary-light" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Common questions about no-salt hard water treatment.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="font-heading font-bold text-dark text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Go Salt-Free{" "}
            <span className="gradient-text">Today</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Better water without the hassle. Schedule your free water test and
            discover if no-salt treatment is the right fit for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Book My Free Water Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:6166121660"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              (616) 612-1660
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
