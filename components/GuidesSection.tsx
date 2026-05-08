import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { BlogPost } from "@/utils/types";

export function GuidesSection({ guides }: { guides: BlogPost[] }) {
  return (
    <section className="section-space pt-8">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="section-label">
              <BookOpenText className="h-3.5 w-3.5" />
              Guias de compra e comparativos
            </span>
            <h2 className="section-heading">
              Conteúdo útil para pesquisar melhor antes de comprar
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 md:inline-flex"
          >
            Ver todos os guias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <BlogCard key={guide.slug} post={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}
