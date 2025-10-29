/**
 * Représente une offre d’emploi issue de l’API TheirStack.
 */

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
  company_object?: {
    name?: string;
    logo?: string;
    domain?: string;
  };
};

/**
 * Corps de requête pour rechercher des offres via TheirStack.
 */
export type TheirStackSearchBody = {
  page?: number;
  limit?: number;
  posted_at_max_age_days?: number | null;
  job_country_code_or?: string[];
  employment_statuses_or?: Array<
    "internship" | "full_time" | "part_time" | "temporary" | "contract"
  >;
  job_title_or?: string[];
  job_location_pattern_or?: string[];
  include_total_results?: boolean;
  blur_company_data?: boolean;
  job_id_or?: Array<number | string>;
};

// ----------------------------------------------------
// ⚙️ API FETCHER PRINCIPAL
// ----------------------------------------------------

/**
 * Effectue une recherche d'offres via l’API TheirStack.
 * @throws {Error} si la clé d’API est absente ou si la requête échoue.
 */
export async function theirStackSearch(
  body: TheirStackSearchBody
): Promise<TheirStackJob[]> {
  const apiKey = process.env.THEIRSTACK_API_KEY;
  if (!apiKey) {
    throw new Error("❌ Missing THEIRSTACK_API_KEY environment variable.");
  }

  const res = await fetch("https://api.theirstack.com/v1/jobs/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    // Désactive le cache Next.js (résultats dynamiques)
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`TheirStack API error ${res.status}: ${errorText}`);
  }

  const json = await res.json().catch(() => null);
  if (!json || !Array.isArray(json.data)) {
    throw new Error("Invalid response format from TheirStack API");
  }

  return json.data as TheirStackJob[];
}

// ----------------------------------------------------
// 🧠 CACHE MÉMOIRE LOCAL (serveur)
// ----------------------------------------------------

type CacheEntry = {
  jobs: TheirStackJob[];
  expiresAt: number;
};

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 heure
const searchCache = new Map<string, CacheEntry>();
const jobCache = new Map<string | number, TheirStackJob>();

/**
 * Génère une clé de cache stable à partir du corps de requête.
 */
function makeCacheKey(body: TheirStackSearchBody): string {
  return JSON.stringify(
    Object.fromEntries(Object.entries(body).sort()) // trie les clés pour éviter les variations
  );
}

/**
 * Récupère une liste d’offres depuis le cache en mémoire, si elle est encore valide.
 */
export function cacheGetByBody(
  body: TheirStackSearchBody
): TheirStackJob[] | null {
  const key = makeCacheKey(body);
  const entry = searchCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    searchCache.delete(key);
    return null;
  }

  return entry.jobs;
}

/**
 * Met en cache une liste d’offres en mémoire, et indexe chaque offre individuellement.
 */
export function cacheSetByBody(
  body: TheirStackSearchBody,
  jobs: TheirStackJob[]
): void {
  const key = makeCacheKey(body);
  const expiresAt = Date.now() + CACHE_TTL_MS;

  searchCache.set(key, { jobs, expiresAt });
  for (const job of jobs) {
    if (job?.id) jobCache.set(job.id, job);
  }
}

/**
 * Récupère une offre précise depuis le cache local.
 */
export function cacheGetJobById(
  id: string | number
): TheirStackJob | undefined {
  return jobCache.get(id);
}

// ----------------------------------------------------
// 🧱 PERSISTENCE OPTIONNELLE : VERCEL KV
// ----------------------------------------------------

/**
 * Appelle l’API REST de Vercel KV (si configurée).
 */
async function kvFetch(
  path: string,
  init?: RequestInit
): Promise<Response | null> {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!base || !token) return null; // KV non configuré

  try {
    return await fetch(`${base}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

/**
 * Enregistre une offre dans la KV persistante.
 */
// VK/KV persistence removed per project decision.

/**
 * Récupère une offre depuis la KV persistante (Vercel KV).
 */
// VK/KV persistence removed per project decision.
