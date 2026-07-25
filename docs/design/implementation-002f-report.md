# Rapport d’implémentation — INFOTECHS-DESIGN-IMPLEMENTATION-002F

Date d’exécution : 24 juillet 2026 (America/Toronto)  
Baseline Git : `24c847d4462bb611a8379502314cbbea2be488a2`  
Périmètre : `/contact`, composant et validation Contact, tests, rapport et captures uniquement.

## 1. Audit initial

| Élément audité | État avant 002F | Niveau de preuve | Décision 002F |
| --- | --- | --- | --- |
| Contenu | Hero générique orienté « développeur web PME », puis formulaire | Code de `src/app/contact/page.tsx` | Repositionné comme discussion de cadrage |
| Formulaire | Validation locale avec délai artificiel et état « Demande validée » | Code de `src/components/contact-form.tsx` | Faux signal de succès retiré; vérification locale explicitée |
| Backend | Route `/api/contact` validant le schéma puis retournant `501`; aucun fournisseur actif | Code de `src/app/api/contact/route.ts` | Inchangé; aucune transmission simulée |
| CTA | Liens entrants directs vers `/contact` et `/contact#devis` depuis les pages gelées, le header et le footer | Recherche des `href` dans `src/` | Ancre `#devis` conservée sur le formulaire |
| Types de projets | Anciennes catégories : mobile, SaaS, maintenance/refonte, conseil, etc. | Formulaire et schéma existants | Remplacées par les quatre catégories compatibles avec 002C |
| Validations | Nom, courriel, téléphone, type, budget, délai et message | Schéma Zod et 8 tests existants | Nom, courriel, type, description et consentement requis; organisation et téléphone optionnels |
| Métadonnées | Titre SEO ancien et description contenant des catégories non retenues | Export `metadata` de la page | Titre absolu et description centrée sur le cadrage |
| Tests | 8 tests du schéma; aucun test de page Contact | Inventaire Vitest | 7 tests de page ajoutés; 8 tests de schéma consolidés |

### Classification des informations

| Information | Classification | Publication dans `/contact` |
| --- | --- | --- |
| Nom « Infotechs Solutions » | Information publiée | Oui |
| Saint-Louis-de-Gonzague, Montérégie, Québec | Information publiée | Oui, comme ancrage et non comme bureau |
| Courriel (`NEXT_PUBLIC_CONTACT_EMAIL`) | Information configurable | Absent tant que non configuré |
| Téléphone (`NEXT_PUBLIC_CONTACT_PHONE`) | Information configurable | Absent tant que non configuré |
| Adresse civique / bureau | Information non validée | Absente |
| « Courriel à confirmer » / « Téléphone à venir » | Information temporaire | Retirée de la page Contact |
| Budget et délai souhaité | Information à retirer du formulaire de cadrage initial | Retirés |
| Promesse de réponse, devis ou disponibilité | Information non validée | Absente |

Le footer global gelé contient toujours les libellés temporaires « Courriel à confirmer » et « Téléphone à venir ». Ils sont hérités d’un lot clos et n’ont pas été modifiés dans 002F. La page Contact elle-même ne les publie plus comme coordonnées.

## 2. Décisions éditoriales

- Le H1 répond immédiatement à la logique de cadrage : « Décrivons votre besoin avant de choisir une solution. »
- Le hero explique pourquoi contacter Infotechs Solutions et renvoie vers le formulaire et les Services.
- La section « Informations utiles » précise ce qu’il faut préparer : contexte, utilisateurs, objectif, outils, contraintes et échéances connues.
- La section « Après réception d’une demande » décrit lecture, clarification et prochaine étape, sans suggérer qu’une transmission a déjà eu lieu ni garantir de délai.
- La FAQ contient quatre questions, toutes compatibles avec les offres et le positionnement validés.
- Le CTA final demande uniquement contexte, utilisateurs, objectifs et contraintes.

## 3. Informations publiées, temporaires et configurables

- **Email** : configurable, variable `NEXT_PUBLIC_CONTACT_EMAIL`, valeur absente, non publié.
- **Téléphone** : configurable, variable `NEXT_PUBLIC_CONTACT_PHONE`, valeur absente, non publié.
- **Localisation** : publiée comme ancrage à Saint-Louis-de-Gonzague, Montérégie, Québec.
- **Adresse** : absente; aucun bureau ni adresse inventés.
- **Informations temporaires** : aucune dans le contenu propre à `/contact`.

## 4. Formulaire et stratégie honnête

Le formulaire est une interface de préparation prête à être connectée. Il ne transmet ni ne stocke aucune donnée. Le bouton « Vérifier les informations » déclenche uniquement la validation locale, et le statut éventuel dit explicitement : « Aucun message n’a été envoyé. »

La route existante `/api/contact` reste inchangée et retourne `501` lorsqu’aucun fournisseur réel n’est activé. Aucun faux succès, délai artificiel, promesse de réponse ou fournisseur fictif n’est introduit.

Champs :

1. Nom — requis;
2. Organisation — optionnelle;
3. Courriel — requis et validé;
4. Téléphone — optionnel, minimum sept caractères lorsqu’il est renseigné;
5. Type de besoin — requis;
6. Description — requise, minimum vingt caractères;
7. Consentement explicite — requis.

Types exacts : `Site web`, `Automatisation`, `Application web`, `Autre besoin`.

## 5. Accessibilité

- un seul H1;
- sept labels associés aux champs;
- bouton natif;
- erreurs `role="alert"` et statut `role="status"`;
- `aria-invalid` et `aria-describedby` associés aux erreurs;
- ordre DOM cohérent avec l’ordre visuel;
- focus visible hérité du système validé;
- champs et CTA principaux de 44 px ou plus;
- case visible de 20 px incluse dans un label interactif `min-height: 44px`;
- soumission vide testée dans le navigateur : six erreurs accessibles, aucune navigation et aucune transmission.

## 6. Responsive

Contrôle navigateur réel à 390, 768, 1280 et 1440 px :

| Largeur demandée | `innerWidth` | `scrollWidth` du document | Scroll horizontal | H1 | Labels |
| ---: | ---: | ---: | --- | ---: | ---: |
| 390 | 390 | 375 | Aucun | 1 | 7 |
| 768 | 768 | 753 | Aucun | 1 | 7 |
| 1280 | 1280 | 1265 | Aucun | 1 | 7 |
| 1440 | 1440 | 1425 | Aucun | 1 | 7 |

Le différentiel de 15 px correspond à la barre de défilement verticale du navigateur. Les labels ne sont pas coupés, les champs restent lisibles, les CTA ne débordent pas et la grille passe correctement d’une à deux colonnes.

## 7. SEO

- Titre final dans le HTML de production : `Contact | Infotechs Solutions`.
- Le titre utilise `{ absolute: ... }` afin d’éviter la duplication par le template global.
- Description : prise de contact, contexte, utilisateurs, objectifs et discussion de cadrage.
- Route statique `/contact` générée au build.

## 8. Fichiers du lot

### Modifiés (existants avant 002F)

- `src/app/contact/page.tsx`
- `src/components/contact-form.tsx`
- `src/lib/contact-schema.ts`
- `src/lib/__tests__/contact-schema.test.ts`

### Créés

- `src/app/contact/__tests__/contact-page.test.tsx`
- `docs/design/implementation-002f-report.md`
- `docs/design/screens/implementation-002f/` (preuves visuelles)

`src/app/api/contact/route.ts` a été audité mais reste inchangé.

## 9. Tests, lint et build

Validation sur système de fichiers Linux natif, image `node:22-bookworm`, après copie propre et `npm ci` :

```text
npm ci       : PASS — 419 paquets installés
npm run lint : PASS — 0 erreur
npm run test : PASS — 103/103, 20 fichiers
npm run build: PASS — Next.js 16.2.9, 24 pages statiques générées
```

Tests 002F :

- 8 tests de page ajoutés, dont une vérification du HTML rendu pour les contrôles requis et facultatifs;
- 8 tests du schéma Contact consolidés;
- total du projet passé de 95 à 103 tests;
- H1, formulaire, labels, CTA, liens, catégories, absence de promesses et coordonnées inventées, métadonnées, champs requis et consentement couverts.

## 10. Démarrage et HTTP

Serveur de production : `next start -p 3000`, prêt en 127 ms.

```text
GET /contact  : HTTP 200
GET /services : HTTP 200
```

Le HTML servi contient exactement `<title>Contact | Infotechs Solutions</title>`.

## 11. Captures

Quinze preuves PNG sont présentes dans `docs/design/screens/implementation-002f/` :

1. `contact-390.png` — 390 × 6318;
2. `contact-768.png` — 768 × 5455;
3. `contact-1280.png` — 1280 × 3775;
4. `contact-1440.png` — 1440 × 3777;
5. `contact-hero-390.png`;
6. `contact-form-390.png`;
7. `contact-form-1280.png`;
8. `contact-process-1280.png`;
9. `contact-faq-390.png`;
10. `contact-final-cta-390.png`;
11. `contact-process-390.png`;
12. `contact-faq-1280.png`;
13. `contact-final-cta-1280.png`;
14. `contact-preparation-768.png`;
15. `contact-form-consent-390.png`.

Les quatre preuves pleine hauteur ont été assemblées à partir de segments réels du navigateur pour contourner sa limite de capture verticale de 4096 px; aucune retouche de contenu n’a été appliquée.

## 12. Contrôle des fichiers gelés

Une baseline SHA-256 de 589 fichiers hors périmètre a été établie avant l’implémentation, puis recalculée après les validations et captures : `0` fichier manquant ou différent.

```text
FICHIERS 002B : INCHANGÉS
FICHIERS 002C : INCHANGÉS
FICHIERS 002D : INCHANGÉS
FICHIERS 002E : INCHANGÉS
```

## 13. Dépendances

Aucune dépendance ajoutée, retirée ou mise à jour.

```text
package.json      SHA-256 7803E140F384926914E2A91D9F78D45D4110D81D0836CCCFF20AB5BB10486251
package-lock.json SHA-256 222B1B3A81D2D77F501A9C8C098D6D76427D10FF48BC684C2FBB1971E46A0AE8
```

`npm ci` signale cinq vulnérabilités de sévérité élevée déjà documentées. Aucun `npm audit fix --force` n’a été exécuté.

## 14. État Git

```text
HEAD : 24c847d4462bb611a8379502314cbbea2be488a2
Commit créé : aucun
```

Le worktree était déjà fortement modifié et non suivi au démarrage des lots. Les changements suivis historiques (`README.md`, `package*.json`, `globals.css`, `layout.tsx`, `page.tsx`) sont hérités et n’ont pas été modifiés par 002F. Les fichiers Contact étant non suivis par rapport au HEAD ancien, `git diff` ne peut pas isoler leur delta; la baseline de fichiers avant lot sert de preuve d’attribution et d’intégrité.

## 15. Limites connues

- aucun fournisseur d’envoi ou stockage Contact n’est configuré;
- la route API reste volontairement en `501`;
- les libellés temporaires du footer global restent visibles parce que 002C est gelé;
- cinq vulnérabilités élevées héritées maintiennent le NO GO Production;
- Lighthouse, axe, cross-browser, performance transversale et recette `prefers-reduced-motion` restent dans `INFOTECHS-QA-001`.

## 16. Correctif 002F-R1

La revue PM initiale a accepté la direction visuelle, le responsive, le positionnement et la stratégie du formulaire, mais a relevé l’absence d’indication sémantique préalable sur les champs obligatoires.

Correctifs appliqués :

- le composant `Field` transmet désormais `required` et `aria-required="true"` au contrôle lorsque sa propriété `required` est active;
- Nom, Courriel, Type de besoin et Description reçoivent ces attributs par ce mécanisme;
- Consentement porte directement `required` et `aria-required="true"`;
- Organisation et Téléphone restent dépourvus de ces attributs et donc facultatifs;
- l’étoile visuelle reste masquée aux technologies d’assistance, puisque la sémantique est maintenant portée par le contrôle lui-même;
- « Après votre message » est remplacé par « Après réception d’une demande »;
- un test du HTML rendu couvre les cinq contrôles obligatoires et les deux contrôles facultatifs.

Revalidation Linux native après R1 :

```text
ACCESSIBILITÉ CHAMPS REQUIS : PASS
TESTS : PASS — 103/103 dans 20 fichiers
LINT : PASS — 0 erreur
BUILD : PASS — 24 pages statiques générées
CAPTURES : INCHANGÉES — mise en page inchangée
```

## 17. Recommandation de clôture

```text
INFOTECHS-DESIGN-IMPLEMENTATION-002F

DÉVELOPPEMENT : TERMINÉ
PAGE /CONTACT : PASS
FORMULAIRE : PASS
POSITIONNEMENT : PASS
AUCUNE DONNÉE INVENTÉE : PASS
COORDONNÉES COHÉRENTES : PASS
FAQ : PASS
ACCESSIBILITÉ : PASS
RESPONSIVE : PASS
SEO : PASS
TESTS : PASS — 103/103
LINT : PASS
BUILD : PASS
HTTP : PASS
15 CAPTURES : PASS
RAPPORT : PASS

FICHIERS 002B : INCHANGÉS
FICHIERS 002C : INCHANGÉS
FICHIERS 002D : INCHANGÉS
FICHIERS 002E : INCHANGÉS
DÉPENDANCES : INCHANGÉES
COMMIT : AUCUN

REVUE VISUELLE PM : PASS
RECOMMANDATION DE CLÔTURE 002F : GO
PASSAGE AU LOT SUIVANT : EN ATTENTE DE LA DÉCISION PM DE CLÔTURE
PRODUCTION : NO GO
```
