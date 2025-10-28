import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">InternFinder</h3>
            <p className="mt-2 text-sm text-gray-600">
              La plateforme pour trouver et publier des offres de stage.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Ressources</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/offers" className="text-gray-600 hover:text-teal-600">
                  Offres
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-600 hover:text-teal-600">
                  Entreprises
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Légal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-teal-600">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-teal-600">
                  Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <p className="mt-3 text-sm text-gray-600">contact@internfinder.example</p>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} InternFinder. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}


