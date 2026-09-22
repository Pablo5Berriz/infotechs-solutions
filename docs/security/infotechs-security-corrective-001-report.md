# INFOTECHS-SECURITY-CORRECTIVE-001 — Correctif sécurité minimal

Date : 22 septembre 2026
Baseline source : `140a47928252928e7a8b7b39610473f77d9644e4`
Type : correctif dépendance de sécurité uniquement. Portée strictement limitée.

---

## 1. Baseline source
`140a47928252928e7a8b7b39610473f77d9644e4` (`feat(design): adopt graphite and electric violet identity`).

## 2. Environnement
Clone Git isolé, poste Windows (`C:\Users\paulq\AppData\Local\Temp\infotechs-sec-001\repo`), séparé du dossier connecté pendant toute la phase de validation, pour ne jamais contaminer le worktree avec le bruit hors-baseline déjà documenté. Node v22.17.1, npm 11.5.2.

## 3. État Git initial
```
git rev-parse HEAD  → 140a47928252928e7a8b7b39610473f77d9644e4
git status --short  → (vide, clean)
```
**CONFORME.**

## 4. Advisory ciblé
QA-001-F02 : `next@16.3.2` — CRITICAL (2 CVE : GHSA-p293-qw3h-jr36 RCE hébergement Windows, GHSA-2xp9-vwfh-vxw4 RCE via API d'optimisation d'image AVIF), plage vulnérable `>=16.0.0 <16.3.3`. Dépendance transitive associée : `sharp@0.35.3` (HIGH).

## 5. Versions avant
`next@16.3.2` (direct, prod), `sharp@0.35.3` (transitif via `next`).
`npm audit` initial (réinstallation propre confirmée) : 1 critical, 3 high, 3 moderate (total 7) — identique à QA-001.

## 6. Versions disponibles (vérifiées au moment de l'exécution)
Branche 16.3.x sur le registre npm : `16.3.0`, `16.3.1`, `16.3.2`, `16.3.3`, `16.3.4`, `16.3.5`. Dist-tag `latest` = `16.3.5` (pas de version stable 16.4+, seulement `canary`). `sharp` : `0.35.4` disponible (corrige l'aviso HIGH).

## 7. Version retenue
**`next@16.3.4`** (pin exact, comme l'original `"16.3.2"` sans caret — convention préservée).

## 8. Justification
- `16.3.3` (minimum absolu requis) : build production réussi, corrige les 2 CVE. Retenu comme filet de sécurité minimal validé.
- `16.3.5` (dernier patch / dist-tag `latest`) : **build de production échoue** — `next build` (Turbopack) lève 8 erreurs `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'` sur `src/app/layout.tsx` (résolution de `next/font/google` cassée dans cette version). Confirmé reproductible sur réinstallation propre (`npm ci --include=dev`) — pas un artefact d'environnement pollué. **Rejeté : régression bloquante, corriger nécessiterait une modification de code (hors scope de ce lot).**
- `16.3.4` : testé spécifiquement pour vérifier si la régression apparaît dès 16.3.4 ou seulement 16.3.5 — **build production réussi** (23 pages, `✓ Compiled successfully`), `npm audit` identique à 16.3.5 (0 critical/high, corrige entièrement l'advisory ciblé), tests et lint verts.

**Retenu : `16.3.4`** — dernière version patch de la branche 16.3 qui (a) corrige entièrement QA-001-F02, (b) reste dans la branche patch sans montée majeure/mineure, (c) ne nécessite aucune modification de code applicatif, (d) build/lint/tests passent intégralement en environnement propre. C'est la version la plus récente et sûre disponible au moment de l'exécution — `16.3.5`, bien que plus récente, est rejetée pour cause de régression de build constatée.

## 9. Fichiers modifiés
```
package.json       — 1 ligne : "next": "16.3.2" → "next": "16.3.4"
package-lock.json  — régénéré par npm (résolution complète de l'arbre de dépendances, incluant sharp@0.35.4 et mises à jour transitives associées)
```
Aucun autre fichier touché. `src/`, `public/`, `docs/design/`, routing, API, contenu, styles, configuration fonctionnelle : **inchangés**.

## 10. Diff
```diff
--- a/package.json
+++ b/package.json
@@ -15,7 +15,7 @@
     "clsx": "^2.1.1",
     "framer-motion": "^12.40.0",
     "lucide-react": "^1.17.0",
-    "next": "16.3.2",
+    "next": "16.3.4",
     "react": "19.2.4",
     "react-dom": "19.2.4",
     "react-hook-form": "^7.78.0",
```
`package-lock.json` : 320 lignes modifiées (161 insertions / 161 suppressions) — résolution de dépendances uniquement, aucune ligne éditée à la main.

`git status --short` (environnement isolé, après application) : uniquement `M package.json`, `M package-lock.json`. Aucun fichier parasite généré, aucune modification de configuration inattendue.

## 11. `npm ci`
Réinstallation complète depuis zéro (`node_modules` supprimé puis `npm ci --include=dev`) : **535 packages installés, 17-19s, exit 0. PASS.**
(Note environnement : ce poste a `NODE_ENV=production` actif globalement — un `npm ci`/`npm install` sans `--include=dev` explicite n'installe que les dépendances de production et fait échouer le build faute d'outillage Tailwind/PostCSS. Documenté ici pour éviter une fausse alerte lors d'une validation future sur ce même poste — n'affecte pas le contenu du correctif lui-même.)

## 12. Lint
```
npm run lint → PASS, 0 erreur, 0 warning
```

## 13. Tests
```
npm run test → 29 suites, 189/189 tests PASS
```
Identique au chiffre attendu (§9 des critères d'acceptation).

## 14. Build
```
npm run build → PASS
✓ Compiled successfully in 6.1s
✓ Generating static pages using 15 workers (23/23)
```
23 pages générées — conforme à l'attendu.

## 15. `npm audit` avant/après

| | Critical | High | Moderate | Low | Total |
|---|---|---|---|---|---|
| **AVANT** (`next@16.3.2`) | 1 | 3 | 3 | 0 | 7 |
| **APRÈS** (`next@16.3.4`) | 0 | 0 | 1 | 0 | 1 |

La seule vulnérabilité restante (`baseline-browser-mapping`, MODERATE, GHSA-w5vr-8v7q-w6rv) est une dépendance **transitive de développement** (chaîne `eslint-config-next` → `@babel/core` → `browserslist` → `update-browserslist-db` → `baseline-browser-mapping`), jamais exécutée en production ni livrée au client — déjà analysée et classée sans exposition réelle dans QA-001 (§22). `fixAvailable: true` mais correction hors du scope de ce lot (ne concerne pas next/sharp).

## 16. `npm ls next`
```
`-- next@16.3.4
```
Confirmé après `npm ci` propre — dépendance directe unique, plus de doublons.

## 17. `npm ls sharp`
```
`-- next@16.3.4
  `-- sharp@0.35.4
```
Résolu automatiquement par la mise à jour de `next` — **aucun ajout explicite de `sharp` au `package.json`**, conformément à la règle de ne pas transformer une dépendance transitive en dépendance directe sans nécessité.

## 18. Test runtime smoke
Build de production démarré (`next start`, port isolé) :

| Route | HTTP |
|---|---|
| `/` | 200 |
| `/services` | 200 |
| `/realisations` | 200 |
| `/a-propos` | 200 |
| `/contact` | 200 |
| `/page-inexistante-xyz` (404) | 404 |

Formulaire Contact : payload valide → 503 (dégradation propre identique à QA-001, pas de clé Resend en environnement de test) ; payload invalide (email malformé, champs manquants) → 400 avec `issues` détaillés — **comportement strictement identique à l'audit QA-001 pré-correctif**. Aucun log serveur (`server.log`) ne contient de chaîne `error`/`Error`/`EADDR` — aucune exception.

## 19. Endpoint `/_next/image`
```
GET /_next/image?url=%2Ffavicon.ico&w=64&q=75          → HTTP 200 (fonctionnel)
GET /_next/image?url=https://example.com/a.avif&w=64&q=75 → HTTP 400 "url parameter is not allowed" (refusé, inchangé)
```
Comportement identique à avant le correctif : l'API d'optimisation d'image fonctionne pour les assets locaux et continue de refuser toute URL externe (aucun `remotePatterns` configuré) — pas de régression, et la version patchée ferme la vulnérabilité connue sur ce composant.

## 20. Anomalies
Aucune anomalie de code. **Anomalie de gouvernance découverte pendant l'exécution de ce lot** (sans rapport avec next/sharp) : en préparant le dossier de preuves QA-001 (session précédente), le fichier `docs/qa/infotechs-qa-001-report.md` a été écrit à un chemin qui portait déjà un fichier suivi par git (commit `a9c274b`, contenu antérieur "docs(qa): complete MVP transversal review", sans rapport avec la présente campagne QA). Le contenu antérieur a été écrasé dans la copie de travail. **Rien n'est perdu de façon irréversible** — récupérable via `git show a9c274b:docs/qa/infotechs-qa-001-report.md` — mais ce fichier reste modifié (`M`) dans le worktree connecté, hors du scope de ce lot, et n'a **pas été touché** par ce correctif. Signalé pour décision du PM (nouveau nom de fichier pour le rapport QA-001, ou remplacement assumé de l'ancien contenu).

## 21. État Git final (dossier connecté, après commit)
Voir sortie structurée en fin de rapport pour le SHA exact. Fichiers hors-baseline préexistants (`AGENTS.md`, `docs/design/design-tokens.md`, `docs/design/infotechs-design-review-001-report.md`, `"Claude outputs/"`, `docs/governance/infotechs-tech-baseline-001-report.md`) : **non touchés, ni restaurés ni stagés**, comme prescrit. `docs/qa/infotechs-qa-001-report.md` (modifié, voir §20) : **non touché, non stagé** dans ce commit.

## 22. Recommandation
Correctif validé et appliqué avec succès : `next@16.3.2` → `16.3.4`, `sharp` auto-résolu à `0.35.4`. QA-001-F02 **résolu**. Aucune modification fonctionnelle, éditoriale, UX/UI, de routage ou d'architecture. Build/lint/tests/audit/smoke tous verts.

**Ne pas déclarer GO RC automatiquement.** Conformément à la directive, une modification de dépendance de production invalide techniquement la baseline QA-001 précédente. Recommandation : **GO QA-001-R1** — une recette ciblée de non-régression sur le nouveau SHA (fermeture F02, audit dépendances, build/test/lint, runtime, `/_next/image`, smoke transversal), sans refaire l'intégralité de la campagne QA-001.
