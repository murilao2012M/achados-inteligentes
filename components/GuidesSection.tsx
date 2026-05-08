import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { BlogPost } from "@/utils/types";

export function GuidesSection({ guides }: { guides: BlogPost[] }) {
  return (
    <section className="section-space pt-8">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.35rem]">
              Guias de compra e comparativos
            </h2>
          </div>
          <Link href="/blog" className="soft-link hidden md:inline-flex">
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
