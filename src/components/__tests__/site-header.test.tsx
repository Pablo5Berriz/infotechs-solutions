import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const { SiteHeader } = await import("@/components/site-header");
const { navItems } = await import("@/lib/site-config");
const headerSource = readFileSync(resolve(process.cwd(), "src/components/site-header.tsx"), "utf8");

describe("SiteHeader", () => {
  it("exposes the required ARIA attributes on the mobile menu button", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(markup).toMatch(/<button[^>]*type="button"/);
    expect(markup).toContain('aria-controls="mobile-menu"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toMatch(/aria-label="(Ouvrir le menu|Fermer le menu)"/);
    expect(markup).not.toContain("onkeydown");
  });

  it("uses a temporary text wordmark, not the Stitch-generated logo image", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(markup).toContain("Infotechs");
    expect(markup).toContain("Solutions");
    expect(markup).not.toContain("infotechs.png");
    expect(markup).not.toMatch(/<img/);
  });

  it("renders the primary navigation with a label for assistive technology", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(markup).toContain('aria-label="Navigation principale"');
  });

  it("retire Ressources des navigations desktop et mobile", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(navItems.map((item) => item.href)).toEqual(["/", "/services", "/realisations", "/a-propos", "/contact"]);
    expect(markup).not.toContain("Ressources");
    expect(markup).not.toContain('/ressources');
  });

  it("emploie des CTA compatibles avec la transmission réelle", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(markup).not.toContain("Nous contacter");
    expect(markup).toContain("Transmettre une demande");
    expect(markup).not.toMatch(/Planifier un appel|Demander un devis/);
  });

  it("dérive les CTA desktop et mobile de la configuration", () => {
    expect(headerSource.match(/siteConfig\.primaryCta\.href/g)).toHaveLength(2);
    expect(headerSource.match(/siteConfig\.primaryCta\.label/g)).toHaveLength(2);
    expect(headerSource).not.toContain('href="/fr/contact#devis"');
  });

  it("expose un ThemeSwitcher accessible desktop et mobile (INFOTECHS-THEME-001)", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="light" />);
    expect(markup).toMatch(/aria-label="(Activer le thème sombre|Activer le thème clair)"/);
    expect(headerSource.match(/<ThemeSwitcher/g)).toHaveLength(2);
  });

  it("rend le panneau du menu mobile en overlay plein écran opaque (backdrop fix)", () => {
    // Le panneau est descendant de <header>, qui a backdrop-blur-xl : un filtre CSS
    // fait de header le containing block des descendants position:fixed (spec CSS),
    // donc "bottom-0" s'y résoudrait (bug réel trouvé en QA live) au lieu du viewport.
    // Hauteur explicite en dvh (unité toujours relative au viewport) à la place de bottom-0.
    expect(headerSource).toMatch(/id=\{mobileMenuId\} className="fixed inset-x-0 top-16 z-overlay h-\[calc\(100dvh-4rem\)\] overflow-y-auto border-t border-bg-800 bg-bg-950/);
    expect(headerSource).not.toContain('bottom-0 z-overlay');
  });

  it("accepte le thème initial dark et l'affiche via le switcher", () => {
    const markup = renderToStaticMarkup(<SiteHeader initialTheme="dark" />);
    expect(markup).toMatch(/aria-label="Activer le thème clair"/);
  });
});
