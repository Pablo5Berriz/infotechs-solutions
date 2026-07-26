import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site-config";
import { serviceOfferings } from "@/lib/service-offerings";

export function SiteFooter() {
  const { contact } = siteConfig;
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
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 min-w-11 items-center gap-2 hover:text-copper-500">
                <Mail className="h-4 w-4" aria-hidden="true" /> {contact.email}
              </a>
            ) : null}
            <a href={contact.phone.href} className="inline-flex min-h-11 min-w-11 items-center gap-2 hover:text-copper-500">
              <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phone.display}
            </a>
            <div className="flex gap-2 leading-6">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{contact.address.natureLabel}<br />{contact.address.streetAddress}<br />{contact.address.localityLabel}</span>
            </div>
            <div className="flex gap-2 leading-6">
              <Clock3 className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{contact.businessHours.daysLabel}<br />{contact.businessHours.hoursLabel}</span>
            </div>
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
            Présentez votre contexte, vos utilisateurs et vos priorités pour transmettre une demande à Infotechs Solutions.
          </p>
          <Link
            href={siteConfig.primaryCta.href}
            className="mt-5 inline-flex h-(--button-md-height) items-center rounded-sm bg-copper-500 px-4 text-sm font-semibold text-[#14151a]"
          >
            {siteConfig.primaryCta.label}
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
