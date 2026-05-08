import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/utils/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div className="rounded-[1.9rem] border border-brand-100/80 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(7,26,58,0.08)] backdrop-blur md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label={siteConfig.name}>
              <BrandMark compact />
            </Link>
            <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-700 lg:flex">
              {siteConfig.menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent px-4 py-2.5 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-800"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/comparativos"
              className="hidden items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-200/80 hover:bg-accent-600 sm:inline-flex"
            >
              <BadgePercent className="h-4 w-4" />
              Ver ofertas
            </Link>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm font-semibold text-slate-700 lg:hidden">
            {siteConfig.menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-brand-100 bg-brand-50/60 px-3 py-2 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/comparativos"
              className="whitespace-nowrap rounded-full bg-accent-500 px-4 py-2 font-bold text-white sm:hidden"
            >
              Ver ofertas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
