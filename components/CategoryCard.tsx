import Image from "next/image";
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
import { canOptimizeImage, hasImageUrl } from "@/utils/media";
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

export function CategoryCard({ category }: { category: Category }) {
  const Icon =
    categoryIcons[category.slug as keyof typeof categoryIcons] ?? FolderOpen;

  return (
    <article className="card-surface group overflow-hidden rounded-[1.6rem]">
      {hasImageUrl(category.image) ? (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            unoptimized={!canOptimizeImage(category.image)}
          />
        </div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-[linear-gradient(135deg,#d8eaff,#eef6ff)] text-brand-800">
          <div className="text-center">
            <Icon className="mx-auto h-8 w-8" />
            <p className="mt-3 text-sm font-semibold">{category.name}</p>
          </div>
        </div>
      )}
      <div className="space-y-4 p-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-800">
          <Icon className="h-3.5 w-3.5" />
          {category.name}
        </span>
        <h3 className="font-display text-xl text-ink">{category.name}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {category.description}
        </p>
        <Link
          href={`/categorias/${category.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
        >
          Explorar categoria
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
