import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/a-propos','about');}
import {useContent, useAppLocale} from "@/i18n/content";

import Link from "@/components/localized-link";
import { ArrowRight, Check, CircleDot, MapPin, MessageSquareText, Minus } from "lucide-react";
import { getAboutContent } from "@/lib/about-content";



function CollaborationMap() {
  const m = useContent();

  return <div role="img" aria-label={m.about.hero.mapAlt} className="relative min-h-72 overflow-hidden rounded-sm border border-bg-800 bg-bg-900/80 p-6 sm:p-8">
    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />
    <div className="relative grid h-full min-h-56 grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div className="space-y-3"><span className="block border border-bg-800 bg-bg-950 p-3 text-sm">{m.about.hero.mapContext}</span><span className="block border border-bg-800 bg-bg-950 p-3 text-sm">{m.about.hero.mapUsers}</span><span className="block border border-bg-800 bg-bg-950 p-3 text-sm">{m.about.hero.mapConstraints}</span></div>
      <div className="flex items-center gap-2 text-purple-300" aria-hidden="true"><Minus className="h-5 w-5" /><CircleDot className="h-9 w-9" /><Minus className="h-5 w-5" /></div>
      <div className="border border-purple-500 bg-purple-600/10 p-4 text-center text-sm font-semibold">{m.common.decisions}<br />{m.common.verifiable}</div>
    </div>
  </div>;
}

export default function AboutPage() {
 const locale=useAppLocale();
 const {aboutMethod,aboutPrinciples,aboutScope}=getAboutContent(locale);
  const m = useContent();

  return <>
    <section className="relative overflow-hidden border-b border-bg-800"><div className="mx-auto grid max-w-(--container-max) gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.hero.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">{m.about.hero.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">{m.about.hero.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea]">{m.services.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href="#methode" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-bg-800 px-5 py-3 font-semibold hover:border-purple-400">{m.about.hero.ctaMethod}</a></div></div><CollaborationMap /></div></section>

    <section className="border-b border-bg-800 py-20"><div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.purpose.eyebrow}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{m.about.purpose.title}</h2></div><div className="max-w-3xl space-y-6 text-lg leading-8 text-text-400"><p>{m.about.purpose.p1}</p><p>{m.about.purpose.p2}</p></div></div></section>

    <section className="border-b border-bg-800 bg-bg-900/35 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.principlesEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.about.principlesTitle}</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 md:grid-cols-2 lg:grid-cols-3">{aboutPrinciples.map((principle, index) => <article key={principle.id} className="bg-bg-950 p-6 sm:p-7"><span className="font-mono text-xs text-purple-300">0{index + 1}</span><h3 className="mt-7 text-xl font-semibold">{principle.title}</h3><p className="mt-3 leading-7 text-text-400">{principle.description}</p></article>)}</div></div></section>

    <section id="methode" className="scroll-mt-24 border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.methodEyebrow}</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{m.about.methodTitle}</h2><p className="mt-5 leading-7 text-text-400">{m.about.methodIntro}</p></div><ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{aboutMethod.map(step => <li key={step.number} className="border-l border-purple-500 py-2 pl-6"><span className="font-mono text-xs text-purple-300">{step.number}</span><h3 className="mt-4 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-7 text-text-400">{step.description}</p></li>)}</ol></div></section>

    <section className="border-b border-bg-800 bg-bg-900/35 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.scopeEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.about.scopeTitle}</h2><div className="mt-10 grid gap-6 lg:grid-cols-2"><article className="border border-bg-800 bg-bg-950 p-6 sm:p-8"><h3 className="text-xl font-semibold">{m.about.canDoTitle}</h3><ul className="mt-6 space-y-4">{aboutScope.canDo.map(item => <li key={item} className="flex gap-3 leading-7 text-text-400"><Check className="mt-1 h-5 w-5 shrink-0 text-purple-300" aria-hidden="true" />{item}</li>)}</ul></article><article className="border border-bg-800 bg-bg-950 p-6 sm:p-8"><h3 className="text-xl font-semibold">{m.about.needsScopingTitle}</h3><ul className="mt-6 space-y-4">{aboutScope.needsScoping.map(item => <li key={item} className="flex gap-3 leading-7 text-text-400"><CircleDot className="mt-1 h-5 w-5 shrink-0 text-purple-300" aria-hidden="true" />{item}</li>)}</ul><p className="mt-6 border-t border-bg-800 pt-5 text-sm leading-6 text-text-400">{m.about.scopeNote}</p></article></div></div></section>

    <section className="border-b border-bg-800 py-20"><div className="mx-auto grid max-w-(--container-max) gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><article className="border-t border-purple-500 pt-7"><MessageSquareText className="h-7 w-7 text-purple-300" aria-hidden="true" /><p className="mt-6 font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.collab.humanEyebrow}</p><h2 className="mt-4 text-3xl font-semibold">{m.about.collab.humanTitle}</h2><p className="mt-5 leading-7 text-text-400">{m.about.collab.humanText}</p></article><article className="border-t border-bg-800 pt-7"><MapPin className="h-7 w-7 text-purple-300" aria-hidden="true" /><p className="mt-6 font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.collab.territoryEyebrow}</p><h2 className="mt-4 text-3xl font-semibold">{m.about.collab.territoryTitle}</h2><p className="mt-5 leading-7 text-text-400">{m.about.collab.territoryText}</p></article></div></section>

    <section className="border-b border-bg-800 bg-bg-900/35 py-20"><div className="mx-auto grid max-w-(--container-max) gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.about.proofEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.about.proofTitle}</h2><p className="mt-5 max-w-3xl leading-7 text-text-400">{m.about.proofText}</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="/services" className="inline-flex min-h-11 items-center justify-center border border-bg-800 px-5 py-3 font-semibold hover:border-purple-400">{m.about.seeServices}</Link><Link href="/realisations" className="inline-flex min-h-11 items-center justify-center gap-2 text-purple-300 font-semibold">{m.portfolio.listing.ctaExplore} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>

    <section className="py-16"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="rounded-sm bg-purple-600 px-6 py-10 text-[#f4f1ea] sm:px-10 lg:px-12 lg:py-12"><h2 className="max-w-4xl text-3xl font-semibold sm:text-4xl">{m.about.cta.title}</h2><p className="mt-4 max-w-2xl leading-7 text-white/85">{m.about.cta.text}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">{m.services.listing.ctaPresent} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/services" className="inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold">{m.about.cta.reviewServices}</Link></div></div></div></section>
  </>;
}
