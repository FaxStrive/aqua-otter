import { NextResponse } from "next/server";

// Google Places API — "Place Details" endpoint.
// Docs: https://developers.google.com/maps/documentation/places/web-service/details
// Returns the 5 most recent reviews for our business place ID.
// Cached for 24h — Google only updates review data daily anyway.

export const runtime = "nodejs";
export const revalidate = 86400; // 24h

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const MIN_RATING = 5;

type GoogleReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

type PlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
};

export async function GET() {
  if (!PLACE_ID || !API_KEY) {
    return NextResponse.json({
      ok: false,
      error: "not_configured",
      message: "Set GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY in .env.local to enable live reviews.",
      reviews: [],
      rating: null,
      total: null,
    }, { status: 200 });
  }

  try {
    const params = new URLSearchParams({
      place_id: PLACE_ID,
      key: API_KEY,
      fields: "name,rating,user_ratings_total,reviews",
      reviews_sort: "newest",
      reviews_no_translations: "true",
    });
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);
    const data = (await res.json()) as PlaceDetailsResponse;
    if (data.status !== "OK") {
      return NextResponse.json({ ok: false, error: data.status, message: data.error_message ?? null, reviews: [], rating: null, total: null });
    }

    const filtered = (data.result?.reviews ?? [])
      .filter(r => r.rating >= MIN_RATING)
      .slice(0, 5)
      .map(r => ({
        author: r.author_name,
        avatar: r.profile_photo_url ?? null,
        rating: r.rating,
        when: r.relative_time_description,
        text: r.text,
        timestamp: r.time,
      }));

    return NextResponse.json({
      ok: true,
      reviews: filtered,
      rating: data.result?.rating ?? null,
      total: data.result?.user_ratings_total ?? null,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[google-reviews]", err);
    return NextResponse.json({ ok: false, error: "fetch_failed", reviews: [], rating: null, total: null }, { status: 500 });
  }
}
