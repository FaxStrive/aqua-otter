"use client";

import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";

const photos = [
  { src: "/client/Installation1.png", alt: "Water system installation" },
  { src: "/client/Install2.png", alt: "Completed water filtration install" },
  { src: "/client/Install4.png", alt: "Professional water treatment setup" },
  { src: "/client/Softener_Install_1.png", alt: "Water softener installation" },
];

export default function Gallery() {
  return (
    <Section background="white" gradient="radial-center" id="gallery">
      <div className="text-center mb-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3"
        >
          <Camera className="w-4 h-4" />
          Our Work
        </motion.span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-3">
          Recent <span className="gradient-text">Installations</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Professional, clean installations in homes just like yours.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          View Full Gallery
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
