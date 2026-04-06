"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Lightbulb, TrendingDown } from "lucide-react";

type FactVariant = "warning" | "didyouknow" | "stat";

interface FactStripProps {
  variant: FactVariant;
  text: string;
  highlight?: string;
}

const config = {
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    textColor: "text-amber-900",
    highlightColor: "text-amber-600 font-bold",
  },
  didyouknow: {
    icon: Lightbulb,
    bg: "bg-[var(--color-primary-light)] border-[var(--color-primary)]/20",
    iconColor: "text-[var(--color-primary)]",
    textColor: "text-[var(--color-text)]",
    highlightColor: "text-[var(--color-primary)] font-bold",
  },
  stat: {
    icon: TrendingDown,
    bg: "bg-[var(--color-accent-light)] border-[var(--color-accent)]/30",
    iconColor: "text-[var(--color-accent-hover)]",
    textColor: "text-[var(--color-text)]",
    highlightColor: "text-[var(--color-accent-hover)] font-bold",
  },
};

export function FactStrip({ variant, text, highlight }: FactStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const c = config[variant];
  const Icon = c.icon;

  const parts = highlight ? text.split(highlight) : [text];

  return (
    <div ref={ref} className="py-3 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className={`flex items-center justify-center gap-4 rounded-xl border px-6 py-4 text-center ${c.bg}`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${c.iconColor}`} />
        <p className={`text-sm md:text-base leading-relaxed ${c.textColor}`}>
          {highlight ? (
            <>
              {parts[0]}
              <span className={c.highlightColor}>{highlight}</span>
              {parts[1]}
            </>
          ) : (
            text
          )}
        </p>
      </motion.div>
    </div>
  );
}
