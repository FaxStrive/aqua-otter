"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  ArrowRight,
  Phone,
  Settings,
  RefreshCw,
  ClipboardCheck,
  Beaker,
  Calendar,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  Droplets,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const services = [
  {
    icon: Settings,
    title: "Valve Cleanings",
    desc: "Control valves accumulate mineral deposits over time. We clean and recalibrate every valve to ensure precise regeneration cycles and optimal water flow.",
  },
  {
    icon: RefreshCw,
    title: "Filter Replacements",
    desc: "Sediment filters, carbon blocks, and RO membranes have a limited lifespan. We swap them on schedule so your system never loses performance.",
  },
  {
    icon: ClipboardCheck,
    title: "Full System Checkups",
    desc: "A complete inspection of tanks, fittings, drain lines, bypass valves, and electrical connections. We catch small issues before they become big problems.",
  },
  {
    icon: Beaker,
    title: "Water Re-Testing",
    desc: "We test your water after every service visit to confirm your system is performing at peak efficiency and your water meets quality standards.",
  },
];

const timeline = [
  {
    month: "Every 3 Months",
    tasks: ["Check salt levels (softeners)", "Inspect for leaks or drips", "Verify system pressure"],
    color: "bg-blue-500",
  },
  {
    month: "Every 6 Months",
    tasks: ["Replace sediment pre-filters", "Clean brine tank (softeners)", "Test water quality"],
    color: "bg-primary",
  },
  {
    month: "Every 12 Months",
    tasks: ["Replace carbon filters", "Valve cleaning & recalibration", "Full system inspection"],
    color: "bg-accent-500",
  },
  {
    month: "Every 2-3 Years",
    tasks: ["Replace RO membrane", "Media bed replacement", "Major component check"],
    color: "bg-red-500",
  },
];

const reasons = [
  {
    icon: Droplets,
    title: "Consistent Water Quality",
    desc: "A well-maintained system delivers the same clean water on day 1,000 as it did on day 1.",
  },
  {
    icon: DollarSign,
    title: "Avoid Expensive Repairs",
    desc: "A $150 maintenance visit prevents $1,500+ emergency repairs from neglected systems.",
  },
  {
    icon: ShieldCheck,
    title: "Protect Your Warranty",
    desc: "Most manufacturer warranties require regular maintenance. We keep your coverage active.",
  },
  {
    icon: AlertTriangle,
    title: "Prevent Health Risks",
    desc: "Expired filters can harbor bacteria and let contaminants through. Don&apos;t let your system become the problem.",
  },
];

export default function MaintenanceClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/service-plumber.jpg"
          alt="Technician performing water system maintenance"
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
            <Wrench className="w-4 h-4 text-primary-300" />
            <span className="text-sm text-white/80">System Maintenance</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Keep Your System Running{" "}
            <span className="text-[var(--color-accent)]">Like New</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Regular maintenance keeps your water clean, your system efficient,
            and your warranty intact. We make it easy.
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
              Schedule Maintenance
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

      {/* What We Maintain */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            What We Maintain
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every maintenance visit covers the critical components that keep your water treatment system performing at its best.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-5 rounded-xl bg-gray-50 hover:bg-primary-50/50 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-dark mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Due for a maintenance visit? Book one today"
        href="/contact"
      />

      {/* Maintenance Schedule */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Recommended Schedule</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Maintenance Timeline
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow this schedule and your system will deliver clean water for decades. We&apos;ll remind you when it&apos;s time.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {timeline.map((t, i) => (
            <motion.div
              key={t.month}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex gap-5 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-4 h-4 rounded-full ${t.color} ring-4 ring-white shadow-md`} />
                {i < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <h3 className="font-heading font-bold text-dark text-lg">{t.month}</h3>
                </div>
                <ul className="space-y-1.5">
                  {t.tasks.map((task) => (
                    <li key={task} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {task}
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
        text="Don&apos;t Wait Until Something Breaks"
        message="Schedule proactive maintenance and avoid costly emergency repairs. We service all brands."
        href="/contact"
      />

      {/* Why Maintenance Matters */}
      <Section background="white" gradient="radial-right">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Why It Matters</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            Why Maintenance Matters
          </h2>
        </div>
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/client/service-tech-friendly.jpg"
            alt="Friendly technician greeting homeowner for maintenance visit"
            width={1200}
            height={500}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-dark mb-1">{r.title}</h3>
                <p className="text-gray-600 text-sm">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Schedule Your Service Visit"
        trustLine="We service all brands — not just systems we installed."
        href="/contact"
      />

      {/* Final CTA */}
      <Section background="dark" padding="default">
        <div className="text-center py-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            Protect Your <span className="gradient-text">Investment</span>
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Your water treatment system works hard every day. Give it the care it deserves
            and it will deliver clean water for years to come.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Book Maintenance Now
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
