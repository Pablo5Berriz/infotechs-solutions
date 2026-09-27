import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/app/[locale]/page.tsx"), "utf8");

describe("page d’accueil 002B", () => {
  it("affiche trois badges de concept", () => {
    expect(source).toContain('import { getPortfolioProjects } from "@/lib/project-portfolio"');
    expect(source).toContain("const projects = portfolioProjects");
    expect(source).toContain("projects.slice(0,3)");
    expect(source).toContain("<BadgeConcept />");
  });

  it("relie les trois cartes à leurs concepts", () => {
    expect(source).toContain('href={`/realisations/${project.slug}`}');
  });

  it("conserve les CTA principal et secondaire", () => {
    expect(source).toContain('href="/contact#devis"');
    expect(source).toContain('href="/realisations"');
  });

  it("n’intègre aucune image ni asset Stitch", () => {
    expect(source).not.toContain("next/image");
    expect(source).not.toContain("_stitch-source");
    expect(source).not.toMatch(/<Image\b/);
  });

  it("ne revendique ni statistiques ni certifications non vérifiées", () => {
    expect(source).not.toMatch(/objectif Lighthouse|certification|clients satisfaits|projets livrés/i);
    expect(source).not.toMatch(/AWS|GraphQL/);
    expect(source).not.toMatch(/PostgreSQL|Docker/);
  });

  it("utilise le container centralisé et la hauteur réelle du header", () => {
    expect(source).not.toContain("max-w-[1280px]");
    expect(source).toContain("max-w-(--container-max)");
    expect(source).toContain("min-h-[calc(100svh-64px)]");
  });
});
