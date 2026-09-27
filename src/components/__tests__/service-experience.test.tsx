import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import { ServiceBreadcrumb, ServiceDetail, ServiceIndexCard } from "@/components/service-experience";
import { serviceOfferings } from "@/lib/service-offerings";

const web = serviceOfferings[0];

describe("expérience des services 002C", () => {
  it("rend une carte avec son libellé, ses résultats et sa route", () => {
    const markup = renderToStaticMarkup(<ServiceIndexCard service={web} index={0} />);
    expect(markup).toContain(web.label);
    expect(markup).toContain(`href="${web.href}"`);
    expect(markup).toContain("Découvrir ce service");
    expect(markup).toContain("aria-hidden=\"true\"");
  });

  it("rend un fil d’Ariane sémantique avec la page courante", () => {
    const markup = renderToStaticMarkup(<ServiceBreadcrumb service={web} />);
    expect(markup).toContain('<nav aria-label="Fil d’Ariane">');
    expect(markup).toContain('href="/fr/services"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain(web.label);
  });

  it("rend une page détaillée avec un seul h1 et toutes ses sections", () => {
    const markup = renderToStaticMarkup(<ServiceDetail service={web} />);
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(markup).toContain("Résultats recherchés");
    expect(markup).toContain("Capacités");
    expect(markup).toContain("Processus");
    expect(markup).toContain("Ce qui peut être livré");
    expect(markup).toContain("Services associés");
    expect(markup).toContain('href="/fr/contact#devis"');
  });

  it("rend exactement les deux offres associées et exclut l’offre active", () => {
    const markup = renderToStaticMarkup(<ServiceDetail service={web} />);
    expect(markup).toContain(serviceOfferings[1].href);
    expect(markup).toContain(serviceOfferings[2].href);
    const relatedSection = markup.slice(markup.indexOf("Services associés"));
    expect(relatedSection).not.toContain(`href="${web.href}"`);
    expect((relatedSection.match(/Voir ce service/g) ?? [])).toHaveLength(2);
  });
});
