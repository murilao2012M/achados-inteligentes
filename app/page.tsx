import { AffiliateBar } from "@/components/AffiliateBar";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { GuidesSection } from "@/components/GuidesSection";
import { HeroSection } from "@/components/HeroSection";
import { TransparencyBlock } from "@/components/TransparencyBlock";
import {
  getCategories,
  getFeaturedProducts,
  getPosts
} from "@/utils/content";

export default async function HomePage() {
  const [categories, featuredProducts, posts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getPosts()
  ]);
  const guides = posts.slice(0, 3);

  return (
    <div className="pb-6">
      <AffiliateBar />
      <HeroSection categories={categories} />
      <div className="deferred-section">
        <BenefitsStrip />
      </div>
      <div className="deferred-section">
        <FeaturedProducts products={featuredProducts} />
      </div>
      <div className="deferred-section">
        <CategoriesSection categories={categories.slice(0, 6)} />
      </div>
      <div className="deferred-section">
        <GuidesSection guides={guides} />
      </div>
      <div className="deferred-section">
        <TransparencyBlock />
      </div>
    </div>
  );
}
