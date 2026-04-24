"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Home, Wrench, ShieldCheck } from "lucide-react";
import Otter from "@/components/ui/Otter";

type ZoneId = "basement" | "kitchen" | "living" | "bathrooms" | "bedrooms";

type Zone = {
  id: ZoneId;
  label: string;
  floor: string;
  system: string;
  color: string;
  desc: string;
  benefits: string[];
  pipePath: string; // SVG path from basement entry point to the room
  image: string;
  imageAlt: string;
  imageCaption: string;
};

const ROOMS: Record<ZoneId, { x: number; y: number; w: number; h: number }> = {
  basement:  { x: 70,  y: 420, w: 520, h: 70  },
  kitchen:   { x: 70,  y: 300, w: 260, h: 120 },
  living:    { x: 330, y: 300, w: 260, h: 120 },
  bathrooms: { x: 70,  y: 180, w: 260, h: 120 },
  bedrooms:  { x: 330, y: 180, w: 260, h: 120 },
};

// Treatment manifold x=330 in basement (center). Each pipe starts there and routes via wall risers.
const zones: Zone[] = [
  {
    id: "basement", label: "Basement", floor: "Utility Level",
    system: "Treatment System",
    color: "#f59e0b",
    desc: "Where the magic happens. The system ties into your main supply here and conditions 100% of incoming water before it ever touches a faucet.",
    benefits: ["Whole-home coverage from one spot", "Handles softening, filtration, and disinfection", "Annual service only", "Self-monitoring electronics"],
    pipePath: "M 330 430 L 330 455",
    image: "/client/AiO_well_filtration_and_Softener.jpg",
    imageAlt: "Aqua Otter treatment system installed in a basement",
    imageCaption: "Clean, compact install. Usually tucked in a utility corner.",
  },
  {
    id: "kitchen", label: "Kitchen", floor: "Main Floor",
    system: "Reverse Osmosis",
    color: "#22c55e",
    desc: "A 5-stage RO system installs under the sink with a dedicated faucet — your drinking and cooking water at 99% pure.",
    benefits: ["99% TDS removal", "Lead and PFAS eliminated", "Dedicated filtered tap", "Stop buying bottled water"],
    pipePath: "M 330 430 L 330 422 L 95 422 L 95 360 L 200 360",
    image: "/client/service-kitchen-tap.jpg",
    imageAlt: "Clean filtered water from a dedicated kitchen tap",
    imageCaption: "Dedicated RO tap. Cleaner than bottled, on-demand.",
  },
  {
    id: "living", label: "Living + Laundry", floor: "Main Floor",
    system: "Water Softener",
    color: "#12BDFB",
    desc: "Spot-free dishes, brighter laundry, scale-free dishwashers and washing machines — all from the same conditioned line.",
    benefits: ["Spot-free dishware", "Brighter, softer laundry", "Appliance scale prevention", "25% less detergent needed"],
    pipePath: "M 330 430 L 330 422 L 565 422 L 565 360 L 460 360",
    image: "/client/service-clean-glass.jpg",
    imageAlt: "Spot-free dishware coming out of a dishwasher",
    imageCaption: "Dishes come out spotless. Appliances last years longer.",
  },
  {
    id: "bathrooms", label: "Bathrooms", floor: "Upper Floor",
    system: "Water Softener",
    color: "#12BDFB",
    desc: "The upgrade you feel first. Skin stays hydrated, soap actually lathers, and your shower glass stops spotting.",
    benefits: ["Better skin and hair", "Full soap lather", "Spot-free shower glass", "No scale on fixtures"],
    pipePath: "M 330 430 L 330 422 L 95 422 L 95 240 L 200 240",
    image: "/client/service-shower.jpg",
    imageAlt: "Soft water shower with clean glass and no scale",
    imageCaption: "The first place you feel it. Skin and hair change day one.",
  },
  {
    id: "bedrooms", label: "Bedrooms", floor: "Upper Floor",
    system: "Whole-Home Coverage",
    color: "#a78bfa",
    desc: "Humidifiers, ice makers, and every water line reaching the upper floor run on conditioned water automatically.",
    benefits: ["Humidifiers scale-free", "Ice maker protection", "All water lines covered", "No action needed"],
    pipePath: "M 330 430 L 330 422 L 565 422 L 565 240 L 460 240",
    image: "/client/service-kid-drinking.jpg",
    imageAlt: "Child drinking clean water in a home setting",
    imageCaption: "Every tap, every room. Soft water reaches everything.",
  },
];

// Flat colored drops animating along a path
function FlowPipe({ d, color, active, duration = 2.2, delay = 0 }: { d: string; color: string; active: boolean; duration?: number; delay?: number }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={active ? color : "rgba(255,255,255,0.06)"}
        strokeWidth={active ? 2.2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
      />
      {active && (
        <>
          {[0, 0.33, 0.66].map((offset, i) => (
            <circle key={i} r={3.2} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
              <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay + offset * duration}s`}>
                <mpath href={`#path-${d.charCodeAt(5)}-${d.length}`} />
              </animateMotion>
            </circle>
          ))}
          <path id={`path-${d.charCodeAt(5)}-${d.length}`} d={d} fill="none" stroke="none" />
        </>
      )}
    </g>
  );
}

// Fixture icons drawn directly in SVG
function KitchenFixtures({ x, y, active }: { x: number; y: number; active: boolean }) {
  const c = active ? "#22c55e" : "rgba(255,255,255,0.22)";
  return (
    <g transform={`translate(${x},${y})`} style={{ transition: "all 0.3s", pointerEvents: "none" }}>
      {/* Fridge */}
      <rect x={0} y={0} width={24} height={52} rx={3} fill="none" stroke={c} strokeWidth={1.3} />
      <line x1={0} y1={18} x2={24} y2={18} stroke={c} strokeWidth={1} />
      <circle cx={20} cy={11} r={1} fill={c} />
      <circle cx={20} cy={30} r={1} fill={c} />
      {/* Sink with dedicated RO tap */}
      <rect x={40} y={30} width={32} height={16} rx={1} fill="none" stroke={c} strokeWidth={1.3} />
      <line x1={50} y1={20} x2={50} y2={30} stroke={c} strokeWidth={1.3} />
      <path d={`M 46 20 L 50 20 L 50 15 L 54 15`} fill="none" stroke={c} strokeWidth={1.3} strokeLinecap="round" />
      {/* RO cartridge below sink */}
      <rect x={44} y={50} width={20} height={8} rx={1.5} fill={active ? `${c}33` : "rgba(255,255,255,0.04)"} stroke={c} strokeWidth={0.8} />
      {/* Stove */}
      <rect x={88} y={36} width={22} height={20} rx={1} fill="none" stroke={c} strokeWidth={1.3} />
      <circle cx={94} cy={44} r={1.8} fill="none" stroke={c} strokeWidth={0.8} />
      <circle cx={104} cy={44} r={1.8} fill="none" stroke={c} strokeWidth={0.8} />
      <circle cx={94} cy={52} r={1.8} fill="none" stroke={c} strokeWidth={0.8} />
      <circle cx={104} cy={52} r={1.8} fill="none" stroke={c} strokeWidth={0.8} />
    </g>
  );
}

function BathroomFixtures({ x, y, active }: { x: number; y: number; active: boolean }) {
  const c = active ? "#12BDFB" : "rgba(255,255,255,0.22)";
  return (
    <g transform={`translate(${x},${y})`} style={{ transition: "all 0.3s", pointerEvents: "none" }}>
      {/* Shower */}
      <rect x={0} y={0} width={32} height={58} rx={2} fill="none" stroke={c} strokeWidth={1.3} />
      <circle cx={16} cy={10} r={3} fill={active ? `${c}33` : "none"} stroke={c} strokeWidth={1} />
      {active && [14, 16, 18, 20, 22].map((cx, i) => (
        <line key={i} x1={cx} y1={13} x2={cx - 2} y2={18 + (i % 2) * 2} stroke={c} strokeWidth={0.6} strokeLinecap="round" opacity={0.7} />
      ))}
      {/* Toilet */}
      <g transform="translate(48, 26)">
        <rect x={0} y={0} width={14} height={10} rx={1} fill="none" stroke={c} strokeWidth={1.1} />
        <ellipse cx={7} cy={18} rx={9} ry={8} fill="none" stroke={c} strokeWidth={1.1} />
      </g>
      {/* Sink */}
      <g transform="translate(78, 18)">
        <rect x={0} y={6} width={28} height={14} rx={1} fill="none" stroke={c} strokeWidth={1.3} />
        <line x1={14} y1={0} x2={14} y2={6} stroke={c} strokeWidth={1.1} />
        <path d={`M 10 0 L 14 0 L 14 -4 L 18 -4`} fill="none" stroke={c} strokeWidth={1.1} strokeLinecap="round" />
        <rect x={3} y={22} width={22} height={14} rx={1} fill="none" stroke={c} strokeWidth={0.8} opacity={0.5} />
      </g>
      {/* Towel rack */}
      <line x1={116} y1={14} x2={128} y2={14} stroke={c} strokeWidth={1} />
      <rect x={116} y={17} width={12} height={20} rx={1} fill="none" stroke={c} strokeWidth={0.8} opacity={0.5} />
    </g>
  );
}

function BedroomFixtures({ x, y, active }: { x: number; y: number; active: boolean }) {
  const c = active ? "#a78bfa" : "rgba(255,255,255,0.22)";
  return (
    <g transform={`translate(${x},${y})`} style={{ transition: "all 0.3s", pointerEvents: "none" }}>
      {/* Bed */}
      <rect x={0} y={18} width={62} height={32} rx={3} fill={active ? `${c}18` : "none"} stroke={c} strokeWidth={1.3} />
      <rect x={4} y={10} width={20} height={14} rx={2} fill="none" stroke={c} strokeWidth={1} />
      <line x1={0} y1={50} x2={0} y2={58} stroke={c} strokeWidth={1.2} />
      <line x1={62} y1={50} x2={62} y2={58} stroke={c} strokeWidth={1.2} />
      {/* Nightstand + lamp */}
      <rect x={70} y={34} width={18} height={16} rx={1} fill="none" stroke={c} strokeWidth={1.1} />
      <line x1={79} y1={20} x2={79} y2={34} stroke={c} strokeWidth={0.8} />
      <path d={`M 74 14 L 84 14 L 82 20 L 76 20 Z`} fill={active ? `${c}22` : "none"} stroke={c} strokeWidth={0.8} />
      {/* Humidifier */}
      <g transform="translate(98, 34)">
        <rect x={0} y={0} width={14} height={18} rx={7} fill={active ? `${c}22` : "none"} stroke={c} strokeWidth={1.1} />
        {active && (
          <>
            <path d="M 7 -2 C 5 -6 9 -8 7 -12" fill="none" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.8}>
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M 10 -2 C 12 -6 8 -8 10 -13" fill="none" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.7}>
              <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.6s" repeatCount="indefinite" />
            </path>
          </>
        )}
      </g>
      {/* Window */}
      <rect x={120} y={8} width={24} height={38} rx={1} fill={active ? "rgba(167,139,250,0.06)" : "rgba(255,255,255,0.02)"} stroke={c} strokeWidth={1} />
      <line x1={132} y1={8} x2={132} y2={46} stroke={c} strokeWidth={0.6} opacity={0.6} />
      <line x1={120} y1={27} x2={144} y2={27} stroke={c} strokeWidth={0.6} opacity={0.6} />
    </g>
  );
}

function LivingFixtures({ x, y, active }: { x: number; y: number; active: boolean }) {
  const c = active ? "#12BDFB" : "rgba(255,255,255,0.22)";
  return (
    <g transform={`translate(${x},${y})`} style={{ transition: "all 0.3s", pointerEvents: "none" }}>
      {/* Couch */}
      <rect x={0} y={20} width={50} height={22} rx={3} fill={active ? `${c}14` : "none"} stroke={c} strokeWidth={1.3} />
      <rect x={4} y={16} width={14} height={10} rx={2} fill="none" stroke={c} strokeWidth={0.9} />
      <rect x={32} y={16} width={14} height={10} rx={2} fill="none" stroke={c} strokeWidth={0.9} />
      {/* Lamp */}
      <line x1={62} y1={20} x2={62} y2={44} stroke={c} strokeWidth={1.2} />
      <path d={`M 54 20 L 70 20 L 66 12 L 58 12 Z`} fill={active ? `${c}22` : "none"} stroke={c} strokeWidth={1.1} />
      {/* Washer */}
      <rect x={82} y={20} width={24} height={28} rx={2} fill="none" stroke={c} strokeWidth={1.3} />
      <circle cx={94} cy={34} r={7} fill={active ? `${c}22` : "none"} stroke={c} strokeWidth={1.1} />
      {active && <circle cx={94} cy={34} r={5} fill="none" stroke={c} strokeWidth={0.6} opacity={0.5}><animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" /></circle>}
      <rect x={84} y={22} width={4} height={3} fill={c} opacity={0.6} />
      <rect x={92} y={22} width={4} height={3} fill={c} opacity={0.6} />
      <rect x={100} y={22} width={4} height={3} fill={c} opacity={0.6} />
      {/* Dryer */}
      <rect x={112} y={20} width={24} height={28} rx={2} fill="none" stroke={c} strokeWidth={1.3} />
      <circle cx={124} cy={34} r={7} fill="none" stroke={c} strokeWidth={1.1} />
    </g>
  );
}

function TreatmentSystem({ x, y, active }: { x: number; y: number; active: boolean }) {
  const c = active ? "#f59e0b" : "rgba(245,158,11,0.6)";
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: "none" }}>
      {/* Softener tank */}
      <g>
        <rect x={0} y={4} width={30} height={50} rx={4} fill={active ? "rgba(245,158,11,0.16)" : "rgba(245,158,11,0.08)"} stroke={c} strokeWidth={1.4} />
        <rect x={2} y={0} width={26} height={6} rx={2} fill={c} opacity={0.8} />
        <rect x={4} y={12} width={22} height={3} rx={1} fill={c} opacity={0.5} />
        <text x={15} y={36} textAnchor="middle" fontSize="6.5" fontWeight="bold" fill={active ? "#ffffff" : "rgba(255,255,255,0.5)"} letterSpacing="0.3">SOFT</text>
      </g>
      {/* Filter canister */}
      <g transform="translate(38, 0)">
        <rect x={0} y={4} width={26} height={50} rx={4} fill={active ? "rgba(18,189,251,0.16)" : "rgba(18,189,251,0.06)"} stroke={active ? "#12BDFB" : "rgba(18,189,251,0.5)"} strokeWidth={1.4} />
        <rect x={2} y={0} width={22} height={6} rx={2} fill={active ? "#12BDFB" : "rgba(18,189,251,0.5)"} opacity={0.8} />
        <line x1={4} y1={18} x2={22} y2={18} stroke={active ? "#12BDFB" : "rgba(18,189,251,0.4)"} strokeWidth={0.6} />
        <line x1={4} y1={26} x2={22} y2={26} stroke={active ? "#12BDFB" : "rgba(18,189,251,0.4)"} strokeWidth={0.6} />
        <line x1={4} y1={34} x2={22} y2={34} stroke={active ? "#12BDFB" : "rgba(18,189,251,0.4)"} strokeWidth={0.6} />
        <line x1={4} y1={42} x2={22} y2={42} stroke={active ? "#12BDFB" : "rgba(18,189,251,0.4)"} strokeWidth={0.6} />
      </g>
      {/* UV chamber (tall slim) */}
      <g transform="translate(72, 0)">
        <rect x={0} y={4} width={14} height={50} rx={3} fill={active ? "rgba(167,139,250,0.18)" : "rgba(167,139,250,0.08)"} stroke={active ? "#a78bfa" : "rgba(167,139,250,0.5)"} strokeWidth={1.4} />
        <rect x={2} y={0} width={10} height={6} rx={2} fill={active ? "#a78bfa" : "rgba(167,139,250,0.5)"} opacity={0.8} />
        <circle cx={7} cy={28} r={3.2} fill={active ? "#a78bfa" : "rgba(167,139,250,0.4)"}>
          {active && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />}
        </circle>
      </g>
      {/* Brine tank */}
      <g transform="translate(94, 16)">
        <rect x={0} y={4} width={20} height={38} rx={3} fill={active ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.04)"} stroke={c} strokeWidth={1.2} />
        <rect x={2} y={0} width={16} height={6} rx={2} fill={c} opacity={0.6} />
        <path d={`M 3 32 Q 10 30 17 32 L 17 40 L 3 40 Z`} fill={c} opacity={0.3} />
      </g>
      {/* Label */}
      <text x={57} y={68} textAnchor="middle" fontSize="6" fontWeight="bold" letterSpacing="1.6" fill={active ? "#f59e0b" : "rgba(255,255,255,0.4)"}>
        TREATMENT MANIFOLD
      </text>
    </g>
  );
}

export default function HouseDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeZone, setActiveZone] = useState<ZoneId>("basement");
  const [hoverZone, setHoverZone] = useState<ZoneId | null>(null);
  const current = zones.find(z => z.id === activeZone)!;

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: "#07111A" }}>
      {/* Section background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(18,189,251,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            System Placement
          </p>
          <h2
            className="font-display font-bold leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", letterSpacing: "-0.035em" }}
          >
            Every room.<br />Every tap.<br /><span style={{ color: "#12BDFB" }}>One system.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "48ch", margin: "1.25rem auto 0" }}>
            Click a room and watch the water route. From the main supply through the treatment manifold to every fixture on every floor.
          </p>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {[
            { icon: Home, label: "100% whole-home coverage" },
            { icon: Droplets, label: "Every tap, every fixture" },
            { icon: Wrench, label: "One install, 2 to 4 hours" },
            { icon: ShieldCheck, label: "Lifetime warranty" },
          ].map((chip) => (
            <div key={chip.label} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(18,189,251,0.06)", border: "1px solid rgba(18,189,251,0.15)", color: "rgba(255,255,255,0.7)" }}>
              <chip.icon className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              {chip.label}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">

          {/* LEFT — Illustrated house */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl p-4 md:p-6"
            style={{
              background: "linear-gradient(180deg, rgba(18,189,251,0.03) 0%, rgba(7,17,26,0.6) 50%, rgba(245,158,11,0.03) 100%)",
              border: "1px solid rgba(18,189,251,0.1)",
            }}
          >
            {/* Tour-guide otter standing by the house */}
            <Otter
              pose="pointing"
              width={100}
              flip
              shadow="soft"
              className="hidden xl:block absolute z-20"
              style={{ top: "4%", right: "-12px", opacity: 0.95 }}
              alt="Otter pointing at the house diagram"
            />
            <svg
              viewBox="0 0 660 560"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block" }}
              aria-label="Illustrated house cross-section showing water system coverage"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f2540" />
                  <stop offset="60%" stopColor="#0a1b2e" />
                  <stop offset="100%" stopColor="#07111A" />
                </linearGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3d2a14" />
                  <stop offset="100%" stopColor="#1f1508" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c64a2b" />
                  <stop offset="100%" stopColor="#8a2e1a" />
                </linearGradient>
                <linearGradient id="sidingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2b5e7a" />
                  <stop offset="100%" stopColor="#1b3e54" />
                </linearGradient>
                <linearGradient id="brickGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a13b22" />
                  <stop offset="100%" stopColor="#6a2614" />
                </linearGradient>
                <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3fa862" />
                  <stop offset="100%" stopColor="#1f6a3a" />
                </linearGradient>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,240,200,0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Sky */}
              <rect x={0} y={0} width={660} height={490} fill="url(#skyGrad)" />

              {/* Moon + glow */}
              <g style={{ pointerEvents: "none" }}>
                <circle cx={570} cy={80} r={50} fill="url(#moonGlow)" />
                <circle cx={570} cy={80} r={14} fill="rgba(255,248,220,0.92)" />
                <circle cx={567} cy={77} r={3} fill="rgba(200,180,140,0.5)" />
                <circle cx={573} cy={82} r={2} fill="rgba(200,180,140,0.5)" />
              </g>

              {/* Stars */}
              <g style={{ pointerEvents: "none" }}>
                {[
                  [80, 40], [130, 70], [190, 30], [440, 55], [490, 25], [620, 130], [50, 110], [260, 50],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={0.9} fill="rgba(255,255,255,0.7)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                ))}
              </g>

              {/* Tree (left, outside house) */}
              <g style={{ pointerEvents: "none" }}>
                <rect x={26} y={390} width={7} height={100} fill="#5c3a1a" />
                <rect x={26} y={390} width={7} height={100} fill="url(#brickGrad)" opacity={0.15} />
                <circle cx={29} cy={378} r={30} fill="url(#treeGrad)" opacity={0.9} />
                <circle cx={12} cy={358} r={19} fill="url(#treeGrad)" opacity={0.85} />
                <circle cx={46} cy={356} r={21} fill="url(#treeGrad)" opacity={0.85} />
                <circle cx={29} cy={350} r={14} fill="#5aba7a" opacity={0.6} />
              </g>

              {/* Bushes next to house (left side) */}
              <g style={{ pointerEvents: "none" }}>
                <ellipse cx={54} cy={488} rx={10} ry={8} fill="#2a7a48" />
                <ellipse cx={54} cy={484} rx={8} ry={6} fill="#3fa862" opacity={0.7} />
              </g>
              {/* Bushes right side */}
              <g style={{ pointerEvents: "none" }}>
                <ellipse cx={606} cy={488} rx={14} ry={9} fill="#2a7a48" />
                <ellipse cx={604} cy={484} rx={10} ry={6} fill="#3fa862" opacity={0.7} />
                <ellipse cx={614} cy={486} rx={7} ry={5} fill="#5aba7a" opacity={0.6} />
              </g>

              {/* ROOF — warm terracotta tile */}
              <polygon
                points="60,180 330,70 600,180"
                fill="url(#roofGrad)"
                stroke="#5c1e0d"
                strokeWidth={1.8}
                strokeLinejoin="round"
              />
              {/* Shingle lines on roof */}
              <g style={{ pointerEvents: "none" }}>
                {[92, 108, 124, 140, 156, 172].map((ry, i) => {
                  // interpolate x-range for each horizontal line on the triangle
                  const t = (ry - 70) / (180 - 70);
                  const x1 = 330 - (330 - 60) * t;
                  const x2 = 330 + (600 - 330) * t;
                  return (
                    <line key={i} x1={x1 + 4} y1={ry} x2={x2 - 4} y2={ry} stroke="#5c1e0d" strokeWidth={0.6} opacity={0.4} />
                  );
                })}
                {/* Subtle vertical shingle dividers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const x = 80 + i * 45;
                  return <line key={`v${i}`} x1={x} y1={170} x2={x} y2={178} stroke="#5c1e0d" strokeWidth={0.5} opacity={0.3} />;
                })}
              </g>
              {/* Roof ridge highlight */}
              <line x1={60} y1={180} x2={600} y2={180} stroke="#d95a36" strokeWidth={1.4} opacity={0.6} />

              {/* Chimney — brick red */}
              <rect x={440} y={100} width={26} height={50} fill="url(#brickGrad)" stroke="#5c1e0d" strokeWidth={1.2} />
              {/* Brick mortar lines */}
              <g style={{ pointerEvents: "none" }}>
                <line x1={440} y1={114} x2={466} y2={114} stroke="#5c1e0d" strokeWidth={0.5} opacity={0.6} />
                <line x1={440} y1={128} x2={466} y2={128} stroke="#5c1e0d" strokeWidth={0.5} opacity={0.6} />
                <line x1={440} y1={142} x2={466} y2={142} stroke="#5c1e0d" strokeWidth={0.5} opacity={0.6} />
                <line x1={453} y1={100} x2={453} y2={114} stroke="#5c1e0d" strokeWidth={0.4} opacity={0.5} />
                <line x1={446} y1={114} x2={446} y2={128} stroke="#5c1e0d" strokeWidth={0.4} opacity={0.5} />
                <line x1={460} y1={114} x2={460} y2={128} stroke="#5c1e0d" strokeWidth={0.4} opacity={0.5} />
                <line x1={453} y1={128} x2={453} y2={142} stroke="#5c1e0d" strokeWidth={0.4} opacity={0.5} />
              </g>
              {/* Chimney cap */}
              <rect x={436} y={96} width={34} height={8} fill="#3a1608" stroke="#5c1e0d" strokeWidth={1.2} />
              {/* Smoke puff (decorative) */}
              <g style={{ pointerEvents: "none" }} opacity={0.4}>
                <circle cx={460} cy={86} r={4} fill="rgba(200,200,210,0.5)">
                  <animate attributeName="cy" values="86;70;86" dur="6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx={466} cy={78} r={3} fill="rgba(200,200,210,0.4)">
                  <animate attributeName="cy" values="78;62;78" dur="6s" repeatCount="indefinite" begin="1.5s" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="6s" repeatCount="indefinite" begin="1.5s" />
                </circle>
              </g>
              <text x={330} y={142} textAnchor="middle" fontSize="8" fontWeight="bold" letterSpacing="3" fill="rgba(255,240,220,0.85)" style={{ pointerEvents: "none" }}>ROOF</text>

              {/* HOUSE OUTER FRAME — warm siding */}
              <rect x={60} y={180} width={540} height={310} fill="url(#sidingGrad)" stroke="#0f3348" strokeWidth={2} />

              {/* Exterior siding horizontal lines */}
              <g style={{ pointerEvents: "none" }}>
                {[192, 204, 216, 228, 252, 264, 276, 288, 312, 324, 336, 348, 372, 384, 396, 408].map((ly, i) => (
                  <line key={i} x1={60} y1={ly} x2={600} y2={ly} stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />
                ))}
              </g>

              {/* Foundation stripe at base */}
              <rect x={60} y={480} width={540} height={10} fill="#1a2a38" stroke="#0f3348" strokeWidth={1} />
              <g style={{ pointerEvents: "none" }}>
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={i} x1={60 + i * 54} y1={480} x2={60 + i * 54} y2={490} stroke="#0f3348" strokeWidth={0.6} opacity={0.6} />
                ))}
              </g>

              {/* Floor separators (brighter — actual floorboards) */}
              <rect x={60} y={298} width={540} height={4} fill="#3d2a14" opacity={0.8} />
              <rect x={60} y={418} width={540} height={4} fill="#3d2a14" opacity={0.8} />

              {/* Room divider upper floors */}
              <line x1={330} y1={180} x2={330} y2={420} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

              {/* Floor labels (left margin) */}
              <text x={68} y={198} fontSize="7" fontWeight="bold" letterSpacing="1.8" fill="rgba(255,255,255,0.55)" style={{ pointerEvents: "none" }}>UPPER FLOOR</text>
              <text x={68} y={318} fontSize="7" fontWeight="bold" letterSpacing="1.8" fill="rgba(255,255,255,0.55)" style={{ pointerEvents: "none" }}>MAIN FLOOR</text>
              <text x={68} y={438} fontSize="7" fontWeight="bold" letterSpacing="1.8" fill="rgba(255,200,120,0.8)" style={{ pointerEvents: "none" }}>BASEMENT</text>

              {/* Clickable room zones */}
              {zones.filter(z => z.id !== "basement").map((zone) => {
                const c = ROOMS[zone.id];
                const isActive = activeZone === zone.id;
                const isHover = hoverZone === zone.id;
                return (
                  <g
                    key={zone.id}
                    onClick={() => setActiveZone(zone.id)}
                    onMouseEnter={() => setHoverZone(zone.id)}
                    onMouseLeave={() => setHoverZone(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={c.x} y={c.y} width={c.w} height={c.h}
                      fill={isActive ? `${zone.color}14` : isHover ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)"}
                      stroke={isActive ? zone.color : isHover ? "rgba(255,255,255,0.15)" : "transparent"}
                      strokeWidth={isActive ? 1.6 : 1}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    {/* Room label (top of room) */}
                    <text
                      x={c.x + c.w / 2} y={c.y + 16}
                      textAnchor="middle" fontSize="8.5" fontWeight="bold" letterSpacing="1.5"
                      fill={isActive ? zone.color : "rgba(255,255,255,0.3)"}
                      style={{ transition: "fill 0.3s ease", pointerEvents: "none", userSelect: "none" }}
                    >
                      {zone.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Basement (clickable) */}
              <g
                onClick={() => setActiveZone("basement")}
                onMouseEnter={() => setHoverZone("basement")}
                onMouseLeave={() => setHoverZone(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={ROOMS.basement.x} y={ROOMS.basement.y} width={ROOMS.basement.w} height={ROOMS.basement.h}
                  fill={activeZone === "basement" ? "rgba(245,158,11,0.1)" : hoverZone === "basement" ? "rgba(245,158,11,0.04)" : "rgba(245,158,11,0.025)"}
                  stroke={activeZone === "basement" ? "#f59e0b" : "rgba(245,158,11,0.2)"}
                  strokeWidth={activeZone === "basement" ? 1.6 : 1}
                  style={{ transition: "all 0.3s ease" }}
                />
              </g>

              {/* Fixtures in each room */}
              <BathroomFixtures x={120} y={210} active={activeZone === "bathrooms"} />
              <BedroomFixtures x={370} y={215} active={activeZone === "bedrooms"} />
              <KitchenFixtures x={115} y={335} active={activeZone === "kitchen"} />
              <LivingFixtures x={365} y={330} active={activeZone === "living"} />
              <TreatmentSystem x={275} y={438} active={activeZone === "basement"} />

              {/* WATER SUPPLY — underground main entering house */}
              <path
                d="M 0 540 L 250 540 L 250 490 L 330 490 L 330 455"
                fill="none"
                stroke="rgba(18,189,251,0.35)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={40} y={534} fontSize="7" fontWeight="bold" letterSpacing="1.4" fill="rgba(18,189,251,0.75)" style={{ pointerEvents: "none" }}>
                MAIN SUPPLY IN
              </text>
              {/* Animated inflow drops */}
              {[0, 0.5, 1, 1.5].map((delay, i) => (
                <circle key={i} r={3} fill="#12BDFB" style={{ filter: "drop-shadow(0 0 5px #12BDFB)" }}>
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${delay}s`}>
                    <mpath href="#supplyPath" />
                  </animateMotion>
                </circle>
              ))}
              <path id="supplyPath" d="M 0 540 L 250 540 L 250 490 L 330 490 L 330 455" fill="none" stroke="none" />

              {/* GROUND */}
              <rect x={0} y={490} width={660} height={70} fill="url(#groundGrad)" />
              {/* Grass surface strip */}
              <rect x={0} y={490} width={660} height={4} fill="#2a7a48" opacity={0.6} />
              {/* Grass tufts on ground surface */}
              <g style={{ pointerEvents: "none" }}>
                {[10, 50, 90, 140, 200, 235, 265, 340, 375, 410, 455, 510, 545, 600, 640].map((gx, i) => (
                  <path key={i} d={`M ${gx} 490 L ${gx - 2} 484 M ${gx} 490 L ${gx + 2} 483 M ${gx} 490 L ${gx} 482`} stroke="#3fa862" strokeWidth={1} strokeLinecap="round" />
                ))}
              </g>

              {/* INTERNAL PIPES — from manifold to each room */}
              {zones.filter(z => z.id !== "basement").map((zone) => {
                const isLit = activeZone === zone.id;
                const pathId = `pipe-${zone.id}`;
                return (
                  <g key={zone.id}>
                    <path
                      id={pathId}
                      d={zone.pipePath}
                      fill="none"
                      stroke={isLit ? zone.color : "rgba(255,255,255,0.1)"}
                      strokeWidth={isLit ? 2.4 : 1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "all 0.35s ease" }}
                    />
                    {isLit && [0, 0.7, 1.4].map((delay, i) => (
                      <circle key={i} r={3.5} fill={zone.color} style={{ filter: `drop-shadow(0 0 6px ${zone.color})` }}>
                        <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay}s`}>
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    ))}
                  </g>
                );
              })}

              {/* Pipe endpoint droplet indicators (where pipe delivers to fixture) */}
              {[
                { id: "kitchen",   x: 200, y: 360, color: "#22c55e" },
                { id: "living",    x: 460, y: 360, color: "#12BDFB" },
                { id: "bathrooms", x: 200, y: 240, color: "#12BDFB" },
                { id: "bedrooms",  x: 460, y: 240, color: "#a78bfa" },
              ].map((end) => {
                const isLit = activeZone === end.id;
                return (
                  <g key={end.id}>
                    <circle cx={end.x} cy={end.y} r={isLit ? 4.5 : 3} fill={isLit ? end.color : "rgba(255,255,255,0.15)"} style={{ transition: "all 0.3s" }}>
                      {isLit && <animate attributeName="r" values="3;6;3" dur="1.4s" repeatCount="indefinite" />}
                    </circle>
                    {isLit && (
                      <circle cx={end.x} cy={end.y} r={10} fill="none" stroke={end.color} strokeWidth={1}>
                        <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hint row below SVG */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
                Water flowing to: <span className="font-semibold" style={{ color: current.color }}>{current.label}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)" }}>Click any room</p>
            </div>
          </motion.div>

          {/* RIGHT — Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:pt-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: "#0C1F2E",
                  border: `1px solid ${current.color}35`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 40px ${current.color}12`,
                }}
              >
                {/* Top accent bar */}
                <div style={{ height: 4, backgroundColor: current.color }} />

                {/* Hero image */}
                <div className="relative overflow-hidden" style={{ height: "clamp(180px, 26vw, 260px)" }}>
                  <Image
                    key={current.image}
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    style={{ animation: "diagram-img-in 0.5s ease-out" }}
                  />
                  <style>{`
                    @keyframes diagram-img-in {
                      from { transform: scale(1.06); opacity: 0.4; }
                      to { transform: scale(1); opacity: 1; }
                    }
                  `}</style>
                  {/* Gradient overlay for caption legibility */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(12,31,46,0.95) 0%, rgba(12,31,46,0.2) 55%, transparent 100%)" }}
                  />
                  {/* Caption */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.92)", maxWidth: "28ch" }}>
                      {current.imageCaption}
                    </p>
                    <div
                      className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{ backgroundColor: `${current.color}28`, border: `1px solid ${current.color}60` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: current.color }}>
                        Live
                      </span>
                    </div>
                  </div>
                  {/* Subtle corner badge */}
                  <div
                    className="absolute top-4 left-5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(12,31,46,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {current.label}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {current.floor}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full" style={{ backgroundColor: `${current.color}18`, color: current.color }}>
                      {current.system}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold leading-tight mb-4"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#ffffff", letterSpacing: "-0.02em" }}
                  >
                    {current.label}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "46ch" }}>
                    {current.desc}
                  </p>

                  {/* Benefits list */}
                  <div className="space-y-3 mb-7 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.32)" }}>
                      What you get
                    </p>
                    {current.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${current.color}20` }}>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={current.color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200"
                    style={{ backgroundColor: current.color, color: "#0C1F2E" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    Get a free water test <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Zone selector pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z.id)}
                  className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: activeZone === z.id ? `${z.color}24` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeZone === z.id ? z.color + "70" : "rgba(255,255,255,0.08)"}`,
                    color: activeZone === z.id ? z.color : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                  }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: z.color, opacity: activeZone === z.id ? 1 : 0.4 }} />
                  {z.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
