import { signOutAction } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdminUser } from "@/utils/admin";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <section className="section-space admin-grid-bg bg-slate-50">
      <div className="container-shell grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="space-y-5">
          <AdminSidebar />
          <form action={signOutAction} className="admin-panel-shell p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sessão ativa
            </p>
            <p className="mt-2 text-sm text-slate-600">{user.email}</p>
            <button
              type="submit"
              className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink hover:bg-slate-50"
            >
              Sair
            </button>
          </form>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
