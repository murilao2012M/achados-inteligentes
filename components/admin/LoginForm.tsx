"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/admin/actions";

const initialState = {
  error: ""
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="admin-panel-shell mx-auto max-w-md bg-white/95 p-8 backdrop-blur"
    >
      <h1 className="font-display text-3xl text-ink">Entrar no painel</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Use o e-mail e a senha cadastrados no Supabase Auth.
      </p>
      <div className="mt-6 space-y-4">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
          />
        </label>
      </div>
      {state.error ? (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
