import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/components/SEOHead";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";
import { getPostBySlug, getProductsBySlugs } from "@/utils/content";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    type: "article"
  });
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const products = await getProductsBySlugs(post.recommendedProductSlugs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <article className="section-space">
      <Script
        id={`faq-schema-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
      <div className="container-shell space-y-12">
        <header className="mx-auto max-w-4xl space-y-6 text-center">
          <span className="eyebrow">{post.category}</span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg leading-8 text-slate-600">{post.excerpt}</p>
        </header>

        {hasImageUrl(post.image) ? (
          <div className="card-surface relative mx-auto h-[420px] w-full max-w-5xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
              unoptimized={!canOptimizeImage(post.image)}
            />
          </div>
        ) : (
          <div className="card-surface mx-auto flex h-[420px] w-full max-w-5xl items-center justify-center bg-[linear-gradient(135deg,#d8eaff,#eef6ff)] text-brand-800">
            <div className="text-center">
              <p className="text-lg font-semibold">{post.title}</p>
              <p className="mt-2 text-sm text-slate-600">
                Imagem do artigo em atualização
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_320px]">
          <div className="prose-affiliate">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-700">
                Produto em destaque
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Veja uma recomendação relacionada a este conteúdo e confira mais
                detalhes diretamente na Amazon.
              </p>
              {products[0] ? (
                <div className="mt-5 space-y-4">
                  <p className="font-semibold text-ink">{products[0].name}</p>
                  <AffiliateButton href={products[0].affiliateLink} fullWidth />
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <section>
          <h2 className="mb-6 font-display text-3xl text-ink">
            Produtos recomendados neste artigo
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="card-surface p-8">
          <h2 className="font-display text-3xl text-ink">Perguntas frequentes</h2>
          <div className="mt-6 space-y-5">
            {post.faq.map((item) => (
              <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
