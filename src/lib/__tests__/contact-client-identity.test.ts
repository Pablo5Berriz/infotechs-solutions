import { afterEach, describe, expect, it } from "vitest";
import {
  normalizeContactClientIp,
  resolveContactClientIdentity,
} from "@/lib/contact-client-identity";

function identityRequest(headers: HeadersInit = {}) {
  return new Request("http://localhost/api/contact", { headers });
}

describe("resolveContactClientIdentity", () => {
  afterEach(() => delete process.env.CONTACT_TRUSTED_PROXY_MODE);

  it("utilise un fallback stable sans en-tête interne", () => {
    const first = resolveContactClientIdentity(identityRequest());
    expect(first).toBe(resolveContactClientIdentity(identityRequest()));
    expect(first).not.toContain("undefined");
  });

  it("ignore l’en-tête interne lorsque le proxy est désactivé", () => {
    expect(resolveContactClientIdentity(identityRequest({ "x-infotechs-client-ip": "203.0.113.10" })))
      .toBe(resolveContactClientIdentity(identityRequest()));
  });

  it.each(["cf-connecting-ip", "x-forwarded-for", "x-real-ip"])(
    "ignore l’en-tête public falsifiable %s",
    (header) => {
      expect(resolveContactClientIdentity(identityRequest({ [header]: "203.0.113.40" })))
        .toBe(resolveContactClientIdentity(identityRequest()));
    },
  );

  it("accepte l’en-tête interne uniquement en mode validé", () => {
    process.env.CONTACT_TRUSTED_PROXY_MODE = "trusted";
    expect(resolveContactClientIdentity(identityRequest({ "x-infotechs-client-ip": "203.0.113.10" })))
      .toBe("contact-client:203.0.113.10");
  });

  it("normalise IPv4 et IPv6", () => {
    expect(normalizeContactClientIp("203.0.113.10")).toBe("203.0.113.10");
    expect(normalizeContactClientIp("2001:0DB8:0:0:0:0:0:1")).toBe("2001:db8::1");
  });

  it.each([
    "203.0.113.10, 198.51.100.2",
    "203.0.113.10\r\nX-Injected: yes",
    "not-an-ip",
    "",
  ])("refuse une adresse interne ambiguë ou invalide : %s", (value) => {
    expect(normalizeContactClientIp(value)).toBeNull();
  });
});
