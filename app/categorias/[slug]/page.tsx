import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Search } from "lucide-react";
import { buildMetadata } from "@/components/SEOHead";
import { ProductFilter } from "@/components/ProductFilter";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory
} from "@/utils/content";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return buildMetadata({
    title: `${category.name} | Produtos recomendados`,
    description: category.description,
    path: `/categorias/${category.slug}`
  });
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);
  const categories = await getCategories();

  return (
    <section className="section-space">
      <div className="container-shell space-y-8">
        <div className="shell-panel p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <span className="section-label">
                <LayoutGrid className="h-3.5 w-3.5" />
                {category.name}
              </span>
              <h1 className="mt-4 max-w-3xl font-display text-[2.3rem] leading-[1.04] tracking-tight text-ink sm:text-[2.9rem]">
                Produtos, comparações e recomendações em {category.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {category.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/comparativos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-600"
                >
                  Ver comparativos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                >
                  Ler guias relacionados
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-brand-100 bg-white p-5 shadow-sm">
                <Search className="h-7 w-7 text-brand-700" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
                  Produtos encontrados
                </p>
                <p className="mt-2 font-display text-3xl text-ink">
                  {products.length}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-brand-100 bg-white p-5 shadow-sm">
                <LayoutGrid className="h-7 w-7 text-brand-700" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
                  Navegação
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use a busca e os filtros abaixo para encontrar o modelo ideal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProductFilter products={products} categories={categories} />
      </div>
    </section>
  );
}
