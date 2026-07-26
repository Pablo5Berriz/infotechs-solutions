import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité | Infotechs Solutions" },
  description: "Politique de confidentialité du site et du formulaire de contact Infotechs Solutions.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité | Infotechs Solutions",
    description: "Renseignements sur la collecte, la transmission et la protection des données du formulaire Contact.",
    url: "/confidentialite",
  },
};

const sectionClass = "border-t border-bg-800 pt-8";

export default function PrivacyPage() {
  return (
    <div className="bg-bg-950 text-text-100">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Confidentialité · renseignements personnels</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Politique de confidentialité</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-text-400">
          Cette politique explique comment {site.name} traite les renseignements transmis par le formulaire Contact. Elle ne couvre aucune activité publicitaire ou analytique, car le site n’en utilise pas actuellement.
        </p>
        <p className="mt-4 text-sm text-text-400">Entrée en vigueur et dernière mise à jour : 24 juillet 2026.</p>

        <div className="mt-12 space-y-10 leading-7 text-text-400">
          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Exploitant et responsable</h2>
            <p className="mt-4">
              {site.name} exploite le site et est responsable des renseignements personnels qu’elle détient. L’adresse publiée est une adresse d’affaires. Les visites se font uniquement sur rendez-vous.
            </p>
            <p className="mt-4">
              Le titre de la fonction responsable est <strong className="text-text-100">Responsable de la protection des renseignements personnels</strong>. Toute question, demande d’exercice d’un droit ou plainte peut lui être adressée au moyen du <Link className="font-semibold text-copper-500 underline underline-offset-4" href="/contact#devis">formulaire Contact</Link>, en indiquant « Confidentialité » dans la description.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Renseignements collectés</h2>
            <p className="mt-4">Le formulaire demande les renseignements suivants :</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>nom — obligatoire;</li>
              <li>organisation — facultative;</li>
              <li>adresse courriel — obligatoire;</li>
              <li>téléphone — facultatif;</li>
              <li>type de besoin — obligatoire;</li>
              <li>description de la demande — obligatoire;</li>
              <li>consentement à la transmission et au traitement — obligatoire.</li>
            </ul>
            <p className="mt-4">
              Pour limiter les abus, une identité réseau validée ou un identifiant conservateur de remplacement sert à produire une clé hachée temporaire de limitation de débit. L’adresse réseau brute n’est pas conservée dans le limiteur. Un champ piège anti-robot est également vérifié. Ces éléments ne sont pas ajoutés au courriel envoyé à Infotechs Solutions.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Finalités et consentement</h2>
            <p className="mt-4">
              Les renseignements servent uniquement à transmettre, examiner et traiter la demande, à y donner suite lorsque cela est approprié, ainsi qu’à protéger le formulaire contre les abus. Le consentement demandé avant l’envoi porte sur ces finalités et sur la transmission décrite ici.
            </p>
            <p className="mt-4">Ils ne sont pas utilisés pour le marketing, une infolettre, le profilage, la publicité, la mesure d’audience ou le partage commercial.</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Transmission par Resend</h2>
            <p className="mt-4">
              Le serveur transmet à Resend le nom, l’organisation lorsqu’elle est fournie, le courriel, le téléphone lorsqu’il est fourni, le type de besoin et la description. Resend agit comme fournisseur technique de transmission courriel. Le message est destiné uniquement aux personnes autorisées d’Infotechs Solutions qui doivent l’examiner ou le traiter.
            </p>
            <p className="mt-4">
              Le consentement, la clé hachée du rate limit et le champ anti-robot ne sont pas inclus dans le courriel. Aucun fichier, donnée marketing, profil publicitaire ou donnée analytics n’est transmis.
            </p>
            <p className="mt-4">
              Resend indique que ses principales opérations de traitement ont lieu aux États-Unis et qu’il peut recourir à des sous-traitants autorisés. Les renseignements peuvent donc être traités à l’extérieur du Québec et du Canada, où les règles applicables peuvent différer.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Stockage et conservation</h2>
            <p className="mt-4">
              Le site ne conserve aucune copie de la demande dans une base de données, un CRM ou un fichier applicatif. Le message et ses métadonnées sont toutefois traités dans les systèmes de Resend et dans la boîte courriel destinataire.
            </p>
            <p className="mt-4">
              Infotechs Solutions conserve les messages pendant la période nécessaire à l’examen et au suivi de la demande, puis les supprime ou les anonymise lorsque les finalités sont accomplies, sous réserve des obligations légales ou de la nécessité d’établir, exercer ou défendre un droit. Resend applique ses propres critères de conservation pour fournir le service et respecter ses obligations.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Mesures de protection</h2>
            <p className="mt-4">
              Les mesures générales comprennent une validation serveur stricte, des limites de taille, un champ anti-robot, une limitation de débit, des secrets réservés au serveur, un délai maximal pour l’appel fournisseur et des journaux techniques qui n’incluent pas le contenu complet de la demande. Aucun moyen de transmission ou de conservation ne peut toutefois garantir une sécurité absolue.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Vos droits et plaintes</h2>
            <p className="mt-4">
              Selon les règles applicables, vous pouvez demander l’accès aux renseignements qui vous concernent, leur rectification ou leur suppression, retirer votre consentement pour l’avenir et déposer une plainte sur leur traitement. Certaines restrictions légales ou obligations de conservation peuvent s’appliquer.
            </p>
            <p className="mt-4">
              Adressez d’abord votre demande au Responsable de la protection des renseignements personnels par le <Link className="font-semibold text-copper-500 underline underline-offset-4" href="/contact#devis">formulaire Contact</Link>. Vous pouvez également vous informer auprès de la <a className="font-semibold text-copper-500 underline underline-offset-4" href="https://www.cai.gouv.qc.ca/" rel="noreferrer">Commission d’accès à l’information du Québec</a>.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Cookies et mesure d’audience</h2>
            <p className="mt-4">
              Le site n’intègre actuellement aucun outil analytics, pixel publicitaire, CAPTCHA tiers ou cookie non essentiel. Aucune bannière de consentement n’est donc affichée. Cette politique devra être réévaluée avant l’ajout d’une technologie de suivi ou d’un cookie non essentiel.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-text-100">Mise à jour de la politique</h2>
            <p className="mt-4">
              Cette politique est révisée lorsque les pratiques de collecte, les fournisseurs ou les obligations applicables changent. La version publiée indique sa date d’entrée en vigueur et sa dernière mise à jour. Un changement important sera présenté de manière appropriée avant son application.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
