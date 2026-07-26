# INFOTECHS-PRODUCT-EVOLUTION-004C-1 — Audit du portfolio de services

```text
LOT : INFOTECHS-PRODUCT-EVOLUTION-004C-1-SERVICE-PORTFOLIO-AUDIT
STATUT : AUDIT TERMINÉ — EN ATTENTE DE DÉCISION PM
MODE : ANALYSE UNIQUEMENT
PRODUCTION : NO GO
```

## 1. Baseline

```text
BRANCHE : master
SHA INITIAL : fa52cc10c5d045231dffe4799c5e377cb316a2d1
WORKING TREE INITIAL : PROPRE
CODE MODIFIÉ : AUCUN
COMMIT : AUCUN
```

Les lots Security, 004A et 004B restent gelés. Le seul fichier créé par cette phase est le présent rapport.

## 2. État actuel

La source canonique `src/lib/service-offerings.ts` publie trois offres :

1. Création de sites web — présence numérique et refonte;
2. Automatisation et IA — processus, intégrations et suivis ciblés;
3. Applications web sur mesure — outils métier, portails et tableaux de bord.

Les routes, le sitemap, le footer et les pages détaillées sont dérivés de cette source. La page Services et ses métadonnées parlent explicitement de « trois services » et de « trois domaines ». L'accueil possède encore une présentation éditoriale locale de trois services dans `featuredServices`. Le formulaire propose `Site web`, `Automatisation`, `Application web` et `Autre besoin`.

Le modèle `ServiceOffering` contient déjà les champs demandés pour les offres candidates, sauf la distinction structurée entre inclus, exclus, prérequis et mode d'engagement. Ces limites peuvent être exprimées dans `capabilities`, `deliverables` et `considerations`, mais un futur CMS gagnerait à les modéliser explicitement.

## 3. Maintenance et évolution

### Positionnement

Offre post-livraison ou de reprise encadrée, distincte de la construction initiale. Elle vise à préserver l'utilité, la stabilité et la maintenabilité d'un produit numérique par interventions planifiées. Elle ne constitue ni une infogérance, ni une cybersécurité managée, ni une disponibilité permanente.

### Inclus possible

- diagnostic initial et inventaire des responsabilités;
- corrections reproductibles sur le périmètre accepté;
- mises à jour techniques planifiées après analyse de compatibilité;
- suivi courant des dépendances et recommandations de remédiation;
- contrôles fonctionnels convenus sur des parcours identifiés;
- petites évolutions priorisées et estimées avant intervention;
- assistance éditoriale sur les composants et contenus existants;
- amélioration progressive de performance, accessibilité et maintenabilité;
- documentation des changements et recommandations de suivi;
- sauvegardes uniquement lorsqu'elles sont disponibles, vérifiables et attribuées dans l'hébergement retenu.

### Exclus

- support permanent ou surveillance 24 h/24;
- intervention immédiate, astreinte et délai public garanti;
- garantie de restauration, de disponibilité ou de continuité d'activité;
- cybersécurité managée, SOC, réponse à incident avancée ou test d'intrusion;
- hébergement automatiquement inclus;
- reprise sans audit d'un système inconnu, non maintenable ou sans accès licite;
- licences, services tiers, contenu, conseil juridique et conformité spécialisée;
- évolution majeure assimilable à un nouveau projet sans nouveau cadrage.

### Prérequis opérationnels

- audit d'admissibilité technique, fonctionnel et contractuel;
- accès documentés au code, au déploiement, aux comptes et aux sauvegardes utiles;
- propriétaire désigné pour chaque compte, donnée et fournisseur;
- baseline connue, environnement reproductible et stratégie de retour arrière proportionnée;
- périmètre, canal, priorités, fenêtre d'intervention et responsabilités écrits;
- processus d'autorisation avant toute dépense ou action à risque;
- capacité interne réelle à recevoir, qualifier et planifier les demandes;
- politique de fin de service et de transfert.

### Mode d'engagement recommandé

```text
PAR DÉFAUT : ponctuel, sur demande qualifiée et estimée
OPTION FUTURE : banque d'heures avec règles d'expiration et de priorité
RÉCURRENT : uniquement après validation de la capacité et d'un périmètre contractuel
```

Le mode récurrent ne doit pas être publié avant définition du niveau de service, de la facturation, des exclusions, du traitement des urgences et des périodes d'indisponibilité. Aucun prix ni délai public n'est recommandé.

### Canal de support

Le formulaire actuel peut recevoir une première demande non urgente. Un canal opérationnel dédié, traçable et avec accusé de réception non contractuel doit être choisi avant une offre récurrente. Le téléphone public ne doit pas devenir implicitement une ligne d'urgence. Les échanges dispersés par messagerie personnelle sont déconseillés.

### Décision

```text
DÉCISION : GO SOUS RÉSERVE
PUBLICATION IMMÉDIATE : NO GO
```

L'offre est commercialement crédible, mais pas suffisamment soutenable pour une publication complète tant que les prérequis opérationnels, l'admissibilité des reprises, le canal et les responsabilités d'hébergement/sauvegarde ne sont pas arbitrés.

### Risques

- attente implicite d'une disponibilité continue;
- dérive de périmètre entre correction, évolution et nouveau projet;
- responsabilité mal attribuée sur hébergement, sauvegardes et comptes tiers;
- reprise coûteuse d'un système sans documentation ni baseline;
- promesse de sécurité ou de restauration supérieure aux capacités réelles;
- charge non prévisible si le canal et la priorisation ne sont pas formalisés.

## 4. Audit et cadrage

### Positionnement

Offre d'entrée et de clarification avant une construction, une refonte ou une automatisation. Elle transforme un besoin incomplet en constats, décisions, risques et feuille de route. Elle peut aussi se terminer sans mandat de réalisation.

Ce positionnement est déjà cohérent avec le site : la page Services, les trois processus détaillés, la page Contact et les CTA insistent sur la clarification avant la solution.

### Périmètre possible

- audit d'un site existant, de son contenu et de ses parcours;
- audit UX/UI et accessibilité de premier niveau;
- revue technique limitée aux éléments accessibles et au mandat;
- clarification fonctionnelle et cartographie des parties prenantes;
- architecture de contenu;
- cartographie d'un processus métier;
- priorisation d'un MVP ou d'une refonte;
- estimation de complexité par scénarios et dépendances;
- recommandations et feuille de route progressive.

### Livrables

- note de contexte, objectifs et contraintes;
- inventaire des sources et hypothèses;
- constats classés par impact, risque et niveau de preuve;
- parcours, architecture de contenu ou cartographie du processus selon le mandat;
- périmètre recommandé et éléments explicitement exclus;
- priorités MVP et dépendances;
- scénarios de solution sans engagement de réalisation;
- estimation qualitative de complexité;
- feuille de route et prochaines décisions;
- rapport de restitution.

### Données requises

- objectifs d'affaires et utilisateurs concernés;
- accès autorisés aux interfaces, contenus et documents pertinents;
- contraintes connues, incidents observés et outils impliqués;
- volumes, fréquence, exceptions et données manipulées pour un processus;
- interlocuteurs capables de valider les faits;
- limites de confidentialité et règles de partage.

### Format

Combinaison ajustable d'atelier, entrevues ciblées, analyse documentaire, observation des interfaces et rapport. Le format exact dépend de la question à trancher; aucun ensemble complet n'est automatique.

### Limites

- les constats dépendent des accès et informations fournis;
- aucune garantie de résultat, de financement ou de réalisation ultérieure;
- aucune estimation ferme sans périmètre et hypothèses validés;
- aucun audit de cybersécurité avancé, test d'intrusion ou certification;
- aucun avis juridique, fiscal ou réglementaire;
- aucune recherche utilisateur extensive sans recrutement et mandat spécifiques;
- aucune donnée sensible ne doit être transmise hors canal convenu.

### Décision

```text
DÉCISION : GO
PUBLICATION : POSSIBLE APRÈS VALIDATION PM DU MODÈLE ÉDITORIAL
```

L'offre est soutenable à condition que chaque mandat définisse la question, les sources, les livrables et les limites. Elle formalise une pratique déjà présente sans dupliquer les trois solutions de réalisation.

### Risques

- confusion entre audit général, audit de cybersécurité et avis de conformité;
- attente d'un devis ferme à partir d'informations partielles;
- livrable trop vaste si la question de décision n'est pas explicite;
- perception que la réalisation ultérieure est incluse ou garantie;
- collecte excessive d'accès ou de données non nécessaires.

## 5. Chevauchements avec les offres actuelles

| Offre actuelle | Audit et cadrage | Maintenance et évolution | Frontière recommandée |
|---|---|---|---|
| Création de sites web | Architecture de contenu, revue UX/UI et recommandations précèdent la réalisation. | Corrections et petites évolutions suivent une livraison ou une reprise admise. | L'audit décide; la création construit; la maintenance entretient. |
| Automatisation et IA | Cartographie et priorisation valident si une automatisation est pertinente. | Ajustements de règles et intégrations existantes dans un périmètre accepté. | Ne pas vendre la cartographie deux fois; créditer ou intégrer le cadrage si une réalisation suit. |
| Applications web sur mesure | Analyse fonctionnelle, rôles, parcours et MVP constituent le cadrage préalable. | Corrections et incréments limités après mise en service. | Une évolution majeure redevient un mandat sur mesure. |

`Audit et cadrage` est une offre transversale de décision. `Maintenance et évolution` est une offre de cycle de vie. Aucune ne doit être présentée comme un quatrième ou cinquième type de produit interchangeable avec les trois offres de réalisation.

## 6. Capacités opérationnelles requises

### Communes

- qualification de la demande et refus explicite des mandats hors compétence;
- modèle de proposition définissant périmètre, exclusions, accès et livrables;
- gestion sécurisée des accès et principe du moindre privilège;
- suivi des décisions et validation client;
- conservation et suppression encadrées des documents reçus;
- facturation et conditions contractuelles adaptées au mode d'engagement.

### Spécifiques à la maintenance

- outil de suivi des demandes;
- matrice de priorité non assimilable à une SLA;
- procédure de sauvegarde/retour arrière lorsqu'applicable;
- inventaire des dépendances et comptes tiers;
- fenêtres d'intervention et capacité planifiée;
- procédure d'escalade sans promesse 24/7.

### Spécifiques à l'audit

- gabarit de collecte des sources et niveaux de preuve;
- méthode de classification des constats;
- gabarits de cartographie, priorisation et feuille de route;
- règles de manipulation des données et secrets;
- critères qui déclenchent le recours à une expertise juridique ou cybersécurité spécialisée.

## 7. Risques commerciaux et juridiques

### Commerciaux

- dilution du catalogue si cinq cartes sont présentées au même niveau;
- cannibalisation du cadrage déjà inclus dans les projets de réalisation;
- sous-estimation du coût des reprises et du support;
- ambiguïté sur le caractère payant et autonome de l'audit;
- attentes de délai ou disponibilité induites par le mot « maintenance ».

### Juridiques et contractuels

- responsabilité sur les systèmes tiers, l'hébergement et les sauvegardes;
- accès à des renseignements personnels ou confidentiels pendant un audit;
- propriété, autorisation et révocation des accès;
- limites de responsabilité et absence de garantie de résultat;
- distinction claire entre revue technique générale, cybersécurité et conseil juridique;
- conservation des rapports, preuves et journaux de changements.

Les pages légales ne doivent pas être modifiées avant que le mode opérationnel et les traitements de données éventuels soient arrêtés.

## 8. Modèles éditoriaux proposés

Ces objets sont des propositions documentaires. Ils ne doivent pas être copiés dans `service-offerings.ts` avant décision PM.

### Audit et cadrage — recommandé

```text
slug : audit-et-cadrage
label : Audit et cadrage
eyebrow : Décider avant de construire
title : Clarifier le besoin, les risques et la prochaine décision.
summary : Une analyse structurée pour comprendre l'existant, prioriser un périmètre utile et préparer une feuille de route sans présumer de la solution.
description : Nous réunissons les faits disponibles, les usages, les contraintes et les dépendances afin de formuler des constats vérifiables, des priorités et les prochaines décisions. Le mandat peut se conclure sans réalisation ultérieure.
outcomes :
- Une situation actuelle mieux documentée
- Un périmètre priorisé et des limites explicites
- Une feuille de route adaptée au niveau de preuve disponible
capabilities :
- Audit de site existant
- Revue UX/UI et accessibilité de premier niveau
- Revue technique limitée
- Architecture de contenu
- Cartographie de processus
- Clarification fonctionnelle
- Priorisation MVP
- Estimation qualitative de complexité
- Recommandations de refonte
process :
1. Définir — préciser la question, les sources et les limites du mandat
2. Recueillir — examiner les documents, interfaces et témoignages autorisés
3. Analyser — distinguer faits, hypothèses, risques et dépendances
4. Prioriser — comparer les scénarios et le périmètre utile
5. Restituer — remettre les constats, décisions et feuille de route
idealFor :
- Préparer une refonte sans périmètre clair
- Comprendre pourquoi un parcours ou processus fonctionne mal
- Prioriser un MVP avant la réalisation
- Comparer des scénarios sans engager immédiatement un développement
deliverables :
- Cadre de l'audit et inventaire des sources
- Constats classés et limites de preuve
- Architecture, parcours ou cartographie selon le mandat
- Périmètre et priorités recommandés
- Feuille de route et rapport de restitution
considerations :
- Les conclusions dépendent des accès et informations fournis.
- Aucun audit de cybersécurité avancé ni avis juridique n'est inclus.
- La réalisation ultérieure n'est ni incluse ni garantie.
- Une estimation ferme exige un périmètre validé.
relatedServiceIds : web, automation, custom
technologies : aucune technologie publiée par défaut
status : draft
seo.title : Audit et cadrage numérique
seo.description : Audit structuré de sites, parcours et processus pour clarifier les constats, prioriser un MVP et préparer une feuille de route.
```

### Maintenance et évolution — sous réserve

```text
slug : maintenance-et-evolution
label : Maintenance et évolution
eyebrow : Cycle de vie encadré
title : Maintenir et faire évoluer un produit numérique par étapes.
summary : Des interventions planifiées sur un périmètre admissible pour corriger, mettre à jour et prioriser de petites évolutions sans promesse de disponibilité permanente.
description : Après une livraison ou un audit de reprise, nous pouvons planifier des corrections, mises à jour et évolutions limitées selon les accès, responsabilités et capacités convenus. L'hébergement, les sauvegardes et les urgences ne sont jamais inclus automatiquement.
outcomes :
- Un état technique et fonctionnel mieux suivi
- Des interventions priorisées et documentées
- Des évolutions séparées des urgences et nouveaux projets
capabilities :
- Audit d'admissibilité
- Corrections reproductibles
- Mises à jour techniques planifiées
- Suivi courant des dépendances
- Contrôles fonctionnels convenus
- Petites évolutions
- Assistance éditoriale
- Amélioration continue ciblée
process :
1. Qualifier — vérifier l'admissibilité, les accès et les responsabilités
2. Établir — documenter la baseline et prioriser la demande
3. Planifier — estimer l'intervention et définir le retour arrière applicable
4. Intervenir — réaliser et vérifier le changement autorisé
5. Documenter — transmettre les résultats, limites et suites recommandées
idealFor :
- Faire évoluer progressivement un produit livré
- Reprendre un site ou outil après audit d'admissibilité
- Planifier des mises à jour et corrections non urgentes
- Regrouper de petites améliorations dans un périmètre suivi
deliverables :
- Évaluation d'admissibilité
- Périmètre et priorités d'intervention
- Changements convenus et résultats de vérification
- Journal des modifications
- Recommandations de prochaine étape
considerations :
- Aucun support 24/7, délai garanti ou intervention immédiate.
- L'hébergement et les sauvegardes ne sont pas inclus automatiquement.
- Aucune cybersécurité managée ni garantie de restauration.
- Une évolution majeure nécessite un nouveau cadrage.
relatedServiceIds : web, automation, custom
technologies : aucune technologie publiée par défaut
status : draft
seo.title : Maintenance et évolution de produits numériques
seo.description : Maintenance planifiée, corrections et petites évolutions sur un périmètre admissible, sans support permanent ni hébergement automatique.
```

## 9. Impacts techniques

| Surface | Impact si une offre est publiée |
|---|---|
| Source canonique | Ajouter l'objet validé à `serviceOfferings`; décider si le type doit modéliser inclus/exclus/prérequis/engagement. |
| Routes | Une route statique par offre publiée via `generateStaticParams`; un slug inconnu reste en 404. |
| Page Services | Remplacer les mentions « trois », revoir la grille et l'aide au choix; distinguer solutions de réalisation et services transversaux. |
| Accueil | Ne pas ajouter automatiquement cinq onglets. Conserver les trois solutions principales ou créer plus tard une entrée discrète vers l'audit. `featuredServices` est une source éditoriale locale à arbitrer. |
| Footer | Dérivé automatiquement de toutes les offres; cinq liens peuvent alourdir la colonne. Prévoir regroupement ou sélection explicite. |
| Contact | Ajouter au maximum des catégories compréhensibles (`Audit et cadrage`, `Maintenance`) ou conserver `Autre besoin`; toute modification touche le schéma client/serveur et les tests. |
| Sitemap | Dérivé automatiquement; chaque offre ajoute une URL publique. |
| Schema.org | Aucun ajout nécessaire au MVP. Éviter un catalogue `Offer` tant que conditions et données commerciales ne sont pas stabilisées. |
| Navigation | Aucun changement recommandé au header; la page Services reste le point d'entrée. |
| SEO | Métadonnées uniques, canonicals et intention distincte; éviter la cannibalisation entre cadrage, création et application sur mesure. |
| Tests | Mettre à jour longueurs, slugs exacts, routes, sitemap, footer, relations, métadonnées, contenu interdit et formulaire. |
| Build | +1 route par offre publiée; 22/22 deviendrait 23/23 ou 24/24. |
| FR/EN | Les libellés et tableaux actuels ne sont pas localisés. Préserver des identifiants et slugs stables; traiter les URLs bilingues dans un lot i18n distinct. |
| CMS | Le futur modèle devrait séparer statut, ordre, catégorie (réalisation/transversal/cycle de vie), limites et mode d'engagement. Aucun CMS dans 004C. |

## 10. Découpage d'implémentation proposé

### 004C-2 — Publication Audit et cadrage

- arbitrer et figer le modèle éditorial;
- ajouter l'offre à la source canonique;
- distinguer visuellement les trois solutions de réalisation de l'offre d'entrée;
- mettre à jour page Services, formulaire si autorisé, footer, sitemap, SEO et tests;
- vérifier qu'aucune promesse de réalisation, cybersécurité avancée ou avis juridique n'est introduite.

### 004C-3 — Préparation opérationnelle Maintenance

- définir admissibilité, canal, responsabilités, modes d'engagement et exclusions;
- produire les gabarits opérationnels et contractuels nécessaires;
- décider si l'offre reste ponctuelle ou peut devenir récurrente;
- ne modifier aucun contenu public tant que ces décisions ne sont pas validées.

### 004C-4 — Publication Maintenance, conditionnelle

- ouvrir uniquement si 004C-3 est accepté;
- intégrer le modèle éditorial final et les adaptations techniques;
- tester explicitement l'absence de promesse 24/7, de délai, d'hébergement automatique, de restauration garantie et de cybersécurité managée.

Les deux offres ne devraient pas être publiées dans un même changement tant que la maintenance demeure sous réserve. Cette séquence permet d'ajouter l'offre mature sans transformer une hypothèse opérationnelle en promesse publique.

## 11. Recommandation PM

```text
AUDIT ET CADRAGE : GO
MAINTENANCE ET ÉVOLUTION : GO SOUS RÉSERVE
PUBLICATION IMMÉDIATE DE MAINTENANCE : NO GO

RECOMMANDATION :
1. Autoriser un lot d'implémentation ciblé pour Audit et cadrage.
2. Ouvrir séparément la préparation opérationnelle de Maintenance et évolution.
3. Ne publier Maintenance qu'après validation de son modèle de service.
4. Conserver les trois offres actuelles comme solutions principales.
5. Présenter les nouvelles offres comme services transversaux du cycle de décision et de vie, pas comme deux produits interchangeables supplémentaires.

CODE MODIFIÉ : AUCUN
COMMIT : AUCUN
PRODUCTION : NO GO
```
