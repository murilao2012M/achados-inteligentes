import Link from "next/link";
import {
  Dumbbell,
  FolderOpen,
  LaptopMinimal,
  MonitorSmartphone,
  MoveRight,
  Sparkles,
  UtensilsCrossed,
  Wrench
} from "lucide-react";
import { Category } from "@/utils/types";

const categoryIcons = {
  tecnologia: LaptopMinimal,
  "casa-e-cozinha": UtensilsCrossed,
  beleza: Sparkles,
  ferramentas: Wrench,
  pets: FolderOpen,
  eletronicos: MonitorSmartphone,
  "ofertas-do-dia": Dumbbell
} as const;

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="section-space pt-4">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.35rem]">
              Categorias em destaque
            </h2>
          </div>
          <Link
            href="/categorias"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 md:inline-flex"
          >
            Ver todas as categorias
            <MoveRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon =
              categoryIcons[category.slug as keyof typeof categoryIcons] ??
              FolderOpen;

            return (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="group overflow-hidden rounded-[1.65rem] border border-brand-100/90 bg-white shadow-soft hover:-translate-y-1 hover:border-brand-200"
              >
                <div className="flex min-h-[206px] flex-col justify-between p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="pt-6">
                    <h3 className="font-display text-[1.45rem] leading-tight text-ink">
                    {category.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {category.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                      Explorar categoria
                      <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
