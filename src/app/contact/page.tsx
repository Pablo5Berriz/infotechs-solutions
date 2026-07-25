import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ClipboardList, MessageSquareText, Route } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Contact | Infotechs Solutions" },
  description:
    "Présentez votre contexte, vos utilisateurs et vos objectifs à Infotechs Solutions pour amorcer une discussion de cadrage.",
};

const preparationItems = [
  "Le contexte et les utilisateurs concernés",
  "L’objectif à atteindre ou le problème à résoudre",
  "Les outils, contraintes et échéances déjà connus",
];

const nextSteps = [
  {
    number: "01",
    title: "Lecture du besoin",
    text: "Le contexte, les utilisateurs et les contraintes servent de point de départ.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Clarification",
    text: "Les zones d’incertitude sont précisées avant de retenir une solution.",
    icon: MessageSquareText,
  },
  {
    number: "03",
    title: "Prochaine étape",
    text: "Une suite adaptée peut ensuite être proposée, sans engagement de délai automatique.",
    icon: Route,
  },
];

const contactFaq = [
  {
    question: "Quels projets réalisez-vous?",
    answer:
      "Les offres publiées couvrent les sites web, les automatisations ciblées et les applications web sur mesure.",
  },
  {
    question: "Travaillez-vous uniquement au Québec?",
    answer:
      "Infotechs Solutions est ancrée en Montérégie et s’adresse aux PME et organisations du Québec. Toute autre portée est discutée selon le contexte.",
  },
  {
    question: "À quel moment parler d’automatisation?",
    answer:
      "Lorsqu’une tâche répétitive, une double saisie ou un transfert manuel ralentit un processus clairement identifié.",
  },
  {
    question: "Peut-on commencer par un petit périmètre?",
    answer:
      "Oui. Le cadrage sert notamment à isoler une première étape utile, vérifiable et compatible avec les contraintes connues.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-bg-800">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(226,121,61,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(226,121,61,.08)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-(--container-max) gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Contact · discussion de cadrage</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">
              Décrivons votre besoin avant de choisir une solution.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-400">
              Cette page prépare une discussion sur votre contexte, vos utilisateurs et vos objectifs. Elle ne remplace ni le cadrage ni une proposition adaptée.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#demande" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-copper-500 px-5 py-3 font-semibold text-[#14151a]">
                Préparer votre demande <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/services" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-bg-800 px-5 py-3 font-semibold hover:border-copper-500">
                Explorer les services
              </Link>
            </div>
          </div>
          <aside className="border-l-2 border-copper-500 bg-bg-900/80 p-6 sm:p-8" aria-labelledby="contact-usage-title">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Quand utiliser cette interface</p>
            <h2 id="contact-usage-title" className="mt-4 text-2xl font-semibold">Quand un besoin mérite d’être clarifié.</h2>
            <p className="mt-4 leading-7 text-text-400">Utilisez-la pour structurer une première demande liée à un site web, une automatisation ou une application web.</p>
          </aside>
        </div>
      </section>

      <section id="demande" className="scroll-mt-24 border-b border-bg-800 py-16 sm:py-20">
        <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Informations utiles</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Préparez ce qui aide à comprendre le besoin.</h2>
            <ul className="mt-7 space-y-4">
              {preparationItems.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-text-400">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-copper-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-bg-800 pt-6 text-sm leading-6 text-text-400">
              <p className="font-semibold text-text-100">{site.name}</p>
              <p className="mt-2">Ancrage : {site.location}</p>
              <p className="mt-3">Aucune adresse de bureau, aucun téléphone et aucun courriel public ne sont affichés tant qu’ils ne sont pas confirmés.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="border-b border-bg-800 py-16 sm:py-20" aria-labelledby="after-request-title">
        <div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Déroulement</p>
          <h2 id="after-request-title" className="mt-4 text-3xl font-semibold sm:text-4xl">Après réception d’une demande</h2>
          <div className="mt-10 grid gap-px bg-bg-800 lg:grid-cols-3">
            {nextSteps.map(({ number, title, text, icon: Icon }) => (
              <article key={number} className="bg-bg-950 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-copper-500">{number}</span>
                  <Icon className="h-6 w-6 text-copper-500" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-text-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-bg-800 py-16 sm:py-20" aria-labelledby="contact-faq-title">
        <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 sm:px-6 lg:grid-cols-[.65fr_1.35fr] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Repères</p>
            <h2 id="contact-faq-title" className="mt-4 text-3xl font-semibold sm:text-4xl">Questions avant de commencer</h2>
          </div>
          <div className="divide-y divide-bg-800 border-y border-bg-800">
            {contactFaq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                  {item.question}<span className="text-copper-500 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-2xl pb-2 pr-8 leading-7 text-text-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-(--container-max) px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm bg-copper-500 px-6 py-10 text-[#14151a] sm:px-10 lg:px-12 lg:py-12">
            <p className="font-mono text-xs uppercase tracking-[.2em]">Point de départ</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold sm:text-4xl">Contexte, utilisateurs, objectifs et contraintes : commencez par les faits utiles.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-black/70">L’interface vous aide à organiser ces informations. La transmission sera activée seulement lorsqu’un canal réel et validé sera connecté.</p>
            <a href="#demande" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm bg-bg-950 px-5 py-3 font-semibold text-text-100">
              Préparer la discussion <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
