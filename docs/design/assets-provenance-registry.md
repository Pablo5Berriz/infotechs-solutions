# Registre de provenance des assets — Refonte Stitch

Tous les visuels ci-dessous ont été générés dans Stitch (outil Google, génération d'images par IA intégrée) le 2026-07-24, dans la session de conception documentée par `docs/design/stitch-design-report.md`. Aucun asset de l'ancien registre (`docs/assets-registry.md`, notamment le hero PNG à provenance inconnue) n'a été réutilisé, conformément à la directive PM section 11.

## Statut légal — à confirmer avant usage commercial définitif

**Important, à vérifier par le fondateur avant publication**: les images générées par l'outil Stitch de Google sont produites via un modèle de génération d'images propriétaire de Google. Les conditions d'utilisation commerciale exactes (droits accordés au compte utilisateur, restrictions éventuelles, indemnisation) dépendent des conditions de service de Stitch/Google en vigueur au moment de la génération et n'ont **pas** été vérifiées dans ce lot — ce n'est pas une compétence que l'agent peut certifier. Recommandation: consulter les conditions d'utilisation actuelles de Stitch (stitch.withgoogle.com) avant toute publication commerciale des visuels ci-dessous, ou les remplacer par des assets sous licence commerciale explicitement vérifiée (banque d'images payante, illustration commandée, ou génération via un service dont les conditions commerciales sont confirmées).

## Registre

| Nom | Origine | Outil | Date | Licence | Usage commercial | Dimensions | Format | Poids | Texte alternatif prévu | Usage |
|---|---|---|---|---|---|---|---|---|---|---|
| Illustration hero « nœuds et flux lumineux » (concept propriétaire) | Générée par IA (Stitch) à partir d'un prompt décrivant le concept visuel propriétaire d'Infotechs Solutions | Stitch (Google) | 2026-07-24 | **Non confirmée** — voir note légale ci-dessus | **À vérifier avant publication** | Variable selon export (à re-exporter en haute résolution depuis Stitch avant implémentation) | PNG (source Stitch) → à convertir en WebP/AVIF à l'implémentation | Non mesuré (pas encore exporté en résolution finale) | « Illustration abstraite d'un réseau de nœuds et de flux lumineux évoquant une infrastructure numérique » (à ajuster selon le rendu final) | Fond du hero, page d'accueil |
| Logo « Infotechs Solutions » (monogramme IS) | Généré par IA (Stitch), corrigé après une première tentative erronée qui utilisait un nom de marque fictif | Stitch (Google) | 2026-07-24 | **Non confirmée** — voir note légale ci-dessus | **À vérifier avant publication** | Variable | PNG/SVG à exporter | Non mesuré | « Logo Infotechs Solutions » | Navigation, pied de page, favicon potentiel |
| Illustration « Nexus Logistique » (page détail réalisation) | Générée par IA (Stitch) pour illustrer un concept démonstratif de projet | Stitch (Google) | 2026-07-24 | **Non confirmée** | **À vérifier avant publication** | Variable | PNG | Non mesuré | « Visualisation conceptuelle d'un système d'automatisation logistique (concept démonstratif, non un mandat client réel) » | Page de détail réalisation |
| Panneau de design system (« Obsidian Technical » / palette et typographie) | Généré par Stitch comme sortie de travail interne | Stitch (Google) | 2026-07-24 | Usage interne uniquement — pas destiné à publication | N/A | Variable | PNG | Non mesuré | N/A (non publié) | Référence interne pour ce rapport uniquement, ne sera pas déployé sur le site |

## Ce qui reste à faire avant l'implémentation (item bloquant)

1. **Confirmer les conditions d'utilisation commerciale de Stitch** auprès du fondateur ou de la documentation officielle Google — ceci conditionne si les visuels ci-dessus peuvent être utilisés tels quels, ou doivent être régénérés/recommandés autrement.
2. **Ré-exporter chaque asset retenu en haute résolution** depuis le projet Stitch (bouton « Exporter » dans l'interface), puis les optimiser (compression, conversion WebP/AVIF) avant intégration — ne pas répéter l'erreur du hero PNG de 1,38 Mio identifiée dans l'audit précédent.
3. **Mesurer le poids final** de chaque asset après export et optimisation, et compléter les colonnes « Poids » de ce registre avec des chiffres réels.
4. **Rédiger le texte alternatif définitif** en fonction du rendu visuel final (les textes ci-dessus sont des propositions, pas des valeurs figées).

## Assets ajoutés lors du lot INFOTECHS-DESIGN-COMPLETION-001A

Identifiés par recherche exhaustive des URLs `lh3.googleusercontent.com` dans le code réel exporté des 9 pages produites (`docs/design/_stitch-source/*/code.html`). Comme pour le registre initial, aucune dimension finale ni poids n'a été mesuré à ce stade — ces valeurs devront être complétées après un export en haute résolution depuis Stitch, avant toute intégration au code de production.

| Nom | Origine | Outil | Date | Licence | Usage commercial | Texte alternatif proposé | Usage |
|---|---|---|---|---|---|---|---|
| Illustration « nœuds d'automatisation » | Générée par IA (Stitch), réutilisée à l'identique sur les pages Ressources et Article | Stitch (Google) | 2026-07-24 | **Non confirmée** — voir note légale en tête de ce document | **À vérifier avant publication** | « Illustration abstraite d'un réseau de nœuds représentant l'automatisation de flux de travail » | Carte article « Automatisation des flux de travail », hero de l'article détaillé |
| Illustration « infrastructure cloud » | Générée par IA (Stitch), réutilisée à l'identique sur les pages Ressources et Article | Stitch (Google) | 2026-07-24 | **Non confirmée** | **À vérifier avant publication** | « Illustration abstraite d'une architecture d'infrastructure cloud moderne » | Carte article « Architecture cloud moderne » |
| Illustration « grille de sécurité » | Générée par IA (Stitch), réutilisée à l'identique sur les pages Ressources et Article | Stitch (Google) | 2026-07-24 | **Non confirmée** | **À vérifier avant publication** | « Illustration abstraite d'une grille de sécurité technique » | Carte article « Bonnes pratiques de sécurité » |
| Image de fond — page Contact | Générée par IA (Stitch), spécifique à la page Contact | Stitch (Google) | 2026-07-24 | **Non confirmée** | **À vérifier avant publication** | À définir selon rendu final | Section hero ou latérale de la page Contact |

**Constat de réutilisation d'images entre pages**: les trois illustrations « nœuds / infrastructure / sécurité » sont exactement les mêmes fichiers (mêmes URL Stitch) sur la page Ressources (miniatures de la grille) et sur la page Article (image d'en-tête). C'est cohérent pour un modèle de carte lié à son article de détail, mais signifie qu'il n'existe que 3 illustrations éditoriales uniques pour l'ensemble des contenus de type Ressources — à enrichir si le nombre réel d'articles publiés dépasse 3, pour éviter la répétition visuelle.

## Ce qui n'a toujours pas été généré

Aucun visuel Open Graph dédié (distinct des heros de page), aucune icône de système d'icônes personnalisé (le projet utilise Material Symbols Outlined, une bibliothèque tierce, pas un système propriétaire), et aucun favicon distinct du logo n'ont été produits dans ce lot ni dans le précédent. Le logo Stitch reste non validé comme logo officiel — voir avertissement en tête de ce document, toujours applicable : **ne pas déclarer ce logo prêt pour production sans validation explicite du fondateur.**
