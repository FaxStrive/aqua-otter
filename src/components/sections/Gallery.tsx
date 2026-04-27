"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photos = [
  { src: "/client/gallery/install-01.png", label: "Indianapolis, IN", system: "AiO Filtration + Conditioner" },
  { src: "/client/gallery/install-02.png", label: "Fishers, IN",      system: "AiO Filtration + Softener" },
  { src: "/client/gallery/install-03.png", label: "Noblesville, IN",  system: "AiO Well Filtration + Conditioner" },
  { src: "/client/gallery/install-04.png", label: "Carmel, IN",       system: "AiO Well Filtration + Softener" },
  { src: "/client/gallery/install-05.png", label: "Westfield, IN",    system: "AiO Filtration + Conditioner" },
  { src: "/client/gallery/install-06.png", label: "Zionsville, IN",   system: "AiO Ozone + Softener" },
  { src: "/client/gallery/install-07.png", label: "Kokomo, IN",       system: "All-in-One Filtration + Softener" },
  { src: "/client/gallery/install-08.png", label: "Grand Rapids, MI", system: "Alpha 3000 System" },
  { src: "/client/gallery/install-09.png", label: "Fort Wayne, IN",   system: "Custom Water System" },
  { src: "/client/gallery/install-10.png", label: "South Bend, IN",   system: "Quintex 5 Softener" },
  { src: "/client/gallery/install-11.png", label: "Lafayette, IN",    system: "Quintex 5 Softener" },
  { src: "/client/gallery/install-12.png", label: "Muncie, IN",       system: "Quintex Five System" },
  { src: "/client/gallery/install-13.png", label: "Elkhart, IN",      system: "Well Filtration + Softener" },
  { src: "/client/gallery/install-14.png", label: "Terre Haute, IN",  system: "Whole House RO" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>

      {/* TOP: Label + headline + CTA in an asymmetric row */}
      <div className="container-site" style={{ paddingTop: "clamp(64px, 8vw, 120px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-0"
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase mb-3 block" style={{ color: "#12BDFB" }}>Our Work</span>
            <h2 className="font-display font-bold leading-[0.88]" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: "#0C1F2E" }}>
              Real<br />Installs.
            </h2>
          </div>
          <div className="md:pb-4 flex flex-col items-start md:items-end gap-2">
            <p className="text-sm" style={{ color: "rgba(12,31,46,0.45)", maxWidth: "26ch", textAlign: "right" }}>
              Every job starts with a test. Every system is designed for that home.
            </p>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: "#12BDFB" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              View all installations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile: 2×2 simple grid */}
      <div className="md:hidden grid grid-cols-2 gap-1.5 mt-8 px-4">
        {photos.slice(0, 4).map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative overflow-hidden rounded-2xl"
            style={{ height: 160 }}
          >
            <Image src={p.src} alt={p.system} fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.65) 0%, transparent 55%)" }} />
            <div className="absolute bottom-3 left-3">
              <p className="text-[10px] text-white font-semibold">{p.system}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: COLLAGE: Edge-to-edge, broken grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "38% 22% 1fr 1fr",
          gridTemplateRows: "300px 240px",
          gap: 6,
          marginTop: 32,
        }}
      >
        {/* BIG hero image — spans full height, left edge bleeding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative overflow-hidden group"
          style={{ gridColumn: "1", gridRow: "1 / 3" }}
        >
          <Image src={photos[0].src} alt={photos[0].system} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="38vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.7) 0%, transparent 50%)" }} />
          <div className="absolute bottom-5 left-5">
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>{photos[0].label}</p>
            <p className="text-base font-semibold text-white">{photos[0].system}</p>
          </div>
        </motion.div>

        {/* Tall narrow — col 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="relative overflow-hidden group"
          style={{ gridColumn: "2", gridRow: "1 / 3" }}
        >
          <Image src={photos[1].src} alt={photos[1].system} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="22vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.6) 0%, transparent 55%)" }} />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] text-white font-semibold uppercase tracking-wider">{photos[1].system}</p>
          </div>
        </motion.div>

        {/* 3 photos top-right */}
        {[photos[2], photos[3], photos[4]].map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 + i * 0.08 }}
            className="relative overflow-hidden group"
            style={{ gridColumn: `${3 + (i % 2)}`, gridRow: i < 2 ? "1" : "1" }}
          >
            <Image src={p.src} alt={p.system} fill className="object-cover transition-transform duration-500 group-hover:scale-108" sizes="20vw" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(7,17,26,0.65) 0%, transparent 60%)" }} />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[10px] text-white font-medium">{p.system}</p>
            </div>
          </motion.div>
        ))}

        {/* 2 photos bottom-right */}
        {[photos[5], photos[6]].map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.42 + i * 0.08 }}
            className="relative overflow-hidden group"
            style={{ gridColumn: `${3 + i}`, gridRow: "2" }}
          >
            <Image src={p.src} alt={p.system} fill className="object-cover transition-transform duration-500 group-hover:scale-108" sizes="20vw" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(7,17,26,0.3)" }} />
          </motion.div>
        ))}
      </div> {/* end desktop collage */}

      {/* Stat strip below collage */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-site flex flex-wrap items-center gap-8"
        style={{ paddingTop: 40, paddingBottom: "clamp(64px, 8vw, 100px)" }}
      >
        {[["5,000+", "Families served"], ["6", "States we serve"], ["5,000+", "Total systems installed"]].map(([val, label]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="font-display font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#0C1F2E", letterSpacing: "-0.03em" }}>{val}</span>
            <span className="text-sm" style={{ color: "rgba(12,31,46,0.4)" }}>{label}</span>
          </div>
        ))}
        <Link href="/gallery" className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold" style={{ borderColor: "rgba(12,31,46,0.12)", color: "rgba(12,31,46,0.55)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#12BDFB"; e.currentTarget.style.color = "#12BDFB"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(12,31,46,0.12)"; e.currentTarget.style.color = "rgba(12,31,46,0.55)"; }}>
          View full gallery <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </section>
  );
}
