import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TransparencyBlock() {
  return (
    <section className="container-shell pb-14 pt-8">
      <div className="flex flex-col gap-5 rounded-[2rem] border border-brand-100 bg-[linear-gradient(135deg,#edf4ff,#fff8ec)] px-6 py-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex max-w-3xl gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-200/80">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-2xl text-ink">
              Transparência e confiança em primeiro lugar
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Este site participa do Programa de Associados Amazon. Ao clicar em
              nossos links e realizar uma compra, podemos receber uma comissão,
              sem nenhum custo adicional para você.
            </p>
          </div>
        </div>
        <Link
          href="/aviso-de-afiliado"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
        >
          Saiba mais sobre o aviso de afiliado
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
