import { defineRouting } from "next-intl/routing";

// Slugs de contenu (services/réalisations) restent gérés par src/lib
// (getServiceOffering/getPortfolioProject) — ce fichier ne traduit que les
// segments de chemin FIXES (racines de section, pages statiques).
// [slug] reste un segment générique commun aux deux langues ; la VALEUR du
// slug diffère par locale et est résolue via les mappings d'entité.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  alternateLinks: false, // Explicit per-entity SEO alternates include localized dynamic slugs.
  localeCookie: {name:"NEXT_LOCALE",maxAge:31536000,sameSite:"lax",path:"/"},
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/services/[slug]": "/services/[slug]",
    "/realisations": {
      fr: "/realisations",
      en: "/portfolio",
    },
    "/realisations/[slug]": {
      fr: "/realisations/[slug]",
      en: "/portfolio/[slug]",
    },
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
    },
    "/contact": "/contact",
    "/mentions-legales": {
      fr: "/mentions-legales",
      en: "/legal-notice",
    },
    "/confidentialite": {
      fr: "/confidentialite",
      en: "/privacy",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
