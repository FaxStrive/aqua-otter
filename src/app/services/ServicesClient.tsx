"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  FlaskConical,
  ShieldCheck,
  Waves,
  Filter,
  Home,
  Wrench,
  Zap,
  AlertTriangle,
  Bug,
  Thermometer,
  CloudRain,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const services = [
  {
    title: "Free Water Test",
    href: "/services/free-water-test",
    icon: FlaskConical,
    desc: "Complimentary in-home water analysis to identify exactly what&apos;s in your water.",
  },
  {
    title: "Well Water Treatment",
    href: "/services/well-water-treatment",
    icon: Droplets,
    desc: "Specialized filtration for iron, sulfur, bacteria, and other common well water issues.",
  },
  {
    title: "No-Salt Hard Water",
    href: "/services/no-salt-hard-water",
    icon: Waves,
    desc: "Eco-friendly hard water treatment without salt, chemicals, or wasted water.",
  },
  {
    title: "Water Softeners",
    href: "/services/water-softeners",
    icon: ShieldCheck,
    desc: "Traditional ion-exchange softeners for the hardest water problems.",
  },
  {
    title: "Reverse Osmosis",
    href: "/services/reverse-osmosis",
    icon: Filter,
    desc: "Point-of-use and whole-house RO for the purest drinking water possible.",
  },
  {
    title: "Whole House Filtration",
    href: "/services/whole-house-filtration",
    icon: Home,
    desc: "Complete filtration systems that treat every drop from every faucet.",
  },
  {
    title: "Maintenance & Service",
    href: "/services/maintenance",
    icon: Wrench,
    desc: "Ongoing maintenance, filter changes, and system tune-ups to keep your water clean.",
  },
];

const products = [
  { src: "/client/Alpha_3000_RB.png", name: "Alpha 3000" },
  { src: "/client/Quintex_5_RB.png", name: "Quintex 5" },
  { src: "/client/Dual_City_Softener___Filtration.png", name: "Dual City Softener & Filtration" },
  { src: "/client/AiO_Well_Filtration_RB.png", name: "AiO Well Filtration" },
  { src: "/client/AiO_Ozone.png", name: "AiO Ozone" },
  { src: "/client/No-Salt_Hard_Water_Treatment.png", name: "No-Salt Hard Water Treatment" },
  { src: "/client/5_Stage_Reverse_Osmosis_RB.png", name: "5-Stage Reverse Osmosis" },
  { src: "/client/Whole_House_RO_Set-up_RB.png", name: "Whole House RO" },
  { src: "/client/Softener_RB.png", name: "Water Softener" },
  { src: "/client/Twin_Softener_RB.png", name: "Twin Softener" },
  { src: "/client/Sediment_Filter_RB.png", name: "Sediment Filter" },
  { src: "/client/Arsenic_Removal_RB.png", name: "Arsenic Removal" },
];

const waterProblems = [
  { icon: Zap, title: "Hard Water", desc: "Scale buildup on fixtures, dry skin, stiff laundry" },
  { icon: AlertTriangle, title: "Iron Staining", desc: "Orange/brown stains on sinks, tubs, and toilets" },
  { icon: CloudRain, title: "Sulfur Smell", desc: "Rotten-egg odor from hydrogen sulfide gas" },
  { icon: Bug, title: "Bacteria", desc: "Coliform or E. coli contamination in well water" },
  { icon: Thermometer, title: "Low pH / Acidic", desc: "Blue-green stains, pipe corrosion, metallic taste" },
  { icon: Droplets, title: "Chlorine Taste", desc: "Chemical taste and smell from city water treatment" },
  { icon: Filter, title: "Sediment", desc: "Sand, dirt, and particles clouding your water" },
  { icon: FlaskConical, title: "Nitrates / Arsenic", desc: "Invisible contaminants dangerous to your health" },
];

const wellBullets = [
  "Iron & manganese removal",
  "Hydrogen sulfide elimination",
  "Bacteria treatment (UV & chemical-free)",
  "pH correction & sediment filtration",
  "Custom multi-stage systems",
];

const noSaltBullets = [
  "Zero salt bags to carry or refill",
  "No slippery water feel",
  "Retains healthy minerals",
  "Eco-friendly — no brine discharge",
  "Virtually maintenance-free",
];

export default function ServicesClient() {
  return (
    <>
      {/* Hero */}
      <Section background="dark" padding="default">
        <div className="text-center py-10 md:py-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3"
          >
            Aqua Otter Water Systems
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          >
            Complete Water Treatment{" "}
            <span className="gradient-text">Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            From free water testing to full-home filtration, we solve every water
            problem in Southern Indiana — guaranteed.
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
              Get Your Free Water Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8124996807"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              (812) 499-6807
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Every service backed by expert knowledge and premium equipment — tailored to your water.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={s.href}
                className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <s.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Not Sure What You Need?"
        message="Book a free in-home water test and we&apos;ll recommend the perfect system for your home."
      />

      {/* Specialties */}
      <Section background="surface" gradient="radial-right">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Specialties
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We&apos;re the region&apos;s go-to experts for well water and salt-free hard water treatment.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Well Water */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-dark">Well Water Treatment</h3>
            </div>
            <ul className="space-y-2.5 mb-6">
              {wellBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/services/well-water-treatment"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              Explore Well Water Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* No-Salt */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                <Waves className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-dark">No-Salt Hard Water</h3>
            </div>
            <ul className="space-y-2.5 mb-6">
              {noSaltBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/services/no-salt-hard-water"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              Explore No-Salt Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Schedule your free water test today — results in minutes"
      />

      {/* Products Gallery */}
      <Section background="white" gradient="radial-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Product Lineup
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Premium water treatment equipment built for performance and longevity.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg border border-transparent hover:border-primary/10 transition-all text-center"
            >
              <div className="relative w-full aspect-square mb-3">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-semibold text-dark leading-tight">{p.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Get a Custom Quote"
        trustLine="Free estimates — no obligation"
      />

      {/* Common Water Problems */}
      <Section background="primary-light" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Common Water Problems We Solve
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            If you&apos;ve noticed any of these issues, we have the solution.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {waterProblems.map((wp, i) => (
            <motion.div
              key={wp.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <wp.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-dark text-base mb-1">{wp.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{wp.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready for <span className="gradient-text">Better Water</span>?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Start with a free in-home water test. We&apos;ll show you exactly what&apos;s in
            your water and recommend the best solution — no pressure, no obligation.
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
              href="tel:8124996807"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
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
