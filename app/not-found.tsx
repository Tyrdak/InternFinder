import Link from "next/link";
import Button from "@/src/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">404</h1>
      <p className="mt-3 text-lg text-gray-700">Page introuvable</p>
      <p className="mt-2 max-w-prose text-sm text-gray-600">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button>Retour à l’accueil</Button>
        </Link>
      </div>
    </section>
  );
}


