import { saveProductAction } from "@/app/admin/actions";
import { Category, Product } from "@/utils/types";

export function ProductAdminForm({
  product,
  categories
}: {
  product?: Product | null;
  categories: Category[];
}) {
  return (
    <form action={saveProductAction} className="admin-panel-shell space-y-5 p-6">
      <input type="hidden" name="id" defaultValue={product?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Nome</span>
          <input
            name="name"
            required
            defaultValue={product?.name ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Slug</span>
          <input
            name="slug"
            required
            defaultValue={product?.slug ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Categoria</span>
          <select
            name="categorySlug"
            required
            defaultValue={product?.categorySlug ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option value="">Selecione</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Nota editorial</span>
          <input
            name="editorialRating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            defaultValue={product?.editorialRating ?? 4.5}
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
          defaultValue={product?.description ?? ""}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Link de afiliado Amazon</span>
          <input
            name="affiliateLink"
            required
            defaultValue={product?.affiliateLink ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Tag de destaque</span>
          <input
            name="highlightTag"
            defaultValue={product?.highlightTag ?? ""}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>

      <div className="rounded-[1.8rem] border border-amber-200 bg-amber-50/60 p-5">
        <div className="mb-4">
          <h3 className="font-display text-2xl text-ink">Preço estratégico</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Preencha apenas o que fizer sentido. Esse bloco aparece na página do
            produto para reforçar valor e contexto comercial.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Rótulo do bloco</span>
            <input
              name="priceLabel"
              defaultValue={product?.priceLabel ?? ""}
              placeholder="Ex.: Oferta de hoje"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Preço atual</span>
            <input
              name="currentPrice"
              defaultValue={product?.currentPrice ?? ""}
              placeholder="Ex.: R$ 764,10"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Preço anterior</span>
            <input
              name="originalPrice"
              defaultValue={product?.originalPrice ?? ""}
              placeholder="Ex.: R$ 859,00"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Parcelamento</span>
            <input
              name="installmentInfo"
              defaultValue={product?.installmentInfo ?? ""}
              placeholder="Ex.: Em até 12x de R$ 63,73 sem juros"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Selo de preço</span>
            <input
              name="priceBadge"
              defaultValue={product?.priceBadge ?? ""}
              placeholder="Ex.: 11% OFF"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2 xl:col-span-1">
            <span>Observação de preço</span>
            <input
              name="priceNote"
              defaultValue={product?.priceNote ?? ""}
              placeholder="Ex.: Valor sujeito a alterações na Amazon."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>URL da imagem</span>
          <input
            name="image"
            defaultValue={product?.image ?? ""}
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
      </div>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Para quem é indicado</span>
        <textarea
          name="recommendedFor"
          rows={3}
          defaultValue={product?.recommendedFor ?? ""}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>
      <div className="grid gap-5 xl:grid-cols-3">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Benefícios</span>
          <textarea
            name="benefits"
            rows={6}
            defaultValue={(product?.benefits ?? []).join("\n")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Prós</span>
          <textarea
            name="pros"
            rows={6}
            defaultValue={(product?.pros ?? []).join("\n")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Contras</span>
          <textarea
            name="cons"
            rows={6}
            defaultValue={(product?.cons ?? []).join("\n")}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
          />
          Destacar na home
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={product?.published ?? true}
          />
          Publicado
        </label>
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
      >
        {product?.id ? "Salvar alterações" : "Criar produto"}
      </button>
    </form>
  );
}
