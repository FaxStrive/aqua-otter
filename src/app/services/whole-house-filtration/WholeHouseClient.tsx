"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  ArrowRight,
  Check,
  ShieldCheck,
  Home,
  Zap,
  Heart,
  Phone,
  Building2,
  Mountain,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const systems = [
  {
    img: "/client/AiO_Well_Filtration_RB.png",
    name: "AiO Well Water Filtration",
    desc: "All-in-one iron, sulfur, and manganese removal designed specifically for well water. One tank does it all without chemicals.",
    features: ["Iron & sulfur removal", "Chemical-free", "Well water specialist"],
  },
  {
    img: "/client/Dual_City_Softener___Filtration.png",
    name: "Dual City Softener & Filtration",
    desc: "Two-tank system that softens and filters city water in one setup. Removes chlorine, hardness, and sediment for the whole house.",
    features: ["Softening + filtration", "Chlorine removal", "City water optimized"],
  },
  {
    img: "/client/Sediment_Filter_RB.png",
    name: "Sediment Pre-Filter",
    desc: "First line of defense that catches sand, silt, rust, and debris before they reach your main filtration system.",
    features: ["Protects equipment", "Easy maintenance", "20-micron filtration"],
  },
  {
    img: "/client/Quintex_5_RB.png",
    name: "Quintex 5-Stage Filtration",
    desc: "Our most advanced whole house system with five stages of filtration. Handles the toughest water problems with ease.",
    features: ["5-stage process", "Handles tough water", "Premium performance"],
  },
];

const cityNeeds = [
  { icon: Zap, label: "Chlorine & chloramine removal" },
  { icon: ShieldCheck, label: "Hard water mineral reduction" },
  { icon: Heart, label: "Better taste & odor" },
  { icon: Home, label: "Protect pipes & appliances" },
];

const wellNeeds = [
  { icon: Mountain, label: "Iron & manganese filtration" },
  { icon: Droplets, label: "Sulfur / rotten egg smell" },
  { icon: ShieldCheck, label: "Bacteria & sediment removal" },
  { icon: Heart, label: "pH balancing & conditioning" },
];

const benefitsGrid = [
  {
    title: "Cleaner Showers & Baths",
    desc: "No more dry skin, brittle hair, or soap scum. Filtered water feels noticeably softer on your body.",
  },
  {
    title: "Longer Appliance Life",
    desc: "Water heaters, dishwashers, and washing machines last years longer without mineral buildup.",
  },
  {
    title: "Spot-Free Dishes & Fixtures",
    desc: "Eliminate hard water stains on glasses, faucets, shower doors, and fixtures for good.",
  },
  {
    title: "Better Tasting Water",
    desc: "Every faucet delivers clean, great-tasting water — not just the kitchen sink.",
  },
  {
    title: "Protect Your Plumbing",
    desc: "Reduce scale buildup inside pipes that leads to clogs, reduced pressure, and costly repairs.",
  },
  {
    title: "Healthier Home",
    desc: "Remove chemicals, heavy metals, and contaminants from your entire water supply at the point of entry.",
  },
];

export default function WholeHouseClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/service-tap-closeup.jpg"
          alt="Clean water flowing from kitchen faucet — whole house filtration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <Home className="w-4 h-4 text-primary-300" />
            <span className="text-sm text-white/80">Whole House Filtration</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Clean Water From{" "}
            <span className="text-[var(--color-accent)]">Every Faucet</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            One system. Every tap. Whole house filtration means every drop of
            water in your home is clean, safe, and great-tasting.
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
              href="tel:6166121660"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (616) 612-1660
            </a>
          </motion.div>
        </div>
      </section>

      {/* What Is Whole House Filtration */}
      <Section background="white" gradient="radial-left">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">The Basics</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
              What Is Whole House Filtration?
            </h2>
            <p className="text-gray-600 mb-4">
              A whole house filtration system — also called a point-of-entry (POE) system — is installed
              where your main water line enters your home. It treats <strong>every gallon</strong> of water
              before it reaches any faucet, shower, appliance, or hose bib.
            </p>
            <p className="text-gray-600 mb-6">
              Unlike under-sink filters that only treat one faucet, whole house systems protect your
              entire home. That means cleaner baths, longer-lasting appliances, spot-free dishes,
              and pure drinking water from every tap.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all"
            >
              Find the Right System
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 flex items-center justify-center">
              <Image
                src="/client/Dual_City_Softener___Filtration.png"
                alt="Whole house filtration system"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Want to know what's in your water? Start with a free test"
        href="/contact"
      />

      {/* Our Systems */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Systems</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Whole House Systems We Install
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow group flex flex-col sm:flex-row"
            >
              <div className="relative sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4 flex-shrink-0">
                <Image
                  src={sys.img}
                  alt={sys.name}
                  width={160}
                  height={160}
                  className="object-contain max-h-36 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1">
                <h3 className="font-heading font-bold text-dark text-lg mb-2">{sys.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{sys.desc}</p>
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
        text="Not Sure Which System You Need?"
        message="Book a free water test and we'll recommend the perfect setup for your home's water source."
        href="/contact"
      />

      {/* City vs Well */}
      <Section background="white" gradient="radial-center">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Your Water Source</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            City Water vs. Well Water Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your water source determines which contaminants need to be addressed. We customize every system to your specific water.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* City */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-50/40 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-dark text-xl">City Water</h3>
            </div>
            <p className="text-gray-600 text-sm mb-5">
              Municipal water is treated but still contains chlorine, hardness minerals, and sometimes lead from aging pipes.
            </p>
            <ul className="space-y-3">
              {cityNeeds.map((n) => (
                <li key={n.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <n.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-dark">{n.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Well */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-accent-50/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="font-heading font-bold text-dark text-xl">Well Water</h3>
            </div>
            <p className="text-gray-600 text-sm mb-5">
              Private wells are unregulated and often contain iron, sulfur, bacteria, and heavy metals that need specialized treatment.
            </p>
            <ul className="space-y-3">
              {wellNeeds.map((n) => (
                <li key={n.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <n.icon className="w-4 h-4 text-accent-600" />
                  </div>
                  <span className="text-sm font-medium text-dark">{n.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Get a Custom Recommendation"
        trustLine="Free water test — no obligation, no pressure."
        href="/contact"
      />

      {/* Lifestyle Images */}
      <div className="py-6 px-6 max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-glasses-row.jpg" alt="Row of glasses being filled with pure filtered water" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-tap-closeup.jpg" alt="Clean water pouring from kitchen faucet" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">The Benefits</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Why Whole House Filtration?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefitsGrid.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <h3 className="font-heading font-bold text-dark mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm">{b.desc}</p>
            </motion.div>
          ))}
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
            Clean Water for Your <span className="gradient-text">Entire Home</span>
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Schedule a free in-home water test and let us design a whole house filtration
            system tailored to your water and your budget.
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
              href="tel:6166121660"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
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
