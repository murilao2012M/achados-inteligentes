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
      <div className="rounded-[1.5rem] border border-brand-100/80 bg-white/70 px-5 py-4 shadow-[0_12px_28px_rgba(21,33,54,0.04)]">
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
