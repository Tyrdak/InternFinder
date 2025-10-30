import { NextRequest, NextResponse } from "next/server";
import { theirStackSearch, cacheGetByBody, cacheSetByBody } from "@/src/lib/theirstack";
import config from "@/src/config.json";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.THEIRSTACK_API_KEY) {
      return NextResponse.json(
        { error: "Missing THEIRSTACK_API_KEY env var on server" },
        { status: 500 }
      );
    }
    const body = await req.json().catch(() => ({}));
    // Base filters: récupérés depuis src/config.json
    const baseBody = {
      limit: config.offers.limit,
      include_total_results: false,
      employment_statuses_or: config.offers.employmentStatuses,
      posted_at_max_age_days: config.offers.postedAtMaxAgeDays,
      ...body,
    };

    const cached = cacheGetByBody(baseBody as any);
    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const jobs = await theirStackSearch(baseBody as any);
    cacheSetByBody(baseBody as any, jobs);
    return NextResponse.json({ data: jobs });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}


