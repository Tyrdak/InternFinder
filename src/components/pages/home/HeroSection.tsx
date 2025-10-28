"use client";

import React from "react";
import { gsap } from "gsap";
import Button from "@/src/components/ui/Button";

export default function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const tl = gsap.timeline();
    tl.fromTo(
      el.querySelectorAll("[data-anim='headline'] span"),
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.06 }
    )
      .fromTo(
        el.querySelectorAll("[data-anim='rating'], [data-anim='cta']"),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 },
        "<0.2"
      )
      .fromTo(
        el.querySelectorAll("[data-anim='card']"),
        { y: 20, rotate: -2, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        "<0.1"
      );
  }, []);

  return (
    <section ref={containerRef} className="relative isolate">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left illustration */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Base board */}
            <div data-anim="card" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
              <div className="h-48 rounded-lg bg-[linear-gradient(0deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[24px_24px]" />
            </div>

            {/* Floating panel */}
            <div data-anim="card" className="absolute left-6 top-6 w-[85%] -rotate-2 rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="h-10 rounded-t-xl bg-(--brand)" />
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="h-3 w-28 rounded bg-gray-200" />
                    <div className="mt-2 h-2 w-16 rounded bg-(--tint)" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  {["Created", "Sent", "Accepted", "Onboarding"].map((label, i) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className={`h-2.5 w-2.5 rounded-full ${i < 2 ? "bg-(--brand)" : "bg-gray-300"}`} />
                      <span className="mt-2 text-[10px] text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Small floating cards */}
            <div data-anim="card" className="absolute bottom-[-18px] left-10 w-56 rotate-2 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
              <div className="h-2 w-24 rounded bg-gray-200" />
              <div className="mt-3 h-2 w-36 rounded bg-gray-100" />
            </div>
            <div data-anim="card" className="absolute bottom-[-26px] right-0 w-64 rotate-1 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
              <div className="h-2 w-40 rounded bg-gray-200" />
              <div className="mt-3 h-2 w-24 rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="order-1 lg:order-2">
          <h1 data-anim="headline" className="text-left text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden"><span className="inline-block">Trouve ton stage</span></span>
            <span className="block overflow-hidden"><span className="inline-block">rapidement et profite</span></span>
            <span className="block overflow-hidden"><span className="inline-block">d'un univers fait</span></span>
            <span className="block overflow-hidden"><span className="inline-block">pour <span className="text-(--brand)">toi.</span></span></span>
          </h1>
          <div data-anim="rating" className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0,1,2,3].map(i => (
                <span key={i} className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">4.9</span>
            <span className="text-sm text-gray-400">à partir de 100+ avis</span>
          </div>
          <div data-anim="cta" className="mt-6 flex gap-3">
            <Button>Commencer</Button>
            <Button variant="outline">Voir une démo</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
