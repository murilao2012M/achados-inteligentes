type ProductPricingBoxProps = {
  priceLabel?: string;
  currentPrice?: string;
  originalPrice?: string;
  installmentInfo?: string;
  priceBadge?: string;
  priceNote?: string;
};

export function ProductPricingBox({
  priceLabel,
  currentPrice,
  originalPrice,
  installmentInfo,
  priceBadge,
  priceNote
}: ProductPricingBoxProps) {
  if (!currentPrice && !originalPrice && !installmentInfo && !priceNote) {
    return null;
  }

  return (
    <div className="rounded-[1.75rem] border border-amber-200/70 bg-[linear-gradient(135deg,#fffaf0,#fff4db)] p-6 shadow-[0_16px_40px_rgba(245,158,11,0.12)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {priceLabel || "Faixa de preço"}
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
            {currentPrice ? (
              <p className="font-display text-4xl leading-none text-ink">
                {currentPrice}
              </p>
            ) : null}
            {originalPrice ? (
              <p className="text-base font-medium text-slate-500 line-through">
                {originalPrice}
              </p>
            ) : null}
          </div>
          {installmentInfo ? (
            <p className="mt-3 text-sm font-medium text-slate-700">
              {installmentInfo}
            </p>
          ) : null}
        </div>

        {priceBadge ? (
          <span className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            {priceBadge}
          </span>
        ) : null}
      </div>

      {priceNote ? (
        <p className="mt-4 text-sm leading-6 text-slate-600">{priceNote}</p>
      ) : null}
    </div>
  );
}
