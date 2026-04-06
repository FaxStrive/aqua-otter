"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  ArrowRight,
  Check,
  ShieldCheck,
  DollarSign,
  Leaf,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const steps = [
  {
    num: "01",
    title: "Sediment Pre-Filter",
    desc: "Catches dirt, rust, and sand particles before they reach the membrane.",
  },
  {
    num: "02",
    title: "Carbon Pre-Filter",
    desc: "Removes chlorine and organic chemicals that damage the RO membrane.",
  },
  {
    num: "03",
    title: "RO Membrane",
    desc: "Water is forced through a semi-permeable membrane at high pressure, removing 99% of dissolved contaminants.",
  },
  {
    num: "04",
    title: "Post Carbon Polish",
    desc: "A final carbon filter polishes your water for crisp, clean taste.",
  },
  {
    num: "05",
    title: "Optional Alkaline Stage",
    desc: "Remineralizes water to a healthy pH for improved taste and mineral balance.",
  },
];

const systems = [
  {
    img: "/client/5_Stage_Reverse_Osmosis_RB.png",
    name: "5-Stage Reverse Osmosis",
    desc: "Our most popular under-sink system. Removes 99% of contaminants with five stages of filtration for crystal-clear drinking water.",
    features: ["99% contaminant removal", "Under-sink install", "2-year filter life"],
  },
  {
    img: "/client/4_Stage_RO_RB.png",
    name: "4-Stage Reverse Osmosis",
    desc: "Compact and efficient four-stage system perfect for smaller kitchens. Same powerful membrane technology in a streamlined package.",
    features: ["Compact design", "Easy filter changes", "Great for apartments"],
  },
  {
    img: "/client/Alkaline_RO-removebg-preview-removebg-preview.png",
    name: "Alkaline Reverse Osmosis",
    desc: "Our premium system adds a remineralization stage that restores healthy minerals and raises pH for better-tasting, alkaline water.",
    features: ["Alkaline pH boost", "Added minerals", "Best taste"],
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "99% Contaminant Removal",
    desc: "Removes lead, arsenic, fluoride, nitrates, chlorine, and hundreds of other dissolved solids from your drinking water.",
  },
  {
    icon: Droplets,
    title: "Better Taste & Clarity",
    desc: "Say goodbye to metallic, chemical, or off-flavors. RO water tastes as clean as it looks.",
  },
  {
    icon: Leaf,
    title: "No More Bottled Water",
    desc: "Eliminate single-use plastic bottles and reduce your household waste by hundreds of bottles per year.",
  },
  {
    icon: DollarSign,
    title: "Save Money Long-Term",
    desc: "A one-time system investment pays for itself within the first year compared to buying bottled water.",
  },
];

const comparison = [
  { feature: "Coverage", whole: "Every faucet, shower & appliance", under: "Single drinking faucet" },
  { feature: "Best For", whole: "Well water, heavy contamination", under: "Drinking & cooking water" },
  { feature: "Installation", whole: "Main water line", under: "Under kitchen sink" },
  { feature: "Maintenance", whole: "Annual filter + membrane", under: "Filter changes every 6-12 mo" },
  { feature: "Cost", whole: "$2,500 – $4,500", under: "$800 – $1,800" },
  { feature: "Flow Rate", whole: "Full house pressure", under: "Dedicated faucet" },
];

export default function ReverseOsmosisClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/client/service-tap-fill.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/service-tap-fill.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <Droplets className="w-4 h-4 text-primary-300" />
            <span className="text-sm text-white/80">Reverse Osmosis Filtration</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Pure Drinking Water with{" "}
            <span className="text-[var(--color-accent)]">Reverse Osmosis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Remove up to 99% of dissolved contaminants from your water. Cleaner,
            better-tasting water straight from your tap.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get Your Free Water Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8124996807"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (812) 499-6807
            </a>
          </motion.div>
        </div>
      </section>

      {/* What Is RO */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            What Is Reverse Osmosis?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reverse osmosis pushes water through an ultra-fine membrane under pressure,
            stripping away contaminants molecule by molecule. Here&apos;s the step-by-step process.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-5 mb-6 last:mb-0"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{step.num}</span>
              </div>
              <div className="pt-1">
                <h3 className="font-heading font-bold text-dark text-lg">{step.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Not sure which system is right for you? Get a free consultation"
        href="/contact"
      />

      {/* Our RO Systems */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Systems</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Reverse Osmosis Systems We Install
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-56 bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-6">
                <Image
                  src={sys.img}
                  alt={sys.name}
                  width={200}
                  height={200}
                  className="object-contain max-h-44 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-dark text-lg mb-2">{sys.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{sys.desc}</p>
                <ul className="space-y-1.5">
                  {sys.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Ready for Pure Water?"
        message="Schedule a free in-home water test and we&apos;ll recommend the perfect RO system for your household."
        href="/contact"
      />

      {/* Benefits */}
      <Section background="white" gradient="radial-right">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Why Choose RO</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Benefits of Reverse Osmosis
          </h2>
        </div>
        <div className="mb-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/client/service-kitchen-tap.jpg"
              alt="Person filling glass with clean filtered water in modern kitchen"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/client/service-woman-drinking.jpg"
              alt="Woman enjoying clean drinking water"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex gap-4 p-5 rounded-xl bg-gray-50 hover:bg-primary-50/50 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-dark mb-1">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Schedule Your Free Water Test"
        trustLine="No pressure, no obligation — just answers about your water."
        href="/contact"
      />

      {/* Whole House vs Under-Sink */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Compare Options</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Whole House vs. Under-Sink RO
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Not sure which setup is right for your home? Here&apos;s a side-by-side comparison.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto text-sm">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-heading font-bold text-dark">Feature</th>
                <th className="text-left py-3 px-4 font-heading font-bold text-primary">Whole House RO</th>
                <th className="text-left py-3 px-4 font-heading font-bold text-primary">Under-Sink RO</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-100 hover:bg-white transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-dark">{row.feature}</td>
                  <td className="py-3 px-4 text-gray-600">{row.whole}</td>
                  <td className="py-3 px-4 text-gray-600">{row.under}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark" padding="default">
        <div className="text-center py-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            Start Drinking <span className="gradient-text">Cleaner Water</span> Today
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Book your free in-home water test. We&apos;ll test your water, explain the results,
            and recommend the ideal reverse osmosis system for your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Book My Free Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8124996807"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (812) 499-6807
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
