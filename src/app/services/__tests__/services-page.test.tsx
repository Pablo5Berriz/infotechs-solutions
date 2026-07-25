import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ServicesPage, { metadata } from "@/app/services/page";
import { serviceOfferings } from "@/lib/service-offerings";

const markup = renderToStaticMarkup(<ServicesPage />);

describe("page index Services 002C", () => {
  it("rend un seul titre principal et exactement trois cartes de services", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    for (const service of serviceOfferings) {
      expect(markup).toContain(service.label);
      expect(markup).toContain(`href="${service.href}"`);
    }
    expect((markup.match(/Découvrir ce service/g) ?? [])).toHaveLength(3);
  });

  it("rend le guide de choix, la collaboration et le CTA final", () => {
    expect(markup).toContain("Aide au choix");
    expect(markup).toContain("Collaboration");
    expect(markup).toContain("Des principes concrets");
    expect(markup).toContain('href="/contact#devis"');
  });

  it("publie des métadonnées et une canonique propres à la page", () => {
    expect(metadata.title).toContain("Services web");
    expect(metadata.alternates).toEqual({ canonical: "/services" });
  });

  it("n’intègre aucun asset Stitch ni revendication non vérifiée", () => {
    expect(markup).not.toMatch(/stitch|<img|<image/i);
    expect(markup).not.toMatch(/certifi|clients satisfaits|projets livrés|garanti/i);
  });
});
