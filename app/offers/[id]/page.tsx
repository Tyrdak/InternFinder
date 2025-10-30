import { theirStackSearch } from "@/src/lib/theirstack";
import Button from "@/src/components/ui/Button";
import { markdownToHtml } from "@/src/lib/markdown";

export default async function OfferDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  const job = !Number.isNaN(idNum)
    ? (await theirStackSearch({ job_id_or: [idNum], limit: 1, include_total_results: false }))[0]
    : undefined;

  if (!job) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Offre introuvable</h1>
        <p className="mt-2 text-gray-600">Vérifiez l’URL ou revenez aux offres.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {job.job_title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="rounded-full bg-(--tint) px-3 py-1 text-(--brand)">
                {job.company_object?.name ?? job.company_domain ?? "Entreprise"}
              </span>
              <span>•</span>
              <span>{job.locations?.[0]?.display_name ?? "Lieu non spécifié"}</span>
              {job.salary_string ? (
                <>
                  <span>•</span>
                  <span className="rounded-full border border-gray-200 px-2 py-0.5">{job.salary_string}</span>
                </>
              ) : null}
              {job.remote ? (
                <>
                  <span>•</span>
                  <span className="rounded-full border border-gray-200 px-2 py-0.5">Remote</span>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex gap-2">
            {job.source_url ? (
              <a href={job.source_url} target="_blank" rel="noreferrer">
                <Button variant="outline">Voir la source</Button>
              </a>
            ) : null}
            {job.final_url ? (
              <a href={job.final_url} target="_blank" rel="noreferrer">
                <Button>Postuler maintenant</Button>
              </a>
            ) : null}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gray-200" />

        {/* Content */}
        {job.description ? (
          <article
            className="prose prose-gray max-w-none text-gray-800 prose-h2:mt-6 prose-h2:mb-2 prose-h2:text-lg prose-p:mt-2 prose-ul:mt-2 prose-strong:text-gray-900 prose-li:marker:text-(--brand)"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(job.description) }}
          />
        ) : (
          <p className="text-gray-600">Aucune description fournie.</p>
        )}

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-500">
            {job.date_posted ? (
              <span>Publié le {job.date_posted}</span>
            ) : null}
          </div>
          <div className="flex gap-2">
            {job.final_url ? (
              <a href={job.final_url} target="_blank" rel="noreferrer">
                <Button size="lg">Postuler</Button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


