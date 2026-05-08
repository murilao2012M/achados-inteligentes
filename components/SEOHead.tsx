import type { Metadata } from "next";
import { siteConfig } from "@/utils/site";

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  type?: "article" | "website";
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website"
}: SEOHeadProps): Metadata {
  const url = `${siteConfig.siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [
        {
          url: `${siteConfig.siteUrl}/opengraph-image.png`,
          width: 1268,
          height: 1268,
          alt: `Compartilhamento do ${siteConfig.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.siteUrl}/twitter-image.png`]
    }
  };
}
