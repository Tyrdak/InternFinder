"use client";

import React from "react";
import Button from "@/src/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Erreur critique</h1>
          <p className="mt-2 max-w-prose text-sm text-gray-600">Un problème inattendu est survenu.</p>
          <div className="mt-6">
            <Button onClick={() => reset()}>Recharger</Button>
          </div>
        </section>
      </body>
    </html>
  );
}


