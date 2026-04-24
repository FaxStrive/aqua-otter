"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle, Phone } from "lucide-react";

const states = [
  {
    name: "Indiana",
    flag: "🇺🇸",
    desc: "Our home state and primary service area. We cover the greater Indianapolis metro, the northern corridor to South Bend, and southeastern Indiana down to Columbus.",
    cities: [
      "Indianapolis", "Fishers", "Carmel", "Noblesville", "Westfield",
      "Zionsville", "Brownsburg", "Avon", "Greenwood", "Greenfield",
      "Franklin", "Columbus", "Bloomington", "Anderson", "Muncie",
      "Kokomo", "Lafayette", "South Bend", "Elkhart", "Goshen",
      "Fort Wayne", "Terre Haute", "Richmond", "Vincennes",
    ],
    highlight: "Indianapolis Metro",
  },
  {
    name: "Michigan",
    flag: "🇺🇸",
    desc: "We cover West Michigan including the Grand Rapids corridor, the Detroit metro area, Kalamazoo, Lansing, and surrounding communities.",
    cities: [
      "Grand Rapids", "Wyoming", "Walker", "Grandville", "Jenison",
      "Holland", "Zeeland", "Kalamazoo", "Portage", "Battle Creek",
      "Lansing", "East Lansing", "Detroit", "Ann Arbor", "Ypsilanti",
      "Dearborn", "Troy", "Sterling Heights", "Warren", "Livonia",
      "Flint", "Saginaw", "Bay City", "Midland",
    ],
    highlight: "Grand Rapids + Detroit Metro",
  },
  {
    name: "Ohio",
    flag: "🇺🇸",
    desc: "We serve western and central Ohio including the Columbus metro, Dayton, Toledo, and communities along the Indiana border.",
    cities: [
      "Columbus", "Dublin", "Westerville", "Grove City", "Hilliard",
      "Dayton", "Kettering", "Beavercreek", "Fairborn", "Xenia",
      "Toledo", "Findlay", "Lima", "Defiance", "Bowling Green",
      "Cincinnati", "Hamilton", "Middletown", "Oxford",
    ],
    highlight: "Columbus + Dayton Metro",
  },
  {
    name: "Kentucky",
    flag: "🇺🇸",
    desc: "Northern and central Kentucky including Louisville and Lexington metros and communities along the Indiana border.",
    cities: [
      "Louisville", "Lexington", "Bowling Green", "Owensboro",
      "Covington", "Georgetown", "Florence", "Elizabethtown",
      "Frankfort", "Henderson", "Richmond", "Jeffersontown",
    ],
    highlight: "Louisville + Lexington",
  },
  {
    name: "Tennessee",
    flag: "🇺🇸",
    desc: "Middle and western Tennessee including Nashville, Clarksville, and communities throughout the state.",
    cities: [
      "Nashville", "Memphis", "Clarksville", "Murfreesboro",
      "Franklin", "Jackson", "Johnson City", "Kingsport",
      "Chattanooga", "Knoxville", "Cookeville", "Columbia",
    ],
    highlight: "Nashville Metro",
  },
  {
    name: "North Carolina",
    flag: "🇺🇸",
    desc: "Western North Carolina including Charlotte, Raleigh-Durham, and the Piedmont Triad region.",
    cities: [
      "Charlotte", "Raleigh", "Durham", "Greensboro", "Winston-Salem",
      "Fayetteville", "Cary", "High Point", "Concord", "Gastonia",
      "Chapel Hill", "Burlington", "Mooresville", "Huntersville",
    ],
    highlight: "Charlotte + Raleigh",
  },
];

const reasons = [
  "We come to you — in-home water testing at no charge",
  "Same-week installation available in all service areas",
  "Local technicians, not subcontractors",
  "Emergency service for existing customers",
  "Lifetime warranty honored across all states",
];

export default function ServiceAreasPage() {
  const statesRef = useRef<HTMLDivElement>(null);
  const statesInView = useInView(statesRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(18,189,251,0.08)", minHeight: "50vh", paddingTop: "clamp(120px, 14vh, 160px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 60% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>6 States, 150+ Cities</span>
              </div>
              <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
                We come<br />
                <span style={{ color: "#12BDFB" }}>to you.</span>
              </h1>
              <p className="leading-relaxed mb-8" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", color: "rgba(12,31,46,0.5)", maxWidth: "40ch" }}>
                Aqua Otter serves homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina. If you&apos;re not sure whether we cover your area, just call or text.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
                  Get Free Water Test <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+13179835919" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border text-sm font-medium transition-all duration-200" style={{ borderColor: "rgba(12,31,46,0.15)", color: "rgba(12,31,46,0.55)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)"; e.currentTarget.style.color = "#12BDFB"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(12,31,46,0.15)"; e.currentTarget.style.color = "rgba(12,31,46,0.55)"; }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                  (317) 983-5919
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="hidden lg:block">
              <div className="rounded-3xl p-8 border" style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.15)" }}>
                <h3 className="font-display font-bold mb-5" style={{ fontSize: "1.1rem", color: "#0C1F2E" }}>What to expect when you call</h3>
                <ul className="space-y-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#12BDFB" }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* States */}
      <section ref={statesRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={statesInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>Coverage by state</h2>
            <p style={{ color: "rgba(12,31,46,0.5)", maxWidth: "44ch" }}>Not sure if we cover your city? Call or text us at (317) 983-5919 — we&apos;ll tell you within 30 seconds.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {states.map((state, i) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 20 }}
                animate={statesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-3xl p-8 border"
                style={{ borderColor: "rgba(18,189,251,0.1)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold" style={{ fontSize: "1.35rem", color: "#0C1F2E" }}>{state.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(18,189,251,0.08)", color: "#12BDFB" }}>{state.highlight}</span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>{state.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {state.cities.map((city) => (
                    <span key={city} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#F0F8FF", color: "rgba(12,31,46,0.55)", border: "1px solid rgba(18,189,251,0.12)" }}>
                      {city}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#ffffff" }}>Don&apos;t see your city?</h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "38ch", margin: "0 auto 2rem" }}>
            We expand our service area regularly. Call or text and we&apos;ll let you know if we can make it work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
              Request Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+13179835919" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}>
              <Phone className="w-4 h-4" style={{ color: "#12BDFB" }} />
              (317) 983-5919
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
