import { notFound } from "next/navigation";
import { buildMetadata } from "@/components/SEOHead";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SectionIntro } from "@/components/SectionIntro";
import {
  getComparisonBySlug,
  getComparisons,
  getProductsBySlugs
} from "@/utils/content";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    return {};
  }

  return buildMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/comparativos/${comparison.slug}`,
    type: "article"
  });
}

export default async function ComparisonPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const products = await getProductsBySlugs(comparison.products);

  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Comparativo editorial"
          title={comparison.title}
          description={comparison.description}
        />
        <ComparisonTable products={products} />
      </div>
    </section>
  );
}
