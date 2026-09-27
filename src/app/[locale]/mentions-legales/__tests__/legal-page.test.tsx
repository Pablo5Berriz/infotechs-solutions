import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import LegalPage, {generateMetadata} from "@/app/[locale]/mentions-legales/page";
const metadata=await generateMetadata({params:Promise.resolve({locale:'fr'})});


const markup = renderToStaticMarkup(<LegalPage />);
const publicSources = [
  "src/app/[locale]/confidentialite/page.tsx",
  "src/app/[locale]/mentions-legales/page.tsx",
  "src/app/[locale]/contact/page.tsx",
  "src/components/contact-form.tsx",
  "src/components/site-header.tsx",
  "src/components/site-footer.tsx",
].map((path) => readFileSync(resolve(process.cwd(), path), "utf8")).join("\n");

describe("mentions légales du MVP", () => {
  it("publie un H1 unique et les métadonnées locales", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(metadata.alternates).toMatchObject({ canonical: "/fr/mentions-legales" });
    expect(metadata.openGraph).toMatchObject({ url: "/fr/mentions-legales", title: "Mentions légales | Infotechs Solutions" });
  });

  it("identifie l’activité et un moyen de contact sans donnée inventée", () => {
    expect(markup).toContain("Infotechs Solutions");
    expect(markup).toContain("entreprise de services informatiques");
    expect(markup).toContain('href="/fr/contact#devis"');
    expect(markup).not.toMatch(/\bNEQ\b|numéro d’entreprise|directeur de publication|hébergé par|certification détenue/i);
  });

  it("décrit la propriété intellectuelle, la responsabilité et le droit applicable avec prudence", () => {
    for (const text of ["Propriété intellectuelle", "Limitation de responsabilité", "Droit applicable", "règles du Québec et du Canada qui lui sont applicables"]) expect(markup).toContain(text);
  });

  it("qualifie exactement les projets du portfolio", () => {
    expect(markup).toContain("projets personnels et indépendants, pas des mandats clients");
    expect(markup).toContain("ne prouvent aucun résultat commercial");
  });

  it("retire les textes temporaires et contradictions du périmètre public", () => {
    expect(publicSources).not.toMatch(/courriel (sera|serait).+(ajouté|à venir)|téléphone à venir|Supabase|téléversement|Google Analytics|Plausible|devis automatique|réponse (sous|dans)/i);
    expect(publicSources).not.toContain('href="/ressources"');
  });

  it("ne présente plus le portfolio comme des concepts démonstratifs", () => {
    expect(markup).not.toContain("visites se font uniquement sur rendez-vous");
    expect(markup).not.toContain("concepts démonstratifs, pas des mandats clients");
  });
});
