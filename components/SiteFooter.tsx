import Link from "next/link";
import { Container } from "@/components/Container";
import { NAV_ITEMS, LEGAL_ITEMS } from "@/lib/navigation";

const linkClasses =
  "hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

export function SiteFooter() {
  return (
    <footer className="tone-dark bg-background text-foreground">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:justify-between sm:py-16">
        <div className="max-w-sm">
          <p className="text-lg font-semibold">Infotechs Solutions</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Solutions numériques pour PME — présence numérique, outils
            métier et exploitation numérique.
          </p>
        </div>
        <nav
          aria-label="Navigation du pied de page"
          className="flex flex-col gap-8 sm:flex-row sm:gap-16"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Navigation
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Légal
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/contact" className={linkClasses}>
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container className="py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Infotechs Solutions.
        </Container>
      </div>
    </footer>
  );
}
