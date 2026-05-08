import products from "@/data/products.json";
import categories from "@/data/categories.json";
import posts from "@/data/posts.json";

export type Product = (typeof products)[number];
export type Category = (typeof categories)[number];
export type BlogPost = (typeof posts)[number];

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getBestSellers() {
  return products.filter((product) => product.highlightTag === "Mais vendido");
}

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getComparisons() {
  return [
    {
      slug: "melhores-fones-bluetooth",
      title: "Melhores fones bluetooth para trabalho, treino e uso diário",
      description:
        "Compare autonomia, cancelamento de ruído e custo-benefício antes de escolher seu próximo fone.",
      products: [
        "fone-bluetooth-soundmax-pro",
        "headset-home-office-clarity-500",
        "caixa-jbl-pocket-wave"
      ]
    },
    {
      slug: "melhores-air-fryers",
      title: "Melhores air fryers para cozinhas práticas",
      description:
        "Veja as diferenças entre capacidade, potência e facilidade de limpeza para acertar na compra.",
      products: [
        "air-fryer-family-chef-55l",
        "cafeteira-programavel-morning-brew",
        "aspirador-robo-cleanpath-smart"
      ]
    }
  ];
}

export function getComparisonBySlug(slug: string) {
  return getComparisons().find((comparison) => comparison.slug === slug);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean) as Product[];
}

export function getPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
