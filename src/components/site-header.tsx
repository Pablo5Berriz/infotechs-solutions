"use client";

import {useContent, useAppLocale} from "@/i18n/content";
import {LanguageSwitcher} from "@/components/language-switcher";
import Link from "@/components/localized-link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {getSiteConfig} from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Marque temporaire pour ce lot (INFOTECHS-DESIGN-IMPLEMENTATION-002A) :
// wordmark textuel uniquement. Le monogramme généré par Stitch
// (public/images/infotechs.png) n'est PAS utilisé ici — ses droits
// commerciaux ne sont pas confirmés (voir docs/design/assets-provenance-registry.md).
// Ne pas remplacer ce texte par une image sans validation explicite du logo officiel.

export function SiteHeader() {
 const locale=useAppLocale();
 const siteConfig=getSiteConfig(locale);
 const navItems=siteConfig.navigation;
  const m = useContent();

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
        <Link href="/" className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400">
          <span className="font-display text-base font-bold tracking-tight text-text-100">
            Infotechs<span className="text-purple-300"> Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={m.navigation.mainNav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center rounded-sm px-3 text-sm font-medium text-text-400 transition-colors duration-150 ease-out hover:text-text-100",
                  isActive && "text-purple-300",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href={siteConfig.primaryCta.href}
            className="inline-flex h-(--button-md-height) items-center rounded-sm bg-purple-600 px-4 text-sm font-semibold text-[#f4f1ea] transition-shadow duration-150 ease-out hover:shadow-[0_0_24px_rgba(101,40,255,0.25)]"
          >
            {siteConfig.primaryCta.label}
          </Link>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-text-100 hover:bg-bg-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={mobileMenuId}
          aria-label={open ? m.navigation.mobileMenu.close : m.navigation.mobileMenu.open}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div id={mobileMenuId} className="border-t border-bg-800 bg-bg-950 px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label={m.navigation.mobileMenu.nav}>
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
                    isActive && "text-purple-300",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={siteConfig.primaryCta.href}
              onClick={closeMenu}
              className="mt-3 inline-flex h-(--button-md-height) items-center justify-center rounded-sm bg-purple-600 px-4 text-center text-sm font-semibold text-[#f4f1ea]"
            >
              {siteConfig.primaryCta.label}
            </Link>
          </nav>
          <LanguageSwitcher onSelect={closeMenu} />
        </div>
      ) : null}
    </header>
  );
}
