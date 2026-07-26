import { renderToStaticMarkup } from "react-dom/server";
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

describe("SiteHeader", () => {
  it("exposes the required ARIA attributes on the mobile menu button", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);
    expect(markup).toMatch(/<button[^>]*type="button"/);
    expect(markup).toContain('aria-controls="mobile-menu"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toMatch(/aria-label="(Ouvrir le menu|Fermer le menu)"/);
    expect(markup).not.toContain("onkeydown");
  });

  it("uses a temporary text wordmark, not the Stitch-generated logo image", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);
    expect(markup).toContain("Infotechs");
    expect(markup).toContain("Solutions");
    expect(markup).not.toContain("infotechs.png");
    expect(markup).not.toMatch(/<img/);
  });

  it("renders the primary navigation with a label for assistive technology", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);
    expect(markup).toContain('aria-label="Navigation principale"');
  });

  it("retire Ressources des navigations desktop et mobile", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);
    expect(navItems.map((item) => item.href)).toEqual(["/", "/services", "/realisations", "/a-propos", "/contact"]);
    expect(markup).not.toContain("Ressources");
    expect(markup).not.toContain('/ressources');
  });

  it("emploie des CTA compatibles avec la transmission réelle", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);
    expect(markup).toContain("Nous contacter");
    expect(markup).toContain("Transmettre une demande");
    expect(markup).not.toMatch(/Planifier un appel|Demander un devis/);
  });
});
