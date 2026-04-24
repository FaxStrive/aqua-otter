"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, BookOpen } from "lucide-react";

type GlossaryTerm = {
  term: string;
  category: "Measurement" | "Contaminant" | "Technology" | "Regulation" | "Science";
  definition: string;
  related?: string[];
};

const TERMS: GlossaryTerm[] = [
  // Measurement
  { term: "GPG", category: "Measurement", definition: "Grains per gallon. The standard US measurement unit for water hardness. 1 GPG = 17.1 milligrams per liter (mg/L). Water under 7 GPG is considered moderately soft; over 17 GPG is considered very hard. Indiana tap water commonly runs 15-22 GPG.", related: ["Hardness", "TDS", "ppm"] },
  { term: "ppm", category: "Measurement", definition: "Parts per million. A concentration unit used in water testing equal to mg/L (milligrams per liter) for water. Used to measure hardness minerals, nitrate, iron, and other dissolved substances. 1 ppm = 1 mg per 1,000 grams of water.", related: ["GPG", "ppb", "TDS"] },
  { term: "ppb", category: "Measurement", definition: "Parts per billion. Used for trace-level contaminants like lead, PFAS, and chromium-6 where ppm would not be precise enough. 1 ppb = 1 microgram per liter (μg/L). EPA limits for heavy metals and PFAS are typically set in ppb.", related: ["ppm", "MCL"] },
  { term: "ppt", category: "Measurement", definition: "Parts per trillion. The unit used for the most trace-level contaminants, including PFAS (EPA MCL for PFOA and PFOS is 4 ppt). 1 ppt = 1 nanogram per liter (ng/L).", related: ["ppb", "PFAS"] },
  { term: "TDS", category: "Measurement", definition: "Total dissolved solids. A measurement of everything dissolved in water — minerals, salts, metals, and organic compounds. High TDS does not always indicate dangerous water (mineral springs have very high TDS), but very low TDS (below 50 ppm) can indicate aggressive, corrosive water. Reverse osmosis reduces TDS dramatically.", related: ["GPG", "ppm"] },
  { term: "pH", category: "Measurement", definition: "A logarithmic scale from 0-14 measuring how acidic or basic water is. 7.0 is neutral; below 7 is acidic, above 7 is basic (alkaline). EPA recommends drinking water pH of 6.5-8.5. Acidic water (below 6.5) can leach lead and copper from plumbing. Most Indiana municipal water runs 7.0-7.8.", related: ["Corrosivity", "Lead"] },
  { term: "Turbidity", category: "Measurement", definition: "A measure of water cloudiness caused by suspended particles. Measured in NTU (nephelometric turbidity units). The EPA maximum for tap water is 1 NTU (treated systems). High turbidity can interfere with disinfection effectiveness and may indicate sediment or biological contamination.", related: ["Sediment"] },

  // Contaminants
  { term: "Chromium-6", category: "Contaminant", definition: "Hexavalent chromium. A naturally-occurring and industrial heavy metal contaminant found in water supplies across the Midwest. Detected in CCR reports in Hamilton, Marion, and Allen counties in Indiana. The EPA regulates total chromium at 100 ppb but has no separate limit for Chromium-6; California's public health goal is 0.02 ppb. Reverse osmosis is the most effective point-of-use removal technology.", related: ["MCL", "RO", "CCR"] },
  { term: "PFAS", category: "Contaminant", definition: "Per- and polyfluoroalkyl substances. A class of over 12,000 synthetic 'forever chemicals' used in non-stick cookware, firefighting foam (AFFF), and industrial processes. They do not break down in the environment or the human body. Documented in Michigan water supplies including the Huron River (Ann Arbor). The EPA set MCLs of 4 ppt for PFOA and PFOS in 2024. Activated carbon and reverse osmosis are the primary treatment technologies.", related: ["MCL", "GAC", "RO"] },
  { term: "TTHMs", category: "Contaminant", definition: "Total trihalomethanes. A group of four compounds (chloroform, bromodichloromethane, dibromochloromethane, bromoform) formed when chlorine reacts with organic matter in water. A disinfection byproduct regulated at 80 ppb by the EPA. Levels spike in summer. Activated carbon effectively removes TTHMs.", related: ["HAA5", "Disinfection byproducts", "GAC"] },
  { term: "HAA5", category: "Contaminant", definition: "Haloacetic acids. A group of five acid compounds (mono-, di-, and trichloroacetic acid; mono- and dibromoacetic acid) formed by chlorine reacting with organic matter. Unlike TTHMs, HAAs are not volatile. Regulated at 60 ppb by the EPA. Activated carbon is effective for removal.", related: ["TTHMs", "Disinfection byproducts"] },
  { term: "Nitrate", category: "Contaminant", definition: "A nitrogen compound (NO3-) that enters water from agricultural fertilizer runoff, septic system leaching, and natural mineral dissolution. The EPA MCL is 10 mg/L as nitrogen. Of particular concern for infants (causes 'blue baby syndrome' / methemoglobinemia). Indiana's agricultural counties (Bartholomew, Putnam) commonly show nitrate detections. Reverse osmosis and ion exchange are effective removal methods.", related: ["MCL", "RO", "Well water"] },
  { term: "Lead", category: "Contaminant", definition: "A heavy metal that enters drinking water primarily through corrosion of lead service lines and lead solder in older plumbing (pre-1986). The EPA action level is 15 ppb (meaning utilities must take action if more than 10% of samples exceed this). There is no safe level of lead exposure for children. Reverse osmosis achieves near-complete lead removal at the point of use.", related: ["Action level", "RO", "pH"] },
  { term: "Iron", category: "Contaminant", definition: "Dissolved iron in water occurs in two forms: ferrous (dissolved, clear) and ferric (oxidized, rust-colored particles). The EPA secondary standard is 0.3 mg/L. Iron causes orange/rust staining on fixtures, laundry, and tile, and a metallic taste. AiO systems oxidize and filter both forms. Softeners handle low ferrous iron incidentally.", related: ["AiO", "Ferrous iron", "Ferric iron", "Manganese"] },
  { term: "Manganese", category: "Contaminant", definition: "A naturally-occurring metal often found alongside iron in well water. Causes black or gray staining (iron causes orange). The EPA secondary standard is 0.05 mg/L. Manganese oxidizes at a higher pH than iron, so treatment must be designed for both if both are present. AiO systems and greensand filters handle manganese effectively.", related: ["Iron", "AiO"] },
  { term: "Hydrogen sulfide", category: "Contaminant", definition: "The compound responsible for the 'rotten egg' smell in well water. Naturally occurring from sulfur-reducing bacteria and geological sulfur deposits. While low concentrations are not a primary health concern, the odor makes water unpleasant. AiO air-injection systems are specifically effective at oxidizing and removing H2S.", related: ["AiO", "Well water", "Iron"] },
  { term: "Hardness", category: "Contaminant", definition: "The combined concentration of calcium (Ca2+) and magnesium (Mg2+) ions in water. Not a health contaminant — these are essential minerals — but causes scale buildup on pipes and appliances, soap scum, spotting on glass, and reduced appliance efficiency at high levels. Measured in GPG. Indiana tap water commonly exceeds 15 GPG. Ion exchange softeners remove hardness minerals.", related: ["GPG", "Ion exchange", "Scale"] },

  // Technology
  { term: "Ion exchange", category: "Technology", definition: "The mechanism behind salt-based water softeners. A resin bed loaded with sodium ions exchanges them for calcium and magnesium ions as water passes through. The resin is periodically recharged with brine (salt solution) to restore its sodium content. Ion exchange is specific to charged mineral ions and does not remove organic contaminants, heavy metals, or nitrate.", related: ["Water softener", "Regeneration", "Resin"] },
  { term: "Reverse osmosis", category: "Technology", definition: "A filtration process that pushes water through a semi-permeable membrane under pressure. The membrane's pores are small enough to reject dissolved salts, heavy metals, nitrate, PFAS, Chromium-6, and most other dissolved contaminants. A standard RO system produces 99%+ TDS reduction. Requires a drain line and a storage tank. Most effective as a point-of-use system under the kitchen sink.", related: ["RO", "Point-of-use", "TDS", "Membrane"] },
  { term: "GAC", category: "Technology", definition: "Granular activated carbon. A porous carbon media used in whole-home and point-of-use filtration systems. Contaminants adsorb (bind) to the carbon surface as water flows through. Highly effective for chlorine, chloramines, TTHMs, HAAs, PFAS (long-chain), and VOCs. Not effective for heavy metals, nitrate, or dissolved minerals. Media must be replaced periodically as adsorption capacity is exhausted.", related: ["Activated carbon", "Catalytic carbon", "TTHMs", "PFAS"] },
  { term: "Catalytic carbon", category: "Technology", definition: "A modified form of activated carbon engineered for enhanced reactivity. Unlike standard GAC, catalytic carbon can chemically transform chloramines and hydrogen sulfide rather than just adsorbing them. Essential when the water supply uses chloramines rather than free chlorine for secondary disinfection.", related: ["GAC", "Chloramines"] },
  { term: "AiO", category: "Technology", definition: "All-in-one. An Aqua Otter iron and manganese removal system that uses an air-injection mechanism to oxidize dissolved ferrous iron and manganese into filterable solid particles, then captures them in a media bed. The air pocket is replenished automatically during backwash cycles. No chemical injection required. Handles iron, manganese, and hydrogen sulfide in a single vessel.", related: ["Iron", "Manganese", "Hydrogen sulfide", "Backwash"] },
  { term: "TAC", category: "Technology", definition: "Template-assisted crystallization. A no-salt water conditioning technology that converts dissolved calcium and magnesium ions into microscopic calcite crystals that don't adhere to pipes or fixtures. The minerals remain in the water but can't form hard scale. Effective for scale prevention at hardness levels up to approximately 25 GPG. Does not produce soft water — TDS remains unchanged.", related: ["No-salt", "Softener vs conditioner", "Hardness"] },
  { term: "UV purification", category: "Technology", definition: "Ultraviolet light treatment that inactivates bacteria, viruses, and protozoa by damaging their DNA. UV is a physical disinfection process — it doesn't add chemicals or remove contaminants. It's used as a final-stage disinfection for well water systems and as a safeguard in whole-home systems. UV is not effective against chemical contaminants, heavy metals, or dissolved minerals.", related: ["Well water", "Bacteria", "Disinfection"] },
  { term: "Backwash", category: "Technology", definition: "A regeneration process where water flows backwards through a filter media bed to dislodge captured particles, iron, and other debris and flush them to drain. AiO systems, water softeners (during brine rinse), and whole-home carbon filters all use backwash cycles. Typically programmed to occur overnight at low water use times.", related: ["Regeneration", "AiO", "GAC"] },
  { term: "Regeneration", category: "Technology", definition: "The process of restoring a water softener's ion exchange resin capacity. The control valve draws a concentrated brine solution from the salt tank through the resin, displacing accumulated calcium and magnesium and replacing them with sodium. Modern softeners use demand-initiated regeneration (DIR), which triggers based on actual water usage rather than a fixed timer schedule.", related: ["Ion exchange", "Brine", "Demand-initiated regeneration"] },
  { term: "Demand-initiated regeneration", category: "Technology", definition: "A softener control mode that tracks water volume used and triggers regeneration only when the resin is approaching exhaustion. More salt-efficient than timer-based regeneration. Recommended for all modern softener installations.", related: ["Regeneration", "Ion exchange"] },
  { term: "Point-of-entry", category: "Technology", definition: "A water treatment system installed on the main water supply line entering a home, before it branches to individual fixtures. Also called POE or whole-home filtration. Every tap, shower, and appliance receives treated water. Recommended for contaminants like chlorine, TTHMs, and PFAS where skin absorption during showering is a concern.", related: ["Point-of-use", "GAC", "AiO"] },
  { term: "Point-of-use", category: "Technology", definition: "A water treatment system installed at a single outlet, typically the kitchen sink. Examples: reverse osmosis systems, countertop filters, pitcher filters. Treats drinking and cooking water but not shower or bath water. Most cost-effective approach for contaminants that are only a drinking concern (nitrate, lead, Chromium-6).", related: ["Point-of-entry", "RO"] },
  { term: "Quintex 5", category: "Technology", definition: "Aqua Otter's flagship no-salt conditioning system. Uses food-grade polyphosphate cartridges to sequester calcium and magnesium ions, preventing scale adhesion to pipes and fixtures without removing the minerals. Paired with an activated carbon stage for chlorine and TTHM reduction. No drain line, no electricity, no backwash. Cartridge replacement annually.", related: ["Polyphosphate", "No-salt", "TAC"] },

  // Regulation
  { term: "MCL", category: "Regulation", definition: "Maximum contaminant level. The highest concentration of a contaminant that is legally allowed in public drinking water under EPA regulations. MCLs are set at levels that balance health risk with treatment feasibility and cost. They represent the legal maximum, not necessarily a health-safe minimum.", related: ["MCLG", "Action level", "CCR"] },
  { term: "MCLG", category: "Regulation", definition: "Maximum contaminant level goal. The concentration at which no known or anticipated health risk occurs, set without regard for treatment feasibility or cost. The MCLG is always at or below the enforceable MCL. For lead and Chromium-6, the MCLG is zero — meaning no level is considered safe, though the MCL is set higher for practical reasons.", related: ["MCL", "Lead", "Chromium-6"] },
  { term: "Action level", category: "Regulation", definition: "A regulatory threshold that triggers required utility action when exceeded — not a maximum allowed concentration. Lead has an action level of 15 ppb: if more than 10% of tap water samples exceed this, utilities must notify customers, add corrosion control treatment, and in some cases replace lead service lines.", related: ["MCL", "Lead"] },
  { term: "CCR", category: "Regulation", definition: "Consumer confidence report. The annual water quality report every public water utility in the US is required to publish by July 1. Lists all contaminants detected, the levels found, and the applicable MCLs. The best first step for any homeowner researching their municipal water quality.", related: ["MCL", "MCLG"] },
  { term: "NSF 44", category: "Regulation", definition: "NSF International certification standard for residential cation exchange water softeners. A softener certified to NSF 44 has been independently verified for material safety and hardness reduction performance claims.", related: ["Ion exchange", "NSF 58"] },
  { term: "NSF 58", category: "Regulation", definition: "NSF International certification standard for reverse osmosis systems. Lists specific contaminants the system is certified to reduce, including lead, nitrate, PFAS, Chromium-6, and others. When evaluating an RO system, verify it carries NSF 58 certification with the specific contaminants of concern listed.", related: ["RO", "NSF 44"] },

  // Science
  { term: "Adsorption", category: "Science", definition: "The process by which contaminants bind to the surface of a solid material (like activated carbon). Different from absorption (which involves penetration into the material). Activated carbon works through adsorption — contaminants adhere to the porous carbon surface as water flows past.", related: ["GAC", "Activated carbon"] },
  { term: "Disinfection byproducts", category: "Science", definition: "Compounds formed when disinfectants (chlorine, chloramines, chlorine dioxide) react with naturally occurring organic matter in water. The two main regulated groups are TTHMs and HAA5. Unavoidable in treated water — the tradeoff for safe bacterial disinfection. Levels are managed through source water protection and activated carbon filtration.", related: ["TTHMs", "HAA5", "Chloramines"] },
  { term: "Sequestration", category: "Science", definition: "In water treatment, sequestration refers to binding mineral ions (calcium, magnesium, iron) with complexing agents (typically polyphosphates) that prevent them from crystallizing into scale. The minerals remain dissolved in the water but cannot deposit on surfaces. Used in no-salt conditioning systems like the Quintex 5.", related: ["Polyphosphate", "Quintex 5", "TAC"] },
  { term: "Resin", category: "Science", definition: "The ion exchange media inside a water softener tank. Polystyrene beads cross-linked with divinylbenzene and coated with negatively charged sulfonate groups that hold sodium ions. Resin has a service life of 10-20 years under normal conditions. Chlorine degrades resin over time, making it more important to protect resin in chlorinated city water supplies.", related: ["Ion exchange", "Water softener", "Regeneration"] },
  { term: "Chloramines", category: "Science", definition: "A secondary disinfectant used by some utilities (including portions of Indianapolis and Grand Rapids) in place of free chlorine. Formed by combining chlorine with ammonia. Chloramines are more stable than free chlorine (persist longer in the distribution system), produce fewer TTHMs, but require catalytic carbon rather than standard GAC for effective removal. They create their own byproducts including iodoacids.", related: ["Catalytic carbon", "GAC", "TTHMs"] },
  { term: "Temporary hardness", category: "Science", definition: "Water hardness caused by dissolved calcium bicarbonate (Ca(HCO3)2). Can be temporarily removed by boiling, which decomposes the bicarbonate and causes calcium carbonate to precipitate. This is the scale you see in a kettle. Ion exchange softeners remove both temporary and permanent hardness.", related: ["Hardness", "Permanent hardness", "Ion exchange"] },
  { term: "Permanent hardness", category: "Science", definition: "Water hardness caused by dissolved calcium sulfate (CaSO4) and magnesium sulfate (MgSO4). Cannot be removed by boiling. Requires ion exchange (softener) or sequestration (no-salt conditioner) for treatment.", related: ["Hardness", "Temporary hardness"] },
  { term: "Ferrous iron", category: "Science", definition: "Dissolved iron in its reduced, soluble form (Fe2+). Water containing only ferrous iron is typically clear when first drawn. It oxidizes to ferric iron (rust) upon contact with air. Softeners can handle low ferrous iron concentrations (under 0.5 ppm); AiO systems handle higher concentrations by intentionally introducing air to oxidize it for filtration.", related: ["Iron", "Ferric iron", "AiO"] },
  { term: "Ferric iron", category: "Science", definition: "Oxidized iron in its solid, insoluble form (Fe3+). Water with ferric iron is visibly rust-colored or orange when drawn. Ferric iron can be removed by sediment filtration because it's already in particle form. The orange staining on fixtures, laundry, and tile is ferric iron that has precipitated out of the water.", related: ["Iron", "Ferrous iron"] },
];

const categories = ["All", "Measurement", "Contaminant", "Technology", "Regulation", "Science"] as const;

const categoryColors: Record<string, string> = {
  Measurement: "#12BDFB",
  Contaminant: "#ef4444",
  Technology: "#f59e0b",
  Regulation: "#8b5cf6",
  Science: "#22d3ee",
};

function slugify(term: string) {
  return term.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function GlossaryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });

  const filtered = TERMS.filter(t => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchQuery = query === "" || t.term.toLowerCase().includes(query.toLowerCase()) || t.definition.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  }).sort((a, b) => a.term.localeCompare(b.term));

  const letters = Array.from(new Set(filtered.map(t => t.term[0].toUpperCase()))).sort();

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Aqua Otter Water Treatment Glossary",
    description: "Water treatment, water quality, and water chemistry terms defined for homeowners.",
    url: "https://www.myaquaotter.com/glossary",
    hasDefinedTerm: TERMS.map(t => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: "https://www.myaquaotter.com/glossary",
      url: `https://www.myaquaotter.com/glossary#${slugify(t.term)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(18,189,251,0.08)",
          minHeight: "44vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(56px, 7vh, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 65% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.022, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <BookOpen className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Water Glossary</span>
            </div>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
              Plain language.<br />
              <span style={{ color: "#12BDFB" }}>Real definitions.</span>
            </h1>
            <p className="mb-8" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "44ch", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7 }}>
              {TERMS.length} water treatment terms defined for homeowners. No jargon explaining other jargon.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(12,31,46,0.3)" }} />
              <input
                type="text"
                placeholder="Search terms..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-full border text-sm outline-none transition-all"
                style={{
                  borderColor: "rgba(12,31,46,0.12)",
                  backgroundColor: "#ffffff",
                  color: "#0C1F2E",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#12BDFB")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(12,31,46,0.12)")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + terms */}
      <section className="py-16 pb-28" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? (cat === "All" ? "#0C1F2E" : categoryColors[cat]) : "transparent",
                  color: activeCategory === cat ? "#ffffff" : "rgba(12,31,46,0.5)",
                  borderColor: activeCategory === cat ? (cat === "All" ? "#0C1F2E" : categoryColors[cat]) : "rgba(12,31,46,0.12)",
                }}
              >
                {cat} {cat !== "All" && `(${TERMS.filter(t => t.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-xs mb-8" style={{ color: "rgba(12,31,46,0.4)" }}>
            {filtered.length} term{filtered.length !== 1 ? "s" : ""}{query && ` matching "${query}"`}
          </p>

          {/* Letter anchors */}
          {!query && (
            <div className="flex flex-wrap gap-1.5 mb-10">
              {letters.map(l => (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{ backgroundColor: "rgba(18,189,251,0.08)", color: "#12BDFB" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; e.currentTarget.style.color = "#0C1F2E"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(18,189,251,0.08)"; e.currentTarget.style.color = "#12BDFB"; }}
                >
                  {l}
                </a>
              ))}
            </div>
          )}

          {/* Terms grouped by letter */}
          <div ref={bodyRef} className="space-y-10">
            {letters.map(letter => {
              const group = filtered.filter(t => t.term[0].toUpperCase() === letter);
              return (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-28">
                  <div className="flex items-center gap-4 mb-5">
                    <h2 className="font-display font-bold" style={{ fontSize: "2rem", color: "#12BDFB", lineHeight: 1 }}>{letter}</h2>
                    <div className="flex-1 h-px" style={{ backgroundColor: "rgba(18,189,251,0.15)" }} />
                  </div>
                  <div className="space-y-4">
                    {group.map((term, i) => (
                      <motion.div
                        key={term.term}
                        id={slugify(term.term)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className="rounded-2xl border bg-white p-6 scroll-mt-28"
                        style={{ borderColor: "rgba(18,189,251,0.1)" }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-display font-bold" style={{ fontSize: "1.15rem", color: "#0C1F2E" }}>
                            {term.term}
                          </h3>
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                            style={{ backgroundColor: `${categoryColors[term.category]}15`, color: categoryColors[term.category] }}
                          >
                            {term.category}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(12,31,46,0.65)", maxWidth: "72ch" }}>
                          {term.definition}
                        </p>
                        {term.related && term.related.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] font-medium" style={{ color: "rgba(12,31,46,0.35)" }}>See also:</span>
                            {term.related.map(r => {
                              const target = TERMS.find(t => t.term === r);
                              return target ? (
                                <a
                                  key={r}
                                  href={`#${slugify(r)}`}
                                  className="text-[10px] font-medium transition-colors hover:text-[#12BDFB]"
                                  style={{ color: "rgba(12,31,46,0.45)" }}
                                >
                                  {r}
                                </a>
                              ) : (
                                <span key={r} className="text-[10px]" style={{ color: "rgba(12,31,46,0.35)" }}>{r}</span>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff" }}>
            Know what to ask. Now find out what&apos;s in your water.
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "40ch", margin: "0 auto 2rem" }}>
            Free in-home water test. We measure hardness, TDS, iron, pH, and more, and show you the results on-site.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.3)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
            >
              Schedule Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)"; e.currentTarget.style.color = "#12BDFB"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              Explore the Library
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
