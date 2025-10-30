import React from "react";
import Button from "@/src/components/ui/Button";

export default function StudentsHero() {
  return (
    <section className="relative">
      <div className="mx-auto flex min-h-[40vh] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Trouve le stage qui te ressemble
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Des offres vérifiées, des candidatures simples, et des conseils pour booster ton profil.
        </p>
        <div className="mt-6 flex gap-3">
          <Button>Explorer les offres</Button>
          <Button variant="outline">Créer mon profil</Button>
        </div>
      </div>
    </section>
  );
}


