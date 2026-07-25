# Design tokens — Direction retenue : Graphite et cuivre numérique

**Statut**: Direction validée visuellement dans Stitch (3 directions comparées). Les valeurs hexadécimales ci-dessous sont définies et vérifiées par calcul de contraste WCAG par Claude — Stitch produit une direction visuelle, pas un export de tokens exploitable ; voir `docs/design/stitch-design-report.md` section « Limites » pour le détail de cette méthodologie.

Toutes les paires de contraste ci-dessous sont calculées avec la formule de luminance relative WCAG 2.1 (pas estimées à l'œil).

## Couleurs

| Token | Valeur | Usage | Contraste vérifié |
|---|---|---|---|
| `color.bg.950` | `#121316` | Fond de page principal | — (référence) |
| `color.bg.900` | `#1C1E22` | Surface élevée (cartes, nav) | — |
| `color.bg.800` | `#2A2D33` | Bordures, séparateurs, hover discret | — |
| `color.text.100` | `#F4F1EA` (ivoire) | Texte principal sur fond sombre | **16.6:1** sur `bg.950` — AAA |
| `color.text.400` | `#9B9690` | Texte secondaire, légendes | **6.4:1** sur `bg.950` — AA (texte normal), proche AAA |
| `color.accent.copper.500` | `#E2793D` | CTA principal (fill), liens actifs, icônes d'accent | **6.28:1** sur `bg.950` en tant que texte/icône — AA |
| `color.accent.copper.500-on-fill` | texte `#14151A` sur fill `#E2793D` | Texte du bouton CTA principal (fill copper) | **6.11:1** — AA |
| `color.accent.petrol.500` | `#2D6E7E` | Accent secondaire froid : icônes, tags, grands titres uniquement | **3.26:1** sur `bg.950` — **passe le seuil « texte large / UI » (3:1), ÉCHOUE pour texte normal (4.5:1 requis)** |

**Règle d'usage stricte pour `accent.petrol.500`**: jamais en texte de paragraphe ou en texte de bouton de petite taille. Réservé aux titres ≥ 24px, aux icônes, aux bordures et aux éléments décoratifs. Cette contrainte doit être respectée dans le composant Next.js — un lint de contraste ou une revue de code doit vérifier qu'aucun `text-petrol-500` n'est appliqué à du texte de corps.

## Typographie

Décision explicitement demandée par la directive PM: ne pas reprendre automatiquement Inter/Poppins/Geist sans justification. Recommandation:

| Rôle | Police | Justification |
|---|---|---|
| Display (titres H1/H2) | **Hanken Grotesk** (variable, Google Fonts, licence OFL commerciale libre) | Géométrique mais avec un grain moins générique qu'Inter/Poppins, bon rendu des accents français (é, è, à, ç), disponible en variable font donc un seul fichier pour tous les poids — bon pour la performance |
| Texte courant | **Public Sans** (Google Fonts, licence OFL) | Très haute lisibilité à petite taille, chiffres tabulaires disponibles, accents français corrects, largement utilisée dans des contextes gouvernementaux/institutionnels ce qui renforce la crédibilité « expert, direct » demandée |
| Monospace (labels techniques, stack technologique, données) | **JetBrains Mono** (licence OFL, gratuite commercialement) | Chiffres et caractères techniques très lisibles, déjà largement adoptée dans les interfaces développeur — cohérent avec le positionnement technique d'Infotechs Solutions |

Toutes trois sont sur Google Fonts (licence OFL, usage commercial libre sans attribution obligatoire) et supportent nativement les caractères français accentués. Poids variables recommandés pour limiter le nombre de fichiers chargés (budget performance, section `performance-audit.md` existant).

## Espacement

| Token | Valeur |
|---|---|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.24` | 96px |

Échelle de base 4px, cohérente avec Tailwind (déjà utilisé dans le code existant — voir `production-readiness-audit.md`), donc aucune migration d'échelle nécessaire à l'implémentation.

## Containers et breakpoints

| Token | Valeur |
|---|---|
| `container.max` | 1280px |
| `breakpoint.sm` | 640px |
| `breakpoint.md` | 768px |
| `breakpoint.lg` | 1024px |
| `breakpoint.xl` | 1280px |

## Rayons

| Token | Valeur | Usage |
|---|---|---|
| `radius.sm` | 6px | Boutons secondaires, champs de formulaire |
| `radius.md` | 10px | Cartes, boutons principaux |
| `radius.lg` | 16px | Grands blocs, hero visuel |

## Ombres

| Token | Valeur | Usage |
|---|---|---|
| `shadow.sm` | `0 1px 2px rgba(0,0,0,0.4)` | Cartes au repos |
| `shadow.md` | `0 8px 24px rgba(0,0,0,0.5)` | Cartes au survol |
| `shadow.glow-copper` | `0 0 24px rgba(226,121,61,0.25)` | Halo lumineux discret sur CTA principal au survol — évoque le concept « flux lumineux » sans glassmorphism |

## Bordures

| Token | Valeur |
|---|---|
| `border.default` | `1px solid #2A2D33` |
| `border.accent` | `1px solid #E2793D` |
| `border.width.focus` | `2px` (voir accessibilité — anneau de focus) |

## Z-index

| Token | Valeur | Usage |
|---|---|---|
| `z.header` | 50 | Navigation sticky |
| `z.overlay` | 100 | Menu mobile, modales |
| `z.toast` | 200 | Notifications |

## Tailles d'icônes

| Token | Valeur |
|---|---|
| `icon.sm` | 16px |
| `icon.md` | 20px |
| `icon.lg` | 24px |
| `icon.xl` | 32px |

## Tailles de boutons

| Token | Hauteur | Padding horizontal | Taille de texte |
|---|---|---|---|
| `button.sm` | 36px | 16px | 14px |
| `button.md` | 44px | 20px | 15px |
| `button.lg` | 52px | 28px | 16px |

`button.md` (44px) est le minimum utilisé partout sur mobile — respecte la cible WCAG de zone tactile ≥ 44px demandée par la directive PM section 9.

## Tailles de contrôles de formulaire

| Token | Hauteur | Usage |
|---|---|---|
| `field.height` | 48px | Input, select — au-dessus du minimum 44px pour marge de confort tactile |
| `field.border-radius` | `radius.sm` (6px) | Cohérent avec le composant `ContactForm` existant dans le code (voir `src/components/contact-form.tsx`) |

## Variante claire

**Non définie dans ce lot.** La direction retenue est conçue fond sombre (« Graphite et cuivre numérique »). Une variante claire complète (fond clair, mêmes rapports de contraste vérifiés) n'a pas été demandée explicitement par la directive et n'a pas été produite — à statuer dans un lot de conception ultérieur si un mode clair est requis (ex. pour l'impression, l'OG image, ou une préférence utilisateur `prefers-color-scheme: light`).

---

## Écart constaté et corrigé : typographie réellement utilisée par Stitch

**Constat honnête**: en auditant le code HTML réel exporté par Stitch pour les 9 pages générées dans le lot `INFOTECHS-DESIGN-COMPLETION-001A` (voir `docs/design/_stitch-source/*/code.html`), la police de corps de texte effectivement appliquée par Stitch est **Geist**, pas **Public Sans** comme documenté dans la version précédente de ce fichier (issue du lot `INFOTECHS-DESIGN-REDESIGN-001`). La police d'affichage **Hanken Grotesk** est en revanche correcte et confirmée dans le code réel.

Deux options, à trancher par le fondateur avant l'implémentation :
1. **Conserver Public Sans** comme documenté initialement (meilleure justification de lisibilité institutionnelle, voir section Typographie ci-dessus) et corriger manuellement ce point lors du portage en code Next.js — Stitch n'a pas suivi cette spécification typographique dans ses générations successives malgré des instructions cohérentes.
2. **Adopter Geist** comme police de corps officielle, puisque c'est ce qui a été effectivement produit, prévisualisé et validé visuellement dans les 18 captures réelles du lot — et que Geist est déjà une dépendance existante du projet Next.js actuel (`next/font/google`), ce qui simplifierait l'implémentation (zéro nouvelle police à intégrer).

**Recommandation**: option 2 (Geist), pour deux raisons vérifiables — c'est ce qui a réellement été validé visuellement dans toutes les captures de ce lot, et cela évite d'introduire une police supplémentaire dans le budget de performance. Ceci reste une recommandation, pas une décision actée ; à confirmer par le fondateur.

## Échelle typographique complète

| Token | Famille | Taille desktop | Taille mobile | Poids | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|---|---|
| `type.display-xl` | Hanken Grotesk | 72px | 40px | 800 | 1.1 | -0.04em | Hero de la page d'accueil uniquement |
| `type.display-lg` | Hanken Grotesk | 48px | 30px | 700 | 1.2 | -0.02em | Hero des pages secondaires (Services, À propos, Contact, Ressources, Article, 404) |
| `type.h1` | Hanken Grotesk | 40px | 28px | 700 | 1.2 | -0.01em | Titre principal de section quand il n'y a pas de hero dédié |
| `type.h2` | Hanken Grotesk | 32px | 24px | 600 | 1.3 | 0 | Titres de section (« Nos services », « Méthodologie », etc.) |
| `type.h3` | Hanken Grotesk | 24px | 20px | 600 | 1.3 | 0 | Titres de carte, sous-sections |
| `type.h4` | Hanken Grotesk | 18px | 16px | 600 | 1.4 | 0 | Petits titres, en-têtes de bloc (FAQ, accordéon) |
| `type.body-lg` | Geist (voir écart ci-dessus) | 18px | 17px | 400 | 1.6 | 0 | Chapô, texte d'introduction |
| `type.body` | Geist | 16px | 15px | 400 | 1.6 | 0 | Corps de texte standard |
| `type.body-sm` | Geist | 14px | 14px | 400 | 1.5 | 0 | Texte secondaire, notes, légendes de formulaire |
| `type.caption` | Geist | 12px | 12px | 400 | 1.4 | 0.01em | Mentions légales en petit, copyright, métadonnées |
| `type.label` | Geist | 14px | 13px | 500 | 1.4 | 0.05em (majuscules) | Étiquettes de section (« SERVICES », « CONTACT »), boutons |
| `type.mono` | JetBrains Mono | 13px | 13px | 400 | 1.5 | 0 | Stack technologique, extraits de code, métadonnées techniques |

## Grilles desktop / tablette / mobile

| Breakpoint | Colonnes | Gouttière | Marge extérieure | Largeur max de contenu | Largeur max de lecture (texte long) |
|---|---|---|---|---|---|
| Mobile (< 640px, référence 390px) | 4 | 16px | 24px | 100% | 100% (une seule colonne) |
| Tablette (640–1023px, référence 768px) | 8 | 20px | 32px | 100% | 640px (Mentions légales, Confidentialité, Article) |
| Desktop (≥ 1024px, référence 1280px) | 12 | 24px | max(24px, calc((100% - 1280px) / 2)) | 1280px (`container.max`) | 720px (Mentions légales, Confidentialité, Article) |

**Note de vérification**: la référence tablette (768px) ci-dessus est une spécification de grille standard, cohérente avec les breakpoints déjà documentés — mais aucune capture tablette réelle du site n'a pu être produite dans ce lot (voir `completion-001a-status.md`, échec technique documenté et reproductible sur Stitch). Cette grille reste donc non validée visuellement à 768px, à vérifier en priorité dès qu'une capture réelle sera obtenue.

## Composants et états

Chaque composant ci-dessous liste les états pertinents observés ou requis. Les états marqués **(non vérifié visuellement)** n'ont pas pu être observés dans une capture réelle de ce lot et restent des recommandations à valider à l'implémentation.

| Composant | Normal | Hover | Focus | Active | Disabled | Loading | Error |
|---|---|---|---|---|---|---|---|
| Header / nav desktop | Fond `bg.950`, liens `text.400` | Lien : `text.100` | Anneau `border.width.focus` `color.accent.copper.500`, offset 2px | — | — | — | — |
| Nav mobile (menu hamburger) | Icône `menu` | — | Anneau visible sur l'icône | Icône devient `close`, overlay plein écran | — | — | — |
| Bouton primaire (fill copper) | `accent.copper.500` fill, texte `#14151A` | `shadow.glow-copper` ajouté, pas de changement de taille | Anneau `copper.500` 2px offset 2px | Opacité 0.85 | Opacité 0.4, `cursor: not-allowed` **(non vérifié visuellement)** | Spinner remplace le libellé, largeur fixe pour éviter le layout shift **(non vérifié visuellement)** | — |
| Bouton secondaire (outline) | Bordure `border.accent`, texte `copper.500` | Fond `copper.500` à 10% d'opacité | Anneau `copper.500` | Opacité 0.85 | Opacité 0.4 **(non vérifié visuellement)** | — | — |
| Lien texte | `text.400` | `text.100`, soulignement | Anneau visible | — | — | — | — |
| Onglets (Services) | Onglet actif : `copper.500` + soulignement ; inactifs : `text.400` | Onglet inactif survolé : `text.100` | Anneau sur l'onglet en focus clavier | — | — | — | — |
| Carte service / réalisation | `shadow.sm`, fond `bg.900` | `shadow.md`, translation -4px Y (voir `animation-spec.md`) | Anneau sur la carte entière si focusable (lien) | — | — | — | — |
| Badge « CONCEPT DÉMONSTRATIF » | Fond `copper.500` à 90%, texte `#14151A`, toujours visible | **Aucun changement — jamais animé ni masqué (contrainte de conformité, voir `animation-spec.md` section 5)** | — | — | — | — | — |
| Champ de formulaire (input/textarea) | Bordure `border.default`, fond `bg.900` | — | Bordure `copper.500` 2px | — | Opacité 0.5 **(non vérifié visuellement)** | — | Bordure rouge/erreur (`color.error` non encore défini dans la palette — **écart à combler**), message sous le champ, `aria-invalid="true"` (pattern déjà implémenté dans `src/components/contact-form.tsx` — voir `production-readiness-audit.md`) |
| Compteur de caractères (champ message) | `text.400`, format `0 / 20 min` | — | — | — | — | — | Passe en couleur d'erreur si sous le minimum — observé dans la capture réelle `contact-desktop-1280.png` |
| Encart « Mode démonstration » | Fond `bg.900`, bordure `copper.500`, icône info | — | — | — | — | — | — |
| Filtres de catégorie (page Ressources) | Bouton inactif : bordure `border.default` ; actif : fond `copper.500` | Bordure `copper.500` sur inactif | Anneau visible | — | — | — | — |
| État vide (page Ressources) | Illustration/icône + texte « Aucun résultat trouvé », bouton pour réinitialiser le filtre — confirmé présent dans le code réel de `ressources-desktop-1280.png` | — | — | — | — | — | — |
| Pagination | Page active : fond `copper.500` ; pages inactives : `text.400` | `text.100` | Anneau visible | — | Flèche suivante/précédente grisée en bout de liste **(non vérifié visuellement)** | — | — |
| Footer | Fond `bg.900` ou `surface-container-low` selon page, liens `text.400` | Lien : `text.100` ou `tertiary` selon page (incohérence mineure relevée — à uniformiser à l'implémentation) | Anneau visible | — | — | — | — |

**Écart relevé lors de l'audit du code réel**: le footer de la page Ressources affiche le texte « Copyright 2026 Infotechs Solutions » (sans le symbole ©), alors que toutes les autres pages utilisent « © 2026 Infotechs Solutions. Tous droits réservés. ». Incohérence mineure de formatage, à corriger lors du portage — pas un problème de conformité, juste un manque d'uniformité entre générations successives dans Stitch.

Aucune couleur d'erreur (`color.error`) n'était définie dans la version précédente de ce document alors que le pattern `aria-invalid` existe déjà dans le code de production (`contact-form.tsx`). Recommandation : ajouter `color.error = #FF6B5C` (à vérifier au contraste WCAG avant adoption finale — non calculé dans ce lot, calcul à faire avant implémentation) ou réutiliser une couleur système Tailwind existante déjà auditée pour le contraste.
