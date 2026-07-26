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

  it("links only to the four published service offerings in canonical order", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    for (const service of serviceOfferings) expect(markup).toContain(`href="${service.href}"`);
    const positions = serviceOfferings.map((service) => markup.indexOf(`href="${service.href}"`));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(markup).toContain('href="/services/audit-et-cadrage"');
    expect(markup).not.toContain("/services/applications-mobiles");
    expect(markup).not.toContain("/services/saas-plateformes-metier");
    expect(markup).not.toContain("/services/refonte-sites-web");
    expect(markup).not.toContain("/services/maintenance-optimisation");
    expect(markup).not.toContain("Maintenance et évolution");
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

  it("publie les coordonnées validées avec des liens accessibles", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);
    for (const text of ["Adresse d’affaires — visites sur rendez-vous", "164 rue Principale", "Saint-Louis-de-Gonzague (Québec)", "514 208-3644", "Lundi au vendredi", "9 h à 17 h"]) {
      expect(markup).toContain(text);
    }
    expect(markup).toContain('href="tel:+15142083644"');
    expect(markup).not.toMatch(/\b[A-Z]\d[A-Z][ -]?\d[A-Z]\d\b/);
  });
});
