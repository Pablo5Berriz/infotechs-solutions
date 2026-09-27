import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import ServiceDetailPage, { generateMetadata, generateStaticParams } from "@/app/[locale]/services/[slug]/page";
import { serviceOfferings } from "@/lib/service-offerings";

describe("routes détaillées des services 004C-2", () => {
  it("pré-génère exactement les huit routes autorisées", () => {
    expect(generateStaticParams({params:{locale:"fr"}})).toEqual(serviceOfferings.map(({ slug }) => ({ slug })));
    expect(generateStaticParams({params:{locale:"fr"}})).toContainEqual({ slug: "audit-et-cadrage" });
  });

  it("rend chaque page avec un seul h1, son fil d’Ariane et les relations prévues", async () => {
    for (const service of serviceOfferings) {
      const page = await ServiceDetailPage({ params: Promise.resolve({ locale:"fr", slug: service.slug }) });
      const markup = renderToStaticMarkup(page);
      expect(markup.match(/<h1/g)).toHaveLength(1);
      expect(markup).toContain(service.title);
      expect(markup).toContain('aria-current="page"');
      expect((markup.match(/Voir ce service/g) ?? [])).toHaveLength(service.kind === "entry" ? 3 : 2);
      if (service.kind === "entry") expect(markup).toContain("Solutions possibles après le cadrage");
    }
  });

  it("fournit une canonique et des métadonnées distinctes pour chaque offre", async () => {
    const results = await Promise.all(serviceOfferings.map(async (service) => ({
      service,
      metadata: await generateMetadata({ params: Promise.resolve({ locale:"fr", slug: service.slug }) }),
    })));
    expect(new Set(results.map(({ metadata }) => metadata.title))).toHaveProperty("size", 8);
    for (const { service, metadata } of results) {
      expect(metadata.alternates).toMatchObject({ canonical: service.href });
      expect(metadata.description).toBe(service.seo.description);
    }
  });

  it("publie la canonique et le SEO de l’offre Audit et cadrage", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale:"fr", slug: "audit-et-cadrage" }) });
    expect(metadata.title).toBe("Audit et cadrage numérique");
    expect(metadata.alternates).toMatchObject({ canonical: "/fr/services/audit-et-cadrage" });
    expect(metadata.openGraph).toMatchObject({ url: "/fr/services/audit-et-cadrage" });
  });

  it("retourne notFound pour un ancien slug non autorisé", async () => {
    await expect(ServiceDetailPage({ params: Promise.resolve({ locale:"fr", slug: "applications-mobiles" }) })).rejects.toMatchObject({
      digest: "NEXT_HTTP_ERROR_FALLBACK;404",
    });
  });

  it("ne publie aucune route Maintenance et évolution", async () => {
    expect(generateStaticParams({params:{locale:"fr"}})).not.toContainEqual({ slug: "maintenance-et-evolution" });
    await expect(ServiceDetailPage({ params: Promise.resolve({ locale:"fr", slug: "maintenance-et-evolution" }) })).rejects.toMatchObject({
      digest: "NEXT_HTTP_ERROR_FALLBACK;404",
    });
  });

  it("n’expose plus de rendu legacy, budget indicatif ou délai typique", async () => {
    for (const service of serviceOfferings) {
      const page = await ServiceDetailPage({ params: Promise.resolve({ locale:"fr", slug: service.slug }) });
      const markup = renderToStaticMarkup(page);
      expect(markup).not.toContain("Budget indicatif");
      expect(markup).not.toContain("Délai typique");
      expect(markup).not.toContain("LegacyServiceDetail");
    }
  });
});
