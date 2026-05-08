import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/components/SEOHead";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";
import { ProductPricingBox } from "@/components/ProductPricingBox";
import { getAllProducts, getProductBySlug } from "@/utils/content";
import { formatRating } from "@/utils/format";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return buildMetadata({
    title: `${product.name} | Review e recomendação`,
    description: product.description,
    path: `/produtos/${product.slug}`,
    type: "article"
  });
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getAllProducts())
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug && item.slug !== product.slug
    )
    .slice(0, 3);

  return (
    <div className="section-space">
      <div className="container-shell space-y-12">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          {hasImageUrl(product.image) ? (
            <div className="card-surface relative min-h-[420px] w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized={!canOptimizeImage(product.image)}
              />
            </div>
          ) : (
            <div className="card-surface flex min-h-[420px] items-center justify-center bg-[linear-gradient(135deg,#d8eaff,#eef6ff)] text-brand-800">
              <div className="text-center">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="mt-2 text-sm text-slate-600">
                  Imagem do produto em atualização
                </p>
              </div>
            </div>
          )}
          <div className="space-y-6">
            <span className="eyebrow">{product.category}</span>
            <div>
              <h1 className="font-display text-4xl text-ink sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {product.description}
              </p>
            </div>

            <ProductPricingBox
              priceLabel={product.priceLabel}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              installmentInfo={product.installmentInfo}
              priceBadge={product.priceBadge}
              priceNote={product.priceNote}
            />

            <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-soft sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-700">
                  Nota editorial
                </p>
                <p className="mt-2 text-3xl font-semibold text-ink">
                  {formatRating(product.editorialRating)}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-700">
                  Destaque
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {product.highlightTag}
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-brand-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Para quem este produto é indicado
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {product.recommendedFor}
              </p>
            </div>
            <div className="space-y-3">
              <AffiliateButton href={product.affiliateLink} fullWidth />
              <p className="text-xs leading-6 text-slate-500">
                Ao clicar no botão, você será direcionado para a Amazon para
                conferir disponibilidade, condições e preço atualizado do
                produto.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="card-surface p-6">
            <h2 className="font-display text-2xl text-ink">
              Principais benefícios
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {product.benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h2 className="font-display text-2xl text-ink">Prós</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {product.pros.map((pro) => (
                <li key={pro}>• {pro}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h2 className="font-display text-2xl text-ink">Contras</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {product.cons.map((con) => (
                <li key={con}>• {con}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <h2 className="font-display text-3xl text-ink">
              Produtos relacionados
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Veja outras opções da mesma categoria para comparar recursos,
              benefícios e faixas de uso antes de decidir.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
