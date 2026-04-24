"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Droplets, AlertTriangle } from "lucide-react";

const issues = [
  {
    icon: Zap,
    title: "Scale Destroys Appliances",
    desc: "Hard minerals coat your pipes, water heater, and dishwasher — cutting efficiency and shaving years off their lifespan.",
  },
  {
    icon: Droplets,
    title: "Dry Skin & Brittle Hair",
    desc: "Hard water strips natural oils from your skin and hair every single shower. It's not your shampoo — it's your water.",
  },
  {
    icon: AlertTriangle,
    title: "Taste, Odor & Contaminants",
    desc: "Iron, sulfur, chlorine, and sediment make tap water taste and smell wrong — and in some cases, it's more than just a nuisance.",
  },
];

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: "#05080A" }}
    >
      <div className="grain-overlay" />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(18,189,251,0.06) 0%, transparent 70%)" }}
      />

      <div className="container-site relative z-10">
        {/* Top editorial row */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20 mb-20 lg:mb-28">
          {/* Big stat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <span
              className="font-display font-bold leading-none tabular-nums"
              style={{
                fontSize: "clamp(6rem, 18vw, 15rem)",
                color: "#12BDFB",
                opacity: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              85%
            </span>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-10 max-w-lg"
          >
            <p
              className="font-display font-light text-white leading-[1.18] mb-5"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)" }}
            >
              of Indiana homes{" "}
              <span className="italic" style={{ color: "rgba(255,255,255,0.45)" }}>
                have hard water.
              </span>
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Most families don&apos;t know. Hard water silently wears down your
              appliances, irritates skin, and costs thousands in premature
              replacements — while you keep paying for bottled water you
              shouldn&apos;t need. We fix it permanently, engineered from your
              actual water test results.
            </p>
            <div
              className="mt-8 w-14 h-px"
              style={{ backgroundColor: "rgba(18,189,251,0.3)" }}
            />
          </motion.div>
        </div>

        {/* Issue cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {issues.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 + i * 0.12 }}
              className="rounded-2xl border p-7 transition-all duration-300 cursor-default group"
              style={{ backgroundColor: "rgba(15,27,36,0.55)", borderColor: "rgba(255,255,255,0.05)" }}
              whileHover={{ borderColor: "rgba(18,189,251,0.18)", backgroundColor: "rgba(15,27,36,0.85)" }}
            >
              <div
                className="inline-flex p-2.5 rounded-xl mb-4"
                style={{ backgroundColor: "rgba(18,189,251,0.07)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "#12BDFB" }} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
