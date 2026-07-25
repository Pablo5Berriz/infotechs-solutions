# Recommandations d'implémentation Next.js

**Rappel obligatoire**: ce document est une recommandation de conception. Aucun code de production n'a été modifié dans ce lot (directive PM INFOTECHS-DESIGN-REDESIGN-001, « MODIFICATION DU CODE EXISTANT : INTERDITE DANS CE LOT »). L'implémentation réelle nécessite la directive `INFOTECHS-DESIGN-IMPLEMENTATION-002`.

## 1. Compatibilité avec l'architecture existante — vérifiée

La direction retenue ne remet en cause aucune décision d'architecture déjà prise:

- **Next.js hybride SSG + route API serveur**: aucun changement. Les nouvelles pages (Réalisations, détail réalisation, etc.) restent des pages statiques/SSG comme aujourd'hui — rien dans la refonte visuelle ne nécessite de rendu serveur additionnel.
- **VPS/Proxmox + Traefik**: aucun changement — la refonte est purement front-end (composants React, CSS, assets), n'introduit aucune nouvelle dépendance serveur.
- **Formulaire de contact en mode démonstration**: préservé explicitement (voir directive section 12) — aucun changement de comportement, seulement de présentation visuelle.

## 2. Stack technique — pas de nouvelle dépendance lourde requise

| Besoin | Solution recommandée | Nouvelle dépendance ? |
|---|---|---|
| Animations de reveal, transitions | `framer-motion` | Non — déjà dans `package.json` |
| Onglets accessibles (section Services) | Implémentation manuelle avec `role="tablist"` (pattern déjà utilisé dans `project-filter.tsx`) | Non |
| Polices variables (Hanken Grotesk, Public Sans, JetBrains Mono) | `next/font/google` (déjà utilisé pour Geist actuellement) | Non — remplacement direct dans `layout.tsx` |
| Ligne de progression au scroll | `framer-motion` (`useScroll`, `useTransform`) | Non |
| Badge « CONCEPT DÉMONSTRATIF » | Composant React simple, pas de bibliothèque | Non |

**Aucune nouvelle dépendance npm n'est nécessaire pour implémenter cette direction.** C'est un point positif pour la maintenabilité et pour éviter de rouvrir un audit de sécurité des dépendances (voir `production-readiness-audit.md` section 1.3, qui a déjà identifié des vulnérabilités sur Next.js à corriger avant tout ajout de surface supplémentaire).

## 3. Structure de fichiers recommandée

```
src/
  styles/
    tokens.css          # Variables CSS générées depuis design-tokens.md
  components/
    ui/
      badge-concept.tsx  # Badge "CONCEPT DÉMONSTRATIF" réutilisable
      tabs.tsx           # Composant onglets accessible réutilisable
    home/
      hero.tsx
      process-timeline.tsx
```

Cohérent avec la structure `src/components/` existante — pas de réorganisation majeure requise.

## 4. Tokens : CSS custom properties, pas un nouveau système

Recommandation: traduire `design-tokens.md` en variables CSS natives dans `globals.css` (le projet utilise déjà Tailwind v4, qui supporte nativement `@theme` avec des custom properties — voir `globals.css` existant qui a déjà `@theme inline`). Pas besoin d'un système de design tokens externe (Style Dictionary, etc.) pour un site de cette taille — la sur-ingénierie serait contre-productive ici.

```css
@theme inline {
  --color-bg-950: #121316;
  --color-bg-900: #1C1E22;
  --color-text-100: #F4F1EA;
  --color-accent-copper-500: #E2793D;
  /* etc. — voir design-tokens.md pour la liste complète */
}
```

## 5. Ordre d'implémentation recommandé (repris et affiné de la recommandation de pilotage du PM)

1. **Design tokens et fondations** — variables CSS, polices, échelle d'espacement. Aucun changement visible tant que les composants ne les consomment pas.
2. **Header, navigation et footer** — surface réduite, haut risque si cassé (présent sur toutes les pages), bon premier test de la nouvelle direction en conditions réelles.
3. **Page d'accueil** — le hero et les sections déjà conçues dans Stitch servent de référence directe.
4. **Services** — inclut le composant onglets, complexité accessibilité la plus élevée de ce lot.
5. **Réalisations** — inclut le badge « CONCEPT DÉMONSTRATIF », point de vigilance légale/éthique le plus important du site.
6. **Contact et pages juridiques** — **rester en mode démonstration**, aucun changement de comportement du formulaire (rappel directive section 12).
7. **Animations** — activées progressivement par section, chacune testée pour `prefers-reduced-motion` avant de passer à la suivante.
8. **Responsive** — vérification systématique mobile/tablette/desktop pour chaque page déjà migrée, pas seulement à la fin.
9. **Performance et accessibilité** — audit Lighthouse/axe réel obligatoire avant GO (voir section 10 de la directive et `accessibility-audit.md`/`performance-audit.md` existants qui n'ont toujours aucune mesure réelle).
10. **Validation finale** — comparaison avant/après, décision GO/NO GO argumentée par un humain.

## 6. Risques d'implémentation identifiés

| Risque | Sévérité | Mitigation |
|---|---|---|
| Le badge « CONCEPT DÉMONSTRATIF » est omis ou rendu peu visible lors du portage du design vers le code | Élevée — c'est le point de conformité le plus sensible du site (fausses preuves sociales) | Écrire un test automatisé (Vitest + Testing Library) qui vérifie la présence du badge dans le DOM rendu de chaque carte de réalisation, sur le modèle des tests déjà ajoutés dans `production-readiness-audit.md` section 10 |
| Nouvelle palette introduit des combinaisons de contraste non vérifiées ailleurs que dans les tokens documentés (ex: texte petrol sur fond clair non prévu) | Moyenne | Restreindre strictement l'usage de `color.accent.petrol.500` aux cas documentés dans `design-tokens.md` ; revue de code obligatoire sur tout nouvel usage de couleur hors tokens définis |
| Régression de performance si l'animation du concept visuel (nœuds/flux) est activée sans mesure | Moyenne | Garder cette animation désactivée par défaut jusqu'à mesure Lighthouse réelle (déjà spécifié dans `animation-spec.md` section 6) |
| Dérive entre le design Stitch (référence visuelle) et l'implémentation réelle au fil des lots | Faible à moyenne sur un projet de cette taille, mais réelle sur plusieurs lots successifs | Conserver les liens Stitch actifs comme référence de comparaison avant/après à chaque lot (section 19 du rapport final) |
| Licence des assets Stitch non confirmée au moment de la mise en production | Élevée si non résolue avant lancement | Voir `assets-provenance-registry.md` — bloquant explicite avant publication commerciale |

## 7. Ce que ce document ne couvre pas

Aucun composant React n'a été écrit. Ce document précise l'approche technique attendue, pas une implémentation livrée — conformément au périmètre strict de ce lot de conception.
