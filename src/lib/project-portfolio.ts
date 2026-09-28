import type { AppLocale } from '@/i18n/routing';
import { projectSlugs } from '@/i18n/slugs';
import { localizedPath } from '@/i18n/paths';
import fr from '../../messages/fr/portfolio.json';
import en from '../../messages/en/portfolio.json';
export type ProjectStatus = "concept" | "client";
export type LogoRatio = "wide" | "standard" | "tall";

export type PortfolioProject = {
  locale: AppLocale;
  id: string; slug: string; title: string; name: string; logo: string; logoRatio: LogoRatio; status: ProjectStatus; category: string; summary: string; description: string; href: string;
  challenge: string[]; approach: string[]; deliverables: string[]; capabilities: string[]; technologies: string[];
  limitations: string[]; relatedProjectIds: string[]; seo: { title: string; description: string };
};

const identities = [
  {
    "id": "comptaclems",
    "name": "ComptaClems",
    "logo": "/images/portfolio/comptaclems.png",
    "logoRatio": "wide",
    "relatedProjectIds": [
      "weatherWise",
      "bilikFarm"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "bilikFarm",
    "name": "Bilik Farm",
    "logo": "/images/portfolio/bilikfarm.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "comptaclems",
      "cosmechic"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "cosmechic",
    "name": "Cosmechic",
    "logo": "/images/portfolio/cosmechic.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "bilikFarm",
      "biketrip"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "biketrip",
    "name": "BikeTrip",
    "logo": "/images/portfolio/biketrip.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "cosmechic",
      "eduquiz"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "eduquiz",
    "name": "EduQuiz",
    "logo": "/images/portfolio/eduquiz.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "biketrip",
      "forumSportif"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "forumSportif",
    "name": "Forum Sportif",
    "logo": "/images/portfolio/forumsportif.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "eduquiz",
      "garageAutoGonzague"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "garageAutoGonzague",
    "name": "Garage Auto Gonzague",
    "logo": "/images/portfolio/garageautogonzague.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "forumSportif",
      "logigest"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "logigest",
    "name": "Logigest",
    "logo": "/images/portfolio/logigest.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "garageAutoGonzague",
      "paroisseHub"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "paroisseHub",
    "name": "ParoisseHub",
    "logo": "/images/portfolio/paroissehub.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "logigest",
      "slgTech"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "slgTech",
    "name": "SLG TECH",
    "logo": "/images/portfolio/slgtech.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "paroisseHub",
      "weatherWise"
    ],
    "technologies": [],
    "status": "concept"
  },
  {
    "id": "weatherWise",
    "name": "WeatherWise",
    "logo": "/images/portfolio/weatherwise.png",
    "logoRatio": "standard",
    "relatedProjectIds": [
      "slgTech",
      "comptaclems"
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
