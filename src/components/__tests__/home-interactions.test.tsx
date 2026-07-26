import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, { get: (_target, tag) => tag }),
  useReducedMotion: () => true,
  useScroll: () => ({ scrollYProgress: 1 }),
  useTransform: () => 1,
}));

import { featuredServices, nextServiceIndex, ServiceTabs } from "@/components/home-interactions";

const interactionSource = readFileSync(resolve(process.cwd(), "src/components/home-interactions.tsx"), "utf8");

describe("ServiceTabs", () => {
  it("rend exactement trois onglets et trois panneaux associés", () => {
    const html = renderToStaticMarkup(<ServiceTabs />);
    expect((html.match(/role="tab"/g) ?? [])).toHaveLength(3);
    expect((html.match(/role="tabpanel"/g) ?? [])).toHaveLength(3);
    for (const service of featuredServices) {
      expect(html).toContain(`id="service-tab-${service.id}"`);
      expect(html).toContain(`aria-controls="service-panel-${service.id}"`);
      expect(html).toContain(`id="service-panel-${service.id}"`);
      expect(html).toContain(`aria-labelledby="service-tab-${service.id}"`);
    }
    expect(featuredServices.map(({ id }) => id)).toEqual(["web", "automation", "custom"]);
    expect(html).not.toContain("Audit et cadrage");
    expect(html).not.toContain("Maintenance et évolution");
  });

  it("active le premier onglet par défaut", () => {
    const html = renderToStaticMarkup(<ServiceTabs />);
    expect(html).toContain('id="service-tab-web" type="button" role="tab" aria-selected="true"');
    expect(html).toContain('id="service-panel-web" role="tabpanel" aria-labelledby="service-tab-web" aria-hidden="false"');
  });

  it("permet de sélectionner un onglet par clic", () => expect(nextServiceIndex(0, 2)).toBe(2));
  it("avance avec la flèche droite", () => expect(nextServiceIndex(0, "next")).toBe(1));
  it("revient avec la flèche gauche", () => expect(nextServiceIndex(1, "previous")).toBe(0));
  it("boucle avec les flèches", () => expect(nextServiceIndex(0, "previous")).toBe(2));
  it("boucle du dernier au premier avec la flèche droite", () => expect(nextServiceIndex(2, "next")).toBe(0));
  it("revient au premier onglet avec Home", () => expect(nextServiceIndex(2, "home")).toBe(0));
  it("atteint le dernier onglet avec End", () => expect(nextServiceIndex(0, "end")).toBe(2));

  it("affiche uniquement le panneau demandé", () => {
    const html = renderToStaticMarkup(<ServiceTabs initialActive={1} />);
    expect(html).toContain('id="service-tab-automation" type="button" role="tab" aria-selected="true"');
    expect(html).toContain('id="service-panel-automation" role="tabpanel" aria-labelledby="service-tab-automation" aria-hidden="false"');
    expect(html).toContain("Moins de tâches répétitives");
  });

  it("conserve tous les panneaux inactifs dans le DOM avec hidden", () => {
    const html = renderToStaticMarkup(<ServiceTabs />);
    expect((html.match(/hidden=""/g) ?? [])).toHaveLength(2);
  });

  it("neutralise la transition des panneaux en reduced motion", () => {
    expect(interactionSource).toContain("duration: reduceMotion ? 0 : 0.2");
  });

  it("sépare la progression verticale et horizontale", () => {
    expect(interactionSource).toContain("style={{ scaleY: reduceMotion ? 1 : scale }}");
    expect(interactionSource).toContain("style={{ scaleX: reduceMotion ? 1 : scale }}");
    expect(interactionSource).not.toContain("scaleY: reduceMotion ? 1 : scale, scaleX");
  });

  it("branche les flèches du composant sur les commandes bouclantes", () => {
    expect(interactionSource).toContain('selectWithKeyboard("next")');
    expect(interactionSource).toContain('selectWithKeyboard("previous")');
    expect(interactionSource).not.toContain("selectWithKeyboard(active + 1)");
    expect(interactionSource).not.toContain("selectWithKeyboard(active - 1)");
  });

  it("branche Home et End sur les commandes explicites", () => {
    expect(interactionSource).toContain('selectWithKeyboard("home")');
    expect(interactionSource).toContain('selectWithKeyboard("end")');
  });
});
