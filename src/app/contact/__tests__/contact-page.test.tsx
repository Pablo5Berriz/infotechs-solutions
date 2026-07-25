import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage, { metadata } from "@/app/contact/page";
import { contactNeedTypes } from "@/lib/contact-schema";

const markup = renderToStaticMarkup(<ContactPage />);

describe("ContactPage", () => {
  it("publie un seul H1 et les métadonnées de contact attendues", () => {
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(metadata.title).toEqual({ absolute: "Contact | Infotechs Solutions" });
    expect(metadata.description).toContain("discussion de cadrage");
  });

  it("rend le formulaire et tous ses libellés", () => {
    expect(markup).toContain('<form id="devis"');
    for (const label of ["Nom", "Organisation (optionnel)", "Courriel", "Téléphone (optionnel)", "Type de besoin", "Description"]) {
      expect(markup).toContain(label);
    }
    expect(markup).toContain("Je consens");
  });

  it("marque sémantiquement les contrôles requis et préserve les champs facultatifs", () => {
    for (const name of ["name", "email", "projectType", "message", "consent"]) {
      expect(markup).toMatch(new RegExp(`<(?:input|select|textarea)[^>]*required=""[^>]*name="${name}"|<(?:input|select|textarea)[^>]*name="${name}"[^>]*required=""`));
    }
    for (const name of ["company", "phone"]) {
      const control = markup.match(new RegExp(`<(?:input|select|textarea)[^>]*name="${name}"[^>]*>`))?.[0];
      expect(control).toBeDefined();
      expect(control).not.toContain("required=");
      expect(control).not.toContain("aria-required=");
    }
  });

  it("aligne les types de besoins avec le périmètre 002C", () => {
    for (const type of contactNeedTypes) expect(markup).toContain(`value="${type}"`);
    for (const legacyType of ["Application mobile", "SaaS", "Maintenance ou refonte", "Conseil informatique"]) {
      expect(markup).not.toContain(`value="${legacyType}"`);
    }
  });

  it("rend les CTA et le lien secondaire vers Services", () => {
    expect(markup).toContain('href="#demande"');
    expect(markup).toContain('href="/services"');
    expect(markup).toContain("Préparer la discussion");
  });

  it("explique honnêtement l’absence de transmission", () => {
    expect(markup).toContain("aucune donnée n’est transmise ni stockée");
    expect(markup).toContain("Aucun message ne quittera ce navigateur");
    expect(markup).not.toMatch(/réponse en moins|devis gratuit|disponibilité immédiate/i);
  });

  it("n’affiche aucune coordonnée temporaire ou inventée", () => {
    expect(markup).not.toContain("Courriel à confirmer");
    expect(markup).not.toContain("Téléphone à venir");
    expect(markup).not.toContain("450 000");
    expect(markup).not.toContain("mailto:");
    expect(markup).not.toContain("tel:");
  });

  it("présente les trois étapes et une FAQ limitée à quatre questions", () => {
    expect(markup).toContain("Après réception d’une demande");
    expect(markup).not.toContain("Après votre message");
    for (const item of ["Lecture du besoin", "Clarification", "Prochaine étape"]) expect(markup).toContain(item);
    expect(markup.match(/<details/g)).toHaveLength(4);
  });
});
