"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Droplets,
  Users,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const PHONE = "(616) 612-1660";
const PHONE_TEL = "tel:6166121660";

const values = [
  {
    icon: Heart,
    title: "Family Values",
    desc: "We treat every home like it&apos;s our own. As a family-owned business, we take personal pride in every installation and every glass of water you drink.",
  },
  {
    icon: Shield,
    title: "Honest Service",
    desc: "No pushy sales tactics, no unnecessary upsells. We test your water first and recommend only what you actually need based on real data.",
  },
  {
    icon: Droplets,
    title: "Water Expertise",
    desc: "From well water challenges to city water concerns, we know water inside and out. Our team stays current on the latest treatment technology.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Your satisfaction isn&apos;t just a goal - it&apos;s our standard. We&apos;re not done until you&apos;re thrilled with your water quality and our service.",
  },
];

const stats = [
  { end: 5, suffix: " States", label: "Service Area" },
  { end: 2, suffix: "+ Years", label: "Experience" },
  { end: 5, suffix: "-Star", label: "Reviews" },
  { end: 0, prefix: "A+ ", suffix: "", label: "BBB Rating", isText: true },
  { end: 0, suffix: "", label: "FREE Installation", isText: true },
];

const differentiators = [
  {
    icon: Droplets,
    title: "Test-Based Recommendations",
    desc: "We never guess. Every recommendation starts with a thorough, free water test so we can identify exactly what's in your water and prescribe the right solution - not the most expensive one.",
  },
  {
    icon: Shield,
    title: "No-Salt Specialists",
    desc: "Traditional salt-based softeners aren't always the answer. We specialize in no-salt hard water treatment systems that are better for you, your plumbing, and the environment.",
  },
  {
    icon: Heart,
    title: "Family Treatment",
    desc: "When you work with Aqua Otter, you're not a number on a spreadsheet. You get direct access to our team, personalized follow-up, and service that feels like family.",
  },
];

const states = ["Indiana", "Michigan", "Ohio", "Kentucky", "Tennessee"];

export default function AboutClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/about-family-hero.jpg"
          alt="Happy family running together in a field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/70" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-20 sm:py-28 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            About Aqua Otter
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight mb-5"
          >
            Family-Owned. Local Experts.
            <br />
            <span className="text-[var(--color-accent)]">Water Done Right.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8"
          >
            We started Aqua Otter with one simple belief: every family deserves
            clean, safe, great-tasting water - and honest people to provide it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get Your Free Water Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <Section background="white" gradient="radial-left">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-[var(--color-primary-dark)] flex items-center justify-center">
            <div className="text-center text-white/40">
              <Users className="w-16 h-16 mx-auto mb-3 opacity-40" />
              <p className="text-lg font-heading font-bold">Team Photo</p>
              <p className="text-sm opacity-60">Coming Soon</p>
            </div>
          </div>
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-dark mt-2 mb-5">
              Born From a Simple{" "}
              <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aqua Otter Water Systems was founded with a straightforward goal:
              bring honest, expert water treatment to families across the
              Midwest and beyond. As a family-owned and operated business, we
              know what it means to care about the water your kids drink, your
              family bathes in, and your home runs on.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Today, we proudly serve homeowners across{" "}
              <strong>five states</strong> - Indiana, Michigan, Ohio, Kentucky,
              and Tennessee. Whether you&apos;re dealing with hard water,
              iron stains, sulfur smell, or just want peace of mind about
              what&apos;s in your water, we&apos;ve got you covered.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We specialize in <strong>well water solutions</strong> and{" "}
              <strong>no-salt water treatment systems</strong> - and every
              recommendation we make starts with a free, comprehensive water
              test. No guesswork. No pressure. Just real answers and real
              solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Family-Owned
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> 5 States
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Well Water Experts
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> No-Salt Specialists
              </span>
            </div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Ready for cleaner water? Schedule your free test"
        href="/contact"
      />

      {/* Mission & Values */}
      <Section background="surface" gradient="radial-center">
        <div className="text-center mb-10">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">
            Mission &amp; Values
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-dark mt-2">
            What <span className="gradient-text">Drives Us</span> Every Day
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3">
            Our values aren&apos;t just words on a wall. They&apos;re how we run
            every water test, make every recommendation, and treat every customer.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-dark text-lg mb-2">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Your Water Deserves Better"
        message="Get a FREE in-home water test and find out exactly what&apos;s in your water. No obligation, no pressure."
        href="/contact"
      />

      {/* Stats Bar */}
      <Section background="dark" padding="tight">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl sm:text-4xl font-heading font-black gradient-text mb-1">
                {s.isText ? (
                  <span>
                    {s.prefix}
                    {s.label === "BBB Rating" ? "BBB" : "FREE"}
                  </span>
                ) : (
                  <AnimatedCounter
                    end={s.end}
                    suffix={s.suffix}
                    prefix={s.prefix}
                  />
                )}
              </div>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What Makes Us Different */}
      <Section background="white" gradient="radial-right">
        <div className="text-center mb-10">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">
            The Aqua Otter Difference
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-dark mt-2">
            What Makes Us{" "}
            <span className="gradient-text">Different</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">
                  {d.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Schedule Your Free Water Test"
        trustLine="100% Free - No obligation - Takes about 30 minutes"
        href="/contact"
      />

      {/* Service Area Banner */}
      <Section background="primary-light" gradient="radial-center">
        <div className="text-center">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark mb-3">
            Proudly Serving <span className="gradient-text">5 States</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            From the Hoosier heartland to the Volunteer State, Aqua Otter
            brings clean water to families across the region.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {states.map((s) => (
              <Link
                key={s}
                href="/service-areas"
                className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 text-dark font-semibold text-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {s}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black mb-4">
              Ready to Experience the{" "}
              <span className="gradient-text">Aqua Otter Difference?</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join hundreds of families across 5 states who trust Aqua Otter
              with their water. Start with a free test - no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
              >
                Get My Free Water Test
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
              >
                <Phone className="w-4 h-4 cta-pulse-gold" />
                Call {PHONE}
              </a>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Free installation on all systems - No sales pressure - 5-star rated
            </p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
