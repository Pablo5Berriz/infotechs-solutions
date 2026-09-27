import {useContent} from "@/i18n/content";
import Link from "@/components/localized-link";
import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";
import type { ServiceOffering } from "@/lib/service-offerings";
import { getRelatedOfferings } from "@/lib/service-offerings";

const primaryLink = "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea] transition-colors hover:bg-purple-700";
const secondaryLink = "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-bg-800 px-5 py-3 font-semibold text-text-100 transition-colors hover:border-purple-400 hover:text-purple-200";

export function ServiceIndexCard({ service, index }: { service: ServiceOffering; index: number }) {
  const m = useContent();

  const Icon = service.icon;
  return <article className="flex h-full flex-col rounded-sm border border-bg-800 bg-bg-900 p-6 sm:p-8">
    <div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-sm border border-bg-800 text-purple-300"><Icon className="h-6 w-6" aria-hidden="true" /></span><span className="font-mono text-xs text-text-400">0{index + 1}</span></div>
    <p className="mt-8 font-mono text-xs uppercase tracking-[.18em] text-purple-300">{service.eyebrow}</p>
    <h2 className="mt-3 text-2xl font-semibold">{service.label}</h2><p className="mt-4 leading-7 text-text-400">{service.summary}</p>
    <ul className="mt-6 grid gap-2 text-sm">{service.outcomes.slice(0, 3).map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-purple-300" aria-hidden="true" /><span>{item}</span></li>)}</ul>
    <Link href={service.href} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-purple-300 hover:text-text-100">{m.services.detail.discover} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
  </article>;
}

export function ServiceBreadcrumb({ service }: { service: ServiceOffering }) {
  const m = useContent();

  return <nav aria-label={m.common.breadcrumb}><ol className="flex flex-wrap items-center gap-2 text-sm text-text-400"><li><Link href="/" className="inline-flex min-h-11 items-center hover:text-purple-200">{m.navigation.items.home}</Link></li><li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li><li><Link href="/services" className="inline-flex min-h-11 items-center hover:text-purple-200">{m.navigation.items.services}</Link></li><li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li><li><span aria-current="page" className="inline-flex min-h-11 items-center text-text-100">{service.label}</span></li></ol></nav>;
}

export function ServiceDetail({ service }: { service: ServiceOffering }) {
  const m = useContent();

  const Icon = service.icon;
  const related = getRelatedOfferings(service);
  const relatedHeading = service.kind === "entry" ? m.services.detail.relatedSolutions : m.services.detail.relatedServices;
  return <>
    <section className="border-b border-bg-800"><div className="mx-auto max-w-(--container-max) px-4 py-8 sm:px-6 lg:px-8"><ServiceBreadcrumb service={service} /><div className="grid gap-10 py-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-20"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{service.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">{service.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">{service.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className={primaryLink}>{m.services.detail.presentNeed} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/services" className={secondaryLink}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {m.services.detail.allServices}</Link></div></div><div className="flex min-h-64 items-center justify-center rounded-sm border border-bg-800 bg-bg-900"><div className="flex h-28 w-28 items-center justify-center rounded-full border border-purple-500/60 text-purple-300"><Icon className="h-12 w-12" aria-hidden="true" /></div></div></div></div></section>
    <section className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.detail.outcomesEyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.detail.outcomesTitle}</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 md:grid-cols-3">{service.outcomes.map((item, index) => <article key={item} className="bg-bg-950 p-6 sm:p-8"><span className="font-mono text-xs text-purple-300">0{index + 1}</span><h3 className="mt-8 text-xl font-semibold">{item}</h3></article>)}</div></div></section>
    <section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto grid max-w-(--container-max) gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.detail.capabilitiesEyebrow}</p><h2 className="mt-4 text-3xl font-semibold">{m.services.detail.capabilitiesTitle}</h2><p className="mt-4 leading-7 text-text-400">{m.services.detail.capabilitiesIntro}</p></div><ul className="grid gap-3 sm:grid-cols-2">{service.capabilities.map((item) => <li key={item} className="flex min-h-14 items-center gap-3 rounded-sm border border-bg-800 bg-bg-900 px-4"><Check className="h-4 w-4 flex-none text-purple-300" aria-hidden="true" />{item}</li>)}</ul></div></section>
    <section className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.home.processSection.eyebrow}</p><h2 className="mt-4 text-3xl font-semibold">{m.services.detail.processTitle}</h2><ol className="mt-10 grid gap-4 md:grid-cols-5">{service.process.map((step, index) => <li key={step.title} className="border-t border-purple-500 pt-5"><span className="font-mono text-xs text-purple-300">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-text-400">{step.text}</p></li>)}</ol></div></section>
    <section className="border-b border-bg-800 bg-bg-900/30 py-20"><div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><h2 className="text-3xl font-semibold">{m.services.detail.deliverablesTitle}</h2><ul className="mt-7 grid gap-3">{service.deliverables.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none text-purple-300" aria-hidden="true" /><span>{item}</span></li>)}</ul></div><div><h2 className="text-3xl font-semibold">{m.services.detail.idealForTitle}</h2><ul className="mt-7 grid gap-3">{service.idealFor.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none text-purple-300" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>
    <section className="border-b border-bg-800 py-20"><div className="mx-auto grid max-w-(--container-max) gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.services.detail.considerationsEyebrow}</p><h2 className="mt-4 text-3xl font-semibold">{m.services.detail.considerationsTitle}</h2></div><ul className="grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800">{service.considerations.map((item) => <li key={item} className="bg-bg-950 p-5 text-text-400">{item}</li>)}</ul></div></section>
    <section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold">{relatedHeading}</h2><div className={`mt-8 grid gap-5 md:grid-cols-2 ${related.length === 3 ? "lg:grid-cols-3" : ""}`}>{related.map((item) => <Link key={item.id} href={item.href} className="rounded-sm border border-bg-800 bg-bg-900 p-6 transition-colors hover:border-purple-400"><p className="font-mono text-xs uppercase tracking-[.15em] text-purple-300">{item.eyebrow}</p><h3 className="mt-3 text-xl font-semibold">{item.label}</h3><p className="mt-3 text-sm leading-6 text-text-400">{item.summary}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-purple-300">{m.services.detail.seeService} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div></div></section>
    <section className="py-16"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="rounded-sm bg-purple-600 px-6 py-10 text-[#f4f1ea] sm:px-10"><h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{m.services.detail.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-white/85">{m.services.detail.ctaText}</p><Link href="/contact#devis" className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">{m.home.cta.submit} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>
  </>;
}

export const serviceLinkStyles = { primaryLink, secondaryLink };
