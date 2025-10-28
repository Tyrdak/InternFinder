import { NextRequest, NextResponse } from "next/server";
import { theirStackSearch, cacheGetByBody, cacheSetByBody, kvSetJob } from "@/src/lib/theirstack";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.THEIRSTACK_API_KEY) {
      return NextResponse.json(
        { error: "Missing THEIRSTACK_API_KEY env var on server" },
        { status: 500 }
      );
    }
    const body = await req.json().catch(() => ({}));
    // Base filters: internships only, limit 1 token → 1 offer
    const baseBody = {
      limit: 1,
      include_total_results: false,
      employment_statuses_or: ["internship"],
      posted_at_max_age_days: 30,
      ...body,
    };

    const cached = cacheGetByBody(baseBody as any);
    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const jobs = await theirStackSearch(baseBody as any);
    cacheSetByBody(baseBody as any, jobs);
    // Persist to KV if available
    for (const j of jobs) {
      await kvSetJob(j).catch(() => {});
    }
    return NextResponse.json({ data: jobs });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}


