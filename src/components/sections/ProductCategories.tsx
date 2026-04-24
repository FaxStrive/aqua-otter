"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const categories = [
  {
    name: "Water Softeners",
    tagline: "Eliminate hard water. Protect everything you own.",
    desc: "Ion-exchange removes calcium and magnesium at the source — protecting your pipes, appliances, skin, and hair from hard water damage.",
    img: "/client/Softener_RB.png",
    href: "/systems/water-softener",
    badge: "Most Popular",
    solves: ["Scale buildup on fixtures", "Dry skin and dull hair", "Appliance damage"],
  },
  {
    name: "Whole-Home Filtration",
    tagline: "Clean, great-tasting water from every single tap.",
    desc: "Multi-stage carbon filtration removes chlorine, chloramines, sediment, and odor throughout your entire home — not just the kitchen.",
    img: "/client/Alpha_3000_RB-removebg-preview.png",
    href: "/systems/filtration",
    badge: null,
    solves: ["Chlorine taste and smell", "Sediment and rust", "Chemical byproducts"],
  },
  {
    name: "Well Water Solutions",
    tagline: "Purpose-built for well water problems.",
    desc: "Air injection oxidation removes iron, sulfur, and manganese without chemicals or salt. 50% less water waste than comparable systems.",
    img: "/client/AiO_Well_Filtration_RB.png",
    href: "/systems/well-water",
    badge: "Well Water Specialist",
    solves: ["Iron staining", "Sulfur smell", "Bacteria"],
  },
];

export default function ProductCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-36" style={{ backgroundColor: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.12), transparent)" }} />

      <div className="container-site">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
          <span className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block" style={{ color: "#12BDFB" }}>What We Install</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", color: "#0C1F2E" }}>
              Built for your water.<br />
              <span style={{ color: "rgba(12,31,46,0.22)" }}>Not everyone&apos;s.</span>
            </h2>
            <Link href="/systems" className="inline-flex items-center gap-2 text-sm font-medium shrink-0 transition-colors mb-1" style={{ color: "rgba(12,31,46,0.4)" }} onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.4)")}>
              View all 6 systems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group flex flex-col rounded-3xl border overflow-hidden h-full"
                style={{
                  borderColor: "rgba(18,189,251,0.14)",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(12,31,46,0.06)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(18,189,251,0.12)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(18,189,251,0.14)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(12,31,46,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image area */}
                <div
                  className="relative h-52 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "radial-gradient(ellipse at 50% 100%, rgba(18,189,251,0.12) 0%, transparent 70%)",
                    backgroundColor: "#EAF6FE",
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    width={160}
                    height={160}
                    className="w-36 h-36 object-contain transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "drop-shadow(0 8px 16px rgba(18,189,251,0.2))" }}
                  />
                  {cat.badge && (
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="font-display font-bold text-xl mb-1.5" style={{ color: "#0C1F2E" }}>{cat.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "#12BDFB" }}>{cat.tagline}</p>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "rgba(12,31,46,0.52)" }}>{cat.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {cat.solves.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs" style={{ color: "rgba(12,31,46,0.48)" }}>
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#12BDFB" }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
