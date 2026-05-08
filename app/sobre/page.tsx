import { buildMetadata } from "@/components/SEOHead";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata = buildMetadata({
  title: "Sobre",
  description:
    "Conheça a proposta do Achados Inteligentes e como o site publica recomendações de produtos com transparência.",
  path: "/sobre"
});

export default function AboutPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Sobre"
          title="Um site criado para ajudar você a encontrar produtos e comprar com mais segurança"
          description="A proposta do Achados Inteligentes é reunir recomendações, comparativos e conteúdos úteis para facilitar a sua decisão de compra."
        />
        <div className="card-surface max-w-4xl p-8 prose-affiliate">
          <p>
            O Achados Inteligentes foi criado para divulgar produtos de
            diferentes categorias em um ambiente claro, confiável e fácil de
            navegar.
          </p>
          <p>
            Aqui você encontra listas dos melhores produtos, páginas de análise,
            comparativos e guias de compra para pesquisar melhor antes de tomar
            uma decisão.
          </p>
          <p>
            Nosso objetivo é apresentar informações úteis, pontos fortes,
            limitações e indicações de uso para que você possa avaliar melhor
            cada opção.
          </p>
          <p>
            Nosso compromisso é apresentar informações úteis, de forma clara e
            organizada, para ajudar você a comparar melhor antes da compra.
          </p>
        </div>
      </div>
    </section>
  );
}
