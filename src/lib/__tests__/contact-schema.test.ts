import { describe, expect, it } from "vitest";
import { contactNeedTypes, contactSchema } from "@/lib/contact-schema";

const validPayload = {
  locale: "fr",
  name: "Jean Tremblay",
  company: "Organisation exemple",
  email: "jean@example.com",
  phone: "4501234567",
  projectType: "web" as const,
  message: "Nous souhaitons clarifier un besoin numérique pour notre organisation.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepte les cinq types de besoins compatibles avec 004C-2", () => {
    expect(contactNeedTypes).toEqual(["web", "automation", "custom", "audit", "other"]);
    for (const projectType of contactNeedTypes) {
      expect(contactSchema.safeParse({ ...validPayload, projectType }).success).toBe(true);
    }
  });

  it("accepte une demande sans organisation ni téléphone", () => {
    const minimalPayload = {
      locale:validPayload.locale,
      name: validPayload.name,
      email: validPayload.email,
      projectType: validPayload.projectType,
      message: validPayload.message,
      consent: validPayload.consent,
    };
    expect(contactSchema.safeParse(minimalPayload).success).toBe(true);
  });

  it("rejette un courriel invalide", () => {
    expect(contactSchema.safeParse({ ...validPayload, email: "courriel-invalide" }).success).toBe(false);
  });

  it("rejette une description trop courte", () => {
    expect(contactSchema.safeParse({ ...validPayload, message: "Trop court" }).success).toBe(false);
  });

  it("exige le nom, le type de besoin et la description", () => {
    for (const field of ["name", "projectType", "message"] as const) {
      expect(contactSchema.safeParse({ ...validPayload, [field]: "" }).success).toBe(false);
    }
  });

  it("exige un consentement explicite", () => {
    expect(contactSchema.safeParse({ ...validPayload, consent: false }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validPayload, consent: undefined }).success).toBe(false);
  });

  it("rejette les anciennes catégories", () => {
    for (const projectType of ["Application mobile", "SaaS", "Maintenance", "Maintenance et évolution", "Maintenance ou refonte", "Conseil informatique"]) {
      expect(contactSchema.safeParse({ ...validPayload, projectType }).success).toBe(false);
    }
  });

  it("ne définit aucun champ de téléversement", () => {
    expect("file" in contactSchema.shape).toBe(false);
  });
});
