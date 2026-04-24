export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  city: string;
  state: string;
  system: string;
  date: string;
  readTime: string;
  img: string;
  featured: boolean;
  customerFirstName: string;
  quote: string;
  problem: {
    headline: string;
    body: string;
    symptoms: string[];
  };
  water: {
    hardness_gpg?: number;
    tds_ppm?: number;
    iron_ppm?: number;
    ph?: number;
    contaminants: string[];
    source: string;
  };
  solution: {
    headline: string;
    body: string;
    systems: { name: string; why: string }[];
  };
  results: {
    before: { label: string; value: string }[];
    after: { label: string; value: string }[];
    quote?: string;
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "noblesville-hard-water-softener-ro",
    title: "21 GPG Hard Water Defeated: A Noblesville Family Gets Their Home Back",
    subtitle: "Scale-covered fixtures, cloudy glasses, and Chromium-6 in the tap water. A Hamilton County family needed a complete solution.",
    category: "Water Softener + RO",
    city: "Noblesville",
    state: "IN",
    system: "Whole-Home Softener + 5-Stage RO",
    date: "March 2026",
    readTime: "5 min read",
    img: "/client/service-kitchen-tap.jpg",
    featured: true,
    customerFirstName: "Jennifer",
    quote: "Within two weeks of installation our glasses were clear, the shower doors stopped hazing over, and my skin actually feels different after showering. I didn't realize how much hard water was affecting everything.",
    problem: {
      headline: "The hardest water in Hamilton County",
      body: "Jennifer and her family moved to Noblesville in 2022. Within six months, white scale had built up on every faucet and showerhead. Their dishwasher was leaving film on glasses. Their water heater was accumulating scale that was shortening its lifespan. And their CCR report showed detectable Chromium-6 at the tap.",
      symptoms: [
        "White scale on all faucets, showerheads, and shower glass",
        "Glassware coming out of the dishwasher cloudy and spotted",
        "Dry, itchy skin after showering",
        "Detectable Chromium-6 in the consumer confidence report",
        "Water heater efficiency declining ahead of schedule",
      ],
    },
    water: {
      hardness_gpg: 21,
      tds_ppm: 430,
      contaminants: ["Chromium-6", "Haloacetic acids"],
      source: "Municipal (City of Noblesville)",
    },
    solution: {
      headline: "Softener for the hardness. RO for what the softener doesn't touch.",
      body: "We ran an in-home water test confirming 21 GPG — among the highest we see in the state. The softener handles all the calcium and magnesium, eliminating scale throughout the home. The 5-stage RO under the kitchen sink removes Chromium-6, chlorine byproducts, and anything else that gets through the municipal treatment process. Two systems. One complete answer.",
      systems: [
        { name: "Aqua Otter Pro 64 Softener", why: "Sized for a 4-person household at 21 GPG. Efficient salt use with demand-initiated regeneration." },
        { name: "5-Stage Reverse Osmosis", why: "Removes Chromium-6, lead, nitrate, chlorine byproducts, and TDS to near-zero at the kitchen tap." },
      ],
    },
    results: {
      before: [
        { label: "Water hardness", value: "21 GPG" },
        { label: "Chromium-6", value: "Detectable" },
        { label: "Scale buildup", value: "Severe (all fixtures)" },
        { label: "Drinking water TDS", value: "430 ppm" },
      ],
      after: [
        { label: "Water hardness", value: "0 GPG" },
        { label: "Chromium-6", value: "Below detection" },
        { label: "Scale buildup", value: "None" },
        { label: "Drinking water TDS", value: "< 20 ppm" },
      ],
      quote: "I used to buy two cases of bottled water a week. Now we just use the tap. That alone is paying for the system.",
    },
  },
  {
    slug: "ann-arbor-pfas-whole-home-filtration",
    title: "PFAS in Ann Arbor: Whole-Home Carbon + RO Brings a Family to Safe Levels",
    subtitle: "Documented PFAS in the Huron River supply prompted a proactive Ann Arbor homeowner to act before symptoms appeared.",
    category: "Whole-Home Filtration + RO",
    city: "Ann Arbor",
    state: "MI",
    system: "Whole-Home Carbon + 5-Stage RO",
    date: "February 2026",
    readTime: "6 min read",
    img: "/client/service-tap-closeup.jpg",
    featured: false,
    customerFirstName: "Marcus",
    quote: "My wife is a physician and she brought home the Ann Arbor water report one night and that was it. We had the Aqua Otter team out within the week. The whole-home carbon plus the RO under the kitchen was exactly what the situation called for.",
    problem: {
      headline: "PFAS in the Huron River — and what the city report confirms",
      body: "Ann Arbor's water supply comes from the Huron River. State testing has documented PFAS compounds in the source water above EPA health advisory levels. The city treatment plant reduces them but does not eliminate them. For a family with young children, this was unacceptable. Marcus wanted whole-home coverage, not just a point-of-use filter.",
      symptoms: [
        "PFAS detected in municipal water report above EPA advisory levels",
        "Two young children in the home — proactive health decision",
        "Concern about bioaccumulation over years of exposure",
        "Wanting whole-home protection, not just kitchen sink",
      ],
    },
    water: {
      hardness_gpg: 10,
      tds_ppm: 210,
      contaminants: ["PFAS", "TTHMs"],
      source: "Municipal (Huron River via Ann Arbor Water Treatment Plant)",
    },
    solution: {
      headline: "Whole-home activated carbon removes PFAS before it reaches any tap.",
      body: "Activated carbon is one of the most effective technologies available for PFAS removal. We sized a whole-home carbon system for their household flow rate, ensuring every tap in the house gets treated water. The 5-stage RO at the kitchen sink adds a second reduction layer for drinking and cooking. Carbon backwashes automatically. RO membrane gets replaced every 2 years.",
      systems: [
        { name: "Aqua Otter Whole-Home Carbon System", why: "Catalytic carbon removes PFAS, chlorine, chloramines, and organic compounds at the point of entry." },
        { name: "5-Stage Reverse Osmosis", why: "Provides a second barrier at the kitchen tap. RO removes any PFAS that passes the carbon plus all TDS." },
      ],
    },
    results: {
      before: [
        { label: "PFAS", value: "Detected (above advisory)" },
        { label: "TTHMs", value: "Detectable" },
        { label: "Chlorine taste/odor", value: "Present" },
        { label: "Household concern level", value: "High" },
      ],
      after: [
        { label: "PFAS at tap", value: "Below detection limit" },
        { label: "TTHMs", value: "Non-detect" },
        { label: "Chlorine taste/odor", value: "Gone" },
        { label: "Household concern level", value: "Resolved" },
      ],
    },
  },
  {
    slug: "fort-wayne-iron-well-aio",
    title: "Red Water in Fort Wayne: AiO System Clears Iron and Sulfur on City Supply",
    subtitle: "A Fort Wayne homeowner was dealing with iron staining on everything despite being on city water. The fix was simpler than expected.",
    category: "All-In-One Iron Filter",
    city: "Fort Wayne",
    state: "IN",
    system: "AiO All-In-One Iron Filter",
    date: "January 2026",
    readTime: "4 min read",
    img: "/client/service-well-water.jpg",
    featured: false,
    customerFirstName: "David",
    quote: "I was skeptical because we're on city water, not a well. But our test showed 1.8 ppm iron right at the tap. Six weeks after the AiO went in, the orange ring in the toilet bowl was gone. The white bathtub is actually white again.",
    problem: {
      headline: "Iron staining on city water — not as rare as you'd think",
      body: "David had orange rings in every toilet bowl, rust-colored staining in his white bathtub, and discoloration on the grout in his shower. He assumed it was a well water problem. In fact, Fort Wayne's distribution system runs through aging cast iron infrastructure, and iron can leach into the water between the treatment plant and your tap. His in-home test confirmed 1.8 ppm ferrous iron — well above the 0.3 ppm EPA secondary standard.",
      symptoms: [
        "Orange/rust rings in toilet bowls",
        "Iron staining on white bathtub and shower tile",
        "Metallic taste in the water",
        "Orange discoloration on laundry after washing",
        "Staining on stainless steel sink basin",
      ],
    },
    water: {
      hardness_gpg: 22,
      iron_ppm: 1.8,
      ph: 7.4,
      contaminants: ["Iron (ferrous)", "TTHMs"],
      source: "Municipal (City of Fort Wayne)",
    },
    solution: {
      headline: "An AiO oxidizes and filters iron in one vessel. No chemicals required.",
      body: "The Aqua Otter AiO uses an air pocket in the top of the vessel to oxidize dissolved ferrous iron into solid ferric iron particles, then filters them out through the media bed. The system backwashes automatically to purge the captured iron. At 1.8 ppm, the AiO is sized appropriately — no additional chemical injection needed. The system also addresses Fort Wayne's high hardness, though David chose to pair it with a separate softener for the calcium and magnesium.",
      systems: [
        { name: "Aqua Otter AiO All-In-One", why: "Air-charged oxidation tank removes iron, manganese, and hydrogen sulfide without chemicals. Automatic backwash." },
        { name: "Aqua Otter Pro 64 Softener", why: "Added to address the 22 GPG hardness that the AiO doesn't touch." },
      ],
    },
    results: {
      before: [
        { label: "Iron concentration", value: "1.8 ppm" },
        { label: "Hardness", value: "22 GPG" },
        { label: "Toilet bowl staining", value: "Severe" },
        { label: "Laundry discoloration", value: "Present" },
      ],
      after: [
        { label: "Iron concentration", value: "< 0.05 ppm" },
        { label: "Hardness", value: "0 GPG" },
        { label: "Toilet bowl staining", value: "None (cleared within 6 weeks)" },
        { label: "Laundry discoloration", value: "Gone" },
      ],
    },
  },
  {
    slug: "nashville-no-salt-quintex5",
    title: "Nashville Condo: Quintex 5 Eliminates Chlorine Taste Without Salt or Backwash",
    subtitle: "A Nashville homeowner in a condo couldn't install a traditional softener. The Quintex 5 solved the taste and scale problem with no drain required.",
    category: "No-Salt Conditioning",
    city: "Nashville",
    state: "TN",
    system: "Quintex 5 No-Salt Conditioner",
    date: "December 2025",
    readTime: "4 min read",
    img: "/client/service-kitchen-tap.jpg",
    featured: false,
    customerFirstName: "Priya",
    quote: "I'm in a condo so a salt softener was never on the table. The Quintex 5 fits in my utility closet, there's no drain line, no salt to buy, no maintenance. And the water just tastes better. I stopped buying bottled water.",
    problem: {
      headline: "Soft Nashville water with a persistent chlorine taste",
      body: "Nashville's Cumberland River supply is naturally soft at 5 GPG — one of the lowest in Aqua Otter's service area. But city treatment with chlorine and chloramines leaves a distinct chemical taste that bothered Priya every time she drank from the tap or made coffee. As a condo owner, she couldn't install anything requiring a floor drain, and her HOA restricted salt-discharge systems.",
      symptoms: [
        "Strong chlorine and chemical taste from the tap",
        "Reluctance to drink tap water; buying bottled",
        "HOA restriction on salt-based systems",
        "No floor drain access in utility closet",
      ],
    },
    water: {
      hardness_gpg: 5,
      tds_ppm: 120,
      contaminants: ["TTHMs", "Haloacetic acids", "Chloramines"],
      source: "Municipal (Metro Water Services, Cumberland River)",
    },
    solution: {
      headline: "Quintex 5: phosphate sequestration and carbon in one compact cartridge system.",
      body: "The Quintex 5 uses food-grade polyphosphate cartridges to condition minerals in the water, preventing scale attachment to pipes and fixtures without removing them. It pairs with an activated carbon stage that captures chlorine, chloramines, and disinfection byproducts. The entire system installs on a cold water line with no drain, no electricity, and no brine discharge. Cartridges swap annually.",
      systems: [
        { name: "Quintex 5 No-Salt Conditioner", why: "Polyphosphate sequestration prevents scale. Carbon stage removes chlorine taste and TTHMs. No drain, no electricity." },
      ],
    },
    results: {
      before: [
        { label: "Chlorine taste", value: "Strong" },
        { label: "TTHMs", value: "Detectable" },
        { label: "Monthly bottled water spend", value: "~$45" },
        { label: "Scale on fixtures", value: "Minor (soft water)" },
      ],
      after: [
        { label: "Chlorine taste", value: "Gone" },
        { label: "TTHMs", value: "Non-detect" },
        { label: "Monthly bottled water spend", value: "$0" },
        { label: "Scale on fixtures", value: "None" },
      ],
    },
  },
  {
    slug: "detroit-lead-ro-older-home",
    title: "Livonia Home Built in 1962: RO Under the Sink Eliminates Lead Risk",
    subtitle: "An older Detroit-metro home with original copper pipes and lead solder needed a point-of-use solution the whole family could trust.",
    category: "Reverse Osmosis",
    city: "Livonia",
    state: "MI",
    system: "5-Stage Reverse Osmosis",
    date: "November 2025",
    readTime: "5 min read",
    img: "/client/service-tap-closeup.jpg",
    featured: false,
    customerFirstName: "Carol",
    quote: "We bought the house knowing it was old. When I started reading about lead solder and what it means for homes built before 1986, I stopped drinking the tap water entirely. The RO gave us safe drinking water and I verified it with my own TDS meter. Zero lead at our kitchen tap.",
    problem: {
      headline: "Pre-1986 construction means lead solder at every joint.",
      body: "Carol's 1962 Livonia home passed inspection with no issues. But homes built before 1986 used lead-tin solder at every pipe joint, and as pipes age, that solder can leach into the water. GLWA (Detroit's water authority) treats water to reduce lead leaching, but the risk lives inside the home's plumbing — not the main. The only way to protect a household in this situation is a point-of-use system at the kitchen tap.",
      symptoms: [
        "Home built in 1962 with original copper plumbing",
        "Lead solder used at all pipe joints (standard pre-1986)",
        "Concern after reading about Detroit-area lead issues",
        "Two grandchildren visiting regularly",
        "Stopped drinking tap water; buying gallon jugs",
      ],
    },
    water: {
      hardness_gpg: 7,
      tds_ppm: 145,
      contaminants: ["Lead (leaching from solder)", "Haloacetic acids"],
      source: "Municipal (GLWA via City of Livonia)",
    },
    solution: {
      headline: "A 5-stage RO removes lead to below 1 ppb — well under the EPA action level.",
      body: "Reverse osmosis membranes reject lead ions at 98-99% efficiency. The 5-stage system under Carol's kitchen sink feeds the tap she uses for drinking, cooking, and filling glasses. GLWA water at 7 GPG doesn't require pre-softening, so the RO membrane lasts 2-3 years before replacement. We also added a dedicated faucet in polished nickel to match her kitchen hardware.",
      systems: [
        { name: "5-Stage Reverse Osmosis", why: "RO membrane rejects lead, copper, chromium, PFAS, nitrate, and TTHMs. 5-gallon storage tank under sink." },
      ],
    },
    results: {
      before: [
        { label: "Lead risk", value: "Present (pre-1986 solder)" },
        { label: "TDS at tap", value: "145 ppm" },
        { label: "Monthly water jug spend", value: "~$30" },
        { label: "Drinking tap water", value: "No" },
      ],
      after: [
        { label: "Lead at kitchen tap", value: "< 1 ppb (below detection)" },
        { label: "TDS at tap", value: "8 ppm" },
        { label: "Monthly water jug spend", value: "$0" },
        { label: "Drinking tap water", value: "Yes" },
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | null {
  return CASE_STUDIES.find(c => c.slug === slug) ?? null;
}
