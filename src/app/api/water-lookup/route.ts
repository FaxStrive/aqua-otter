import { NextResponse } from "next/server";
import { lookupWaterByZip, hardnessLevel, isInServiceArea } from "@/lib/water-data";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const zip = (url.searchParams.get("zip") ?? "").trim().slice(0, 5);

  if (!/^\d{5}$/.test(zip)) {
    return NextResponse.json({ ok: false, error: "invalid_zip" }, { status: 400 });
  }

  const profile = lookupWaterByZip(zip);
  if (!profile) {
    return NextResponse.json({ ok: false, error: "not_found", zip, in_service_area: isInServiceArea(zip) }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    profile,
    hardness: hardnessLevel(profile.hardness_gpg),
  });
}
