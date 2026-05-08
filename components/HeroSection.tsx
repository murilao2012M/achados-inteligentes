import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChartNoAxesColumn,
  LayoutGrid,
  Search,
  Star,
  Tags
} from "lucide-react";
import { Category } from "@/utils/types";

const featureCards = [
  {
    title: "Comparativos completos",
    description: "Compare modelos lado a lado e descubra o melhor custo-benefício.",
    icon: ChartNoAxesColumn
  },
  {
    title: "Análises detalhadas",
    description: "Reviews profundos, prós, contras e testes reais.",
    icon: Search
  },
  {
    title: "Ofertas verificadas",
    description: "Seleção com as melhores ofertas disponíveis na Amazon.",
    icon: Tags
  },
  {
    title: "Guias de compra",
    description: "Passo a passo para escolher com mais segurança.",
    icon: BookOpenText
  }
];

export function HeroSection({ categories }: { categories: Category[] }) {
  const highlightedCategories = categories.slice(0, 5);

  return (
    <section className="container-shell py-10 lg:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="pt-2">
          <span className="section-label">
            <Star className="h-3.5 w-3.5" />
            Melhores produtos e ofertas da Amazon
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-[2.85rem] leading-[0.95] tracking-tight text-ink sm:text-[3.55rem] lg:text-[4.55rem]">
            Descubra os melhores produtos da Amazon com comparativos, análises e
            recomendações práticas.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            Análises objetivas, comparativos completos e recomendações confiáveis
            para você comprar melhor e economizar tempo e dinheiro.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/comparativos" className="primary-cta">
              Ver ofertas e comparativos
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href="/categorias" className="secondary-cta">
              Explorar categorias
              <LayoutGrid className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="mini-chip">Conteúdo 100% independente</span>
            <span className="mini-chip">Atualizações diárias</span>
            <span className="mini-chip">Foco em custo-benefício</span>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            <BadgeCheck className="h-4 w-4" />
            O que você encontra aqui
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map((feature) => (
              <div key={feature.title} className="feature-box">
                <feature.icon className="h-8 w-8 text-brand-500" />
                <h2 className="mt-4 font-display text-xl leading-tight text-ink">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-brand-100/90 bg-[#f8fbff] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Categorias em destaque
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {highlightedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categorias/${category.slug}`}
                  className="rounded-2xl border border-brand-100 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link href="/categorias" className="soft-link mt-4">
              Ver todas as categorias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
