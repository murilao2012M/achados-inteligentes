import { BrandMark } from "@/components/BrandMark";
import { LoginForm } from "@/components/admin/LoginForm";
import { hasSupabaseConfig } from "@/utils/supabase/env";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <section className="section-space admin-grid-bg bg-slate-50">
      <div className="container-shell space-y-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-white/70 bg-white/85 px-5 py-3 shadow-soft">
            <BrandMark compact />
          </div>
        </div>
        {!hasSupabaseConfig() ? (
          <div className="admin-panel-shell mx-auto max-w-3xl p-8 text-sm leading-7 text-slate-600">
            Configure `NEXT_PUBLIC_SUPABASE_URL`,
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`
            para habilitar o painel administrativo.
          </div>
        ) : null}
        <LoginForm />
      </div>
    </section>
  );
}
