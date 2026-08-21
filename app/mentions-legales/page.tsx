import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales d'Infotechs Solutions.",
};

export default function MentionsLegalesPage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Mentions légales
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Cette page présentera l&rsquo;identification légale de
        l&rsquo;entreprise. Contenu en attente des informations légales
        officielles.
      </p>
    </Section>
  );
}
