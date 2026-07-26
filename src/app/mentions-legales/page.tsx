import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Mentions légales | Infotechs Solutions" },
  description: "Informations légales et conditions générales d’utilisation du site Infotechs Solutions.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales | Infotechs Solutions",
    description: "Éditeur, propriété intellectuelle, responsabilité et statut des concepts publiés.",
    url: "/mentions-legales",
  },
};

const sectionClass = "border-t border-bg-800 pt-8";

export default function LegalPage() {
  return (
    <div className="bg-bg-950 text-text-100">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Informations légales</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Mentions légales</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-text-400">Informations relatives à l’éditeur, aux contenus et à l’utilisation du site public Infotechs Solutions.</p>

        <div className="mt-12 space-y-10 leading-7 text-text-400">
          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Éditeur du site</h2>
            <p className="mt-4">
              Le site est édité par {site.name}, entreprise de services informatiques offrant notamment la conception de sites web, d’automatisations ciblées et d’applications web. L’adresse publiée est une adresse d’affaires. Les visites se font uniquement sur rendez-vous.
            </p>
            <p className="mt-4">Pour communiquer avec l’éditeur, utilisez le <Link className="font-semibold text-copper-500 underline underline-offset-4" href="/contact#devis">formulaire Contact</Link>.</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Nature des contenus</h2>
            <p className="mt-4">
              Les informations du site présentent l’approche et les services d’Infotechs Solutions. Elles sont générales et ne constituent pas une recommandation professionnelle adaptée à une situation particulière, une offre contractuelle, une garantie de résultat ou un engagement de délai.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Portfolio et concepts démonstratifs</h2>
            <p className="mt-4">
              Les réalisations actuellement publiées sont des concepts démonstratifs, pas des mandats clients. Elles illustrent des hypothèses de conception et ne prouvent aucun résultat commercial, témoignage, technologie déployée ou relation avec une organisation réelle.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Propriété intellectuelle</h2>
            <p className="mt-4">
              Sauf indication contraire, les textes, éléments graphiques, composants visuels et structure éditoriale propres au site sont protégés par les règles applicables en matière de propriété intellectuelle. Leur reproduction ou adaptation substantielle nécessite l’autorisation du titulaire des droits, sous réserve des exceptions prévues par la loi.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Liens externes</h2>
            <p className="mt-4">
              Les liens vers des sites tiers sont fournis à titre informatif. Infotechs Solutions ne contrôle pas leur disponibilité, leur contenu ni leurs pratiques de confidentialité. Leur consultation relève des conditions publiées par leurs exploitants.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Limitation de responsabilité</h2>
            <p className="mt-4">
              Infotechs Solutions veille à la clarté des informations publiées, sans garantir qu’elles soient exemptes de toute omission ou interruption. Dans les limites permises par les règles applicables, l’utilisation du site et les décisions prises sur la seule base de ses contenus demeurent sous la responsabilité de l’utilisateur.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Confidentialité</h2>
            <p className="mt-4">Le traitement des renseignements transmis au moyen du formulaire est décrit dans la <Link className="font-semibold text-copper-500 underline underline-offset-4" href="/confidentialite">politique de confidentialité</Link>.</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Droit applicable</h2>
            <p className="mt-4">
              Le site est exploité depuis le Québec. Son utilisation est régie par les règles du Québec et du Canada qui lui sont applicables, sans limiter les droits impératifs dont un utilisateur peut bénéficier dans son territoire.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
