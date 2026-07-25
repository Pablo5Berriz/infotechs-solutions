import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ServiceDetailPage, { generateMetadata, generateStaticParams } from "@/app/services/[slug]/page";
import { serviceOfferings } from "@/lib/service-offerings";

describe("routes détaillées des services 002C", () => {
  it("pré-génère exactement les trois routes autorisées", () => {
    expect(generateStaticParams()).toEqual(serviceOfferings.map(({ slug }) => ({ slug })));
  });

  it("rend chaque page avec un seul h1, son fil d’Ariane et ses deux services associés", async () => {
    for (const service of serviceOfferings) {
      const page = await ServiceDetailPage({ params: Promise.resolve({ slug: service.slug }) });
      const markup = renderToStaticMarkup(page);
      expect(markup.match(/<h1/g)).toHaveLength(1);
      expect(markup).toContain(service.title);
      expect(markup).toContain('aria-current="page"');
      expect((markup.match(/Voir ce service/g) ?? [])).toHaveLength(2);
    }
  });

  it("fournit une canonique et des métadonnées distinctes pour chaque offre", async () => {
    const results = await Promise.all(serviceOfferings.map(async (service) => ({
      service,
      metadata: await generateMetadata({ params: Promise.resolve({ slug: service.slug }) }),
    })));
    expect(new Set(results.map(({ metadata }) => metadata.title))).toHaveProperty("size", 3);
    for (const { service, metadata } of results) {
      expect(metadata.alternates).toEqual({ canonical: service.href });
      expect(metadata.description).toBe(service.seo.description);
    }
  });

  it("retourne notFound pour un ancien slug non autorisé", async () => {
    await expect(ServiceDetailPage({ params: Promise.resolve({ slug: "applications-mobiles" }) })).rejects.toMatchObject({
      digest: "NEXT_HTTP_ERROR_FALLBACK;404",
    });
  });

  it("n’expose plus de rendu legacy, budget indicatif ou délai typique", async () => {
    for (const service of serviceOfferings) {
      const page = await ServiceDetailPage({ params: Promise.resolve({ slug: service.slug }) });
      const markup = renderToStaticMarkup(page);
      expect(markup).not.toContain("Budget indicatif");
      expect(markup).not.toContain("Délai typique");
      expect(markup).not.toContain("LegacyServiceDetail");
    }
  });
});
