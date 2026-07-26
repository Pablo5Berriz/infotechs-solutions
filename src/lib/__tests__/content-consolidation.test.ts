import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { portfolioProjects } from "@/lib/project-portfolio";
import { serviceOfferings } from "@/lib/service-offerings";
import { navItems, siteConfig } from "@/lib/site-config";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("consolidation des contenus 004A", () => {
  it("conserve des slugs et routes de services uniques", () => {
    expect(new Set(serviceOfferings.map(({ slug }) => slug)).size).toBe(serviceOfferings.length);
    expect(new Set(serviceOfferings.map(({ href }) => href)).size).toBe(serviceOfferings.length);
  });

  it("ne publie que les trois services canoniques", () => {
    expect(serviceOfferings.map(({ slug }) => slug)).toEqual([
      "creation-sites-web",
      "automatisation-ia",
      "applications-web-sur-mesure",
    ]);
    expect(serviceOfferings.every(({ status }) => status === "published")).toBe(true);
  });

  it("ne conserve aucun prix ou délai dans le catalogue canonique", () => {
    expect(JSON.stringify(serviceOfferings)).not.toMatch(/price|timeline|À partir de|semaines|Forfaits mensuels/i);
  });

  it("conserve des identifiants, slugs et routes de portfolio uniques", () => {
    for (const field of ["id", "slug", "href"] as const) {
      expect(new Set(portfolioProjects.map((project) => project[field])).size).toBe(portfolioProjects.length);
    }
  });

  it("identifie explicitement tous les éléments actuels comme concepts", () => {
    expect(portfolioProjects.every(({ status }) => status === "concept")).toBe(true);
  });

  it("alimente l’accueil depuis le portfolio canonique", () => {
    const home = source("src/app/page.tsx");
    expect(home).toContain('from "@/lib/project-portfolio"');
    expect(home).not.toMatch(/import\s*{[^}]*projects[^}]*}\s*from\s*"@\/lib\/data"/);
  });

  it("centralise navigation, CTA et technologies", () => {
    expect(navItems).toBe(siteConfig.navigation);
    expect(siteConfig.primaryCta).toEqual({ label: "Transmettre une demande", href: "/contact#devis" });
    expect(siteConfig.publishedTechnologies).toEqual(["Next.js", "React", "TypeScript"]);
  });

  it("centralise les coordonnées publiées dans la configuration", () => {
    expect(siteConfig.contact.address.streetAddress).toBe("164 rue Principale");
    expect(siteConfig.contact.phone.schema).toBe("+15142083644");
    expect(siteConfig.contact.businessHours.timezone).toBe("America/Toronto");
  });

  it("ne conserve pas les anciennes collections dans data.ts", () => {
    const data = source("src/lib/data.ts");
    expect(data).not.toMatch(/export const (services|projects|resources|projectCategories|serviceIcons)\b/);
  });

  it("ne conserve aucun composant public dépendant des anciennes collections", () => {
    expect(() => source("src/components/service-card.tsx")).toThrow();
    expect(() => source("src/components/project-filter.tsx")).toThrow();
  });
});
