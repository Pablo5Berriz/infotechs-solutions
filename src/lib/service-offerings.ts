import type { AppLocale } from '@/i18n/routing';
import { serviceSlugs } from '@/i18n/slugs';
import { localizedPath } from '@/i18n/paths';
import fr from '../../messages/fr/services.json';
import en from '../../messages/en/services.json';
import type { LucideIcon } from "lucide-react";
import { Bot, ClipboardCheck, Code2, Globe2 } from "lucide-react";

export type ServiceProcessStep = { title: string; text: string };
export type ServiceOfferingKind = "solution" | "entry";

export type ServiceOffering = {
  locale: AppLocale;
  id: string;
  kind: ServiceOfferingKind;
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  href: string;
  icon: LucideIcon;
  outcomes: string[];
  capabilities: string[];
  process: ServiceProcessStep[];
  idealFor: string[];
  deliverables: string[];
  considerations: string[];
  relatedServiceIds: string[];
  technologies: string[];
  status: "published" | "draft";
  seo: { title: string; description: string };
};

const identities = [
  {
    "id": "web",
    "kind": "solution",
    "relatedServiceIds": [
      "automation",
      "custom"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript"
    ],
    "status": "published"
  },
  {
    "id": "automation",
    "kind": "solution",
    "relatedServiceIds": [
      "web",
      "custom"
    ],
    "technologies": [],
    "status": "published"
  },
  {
    "id": "custom",
    "kind": "solution",
    "relatedServiceIds": [
      "web",
      "automation"
    ],
    "technologies": [
      "React",
      "TypeScript"
    ],
    "status": "published"
  },
  {
    "id": "audit",
    "kind": "entry",
    "relatedServiceIds": [
      "web",
      "automation",
      "custom"
    ],
    "technologies": [],
    "status": "published"
  }
] as const;
const icons = {web: Globe2, automation: Bot, custom: Code2, audit: ClipboardCheck};
const localized:Partial<Record<AppLocale,ServiceOffering[]>>={};
export function getServiceOfferings(locale: AppLocale = 'fr'): ServiceOffering[] {
 const content = locale === 'en' ? en : fr;
 return localized[locale] ??= identities.map(identity => ({...identity, ...content[identity.id], locale, slug: serviceSlugs[identity.id][locale], href: localizedPath('/services/'+serviceSlugs[identity.id].fr,locale), technologies: [...identity.technologies], relatedServiceIds: [...identity.relatedServiceIds], icon: icons[identity.id]}));
}
export const serviceOfferings = getServiceOfferings();
export function getServiceOffering(slug: string, locale: AppLocale = 'fr') { return getServiceOfferings(locale).find(item=>item.slug===slug); }
export function getRelatedOfferings(item: ServiceOffering) { const all=getServiceOfferings(item.locale); return item.relatedServiceIds.map(id=>all.find(other=>other.id===id)).filter((other): other is ServiceOffering=>Boolean(other)); }
