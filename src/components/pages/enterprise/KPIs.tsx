import React from "react";

export default function EnterpriseKPIs() {
  const stats = [
    { kpi: "+1 200", label: "Candidats actifs chaque mois" },
    { kpi: "48h", label: "Premières candidatures" },
    { kpi: "95%", label: "Annonces complètes" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl font-semibold text-(--brand)">{s.kpi}</div>
            <div className="mt-2 text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


