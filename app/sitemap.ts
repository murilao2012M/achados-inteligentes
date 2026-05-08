import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getCategories,
  getComparisons,
  getPosts
} from "@/utils/content";
import { siteConfig } from "@/utils/site";

function getLastModified(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/categorias",
    "/comparativos",
    "/blog",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/aviso-de-afiliado"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`
    })),
    ...(await getCategories()).map((category) => ({
      url: `${siteConfig.siteUrl}/categorias/${category.slug}`,
      lastModified: getLastModified(category.updatedAt || category.createdAt)
    })),
    ...(await getAllProducts()).map((product) => ({
      url: `${siteConfig.siteUrl}/produtos/${product.slug}`,
      lastModified: getLastModified(product.updatedAt || product.createdAt)
    })),
    ...(await getComparisons()).map((comparison) => ({
      url: `${siteConfig.siteUrl}/comparativos/${comparison.slug}`,
      lastModified: getLastModified(comparison.updatedAt || comparison.createdAt)
    })),
    ...(await getPosts()).map((post) => ({
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      lastModified: getLastModified(
        post.updatedAt || post.createdAt || post.publishedAt
      )
    }))
  ];
}
