import Link from "next/link";
import { ArrowRight, Braces, Check, Cpu, Database, Network, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { BadgeConcept } from "@/components/badge-concept";
import { ButtonLink } from "@/components/button-link";
import { ProcessTimeline, ServiceTabs } from "@/components/home-interactions";
import { Reveal } from "@/components/reveal";
import { projects, whyUs } from "@/lib/data";

const technologies = ["Next.js", "React", "TypeScript", "PostgreSQL", "Docker"];

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-500">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>{text && <p className="mt-5 max-w-2xl leading-7 text-text-400">{text}</p>}</div>;
}

export default function Home() {
  return (
    <>
      <section id="hero" className="relative isolate overflow-hidden border-b border-bg-800">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(226,121,61,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(226,121,61,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-copper-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-(--container-max) items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-copper-500"><span className="h-px w-8 bg-copper-500" /> Studio technologique québécois</p>
            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">Nous concevons les systèmes numériques qui font avancer <span className="text-copper-500">votre entreprise.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-400">Sites web, applications métier et automatisations utiles, conçus avec rigueur pour les PME du Québec.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact#devis" className="!bg-copper-500 !text-[#14151a] !shadow-none hover:!bg-copper-500 hover:!shadow-[var(--shadow-glow-copper)]">Démarrer un projet</ButtonLink><ButtonLink href="/realisations" variant="secondary" className="!border-bg-800 !bg-transparent !text-text-100 hover:!border-copper-500 hover:!text-copper-500">Voir les concepts</ButtonLink></div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-400">{["Architecture claire", "Livraison vérifiable", "Accompagnement local"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-copper-500" aria-hidden="true" />{item}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-lg" >
            <div className="relative aspect-square" aria-label="Schéma abstrait représentant un écosystème numérique connecté" role="img">
              <div className="absolute inset-[12%] rotate-45 border border-bg-800" /><div className="absolute inset-[27%] rotate-45 border border-copper-500/60" /><div className="absolute left-1/2 top-[8%] h-[84%] w-px bg-gradient-to-b from-transparent via-copper-500 to-transparent" /><div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-gradient-to-r from-transparent via-copper-500 to-transparent" />
              {[["left-[8%] top-[44%]",Network],["right-[8%] top-[44%]",Database],["left-[44%] top-[8%]",Braces],["left-[44%] bottom-[8%]",Workflow],["left-[40%] top-[40%]",Cpu]].map(([position, Icon], index) => { const NodeIcon = Icon as typeof Cpu; return <div key={index} className={`absolute ${position} flex h-16 w-16 items-center justify-center rounded-sm border border-bg-800 bg-bg-900 shadow-[var(--shadow-md)] ${index === 4 ? "h-24 w-24 border-copper-500 text-copper-500" : "text-text-400"}`}><NodeIcon className="h-6 w-6" aria-hidden="true" /></div>; })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow="Proposition de valeur" title="La technologie doit simplifier vos opérations — jamais les compliquer." text="Nous réunissons stratégie, conception et développement dans un même processus pour livrer des outils compréhensibles, performants et réellement utiles." /></Reveal><div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 md:grid-cols-4">{whyUs.map(([title,text], index) => <Reveal key={title} delay={index*.04} className="bg-bg-950 p-6 sm:p-8"><p className="font-mono text-xs text-copper-500">0{index+1}</p><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{text}</p></Reveal>)}</div></div></section>

      <section id="services-accueil" className="border-b border-bg-800 bg-bg-900/40 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow="Services stratégiques" title="Une expertise ciblée sur vos enjeux numériques." /></Reveal><ServiceTabs /></div></section>

      <section id="processus" className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal><SectionIntro eyebrow="Processus" title="Cinq étapes. Un parcours clair du besoin à la mise en ligne." /></Reveal><ProcessTimeline /></div></section>

      <section id="concepts" className="border-b border-bg-800 bg-bg-900/30 py-20 sm:py-24"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><Reveal><SectionIntro eyebrow="Concepts démonstratifs" title="Des systèmes pensés autour de problèmes concrets." /></Reveal><ButtonLink href="/realisations" variant="ghost" className="text-text-100 hover:text-copper-500">Tous les concepts</ButtonLink></div><div className="mt-12 grid gap-6 md:grid-cols-3">{projects.slice(0,3).map((project,index) => <Reveal key={project.slug} delay={index*.05}><Link href={`/realisations/${project.slug}`} className="group block min-h-full rounded-sm border border-bg-800 bg-bg-900 p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-copper-500 hover:shadow-[var(--shadow-md)] motion-reduce:hover:translate-y-0"><BadgeConcept /><div className="mt-14 flex h-28 items-center justify-center border border-bg-800 bg-bg-950"><Network className="h-7 w-7 text-copper-500" aria-hidden="true" /></div><p className="mt-6 font-mono text-xs uppercase tracking-wider text-text-400">{project.category}</p><h3 className="mt-3 text-xl font-semibold">{project.title}</h3><p className="mt-3 text-sm leading-6 text-text-400">{project.summary}</p><span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-copper-500">Voir le concept <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link></Reveal>)}</div></div></section>

      <section className="border-b border-bg-800 py-20 sm:py-24"><div className="mx-auto grid max-w-(--container-max) gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8"><Reveal><SectionIntro eyebrow="Expertise technique" title="Des choix modernes, expliqués sans jargon inutile." text="Nous privilégions une architecture sobre, sécurisée et maintenable. Chaque technologie répond à un besoin précis plutôt qu’à une tendance." /><div className="mt-9 flex flex-wrap gap-2">{technologies.map((technology) => <span key={technology} className="rounded-sm border border-bg-800 px-3 py-2 font-mono text-xs text-text-400">{technology}</span>)}</div></Reveal><Reveal delay={.08} className="grid gap-px overflow-hidden rounded-sm border border-bg-800 bg-bg-800 sm:grid-cols-2"><div className="bg-bg-900 p-7"><ShieldCheck className="h-7 w-7 text-copper-500" aria-hidden="true"/><h3 className="mt-8 text-xl font-semibold">Sécurité raisonnée</h3><p className="mt-3 text-sm leading-6 text-text-400">Accès, données et déploiement pensés dès l’architecture.</p></div><div className="bg-bg-900 p-7"><Sparkles className="h-7 w-7 text-copper-500" aria-hidden="true"/><h3 className="mt-8 text-xl font-semibold">Qualité vérifiable</h3><p className="mt-3 text-sm leading-6 text-text-400">Tests, performance et accessibilité intégrés à la livraison.</p></div></Reveal></div></section>

      <section id="cta-final" className="py-16 sm:py-20"><div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8"><Reveal className="relative overflow-hidden rounded-sm bg-copper-500 px-6 py-12 text-[#14151a] sm:px-10 lg:px-14"><div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] border-black/5" aria-hidden="true"/><p className="font-mono text-xs uppercase tracking-[.2em]">Prochaine étape</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">Transformons votre prochain défi numérique en système utile.</h2><p className="mt-5 max-w-2xl leading-7 text-black/70">Une première conversation suffit pour clarifier le besoin, les priorités et une trajectoire réaliste.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact#devis" className="!bg-bg-950 !text-text-100 hover:!bg-bg-900">Planifier un échange</ButtonLink><ButtonLink href="/services" variant="secondary" className="!border-black/25 !bg-transparent !text-[#14151a] hover:!border-black hover:!text-black">Explorer les services</ButtonLink></div></Reveal></div></section>
    </>
  );
}
