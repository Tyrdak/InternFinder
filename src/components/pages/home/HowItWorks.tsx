"use client";

import React from "react";
import { gsap } from "gsap";

export default function HowItWorks() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      title: "Crée ton profil",
      desc: "Ajoute ton CV, tes compétences et préférences.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z"/></svg>
      ),
    },
    {
      title: "Explore les offres",
      desc: "Filtre par domaine, lieu, durée.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 3a7.5 7.5 0 105.3 12.8l4.2 4.2a1 1 0 001.4-1.4l-4.2-4.2A7.5 7.5 0 0010.5 3z"/></svg>
      ),
    },
    {
      title: "Postule en 1 clic",
      desc: "Suis l'avancement de ta candidature.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12l5 5L20 7"/></svg>
      ),
    },
  ];

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      el.querySelectorAll("[data-anim='step']"),
      { y: 30, opacity: 0, rotateX: -10 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.15 }
    ).fromTo(
      el.querySelectorAll("[data-anim='glow']"),
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0.1
    );
  }, []);

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900">Comment ça marche</h2>
      <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-anim="step"
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* gradient glow */}
            <div data-anim="glow" aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-(--tint)/60 to-white opacity-60 blur-2xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--tint) text-(--brand)">
                {s.icon}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm font-semibold text-(--brand)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">{s.desc}</p>
            </div>

            {/* decorative pattern */}
            <div aria-hidden className="absolute right-[-20%] top-[-20%] h-56 w-56 rounded-full bg-(--brand)/10 blur-3xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1" />
          </div>
        ))}
      </div>
    </section>
  );
}


