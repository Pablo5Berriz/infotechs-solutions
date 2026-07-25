import { describe, expect, it } from "vitest";
import { buildLocalBusinessSchema, containsPlaceholderValue } from "@/lib/schema-org";

const baseSite = {
  name: "Infotechs Solutions",
  url: "https://infotechssolutions.ca",
  email: "",
  phone: "",
  description: "Description du site.",
};

describe("buildLocalBusinessSchema", () => {
  it("omits email and telephone when not configured", () => {
    const schema = buildLocalBusinessSchema(baseSite);
    expect(schema).not.toHaveProperty("email");
    expect(schema).not.toHaveProperty("telephone");
  });

  it("includes email and telephone only when both are configured", () => {
    const schema = buildLocalBusinessSchema({
      ...baseSite,
      email: "contact@infotechssolutions.ca",
      phone: "+1 450 000 0000",
    });
    expect(schema.email).toBe("contact@infotechssolutions.ca");
    expect(schema.telephone).toBe("+1 450 000 0000");
  });

  it("never produces placeholder values, regardless of configuration", () => {
    const withoutContact = buildLocalBusinessSchema(baseSite);
    const withContact = buildLocalBusinessSchema({
      ...baseSite,
      email: "contact@infotechssolutions.ca",
      phone: "+1 450 000 0000",
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
