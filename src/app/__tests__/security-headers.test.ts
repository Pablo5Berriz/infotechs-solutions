import { describe, expect, it } from "vitest";
import nextConfig, { contentSecurityPolicy, securityHeaders } from "../../../next.config";

const headers = Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value]));

describe("durcissement des en-têtes HTTP", () => {
  it("désactive X-Powered-By", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("applique les en-têtes à toutes les routes, y compris Contact et son API", async () => {
    const rules = await nextConfig.headers?.();
    expect(rules).toEqual([{ source: "/(.*)", headers: securityHeaders }]);
  });

  it("interdit l’interprétation MIME opportuniste", () => {
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("définit une politique de référent restrictive", () => {
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("désactive caméra, microphone et géolocalisation", () => {
    expect(headers["Permissions-Policy"]).toBe("camera=(), microphone=(), geolocation=()");
  });

  it("interdit l’intégration dans une iframe avec deux protections complémentaires", () => {
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
  });

  it("interdit les objets et limite base, formulaires et connexions à l’application", () => {
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("base-uri 'self'");
    expect(contentSecurityPolicy).toContain("form-action 'self'");
    expect(contentSecurityPolicy).toContain("connect-src 'self'");
  });

  it("n’autorise aucun wildcard ni unsafe-eval", () => {
    expect(contentSecurityPolicy).not.toMatch(/(?:^|[;\s])\*(?:$|[;\s])/);
    expect(contentSecurityPolicy).not.toContain("'unsafe-eval'");
  });

  it("documente les exceptions inline nécessaires à Next, Framer Motion et aux styles", () => {
    expect(contentSecurityPolicy).toContain("script-src 'self' 'unsafe-inline'");
    expect(contentSecurityPolicy).toContain("style-src 'self' 'unsafe-inline'");
  });

  it("ne publie ni Resend ni un secret dans les en-têtes", () => {
    const serializedHeaders = JSON.stringify(securityHeaders);
    expect(serializedHeaders).not.toMatch(/resend|RESEND_API_KEY|CONTACT_FORM_FROM|CONTACT_FORM_TO/i);
  });
});
