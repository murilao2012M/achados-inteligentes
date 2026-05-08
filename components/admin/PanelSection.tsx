type PanelSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PanelSection({
  title,
  description,
  children
}: PanelSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
