import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PrivacyPage, { metadata } from "@/app/confidentialite/page";

const markup = renderToStaticMarkup(<PrivacyPage />);
const deliverySource = readFileSync(resolve(process.cwd(), "src/lib/contact-delivery.ts"), "utf8");

describe("confidentialité technique du canal Contact", () => {
  it("décrit les champs, la finalité, Resend et l’absence de stockage applicatif", () => {
    for (const text of ["organisation — facultative", "téléphone — facultatif", "Resend", "ne sont pas utilisés pour le marketing", "ne conserve aucune copie de la demande dans une base de données"]) {
      expect(markup).toContain(text);
    }
  });

  it("publie un H1 unique et les métadonnées locales", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(metadata.alternates).toEqual({ canonical: "/confidentialite" });
    expect(metadata.openGraph).toMatchObject({ url: "/confidentialite", title: "Politique de confidentialité | Infotechs Solutions" });
  });

  it("énumère les champs et distingue obligatoires et facultatifs", () => {
    for (const label of ["nom — obligatoire", "organisation — facultative", "adresse courriel — obligatoire", "téléphone — facultatif", "type de besoin — obligatoire", "description de la demande — obligatoire", "consentement à la transmission et au traitement — obligatoire"]) {
      expect(markup).toContain(label);
    }
  });

  it("documente les droits, le contact, la date et le traitement hors Québec", () => {
    expect(markup).toContain("Responsable de la protection des renseignements personnels");
    expect(markup).toContain('href="/contact#devis"');
    expect(markup).toContain("24 juillet 2026");
    expect(markup).toContain("États-Unis");
    expect(markup).toContain("Commission d’accès à l’information du Québec");
  });

  it("ne publie aucune fonction future comme active", () => {
    expect(markup).not.toMatch(/téléversement|Supabase|CRM non utilisé|Google Analytics|Plausible/i);
  });

  it("décrit le rate limiter conformément aux modes de confiance Security H2", () => {
    expect(markup).not.toContain("agent utilisateur");
    expect(markup).toContain("une identité réseau validée ou un identifiant conservateur de remplacement");
    expect(markup).toContain("une clé hachée temporaire");
    expect(markup).toContain("L’adresse réseau brute n’est pas conservée dans le limiteur");
    expect(markup).not.toMatch(/adresse (?:IP|réseau) brute (?:est|soit) (?:stockée|conservée)/i);
  });

  it("n’intègre ni stockage, ni CRM, ni analytics dans la livraison", () => {
    expect(deliverySource).not.toMatch(/supabase|prisma|mongoose|analytics|crm/i);
    expect(deliverySource).toContain("https://api.resend.com/emails");
  });
});
