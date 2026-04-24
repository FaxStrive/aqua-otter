export type LibraryArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Contaminants" | "Science" | "Systems" | "Local Water" | "Maintenance";
  readTime: string;
  date: string;
  featured: boolean;
  relatedSlugs: string[];
  sections: {
    heading: string;
    body: string;
    list?: string[];
    callout?: { label: string; text: string };
  }[];
};

export const LIBRARY_ARTICLES: LibraryArticle[] = [
  {
    slug: "chromium-6-indiana-water",
    title: "Chromium-6 in Indiana's Water Supply",
    description: "Chromium-6 appears in CCR reports across Hamilton, Marion, and Allen counties. Here's what it is, where it comes from, and what actually removes it.",
    category: "Contaminants",
    readTime: "8 min read",
    date: "April 2026",
    featured: true,
    relatedSlugs: ["tthms-haloacetic-acids", "water-hardness-gpg-explained"],
    sections: [
      {
        heading: "What is Chromium-6?",
        body: "Chromium-6, also called hexavalent chromium or Cr(VI), is a heavy metal compound that occurs naturally in soil and rock, but also enters water supplies through industrial discharge, coal ash impoundments, and stainless steel corrosion. It gained public attention after the Hinkley, California contamination case documented in the Erin Brockovich story, but it is far from a California-only problem.",
        callout: { label: "Indiana data", text: "The Environmental Working Group's analysis of Indiana municipal water reports found Chromium-6 detections in over 60 Indiana water systems, including Indianapolis, Fishers, Carmel, Fort Wayne, and Noblesville — most above California's public health goal of 0.02 ppb." },
      },
      {
        heading: "Federal regulation vs. health reality",
        body: "The EPA currently regulates total chromium (all forms combined) at a maximum contaminant level (MCL) of 100 ppb. Chromium-6 specifically does not have its own federal MCL. This means a utility can be fully in compliance with federal law while still delivering water with Chromium-6 levels that independent researchers consider unsafe for long-term consumption.",
        list: [
          "EPA total chromium MCL: 100 ppb (set in 1991 — before Cr-6 was separately characterized)",
          "California public health goal for Cr-6: 0.02 ppb",
          "Most Indiana CCR reports show total chromium well below 100 ppb but above 0.02 ppb",
          "The EPA has announced intent to set a Chromium-6-specific standard but has not finalized one",
        ],
      },
      {
        heading: "Where does it come from in Indiana?",
        body: "Indiana's Chromium-6 presence is primarily attributed to geological sources — the mineral chromite occurs naturally in Indiana's bedrock — and to historical industrial activity in the manufacturing corridor. Hamilton County cities like Noblesville, Fishers, and Carmel draw from the White River and Eagle Creek systems, both of which show consistent but low-level Chromium-6 detections.",
      },
      {
        heading: "What actually removes Chromium-6?",
        body: "Not all filtration technologies are equally effective against Chromium-6. Understanding the options matters because choosing the wrong system gives false confidence.",
        list: [
          "Reverse osmosis (RO): Most effective. An RO membrane with a tight rejection rating removes 85-95% of Chromium-6 at the kitchen tap. NSF 58 certification covers chromium reduction.",
          "Strong-base anion exchange: Removes Chromium-6 effectively but adds complexity and requires specialized resin — not common in residential systems.",
          "Activated carbon: Largely ineffective for Chromium-6. Carbon is excellent for organic compounds and chlorine but does not reliably remove metal ions.",
          "Softeners: No effect on Chromium-6. Softeners target calcium and magnesium only.",
          "Standard pitcher filters: Brita and similar products typically use activated carbon, which does not address Chromium-6.",
        ],
        callout: { label: "Our recommendation", text: "For households in Hamilton County or anywhere else with CCR-reported Chromium-6, a 5-stage reverse osmosis system at the kitchen sink is the most practical and cost-effective solution. It removes Chromium-6 alongside lead, nitrate, TTHMs, and essentially everything else the CCR might flag." },
      },
      {
        heading: "Reading your CCR report",
        body: "Every Indiana water utility is required to publish an annual Consumer Confidence Report (CCR). Chromium-6 may be listed under 'Total Chromium' rather than as a separate entry. If your report shows any chromium detection above zero, it is worth knowing whether Chromium-6 is the form present. Contact your utility directly and ask — they are required to provide this information.",
      },
      {
        heading: "Is it an emergency?",
        body: "No — CCR-level Chromium-6 in Indiana is a long-term exposure concern, not an acute health emergency. You don't need to stop using your tap water today. But if you have young children, are pregnant, or want to reduce lifetime exposure, installing a point-of-use RO system is a practical and permanent solution. We'll test your water in-home and show you exact results before recommending anything.",
      },
    ],
  },
  {
    slug: "pfas-michigan-water",
    title: "PFAS Contamination in Michigan: What Homeowners Need to Know",
    description: "Michigan has documented PFAS contamination at hundreds of sites. Here's the science, the affected areas, and what filter technologies actually work.",
    category: "Contaminants",
    readTime: "9 min read",
    date: "March 2026",
    featured: true,
    relatedSlugs: ["chromium-6-indiana-water", "whole-home-filtration-guide"],
    sections: [
      {
        heading: "What are PFAS?",
        body: "PFAS — per- and polyfluoroalkyl substances — are a class of over 12,000 synthetic chemicals developed in the 1940s for their resistance to heat, water, and oil. They were used in non-stick cookware, firefighting foam (AFFF), food packaging, stain-resistant fabrics, and hundreds of industrial processes. They're called 'forever chemicals' because the carbon-fluorine bond is among the strongest in organic chemistry: PFAS do not break down in the environment or the human body.",
        callout: { label: "Michigan context", text: "Michigan has identified PFAS contamination at over 200 sites, including military installations, industrial plants, and landfills. The Ann Arbor water supply (Huron River), Kalamazoo-area wells, and communities near military bases are among the most documented." },
      },
      {
        heading: "Health concerns",
        body: "The science on PFAS health effects has evolved rapidly since 2016. The EPA lowered its health advisory levels from 70 ppt to near zero for PFOA and PFOS (the two most-studied compounds) in 2022, and finalized a maximum contaminant level (MCL) of 4 ppt for PFOA and PFOS in 2024. Studies have associated long-term PFAS exposure with:",
        list: [
          "Thyroid disease and hormone disruption",
          "Elevated cholesterol levels",
          "Kidney cancer and testicular cancer",
          "Reduced vaccine effectiveness (especially concerning for children)",
          "Pregnancy complications and low birth weight",
          "Immune system suppression",
        ],
      },
      {
        heading: "Where is contamination documented in Michigan?",
        body: "The highest-profile Michigan PFAS sites include: the Wolverine World Wide tannery contamination in Rockford (PFAS from Scotchgard-treated leather has contaminated wells in Kent County); PFAS from AFFF firefighting foam at Selfridge Air National Guard Base (Macomb County); contamination near the Kalamazoo airport; and documented PFAS in the Huron River, which feeds Ann Arbor's water supply.",
      },
      {
        heading: "What treatment technologies actually work?",
        body: "This is where specificity matters. PFAS compounds vary in chain length, and different technologies are more or less effective against different PFAS forms.",
        list: [
          "Activated carbon (granular activated carbon / GAC): Effective against long-chain PFAS (PFOA, PFOS) when properly sized. Less effective against short-chain PFAS. Most effective at point-of-entry for whole-home treatment.",
          "Reverse osmosis: Highly effective against PFAS across the board. RO membranes reject PFAS via size exclusion — most PFAS molecules are physically too large to pass through. NSF 58 certified RO systems rated for PFAS reduction are the gold standard at point-of-use.",
          "Ion exchange (anion resin): Very effective, especially against short-chain PFAS that carbon misses. Not commonly available in residential systems but increasingly relevant.",
          "UV purification: Does not remove PFAS.",
          "Softeners: Do not remove PFAS.",
          "Standard pitcher filters: Most use carbon; effectiveness varies. Some are now NSF 53 certified for PFAS reduction.",
        ],
        callout: { label: "Our Ann Arbor protocol", text: "Every Ann Arbor install we do includes whole-home activated carbon (GAC) at the point of entry plus a 5-stage RO under the kitchen sink. The combination addresses both long-chain and short-chain PFAS, provides backup protection if one stage underperforms, and also eliminates chlorine byproducts, TTHMs, and anything else in the Huron River supply." },
      },
      {
        heading: "How do I know if my water has PFAS?",
        body: "Michigan requires utilities to test for PFAS and report results annually. You can find your utility's PFAS data through the Michigan Department of Environment, Great Lakes, and Energy (EGLE). Private well owners are not covered by utility testing — if you're on a well in a county with known PFAS activity, you should test independently. Testing typically runs $200-400 through a certified laboratory.",
      },
      {
        heading: "What about the health advisory levels?",
        body: "The EPA's 2024 MCL of 4 ppt (parts per trillion) for PFOA and PFOS is extremely low — for context, 4 ppt is 4 drops in an Olympic-size swimming pool. Most utilities with PFAS detections are working to reduce concentrations but some remain above the new MCL. If your utility reports PFAS detections, even at 'compliant' levels, a point-of-use RO system brings your drinking water exposure to near zero.",
      },
    ],
  },
  {
    slug: "how-ion-exchange-softening-works",
    title: "How Ion Exchange Softening Works",
    description: "The science behind salt-based water softeners: what they remove, how the resin bed works, what regeneration does, and what softeners don't do.",
    category: "Science",
    readTime: "7 min read",
    date: "February 2026",
    featured: false,
    relatedSlugs: ["water-hardness-gpg-explained", "softener-vs-no-salt-conditioning"],
    sections: [
      {
        heading: "The problem softeners solve",
        body: "Hard water contains dissolved calcium (Ca²⁺) and magnesium (Mg²⁺) ions. These are positively charged minerals that leach out of limestone and dolomite rock as water moves through the ground. In your home, they deposit as scale on heating elements, inside pipes, on fixtures, and as soap scum on skin and glass. The higher the grain per gallon (GPG) count, the more severe the effects.",
      },
      {
        heading: "The resin bed: where the exchange happens",
        body: "Inside a softener tank is a bed of tiny polystyrene beads — the resin. Each bead is coated with negatively charged sulfonate groups, and during the manufacturing process, these sites are pre-loaded with sodium ions (Na⁺). When hard water flows through the resin bed, the calcium and magnesium ions have a stronger positive charge than sodium. They displace the sodium from the resin, binding tightly to the negatively charged sites. The sodium that was released exits with the treated water.",
        callout: { label: "Ion exchange in one sentence", text: "Hard mineral ions swap places with soft sodium ions on the resin beads — minerals stay behind, sodium goes into your water." },
      },
      {
        heading: "Why softened water feels slippery",
        body: "Many people notice that softened water feels 'slippery' or 'silky' in the shower. This is not a coating — it's the absence of minerals. Hard water forms a chemical reaction with soap that creates insoluble soap scum on your skin (the same reaction that leaves bathtub ring). Softened water allows soap to lather properly and rinse cleanly, leaving no residue. The slippery feeling is your skin without the mineral buildup.",
      },
      {
        heading: "Regeneration: recharging the resin",
        body: "The resin bed has a finite capacity. Once all sodium sites are occupied by calcium and magnesium, the softener stops softening. Regeneration is the process that recharges the resin. The control valve initiates a backwash cycle, then draws a concentrated salt brine solution (sodium chloride dissolved in water from the brine tank) through the resin bed. The high sodium concentration displaces the calcium and magnesium, which get flushed down the drain. The resin is recharged with sodium and ready to soften again.",
        list: [
          "Demand-initiated regeneration (DIR): Modern softeners track actual water usage and regenerate only when needed. More efficient than timer-based systems.",
          "Timer-based regeneration: Older systems regenerate on a fixed schedule regardless of actual depletion. Less salt-efficient.",
          "Brine consumption: A typical household uses 6-8 lbs of salt per regeneration. Frequency depends on water hardness and household size.",
        ],
      },
      {
        heading: "What softeners don't remove",
        body: "Ion exchange softening is specifically targeted at calcium and magnesium. It does not reduce:",
        list: [
          "Chromium-6 or other heavy metals",
          "Nitrate, nitrite",
          "PFAS",
          "TTHMs, haloacetic acids, or other disinfection byproducts",
          "Lead",
          "Iron (in dissolved form, at high concentrations — though softeners handle low iron levels incidentally)",
          "Bacteria or viruses",
          "TDS (total dissolved solids — softeners trade hard minerals for sodium, so TDS stays roughly equivalent)",
        ],
        callout: { label: "Common misconception", text: "A softener does not 'purify' water in the health sense. It's an appliance comfort system. For drinking water concerns (Chromium-6, PFAS, nitrate, lead), pair the softener with a reverse osmosis system at the kitchen sink." },
      },
      {
        heading: "Sizing: why it matters",
        body: "A softener must be sized for your household's water usage and your water's hardness level. Too small a resin capacity means frequent regeneration and wasted salt. Too large means the resin goes weeks between regeneration, which can allow bacteria to grow in the stagnant brine. The calculation: daily grain capacity = household members × 75 gallons/person/day × hardness in GPG. Multiply by 7 to get the weekly capacity needed, and choose a system rated above that number.",
      },
    ],
  },
  {
    slug: "tthms-haloacetic-acids",
    title: "TTHMs and Haloacetic Acids: The Disinfection Byproducts in Your Tap Water",
    description: "Municipal water treatment creates its own contaminants. Here's what TTHMs and HAA5 are, why they form, and what actually removes them.",
    category: "Contaminants",
    readTime: "7 min read",
    date: "January 2026",
    featured: false,
    relatedSlugs: ["chromium-6-indiana-water", "how-ion-exchange-softening-works"],
    sections: [
      {
        heading: "Disinfection works — and creates a problem",
        body: "Chlorine is added to municipal water to kill bacteria, viruses, and protozoa. This is unambiguously good — waterborne disease was a major public health crisis before chlorination became standard practice. But chlorine is chemically reactive. When it contacts naturally occurring organic matter in source water (decaying leaves, plant material, algae), it forms a class of compounds called disinfection byproducts (DBPs). The two most regulated groups are trihalomethanes (TTHMs) and haloacetic acids (HAA5).",
        callout: { label: "The irony", text: "Safe municipal water requires disinfection. Disinfection creates byproducts. The byproducts carry their own health risks. This is a genuine regulatory tradeoff, and it's why DBPs appear in virtually every CCR report." },
      },
      {
        heading: "What are TTHMs?",
        body: "Total trihalomethanes (TTHMs) are a group of four compounds: chloroform, bromodichloromethane, dibromochloromethane, and bromoform. They form when chlorine reacts with humic and fulvic acids — the breakdown products of organic matter in source water. TTHMs are volatile, meaning they can off-gas from hot water (showers, hot tubs, dishwashers).",
        list: [
          "EPA MCL for TTHMs: 80 ppb (annual average)",
          "Most Indiana systems run 20-60 ppb — within legal limits but detectable",
          "TTHM levels spike in summer when source water has more organic matter and warmer temperatures speed the reaction",
          "Long-term exposure at legal TTHM levels has been associated with increased bladder cancer risk",
        ],
      },
      {
        heading: "What are haloacetic acids (HAA5)?",
        body: "HAA5 refers to five haloacetic acid compounds: monochloroacetic acid, dichloroacetic acid, trichloroacetic acid, monobromoacetic acid, and dibromoacetic acid. Like TTHMs, they form when chlorine reacts with organic matter, but HAAs are not volatile — they stay dissolved in the water rather than gassing off.",
        list: [
          "EPA MCL for HAA5: 60 ppb (annual average)",
          "HAAs are drinking-water concerns, not showering concerns (unlike TTHMs)",
          "Research has linked HAA exposure to increased miscarriage risk and neural tube defects in pregnancy",
        ],
      },
      {
        heading: "Why do levels vary seasonally?",
        body: "Summer CCR readings almost always show higher DBP levels than winter readings. The reason: warm water speeds up the chemical reaction between chlorine and organic matter, and summer algae blooms increase the organic load in reservoirs and rivers. Utilities adjust chlorine dosing seasonally, but they can only reduce it so much without risking bacterial breakthrough.",
      },
      {
        heading: "What removes TTHMs and HAAs?",
        body: "Both compound classes are effectively removed by activated carbon.",
        list: [
          "Granular activated carbon (GAC) whole-home systems remove TTHMs and HAAs at the point of entry. All taps benefit.",
          "Carbon block pitcher filters (like Brita) reduce DBPs at the point of use but don't help with showering exposure.",
          "Reverse osmosis systems typically include a carbon pre-filter and remove TTHMs and HAAs as part of their full treatment profile.",
          "Boiling does not remove TTHMs — it actually concentrates them as water evaporates. Boiling eliminates biological contamination only.",
          "Softeners do not remove TTHMs or HAAs.",
        ],
        callout: { label: "Recommendation", text: "If your CCR shows TTHMs above 40 ppb or HAAs above 30 ppb, a whole-home activated carbon system is the most comprehensive solution. It removes DBPs at every tap and shower, not just the kitchen. A 5-stage RO adds a second barrier for drinking water." },
      },
      {
        heading: "Chloramines: a different disinfectant, same general concern",
        body: "Some utilities (including parts of Indianapolis and Grand Rapids) have switched from free chlorine to chloramines (chlorine combined with ammonia) as a secondary disinfectant. Chloramines produce fewer TTHMs but more iodoacids and other DBPs. Chloramines also do not gas off easily, meaning they persist longer in plumbing. Standard activated carbon does not remove chloramines well — catalytic carbon is more effective. If your utility uses chloramines (check your CCR), make sure any carbon system you install uses catalytic carbon media.",
      },
    ],
  },
  {
    slug: "water-hardness-gpg-explained",
    title: "Water Hardness Explained: GPG, TDS, and What It Means for Your Home",
    description: "What hardness actually measures, how GPG and TDS differ, where Indiana and Michigan cities rank, and what happens at each hardness level.",
    category: "Science",
    readTime: "6 min read",
    date: "December 2025",
    featured: false,
    relatedSlugs: ["how-ion-exchange-softening-works", "softener-vs-no-salt-conditioning"],
    sections: [
      {
        heading: "What water hardness actually measures",
        body: "Water hardness measures the concentration of dissolved calcium and magnesium ions in water. These minerals are present in almost all groundwater because water naturally dissolves them from limestone, dolomite, and chalk rock as it moves through the ground. The more limestone it contacts, the harder the water. Indiana sits on a particularly thick limestone belt, which is why Indiana water is among the hardest in the country.",
      },
      {
        heading: "GPG vs. ppm vs. mg/L",
        body: "Hardness is measured in three common units that can cause confusion:",
        list: [
          "GPG (grains per gallon): The standard unit in the water treatment industry. 1 grain = 64.8 milligrams. This is the unit you'll see on softener labels.",
          "ppm (parts per million): Used interchangeably with mg/L. 1 GPG = 17.1 ppm.",
          "mg/L (milligrams per liter): Same as ppm for water. Used in scientific literature and utility reports.",
          "To convert: ppm ÷ 17.1 = GPG. A CCR listing 340 ppm hardness = 20 GPG.",
        ],
        callout: { label: "Quick reference", text: "0-3 GPG: Soft. 4-7 GPG: Moderately soft. 8-12 GPG: Moderately hard. 13-18 GPG: Hard. 19-25 GPG: Very hard. 25+ GPG: Extremely hard (rare in municipal supply)." },
      },
      {
        heading: "Hardness by city — Indiana and Michigan",
        body: "Based on Aqua Otter's in-home water testing across our service area:",
        list: [
          "Fort Wayne, IN: 22 GPG (among the highest in the state)",
          "Zionsville, IN: 21 GPG",
          "Noblesville, IN / Westfield, IN: 20 GPG",
          "Fishers, IN / Carmel, IN: 19 GPG",
          "Indianapolis, IN: 17 GPG",
          "South Bend, IN: 16 GPG",
          "Ann Arbor, MI: 10 GPG",
          "Grand Rapids, MI: 8 GPG",
          "Detroit Metro (GLWA): 7 GPG",
          "Lansing, MI: 6 GPG",
        ],
      },
      {
        heading: "What happens at each hardness level",
        body: "The effects of hard water compound over time. At moderate levels you might notice soap scum and water spots. At high levels (15+ GPG), the damage becomes measurable.",
        list: [
          "8-12 GPG: Visible water spots on glass and fixtures. Soap lather reduced. Minor scale on heating elements.",
          "13-18 GPG: Scale building inside pipes and water heater over years. Significant soap film. Skin dryness noticeable.",
          "18-22 GPG: Rapid scale accumulation. Water heater loses efficiency measurably within 2-3 years. Appliance lifespan shortened. Showerheads may clog within months.",
          "22+ GPG: Severe scale. Fixtures may show white deposits within weeks of cleaning. Softener recommended for both home protection and appliance warranty preservation.",
        ],
      },
      {
        heading: "TDS: not the same as hardness",
        body: "Total dissolved solids (TDS) is a broader measurement of everything dissolved in water — minerals, salts, metals, organic compounds. Hardness (calcium and magnesium) is a component of TDS, but TDS includes much more. A high TDS reading doesn't mean the water is hard, and a softener won't significantly lower TDS because it trades calcium and magnesium for sodium. For low TDS at the kitchen tap, a reverse osmosis system is needed.",
      },
      {
        heading: "Temporary vs. permanent hardness",
        body: "Temporary hardness is caused by calcium bicarbonate (Ca(HCO₃)₂) and can be removed by boiling — the bicarbonate decomposes and calcium carbonate precipitates out. This is the white scale you see in a kettle. Permanent hardness is caused by calcium sulfate and magnesium sulfate, and boiling doesn't remove it. Most Indiana groundwater contains both forms, but ion exchange softening removes both regardless of form.",
      },
    ],
  },
  {
    slug: "softener-vs-no-salt-conditioning",
    title: "Salt-Based Softener vs. No-Salt Conditioning: An Honest Comparison",
    description: "Both systems treat hard water but they work completely differently. Here's when each one is right, and the marketing claims you should ignore.",
    category: "Systems",
    readTime: "8 min read",
    date: "November 2025",
    featured: false,
    relatedSlugs: ["how-ion-exchange-softening-works", "water-hardness-gpg-explained"],
    sections: [
      {
        heading: "The fundamental difference",
        body: "A salt-based water softener removes calcium and magnesium ions from the water entirely through ion exchange. The minerals are physically taken out of the water and replaced with sodium. A no-salt conditioner — whether TAC (template-assisted crystallization), phosphate sequestration, or electromagnetic — does not remove the minerals. It changes how the minerals behave, preventing them from forming the hard scale deposits that cause problems. The minerals remain in the water.",
        callout: { label: "The key word", text: "Softeners make water soft. Conditioners make water less scale-forming. Different outcome, different use cases." },
      },
      {
        heading: "How TAC (no-salt) conditioning works",
        body: "The most scientifically validated no-salt approach is template-assisted crystallization. Water flows through a catalytic media (typically polymer beads with nucleation sites). Calcium and magnesium ions are converted from their dissolved ionic form into microscopic calcite and aragonite crystals. These micro-crystals don't adhere to pipes, heating elements, or fixtures — they pass through the plumbing system and go down the drain. The minerals are still in the water; they've just been converted to a physical form that doesn't stick.",
      },
      {
        heading: "How phosphate sequestration works",
        body: "The Quintex 5 and similar cartridge systems use food-grade polyphosphate. Phosphate molecules coat calcium and magnesium ions, essentially surrounding them and preventing them from crystallizing into scale. This is called threshold inhibition. The minerals are still in the water but can't build up on surfaces. Polyphosphate systems are popular for condos and apartments because they require no drain, no backwash, and minimal space. Cartridges need replacement annually.",
      },
      {
        heading: "When a salt-based softener is the right answer",
        body: "Salt softeners are definitively better in certain conditions:",
        list: [
          "Water hardness above 15 GPG: At very high hardness levels, no-salt technologies struggle to keep up. TAC systems are typically rated to 25 GPG, but effectiveness decreases at the high end. Salt softeners handle any hardness level.",
          "Significant iron in the water: A properly sized softener will incidentally remove low levels of dissolved iron. No-salt systems don't.",
          "Eczema, psoriasis, or serious skin conditions: Removing the minerals entirely produces genuinely soft water that makes a measurable difference in skin feel and condition.",
          "Appliance warranty requirements: Some water heater and appliance manufacturers require verified soft water (0 GPG) to honor warranties. Only a salt softener delivers this.",
          "Existing severe scale buildup: Softened water will slowly reverse existing scale. Conditioners prevent new scale but don't actively clear what's already there.",
        ],
      },
      {
        heading: "When no-salt is the right answer",
        body: "No-salt conditioning makes sense in specific situations:",
        list: [
          "Low-to-moderate hardness (under 12 GPG): Cities like Grand Rapids (8 GPG), Detroit (7 GPG), Lansing (6 GPG), or Nashville (5 GPG). At these levels, no-salt does the job and the cost-benefit of a full softener is harder to justify.",
          "Condo or apartment installation: No drain line required for phosphate systems. Salt softeners need a drain for backwash.",
          "HOA restrictions: Some HOAs ban salt-discharge water softeners over environmental concerns. Polyphosphate and TAC systems have no such restrictions.",
          "Health concern about sodium: Softened water adds approximately 8 mg of sodium per 8oz glass for every GPG of hardness removed. At 20 GPG, that's 160 mg per glass — relevant for those on strict sodium restriction.",
          "Environmental preference: No-salt systems use no salt and produce no brine discharge. This is a legitimate environmental consideration.",
        ],
      },
      {
        heading: "The marketing claims to ignore",
        body: "The no-salt category has more marketing noise than almost any segment of water treatment. Claims to be skeptical of:",
        list: [
          "'Magnetic' and 'electronic' descalers: No peer-reviewed evidence supports magnetic or electronic devices changing water hardness or scale formation in plumbing.",
          "'Completely salt-free, works like a softener': No-salt does not produce soft water. It prevents scale. These are different claims.",
          "'Removes hardness without removing minerals': This is accurate for TAC and phosphate systems — but also means the water is technically still hard. For most applications this is fine; for laundry whitening and skin feel it matters.",
          "Water softener manufacturers claiming no-salt 'doesn't work': It works — just differently and for different situations.",
        ],
        callout: { label: "Our position", text: "We install both salt and no-salt systems because we believe in recommending what's right for the situation. We'll tell you honestly which one fits your water chemistry, your home, and your priorities." },
      },
    ],
  },
  {
    slug: "whole-home-filtration-guide",
    title: "Whole-Home Filtration: What It Covers, What It Doesn't, and How to Choose",
    description: "A point-of-entry filtration system treats water before it reaches any tap. Here's what different whole-home systems target and how to match the system to your water.",
    category: "Systems",
    readTime: "7 min read",
    date: "October 2025",
    featured: false,
    relatedSlugs: ["pfas-michigan-water", "tthms-haloacetic-acids"],
    sections: [
      {
        heading: "Point-of-entry vs. point-of-use",
        body: "Water treatment systems are categorized by where they sit in the plumbing. Point-of-use (POU) systems treat water at one outlet — typically the kitchen sink. Reverse osmosis systems and pitcher filters are examples. Point-of-entry (POE) systems install on the main water line coming into the house, before it splits to serve individual fixtures. Every tap, shower, bathtub, washing machine, and refrigerator water line gets treated water.",
        callout: { label: "When whole-home matters", text: "For concerns like PFAS, chlorine byproducts, and VOCs — where you absorb contaminants through showering and skin contact, not just drinking — point-of-entry treatment is more complete than a kitchen filter." },
      },
      {
        heading: "Activated carbon: the foundation of whole-home filtration",
        body: "Activated carbon is the most common whole-home filtration media. Carbon is highly porous — one pound of activated carbon has a surface area larger than a football field. Contaminants adsorb (bind) to the carbon surface as water passes through. Activated carbon is highly effective for:",
        list: [
          "Chlorine and chloramines",
          "TTHMs and haloacetic acids (disinfection byproducts)",
          "Volatile organic compounds (VOCs)",
          "PFAS (long-chain; less effective for short-chain without catalytic carbon)",
          "Pesticides and herbicides",
          "Hydrogen sulfide (rotten egg odor)",
          "General taste and odor improvement",
        ],
      },
      {
        heading: "What activated carbon doesn't remove",
        body: "Carbon has real limitations that are often glossed over in marketing:",
        list: [
          "Dissolved minerals (hardness, calcium, magnesium)",
          "Heavy metals (lead, chromium — except at trace levels)",
          "Nitrate and nitrite",
          "Fluoride",
          "Dissolved salts",
          "Bacteria and viruses (in standard carbon; some specialty impregnated carbons have bacteriostatic properties)",
        ],
      },
      {
        heading: "The AiO: carbon plus iron and sulfur removal",
        body: "The All-In-One (AiO) system combines activated carbon filtration with an air-injection oxidation stage. This makes it specifically suited for well water or city water with iron, manganese, or hydrogen sulfide in addition to chlorine concerns. The air pocket at the top of the vessel oxidizes dissolved iron from ferrous (dissolved) to ferric (solid) form, which the carbon media then captures.",
      },
      {
        heading: "Sizing and flow rate: the most important and most neglected spec",
        body: "A whole-home carbon system is only as good as its contact time — how long the water is in contact with the carbon media. Too high a flow rate, and water passes through before full adsorption happens. The system needs to be sized for the household's peak demand flow rate (typically 8-12 GPM for a 3-4 bathroom home) while maintaining adequate bed depth. Undersized systems provide inadequate treatment; oversized systems are unnecessarily expensive.",
      },
      {
        heading: "Carbon exhaustion and replacement",
        body: "Activated carbon has a finite adsorption capacity. Once all the adsorption sites are occupied, the carbon is exhausted and can no longer remove contaminants. At this point, channeling can occur — water finds pathways through the carbon bed without contacting media. Whole-home carbon systems should be sized and designed so the media is replaced before exhaustion. A properly sized system in a municipal water home typically needs media replacement every 3-5 years.",
      },
    ],
  },
];

export function getLibraryArticle(slug: string): LibraryArticle | null {
  return LIBRARY_ARTICLES.find(a => a.slug === slug) ?? null;
}

export const LIBRARY_CATEGORIES = ["Contaminants", "Science", "Systems", "Local Water", "Maintenance"] as const;
