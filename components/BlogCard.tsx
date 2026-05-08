import Image from "next/image";
import Link from "next/link";
import { BookOpenText, MoveRight } from "lucide-react";
import { canOptimizeImage, hasImageUrl } from "@/utils/media";
import { BlogPost } from "@/utils/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-surface overflow-hidden rounded-[1.75rem]">
      {hasImageUrl(post.image) ? (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            unoptimized={!canOptimizeImage(post.image)}
          />
        </div>
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-[linear-gradient(135deg,#d8eaff,#eef6ff)] text-brand-800">
          <div className="text-center">
            <BookOpenText className="mx-auto h-8 w-8" />
            <p className="mt-3 px-4 text-sm font-semibold">{post.title}</p>
          </div>
        </div>
      )}
      <div className="space-y-4 p-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
          <BookOpenText className="h-3.5 w-3.5" />
          {post.category}
        </span>
        <h3 className="font-display text-[1.6rem] leading-tight text-ink">
          {post.title}
        </h3>
        <p className="min-h-[72px] text-sm leading-6 text-slate-600">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          Ler artigo
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
