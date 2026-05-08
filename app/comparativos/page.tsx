import Link from "next/link";
import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";
import { getComparisons } from "@/utils/content";

export const metadata = buildMetadata({
  title: "Comparativos",
  description:
    "Confira comparativos de produtos com destaques editoriais, indicações de uso e botões para compra na Amazon.",
  path: "/comparativos"
});

export default async function ComparisonsPage() {
  const comparisons = await getComparisons();

  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Comparações"
          title="Comparativos para pesquisar, comparar e decidir melhor"
          description="Use estes comparativos como base para analisar diferenças, encontrar o melhor custo-benefício e escolher com mais segurança."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {comparisons.map((comparison) => (
            <article key={comparison.slug} className="card-surface p-8">
              <h2 className="font-display text-3xl text-ink">
                {comparison.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {comparison.description}
              </p>
              <Link
                href={`/comparativos/${comparison.slug}`}
                className="mt-6 inline-flex rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Ver comparação
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
