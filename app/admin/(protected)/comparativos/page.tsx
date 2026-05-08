import Link from "next/link";
import { deleteComparisonAction } from "@/app/admin/actions";
import { ComparisonAdminForm } from "@/components/admin/ComparisonAdminForm";
import { EntityHeader } from "@/components/admin/EntityHeader";
import { PanelSection } from "@/components/admin/PanelSection";
import { getComparisonsAdmin } from "@/utils/content";

export default async function AdminComparisonsPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const comparisons = await getComparisonsAdmin();
  const editingComparison = comparisons.find(
    (comparison) => comparison.id === edit
  );

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Comparativos"
        description="Monte páginas comparativas definindo a ordem dos produtos e o foco de cada recomendação."
      />

      <PanelSection
        title={editingComparison ? "Editar comparativo" : "Novo comparativo"}
        description="Crie comparações claras entre produtos para ajudar o visitante a decidir mais rápido."
      >
        <ComparisonAdminForm comparison={editingComparison} />
      </PanelSection>

      <PanelSection
        title="Comparativos cadastrados"
        description="Revise os comparativos já criados e ajuste os slugs conforme novos produtos forem entrando no site."
      >
        <div className="admin-panel-shell overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Título</th>
                <th className="px-5 py-4 font-semibold">Slug</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison) => (
                <tr
                  key={comparison.slug}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{comparison.title}</td>
                  <td className="px-5 py-4 text-slate-500">{comparison.slug}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/comparativos?edit=${comparison.id}`}
                        className="text-sm font-semibold text-brand-700"
                      >
                        Editar
                      </Link>
                      {comparison.id ? (
                        <form action={deleteComparisonAction}>
                          <input type="hidden" name="id" value={comparison.id} />
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
