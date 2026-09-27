import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import AboutPage, {generateMetadata} from "@/app/[locale]/a-propos/page";
const metadata=await generateMetadata({params:Promise.resolve({locale:'fr'})});

import { aboutMethod, aboutPrinciples } from "@/lib/about-content";

const markup = renderToStaticMarkup(<AboutPage />);

describe("page À propos 002E", () => {
  it("rend un seul h1, le positionnement, les principes et la méthode", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(markup).toContain("PME et organisations");
    for (const principle of aboutPrinciples) expect(markup).toContain(principle.title);
    for (const step of aboutMethod) expect(markup).toContain(step.title);
  });

  it("rend le périmètre, les CTA et les preuves disponibles", () => {
    expect(markup).toContain("Périmètre responsable");
    expect(markup).toContain('href="/fr/contact#devis"');
    expect(markup).toContain('href="/fr/services"');
    expect(markup).toContain('href="/fr/realisations"');
  });

  it("présente honnêtement les concepts du portfolio", () => {
    expect(markup).toContain("concepts démonstratifs");
    expect(markup).toContain("Ils ne sont pas présentés comme des mandats clients");
  });

  it("n’invente ni équipe, portrait, preuve commerciale ou asset Stitch", () => {
    expect(markup).not.toMatch(/clients satisfaits|projets livrés|années d’expérience|équipe multidisciplinaire|certifi|partenaire officiel|leader|numéro un/i);
    expect(markup).not.toMatch(/<img|<image|stitch|logo client/i);
  });

  it("utilise des liens natifs et un visuel principal accessible", () => {
    expect(markup).not.toMatch(/role="button"/);
    expect(markup).toContain('role="img"');
    expect(markup).toContain("La collaboration relie le contexte");
    expect(markup).toContain("min-h-11");
  });

  it("publie les métadonnées propres à la route", () => {
    expect(metadata.title).toBe("À propos d’Infotechs Solutions");
    expect(metadata.description).toContain("sites web, automatisations et applications métier");
    expect(metadata.alternates).toMatchObject({ canonical: "/fr/a-propos" });
    expect(metadata.openGraph).toMatchObject({ url: "/fr/a-propos" });
  });
});
