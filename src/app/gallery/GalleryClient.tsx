"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Phone, ZoomIn } from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const PHONE = "(616) 612-1660";
const PHONE_TEL = "tel:6166121660";

interface GalleryItem {
  src: string;
  alt: string;
  category: "installations" | "products";
}

const images: GalleryItem[] = [
  { src: "/client/Installation1.png", alt: "Water System Installation", category: "installations" },
  { src: "/client/Install2.png", alt: "Professional Installation", category: "installations" },
  { src: "/client/Install4.png", alt: "Complete System Install", category: "installations" },
  { src: "/client/Softener_Install_1.png", alt: "Softener Installation", category: "installations" },
  { src: "/client/Alpha_3000_RB.png", alt: "Alpha 3000 Water System", category: "products" },
  { src: "/client/Quintex_5_RB.png", alt: "Quintex 5 Water System", category: "products" },
  { src: "/client/Dual_City_Softener___Filtration.png", alt: "Dual City Softener & Filtration", category: "products" },
  { src: "/client/AiO_Well_Filtration_RB.png", alt: "All-in-One Well Filtration", category: "products" },
  { src: "/client/AiO_Ozone.png", alt: "All-in-One Ozone System", category: "products" },
  { src: "/client/No-Salt_Hard_Water_Treatment.png", alt: "No-Salt Hard Water Treatment", category: "products" },
  { src: "/client/Softener_RB.png", alt: "Water Softener System", category: "products" },
  { src: "/client/Twin_Softener_RB.png", alt: "Twin Softener System", category: "products" },
  { src: "/client/Whole_House_RO_Set-up_RB.png", alt: "Whole House RO Setup", category: "products" },
  { src: "/client/5_Stage_Reverse_Osmosis_RB.png", alt: "5-Stage Reverse Osmosis", category: "products" },
  { src: "/client/Sediment_Filter_RB.png", alt: "Sediment Filter", category: "products" },
];

const tabs = [
  { label: "All", value: "all" },
  { label: "Installations", value: "installations" },
  { label: "Products", value: "products" },
] as const;

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    activeTab === "all"
      ? images
      : images.filter((img) => img.category === activeTab);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/client/gallery-hero.jpg"
          alt="Camera lens — installation gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/70" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 sm:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            Our Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight mb-4"
          >
            Installation{" "}
            <span className="text-[var(--color-accent)]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 max-w-xl mx-auto text-base sm:text-lg"
          >
            Browse our installations and products. Real systems, real homes,
            real results.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <Section background="surface" gradient="radial-center">
        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.value
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-500 border border-gray-100 hover:border-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">
                (
                {tab.value === "all"
                  ? images.length
                  : images.filter((i) => i.category === tab.value).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer"
                onClick={() => setLightbox(img)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium truncate">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-dark/50">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white/70 text-center text-sm mt-3">
                {lightbox.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <InlineCTA
        variant="banner"
        text="Want This for Your Home?"
        message="Every installation starts with a free water test. Let&apos;s find the perfect system for your water."
        href="/contact"
      />

      {/* CTA Section */}
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-black mb-4">
              Ready for Your Own{" "}
              <span className="gradient-text">Installation?</span>
            </h2>
            <p className="text-white/70 mb-6">
              Every project in this gallery started the same way - with a free
              water test. Let&apos;s get yours scheduled.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
              >
                Get My Free Water Test
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
