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
    "id": "comptaclems",
    "relatedProjectIds": [
      "bilikFarm",
      "eduquiz"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "bilikFarm",
    "relatedProjectIds": [
      "comptaclems",
      "cosmechic"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "cosmechic",
    "relatedProjectIds": [
      "bilikFarm",
      "forumSportif"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "biketrip",
    "relatedProjectIds": [
      "eduquiz",
      "forumSportif"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "eduquiz",
    "relatedProjectIds": [
      "biketrip",
      "comptaclems"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "forumSportif",
    "relatedProjectIds": [
      "cosmechic",
      "biketrip"
    ],
    "technologies": [],
    "status": "concept"
  }
] as const;
const localized:Partial<Record<AppLocale,PortfolioProject[]>>={};
export function getPortfolioProjects(locale: AppLocale = 'fr'): PortfolioProject[] {
 const content = locale === 'en' ? en : fr;
 return localized[locale] ??= identities.map(identity => ({...identity, ...content[identity.id], locale, slug: projectSlugs[identity.id][locale], href: localizedPath('/realisations/'+projectSlugs[identity.id].fr,locale), technologies: [...(content[identity.id]?.technologies ?? identity.technologies)], relatedProjectIds: [...identity.relatedProjectIds]}));
}
export const portfolioProjects = getPortfolioProjects();
export function getPortfolioProject(slug: string, locale: AppLocale = 'fr') { return getPortfolioProjects(locale).find(item=>item.slug===slug); }
export function getRelatedProjects(item: PortfolioProject) { const all=getPortfolioProjects(item.locale); return item.relatedProjectIds.map(id=>all.find(other=>other.id===id)).filter((other): other is PortfolioProject=>Boolean(other)); }

export const projectStatusLabels=fr.statusLabels;
