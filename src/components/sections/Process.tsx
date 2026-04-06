"use client";

import { motion } from "framer-motion";
import { FlaskConical, FileText, Wrench, Droplets, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/Section";

const PHONE = "(616) 612-1660";
const PHONE_TEL = "tel:6166121660";

const steps = [
  {
    number: "01",
    icon: FlaskConical,
    title: "Free Water Test",
    description:
      "We come to your home and test your water on-site. Instant results, no cost, no pressure.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Custom Quote",
    description:
      "Based on your results, we build a system tailored to your specific water issues and budget.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Quick Install",
    description:
      "Professional installation is included free. Most installs completed in under 2.5 hours.",
  },
  {
    number: "04",
    icon: Droplets,
    title: "Enjoy Clean Water",
    description:
      "Turn on the tap and taste the difference. Crystal clear, great-tasting water from every faucet.",
  },
];

export default function Process() {
  return (
    <Section background="dark" id="process">
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider mb-3"
        >
          How It Works
        </motion.span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-3">
          Clean Water in <span className="text-primary">4 Simple Steps</span>
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          From test to tap, we make it easy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />
              )}
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <Icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-dark text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
        >
          Start With a FREE Test
          <ArrowRight className="w-5 h-5" />
        </Link>
        <a
          href={PHONE_TEL}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
        >
          <Phone className="w-4 h-4" />
          {PHONE}
        </a>
      </div>
    </Section>
  );
}
