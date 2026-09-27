import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

export const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

export const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // Anciennes URL sans prefixe (RC pre-i18n) -> equivalent FR.
  // permanent:true => 308 (Next.js: redirection permanente qui preserve
  // la methode HTTP, contrairement au 301 qui peut la degrader vers GET).
  // La racine "/" n'est PAS listee ici : la negociation FR/EN de "/" est
  // geree nativement par le middleware next-intl (routing.ts, localePrefix
  // "always"), qui applique deja preference stockee -> Accept-Language -> FR.
  async redirects() {
    return [
      { source: "/services", destination: "/fr/services", permanent: true },
      {
        source: "/services/:slug",
        destination: "/fr/services/:slug",
        permanent: true,
      },
      {
        source: "/realisations",
        destination: "/fr/realisations",
        permanent: true,
      },
      {
        source: "/realisations/:slug",
        destination: "/fr/realisations/:slug",
        permanent: true,
      },
      { source: "/a-propos", destination: "/fr/a-propos", permanent: true },
      { source: "/contact", destination: "/fr/contact", permanent: true },
      {
        source: "/mentions-legales",
        destination: "/fr/mentions-legales",
        permanent: true,
      },
      {
        source: "/confidentialite",
        destination: "/fr/confidentialite",
        permanent: true,
      },
    ];
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
