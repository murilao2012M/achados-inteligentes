import { savePostAction } from "@/app/admin/actions";
import { BlogPost, Category } from "@/utils/types";

function formatSections(post?: BlogPost | null) {
  if (!post?.sections?.length) return "";

  return post.sections
    .map((section) => [`# ${section.heading}`, ...section.content].join("\n"))
    .join("\n\n");
}

function formatFaq(post?: BlogPost | null) {
  return (post?.faq ?? [])
    .map((item) => `${item.question}::${item.answer}`)
    .join("\n");
}

export function PostAdminForm({
  post,
  categories
}: {
  post?: BlogPost | null;
  categories: Category[];
}) {
  return (
    <form action={savePostAction} className="admin-panel-shell space-y-5 p-6">
      <input type="hidden" name="id" defaultValue={post?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Título</span>
          <input
            name="title"
            required
            defaultValue={post?.title ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Slug</span>
          <input
            name="slug"
            required
            defaultValue={post?.slug ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Categoria</span>
          <select
            name="category"
            required
            defaultValue={post?.category ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option value="">Selecione</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Data de publicação</span>
          <input
            name="publishedAt"
            type="date"
            defaultValue={post?.publishedAt ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Resumo</span>
        <textarea
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>SEO title</span>
          <input
            name="seoTitle"
            defaultValue={post?.seoTitle ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>SEO description</span>
          <input
            name="seoDescription"
            defaultValue={post?.seoDescription ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>URL da imagem</span>
          <input
            name="image"
            defaultValue={post?.image ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Ou envie um arquivo</span>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full rounded-2xl border border-dashed border-slate-300 px-4 py-3"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Seções do artigo</span>
        <textarea
          name="sections"
          rows={10}
          defaultValue={formatSections(post)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <span className="block text-xs text-slate-500">
          Use `# Título da seção` e escreva os parágrafos abaixo. Separe blocos
          com uma linha em branco.
        </span>
      </label>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>FAQ</span>
        <textarea
          name="faq"
          rows={6}
          defaultValue={formatFaq(post)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <span className="block text-xs text-slate-500">
          Uma pergunta por linha no formato `Pergunta::Resposta`.
        </span>
      </label>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Slugs dos produtos recomendados</span>
        <input
          name="recommendedProductSlugs"
          defaultValue={(post?.recommendedProductSlugs ?? []).join(", ")}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? true}
        />
        Publicado
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {post?.id ? "Salvar alterações" : "Criar post"}
      </button>
    </form>
  );
}
