import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Infotechs Solutions.",
};

export default function ContactPage() {
  return (
    <Section tone="light" className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Contact
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Le formulaire de contact n&rsquo;est pas encore en ligne. Cette page
        accueillera prochainement un moyen simple de nous joindre.
      </p>
    </Section>
  );
}
