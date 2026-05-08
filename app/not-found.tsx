import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl p-10 text-center">
          <h1 className="font-display text-4xl text-ink">Página não encontrada</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            O conteúdo que você tentou acessar não existe ou foi movido.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
