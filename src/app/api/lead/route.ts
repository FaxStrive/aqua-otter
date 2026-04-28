import { NextResponse } from "next/server";
import { createGHLContact } from "@/lib/ghl";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, city, zip, source, concern, waterSource, timeWindow, notes } = body ?? {};

    // At least one contact identifier required
    if (!email && !phone) {
      return NextResponse.json({ ok: false, error: "email or phone required" }, { status: 400 });
    }
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // Source → workflow trigger tag map. Each tag fires a specific GHL workflow
    // (e.g. `guide-10-signs` → workflow that emails the PDF guide).
    const sourceTagMap: Record<string, string[]> = {
      "exit-intent-guide":   ["guide-10-signs", "lead-magnet", "needs-nurture"],
      "homepage-form":       ["website-form", "needs-followup"],
      "service-page":        ["service-inquiry", "needs-followup"],
      "free-water-test":     ["free-water-test-request", "hot-lead"],
      "quiz-funnel":         ["quiz-completed", "hot-lead"],
      "city-page":           ["local-inquiry", "needs-followup"],
    };
    const extraTags = source && sourceTagMap[source] ? sourceTagMap[source] : [];

    const result = await createGHLContact({ name, email, phone, city, zip, source, concern, waterSource, timeWindow, notes, tags: extraTags });

    if (!result.ok) {
      console.error("[lead] GHL error", result.error);
      return NextResponse.json({ ok: false, error: "crm_error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, contactId: result.contactId });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
