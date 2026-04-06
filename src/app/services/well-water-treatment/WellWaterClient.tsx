"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  ArrowRight,
  Phone,
  Shield,
  Zap,
  Bug,
  CloudRain,
  Thermometer,
  Filter,
  Gauge,
  Award,
  Clock,
  Wrench,
  Star,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const wellProblems = [
  {
    icon: Zap,
    title: "Iron & Manganese",
    desc: "Orange-brown staining on fixtures, metallic taste, stained laundry. Even low levels cause visible damage over time.",
  },
  {
    icon: CloudRain,
    title: "Sulfur / H2S",
    desc: "Rotten-egg smell that makes your water unbearable. Caused by hydrogen sulfide gas dissolved in groundwater.",
  },
  {
    icon: Bug,
    title: "Bacteria",
    desc: "Coliform and E. coli contamination — a serious health risk especially for children and elderly family members.",
  },
  {
    icon: Filter,
    title: "Sediment",
    desc: "Sand, silt, and clay particles that cloud your water and clog fixtures, appliances, and water heaters.",
  },
  {
    icon: Thermometer,
    title: "Low pH / Acidic Water",
    desc: "Blue-green stains on fixtures, pinhole leaks in copper pipes, and a bitter metallic taste.",
  },
  {
    icon: Gauge,
    title: "Hardness",
    desc: "Scale buildup in pipes and water heaters, spotty dishes, dry skin, and stiff laundry.",
  },
];

const systems = [
  {
    src: "/client/AiO_Well_Filtration_RB.png",
    name: "AiO Well Filtration",
    desc: "All-in-one system that handles iron, sulfur, manganese, and sediment in a single tank. Low maintenance, high performance.",
  },
  {
    src: "/client/AiO_Ozone.png",
    name: "AiO Ozone System",
    desc: "Chemical-free oxidation that destroys bacteria, eliminates sulfur smell, and removes dissolved iron on contact.",
  },
  {
    src: "/client/Alpha_3000_RB.png",
    name: "Alpha 3000",
    desc: "Our flagship multi-stage system for the toughest well water. Handles extreme iron, sulfur, and hardness simultaneously.",
  },
];

const whyUs = [
  { icon: Award, text: "Well water specialists — it&apos;s what we do best" },
  { icon: Shield, text: "Custom-engineered systems for YOUR water" },
  { icon: Wrench, text: "Professional installation with zero mess" },
  { icon: Clock, text: "Same-week installation available" },
  { icon: Star, text: "Backed by our satisfaction guarantee" },
  { icon: Droplets, text: "Free in-home water test included" },
];

const installPhotos = [
  "/client/Installation1.png",
  "/client/Softener_Install_1.png",
  "/client/Install2.png",
  "/client/Install4.png",
];

export default function WellWaterClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/client/service-tech-door.jpg"
          alt="Water treatment technician arriving for well water service"
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
            Southern Indiana&apos;s Well Water Experts
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          >
            Well Water Treatment{" "}
            <span className="text-[var(--color-accent)]">Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Iron, sulfur, bacteria, hardness — whatever your well throws at you,
            we have a proven system to fix it. Custom solutions backed by real
            results.
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
              Get My Free Well Water Test
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

      {/* Common Well Water Problems */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Common Well Water Problems
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Well water is unpredictable. Here are the issues we see — and fix — every week.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wellProblems.map((prob, i) => (
            <motion.div
              key={prob.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary/15 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                <prob.icon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-dark text-lg mb-2">{prob.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Tired of Your Well Water Problems?"
        message="Schedule a free test and we&apos;ll identify exactly what&apos;s in your water."
      />

      {/* Our Well Water Systems */}
      <Section background="surface" gradient="radial-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Well Water Systems
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Purpose-built equipment designed to handle the toughest well water in Indiana.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
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

      <div className="py-6 px-6 max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-family-outdoor.jpg" alt="Family enjoying clean water outdoors" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-kid-water.jpg" alt="Child drinking clean water" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      <InlineCTA
        variant="text"
        text="Not sure which system you need? We&apos;ll help you decide — free consultation"
      />

      {/* Why Choose Us */}
      <Section background="white" gradient="radial-right">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Why Choose Aqua Otter for Well Water
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Well water isn&apos;t like city water — it demands specialized knowledge
              and equipment. We&apos;ve tested and treated thousands of wells across
              Southern Indiana and know exactly what works.
            </p>
            <ul className="space-y-3">
              {whyUs.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-1">
                <AnimatedCounter end={1500} suffix="+" />
              </div>
              <p className="text-sm text-gray-600">Wells Treated</p>
            </div>
            <div className="bg-accent-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-heading font-bold text-accent-600 mb-1">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-heading font-bold text-dark mb-1">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-1">
                <AnimatedCounter end={24} suffix="hr" />
              </div>
              <p className="text-sm text-gray-600">Response Time</p>
            </div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Schedule My Free Well Water Test"
        trustLine="We&apos;ll come to you — no cost, no obligation"
      />

      {/* Installation Photos */}
      <Section background="surface">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Professional Installation
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Clean, professional installs — typically completed in just a few hours.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {installPhotos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Well water system installation ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Fix Your Well Water{" "}
            <span className="gradient-text">For Good</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Stop dealing with stains, smells, and worries. Get a free water test
            and custom solution designed for your well.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get Started — It&apos;s Free
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
