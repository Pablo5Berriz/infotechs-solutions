import {notFound} from 'next/navigation';
import {ProjectDetail} from '@/components/project-experience';
import {getPortfolioProject,getPortfolioProjects} from '@/lib/project-portfolio';
import {isLocale} from '@/i18n/paths';
import {localizedMetadata,notFoundMetadata} from '@/i18n/metadata';
type Props={params:Promise<{locale:string;slug:string}>};
export function generateStaticParams({params}:{params:{locale:string}}){if(!isLocale(params.locale))return [];return getPortfolioProjects(params.locale).map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {locale,slug}=await params;if(!isLocale(locale))notFound();const item=getPortfolioProject(slug,locale);return item?localizedMetadata(locale,item.href,item.seo):notFoundMetadata(locale);}
export default async function ProjectDetailPage({params}:Props){const {locale,slug}=await params;if(!isLocale(locale))notFound();const item=getPortfolioProject(slug,locale);if(!item)notFound();return <ProjectDetail project={item}/>;}
