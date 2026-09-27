# INFOTECHS-SECURITY-CORRECTIVE-002 — REPORT

Date : 23 septembre 2026. Périmètre : correction des dépendances HIGH uniquement.

Le blocker sécurité est levé : audit complet à **0 HIGH / 0 CRITICAL**, audit production à **0 vulnérabilité**, lint valide, **189 tests sur 189 réussis**, build valide. Deux MODERATE liées à Vitest restent documentées. Le bilinguisme n'a pas été repris.

## 1. Baseline

- Branche : `master`.
- HEAD initial et final : `7be38f40577960cc8b171a2928c2bfe2dc292333`.
- Node.js : `22.17.1`. npm : `10.9.2`.
- État de départ conservé dans [status-before.txt](security-corrective-002/status-before.txt).
- Manifestes et empreintes initiales sauvegardés avant modification dans `C:/Users/paulq/AppData/Local/Temp/infotechs-security-002-vA8miW`.
- Le lanceur npm par défaut étant défectueux sur cette machine, les commandes npm ci-dessous ont été exécutées via `node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js'`.

## 2. Cause

Le lockfile contenait `browserslist 4.28.2` et `js-yaml 4.3.1`, signalés HIGH par l'audit du lot précédent. Ces versions existaient déjà dans le RC. L'installation locale ne contenait pas toutes les dépendances verrouillées ; une conclusion fondée sur cet ancien `node_modules` aurait été insuffisante.

Le correctif porte sur la résolution des dépendances. Il ne prétend pas démontrer une exploitation de ces avis dans le site public.

## 3. Dependency tree

Arbre confirmé après installation par `npm explain`, `npm ls` et lecture des métadonnées installées :

```text
eslint-config-next 16.3.2
  eslint-plugin-react-hooks 7.1.1
    @babel/core 7.29.7
      @babel/helper-compilation-targets 7.29.7
        browserslist ^4.24.0 → 4.29.0

eslint 9.39.4
  @eslint/eslintrc 3.3.5
    js-yaml ^4.1.1 → 4.3.2
```

Les deux transitives HIGH appartiennent à l'arbre de développement. `baseline-browser-mapping` et `caniuse-lite` sont aussi partagés avec Next.js. Les autres versions de l'arbre restent inchangées.

Preuves : [arbre installé complet](security-corrective-002/dependency-tree.json), [versions installées](security-corrective-002/installed-versions.json).

## 4. Resolution strategy

La stratégie A/B demandée par le PM a suffi : résolution npm normale ciblée dans les plages existantes.

```text
npm update browserslist js-yaml --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --no-audit --no-fund
```

Les deux commandes ont terminé avec le code 0. Aucune dépendance directe ajoutée, aucun override, aucun changement de `package.json`, aucun `audit fix`.

La résolution a sélectionné browserslist 4.29.0, version compatible avec `^4.24.0`, plutôt qu'un épinglage artificiel de sa version corrective minimale. Ses cinq dépendances directes nécessitaient alors une actualisation dans les nouvelles plages ci-dessous. Aucun paquet sans relation avec ce correctif n'a changé.

`npm ci` a ajouté 438 paquets. Il a signalé `tsconfck@3.1.6` déprécié et un avertissement Windows EPERM pendant le nettoyage d'un sous-dossier optionnel WASM (`@unrs/resolver-binding-wasm32-wasi/node_modules/@emnapi/runtime`). L'installation a néanmoins terminé avec le code 0. Le contrôle final `npm ls --all --json` a également terminé avec le code 0, sans problème déclaré. Les sept versions concernées ont été vérifiées dans les fichiers réellement installés.

## 5. Exact package changes

| Package | Before | After | Reason |
|---|---|---|---|
| browserslist | 4.28.2 | 4.29.0 | Correction HIGH, résolution compatible avec le parent `^4.24.0` |
| js-yaml | 4.3.1 | 4.3.2 | Correction HIGH, résolution compatible avec le parent `^4.1.1` |
| baseline-browser-mapping | 2.10.35 | 2.11.25 | browserslist exige maintenant `^2.11.23` ; disparition naturelle de sa MODERATE |
| caniuse-lite | 1.0.30001797 | 1.0.30001810 | browserslist exige maintenant `^1.0.30001810` |
| electron-to-chromium | 1.5.371 | 1.5.436 | browserslist exige maintenant `^1.5.427` |
| node-releases | 2.0.47 | 2.0.56 | browserslist exige maintenant `^2.0.55` |
| update-browserslist-db | 1.2.3 | 1.3.3 | browserslist exige maintenant `^1.3.3` |

Preuve structurée : [package-changes.json](security-corrective-002/package-changes.json).

## 6. browserslist before/after

Lockfile : `4.28.2 → 4.29.0`. Version installée finale : `4.29.0`. Seuil correctif PM : `>=4.28.7`. Aucun avis browserslist dans l'audit final.

## 7. js-yaml before/after

Lockfile : `4.3.1 → 4.3.2`. Version installée finale : `4.3.2`. Seuil correctif PM : `>=4.3.2`. Aucun avis js-yaml dans l'audit final.

## 8. npm audit result

`npm audit --json` :

| Critical | High | Moderate | Low | Total |
|---|---|---|---|---|
| 0 | 0 | 2 | 0 | 2 |

Code de sortie 1 à cause des MODERATE conservées, et non d'un échec de requête. Gate PM 0 HIGH / 0 CRITICAL : **PASS**.

Réponse JSON complète : [audit-full.json](security-corrective-002/audit-full.json).

## 9. npm audit --omit=dev result

`npm audit --omit=dev --json` : **0 CRITICAL, 0 HIGH, 0 MODERATE, 0 LOW**, code de sortie 0.

Réponse JSON complète : [audit-production.json](security-corrective-002/audit-production.json).

## 10. Lint result

`npm run lint` : **PASS**, code 0, aucun diagnostic ESLint.

## 11. Tests result

`npm test`, Vitest `3.2.7` : **29 fichiers réussis, 189 tests réussis sur 189**, code 0. Aucun test modifié, supprimé ou désactivé. Les appels du fournisseur Contact sont simulés par les tests ; aucun envoi réel effectué.

Le premier essai dans le sandbox a échoué avant les tests : esbuild ne pouvait pas lire les dossiers parents pour charger `vitest.config.ts`. La même commande autorisée hors sandbox a réussi. Cet échec initial concerne les permissions d'exécution, pas les dépendances corrigées.

## 12. Build result

`npm run build` : **PASS**, code 0, Next.js `16.3.4` / Turbopack. Compilation réussie, TypeScript terminé, **23/23 pages générées**, finalisation terminée.

Le premier essai sandbox a échoué sur le téléchargement de Hanken Grotesk, JetBrains Mono et Public Sans depuis Google Fonts. La même commande autorisée avec accès réseau a réussi. Aucun changement des polices, de la configuration ou du code pour contourner cet échec.

Avertissement préexistant conservé : convention `middleware.ts` dépréciée, remplacement par `proxy.ts` attendu dans le futur lot I18N. Aucune correction i18n dans ce lot. Aucune isolation du RC nécessaire puisque le build du worktree courant passe.

Ce build valide la compilation de l'état courant ; il ne valide pas le bilinguisme ou le fonctionnement runtime des routes i18n intermédiaires.

## 13. Package-lock diff review

- `package.json` : identique octet pour octet à l'état initial de cette directive.
- Lockfile : exactement 7 entrées de paquets modifiées ; 584 entrées avant et après, racine comprise.
- Champs supérieurs du lockfile et déclaration racine des dépendances : inchangés.
- Le diff SECURITY seul contient les versions, URLs et intégrités des sept paquets, plus les cinq contraintes internes de browserslist.
- Next.js `16.3.4`, React/React DOM `19.2.4`, next-intl `4.14.6`, Vitest `3.2.7` : inchangés.
- `git diff --check` : code 0. Seuls les avertissements LF/CRLF habituels sur les fichiers préexistants ont été affichés.

Le diff global contre HEAD contient aussi l'ajout next-intl préexistant : `package.json` +1 ligne ; `package-lock.json` +757/-29 lignes. Ces chiffres ne doivent pas être attribués au seul correctif sécurité.

Le [diff SECURITY seul](security-corrective-002/security-only-lockfile.diff) compare le lockfile au début de cette directive et celui corrigé. Il préserve les ajouts i18n antérieurs.

## 14. Remaining MODERATE vulnerabilities

- `@vitest/mocker 3.2.7`.
- `vitest 3.2.7`, affecté directement et via son mocker.

Les deux entrées correspondent à l'avis [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) signalé par npm. Le correctif proposé par npm passe à Vitest 5.0.1, identifié comme changement majeur. Il n'a pas été appliqué conformément au périmètre PM.

Les MODERATE restent une dette explicite du toolchain de test. L'audit production est distinct et ne rapporte aucune vulnérabilité. La MODERATE de baseline-browser-mapping a disparu avec la résolution normale des dépendances de browserslist.

## 15. Worktree preservation evidence

Empreintes SHA-256 comparées pour les 449 chemins initiaux recensés par `git ls-files --cached --others --exclude-standard` ; l'absence des fichiers déjà supprimés est également conservée. **Seul `package-lock.json` diffère.**

Preuve : [preservation.json](security-corrective-002/preservation.json).

Cette vérification couvre les fichiers suivis et non suivis non ignorés. Elle ne prétend pas figer `node_modules` ou `.next`, régénérés intentionnellement par l'installation et le build.

Distinction du travail :

- Bruit préexistant : `AGENTS.md`, documents design/QA/gouvernance/release, `Claude outputs/`, suppression du document design-tokens. Inchangé.
- I18N préexistante : modifications de `package.json`, `next.config.ts`, ajouts de messages, `src/i18n/`, `src/middleware.ts` et portions initiales du lockfile. Préservées.
- SECURITY-CORRECTIVE-002 : sept entrées du lockfile et nouveaux documents de preuve dans `docs/qa/security-corrective-002/`, plus le présent rapport.

Aucun refactor, changement de traduction, modification middleware/proxy, secret, infrastructure, commit, push ou déploiement.

## 16. Rollback method

Aucun rollback exécuté. Pour annuler uniquement ce correctif si le PM le demande :

1. Vérifier que le lockfile n'a pas reçu de nouvelles modifications incompatibles.
2. Exécuter `git apply --reverse --check docs/qa/security-corrective-002/security-only-lockfile.diff`.
3. Après décision PM, appliquer ce patch en sens inverse puis synchroniser l'installation avec `npm ci`.

La commande de vérification seule a déjà été exécutée : code 0, aucune écriture. Le patch cible exclusivement les sept entrées du correctif et conserve l'i18n préexistante. Cette annulation réintroduirait les HIGH ; elle ne constitue pas une recommandation de sécurité.

La sauvegarde complète initiale du lockfile existe aussi dans le répertoire temporaire indiqué en §1, mais ne doit pas écraser de futurs changements. Aucune restauration globale du dépôt.

## 17. Recommendation on resuming I18N-001B

**Reprise recommandée après revue et décision explicite du PM.** Le blocker HIGH est levé et les contrôles de non-régression passent.

Lors de la reprise autorisée, remplacer proprement `src/middleware.ts` par `src/proxy.ts` avant de poursuivre la migration complète des routes, conformément à la demande du PM. La traduction et l'architecture i18n intermédiaires restent à terminer et à valider dans leur propre lot.

Arrêt à la livraison du présent rapport. I18N-001B non repris automatiquement.

INFOTECHS-SECURITY-CORRECTIVE-002
STATUS: PASS_WITH_FINDINGS

CRITICAL: 0
HIGH: 0
MODERATE: 2

SECURITY BLOCKER CLEARED: YES

I18N-001B RESUME RECOMMENDED: YES

COMMIT: NOT AUTHORIZED
PUSH: NOT AUTHORIZED
DEPLOY: NOT AUTHORIZED
PRODUCTION: NO GO
