# Baseline — INFOTECHS-DESIGN-IMPLEMENTATION-002A

Capturé le 2026-07-24, avant toute modification de code de ce lot.

## SHA et statut Git au démarrage

```
git rev-parse HEAD : 24c847d4462bb611a8379502314cbbea2be488a2
git branch --show-current : master
node --version : v22.22.3
npm --version : 10.9.8
```

`git status --short` au démarrage (avant ce lot) :

```
 M README.md
 M package-lock.json
 M package.json
 M src/app/globals.css
 M src/app/layout.tsx
 M src/app/page.tsx
?? .github/
?? docs/
?? public/images/
?? screenshots/
?? src/app/a-propos/
?? src/app/api/
?? src/app/confidentialite/
?? src/app/contact/
?? src/app/mentions-legales/
?? src/app/realisations/
?? src/app/ressources/
?? src/app/robots.ts
?? src/app/services/
?? src/app/sitemap.ts
?? src/components/
?? src/lib/
?? vitest.config.ts
```

**Origine de ces modifications — aucune n'appartient à ce lot.** Comparaison d'horodatage déjà effectuée lors du lot 001A : `package.json`, `package-lock.json`, `src/app/globals.css`, `src/app/layout.tsx` datent du 2026-07-24 12h10–12h14 (lot d'audit antérieur : retrait du champ upload, ajout des tests, ajout du CI — tâches #9–#11). `README.md` et `src/app/page.tsx` datent du 2026-06-10 (commit initial jamais réintégré). Les répertoires non suivis (`docs/`, `public/images/`, `screenshots/`, toutes les pages sous `src/app/`, `src/components/`, `src/lib/`) sont le produit cumulé de tous les lots précédents (audit de préparation + conception 001A). Rien de tout cela n'est modifié par ce document ni par le début du lot 002A.

## Procédure de restauration

Aucun commit n'a été créé dans ce lot ni dans les précédents (protocole du projet : pas de commit sans autorisation explicite). L'état du dépôt reste entièrement restaurable :

- Retour à l'état du dernier commit réel : `git checkout -- <fichier>` par fichier, ou `git reset --hard 24c847d4462bb611a8379502314cbbea2be488a2` pour tout le dépôt suivi (⚠️ ceci supprimerait aussi les modifications légitimes des lots précédents sur `package.json`/`globals.css`/`layout.tsx`, pas seulement celles de ce lot — à ne faire qu'en connaissance de cause).
- Les fichiers non suivis (`docs/`, `src/components/`, etc.) ne sont pas affectés par `git reset` — ils resteraient présents même après un reset dur, puisqu'ils n'ont jamais été ajoutés à l'index.
- Aucun mécanisme de sauvegarde automatique n'existe au-delà de Git lui-même. Recommandation avant de poursuivre : un commit unique capturant l'état actuel (avant 002A) permettrait un point de retour propre — **à autoriser explicitement si souhaité**, ce document ne le fait pas de sa propre initiative.

## Fichiers que ce lot prévoit de modifier ou créer

- `src/app/globals.css` — ajout/consolidation des tokens (ou nouveau `src/styles/tokens.css` importé depuis `globals.css`, décision documentée dans la section tokens du rapport final)
- `src/app/layout.tsx` — polices (`next/font`), classes de thème
- `src/components/site-header.tsx` — refonte graphite/cuivre, focus management complet
- `src/components/site-footer.tsx` — refonte graphite/cuivre
- Nouveau : `src/components/badge-concept.tsx`
- Nouveau : `src/app/fondations/page.tsx` (page de démonstration interne, nom à confirmer)
- Nouveaux fichiers de test sous `src/components/__tests__/` ou `src/lib/__tests__/`
- `package.json` / `package-lock.json` — voir constat ci-dessous, correction nécessaire indépendante du contenu visuel de ce lot

## Constat critique découvert pendant la baseline — divergence `node_modules`

**`npm run test` échoue au tout début de ce lot, avant toute modification** : `vitest`, `vite` et `vite-tsconfig-paths` sont déclarés dans `package.json` (ajoutés lors du lot d'audit précédent, tâche #10) mais **absents de `node_modules`** sur ce point de montage. `npm ls vitest --depth=0` confirme `(empty)`.

**`npm install` ne peut pas réparer cela sur le point de montage Windows** (`C:\Users\paulq\Downloads\Projets\Infotechs Solutions`) : la commande échoue de façon reproductible avec :

```
npm error code ENOTEMPTY
npm error syscall rename
npm error path .../node_modules/@unrs/resolver-binding-wasm32-wasi
npm error dest .../node_modules/@unrs/.resolver-binding-wasm32-wasi-aVQbB97s
```

C'est la même classe de limitation déjà documentée lors du lot de conception 001A (impossibilité de `rm`/renommer certains fichiers sur ce point de montage) — pas un problème introduit par ce lot.

**`npm run build` échoue également sur ce point de montage**, de façon reproductible sur deux tentatives distinctes :

```
> next build
Bus error (core dumped)
```

Le compilateur natif de Next.js (SWC, un binaire Rust) plante lors d'opérations mémoire (`mmap`) incompatibles avec ce point de montage réseau/virtualisé — même famille de cause que l'échec de Chromium headless documenté lors du lot 001A (bibliothèques/opérations natives incompatibles avec ce sandbox, sans lien avec la qualité du code).

**Solution appliquée pour ce lot** : une copie miroir du projet a été créée sur un système de fichiers natif du sandbox (`$HOME/verify-infotechs`, ext4, hors du point de montage Windows), avec un `npm install` complet exécuté là. Résultat, **avant toute modification de code de ce lot** :

```
npm run lint   → 0 problème (sur le point de montage Windows, ~40s, fonctionne normalement)
npm run test   → 21 tests passés (3 fichiers) — vérifié sur la copie miroir uniquement
npm run build  → succès, 29 pages statiques générées, ~10s — vérifié sur la copie miroir uniquement
```

Le code du dépôt est donc sain. Le problème est strictement environnemental (ce sandbox, ce point de montage), pas applicatif. **Toutes les vérifications lint/test/build de ce lot seront donc effectuées sur cette copie miroir native**, avec synchronisation systématique des fichiers modifiés depuis le point de montage réel avant chaque vérification — le point de montage reste la seule source de vérité pour les fichiers eux-mêmes, la copie miroir ne sert qu'à l'exécution.

**Recommandation indépendante de ce lot** : sur la machine réelle de l'utilisateur (hors sandbox), `npm install` puis `npm run build` devraient être exécutés une fois pour confirmer que `package-lock.json` est cohérent avec `node_modules` local — le `package-lock.json` actuellement suivi par Git a été modifié par une installation antérieure possiblement interrompue par la même classe de problème (il apparaît déjà comme modifié dans `git status` avant ce lot). Ce n'est pas bloquant pour ce lot puisque la copie miroir contourne le problème pour la vérification, mais mérite d'être assaini avant une mise en production réelle.
