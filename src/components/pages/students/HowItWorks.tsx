import React from "react";

export default function StudentsHowItWorks() {
  const steps = [
    { title: "Crée ton profil", desc: "Ajoute ton CV, préférences et disponibilités" },
    { title: "Trouve des offres", desc: "Filtre par domaine, lieu, durée, remote" },
    { title: "Postule", desc: "Suis l’avancement et prépare tes entretiens" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900">Comment ça marche</h2>
      <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-(--tint) text-(--brand)">{i + 1}</div>
            <h3 className="mt-4 text-base font-medium text-gray-900">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


