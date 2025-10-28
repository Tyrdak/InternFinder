"use client";

import React from "react";
import { gsap } from "gsap";
import Button from "@/src/components/ui/Button";

export default function InfoSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const tl = gsap.timeline();
    tl.fromTo(
      el.querySelectorAll("[data-anim='fade-up']"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative isolate">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-24 lg:px-8">
        <div>
          <h1 data-anim="fade-up" className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Trouvez le stage idéal, postulez en quelques clics
          </h1>
          <p data-anim="fade-up" className="mt-4 max-w-xl text-pretty text-gray-600">
            InternFinder centralise les offres de stage vérifiées et vous permet de postuler directement sur la plateforme. Gagnez du temps et concentrez-vous sur l’essentiel.
          </p>
          <div data-anim="fade-up" className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="">Explorer les offres</Button>
            <Button variant="outline">Publier une offre</Button>
          </div>
          <div data-anim="fade-up" className="mt-8 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              +1 200 offres actives
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              300 entreprises partenaires
            </div>
          </div>
        </div>

        <div className="relative">
          <div data-anim="fade-up" className="aspect-4/3 w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="grid h-full w-full grid-cols-2 gap-4">
              <div className="rounded-lg bg-linear-to-br from-(--tint) to-white" />
              <div className="rounded-lg bg-linear-to-br from-(--brand)/20 to-white" />
              <div className="col-span-2 rounded-lg border border-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
