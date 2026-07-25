# INFOTECHS-BASELINE-001 — Rapport de baseline Git

Date : 24 juillet 2026  
Statut : **TERMINÉ — VALIDÉ TECHNIQUEMENT, EN ATTENTE DE CLÔTURE PM**  
Nature : gouvernance Git et traçabilité uniquement

## 1. SHA initial

```text
24c847d4462bb611a8379502314cbbea2be488a2
```

## 2. Branche

```text
master
```

## 3. État Git initial

```text
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
?? src/app/__tests__/
?? src/app/a-propos/
?? src/app/api/
?? src/app/confidentialite/
?? src/app/contact/
?? src/app/fondations/
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

`git diff --stat` initial :

```text
README.md           |   97 +-
package-lock.json   | 2474 ++++++++++++++++++++++++++++++++++++++++++---------
package.json        |   15 +-
src/app/globals.css |  154 +++-
src/app/layout.tsx  |   76 +-
src/app/page.tsx    |  104 +--
6 files changed, 2378 insertions(+), 542 deletions(-)
```

## 4. Fichiers modifiés

Fichiers modifiés avant l'ouverture du lot :

- `README.md`;
- `package-lock.json`;
- `package.json`;
- `src/app/globals.css`;
- `src/app/layout.tsx`;
- `src/app/page.tsx`.

Modification de gouvernance effectuée par le lot :

- `.gitignore` : exception d'inclusion pour `.env.example` et exclusions explicites des archives, doublons et captures intermédiaires conservés localement.

Aucun contenu applicatif, visuel, éditorial, route, CTA, métadonnée, dépendance ou test n'a été modifié.

## 5. Fichiers non suivis

L'inventaire initial contenait **681 fichiers non suivis** environ, regroupés par Git sous les chemins suivants :

- `.github/workflows/ci.yml`;
- `docs/**` : documentation, sources de design, rapports et captures;
- `public/images/**` : deux images publiques;
- `screenshots/**` : quatre captures locales héritées;
- `src/app/**` : routes, pages et tests des lots validés;
- `src/components/**` : composants et tests;
- `src/lib/**` : sources de données, utilitaires et tests;
- `vitest.config.ts`.

Après application des règles d'exclusion de gouvernance, **257 fichiers candidats** restaient pour la baseline. `.env.example`, précédemment masqué par `.env*`, a été rendu explicitement admissible; ses valeurs sont des exemples vides ou locales.

L'inventaire exhaustif reste reproductible avec :

```bash
git ls-files --others --exclude-standard
```

## 6. Contrôle des secrets

Résultat : **PASS sur les fichiers inspectés et candidats**.

Contrôles réalisés :

- noms `.env`, certificats, clés privées, jetons, identifiants et mots de passe;
- extensions `.pem`, `.key`, `.pfx`, `.p12`, `.crt`, `.cer`;
- motifs de clés API, Bearer tokens, clés privées et jetons GitHub;
- contenu de `.env.example` avec valeurs masquées pendant l'inspection;
- documentation de déploiement;
- noms de fichiers contenus dans les 23 archives ZIP Stitch;
- inspection visuelle représentative des captures contractuelles Contact, À propos et Réalisations ainsi que du logo public.

Résultats détaillés :

- aucun fichier de clé privée ou certificat détecté;
- aucun jeton, mot de passe ou secret fournisseur réel détecté;
- la seule correspondance documentaire est un nom de variable `RESEND_API_KEY` vide dans un exemple;
- `.env.example` contient uniquement des URL locales, valeurs vides et noms de variables futures;
- aucune archive ne contient de nom de fichier évocateur d'un secret;
- les captures inspectées présentent uniquement le contenu public ou démonstratif du site, sans saisie personnelle.

Limite : ce contrôle automatisé et représentatif ne constitue pas une analyse forensique de chaque pixel des 460 PNG présents initialement. Les captures de travail non contractuelles ont été exclues par précaution.

## 7. Classification des fichiers

### À INCLURE DANS LA BASELINE

- `.env.example` — configuration d'exemple sans secret;
- `.github/workflows/ci.yml` — validation CI du projet;
- `.gitignore` — règles de gouvernance de la baseline;
- fichiers de configuration et documentation racine, dont `README.md`, `package.json`, `package-lock.json` et `vitest.config.ts`;
- `src/app/**`, `src/components/**`, `src/lib/**` — état fonctionnel exact validé des lots 002B à 002F;
- `public/images/**` — actifs utilisés ou documentés par le projet;
- `docs/*.md` et `docs/design/*.md` — documentation de projet et rapports validés;
- `docs/design/_stitch-source/**/{DESIGN.md,code.html,screen.png}` — références de conception non archivées;
- captures finales et contractuelles sous `docs/design/screens/**`;
- `docs/design/infotechs-design-review-001-report.md` — rapport d'audit accepté sous réserves;
- `docs/governance/infotechs-baseline-001-report.md` — présent rapport.

### À EXCLURE PAR `.gitignore`

- `/screenshots/` — captures locales héritées hors convention documentaire officielle;
- `docs/design/_stitch-source/**/source.zip` — 23 archives redondantes avec les sources décompressées;
- `docs/design/design-review-001-report.md` — doublon antérieur au rapport officiel nommé par la directive;
- captures `clip-test-*`, `part-*`, `r2part-*` et `viewport-test-*` de 002A — preuves de fabrication intermédiaires;
- métadonnées, captures `direct-*`, `exact-*`, `long-check.png`, `viewport-check.png`, dossiers `final-chunks-*` et `segments-*` de 002E — diagnostics de fabrication explicitement non contractuels;
- dossiers `_chunks-*` de 002F — segments sources des 15 captures finales assemblées.

Justification : ces fichiers sont redondants, intermédiaires ou locaux. Ils restent sur disque; aucun fichier n'a été supprimé.

### À CONSERVER LOCALEMENT SANS COMMIT

- tous les éléments couverts par les règles d'exclusion ci-dessus;
- installations et sorties déjà ignorées : `node_modules`, `.next`, `out`, `build`, `coverage`, journaux et vrais fichiers `.env`.

### À SIGNALER AU PM

- le rapport `docs/design/design-review-001-report.md` est un doublon antérieur dont la formulation diffère du rapport officiel; il est conservé localement et non supprimé;
- 23 archives Stitch sont conservées localement mais non incluses, faute de valeur supplémentaire par rapport aux sources décompressées et afin d'éviter les binaires redondants;
- les rapports 002A et 002E documentent eux-mêmes la présence d'artefacts intermédiaires; ces artefacts ne font pas partie des captures contractuelles;
- l'installation locale ne contient pas l'exécutable Vitest malgré sa déclaration dans `package.json` et `package-lock.json`.

## 8. Modifications de `.gitignore`

La modification est strictement liée à la gouvernance du lot :

- ajout de `!.env.example` afin de versionner le modèle de configuration sans secret;
- exclusion des captures locales et intermédiaires;
- exclusion des archives ZIP redondantes;
- exclusion de l'ancien rapport d'audit doublon.

Cette modification ne change ni le build, ni le comportement applicatif, ni les dépendances.

## 9. Commandes exécutées

Inventaire Git :

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git status --porcelain=v1
git diff --stat
git diff --name-status
git ls-files --others --exclude-standard
```

Inspection : lecture de `.gitignore`, `npm pkg get scripts`, recherches de noms et contenus sensibles, inventaire des extensions/tailles, inspection des archives et captures représentatives.

Validation :

```bash
npm run lint
npm test
```

`npm run build` n'a pas été exécuté, car la directive impose l'arrêt au premier échec. Aucun `npm ci`, `npm install`, `npm audit fix` ou contournement n'a été exécuté.

## 10. Résultats complets des validations

### Lint

```text
> infotechs-solutions@0.1.0 lint
> eslint

Exit code : 0
Résultat : PASS
```

### Tests

```text
> infotechs-solutions@0.1.0 test
> vitest run

'vitest' n’est pas reconnu en tant que commande interne
ou externe, un programme exécutable ou un fichier de commandes.

Exit code : 1
Résultat : FAIL
```

Interprétation : Vitest est déclaré dans les manifestes, mais absent de l'installation locale. La directive impose `STOP`, `NO COMMIT` et interdit de contourner un échec; aucune réinstallation n'a donc été tentée.

### Type-check

```text
NON EXÉCUTÉ — aucune commande dédiée n'existe dans package.json.
```

### Build

```text
NON EXÉCUTÉ — arrêt obligatoire après l'échec des tests.
```

## 11. Fichiers inclus dans le commit

```text
AUCUN — commit interdit après l'échec d'une validation obligatoire.
```

La liste de candidats de la section 7 reste une proposition de classification, pas un index Git créé.

## 12. Fichiers exclus

Les fichiers exclus sont ceux couverts par les règles détaillées aux sections 7 et 8. Ils n'ont été ni supprimés, ni déplacés, ni ajoutés à l'index.

## 13. SHA final

```text
24c847d4462bb611a8379502314cbbea2be488a2
```

Le SHA est inchangé, car aucun commit n'a été créé.

## 14. État Git final

Le working tree reste non propre. Il contient les livrables hérités non commités, la modification de gouvernance de `.gitignore` et le présent rapport. Aucun fichier n'a été indexé.

État synthétique attendu après ce rapport :

```text
 M .gitignore
 M README.md
 M package-lock.json
 M package.json
 M src/app/globals.css
 M src/app/layout.tsx
 M src/app/page.tsx
?? .env.example
?? .github/
?? docs/
?? public/images/
?? src/app/**
?? src/components/
?? src/lib/
?? vitest.config.ts
```

## 15. Anomalies et réserves

### Anomalie bloquante

L'installation locale est incomplète : `npm test` ne peut pas trouver Vitest. La gate `TESTS : PASS` n'est donc pas satisfaite.

### Conséquences

```text
SECRETS : PASS
LINT : PASS
TESTS : FAIL
BUILD : NON EXÉCUTÉ
BASELINE COMMIT : NON CRÉÉE
WORKING TREE : NON PROPRE
MODIFICATIONS FONCTIONNELLES : AUCUNE
```

### Action PM requise

Autoriser explicitement une nouvelle tentative après restauration propre des dépendances locales, normalement via `npm ci`, ou fournir un environnement où les dépendances déclarées sont déjà installées. Le prochain passage devra reprendre les validations depuis le début et ne créer le commit que si toutes les gates sont vertes.

## Décision du lot

```text
INFOTECHS-BASELINE-001 : STOP — ANOMALIE DÉTECTÉE
COMMIT : AUCUN
SHA : INCHANGÉ
MODIFICATION FONCTIONNELLE : AUCUNE
INFOTECHS-DESIGN-COMPLETION-003A : NON OUVERT
INFOTECHS-QA-001 : NO GO
PRODUCTION : NO GO
```

## R2 — Correction TypeScript et création de la baseline

Date : 24 juillet 2026  
Lot : `INFOTECHS-BASELINE-001-R2-TYPECHECK`

```text
STATUT R2 :
TERMINÉ — VALIDATIONS PASS
```

### 1. Diagnostic exact de `TS2345`

Extrait avant correction :

```ts
const serviceSlugs = new Set(services.map((s) => s.slug));
const overlap = projects.filter((p) => serviceSlugs.has(p.slug));
```

Types en présence :

- `services` est déclaré avec `as const`; `services.map((s) => s.slug)` conserve donc l'union littérale stricte des neuf slugs historiques;
- `new Set(...)` infère `Set<ServiceSlug>` à partir de cette union;
- `projects` est un tableau mutable sans `as const`; la propriété `p.slug` est élargie en `string` lors de l'inférence de son tableau;
- `Set<ServiceSlug>.has()` exige un argument de type `ServiceSlug`, mais reçoit le `string` générique de `p.slug`.

L'union provient directement des littéraux `slug` du tableau canonique `services` dans `src/lib/data.ts`. L'erreur ne révèle pas une collision de données : le test d'exécution passait déjà et les collections ne partagent actuellement aucun slug. Elle révèle une incompatibilité entre un conteneur strictement typé et une entrée élargie.

### 2. Extrait après correction

```ts
type ServiceSlug = (typeof services)[number]["slug"];
const isServiceSlug = (slug: string): slug is ServiceSlug =>
  services.some((service) => service.slug === slug);
const overlap = projects.filter((project) => isServiceSlug(project.slug));
```

### 3. Justification du correctif

Le garde de type :

- dérive `ServiceSlug` de la source canonique sans recopier l'union;
- accepte la chaîne externe uniquement comme valeur à vérifier;
- ne la transforme en `ServiceSlug` qu'après une comparaison d'exécution avec les services réels;
- conserve exactement la valeur fonctionnelle du test de collision;
- continue à détecter tout futur slug de projet identique à un slug de service;
- n'utilise ni cast, ni `any`, ni directive de suppression TypeScript;
- ne modifie aucun type ni comportement applicatif.

### 4. Fichiers modifiés par R2

- `src/lib/__tests__/data.test.ts` — correction locale du contrat de types;
- `docs/governance/infotechs-baseline-001-report.md` — présente traçabilité R2.

Toutes les autres modifications du worktree sont héritées des lots précédents ou de la préparation de gouvernance de `INFOTECHS-BASELINE-001` (`.gitignore`).

### 5. Résultat du type-check

```text
Commande : npx tsc --noEmit
Code de sortie : 0
Résultat : PASS
```

### 6. Résultat du lint

```text
Commande : npm run lint
Code de sortie : 0
Résultat : PASS
```

### 7. Résultat des tests

```text
Commande : npm test
Fichiers : 20/20 PASS
Tests : 103/103 PASS
Code de sortie : 0
Durée Vitest : 2,15 s
Résultat : PASS
```

Le nombre de tests est inchangé.

### 8. Résultat du build

```text
Commande : npm run build
Code de sortie : 0
Compilation : PASS
TypeScript Next.js : PASS
Pages statiques générées : 24/24
Résultat : PASS
```

### 9. Contrôle des secrets R2

Le balayage a été repris sur les fichiers modifiés et non suivis candidats. Aucun secret réel, fichier `.env` réel, certificat, clé privée, jeton ou mot de passe n'a été détecté.

La seule correspondance textuelle demeure le nom vide `RESEND_API_KEY` dans `docs/deployment-vps.md`. `.env.example` ne contient que des valeurs vides ou locales. Les exclusions binaires établies lors du contrôle initial restent actives.

```text
CONTRÔLE DES SECRETS : PASS
```

### 10. Classification finale des candidats

Après création du rapport de gouvernance, l'inventaire contient :

```text
Fichiers non suivis candidats : 258
Fichiers suivis modifiés : 7
Total de fichiers à indexer pour la baseline : 265
```

L'écart par rapport au comptage provisoire de 257 correspond à la création du rapport de gouvernance obligatoire. Les règles de classification elles-mêmes sont inchangées.

### 11. Contrôle de l'index

L'indexation a été réalisée par groupes explicites, sans `git add .` : configuration et manifestes, `.github`, documentation, actifs publics, `src/app`, `src/components` et `src/lib`.

```text
Fichiers indexés : 265
Changements non indexés : 0
Fichiers non suivis visibles : 0
Fichiers indexés >= 10 Mio : 0
Résultat : PASS
```

Un verrou Git `.git/index.lock` vide et résiduel depuis plusieurs heures a empêché la première tentative. Après confirmation qu'aucun processus Git n'était actif et que l'index était toujours vide, seul ce verrou technique a été retiré. La seconde indexation a réussi.

Le contrôle des chemins indexés confirme :

- seul `.env.example` correspond à un nom `.env`; il est volontairement inclus et ne contient aucun secret;
- aucune archive ZIP Stitch;
- aucun rapport doublon;
- aucune capture locale ou intermédiaire exclue;
- aucun `node_modules`, `.next`, build, cache ou journal;
- aucune clé privée, certificat ou fichier secret.

### 12. Nombre de fichiers commités

```text
265 fichiers commités après contrôle de l'index — 258 ajoutés, 7 modifiés.
```

Commit de baseline : `8129e41 chore(baseline): freeze validated MVP design lots`.

### 13. Exclusions confirmées

- archives ZIP Stitch;
- doublon `docs/design/design-review-001-report.md`;
- captures locales `/screenshots/`;
- captures de fabrication intermédiaires 002A, 002E et 002F;
- vrais fichiers `.env`;
- `node_modules`, `.next`, builds, caches et journaux.

### 14. SHA final

```text
COMMIT DE BASELINE :
8129e41 chore(baseline): freeze validated MVP design lots

SHA FINAL DE BASELINE :
8129e41df61492f3ded9577abeb6d314b684d5b3
```

### 15. État final du working tree

```text
WORKING TREE APRÈS COMMIT : PROPRE
MODIFICATION FONCTIONNELLE : AUCUNE
```

## R1 — Restauration et reprise

Date de reprise : 24 juillet 2026  
Lot : `INFOTECHS-BASELINE-001-R1`  
Statut : **STOP — ANOMALIE DÉTECTÉE**

### 1. Versions Node et npm

```text
Node : v22.17.1
npm : 11.5.2
```

SHA au précontrôle :

```text
24c847d4462bb611a8379502314cbbea2be488a2
```

Vitest était déclaré dans `devDependencies` avec la plage `^3.2.4`. `package-lock.json` était présent. L'index Git était vide.

### 2. Résultat de `npm ci`

```text
Résultat : PASS
Code de sortie : 0
Paquets installés : 534
Paquets audités : 535
Paquets recherchant du financement : 190
Audit npm : 5 vulnérabilités de sévérité élevée
```

Avertissements observés :

- `tsconfck@3.1.6` est marqué non maintenu;
- npm n'a pas pu retirer un sous-répertoire résiduel de `node_modules` en raison d'un `EPERM` Windows;
- l'installation a néanmoins terminé avec le code 0.

Aucune commande `npm install`, `npm update`, `npm audit fix`, `npm audit fix --force` ou `npm dedupe` n'a été exécutée.

### 3. Disponibilité de Vitest

```text
npx vitest --version : vitest/3.2.7 win32-x64 node-v22.17.1
npm ls vitest --depth=0 : vitest@3.2.7
Résultat : PASS
```

### 4. État des manifestes après installation

Empreintes avant `npm ci` :

```text
package.json      7803E140F384926914E2A91D9F78D45D4110D81D0836CCCFF20AB5BB10486251
package-lock.json 222B1B3A81D2D77F501A9C8C098D6D76427D10FF48BC684C2FBB1971E46A0AE8
```

Empreintes après `npm ci` :

```text
package.json      7803E140F384926914E2A91D9F78D45D4110D81D0836CCCFF20AB5BB10486251
package-lock.json 222B1B3A81D2D77F501A9C8C098D6D76427D10FF48BC684C2FBB1971E46A0AE8
```

Conclusion : **MANIFESTES INCHANGÉS PAR `npm ci` — PASS**. Les différences visibles contre l'ancien `HEAD` sont héritées des lots validés et existaient avant R1.

### 5. Résultat du lint

```text
Commande : npm run lint
Code de sortie : 0
Résultat : PASS
```

### 6. Résultat des tests

```text
Commande : npm test
Fichiers : 20/20 PASS
Tests : 103/103 PASS
Code de sortie : 0
Durée Vitest : 2,28 s
Résultat : PASS
```

### 7. Résultat du type-check

TypeScript est installé et `tsconfig.json` existe. Aucune commande dédiée n'étant déclarée, la commande imposée a été exécutée :

```text
Commande : npx tsc --noEmit
Code de sortie : 2
Résultat : FAIL

src/lib/__tests__/data.test.ts(67,61): error TS2345:
Argument of type 'string' is not assignable to parameter of type
'"creation-sites-web" | "applications-web-sur-mesure" |
"applications-mobiles" | "saas-plateformes-metier" |
"refonte-sites-web" | "maintenance-optimisation" |
"automatisation-ia" | "conseil-informatique-pme" |
"cloud-support-securite"'.
```

La règle d'arrêt a été appliquée. Aucun correctif, contournement, changement de configuration TypeScript ou modification du test n'a été effectué.

### 8. Résultat du build

Le build a été exécuté dans l'ordre principal demandé, avant le type-check explicite additionnel :

```text
Commande : npm run build
Code de sortie : 0
Compilation : PASS
TypeScript intégré Next.js : PASS
Pages statiques générées : 24/24
Résultat : PASS
```

Le build Next.js n'a pas détecté l'erreur du fichier de test, alors que `npx tsc --noEmit` couvre l'ensemble configuré par `tsconfig.json`.

### 9. Liste des fichiers indexés

```text
AUCUN
```

L'index était vide avant la reprise et reste vide. L'étape d'indexation conditionnelle n'a pas été ouverte après l'échec du type-check.

### 10. Contrôle des exclusions

Les exclusions établies lors du lot initial restent en place :

- archives ZIP Stitch;
- doublon `docs/design/design-review-001-report.md`;
- dossier local `/screenshots/`;
- captures et segments intermédiaires de 002A, 002E et 002F;
- vrais fichiers `.env`;
- `node_modules`, `.next`, builds, caches et journaux.

Aucun élément exclu n'a été indexé ou supprimé. `node_modules` et `.next` restent ignorés.

### 11. Commit créé ou motif du nouveau STOP

```text
COMMIT : AUCUN
MOTIF : TYPE-CHECK FAIL — TS2345 dans src/lib/__tests__/data.test.ts:67
```

La gate `TYPE-CHECK : PASS OU ABSENCE JUSTIFIÉE` n'est pas satisfaite. Le commit de baseline reste interdit.

### 12. SHA final R1

```text
24c847d4462bb611a8379502314cbbea2be488a2
```

### 13. Working tree final R1

Le working tree reste non propre et non indexé. Il contient les livrables hérités, la modification de gouvernance de `.gitignore` et la mise à jour du présent rapport. Aucun nouveau fichier applicatif n'a été modifié par R1.

```text
NPM CI : PASS
SECRETS : PASS
LINT : PASS
TESTS : PASS — 103/103
TYPE-CHECK : FAIL
BUILD : PASS
MANIFESTES NON ALTÉRÉS PAR NPM CI : PASS
INDEX CONTRÔLÉ : NON OUVERT
BASELINE COMMIT : NON CRÉÉE
WORKING TREE : NON PROPRE
MODIFICATION FONCTIONNELLE : AUCUNE
```

### Décision R1

```text
INFOTECHS-BASELINE-001-R1 : STOP — ANOMALIE DÉTECTÉE
CORRECTION : NON AUTORISÉE DANS CE LOT
COMMIT : AUCUN
SHA : INCHANGÉ
INFOTECHS-DESIGN-COMPLETION-003A : NON OUVERT
INFOTECHS-QA-001 : NO GO
PRODUCTION : NO GO
```

## Décision finale consolidée

```text
INFOTECHS-BASELINE-001 : TERMINÉ
INFOTECHS-BASELINE-001-R1 : STOP HISTORIQUE — INSTALLATION RESTAURÉE
INFOTECHS-BASELINE-001-R2-TYPECHECK : TERMINÉ
BASELINE SHA : 8129e41df61492f3ded9577abeb6d314b684d5b3
SECRETS : PASS
LINT : PASS
TESTS : PASS — 103/103
TYPE-CHECK : PASS
BUILD : PASS — 24/24
WORKING TREE POST-BASELINE : PROPRE
MODIFICATION FONCTIONNELLE : AUCUNE
```
