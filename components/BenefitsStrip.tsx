import {
  BadgeCheck,
  ChartNoAxesColumn,
  CircleDollarSign,
  ShieldCheck
} from "lucide-react";

const benefitItems = [
  {
    title: "Curadoria rigorosa",
    description:
      "Selecionamos apenas os melhores produtos e marcas confiáveis na Amazon.",
    icon: ShieldCheck
  },
  {
    title: "Comparativos justos",
    description:
      "Análises imparciais para você entender o que realmente vale a pena.",
    icon: ChartNoAxesColumn
  },
  {
    title: "Transparência total",
    description:
      "Links de afiliado identificados e conteúdo sempre claro e confiável.",
    icon: BadgeCheck
  },
  {
    title: "Recomendações objetivas",
    description:
      "Foco em custo-benefício e na melhor experiência para você.",
    icon: CircleDollarSign
  }
];

export function BenefitsStrip() {
  return (
    <section className="container-shell py-4">
      <div className="grid gap-4 rounded-[2rem] border border-brand-100/80 bg-white p-5 shadow-soft md:grid-cols-2 xl:grid-cols-4 xl:p-6">
        {benefitItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-[1.4rem] border border-transparent px-2 py-2"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <item.icon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-lg text-ink">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
