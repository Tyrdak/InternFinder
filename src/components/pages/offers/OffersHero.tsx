"use client";

import React from "react";
import { gsap } from "gsap";

export default function OffersHero() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll("[data-anim='reveal']"),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }
    );
  }, []);

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto flex min-h-[40vh] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <h1 data-anim="reveal" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Trouvez votre prochain stage
        </h1>
        <p data-anim="reveal" className="mt-3 max-w-2xl text-gray-600">
          Parcourez des centaines d’offres vérifiées et postulez directement sur InternFinder.
        </p>
      </div>
    </section>
  );
}


