import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/realisations','portfolio');}
import {useContent, useAppLocale} from "@/i18n/content";

import Link from "@/components/localized-link";
import { ArrowRight, Boxes, LayoutDashboard, Smartphone, Users, Workflow } from "lucide-react";
import { ProjectCard } from "@/components/project-experience";
import { getPortfolioProjects } from "@/lib/project-portfolio";



export default function RealisationsPage(){
 const locale=useAppLocale();
 const portfolioProjects=getPortfolioProjects(locale);
  const m = useContent();

const capabilities=[[LayoutDashboard,m.portfolio.listing.capabilities["0"]],[Smartphone,m.portfolio.listing.capabilities["1"]],[Boxes,m.portfolio.listing.capabilities["2"]],[Users,m.portfolio.listing.capabilities["3"]],[Workflow,m.portfolio.listing.capabilities["4"]]] as const;
return <>
<section className="relative overflow-hidden border-b border-bg-800"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true"/><div className="relative mx-auto max-w-(--container-max) px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.portfolio.listing.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">{m.portfolio.listing.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">{m.portfolio.listing.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className="inline-flex min-h-11 items-center justify-center gap-2 bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea]">{m.portfolio.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link><a href="#concepts" className="inline-flex min-h-11 items-center justify-center border border-bg-800 px-5 py-3 font-semibold">{m.portfolio.listing.ctaExplore}</a></div></div></section>
<section id="concepts" className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.portfolio.listing.sixScenariosEyebrow}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{m.portfolio.listing.sixScenariosTitle}</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{portfolioProjects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}</div></div></section>
<section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold">{m.portfolio.listing.capabilityReadTitle}</h2><div className="mt-8 grid gap-px bg-bg-800 sm:grid-cols-2 lg:grid-cols-5">{capabilities.map(([Icon,label])=><div key={label} className="bg-bg-950 p-6"><Icon className="h-6 w-6 text-purple-300" aria-hidden="true"/><h3 className="mt-8 font-semibold">{label}</h3></div>)}</div></div></section>
<section className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold">{m.portfolio.listing.journeyTitle}</h2><ol className="mt-10 grid gap-4 md:grid-cols-6">{[m.home.process["0"].title,m.services.custom.process["0"].title,m.services.automation.process["2"].title,m.services.custom.process["2"].title,m.services.custom.process["3"].title,m.services.custom.process["4"].title].map((item,i)=><li key={item} className="border-t border-purple-500 pt-5"><span className="font-mono text-xs text-purple-300">0{i+1}</span><h3 className="mt-5 font-semibold">{item}</h3></li>)}</ol></div></section>
<section className="py-16"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="bg-purple-600 p-8 text-[#f4f1ea] sm:p-12"><h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{m.portfolio.listing.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-white/85">{m.portfolio.listing.ctaText}</p><Link href="/contact#devis" className="mt-7 inline-flex min-h-11 items-center gap-2 bg-bg-950 px-5 py-3 font-semibold text-text-100">{m.services.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link></div></div></section></>}
