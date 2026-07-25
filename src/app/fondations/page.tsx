import type { Metadata } from "next";
import { BadgeConcept } from "@/components/badge-concept";

// Page interne de démonstration des fondations (INFOTECHS-DESIGN-IMPLEMENTATION-002A,
// périmètre section 1, item 10). Sert à vérifier visuellement les tokens et composants
// de base, et à produire les captures responsive 390/768/1280/1440 demandées section 10.
// Non indexée : ce n'est pas une page de contenu du site.

export const metadata: Metadata = {
  title: "Fondations (interne)",
  robots: { index: false, follow: false },
};

const colorSwatches = [
  { name: "bg.950", value: "#121316", className: "bg-bg-950 border border-bg-800" },
  { name: "bg.900", value: "#1C1E22", className: "bg-bg-900" },
  { name: "bg.800", value: "#2A2D33", className: "bg-bg-800" },
  { name: "text.100", value: "#F4F1EA", className: "bg-text-100" },
  { name: "text.400", value: "#9B9690", className: "bg-text-400" },
  { name: "copper.500", value: "#E2793D", className: "bg-copper-500" },
  { name: "petrol.500", value: "#2D6E7E", className: "bg-petrol-500" },
  { name: "error", value: "#FF6B5C", className: "bg-error" },
];

const typeScale = [
  { label: "Display XL", className: "font-display text-5xl font-bold" },
  { label: "H1", className: "font-display text-4xl font-bold" },
  { label: "H2", className: "font-display text-3xl font-semibold" },
  { label: "H3", className: "font-display text-2xl font-semibold" },
  { label: "Corps (Public Sans)", className: "font-sans text-base" },
  { label: "Corps petit", className: "font-sans text-sm text-text-400" },
  { label: "Label technique (JetBrains Mono)", className: "font-mono text-sm" },
];

export default function FondationsPage() {
  return (
    <div className="mx-auto max-w-(--container-max) px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-400">Page interne — non indexée</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-text-100">Fondations du design</h1>
      <p className="mt-4 max-w-2xl text-text-400">
        Démonstration des tokens et composants de base implémentés dans le lot 002A : couleurs, typographies, boutons, badge de
        concept démonstratif. Sert de référence visuelle et de support pour les captures responsive.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-text-100">Couleurs</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="overflow-hidden rounded-md border border-bg-800">
              <div className={`h-20 ${swatch.className}`} />
              <div className="bg-bg-900 p-3">
                <p className="font-mono text-xs text-text-100">{swatch.name}</p>
                <p className="font-mono text-xs text-text-400">{swatch.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-text-100">Typographie</h2>
        <div className="mt-6 grid gap-4">
          {typeScale.map((item) => (
            <div key={item.label} className="border-b border-bg-800 pb-4">
              <p className="font-mono text-xs text-text-400">{item.label}</p>
              <p className={`${item.className} text-text-100`}>Infotechs Solutions — PME du Québec</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-text-100">Boutons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex h-(--button-md-height) items-center rounded-sm bg-copper-500 px-5 text-sm font-semibold text-[#14151a] transition-shadow duration-150 ease-out hover:shadow-[0_0_24px_rgba(226,121,61,0.25)]"
          >
            Bouton primaire
          </button>
          <button
            type="button"
            className="inline-flex h-(--button-md-height) items-center rounded-sm border border-bg-800 px-5 text-sm font-semibold text-text-100 transition-colors duration-150 ease-out hover:border-copper-500 hover:text-copper-500"
          >
            Bouton secondaire
          </button>
          <button type="button" className="inline-flex h-(--button-md-height) items-center px-2 text-sm font-semibold text-text-400 hover:text-text-100">
            Lien texte
          </button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-text-100">Badge concept démonstratif</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-md border border-bg-800 bg-bg-900 p-6">
          <BadgeConcept />
          <p className="text-sm text-text-400">Toujours visible, jamais animé, jamais masqué au survol.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-text-100">Champ de formulaire</h2>
        <div className="mt-6 max-w-sm">
          <label htmlFor="demo-field" className="font-mono text-xs uppercase tracking-[0.08em] text-text-400">
            Exemple de champ
          </label>
          <input
            id="demo-field"
            type="text"
            placeholder="Texte de démonstration"
            className="mt-2 h-(--field-height) w-full rounded-[6px] border border-bg-800 bg-bg-900 px-4 text-sm text-text-100 outline-none placeholder:text-text-400 focus-visible:border-copper-500"
          />
        </div>
      </section>
    </div>
  );
}
