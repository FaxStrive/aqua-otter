"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary-dark)] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(8,145,178,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,160,6,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-content mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Otter mascot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/client/otter-clipboard.png"
                alt="Aqua Otter — Ready to Schedule Your Free Test"
                width={220}
                height={220}
                className="w-44 h-44 lg:w-52 lg:h-52 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left flex-1"
          >
            <h2
              className="font-heading font-semibold text-white mb-4 leading-[1.1] text-balance"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Ready for Water You Can Trust?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg lg:max-w-none leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
              Join families across six states who chose Aqua Otter for cleaner, safer
              water. Your free water test is just a call or click away.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-text)] font-semibold px-8 py-4 rounded-lg text-sm hover:brightness-110 transition-all gold-glow group"
              >
                Schedule Free Water Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3.5 rounded-lg text-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Family-Owned &amp; Operated
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" />
                5-Star Google &middot; BBB A+
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
