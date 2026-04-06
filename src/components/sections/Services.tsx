"use client";

import { motion } from "framer-motion";
import {
  FlaskConical,
  FileText,
  Wrench,
  RefreshCw,
  Settings,
  Droplets,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import GoldBadge from "@/components/ui/GoldBadge";

const services = [
  {
    icon: FlaskConical,
    title: "Free Water Test",
    description:
      "Comprehensive in-home water analysis with instant results. No cost, no obligation.",
    href: "/services/free-water-test",
    badge: "FREE",
    highlighted: true,
  },
  {
    icon: Droplets,
    title: "Well Water Treatment",
    description:
      "Expert solutions for iron, sulfur, bacteria, and other well water challenges.",
    href: "/services/well-water-treatment",
    badge: "Specialty",
    highlighted: false,
  },
  {
    icon: Settings,
    title: "No-Salt Hard Water",
    description:
      "Hard water treatment without salt bags, brine discharge, or slippery water feel.",
    href: "/services/no-salt-hard-water",
    badge: "No Salt",
    highlighted: false,
  },
  {
    icon: FileText,
    title: "Water Softeners",
    description:
      "Traditional and advanced softener systems for homes that need them.",
    href: "/services/water-softeners",
    highlighted: false,
  },
  {
    icon: RefreshCw,
    title: "Reverse Osmosis",
    description:
      "Pure drinking water systems removing 99% of contaminants at the tap.",
    href: "/services/reverse-osmosis",
    highlighted: false,
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Filter replacements, valve cleanings, and system checkups to keep your water pristine.",
    href: "/services/maintenance",
    highlighted: false,
  },
];

export default function Services() {
  return (
    <Section background="white" gradient="radial-left" id="services">
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
        {/* Pointing otter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/client/otter-pointing.png"
              alt="Aqua Otter pointing to services"
              width={140}
              height={140}
              className="w-28 h-28 lg:w-32 lg:h-32 object-contain drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
        <div className="text-center lg:text-left">
          <span className="inline-block text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide mb-2">
            Our Services
          </span>
          <h2
            className="font-heading font-semibold text-[var(--color-text)] text-balance"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Complete Water Treatment Solutions
          </h2>
          <p className="text-[var(--color-text-muted)] mt-2" style={{ fontSize: "var(--text-body)" }}>
            From testing to installation to maintenance — we handle it all.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Link
                href={service.href}
                className={`water-card group block h-full rounded-xl p-6 border ${
                  service.highlighted
                    ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]/20 shadow-md"
                    : "bg-white border-[var(--color-border)] shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                      service.highlighted
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-surface)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {service.badge && <GoldBadge text={service.badge} />}
                </div>
                <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2.5 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
