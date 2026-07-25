import { describe, expect, it } from "vitest";
import { aboutMethod, aboutPrinciples, aboutScope } from "@/lib/about-content";

describe("contenu À propos 002E", () => {
  it("définit six principes concrets et six étapes de collaboration", () => {
    expect(aboutPrinciples).toHaveLength(6);
    expect(aboutMethod).toHaveLength(6);
    expect(new Set(aboutPrinciples.map(item => item.id)).size).toBe(6);
  });

  it("sépare les capacités des besoins à cadrer", () => {
    expect(aboutScope.canDo.length).toBeGreaterThanOrEqual(4);
    expect(aboutScope.needsScoping.length).toBeGreaterThanOrEqual(4);
  });

  it("ne contient aucune revendication commerciale interdite", () => {
    expect(JSON.stringify({ aboutPrinciples, aboutMethod, aboutScope })).not.toMatch(/clients satisfaits|projets livrés|années d’expérience|certifi|partenaire officiel|leader|numéro un/i);
  });
});
