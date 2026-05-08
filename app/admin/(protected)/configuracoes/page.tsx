import { EntityHeader } from "@/components/admin/EntityHeader";
import { PanelSection } from "@/components/admin/PanelSection";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettingsAdmin } from "@/utils/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettingsAdmin();

  return (
    <div className="space-y-8">
      <EntityHeader
        title="Configurações do site"
        description="Controle os dados institucionais, canais sociais e blocos opcionais do layout sem precisar editar código."
      />

      <PanelSection
        title="Informações institucionais"
        description="Cadastre apenas os canais e contatos que já existem. O site esconde automaticamente o que estiver vazio ou desativado."
      >
        <SiteSettingsForm settings={settings} />
      </PanelSection>
    </div>
  );
}
