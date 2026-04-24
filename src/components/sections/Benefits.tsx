"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Shield, Droplets, Banknote } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Heart,
    title: "Healthier for your family",
    desc: "Removing chlorine, heavy metals, and contaminants means better-tasting water, softer skin, and healthier hair. Families notice the difference within weeks.",
    img: "/client/service-mom-baby-kitchen.jpg",
    stat: "Week 1",
    statLabel: "families notice the difference",
  },
  {
    icon: Shield,
    title: "Protect your appliances",
    desc: "Hard water scale silently destroys water heaters, dishwashers, and pipes. A treated system can add years to every appliance in your home.",
    img: "/client/service-kitchen-tap.jpg",
    stat: "30%",
    statLabel: "shorter appliance lifespan from scale",
  },
  {
    icon: Droplets,
    title: "Pure water from every tap",
    desc: "Not just the kitchen. Every faucet, shower, and laundry cycle in your home delivers clean, filtered water after a single installation visit.",
    img: "/client/service-glass-fill.jpg",
    stat: "Every tap",
    statLabel: "treated from the point of entry",
  },
  {
    icon: Banknote,
    title: "Save money long-term",
    desc: "Eliminate $800+ in annual bottled water costs. Reduce detergent and soap usage by up to 50%. Extend appliance lifespans significantly.",
    img: "/client/service-woman-drinking.jpg",
    stat: "$800+",
    statLabel: "saved on bottled water per year",
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#F0F8FF" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.12), transparent)" }} />

      <div className="container-site relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
          <span className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block" style={{ color: "#12BDFB" }}>Why It Matters</span>
          <h2 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", color: "#0C1F2E" }}>
            Life is better when<br />
            <span style={{ color: "rgba(12,31,46,0.22)" }}>the water is.</span>
          </h2>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col sm:flex-row rounded-3xl border bg-white overflow-hidden"
              style={{
                borderColor: "rgba(18,189,251,0.14)",
                boxShadow: "0 4px 24px rgba(12,31,46,0.07)",
              }}
            >
              {/* Image */}
              <div className="relative sm:w-44 flex-shrink-0 overflow-hidden" style={{ minHeight: 180 }}>
                <Image
                  src={b.img}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 176px"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,31,46,0.2) 0%, transparent 60%)" }} />
              </div>

              {/* Content */}
              <div className="flex-1 p-7">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(18,189,251,0.12)" }}>
                  <b.icon className="w-4.5 h-4.5" style={{ color: "#12BDFB" }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#0C1F2E" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(12,31,46,0.58)" }}>{b.desc}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold" style={{ fontSize: "1.1rem", color: "#12BDFB" }}>{b.stat}</span>
                  <span className="text-xs" style={{ color: "rgba(12,31,46,0.38)" }}>{b.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
