"use client";

import React from "react";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import type { TheirStackJob } from "@/src/lib/theirstack";

export default function OffersSearchFilter() {
  const [loading, setLoading] = React.useState(false);
  const [offer, setOffer] = React.useState<TheirStackJob | null>(null);

  async function fetchOneOffer(formData: FormData) {
    setLoading(true);
    setOffer(null);
    try {
      const body: any = {
        posted_at_max_age_days: 30,
        limit: 1,
        include_total_results: false,
        employment_statuses_or: ["internship"],
      };
      const q = String(formData.get("q") || "").trim();
      if (q) body.job_title_or = [q];
      const location = String(formData.get("location") || "").trim();
      if (location) body.job_location_pattern_or = [location];
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setOffer(json?.data?.[0] ?? null);
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
        action={async (fd) => fetchOneOffer(fd)}
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

      {/* Single offer result */}
      {offer && (
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
              <Link href={`/offers/${offer.id}`} className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
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


