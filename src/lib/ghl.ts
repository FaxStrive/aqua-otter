// AquaOtter ↔ GoHighLevel integration.
//
// We POST leads to a GHL workflow webhook (no API key required — the URL
// itself is the secret). Their workflow is responsible for creating the
// contact, routing to the AI handler, and applying any downstream tags.
//
// We still pass `source` + `tags` + structured fields in the payload so the
// workflow can branch on them (e.g. "exit-intent-guide" leads vs.
// "free-water-test" leads).

const DEFAULT_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/lGY1i8kHWLp0Tmsp1HJ5/webhook-trigger/1c79ad02-9e0c-40d4-9a4d-510a90590a9f";

function getWebhookUrl(): string {
  return process.env.GHL_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
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

/**
 * Public function name is kept (createGHLContact) so existing callers don't
 * have to change. Under the hood it now fires the workflow webhook instead
 * of calling the GHL Contacts API directly.
 *
 * Returns { ok, contactId? } — contactId will be undefined since the
 * workflow webhook doesn't return one synchronously. Callers that depend on
 * a real contactId need to fetch it from the GHL workflow log if needed.
 */
export async function createGHLContact(
  input: GHLContactInput,
): Promise<{ ok: boolean; contactId?: string; error?: string }> {
  const webhookUrl = getWebhookUrl();

  const { firstName, lastName } = input.name
    ? splitName(input.name)
    : { firstName: undefined, lastName: undefined };

  // The workflow webhook accepts arbitrary JSON. We send a flat shape with
  // everything the AquaOtter team's workflow needs to (a) create the contact
  // with all the right fields, (b) route on `source`/`tags`, and (c) write
  // structured custom fields without parsing notes.
  const payload: Record<string, unknown> = {
    name: input.name,
    firstName,
    lastName,
    email: input.email,
    phone: input.phone,
    city: input.city,
    zip: input.zip,
    source: input.source ?? "website",
    tags: ["aqua-otter-website", ...(input.tags ?? []), ...(input.source ? [input.source] : [])],
    // Structured fields — let the workflow map these to GHL custom fields.
    water_concern: input.concern,
    water_source: input.waterSource,
    preferred_time: input.timeWindow,
    notes: input.notes,
    // Useful metadata for the workflow log
    submitted_at: new Date().toISOString(),
    site: "myaquaotter.com",
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Workflow webhooks should respond in well under 10s. Use 15s ceiling
      // so a slow GHL response doesn't kill our serverless function.
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[ghl-webhook] non-2xx response", res.status, text);
      return { ok: false, error: `GHL ${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[ghl-webhook] post failed", message);
    return { ok: false, error: message };
  }
}
