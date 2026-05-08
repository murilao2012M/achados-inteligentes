import { saveComparisonAction } from "@/app/admin/actions";
import { Comparison } from "@/utils/types";

export function ComparisonAdminForm({
  comparison
}: {
  comparison?: Comparison | null;
}) {
  return (
    <form action={saveComparisonAction} className="admin-panel-shell space-y-5 p-6">
      <input type="hidden" name="id" defaultValue={comparison?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Título</span>
          <input
            name="title"
            required
            defaultValue={comparison?.title ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Slug</span>
          <input
            name="slug"
            required
            defaultValue={comparison?.slug ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Descrição</span>
        <textarea
          name="description"
          rows={4}
          required
          defaultValue={comparison?.description ?? ""}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Slugs dos produtos</span>
        <textarea
          name="products"
          rows={6}
          defaultValue={(comparison?.products ?? []).join("\n")}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <span className="block text-xs text-slate-500">
          Um slug por linha, na ordem em que deseja exibir na tabela.
        </span>
      </label>
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={comparison?.published ?? true}
        />
        Publicado
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {comparison?.id ? "Salvar alterações" : "Criar comparativo"}
      </button>
    </form>
  );
}
