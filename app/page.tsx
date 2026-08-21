import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

const PILLARS = [
  {
    title: "Présence numérique",
    description:
      "Site vitrine professionnel, référencement local et présentation crédible de votre entreprise.",
  },
  {
    title: "Outils métier",
    description:
      "Formulaires, automatisations et outils sur mesure adaptés à vos processus.",
  },
  {
    title: "Exploitation numérique",
    description:
      "Hébergement, maintenance et suivi technique pour garder vos outils fiables dans la durée.",
  },
];

export default function Home() {
  return (
    <>
      <Section tone="light" className="pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Des solutions numériques pensées pour{" "}
            <span className="text-accent">votre PME</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Infotechs Solutions aide les PME à améliorer leur présence
            numérique, leurs outils métier et l&rsquo;exploitation de leurs
            systèmes — avec une approche pragmatique et vérifiable.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Parler de votre projet
            </Button>
            <Button href="/services" variant="secondary">
              Voir nos services
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Trois piliers, une seule équipe
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-border bg-surface p-8"
            >
              <h3 className="text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="dark"
        className="rounded-t-[2.5rem] text-center sm:rounded-t-[3.5rem]"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Discutons de <span className="text-accent">votre projet</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Décrivez votre besoin, nous revenons vers vous rapidement.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="primary">
            Parler de votre projet
          </Button>
        </div>
      </Section>
    </>
  );
}
