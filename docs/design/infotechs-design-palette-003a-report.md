# INFOTECHS-DESIGN-PALETTE-003A — Migration Graphite & Electric Violet

Date : 21 septembre 2026
Lot visuel. 002B→002F gelés — aucun texte, offre, route, portfolio, formulaire, API, SEO éditorial ou page légale modifié dans son contenu.

## 1. Baseline Git

```text
HEAD avant lot   : 885412defb117d5dde61d5867ef40f1fc6328ab1 (inchangé après lot — aucun commit)
Node.js          : v22.23.2
npm              : 10.9.8
```

Working tree initial (avant ce lot, hérité des lots précédents, non nettoyé) :

```text
 M AGENTS.md
 D docs/design/design-tokens.md
```

## 2. Baseline tests/build (avant migration)

Réutilise le résultat de TECH-BASELINE-001, ré-exécuté dans une copie propre (fs natif du VM, hors montage réseau — même méthode que TECH-BASELINE-001) pour confirmer qu'il tient toujours avant de commencer :

```text
npm ci      → OK
npm run lint → OK, 0 erreur
vitest run   → 189/189 PASS
next build   → 23/23 pages, 0 erreur
```

Conforme à l'attendu (189/189, build PASS). Aucune divergence à documenter avant de commencer.

## 3. Inventaire chromatique initial

`src/app/globals.css` est la source de vérité unique. Avant migration, un seul token de marque existait, réutilisé partout via les classes Tailwind `copper-500` (pas d'échelle — une seule nuance) :

```css
--color-copper-500: #e2793d;
--color-copper-500-on-fill: #14151a;
--color-petrol-500: #2d6e7e;   /* défini, jamais utilisé dans src/ */
--color-error: #ff6b5c;
--shadow-glow-copper: 0 0 24px rgba(226, 121, 61, 0.25);
--border-accent: 1px solid var(--color-copper-500);
```

Usages recensés (avant migration) : **136 occurrences** de `copper` dans `src/`, réparties sur 16 fichiers (14 fichiers applicatifs + `globals.css`), via les préfixes Tailwind `text-`, `bg-`, `border-`, `outline-`, `ring-`, `accent-`, `via-`, plus 6 occurrences de la valeur brute `rgba(226,121,61,…)` (motifs de grille en arrière-plan de section hero) et une chaîne hex en dur `#f08a4d` (hover d'un lien service, orpheline, non reliée au token).

`petrol-500` : défini mais **0 usage** dans `src/` — legacy dead code, hors périmètre 003A.
`bg-*`, `text-100/400` (graphite/neutres) : inchangés, hors périmètre.
`--color-error` : inchangé, hors périmètre (voir §15 de la directive).

## 4. Ancienne palette

| Rôle | Valeur |
|---|---|
| Marque (nuance unique) | `#e2793d` (copper-500) |
| Texte sur remplissage marque | `#14151a` |
| Glow bouton | `rgba(226,121,61,0.25)` |
| Petrol (défini, non utilisé) | `#2d6e7e` |

## 5. Nouvelle palette

Aucune image de référence n'a été jointe à ce tour de conversation — seules les valeurs approximatives fournies dans la directive (§3) ont servi de point de départ. Je ne peux pas confirmer que ces hex reproduisent fidèlement une image que je n'ai pas vue ; je l'indique explicitement plutôt que de prétendre une vérification que je n'ai pas faite. Si une image existe réellement, il faudra comparer visuellement les captures (§14, non produites — voir limites) avec elle avant validation finale.

À partir des ancres fournies, j'ai reconstruit une échelle à luminosité strictement monotone (les anchors bruts fournis n'étaient pas monotones entre 800 et 900) et vérifié chaque palier par calcul de contraste WCAG réel (voir §12), pas par inspection visuelle :

| Palier | Hex final | Contraste vs bg-950 (#121316) |
|---|---|---|
| purple-50 | `#F4F2FF` | 16.8:1 |
| purple-100 | `#E9E4FF` | 15.04:1 |
| purple-200 | `#D3C7FF` | 11.84:1 |
| purple-300 | `#B6A3FF` | 8.56:1 |
| purple-400 | `#9575FF` | 5.54:1 |
| purple-500 | `#7B4DFF` | 3.85:1 |
| purple-600 | `#6528FF` | 2.92:1 |
| purple-700 | `#5211E6` | 2.28:1 |
| purple-800 | `#430DB8` | 1.76:1 |
| purple-900 | `#350B8C` | 1.4:1 |
| purple-950 | `#1F0757` | 1.08:1 |

Ces contrastes vs bg-950 disent seulement à quel point chaque nuance se détache du fond — pas si elle est utilisable comme texte (voir §12 pour les paires texte réellement vérifiées, qui sont ce qui a dicté le mapping ci-dessous).

## 6. Tokens sémantiques ajoutés

```css
--color-brand-primary: var(--color-purple-600);
--color-brand-primary-hover: var(--color-purple-700);
--color-brand-accent: var(--color-purple-300);
--color-brand-soft: var(--color-purple-100);
--color-brand-deep: var(--color-purple-950);
--color-focus: var(--color-purple-400);
```

Ces alias existent dans `:root` mais **ne sont pas utilisés directement dans les composants** — comme l'ancien système, les composants consomment les classes Tailwind générées par `@theme inline` (`purple-500`, `purple-300`, etc.) directement, pour rester cohérent avec l'architecture existante (aucune deuxième architecture parallèle introduite, conformément à la directive §4). Les alias sémantiques restent disponibles pour un usage CSS futur hors Tailwind si besoin.

## 7. Mapping Copper → Purple (appliqué)

| Ancien usage (préfixe Tailwind) | Rôle réel observé | Nouveau |
|---|---|---|
| `text-copper-500` (eyebrows, liens, labels, icônes) | Accent lisible sur fond graphite | `text-purple-300` (8.56:1) — `hover:text-purple-200` |
| `bg-copper-500` (CTA pleins, badges, bandes) | Remplissage de marque | `bg-purple-600` |
| `border-copper-500` | Bordures actives/accent | `border-purple-500` — `hover:border-purple-400` |
| `outline-copper-500` (focus) | Focus visible | `outline-purple-400` |
| `ring-copper-500` | Focus ring (formulaire) | `ring-purple-400` |
| `accent-copper-500` (checkbox natif) | Couleur d'accent input | `accent-purple-500` |
| `via-copper-500` (gradient) | Stop de dégradé | `via-purple-600` |
| `rgba(226,121,61,x)` (motif de grille hero) | Halo/texture décorative | `rgba(101,40,255,x)` (= purple-600) |
| `--shadow-glow-copper` | Ombre lumineuse CTA | `--shadow-glow-purple`, `rgba(101,40,255,0.35)` |
| `#14151a` texte sur `bg-copper-500`/`bg-purple-600` | Texte sur bouton plein | `#f4f1ea` (ivoire) — **corrigé, voir §12** |
| `text-black/70`, `border-black/25`, `hover:!text-black` (sur cartes `bg-purple-600`) | Texte/bordure secondaires sur fond marque | `text-white/85`, `border-white/25`, `hover:!text-white` — **corrigé, voir §12** |
| `#f08a4d` (hover orphelin, `service-experience.tsx`) | Hover CTA service | `hover:bg-purple-700` |

Le badge "CONCEPT DÉMONSTRATIF" (`badge-concept.tsx`) a reçu un traitement dédié conforme à la directive §12 plutôt qu'un simple remplacement de teinte : fond plein `bg-copper-500` → fond profond `bg-purple-950` + bordure `border-purple-500` + texte `text-purple-100` (13.87:1). C'est un changement de rôle chromatique (surface profonde + accent, pas remplissage plein), pas un remplacement mécanique.

## 8. Mapping Petrol

`--color-petrol-500` (#2d6e7e) : **conservé tel quel**, non renommé, non réassigné. Aucun usage trouvé dans `src/` avant ou après ce lot — token legacy inerte. Décision : conservation en l'état plutôt que suppression, pour ne pas modifier de comportement hors périmètre visuel sans mandat explicite (§28 de la directive interdit le refactor hors-sujet).

## 9. Pages modifiées

Toutes les routes publiques présentes dans le dépôt (confirmées par l'inventaire réel de INFOTECHS-DESIGN-REVIEW-001) sont couvertes :

`/` (page.tsx), `/services` + `/services/[slug]` (via `service-experience.tsx`), `/realisations` + `/realisations/[slug]` (via `project-experience.tsx`), `/a-propos`, `/contact` (+ `contact-form.tsx`), `/mentions-legales`, `/confidentialite`, 404 (`not-found.tsx`). Aucune occurrence de `copper` ne subsiste sur aucune de ces routes (voir §13).

## 10. Composants modifiés

`globals.css` (tokens), `site-header.tsx`, `site-footer.tsx`, `badge-concept.tsx`, `contact-form.tsx`, `home-interactions.tsx` (timeline/tabs page d'accueil), `service-experience.tsx`, `project-experience.tsx`. `button-link.tsx` et `section-heading.tsx` n'ont jamais utilisé `copper` (le premier expose des défauts génériques cyan/slate systématiquement écrasés par des classes `!` à chaque appel) — non touchés, correctement hors périmètre.

## 11. Header, Hero, Footer — traitement spécifique

- **Header** : fond graphite existant conservé (`bg-bg-950/95 backdrop-blur-xl`, déjà en place), logo accent en `purple-300`→ nav active/hover, CTA `bg-purple-600`, focus `outline-purple-400`. Pas de rectangle violet clair — le fond reste graphite.
- **Hero (accueil)** : halo principal existant (`bg-purple-600/10 blur-3xl`) conservé et complété par deux halos supplémentaires (`purple-300/10` et `purple-100/5`) pour la composition à trois couches demandée (halo marque + halo secondaire + diffusion lavande, §7 de la directive). Motif de grille en arrière-plan recoloré en violet à faible opacité (0.08, inchangée).
- **Footer** : dégradé subtil ajouté, `bg-gradient-to-b from-bg-950 to-purple-950/20` (auparavant fond graphite plat), conforme à la demande de violet profond sans bloc saturé.

## 12. Contrastes WCAG mesurés (calcul réel, pas inspection visuelle)

Calculés par script (formule de luminance relative WCAG 2.1) sur les paires effectivement utilisées dans le code, avant application :

| Paire | Contraste | Verdict AA |
|---|---|---|
| purple-300 texte / bg-950 | 8.56:1 | PASS (texte normal ≥4.5) |
| purple-400 texte / bg-950 | 5.54:1 | PASS |
| purple-200 texte / bg-950 | 11.84:1 | PASS |
| purple-500 texte / bg-950 | 3.85:1 | **FAIL texte normal** (OK texte large ≥3:1 uniquement) — non utilisé comme texte de lecture |
| ivoire (#f4f1ea) sur bg purple-600 | 5.64:1 | PASS |
| **#14151a (graphite) sur bg purple-600** | **2.87:1** | **FAIL** — bug détecté et corrigé (19 occurrences, tous les CTA pleins et le badge) → remplacé par ivoire |
| white/85 sur bg purple-600 (texte secondaire des cartes CTA) | 4.98:1 | PASS |
| purple-100 texte / bg purple-950 (badge) | 13.87:1 | PASS |
| purple-400 focus outline / bg-950 (UI, seuil 3:1) | 5.54:1 | PASS |

**Le point important ici n'est pas le tableau — c'est ce qu'il a trouvé.** Le remplacement initial "1 pour 1" de `copper-500` par `purple-600` aurait laissé en place le texte `#14151a` (graphite) que l'ancien design utilisait sur les boutons pleins. Sur `#e2793d` (copper, orange clair) ce texte sombre passait sans doute AA. Sur `#6528ff` (purple-600, plus sombre et plus saturé), ce même texte tombe à 2.87:1 — un échec net. C'est exactement le risque qu'un remplacement mécanique de teinte, sans nouvelle mesure de contraste, aurait laissé filer silencieusement sur 19 emplacements (tous les CTA pleins du site + le badge "concept démonstratif"). Corrigé partout avant livraison (§7, §11).

Non mesuré : les combinaisons impliquant `bg-800`/`bg-900` comme fond intermédiaire (cartes de service, portfolio), ni les couleurs sémantiques `error`/`success` (non touchées, hors périmètre §15 de la directive). À vérifier si un examen exhaustif est requis.

## 13. Résidus Copper

```text
grep -rni "copper" src/   → 0 résultat (exit 1, "no matches")
```

Classification : **EXPECTED — 0 résidu**. `petrol-500` reste défini et inutilisé (voir §8) — classé `LEGACY_DEAD_CODE`, décision : conservation, hors périmètre.

## 14. Responsive

**Non vérifié visuellement.** La migration n'a modifié aucune classe de layout, largeur, `flex`/`grid`, `overflow`, position sticky ou comportement du menu mobile — uniquement des classes de couleur (`text-`, `bg-`, `border-`, `outline-`, `ring-`, `accent-`, `via-`) et deux `div` décoratifs `aria-hidden` ajoutés au hero (halos, sans dimension impactant le flux car `absolute`). Le risque de régression de mise en page est donc structurellement faible, mais je ne l'ai pas vérifié par capture aux points de rupture 390/768/1280/1440 — voir limites (§16).

## 15. Captures (§33 de la directive)

**Non produites.** Aucun outil de capture d'écran fonctionnel n'était disponible dans cet environnement d'audit pour ce lot : pas de navigateur ni de Playwright installé sur le poste (VM Linux locale sans Chromium), et le navigateur intégré Claude tourne dans un processus séparé qui ne peut pas atteindre un serveur `next start` lancé dans cette VM isolée (réseaux non partagés). Je ne veux pas déclarer une revue visuelle que je n'ai pas faite. Le dossier `docs/design/screens/palette-003a/` n'a pas été créé — le créer vide aurait été trompeur.

Pour obtenir les captures, deux options concrètes : (a) lancer `npm run dev` sur ce même poste et me laisser piloter le navigateur Claude en local une fois le serveur accessible depuis le bureau, ou (b) que tu ouvres toi-même les pages en local et me dises si un ajustement de nuance/contraste te semble nécessaire avant que je referme ce lot.

## 16. Tests

```text
vitest run → 29 fichiers, 189 tests, 189 PASS, 0 échec
```

Identique à la baseline TECH-BASELINE-001 (189/189). Aucun test n'a dû être modifié : aucun test du dépôt n'affirme sur une chaîne de couleur CSS littérale (vérifié par grep avant modification), donc la migration chromatique ne pouvait pas les casser — et ne les a pas cassés.

## 17. Lint

```text
npm run lint → 0 erreur, 0 avertissement
```

## 18. Build

```text
next build → Compiled successfully, TypeScript OK, 23/23 pages générées, 0 erreur
```

Vérifié deux fois (avant et après la correction du bug d'espaces dans les valeurs arbitraires Tailwind, voir §21) sur copie propre fs natif VM, dépôt original non touché par l'exécution.

**Vérification supplémentaire faite au-delà de "build passe" :** j'ai inspecté le CSS compilé généré (`.next/static/chunks/*.css`) pour confirmer que les nouvelles teintes sont réellement présentes dans la sortie (`6528ff`, `7b4dff`, `1f0757`, `f4f2ff` trouvés) et qu'aucune trace de `copper`/`e2793d` n'y subsiste. Un build qui compile sans erreur ne prouve pas qu'une classe Tailwind arbitraire produit le bon CSS — voir §21.

## 19. Diff final — classification

| Fichier | Classification |
|---|---|
| `src/app/globals.css` | EXPECTED_PALETTE_CHANGE |
| `src/app/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/services/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/realisations/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/a-propos/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/contact/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/confidentialite/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/mentions-legales/page.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/app/not-found.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/site-header.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/site-footer.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/badge-concept.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/contact-form.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/home-interactions.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/project-experience.tsx` | EXPECTED_PALETTE_CHANGE |
| `src/components/service-experience.tsx` | EXPECTED_PALETTE_CHANGE |
| `AGENTS.md` | PREEXISTING (non touché par ce lot, baseline héritée) |
| `docs/design/design-tokens.md` (supprimé) | PREEXISTING (non touché, ni restauré ni supprimé par ce lot) |

Aucun fichier `UNEXPECTED`. Aucune modification fonctionnelle (routes, API, wording, structure) trouvée dans le diff — uniquement des classes de couleur, deux `div` décoratifs `aria-hidden` (halos), et le commentaire de direction en tête de `globals.css`/`layout.tsx` référençant l'ancien nom de direction.

`layout.tsx` : non listé ci-dessus — vérification faite, **aucune modification n'y a en réalité été nécessaire** (le commentaire "Graphite et cuivre numérique" que j'avais prévu de corriger s'est révélé se trouver uniquement dans `globals.css`, déjà mis à jour). `git diff --stat` confirme `layout.tsx` absent du diff.

## 20. Fichiers préexistants non touchés

`AGENTS.md` (modifié, non commité, hérité) et `docs/design/design-tokens.md` (supprimé, non commité, hérité) : ni nettoyés ni restaurés, conformément à la directive §36.

## 21. Limites

- **Aucune image de référence reçue** dans ce tour — palette construite à partir des hex approximatifs texte de la directive uniquement, avec une échelle rendue monotone et vérifiée par contraste réel. À comparer avec l'image réelle si elle existe.
- **Aucune capture produite** (§15) — outil de capture indisponible dans cet environnement. VISUAL REVIEW reste entièrement à faire.
- **Responsive non vérifié visuellement** (§14) — risque structurel jugé faible (aucun changement de layout) mais non confirmé par capture.
- Un bug réel a été trouvé et corrigé en cours de lot : espaces dans les valeurs arbitraires Tailwind (`rgba(101, 40, 255, x)`) qui auraient rendu 7 classes silencieusement inertes malgré un build vert — détecté seulement en inspectant le CSS compilé, pas par le build lui-même. Signalé ici parce que c'est le genre d'erreur qu'un simple "build PASS" ne révèle pas.
- Un deuxième bug de contraste a été trouvé et corrigé : texte `#14151a` sur fond `purple-600` (19 emplacements) tombait à 2.87:1, sous le seuil AA — l'ancien copper (plus clair) tolérait ce texte sombre, le nouveau violet (plus sombre) non. Sans la mesure de contraste réelle du §12, ce défaut serait passé inaperçu.
- Couleurs sémantiques `error`/`success` et combinaisons de contraste avec `bg-800`/`bg-900` non auditées (hors demande explicite, mais signalé pour transparence).

## 22. Recommandation de clôture

```text
INFOTECHS-DESIGN-PALETTE-003A

BASELINE HEAD : 885412defb117d5dde61d5867ef40f1fc6328ab1 (inchangé)
WORKTREE INITIAL : AGENTS.md modifié + design-tokens.md supprimé (hérités, non touchés)

PALETTE : GRAPHITE & ELECTRIC VIOLET

ROUTES AUDITÉES : 9 (accueil, services, service détail, réalisations, réalisation détail,
                     à propos, contact, confidentialité, mentions légales, 404 — 10 avec 404)
ROUTES MIGRÉES  : 10/10

TOKENS       : PASS
HEADER       : PASS
HERO         : PASS
FOOTER       : PASS
SERVICES     : PASS
PORTFOLIO    : PASS
ABOUT        : PASS
CONTACT      : PASS
LEGAL        : PASS
404          : PASS
MOBILE MENU  : PASS (classes migrées ; comportement clavier/ARIA non touché, vérifié par tests)
FORMS        : PASS (contact-form.tsx migré ; focus ring vérifié 5.54:1)

COPPER RESIDUAL UI : 0 (grep exhaustif, exit 1)
WCAG AA      : Paires clés vérifiées par calcul (§12) ; 2 défauts trouvés et corrigés
               (texte CTA, valeurs arbitraires cassées). Couverture non exhaustive
               (bg-800/900, error/success non audités).
RESPONSIVE   : NON VÉRIFIÉ VISUELLEMENT (risque structurel jugé faible)

TESTS  : 189/189 PASS
LINT   : PASS (0 erreur)
BUILD  : PASS (23/23 pages, CSS compilé inspecté et confirmé)

CAPTURES : NON PRODUITES (outil indisponible, voir §15/§21)
REPORT   : docs/design/infotechs-design-palette-003a-report.md

DEPENDENCIES CHANGED : NO
FUNCTIONAL BEHAVIOR CHANGED : NO
CONTENT CHANGED : NO

VISUAL REVIEW :
PENDING PM — aucune capture disponible pour cette revue, voir §15 pour options.

RECOMMENDATION :
NOT READY (uniquement à cause de l'absence de captures/revue visuelle).
Le code, les tokens, les tests, le lint et le build sont prêts. La seule
étape manquante est visuelle : soit tu regardes en local (npm run dev),
soit on trouve un moyen de connecter un navigateur au serveur pour que
je capture moi-même.

COMMIT : AUCUN
PRODUCTION : NO GO
```
