"use client";

import React from "react";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import type { TheirStackJob } from "@/src/lib/theirstack";

export default function OffersSearchFilter() {
  const [loading, setLoading] = React.useState(false);
  // État pour UNE seule offre (vue détail). Laissez-le à null si vous passez à l'affichage multiple
  const [offer, setOffer] = React.useState<TheirStackJob | null>(null);
  // État pour PLUSIEURS offres (vue liste). Utilisez ceci pour afficher plusieurs cartes d'un coup
  const [offers, setOffers] = React.useState<TheirStackJob[]>([]);
  const [searchParams, setSearchParams] = React.useState<any | null>(null);
  const [page, setPage] = React.useState(0);
  const LIMIT = 1;
  const STORAGE_KEY = "internfinder:offers:last";
  // Pas d'infinite scroll: pagination contrôlée par boutons

  React.useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const saved = JSON.parse(raw);
      // Si vous affichez une SEULE offre (détail):
      // setOffer(Array.isArray(saved?.offer) ? saved.offer[0] : null);
      // Si vous affichez PLUSIEURS offres (liste):
      // setOffers(Array.isArray(saved?.offers) ? saved.offers : []);
      setOffers(Array.isArray(saved?.offers) ? saved.offers : []);
      setSearchParams(saved?.params ?? null);
      if (typeof saved?.page === "number") setPage(saved.page);
    } catch {
      // ignore parse errors
    }
  }, []);

  // (infinite scroll retiré)
  async function fetchOffers(formDataOrParams: FormData | any, pageOverride?: number) {
    setLoading(true);
    // Pour une SEULE offre, on remet à zéro l'offre en cours
    setOffer(null);
    // Pour PLUSIEURS offres, on remplace la page courante
    setOffers([]);
    try {
      const fromForm = formDataOrParams instanceof FormData;
      const body: any = {
        posted_at_max_age_days: 30,
        limit: LIMIT,
        include_total_results: false,
        employment_statuses_or: ["internship"],
      };
      if (fromForm) {
        const q = String((formDataOrParams as FormData).get("q") || "").trim();
        if (q) body.job_title_or = [q];
        const location = String((formDataOrParams as FormData).get("location") || "").trim();
        if (location) body.job_location_pattern_or = [location];
        setSearchParams({ job_title_or: body.job_title_or, job_location_pattern_or: body.job_location_pattern_or });
      } else if (formDataOrParams) {
        Object.assign(body, formDataOrParams);
      } else if (searchParams) {
        Object.assign(body, searchParams);
      }

      // Pagination: utilisez `page` (0-based ici). Si l'API attend 1-based, faites `page + 1`.
      const nextPage = typeof pageOverride === "number" ? pageOverride : 0;
      body.page = nextPage;
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      // === Choix d'affichage ===
      // 1) UNE seule offre (vue détail):
      // setOffer(json?.data?.[0] ?? null);
      // 2) PLUSIEURS offres (vue liste):
      const items: TheirStackJob[] = Array.isArray(json?.data) ? json.data : [];
      setOffers(items.slice(0, LIMIT));
      setPage(nextPage);

      // Sauvegarde dans le cache navigateur pour persister au refresh
      try {
        const payload = {
          // Pour SEULE offre: offer: json?.data?.[0] ?? null,
          // Pour PLUSIEURS offres:
          offers: items.slice(0, LIMIT),
          ts: Date.now(),
          // Vous pouvez stocker aussi les paramètres de recherche pour restauration
          params: searchParams ?? body,
          page: nextPage,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        }
      } catch {
        // ignore write errors
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <form
        className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-6"
        role="search"
        aria-label="Recherche d'offres"
        action={async (fd) => {
          setPage(0);
          await fetchOffers(fd, 0);
        }}
      >
        <div className="lg:col-span-2">
          <label htmlFor="q" className="block text-sm font-medium text-gray-700">Mots-clés</label>
          <input id="q" name="q" placeholder="Ex: React, Marketing..." className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-(--brand)" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
          <input id="location" name="location" placeholder="Ville, pays" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-(--brand)" />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select id="type" name="type" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-(--brand)">
            <option value="">Tous</option>
            <option value="full">Temps plein</option>
            <option value="part">Temps partiel</option>
            <option value="remote">Remote</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durée</label>
          <select id="duration" name="duration" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-(--brand)">
            <option value="">Toutes</option>
            <option value="3">3 mois</option>
            <option value="6">6 mois</option>
            <option value="12">12+ mois</option>
          </select>
        </div>
        <div className="lg:col-span-1 flex items-end">
          <Button className="w-full" disabled={loading}>{loading ? "Recherche..." : "Rechercher"}</Button>
        </div>
      </form>

      {/*
        Rendu MULTIPLE: on mappe le tableau `offers` pour afficher plusieurs cartes.
        Pour revenir au rendu d'UNE seule offre, supprimez ce bloc et remettez le bloc "Single offer" ci-dessous.
      */}
      {offers.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4">
          {offers.map((o) => (
            <div key={String(o.id)} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{o.job_title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{o.company_object?.name ?? o.company_domain ?? "Entreprise"}</p>
                  <p className="mt-1 text-sm text-gray-600">{o.locations?.[0]?.display_name ?? "Lieu non spécifié"}</p>
                  {o.salary_string && (
                    <p className="mt-1 text-sm text-gray-600">{o.salary_string}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/offers/${String(o.id)}`} className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
                    Voir l'offre
                  </Link>
                  {o.final_url ? (
                    <a href={o.final_url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-(--brand) px-4 py-2 text-sm text-white hover:brightness-95">
                      Postuler
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination: ne charge pas plus que LIMIT par page */}
      {offers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            className="px-4"
            disabled={loading || page === 0}
            onClick={async (e: any) => {
              e.preventDefault();
              const prev = Math.max(0, page - 1);
              await fetchOffers(searchParams ?? {}, prev);
            }}
          >
            Page précédente
          </Button>
          <span className="text-sm text-gray-600">Page {page + 1}</span>
          <Button
            className="px-4"
            disabled={loading || offers.length < LIMIT}
            onClick={async (e: any) => {
              e.preventDefault();
              const next = page + 1;
              await fetchOffers(searchParams ?? {}, next);
            }}
          >
            Page suivante
          </Button>
        </div>
      )}

      {/*
        Rendu pour UNE seule offre (alternative au bloc multiple ci-dessus).
        - Activez ce bloc si vous préférez la vue détail unique
        - Dans fetchOffers, utilisez setOffer(json?.data?.[0] ?? null) et non setOffers(...)
      */}
      {offer && offers.length === 0 && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{offer.job_title}</h3>
              <p className="mt-1 text-sm text-gray-600">{offer.company_object?.name ?? offer.company_domain ?? "Entreprise"}</p>
              <p className="mt-1 text-sm text-gray-600">{offer.locations?.[0]?.display_name ?? "Lieu non spécifié"}</p>
              {offer.salary_string && (
                <p className="mt-1 text-sm text-gray-600">{offer.salary_string}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/offers/${String(offer.id)}`} className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
                Voir l'offre
              </Link>
              {offer.final_url ? (
                <a href={offer.final_url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-(--brand) px-4 py-2 text-sm text-white hover:brightness-95">
                  Postuler
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

