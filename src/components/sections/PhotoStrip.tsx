"use client";

import Image from "next/image";

const ROW_A = [
  { src: "/client/service-couple-drinking.jpg",  alt: "Couple enjoying clean water" },
  { src: "/client/service-family-sink.jpg",      alt: "Family at kitchen sink" },
  { src: "/client/service-kid-drinking.jpg",     alt: "Child drinking clean water" },
  { src: "/client/service-tech-handshake.jpg",   alt: "Technician greeting homeowner" },
  { src: "/client/service-tap-closeup.jpg",      alt: "Clean water from tap" },
  { src: "/client/service-woman-glass.jpg",      alt: "Woman with glass of water" },
  { src: "/client/service-filtration-glass.jpg", alt: "Filtration result glass" },
  { src: "/client/service-tech-friendly.jpg",    alt: "Friendly technician" },
  { src: "/client/service-shower.jpg",           alt: "Soft water shower" },
  { src: "/client/service-kitchen-tap.jpg",      alt: "Kitchen tap water" },
];

const ROW_B = [
  { src: "/client/service-mom-baby-kitchen.jpg", alt: "Mom and baby at kitchen" },
  { src: "/client/service-glass-fill.jpg",       alt: "Glass filling with water" },
  { src: "/client/service-tech-consult.jpg",     alt: "Tech explaining system" },
  { src: "/client/service-family-outdoor.jpg",   alt: "Family outdoors" },
  { src: "/client/service-plumber-portrait.jpg", alt: "Professional technician" },
  { src: "/client/service-clean-glass.jpg",      alt: "Clean crystal glass" },
  { src: "/client/service-woman-drinking.jpg",   alt: "Woman drinking water" },
  { src: "/client/service-tech-door.jpg",        alt: "Technician at door" },
  { src: "/client/service-shower-hands.jpg",     alt: "Soft water hands in shower" },
  { src: "/client/service-glasses-row.jpg",      alt: "Row of clean glasses" },
];

function Strip({ items, direction }: { items: typeof ROW_A; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "max-content",
          animation: `strip-scroll-${direction} 55s linear infinite`,
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 260,
              height: 200,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="260px"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes strip-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes strip-scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function PhotoStrip() {
  return (
    <section
      className="py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#07111A" }}
    >
      {/* Header */}
      <div className="container-site mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(18,189,251,0.55)" }}>
          Life with clean water
        </p>
        <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#ffffff" }}>
          The difference you feel every day.
        </h2>
      </div>

      {/* Dual rows — 1 on mobile, 2 on desktop */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Strip items={ROW_A} direction="left" />
        <div className="hidden md:block">
          <Strip items={ROW_B} direction="right" />
        </div>
      </div>
    </section>
  );
}
