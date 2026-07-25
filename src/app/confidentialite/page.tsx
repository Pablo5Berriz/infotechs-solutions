import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Infotechs Solutions.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité | Infotechs Solutions",
    description: "Politique de confidentialité du site Infotechs Solutions.",
    url: "/confidentialite",
  },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Confidentialité</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Politique de confidentialité</h1>
        <div className="prose prose-slate mt-10 max-w-none">
          <h2>Responsable du site</h2>
          <p>
            {site.name} est une startup informatique basée à {site.location}. Le courriel de contact confirmé sera ajouté avant la mise en production.
          </p>
          <h2>Données du formulaire</h2>
          <p>
            Le formulaire recueille le nom, l’organisation facultative, le courriel, le téléphone facultatif, le type de besoin, la description et le consentement. Des données techniques minimales peuvent aussi être traitées pour limiter les abus.
          </p>
          <h2>Finalité et transmission</h2>
          <p>
            Ces informations servent uniquement à recevoir, examiner et suivre une demande adressée à Infotechs Solutions. Elles sont transmises par l’API transactionnelle de Resend aux destinataires autorisés d’Infotechs Solutions et ne sont pas revendues.
          </p>
          <h2>Stockage</h2>
          <p>
            Le site n’enregistre pas les demandes dans une base de données, un CRM ou un outil d’analytics. La transmission courriel implique toutefois le traitement technique du message par Resend et sa réception dans la boîte courriel configurée par Infotechs Solutions.
          </p>
          <h2>Sécurité et conservation</h2>
          <p>
            Le formulaire applique une validation serveur, une limite de taille, un contrôle anti-abus et une limitation de débit. Infotechs Solutions conservera les messages seulement pendant la durée nécessaire à l’examen et au suivi de la demande; la durée juridique définitive doit être validée dans INFOTECHS-LEGAL-001.
          </p>
          <h2>Exercer vos droits</h2>
          <p>
            Pour demander l’accès, la rectification ou la suppression des informations transmises, utilisez le formulaire Contact en précisant qu’il s’agit d’une demande relative à la confidentialité. Une coordonnée officielle sera publiée après validation juridique.
          </p>
        </div>
      </div>
    </section>
  );
}
