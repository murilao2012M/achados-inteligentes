import Link from "next/link";
import { deletePostAction } from "@/app/admin/actions";
import { EntityHeader } from "@/components/admin/EntityHeader";
import { PanelSection } from "@/components/admin/PanelSection";
import { PostAdminForm } from "@/components/admin/PostAdminForm";
import { getCategoriesAdmin, getPostsAdmin } from "@/utils/content";

export default async function AdminPostsPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const [posts, categories] = await Promise.all([
    getPostsAdmin(),
    getCategoriesAdmin()
  ]);
  const editingPost = posts.find((post) => post.id === edit);

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Posts"
        description="Publique artigos com foco em SEO, dúvidas comuns e recomendações relacionadas aos produtos."
      />

      <PanelSection
        title={editingPost ? "Editar post" : "Novo post"}
        description="Crie conteúdos que ajudem o visitante a comparar opções e entender melhor cada categoria."
      >
        <PostAdminForm post={editingPost} categories={categories} />
      </PanelSection>

      <PanelSection
        title="Posts cadastrados"
        description="Gerencie os conteúdos publicados e ajuste títulos, categorias e datas quando necessário."
      >
        <div className="admin-panel-shell overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Título</th>
                <th className="px-5 py-4 font-semibold">Categoria</th>
                <th className="px-5 py-4 font-semibold">Publicação</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{post.title}</td>
                  <td className="px-5 py-4 text-slate-500">{post.category}</td>
                  <td className="px-5 py-4 text-slate-500">{post.publishedAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/posts?edit=${post.id}`}
                        className="text-sm font-semibold text-brand-700"
                      >
                        Editar
                      </Link>
                      {post.id ? (
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <button
                            type="submit"
                            className="text-sm font-semibold text-red-600"
                          >
                            Excluir
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelSection>
    </div>
  );
}
