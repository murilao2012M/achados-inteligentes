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
    description:
      "Compare modelos lado a lado e descubra o melhor custo-benefício.",
    icon: ChartNoAxesColumn
  },
  {
    title: "Análises detalhadas",
    description: "Review profundo, prós, contras e testes reais.",
    icon: Search
  },
  {
    title: "Ofertas verificadas",
    description: "Seleção com acesso rápido para conferir na Amazon.",
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
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="pt-2">
          <span className="section-label">
            <Star className="h-3.5 w-3.5" />
            Melhores produtos e ofertas da Amazon
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] leading-[0.98] tracking-tight text-ink sm:text-[3.4rem] lg:text-[4.35rem]">
            Descubra os melhores produtos da Amazon com comparativos, análises
            e recomendações práticas.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            Análises objetivas, comparativos completos e recomendações
            confiáveis para você comprar melhor e economizar tempo na pesquisa.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/comparativos"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-200/80 hover:bg-accent-600"
            >
              Ver ofertas e comparativos
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/categorias"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-bold text-ink hover:bg-brand-50"
            >
              Explorar categorias
              <LayoutGrid className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-brand-100 bg-white px-4 py-2">
              Conteúdo 100% independente
            </span>
            <span className="rounded-full border border-brand-100 bg-white px-4 py-2">
              Atualizações diárias
            </span>
            <span className="rounded-full border border-brand-100 bg-white px-4 py-2">
              Foco em custo-benefício
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-brand-100 bg-white/95 p-5 shadow-[0_24px_80px_rgba(7,26,58,0.10)] sm:p-6">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            <BadgeCheck className="h-4 w-4" />
            O que você encontra aqui
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.5rem] border border-brand-100/80 bg-white p-5 shadow-[0_14px_34px_rgba(7,26,58,0.05)]"
              >
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

          <div className="mt-5 rounded-[1.6rem] border border-brand-100/80 bg-brand-50/55 p-5">
            <p className="text-sm font-semibold text-ink">
              Categorias em destaque
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {highlightedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categorias/${category.slug}`}
                  className="rounded-2xl border border-white bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              href="/categorias"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              Ver todas as categorias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
