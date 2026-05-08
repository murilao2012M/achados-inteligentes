import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Texto base de política de privacidade com explicações sobre cookies, links de afiliado e ferramentas de análise.",
  path: "/politica-de-privacidade"
});

export default function PrivacyPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Privacidade"
          title="Política de Privacidade"
          description="Texto base para você adaptar conforme suas ferramentas, integrações e exigências legais."
        />
        <div className="card-surface max-w-4xl p-8 prose-affiliate">
          <p>
            Este site pode coletar informações básicas de navegação, incluindo
            dados de cookies, páginas acessadas e interações com botões, com o
            objetivo de melhorar a experiência do usuário e analisar desempenho.
          </p>
          <p>
            Ferramentas de análise como Google Analytics, Search Console e pixel
            de rastreamento podem ser utilizadas, desde que configuradas por
            você no ambiente do projeto.
          </p>
          <p>
            O site também utiliza links de afiliado. Quando o visitante clica em
            um desses links e realiza uma compra qualificada, o responsável pelo
            site pode receber comissão, sem custo adicional para o usuário.
          </p>
          <p>
            Antes de publicar, revise esta política com base nas leis e normas
            aplicáveis ao seu caso, incluindo uso de cookies, consentimento e
            provedores externos realmente conectados ao site.
          </p>
        </div>
      </div>
    </section>
  );
}
