import { describe,expect,it } from "vitest";
import { getRelatedProjects,portfolioProjects,projectStatusLabels } from "@/lib/project-portfolio";
describe("portfolio 002D",()=>{
it("publie six concepts existants avec des identifiants, slugs et routes uniques",()=>{expect(portfolioProjects).toHaveLength(6);expect(new Set(portfolioProjects.map(x=>x.id)).size).toBe(6);expect(new Set(portfolioProjects.map(x=>x.slug)).size).toBe(6);expect(new Set(portfolioProjects.map(x=>x.href)).size).toBe(6)});
it("aligne chaque route sur son slug et affiche un statut valide",()=>{for(const p of portfolioProjects){expect(p.href).toBe(`/fr/realisations/${p.slug}`);expect(p.status).toBe("concept");expect(projectStatusLabels[p.status]).toBe("CONCEPT DÉMONSTRATIF")}});
it("associe uniquement des projets publiés sans auto-référence",()=>{for(const p of portfolioProjects){const related=getRelatedProjects(p);expect(related).toHaveLength(2);expect(related.map(x=>x.id)).not.toContain(p.id)}});
it("fournit les champs éditoriaux sans technologie ni résultat chiffré",()=>{for(const p of portfolioProjects){expect(p.challenge.length).toBeGreaterThan(0);expect(p.approach.length).toBeGreaterThan(0);expect(p.deliverables.length).toBeGreaterThan(0);expect(p.limitations.length).toBeGreaterThan(0);expect(p.technologies).toEqual([]);expect(JSON.stringify(p)).not.toMatch(/\+38|heures économisées|clients satisfaits/i)}});
});
