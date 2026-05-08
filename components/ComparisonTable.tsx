import Image from "next/image";
import { Product } from "@/utils/types";
import { formatRating } from "@/utils/format";
import { AffiliateButton } from "@/components/AffiliateButton";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";

export function ComparisonTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-sm text-slate-600">
              <th className="px-5 py-4 font-semibold">Produto</th>
              <th className="px-5 py-4 font-semibold">Imagem</th>
              <th className="px-5 py-4 font-semibold">Destaques</th>
              <th className="px-5 py-4 font-semibold">Melhor indicação</th>
              <th className="px-5 py-4 font-semibold">Nota</th>
              <th className="px-5 py-4 font-semibold">CTA</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-t border-slate-100">
                <td className="px-5 py-4 font-semibold text-ink">{product.name}</td>
                <td className="px-5 py-4">
                  {hasImageUrl(product.image) ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized={!canOptimizeImage(product.image)}
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-xs font-semibold text-brand-700">
                      Sem imagem
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {product.benefits.slice(0, 2).join(" • ")}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                    {product.highlightTag}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-ink">
                  {formatRating(product.editorialRating)}
                </td>
                <td className="px-5 py-4">
                  <AffiliateButton href={product.affiliateLink} label="Ver oferta" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
