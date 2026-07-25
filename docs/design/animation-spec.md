# Spécification des animations — Direction retenue

Contraintes obligatoires de la directive PM (rappel, toutes respectées ci-dessous par construction): aucune animation ne doit empêcher la lecture, aucune boucle permanente de plus de quelques secondes, `prefers-reduced-motion` obligatoire, pas de vidéo lourde en autoplay, pas de WebGL si CSS/SVG suffit, pas de scroll hijacking, pas de contenu SEO caché derrière JS, fluide sur mobile moyen de gamme.

Le projet a déjà une base technique pour ceci : `framer-motion` est une dépendance existante du site (`package.json`), et `src/components/reveal.tsx` implémente déjà `useReducedMotion()` (corrigé dans le lot d'audit précédent — voir `production-readiness-audit.md` section 6). Toute nouvelle animation doit suivre ce même pattern, pas en introduire un nouveau.

## 1. Reveal au scroll (déjà existant, à réutiliser)

- **Implémentation**: `framer-motion`, `whileInView`, `viewport={{ once: true }}` — se déclenche une seule fois, jamais en boucle.
- **Durée**: 0.55s, easing `easeOut`.
- **Déplacement**: `y: 22px → 0`, opacité `0 → 1`.
- **Reduced motion**: rendu en `<div>` statique sans animation (déjà implémenté).
- **Usage dans la refonte**: sections de la page d'accueil (mission, services, processus, réalisations, CTA final), cartes de la grille Réalisations.

## 2. Micro-interactions sur boutons

- **Survol (desktop)**: transition `background-color` et `box-shadow` (halo `shadow.glow-copper`), durée 150ms, easing `ease-out`. Pas de changement de taille (évite le layout shift).
- **Focus clavier**: anneau visible 2px, couleur `color.accent.copper.500`, offset 2px — jamais seulement une couleur de fond (insuffisant pour les utilisateurs de clavier).
- **Actif/pressed**: légère réduction d'opacité (0.85), 100ms.
- **Reduced motion**: la transition de couleur reste (ce n'est pas un mouvement), le halo lumineux est supprimé (mouvement lumineux perçu comme animation).

## 3. Ligne de progression — section Processus (5 étapes)

- **Comportement**: une ligne verticale (desktop) ou horizontale (mobile) se remplit progressivement selon la position de scroll dans la section, en `framer-motion` `useScroll` + `useTransform` (pas de bibliothèque supplémentaire).
- **Contrainte scroll hijacking**: la ligne suit le scroll naturel de la page — le scroll de l'utilisateur n'est jamais intercepté, ralenti ou redirigé. Aucun `preventDefault` sur les événements de scroll.
- **Reduced motion**: la ligne s'affiche pleine directement (état final), sans animation de remplissage progressif.

## 4. Cartes de services — présentation interactive (section 3 de la directive)

Décision d'implémentation: **onglets (tabs) animés avec panneau de contenu**, plutôt que panneau latéral ou empilement au scroll — choix justifié ci-dessous.

- **Pourquoi pas « cartes empilées au scroll »**: techniquement plus proche du scroll hijacking si mal implémenté (nécessite souvent de piéger le scroll pour synchroniser l'empilement), risque de conflit avec la navigation clavier séquentielle.
- **Pourquoi pas « panneau latéral »**: pauvre sur mobile (répartition d'espace horizontal qui n'existe pas sur petit écran), nécessite une réadaptation complète du layout entre desktop et mobile.
- **Tabs animés**: pattern ARIA `tablist`/`tab`/`tabpanel` standard, déjà utilisé ailleurs dans le code existant (`src/components/project-filter.tsx` utilise déjà `role="tablist"`) — cohérence avec l'existant, accessible au clavier nativement (flèches gauche/droite pour naviguer entre onglets, `Tab` pour sortir), fonctionne identiquement sur mobile (simple liste d'onglets scrollable horizontalement) sans réécrire la logique.
- **Transition de contenu**: `AnimatePresence` de framer-motion, fondu croisé 200ms entre panneaux, pas de glissement complexe.
- **Reduced motion**: le changement de panneau est instantané (pas de fondu).

## 5. Section Réalisations — grille avec badge « CONCEPT DÉMONSTRATIF »

- **Survol de carte**: légère élévation (`shadow.sm → shadow.md`), translation `-4px` en Y, 200ms.
- **Badge « CONCEPT DÉMONSTRATIF »**: statique, jamais animé, jamais masqué au survol ou par une transition — il doit rester visible en permanence, y compris pendant les micro-interactions de la carte (contrainte issue de la directive PM section 9, et de la lacune identifiée dans l'audit précédent — `production-readiness-audit.md` section 9).
- **Reduced motion**: l'élévation au survol reste (translation supprimée, ombre conservée) car un changement d'ombre seul n'est pas considéré comme un mouvement au sens `prefers-reduced-motion`.

## 6. Concept visuel propriétaire (nœuds et flux lumineux)

Généré dans Stitch comme illustration statique (voir registre des assets). Pour la version implémentée:

- **Version statique (par défaut, y compris mobile bas de gamme)**: SVG ou image optimisée, aucune animation.
- **Version animée (desktop, si le budget de performance le permet après mesure réelle)**: lignes de connexion entre nœuds animées en `stroke-dashoffset` CSS (pas de WebGL, pas de Canvas permanent), boucle de 3 à 4 secondes maximum avec pause visuelle entre cycles (pas de boucle perçue comme infinie/hypnotique).
- **Condition stricte**: cette animation ne doit être activée qu'après un audit Lighthouse Performance réel confirmant que le budget TBT < 200ms reste respecté avec elle active (voir `performance-audit.md` existant — aucune mesure réelle disponible actuellement, donc cette animation reste **désactivée par défaut** tant que la mesure n'est pas faite).
- **Reduced motion**: version statique systématiquement.

## 7. Menu mobile

- **Ouverture/fermeture**: hauteur animée ou fondu, 200ms — pas de glissement complexe qui pourrait créer un flash de contenu non stylé sur mobile bas de gamme.
- **Focus**: à l'ouverture, le focus clavier doit se déplacer sur le premier lien du menu (non implémenté dans le code actuel — lacune identifiée dans `accessibility-audit.md` existant, à corriger dans le lot d'implémentation).
- **Reduced motion**: apparition/disparition instantanée.

## 8. Ce qui est explicitement exclu

- Aucune vidéo hero en autoplay (contrainte section 10 de la directive, et l'audit de performance précédent a déjà signalé le poids de l'ancien hero PNG comme problème — une vidéo serait pire).
- Aucun canvas WebGL permanent — tout le concept visuel « nœuds et flux » est réalisable en SVG/CSS, qui est plus léger, plus accessible (peut recevoir des attributs ARIA), et ne nécessite pas de fallback pour les appareils sans accélération graphique.
- Aucune animation contrôlée exclusivement par la position de scroll qui bloquerait le défilement naturel (scroll hijacking) — toutes les animations de scroll ci-dessus sont des animations *réactives* au scroll, jamais des animations qui *prennent le contrôle* du scroll.

## 9. Validation requise avant implémentation finale

Cette spécification est un plan, pas une mesure. Comme pour le reste du projet (voir `production-readiness-audit.md`), aucune animation ne doit être déclarée conforme au budget de performance sans un rapport Lighthouse réel après implémentation.
