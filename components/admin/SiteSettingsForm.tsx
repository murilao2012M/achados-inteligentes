import { saveSiteSettingsAction } from "@/app/admin/actions";
import { SiteSettings } from "@/utils/types";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <form action={saveSiteSettingsAction} className="admin-panel-shell space-y-5 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>E-mail de contato</span>
          <input
            name="contactEmail"
            defaultValue={settings.contactEmail}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Telefone</span>
          <input
            name="phone"
            defaultValue={settings.phone}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Localização</span>
        <input
          name="address"
          defaultValue={settings.address}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Instagram</span>
          <input
            name="instagramUrl"
            defaultValue={settings.instagramUrl}
            placeholder="https://instagram.com/..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>YouTube</span>
          <input
            name="youtubeUrl"
            defaultValue={settings.youtubeUrl}
            placeholder="https://youtube.com/..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
        </label>
      </div>

      <div className="rounded-[1.8rem] border border-brand-100 bg-brand-50/50 p-5">
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="newsletterEnabled"
            defaultChecked={settings.newsletterEnabled}
          />
          Exibir bloco de newsletter/chamada de captação no site
        </label>

        <div className="mt-5 grid gap-5">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Título do bloco</span>
            <input
              name="newsletterTitle"
              defaultValue={settings.newsletterTitle}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Descrição do bloco</span>
            <textarea
              name="newsletterDescription"
              rows={3}
              defaultValue={settings.newsletterDescription}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
      >
        Salvar configurações
      </button>
    </form>
  );
}
