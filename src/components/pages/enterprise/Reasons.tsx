import React from "react";
import Button from "@/src/components/ui/Button";

export default function EnterpriseReasons() {
  const reasons = [
    { title: "Diffusion efficace", desc: "Vos offres sont mises en avant auprès d’étudiants pertinents." },
    { title: "Pipeline clair", desc: "Suivez les candidatures, messages et statuts en un coup d’œil." },
    { title: "Marque employeur", desc: "Une page entreprise soignée pour présenter votre culture." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">Pourquoi InternFinder ?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {reasons.map((b) => (
            <div key={b.title} className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-medium text-gray-900">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Button>Créer mon compte entreprise</Button>
          <Button variant="outline">Nous contacter</Button>
        </div>
      </div>
    </section>
  );
}


