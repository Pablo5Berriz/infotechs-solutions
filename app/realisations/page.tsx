import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Réalisations et projets démonstrateurs d'Infotechs Solutions.",
};

export default function RealisationsPage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Réalisations
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Nos réalisations seront présentées ici prochainement. Aucun projet
        n&rsquo;est encore publié sur cette page.
      </p>
    </Section>
  );
}
