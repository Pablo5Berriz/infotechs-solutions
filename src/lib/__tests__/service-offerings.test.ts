import { describe, expect, it } from "vitest";
import { getRelatedOfferings, getServiceOffering, serviceOfferings } from "@/lib/service-offerings";

describe("catalogue des services 004C-2", () => {
  it("déclare exactement les quatre offres publiées autorisées", () => {
    expect(serviceOfferings.map(({ slug }) => slug)).toEqual([
      "creation-sites-web",
      "automatisation-ia",
      "applications-web-sur-mesure",
      "audit-et-cadrage",
    ]);
    expect(serviceOfferings.filter(({ kind }) => kind === "solution")).toHaveLength(3);
    expect(serviceOfferings.filter(({ kind }) => kind === "entry")).toHaveLength(1);
    expect(serviceOfferings).not.toEqual(expect.arrayContaining([expect.objectContaining({ slug: expect.stringMatching(/maintenance/i) })]));
  });

  it("utilise des identifiants, slugs et routes uniques et cohérents", () => {
    expect(new Set(serviceOfferings.map(({ id }) => id)).size).toBe(4);
    expect(new Set(serviceOfferings.map(({ slug }) => slug)).size).toBe(4);
    expect(new Set(serviceOfferings.map(({ href }) => href)).size).toBe(4);
    for (const service of serviceOfferings) {
      expect(service.status).toBe("published");
      expect(service.href).toBe(`/fr/services/${service.slug}`);
      expect(getServiceOffering(service.slug)).toBe(service);
    }
  });

  it("conserve deux relations entre solutions et propose les trois suites depuis l’offre d’entrée", () => {
    for (const service of serviceOfferings) {
      const related = getRelatedOfferings(service);
      expect(related).toHaveLength(service.kind === "entry" ? 3 : 2);
      expect(related.map(({ id }) => id)).not.toContain(service.id);
      expect(related.every((item) => serviceOfferings.includes(item))).toBe(true);
    }
  });

  it("publie Audit et cadrage sans technologie ni promesse interdite", () => {
    const audit = getServiceOffering("audit-et-cadrage");
    expect(audit).toMatchObject({ kind: "entry", status: "published", technologies: [], href: "/fr/services/audit-et-cadrage" });
    expect(audit?.relatedServiceIds).toEqual(["web", "automation", "custom"]);
    expect(audit?.considerations).toEqual(expect.arrayContaining([
      expect.stringContaining("Aucun audit de cybersécurité avancé ni avis juridique n’est inclus"),
      expect.stringContaining("réalisation ultérieure n’est ni incluse ni garantie"),
      expect.stringContaining("estimation ferme exige un périmètre validé"),
    ]));
    const serialized = JSON.stringify(audit);
    expect(serialized).not.toMatch(/24\s*\/\s*7|prix|\$|maintenance et évolution/i);
  });

  it("fournit le contenu requis à chaque offre", () => {
    for (const service of serviceOfferings) {
      expect(service.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(service.capabilities.length).toBeGreaterThanOrEqual(6);
      expect(service.process).toHaveLength(5);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(5);
      expect(service.idealFor.length).toBeGreaterThanOrEqual(4);
      expect(service.seo.title).toBeTruthy();
      expect(service.seo.description).toBeTruthy();
      expect(service).not.toHaveProperty("price");
      expect(service).not.toHaveProperty("timeline");
    }
  });
});
