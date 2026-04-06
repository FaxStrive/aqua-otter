"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const before = [
  "Spending $100+/month on bottled water",
  "Hard water destroying your appliances",
  "Iron stains on sinks, tubs, and laundry",
  "Chlorine smell and bad taste from every tap",
  "Worrying about what your family is drinking",
];

const after = [
  "Unlimited clean water for pennies a day",
  "Appliances last 30% longer",
  "Crystal clear water — zero staining",
  "Fresh, great-tasting water from every faucet",
  "Peace of mind, backed by lab-tested results",
];

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-10 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center font-heading font-semibold text-[var(--color-text)] mb-8" style={{ fontSize: "var(--text-h3)" }}>
          Life <span className="text-[var(--color-text-muted)]">Without</span> vs.{" "}
          <span className="text-[var(--color-primary)]">With</span> Aqua Otter
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-red-100 bg-red-50/50 p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
              Without Aqua Otter
            </p>
            <ul className="space-y-3">
              {before.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-red-800/80"
                >
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-4">
              With Aqua Otter
            </p>
            <ul className="space-y-3">
              {after.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-emerald-800/80"
                >
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
