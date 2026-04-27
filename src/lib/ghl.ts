const GHL_BASE = "https://services.leadconnectorhq.com";

function getEnv() {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) throw new Error("GHL env vars not set");
  return { apiKey, locationId };
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

export interface GHLContactInput {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  zip?: string;
  source?: string;
  concern?: string;
  waterSource?: string;
  timeWindow?: string;
  notes?: string;
  tags?: string[];
}

export async function createGHLContact(input: GHLContactInput): Promise<{ ok: boolean; contactId?: string; error?: string }> {
  const { apiKey, locationId } = getEnv();

  const { firstName, lastName } = input.name ? splitName(input.name) : { firstName: undefined, lastName: undefined };

  const customFields: Array<{ key: string; field_value: string }> = [];
  if (input.concern)     customFields.push({ key: "water_concern",  field_value: input.concern });
  if (input.waterSource) customFields.push({ key: "water_source",   field_value: input.waterSource });
  if (input.city)        customFields.push({ key: "city",           field_value: input.city });
  if (input.zip)         customFields.push({ key: "zip_code",       field_value: input.zip });
  if (input.timeWindow)  customFields.push({ key: "preferred_time", field_value: input.timeWindow });
  if (input.notes)       customFields.push({ key: "notes",          field_value: input.notes });

  const tags = ["aqua-otter-website", ...(input.tags ?? [])];
  if (input.source) tags.push(input.source);

  const body: Record<string, unknown> = {
    locationId,
    tags,
    source: input.source ?? "website",
  };
  if (firstName)            body.firstName = firstName;
  if (lastName)             body.lastName = lastName;
  if (input.email)          body.email = input.email;
  if (input.phone)          body.phone = input.phone;
  if (customFields.length)  body.customFields = customFields;

  const res = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[ghl] contact creation failed", res.status, text);
    return { ok: false, error: `GHL ${res.status}` };
  }

  const data = await res.json();
  return { ok: true, contactId: data?.contact?.id };
}
