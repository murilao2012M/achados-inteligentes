import Link from "next/link";
import {
  BookOpenText,
  FolderKanban,
  Package,
  Scale,
  TrendingUp
} from "lucide-react";
import { EntityHeader } from "@/components/admin/EntityHeader";
import {
  getAllProductsAdmin,
  getCategoriesAdmin,
  getComparisonsAdmin,
  getPostsAdmin
} from "@/utils/content";

export default async function AdminDashboardPage() {
  const [categories, products, posts, comparisons] = await Promise.all([
    getCategoriesAdmin(),
    getAllProductsAdmin(),
    getPostsAdmin(),
    getComparisonsAdmin()
  ]);

  const stats = [
    {
      label: "Categorias",
      value: categories.length,
      href: "/admin/categorias",
      icon: FolderKanban
    },
    {
      label: "Produtos",
      value: products.length,
      href: "/admin/produtos",
      icon: Package
    },
    {
      label: "Posts",
      value: posts.length,
      href: "/admin/posts",
      icon: BookOpenText
    },
    {
      label: "Comparativos",
      value: comparisons.length,
      href: "/admin/comparativos",
      icon: Scale
    }
  ];

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Painel administrativo"
        description="Gerencie o conteúdo comercial e editorial do site sem precisar editar arquivos manualmente."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="admin-panel-shell group p-6 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-700">
                  {stat.label}
                </p>
                <p className="mt-3 font-display text-5xl text-ink">
                  {stat.value}
                </p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-800">
                <stat.icon className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-panel-shell p-8 text-sm leading-7 text-slate-600">
          Cadastre categorias primeiro, depois produtos, posts e comparativos.
          Se estiver usando upload, crie no Supabase Storage o bucket público
          `site-assets`.
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-brand-900 p-8 text-white shadow-soft">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-3xl">
            Um painel mais profissional para crescer com conteúdo
          </h2>
          <p className="mt-4 text-sm leading-7 text-brand-100">
            A ideia é deixar sua operação de afiliado simples: cadastrar,
            revisar e publicar sem tocar no código.
          </p>
        </div>
      </div>
    </div>
  );
}
