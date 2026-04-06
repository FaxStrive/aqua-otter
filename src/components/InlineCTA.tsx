"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface InlineCTAProps {
  variant: "banner" | "button" | "text";
  text: string;
  message?: string;
  trustLine?: string;
  href?: string;
}

const PHONE_TEL = "tel:6166121660";
const PHONE = "(616) 612-1660";

export function InlineCTA({
  variant,
  text,
  message,
  trustLine,
  href = "/contact",
}: InlineCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (variant === "banner") {
    return (
      <div ref={ref} className="py-4 px-6 max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-8 py-10 md:py-12"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">{text}</h3>
              {message && (
                <p className="text-sm md:text-base text-white/80 leading-relaxed">{message}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link
                href={href}
                className="inline-flex items-center gap-2 bg-white text-[var(--color-primary-dark)] font-semibold px-6 py-3.5 rounded-lg text-sm hover:bg-white/90 transition-colors group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div ref={ref} className="py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={href}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-lg text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[var(--color-primary)]/20 group"
          >
            {text}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {trustLine && (
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">{trustLine}</p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className="py-6 text-center">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm hover:text-[var(--color-accent)] transition-colors"
        >
          {text}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  );
}
