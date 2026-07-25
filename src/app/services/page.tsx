import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { ServiceIndexCard } from "@/components/service-experience";
import { serviceOfferings } from "@/lib/service-offerings";

export const metadata: Metadata = {
  title: "Services web, automatisation et applications sur mesure",
  description: "Découvrez trois services numériques pour PME : création de sites web, automatisation et IA, et applications web sur mesure.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services numériques pour PME | Infotechs Solutions", description: "Sites web, automatisation et applications métier conçus selon les besoins réels de votre organisation.", url: "/services" },
};

const choiceGuide = [
  ["Une présence numérique crédible", "Votre offre doit être mieux structurée et présentée en ligne.", "web"],
  ["Moins de tâches répétitives", "Des informations sont recopiées ou suivies manuellement entre plusieurs outils.", "automation"],
  ["Un outil adapté à vos opérations", "Un site ou des logiciels génériques ne couvrent pas correctement votre flux métier.", "custom"],
] as const;

const collaboration = ["Découverte", "Cadrage", "Conception", "Réalisation", "Accompagnement"];
const principles = [
  ["Clarté", "Des décisions, livrables et limites compréhensibles."], ["Accessibilité", "Des parcours utilisables au clavier et sur chaque écran."],
  ["Maintenabilité", "Une base structurée pour faciliter les évolutions."], ["Performance", "Une attention portée au poids, au rendu et à la stabilité."],
  ["Sécurité adaptée", "Des mesures proportionnées aux données et aux usages."], ["Accompagnement", "Une communication continue du cadrage à la mise en service."],
];

export default function ServicesPage() {
  return <>
    <section className="relative overflow-hidden border-b border-bg-800"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(226,121,61,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(226,121,61,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" /><div className="relative mx-auto grid max-w-(--container-max) gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-8 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Services numériques</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">Choisir la bonne solution commence par clarifier le besoin.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">Sites web, automatisations et applications métier répondent à des problèmes différents. Nous vous aidons à définir un périmètre utile avant de construire.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#devis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-copper-500 px-5 py-3 font-semibold text-[#14151a]">Présenter votre besoin <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href="#offres" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-bg-800 px-5 py-3 font-semibold hover:border-copper-500">Explorer les services</a></div></div><div className="flex min-h-64 items-center justify-center rounded-sm border border-bg-800 bg-bg-900/80"><Compass className="h-20 w-20 text-copper-500" aria-hidden="true" /></div></div></section>
    <section id="offres" className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Trois domaines</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Une offre lisible, sans empiler des services interchangeables.</h2><div className="mt-10 grid gap-6 lg:grid-cols-3">{serviceOfferings.map((service, index) => <ServiceIndexCard key={service.id} service={service} index={index} />)}</div></div></section>
    <section className="border-b border-bg-800 bg-bg-900/40 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Aide au choix</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Quel point de départ ressemble à votre situation?</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800">{choiceGuide.map(([title, text, id]) => { const service=serviceOfferings.find(item=>item.id===id)!; return <article key={id} className="grid gap-5 bg-bg-950 p-6 md:grid-cols-[.7fr_1.1fr_auto] md:items-center"><h3 className="text-xl font-semibold">{title}</h3><p className="leading-7 text-text-400">{text}</p><Link href={service.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-copper-500">Voir {service.label.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>; })}</div></div></section>
    <section className="border-b border-bg-800 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Collaboration</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Une méthode commune, adaptée à chaque mandat.</h2><ol className="mt-10 grid gap-4 md:grid-cols-5">{collaboration.map((item,index)=><li key={item} className="border-t border-copper-500 pt-5"><span className="font-mono text-xs text-copper-500">0{index+1}</span><h3 className="mt-5 text-lg font-semibold">{item}</h3></li>)}</ol></div></section>
    <section className="border-b border-bg-800 bg-bg-900/30 py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3 text-copper-500"><ShieldCheck className="h-6 w-6" aria-hidden="true" /><Gauge className="h-6 w-6" aria-hidden="true" /><Wrench className="h-6 w-6" aria-hidden="true" /></div><h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Des principes concrets pour guider les choix.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 sm:grid-cols-2 lg:grid-cols-3">{principles.map(([title,text])=><article key={title} className="bg-bg-950 p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{text}</p></article>)}</div></div></section>
    <section className="py-16"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="rounded-sm bg-copper-500 px-6 py-10 text-[#14151a] sm:px-10"><h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">Vous n’avez pas à choisir la solution avant d’expliquer le problème.</h2><p className="mt-4 max-w-2xl leading-7 text-black/70">Le formulaire permet de transmettre le contexte et les priorités afin que la demande puisse être examinée.</p><Link href="/contact#devis" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">Présenter votre besoin <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>
  </>;
}
