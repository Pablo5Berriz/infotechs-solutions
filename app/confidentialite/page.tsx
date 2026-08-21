import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité d'Infotechs Solutions.",
};

export default function ConfidentialitePage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Politique de confidentialité
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Cette page décrira les données collectées, leur finalité et les
        droits des personnes concernées. Contenu à valider juridiquement
        avant publication.
      </p>
    </Section>
  );
}
