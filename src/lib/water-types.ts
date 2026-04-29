// Type-only file safe to import from client components without pulling
// in the 16 MB EWG JSON.

export type EwgContaminant = {
  name: string;
  this_utility: string;
  legal_limit: string;
  health_guideline: string;
  times_above: string | null;
  effect: string | null;
};

export type WaterProfile = {
  zip: string;
  city: string;
  state: string;
  county: string;
  source: "Municipal" | "Well" | "Mix";
  hardness_gpg: number;
  chlorine_ppm: number;
  tds_ppm: number;
  iron_ppm: number;
  pH: number;
  contaminants_flagged: string[];
  notes: string;
  utility_name?: string;
  population_served?: number | null;
  exceedance_count?: number | null;
  ewg_contaminants?: EwgContaminant[];
};

export type HardnessLevel = {
  label: string;
  severity: "soft" | "moderate" | "hard" | "very-hard" | "extreme";
  color: string;
};

export function hardnessLevel(gpg: number): HardnessLevel {
  if (gpg >= 20) return { label: "Extremely Hard", severity: "extreme",   color: "#ef4444" };
  if (gpg >= 16) return { label: "Very Hard",      severity: "very-hard", color: "#f59e0b" };
  if (gpg >= 11) return { label: "Hard",           severity: "hard",      color: "#f59e0b" };
  if (gpg >= 7)  return { label: "Moderately Hard",severity: "moderate",  color: "#12BDFB" };
  return        { label: "Soft",                   severity: "soft",      color: "#22c55e" };
}
