import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/services','services');}
import {useContent, useAppLocale} from "@/i18n/content";

import Link from "@/components/localized-link";
import { ArrowRight, Compass, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { ServiceIndexCard } from "@/components/service-experience";
import { getServiceOfferings } from "@/lib/service-offerings";











export default function ServicesPage() {
 const locale=useAppLocale();
 const serviceOfferings=getServiceOfferings(locale);
  const m = useContent();

const choiceGuide = [
  [m.services.listing.choiceGuide["0"].title, m.services.listing.choiceGuide["0"].text, "web"],
  [m.services.listing.choiceGuide["1"].title, m.services.listing.choiceGuide["1"].text, "automation"],
  [m.services.listing.choiceGuide["2"].title, m.services.listing.choiceGuide["2"].text, "custom"],
] as const;
const collaboration = [m.services.listing.collaborationSteps["0"], m.services.listing.collaborationSteps["1"], m.services.listing.collaborationSteps["2"], m.services.listing.collaborationSteps["3"], m.services.listing.collaborationSteps["4"]];
const principles = [
  [m.home.whyUs["0"].title, m.services.listing.principles["0"].text], [m.services.listing.principles["1"].title, m.services.listing.principles["1"].text],
  [m.services.listing.principles["2"].title, m.services.listing.principles["2"].text], [m.services.listing.principles["3"].title, m.services.listing.principles["3"].text],
  [m.services.listing.principles["4"].title, m.services.listing.principles["4"].text], [m.services.listing.collaborationSteps["4"], m.services.listing.principles["5"].text],
];
const solutionOfferings = serviceOfferings.filter((service) => service.kind === "solution");
const entryOfferings = serviceOfferings.filter((service) => service.kind === "entry");

  return <>
    <section className="relative overflow-hidden border-b border-bg-800"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" /><div className="relative mx-auto grid max-w-(--container-max) gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-8 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.listing.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">{m.services.listing.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">{m.services.listing.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea]">{m.services.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href="#offres" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-bg-800 px-5 py-3 font-semibold hover:border-purple-400">{m.home.cta.explore}</a></div></div><div className="flex min-h-64 items-center justify-center rounded-sm border border-bg-800 bg-bg-900/80"><Compass className="h-20 w-20 text-purple-300" aria-hidden="true" /></div></div></section>
    <section id="offres" className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.listing.solutionsEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.listing.solutionsTitle}</h2><p className="mt-5 max-w-3xl leading-7 text-text-400">{m.services.listing.solutionsIntro}</p><div className="mt-10 grid gap-6 lg:grid-cols-3">{solutionOfferings.map((service, index) => <ServiceIndexCard key={service.id} service={service} index={index} />)}</div></div></section>
    <section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.listing.entryEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.listing.entryTitle}</h2><p className="mt-5 max-w-3xl leading-7 text-text-400">{m.services.listing.entryIntro}</p><div className="mt-10 max-w-3xl">{entryOfferings.map((service, index) => <ServiceIndexCard key={service.id} service={service} index={solutionOfferings.length + index} />)}</div></div></section>
    <section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.listing.choiceGuideEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.listing.choiceGuideTitle}</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800">{choiceGuide.map(([title, text, id]) => { const service=serviceOfferings.find(item=>item.id===id)!; return <article key={id} className="grid gap-5 bg-bg-950 p-6 md:grid-cols-[.7fr_1.1fr_auto] md:items-center"><h3 className="text-xl font-semibold">{title}</h3><p className="leading-7 text-text-400">{text}</p><Link href={service.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-purple-300">{m.common.see} {service.label.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>; })}</div></div></section>
    <section className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.listing.collaborationEyebrow}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{m.services.listing.collaborationTitle}</h2><ol className="mt-10 grid gap-4 md:grid-cols-5">{collaboration.map((item,index)=><li key={item} className="border-t border-purple-500 pt-5"><span className="font-mono text-xs text-purple-300">0{index+1}</span><h3 className="mt-5 text-lg font-semibold">{item}</h3></li>)}</ol></div></section>
    <section className="border-b border-bg-800 bg-bg-900/30 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3 text-purple-300"><ShieldCheck className="h-6 w-6" aria-hidden="true" /><Gauge className="h-6 w-6" aria-hidden="true" /><Wrench className="h-6 w-6" aria-hidden="true" /></div><h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{m.services.listing.principlesTitle}</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 sm:grid-cols-2 lg:grid-cols-3">{principles.map(([title,text])=><article key={title} className="bg-bg-950 p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{text}</p></article>)}</div></div></section>
    <section className="py-16"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="rounded-sm bg-purple-600 px-6 py-10 text-[#f4f1ea] sm:px-10"><h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.listing.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-white/85">{m.services.listing.ctaText}</p><Link href="/contact#devis" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">{m.services.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>
  </>;
}
