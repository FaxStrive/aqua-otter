"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Award, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";

const stats = [
  { icon: MapPin, value: "6", label: "States Served" },
  { icon: Clock, value: "25+", label: "Years Experience" },
  { icon: Star, value: "5-Star", label: "Google Rating" },
  { icon: Award, value: "A+", label: "BBB Rating" },
];

export default function About() {
  return (
    <Section background="surface" gradient="radial-right" id="about">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — Otter mascot + image composition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/client/family-water.jpg"
              alt="Family enjoying clean water at home"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating stat card top-left */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-3 sm:left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-lg font-heading font-bold text-[var(--color-text)]">Family-Owned</p>
                <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Since 1999</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide mb-3">
            About Us
          </span>
          <h2
            className="font-heading font-semibold text-[var(--color-text)] mb-4 text-balance"
            style={{ fontSize: "var(--text-h2)" }}
          >
            A Family-Owned Company That Puts{" "}
            <span className="text-[var(--color-primary)]">You First</span>
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-4" style={{ fontSize: "var(--text-body)" }}>
            At Aqua Otter Water Systems, we believe everyone deserves clean, safe water. As a
            family-owned business, we treat every home like our own. We don't
            just sell systems — we test your water first, build a solution customized to your
            needs, and stand behind it with our lifetime warranty.
          </p>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-6" style={{ fontSize: "var(--text-body)" }}>
            Serving families across six states, we specialize in well water treatment and
            no-salt hard water solutions that protect your home without the hassle.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center bg-white rounded-xl p-3 border border-[var(--color-border)]"
                >
                  <Icon className="w-4 h-4 text-[var(--color-primary)] mx-auto mb-1" />
                  <p className="font-heading font-bold text-lg text-[var(--color-text)]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all group"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
