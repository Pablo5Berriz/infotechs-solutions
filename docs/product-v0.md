# Infotechs Solutions — Spécification produit V0

Statut du document : CANDIDAT — sert de référence fonctionnelle pour la
construction de la V0, sous réserve de validation du propriétaire du
projet sur les points listés en section 25 (Open Decisions).

Sources utilisées :
- `README.md` (positionnement déclaré par le propriétaire du projet)
- `docs/architecture.md` (baseline technique — commit `d5c6bf5`)
- Doctrine produit communiquée par le PM dans la directive
  INFOTECHS-PRODUCT-IA-001 (positionnement, cible géographique, vertical
  démonstrateur, canal d'acquisition prioritaire)
- Recherche explicite dans le dépôt : aucune occurrence de « Gonzague »,
  « Montérégie » ou « Québec » n'existe dans le code ou la documentation
  actuelle (`grep -RIn` sur l'arborescence, hors `node_modules`/`.git`).
  Les éléments géographiques et le cas Garage Auto Gonzague sont donc
  des données CANDIDATES apportées par le PM dans cette directive, pas
  des faits déjà prouvés par le dépôt.

---

## 1. Vision

Infotechs Solutions est un studio de solutions numériques qui aide des
PME à améliorer leur présence numérique, leurs outils métier et
l'exploitation de leurs systèmes numériques. Le site V0 est l'outil
principal d'acquisition commerciale du studio : il doit convertir un
prospect qualifié en prise de contact, pas nécessairement générer du
trafic organique massif dès le lancement.

## 2. Objectifs

| ID | Objectif | Statut |
|---|---|---|
| O1 | Faire comprendre rapidement ce qu'est Infotechs Solutions | VALIDÉ (doctrine PM) |
| O2 | Faire identifier les problèmes que le studio peut résoudre | VALIDÉ |
| O3 | Démontrer une capacité réelle avec au moins un cas documenté | CANDIDAT — dépend de la disponibilité de preuves (voir §15) |
| O4 | Créer un chemin simple vers une prise de contact | VALIDÉ |
| O5 | Construire une présence professionnelle crédible | VALIDÉ |
| O6 | Permettre une indexation locale correcte | VALIDÉ |
| O7 | Respecter une baseline technique et de confidentialité adaptée au Québec | VALIDÉ — cadre technique seulement, pas un avis juridique |

## 3. Cibles

**Audience principale :** dirigeants/décideurs de PME locales ou
régionales ayant un besoin numérique concret (présence, outil métier, ou
exploitation).

**Marché géographique initial :** Montérégie / Québec (donnée CANDIDATE
apportée par le PM — aucune preuve dans le dépôt actuel ; à confirmer,
voir DEC-V0-001).

**Canal d'acquisition prioritaire :** prospection directe et
référencement local — pas la publicité payante ni le SEO de contenu
massif au lancement (doctrine PM §8).

## 4. Proposition de valeur

Proposition de valeur courte (candidate, à valider par le propriétaire
avant publication finale) :

> Infotechs Solutions aide les PME à améliorer leur présence numérique,
> leurs outils métier et l'exploitation de leurs systèmes — avec une
> approche pragmatique et vérifiable.

## 5. Positionnement

Positionnement général : **PME** (tous secteurs).
Vertical démonstrateur initial : **automobile**, via le projet Garage
Auto Gonzague (statut détaillé en §15).

Le positionnement général ne doit pas être présenté comme spécifique à
l'automobile — le vertical automobile sert uniquement de preuve/cas
d'usage, pas de segmentation commerciale exclusive.

## 6. Piliers de services

| Pilier | Exemples de besoins couverts | Statut V0 |
|---|---|---|
| Présence numérique | site vitrine, présence professionnelle, référencement local, optimisation de conversion, modernisation d'un site existant | OBLIGATOIRE V0 — pilier central de l'offre affichée |
| Outils métier | formulaires métier, prise de rendez-vous, mini-CRM, automatisations, outils internes, applications sur mesure | OBLIGATOIRE V0 (présentation), OPTIONNEL (implémentation produit) |
| Exploitation numérique | hébergement, maintenance, sauvegardes, supervision, assistance technique, amélioration continue | OBLIGATOIRE V0 (présentation) |

Les trois piliers sont présentés en V0 à titre de **catégories d'offre**,
pas nécessairement comme des services individuellement détaillés avec
tarifs ou livrables contractuels — voir §32 (tarification).

## 7. Personas minimaux

**Persona A — dirigeant de PME sans site ou avec site insuffisant**
- Problème : absence de présence numérique crédible, ou site vitrine
  obsolète/non responsive.
- Intention : évaluer un partenaire capable de livrer rapidement un
  site professionnel.
- Information recherchée : preuve de compétence, exemples concrets,
  facilité de prise de contact.
- Objection principale : coût perçu vs bénéfice incertain, crainte
  d'un prestataire non local/non disponible.
- CTA logique : « Parler de votre projet » (CTA primaire).

**Persona B — PME avec processus manuels à améliorer**
- Problème : tâches répétitives, formulaires papier, absence
  d'automatisation.
- Intention : comprendre si un outil sur mesure ou une automatisation
  est accessible pour une petite structure.
- Information recherchée : exemples d'outils métier réalisés,
  compréhension du studio des contraintes PME.
- Objection principale : complexité perçue, peur de dépendance
  technique.
- CTA logique : « Demander une analyse ».

**Persona C — PME disposant déjà d'outils mais ayant besoin de
maintenance ou d'exploitation**
- Problème : système existant non maintenu, absence de supervision ou
  de sauvegardes.
- Intention : trouver un partenaire fiable pour la continuité
  opérationnelle.
- Information recherchée : sérieux, réactivité, capacité de reprise
  d'un système existant.
- Objection principale : confiance (reprise d'un existant tiers).
- CTA logique : « Nous contacter ».

## 8. User journeys

**Parcours principal (prospect entrant)**
```
Prospect → Accueil → Compréhension de l'offre → Service pertinent
→ Preuve / cas réel → CTA → Contact
```

**Parcours prospection sortante**
```
Prospection sortante → Landing / page sectorielle → Cas démonstrateur
→ Contact
```
Remarque : la « page sectorielle » n'est pas confirmée comme route V0
(voir §9/§15 — dépend du statut réel de Garage Auto Gonzague). Si ce
parcours est activé, il pointe vers la page réalisations plutôt qu'une
route dédiée par secteur, pour rester compact en V0.

**Parcours recherche locale**
```
Recherche Google locale → Page service / accueil → Crédibilité → Contact
```
En V0, faute de contenu suffisant pour des pages géographiques
dédiées, ce parcours atterrit sur l'accueil ou `/services`, pas sur une
page locale dédiée (voir §20 SEO local).

## 9. Architecture informationnelle

Voir `docs/routes-v0.md` pour le détail complet route par route.

## 10. Routes

Voir `docs/routes-v0.md`.

## 11. Navigation

| Label FR | Label EN (futur) | Route | Priorité |
|---|---|---|---|
| Accueil | Home | `/` | V0 |
| Services | Services | `/services` | V0 |
| Réalisations | Work | `/realisations` | V0 |
| À propos | About | `/a-propos` | V0 |
| Contact | Contact | `/contact` | V0 |

Le footer porte les liens légaux (`/confidentialite`,
`/mentions-legales`) hors navigation principale, conformément aux
pratiques standards d'un site vitrine.

## 12. Structure de l'accueil

Structure candidate (ordre proposé) :

| # | Section | Objectif | Preuve nécessaire | CTA |
|---|---|---|---|---|
| 1 | Hero | Faire comprendre en 5 secondes ce qu'est Infotechs Solutions | proposition de valeur validée (§4) | CTA primaire visible |
| 2 | Problèmes / besoins | Faire que le prospect se reconnaisse | aucune (formulation de problèmes courants PME) | — |
| 3 | 3 piliers | Présenter l'offre structurée | contenu des 3 piliers (§6) | liens vers `/services` |
| 4 | Méthode | Rassurer sur la façon de travailler | à rédiger (aucune preuve requise, description de process) | — |
| 5 | Réalisation / démonstrateur | Démontrer une capacité réelle | statut confirmé de Garage Auto Gonzague (§15) — SECTION CONDITIONNELLE, à retirer si aucune preuve publiable n'est disponible | lien vers `/realisations` |
| 6 | Pourquoi Infotechs | Différenciation, crédibilité | à rédiger, sans chiffres inventés | — |
| 7 | CTA final | Convertir | — | CTA primaire répété |

La section 5 (réalisation/démonstrateur) est explicitement conditionnelle :
elle ne doit pas apparaître sur l'accueil tant que le statut de Garage
Auto Gonzague n'est pas confirmé (voir §15 et DEC-V0-002).

## 13. Architecture des services

**Décision recommandée : Option A — page unique `/services`** présentant
les trois piliers en une seule page.

Justification :
- Simplicité : la V0 ne dispose pas encore d'un volume de contenu
  justifiant 3 sous-pages distinctes.
- SEO : à ce stade, une page unique bien structurée (H2 par pilier)
  capte mieux l'intention de recherche générique ("services numériques
  PME") que 3 pages minces qui diluent l'autorité de la page.
- Maintenance : une seule page à tenir à jour tant que l'offre n'est
  pas figée commercialement.
- Crédibilité : évite l'impression de contenu artificiellement gonflé
  (3 pages avec peu de texte chacune).

L'option B (sous-pages `/services/presence-numerique`,
`/services/outils-metier`, `/services/exploitation`) est reportée en
V0.1/backlog, à activer seulement si un pilier génère un volume de
contenu ou de demandes suffisant pour justifier une page dédiée
(déclencheur : ≥ 2 cas réalisés documentés sur ce pilier).

## 14. Structure d'une réalisation (case study)

Gabarit obligatoire pour toute entrée de `/realisations` :

| Champ | Description |
|---|---|
| Client / démonstrateur | Nom réel si autorisation de publication, sinon « Projet démonstrateur » |
| Contexte | Situation de départ, secteur |
| Problème | Besoin réel identifié |
| Solution | Ce qui a été livré |
| Fonctionnalités | Liste factuelle, vérifiable |
| Stack (si pertinent) | Technologies réellement utilisées |
| Résultat vérifiable | Uniquement si mesurable et vérifiable — sinon omis, jamais inventé |
| Statut | « Cas client » / « Démonstrateur » / « Projet interne » / « Projet réalisé » / « Projet en cours » |
| CTA | Lien vers contact |

Interdictions strictes (héritées de la doctrine projet et rappelées
ici) : aucun faux témoignage, aucun faux ROI, aucun faux chiffre, aucun
faux client, aucune métrique inventée, aucun faux avant/après.

## 15. Statut de Garage Auto Gonzague

**Recherche effectuée dans le dépôt : aucune occurrence de « Gonzague »
n'existe dans le code source ou la documentation actuelle.** Aucune
preuve contractuelle, aucune capture, aucun contenu descriptif du
projet n'est présent dans ce repository à ce jour.

Statut recommandé : **STATUT À CONFIRMER PAR LE PROPRIÉTAIRE DU PROJET**

Le document ne peut pas trancher entre « cas client », « démonstrateur »
ou « projet interne » sans preuve. Tant que cette confirmation n'est pas
faite, Garage Auto Gonzague :
- NE DOIT PAS apparaître comme réalisation publiée en V0 ;
- NE DOIT PAS être utilisé comme preuve sur l'accueil (§12, section 5) ;
- reste une simple hypothèse de contenu candidat pour `/realisations`
  une fois les preuves fournies.

Voir DEC-V0-002.

## 16. Stratégie CTA

**CTA primaire :** « Parler de votre projet » — utilisé sur l'accueil
(hero + section finale) et sur `/services`.

**CTA secondaire :** « Nous contacter » — utilisé dans la navigation,
le footer, et sur `/a-propos`/`/realisations`.

CTA candidats écartés pour la V0 (par souci de simplicité, pas de
multiplication des appels à l'action) : « Demander une analyse »,
« Obtenir une estimation », « Planifier un échange ». Ils pourront être
testés en V0.1 selon les retours d'usage.

## 17. Contrat fonctionnel du formulaire de contact

Le formulaire n'est PAS implémenté dans ce lot. Contrat fonctionnel
seulement.

| Champ | Type | Obligatoire | Finalité | Validation future |
|---|---|---|---|---|
| Nom | texte | Oui | Identifier l'interlocuteur | non vide, longueur raisonnable |
| Entreprise | texte | Non | Contextualiser la demande | — |
| Courriel | email | Oui | Répondre au prospect | format email valide |
| Téléphone | texte | Non | Rappel si souhaité par le prospect | format numérique souple |
| Type de besoin | choix (présence / outils métier / exploitation / autre) | Non | Orienter le traitement de la demande | valeur dans une liste fermée |
| Message | texte long | Oui | Détail de la demande | non vide, longueur max raisonnable (anti-abus) |
| Consentement | case à cocher | Oui | Preuve de consentement au traitement (Loi 25) | doit être coché pour soumettre |

Principe de minimisation des données appliqué : aucun champ non
directement nécessaire à la qualification et au traitement de la
demande (pas de champ « budget », pas de champ démographique, pas de
champ optionnel superflu).

### Frontière technique

Le frontend V0 reste STATIC-FIRST (voir `docs/architecture.md`). Le
formulaire ne doit donc pas introduire de backend Next.js.

Architecture cible :
```
Navigateur
   ↓
endpoint externe ou service isolé (hors du frontend Next.js)
   ↓
validation / anti-spam / rate limiting
   ↓
workflow n8n éventuel (orchestration après réception sécurisée)
   ↓
destination (ex. boîte courriel du studio)
```

n8n n'est pas un endpoint public : il intervient après réception
sécurisée de la demande par l'endpoint isolé, jamais en frontal direct
exposé au navigateur. Aucune implémentation de cette chaîne n'est
réalisée dans ce lot ni dans les lots précédents.

## 18. Exigences de confidentialité / Loi 25 (baseline technique)

| Aspect | Statut |
|---|---|
| Données collectées | limitées aux champs du formulaire (§17) |
| Finalité | traiter une demande de contact commerciale |
| Consentement | case à cocher explicite au moment de la soumission |
| Politique de confidentialité | requise avant mise en ligne du formulaire — page `/confidentialite` |
| Durée de conservation | À VALIDER JURIDIQUEMENT |
| Suppression sur demande | À VALIDER JURIDIQUEMENT — mécanisme à définir (contact manuel acceptable en V0) |
| Accès restreint aux données | dépend de l'implémentation finale du endpoint (hors scope de ce lot) |
| Services tiers | aucun engagé en V0 pour la collecte (le endpoint reste à définir) |
| Analytics | voir §19 |
| Cookies | aucun cookie non essentiel prévu en V0 tant qu'aucun analytics n'est activé |

Ce tableau ne constitue pas un avis juridique. Toute case marquée
« À VALIDER JURIDIQUEMENT » doit être confirmée par le propriétaire du
projet ou un conseil compétent avant publication du formulaire.

## 19. Recommandation Analytics

Recommandation : **Aucun analytics au lancement de la V0.**

Justification : la V0 sert d'abord la prospection directe et le
référencement local (doctrine §8), pas l'optimisation d'un trafic
existant. Ajouter un outil d'analytics dès le lancement introduit une
question de consentement/cookies sans bénéfice immédiat démontré.

Si un besoin de mesure apparaît après lancement, Cloudflare Web
Analytics (sans cookie, compatible avec l'export statique et
l'hébergement cible) est l'option recommandée en priorité, à évaluer en
V0.1.

## 20. Baseline SEO

| Élément | Statut V0 |
|---|---|
| Metadata (title/description par page) | V0 — obligatoire |
| Titres et structure H1/H2 | V0 — un seul H1 par page |
| Canonical | V0 |
| Sitemap | V0 |
| Robots.txt | V0 |
| Open Graph | V0 |
| Organization schema (JSON-LD) | V0 |
| LocalBusiness schema | PLUS TARD — nécessite adresse/coordonnées confirmées par le propriétaire (voir DEC-V0-001) |
| Alt sur les images | V0 (dès qu'il y a des images) |
| Maillage interne | V0 — liens entre accueil, services, réalisations, contact |

## 21. SEO local

| Élément | Statut |
|---|---|
| Mention de la localisation principale dans le contenu (ex. footer, page à propos) | V0 |
| Pages sectorielles dédiées | NON RECOMMANDÉ en V0 (pas assez de contenu, risque de pages minces) |
| Pages géographiques dédiées (par ville) | NON RECOMMANDÉ en V0 (keyword stuffing, aucun contenu réel à date) |
| Google Business Profile | PLUS TARD — action hors dépôt (compte externe), à confirmer par le propriétaire |
| Données structurées LocalBusiness | PLUS TARD (dépend de DEC-V0-001) |

La stratégie V0 consiste à mentionner clairement la zone de service dans
le contenu existant (footer, à propos) sans multiplier les pages, en
attendant un volume de contenu justifiant une approche géographique plus
développée.

## 22. Architecture bilingue recommandée

**Recommandation : Option A — préfixe de langue pour les deux langues**
```
/fr/...
/en/...
```

Justification :
- Symétrie et clarté SEO : `hreflang`/canonical simples à implémenter
  car chaque langue a un préfixe explicite, sans ambiguïté sur la
  langue par défaut.
- Cohérent avec l'App Router (segment de route `[lang]` ou groupe de
  routes localisé) et avec l'export statique (chaque page reste
  statiquement générée par langue).
- Évite le piège de l'Option B (FR à la racine, `/en/...` en préfixe)
  où la détection de la langue par défaut devient ambiguë pour les
  moteurs de recherche et pour un futur changement de langue par
  défaut.

Cette recommandation n'implique aucune implémentation ni ajout de
bibliothèque i18n dans ce lot ni dans les suivants tant que le
bilinguisme n'est pas un lot explicitement ouvert. La page d'accueil
actuelle reste en français uniquement (`app/page.tsx`,
`<html lang="fr">`).

## 23. Matrice de scope V0

| Fonction | V0 | V0.1 | Backlog | Rejeté | Justification |
|---|---|---|---|---|---|
| Accueil | ✓ | | | | Point d'entrée obligatoire |
| Services (page unique) | ✓ | | | | Voir §13 |
| Réalisations | ✓ | | | | Nécessaire pour O3, contenu conditionnel (§15) |
| À propos | ✓ | | | | Crédibilité, qui/où/pour qui |
| Contact (page + formulaire visuel, sans backend fonctionnel) | ✓ | | | | Nécessaire pour O4 |
| Formulaire fonctionnel (endpoint réel) | | ✓ | | | Contrat défini (§17), implémentation hors scope de ce lot |
| Bilingue FR/EN | | | ✓ | | Architecture recommandée (§22), pas encore de contenu EN |
| SEO baseline (metadata, sitemap, robots, OG) | ✓ | | | | Coût faible, bénéfice direct |
| LocalBusiness / SEO local avancé | | ✓ | | | Dépend de DEC-V0-001 |
| Analytics | | ✓ | | | Voir §19, pas de besoin démontré au lancement |
| Blog | | | | ✓ (voir §24) | Pas de besoin éditorial démontré |
| Prise de rendez-vous | | ✓ | | | Le contact simple suffit en V0 |
| Espace client | | | | ✓ (hors V0) | Aucun besoin validé, éviterait auth prématurée |
| CRM | | | ✓ | | Dépend du volume réel de demandes |
| n8n | | ✓ | | | Orchestration après le endpoint de contact, pas prioritaire tant que le formulaire lui-même n'existe pas |
| CMS | | | ✓ | | Le volume de contenu V0 ne justifie pas un CMS |
| Témoignages | | | | ✓ (interdits sans preuve, voir §14) | Interdiction doctrine projet |
| Tarification publique | | | | ✓ (voir §32) | Doctrine actuelle : pas de prix publics |
| Pages géographiques locales | | | ✓ | | Voir §21 |

## 24. Blog

Statut : **NON NÉCESSAIRE ACTUELLEMENT.**

Justification : un blog ne doit pas être ajouté uniquement « pour faire
du SEO » sans capacité éditoriale réelle démontrée. Aucune ressource de
rédaction récurrente n'est identifiée à ce stade. À réévaluer si le
studio produit du contenu technique de façon régulière et documentée
(cas d'usage, retours d'expérience réels).

## 25. Non-goals V0 (protection contre le scope creep)

Explicitement HORS V0, à ne pas construire pendant la phase actuelle :
- Espace client / authentification
- CRM intégré au site
- CMS
- Blog
- Prise de rendez-vous en ligne
- Pages géographiques ou sectorielles multiples
- Formulaire fonctionnel avec backend réel (le contrat est défini, pas
  l'implémentation)
- Intégration n8n active
- Analytics
- Tarification publique
- Bilinguisme implémenté (architecture seulement recommandée)
- Tout témoignage, chiffre ou client non prouvé par le repository ou le
  propriétaire du projet

## 26. Critères d'acceptation V0 (pour un futur lot d'implémentation)

La V0 pourra être considérée comme fonctionnellement complète quand :
1. Les 5 routes obligatoires (§ `docs/routes-v0.md`) existent et sont
   navigables.
2. La navigation et le footer reflètent exactement §11/§29.
3. Le contenu de chaque page respecte `docs/content-requirements-v0.md`
   (aucun contenu marketing non vérifiable).
4. Le statut de Garage Auto Gonzague est tranché (DEC-V0-002) — la
   section réalisation de l'accueil et la page `/realisations`
   reflètent la décision prise, y compris l'option « aucune réalisation
   publiée pour l'instant ».
5. Le formulaire de contact affiche l'interface définie par §17, sans
   nécessairement être fonctionnel (peut afficher un état « à venir »
   si le endpoint n'est pas encore prêt) — ou est fonctionnel si le
   lot d'implémentation correspondant a été exécuté.
6. La baseline SEO (§20) est appliquée à chaque page.
7. La politique de confidentialité et les mentions légales existent
   avant toute collecte réelle de données.
8. `npm run lint`, `npm run typecheck`, `npm run build` restent PASS.

---

## Open Decisions

Voir tableau détaillé ci-dessous.

| ID | Question | Options | Recommandation | Décision requise du propriétaire |
|---|---|---|---|---|
| DEC-V0-001 | La localisation précise (Montérégie, ville) et les coordonnées d'affaires doivent-elles être publiées, et sous quelle forme (LocalBusiness schema, Google Business Profile) ? | (a) publier une localisation précise maintenant ; (b) rester générique « Québec » en V0 ; (c) ne rien publier | (b) rester générique en V0, préciser en V0.1 une fois les coordonnées d'affaires confirmées | Oui — le propriétaire doit fournir/valider les coordonnées d'affaires réelles à publier |
| DEC-V0-002 | Quel est le statut réel de Garage Auto Gonzague (cas client / démonstrateur / projet interne / non publié) et quelles preuves peuvent être publiées ? | (a) cas client avec autorisation ; (b) démonstrateur non contractuel ; (c) projet interne ; (d) non publié pour l'instant | Aucune recommandation possible sans preuve (§15) | Oui — bloquant pour publier `/realisations` avec ce contenu |
| DEC-V0-003 | Faut-il conserver l'option A pour `/services` (page unique) au-delà de la V0, ou anticiper dès maintenant les sous-routes ? | (a) conserver l'option A tant que le contenu est limité ; (b) créer les sous-routes dès V0.1 | (a), avec réévaluation au déclencheur défini en §13 | Non bloquant — décision différée acceptable |
| DEC-V0-004 | Le studio dispose-t-il de comptes de réseaux sociaux réels à afficher en footer ? | (a) oui, lesquels ; (b) non, aucun lien social en V0 | (b) par défaut tant qu'aucun compte réel n'est confirmé | Oui — nécessaire avant d'ajouter des liens sociaux au footer |
| DEC-V0-005 | Le canal de réception du formulaire de contact (endpoint isolé) est-il déjà choisi (ex. service tiers, fonction serverless dédiée, adresse courriel directe) ? | (a) service de formulaire externe ; (b) fonction serverless dédiée hors Next.js frontend ; (c) réception directe par courriel via un service tiers | Aucune recommandation définitive — dépend d'un choix d'outil que ce lot ne tranche pas | Oui — nécessaire avant le lot d'implémentation du formulaire |
