import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumn,
  LayoutGrid,
  ShieldCheck
} from "lucide-react";
import { buildMetadata } from "@/components/SEOHead";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategories } from "@/utils/content";

export const metadata = buildMetadata({
  title: "Categorias",
  description:
    "Explore as categorias de produtos recomendados para encontrar reviews, listas e comparativos por nicho.",
  path: "/categorias"
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="section-space">
      <div className="container-shell space-y-8">
        <div className="shell-panel p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <span className="section-label">
                <LayoutGrid className="h-3.5 w-3.5" />
                Categorias
              </span>
              <h1 className="mt-4 max-w-3xl font-display text-[2.3rem] leading-[1.04] tracking-tight text-ink sm:text-[2.9rem]">
                Explore categorias com produtos recomendados, ofertas e análises
                para comprar melhor.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Navegue por nichos organizados para encontrar reviews,
                comparativos e listas com mais clareza antes de escolher na
                Amazon.
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
                  Ver guias de compra
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-brand-100 bg-white p-5 shadow-sm">
                <LayoutGrid className="h-7 w-7 text-brand-700" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
                  Categorias
                </p>
                <p className="mt-2 font-display text-3xl text-ink">
                  {categories.length}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-brand-100 bg-white p-5 shadow-sm">
                <ChartNoAxesColumn className="h-7 w-7 text-brand-700" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
                  Comparação
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Nichos com produtos para comparar e analisar com calma.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-brand-100 bg-white p-5 shadow-sm">
                <ShieldCheck className="h-7 w-7 text-brand-700" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
                  Curadoria
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Seleção pensada para facilitar a escolha do produto certo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
