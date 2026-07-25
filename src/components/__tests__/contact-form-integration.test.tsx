import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact-form";

const source = readFileSync(resolve(process.cwd(), "src/components/contact-form.tsx"), "utf8");
const markup = renderToStaticMarkup(<ContactForm />);

describe("interface de transmission Contact", () => {
  it("rend l’état initial, les champs requis et le honeypot", () => {
    expect(markup).toContain('action="/api/contact"');
    expect(markup).toContain('method="post"');
    expect(markup).toContain("Transmettre la demande");
    expect(markup).toContain('id="contact-website"');
    expect(markup).toContain('aria-live="polite"');
  });

  it("prévoit chargement, double soumission, succès et erreur accessible", () => {
    expect(source).toContain("isSubmitting || submission.kind === \"success\"");
    expect(source).toContain("Transmission…");
    expect(source).toContain('role="status"');
    expect(source).toContain('role="alert"');
  });

  it("réinitialise après succès et conserve les données après échec", () => {
    expect(source).toMatch(/setSubmission\(\{ kind: "success"[\s\S]*?reset\(/);
    expect(source).not.toMatch(/kind: "error"[\s\S]{0,200}reset\(/);
  });

  it("ne contient ni fausse promesse ni délai garanti", () => {
    expect(markup).not.toContain("aucune donnée n’est transmise");
    expect(markup).not.toMatch(/réponse sous|dans les 24|devis automatique/i);
    expect(markup).toContain("Aucun délai de réponse automatique n’est promis");
  });

  it("lie le consentement aux finalités et à la politique de confidentialité", () => {
    expect(markup).toContain("examiner et traiter ma demande");
    expect(markup).toContain('href="/confidentialite"');
    expect(markup).not.toMatch(/marketing|infolettre|profilage|analytics|partage commercial/i);
  });
});
