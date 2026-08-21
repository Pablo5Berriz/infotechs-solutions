import Link from "next/link";
import { Container } from "@/components/Container";
import { SiteNavigation } from "@/components/SiteNavigation";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Button } from "@/components/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight sm:text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        >
          Infotechs <span className="text-accent">Solutions</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <SiteNavigation />
          <Button href="/contact" variant="primary">
            Parler de votre projet
          </Button>
        </div>
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
