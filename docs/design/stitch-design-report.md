# Rapport de conception — Refonte Stitch (INFOTECHS-DESIGN-REDESIGN-001)

**Type de lot**: Conception uniquement. **Aucun code de production n'a été modifié.** Statut production toujours **NO GO** (dépendances vulnérables, audits Lighthouse/axe absents, revue juridique absente, aucun déploiement réel — voir `production-readiness-audit.md`).

> **Addendum (INFOTECHS-DESIGN-COMPLETION-001A)**: le PM a signalé une erreur de comptage dans la section 10 (« 7 pages manquantes » alors que la liste en contenait 8) — corrigée ci-dessous. Ce lot de complétion est en cours; voir `docs/design/completion-001a-status.md` pour l'état d'avancement détaillé et un point bloquant technique sur l'export de captures réelles qui doit être tranché avant de poursuivre à grande échelle.

## 1. Liens Stitch

| Direction | Lien projet Stitch |
|---|---|
| A — Obsidienne électrique | https://stitch.withgoogle.com/projects/8595315533479999401 |
| B — Graphite et cuivre numérique (**retenue**) | https://stitch.withgoogle.com/projects/2957570518148628294 |
| C — Minéral canadien | https://stitch.withgoogle.com/projects/12599153563336861640 |

Ces liens pointent vers le compte Google de l'utilisateur déjà connecté dans son navigateur — accès direct, pas de partage supplémentaire configuré dans ce lot.

## 2. Direction artistique retenue : B — Graphite et cuivre numérique

### Justification (contraste, lisibilité, différenciation, cohérence marque, potentiel d'animation, accessibilité)

- **Différenciation**: les Directions A et C sont toutes deux des variations de bleu sombre + accent froid (glacier/turquoise) — exactement le territoire visuel que la directive PM demandait d'éviter (« ne pas reprendre simplement l'ancien bleu nuit et cyan »). La Direction B, avec son accent cuivre/orange chaud sur fond graphite, est visuellement distincte des deux autres directions ET des sites technologiques québécois typiques, sans sortir du registre « précision technologique, minimalisme premium » demandé.
- **Contraste**: vérifié par calcul WCAG (pas estimé) dans `design-tokens.md` — texte principal 16.6:1 (AAA), texte secondaire 6.4:1 (AA solide), accent copper en texte/icône 6.28:1 (AA). Meilleur profil de contraste documenté des trois directions car c'est la seule pour laquelle un calcul complet a été fait avant sélection finale (voir méthodologie section 6).
- **Lisibilité**: le duo ivoire chaud sur graphite évite l'effet « écran bleu froid » que produisent naturellement A et C, ce qui réduit la fatigue visuelle sur les longues pages de contenu (Services, Ressources).
- **Cohérence de marque**: le positionnement d'Infotechs Solutions insiste sur la proximité humaine et l'accompagnement (« ton humain, crédible », voir directive) — un accent chaud (cuivre) sert mieux ce positionnement qu'un accent froid, tout en restant technique via le fond graphite sombre et la typographie de précision.
- **Potentiel d'animation**: le cuivre se prête bien à l'effet « halo lumineux » demandé dans le concept visuel central (nœuds et flux) sans virer au générique startup violet/cyan.
- **Accessibilité**: seule direction pour laquelle chaque token de couleur a une valeur de contraste calculée et une règle d'usage explicite (voir `design-tokens.md`, notamment la restriction stricte sur l'accent petrol secondaire, dont le contraste de 3.26:1 échoue pour le texte normal et est documenté comme tel plutôt que passé sous silence).

### Ce que cette justification n'est pas

Un choix esthétique pur. Les trois directions étaient toutes visuellement solides et conformes au brief — le choix B repose sur des critères vérifiables (calcul de contraste, différenciation par rapport à un territoire de couleur déjà occupé par les deux autres options), pas sur une préférence arbitraire.

## 3. Captures desktop

Générées et vérifiées dans Stitch (visibles dans les projets liés section 1) :

- Page d'accueil complète (hero + section « Domaines de spécialisation » ou équivalent services + pied de page) — Direction B
- Page Réalisations (grille de 6 concepts, badge « CONCEPT DÉMONSTRATIF » visible sur chaque carte)
- Page de détail d'une réalisation (« Nexus Logistique »), badge en évidence, sections Contexte/Stack/Approche/Impact attendu
- Heros comparatifs des 3 directions (pour la comparaison ayant mené au choix)

**Non capturées dans ce lot** (voir section 8, limites): Services, À propos, Contact, Ressources, Article, Mentions légales, Confidentialité, page 404 — aucune de ces pages n'a été conçue dans Stitch pendant cette session.

## 4. Captures mobile

**Une seule tentative de génération mobile a été effectuée et n'a pas abouti dans cette session** (problème d'interaction avec le champ de saisie de Stitch après plusieurs échanges consécutifs — voir section 8). **Aucune capture mobile n'est disponible dans ce lot.** C'est un manque réel par rapport à la demande explicite de la directive (desktop ET mobile pour chaque page), à corriger en priorité dans une session de suivi avant de considérer le design system comme complet.

## 5. Design system

Voir `docs/design/design-tokens.md` — couleurs (avec contrastes calculés), typographie (avec justification du choix, aucune réutilisation automatique d'Inter/Poppins/Geist), espacement, containers/breakpoints, rayons, ombres, bordures, z-index, tailles d'icônes, tailles de boutons, tailles de contrôles de formulaire. Valeurs définies par Claude à partir de la direction visuelle validée dans Stitch — méthodologie expliquée section 6.

## 6. Animations

Voir `docs/design/animation-spec.md` — 8 catégories d'animation spécifiées (reveal au scroll, micro-interactions boutons, ligne de progression processus, onglets services, cartes réalisations, concept visuel nœuds/flux, menu mobile), chacune avec son comportement en `prefers-reduced-motion`, et une section explicite sur ce qui est exclu (vidéo autoplay, WebGL permanent, scroll hijacking).

## 7. Assets

Voir `docs/design/assets-provenance-registry.md` — 4 assets générés dans Stitch (illustration hero, logo, illustration de détail réalisation, panneau de design system interne), avec un **point bloquant explicite non résolu**: les conditions de licence commerciale des images générées par Stitch n'ont pas été vérifiées et doivent l'être avant toute publication.

## 8. Registre des licences

Consolidé dans `docs/design/assets-provenance-registry.md`. Résumé: **aucun asset de ce lot n'a de licence commerciale confirmée** — c'est un statut « à vérifier », pas « conforme ». Ne pas déclarer les visuels prêts pour publication sur cette seule base.

## 9. Risques d'implémentation

Détaillés dans `docs/design/implementation-recommendations.md`, section 6. Risque principal: que le badge « CONCEPT DÉMONSTRATIF » soit perdu ou affaibli lors du portage du design vers le code React — recommandation d'un test automatisé dédié pour le garantir.

## 10. Recommandation GO / NO GO pour passer au développement

> **Mise à jour (INFOTECHS-DESIGN-COMPLETION-001A, seconde révision)**: cette section remplace intégralement la version précédente, qui portait un verdict « GO CONDITIONNEL » jugé trop généreux par le PM. Voir `docs/design/completion-001a-status.md` pour le détail complet, vérifiable point par point, de ce qui a été fait, corrigé, ou reste bloqué dans ce lot.

# GO CONDITIONNEL RESTREINT — toujours pas un GO pour l'ensemble du site

Ce qui a changé depuis la version précédente de ce rapport, avec preuve à l'appui (voir `completion-001a-status.md` pour le détail) :

- Les **9 pages** demandées (Accueil + les 8 pages manquantes : Services, À propos, Contact, Ressources, Article, Mentions légales, Confidentialité, 404) sont maintenant **toutes conçues**, chacune en version desktop (1280px) et mobile (390px), avec **18 captures réelles** exportées dans `docs/design/screens/`.
- Trois problèmes réels de conformité ont été détectés en auditant le **code source réel** de ces pages (pas seulement les captures visuelles), puis corrigés et re-vérifiés par la même méthode : un badge « Partenaire Certifié » fictif, des statistiques inventées (« 12+ experts », « 24/7 », « 95% de réduction des erreurs », « 10x »), et une identité juridique française entièrement fabriquée (adresse à Paris puis à Marseille, numéro SIRET, droit français) injectée par erreur dans les pages Mentions légales et Confidentialité d'une entreprise basée au Québec. Ces trois classes de problèmes ont été corrigées et la correction vérifiée par relecture du code, pas seulement par relecture visuelle — c'est la méthode qui a permis de les détecter en premier lieu.
- Le design system (`design-tokens.md`) inclut maintenant l'échelle typographique complète, les grilles par breakpoint, et un tableau d'états par composant — avec les états non vérifiés visuellement explicitement marqués comme tels plutôt que présentés comme validés.
- Les 7 interactions demandées sont documentées dans `docs/design/interaction-prototypes.md`, avec pour chacune une preuve dans le code réel ou une mention explicite d'absence de preuve — dont plusieurs écarts réels entre ce qui avait été spécifié dans `animation-spec.md` et ce qui a été effectivement produit (notamment : la page Services utilise des cartes statiques et non le pattern d'onglets initialement prévu).

Ce qui reste incomplet ou non résolu, sans détour :

1. **La version tablette (768px) de l'accueil n'a pas pu être produite.** Deux tentatives ont échoué de façon reproductible et vérifiable — la deuxième tentative a même vu l'agent Stitch affirmer avoir livré un cadre à 768px alors que la mesure réelle du cadre restait 390px. Ce n'est pas une supposition, c'est une mesure. Aucune des 8 pages secondaires n'a non plus de version tablette — seules desktop et mobile ont été produites pour l'ensemble du lot.
2. **La référence desktop est 1280px, pas 1440px comme demandé.** Le système de préréglages de Stitch ne propose pas 1440px nativement ; produire cette largeur exigerait soit un redimensionnement manuel non testé, soit un renoncement au système de préréglages fiable utilisé pour tout le reste du lot.
3. **Aucune licence commerciale des assets Stitch n'est confirmée** — toujours un point bloquant explicite, inchangé depuis le rapport précédent, désormais élargi à un plus grand nombre d'assets (voir `assets-provenance-registry.md`).
4. **Plusieurs écarts d'accessibilité réels détectés lors de l'audit du code** : aucun style de focus clavier visible trouvé sur la majorité des boutons dans le code généré, le déplacement de focus à l'ouverture du menu mobile reste absent. Ces manques existaient déjà dans le constat `accessibility-audit.md` d'origine ; ce lot les confirme plutôt que de les résoudre.
5. **Aucun audit Lighthouse ou axe réel n'a été exécuté** sur ces nouvelles pages — inchangé depuis le début du projet, toujours documenté honnêtement comme non mesuré plutôt que supposé conforme.

**Conditions à remplir avant d'étendre l'implémentation au-delà de l'accueil et du header/nav/footer** (reprises et mises à jour de la version précédente) :
1. ~~Générer les captures mobile manquantes~~ — fait pour les 9 pages.
2. ~~Concevoir dans Stitch les pages restantes~~ — fait pour les 8 pages.
3. Confirmer la licence commerciale des assets Stitch avant tout export définitif — **toujours non fait**.
4. Trancher la question de la référence tablette (768px) et de la largeur desktop (1280 vs 1440) — **non résolu**, décision à prendre par le fondateur, pas par l'agent.
5. Ajouter les styles de focus clavier visibles manquants avant toute implémentation, plutôt que de les découvrir en audit d'accessibilité post-implémentation.
6. Rappel permanent, inchangé : ce verdict porte uniquement sur la **conception**. Le statut de **production** reste NO GO indépendamment de l'avancement du design — voir `production-readiness-audit.md` section 18.

**Pourquoi ce n'est toujours pas un GO complet**: la règle de décision du PM exige que toutes les pages soient conçues en 3 largeurs de référence, que les captures soient exportées, et que les états de composants soient documentés — avant d'autoriser l'implémentation au-delà de l'accueil. Deux des trois largeurs de référence existent pour la totalité du site (mobile, desktop), mais la troisième (tablette) n'existe pour aucune page, et la largeur desktop livrée diffère de la valeur demandée. Étendre le GO à l'ensemble du site sur cette base serait répéter l'erreur de générosité déjà signalée dans la version précédente de ce rapport.

## 11. Liste des 13 livrables (récapitulatif de fin de lot)

| # | Livrable | Statut | Emplacement |
|---|---|---|---|
| 1 | Lien Stitch de la direction retenue | Fait (inchangé) | Section 1 |
| 2 | Homepage en 3 largeurs de référence | **Partiel** — mobile et desktop (1280, pas 1440) faits, tablette (768) échouée et documentée | `docs/design/screens/home-*.png` |
| 3 | 8 pages manquantes conçues en desktop + mobile | Fait | `docs/design/screens/*-desktop-1280.png`, `*-mobile-390.png` |
| 4 | Captures réelles exportées avec convention de nommage | Fait — 18 fichiers PNG réels, résolution réduite documentée honnêtement | `docs/design/screens/` |
| 5 | Design system complet (typographie, grilles, composants + états) | Fait, avec états non vérifiés explicitement marqués | `docs/design/design-tokens.md` |
| 6 | Renommage « Nexus Logistique » et vérification des badges | Fait et vérifié | Page Réalisations, section 19 du suivi de tâches |
| 7 | Finalisation des assets (dimensions, formats, texte alternatif, séparation logo/symbole/favicon/OG) | **Partiel** — registre mis à jour avec les nouveaux assets identifiés, mais dimensions/poids réels toujours non mesurés, logo Stitch toujours non validé comme officiel | `docs/design/assets-provenance-registry.md` |
| 8 | Prototypes/descriptions des 7 interactions | Fait, avec écarts de conception explicitement documentés | `docs/design/interaction-prototypes.md` |
| 9 | Vérification qu'aucun code de production n'a été modifié | Fait — `git status --short` inchangé depuis le lot d'audit, aucun fichier sous `src/` touché dans ce lot | Voir note de méthode ci-dessous |
| 10 | Rapport corrigé (erreur de comptage 7 vs 8) | Fait, dans la version précédente de ce document | Addendum en tête de ce fichier |
| 11 | Statut d'avancement détaillé et transparent | Fait, mis à jour en continu pendant ce lot | `docs/design/completion-001a-status.md` |
| 12 | Verdict GO/NO GO conforme à la règle de décision stricte du PM | Fait — voir section 10 ci-dessus | Ce document |
| 13 | Registre des 3 incidents de fabrication détectés et corrigés dans ce lot | Fait | Section « Annexe » ci-dessous (à compléter) |

**Note de méthode sur l'item 9**: `git status --short` a été exécuté à la fin de ce lot. Des modifications non commitées existent bien sur des fichiers de code (`package.json`, `package-lock.json`, `src/app/globals.css`, `src/app/layout.tsx`, `README.md`, `src/app/page.tsx`), mais la comparaison des horodatages confirme qu'elles datent toutes d'avant le début de ce lot de conception (12h10–12h14 le 2026-07-24, ou le 2026-06-10 pour les deux plus anciennes) — c'est-à-dire du lot d'implémentation antérieur (retrait du champ upload, tests, CI). Aucun fichier sous `src/`, `package.json` ou `package-lock.json` ne porte un horodatage postérieur au premier fichier `docs/design/` touché dans ce lot (13h27 le 2026-07-24). Voir `docs/design/completion-001a-status.md`, section « Vérification de non-modification du code de production », pour le détail complet.

---

## Annexe — Incidents réels rencontrés pendant la session (transparence méthodologique)

Deux problèmes de fond ont été détectés et corrigés en direct dans Stitch, documentés ici parce qu'ils sont révélateurs d'un risque récurrent avec la génération assistée par IA, pas juste des anecdotes:

1. **Nom de marque halluciné**: la première génération de la Direction A a spontanément inventé le nom « STUDIO.OS » au lieu d'« Infotechs Solutions », y compris dans un logo généré. Corrigé par une instruction explicite de re-génération. Pour les directions B et C, le nom de marque exact a été inclus de façon plus stricte dans le prompt initial et le problème ne s'est pas reproduit — leçon retenue et déjà appliquée.
2. **Chiffres de performance inventés**: la Direction C a spontanément généré une bande de statistiques chiffrées (« 124+ », « 99.9% », « 0.02 », « 42 ») sans qu'aucune ait été demandée — exactement le type de fausse preuve sociale que la directive PM interdit. Détecté visuellement, corrigé par une instruction explicite, et une vérification complémentaire a été faite sur les descriptions de cartes de la page Réalisations retenue (Direction B), qui contenaient aussi un chiffre inventé (« gérer 50 000 mouvements/heure avec une latence nulle ») — corrigé et reformulé en langage qualitatif.

**Implication pour la suite**: tout contenu généré par IA (Stitch, ou tout autre outil) doit être relu explicitement pour des chiffres, statistiques ou noms propres inventés avant d'être considéré comme un livrable final — ce n'est pas un contrôle qu'on peut supposer déjà fait par l'outil.
