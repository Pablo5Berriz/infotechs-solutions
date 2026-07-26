# INFOTECHS-PRODUCT-EVOLUTION-004C-3 — Modèle opérationnel Maintenance et évolution

```text
LOT : INFOTECHS-PRODUCT-EVOLUTION-004C-3-MAINTENANCE-OPERATIONS
STATUT : TERMINÉ — EN ATTENTE DE DÉCISION PM
MODE : CONCEPTION OPÉRATIONNELLE UNIQUEMENT
PRODUCTION : NO GO
```

## 1. Baseline et portée

```text
BRANCHE : master
SHA INITIAL : 089f6f2df9e1542b8a8677921a4d8b8cb461acf9
WORKING TREE INITIAL : PROPRE
CODE APPLICATIF MODIFIÉ : AUCUN
SERVICE PUBLIC : NON PUBLIÉ
COMMIT : AUCUN
```

Ce document définit un modèle opérable, pas une promesse commerciale ni un contrat. Il n'ajoute aucune route, option de formulaire, entrée de footer, donnée de sitemap, dépendance, prix, délai ou SLA. Les lots 004C-1 et 004C-2 restent gelés.

## 2. Principes de service

`Maintenance et évolution` désigne des interventions planifiées sur un périmètre admissible. Le service ne commence qu'après une décision d'admission et une autorisation d'intervention.

Principes non négociables :

- aucune astreinte, disponibilité permanente ou prise en charge immédiate;
- aucune responsabilité implicite sur un fournisseur, compte ou infrastructure;
- aucune modification sans preuve de propriété, accès autorisé et périmètre écrit;
- aucune intervention sans moyen de validation et stratégie de retour arrière proportionnée;
- aucune confusion entre maintenance courante, incident de sécurité, migration majeure et nouveau projet;
- les responsabilités restent attribuées explicitement, même lorsqu'Infotechs Solutions exécute une tâche;
- tout délai éventuel appartient à une proposition particulière et ne devient jamais une promesse publique.

## 3. Matrice d'admissibilité

### 3.1 Décisions

| Décision | Signification | Suite permise |
|---|---|---|
| ACCEPTABLE | Les prérequis sont prouvés et le risque est compatible avec le mandat. | Estimation ponctuelle possible. |
| ACCEPTABLE SOUS RÉSERVE | Un manque circonscrit peut être levé avant intervention. | Audit préalable, action de réduction du risque ou périmètre réduit. Aucune intervention avant levée écrite. |
| REFUSÉ | L'autorité, la sécurité, la reproductibilité ou le risque sont incompatibles. | Aucun accès ni changement. Réorientation possible vers un spécialiste approprié. |

### 3.2 Critères

| Critère | ACCEPTABLE | ACCEPTABLE SOUS RÉSERVE | REFUSÉ |
|---|---|---|---|
| Propriété et autorisation | Le client prouve qu'il contrôle légalement code, comptes et données. | Une autorisation écrite ciblée manque mais peut être obtenue. | Origine douteuse, conflit de propriété ou accès demandé sans autorisation. |
| Accès | Comptes nominatifs, moindre privilège et MFA disponibles. | Accès temporaire à créer ou droits à réduire avant travail. | Partage illicite, mot de passe en clair imposé ou administrateur non autorisé. |
| Baseline | Version, environnement et comportement de référence identifiés. | Baseline reconstructible par un audit borné. | Projet impossible à reproduire ou à auditer de manière fiable. |
| Code source | Dépôt complet, lisible et modifiable avec historique utile. | Dette ciblée documentable avant changement. | Code absent, généré sans source, illisible ou sans chemin de reprise réaliste. |
| Dépendances | Inventaire et installation reproductibles. | Quelques dépendances à remplacer ou figer avant intervention. | Chaîne abandonnée, non installable et sans stratégie réaliste. |
| Hébergement | Propriétaire, administrateur et limites de responsabilité connus. | Attribution à formaliser avant changement. | Responsabilité exigée sur une infrastructure hors contrôle. |
| Sauvegardes | Existence, emplacement, responsable et test disponible connus. | Sauvegarde à créer ou vérification à réaliser avant intervention non critique. | Système critique sans sauvegarde et refus de corriger ce risque. |
| Sécurité | Aucun incident actif connu; risques courants bornés. | Doute à qualifier par une expertise adaptée avant reprise. | Système compromis, incident non maîtrisé ou demande de réponse avancée. |
| Documentation | Suffisante pour le périmètre. | Reconstructible dans un audit limité. | Contexte critique inconnu et non reconstructible. |
| Périmètre | Demande reproductible, limitée et estimable. | Découpage ou cadrage préalable requis. | Urgence critique présentée comme maintenance courante ou refonte masquée. |
| Données | Sensibilité compatible avec les mesures disponibles. | Mesures ou mandat spécialisé requis avant accès. | Données hautement sensibles sans cadre, expertise ou protections adaptés. |
| Risque global | Compatible avec les capacités et assurances réelles. | Acceptable après réduction documentée. | Exposition disproportionnée ou obligation impossible à tenir. |

### 3.3 Gate d'admission

Une demande est `ACCEPTABLE` seulement si tous les critères critiques — autorisation, accès, sécurité, sauvegarde applicable et périmètre — sont acceptables. Une seule décision `REFUSÉ` sur ces critères arrête le processus. Les réserves doivent être levées et prouvées avant estimation de l'intervention principale.

Cas imposant un refus ou une expertise préalable renforcée : accès administrateur non autorisé; code ou données d'origine douteuse; système compromis; système critique sans sauvegarde; dépendances abandonnées sans reprise réaliste; demande 24/7; responsabilité exigée sur infrastructure non contrôlée; données hautement sensibles sans cadre; projet non reproductible; urgence critique déguisée.

## 4. Périmètre inclus

Chaque demande doit rester dans une seule catégorie principale. Une combinaison de catégories ou une incertitude architecturale déclenche un cadrage.

| Catégorie | Entrées requises | Livrable | Preuve de terminaison | Critère de sortie | Requalification en nouveau projet |
|---|---|---|---|---|---|
| Correctif | Étapes de reproduction, résultat attendu, environnement, baseline, niveau d'impact. | Correction bornée et note de changement. | Test de régression, reproduction avant/après, validation convenue. | Comportement attendu restauré sans régression identifiée dans le périmètre. | Cause architecturale, correction multi-systèmes, données à migrer ou périmètre non reproductible. |
| Mise à jour | Inventaire, versions, avis de sécurité, compatibilité, environnement de test. | Mise à jour évaluée et appliquée si autorisée. | Installation propre, tests, build et contrôle des fonctions ciblées. | Version cible stable ou décision documentée de ne pas mettre à jour. | Rupture majeure, réécriture, migration de plateforme ou incompatibilité structurelle. |
| Évolution mineure | Besoin, utilisateur, critères d'acceptation, maquette ou règle limitée. | Fonction ou ajustement limité dans l'architecture existante. | Tests, revue fonctionnelle et acceptation explicite. | Critères bornés satisfaits et documentation actualisée. | Nouveau rôle, nouveau domaine métier, schéma de données majeur ou nouvelle architecture. |
| Assistance éditoriale | Contenu approuvé, emplacement, droits et contraintes de mise en page. | Contenu/configuration intégré dans les composants existants. | Aperçu validé, liens et responsive contrôlés. | Contenu publié ou remis pour publication. | Nouvelle architecture de contenu, campagne, traduction ou production substantielle. |
| Amélioration continue | Mesure initiale, objectif qualitatif, pages/parcours visés. | Ajustement ciblé de performance, accessibilité, UX ou maintenabilité. | Mesure avant/après, test ciblé ou checklist vérifiable. | Amélioration démontrée sans dégradation hors tolérance convenue. | Refonte d'expérience, changement de design system ou objectif global non borné. |
| Revue courante | Liste des dépendances/parcours, environnement et fréquence ponctuelle convenue. | Rapport de contrôle et recommandations priorisées. | Journal daté, commandes ou scénarios exécutés, résultats classés. | Constats remis; correctifs séparément autorisés. | Surveillance continue, SOC, observabilité managée ou engagement de disponibilité. |

## 5. Exclusions obligatoires

Ne sont jamais inclus automatiquement :

- support 24/7, astreinte, SLA implicite ou intervention immédiate;
- garantie de disponibilité, de restauration ou d'absence de défaut;
- cybersécurité managée, réponse à incident avancée ou test d'intrusion;
- hébergement, licences, domaines, services tiers ou frais fournisseurs;
- refonte complète, migration majeure ou évolution architecturale importante;
- avis juridique, fiscal, réglementaire ou conformité spécialisée;
- responsabilité sur des comptes, données ou infrastructures non contrôlés;
- sauvegarde ou restauration sans attribution et procédure validées;
- gestion continue de contenu, support aux utilisateurs finaux ou centre d'assistance;
- actions destructives sans autorisation et retour arrière approprié.

Une exclusion peut seulement devenir un mandat distinct si la compétence, l'autorité, les protections et les modalités sont explicitement validées. Certaines exclusions exigent un tiers spécialisé et ne doivent pas être proposées par Infotechs Solutions.

## 6. Modes d'engagement

### 6.1 Intervention ponctuelle

```text
ADMISSIBILITÉ : gate complète et demande bornée
AVANTAGES : engagement limité, capacité vérifiable, périmètre et autorisation par intervention
RISQUES : répétition de qualification, disponibilité non réservée, dette diffuse entre interventions
RÈGLES : ticket unique, estimation, autorisation, critères d'acceptation et clôture
FACTURATION : proposition privée, aucun prix public
EXPIRATION : l'estimation et la fenêtre proposées expirent à la date indiquée dans la proposition
PRIORISATION : selon impact et capacité, sans délai garanti
RÉSILIATION : possible avant intervention; travail autorisé déjà réalisé demeure clôturé et facturable selon l'entente
RECOMMANDATION : GO
```

### 6.2 Banque d'heures

```text
ADMISSIBILITÉ : client déjà admis, baseline récente, volume de petites demandes prévisible
AVANTAGES : moins de friction administrative, regroupement d'améliorations limitées
RISQUES : attente de disponibilité réservée, consommation contestée, dérive vers support illimité
RÈGLES : tâches admissibles seulement, suivi détaillé, approbation au-delà d'un seuil, aucun report implicite
FACTURATION : conditions privées; aucun prix public
EXPIRATION : durée écrite obligatoire; solde, report et remboursement explicitement définis
PRIORISATION : file commune selon impact et capacité; aucune priorité automatique achetée
RÉSILIATION : arrêt des nouvelles tâches, bilan du solde et restitution des accès selon l'entente
RECOMMANDATION : GO SOUS RÉSERVE
```

Réserves avant usage : système de suivi du temps et des tickets, règle d'expiration validée juridiquement, transparence du solde, limite de travail simultané, procédure d'approbation et capacité mesurée sur plusieurs interventions ponctuelles.

### 6.3 Entente récurrente

```text
ADMISSIBILITÉ : non ouverte à ce stade
AVANTAGES : continuité et connaissance du contexte si la capacité est prouvée
RISQUES : SLA implicite, capacité réservée, obligations de surveillance et responsabilité accrues
RÈGLES : inexistantes tant qu'un modèle de capacité, calendrier, suspension et couverture n'est pas validé
FACTURATION : non définie; aucun prix public
EXPIRATION : non définie
PRIORISATION : non définie sans capacité réservée prouvée
RÉSILIATION : doit inclure transition, accès, travaux ouverts et données
RECOMMANDATION : NO GO
```

## 7. Canal de support

| Canal | Usage | Décision |
|---|---|---|
| Formulaire actuel | Première demande générale; pas de pièce jointe ni secret. | Base recommandée après ajout futur d'une catégorie et d'une référence de demande. |
| Courriel dédié | Notifications et réponses liées à une référence existante. | Complément acceptable, pas source unique sans suivi. |
| Outil de tickets | Registre, statut, historique, preuve et priorisation. | Canal opérationnel initial recommandé avant publication. |
| Portail client | Centralisation avancée et gestion d'accès. | Différé; disproportionné au démarrage. |
| Téléphone | Clarification planifiée. | Jamais canal d'urgence ni preuve unique d'autorisation. |
| Messagerie personnelle | Échanges informels non traçables. | Interdite pour demandes, accès, autorisations et secrets. |

### Décision de canal

```text
CANAL INITIAL RECOMMANDÉ : outil de tickets léger relié à un courriel dédié
ENTRÉE PUBLIQUE FUTURE : formulaire, sans fichier, créant une référence de demande
CANAL INTERDIT POUR LES URGENCES : téléphone, messagerie personnelle et formulaire public
ACCUSÉ DE RÉCEPTION : automatique ou manuel, explicitement non contractuel
NUMÉRO DE TICKET : identifiant opaque unique, sans donnée personnelle encodée
PIÈCES JOINTES : désactivées au départ; échange ultérieur par canal approuvé si nécessaire
DONNÉES SENSIBLES : jamais dans le formulaire, le sujet ou la messagerie personnelle
```

Qualification minimale : demandeur autorisé, système concerné, impact, reproduction, changement récent, données touchées, échéance souhaitée non garantie, catégorie présumée et présence d'un incident de sécurité. Toute suspicion de compromission sort du flux courant.

## 8. Priorisation sans SLA

| Niveau | Définition | Exemples | Traitement | Non-garantie | Requalification |
|---|---|---|---|---|---|
| P1 — Bloquant | Fonction essentielle indisponible pour tous, sans contournement, sur système admissible. | Formulaire principal inutilisable; déploiement stable impossible. | Qualification prioritaire selon capacité; possibilité de refuser ou d'orienter. | P1 ne garantit ni lecture, ni début, ni résolution dans un délai donné. | Incident de sécurité, infrastructure tierce, catastrophe ou besoin d'astreinte. |
| P2 — Important | Fonction majeure dégradée avec contournement limité. | Parcours clé partiellement rompu; erreur affectant un groupe d'utilisateurs. | Planifié avant P3/P4 lorsque les preuves et accès sont prêts. | L'ordre peut changer selon risque, dépendances et capacité. | Correctif large, migration de données ou changement architectural. |
| P3 — Normal | Défaut circonscrit ou petite évolution sans blocage majeur. | Erreur d'affichage, règle limitée, mise à jour planifiée. | File normale, estimation et autorisation avant intervention. | Aucun délai public ou implicite. | Ensemble de demandes formant un nouveau périmètre. |
| P4 — Amélioration | Optimisation non urgente et mesurable. | Accessibilité ciblée, performance, simplification éditoriale. | Regroupement possible après les demandes plus impactantes. | Peut être différée ou refusée selon capacité. | Refonte UX, changement de design system ou programme continu. |

Le niveau est attribué après qualification, jamais par le client seul. Une urgence commerciale n'est pas automatiquement P1. Aucun niveau n'est un SLA.

## 9. Matrice de responsabilités

Légende : `P` propriétaire légal/contractuel; `A` administrateur technique autorisé; `O` responsable opérationnel; `F` responsable financier. Par défaut, le client reste `P` et `F`. Infotechs Solutions ne devient `A` ou `O` que par délégation écrite, limitée et révocable.

| Élément | P | A | O | F | Preuve d'accès | Procédure de sortie |
|---|---|---|---|---|---|---|
| Nom de domaine | Client | Client ou registrar autorisé | Client | Client | Facture, compte nominatif, MFA | Retirer délégation; confirmer titulaire et renouvellement. |
| DNS | Client | Client/Infotechs délégué | Partie désignée | Client | Export de zone, rôle nominatif | Export final, retrait du rôle, validation des serveurs de noms. |
| Cloudflare | Client | Client/Infotechs délégué | Partie désignée | Client | Membre nominatif, MFA, journal | Retirer membre/tokens; remettre règles et inventaire. |
| Serveur | Client ou hébergeur nommé | Partie contractuellement désignée | Partie désignée | Client | Rôle, inventaire, accès testé | Révoquer clés; remettre configuration et état. |
| Base de données | Client | Partie désignée | Partie désignée | Client | Compte nominatif, portée, test | Export selon responsabilité, révocation, journal de remise. |
| Sauvegardes | Client | Partie désignée | Responsable écrit | Client | Politique, emplacement, journal et test | Remettre sauvegardes sous responsabilité; confirmer rétention/suppression. |
| Restauration | Client décide | Partie autorisée exécute | Responsable écrit | Client | Procédure et test autorisé | Documenter dernière capacité connue; retirer accès. |
| Courriel | Client | Administrateur du tenant | Client | Client | Rôle nominatif, MFA | Retirer délégation; confirmer routage et comptes. |
| API tierces | Client | Client/Infotechs délégué | Propriétaire du flux | Client | Inventaire, scopes, rotation | Révoquer/faire tourner clés; remettre dépendances. |
| Dépôts Git | Client | Client/Infotechs délégué | Partie désignée | Client | Membre nominatif, droits minimaux | Retirer membre/clés; remettre branches et travaux ouverts. |
| Variables d'environnement | Client | Partie autorisée | Partie désignée | Client | Inventaire sans valeur secrète, procédure d'accès | Rotation, révocation et confirmation hors Git. |
| Certificats | Client ou fournisseur | Partie désignée | Partie désignée | Client | Inventaire, échéance et méthode de renouvellement | Retirer automatisations déléguées; remettre échéances. |
| Facturation fournisseurs | Client | Client | Client | Client | Propriétaire de paiement confirmé | Retirer moyens délégués inexistants; remettre échéances. |
| Surveillance | Client sauf mandat distinct | Partie désignée | Partie explicitement désignée | Client | Liste d'alertes et destinataires | Retirer destinataires; transférer règles et historique permis. |
| Renouvellements | Client | Client | Client | Client | Calendrier et contacts | Remettre calendrier; confirmer absence d'obligation Infotechs. |

Toute ligne non attribuée bloque l'intervention concernée. La possession technique d'un accès ne transfère jamais automatiquement propriété, responsabilité financière ou obligation de surveillance.

## 10. Sécurité des accès

- appliquer le moindre privilège et séparer lecture, déploiement, facturation et administration;
- utiliser des comptes nominatifs; aucun compte partagé lorsque le fournisseur permet des membres;
- activer MFA sur les comptes sensibles;
- ne jamais transmettre un mot de passe, token ou secret en clair par courriel, ticket, téléphone ou messagerie;
- utiliser le gestionnaire de secrets approuvé par le client ou un mécanisme temporaire sécurisé;
- fixer une durée et une finalité à chaque accès temporaire;
- révoquer les accès à la clôture, au changement d'intervenant ou sur demande autorisée;
- consigner les changements, autorisations et rotations sans consigner les valeurs secrètes;
- interdire tout secret dans Git, rapports, captures et journaux partagés;
- faire tourner les secrets exposés ou dont la chaîne de conservation est inconnue;
- obtenir une confirmation d'autorité et un retour arrière avant toute action destructive;
- arrêter immédiatement en cas d'autorisation ambiguë, donnée inattendue ou indice de compromission.

Ce lot ne choisit ni n'implémente un gestionnaire de secrets.

## 11. Workflow d'intervention

| Étape | Entrée | Sortie | Responsable | Preuve | Stop condition |
|---|---|---|---|---|---|
| 1. Réception | Demande par canal autorisé. | Référence opaque et accusé non contractuel. | Coordination Infotechs. | Ticket horodaté. | Secret, urgence vitale, incident actif ou demandeur non identifiable. |
| 2. Qualification | Ticket et informations minimales. | Catégorie, impact, inconnues et prochaine question. | Qualification Infotechs. | Checklist remplie. | Périmètre trop vague, Maintenance non adaptée ou compétence absente. |
| 3. Admissibilité | Matrice et preuves client. | ACCEPTABLE, SOUS RÉSERVE ou REFUSÉ. | Responsable technique + client pour autorité. | Décision motivée. | Tout critère critique REFUSÉ. |
| 4. Reproduction | Baseline, accès de lecture, scénario. | Défaut reproduit ou hypothèse invalidée. | Intervenant technique. | Étapes, sortie, capture/log non sensible. | Reproduction impossible, données à risque ou environnement inadéquat. |
| 5. Estimation | Cause/périmètre borné et dépendances. | Proposition privée, hypothèses et exclusions. | Infotechs. | Estimation versionnée. | Architecture majeure, inconnue critique ou capacité insuffisante. |
| 6. Autorisation | Proposition et responsable client identifié. | Accord écrit sur périmètre, coût privé et fenêtre. | Client autorisé. | Approbation attachée au ticket. | Autorité non prouvée ou conditions modifiées. |
| 7. Sauvegarde/retour arrière | Plan de changement et RACI. | Point de retour disponible ou risque explicitement accepté dans les limites autorisées. | Responsable attribué. | Journal/export/test selon système. | Système critique sans retour arrière adéquat. |
| 8. Intervention | Autorisation, branche/environnement et plan. | Changement limité réalisé. | Intervenant technique. | Diff, journal de commandes non sensible, référence de déploiement. | Périmètre dérive, action destructive nouvelle, incident ou résultat inattendu. |
| 9. Validation | Changement et critères d'acceptation. | Résultats de tests et écarts. | Infotechs; client valide l'usage. | Tests, build, scénarios et acceptation. | Échec critique, régression ou preuve insuffisante. |
| 10. Documentation | Résultats, décisions et limites. | Note de changement, configuration et risques résiduels. | Infotechs. | Document lié au ticket. | Secret ou donnée personnelle dans le livrable. |
| 11. Livraison | Validation technique et autorisation de mise en service. | Changement livré ou paquet remis. | Partie responsable du déploiement. | SHA/version, état de déploiement, contrôle ciblé. | Autorisation absente ou environnement différent. |
| 12. Clôture | Livrables, acceptation et travaux ouverts. | Ticket fermé, accès temporaires révoqués, suite séparée. | Coordination Infotechs + client. | Checklist de clôture. | Accès, sauvegarde ou travail ouvert non attribué. |

Une étape arrêtée ne peut être contournée par la seule urgence commerciale. Toute extension devient une nouvelle demande ou un nouveau projet.

## 12. Fin de service

La sortie d'une intervention, d'une banque d'heures ou d'une relation doit inclure :

1. fermer ou transférer chaque ticket avec état final et limites;
2. inventorier les travaux ouverts, décisions en attente et risques connus;
3. remettre la documentation, références de versions et instructions convenues;
4. restituer ou transférer les comptes sans changer leur propriétaire implicite;
5. remettre les sauvegardes uniquement selon la responsabilité et le canal convenus;
6. révoquer membres, clés, tokens, sessions et accès temporaires;
7. demander la rotation des secrets partagés ou à conservation incertaine;
8. confirmer la facturation finale et le traitement du solde selon l'entente;
9. appliquer la durée de conservation convenue aux rapports et données reçues;
10. supprimer de manière contrôlée les copies qui ne doivent plus être conservées;
11. confirmer les renouvellements et alertes qui restent à la charge du client;
12. définir, si nécessaire, une période de transition bornée par écrit, sans disponibilité implicite.

La fermeture administrative ne vaut pas garantie future. Toute demande après clôture repasse par réception et admissibilité.

## 13. Clauses fonctionnelles minimales à faire valider

Le document contractuel futur devrait traiter :

- objet et nature ponctuelle ou limitée de l'engagement;
- périmètre, critères d'acceptation et procédure de modification;
- exclusions et requalification en nouveau projet;
- responsabilités, autorité et exactitude des informations du client;
- création, usage, sécurité, durée et révocation des accès;
- propriété et responsabilité de l'hébergement, du domaine et des comptes;
- existence, responsabilité, test et limites des sauvegardes/restaurations;
- fournisseurs tiers, licences, changements de conditions et frais;
- mesures de sécurité raisonnables et limites de compétence;
- autorisation préalable des changements et actions destructives;
- limitation de responsabilité adaptée et validée juridiquement;
- absence de SLA sauf convention explicite distincte;
- absence de garantie absolue de disponibilité, restauration ou absence de défaut;
- propriété intellectuelle et remise des livrables;
- confidentialité, sous-traitants et données personnelles;
- conservation, suppression et localisation des informations;
- fin de service, transfert, travaux ouverts et période de transition;
- paiement, taxes, dépenses autorisées et suspension pour non-paiement ou risque;
- suspension en cas de sécurité, autorité ou conformité insuffisante;
- force majeure et dépendances hors contrôle;
- mécanisme de règlement des désaccords et droit applicable à confirmer.

```text
VALIDATION JURIDIQUE HUMAINE :
OBLIGATOIRE AVANT UTILISATION CONTRACTUELLE
```

Ce rapport ne constitue pas un avis juridique et ne doit pas être utilisé comme contrat.

## 14. Risques opérationnels

| Risque | Mesure minimale | État avant publication |
|---|---|---|
| SLA implicite créé par le mot maintenance | Exclusions visibles, accusé non contractuel, aucune durée publique. | À intégrer au contenu public futur. |
| Demandes dispersées | Outil de tickets et référence unique. | Non implémenté. |
| Capacité surestimée | Ponctuel uniquement; mesurer charge et temps réel. | Compatible avec un lancement limité. |
| Reprise de système inconnu | Matrice et audit d'admissibilité factuel. | Modèle défini, procédure à tester. |
| Accès ou secrets mal transmis | Canal sécurisé, MFA, moindre privilège, rotation. | Processus à sélectionner. |
| Responsabilité fournisseur ambiguë | RACI signé par système. | Gabarit à produire. |
| Sauvegarde inutilisable | Attribution, preuve et test proportionné avant changement. | Gate définie. |
| Dérive vers nouveau projet | Critères de requalification par catégorie. | Définis. |
| Incident de sécurité traité comme correctif | Stop immédiat et orientation spécialisée. | Défini. |
| Banque d'heures perçue comme capacité réservée | Règles, expiration, transparence et limites. | Non prouvé; publication différée. |
| Récurrent créant surveillance implicite | Ne pas ouvrir ce mode. | NO GO. |
| Clauses inadaptées | Revue juridique humaine. | Obligatoire et non réalisée. |

## 15. Conditions avant publication ponctuelle

Un lot de publication ne devrait être ouvert qu'après réalisation et validation des éléments suivants :

1. choisir l'outil de tickets et le courriel dédié;
2. définir la génération et l'affichage d'une référence de demande;
3. produire les checklists admission, changement, validation, clôture et sortie;
4. produire le gabarit RACI par client/système;
5. produire le gabarit de proposition ponctuelle avec exclusions;
6. faire valider juridiquement les clauses et les textes publics;
7. définir le canal sécurisé de remise d'accès et la politique de rotation;
8. tester le workflow sur un cas interne ou simulé de bout en bout;
9. confirmer qui qualifie les demandes et la capacité maximale simultanée;
10. préparer une procédure de refus et d'orientation;
11. décider si le formulaire public doit accepter une catégorie Maintenance;
12. mettre à jour la politique de confidentialité seulement si le flux collecte de nouvelles données;
13. ajouter des tests empêchant prix, délais, SLA, 24/7 et hébergement implicite;
14. conserver banque d'heures et récurrent hors du texte public initial.

## 16. Décision de publication

```text
DÉCISION : GO PUBLICATION PONCTUELLE UNIQUEMENT

JUSTIFICATION :
- l'intervention ponctuelle peut être bornée, admise et autorisée séparément;
- les catégories, preuves et conditions d'arrêt sont définies;
- les responsabilités peuvent être attribuées avant chaque intervention;
- aucune capacité permanente ou réservée n'est nécessaire;
- la publication reste conditionnelle aux 14 prérequis de la section 15.

BANQUE D'HEURES : GO SOUS RÉSERVE OPÉRATIONNELLE, NON AUTORISÉE À LA PUBLICATION INITIALE
ENTENTE RÉCURRENTE : NO GO
```

Cette décision n'autorise pas encore la publication applicative. Elle autorise seulement la préparation d'un lot distinct, après validation PM et juridique des prérequis.

## 17. Découpage proposé

### 004C-3A — Outillage et gabarits opérationnels

- choisir le registre de tickets et le canal sécurisé;
- créer les checklists, RACI et modèles de preuve;
- définir rôles, capacité et procédure de refus;
- réaliser un exercice simulé sans client réel.

### 004C-3B — Validation juridique et confidentialité

- faire réviser les clauses et limites par une personne qualifiée;
- définir conservation, suppression et traitement des données du support;
- valider les textes publics et contractuels.

### 004C-4 — Publication ponctuelle, conditionnelle

- ajouter l'offre publique uniquement si 004C-3A et 004C-3B sont acceptés;
- présenter exclusivement l'intervention ponctuelle;
- maintenir banque d'heures et récurrent hors de l'offre;
- ajouter route, formulaire, sitemap, footer, SEO, tests et validation visuelle dans ce lot distinct.

## 18. Recommandation PM

```text
ADMISSIBILITÉ : MODÈLE DÉFINI
PÉRIMÈTRE : CATÉGORIES ET SORTIES DÉFINIES
EXCLUSIONS : EXPLICITES
PONCTUEL : GO
BANQUE D'HEURES : GO SOUS RÉSERVE — NON PUBLIABLE INITIALEMENT
RÉCURRENT : NO GO
CANAL OPÉRATIONNEL : CONCEPTION DÉFINIE, OUTILLAGE À CHOISIR
PRIORISATION : DÉFINIE SANS SLA
RESPONSABILITÉS : MATRICE DÉFINIE
ACCÈS : RÈGLES DÉFINIES
WORKFLOW : 12 ÉTAPES DÉFINIES
FIN DE SERVICE : DÉFINIE
VALIDATION JURIDIQUE HUMAINE : OBLIGATOIRE ET EN ATTENTE

RECOMMANDATION :
ACCEPTER LE MODÈLE OPÉRATIONNEL COMME BASE.
OUVRIR 004C-3A AVANT TOUT LOT DE PUBLICATION.
NE PAS PUBLIER MAINTENANCE DANS L’ÉTAT ACTUEL DU PRODUIT.

CODE MODIFIÉ : AUCUN
COMMIT : AUCUN
PRODUCTION : NO GO
```
