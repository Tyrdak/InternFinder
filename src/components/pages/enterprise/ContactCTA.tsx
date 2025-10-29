import React from "react";
import Button from "@/src/components/ui/Button";

export default function EnterpriseContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <h2 className="text-lg font-semibold text-gray-900">Besoin d’un accompagnement dédié ?</h2>
        <p className="mt-2 text-sm text-gray-600">Notre équipe peut vous aider à structurer vos recrutements de stagiaires.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Parler à un expert</Button>
          <Button variant="outline">Envoyer un message</Button>
        </div>
      </div>
    </section>
  );
}


