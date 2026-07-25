# Audit de préparation à la production — Infotechs Solutions

**Directive**: INFOTECHS-PROD-READINESS-001
**Date**: 2026-07-24
**Statut initial imposé**: V1 fonctionnelle locale, NON autorisée pour mise en production.

Ce document ne qualifie aucune affirmation de « validée » sans preuve technique reproduite ci-dessous. Toute case sans preuve est marquée **NON MESURÉ** ou **NON VALIDÉ**, pas « probablement correct ».

---

## 1. Baseline technique réelle

### 1.1 Environnement

```
node --version   → v22.22.3
npm --version    → 10.9.8
git rev-parse HEAD → 24c847d4462bb611a8379502314cbbea2be488a2 (inchangé — aucun commit créé dans ce lot)
```

`git status --short` au début du lot montrait un dépôt jamais entièrement committé après le scaffold initial: `README.md`, `package.json`, `package-lock.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` étaient modifiés (`M`), et la quasi-totalité du produit (`src/app/api`, `src/app/services`, `src/app/realisations`, `src/components`, `src/lib`, `public/images`, etc.) était non suivie (`??`). Autrement dit, **le site tel qu'audité n'a jamais eu de commit correspondant à son état actuel.** C'est un risque en soi (aucun historique, aucun point de retour) — voir section 11.

### 1.2 Environnement d'exécution — avertissement méthodologique important

`node_modules` fourni contenait des binaires natifs **Windows** (`@next/swc-win32-x64-msvc`). L'environnement d'audit est Linux. Un premier essai de `npm run lint` / `npm run build` directement sur le dossier monté a produit un **hang indéfini** (résolution de config ESLint) puis un **Bus error (core dumped)** au build — cause identifiée: chargement d'un binaire natif incompatible **et** mmap instable sur le point de montage réseau (dossier Windows monté dans un sandbox Linux, `/proc/self/fd/3` — passthrough FUSE, sans support fiable de `mmap(MAP_SHARED)` pour les `.node`).

**Correctif appliqué pour l'audit**: copie du code source (hors `node_modules`, `.git`, `.next`) vers un système de fichiers natif Linux, `npm install` propre, puis exécution de `lint`/`test`/`build` sur cette copie. Résultat: succès net et reproductible en quelques secondes. **Ceci confirme que le code lui-même est sain — le problème initial était 100 % environnemental (poste Windows vs cible Linux), pas applicatif.**

**Implication directe pour la décision d'hébergement**: ne jamais déployer `node_modules` copié depuis le poste de développement Windows. Le build de production doit **toujours** repartir d'un `npm ci` propre sur la cible Linux (CI ou VPS). Voir `docs/architecture-decision-hosting.md`.

### 1.3 Sorties brutes (obtenues sur copie Linux native, code strictement identique à celui du dossier de travail)

**`npm run lint`** (après nettoyage — voir section 10):
```
> infotechs-solutions@0.1.0 lint
> eslint

(exit code 0 — aucun avertissement, aucune erreur)
```

**`npm run test`** (suite ajoutée dans ce lot — voir section 10):
```
✓ src/lib/__tests__/contact-schema.test.ts (8 tests)
✓ src/lib/__tests__/data.test.ts (8 tests)
✓ src/lib/__tests__/schema-org.test.ts (5 tests)

Test Files  3 passed (3)
     Tests  21 passed (21)
(exit code 0)
```

**`npm run build`**:
```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 5.1-5.5s
✓ TypeScript: Finished in 3.0-3.3s (aucune erreur)
✓ Generating static pages using 1 worker (29/29)

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /a-propos
├ ƒ /api/contact          ← route dynamique, runtime serveur requis
├ ○ /confidentialite
├ ○ /contact
├ ○ /mentions-legales
├ ○ /realisations
├ ● /realisations/[slug]  (SSG, generateStaticParams — 6 pages)
├ ○ /ressources
├ ○ /robots.txt
├ ○ /services
├ ● /services/[slug]      (SSG, generateStaticParams — 9 pages)
└ ○ /sitemap.xml

(exit code 0)
```

**`npm audit --omit=dev`**:
```
next 9.3.4-canary.0 - 16.3.0-preview.7 — Severity: HIGH
  - Middleware/Proxy bypass in App Router (Turbopack + single locale) — GHSA-6gpp-xcg3-4w24
  - DoS in App Router using Server Actions — GHSA-m99w-x7hq-7vfj
  - SSRF in Server Actions on custom servers — GHSA-89xv-2m56-2m9x
  - Cache confusion of response bodies — GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q
  - Unbounded Server Action payload (Edge runtime) — GHSA-4c39-4ccg-62r3
  - SSRF via rewrites with attacker-controlled hostname — GHSA-p9j2-gv94-2wf4
  - DoS in Image Optimization API via SVG — GHSA-q8wf-6r8g-63ch
  - Unauthenticated disclosure of internal Server Function endpoints — GHSA-955p-x3mx-jcvp
postcss <=8.5.11 — Severity: HIGH (XSS via unescaped </style>, arbitrary file read via sourceMappingURL)
sharp <0.35.0 — Severity: HIGH (libvips CVEs)

3 high severity vulnerabilities (mode --omit=dev)
Fix disponible: next@16.2.11 (npm audit fix --force — hors plage stable déclarée dans package.json)
```

**Ceci est un bloquant réel.** Next.js 16.2.9 (actuellement épinglé) contient 8 avisos de sécurité haute sévérité connus, corrigés en 16.2.11. Ce n'est pas une question d'hygiène — plusieurs de ces failles touchent directement le périmètre exposé publiquement (App Router, Server Actions, rewrites, Image Optimization) que ce site utilise. **Recommandation: mettre à jour vers next@16.2.11 avant toute mise en ligne, avec re-test complet (lint/test/build) après la mise à jour.** Cette mise à jour n'a **pas** été appliquée dans ce lot car elle change une dépendance de production hors du périmètre strict de l'audit — elle doit être une décision explicite et testée séparément.

### 1.4 `package.json` / `next.config.ts` — faits, pas d'interprétation

- Next.js: **16.2.9**, mode Turbopack activé pour `build`/`dev`.
- `next.config.ts`: fichier vide (`const nextConfig: NextConfig = {}`). **Aucun `output: "export"`.** Le mode de rendu par défaut de Next.js (serveur Node) s'applique.
- Routes: 27 routes statiques ou SSG (`○`/`●`), **1 route dynamique serveur** (`ƒ /api/contact`).
- **Conclusion sans ambiguïté**: ce n'est PAS un site "entièrement statique". C'est une application Next.js hybride — pages pré-rendues (SSG) + une route API qui nécessite un runtime Node au moment de la requête. Un hébergement 100 % fichiers statiques (ex. simple CDN sans runtime) ne peut pas servir `/api/contact` tel quel.

---

## 2. Architecture de production

Voir `docs/architecture-decision-hosting.md` pour la décision complète. Résumé: **VPS/Proxmox + Node runtime + Traefik**, retenu précisément parce que `/api/contact` est une route serveur (section 1.4). Aucun export statique n'est possible sans supprimer cette route au préalable.

---

## 3. JSON-LD — état réel (meilleur que supposé)

Contrairement à l'hypothèse de départ, `src/app/layout.tsx` construisait **déjà** le schéma `LocalBusiness` de façon conditionnelle:

```ts
...(site.email ? { email: site.email } : {}),
...(site.phone ? { telephone: site.phone } : {}),
```

`site.email` et `site.phone` proviennent de `process.env.NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE`, tous deux **vides par défaut** dans `.env.example`. Donc, dans l'état actuel (aucune variable configurée), le JSON-LD publié **n'injecte aucun téléphone ni courriel placeholder.** Aucune chaîne comme « à venir » ou « à confirmer » n'était présente dans le JSON-LD.

**Points réels à corriger, malgré tout:**

1. Le type `LocalBusiness` est déclaré avec une adresse incomplète (`addressLocality`, `addressRegion`, `addressCountry` — pas de `streetAddress` ni `postalCode`). Schema.org tolère une adresse partielle, mais `LocalBusiness` implique une entreprise physiquement visitable; sans adresse complète ni preuve d'un établissement physique accessible au public, `Organization` est le type plus défendable tant que ce point n'est pas tranché par le fondateur.
2. `sameAs: []` (tableau vide) — n'est pas un placeholder au sens strict, mais n'apporte aucune valeur SEO et peut être omis complètement tant qu'aucun profil social/professionnel n'existe.

**Correctif appliqué dans ce lot** (refactorisation, pas de changement de comportement observable): extraction de la construction du schéma dans `src/lib/schema-org.ts` (`buildLocalBusinessSchema`) — fonction pure, testée (`src/lib/__tests__/schema-org.test.ts`, 5 tests), avec un garde `containsPlaceholderValue()` qui échoue si une chaîne placeholder (« à venir », « à confirmer », « tbd », « todo », « placeholder », « lorem ipsum ») apparaît dans le JSON-LD rendu. `layout.tsx` appelle maintenant cette fonction au lieu de dupliquer la logique inline.

**Décision requise du fondateur, non prise par l'agent**: `Organization` vs `LocalBusiness` vs `ProfessionalService`, et si une adresse postale complète doit être publiée.

---

## 4. Collecte réelle — déjà désactivée, à documenter formellement

Le formulaire (`src/components/contact-form.tsx`) ne transmet **rien** à `/api/contact`: `onSubmit` exécute un `setTimeout` local et un `console.info`, sans `fetch`. La route `/api/contact/route.ts` existe, valide via Zod, mais retourne systématiquement **501** avec le message *« Intégration fournisseur à activer avant mise en production »* tant que ni Resend ni Supabase ne sont configurés (aucun ne l'est — `.env.example` les liste tous deux comme `# Future`).

**Conclusion**: le formulaire est déjà, dans les faits, en mode démonstration. Le texte affiché à l'utilisateur le dit explicitement (*« Validation locale seulement: aucune demande n'est envoyée... »*). Ce point du plan PM est **déjà satisfait par le code existant** — aucun changement requis pour bloquer la collecte réelle. Ce qui manque: la documentation formelle des décisions de conformité (responsable du traitement, finalité, durée de conservation, sous-traitants) avant d'activer une intégration réelle. Voir `docs/privacy-data-flow.md`.

**Non-conformité mineure trouvée et corrigée**: le schéma Zod client dupliquait le schéma serveur (deux sources de vérité qui pouvaient diverger silencieusement). **Correctif appliqué**: schéma unique partagé dans `src/lib/contact-schema.ts`, importé par le formulaire et par la route API.

---

## 5. Téléversement de fichiers — retiré

Le champ `<input type="file">` existait dans le formulaire avec validation `z.any().optional()` — aucune limite de taille, aucune liste blanche MIME, et aucun traitement serveur (la route `/api/contact` ne consommait pas de `multipart/form-data`, seulement du JSON). Le champ était donc à la fois non sécurisé et non fonctionnel.

**Correctif appliqué**: champ retiré de `src/components/contact-form.tsx`, retiré du schéma partagé. Zéro upload possible dans la V1 publique. Il ne devra être réintroduit qu'après une décision explicite sur stockage, validation MIME réelle, quarantaine et rétention (checklist du plan PM, section 5).

---

## 6. Accessibilité — voir `docs/accessibility-audit.md`

Aucun audit Lighthouse ni axe n'a pu être exécuté avec des résultats chiffrés (raison technique documentée dans ce fichier: bibliothèques système Chrome manquantes, pas de droits root pour les installer). Revue de code manuelle effectuée et deux corrections appliquées (`prefers-reduced-motion` réel via `useReducedMotion` de framer-motion, `aria-invalid`/`aria-describedby`/`role="alert"` sur les champs du formulaire). **Statut: NON VALIDÉ** — un audit Lighthouse/axe réel doit être exécuté (poste local ou CI) avant toute déclaration de conformité.

---

## 7. Performance — voir `docs/performance-audit.md`

**NON MESURÉ.** Mêmes contraintes d'environnement que la section 6. Budgets cibles documentés, aucune mesure LCP/CLS/INP/TBT disponible.

---

## 8. Affirmations commerciales — classification réelle

| Affirmation | Emplacement | Classification | Action |
|---|---|---|---|
| « 90+ / Objectif Lighthouse » | Hero, page d'accueil | **OBJECTIF INTERNE** — déjà étiqueté « Objectif », pas présenté comme un résultat obtenu | Aucune action requise ; formulation déjà correcte |
| « FR / Architecture multilingue » | Hero, page d'accueil | **OBJECTIF INTERNE** — n'affirme pas qu'une version anglaise existe | Aucune action requise |
| « +38 % de demandes en ligne simulées » | Étude de cas « Garage local » | **EXEMPLE DÉMONSTRATIF** — le mot « simulées » est déjà présent dans le texte | Conserver le mot « simulées », voir recommandation ci-dessous |
| « Temps de chargement sous 1,5 s » (projet garage) | Étude de cas | **EXEMPLE DÉMONSTRATIF** non mesuré sur un vrai site | Renforcer le contexte — voir ci-dessous |
| Tous les résultats de `src/lib/data.ts → projects[].results` | Pages réalisations | **EXEMPLE DÉMONSTRATIF** — section déjà titrée « Résultats attendus », pas « résultats obtenus » | Formulation déjà correcte au niveau du titre de section |
| Aucun faux témoignage, faux logo client trouvé | — | — | Rien à supprimre |

**Nuance importante par rapport à l'hypothèse de départ**: le code n'affiche nulle part un chiffre comme un résultat déjà obtenu sans le qualifier (« objectif », « attendus », « simulées »). Le risque n'est donc pas des affirmations mensongères non étiquetées, mais un risque de **clarté insuffisante pour un visiteur pressé** qui ne lit pas les qualificatifs. Recommandation: renforcer visuellement (pas seulement textuellement) la distinction, via le badge de la section 9.

---

## 9. Concept démonstratif — état réel et lacune trouvée

- Page `/realisations`: le texte d'intro dit déjà explicitement *« Ces réalisations sont des concepts démonstratifs, non des mandats clients publiés »*.
- Page `/realisations/[slug]`: le hero affiche déjà *« Concept démonstratif: cette page présente un exemple de mandat possible, pas une réalisation client publiée »*.
- **Lacune réelle**: les cartes de la grille (`src/components/project-filter.tsx`) et les cartes teaser de la page d'accueil (`src/app/page.tsx`) n'affichent **aucune mention « concept démonstratif »** au niveau de la carte elle-même — seulement une étiquette de catégorie (ex. « Site web »). Un visiteur qui ne lit que la grille, sans lire le texte d'intro au-dessus, peut manquer la mention.

**Non corrigé dans ce lot** (nécessite une décision de design visuelle, pas seulement du texte, pour rester cohérent avec le reste du système de composants — recommandé pour le prochain lot UI, pas un correctif mécanique sûr à faire sans revue visuelle).

---

## 10. Tests automatisés — ajoutés dans ce lot

Framework: **Vitest 3.2** (léger, compatible ESM/TypeScript natif, aucune dépendance sur un navigateur pour ces tests). Fichiers ajoutés:

- `src/lib/__tests__/contact-schema.test.ts` — 8 tests: payload valide, champs optionnels, rejet email invalide, rejet message trop court, rejet nom manquant, rejet des sélecteurs vides, **confirmation qu'aucun champ `file` n'existe dans le schéma**, non-crash sur un champ inconnu.
- `src/lib/__tests__/schema-org.test.ts` — 5 tests: omission email/téléphone si non configurés, inclusion si configurés, **absence de valeur placeholder dans les deux cas**, détection positive d'un placeholder injecté volontairement (garde de non-régression), présence de `@context`/`@type`.
- `src/lib/__tests__/data.test.ts` — 8 tests: unicité des slugs `services`, unicité des slugs `projects`, unicité des slugs `resources`, format kebab-case, présence des champs requis par les routes dynamiques (`generateStaticParams`), absence de collision de slugs entre `services` et `projects`.

**Résultat réel**: 21/21 tests passent (`npm run test`, exit code 0 — preuve section 1.3).

`package.json` mis à jour: script `"test": "vitest run"`, dépendances de dev `vitest@^3.2.4`, `vite-tsconfig-paths@^5.1.4`. `package-lock.json` régénéré (`npm install --package-lock-only`) et vérifié compatible avec `npm ci` (preuve: `npm ci` a réussi avec exit code 0 sur une copie propre — section 1.3).

---

## 11. CI minimale — ajoutée dans ce lot

`.github/workflows/ci.yml`: déclenché sur `pull_request` et `push` vers `main`, Node 22 fixé, cache npm, `npm ci` → `npm run lint` → `npm run test` → `npm run build`. Aucune étape de déploiement. **Non exécutée réellement sur GitHub** (ce lot n'a pas accès à un dépôt distant configuré) — la preuve fournie est l'exécution équivalente en local (section 1.3), qui utilise exactement les mêmes commandes que le workflow.

---

## 12. Gestion des secrets

`.gitignore` couvre déjà `.env*` (ligne 34) — vérifié, aucun changement requis. `.env.example` ne contient aucun secret réel, uniquement des clés vides ou commentées (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, etc., toutes en commentaire `# Future`). Aucune fuite de secret trouvée dans le code source ou l'historique visible. Stratégie VPS documentée dans `docs/deployment-vps.md`.

---

## 13. Monitoring et exploitation

Voir `docs/operations-runbook.md`. **Rien n'est actuellement configuré** — le document liste la procédure à suivre, pas un état déjà actif. Ne pas déclarer de monitoring « en place ».

---

## 14. Bilinguisme

Décision documentée, non implémentée: **V1 français canadien uniquement.** Vérification faite: `layout.tsx` déclare `lang="fr-CA"` et `alternates.languages` ne contient que `"fr-CA"` et `"x-default"` (tous deux pointant vers la même URL) — **aucune métadonnée ne déclare une version anglaise existante.** Conforme à la règle du plan PM sans changement requis.

---

## 15. Provenance des visuels

Voir `docs/assets-registry.md`. Un seul asset applicatif réel: `public/images/hero-technology-workspace.png` (1717×916, 1,38 Mio, PNG). **Origine inconnue** (aucune métadonnée, aucun fichier de licence) — à confirmer par le fondateur avant publication définitive. Les fichiers `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` dans `public/` sont les icônes par défaut du gabarit `create-next-app`, non référencées ailleurs dans le code trouvé — candidats à la suppression (nettoyage mineur, non bloquant).

---

## 16. Fichiers modifiés et créés dans ce lot

**Modifiés (code applicatif corrigé):**
- `src/components/contact-form.tsx` — retrait du champ upload, `aria-invalid`/`aria-describedby`/`role="alert"` sur les erreurs, import du schéma partagé
- `src/app/api/contact/route.ts` — import du schéma partagé (suppression de la duplication)
- `src/app/layout.tsx` — utilisation de `buildLocalBusinessSchema()`
- `src/app/globals.css` — règle `@media (prefers-reduced-motion: reduce)`
- `src/components/reveal.tsx` — `useReducedMotion()` de framer-motion (élimine l'animation JS quand l'utilisateur la désactive)
- `package.json` — script `test`, dépendances `vitest`/`vite-tsconfig-paths`
- `package-lock.json` — régénéré pour inclure les nouvelles dépendances, compatible `npm ci`

**Créés:**
- `src/lib/contact-schema.ts`
- `src/lib/schema-org.ts`
- `src/lib/__tests__/contact-schema.test.ts`
- `src/lib/__tests__/schema-org.test.ts`
- `src/lib/__tests__/data.test.ts`
- `vitest.config.ts`
- `.github/workflows/ci.yml`
- `docs/production-readiness-audit.md` (ce fichier)
- `docs/architecture-decision-hosting.md`
- `docs/privacy-data-flow.md`
- `docs/accessibility-audit.md`
- `docs/performance-audit.md`
- `docs/assets-registry.md`
- `docs/deployment-vps.md`
- `docs/operations-runbook.md`

**SHA git initial**: `24c847d4462bb611a8379502314cbbea2be488a2`
**SHA git final**: `24c847d4462bb611a8379502314cbbea2be488a2` (identique — **aucun commit créé** dans ce lot; toutes les modifications restent dans l'arbre de travail, en attente de revue et de commit explicite par le fondateur. Le dépôt n'avait de toute façon aucun commit correspondant à l'état actuel avant ce lot — voir section 1.1.)

---

## 17. Problèmes restants (non résolus par ce lot, décisions humaines requises)

1. **Sécurité — Next.js 16.2.9** contient 8 avisos haute sévérité. Mise à jour vers 16.2.11 non appliquée (hors périmètre d'un lot d'audit; nécessite son propre test de non-régression).
2. **Lighthouse/axe non exécutés avec chiffres réels** — bloqué par l'environnement d'audit (bibliothèques Chrome absentes, pas de droits root). Doit être exécuté sur poste de développement ou dans la CI avant toute décision GO sur performance/accessibilité.
3. **Revue juridique de la politique de confidentialité et des mentions légales** — non effectuée (hors compétence de l'agent). Le contenu actuel est honnête et prudent (aucune fausse déclaration de conformité trouvée) mais n'a pas été validé par un professionnel du droit pour la Loi 25.
4. **Décision Organization vs LocalBusiness** et adresse postale complète — décision du fondateur, non tranchée.
5. **Badge visuel « concept démonstratif » sur les cartes de la grille** — lacune identifiée (section 9), non corrigée (nécessite une décision de design).
6. **Architecture d'hébergement** — décision documentée (`docs/architecture-decision-hosting.md`) mais **aucun déploiement réel effectué**. Ne pas déclarer la production validée tant qu'un déploiement réel n'a pas eu lieu.
7. **Aucun commit git** ne correspond à l'état actuel du dépôt — risque de perte de travail, aucun point de restauration fiable.

---

## 18. Recommandation GO / NO GO

# NO GO

**Justification**: le code applicatif est dans un état net (0 erreur lint, 21/21 tests, build reproductible, aucune donnée réelle collectée, aucune injection de placeholder dans le JSON-LD). Ce n'est cependant pas suffisant pour un GO au sens du plan PM: la sécurité des dépendances contient des failles haute sévérité non corrigées, aucun audit de performance ou d'accessibilité chiffré n'existe, aucune revue juridique n'a eu lieu, et **aucun déploiement réel n'a jamais été effectué** — l'architecture cible est documentée mais pas exécutée. Un GO nécessite, au minimum: mise à jour de sécurité Next.js testée, exécution réelle de Lighthouse/axe avec les seuils du plan PM atteints, revue juridique de la politique de confidentialité, et un déploiement de test sur l'infrastructure cible avec monitoring actif.
