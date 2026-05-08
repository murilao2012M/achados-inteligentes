import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { getSiteSettings } from "@/utils/content";

export async function TransparencyBlock() {
  const settings = await getSiteSettings();

  if (!settings.newsletterEnabled) {
    return null;
  }

  return (
    <section className="container-shell pb-14 pt-8">
      <div className="overflow-hidden rounded-[2rem] bg-brand-500 px-6 py-7 text-white shadow-[0_24px_60px_rgba(35,87,198,0.3)] sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="flex max-w-3xl gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/12">
              <Mail className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-3xl leading-tight text-white">
                {settings.newsletterTitle}
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-50">
                {settings.newsletterDescription}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-3 shadow-lg sm:flex-row">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="h-12 flex-1 rounded-full border border-slate-200 px-5 text-sm text-slate-700 outline-none"
              />
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-500 px-6 text-sm font-bold text-white hover:bg-accent-600">
                Quero receber
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {settings.contactEmail ? (
              <p className="text-xs text-brand-100">
                Contato principal: {settings.contactEmail}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
