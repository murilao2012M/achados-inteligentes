import { ShieldCheck } from "lucide-react";

export function AffiliateBar() {
  return (
    <section className="border-y border-brand-100/80 bg-white/90">
      <div className="container-shell flex min-h-12 items-center justify-center px-4 py-3 text-center text-sm text-slate-600">
        <span className="inline-flex items-center gap-2 font-medium">
          <ShieldCheck className="h-4 w-4 text-brand-600" />
          Como Associado Amazon, posso receber comissão por compras
          qualificadas realizadas por meio dos links deste site.
        </span>
      </div>
    </section>
  );
}
