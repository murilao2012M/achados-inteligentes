import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";
import { getSiteSettings } from "@/utils/content";

export const metadata = buildMetadata({
  title: "Contato",
  description:
    "Informações de contato para dúvidas, sugestões, parcerias e oportunidades comerciais.",
  path: "/contato"
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

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
            {settings.contactEmail ? (
              <p>
                <strong>E-mail:</strong> {settings.contactEmail}
              </p>
            ) : null}
            {settings.phone ? (
              <p>
                <strong>Telefone:</strong> {settings.phone}
              </p>
            ) : null}
            {settings.address ? (
              <p>
                <strong>Localização:</strong> {settings.address}
              </p>
            ) : null}
          </div>
        </div>
        <div className="card-surface space-y-5 p-8 text-sm leading-7 text-slate-600">
          <h2 className="font-display text-3xl text-ink">
            Atendimento por e-mail
          </h2>
          {settings.contactEmail ? (
            <>
              <p>
                Para facilitar o atendimento, envie sua mensagem diretamente para{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  {settings.contactEmail}
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
            </>
          ) : (
            <p>
              Este canal pode ser ativado depois pelo painel administrativo, assim
              que você definir um e-mail ou outro meio oficial de contato para o
              site.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
