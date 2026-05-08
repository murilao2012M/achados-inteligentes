"use client";

import { useMemo, useState } from "react";
import { Product, Category } from "@/utils/types";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";

type ProductFilterProps = {
  products: Product[];
  categories: Category[];
};

export function ProductFilter({ products, categories }: ProductFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        query.length === 0 ||
        [product.name, product.description, product.category]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="shell-panel grid gap-4 p-6 md:grid-cols-[1.5fr_1fr]">
        <SearchBar value={query} onChange={setQuery} />
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Filtrar por categoria</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
          >
            <option value="all">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="shell-panel p-8 text-center text-slate-600">
          Nenhum produto encontrado para os filtros selecionados.
        </div>
      ) : null}
    </div>
  );
}
