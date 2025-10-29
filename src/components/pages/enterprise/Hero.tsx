import Button from "@/src/components/ui/Button";
import React from "react";

export default function EnterpriseHero() {
  return (
    <section className="relative">
      <div className="mx-auto flex min-h-[40vh] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Attirez les meilleurs talents pour vos stages
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Publiez vos offres et recevez des candidatures qualifiées en quelques heures.
        </p>
        <div className="mt-6 flex gap-3">
          <Button>Publier une offre</Button>
          <Button variant="outline">Nous contacter</Button>
        </div>
      </div>
    </section>
  );
}


