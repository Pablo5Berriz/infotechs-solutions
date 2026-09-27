import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import proxy, { config } from "@/proxy";

// INFOTECHS-I18N-001B-R2-FINAL — garde-fou 404 deterministe dans src/proxy.ts.
// Couvre le contrat §8/§9 de la directive : routes valides -> pass-through,
// routes inconnues -> 404 HTML localisee complete, sans toucher API/_next/assets.

function req(path: string, init?: { method?: string }) {
  return new NextRequest(new URL(`http://localhost${path}`), init);
}

async function bodyText(response: Response) {
  return response.text();
}

describe("proxy — garde-fou 404 (R2-FINAL)", () => {
  it("route FR valide (home) -> pass-through", async () => {
    const res = await proxy(req("/fr"));
    expect(res.status).not.toBe(404);
    expect(res.headers.get("X-Robots-Tag")).toBeNull();
  });

  it("route EN valide (home) -> pass-through", async () => {
    const res = await proxy(req("/en"));
    expect(res.status).not.toBe(404);
    expect(res.headers.get("X-Robots-Tag")).toBeNull();
  });

  it("route service FR valide -> pass-through", async () => {
    const res = await proxy(req("/fr/services/creation-sites-web"));
    expect(res.status).not.toBe(404);
  });

  it("route service EN valide -> pass-through", async () => {
    const res = await proxy(req("/en/services/website-creation"));
    expect(res.status).not.toBe(404);
  });

  it("route portfolio valide (realisations FR / portfolio EN) -> pass-through", async () => {
    const resFr = await proxy(req("/fr/realisations"));
    const resEn = await proxy(req("/en/portfolio"));
    expect(resFr.status).not.toBe(404);
    expect(resEn.status).not.toBe(404);
  });

  it("query string sur route valide ne transforme pas la route en 404", async () => {
    const res = await proxy(req("/fr/services?utm_source=test"));
    expect(res.status).not.toBe(404);
  });

  it("URL FR inconnue -> 404 HTML localisee complete", async () => {
    const res = await proxy(req("/fr/missing-i18n"));
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toContain("text/html");
    expect(res.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
    const html = await bodyText(res);
    expect(html).toContain('<html lang="fr-CA">');
    expect(html).toContain("Cette page est introuvable.");
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain("__next_error__");
  });

  it("URL EN inconnue -> 404 HTML localisee complete", async () => {
    const res = await proxy(req("/en/missing-i18n"));
    expect(res.status).toBe(404);
    const html = await bodyText(res);
    expect(html).toContain('<html lang="en-CA">');
    expect(html).toContain("This page can&#39;t be found.");
  });

  it("slug service FR invalide -> 404 FR", async () => {
    const res = await proxy(req("/fr/services/missing-service"));
    expect(res.status).toBe(404);
    const html = await bodyText(res);
    expect(html).toContain('<html lang="fr-CA">');
  });

  it("slug service EN invalide -> 404 EN", async () => {
    const res = await proxy(req("/en/services/missing-service"));
    expect(res.status).toBe(404);
    const html = await bodyText(res);
    expect(html).toContain('<html lang="en-CA">');
  });

  it("missing.txt sous prefixe locale -> 404 HTML localisee (pas un asset statique)", async () => {
    const res = await proxy(req("/fr/missing.txt"));
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toContain("text/html");
  });

  it("HEAD sur URL inconnue -> memes status/headers que GET, sans corps", async () => {
    const getRes = await proxy(req("/fr/missing-i18n"));
    const headRes = await proxy(req("/fr/missing-i18n", { method: "HEAD" }));
    expect(headRes.status).toBe(getRes.status);
    expect(headRes.headers.get("Content-Type")).toBe(getRes.headers.get("Content-Type"));
    expect(headRes.headers.get("X-Robots-Tag")).toBe(getRes.headers.get("X-Robots-Tag"));
    const headBody = await bodyText(headRes);
    expect(headBody).toBe("");
  });

  it("matcher exclut /api, /_next et les fichiers avec extension", () => {
    expect(config.matcher).toContain("/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)");
  });

  it("ne repond jamais 404 pour une route publique canonique connue (echantillon complet)", async () => {
    const knownFr = [
      "/fr", "/fr/services", "/fr/realisations", "/fr/a-propos", "/fr/contact",
      "/fr/mentions-legales", "/fr/confidentialite",
      "/fr/services/creation-sites-web", "/fr/services/automatisation-ia",
      "/fr/services/applications-web-sur-mesure", "/fr/services/audit-et-cadrage",
      "/fr/realisations/site-web-garage-local", "/fr/realisations/plateforme-reservation",
      "/fr/realisations/application-gestion-interne", "/fr/realisations/automatisation-administrative",
      "/fr/realisations/tableau-bord-pme", "/fr/realisations/application-mobile-service-local",
    ];
    const knownEn = [
      "/en", "/en/services", "/en/portfolio", "/en/about", "/en/contact",
      "/en/legal-notice", "/en/privacy",
      "/en/services/website-creation", "/en/services/ai-automation",
      "/en/services/custom-web-applications", "/en/services/audit-and-planning",
      "/en/portfolio/local-garage-website", "/en/portfolio/booking-platform",
      "/en/portfolio/internal-management-application", "/en/portfolio/administrative-automation",
      "/en/portfolio/business-dashboard", "/en/portfolio/mobile-experience",
    ];
    for (const path of [...knownFr, ...knownEn]) {
      const res = await proxy(req(path));
      expect(res.status, `${path} ne doit pas etre 404`).not.toBe(404);
    }
  });
});
