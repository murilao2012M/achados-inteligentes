import Link from "next/link";
import { Instagram, Mail, ShieldCheck, Youtube } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { getCategories, getSiteSettings } from "@/utils/content";
import { siteConfig } from "@/utils/site";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = (await getCategories()).slice(0, 6);
  const settings = await getSiteSettings();

  return (
    <footer className="bg-brand-900 py-16 text-slate-200">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <BrandMark light />
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Seu guia confiável para encontrar os melhores produtos da Amazon com
              comparativos, análises e recomendações objetivas.
            </p>
            <div className="flex items-center gap-3 text-slate-300">
              {settings.instagramUrl ? (
                <Link
                  href={settings.instagramUrl}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              ) : null}
              {settings.youtubeUrl ? (
                <Link
                  href={settings.youtubeUrl}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              ) : null}
              {settings.contactEmail ? (
                <Link
                  href={`mailto:${settings.contactEmail}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Navegação
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              {siteConfig.menu.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
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
                Sobre
              </Link>
              <Link href="/contato" className="hover:text-white">
                Contato
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Categorias populares
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categorias/${category.slug}`}
                  className="footer-pill hover:bg-white/12"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Aviso de afiliado
            </p>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
              <p className="inline-flex items-center gap-2 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-brand-100" />
                Transparência nos links
              </p>
              <p className="mt-2">
                Como Associado Amazon, posso receber comissões por compras
                qualificadas realizadas através dos links deste site.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {currentYear} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
