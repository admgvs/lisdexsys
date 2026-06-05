import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.28.109"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/admin/relatorio-vendas",
        destination: "/admin/relatorios-vendas",
        permanent: false
      },
      {
        source: "/admin/relatorio-venda",
        destination: "/admin/relatorios-vendas",
        permanent: false
      },
      {
        source: "/admin/relatorios-de-vendas",
        destination: "/admin/relatorios-vendas",
        permanent: false
      },
      {
        source: "/admin/faturamento",
        destination: "/admin/faturamento-entrega",
        permanent: false
      },
      {
        source: "/admin/entrega",
        destination: "/admin/faturamento-entrega",
        permanent: false
      },
      {
        source: "/admin/separacao-pedidos",
        destination: "/admin/separacao",
        permanent: false
      },
      {
        source: "/admin/separacao-de-pedidos",
        destination: "/admin/separacao",
        permanent: false
      }
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()"
      }
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" }
        ]
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }]
      }
    ];
  }
};

export default nextConfig;
