"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "@/src/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Accueil InternFinder">
          <Image src="/logo-white.svg" alt="InternFinder" width={100} height={100} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          <Link href="/offers" className="text-sm text-gray-600 hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) rounded">
            Offres
          </Link>
          <Link href="/companies" className="text-sm text-gray-600 hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) rounded">
            Entreprises
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) rounded">
            À propos
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button>Publier une offre</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-gray-200 bg-white/90 backdrop-blur-sm`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="grid gap-4" aria-label="Navigation mobile">
            <Link href="/offers" className="rounded px-2 py-2 text-base text-gray-700 hover:bg-gray-100">Offres</Link>
            <Link href="/companies" className="rounded px-2 py-2 text-base text-gray-700 hover:bg-gray-100">Entreprises</Link>
            <Link href="/about" className="rounded px-2 py-2 text-base text-gray-700 hover:bg-gray-100">À propos</Link>
          </nav>
          <div className="mt-4 flex gap-2">
            <Button className="flex-1">Publier une offre</Button>
          </div>
        </div>
      </div>
    </header>
  );
}


