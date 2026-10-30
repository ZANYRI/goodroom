import { NextResponse } from "next/server";
import { getLiveYandexReviews } from "@/lib/yandex-reviews";

export async function GET() {
  const data = await getLiveYandexReviews();
  return NextResponse.json(
    { ok: true, data },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
