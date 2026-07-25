# Rapport — INFOTECHS-DESIGN-IMPLEMENTATION-002B-R1

Date : 2026-07-24. Périmètre respecté : page d’accueil uniquement; aucune nouvelle page, dépendance ou intégration d’asset Stitch.

## 1. Fichiers modifiés

- `src/app/page.tsx`
- `src/components/home-interactions.tsx`
- `src/components/__tests__/home-interactions.test.tsx`
- `src/app/__tests__/home-page.test.tsx`
- `docs/design/screens/implementation-002b/`
- ce rapport

## 2. Écarts avec Stitch

Le visuel hero est un système de nœuds CSS et icônes SVG natif, pas l’illustration Stitch non licenciée. Le contenu reprend la direction graphite/cuivre mais pas les coordonnées, statistiques, certifications, marques ou assets de la maquette. Les onglets accessibles et le processus en cinq étapes suivent `animation-spec.md` plutôt qu’une interaction Stitch non prouvée.

## 3. Correctifs R1

- Tous les containers utilisent `max-w-(--container-max)`.
- Hero aligné sur le header réel : `calc(100svh - 64px)`.
- Progression séparée : ligne verticale mobile avec `scaleY`, ligne horizontale desktop avec `scaleX`.
- Tous les pictogrammes décoratifs concernés possèdent `aria-hidden="true"`.
- Les trois panneaux ARIA restent dans le DOM; les inactifs portent `hidden` et `aria-hidden=true`.
- Des ancres de section ont été ajoutées pour la revue visuelle (`hero`, `services-accueil`, `processus`, `concepts`, `cta-final`).

## 4. Technologies

Conservées : Next.js, React, TypeScript, PostgreSQL et Docker. AWS et GraphQL ont été retirés faute de preuve commerciale ou projet explicite dans le dépôt.

## 5. Tests ajoutés

Deux fichiers et 21 tests couvrent : trois onglets/panneaux, état initial, sélection directe, flèches, bouclage dans les deux directions, branchement explicite du gestionnaire `onKeyDown`, Home, End, état visible, associations d’identifiants, panneaux inactifs, branches reduced motion, axes de progression, badges, liens concepts, CTA, absence d’image Stitch, absence de revendications non vérifiées, token container et hauteur du hero.

## 6. Total final

8 fichiers de tests, **50/50 tests réussis**.

## 7. Captures

Les 15 captures demandées sont présentes dans `docs/design/screens/implementation-002b/` : quatre pages complètes, deux hero, trois états services, deux processus, deux concepts et deux CTA. Les pages complètes sont assemblées à partir de segments réellement défilés afin de déclencher les reveals sans répéter le header sticky.

## 8. Test clavier

| Contrôle | Résultat |
|---|---|
| Tab vers le tablist | PASS |
| Flèche droite | PASS — focus/sélection vers `automation` |
| Flèche gauche | PASS — retour vers `web` |
| Home | PASS — `web` |
| End | PASS — `custom` |
| Focus visible | PASS — outline solide |
| Activation du lien du panneau | PASS — `/services/creation-sites-web` atteint avec Enter |
| Sortie du tablist avec Tab | PASS — focus sur « Explorer ce service » |

Validation effectuée dans Chrome réel sur `http://127.0.0.1:3000/#services-accueil`.

Revalidation R2 du cycle complet :

| Transition | Focus | `aria-selected` | Panneau visible | Autres panneaux |
|---|---|---|---|---|
| Web → ArrowLeft → Sur mesure | PASS | `custom` | `service-panel-custom` | masqués |
| Sur mesure → ArrowRight → Web | PASS | `web` | `service-panel-web` | masqués |
| Web → End → Sur mesure | PASS | `custom` | `service-panel-custom` | masqués |
| Sur mesure → Home → Web | PASS | `web` | `service-panel-web` | masqués |

Le défaut de bornage numérique de R1 est corrigé : le gestionnaire transmet désormais explicitement `next`, `previous`, `home` et `end` à `nextServiceIndex`.

## 9. Reduced motion

Le chemin de code est protégé et testé : `Reveal` rend un conteneur statique, les panneaux utilisent une durée 0, les lignes sont pleines (`scale=1`), les cartes suppriment leur translation via `motion-reduce:hover:translate-y-0`, et la règle CSS globale neutralise animations/transitions. Aucun contenu n’est conditionnel à la fin d’une animation. L’API de contrôle de page Chrome n’expose pas l’émulation de `prefers-reduced-motion`. Une tentative d’ouverture du panneau Rendering via Chromium DevTools a été interrompue par une interaction utilisateur détectée dans la fenêtre; l’automatisation a été arrêtée immédiatement. L’activation réelle et les trois captures `reduced-motion-*` restent donc à effectuer avant clôture PM.

## 10. Responsive

| Largeur | client / scroll | Hero H | Titre L×H | CTA principal | Onglets | Panneau actif | Processus |
|---:|---:|---:|---:|---:|---:|---:|---|
| 390 | 375 / 375 | 1193 | 343×235 | 343×44 | 343×58 | 293×539 | vertical |
| 768 | 753 / 753 | 1242 | 705×235 | 189×46 | 705×58 | 639×348 | horizontal |
| 1280 | 1265 / 1265 | 837 | 630×353 | 189×46 | 424×58 | 687×348 | horizontal |
| 1440 | 1425 / 1425 | 837 | 638×353 | 189×46 | 429×58 | 697×348 | horizontal |

Trois badges visibles à chaque largeur. Aucun scroll horizontal. Grilles concepts : une colonne mobile, trois colonnes à partir de `md`. CTA cuivre lisible; cibles principales supérieures ou égales à 44 px.

## 11. Lint

PASS, exit 0.

## 12. Build

PASS sous Linux natif, Next.js 16.2.9, 30 pages statiques, exit 0.

## 13. HTTP

`/`, `/services`, `/realisations` et `/contact` : HTTP 200.

## 14. État Git

HEAD `24c847d4462bb611a8379502314cbbea2be488a2`, inchangé; aucun commit. Les fichiers suivis déjà modifiés restent `README.md`, `package-lock.json`, `package.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`. Les nouveaux tests, composants, rapports et captures sont non suivis dans l’état Git existant.

## 15. Problèmes restants

- Activation réelle de `prefers-reduced-motion: reduce` et trois captures associées à confirmer manuellement dans DevTools; tentative automatisée interrompue par une interaction utilisateur.
- 5 vulnérabilités élevées déjà documentées : production toujours NO GO.
- Lighthouse, axe, juridique et déploiement production restent hors périmètre.

## 16. Recommandation

**NO GO provisoire pour 002C** jusqu’à la preuve manuelle reduced motion demandée par le PM. Tous les autres critères 002B-R1 sont verts. Production : NO GO indépendamment de 002C.
