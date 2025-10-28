"use client";

import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Olivia Wouters",
      role: "Product Designer",
      quote:
        "InternFinder m'a permis de trouver un stage en 2 semaines, l'expérience est fluide et moderne.",
    },
    {
      name: "Malik Grotesk",
      role: "Recruiter",
      quote:
        "Nous publions nos offres facilement et recevons des candidatures qualifiées rapidement.",
    },
    {
      name: "Patricia Costa",
      role: "Copywriter",
      quote:
        "J'ai apprécié la simplicité du processus et la clarté des annonces.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Ils nous font confiance</h2>
        <span className="text-sm text-gray-500">Note moyenne 4.9/5</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <blockquote className="text-gray-700">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-gray-500">
              <span className="font-medium text-gray-900">{t.name}</span> — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}


