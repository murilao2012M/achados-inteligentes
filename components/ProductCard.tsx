import Image from "next/image";
import Link from "next/link";
import { MoveRight, Package, Star } from "lucide-react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { formatRating } from "@/utils/format";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";
import { Product } from "@/utils/types";

export function ProductCard({ product }: { product: Product }) {
  const quickSpecs = [
    product.benefits[0],
    product.benefits[1],
    product.benefits[2]
  ]
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article className="card-surface overflow-hidden rounded-[1.75rem]">
      {hasImageUrl(product.image) ? (
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            unoptimized={!canOptimizeImage(product.image)}
          />
        </div>
      ) : (
        <div className="flex h-60 w-full items-center justify-center bg-[linear-gradient(135deg,#d8eaff,#eef6ff)] text-brand-800">
          <div className="text-center">
            <Package className="mx-auto h-8 w-8" />
            <p className="mt-3 px-4 text-sm font-semibold">{product.name}</p>
          </div>
        </div>
      )}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-800">
            {product.highlightTag}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm font-semibold text-slate-500">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            Nota {formatRating(product.editorialRating)}
          </span>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {product.category}
          </p>
          <h3 className="font-display text-[1.7rem] leading-tight text-ink">
            {product.name}
          </h3>
        </div>
        <p className="min-h-[72px] text-sm leading-6 text-slate-600">
          {product.description}
        </p>
        {product.currentPrice ? (
          <div className="rounded-[1.25rem] border border-amber-200/70 bg-amber-50/70 px-4 py-3">
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <p className="font-display text-2xl text-ink">
                {product.currentPrice}
              </p>
              {product.originalPrice ? (
                <p className="text-sm text-slate-500 line-through">
                  {product.originalPrice}
                </p>
              ) : null}
            </div>
            {product.installmentInfo ? (
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {product.installmentInfo}
              </p>
            ) : null}
          </div>
        ) : null}
        {quickSpecs.length ? (
          <div className="flex flex-wrap gap-2">
            {quickSpecs.map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1.5 text-[11px] font-semibold text-brand-700"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/produtos/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-ink hover:border-brand-300 hover:bg-brand-50"
          >
            Ver análise
            <MoveRight className="h-4 w-4" />
          </Link>
          <AffiliateButton href={product.affiliateLink} />
        </div>
      </div>
    </article>
  );
}
