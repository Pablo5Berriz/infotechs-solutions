import { describe, expect, it } from "vitest";
import { buildLocalBusinessSchema, containsPlaceholderValue } from "@/lib/schema-org";
import { siteConfig } from "@/lib/site-config";

const baseSite = {
  name: "Infotechs Solutions",
  url: "https://infotechssolutions.ca",
  email: "",
  phone: siteConfig.contact.phone.schema,
  description: "Description du site.",
  contact: siteConfig.contact,
};

describe("buildLocalBusinessSchema", () => {
  it("omits an unconfigured email and publishes the normalized phone", () => {
    const schema = buildLocalBusinessSchema(baseSite);
    expect(schema).not.toHaveProperty("email");
    expect(schema.telephone).toBe("+15142083644");
  });

  it("includes a configured email without changing the canonical phone", () => {
    const schema = buildLocalBusinessSchema({
      ...baseSite,
      email: "contact@infotechssolutions.ca",
    });
    expect(schema.email).toBe("contact@infotechssolutions.ca");
    expect(schema.telephone).toBe("+15142083644");
  });

  it("publishes the canonical address and business hours with the postal code", () => {
    const schema = buildLocalBusinessSchema(baseSite);
    expect(schema.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "164 rue Principale",
      addressLocality: "Saint-Louis-de-Gonzague",
      addressRegion: "QC",
      postalCode: "J0S 1T0",
      addressCountry: "CA",
    });
    expect(schema.openingHoursSpecification).toEqual({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    });
  });

  it("never produces placeholder values, regardless of configuration", () => {
    const withoutContact = buildLocalBusinessSchema(baseSite);
    const withContact = buildLocalBusinessSchema({
      ...baseSite,
      email: "contact@infotechssolutions.ca",
    });
    expect(containsPlaceholderValue(withoutContact)).toBe(false);
    expect(containsPlaceholderValue(withContact)).toBe(false);
  });

  it("flags known placeholder strings when present (regression guard)", () => {
    const polluted = { ...baseSite, telephone: "Téléphone à venir" } as Record<string, unknown>;
    expect(containsPlaceholderValue(polluted)).toBe(true);
    const polluted2 = { email: "Courriel à confirmer" };
    expect(containsPlaceholderValue(polluted2)).toBe(true);
  });

  it("always emits @context and @type for schema.org validity", () => {
    const schema = buildLocalBusinessSchema(baseSite);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
  });
});
