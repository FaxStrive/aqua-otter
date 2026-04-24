"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const CDN = "https://le-cdn.hibuwebsites.com/83d9b94b401e4aacb1d20946298c17ad/dms3rep/multi/opt/";

const systems = [
  {
    id: "softener",
    badge: "Most Popular",
    name: "Water Softener",
    tagline: "Eliminate hard water. Protect everything.",
    desc: "Ion-exchange technology removes calcium and magnesium at the source. Every pipe, appliance, and fixture — protected.",
    specs: ["Whole-home coverage", "Smart regeneration", "Salt-efficient design", "Lifetime warranty available"],
    img: `${CDN}Softener+RB-1920w.png`,
    href: "/systems/water-softener",
    glow: "rgba(18,189,251,0.12)",
  },
  {
    id: "filter",
    badge: null,
    name: "Alpha 3000",
    tagline: "City water, made clean.",
    desc: "Multi-stage carbon filtration removes chlorine, chloramines, sediment, and odor from every tap in your home.",
    specs: ["Chlorine & chloramine removal", "Sediment pre-filter", "Low pressure drop", "5-year media life"],
    img: `${CDN}Alpha_3000_RB-removebg-preview-13ade1fe-1920w.png`,
    href: "/systems/filtration",
    glow: "rgba(18,189,251,0.08)",
  },
  {
    id: "ro",
    badge: null,
    name: "Alkaline RO",
    tagline: "Ultra-pure drinking water.",
    desc: "5-stage reverse osmosis removes 99.9% of contaminants. Remineralized to a clean, alkaline pH straight from your tap.",
    specs: ["99.9% contaminant removal", "Alkaline remineralization", "Under-sink install", "Crystal-clear taste"],
    img: `${CDN}5+Stage+Reverse+Osmosis+RB-4f93437a-1920w.png`,
    href: "/systems/reverse-osmosis",
    glow: "rgba(251,191,132,0.07)",
  },
];

export default function Systems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40"
      style={{ backgroundColor: "#0B1219" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.1), transparent)" }}
      />

      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block"
            style={{ color: "#12BDFB" }}
          >
            What We Install
          </span>
          <h2
            className="font-display font-bold text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Our Systems
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.id}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.13 }}
              whileHover={{ y: -5, borderColor: "rgba(18,189,251,0.22)" }}
              className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-400 cursor-pointer"
              style={{ backgroundColor: "#0F1B24", borderColor: "rgba(255,255,255,0.05)" }}
            >
              {/* Top accent line */}
              <div className="h-[2px] w-full flex-shrink-0 bg-gradient-to-r from-[#12BDFB] to-transparent" />

              {/* Product image */}
              <div
                className="relative h-52 flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${sys.glow} 0%, transparent 65%)` }}
              >
                <Image
                  src={sys.img}
                  alt={sys.name}
                  width={200}
                  height={200}
                  className="w-40 h-40 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                {sys.badge && (
                  <span
                    className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#12BDFB", color: "#05080A" }}
                  >
                    {sys.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <span
                  className="text-xs font-medium uppercase tracking-[0.12em] mb-2"
                  style={{ color: "rgba(18,189,251,0.65)" }}
                >
                  {sys.name}
                </span>
                <p className="text-base font-semibold text-white mb-2">{sys.tagline}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {sys.desc}
                </p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {sys.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#12BDFB" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={sys.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          className="text-center mt-10"
        >
          <Link
            href="/systems"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(18,189,251,0.3)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            }}
          >
            View All Systems
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
