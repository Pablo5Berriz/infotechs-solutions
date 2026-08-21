# Infotechs UI Foundation

Statut : fondation V0 — shell global, tokens visuels et primitives UI.
Aucune page finale n'est construite ici (voir `docs/product-v0.md` et
`docs/content-requirements-v0.md` pour le contenu réel à venir).

## Design direction

Direction retenue : **professionnel, technologique, sobre, premium,
accessible, moderne, PME.**

Explicitement évité : esthétique startup crypto, cyberpunk, gaming,
template SaaS générique, glassmorphism, néon.

## Visual benchmark

The Witify website was used as a visual benchmark supplied by the
project owner. Infotechs Solutions must not reproduce Witify's
proprietary identity, content, illustrations, testimonials, client
logos or exact layouts.

Les captures fournies ont été étudiées uniquement comme source de
**principes visuels** (hiérarchie typographique forte, alternance
clair/sombre, grands rayons de bordure, whitespace généreux, gros CTA,
verticalité mobile) — jamais comme gabarit à reproduire.

## Non-copy rules

Interdits dans cette fondation, et vérifiés absents du code livré :
logo Witify, palette de couleurs identique, hero identique,
illustrations/photos Witify, témoignages, logos clients, structure de
page identique, footer identique, chat flottant, animations
propriétaires. Aucun asset externe n'a été téléchargé
(`git diff --stat` de ce lot ne contient que du code source et un
fichier CSS/markdown — voir section Git du rapport).

## Color system

Tokens définis dans `app/globals.css`, exposés à Tailwind via
`@theme inline` (utilisables comme `bg-primary`, `text-accent`,
`border-border`, etc.) :

| Token | Valeur (scope racine / clair) | Valeur (scope `.tone-dark`) |
|---|---|---|
| `--background` | `#ffffff` | `var(--surface-dark)` = `#0b1220` |
| `--foreground` | `#101828` | `#f8fafc` |
| `--surface` | `#f8fafc` | `rgba(255,255,255,0.06)` |
| `--surface-muted` | `#eef2f6` | (inchangé) |
| `--surface-dark` | `#0b1220` | (inchangé) |
| `--border` | `#e4e7ec` | `rgba(255,255,255,0.12)` |
| `--muted-foreground` | `#475467` | `#94a3b8` |
| `--primary` | `#0f766e` | (inchangé) |
| `--primary-hover` | `#115e59` | (inchangé) |
| `--primary-foreground` | `#ffffff` | (inchangé) |
| `--accent` | `#0f766e` | `#5eead4` |
| `--focus` | `#b45309` | (inchangé) |

Une seule famille d'accent (teinte sarcelle/teal), pas d'accents
concurrents. `--accent` est délibérément réévalué en teinte plus claire
dans les sections sombres pour rester lisible sur fond `surface-dark`
(voir vérification de contraste ci-dessous).

### Mécanisme d'alternance clair/sombre

Une classe `.tone-dark` (et `.tone-muted` pour un fond légèrement
teinté sans inverser le texte) redéfinit localement les variables CSS
citées ci-dessus. Les utilitaires Tailwind (`bg-background`,
`text-foreground`, `text-muted-foreground`, `text-accent`) résolvent
ces variables au moment de l'affichage : appliquer `.tone-dark` sur un
conteneur (le composant `Section`) suffit à obtenir une section sombre
cohérente sans dupliquer de logique de composant. Aucune nouvelle
dépendance, mécanisme CSS natif.

### Vérification de contraste (WCAG AA — calculée, pas estimée)

Calculs effectués avec la formule de luminance relative WCAG 2.x
(script Node exécuté localement, non committé). Résultats :

| Paire | Ratio | Seuil requis | Résultat |
|---|---|---|---|
| `foreground` sur `background` (texte courant) | 17.75:1 | 4.5:1 | PASS |
| `muted-foreground` sur `background` | 7.69:1 | 4.5:1 | PASS |
| `primary-foreground` sur `primary` (bouton) | 5.47:1 | 4.5:1 | PASS |
| `primary` sur `background` (lien, texte normal) | 5.47:1 | 4.5:1 | PASS |
| `primary-hover` sur `background` (texte large) | 7.58:1 | 3:1 | PASS |
| `accent` (dark) sur `surface-dark` (titre large) | 12.66:1 | 3:1 | PASS |
| `foreground` (dark) sur `surface-dark` (texte courant) | 17.89:1 | 4.5:1 | PASS |
| `muted-foreground` (dark) sur `surface-dark` | 7.30:1 | 4.5:1 | PASS |
| `focus` sur `background` (composant UI) | 5.02:1 | 3:1 | PASS |
| `focus` sur `surface-dark` (composant UI) | 3.73:1 | 3:1 | PASS |
| `foreground`/`muted-foreground` sur `surface`/`surface-muted` (cartes) | 15.78–16.96:1 / 6.83–7.35:1 | 4.5:1 | PASS |
| `accent` sur `surface` (carte claire, texte large) | 5.23:1 | 3:1 | PASS |

Toutes les combinaisons effectivement utilisées dans le shell et la
démo d'accueil dépassent le seuil WCAG AA applicable. La couleur de
focus (`#b45309`, ambre foncé) a été choisie spécifiquement parce
qu'elle reste visible à la fois sur fond clair et sur fond sombre — un
premier candidat plus clair (`#f59e0b`) a été testé et rejeté car il
échouait sur fond blanc (2.15:1, en dessous de 3:1).

## Typography

Aucune police externe. Pile système :
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
Arial, sans-serif` (définie dans `app/globals.css`, aucune requête
réseau, aucune dépendance Google Fonts).

Échelle utilisée (classes Tailwind, pas de tokens CSS additionnels) :

| Usage | Classe |
|---|---|
| Hero / Display | `text-4xl sm:text-6xl font-semibold tracking-tight` |
| H1 (pages internes) | `text-4xl sm:text-5xl font-semibold tracking-tight` |
| H2 | `text-2xl sm:text-3xl font-semibold tracking-tight` |
| H3 | `text-lg font-semibold` |
| Body large | `text-lg` |
| Body | `text-base` (par défaut) |
| Small | `text-sm` |
| Navigation | `text-sm font-medium` |

Un seul `<h1>` par page, hiérarchie H1 → H2 → H3 respectée dans toutes
les routes livrées.

## Spacing

Pas de tokens CSS d'espacement dédiés — utilisation directe de
l'échelle Tailwind pour rester simple :

| Usage | Classe |
|---|---|
| Rythme vertical de section | `py-16 sm:py-24` (dans `Section`) |
| Écart hero supplémentaire | `pt-20 sm:pt-28` (accueil), `pt-16 sm:pt-24` (pages internes) |
| Marges internes de carte | `p-8` |
| Container | `px-6 sm:px-8`, largeur max `max-w-6xl` |

## Container

`components/Container.tsx` : `mx-auto w-full max-w-6xl px-6 sm:px-8`.
Utilisé par `Section`, `SiteHeader` et `SiteFooter` — aucune valeur de
largeur ou de padding répétée manuellement page par page.

## Radius

Pas de token dédié — utilitaires Tailwind directs : `rounded-full`
(boutons, pilule), `rounded-3xl` (cartes piliers), `rounded-[2.5rem]`
/`rounded-[3.5rem]` (transition haute de la section sombre — grand
rayon inspiré du principe 8.4, appliqué avec parcimonie : seule la
section CTA sombre en bénéficie sur la page d'accueil, pas chaque
élément).

## Buttons

`components/Button.tsx` — deux variantes : `primary` (fond `--primary`,
texte `--primary-foreground`, hover `--primary-hover`) et `secondary`
(contour `--border`, transparent, hover `--surface-muted`). Forme
pilule (`rounded-full`), padding généreux (`px-6 py-3`), anneau de
focus visible via `--focus`.

## Light sections

`Section tone="light"` : fond `--background` blanc, texte
`--foreground`. Utilisé pour le hero et les pages internes.

## Dark sections

`Section tone="dark"` : applique `.tone-dark`, fond
`--surface-dark`, texte clair. Utilisé pour la section CTA finale de
l'accueil et le footer.

## Cards

Utilisées uniquement pour une vraie unité d'information répétée (les
trois piliers sur l'accueil). Pas de généralisation systématique —
aucune autre section du shell n'utilise de carte sans contenu
justifiant cette unité.

## Header

`components/SiteHeader.tsx` — sticky, fond `--background`, bordure
basse `--border`. Desktop (`md:` et plus) : marque + navigation +
CTA primaire. Mobile : marque + bouton menu uniquement (le CTA
primaire redevient disponible dans le panneau mobile).

## Navigation

`components/SiteNavigation.tsx` (Server Component) : `<nav
aria-label="Navigation principale">`, liste des 5 routes validées
(`lib/navigation.ts`, source unique partagée avec le footer et le menu
mobile pour éviter toute divergence de lien).

## Mobile navigation

`components/MobileNavigation.tsx` (`"use client"`, seul composant
interactif du shell) :
- bouton déclencheur 44×44px minimum (vérifié à l'exécution, voir
  rapport) ;
- `aria-expanded`, `aria-controls` sur le bouton ;
- panneau `role="dialog"` `aria-modal="true"` `aria-label` explicite ;
- focus déplacé sur le premier lien à l'ouverture, restitué au
  déclencheur à la fermeture (vérifié à l'exécution) ;
- piège de focus (Tab/Shift+Tab) limité aux éléments du panneau,
  implémenté sans dépendance externe ;
- fermeture sur Échap et sur clic d'un lien ;
- défilement du corps de page bloqué pendant l'ouverture (`overflow:
  hidden` restauré à la fermeture) ;
- aucune bibliothèque externe.

## Footer

`components/SiteFooter.tsx` — fond sombre (`.tone-dark`), identité,
trois colonnes compactes (Navigation, Légal, Contact — un seul lien
« Nous contacter » vers `/contact`, aucune coordonnée non validée
affichée conformément à DEC-V0-004/DEC-V0-005 de `docs/product-v0.md`),
mention de copyright avec année dynamique.

## CTA patterns

CTA primaire : « Parler de votre projet » (bouton `primary`, utilisé
dans le header desktop, le panneau mobile, le hero et la section CTA
finale). CTA secondaire : « Nous contacter » (footer), « Voir nos
services » utilisé une fois sur l'accueil comme CTA secondaire
contextuel. Aucun CTA supplémentaire introduit.

## Accessibility

- Lien d'évitement (« Aller au contenu principal ») en tout premier
  élément du `<body>`, visible au focus (`app/layout.tsx`).
- Landmarks : `<header>`, `<nav aria-label>` (x3 : principale, pied de
  page, mobile), `<main id="main-content">`, `<footer>`.
- Un seul `<h1>` par page.
- Anneau de focus visible (`--focus`) sur tous les éléments
  interactifs (liens de navigation, boutons, CTA).
- Zones tactiles ≥ 44×44px pour le bouton de menu mobile (vérifié).
- `prefers-reduced-motion: reduce` neutralise transitions/animations
  globalement (`app/globals.css`).
- Aucune information portée uniquement par la couleur ou par une image.

## Responsive

Philosophie : une colonne sur mobile, titres qui se recomposent
naturellement (pas de `white-space: nowrap` forcé), CTA pleine largeur
sur mobile via `flex-col sm:flex-row`, cartes empilées puis en grille
à partir de `sm:`. Vérifié sans dépassement horizontal aux largeurs
320–1920px sur les 7 routes livrées (voir rapport, section
RESPONSIVE).

## Client component policy

Un seul composant client dans tout le shell : `MobileNavigation`
(interactivité réelle : ouverture/fermeture, gestion clavier). Tous
les autres composants (`Container`, `Button`, `Section`,
`SiteHeader`, `SiteNavigation`, `SiteFooter`, et toutes les pages)
restent des Server Components.

## Future bilingual migration

L'architecture recommandée (`docs/product-v0.md` §22) est `/fr/...` /
`/en/...`. Cette fondation n'introduit aucune structure qui
l'empêcherait : les routes actuelles sont des segments plats
(`app/services/page.tsx`, etc.) qui pourront être déplacés sous un
groupe de segments `app/[lang]/...` sans changement de composant —
`lib/navigation.ts` centralise déjà les libellés/chemins, ce qui
limitera la surface à modifier lors de la migration. Aucune
bibliothèque i18n n'est installée dans ce lot.

## Known limitations

- Contenu de chaque route intentionnellement minimal et neutre — le
  contenu réel dépend de `docs/content-requirements-v0.md` et des
  décisions ouvertes (`docs/product-v0.md`, notamment DEC-V0-002 pour
  Réalisations).
- Aucun logo de marque : le nom « Infotechs Solutions » est affiché en
  typographie, pas de symbole graphique.
- Aucune icône hors les deux SVG inline du menu mobile (hamburger/
  fermeture).
- Le CTA « Voir nos services » n'a pas de contrepartie identique sur
  chaque page — à réévaluer lors de la construction des pages finales.
- La vérification responsive visuelle a été réalisée avec Chromium
  (Playwright, outil pré-installé de l'environnement, non ajouté comme
  dépendance du projet) contre `next dev` : le badge rond visible en
  bas à gauche des captures est l'indicateur Next.js Dev Tools,
  spécifique au mode développement — il n'apparaît pas dans l'export
  statique de production.
