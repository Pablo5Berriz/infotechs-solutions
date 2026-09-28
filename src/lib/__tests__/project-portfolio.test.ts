import { describe,expect,it } from "vitest";
import { getRelatedProjects,portfolioProjects,projectStatusLabels } from "@/lib/project-portfolio";
import fr from "../../../messages/fr/portfolio.json";
import en from "../../../messages/en/portfolio.json";
const NON_PROJECT_KEYS=["statusLabels","listing","detail"];
describe("portfolio 002D",()=>{
it("publie onze réalisations réelles avec des identifiants, slugs et routes uniques",()=>{expect(portfolioProjects).toHaveLength(11);expect(new Set(portfolioProjects.map(x=>x.id)).size).toBe(11);expect(new Set(portfolioProjects.map(x=>x.slug)).size).toBe(11);expect(new Set(portfolioProjects.map(x=>x.href)).size).toBe(11)});
it("aligne chaque route sur son slug et affiche un statut valide",()=>{for(const p of portfolioProjects){expect(p.href).toBe(`/fr/realisations/${p.slug}`);expect(p.status).toBe("concept");expect(projectStatusLabels[p.status]).toBe("Projet indépendant")}});
it("associe uniquement des projets publiés sans auto-référence",()=>{for(const p of portfolioProjects){const related=getRelatedProjects(p);expect(related).toHaveLength(2);expect(related.map(x=>x.id)).not.toContain(p.id)}});
it("fournit les champs éditoriaux sans invention de résultat chiffré",()=>{for(const p of portfolioProjects){expect(p.challenge.length).toBeGreaterThan(0);expect(p.approach.length).toBeGreaterThan(0);expect(p.deliverables.length).toBeGreaterThan(0);expect(p.limitations.length).toBeGreaterThan(0);expect(p.technologies.length).toBeGreaterThan(0);expect(JSON.stringify(p)).not.toMatch(/\+38|heures économisées|clients satisfaits/i)}});
it("expose un logo réel valide pour chacune des onze réalisations",()=>{for(const p of portfolioProjects){expect(p.logo).toMatch(/^\/images\/portfolio\/[a-z]+\.png$/);expect(p.name.length).toBeGreaterThan(0)}});
it("n'inclut jamais Infotechs Solutions comme réalisation",()=>{for(const p of portfolioProjects){expect(p.name.toLowerCase()).not.toContain("infotechs");expect(p.id.toLowerCase()).not.toContain("infotechs")}});
it("garde une parité stricte des clés de contenu FR/EN",()=>{const frKeys=Object.keys(fr).filter(k=>!NON_PROJECT_KEYS.includes(k)).sort();const enKeys=Object.keys(en).filter(k=>!NON_PROJECT_KEYS.includes(k)).sort();expect(enKeys).toEqual(frKeys);expect(frKeys).toHaveLength(11)});
});
