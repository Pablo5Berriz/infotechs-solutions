import { describe, expect, it } from "vitest";
import { getRelatedOfferings, getServiceOffering, serviceOfferings } from "@/lib/service-offerings";

describe("catalogue des services 002C", () => {
  it("déclare exactement les trois offres du lot", () => {
    expect(serviceOfferings.map(({ slug }) => slug)).toEqual([
      "creation-sites-web",
      "automatisation-ia",
      "applications-web-sur-mesure",
    ]);
  });

  it("utilise des identifiants, slugs et routes uniques et cohérents", () => {
    expect(new Set(serviceOfferings.map(({ id }) => id)).size).toBe(3);
    expect(new Set(serviceOfferings.map(({ slug }) => slug)).size).toBe(3);
    expect(new Set(serviceOfferings.map(({ href }) => href)).size).toBe(3);
    for (const service of serviceOfferings) {
      expect(service.status).toBe("published");
      expect(service.href).toBe(`/services/${service.slug}`);
      expect(getServiceOffering(service.slug)).toBe(service);
    }
  });

  it("associe deux services existants sans auto-référence", () => {
    for (const service of serviceOfferings) {
      const related = getRelatedOfferings(service);
      expect(related).toHaveLength(2);
      expect(related.map(({ id }) => id)).not.toContain(service.id);
      expect(related.every((item) => serviceOfferings.includes(item))).toBe(true);
    }
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
