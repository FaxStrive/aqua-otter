// Service metadata driving programmatic /service-areas/[city]/[service] pages.

import type { ServiceArea } from "./service-areas";

export type ServiceSlug = "water-softener" | "filtration" | "reverse-osmosis" | "well-water" | "uv-purification" | "no-salt";

export type ServiceMeta = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  image: string; // hero product shot
  targets: string[]; // concerns this service fixes
  bullets: string[]; // short benefit bullets
  systemPageHref: string;
  relevanceFor: (area: ServiceArea) => "primary" | "secondary" | "niche";
  localCopy: (area: ServiceArea) => string;
  productMentions: string[];
};

export const SERVICES: Record<ServiceSlug, ServiceMeta> = {
  "water-softener": {
    slug: "water-softener",
    name: "Water Softener",
    shortName: "Softener",
    tagline: "Kill the scale. Keep the appliances.",
    color: "#12BDFB",
    image: "/client/AiO_and_Softener.jpeg",
    targets: ["Scale on fixtures", "Spots on dishes", "Dry skin", "Brittle hair", "Appliance damage"],
    bullets: [
      "Demand-initiated regeneration. Uses salt only when needed.",
      "Single or twin-tank sizing based on household demand.",
      "Protects water heater, dishwasher, washing machine.",
      "Lifetime warranty on tank and valve.",
    ],
    systemPageHref: "/systems/water-softener",
    productMentions: ["Water Softener (single-tank)", "Twin Softener", "Dual City Softener", "Tannin Softener (well water)"],
    relevanceFor: (a) => (a.hardness_gpg >= 16 ? "primary" : a.hardness_gpg >= 11 ? "primary" : a.hardness_gpg >= 7 ? "secondary" : "niche"),
    localCopy: (a) => {
      if (a.hardness_gpg >= 20) return `${a.city} water tests at ${a.hardness_gpg} GPG. That's officially "extremely hard" — you'll see scale on every glass, spot on every dish, and noticeable scale buildup on your fixtures within weeks. A softener isn't optional here. It's the single biggest upgrade to your home water.`;
      if (a.hardness_gpg >= 16) return `Water in ${a.city} averages ${a.hardness_gpg} GPG. "Very hard" territory. Every appliance in your home takes damage over time. A softener in ${a.county} County is one of the highest-ROI plumbing upgrades you can make.`;
      if (a.hardness_gpg >= 11) return `${a.city} water tests around ${a.hardness_gpg} GPG — hard enough to scale your water heater and spot your dishes. A properly sized softener cuts your detergent usage by 35% and extends every appliance's life.`;
      if (a.hardness_gpg >= 7) return `${a.city} runs moderately hard at about ${a.hardness_gpg} GPG. Softening here is a quality-of-life move rather than an emergency — spot-free glassware, better soap lather, softer laundry. A compact single-tank unit handles it.`;
      return `${a.city} water is relatively soft at ${a.hardness_gpg} GPG. You probably don't need a traditional softener. A no-salt conditioner like the Quintex 5 handles any residual scale and keeps appliances pristine.`;
    },
  },

  "filtration": {
    slug: "filtration",
    name: "Whole-Home Filtration",
    shortName: "Filtration",
    tagline: "Every tap. Every floor. Every day.",
    color: "#12BDFB",
    image: "/client/Quintex_5_RB-removebg-preview__1_.png",
    targets: ["Chlorine taste", "Chloramine smell", "VOCs", "PFAS reduction", "Sediment", "TTHMs"],
    bullets: [
      "Catalytic carbon eliminates chlorine, chloramine, taste, odor.",
      "Reduces PFAS, VOCs, TTHMs, haloacetic acids.",
      "Up to 1.5M gallon media life on some configurations.",
      "Installed at your main line. Every fixture benefits.",
    ],
    systemPageHref: "/systems/filtration",
    productMentions: ["Quintex 5", "AiO + Softener Combination", "Alpha 3000"],
    relevanceFor: (a) => {
      const bad = a.notable_contaminants.some(c => ["TTHMs", "Haloacetic acids", "PFAS", "Chromium-6"].includes(c));
      return bad || a.source === "Municipal" ? "primary" : "secondary";
    },
    localCopy: (a) => {
      const flags = a.notable_contaminants.filter(c => ["TTHMs", "Haloacetic acids", "PFAS", "Chromium-6"].includes(c));
      if (flags.length > 0) return `${a.city} municipal water has flagged ${flags.join(", ")} in recent Consumer Confidence Reports. These aren't hypothetical. They're in your water right now. Whole-home carbon filtration pulls them out before the water reaches any tap in your home.`;
      return `${a.city} water is chlorinated at the treatment plant. That chlorine evaporates into the air every time you shower and leaves a taste on everything you drink. A whole-home filter ends it.`;
    },
  },

  "reverse-osmosis": {
    slug: "reverse-osmosis",
    name: "Reverse Osmosis",
    shortName: "RO",
    tagline: "99% out. Only the water gets through.",
    color: "#22c55e",
    image: "/client/5_Stage_Reverse_Osmosis_RB.png",
    targets: ["Lead", "PFAS", "Arsenic", "Nitrate", "Fluoride", "Bottled water habit", "Bad taste"],
    bullets: [
      "5-stage under-sink unit with a dedicated faucet.",
      "99% TDS removal across every major contaminant.",
      "Replaces bottled water for cooking and drinking.",
      "Optional alkaline remineralization stage.",
    ],
    systemPageHref: "/systems/reverse-osmosis",
    productMentions: ["5-Stage Reverse Osmosis", "Alkaline RO", "Tankless RO (coming soon)"],
    relevanceFor: (a) => {
      if (a.notable_contaminants.some(c => ["Lead", "PFAS", "Nitrate", "Arsenic"].includes(c))) return "primary";
      return "secondary";
    },
    localCopy: (a) => {
      if (a.notable_contaminants.includes("Lead")) return `${a.city} has documented lead risk in older housing stock. A 5-stage reverse osmosis system under your kitchen sink removes 99% of lead, plus whatever else is in there. This is the only truly safe drinking water setup for older homes.`;
      if (a.notable_contaminants.includes("PFAS")) return `${a.city} has detected PFAS in its water supply. PFAS are forever chemicals linked to serious health concerns. Only reverse osmosis and GAC filtration actually remove them. This isn't optional if you have kids.`;
      if (a.notable_contaminants.includes("Nitrate")) return `${a.city} water has flagged nitrate levels, common in agricultural regions of ${a.county} County. Nitrate is particularly dangerous for infants. RO is the EPA-recommended treatment.`;
      return `Reverse osmosis replaces bottled water for every drink, every meal, every ice cube. Once you taste the difference, you won't go back.`;
    },
  },

  "well-water": {
    slug: "well-water",
    name: "Well Water Treatment",
    shortName: "Well Water",
    tagline: "Iron, sulfur, bacteria. Handled.",
    color: "#f59e0b",
    image: "/client/AiO_Well_Filtration_RB.png",
    targets: ["Iron stains", "Rotten egg smell", "Manganese", "Bacteria", "Sediment", "Well-water odor"],
    bullets: [
      "Air injection ozone removes iron, sulfur, manganese in one tank.",
      "UV purification inactivates bacteria, viruses, giardia.",
      "Sediment pre-filter captures fines before they reach the system.",
      "Annual service visit included.",
    ],
    systemPageHref: "/systems/well-water",
    productMentions: ["AiO Ozone Well Filtration", "UV Purification", "Tannin Softener (tea-colored wells)"],
    relevanceFor: (a) => (a.source === "Mix of Municipal and Well" ? "primary" : "secondary"),
    localCopy: (a) => {
      if (a.source === "Mix of Municipal and Well") return `A lot of homes in ${a.county} County are on private wells. Iron stains, rotten-egg sulfur smell, and bacterial risk come with the territory. Our AiO system handles all three in a single tank using ozone injection. No chemicals, no cartridges, no drama.`;
      return `Even in ${a.city}, plenty of homes have wells for outbuildings, irrigation, or rural properties nearby. If iron stains show up on fixtures or laundry, the AiO is the answer.`;
    },
  },

  "uv-purification": {
    slug: "uv-purification",
    name: "UV Purification",
    shortName: "UV",
    tagline: "Bacteria, viruses, pathogens. Gone.",
    color: "#a78bfa",
    image: "/client/21_GPG_UV_Light.png",
    targets: ["E. coli", "Coliform bacteria", "Giardia", "Cryptosporidium", "Viruses"],
    bullets: [
      "Drop-in UV chamber on your main line.",
      "Inactivates 99.99% of pathogens in real time.",
      "No chemicals, no byproducts, no taste.",
      "Annual bulb replacement only.",
    ],
    systemPageHref: "/systems/uv-purification",
    productMentions: ["11 GPG UV Light", "21 GPG UV Light"],
    relevanceFor: (a) => (a.source === "Mix of Municipal and Well" ? "primary" : "niche"),
    localCopy: (a) => {
      if (a.source === "Mix of Municipal and Well") return `Private wells in ${a.county} County carry real bacterial risk. A single flood event, a failed septic nearby, and you have a coliform problem. UV purification is the single most important safety layer for any well-water home.`;
      return `${a.city} municipal water is chlorinated. But boil-water advisories happen, especially after main breaks. A UV system is your backup. Always on, always working.`;
    },
  },

  "no-salt": {
    slug: "no-salt",
    name: "No-Salt Conditioner",
    shortName: "No-Salt",
    tagline: "Prevent scale. Skip the salt bags.",
    color: "#f59e0b",
    image: "/client/Quintex_5_RB.png",
    targets: ["Scale prevention", "Appliance protection", "No-salt preference", "Low-sodium diets"],
    bullets: [
      "Food-grade phosphate media. Outperforms TAC.",
      "No salt, no drain, no electricity.",
      "Retains beneficial minerals in drinking water.",
      "Annual cartridge swap only.",
    ],
    systemPageHref: "/systems/no-salt",
    productMentions: ["Quintex 5", "Quintex 5 + Carbon", "Water Conditioner Cartridge (for AiO housings)"],
    relevanceFor: (a) => (a.hardness_gpg <= 10 ? "primary" : a.hardness_gpg <= 15 ? "secondary" : "niche"),
    localCopy: (a) => {
      if (a.hardness_gpg <= 10) return `${a.city} water is relatively soft at ${a.hardness_gpg} GPG. The Quintex 5 food-grade phosphate conditioner is the perfect match here. Prevents scale without removing minerals, no salt to lift, no drain to plumb.`;
      if (a.hardness_gpg <= 15) return `${a.city} water is moderately hard at ${a.hardness_gpg} GPG. The Quintex 5 works well in this range for homeowners who want zero maintenance and no salt to deal with.`;
      return `${a.city} water is very hard at ${a.hardness_gpg} GPG. A no-salt conditioner like the Quintex 5 prevents scale but won't give you the soft-water feel of a traditional softener. Works best as a secondary line or when combined with a small softener.`;
    },
  },
};

export const SERVICE_SLUGS: ServiceSlug[] = ["water-softener", "filtration", "reverse-osmosis", "well-water", "uv-purification", "no-salt"];

export function getService(slug: string): ServiceMeta | null {
  return (SERVICES as Record<string, ServiceMeta>)[slug] ?? null;
}
