"use client";

import React from "react";

type Item = { q: string; a: string };

export default function FAQ() {
  const items: Item[] = [
    { q: "InternFinder est-il gratuit ?", a: "La recherche et la candidature sont gratuites pour les étudiants." },
    { q: "Comment publier une offre ?", a: "Créez un compte entreprise et suivez le formulaire de création d'annonce." },
    { q: "Puis-je suivre mes candidatures ?", a: "Oui, un tableau de bord permet de suivre l'avancement en temps réel." },
  ];

  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900">FAQ</h2>
      <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)"
              aria-expanded={open === i}
              onClick={() => setOpen((prev) => (prev === i ? null : i))}
            >
              <span className="text-sm font-medium text-gray-900">{item.q}</span>
              <svg className={`h-5 w-5 text-gray-500 transition-transform ${open === i ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`px-4 pb-4 text-sm text-gray-600 ${open === i ? "block" : "hidden"}`}>{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


