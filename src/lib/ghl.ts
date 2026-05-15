// AquaOtter ↔ GoHighLevel integration.
//
// Creates or updates contacts directly via the GHL Contacts API using
// GHL_API_KEY + GHL_LOCATION_ID env vars. If a contact already exists for the
// given email/phone, GHL returns a 400 with the existing contact id in
// `meta.contactId` — we catch that and PUT-update the contact instead so every
// lead capture point reliably lands in GHL with the right tags + custom fields.

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

function buildBody(input: GHLContactInput, locationId: string) {
  const { firstName, lastName } = input.name
    ? splitName(input.name)
    : { firstName: undefined, lastName: undefined };

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
  if (firstName)           body.firstName = firstName;
  if (lastName)            body.lastName = lastName;
  if (input.email)         body.email = input.email;
  if (input.phone)         body.phone = input.phone;
  if (customFields.length) body.customFields = customFields;

  return body;
}

function authHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  } as const;
}

/**
 * Create a contact in GHL — or, if one already exists with the same
 * email/phone, update it instead so tags + custom fields get refreshed.
 */
export async function createGHLContact(
  input: GHLContactInput,
): Promise<{ ok: boolean; contactId?: string; error?: string }> {
  const { apiKey, locationId } = getEnv();
  const body = buildBody(input, locationId);

  try {
    const res = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: authHeaders(apiKey),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });

    if (res.ok) {
      const data = await res.json();
      return { ok: true, contactId: data?.contact?.id };
    }

    // GHL returns 400 + { meta: { contactId } } when a duplicate exists.
    // Update that contact so we don't lose tags / custom fields / notes.
    if (res.status === 400) {
      const errJson = await res.json().catch(() => null);
      const existingId: string | undefined = errJson?.meta?.contactId;
      if (existingId) {
        // PUT /contacts/:id — same body shape minus locationId.
        const updateBody = { ...body } as Record<string, unknown>;
        delete updateBody.locationId;
        const upd = await fetch(`${GHL_BASE}/contacts/${existingId}`, {
          method: "PUT",
          headers: authHeaders(apiKey),
          body: JSON.stringify(updateBody),
          signal: AbortSignal.timeout(15_000),
        });
        if (upd.ok) return { ok: true, contactId: existingId };
        const text = await upd.text().catch(() => "");
        console.error("[ghl] contact update failed", upd.status, text);
        return { ok: false, contactId: existingId, error: `GHL update ${upd.status}` };
      }
      console.error("[ghl] contact create 400 (no meta.contactId)", errJson);
      return { ok: false, error: "GHL 400" };
    }

    const text = await res.text().catch(() => "");
    console.error("[ghl] contact creation failed", res.status, text);
    return { ok: false, error: `GHL ${res.status}` };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[ghl] request error", message);
    return { ok: false, error: message };
  }
}
