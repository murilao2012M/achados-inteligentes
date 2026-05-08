import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/utils/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071A3A] py-16 text-slate-200">
      <div className="container-shell">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(35,87,198,0.38),transparent_32%),radial-gradient(circle_at_right,rgba(245,158,11,0.16),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="space-y-4">
              <BrandMark light />
              <h2 className="max-w-2xl font-display text-3xl text-white sm:text-4xl">
                Recomendações de produtos para ajudar você a comparar melhor
                antes de comprar.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Aqui você encontra comparativos, listas dos melhores produtos,
                reviews e guias de compra para fazer escolhas mais seguras e
                práticas na Amazon.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-100">
                Aviso de afiliado
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Como Associado Amazon, este site pode receber comissão por
                compras qualificadas realizadas por meio dos links publicados.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="max-w-md text-sm leading-6 text-slate-300">
              Conteúdo feito para facilitar a pesquisa de produtos nas
              categorias mais procuradas, com foco em praticidade, comparação e
              confiança na hora da compra.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
              <ShieldCheck className="h-4 w-4" />
              Transparência nos links
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-300">
              <Mail className="h-4 w-4 text-brand-200" />
              {siteConfig.contactEmail}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Navegação
            </p>
            <div className="flex flex-col gap-3 text-sm">
              {siteConfig.menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Categorias
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/categorias/tecnologia" className="hover:text-white">
                Tecnologia
              </Link>
              <Link href="/categorias/casa-e-cozinha" className="hover:text-white">
                Casa e Cozinha
              </Link>
              <Link href="/categorias/eletronicos" className="hover:text-white">
                Eletrônicos
              </Link>
              <Link href="/categorias/beleza" className="hover:text-white">
                Beleza
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Informações
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/aviso-de-afiliado" className="hover:text-white">
                Aviso de Afiliado
              </Link>
              <Link href="/politica-de-privacidade" className="hover:text-white">
                Política de Privacidade
              </Link>
              <Link href="/sobre" className="hover:text-white">
                Sobre o site
              </Link>
              <Link href="/contato" className="hover:text-white">
                Contato
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p className="uppercase tracking-[0.18em]">
            {siteConfig.name} • produtos recomendados, comparativos e conteúdos
            para comprar melhor.
          </p>
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
