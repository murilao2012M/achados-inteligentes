"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  Cog,
  FolderKanban,
  LayoutDashboard,
  Package,
  Scale
} from "lucide-react";
import clsx from "clsx";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/categorias", label: "Categorias", icon: FolderKanban },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/posts", label: "Posts", icon: BookOpenText },
  { href: "/admin/comparativos", label: "Comparativos", icon: Scale },
  { href: "/admin/configuracoes", label: "Configurações", icon: Cog }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-panel-shell h-fit overflow-hidden">
      <div className="bg-brand-900 p-5 text-white">
        <BrandMark light compact />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
          Painel editorial e comercial
        </p>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
          Navegação
        </p>
        <nav className="mt-5 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-brand-700 text-white shadow-lg shadow-brand-700/15"
                  : "text-slate-700 hover:bg-brand-50 hover:text-brand-900"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
