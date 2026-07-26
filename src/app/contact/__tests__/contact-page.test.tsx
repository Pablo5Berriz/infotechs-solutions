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
    expect(metadata.alternates).toEqual({ canonical: "/contact" });
    expect(metadata.openGraph).toMatchObject({ url: "/contact", title: "Contact | Infotechs Solutions" });
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

  it("aligne les types de besoins avec le périmètre 004C-2", () => {
    for (const type of contactNeedTypes) expect(markup).toContain(`value="${type}"`);
    expect(markup).toContain("service transversal d’audit et de cadrage");
    for (const legacyType of ["Application mobile", "SaaS", "Maintenance", "Maintenance et évolution", "Maintenance ou refonte", "Conseil informatique"]) {
      expect(markup).not.toContain(`value="${legacyType}"`);
    }
  });

  it("rend les CTA et le lien secondaire vers Services", () => {
    expect(markup).toContain('href="#demande"');
    expect(markup).toContain('href="/services"');
    expect(markup).toContain("Transmettre une demande");
  });

  it("explique honnêtement l’absence de transmission", () => {
    expect(markup).toContain("Transmettre la demande");
    expect(markup).toContain("Aucun délai de réponse automatique n’est promis");
    expect(markup).not.toMatch(/réponse en moins|devis gratuit|disponibilité immédiate/i);
  });

  it("publie les coordonnées d’affaires validées sans valeur temporaire", () => {
    expect(markup).not.toContain("Courriel à confirmer");
    expect(markup).not.toContain("Téléphone à venir");
    expect(markup).not.toContain("450 000");
    expect(markup).not.toContain("mailto:");
    expect(markup).toContain('href="tel:+15142083644"');
    expect(markup).toContain("514 208-3644");
    expect(markup).toContain("164 rue Principale");
    expect(markup).toContain("Saint-Louis-de-Gonzague (Québec)");
    expect(markup).toContain("Lundi au vendredi");
    expect(markup).toContain("9 h à 17 h");
    expect(markup).toContain("Adresse d’affaires — visites sur rendez-vous");
  });

  it("présente les trois étapes et une FAQ limitée à quatre questions", () => {
    expect(markup).toContain("Après réception d’une demande");
    expect(markup).not.toContain("Après votre message");
    for (const item of ["Lecture du besoin", "Clarification", "Prochaine étape"]) expect(markup).toContain(item);
    expect(markup.match(/<details/g)).toHaveLength(4);
  });
});
