import Link from "next/link";
import { deleteProductAction } from "@/app/admin/actions";
import { EntityHeader } from "@/components/admin/EntityHeader";
import { PanelSection } from "@/components/admin/PanelSection";
import { ProductAdminForm } from "@/components/admin/ProductAdminForm";
import { getAllProductsAdmin, getCategoriesAdmin } from "@/utils/content";

export default async function AdminProductsPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProductsAdmin(),
    getCategoriesAdmin()
  ]);
  const editingProduct = products.find((product) => product.id === edit);

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Produtos"
        description="Cadastre produtos com link da Amazon, benefícios, prós, contras, preço estratégico e destaque para home ou comparativos."
      />

      <PanelSection
        title={editingProduct ? "Editar produto" : "Novo produto"}
        description="Preencha os dados do produto e organize as informações para facilitar a decisão do visitante."
      >
        <ProductAdminForm product={editingProduct} categories={categories} />
      </PanelSection>

      <PanelSection
        title="Produtos cadastrados"
        description="Acompanhe os produtos publicados e atualize categoria, destaque, preços e links quando necessário."
      >
        <div className="admin-panel-shell overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Produto</th>
                <th className="px-5 py-4 font-semibold">Categoria</th>
                <th className="px-5 py-4 font-semibold">Destaque</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.slug}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p>{product.name}</p>
                      {product.currentPrice ? (
                        <p className="mt-1 text-sm text-slate-500">
                          {product.currentPrice}
                        </p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{product.category}</td>
                  <td className="px-5 py-4 text-slate-500">
                    {product.highlightTag}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/produtos?edit=${product.id}`}
                        className="text-sm font-semibold text-brand-700"
                      >
                        Editar
                      </Link>
                      {product.id ? (
                        <form action={deleteProductAction}>
                          <input type="hidden" name="id" value={product.id} />
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
