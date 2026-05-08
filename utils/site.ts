export const siteConfig = {
  name: "Achados Inteligentes",
  shortName: "Achados",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://achados-inteligentes.vercel.app",
  defaultTitle:
    "Achados Inteligentes | O Portal de Vendas com os Melhores Achados Amazon",
  defaultDescription:
    "Descubra produtos recomendados com curadoria editorial, comparativos, reviews honestos e links de afiliado para comprar na Amazon com mais confiança.",
  contactEmail: "contato@achadosinteligentes.com",
  phone: "+55 (12) 99724-6332",
  address: "São Paulo, Brasil",
  menu: [
    { label: "Início", href: "/" },
    { label: "Categorias", href: "/categorias" },
    { label: "Comparativos", href: "/comparativos" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" }
  ],
  integrations: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleSearchConsoleVerification:
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""
  }
};
