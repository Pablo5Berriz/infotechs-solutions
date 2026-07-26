import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const { SiteFooter } = await import("@/components/site-footer");
const { navItems } = await import("@/lib/site-config");
const { serviceOfferings } = await import("@/lib/service-offerings");

describe("SiteFooter", () => {
  it("links to the essential legal and navigation pages", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    expect(markup).toContain('href="/mentions-legales"');
    expect(markup).toContain('href="/confidentialite"');
    for (const item of navItems) {
      expect(markup, `footer should link to ${item.href}`).toContain(`href="${item.href}"`);
    }
  });

  it("shows the current year dynamically, not a hardcoded past year", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    const currentYear = new Date().getFullYear();
    expect(markup).toContain(`© ${currentYear} Infotechs Solutions`);
  });

  it("does not contain fabricated contact details, certifications, or social links", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    expect(markup).not.toMatch(/certifi[ée]|partenaire officiel/i);
    expect(markup).not.toMatch(/facebook\.com|instagram\.com|linkedin\.com|twitter\.com|x\.com/i);
  });

  it("links only to the three published service offerings", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    for (const service of serviceOfferings) expect(markup).toContain(`href="${service.href}"`);
    expect(markup).not.toContain("/services/applications-mobiles");
    expect(markup).not.toContain("/services/saas-plateformes-metier");
    expect(markup).not.toContain("/services/refonte-sites-web");
    expect(markup).not.toContain("/services/maintenance-optimisation");
  });

  it("retire Ressources et les promesses de conversion indisponibles", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    expect(markup).not.toContain("Ressources");
    expect(markup).not.toContain('/ressources');
    expect(markup).not.toMatch(/Demander un devis|première orientation/);
    expect(markup).toContain("Transmettre une demande");
  });

  it("ne publie aucune coordonnée temporaire", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    expect(markup).not.toContain("Courriel à confirmer");
    expect(markup).not.toContain("Téléphone à venir");
  });
});
