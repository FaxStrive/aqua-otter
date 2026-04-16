"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  FlaskConical,
  ClipboardCheck,
  ArrowRight,
  Phone,
  CheckCircle2,
  Shield,
  Star,
  Clock,
  Home,
  ThumbsUp,
  Zap,
  Bug,
  Gauge,
  Waves,
  Thermometer,
  AlertTriangle,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const testItems = [
  { icon: Gauge, title: "Hardness", desc: "Calcium & magnesium levels causing scale buildup" },
  { icon: Zap, title: "Iron", desc: "Dissolved and particulate iron causing stains" },
  { icon: Waves, title: "Sulfur / H2S", desc: "Hydrogen sulfide creating rotten-egg odor" },
  { icon: Thermometer, title: "pH Level", desc: "Acidity that corrodes pipes and fixtures" },
  { icon: FlaskConical, title: "TDS", desc: "Total dissolved solids affecting taste and quality" },
  { icon: Bug, title: "Bacteria", desc: "Coliform and E. coli contamination" },
  { icon: AlertTriangle, title: "Nitrates", desc: "Agricultural runoff dangerous for infants" },
  { icon: Droplets, title: "Chlorine", desc: "City treatment chemicals affecting taste and smell" },
];

const steps = [
  {
    num: "1",
    icon: Home,
    title: "We Come to You",
    desc: "Our certified water specialist arrives at your home with professional testing equipment — no prep needed on your end.",
  },
  {
    num: "2",
    icon: FlaskConical,
    title: "Test Your Water",
    desc: "We collect samples from your tap and run comprehensive tests right there in your kitchen. Takes about 15 minutes.",
  },
  {
    num: "3",
    icon: ClipboardCheck,
    title: "Show You Results",
    desc: "We walk you through each result, explain what it means, and show you exactly what's in your water — no jargon, no pressure.",
  },
];

const afterSteps = [
  {
    num: "1",
    title: "Custom Quote",
    desc: "Based on your results, we recommend the ideal system and provide an upfront, no-obligation quote.",
  },
  {
    num: "2",
    title: "Professional Install",
    desc: "Our team installs your new system — typically in just a few hours, with zero mess left behind.",
  },
  {
    num: "3",
    title: "Enjoy Clean Water",
    desc: "Turn on the tap and taste the difference immediately. Backed by our satisfaction guarantee.",
  },
];

const painPoints = [
  "Stains on your sinks, tubs, or toilets",
  "Water that smells like rotten eggs",
  "Dry, itchy skin after showers",
  "White chalky buildup on fixtures",
  "Bad taste or odor in drinking water",
  "Concerns about bacteria or contaminants",
];

export default function FreeWaterTestClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/service-consult.jpg"
          alt="Water treatment technician consulting with homeowner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3"
          >
            100% Free — No Obligation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-5"
          >
            Free In-Home{" "}
            <span className="text-[var(--color-accent)]">Water Test</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Find out exactly what's in your water in under 30 minutes. Our
            certified technicians test right at your kitchen sink — results
            on the spot.
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
              Schedule My Free Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:3179616925"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              (317) 961-6925
            </a>
          </motion.div>
        </div>
      </section>

      {/* What to Expect - 3 Steps */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            What to Expect
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our water test is quick, thorough, and completely free. Here's how it works.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.num}
              </div>
              <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-dark text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-3 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Ready to Find Out What's in Your Water?"
        message="Takes less than 30 minutes — and it's completely free."
      />

      {/* What We Test For */}
      <Section background="surface" gradient="radial-right">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            What We Test For
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our comprehensive test covers all the major contaminants and water quality indicators.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-primary/15 transition-all"
            >
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-dark text-base mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Have questions about your water quality? Call us at (317) 961-6925"
      />

      {/* Why It Matters */}
      <Section background="white" gradient="radial-center">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Why Testing Matters
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Most water problems are invisible. You can't see dissolved iron, smell
              low-level bacteria, or taste nitrates. A professional test reveals
              what's really going on — so you can protect your family and your home.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed font-medium">
              Have you noticed any of these in your home?
            </p>
            <ul className="space-y-3">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/client/service-tech-consult.jpg"
              alt="Water specialist explaining test results to homeowner"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Book My Free Water Test"
        trustLine="No obligation — no pressure — just answers"
      />

      {/* What Happens After */}
      <Section background="primary-light" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            What Happens After Your Test
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            If your water needs treatment, here's what the process looks like.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {afterSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-dark text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Trust Signals */}
      <Section background="surface">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Shield, label: "Licensed & Insured" },
            { icon: Star, label: "5-Star Rated" },
            { icon: Clock, label: "Same-Week Scheduling" },
            { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 bg-white rounded-xl p-5 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-dark text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Your Water Test Is <span className="gradient-text">100% Free</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            No sales pitch. No obligation. Just honest answers about your water.
            Schedule today and know what you're drinking by tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Schedule My Free Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:3179616925"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              (317) 961-6925
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
