import type {AppLocale} from '@/i18n/routing';
import {localizedPath} from '@/i18n/paths';
import frCommon from '../../messages/fr/common.json';
import enCommon from '../../messages/en/common.json';
import frNav from '../../messages/fr/navigation.json';
import enNav from '../../messages/en/navigation.json';
import frMeta from '../../messages/fr/metadata.json';
import enMeta from '../../messages/en/metadata.json';
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
  description: frMeta.siteDescription,
  keywords: frMeta.keywords,
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
    phone: {
      display: "514 208-3644",
      href: "tel:+15142083644",
      schema: "+15142083644",
    },
    address: {
      natureLabel: frCommon.contact.addressNatureLabel,
      streetAddress: "164 rue Principale",
      locality: "Saint-Louis-de-Gonzague",
      localityLabel: frCommon.contact.localityLabel,
      region: "Montérégie",
      regionCode: "QC",
      countryCode: "CA",
      appointmentOnly: true,
    },
    businessHours: {
      daysLabel: frCommon.contact.businessHoursDaysLabel,
      hoursLabel: frCommon.contact.businessHoursHoursLabel,
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
      timezone: "America/Toronto",
    },
  },
  navigation: [
    {label:frNav.items.home,href:"/"},{label:frNav.items.services,href:"/services"},{label:frNav.items.portfolio,href:"/realisations"},{label:frNav.items.about,href:"/a-propos"},{label:frNav.items.contact,href:"/contact"}
  ],
  primaryCta:{label:frNav.primaryCta,href:"/contact#devis"},
  publishedTechnologies: ["Next.js", "React", "TypeScript"],
};

export const site = {
  ...siteConfig,
  email: siteConfig.contact.email || "",
  phone: siteConfig.contact.phone.schema,
  location: `${siteConfig.contact.address.locality}, ${siteConfig.contact.address.region}, Québec`,
};

export const navItems = siteConfig.navigation;

export function getSiteConfig(locale:AppLocale='fr'):SiteConfig {
 const c=locale==='en'?enCommon:frCommon,n=locale==='en'?enNav:frNav,m=locale==='en'?enMeta:frMeta;
 const keys=['home','services','portfolio','about','contact'] as const;
 return {...siteConfig, description:m.siteDescription, keywords:m.keywords, contact:{...siteConfig.contact,address:{...siteConfig.contact.address,natureLabel:c.contact.addressNatureLabel,localityLabel:c.contact.localityLabel},businessHours:{...siteConfig.contact.businessHours,daysLabel:c.contact.businessHoursDaysLabel,hoursLabel:c.contact.businessHoursHoursLabel}},navigation:siteConfig.navigation.map((item,i)=>({href:localizedPath(item.href,locale),label:n.items[keys[i]]})),primaryCta:{label:n.primaryCta,href:localizedPath(siteConfig.primaryCta.href,locale)}};
}
