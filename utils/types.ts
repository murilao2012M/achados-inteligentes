export type Category = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id?: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  image: string;
  description: string;
  priceLabel?: string;
  currentPrice?: string;
  originalPrice?: string;
  installmentInfo?: string;
  priceBadge?: string;
  priceNote?: string;
  benefits: string[];
  pros: string[];
  cons: string[];
  recommendedFor: string;
  affiliateLink: string;
  highlightTag: string;
  editorialRating: number;
  featured: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Comparison = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  products: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogSection = {
  heading: string;
  content: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  faq: BlogFaq[];
  sections: BlogSection[];
  recommendedProductSlugs: string[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
