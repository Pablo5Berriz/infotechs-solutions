# INFOTECHS-I18N-001B — BLOCKER REPORT

Date : 23 septembre 2026.

Ce document est un rapport d'arrêt selon la condition PM §21, point 4. Il ne constitue pas le rapport final d'implémentation ni une validation du bilinguisme.

## Décision et règle applicable

La directive de continuation autorise l'implémentation complète, sauf notamment en présence de « 4. une vulnérabilité HIGH/CRITICAL », auquel cas elle exige « STOP et fournis les preuves du blocage ».

L'audit npm exécuté pendant la vérification initiale retourne 2 dépendances HIGH, 3 MODERATE et 0 CRITICAL. L'implémentation est donc arrêtée avant toute modification du code par cet agent. Les versions HIGH existaient déjà dans le lockfile du RC : ce ne sont pas des régressions de version introduites par next-intl. La dernière condition d'arrêt PM s'applique néanmoins à la découverte d'une vulnérabilité HIGH/CRITICAL, sans limiter cette condition aux régressions i18n.

## 1. Baseline vérifiée

- Branche : `master`.
- HEAD : `7be38f40577960cc8b171a2928c2bfe2dc292333`, identique au RC exigé.
- Aucun reset, restore, clean, stash, checkout, commit, push ou déploiement effectué.
- Aucun secret, fournisseur email, destinataire ou paramètre d'infrastructure modifié. Aucun email envoyé.
- Seul fichier ajouté par cet agent : le présent rapport. Tous les changements ci-dessous étaient présents à la prise en charge.

État initial, `git status --short` :

```text
 M AGENTS.md
 D docs/design/design-tokens.md
 M docs/design/infotechs-design-review-001-report.md
 M docs/qa/infotechs-qa-001-report.md
 M next.config.ts
 M package-lock.json
 M package.json
?? "Claude outputs/"
?? docs/governance/infotechs-tech-baseline-001-report.md
?? docs/qa/infotechs-qa-001-r1-report.md
?? docs/qa/qa-001/
?? docs/release/
?? messages/
?? src/i18n/
?? src/middleware.ts
```

## 2. Preuve de l'audit

Commande exécutée dans le dépôt, avec accès réseau autorisé :

```powershell
node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' audit --json
```

Code de sortie : `1`. Réponse JSON d'audit reçue du registre npm. Extrait exact des compteurs :

```json
{
  "info": 0,
  "low": 0,
  "moderate": 3,
  "high": 2,
  "critical": 0,
  "total": 5
}
```

Ces nombres comptent les dépendances affectées de l'audit, pas les avis individuels : browserslist est associé à deux avis HIGH.

| Dépendance | Version lockfile RC | Version lockfile courant | Sévérité npm | Avis |
|---|---|---|---|---|
| browserslist | 4.28.2 | 4.28.2 | HIGH | [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx), [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) |
| js-yaml | 4.3.1 | 4.3.1 | HIGH | [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) |
| @vitest/mocker | 3.2.7 | 3.2.7 | MODERATE | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) |
| vitest | 3.2.7 | 3.2.7 | MODERATE | Même avis, propagation vers Vitest |
| baseline-browser-mapping | 2.10.35 | 2.10.35 | MODERATE | [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) |

Comparaison réalisée en lisant le lockfile courant et `git show 7be38f40577960cc8b171a2928c2bfe2dc292333:package-lock.json`, sans modifier le dépôt.

Plages vulnérables indiquées par l'audit : browserslist `<=4.28.6`, js-yaml `>=4.0.0 <4.3.2`. `fixAvailable: true` pour ces deux dépendances. Aucun correctif exécuté.

Parents directs identifiés dans le lockfile :

- `@babel/helper-compilation-targets` → browserslist, contrainte `^4.24.0`.
- `@eslint/eslintrc` → js-yaml, contrainte `^4.1.1`.

Les deux dépendances HIGH portent `dev: true` dans le lockfile. Cela ne démontre pas une exploitation possible dans l'application publique. L'exposition effective en production n'a pas été évaluée : je ne peux pas la confirmer.

## 3. Limites de l'environnement observées

- L'invocation simple `npm audit --json` échoue : le lanceur recherche un `npm-cli.js` absent dans `AppData/Roaming/npm`. L'invocation explicite du CLI installé dans `C:/Program Files/nodejs` a permis l'audit.
- Le premier accès au registre était bloqué dans le sandbox. L'audit a réussi après autorisation d'accès réseau.
- Les fichiers `node_modules/browserslist/package.json`, `node_modules/js-yaml/package.json`, `node_modules/vitest/package.json` et `node_modules/@vitest/mocker/package.json` sont absents à la racine de l'installation locale. `npm explain browserslist js-yaml` ne trouve pas ces dépendances installées. Les versions du tableau sont celles des lockfiles, et non des versions installées vérifiées.
- `next-intl` est effectivement installé en `4.14.6`, conforme au lockfile courant. `baseline-browser-mapping` installé est `2.10.35`.
- L'installation locale et le lockfile ne sont donc pas entièrement concordants. Aucune réinstallation n'a été entreprise après le déclenchement de l'arrêt PM.

## 4. État i18n réellement constaté

- Fondation présente : `src/i18n/routing.ts`, `navigation.ts`, `request.ts`, `src/middleware.ts`, plugin et redirections dans `next.config.ts`.
- `next-intl` déclaré `^4.14.6`, verrouillé et installé `4.14.6`.
- 19 fichiers de messages présents : 10 FR et 9 EN. `messages/en/legal.json` manque. Leur parité et leur fidélité ne sont pas validées.
- L'arbre de pages reste sous `src/app/`, sans migration `[locale]` effectuée.
- Le schéma Contact lu utilise encore les libellés FR comme valeurs métier et n'exige pas de locale.
- Aucune vérification runtime de cette fondation. Le travail antérieur n'est pas considéré comme validé.
- La documentation Next.js installée indique que `middleware.ts` est déprécié au profit de `proxy.ts`. La documentation officielle [next-intl](https://next-intl.dev/docs/routing/setup) emploie également `proxy.ts` pour Next.js 16. Cette adaptation reste à effectuer après levée du blocage, dans le périmètre i18n.

## 5. Gates et validations

| Gate | Résultat de cette reprise |
|---|---|
| HEAD exact RC | PASS |
| Audit 0 HIGH / 0 CRITICAL | FAIL : 2 HIGH, 0 CRITICAL |
| Parité et traduction FR/EN | Non validées |
| Données, Contact, composants, helpers | Reprise non effectuée |
| Migration et metadata | Non effectuées |
| Lint, Vitest ≥189, build | Non exécutés, arrêt avant implémentation |
| Matrice HTTP, legacy redirects et négociation | Non exécutés |
| Switch FR↔EN, accessibilité et responsive | Non exécutés |
| Noindex externe | Infrastructure non touchée ; en-tête distant non revérifié |
| git diff --check | Code 0 ; avertissements LF/CRLF sur fichiers préexistants |

`git diff --stat` avant création du présent rapport : 7 fichiers suivis modifiés, 1356 insertions et 773 suppressions. Ce résumé est intégralement préexistant à cette reprise et ne compte pas les fichiers non suivis. Il ne représente pas du travail réalisé par cet agent.

## 6. Décision attendue du PM et reprise proposée

Autoriser un périmètre correctif ciblé pour les dépendances HIGH, avec résolution compatible des dépendances transitives, synchronisation de l'installation et vérification du diff du lockfile. Aucun `npm audit fix --force` ni changement majeur global n'est proposé.

Critères pour lever le blocage : audit 0 HIGH / 0 CRITICAL, revue des changements de dépendances, contrôles de non-régression adaptés, puis autorisation PM de reprendre l'ordre A→K. Les MODERATE doivent rester explicitement documentées ; leur traitement éventuel exige un périmètre approuvé.

Le site reste en état i18n intermédiaire préexistant. Aucun rollback applicatif n'est nécessaire pour cette reprise, car aucun code n'a été modifié. Ne pas restaurer globalement le worktree. Toute reprise ou correction du travail antérieur doit préserver le bruit initial.

LEGAL ENGLISH HUMAN REVIEW REQUIRED

INFOTECHS-I18N-001B
STATUS: BLOCKED

BILINGUAL FUNCTIONAL GATE: FAIL

IMPLEMENTATION COMPLETE: NO

COMMIT: NOT AUTHORIZED
PUSH: NOT AUTHORIZED
DEPLOY: NOT AUTHORIZED
PRODUCTION: NO GO
