"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

// Marque temporaire pour ce lot (INFOTECHS-DESIGN-IMPLEMENTATION-002A) :
// wordmark textuel uniquement. Le monogramme généré par Stitch
// (public/images/infotechs.png) n'est PAS utilisé ici — ses droits
// commerciaux ne sont pas confirmés (voir docs/design/assets-provenance-registry.md).
// Ne pas remplacer ce texte par une image sans validation explicite du logo officiel.

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuId = "mobile-menu";

  // Fermeture au clavier (Échap) et restitution du focus au bouton d'ouverture.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Déplacement du focus vers le premier lien du menu à l'ouverture.
  useEffect(() => {
    if (open) {
      firstMobileLinkRef.current?.focus();
    }
  }, [open]);

  function closeMenu() {
    setOpen(false);
    toggleButtonRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-header border-b border-bg-800 bg-bg-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-(--container-max) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-500">
          <span className="font-display text-base font-bold tracking-tight text-text-100">
            Infotechs<span className="text-copper-500"> Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center rounded-sm px-3 text-sm font-medium text-text-400 transition-colors duration-150 ease-out hover:text-text-100",
                  isActive && "text-copper-500",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-(--button-md-height) items-center rounded-sm border border-bg-800 px-4 text-sm font-semibold text-text-100 transition-colors duration-150 ease-out hover:border-copper-500 hover:text-copper-500"
          >
            Planifier un appel
          </Link>
          <Link
            href="/contact#devis"
            className="inline-flex h-(--button-md-height) items-center rounded-sm bg-copper-500 px-4 text-sm font-semibold text-[#14151a] transition-shadow duration-150 ease-out hover:shadow-[0_0_24px_rgba(226,121,61,0.25)]"
          >
            Demander un devis
          </Link>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-text-100 hover:bg-bg-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-500 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={mobileMenuId}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div id={mobileMenuId} className="border-t border-bg-800 bg-bg-950 px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Navigation mobile">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-sm px-3 py-3 text-base font-medium text-text-400",
                    isActive && "text-copper-500",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact#devis"
              onClick={closeMenu}
              className="mt-3 inline-flex h-(--button-md-height) items-center justify-center rounded-sm bg-copper-500 px-4 text-center text-sm font-semibold text-[#14151a]"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
