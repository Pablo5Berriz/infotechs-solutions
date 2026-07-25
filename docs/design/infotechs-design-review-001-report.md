# INFOTECHS-DESIGN-REVIEW-001 — Audit de complétude du MVP public

Date de l'audit : 24 juillet 2026  
Mode : audit strict en lecture seule  
Baseline Git : `24c847d4462bb611a8379502314cbbea2be488a2` (`master`)  
Décision proposée : **NO GO QA**

## 1. Baseline Git

```text
HEAD : 24c847d4462bb611a8379502314cbbea2be488a2
Branche : master
Rapport demandé présent au début de l'audit : NON
Commit créé : AUCUN
```

Le dépôt était déjà fortement modifié avant cette revue. Ces changements sont hérités des lots antérieurs et ne sont pas attribués à `INFOTECHS-DESIGN-REVIEW-001`.

## 2. Working tree initial et final

État initial observé :

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

État final : identique, avec pour seule création imputable à cette revue :

```text
?? docs/design/infotechs-design-review-001-report.md
```

Le fichier `docs/design/design-review-001-report.md` existait déjà au début de la directive formelle et est donc un élément hérité. Aucun fichier de code, test, capture ou dépendance n'a été modifié.

## 3. Méthode d'audit

La revue a consisté à :

1. relever la baseline et l'état Git avant toute production documentaire;
2. inventorier les routes à partir de l'App Router, des segments dynamiques et des sources de données;
3. comparer routes, header, footer, CTA, sitemap, robots et métadonnées;
4. examiner les composants globaux et leurs consommateurs;
5. comparer les promesses éditoriales aux fonctions réellement disponibles;
6. examiner le formulaire, son schéma et son endpoint sans soumettre de données;
7. vérifier les questions juridiques à partir de sources officielles québécoises et canadiennes;
8. classer chaque constat avec une seule des catégories imposées.

La revue n'a exécuté ni Lighthouse, ni axe, ni test cross-browser, ni recette responsive, ni audit de vulnérabilités. Ces activités appartiennent à `INFOTECHS-QA-001`. Aucun contournement ni correctif n'a été tenté.

## 4. Fichiers et répertoires examinés

Périmètre principal :

- `src/app/**` : pages, layout, routes dynamiques, API, sitemap et robots;
- `src/components/**` : composants publics, globaux et tests associés;
- `src/lib/**` : données de services, portfolio, contenus À propos, schéma Contact et données historiques;
- `public/**` : actifs publics;
- `package.json`, `package-lock.json`, `next.config.ts`, `vitest.config.ts`;
- `docs/design/**` : rapports des lots 002B à 002F et documentation de conception pertinente.

L'inventaire a recensé 25 fichiers sous `src/app`, 18 sous `src/components`, 13 sous `src/lib` et 7 fichiers publics. Les fichiers de production ont été lus, sans modification.

## 5. Inventaire exhaustif des routes

### 5.1 Routes de contenu

| Route | Fonction | Source/état | Sitemap |
| --- | --- | --- | --- |
| `/` | Accueil | Lot 002B gelé | Oui |
| `/services` | Index Services | Lot 002C gelé | Oui |
| `/services/creation-sites-web` | Offre | `serviceOfferings` | Oui |
| `/services/automatisation-ia` | Offre | `serviceOfferings` | Oui |
| `/services/applications-web-sur-mesure` | Offre | `serviceOfferings` | Oui |
| `/realisations` | Index des concepts | Lot 002D gelé | Oui |
| `/realisations/site-web-garage-local` | Concept | `portfolioProjects` | Oui |
| `/realisations/plateforme-reservation` | Concept | `portfolioProjects` | Oui |
| `/realisations/application-gestion-interne` | Concept | `portfolioProjects` | Oui |
| `/realisations/automatisation-administrative` | Concept | `portfolioProjects` | Oui |
| `/realisations/tableau-bord-pme` | Concept | `portfolioProjects` | Oui |
| `/realisations/application-mobile-service-local` | Concept | `portfolioProjects` | Oui |
| `/a-propos` | Positionnement | Lot 002E gelé | Oui |
| `/contact` | Cadrage et formulaire | Interface présente, aucun envoi | Oui |
| `/ressources` | Rubrique éditoriale | Cinq sujets « prévus », aucun article | Oui |
| `/mentions-legales` | Informations légales | Provisoire | Oui |
| `/confidentialite` | Confidentialité | Provisoire/incomplète | Oui |
| `/fondations` | Démonstration interne | Publiquement accessible, `noindex` | Non |

Total : **18 routes de contenu accessibles**.

### 5.2 Routes techniques et implicites

| Route | État |
| --- | --- |
| `/api/contact` | `400` si invalide; `501` si valide; aucune transmission |
| `/robots.txt` | Générée par `robots.ts`; autorisation globale |
| `/sitemap.xml` | Générée par `sitemap.ts` |
| route inconnue | 404 Next.js implicite; aucun `not-found.tsx` applicatif |

Les anciens slugs de services et les slugs Réalisations inconnus sont rejetés par `notFound()`.

## 6. Analyse de la navigation

Le header expose Accueil, Services, Réalisations, À propos, Ressources et Contact sur desktop et mobile. Le footer reprend ces destinations, les trois offres, les pages juridiques et un CTA de conversion.

La hiérarchie principale est compréhensible. Deux contrats de navigation ne sont toutefois pas tenus :

- `Ressources` possède le même statut visuel qu'une rubrique terminée, alors qu'aucun article n'est consultable;
- `Planifier un appel`, `Demander un devis` et la promesse de « recevoir une première orientation » conduisent à un formulaire qui ne transmet rien.

Les ancres internes observées (`#offres`, `#concepts`, `#methode`, `#devis`, `#demande`) correspondent à des cibles existantes. Les routes dynamiques publiées depuis les index sont valides.

## 7. Inventaire de tous les CTA

### CTA de conversion vers Contact

- Démarrer un projet;
- Planifier un échange;
- Planifier un appel;
- Demander un devis;
- Discuter de votre besoin, du besoin ou de votre projet;
- Présenter votre besoin ou votre contexte;
- Parler de votre projet;
- Préparer votre demande ou la discussion.

Ils convergent principalement vers `/contact` ou `/contact#devis`. Aucun d'eux n'aboutit actuellement à un canal capable de transmettre la demande. Le libellé « Planifier un appel » ne mène à aucun calendrier ni mécanisme de réservation.

### CTA d'exploration

- découverte des offres et de leurs détails;
- exploration des concepts et concepts associés;
- retours aux index et fils d'Ariane;
- navigation par ancres sur les pages longues.

Ces CTA d'exploration pointent vers des destinations disponibles. Les cartes Ressources ne sont pas interactives et évitent ainsi des routes d'articles inexistantes, mais rendent la rubrique non exploitable.

## 8. Architecture de l'information

Le parcours Accueil → Services/Réalisations/À propos → Contact est cohérent avec un site de présentation et de conversion. Les trois offres et les six concepts sont correctement structurés par index et pages détaillées.

Les écarts d'architecture sont :

- une branche Ressources annoncée mais non livrée;
- une route interne `/fondations` encore accessible dans le produit public;
- aucune expérience 404 conçue malgré des références 404 présentes dans la documentation;
- deux composants orphelins (`ProjectFilter`, `ServiceCard`) et une source historique `projects` encore utilisée par le sitemap.

## 9. Cohérence éditoriale

Les pages gelées partagent un positionnement cohérent : cadrer le besoin avant la technologie, ne pas inventer de résultats clients et identifier les réalisations comme concepts démonstratifs.

Incohérences relevées :

- le footer affiche « Courriel à confirmer » et « Téléphone à venir » sur toutes les pages;
- la page Contact évite justement de publier des coordonnées non confirmées, ce qui contredit le footer;
- la confidentialité mentionne un téléversement prévu alors que le formulaire et son schéma excluent les fichiers;
- elle évoque aussi des fournisseurs et fonctions futurs (Resend, Supabase, CRM, analytics) dans une politique présentée au public;
- les métadonnées Ressources promettent articles et guides, alors que le contenu présente seulement des sujets futurs;
- PostgreSQL et Docker sont présentés sur l'accueil comme technologies privilégiées sans source éditoriale centralisée démontrant cette capacité pour le MVP.

## 10. Audit SEO route par route

| Route/groupe | Titre + description | Canonical local | Open Graph local | Conclusion |
| --- | --- | --- | --- | --- |
| `/` | Oui, via layout | Oui | Oui | Cohérent |
| `/services` | Oui | Oui | Oui | Cohérent |
| 3 détails Services | Oui, dynamiques | Oui | Oui | Cohérent |
| `/realisations` | Oui | Oui | Oui | Cohérent |
| 6 détails Réalisations | Oui, dynamiques | Oui | Oui | Cohérent |
| `/a-propos` | Oui | Oui | Oui | Cohérent |
| `/contact` | Oui | Non déclaré localement | Non déclaré localement | Incomplet |
| `/ressources` | Oui | Non déclaré localement | Non déclaré localement | Incomplet et contenu non livré |
| `/mentions-legales` | Oui | Non déclaré localement | Non déclaré localement | Incomplet |
| `/confidentialite` | Oui | Non déclaré localement | Non déclaré localement | Incomplet |
| `/fondations` | Oui | Sans objet | Sans objet | `noindex`, interne |

L'héritage réel du canonical et de l'Open Graph doit être vérifié dans le HTML généré pendant QA; l'audit statique établit seulement l'absence de déclarations locales.

## 11. Audit des composants publics et globaux

| Composant | Usage | État |
| --- | --- | --- |
| `SiteHeader` | Layout global | Actif; inclut CTA indisponibles fonctionnellement |
| `SiteFooter` | Layout global | Actif; coordonnées temporaires et CTA indisponible |
| `ButtonLink` | Accueil | Actif |
| `Reveal` | Accueil | Actif; reduced motion reporté à QA |
| `HomeInteractions` | Accueil | Actif |
| `BadgeConcept` | Accueil, Réalisations, Fondations | Actif |
| `ServiceExperience` | Services | Actif |
| `ProjectExperience` | Réalisations | Actif |
| `ContactForm` | Contact | Actif, mais non connecté |
| `SectionHeading` | Ressources | Actif; style historique |
| `ProjectFilter` | Aucun consommateur | Orphelin |
| `ServiceCard` | Aucun consommateur | Orphelin |

Le layout fournit la langue française, les métadonnées racines, le header et le footer. Les pages Ressources et juridiques conservent une direction visuelle antérieure au système graphite/cuivre; ce décalage devra être évalué si elles restent dans le MVP.

## 12. Pages, informations et fonctions manquantes

- un canal de contact réel : transmission, calendrier, courriel ou téléphone confirmé;
- une décision produit sur Ressources : livrer des articles ou retirer la rubrique du MVP;
- une politique de confidentialité exacte au moment où la collecte sera activée;
- des informations d'identification et de contact publiables dans les pages légales/footer;
- une 404 applicative cohérente avec l'expérience du site;
- une décision explicite sur la publication de `/fondations`;
- les canonical et Open Graph locaux manquants si les routes concernées restent publiques.

Une page Accessibilité autonome n'est pas démontrée comme obligatoire pour cette entreprise privée dans l'état des informations disponibles. Elle demeure une bonne pratique, surtout si l'entreprise souhaite publier son engagement et ses coordonnées de rétroaction.

## 13. État du footer et des coordonnées

Le footer est structurellement utilisable, accessible et cohérent avec les trois offres. Il n'est **pas publiable en l'état** : les libellés « Courriel à confirmer » et « Téléphone à venir » sont des données temporaires globales, et le CTA promet une orientation que le système ne peut recevoir.

Ces coordonnées temporaires ne rendent pas les audits techniques impossibles; elles bloquent la production. L'absence simultanée de tout canal de contact réel constitue toutefois un blocage fonctionnel avant QA, car la QA ne pourrait pas valider le parcours principal de conversion du MVP.

## 14. État du formulaire Contact

Le formulaire possède les champs attendus, une distinction HTML des champs obligatoires, un consentement, une validation partagée et une réponse d'erreur honnête. Organisation et Téléphone restent facultatifs.

Il n'est pas exploitable comme fonction MVP : une demande valide atteint `/api/contact`, qui retourne volontairement `501`; aucune donnée n'est transmise ni stockée; aucun canal alternatif confirmé n'est publié. Il peut servir de prototype d'interface, pas de formulaire public opérationnel.

## 15. Exigences légales et confidentialité

Cette section est une analyse de conformité produit, pas un avis juridique.

### Politique de confidentialité

Avant d'activer une collecte de renseignements personnels par un moyen technologique, une politique de confidentialité exacte et publiée est requise. La Commission d'accès à l'information indique que cette politique doit notamment expliquer les renseignements recueillis, les fins, les tiers, les mesures de protection, les témoins et l'exercice des droits ([CAI — collecte par les entreprises](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/collecte-renseignements-personnels_entreprises), [guide de rédaction de la CAI](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_POL_Confidentialite.pdf)).

Le formulaire actuel ne transmet pas les champs, mais cette absence ne permet pas de déclarer le site juridiquement prêt : la politique devra être alignée sur le fournisseur, la conservation, les accès, les transferts et les données réellement collectées avant activation.

### Mentions légales et conditions d'utilisation

L'audit n'établit pas une obligation générale, équivalente au régime français, d'avoir une page nommée « Mentions légales » ou des conditions d'utilisation pour un simple site vitrine québécois. L'identification honnête de l'entreprise, ses coordonnées et les obligations propres aux renseignements personnels demeurent nécessaires selon les activités. Si le site conclut des contrats à distance, les obligations d'information du commerçant deviennent pertinentes ([Office de la protection du consommateur — commerce en ligne](https://www.opc.gouv.qc.ca/enligne/)).

Des conditions d'utilisation sont recommandées si le produit ajoute comptes, transactions, téléversements, contenu utilisateur ou règles de propriété intellectuelle; elles ne sont pas démontrées comme prérequis légal du MVP vitrine actuel.

### Page Accessibilité

Le standard québécois SGQRI 008 2.0 vise les organismes publics assujettis, et l'audit ne dispose d'aucun élément établissant qu'Infotechs Solutions appartient à cette catégorie ([Gouvernement du Québec — standard d'accessibilité](https://www.quebec.ca/gouvernement/ministeres-organismes/cybersecurite-numerique/publications/standard-accessibilite-sites-web)). Une page Accessibilité autonome n'est donc pas établie comme obligatoire. L'accessibilité du service, elle, reste un objectif de qualité à certifier en QA.

### Bannière de consentement

Aucun script d'analytics, de publicité ou de traçage non essentiel n'a été identifié dans le code audité. Dans cet état, aucune bannière de consentement aux témoins n'est requise par la fonctionnalité observée. Cette conclusion doit être réévaluée avant toute intégration de mesure d'audience ou de témoins non essentiels; le consentement doit être valide pour les usages qui le nécessitent ([Commissariat à la protection de la vie privée du Canada — témoins](https://www.priv.gc.ca/fr/sujets-lies-a-la-protection-de-la-vie-privee/technologie/suivi-en-ligne-profilage-temoins/temoins/foire-aux-questions-au-sujet-des-temoins-cookies/)).

## 16. Sitemap, robots, canonical et Open Graph

Le sitemap publie les routes principales, les trois offres et six slugs Réalisations. Il exclut correctement `/fondations` et les routes techniques. Il n'est néanmoins pas l'expression exacte d'un MVP terminé : il publie `/ressources` et les pages juridiques provisoires.

Les slugs Réalisations du sitemap proviennent de `projects` dans `src/lib/data.ts`, alors que les pages validées utilisent `portfolioProjects`. Les valeurs coïncident aujourd'hui, mais cette double source crée un risque de divergence. Toutes les dates `lastModified` sont générées avec `new Date()` et ne reflètent pas une date éditoriale stable.

`robots.ts` autorise globalement l'exploration. `/fondations` dépend de sa seule métadonnée `noindex/no-follow` et reste accessible. Les canonical et Open Graph sont solides pour les pages métier gelées, mais ne sont pas déclarés localement sur Contact, Ressources, Mentions légales et Confidentialité.

## 17. Constats classifiés

Chaque ligne reçoit exactement une classification.

| ID | Classification | Constat | Décision attendue |
| --- | --- | --- | --- |
| C-01 | BLOQUANT AVANT QA | Aucun canal de contact ne permet d'envoyer une demande et aucun canal alternatif confirmé n'est publié. | Ouvrir un lot fonctionnel de contact. |
| C-02 | BLOQUANT AVANT QA | Ressources est annoncée dans le header, le footer et le sitemap, mais aucun contenu n'est consultable. | Livrer la rubrique ou la retirer du MVP. |
| C-03 | BLOQUANT AVANT PRODUCTION | La politique de confidentialité est provisoire et ne décrit pas encore une collecte réellement activée. | Validation juridique après choix du mécanisme de contact. |
| C-04 | BLOQUANT AVANT PRODUCTION | Le footer publie des coordonnées temporaires sur toutes les pages. | Confirmer/remplacer les coordonnées avant mise en ligne. |
| C-05 | BLOQUANT AVANT PRODUCTION | Les vulnérabilités de dépendances déjà documentées ne sont pas encore traitées ou acceptées. | Lot sécurité/dépendances distinct; aucun `audit fix --force`. |
| C-06 | IMPORTANT | Plusieurs CTA promettent appel, devis ou orientation sans fonction correspondante. | Aligner les libellés et le parcours sur la capacité réelle. |
| C-07 | IMPORTANT | Aucun `not-found.tsx` ne fournit une vraie page 404 de marque. | Décider et couvrir en lot fonctionnel avant gel final. |
| C-08 | IMPORTANT | `/fondations` est une démonstration interne publiquement accessible. | Exclure, protéger ou assumer explicitement sa publication. |
| C-09 | IMPORTANT | Contact, Ressources et pages juridiques n'ont ni canonical ni Open Graph locaux. | Compléter si ces routes restent publiques. |
| C-10 | IMPORTANT | Sitemap et rendu Réalisations reposent sur deux sources de données différentes. | Dériver le sitemap de `portfolioProjects`. |
| C-11 | IMPORTANT | Les pages juridiques et Ressources restent visuellement héritées et décalées du système validé. | Harmoniser si elles appartiennent au MVP. |
| C-12 | MINEUR | `ProjectFilter` et `ServiceCard` n'ont aucun consommateur applicatif. | Nettoyage ultérieur documenté. |
| C-13 | MINEUR | `lastModified` du sitemap correspond au moment du build plutôt qu'à la dernière modification éditoriale. | Utiliser des dates stables lors d'une maintenance SEO. |
| C-14 | MINEUR | La liste de technologies de l'accueil n'est pas rattachée à une source éditoriale probante. | Qualifier la liste comme capacités ou la documenter. |
| C-15 | RECOMMANDATION | Publier une page Accessibilité et un canal de rétroaction lorsque les coordonnées seront confirmées. | Bonne pratique, non prérequis légal démontré. |
| C-16 | RECOMMANDATION | Centraliser les libellés et destinations des CTA globaux. | Réduire les divergences futures. |
| C-17 | HORS PÉRIMÈTRE | Lighthouse, axe, reduced motion, lecteurs d'écran et cross-browser. | À exécuter dans `INFOTECHS-QA-001` après complétion. |
| C-18 | HORS PÉRIMÈTRE | Correction des vulnérabilités et décision d'acceptation du risque. | Lot sécurité/maintenance séparé avant production. |

## 18. Risques avant QA

La QA transversale ne pourrait pas certifier le parcours principal « intérêt → demande → réception », car la dernière étape n'existe pas. Elle testerait aussi une rubrique Ressources dont le périmètre n'est pas décidé. Lancer la QA maintenant entraînerait soit des résultats artificiellement incomplets, soit la réouverture immédiate de pages globales gelées.

Un lot correctif fonctionnel est donc nécessaire avant QA. Il doit décider au minimum :

1. le canal de contact réellement exploitable;
2. le maintien ou le retrait de Ressources;
3. la destination et le libellé des CTA globaux;
4. la présence de la 404 et de `/fondations` dans le MVP final.

## 19. Risques avant production

Même après complétion fonctionnelle, la production reste en NO GO tant que ne sont pas clos :

- la politique de confidentialité et les informations légales exactes;
- les coordonnées temporaires du footer;
- les vulnérabilités de dépendances documentées;
- `INFOTECHS-QA-001`, incluant Lighthouse, axe, reduced motion, clavier, responsive et cross-browser;
- la validation du déploiement, des variables, du fournisseur de contact et des journaux;
- la vérification juridique finale selon les fonctions réellement activées.

## 20. Recommandation finale

### Réponses sans ambiguïté

| Question | Réponse |
| --- | --- |
| Toutes les pages nécessaires au MVP existent-elles ? | **Non.** Les cinq pages métier existent, mais Ressources est inachevée et l'expérience 404 de marque manque; surtout, la fonction Contact n'est pas opérationnelle. |
| Une politique de confidentialité est-elle obligatoire avant activation du formulaire ? | **Oui**, avant toute collecte effective de renseignements personnels par le site; elle doit décrire le fonctionnement réel et être validée juridiquement. |
| Des mentions légales ou conditions d'utilisation sont-elles requises ? | **Pas sous une forme générique démontrée pour ce site vitrine.** Les informations d'entreprise et obligations sectorielles doivent être exactes; les conditions deviennent pertinentes si transactions, comptes ou contenu utilisateur sont ajoutés. |
| Une page Accessibilité est-elle nécessaire ? | **Non comme obligation démontrée dans l'état actuel; recommandée comme bonne pratique.** |
| Une vraie page 404 existe-t-elle ? | **Non.** Seule la 404 implicite de Next.js existe. |
| Le footer est-il publiable ? | **Non.** Il contient des coordonnées temporaires et une promesse de conversion indisponible. |
| Les coordonnées temporaires bloquent-elles la QA ou seulement la production ? | **Elles bloquent la production.** L'absence totale de canal réel, prise globalement avec Contact, bloque aussi la QA fonctionnelle. |
| Le formulaire actuel permet-il un MVP exploitable ? | **Non.** Il valide l'interface mais ne transmet ni ne stocke aucune demande. |
| Une bannière de consentement est-elle requise dans l'état actuel ? | **Non**, aucun traçage non essentiel n'a été identifié; réévaluation obligatoire si analytics/cookies sont ajoutés. |
| Le sitemap reflète-t-il exactement les routes publiques ? | **Il reflète les routes publiées voulues, mais pas un MVP finalisé** : il inclut Ressources et les pages juridiques provisoires, et utilise une source Réalisations parallèle. |
| Toutes les routes possèdent-elles des métadonnées cohérentes ? | **Non.** Contact, Ressources et les pages juridiques n'ont pas de canonical/OG locaux; Fondations est correctement `noindex`. |
| Existe-t-il des routes, composants ou contenus hérités ? | **Oui.** `/fondations`, `ProjectFilter`, `ServiceCard`, `projects` dans `data.ts`, ainsi que le style historique des pages Ressources/juridiques. |
| Des CTA pointent-ils vers des fonctions indisponibles ? | **Oui.** Appel, devis et orientation convergent vers un formulaire non transmetteur. |
| Le site peut-il entrer en QA sans lot correctif préalable ? | **Non.** Un dernier lot fonctionnel doit fixer le périmètre et le parcours Contact/Ressources avant la recette transversale. |

### Décision proposée

```text
COMPLÉTUDE FONCTIONNELLE MVP : FAIL
INFOTECHS-QA-001 : NO GO
LOT FONCTIONNEL DE COMPLÉTION : REQUIS
PRODUCTION : NO GO

CODE : INCHANGÉ
TESTS : INCHANGÉS
DÉPENDANCES : INCHANGÉES
LIVRABLES 002B → 002F : INCHANGÉS
COMMIT : AUCUN
```

Recommandation de l'agent : **NO GO QA**.
