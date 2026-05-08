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
  contactEmail: "",
  phone: "",
  address: "Brasil",
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

export const defaultSiteSettings = {
  contactEmail: siteConfig.contactEmail,
  phone: siteConfig.phone,
  address: siteConfig.address,
  instagramUrl: "",
  youtubeUrl: "",
  newsletterEnabled: false,
  newsletterTitle: "Receba as melhores recomendações no seu e-mail",
  newsletterDescription:
    "Conteúdo novo, comparativos e oportunidades comerciais para você acompanhar o site com mais facilidade."
};
