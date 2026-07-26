export type NavigationItem = { label: string; href: string };

export type SiteContact = {
  email?: string;
  phone?: string;
  address?: string;
  region: string;
  businessHours?: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  contact: SiteContact;
  navigation: NavigationItem[];
  primaryCta: NavigationItem;
  publishedTechnologies: string[];
};

export const siteConfig: SiteConfig = {
  name: "Infotechs Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://infotechssolutions.ca",
  description:
    "Infotechs Solutions aide les PME du Québec à créer des sites web, applications, automatisations IA et outils numériques simples, performants et rentables.",
  keywords: [
    "création site web Québec",
    "développement web Montérégie",
    "agence web Saint-Louis-de-Gonzague",
    "développeur web PME Québec",
    "application web sur mesure Québec",
    "automatisation IA PME",
    "transformation numérique PME",
  ],
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
    region: "Saint-Louis-de-Gonzague, Montérégie, Québec",
  },
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: { label: "Transmettre une demande", href: "/contact#devis" },
  publishedTechnologies: ["Next.js", "React", "TypeScript"],
};

export const site = {
  ...siteConfig,
  email: siteConfig.contact.email || "",
  phone: siteConfig.contact.phone || "",
  location: siteConfig.contact.region,
};

export const navItems = siteConfig.navigation;
