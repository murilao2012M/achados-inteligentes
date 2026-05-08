import Link from "next/link";
import { BadgePercent, ChevronDown } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/utils/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div className="nav-shell px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label={siteConfig.name} className="shrink-0">
              <BrandMark compact />
            </Link>

            <nav className="hidden items-center gap-2 text-sm font-semibold text-ink lg:flex">
              {siteConfig.menu.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                  {index === 1 ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                </Link>
              ))}
            </nav>

            <Link href="/comparativos" className="hidden primary-cta sm:inline-flex">
              <BadgePercent className="h-4 w-4" />
              Ver ofertas
            </Link>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm font-semibold text-ink lg:hidden">
            {siteConfig.menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-brand-100 bg-brand-50/70 px-3 py-2 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/comparativos"
              className="whitespace-nowrap rounded-full bg-accent-500 px-4 py-2 font-bold text-white"
            >
              Ver ofertas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
