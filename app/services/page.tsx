import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Services",
  description: "Les services d'Infotechs Solutions pour les PME.",
};

export default function ServicesPage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Services
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Cette page présentera les trois piliers de l&rsquo;offre Infotechs
        Solutions : présence numérique, outils métier et exploitation
        numérique. Contenu en cours de rédaction.
      </p>
    </Section>
  );
}
