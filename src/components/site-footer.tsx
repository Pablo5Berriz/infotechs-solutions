import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navItems, site } from "@/lib/data";
import { serviceOfferings } from "@/lib/service-offerings";

// Aucune coordonnée fictive : le téléphone n'est affiché que si site.phone est
// renseigné (variable d'environnement), et aucun réseau social n'est inventé.
// Voir docs/design/implementation-002a-baseline.md pour le contexte de ce lot.

export function SiteFooter() {
  return (
    <footer className="bg-bg-950 text-text-100">
      <div className="mx-auto grid max-w-(--container-max) gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <span className="font-display text-base font-bold tracking-tight text-text-100">
            Infotechs<span className="text-copper-500"> Solutions</span>
          </span>
          <p className="mt-5 max-w-md text-sm leading-6 text-text-400">
            Développement web, applications sur mesure, automatisation IA et accompagnement numérique pour PME en Montérégie et au Québec.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-text-400">
            {site.email ? (
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 min-w-11 items-center gap-2 hover:text-copper-500">
                <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
              </a>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" /> Courriel à confirmer
              </span>
            )}
            {site.phone ? (
              <a href={`tel:${site.phone}`} className="inline-flex min-h-11 min-w-11 items-center gap-2 hover:text-copper-500">
                {site.phone}
              </a>
            ) : (
              <span>Téléphone à venir</span>
            )}
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {site.location}
            </span>
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-500">Navigation</h2>
          <div className="mt-4 grid gap-3 text-sm text-text-400">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 min-w-11 items-center rounded-sm hover:text-text-100">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-500">Services</h2>
          <div className="mt-4 grid gap-3 text-sm text-text-400">
            {serviceOfferings.map((service) => (
              <Link key={service.slug} href={service.href} className="inline-flex min-h-11 min-w-11 items-center rounded-sm hover:text-text-100">
                {service.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-500">Conversion</h2>
          <p className="mt-4 text-sm leading-6 text-text-400">
            Décrivez votre projet et recevez une première orientation claire sur la meilleure approche.
          </p>
          <Link
            href="/contact#devis"
            className="mt-5 inline-flex h-(--button-md-height) items-center rounded-sm bg-copper-500 px-4 text-sm font-semibold text-[#14151a]"
          >
            Demander un devis
          </Link>
        </div>
      </div>
      <div className="border-t border-bg-800">
        <div className="mx-auto flex max-w-(--container-max) flex-col gap-3 px-4 py-6 text-sm text-text-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Infotechs Solutions. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="inline-flex min-h-11 min-w-11 items-center rounded-sm hover:text-text-100">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="inline-flex min-h-11 min-w-11 items-center rounded-sm hover:text-text-100">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
