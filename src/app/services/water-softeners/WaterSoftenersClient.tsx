"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Droplets,
  Zap,
  Wrench,
  Clock,
  ThumbsUp,
  Sparkles,
  Settings,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const howItWorks = [
  {
    num: "1",
    icon: Droplets,
    title: "Hard Water Enters",
    desc: "Water flows into the mineral tank filled with negatively charged resin beads that attract hardness minerals.",
  },
  {
    num: "2",
    icon: Zap,
    title: "Ion Exchange",
    desc: "Calcium and magnesium ions are captured by the resin and replaced with sodium ions — removing the hardness.",
  },
  {
    num: "3",
    icon: Sparkles,
    title: "Soft Water Flows",
    desc: "Softened water flows throughout your home — no more scale, spots, or dry skin.",
  },
  {
    num: "4",
    icon: Settings,
    title: "Automatic Regeneration",
    desc: "The system automatically flushes and recharges the resin using a brine solution, keeping it working 24/7.",
  },
];

const softenerVsNoSalt = [
  {
    factor: "Extremely Hard Water (25+ GPG)",
    softener: true,
    noSalt: false,
  },
  {
    factor: "Moderate Hard Water (10-25 GPG)",
    softener: true,
    noSalt: true,
  },
  {
    factor: "No Salt Bags Required",
    softener: false,
    noSalt: true,
  },
  {
    factor: "Retains Healthy Minerals",
    softener: false,
    noSalt: true,
  },
  {
    factor: "Eliminates Slippery Feel",
    softener: false,
    noSalt: true,
  },
  {
    factor: "Best Scale Removal",
    softener: true,
    noSalt: false,
  },
  {
    factor: "Protects Water Heater",
    softener: true,
    noSalt: true,
  },
  {
    factor: "Low Maintenance",
    softener: false,
    noSalt: true,
  },
];

const systems = [
  {
    src: "/client/Softener_RB.png",
    name: "Standard Water Softener",
    desc: "Reliable single-tank softener ideal for most homes. Efficient regeneration cycles and metered control for optimal salt usage.",
  },
  {
    src: "/client/Twin_Softener_RB.png",
    name: "Twin Softener System",
    desc: "Dual-tank alternating system for homes that need 24/7 soft water with zero downtime — one tank always active while the other regenerates.",
  },
  {
    src: "/client/Softener_Large_Brine_Tank_RB.png",
    name: "High-Capacity Softener",
    desc: "Large brine tank for homes with very hard water or high water usage. Fewer salt refills and extended time between regeneration cycles.",
  },
];

const installSteps = [
  {
    num: "1",
    title: "Free Water Test",
    desc: "We test your water to determine exact hardness levels and recommend the right size system.",
  },
  {
    num: "2",
    title: "Custom Sizing",
    desc: "We size your softener based on water hardness, household size, and daily usage patterns.",
  },
  {
    num: "3",
    title: "Professional Install",
    desc: "Our certified team installs your system — typically in 2-3 hours with clean, professional plumbing.",
  },
  {
    num: "4",
    title: "Setup & Testing",
    desc: "We program your system, test output water quality, and walk you through everything before we leave.",
  },
];

export default function WaterSoftenersClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/client/service-shower.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/service-water-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3"
          >
            Eliminate Hard Water For Good
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-5"
          >
            Water Softener{" "}
            <span className="text-[var(--color-accent)]">Systems</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Professional-grade ion-exchange softeners that eliminate scale,
            protect your plumbing, and give you the softest water possible.
            Sized and installed by experts.
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
              Get a Free Quote
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
      </section>

      {/* How Softeners Work */}
      <Section background="white" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            How Water Softeners Work
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A proven process that&apos;s been the gold standard for hard water treatment for decades.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.num}
              </div>
              <step.icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-dark text-base mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-2.5 z-10">
                  <ArrowRight className="w-5 h-5 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Dealing with Hard Water Damage?"
        message="Get a free water test and see exactly how hard your water is."
      />

      {/* Softener vs No-Salt */}
      <Section background="surface" gradient="radial-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Softener vs. No-Salt: Which Do You Need?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Both solve hard water — here&apos;s how to choose the right approach for your home.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 p-4 border-b border-gray-100">
            <div className="text-sm font-semibold text-dark">Factor</div>
            <div className="text-sm font-semibold text-primary text-center">Softener</div>
            <div className="text-sm font-semibold text-accent-600 text-center">No-Salt</div>
          </div>
          {softenerVsNoSalt.map((row, i) => (
            <motion.div
              key={row.factor}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`grid grid-cols-3 p-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} ${
                i < softenerVsNoSalt.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="text-sm text-gray-700">{row.factor}</div>
              <div className="text-center">
                {row.softener ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300 text-lg">-</span>
                )}
              </div>
              <div className="text-center">
                {row.noSalt ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300 text-lg">-</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Not sure? <Link href="/contact" className="text-primary font-semibold hover:underline">Get a free water test</Link> and we&apos;ll recommend the right solution.
        </p>
      </Section>

      <InlineCTA
        variant="text"
        text="We&apos;ll help you choose — call (812) 499-6807 or schedule online"
      />

      {/* Lifestyle Images */}
      <div className="py-6 px-6 max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-mom-baby-kitchen.jpg" alt="Mother and baby in kitchen with clean water" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/client/service-shower-hands.jpg" alt="Hands feeling soft water in shower" width={600} height={400} className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      {/* Our Systems */}
      <Section background="white" gradient="radial-right">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Water Softener Systems
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Premium softeners sized for your home&apos;s water hardness and usage.
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

      <InlineCTA
        variant="button"
        text="Get My Softener Quote"
        trustLine="Free in-home estimate — no obligation"
      />

      {/* Installation Process */}
      <Section background="primary-light" gradient="radial-left">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Our Installation Process
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From water test to soft water — here&apos;s what to expect.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {installSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-lg font-bold">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-dark text-base mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Clock, text: "2-3 Hour Install" },
            { icon: Wrench, text: "Clean, Professional Work" },
            { icon: ThumbsUp, text: "Satisfaction Guaranteed" },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-semibold text-dark">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Say Goodbye to{" "}
            <span className="gradient-text">Hard Water</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Scale-free pipes. Spot-free dishes. Softer skin and hair. It all
            starts with a free water test. Schedule yours today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Schedule My Free Water Test
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
