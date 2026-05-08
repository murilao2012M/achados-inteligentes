import type { Metadata } from "next";
import { Merriweather, Roboto } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/utils/site";

if (typeof window === "undefined") {
  const serverGlobal = globalThis as typeof globalThis & {
    localStorage?: unknown;
  };
  const maybeLocalStorage = serverGlobal.localStorage as
    | { getItem?: unknown }
    | undefined;

  if (
    maybeLocalStorage &&
    typeof maybeLocalStorage.getItem !== "function"
  ) {
    Reflect.deleteProperty(serverGlobal, "localStorage");
  }
}

const sans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"]
});

const display = Merriweather({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.defaultDescription,
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" }
    ],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"]
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1268,
        height: 1268,
        alt: "Logo do site Achados Inteligentes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: ["/twitter-image.png"]
  },
  alternates: {
    canonical: siteConfig.siteUrl
  },
  verification: {
    google: siteConfig.integrations.googleSearchConsoleVerification || undefined
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${display.variable}`}>
        <Header />
        <main className="site-canvas min-h-screen pt-32">{children}</main>
        <Footer />
        {siteConfig.integrations.googleAnalyticsId ? (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.integrations.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
        ) : null}
        {siteConfig.integrations.googleAnalyticsId ? (
          <Script id="ga-script" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.integrations.googleAnalyticsId}');`}
          </Script>
        ) : null}
        {siteConfig.integrations.metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${siteConfig.integrations.metaPixelId}');
              fbq('track', 'PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
