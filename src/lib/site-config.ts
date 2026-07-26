export type NavigationItem = { label: string; href: string };

export type BusinessHours = {
  daysLabel: string;
  hoursLabel: string;
  schemaDays: string[];
  opens: string;
  closes: string;
  timezone: "America/Toronto";
};

export type BusinessAddress = {
  natureLabel: string;
  streetAddress: string;
  locality: string;
  localityLabel: string;
  region: string;
  regionCode: "QC";
  countryCode: "CA";
  appointmentOnly: true;
};

export type PublicPhone = {
  display: string;
  href: `tel:${string}`;
  schema: `+${string}`;
};

export type SiteContact = {
  email?: string;
  phone: PublicPhone;
  address: BusinessAddress;
  businessHours: BusinessHours;
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
    phone: {
      display: "514 208-3644",
      href: "tel:+15142083644",
      schema: "+15142083644",
    },
    address: {
      natureLabel: "Adresse d’affaires — visites sur rendez-vous",
      streetAddress: "164 rue Principale",
      locality: "Saint-Louis-de-Gonzague",
      localityLabel: "Saint-Louis-de-Gonzague (Québec)",
      region: "Montérégie",
      regionCode: "QC",
      countryCode: "CA",
      appointmentOnly: true,
    },
    businessHours: {
      daysLabel: "Lundi au vendredi",
      hoursLabel: "9 h à 17 h",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
      timezone: "America/Toronto",
    },
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
  phone: siteConfig.contact.phone.schema,
  location: `${siteConfig.contact.address.locality}, ${siteConfig.contact.address.region}, Québec`,
};

export const navItems = siteConfig.navigation;
