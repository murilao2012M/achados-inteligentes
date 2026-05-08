import Image from "next/image";
import Link from "next/link";
import { MoveRight, Package, Star } from "lucide-react";
import { AffiliateButton } from "@/components/AffiliateButton";
import { formatRating } from "@/utils/format";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";
import { Product } from "@/utils/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-surface overflow-hidden rounded-[1.7rem] border-brand-100/90">
      {hasImageUrl(product.image) ? (
        <div className="relative h-60 w-full overflow-hidden bg-[#f8fbff]">
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
        <div className="flex h-60 w-full items-center justify-center bg-[linear-gradient(135deg,#eef5ff,#ffffff)] text-brand-800">
          <div className="text-center">
            <Package className="mx-auto h-8 w-8" />
            <p className="mt-3 px-4 text-sm font-semibold">{product.name}</p>
          </div>
        </div>
      )}

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-slate-500">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            {formatRating(product.editorialRating)}
          </span>
        </div>

        <div>
          <h3 className="font-display text-[1.6rem] leading-tight text-ink">
            {product.name}
          </h3>
          <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        </div>

        {product.currentPrice ? (
          <div className="rounded-[1.25rem] bg-[#fff8ec] px-4 py-3">
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <p className="font-display text-3xl text-ink">{product.currentPrice}</p>
              {product.originalPrice ? (
                <p className="text-sm text-slate-400 line-through">
                  {product.originalPrice}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/produtos/${product.slug}`}
            className="secondary-cta flex-1 px-5 py-3 text-center text-sm"
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
