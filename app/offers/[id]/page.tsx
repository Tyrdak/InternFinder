import { theirStackSearch, cacheGetJobById } from "@/src/lib/theirstack";
import Button from "@/src/components/ui/Button";

export default async function OfferDetail({ params }: { params: { id: string } }) {
  const idNum = Number(params.id);
  const cached = cacheGetJobById(!Number.isNaN(idNum) ? idNum : params.id);
  const job =
    cached ??
    (!Number.isNaN(idNum)
      ? (await theirStackSearch({ job_id_or: [idNum], limit: 1, include_total_results: false }))[0]
      : undefined);

  if (!job) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold">Offre introuvable</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">{job.job_title}</h1>
      <p className="mt-1 text-gray-600">{job.company_object?.name ?? job.company_domain ?? "Entreprise"}</p>
      <p className="mt-1 text-gray-600">{job.locations?.[0]?.display_name ?? "Lieu non spécifié"}</p>
      {job.salary_string && <p className="mt-2 text-gray-700">{job.salary_string}</p>}

      {job.description && (
        <article className="prose prose-sm mt-6 max-w-none whitespace-pre-line">
          {job.description}
        </article>
      )}

      <div className="mt-8 flex gap-3">
        {job.final_url ? (
          <a href={job.final_url} target="_blank" rel="noreferrer">
            <Button>Postuler maintenant</Button>
          </a>
        ) : null}
        {job.source_url ? (
          <a href={job.source_url} target="_blank" rel="noreferrer" className="text-sm text-gray-600 underline-offset-4 hover:underline">
            Voir la source
          </a>
        ) : null}
      </div>
    </section>
  );
}


