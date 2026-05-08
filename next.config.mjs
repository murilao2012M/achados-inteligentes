const isProduction = process.env.NODE_ENV === "production";

function getSupabaseOrigin() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) {
    return "";
  }

  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

const supabaseOrigin = getSupabaseOrigin();
const supabaseHostname = supabaseOrigin ? new URL(supabaseOrigin).hostname : "";

function buildContentSecurityPolicy() {
  const scriptSources = [
    "'self'",
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://connect.facebook.net"
  ];

  if (!isProduction) {
    scriptSources.push("'unsafe-eval'");
  }

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "form-action 'self'",
    ["script-src", ...scriptSources].join(" "),
    ["style-src", "'self'", "'unsafe-inline'"].join(" "),
    [
      "img-src",
      "'self'",
      "https:",
      "data:",
      "blob:",
      "https://images.unsplash.com",
      "https://www.google-analytics.com",
      "https://www.facebook.com",
      supabaseOrigin
    ]
      .filter(Boolean)
      .join(" "),
    ["font-src", "'self'", "data:"].join(" "),
    [
      "connect-src",
      "'self'",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://www.googletagmanager.com",
      "https://connect.facebook.net",
      "https://www.facebook.com",
      supabaseOrigin
    ]
      .filter(Boolean)
      .join(" "),
    [
      "media-src",
      "'self'",
      "data:",
      "blob:",
      supabaseOrigin
    ]
      .filter(Boolean)
      .join(" "),
    ["worker-src", "'self'", "blob:"].join(" "),
    "manifest-src 'self'"
  ];

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: buildContentSecurityPolicy()
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off"
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-site"
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1"
  }
];

if (isProduction) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload"
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https",
              hostname: supabaseHostname
            }
          ]
        : [])
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet"
          },
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
