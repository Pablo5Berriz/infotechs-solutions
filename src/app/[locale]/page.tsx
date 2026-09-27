import {pageMetadata} from '@/i18n/metadata';
import {isLocale} from '@/i18n/paths';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,'/','home');}
import {useContent, useAppLocale} from "@/i18n/content";
import Link from "@/components/localized-link";
import { ArrowRight, Braces, Check, Cpu, Database, Network, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { BadgeConcept } from "@/components/badge-concept";
import { ButtonLink } from "@/components/button-link";
import { ProcessTimeline, ServiceTabs } from "@/components/home-interactions";
import { Reveal } from "@/components/reveal";
import { getHomeData } from "@/lib/data";
import { getPortfolioProjects } from "@/lib/project-portfolio";




function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-300">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>{text && <p className="mt-5 max-w-2xl leading-7 text-text-400">{text}</p>}</div>;
}

export default function Home() {
 const locale=useAppLocale();
 const portfolioProjects=getPortfolioProjects(locale);
 const {whyUs}=getHomeData(locale);
  const m = useContent();

const projects = portfolioProjects;

  return (
    <>
      <section id="hero" className="relative isolate overflow-hidden border-b border-bg-800">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-purple-300/10 blur-3xl" aria-hidden="true" />
        <div className="absolute left-1/3 top-1/3 h-[260px] w-[260px] rounded-full bg-purple-100/5 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-(--container-max) items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-purple-300"><span className="h-px w-8 bg-purple-600" /> {m.home.hero.kicker}</p>
            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">{m.home.hero.title} <span className="text-purple-300">{m.home.hero.titleHighlight}</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-400">{m.home.hero.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact#devis" className="!bg-purple-600 !text-[#f4f1ea] !shadow-none hover:!bg-purple-700 hover:!shadow-[var(--shadow-glow-purple)]">{m.home.hero.ctaSubmit}</ButtonLink><ButtonLink href="/realisations" variant="secondary" className="!border-bg-800 !bg-transparent !text-text-100 hover:!border-purple-500 hover:!text-purple-300">{m.home.hero.ctaConcepts}</ButtonLink></div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-400">{[m.home.hero.badges["0"], m.home.hero.badges["1"], m.home.hero.badges["2"]].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-300" aria-hidden="true" />{item}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-lg" >
            <div className="relative aspect-square" aria-label={m.home.hero.diagramAlt} role="img">
              <div className="absolute inset-[12%] rotate-45 border border-bg-800" /><div className="absolute inset-[27%] rotate-45 border border-purple-500/60" /><div className="absolute left-1/2 top-[8%] h-[84%] w-px bg-gradient-to-b from-transparent via-purple-600 to-transparent" /><div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
              {[["left-[8%] top-[44%]",Network],["right-[8%] top-[44%]",Database],["left-[44%] top-[8%]",Braces],["left-[44%] bottom-[8%]",Workflow],["left-[40%] top-[40%]",Cpu]].map(([position, Icon], index) => { const NodeIcon = Icon as typeof Cpu; return <div key={index} className={`absolute ${position} flex h-16 w-16 items-center justify-center rounded-sm border border-bg-800 bg-bg-900 shadow-[var(--shadow-md)] ${index === 4 ? "h-24 w-24 border-purple-500 text-purple-300" : "text-text-400"}`}><NodeIcon className="h-6 w-6" aria-hidden="true" /></div>; })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow={m.home.valueProp.eyebrow} title={m.home.valueProp.title} text={m.home.valueProp.text} /></Reveal><div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 md:grid-cols-4">{whyUs.map(([title,text], index) => <Reveal key={title} delay={index*.04} className="bg-bg-950 p-6 sm:p-8"><p className="font-mono text-xs text-purple-300">0{index+1}</p><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{text}</p></Reveal>)}</div></div></section>

      <section id="services-accueil" className="border-b border-bg-800 bg-bg-900/40 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow={m.home.servicesSection.eyebrow} title={m.home.servicesSection.title} /></Reveal><ServiceTabs /></div></section>

      <section id="processus" className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow={m.home.processSection.eyebrow} title={m.home.processSection.title} /></Reveal><ProcessTimeline /></div></section>

      <section id="concepts" className="border-b border-bg-800 bg-bg-900/30 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><Reveal><SectionIntro eyebrow={m.home.concepts.eyebrow} title={m.home.concepts.title} /></Reveal><ButtonLink href="/realisations" variant="ghost" className="text-text-100 hover:text-purple-200">{m.home.concepts.allConcepts}</ButtonLink></div><div className="mt-12 grid gap-6 md:grid-cols-3">{projects.slice(0,3).map((project,index) => <Reveal key={project.slug} delay={index*.05}><Link href={`/realisations/${project.slug}`} className="group block min-h-full rounded-sm border border-bg-800 bg-bg-900 p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[var(--shadow-md)] motion-reduce:hover:translate-y-0"><BadgeConcept /><div className="mt-14 flex h-28 items-center justify-center border border-bg-800 bg-bg-950"><Network className="h-7 w-7 text-purple-300" aria-hidden="true" /></div><p className="mt-6 font-mono text-xs uppercase tracking-wider text-text-400">{project.category}</p><h3 className="mt-3 text-xl font-semibold">{project.title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{project.summary}</p><span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-purple-300">{m.home.concepts.seeConcept} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link></Reveal>)}</div></div></section>

      <section className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8">
        <Reveal><SectionIntro eyebrow={m.home.expertise.eyebrow} title={m.home.expertise.title} text={m.home.expertise.text} /></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 sm:grid-cols-2 lg:grid-cols-3">
          {m.home.expertise.categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.04} className="bg-bg-950 p-6 sm:p-7">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-400">{category.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">{category.technologies.map((technology: string) => <span key={technology} className="rounded-sm border border-bg-800 px-2.5 py-1.5 font-mono text-xs text-text-400">{technology}</span>)}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.08} className="mt-6 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 sm:grid-cols-2"><div className="bg-bg-900 p-7"><ShieldCheck className="h-7 w-7 text-purple-300" aria-hidden="true"/><h3 className="mt-8 text-xl font-semibold">{m.home.expertise.securityTitle}</h3><p className="mt-3 text-sm leading-6 text-text-400">{m.home.expertise.securityText}</p></div><div className="bg-bg-900 p-7"><Sparkles className="h-7 w-7 text-purple-300" aria-hidden="true"/><h3 className="mt-8 text-xl font-semibold">{m.home.expertise.qualityTitle}</h3><p className="mt-3 text-sm leading-6 text-text-400">{m.home.expertise.qualityText}</p></div></Reveal>
      </div></section>

      <section id="cta-final" className="py-16 sm:py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal className="relative overflow-hidden rounded-sm bg-purple-600 px-6 py-12 text-[#f4f1ea] sm:px-10 lg:px-14"><div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] border-white/10" aria-hidden="true"/><p className="font-mono text-xs uppercase tracking-[.2em]">{m.home.cta.kicker}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{m.home.cta.title}</h2><p className="mt-5 max-w-2xl leading-7 text-white/85">{m.home.cta.text}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact#devis" className="!bg-bg-950 !text-text-100 hover:!bg-bg-900">{m.home.cta.submit}</ButtonLink><ButtonLink href="/services" variant="secondary" className="!border-white/25 !bg-transparent !text-[#f4f1ea] hover:!border-white hover:!text-white">{m.home.cta.explore}</ButtonLink></div></Reveal></div></section>
    </>
  );
}
