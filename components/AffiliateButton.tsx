import { ExternalLink } from "lucide-react";

type AffiliateButtonProps = {
  href: string;
  label?: string;
  fullWidth?: boolean;
};

export function AffiliateButton({
  href,
  label = "Ver na Amazon",
  fullWidth = false
}: AffiliateButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:bg-accent-600 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
