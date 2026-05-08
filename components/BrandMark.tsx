import clsx from "clsx";
import Image from "next/image";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={clsx(
          "relative overflow-hidden rounded-[1.35rem]",
          compact ? "h-11 w-11" : "h-12 w-12",
          light
            ? "bg-white/10 shadow-lg shadow-black/20"
            : "bg-white shadow-lg shadow-brand-700/15 ring-1 ring-brand-100"
        )}
      >
        <Image
          src="/logo.png"
          alt="Logo Achados Inteligentes"
          fill
          sizes={compact ? "44px" : "48px"}
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-[1.45rem] tracking-tight",
            light ? "text-white" : "text-ink"
          )}
        >
          Achados
        </span>
        <span
          className={clsx(
            "-mt-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.32em]",
            light ? "text-brand-100" : "text-brand-700"
          )}
        >
          Inteligentes
        </span>
      </span>
    </span>
  );
}
