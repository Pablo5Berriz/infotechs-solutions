import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité d'Infotechs Solutions pour les demandes de contact, fichiers transmis et futures intégrations analytics.",
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
            Le formulaire de cette V1 valide les champs dans le navigateur, mais ne transmet pas encore les données à un service externe. Une intégration future pourra utiliser Resend, Supabase ou un CRM.
          </p>
          <h2>Utilisation prévue</h2>
          <p>
            Une fois connecté, le formulaire servira uniquement à traiter les demandes de devis, demandes d&apos;information et suivis de projet. Les données ne seront pas revendues.
          </p>
          <h2>Fichiers transmis</h2>
          <p>
            Le champ de téléversement est prévu pour des documents utiles au cadrage du projet. Les fichiers sensibles ou non nécessaires ne devraient pas être transmis.
          </p>
          <h2>Mesure d&apos;audience</h2>
          <p>
            Le site prévoit une intégration future d&apos;outils comme Plausible ou Google Analytics. Une mention explicite devra être ajoutée avant activation.
          </p>
          <h2>Conservation</h2>
          <p>
            La durée de conservation sera définie lors du branchement réel du formulaire et documentée selon le service choisi.
          </p>
        </div>
      </div>
    </section>
  );
}
