import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Infotechs Solutions.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales | Infotechs Solutions",
    description: "Mentions légales du site Infotechs Solutions.",
    url: "/mentions-legales",
  },
};

export default function LegalPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Légal</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Mentions légales</h1>
        <div className="prose prose-slate mt-10 max-w-none">
          <h2>Éditeur du site</h2>
          <p>
            Le présent site est édité par {site.name}, entreprise informatique basée à {site.location}. Le courriel de contact confirmé sera ajouté avant la mise en production.
          </p>
          <h2>Confidentialité</h2>
          <p>La politique de confidentialité est disponible sur la page dédiée.</p>
          <h2>Responsabilité</h2>
          <p>
            Les contenus du site sont fournis à titre informatif. Les recommandations techniques finales dépendent d&apos;une analyse du contexte, des contraintes et des objectifs du client.
          </p>
        </div>
      </div>
    </section>
  );
}
