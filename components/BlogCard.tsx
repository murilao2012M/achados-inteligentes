import Image from "next/image";
import Link from "next/link";
import { BookOpenText, Clock3, MoveRight } from "lucide-react";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";
import { BlogPost } from "@/utils/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-surface overflow-hidden rounded-[1.7rem] border-brand-100/90">
      <div className="grid gap-0 md:grid-cols-[170px_1fr]">
        {hasImageUrl(post.image) ? (
          <div className="relative h-56 md:h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 170px"
              className="object-cover"
              unoptimized={!canOptimizeImage(post.image)}
            />
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center bg-[linear-gradient(135deg,#eef5ff,#ffffff)] text-brand-800 md:h-full">
            <BookOpenText className="h-8 w-8" />
          </div>
        )}

        <div className="space-y-3 p-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {post.category}
          </span>
          <h3 className="font-display text-[1.45rem] leading-tight text-ink">
            {post.title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{post.excerpt}</p>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />5 min de leitura
            </span>
            <Link href={`/blog/${post.slug}`} className="soft-link">
              Ler artigo
              <MoveRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
