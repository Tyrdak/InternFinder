import React from "react";

export default function StudentsBenefits() {
  const items = [
    { title: "Offres vérifiées", desc: "Nous filtrons et mettons en avant des stages fiables et récents." },
    { title: "Candidature en 1 clic", desc: "CV enregistré, lettre auto, suivez vos candidatures facilement." },
    { title: "Conseils & ressources", desc: "Gabarits de CV, préparation d’entretien, check-list d’onboarding." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">Pourquoi utiliser InternFinder ?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {items.map((b) => (
            <div key={b.title} className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-medium text-gray-900">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


