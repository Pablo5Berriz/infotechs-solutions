// Lot INFOTECHS-THEME-001 : resolution du theme (light/dark) cote serveur.
//
// Persistance : cookie first-party "theme" (meme famille que NEXT_LOCALE,
// cf. src/components/language-switcher.tsx). Aucune donnee sensible : ce
// cookie ne contient qu'une preference d'apparence ("light" | "dark").
//
// Regle produit (section 3) : premiere visite sans preference enregistree
// -> LIGHT par defaut. Un choix explicite (une fois persiste) devient
// prioritaire et n'est jamais ecrase par prefers-color-scheme.
//
// Ce fichier ne doit PAS importer next/headers : il est importe par
// src/proxy.ts (middleware edge), qui ne supporte pas next/headers.
// La lecture SSR via next/headers vit dans src/lib/theme-server.ts.

export const THEME_COOKIE = 'theme';
export type Theme = 'light' | 'dark';
export const DEFAULT_THEME: Theme = 'light';

export function isTheme(value: string | undefined): value is Theme {
  return value === 'light' || value === 'dark';
}
