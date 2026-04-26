"use client";

import { useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

type City = { name: string; lat: number; lng: number; gpg: number };

const cities: City[] = [
  { name: "Gary",         lat: 41.593, lng: -87.346, gpg: 25 },
  { name: "South Bend",   lat: 41.683, lng: -86.252, gpg: 16 },
  { name: "Fort Wayne",   lat: 41.079, lng: -85.139, gpg: 22 },
  { name: "Kokomo",       lat: 40.486, lng: -86.134, gpg: 20 },
  { name: "Lafayette",    lat: 40.417, lng: -86.875, gpg: 15 },
  { name: "Muncie",       lat: 40.193, lng: -85.386, gpg: 19 },
  { name: "Anderson",     lat: 40.105, lng: -85.680, gpg: 18 },
  { name: "Carmel",       lat: 39.978, lng: -86.118, gpg: 19 },
  { name: "Indianapolis", lat: 39.768, lng: -86.158, gpg: 17 },
  { name: "Terre Haute",  lat: 39.467, lng: -87.414, gpg: 12 },
  { name: "Columbus",     lat: 39.201, lng: -85.921, gpg: 15 },
  { name: "Bloomington",  lat: 39.165, lng: -86.526, gpg: 13 },
  { name: "Evansville",   lat: 37.972, lng: -87.571, gpg: 11 },
  { name: "New Albany",   lat: 38.286, lng: -85.824, gpg: 14 },
];

function getColor(gpg: number) {
  if (gpg >= 20) return { fill: "#ffffff", stroke: "rgba(18,189,251,0.8)" };
  if (gpg >= 16) return { fill: "#12BDFB", stroke: "#0a9ed9" };
  if (gpg >= 12) return { fill: "rgba(18,189,251,0.75)", stroke: "rgba(18,189,251,0.9)" };
  return { fill: "rgba(18,189,251,0.45)", stroke: "rgba(18,189,251,0.7)" };
}

function getLabel(gpg: number) {
  if (gpg >= 20) return { level: "Extremely hard", desc: "Severe scale, appliance damage — immediate treatment advised" };
  if (gpg >= 16) return { level: "Very hard", desc: "Noticeable scale, skin irritation, high soap consumption" };
  if (gpg >= 12) return { level: "Hard", desc: "Scale buildup begins, water heater efficiency drops measurably" };
  return { level: "Moderately hard", desc: "Minor deposits forming, treatment recommended" };
}

function DisableInteractions() {
  const map = useMap();
  map.scrollWheelZoom.disable();
  return null;
}

export default function IndianaHardnessMap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<City | null>(null);
  const [hovered, setHovered] = useState<City | null>(null);
  const active = selected || hovered;

  return (
    <div ref={wrapperRef} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">

      {/* LEFT: Leaflet map */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{ height: 520, border: "1px solid rgba(18,189,251,0.18)", boxShadow: "0 12px 48px rgba(12,31,46,0.1)" }}
        >
          <MapContainer
            center={[39.85, -86.35]}
            zoom={7}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
            attributionControl={false}
          >
            <DisableInteractions />

            {/* CartoDB Positron — clean light tiles, no API key */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />

            {cities.map((city) => {
              const c = getColor(city.gpg);
              const isActive = active?.name === city.name;
              return (
                <CircleMarker
                  key={city.name}
                  center={[city.lat, city.lng]}
                  radius={isActive ? 12 : 8}
                  pathOptions={{
                    fillColor: isActive ? "#12BDFB" : c.fill,
                    fillOpacity: 1,
                    color: isActive ? "#ffffff" : c.stroke,
                    weight: isActive ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    mouseover: () => setHovered(city),
                    mouseout: () => setHovered(null),
                    click: () => setSelected(prev => prev?.name === city.name ? null : city),
                  }}
                />
              );
            })}
          </MapContainer>
        </div>
        <p className="text-center text-xs mt-3" style={{ color: "rgba(12,31,46,0.28)" }}>
          Municipal water reports and field testing. Click a city dot.
        </p>
      </motion.div>

      {/* RIGHT: Legend + info panel */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="lg:pt-6"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(12,31,46,0.35)" }}>
          Indiana Hardness Survey
        </p>
        <h2 className="font-display font-bold mb-5 leading-[0.92]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#0C1F2E" }}>
          Your zip code<br />is almost certainly hard.
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(12,31,46,0.52)", maxWidth: "44ch" }}>
          Hard water is measured in grains per gallon. Anything above 7 GPG is considered hard. Most Indiana homes test between 15 and 22 GPG, more than double the threshold.
        </p>

        {/* Scale legend */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "rgba(12,31,46,0.3)" }}>
            Hardness Scale (GPG)
          </p>
          <div className="space-y-2.5">
            {[
              { label: "Extremely hard", range: "20+ GPG",     fill: "#ffffff",              ring: "rgba(18,189,251,0.6)",  note: "Fort Wayne, Gary" },
              { label: "Very hard",      range: "16 – 19 GPG", fill: "#12BDFB",              ring: "#0a9ed9",               note: "Most of central IN" },
              { label: "Hard",           range: "12 – 15 GPG", fill: "rgba(18,189,251,0.75)", ring: "rgba(18,189,251,0.9)", note: "SW Indiana" },
              { label: "Moderate",       range: "7 – 11 GPG",  fill: "rgba(18,189,251,0.45)", ring: "rgba(18,189,251,0.7)", note: "Evansville area" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.fill, border: `1.5px solid ${s.ring}` }} />
                <span className="text-xs font-semibold" style={{ color: "#0C1F2E", minWidth: "11ch" }}>{s.label}</span>
                <span className="text-xs font-semibold" style={{ color: "#12BDFB", minWidth: "10ch" }}>{s.range}</span>
                <span className="text-xs hidden sm:block" style={{ color: "rgba(12,31,46,0.32)" }}>{s.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* City card */}
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#0C1F2E", border: "1px solid rgba(18,189,251,0.2)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display font-bold text-white" style={{ fontSize: "1.2rem" }}>{active.name}</p>
                    {selected?.name === active.name && (
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(18,189,251,0.15)", color: "#12BDFB" }}>selected</span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{getLabel(active.gpg).level}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-bold" style={{ fontSize: "1.8rem", color: "#12BDFB", lineHeight: 1 }}>{active.gpg}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>GPG</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                {getLabel(active.gpg).desc}
              </p>
              {selected && (
                <button
                  onClick={() => setSelected(null)}
                  className="mt-3 text-[11px] font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  Clear selection
                </button>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm"
              style={{ color: "rgba(12,31,46,0.3)" }}
            >
              Hover or click a city dot to see its measured hardness level
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
