import { buildMetadata } from "@/components/SEOHead";
import { BlogCard } from "@/components/BlogCard";
import { SectionIntro } from "@/components/SectionIntro";
import { getPosts } from "@/utils/content";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Artigos com guias de compra, comparações, dicas e recomendações para ajudar você a escolher melhor antes de comprar.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getPosts();
  const uniqueCategories = [...new Set(posts.map((post) => post.category))];

  return (
    <section className="section-space">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="Blog"
          title="Artigos com dicas, comparações e orientações para escolher melhor"
          description="Leia conteúdos pensados para responder dúvidas, comparar opções e ajudar você a encontrar os melhores produtos para cada necessidade."
        />
        <div className="flex flex-wrap gap-3">
          {uniqueCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
