export type TheirStackJob = {
  id: number | string;
  job_title: string;
  date_posted?: string;
  url?: string;
  final_url?: string;
  source_url?: string;
  remote?: boolean;
  salary_string?: string;
  seniority?: string;
  company_domain?: string;
  description?: string;
  locations?: Array<{ display_name?: string }>;
  company_object?: { name?: string; logo?: string; domain?: string };
};

export type TheirStackSearchBody = {
  page?: number;
  limit?: number;
  posted_at_max_age_days?: number | null;
  job_country_code_or?: string[];
  employment_statuses_or?: ("internship" | "full_time" | "part_time" | "temporary" | "contract")[];
  job_title_or?: string[];
  job_location_pattern_or?: string[];
  include_total_results?: boolean;
  blur_company_data?: boolean;
  job_id_or?: Array<number | string>;
};

export async function theirStackSearch(body: TheirStackSearchBody): Promise<TheirStackJob[]> {
  const apiKey = process.env.THEIRSTACK_API_KEY;
  if (!apiKey) {
    throw new Error("Missing THEIRSTACK_API_KEY env var");
  }
  const res = await fetch("https://api.theirstack.com/v1/jobs/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    // Next.js caching off for dynamic search
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TheirStack error ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json?.data ?? [];
}

// Simple in-memory cache (per server instance)
type CacheEntry = { jobs: TheirStackJob[]; expiresAt: number };
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const searchCache = new Map<string, CacheEntry>();
const jobCache = new Map<string | number, TheirStackJob>();

export function cacheGetByBody(body: TheirStackSearchBody): TheirStackJob[] | null {
  const key = JSON.stringify(body);
  const e = searchCache.get(key);
  if (!e) return null;
  if (Date.now() > e.expiresAt) {
    searchCache.delete(key);
    return null;
  }
  return e.jobs;
}

export function cacheSetByBody(body: TheirStackSearchBody, jobs: TheirStackJob[]): void {
  const key = JSON.stringify(body);
  searchCache.set(key, { jobs, expiresAt: Date.now() + CACHE_TTL_MS });
  for (const j of jobs) jobCache.set(j.id, j);
}

export function cacheGetJobById(id: string | number): TheirStackJob | undefined {
  return jobCache.get(id);
}

// Optional persistent KV (Vercel KV REST)
async function kvFetch(path: string, init?: RequestInit): Promise<Response | null> {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!base || !token) return null;
  return fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

export async function kvSetJob(job: TheirStackJob): Promise<void> {
  const res = await kvFetch(`/set/theirstack:job:${job.id}`, {
    method: "POST",
    body: JSON.stringify(job),
  });
  if (!res) return; // KV not configured
}

export async function kvGetJob(id: string | number): Promise<TheirStackJob | null> {
  const res = await kvFetch(`/get/theirstack:job:${id}`);
  if (!res) return null;
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return (data?.result as TheirStackJob) ?? null;
}


