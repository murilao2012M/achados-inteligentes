import { ArrowUpRight } from "lucide-react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description
}: SectionIntroProps) {
  return (
    <div className="mb-8 max-w-3xl space-y-3">
      {eyebrow ? (
        <span className="section-label">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-2xl font-display text-[2rem] leading-tight text-ink sm:text-[2.35rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
