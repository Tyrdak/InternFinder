"use client";

import React from "react";
import Button from "@/src/components/ui/Button";

export default function JobExample() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Exemple d'annonce</h2>
        <a href="#offers" className="text-sm text-gray-600 hover:text-(--brand)">Voir toutes les offres</a>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Stagiaire Développeur Front-end</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="rounded-full bg-(--tint) px-2 py-0.5 text-(--brand)">Paris</span>
              <span>•</span>
              <span>6 mois</span>
              <span>•</span>
              <span>Début: Janvier</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-gray-600">
              Participe au développement d'interfaces modernes avec React/Next.js, collabore avec l'équipe design et contribue à améliorer l'expérience.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Enregistrer</Button>
            <Button>Postuler</Button>
          </div>
        </div>
      </div>
    </section>
  );
}


