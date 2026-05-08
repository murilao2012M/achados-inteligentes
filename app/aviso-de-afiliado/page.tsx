import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata = buildMetadata({
  title: "Aviso de Afiliado",
  description:
    "Declaração transparente sobre o uso de links de afiliado no site e possível recebimento de comissão por compras qualificadas.",
  path: "/aviso-de-afiliado"
});

export default function AffiliateNoticePage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Transparência"
          title="Aviso de Afiliado"
          description="Página dedicada para reforçar confiança, conformidade e clareza com o visitante."
        />
        <div className="card-surface max-w-3xl p-8 prose-affiliate">
          <p>
            Como Associado Amazon, posso receber comissões por compras
            qualificadas realizadas por meio dos links deste site.
          </p>
          <p>
            As recomendações publicadas aqui têm caráter editorial e informativo.
            O site não representa a Amazon oficialmente e não garante preços
            fixos, disponibilidade ou condições promocionais futuras.
          </p>
        </div>
      </div>
    </section>
  );
}
