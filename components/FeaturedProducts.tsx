import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/utils/types";
import { ProductCard } from "@/components/ProductCard";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section-space pb-10">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="section-label">
              <Star className="h-3.5 w-3.5" />
              Produtos em destaque
            </span>
            <h2 className="section-heading">Produtos em destaque</h2>
          </div>
          <Link
            href="/comparativos"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 md:inline-flex"
          >
            Ver todos os destaques
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
