# INFOTECHS-PRODUCT-EVOLUTION-004B — Navigation et coordonnées

```text
LOT : INFOTECHS-PRODUCT-EVOLUTION-004B-NAVIGATION-CONTACT
STATUT : TERMINÉ — EN ATTENTE DE VALIDATION PM
PRODUCTION : NO GO
```

## 1. Baseline

```text
BRANCHE : master
SHA INITIAL : a5fa17b5211bd37f658f8ce66a8d601da82ffdae
WORKING TREE INITIAL : PROPRE
COMMIT 004B : AUCUN
```

Les livrables Security et 004A sont restés gelés. Aucune dépendance, configuration de sécurité, fonctionnalité de déploiement, traduction, variante de thème ou couche CMS n'a été ajoutée.

## 2. Redondance avant et décision CTA

Avant 004B, le header desktop présentait le lien de navigation `Contact`, un bouton `Nous contacter` et le CTA `Transmettre une demande`. Cette juxtaposition créait deux actions de contact concurrentes.

Après 004B :

- la navigation conserve `Accueil`, `Services`, `Réalisations`, `À propos` et `Contact` ;
- `Nous contacter` est supprimé ;
- un seul CTA principal visible est conservé dans le header desktop et dans le menu mobile ;
- son libellé et sa cible proviennent exclusivement de `siteConfig.primaryCta` : `Transmettre une demande` vers `/contact#devis` ;
- les comportements existants `aria-current`, focus, fermeture du menu et retour du focus sont préservés.

## 3. Configuration canonique

`src/lib/site-config.ts` centralise désormais :

- le CTA principal ;
- l'adresse d'affaires et sa nature ;
- la localité, la région et les codes structurés `QC` / `CA` ;
- le téléphone d'affichage, le lien `tel:` et la valeur Schema.org normalisée ;
- les libellés d'horaires, les jours Schema.org, les heures normalisées et le fuseau `America/Toronto` ;
- le courriel public, toujours conditionnel à `NEXT_PUBLIC_CONTACT_EMAIL`.

Les composants consomment cette configuration et ne dupliquent pas les valeurs techniques. Aucun code postal n'est configuré ou publié.

## 4. Coordonnées publiées

```text
NATURE : Adresse d’affaires — visites sur rendez-vous
ADRESSE : 164 rue Principale
LOCALITÉ : Saint-Louis-de-Gonzague (Québec)
RÉGION : Montérégie
TÉLÉPHONE AFFICHÉ : 514 208-3644
LIEN TÉLÉPHONE : tel:+15142083644
HEURES : Lundi au vendredi, 9 h à 17 h
FUSEAU : America/Toronto
COURRIEL : conditionnel à NEXT_PUBLIC_CONTACT_EMAIL
CODE POSTAL : NON PUBLIÉ
```

La formulation interdit toute interprétation comme accueil libre du public. La page Contact recommande toujours le formulaire pour transmettre une demande détaillée et ne promet aucun délai de réponse.

## 5. Stratégie téléphone

Le téléphone utilise trois représentations explicites :

- `display` pour la lecture humaine ;
- `href` au format international pour l'action accessible ;
- `schema` au format E.164 pour les données structurées.

Cette séparation évite d'utiliser une chaîne de présentation comme valeur technique.

## 6. Stratégie heures et préparation i18n

Les heures ne sont pas une chaîne opaque. Le type `BusinessHours` sépare :

- `daysLabel` et `hoursLabel`, remplaçables lors d'une future traduction ;
- `schemaDays`, `opens` et `closes`, indépendants de la langue ;
- `timezone`, fixé à `America/Toronto`.

La structure pourra évoluer pour les jours fériés sans modifier les consommateurs. Aucun système i18n n'a été introduit dans ce lot.

## 7. Schema.org

Le `LocalBusiness` publie maintenant :

- `telephone: +15142083644` ;
- une `PostalAddress` avec `streetAddress`, `addressLocality`, `addressRegion` et `addressCountry` ;
- une `OpeningHoursSpecification` du lundi au vendredi, de `09:00` à `17:00` ;
- le courriel seulement lorsqu'il est configuré.

Le schéma ne contient ni placeholder ni `postalCode`. Les valeurs correspondent à l'interface publique.

## 8. Pages et composants affectés

```text
MODIFIÉS :
- src/app/confidentialite/page.tsx
- src/app/contact/page.tsx
- src/app/mentions-legales/page.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/lib/schema-org.ts
- src/lib/site-config.ts

TESTS MODIFIÉS :
- src/app/confidentialite/__tests__/privacy-contact.test.tsx
- src/app/contact/__tests__/contact-page.test.tsx
- src/components/__tests__/site-footer.test.tsx
- src/components/__tests__/site-header.test.tsx
- src/lib/__tests__/content-consolidation.test.ts
- src/lib/__tests__/schema-org.test.ts

CRÉÉ :
- docs/product/infotechs-product-evolution-004b-navigation-contact.md
```

Les pages légales ont uniquement reçu la formulation cohérente sur la nature de l'adresse et les visites sur rendez-vous.

## 9. Tests et validations techniques

```text
npm ci : PASS
npx tsc --noEmit : PASS
npm run lint : PASS
npm test : PASS — 184/184 dans 29 fichiers
npm run build : PASS — 22/22 routes
git diff --check : PASS
```

Couverture ajoutée ou adaptée : suppression de l'ancien CTA, dérivation du CTA canonique desktop/mobile, présence de `Contact`, coordonnées visibles, téléphone accessible, heures, rendez-vous, source canonique, email conditionnel, adresse et horaires Schema.org, téléphone normalisé et absence de code postal.

`npm ci` conserve les 12 vulnérabilités déjà documentées par Security. Un avertissement Windows `EPERM` de nettoyage d'un répertoire transitoire a été émis sans affecter l'installation ni les validations.

## 10. Validation responsive et multi-navigateurs

Build de production testé sur les routes `/`, `/contact`, `/mentions-legales` et `/confidentialite` :

| Moteur | 390 px | 1280 px |
|---|---|---|
| Chrome | PASS — 4/4 | PASS — 4/4 |
| Firefox | PASS — 4/4 | PASS — 4/4 |
| WebKit | PASS — 4/4 | PASS — 4/4 |

Pour les 24 combinaisons : HTTP 200, H1 visible, footer présent, téléphone cliquable, adresse/heures/rendez-vous visibles, aucun scroll horizontal, aucune troncature détectée et aucune erreur console.

Contrôle spécifique du header sur les trois moteurs :

- desktop : un seul CTA `Transmettre une demande`, `Contact` conservé, ancien CTA absent ;
- mobile après ouverture du menu : un seul CTA `Transmettre une demande`, `Contact` conservé, ancien CTA absent ;
- aucun trou d'alignement ou débordement observé ;
- aucune modification de la CSP.

## 11. Risques résiduels

- La publication conditionnelle du courriel dépend de la variable d'environnement de chaque cible.
- Aucun code postal n'est publié tant qu'une valeur validée n'est pas fournie.
- Les horaires spéciaux et jours fériés ne sont pas encore modélisés.
- Les vulnérabilités acceptées du lot Security restent des réserves de production.
- Les validations de déploiement restent hors périmètre et la production demeure `NO GO`.

## 12. Correctif R1 — alignement avec Security H2

La revue PM a identifié une formulation juridique héritée qui attribuait encore au User-Agent un rôle dans la clé du rate limiter. Cette affirmation ne correspondait plus à l'implémentation Security H2.

La politique décrit désormais les deux comportements réels sans présumer qu'une adresse publique est toujours fiable :

- en mode proxy validé, une identité réseau normalisée issue de l'en-tête interne contrôlé peut être utilisée ;
- en mode non fiable, un identifiant conservateur partagé de remplacement est utilisé ;
- seule une clé hachée temporaire est conservée par le limiteur ;
- l'adresse réseau brute n'est pas conservée dans le limiteur ;
- le User-Agent ne participe pas à la clé ;
- aucune confiance automatique n'est attribuée à un en-tête Cloudflare.

Un test juridique dédié protège ces invariants. Le correctif ne modifie aucune logique Security.

## 13. Recommandation PM

```text
NAVIGATION : PASS
CTA UNIQUE : PASS
CONFIGURATION CANONIQUE : PASS
COORDONNÉES PUBLIQUES : PASS
CONTACT : PASS
FOOTER : PASS
PAGES LÉGALES CIBLÉES : PASS
SCHEMA.ORG : PASS
TESTS : PASS — 185/185
BUILD : PASS — 22/22
RESPONSIVE MULTI-NAVIGATEURS : PASS — 24/24
RÉGRESSIONS : AUCUNE DÉTECTÉE

ALIGNEMENT SECURITY H2 : PASS
RECOMMANDATION : GO POUR VALIDATION PM DU LOT 004B-R1
COMMIT : AUCUN
PRODUCTION : NO GO
```
