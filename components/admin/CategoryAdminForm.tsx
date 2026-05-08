import { saveCategoryAction } from "@/app/admin/actions";
import { Category } from "@/utils/types";

export function CategoryAdminForm({
  category
}: {
  category?: Category | null;
}) {
  return (
    <form action={saveCategoryAction} className="admin-panel-shell space-y-5 p-6">
      <input type="hidden" name="id" defaultValue={category?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Nome</span>
          <input
            name="name"
            required
            defaultValue={category?.name ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Slug</span>
          <input
            name="slug"
            required
            defaultValue={category?.slug ?? ""}
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
          defaultValue={category?.description ?? ""}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>URL da imagem</span>
        <input
          name="image"
          defaultValue={category?.image ?? ""}
          placeholder="https://..."
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
      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {category?.id ? "Salvar alterações" : "Criar categoria"}
      </button>
    </form>
  );
}
