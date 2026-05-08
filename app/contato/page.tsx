import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";
import { siteConfig } from "@/utils/site";

export const metadata = buildMetadata({
  title: "Contato",
  description:
    "Informações de contato para dúvidas, sugestões, parcerias e oportunidades comerciais.",
  path: "/contato"
});

export default function ContactPage() {
  return (
    <section className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro
            eyebrow="Contato"
            title="Entre em contato"
            description="Este canal está disponível para dúvidas, sugestões, parcerias e assuntos comerciais relacionados ao site."
          />
          <div className="card-surface space-y-4 p-8 text-sm leading-7 text-slate-600">
            <p>
              <strong>E-mail:</strong> {siteConfig.contactEmail}
            </p>
            <p>
              <strong>Telefone:</strong> {siteConfig.phone}
            </p>
            <p>
              <strong>Localização:</strong> {siteConfig.address}
            </p>
          </div>
        </div>
        <div className="card-surface space-y-5 p-8 text-sm leading-7 text-slate-600">
          <h2 className="font-display text-3xl text-ink">
            Atendimento por e-mail
          </h2>
          <p>
            Para facilitar o atendimento, envie sua mensagem diretamente para{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold text-brand-700 hover:text-brand-800"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
          <p>
            Sempre que possível, inclua no assunto o motivo do contato, como
            parceria, suporte, sugestão de produto ou atualização de conteúdo.
          </p>
          <p>
            As mensagens são respondidas conforme a demanda, com prioridade para
            temas comerciais e solicitações relacionadas ao funcionamento do
            site.
          </p>
        </div>
      </div>
    </section>
  );
}
