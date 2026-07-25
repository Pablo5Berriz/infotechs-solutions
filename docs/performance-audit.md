# Audit de performance

**Statut: NON MESURÉ.** Aucun score Lighthouse Performance, aucun LCP/CLS/INP/TBT réel n'a été produit. Raison technique identique à `docs/accessibility-audit.md` section 1 (bibliothèques Chrome absentes, pas de droits root dans l'environnement d'audit). Ne pas déclarer la performance validée sur la base de ce document.

## 1. Budgets cibles (rappel, non mesurés)

```
LCP < 2,5 s
CLS < 0,1
INP < 200 ms
TBT < 200 ms (audit laboratoire)
Lighthouse Performance >= 90 (mobile)
Lighthouse Performance >= 95 (desktop)
```

## 2. Ce qui a été mesuré réellement (build, pas runtime)

Preuve directe de `npm run build` (voir `production-readiness-audit.md` section 1.3):

```
✓ Compiled successfully in 5.1-5.5s
✓ Generating static pages using 1 worker (29/29) in ~430ms
27 routes statiques/SSG, 1 route dynamique (/api/contact)
```

Le build Turbopack ne produit pas, dans la sortie capturée, de tableau First Load JS par route (format de sortie différent des versions précédentes de Next.js) — impossible d'affirmer une taille de bundle par page sans ré-instrumenter le build avec un flag d'analyse (`--profile` ou `@next/bundle-analyzer`, non installé, hors périmètre de ce lot).

## 3. Constat concret sur l'asset hero

`public/images/hero-technology-workspace.png`: **1717×916 px, 1,38 Mio (1 444 158 octets), PNG 8-bit non entrelacé.**

Le composant `next/image` est utilisé pour cette image (`src/app/page.tsx`), avec `priority` (chargement prioritaire, correct pour une image LCP probable) et dimensions explicites (`width={1536} height={1024}` déclarées dans les métadonnées OpenGraph, `width={1717}`/`height={916}`... — **incohérence trouvée**: la balise `<Image>` du hero utilise `width={1536} height={1024}`, alors que le fichier réel fait 1717×916. Next.js recadre/redimensionne à la volée via l'API d'optimisation d'image côté serveur, donc ceci ne casse rien visuellement, mais les dimensions annoncées dans le code ne correspondent pas au fichier source — à nettoyer pour éviter un `CLS` calculé sur un mauvais ratio d'aspect (1536:1024 = 1.5, réel 1717:916 ≈ 1.874 — ratio différent, risque réel de decalage visuel/CLS).

**Cette incohérence n'a pas été corrigée dans ce lot** (changer les dimensions affichées change potentiellement la mise en page visuelle du hero — nécessite une vérification visuelle humaine avant modification, pas un correctif mécanique sûr sans capture d'écran de référence).

L'optimisation réelle (compression, formats AVIF/WebP, redimensionnement responsive) dépend de l'API d'optimisation d'image de Next.js au moment de la requête, active uniquement en runtime serveur (cohérent avec la décision d'hébergement — `docs/architecture-decision-hosting.md`). **Non mesurée**: le poids réel transféré au visiteur après optimisation, faute de pouvoir démarrer le serveur avec un vrai navigateur pour le mesurer.

## 4. Ce qu'il reste à faire avant de déclarer un budget atteint

1. Corriger l'incohérence de dimensions de l'image hero (section 3) après vérification visuelle.
2. Exécuter `npm run build && npm run start`, puis `npx lighthouse http://localhost:3000 --preset=desktop` et `--preset=mobile` sur un poste ou une CI avec Chrome fonctionnel.
3. Renseigner ce document avec: score mobile, score desktop, LCP, CLS, TBT, poids total transféré, poids de l'image hero après optimisation, nombre de requêtes, et la liste des problèmes remontés par Lighthouse.
4. Si le score est sous la cible, prioriser: compression/format moderne de l'image source avant optimisation Next.js (1,38 Mio en entrée est élevé même après transcodage), et vérifier l'impact de `framer-motion` (bibliothèque non triviale) sur le bundle JS initial des pages qui l'utilisent (`Reveal` est utilisé sur la page d'accueil).

## 5. Verdict

**NON MESURÉ — aucune déclaration de performance ne peut être faite.**
