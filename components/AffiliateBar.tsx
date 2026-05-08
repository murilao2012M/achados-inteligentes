import { ShieldCheck } from "lucide-react";

export function AffiliateBar() {
  return (
    <section className="bg-brand-900 text-white">
      <div className="container-shell flex min-h-11 items-center justify-center px-4 py-2 text-center text-xs font-medium sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-100" />
          Como Associado Amazon, posso receber comissões por compras
          qualificadas realizadas por meio dos links deste site.
        </span>
      </div>
    </section>
  );
}
