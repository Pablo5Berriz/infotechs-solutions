# Audit de réconciliation des couleurs de marque

**Statut :** BRAND COLOR RECONCILIATION AUDIT COMPLETE — WAITING PM REVIEW
**Portée :** analyse uniquement; aucune modification visuelle ni suppression d'asset
**Direction proposée :** « Graphite premium + Infotechs Digital Blue »

## 1. Baseline Git

| Élément | Constat |
|---|---|
| Baseline demandée | `master` à `885412defb117d5dde61d5867ef40f1fc6328ab1` |
| SHA vérifié avant audit | `885412defb117d5dde61d5867ef40f1fc6328ab1` |
| Branche locale fournie par l'environnement | `work` (aucune référence locale `master` présente) |
| Working tree initial | propre (`## work`, aucun fichier modifié/non suivi) |

Le contenu audité correspond donc exactement au SHA demandé. Le nom de branche ne peut pas être confirmé comme `master` dans ce clone, qui expose seulement `work`. Cette divergence d'environnement n'affecte pas l'inventaire au SHA, mais doit être prise en compte lors de l'intégration.

## 2. Couleurs sources mesurées du logo

Valeurs brutes officielles communiquées après analyse pixel par pixel :

| Rôle dans le logo | Hex | RGB | Rôle UI recommandé |
|---|---:|---:|---|
| Wordmark / navy | `#00044C` | `rgb(0, 4, 76)` | identité sur fond clair; jamais texte normal sur graphite |
| Cyan | `#30E4FC` | `rgb(48, 228, 252)` | accent principal |
| Indigo | `#3C189C` | `rgb(60, 24, 156)` | profondeur, formes et gradients contrôlés |
| Violet | `#B460FC` | `rgb(180, 96, 252)` | accent secondaire |

Ces couleurs sont des **brand tokens bruts**, pas une instruction d'aplat généralisé. Aucun asset présent dans le dépôt ne contient exactement ces quatre valeurs; elles demeurent la référence PM pour le nouveau logo officiel.

## 3. Palette UI actuelle

| Token CSS | Valeur | Usage déclaré |
|---|---:|---|
| `--color-bg-950` | `#121316` | fond principal |
| `--color-bg-900` | `#1C1E22` | surfaces, cartes, navigation |
| `--color-bg-800` | `#2A2D33` | bordures, séparateurs |
| `--color-text-100` | `#F4F1EA` | texte principal |
| `--color-text-400` | `#9B9690` | texte secondaire |
| `--color-copper-500` | `#E2793D` | CTA, liens, focus, accents |
| `--color-copper-500-on-fill` | `#14151A` | texte sur cuivre |
| `--color-petrol-500` | `#2D6E7E` | accent secondaire déclaré |
| `--color-error` | `#FF6B5C` | erreur |

## 4. Conflits entre palette et marque

1. Le cuivre est à la fois couleur physique et contrat fonctionnel de presque tous les états importants. Il exprime l'ancienne direction, pas le logo officiel.
2. Les composants consomment directement `copper-500`; un simple remplacement de valeur modifierait simultanément CTA, textes, bordures, focus, icônes, grands aplats et décorations sans possibilité de dosage par rôle.
3. Le pétrole est défini mais n'est consommé par aucun composant React : sa présence ajoute une couche conceptuelle sans rôle réel.
4. Le halo du header encode directement `rgba(226,121,61,0.25)`, tandis que d'autres usages passent par `--shadow-glow-copper` : la source de vérité est déjà partiellement contournée.
5. Plusieurs grilles décoratives encodent aussi le cuivre en `rgba(226,121,61,.08)`.
6. Le wordmark rendu dans le header et le footer est du texte HTML ivoire/cuivre, non un asset de logo. Il ne correspond donc pas au nouveau wordmark navy.
7. Le PNG nommé `Infotechs.png` est un ancien visuel carré blanc/or/noir avec symbole 3D; il n'est référencé par aucun composant et ne correspond pas aux couleurs officielles fournies.

## 5. Inventaire des tokens actuels

### Déclarations et exposition

- `src/app/globals.css` déclare les couleurs physiques, expose `copper-500` et `petrol-500` dans `@theme inline`, utilise le cuivre pour la sélection et le focus global, puis définit `--shadow-glow-copper` et `--border-accent` à partir du cuivre.
- `docs/design/design-tokens.md` se présente comme la source de vérité et documente palette, contrastes, ombre, bordure et matrice d'états avec le vocabulaire cuivre/pétrole.
- `docs/design/implementation-recommendations.md` contient encore une référence à `copper-500` et quatre occurrences hexadécimales du cuivre.
- `docs/design/logo-concepts/infotechs-logo-concept-B-brand-aligned.svg` contient sept occurrences de `#E2793D`; c'est un concept historique, pas un asset public utilisé.

### Occurrences recherchées (hors exports Lighthouse)

| Recherche | Occurrences | Fichiers concernés |
|---|---:|---|
| `#E2793D` (insensible à la casse) | 14 | 5 fichiers |
| `#2D6E7E` | 2 | 2 fichiers |
| chaîne `color-copper` | 8 | `globals.css` |
| chaîne `copper-500` | 173 | 17 fichiers source + 2 documents |
| chaîne `petrol-500` | 4 | `globals.css`, `design-tokens.md` |
| `shadow-glow-copper` | 2 | `globals.css`, page d'accueil |
| `border-accent` | 1 | déclaration dans `globals.css`; aucune consommation React |

## 6. Inventaire des usages dans le code

### Fichiers React touchés par `copper-500`

| Fichier | Occurrences | Composant/page | Catégories observées |
|---|---:|---|---|
| `src/components/service-experience.tsx` | 26 | cartes et détail service | CTA, liens, labels, icônes, bordures, grand aplat final, hover |
| `src/app/a-propos/page.tsx` | 24 | À propos | CTA, labels, icônes, timeline, bordures, aplat final, décoration |
| `src/app/page.tsx` | 23 | accueil | CTA, labels, icônes, cartes, timeline, aplat final, ombre |
| `src/app/contact/page.tsx` | 14 | contact | CTA, liens, labels, icônes, bordure d'encart, aplat final |
| `src/app/services/page.tsx` | 13 | liste services | CTA, liens, labels, icônes, bordures, décoration |
| `src/components/project-experience.tsx` | 12 | portfolio | CTA, liens, labels, icônes, bordures et dessin abstrait |
| `src/components/home-interactions.tsx` | 9 | interactions accueil | onglets, liens, icônes, lignes animées, bordures |
| `src/components/contact-form.tsx` | 9 | formulaire | focus, ring, checkbox, lien, CTA, label requis, icône |
| `src/components/site-header.tsx` | 7 | header | wordmark texte, actif, CTA, focus, halo hover |
| `src/components/site-footer.tsx` | 7 | footer | wordmark texte, hover de liens, titres, CTA |
| `src/app/realisations/page.tsx` | 7 | liste réalisations | CTA, labels, icônes, bordures, aplat final, décoration |
| `src/app/not-found.tsx` | 5 | 404 | focus, CTA, label, hover, grille décorative |
| `src/app/confidentialite/page.tsx` | 4 | confidentialité | label et liens texte |
| `src/app/mentions-legales/page.tsx` | 3 | mentions légales | label et liens texte |
| `src/components/badge-concept.tsx` | 1 | badge conformité | fill cuivre + texte sombre |

`src/app/globals.css` ajoute les usages transverses de sélection et focus. Le token pétrole ne produit actuellement aucun usage CTA, focus, hover, texte, bordure, ombre ou décoration dans un composant.

### Typologie de migration

- **CTA / fills :** boutons de header, formulaire, hero et pages; grands encarts finaux; badge concept.
- **Focus :** règle globale, header, formulaire et 404. Ces usages doivent converger vers `--color-focus`, et non vers un brand token direct.
- **Hover / actif :** navigation, cartes, liens, accordéons et bordures.
- **Texte :** eyebrows, index, liens, titres de footer, astérisques et labels. Le cyan peut convenir sur graphite, mais son volume doit être revu pour éviter une interface fluorescente.
- **Bordures :** timelines, illustrations, cartes et champs.
- **Ombres :** token global et valeur RGBA codée dans le header.
- **Décorations :** grilles RGBA, lignes animées et schémas abstraits; candidates au gradient ponctuel cyan-violet-indigo.

## 7. Inventaire des assets logo

### `public/`

| Asset | Nature | Utilisation réelle | Verdict marque |
|---|---|---|---|
| `public/images/Infotechs.png` | PNG RGB 2000 × 2000, 1 267 404 octets | aucune référence applicative | ancien visuel blanc/or/noir; aucune des quatre couleurs officielles exacte; **pas le nouveau logo officiel** |
| `public/images/hero-technology-workspace.png` | image hero, 1 444 158 octets | OpenGraph, Twitter et contenu hero | visuel marketing, pas un logo |
| `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | assets de scaffold | aucune identité Infotechs | pas des logos Infotechs |

### Hors `public/`

- `src/app/favicon.ico` est l'unique favicon/icone de metadata implicite. Aucune preuve dans le dépôt ne permet de l'identifier comme une variante validée du nouveau logo.
- `docs/design/logo-concepts/infotechs-logo-concept-B-brand-aligned.svg` est un concept documentaire cuivre historique, non servi par l'application.
- Aucun asset nommé logo on-light, on-dark, symbol-only, monochrome, OpenGraph de marque ou nouveau logo cyan/violet/indigo/navy n'est présent.

### Emplacements réellement rendus

- **Header :** marque composée en texte HTML « Infotechs Solutions »; aucun fichier image.
- **Footer :** même composition textuelle; aucun fichier image.
- **Favicon :** `src/app/favicon.ico` via la convention de fichier Next.js.
- **Metadata / OpenGraph / Twitter :** `hero-technology-workspace.png`, donc aucune variante de logo dédiée.
- **`Infotechs.png` :** dormant; uniquement mentionné dans un audit documentaire.

Avant toute intégration, le PM/design doit fournir ou valider explicitement : `logo-on-light`, `logo-on-dark`, `symbol-only`, et éventuellement `monochrome`. Ne pas recoloriser destructivement le navy pour fabriquer une variante sombre.

## 8. Contrastes WCAG 2.1 actuels

Calcul selon la luminance relative sRGB WCAG 2.1, sans arrondi intermédiaire. AA texte normal exige `4.5:1`; texte large et éléments UI graphiques exigent `3:1`; AAA texte normal exige `7:1`.

| Premier plan / arrière-plan | Ratio | Résultat |
|---|---:|---|
| `#F4F1EA` / `#121316` | **16.47:1** | AAA texte normal |
| `#9B9690` / `#121316` | **6.33:1** | AA texte normal |
| cuivre `#E2793D` / `#121316` | **6.22:1** | AA texte normal |
| texte CTA `#14151A` / cuivre `#E2793D` | **6.11:1** | AA texte normal |
| pétrole `#2D6E7E` / `#121316` | **3.22:1** | UI/texte large seulement; échec texte normal |
| cuivre `#E2793D` / `#1C1E22` | **5.59:1** | AA texte normal |
| pétrole `#2D6E7E` / `#1C1E22` | **2.90:1** | échec UI et texte |

Les ratios recalculés diffèrent légèrement des valeurs arrondies actuellement documentées (`6.28`, `3.26`) mais ne changent pas les verdicts principaux.

## 9. Contrastes WCAG 2.1 des couleurs du logo

| Premier plan / arrière-plan | Ratio | Résultat / contrainte |
|---|---:|---|
| cyan `#30E4FC` / `bg-950 #121316` | **12.06:1** | AAA texte normal; excellent focus/UI |
| violet `#B460FC` / `bg-950` | **5.32:1** | AA texte normal |
| indigo `#3C189C` / `bg-950` | **1.59:1** | échec; décoratif uniquement |
| navy `#00044C` / `bg-950` | **1.01:1** | échec; logo illisible |
| cyan / `bg-900 #1C1E22` | **10.83:1** | AAA texte normal |
| violet / `bg-900` | **4.78:1** | AA texte normal |
| indigo / `bg-900` | **1.43:1** | échec |
| navy / `bg-900` | **1.12:1** | échec |
| `#14151A` / cyan fill | **11.83:1** | AAA texte CTA |
| `bg-950 #121316` / cyan fill | **12.06:1** | AAA texte CTA |
| navy `#00044C` / cyan fill | **12.15:1** | AAA, mais couplage brand direct déconseillé pour le CTA |
| ivoire `#F4F1EA` / navy | **16.60:1** | AAA; pertinent seulement sur surface navy contrôlée |

Minimum demandé vérifié : accent primaire/bg-950 `12.06`, accent secondaire/bg-950 `5.32`, texte CTA/fill `12.06` en choisissant `bg-950`, focus/bg-950 `12.06`, liens/bg-950 `12.06`, accent primaire/bg-900 `10.83` et accent secondaire/bg-900 `4.78`.

## 10. Proposition de brand tokens

Les brand tokens décrivent exclusivement les encres officielles, sans promettre leur aptitude à un rôle UI.

```css
--color-brand-navy: #00044c;
--color-brand-cyan: #30e4fc;
--color-brand-violet: #b460fc;
--color-brand-indigo: #3c189c;
--gradient-brand-signature: linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-violet), var(--color-brand-indigo));
```

Le gradient est un motif opt-in pour un trait hero, une bordure spéciale ou une illustration. Il ne doit pas devenir un fond de bouton/titre global. Tout arrêt intermédiaire supplémentaire doit venir du fichier maître validé, et non d'une interpolation présentée comme « couleur réelle ».

## 11. Proposition de semantic UI tokens

```css
--color-accent-primary: var(--color-brand-cyan);
--color-accent-secondary: var(--color-brand-violet);
--color-accent-depth: var(--color-brand-indigo);
--color-focus: var(--color-accent-primary);
--color-link: var(--color-accent-primary);
--color-link-hover: var(--color-text-100);
--color-active: var(--color-accent-primary);
--color-cta-primary: var(--color-accent-primary);
--color-cta-primary-text: var(--color-bg-950);
--color-cta-secondary: transparent;
--color-cta-secondary-text: var(--color-text-100);
--color-cta-secondary-border: var(--color-bg-800);
--color-highlight-secondary: var(--color-accent-secondary);
--color-decoration-depth: var(--color-accent-depth);
--shadow-accent: 0 0 24px rgb(48 228 252 / 0.16);
--border-accent: 1px solid var(--color-accent-primary);
```

### Validation WCAG de chaque token colorimétrique proposé

| Token fonctionnel | Paire testée | Ratio | Décision |
|---|---|---:|---|
| `accent-primary`, `focus`, `link`, `active` | cyan / bg-950 | 12.06:1 | PASS AAA texte, PASS UI |
| mêmes tokens sur surface | cyan / bg-900 | 10.83:1 | PASS AAA texte, PASS UI |
| `accent-secondary`, `highlight-secondary` | violet / bg-950 | 5.32:1 | PASS AA texte, PASS UI |
| mêmes tokens sur surface | violet / bg-900 | 4.78:1 | PASS AA texte, PASS UI |
| `accent-depth`, `decoration-depth` | indigo / bg-950 | 1.59:1 | FAIL texte/UI isolé; décoration non porteuse d'information seulement |
| mêmes tokens sur surface | indigo / bg-900 | 1.43:1 | FAIL texte/UI isolé; même restriction |
| `cta-primary-text` / `cta-primary` | bg-950 / cyan | 12.06:1 | PASS AAA |
| `link-hover` | text-100 / bg-950 | 16.47:1 | PASS AAA |
| `cta-secondary-text` | text-100 / bg-950 | 16.47:1 | PASS AAA |
| `cta-secondary-border` | bg-800 / bg-950 | **1.33:1** | FAIL si seule indication UI; conserver avec texte/forme, ou prévoir un token de bordure interactive ≥3:1 |
| `border-accent` | cyan / bg-950 | 12.06:1 | PASS UI |
| `shadow-accent` | composite translucide | non applicable seul | décoratif uniquement; ne jamais porter l'état focus |

La bordure secondaire existante `bg-800` n'atteint pas `3:1`. Pour un contrôle dont la limite visuelle est nécessaire à l'identification, utiliser `--color-accent-primary` ou définir après maquette un `--color-border-interactive` audité à `≥3:1`. Aucun PASS ne doit être inféré de la seule présence du texte.

## 12. Mapping ancien vers nouveau

| Ancien | Nouveau contrat | Note |
|---|---|---|
| `--color-copper-500` | aucun alias permanent; router selon le rôle | éviter un remplacement global aveugle |
| cuivre sur CTA | `--color-cta-primary` | cyan fill, texte sombre |
| `--color-copper-500-on-fill` / `#14151A` | `--color-cta-primary-text` | préférer `bg-950` pour cohérence tokenisée |
| cuivre texte/lien | `--color-link` ou `--color-accent-primary` | réduire le volume de petits labels cyan si nécessaire |
| cuivre actif | `--color-active` | navigation, onglets, filtres |
| cuivre focus | `--color-focus` | règle globale et overrides locaux |
| cuivre bordure | `--border-accent` / rôle spécifique | distinguer focus, timeline et décoration |
| `--shadow-glow-copper` et RGBA inline | `--shadow-accent` | halo plus discret, décoratif |
| `--color-petrol-500` | retirer seulement après preuve de non-usage; pas d'alias requis | aucun consommateur React actuel |
| décoration cuivre | `--color-accent-secondary`, `--color-decoration-depth` ou gradient signature | décision composant par composant |
| wordmark texte cuivre | asset validé selon fond | ne pas substituer automatiquement le navy sur graphite |

## 13. Risques de régression visuelle

- Un remplacement lexical cuivre → cyan créerait de grands aplats beaucoup plus lumineux et une esthétique néon.
- Les 173 occurrences mélangent sémantique, décoration et état; elles ne peuvent pas partager une migration mécanique sûre.
- Les CTA finaux pleine largeur, badge et lignes de timeline requièrent une revue visuelle dédiée.
- Les valeurs RGBA arbitraires échapperaient à une migration limitée aux tokens.
- Le violet passe AA sur les deux fonds, mais une utilisation systématique affaiblirait la hiérarchie et la sobriété.
- Indigo et navy échouent sur graphite; les promouvoir en texte, petite icône informative ou bordure d'état serait une régression d'accessibilité.
- Le PNG dormant peut être pris à tort pour le nouveau logo à cause de son nom générique.
- Remplacer le wordmark HTML par un PNG carré dégraderait netteté, cadrage responsive, performance et contraste.
- Les états opacity/disabled et les compositions translucides devront être recalculés sur leur fond final.
- La documentation et CSS déclarent tous deux une autorité; une mise à jour non atomique les désynchroniserait.

## 14. Composants impactés

Priorité 1 (navigation/conversion/accessibilité) : `SiteHeader`, `SiteFooter`, `ContactForm`, CTA partagés/inline, focus global et page 404.
Priorité 2 (grands aplats et structures répétées) : accueil, services, `ServiceExperience`, réalisations, `ProjectExperience`, À propos, contact.
Priorité 3 (micro-détails) : `HomeInteractions`, `BadgeConcept`, pages légales/confidentialité, grilles et illustrations décoratives.
Actifs transverses : `globals.css`, `design-tokens.md`, `implementation-recommendations.md`, favicon et futures variantes de logo.

## 15. Stratégie de migration

1. **Validation PM assets :** obtenir le master officiel et ses exports validés on-light/on-dark/symbol-only; conserver tous les anciens assets.
2. **Contrat de tokens :** ajouter d'abord brand tokens et semantic tokens sans retirer les anciens; documenter les restrictions WCAG.
3. **Fondations :** migrer focus global, sélection, liens et primitives CTA vers les tokens fonctionnels; tester clavier et contrastes réels.
4. **Conversion :** migrer header, footer et formulaire; décider séparément du traitement du wordmark sur fond sombre.
5. **Surfaces répétées :** migrer pages/composants par rôle (fill, texte, border, icon, decoration), jamais par recherche/remplacement global.
6. **Signature de marque :** introduire au maximum quelques usages du gradient après validation de maquette, sans glow permanent.
7. **Nettoyage :** supprimer les alias cuivre/pétrole uniquement quand `rg` ne trouve plus de consommateurs; conserver les assets historiques.
8. **Synchronisation :** modifier `globals.css` et `design-tokens.md` dans le même lot; mettre à jour ensuite les recommandations et audits concernés.
9. **Validation :** tests automatisés, audit axe/Lighthouse, capture desktop/mobile et revue PM contre les critères premium/sobre/non gaming.

## 16. Recommandation finale

Adopter la séparation **brand tokens → semantic UI tokens** proposée, avec cyan comme accent fonctionnel principal, violet comme accent secondaire limité, indigo comme profondeur décorative et navy réservé aux contextes assurant son contraste. Conserver les graphites et textes actuels. Ne pas intégrer le logo tant que ses variantes d'asset n'ont pas été validées.

Ce lot doit précéder `DOCUMENTATION-SYNC-007`. La prochaine étape recommandée est une petite migration de fondations et de primitives, suivie d'une revue PM, plutôt qu'un remplacement massif des 173 occurrences cuivre.

---

## Retour synthétique

**STATUT :** BRAND COLOR RECONCILIATION AUDIT COMPLETE — WAITING PM REVIEW
**BASELINE DEMANDÉE :** `master`
**BRANCHE LOCALE OBSERVÉE :** `work`
**SHA :** `885412defb117d5dde61d5867ef40f1fc6328ab1`
**WORKING TREE INITIAL :** propre
**LOGO SOURCE COLORS :** `#00044C`, `#30E4FC`, `#3C189C`, `#B460FC`
**CURRENT UI COLORS :** graphite `#121316/#1C1E22/#2A2D33`, texte `#F4F1EA/#9B9690`, cuivre `#E2793D`, pétrole `#2D6E7E`
**COPPER USAGES :** 173 occurrences `copper-500`, plus RGBA inline et 14 occurrences hex (code/docs/concept)
**PETROL USAGES :** définitions/documentation seulement; aucun consommateur React
**LOGO ASSETS :** aucun asset correspondant au nouveau logo officiel; un ancien `Infotechs.png`, un favicon non validé, un concept SVG documentaire
**PROPOSED BRAND TOKENS :** navy, cyan, violet, indigo, gradient signature
**PROPOSED SEMANTIC TOKENS :** accent primary/secondary/depth, focus, link, active, CTA, highlight, decoration, shadow et border accent
**WCAG :** cyan/bg-950 12.06:1; violet/bg-950 5.32:1; indigo/bg-950 1.59:1; navy/bg-950 1.01:1; texte CTA bg-950/cyan 12.06:1
**FILES CREATED :** `docs/design/brand-color-reconciliation-audit.md`
**OTHER FILES MODIFIED :** NONE
