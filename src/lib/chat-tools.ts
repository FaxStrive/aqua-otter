import type { Tool, ToolUseBlock } from "@anthropic-ai/sdk/resources/messages";
import { lookupWaterByZip, hardnessLevel } from "./water-data";

export const CHAT_TOOLS: Tool[] = [
  {
    name: "lookup_water_by_zip",
    description:
      "Look up the municipal water quality profile for a US ZIP code. Returns hardness (GPG), chlorine, TDS, iron, pH, and any EWG-flagged contaminants. Use whenever the user mentions their ZIP or asks 'what's in my water'. Prefer this over answering from memory.",
    input_schema: {
      type: "object",
      properties: {
        zip: {
          type: "string",
          description: "5-digit US ZIP code, e.g. '46060'.",
        },
      },
      required: ["zip"],
    },
  },
  {
    name: "recommend_system",
    description:
      "Given a homeowner's water concerns and context, return a prioritized list of systems to recommend. Use this after you've identified their main problems.",
    input_schema: {
      type: "object",
      properties: {
        concerns: {
          type: "array",
          items: { type: "string" },
          description:
            "List of concerns. Valid values: 'scale', 'dry_skin', 'bad_taste', 'chlorine', 'iron_stains', 'sulfur_smell', 'bacteria', 'lead', 'pfas', 'nitrate', 'hardness', 'bottled_water', 'appliance_damage'.",
        },
        has_well: {
          type: "boolean",
          description: "True if the home is on well water, false if on city/municipal supply.",
        },
        household_size: {
          type: "number",
          description: "Number of people in the household.",
        },
        hardness_gpg: {
          type: "number",
          description: "Water hardness in grains per gallon, if known. Optional.",
        },
      },
      required: ["concerns", "has_well", "household_size"],
    },
  },
  {
    name: "estimate_savings",
    description:
      "Estimate the 5-year dollar savings a household would see with an Aqua Otter system. Returns annual and 5-year totals with a line-item breakdown.",
    input_schema: {
      type: "object",
      properties: {
        household: { type: "number", description: "Number of people in the household." },
        bottled_weekly: { type: "number", description: "Dollars spent per week on bottled water." },
        detergent_monthly: { type: "number", description: "Dollars spent per month on detergent, soap, shampoo." },
        cleaning_hours: { type: "number", description: "Hours per month spent cleaning water scale." },
        hot_water_bill: { type: "number", description: "Annual hot water energy bill in dollars." },
      },
      required: ["household", "bottled_weekly", "detergent_monthly", "cleaning_hours", "hot_water_bill"],
    },
  },
  {
    name: "book_water_test",
    description:
      "Record a lead for a free in-home water test. Only call this after the user has explicitly agreed to book and you have their name, email, and ZIP at minimum.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name." },
        email: { type: "string", description: "Email address." },
        zip: { type: "string", description: "5-digit ZIP." },
        phone: { type: "string", description: "Phone number. Optional but preferred." },
        time_window: { type: "string", description: "Preferred time window, e.g. 'weekday mornings', 'Saturday after 2pm'. Optional." },
        notes: { type: "string", description: "Any extra context from the conversation. Optional." },
      },
      required: ["name", "email", "zip"],
    },
  },
];

// ────────────────────────────────────────────────────────────────
// Tool executors — pure functions that return JSON-serializable data.
// Data shape matches the `<ToolResultCard>` renderers on the client.
// ────────────────────────────────────────────────────────────────

export type ToolResultPayload =
  | { kind: "water_profile"; ok: boolean; profile?: ReturnType<typeof lookupWaterByZip>; hardnessLabel?: string; hardnessColor?: string; zip: string; error?: string }
  | { kind: "recommendation"; systems: RecSystem[]; rationale: string }
  | { kind: "savings"; annual: number; fiveYear: number; breakdown: Record<string, number>; payback_years: number }
  | { kind: "booking"; ok: boolean; name: string; email: string; zip: string; error?: string };

type RecSystem = { id: string; name: string; why: string; priority: number };

export async function executeTool(toolName: string, input: Record<string, unknown>): Promise<ToolResultPayload> {
  switch (toolName) {
    case "lookup_water_by_zip": {
      const zip = String(input.zip ?? "").trim();
      const profile = lookupWaterByZip(zip);
      if (!profile) {
        return { kind: "water_profile", ok: false, zip, error: "No cached profile for that ZIP. A free in-home test is the fastest way to get real data." };
      }
      const hl = hardnessLevel(profile.hardness_gpg);
      return { kind: "water_profile", ok: true, profile, hardnessLabel: hl.label, hardnessColor: hl.color, zip };
    }

    case "recommend_system": {
      const concerns = (input.concerns as string[]) ?? [];
      const hasWell = Boolean(input.has_well);
      const hardness = (input.hardness_gpg as number) ?? 0;
      const systems: RecSystem[] = [];

      if (hasWell) {
        systems.push({
          id: "aio",
          name: "AiO Ozone Well Filtration",
          why: "You're on a well. AiO handles iron, sulfur, manganese, and bacteria in one tank using ozone injection — the foundation of any well water setup.",
          priority: 1,
        });
        if (concerns.includes("bacteria")) {
          systems.push({ id: "uv", name: "UV Purification", why: "For bacterial disinfection on top of the AiO. Essential if any coliform shows up on a test.", priority: 2 });
        }
      }

      if (hardness >= 11 || concerns.includes("scale") || concerns.includes("dry_skin") || concerns.includes("hardness") || concerns.includes("appliance_damage")) {
        systems.push({
          id: "softener",
          name: "Water Softener",
          why: `Your water is ${hardness ? `${hardness} GPG ` : ""}hard. A softener fixes scale, spots, dry skin, and protects appliances.`,
          priority: systems.length + 1,
        });
      }

      if (concerns.includes("chlorine") || concerns.includes("bad_taste") || concerns.includes("pfas") || concerns.includes("lead") || concerns.includes("nitrate")) {
        systems.push({
          id: "filtration",
          name: "Whole-Home Carbon Filtration",
          why: "Catalytic carbon handles chlorine, chloramine, taste, odor, and reduces some PFAS and VOCs across every tap in the home.",
          priority: systems.length + 1,
        });
      }

      if (concerns.includes("bottled_water") || concerns.includes("bad_taste") || concerns.includes("lead") || concerns.includes("pfas") || concerns.includes("nitrate")) {
        systems.push({
          id: "ro",
          name: "5-Stage Reverse Osmosis",
          why: "Under-sink RO with a dedicated faucet. 99% TDS removal including lead, PFAS, arsenic, and nitrate. Replaces the bottled water habit.",
          priority: systems.length + 1,
        });
      }

      const rationale =
        systems.length === 0
          ? "Your water may not need much treatment. A free test will confirm. If anything shows up, we'll match the exact system to the result."
          : `Based on what you told me, I'd start with ${systems.map(s => s.name).join(", then ")}. Every recommendation is confirmed by the in-home test before install.`;

      return { kind: "recommendation", systems, rationale };
    }

    case "estimate_savings": {
      const h = Number(input.household ?? 4);
      const bw = Number(input.bottled_weekly ?? 0);
      const dm = Number(input.detergent_monthly ?? 0);
      const ch = Number(input.cleaning_hours ?? 0);
      const hw = Number(input.hot_water_bill ?? 0);

      const bottled = bw * 52 * 0.95;
      const detergent = dm * 12 * 0.35;
      const cleaning = ch * 12 * 20 * 0.7;
      const energy = hw * 0.2;
      const appliance = h * 120;
      const annual = bottled + detergent + cleaning + energy + appliance;
      const fiveYear = annual * 5;
      const systemCost = 2800;
      const payback = annual > 0 ? +(systemCost / annual).toFixed(1) : 0;

      return {
        kind: "savings",
        annual: Math.round(annual),
        fiveYear: Math.round(fiveYear),
        breakdown: {
          bottled_water: Math.round(bottled),
          detergent: Math.round(detergent),
          cleaning_time: Math.round(cleaning),
          energy: Math.round(energy),
          appliance_life: Math.round(appliance),
        },
        payback_years: payback,
      };
    }

    case "book_water_test": {
      const name = String(input.name ?? "");
      const email = String(input.email ?? "");
      const zip = String(input.zip ?? "");
      if (!name || !email || !zip) {
        return { kind: "booking", ok: false, name, email, zip, error: "Need name, email, and ZIP to book." };
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return { kind: "booking", ok: false, name, email, zip, error: "That email looks off — want to try again?" };
      }
      // MVP: log server-side. Production: POST to CRM.
      console.log("[chat-booking]", { at: new Date().toISOString(), name, email, zip, phone: input.phone, time_window: input.time_window, notes: input.notes });
      return { kind: "booking", ok: true, name, email, zip };
    }

    default:
      return {
        kind: "recommendation",
        systems: [],
        rationale: `Unknown tool ${toolName}.`,
      };
  }
}

// Narrow helper — convert tool_use block into tool_result string for follow-up turn
export function stringifyToolResult(payload: ToolResultPayload): string {
  return JSON.stringify(payload);
}

export type { RecSystem };
export type AnthropicToolUseBlock = ToolUseBlock;
