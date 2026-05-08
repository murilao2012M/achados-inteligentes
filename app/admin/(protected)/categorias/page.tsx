import Link from "next/link";
import { deleteCategoryAction } from "@/app/admin/actions";
import { CategoryAdminForm } from "@/components/admin/CategoryAdminForm";
import { EntityHeader } from "@/components/admin/EntityHeader";
import { PanelSection } from "@/components/admin/PanelSection";
import { getCategoriesAdmin } from "@/utils/content";

export default async function AdminCategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const categories = await getCategoriesAdmin();
  const editingCategory = categories.find((category) => category.id === edit);

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Categorias"
        description="Cadastre os principais nichos do site com nome, slug, descrição e imagem."
      />

      <PanelSection
        title={editingCategory ? "Editar categoria" : "Nova categoria"}
        description="Organize as áreas do site para facilitar a navegação e a publicação de produtos."
      >
        <CategoryAdminForm category={editingCategory} />
      </PanelSection>

      <PanelSection
        title="Categorias cadastradas"
        description="Edite ou remova categorias conforme sua estratégia de conteúdo."
      >
        <div className="admin-panel-shell overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Nome</th>
                <th className="px-5 py-4 font-semibold">Slug</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.slug}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{category.name}</td>
                  <td className="px-5 py-4 text-slate-500">{category.slug}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/categorias?edit=${category.id}`}
                        className="text-sm font-semibold text-brand-700"
                      >
                        Editar
                      </Link>
                      {category.id ? (
                        <form action={deleteCategoryAction}>
                          <input type="hidden" name="id" value={category.id} />
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
