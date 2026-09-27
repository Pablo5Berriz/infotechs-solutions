import type { AppLocale } from '@/i18n/routing';
import { projectSlugs } from '@/i18n/slugs';
import { localizedPath } from '@/i18n/paths';
import fr from '../../messages/fr/portfolio.json';
import en from '../../messages/en/portfolio.json';
export type ProjectStatus = "concept" | "client";

export type PortfolioProject = {
  locale: AppLocale;
  id: string; slug: string; title: string; status: ProjectStatus; category: string; summary: string; description: string; href: string;
  challenge: string[]; approach: string[]; deliverables: string[]; capabilities: string[]; technologies: string[];
  limitations: string[]; relatedProjectIds: string[]; seo: { title: string; description: string };
};

const identities = [
  {
    "id": "garage",
    "relatedProjectIds": [
      "reservation",
      "gestion"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "reservation",
    "relatedProjectIds": [
      "garage",
      "mobile"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "gestion",
    "relatedProjectIds": [
      "reservation",
      "dashboard"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "automation",
    "relatedProjectIds": [
      "gestion",
      "dashboard"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "dashboard",
    "relatedProjectIds": [
      "gestion",
      "automation"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "mobile",
    "relatedProjectIds": [
      "reservation",
      "garage"
    ],
    "technologies": [],
    "status": "concept"
  }
] as const;
const localized:Partial<Record<AppLocale,PortfolioProject[]>>={};
export function getPortfolioProjects(locale: AppLocale = 'fr'): PortfolioProject[] {
 const content = locale === 'en' ? en : fr;
 return localized[locale] ??= identities.map(identity => ({...identity, ...content[identity.id], locale, slug: projectSlugs[identity.id][locale], href: localizedPath('/realisations/'+projectSlugs[identity.id].fr,locale), technologies: [...identity.technologies], relatedProjectIds: [...identity.relatedProjectIds]}));
}
export const portfolioProjects = getPortfolioProjects();
export function getPortfolioProject(slug: string, locale: AppLocale = 'fr') { return getPortfolioProjects(locale).find(item=>item.slug===slug); }
export function getRelatedProjects(item: PortfolioProject) { const all=getPortfolioProjects(item.locale); return item.relatedProjectIds.map(id=>all.find(other=>other.id===id)).filter((other): other is PortfolioProject=>Boolean(other)); }

export const projectStatusLabels=fr.statusLabels;
