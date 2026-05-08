"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="card-surface p-8">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Nome</span>
            <input
              type="text"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>E-mail</span>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Mensagem</span>
          <textarea
            required
            rows={6}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Enviar mensagem
        </button>
      </form>
      {submitted ? (
        <p className="mt-4 text-sm text-brand-800">
          Formulário demonstrativo enviado. Para produção, conecte este
          componente a um serviço como Resend, Formspree ou sua API própria.
        </p>
      ) : null}
    </div>
  );
}
