"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

const galleryItems = [
  { src: "/client/gallery/gallery1.png", label: "Water Softener Installation" },
  { src: "/client/gallery/gallery2.png", label: "Alpha 3000 Filtration System" },
  { src: "/client/gallery/gallery3.png", label: "Well Water System" },
  { src: "/client/gallery/gallery4.png", label: "Twin Softener Setup" },
  { src: "/client/gallery/gallery5.png", label: "Complete System Install" },
  { src: "/client/gallery/gallery6.jpeg", label: "Professional Installation" },
  { src: "/client/gallery/gallery8.jpg", label: "Softener and Filtration Combo" },
  { src: "/client/gallery/gallery10.png", label: "Water Treatment System" },
  { src: "/client/gallery/gallery11.png", label: "System Installation" },
  { src: "/client/gallery/gallery12.png", label: "Professional System" },
  { src: "/client/gallery/gallery16.jpg", label: "Home Water System" },
  { src: "/client/gallery/gallery17.png", label: "Filter Installation" },
  { src: "/client/gallery/gallery19.png", label: "Water System Setup" },
  { src: "/client/gallery/install-01.png", label: "AiO Filtration + Conditioner" },
  { src: "/client/gallery/install-02.png", label: "AiO Filtration + Softener" },
  { src: "/client/gallery/install-03.png", label: "AiO Well Filtration + Conditioner" },
  { src: "/client/gallery/install-04.png", label: "AiO Well Filtration + Softener" },
  { src: "/client/gallery/install-05.png", label: "AiO Filtration + Conditioner" },
  { src: "/client/gallery/install-06.png", label: "AiO Ozone + Softener" },
  { src: "/client/gallery/install-07.png", label: "All-in-One Filtration + Softener" },
  { src: "/client/gallery/install-08.png", label: "Alpha 3000 System" },
  { src: "/client/gallery/install-09.png", label: "Custom Water System" },
  { src: "/client/gallery/install-10.png", label: "Quintex 5 Softener" },
  { src: "/client/gallery/install-11.png", label: "Quintex 5 Softener" },
  { src: "/client/gallery/install-12.png", label: "Quintex Five System" },
  { src: "/client/gallery/install-13.png", label: "Well Filtration + Softener" },
  { src: "/client/gallery/install-14.png", label: "Whole House RO" },
];

export default function GalleryPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "46vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(48px, 6vh, 80px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 55% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-site relative z-10 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>
                Real Systems. Real Homes.
              </span>
            </div>
            <h1
              className="font-display font-bold leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#0C1F2E" }}
            >
              Our installations.<br />
              <span style={{ color: "#12BDFB" }}>Real results.</span>
            </h1>
            <p style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto" }}>
              Every installation starts with a free water test. Every system is designed specifically for that home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section ref={gridRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryItems.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.6) }}
                onClick={() => setLightbox(i)}
                className="w-full break-inside-avoid rounded-2xl overflow-hidden border block group cursor-pointer"
                style={{ borderColor: "rgba(18,189,251,0.1)" }}
              >
                <div className="relative overflow-hidden bg-white" style={{ aspectRatio: i % 5 === 0 ? "4/5" : "4/3" }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                    style={{ background: "linear-gradient(to top, rgba(7,17,26,0.7) 0%, transparent 60%)" }}
                  >
                    <span className="text-xs font-medium text-white">{item.label}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(7,17,26,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(12,31,46,0.6)" }}
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightbox].src}
                alt={galleryItems[lightbox].label}
                width={1200}
                height={900}
                className="w-full h-full object-contain"
                style={{ maxHeight: "85vh" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0C1F2E" }}>
            Ready for your own installation?
          </h2>
          <p className="mb-8" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "36ch", margin: "0 auto 2rem" }}>
            Start with a free in-home water test. No cost, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#12BDFB", color: "#07111A", boxShadow: "0 0 30px rgba(18,189,251,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
          >
            Get Your Free Water Test
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
