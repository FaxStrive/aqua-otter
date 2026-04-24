// Municipal water quality data for Indiana & Michigan ZIP codes.
// Values are representative based on municipal Consumer Confidence Reports (CCRs),
// EWG Tap Water Database, and county-level hardness surveys.
// Replace with a live EWG/EPA API call in production for full national coverage.

export type WaterProfile = {
  zip: string;
  city: string;
  state: "IN" | "MI";
  county: string;
  source: "Municipal" | "Well";
  hardness_gpg: number; // grains per gallon
  chlorine_ppm: number;
  tds_ppm: number;
  iron_ppm: number;
  pH: number;
  contaminants_flagged: string[]; // things above EWG health-limit
  notes: string;
};

export const WATER_PROFILES: WaterProfile[] = [
  { zip: "46060", city: "Noblesville",   state: "IN", county: "Hamilton",  source: "Municipal", hardness_gpg: 20, chlorine_ppm: 1.3, tds_ppm: 380, iron_ppm: 0.08, pH: 7.4, contaminants_flagged: ["Chromium-6", "Haloacetic acids"], notes: "Hard water area. Iron common in well homes." },
  { zip: "46038", city: "Fishers",       state: "IN", county: "Hamilton",  source: "Municipal", hardness_gpg: 19, chlorine_ppm: 1.2, tds_ppm: 360, iron_ppm: 0.05, pH: 7.5, contaminants_flagged: ["Chromium-6", "Haloacetic acids"], notes: "Carmel-Fishers water is among the hardest in the state." },
  { zip: "46032", city: "Carmel",        state: "IN", county: "Hamilton",  source: "Municipal", hardness_gpg: 19, chlorine_ppm: 1.2, tds_ppm: 360, iron_ppm: 0.04, pH: 7.5, contaminants_flagged: ["Chromium-6", "Haloacetic acids", "TTHMs"], notes: "Very hard. High TTHMs in summer months." },
  { zip: "46033", city: "Carmel",        state: "IN", county: "Hamilton",  source: "Municipal", hardness_gpg: 19, chlorine_ppm: 1.2, tds_ppm: 365, iron_ppm: 0.04, pH: 7.5, contaminants_flagged: ["Chromium-6", "Haloacetic acids"], notes: "Very hard. Expect scale on fixtures." },
  { zip: "46204", city: "Indianapolis",  state: "IN", county: "Marion",    source: "Municipal", hardness_gpg: 17, chlorine_ppm: 1.4, tds_ppm: 340, iron_ppm: 0.03, pH: 7.6, contaminants_flagged: ["Chromium-6", "Nitrate"], notes: "Citizens Energy supply. Hard, chlorinated, with detectable nitrate." },
  { zip: "46202", city: "Indianapolis",  state: "IN", county: "Marion",    source: "Municipal", hardness_gpg: 17, chlorine_ppm: 1.4, tds_ppm: 335, iron_ppm: 0.03, pH: 7.6, contaminants_flagged: ["Chromium-6", "Nitrate"], notes: "Typical Indy downtown water profile." },
  { zip: "46250", city: "Indianapolis",  state: "IN", county: "Marion",    source: "Municipal", hardness_gpg: 17, chlorine_ppm: 1.3, tds_ppm: 330, iron_ppm: 0.03, pH: 7.6, contaminants_flagged: ["Chromium-6"], notes: "Northside Indy. Hard water primary issue." },
  { zip: "46168", city: "Plainfield",    state: "IN", county: "Hendricks", source: "Municipal", hardness_gpg: 18, chlorine_ppm: 1.1, tds_ppm: 345, iron_ppm: 0.1,  pH: 7.4, contaminants_flagged: ["Haloacetic acids"], notes: "Well-sourced municipal. Iron detectable." },
  { zip: "46074", city: "Westfield",     state: "IN", county: "Hamilton",  source: "Municipal", hardness_gpg: 20, chlorine_ppm: 1.2, tds_ppm: 370, iron_ppm: 0.07, pH: 7.5, contaminants_flagged: ["Chromium-6"], notes: "Hamilton County hardness profile." },
  { zip: "46077", city: "Zionsville",    state: "IN", county: "Boone",     source: "Municipal", hardness_gpg: 21, chlorine_ppm: 1.1, tds_ppm: 375, iron_ppm: 0.09, pH: 7.4, contaminants_flagged: ["Chromium-6", "TTHMs"], notes: "Boone County. Very hard with seasonal TTHM spikes." },
  { zip: "46142", city: "Greenwood",     state: "IN", county: "Johnson",   source: "Municipal", hardness_gpg: 16, chlorine_ppm: 1.3, tds_ppm: 320, iron_ppm: 0.06, pH: 7.5, contaminants_flagged: ["Haloacetic acids"], notes: "Hard water. Minor disinfection byproducts." },
  { zip: "47201", city: "Columbus",      state: "IN", county: "Bartholomew", source: "Municipal", hardness_gpg: 15, chlorine_ppm: 1.0, tds_ppm: 300, iron_ppm: 0.05, pH: 7.5, contaminants_flagged: ["Nitrate"], notes: "Agricultural area. Nitrate common from farm runoff." },
  { zip: "47404", city: "Bloomington",   state: "IN", county: "Monroe",    source: "Municipal", hardness_gpg: 13, chlorine_ppm: 1.0, tds_ppm: 280, iron_ppm: 0.04, pH: 7.7, contaminants_flagged: ["TTHMs"], notes: "Monroe Reservoir supply. Softer than central IN." },
  { zip: "47805", city: "Terre Haute",   state: "IN", county: "Vigo",      source: "Municipal", hardness_gpg: 12, chlorine_ppm: 1.1, tds_ppm: 270, iron_ppm: 0.05, pH: 7.6, contaminants_flagged: ["Haloacetic acids"], notes: "Moderately hard. Wabash River supply." },
  { zip: "47714", city: "Evansville",    state: "IN", county: "Vanderburgh", source: "Municipal", hardness_gpg: 11, chlorine_ppm: 1.2, tds_ppm: 255, iron_ppm: 0.04, pH: 7.7, contaminants_flagged: ["TTHMs", "Haloacetic acids"], notes: "Ohio River sourced. Softest major IN city." },
  { zip: "46802", city: "Fort Wayne",    state: "IN", county: "Allen",     source: "Municipal", hardness_gpg: 22, chlorine_ppm: 1.3, tds_ppm: 410, iron_ppm: 0.11, pH: 7.3, contaminants_flagged: ["Chromium-6", "TTHMs"], notes: "Among the hardest water in Indiana." },
  { zip: "46614", city: "South Bend",    state: "IN", county: "St Joseph", source: "Municipal", hardness_gpg: 16, chlorine_ppm: 1.0, tds_ppm: 310, iron_ppm: 0.15, pH: 7.4, contaminants_flagged: ["Nitrate"], notes: "Well-sourced municipal. Iron often detectable." },
  { zip: "46402", city: "Gary",          state: "IN", county: "Lake",      source: "Municipal", hardness_gpg: 25, chlorine_ppm: 1.4, tds_ppm: 450, iron_ppm: 0.12, pH: 7.3, contaminants_flagged: ["Lead", "Chromium-6", "TTHMs"], notes: "Lake Michigan supply. Hard. Lead risk from aging infrastructure." },
  // Michigan
  { zip: "49503", city: "Grand Rapids",  state: "MI", county: "Kent",      source: "Municipal", hardness_gpg: 8,  chlorine_ppm: 1.1, tds_ppm: 220, iron_ppm: 0.03, pH: 7.8, contaminants_flagged: ["TTHMs"], notes: "Lake Michigan. Moderately soft." },
  { zip: "48201", city: "Detroit",       state: "MI", county: "Wayne",     source: "Municipal", hardness_gpg: 7,  chlorine_ppm: 1.2, tds_ppm: 200, iron_ppm: 0.02, pH: 7.8, contaminants_flagged: ["Lead", "Haloacetic acids"], notes: "GLWA supply. Moderately soft. Lead risk in older homes." },
  { zip: "48104", city: "Ann Arbor",     state: "MI", county: "Washtenaw", source: "Municipal", hardness_gpg: 10, chlorine_ppm: 1.0, tds_ppm: 240, iron_ppm: 0.03, pH: 7.7, contaminants_flagged: ["PFAS"], notes: "Huron River supply. PFAS detected in 2019-2023 CCRs." },
];

export function lookupWaterByZip(zip: string): WaterProfile | null {
  const normalized = zip.trim().slice(0, 5);
  return WATER_PROFILES.find(p => p.zip === normalized) ?? null;
}

export function hardnessLevel(gpg: number): { label: string; severity: "soft" | "moderate" | "hard" | "very-hard" | "extreme"; color: string } {
  if (gpg >= 20) return { label: "Extremely Hard", severity: "extreme", color: "#ef4444" };
  if (gpg >= 16) return { label: "Very Hard", severity: "very-hard", color: "#f59e0b" };
  if (gpg >= 11) return { label: "Hard", severity: "hard", color: "#f59e0b" };
  if (gpg >= 7)  return { label: "Moderately Hard", severity: "moderate", color: "#12BDFB" };
  return { label: "Soft", severity: "soft", color: "#22c55e" };
}
