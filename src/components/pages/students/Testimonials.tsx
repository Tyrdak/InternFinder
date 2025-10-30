import React from "react";

export default function StudentsTestimonials() {
  const items = [
    { name: "Camille", quote: "J’ai trouvé un stage en 10 jours, super simple !" },
    { name: "Louis", quote: "Les filtres m’ont fait gagner un temps fou." },
    { name: "Sara", quote: "J’ai adoré le suivi de candidatures et les conseils CV." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900">Ils ont trouvé grâce à InternFinder</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <blockquote className="text-gray-700">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-gray-500">{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}


