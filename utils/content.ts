import { unstable_cache, unstable_noStore as noStore } from "next/cache";
import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import postsJson from "@/data/posts.json";
import comparisonsJson from "@/data/comparisons.json";
import {
  BlogFaq,
  BlogPost,
  BlogSection,
  Category,
  Comparison,
  Product
} from "@/utils/types";
import {
  createSupabaseAdminClient,
  createSupabasePublicClient,
  createSupabaseServerClient
} from "@/utils/supabase/server";
import { hasSupabaseConfig } from "@/utils/supabase/env";

const isProduction = process.env.NODE_ENV === "production";

function getLocalFallback<T>(label: string, data: T): T {
  if (isProduction) {
    throw new Error(
      `Conteúdo local de fallback bloqueado em produção para ${label}. Configure o Supabase corretamente antes do deploy.`
    );
  }

  return data;
}

function resolvePublicSource<T>(
  label: string,
  data: T | null,
  fallback: T
): T {
  if (data) {
    return data;
  }

  return getLocalFallback(label, fallback);
}

function ensurePublicContentConfig() {
  if (!hasSupabaseConfig()) {
    if (isProduction) {
      throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios em produção."
      );
    }

    return false;
  }

  return true;
}

function normalizeCategory(category: Record<string, unknown>): Category {
  return {
    id: String(category.id ?? ""),
    name: String(category.name ?? ""),
    slug: String(category.slug ?? ""),
    description: String(category.description ?? ""),
    image: String(category.image_url ?? category.image ?? ""),
    createdAt: String(category.created_at ?? category.createdAt ?? ""),
    updatedAt: String(category.updated_at ?? category.updatedAt ?? "")
  };
}

function normalizeProduct(product: Record<string, unknown>): Product {
  return {
    id: String(product.id ?? ""),
    name: String(product.name ?? ""),
    slug: String(product.slug ?? ""),
    category: String(product.category ?? ""),
    categorySlug: String(product.category_slug ?? product.categorySlug ?? ""),
    image: String(product.image_url ?? product.image ?? ""),
    description: String(product.description ?? ""),
    priceLabel: String(product.price_label ?? product.priceLabel ?? ""),
    currentPrice: String(product.current_price ?? product.currentPrice ?? ""),
    originalPrice: String(product.original_price ?? product.originalPrice ?? ""),
    installmentInfo: String(
      product.installment_info ?? product.installmentInfo ?? ""
    ),
    priceBadge: String(product.price_badge ?? product.priceBadge ?? ""),
    priceNote: String(product.price_note ?? product.priceNote ?? ""),
    benefits: Array.isArray(product.benefits)
      ? product.benefits.map(String)
      : [],
    pros: Array.isArray(product.pros) ? product.pros.map(String) : [],
    cons: Array.isArray(product.cons) ? product.cons.map(String) : [],
    recommendedFor: String(
      product.recommended_for ?? product.recommendedFor ?? ""
    ),
    affiliateLink: String(
      product.affiliate_link ?? product.affiliateLink ?? ""
    ),
    highlightTag: String(product.highlight_tag ?? product.highlightTag ?? ""),
    editorialRating: Number(
      product.editorial_rating ?? product.editorialRating ?? 0
    ),
    featured: Boolean(product.featured),
    published: product.published === undefined ? true : Boolean(product.published),
    createdAt: String(product.created_at ?? product.createdAt ?? ""),
    updatedAt: String(product.updated_at ?? product.updatedAt ?? "")
  };
}

function normalizeSection(section: Record<string, unknown>): BlogSection {
  return {
    heading: String(section.heading ?? ""),
    content: Array.isArray(section.content) ? section.content.map(String) : []
  };
}

function normalizeFaq(faq: Record<string, unknown>): BlogFaq {
  return {
    question: String(faq.question ?? ""),
    answer: String(faq.answer ?? "")
  };
}

function normalizePost(post: Record<string, unknown>): BlogPost {
  return {
    id: String(post.id ?? ""),
    title: String(post.title ?? ""),
    slug: String(post.slug ?? ""),
    category: String(post.category ?? ""),
    excerpt: String(post.excerpt ?? ""),
    image: String(post.image_url ?? post.image ?? ""),
    seoTitle: String(post.seo_title ?? post.seoTitle ?? ""),
    seoDescription: String(post.seo_description ?? post.seoDescription ?? ""),
    publishedAt: String(post.published_at ?? post.publishedAt ?? ""),
    faq: Array.isArray(post.faq) ? post.faq.map((item) => normalizeFaq(item as Record<string, unknown>)) : [],
    sections: Array.isArray(post.sections)
      ? post.sections.map((item) =>
          normalizeSection(item as Record<string, unknown>)
        )
      : [],
    recommendedProductSlugs: Array.isArray(
      post.recommended_product_slugs ?? post.recommendedProductSlugs
    )
      ? (
          (post.recommended_product_slugs ??
            post.recommendedProductSlugs) as unknown[]
        ).map(String)
      : [],
    published: post.published === undefined ? true : Boolean(post.published),
    createdAt: String(post.created_at ?? post.createdAt ?? ""),
    updatedAt: String(post.updated_at ?? post.updatedAt ?? "")
  };
}

function normalizeComparison(comparison: Record<string, unknown>): Comparison {
  return {
    id: String(comparison.id ?? ""),
    slug: String(comparison.slug ?? ""),
    title: String(comparison.title ?? ""),
    description: String(comparison.description ?? ""),
    products: Array.isArray(comparison.product_slugs ?? comparison.products)
      ? ((comparison.product_slugs ?? comparison.products) as unknown[]).map(
          String
        )
      : [],
    published:
      comparison.published === undefined ? true : Boolean(comparison.published),
    createdAt: String(comparison.created_at ?? comparison.createdAt ?? ""),
    updatedAt: String(comparison.updated_at ?? comparison.updatedAt ?? "")
  };
}

async function fetchSupabaseCategories(options?: { live?: boolean }) {
  if (options?.live) {
    noStore();
  }
  const client = createSupabasePublicClient();
  if (!client) return null;

  const { data, error } = await client
    .from("categories")
    .select("*")
    .order("name");

  if (error) return null;
  return data.map((category) => normalizeCategory(category));
}

async function fetchSupabaseProducts(options?: { live?: boolean }) {
  if (options?.live) {
    noStore();
  }
  const client = createSupabasePublicClient();
  if (!client) return null;

  const { data, error } = await client
    .from("products")
    .select(
      "id,name,slug,description,image_url,price_label,current_price,original_price,installment_info,price_badge,price_note,benefits,pros,cons,recommended_for,affiliate_link,highlight_tag,editorial_rating,featured,published,created_at,updated_at,categories(name,slug)"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) return null;

  return data.map((product) => {
    const categoryRelation = Array.isArray(product.categories)
      ? product.categories[0]
      : product.categories;

    return normalizeProduct({
      ...product,
      category: categoryRelation?.name ?? "",
      category_slug: categoryRelation?.slug ?? ""
    });
  });
}

async function fetchSupabasePosts(options?: { live?: boolean }) {
  if (options?.live) {
    noStore();
  }
  const client = createSupabasePublicClient();
  if (!client) return null;

  const { data, error } = await client
    .from("posts")
    .select(
      "id,title,slug,category,excerpt,image_url,seo_title,seo_description,published_at,faq,sections,recommended_product_slugs,published,created_at,updated_at"
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) return null;
  return data.map((post) => normalizePost(post));
}

async function fetchSupabaseComparisons(options?: { live?: boolean }) {
  if (options?.live) {
    noStore();
  }
  const client = createSupabasePublicClient();
  if (!client) return null;

  const { data, error } = await client
    .from("comparisons")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) return null;
  return data.map((comparison) => normalizeComparison(comparison));
}

const getCachedCategories = unstable_cache(
  async () =>
    resolvePublicSource(
      "categorias",
      await fetchSupabaseCategories(),
      categoriesJson as Category[]
    ),
  ["public-categories"],
  { revalidate: 300, tags: ["categories"] }
);

const getCachedProducts = unstable_cache(
  async () =>
    resolvePublicSource(
      "produtos",
      await fetchSupabaseProducts(),
      productsJson as Product[]
    ),
  ["public-products"],
  { revalidate: 300, tags: ["products"] }
);

const getCachedPosts = unstable_cache(
  async () =>
    resolvePublicSource("posts", await fetchSupabasePosts(), postsJson as BlogPost[]),
  ["public-posts"],
  { revalidate: 300, tags: ["posts"] }
);

const getCachedComparisons = unstable_cache(
  async () =>
    resolvePublicSource(
      "comparativos",
      await fetchSupabaseComparisons(),
      comparisonsJson as Comparison[]
    ),
  ["public-comparisons"],
  { revalidate: 300, tags: ["comparisons"] }
);

export async function getCategories(): Promise<Category[]> {
  if (!ensurePublicContentConfig()) {
    return getLocalFallback("categorias", categoriesJson as Category[]);
  }

  return getCachedCategories();
}

export async function getCategoriesAdmin(): Promise<Category[]> {
  if (!hasSupabaseConfig()) {
    return categoriesJson as Category[];
  }

  return (
    (await fetchSupabaseCategories({ live: true })) ??
    (categoriesJson as Category[])
  );
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getAllProducts(): Promise<Product[]> {
  if (!ensurePublicContentConfig()) {
    return getLocalFallback("produtos", productsJson as Product[]);
  }

  return getCachedProducts();
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  if (!hasSupabaseConfig()) {
    return productsJson as Product[];
  }

  return (
    (await fetchSupabaseProducts({ live: true })) ??
    (productsJson as Product[])
  );
}

export async function getFeaturedProducts() {
  return (await getAllProducts()).filter((product) => product.featured);
}

export async function getBestSellers() {
  return (await getAllProducts()).filter(
    (product) => product.highlightTag === "Mais vendido"
  );
}

export async function getProductsByCategory(slug: string) {
  return (await getAllProducts()).filter(
    (product) => product.categorySlug === slug
  );
}

export async function getProductBySlug(slug: string) {
  return (await getAllProducts()).find((product) => product.slug === slug);
}

export async function getProductsBySlugs(slugs: string[]) {
  const products = await getAllProducts();
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean) as Product[];
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!ensurePublicContentConfig()) {
    return getLocalFallback("posts", postsJson as BlogPost[]);
  }

  return getCachedPosts();
}

export async function getPostsAdmin(): Promise<BlogPost[]> {
  if (!hasSupabaseConfig()) {
    return postsJson as BlogPost[];
  }

  return (await fetchSupabasePosts({ live: true })) ?? (postsJson as BlogPost[]);
}

export async function getPostBySlug(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export async function getComparisons(): Promise<Comparison[]> {
  if (!ensurePublicContentConfig()) {
    return getLocalFallback("comparativos", comparisonsJson as Comparison[]);
  }

  return getCachedComparisons();
}

export async function getComparisonsAdmin(): Promise<Comparison[]> {
  if (!hasSupabaseConfig()) {
    return comparisonsJson as Comparison[];
  }

  return (
    (await fetchSupabaseComparisons({ live: true })) ??
    (comparisonsJson as Comparison[])
  );
}

export async function getComparisonBySlug(slug: string) {
  return (await getComparisons()).find(
    (comparison) => comparison.slug === slug
  );
}

export async function getAdminSessionUser() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const {
    data: { user }
  } = await client.auth.getUser();
  return user;
}
