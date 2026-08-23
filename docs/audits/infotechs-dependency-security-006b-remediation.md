# Infotechs Dependency Security 006-B Remediation

Date: 2026-08-23
Projet: Infotechs Solutions
Lot: INFOTECHS-DEPENDENCY-SECURITY-006
Sous-lot: 006-B - Controlled Dependency Remediation
Mode: local first, remediation controlee, aucun commit, aucun push

## 1. Baseline

Baseline attendue et verifiee avant remediation:

| Element | Valeur |
|---|---|
| Branche | `master` |
| HEAD | `aa0271b496f1d99003bfe713257fbea7a652a91e` |
| Node | `v22.17.1` |
| npm | `11.5.2` |

Etat Git initial de 006-B: propre.

## 2. Audit securite avant correction

Resultats documentes pendant 006-A sur la meme baseline:

| Commande | Resultat |
|---|---|
| `npm audit --json` | 6 vulnerabilites high |
| `npm audit --omit=dev --json` | 4 vulnerabilites high |

Paquets signales avant correction:

- `next`
- `postcss`
- `sharp`
- `nanoid`
- `brace-expansion`
- `js-yaml`

## 3. Changements directs

Deux changements directs ont ete faits dans `package.json`:

| Package | Before | After | Classification | Reason |
|---|---:|---:|---|---|
| `next` | `16.2.12` | `16.3.2` | DIRECT_EXPECTED | Corriger la chaine Next.js incluant PostCSS et Sharp vulnerables |
| `eslint-config-next` | `16.2.12` | `16.3.2` | DIRECT_EXPECTED | Aligner l'outillage ESLint Next.js avec Next.js 16.3.2 |

Aucun autre changement direct n'a ete introduit dans `package.json`.

## 4. Changements transitifs

Les changements transitifs proviennent de deux sources:

1. resolution de l'arbre Next.js 16.3.2 et `eslint-config-next` 16.3.2;
2. mise a jour ciblee des paquets transitifs vulnerables encore presents apres `npm install`.

Commande utilisee pour la mise a jour ciblee des transitives:

```text
npm update nanoid brace-expansion js-yaml
```

Commandes explicitement non utilisees:

```text
npm audit fix
npm audit fix --force
```

## 5. Analyse complete du lockfile

Comparaison entre HEAD `aa0271b496f1d99003bfe713257fbea7a652a91e` et le working tree actuel.

| Package | Before | After | Classification | Reason |
|---|---:|---:|---|---|
| `@emnapi/runtime` | `1.11.0` | `1.11.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-darwin-arm64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-darwin-x64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-freebsd-wasm32` | absent | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-darwin-arm64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-darwin-x64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-arm` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-arm64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-ppc64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-riscv64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-s390x` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linux-x64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linuxmusl-arm64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-libvips-linuxmusl-x64` | `1.2.4` | `1.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-arm` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-arm64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-ppc64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-riscv64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-s390x` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linux-x64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linuxmusl-arm64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-linuxmusl-x64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-wasm32` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-webcontainers-wasm32` | absent | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-win32-arm64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-win32-ia32` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@img/sharp-win32-x64` | `0.34.5` | `0.35.3` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |
| `@next/env` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/eslint-plugin-next` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `eslint-config-next@16.3.2` |
| `@next/swc-darwin-arm64` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-darwin-x64` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-linux-arm64-gnu` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-linux-arm64-musl` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-linux-x64-gnu` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-linux-x64-musl` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-win32-arm64-msvc` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@next/swc-win32-x64-msvc` | `16.2.12` | `16.3.2` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `@swc/helpers` | `0.5.15` | `0.5.23` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre Next.js 16.3.2 |
| `brace-expansion` sous `@typescript-eslint/typescript-estree` | `5.0.8` | `5.0.9` | TRANSITIVE_SECURITY_EXPECTED | Version corrigee pour l'avis `brace-expansion` |
| `brace-expansion` | `1.1.16` | `1.1.18` | TRANSITIVE_SECURITY_EXPECTED | Version corrigee pour l'avis `brace-expansion` |
| `eslint-config-next` | `16.2.12` | `16.3.2` | DIRECT_EXPECTED | Changement direct attendu |
| `js-yaml` | `4.3.0` | `4.3.1` | TRANSITIVE_SECURITY_EXPECTED | Version corrigee pour l'avis `js-yaml` |
| `nanoid` | `3.3.16` | `3.3.18` | TRANSITIVE_SECURITY_EXPECTED | Version corrigee pour l'avis `nanoid` |
| `next` | `16.2.12` | `16.3.2` | DIRECT_EXPECTED | Changement direct attendu |
| `postcss` sous `next` | `8.4.31` | retire | TRANSITIVE_SECURITY_EXPECTED | Copie vulnerable retiree; `postcss@8.5.23` est dedupe |
| `sharp` | `0.34.5` | `0.35.3` | TRANSITIVE_SECURITY_EXPECTED | Version corrigee pour l'avis `sharp/libvips` |
| `semver` sous `sharp` | `7.8.4` | `7.8.5` | TRANSITIVE_RESOLUTION_EXPECTED | Resolution de l'arbre `sharp@0.35.3` |

UNRELATED PACKAGE VERSION CHANGES: NO.

## 6. Next.js 16.2.12 -> 16.3.2

`next` est passe de `16.2.12` a `16.3.2`.

Impact attendu:

- remplacement de `postcss@8.4.31` par `postcss@8.5.23`;
- passage de `sharp@^0.34.5` a `sharp@^0.35.3`;
- mise a jour des binaires `@next/swc-*` vers `16.3.2`;
- mise a jour de `@next/env` vers `16.3.2`;
- mise a jour de `@swc/helpers` vers `0.5.23`.

Validation locale effectuee en 006-B: typecheck, lint, tests et build passent.

## 7. eslint-config-next 16.2.12 -> 16.3.2

`eslint-config-next` est passe de `16.2.12` a `16.3.2`.

Impact attendu:

- alignement avec Next.js 16.3.2;
- mise a jour de `@next/eslint-plugin-next` vers `16.3.2`;
- pas de changement direct de regle applicative documente pendant cette phase.

Validation locale effectuee en 006-B: `npm run lint` passe.

## 8. PostCSS -> 8.5.23

Avant correction:

- `next@16.2.12` embarquait `postcss@8.4.31`;
- l'audit signalait des avis PostCSS via Next.

Apres correction:

- `postcss@8.5.23` est installe et dedupe;
- la copie `node_modules/next/node_modules/postcss@8.4.31` est retiree;
- `npm audit` ne signale plus PostCSS.

## 9. Sharp -> 0.35.3

Avant correction:

- `sharp@0.34.5` et ses paquets `@img/sharp-*` etaient presents.

Apres correction:

- `sharp@0.35.3`;
- paquets `@img/sharp-*` alignes sur `0.35.3`;
- paquets `@img/sharp-libvips-*` alignes sur `1.3.2`;
- `npm audit` ne signale plus Sharp.

## 10. NanoID -> 3.3.18

Avant correction: `nanoid@3.3.16`.

Apres correction: `nanoid@3.3.18`.

`npm audit` ne signale plus NanoID.

## 11. Brace Expansion -> 1.1.18 / 5.0.9

Avant correction:

- `brace-expansion@1.1.16`;
- `brace-expansion@5.0.8` sous `@typescript-eslint/typescript-estree`.

Apres correction:

- `brace-expansion@1.1.18`;
- `brace-expansion@5.0.9` sous `@typescript-eslint/typescript-estree`.

`npm audit` ne signale plus Brace Expansion.

## 12. js-yaml -> 4.3.1

Avant correction: `js-yaml@4.3.0`.

Apres correction: `js-yaml@4.3.1`.

`npm audit` ne signale plus js-yaml.

## 13. npm audit avant/apres

| Moment | Commande | Resultat |
|---|---|---|
| Avant | `npm audit --json` | 6 vulnerabilites high |
| Apres | `npm audit --json` | 0 vulnerabilite |

## 14. npm audit --omit=dev avant/apres

| Moment | Commande | Resultat |
|---|---|---|
| Avant | `npm audit --omit=dev --json` | 4 vulnerabilites high |
| Apres | `npm audit --omit=dev --json` | 0 vulnerabilite |

## 15. Typecheck

Commande executee en 006-B:

```text
npm run typecheck
```

Resultat: PASS.

## 16. Lint

Commande executee en 006-B:

```text
npm run lint
```

Resultat: PASS.

## 17. Tests 189/189

Commande executee en 006-B:

```text
npm test
```

Resultat: PASS, 189 tests sur 189.

## 18. Build 23 routes

Commande executee en 006-B:

```text
npm run build
```

Resultat: PASS.

Build observe:

- Next.js `16.3.2`;
- 23 routes/pages generees;
- `/api/contact` reste dynamique;
- routes services et realisations generees en SSG.

## 19. Regression

Aucune regression locale detectee par les validations executees:

- typecheck PASS;
- lint PASS;
- tests PASS, 189/189;
- build PASS, 23 routes;
- audit complet PASS;
- audit production PASS.

Limite: aucune validation navigateur manuelle, Playwright ou clean-install n'a ete executee pendant 006-B.

## 20. Risques restants

Risques residuels:

1. Next.js 16.3.2 est une mise a jour applicative mineure; les validations locales passent, mais une verification staging reste necessaire avant production.
2. `sharp` reste present comme dependance optionnelle de Next.js. L'exposition applicative est reduite car `next/image` n'est pas utilise dans le code, mais le paquet reste dans l'arbre.
3. Les audits npm sont propres au moment de l'execution locale; ils peuvent changer si la base npm advisory evolue.
4. Pas de clean-install effectue dans un dossier frais ou CI pendant ce sous-lot.
5. Pas de test E2E navigateur execute pendant ce sous-lot.

## 21. Clean-install validation

Clean-install validation: NON EXECUTEE.

Commandes non executees pendant cette phase:

```text
git clean
rm -rf node_modules
npm ci depuis un dossier propre
```

Raison: le perimetre 006-B-R1 interdit toute nouvelle modification de dependance et demande uniquement la production des preuves manquantes. Une validation clean-install peut etre planifiee dans un sous-lot separe si le PM l'autorise.

## 22. Recommandation PM

Recommandation: READY FOR FINAL PM REVIEW.

Le diff est limite a `package.json`, `package-lock.json` et ce rapport documentaire. Les changements de dependances sont attendus et justifies par la remediation des vulnerabilites npm. Aucun changement de version non lie au remediation tree n'a ete identifie dans le lockfile.

Avant commit, verifier:

1. `git diff --check` PASS;
2. `npm audit --json` PASS avec 0 vulnerabilite;
3. `npm audit --omit=dev --json` PASS avec 0 vulnerabilite;
4. absence de fichiers inattendus.

Commit propose apres autorisation PM:

```text
chore(deps): remediate npm security advisories
```
