import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const { default: NotFound, metadata } = await import("@/app/not-found");

const sourcePaths = [
  "src/app/page.tsx",
  "src/app/services/page.tsx",
  "src/components/project-experience.tsx",
  "src/components/service-experience.tsx",
  "src/components/site-footer.tsx",
  "src/components/site-header.tsx",
];

describe("complétude structurelle du MVP 003A", () => {
  it("retire les pages Ressources et Fondations du routage App Router", () => {
    expect(existsSync(resolve(process.cwd(), "src/app/ressources/page.tsx"))).toBe(false);
    expect(existsSync(resolve(process.cwd(), "src/app/fondations/page.tsx"))).toBe(false);
  });

  it("rend une 404 de marque avec un H1 et les trois destinations attendues", () => {
    const markup = renderToStaticMarkup(<NotFound />);
    expect(markup.match(/<h1/g)).toHaveLength(1);
    expect(markup).toContain("Erreur 404");
    for (const href of ["/", "/services", "/realisations"]) expect(markup).toContain(`href="${href}"`);
    expect(markup).not.toMatch(/Courriel à confirmer|Téléphone à venir|Demander un devis|Planifier un appel/);
  });

  it("applique des métadonnées non indexables à la 404", () => {
    expect(metadata.title).toEqual({ absolute: "Page introuvable | Infotechs Solutions" });
    expect(metadata.alternates).toEqual({ canonical: null });
    expect(metadata.openGraph).toMatchObject({ title: "Page introuvable | Infotechs Solutions" });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("retire les libellés CTA qui promettent une fonction indisponible", () => {
    const combinedSource = sourcePaths
      .map((path) => readFileSync(resolve(process.cwd(), path), "utf8"))
      .join("\n");
    expect(combinedSource).not.toMatch(/Planifier un appel|Demander un devis|Planifier un échange|Démarrer un projet|recevez une première orientation|Discuter de votre projet|Parler de votre projet/);
  });

  it("conserve Contact comme interface explicite de préparation", () => {
    const contactSource = readFileSync(resolve(process.cwd(), "src/app/contact/page.tsx"), "utf8");
    const formSource = readFileSync(resolve(process.cwd(), "src/components/contact-form.tsx"), "utf8");
    expect(contactSource).toContain("Transmettre votre demande");
    expect(contactSource).toContain("Le formulaire transmet ces informations à Infotechs Solutions");
    expect(formSource).toContain("Transmettre la demande");
  });
});
