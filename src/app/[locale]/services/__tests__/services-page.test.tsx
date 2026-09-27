import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import ServicesPage, {generateMetadata} from "@/app/[locale]/services/page";
const metadata=await generateMetadata({params:Promise.resolve({locale:'fr'})});

import { serviceOfferings } from "@/lib/service-offerings";

const markup = renderToStaticMarkup(<ServicesPage />);

describe("page index Services 004C-2", () => {
  it("rend un seul titre principal et les huit offres publiées", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    for (const service of serviceOfferings) {
      expect(markup).toContain(service.label);
      expect(markup).toContain(`href="${service.href}"`);
    }
    expect((markup.match(/Découvrir ce service/g) ?? [])).toHaveLength(8);
  });

  it("sépare les solutions de réalisation du service transversal", () => {
    expect(markup).toContain("Nos solutions de réalisation");
    expect(markup).toContain("Service transversal d’entrée");
    expect(markup).toContain("Clarifier avant de construire");
    expect(markup.indexOf("Nos solutions de réalisation")).toBeLessThan(markup.indexOf("Service transversal d’entrée"));
  });

  it("rend le guide de choix, la collaboration et le CTA final", () => {
    expect(markup).toContain("Aide au choix");
    expect(markup).toContain("Collaboration");
    expect(markup).toContain("Des principes concrets");
    expect(markup).toContain('href="/fr/contact#devis"');
  });

  it("publie des métadonnées et une canonique propres à la page", () => {
    expect(metadata.title).toContain("Services web");
    expect(metadata.alternates).toMatchObject({ canonical: "/fr/services" });
  });

  it("n’intègre aucun asset Stitch ni revendication non vérifiée", () => {
    expect(markup).not.toMatch(/stitch|<img|<image/i);
    expect(markup).not.toMatch(/certifi|clients satisfaits|projets livrés|garantie de résultat/i);
  });
});
