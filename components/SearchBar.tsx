"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700">
      <span>Buscar produto</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex.: fone bluetooth, air fryer, cama pet..."
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
      />
    </label>
  );
}
