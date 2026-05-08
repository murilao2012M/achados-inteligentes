import { Sparkles } from "lucide-react";

type EntityHeaderProps = {
  title: string;
  description: string;
};

export function EntityHeader({ title, description }: EntityHeaderProps) {
  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800">
        <Sparkles className="h-3.5 w-3.5" />
        Gestão editorial
      </span>
      <h1 className="font-display text-4xl text-ink">{title}</h1>
      <p className="max-w-3xl text-base leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}
