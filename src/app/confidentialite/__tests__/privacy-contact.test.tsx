import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PrivacyPage from "@/app/confidentialite/page";

const markup = renderToStaticMarkup(<PrivacyPage />);
const deliverySource = readFileSync(resolve(process.cwd(), "src/lib/contact-delivery.ts"), "utf8");

describe("confidentialité technique du canal Contact", () => {
  it("décrit les champs, la finalité, Resend et l’absence de stockage applicatif", () => {
    for (const text of ["organisation facultative", "téléphone facultatif", "Resend", "ne sont pas revendues", "n’enregistre pas les demandes dans une base de données"]) {
      expect(markup).toContain(text);
    }
  });

  it("ne publie aucune fonction future comme active", () => {
    expect(markup).not.toMatch(/téléversement|Supabase|CRM non utilisé|Google Analytics|Plausible/i);
  });

  it("n’intègre ni stockage, ni CRM, ni analytics dans la livraison", () => {
    expect(deliverySource).not.toMatch(/supabase|prisma|mongoose|analytics|crm/i);
    expect(deliverySource).toContain("https://api.resend.com/emails");
  });
});
