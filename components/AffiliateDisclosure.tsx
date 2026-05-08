import clsx from "clsx";
import { ShieldAlert } from "lucide-react";

type AffiliateDisclosureProps = {
  className?: string;
};

export function AffiliateDisclosure({
  className
}: AffiliateDisclosureProps) {
  return (
    <section className={clsx("py-4", className)}>
      <div className="container-shell flex items-center justify-center gap-2 text-center text-sm text-brand-900">
        <ShieldAlert className="h-4 w-4 shrink-0" />
        Como Associado Amazon, posso receber comissões por compras qualificadas
        realizadas por meio dos links deste site.
      </div>
    </section>
  );
}
