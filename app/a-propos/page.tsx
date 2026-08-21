import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "À propos",
  description: "À propos d'Infotechs Solutions.",
};

export default function AProposPage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        À propos
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Cette page présentera qui fournit le service, pour qui, et comment.
        Contenu en cours de rédaction.
      </p>
    </Section>
  );
}
