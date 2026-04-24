import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source, zip, meta } = body ?? {};

    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // MVP: log it. Production: pipe to Resend + CRM (HubSpot/Airtable).
    console.log("[lead]", {
      at: new Date().toISOString(),
      email,
      source: source ?? "unknown",
      zip: zip ?? null,
      meta: meta ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
