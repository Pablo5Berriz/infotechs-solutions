# Infotechs Solutions — Besoins de contenu V0

Ce document liste, page par page, ce qui est nécessaire pour rédiger et
construire chaque route de la V0. Il ne contient pas le copywriting
final — seulement les décisions et données à réunir avant rédaction.

Voir `docs/product-v0.md` pour le raisonnement produit complet et
`docs/routes-v0.md` pour l'inventaire des routes.

## Accueil (`/`)

Contenu nécessaire :
- Proposition de valeur validée (dépend de la validation du propriétaire
  sur le texte candidat, product-v0.md §4)
- Territoire servi (dépend de DEC-V0-001)
- Formulation des « problèmes / besoins » (persona A/B/C, product-v0.md
  §7) — rédaction libre, aucune preuve requise
- Résumé des 3 piliers (renvoi vers `/services`)
- Section réalisation/démonstrateur : **conditionnelle** — ne peut être
  rédigée qu'une fois DEC-V0-002 tranchée
- Texte « Pourquoi Infotechs » — différenciation, sans chiffre inventé

Preuves nécessaires :
- Aucune preuve chiffrée requise pour les sections non liées au
  démonstrateur
- Preuve du démonstrateur uniquement si la section 5 (product-v0.md §12)
  est activée

Données manquantes :
- Proposition de valeur finale (validation propriétaire)
- Décision DEC-V0-001 (territoire)
- Décision DEC-V0-002 (démonstrateur)

Assets requis :
- Logo Infotechs Solutions (actuellement absent du dépôt — le favicon
  et les visuels de démonstration Next.js par défaut ont été retirés
  lors du lot INFOTECHS-FOUNDATION-001, aucun asset de marque n'existe
  encore)

Décisions utilisateur nécessaires :
- Validation finale du texte de proposition de valeur
- Confirmation ou non de la section démonstrateur sur l'accueil

## Services (`/services`)

Contenu nécessaire :
- Description de chacun des 3 piliers avec exemples concrets
  (product-v0.md §6) — à rédiger sans transformer les exemples en
  services contractuels obligatoires
- Un CTA primaire par pilier ou un CTA global de section — à trancher
  en rédaction

Preuves nécessaires : aucune (page de présentation d'offre, pas de
revendication chiffrée)

Données manquantes :
- Liste définitive des sous-offres réellement proposées dans chaque
  pilier (à confirmer par le propriétaire — le README ne détaille pas
  d'offres précises au-delà des trois piliers généraux)

Assets requis : aucun impératif (icônes simples éventuelles, non
obligatoires en V0)

Décisions utilisateur nécessaires :
- Confirmation du contenu réel de chaque pilier (quelles prestations
  sont réellement livrables aujourd'hui vs. à moyen terme)

## Réalisations (`/realisations`)

Contenu nécessaire :
- Gabarit de case study (product-v0.md §14) rempli pour chaque
  réalisation publiable
- Message de repli si aucune réalisation n'est encore publiable (ex.
  « Nos réalisations seront présentées ici prochainement » +
  redirection vers contact) — nécessaire tant que DEC-V0-002 n'est pas
  tranchée favorablement

Preuves nécessaires :
- Pour Garage Auto Gonzague : preuve du statut réel (contrat,
  autorisation de publication, capture d'écran du projet réalisé) —
  actuellement absente du dépôt (voir product-v0.md §15)
- Pour tout autre cas futur : mêmes exigences (aucun cas publié sans
  preuve vérifiable)

Données manquantes :
- Statut confirmé de Garage Auto Gonzague (DEC-V0-002)
- Si applicable : contenu réel du projet (fonctionnalités livrées,
  stack utilisée, autorisation du client de publier son nom)

Assets requis :
- Captures d'écran ou visuels du projet, si autorisés à publier
  (aucun asset actuellement dans le dépôt)

Décisions utilisateur nécessaires :
- DEC-V0-002 (bloquant pour tout contenu réel sur cette page)

## À propos (`/a-propos`)

Contenu nécessaire :
- Réponse factuelle à : qui fournit le service, où, pour qui, comment,
  quelles compétences réelles, quelles garanties réellement démontrables
- Éviter une biographie longue sans utilité commerciale (product-v0.md
  §31 de la directive)

Preuves nécessaires :
- Aucune preuve chiffrée requise ; toute compétence affichée doit
  rester vérifiable (pas de certification ou d'expérience inventée)

Données manquantes :
- Informations réelles sur le fondateur/l'équipe (nom, rôle, expérience
  pertinente) — non présentes dans le dépôt actuel
- Localisation précise si publiée (dépend de DEC-V0-001)

Assets requis :
- Photo ou visuel professionnel (optionnel, absent du dépôt)

Décisions utilisateur nécessaires :
- Niveau de détail personnel accepté par le propriétaire (nom affiché,
  photo, historique)

## Contact (`/contact`)

Contenu nécessaire :
- Interface du formulaire selon le contrat fonctionnel (product-v0.md
  §17) — implémentation non couverte par ce lot
- Coordonnées de contact directes (courriel professionnel, éventuel
  téléphone) — à confirmer
- Mention de délai de réponse indicatif (optionnel, si le propriétaire
  souhaite en communiquer un réel)

Preuves nécessaires : aucune

Données manquantes :
- Coordonnées réelles à publier (courriel/téléphone professionnels)
- Décision DEC-V0-005 (canal technique de réception du formulaire) —
  n'empêche pas de construire l'interface visuelle, mais empêche de
  rendre le formulaire fonctionnel

Assets requis : aucun

Décisions utilisateur nécessaires :
- Coordonnées à publier
- DEC-V0-005 avant tout lot d'implémentation fonctionnelle du
  formulaire

## Confidentialité (`/confidentialite`)

Contenu nécessaire :
- Nature des données collectées (formulaire de contact uniquement en
  V0)
- Finalité du traitement
- Durée de conservation — **À VALIDER JURIDIQUEMENT**
- Modalités de suppression sur demande — **À VALIDER JURIDIQUEMENT**
- Coordonnées du responsable du traitement
- Mention des services tiers utilisés (dépend de DEC-V0-005 et de la
  décision analytics, product-v0.md §19)

Preuves nécessaires : sans objet (page légale, pas de revendication
commerciale)

Données manquantes :
- Validation juridique du contenu complet
- Identité du responsable du traitement à publier

Décisions utilisateur nécessaires :
- Validation juridique avant publication (obligatoire avant activation
  réelle du formulaire)

## Mentions légales (`/mentions-legales`)

Contenu nécessaire :
- Raison sociale / identification de l'entreprise
- Adresse ou coordonnées légales
- Hébergeur (dépend du choix de déploiement final — non tranché à ce
  stade, voir `docs/architecture.md`)

Données manquantes :
- Statut légal exact de l'entreprise (raison sociale, numéro
  d'entreprise si applicable) — absent du dépôt

Décisions utilisateur nécessaires :
- Fourniture des informations légales réelles de l'entreprise

## Navigation et footer (transverses)

Contenu nécessaire :
- Labels de navigation (product-v0.md §11) — déjà spécifiés, prêts pour
  implémentation
- Blocs du footer (product-v0.md §29 de la directive) : identité,
  navigation, contact, légal, réseaux sociaux uniquement si réels

Données manquantes :
- Comptes de réseaux sociaux réels (DEC-V0-004) — sans confirmation,
  aucun lien social n'est ajouté au footer
