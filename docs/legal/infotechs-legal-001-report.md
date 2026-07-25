# INFOTECHS-LEGAL-001 — Rapport de clôture

> Documentation de conformité opérationnelle du MVP, préparée pour validation humaine. Ce document ne constitue pas un avis juridique.

## 1. SHA initial

`c08c2dd4a62466fad5e3dcb2b05af6f031ef397c` sur la branche `master`.

## 2. État Git initial

`git status --short` ne retournait aucune ligne : working tree propre. La gate de baseline a été respectée avant toute modification.

## 3. Sources officielles et primaires consultées

### Québec

- Loi sur la protection des renseignements personnels dans le secteur privé, RLRQ c P-39.1 : publication du titre et des coordonnées du responsable, responsabilités, politiques et pratiques de gouvernance. Source officielle : <https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1%20>.
- Article 17 de cette loi : évaluation des facteurs relatifs à la vie privée avant communication hors Québec, prise en compte du régime juridique applicable et entente écrite encadrant la communication. Source officielle : <https://www.legisquebec.gouv.qc.ca/fr/version/lc/p-39.1?code=se%3A17&history=20251110>.
- Commission d’accès à l’information, information destinée aux entreprises privées : <https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees>.
- CAI, responsable de la protection des renseignements personnels : <https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/responsable-protection-renseignements-personnels-entreprise>.
- CAI, utilisation et communication des renseignements personnels : <https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/utilisation-communication-renseignements-personnels>.

### Canada

- Commissariat à la protection de la vie privée du Canada, principe du consentement : <https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/?wbdisable=true>.
- Commissariat, obligations relatives à l’accès aux renseignements personnels : <https://www.priv.gc.ca/en/privacy-topics/accessing-personal-information/obligations-for-organizations/02_05_d_54_ati_02/>.

### Fournisseur Resend

- Data Processing Addendum : <https://resend.com/legal/dpa>.
- Politique de confidentialité : <https://resend.com/legal/privacy-policy>.
- Liste des sous-traitants : <https://resend.com/legal/subprocessors>.
- Documentation du tableau de bord des courriels : <https://resend.com/docs/dashboard/emails/introduction>.

### Qualification des conclusions

- **EXIGENCE CONFIRMÉE** — publier le titre et les coordonnées du responsable; informer de façon transparente; limiter la collecte aux renseignements nécessaires; permettre l’exercice des droits applicables; effectuer l’évaluation et l’encadrement exigés avant une communication hors Québec.
- **INTERPRÉTATION PRUDENTE** — le formulaire Contact est publié comme mécanisme de communication tant qu’une coordonnée durable et confirmée n’est pas disponible. Cette solution doit être validée juridiquement avant production.
- **BONNE PRATIQUE** — distinguer les champs obligatoires et facultatifs, nommer le fournisseur, décrire les exclusions, dater la politique et documenter les critères de conservation sans inventer de durée.
- **INFORMATION À FAIRE VALIDER** — applicabilité précise de chaque régime, identité officielle à publier, contact du responsable, calendrier de conservation, EFVP et entente avec Resend, mentions d’entreprise et d’hébergement.

## 4. Fonctionnement Contact de référence

Flux observé dans le code : formulaire client → route serveur Next.js → validation serveur → honeypot et limitation de débit en mémoire → API HTTPS Resend → adresse destinataire configurée. Aucun stockage applicatif des demandes n’est implémenté. Le canal de production et la réception réelle restent non configurés/non prouvés dans ce lot.

## 5. Données collectées

Obligatoires : nom, adresse courriel, type de besoin, description et consentement. Facultatives : organisation et téléphone. Pour la protection contre les abus, l’adresse réseau fournie par le reverse proxy et l’agent utilisateur alimentent une clé hachée temporaire; le champ piège est vérifié. Ces éléments techniques ne sont pas ajoutés au message transmis à Infotechs Solutions.

## 6. Finalités

Transmission, examen et traitement de la demande, suite appropriée et protection du formulaire contre les abus. Le consentement affiché couvre ces finalités et la transmission. Il exclut explicitement marketing, infolettre, profilage, analytics, publicité et partage commercial.

## 7. Fournisseur

Resend agit comme fournisseur technique de transmission courriel et comme sous-traitant selon son DPA. Sont transmis : nom, organisation si fournie, courriel, téléphone si fourni, type de besoin et description. Ne sont pas transmis par l’application : consentement comme champ du message, clé hachée de limitation, agent utilisateur brut et honeypot.

La documentation primaire de Resend indique que ses opérations principales de traitement sont aux États-Unis et que ses catégories peuvent inclure métadonnées, adresses et contenu des messages; le suivi d’ouverture/clic est une fonction optionnelle. Les sous-traitants, paramètres, garanties contractuelles, région effectivement utilisée et désactivation des suivis doivent être vérifiés sur le compte de production.

## 8. Stockage et conservation

Le site n’enregistre la demande dans aucune base applicative, CRM ou fichier. Resend et la boîte destinataire peuvent toutefois traiter et conserver les données conformément à leurs réglages et obligations. La politique emploie des critères — traitement de la demande, obligations applicables, prévention d’abus et défense de droits — plutôt qu’une durée non confirmée. Un calendrier approuvé, les paramètres Resend et les règles de la boîte destinataire sont requis avant production.

## 9. Droits des personnes

La page décrit l’accès, la rectification, le retrait du consentement pour les traitements futurs, la suppression lorsque le droit est applicable et la plainte. Le formulaire `/contact#devis`, avec la mention « Confidentialité », sert de mécanisme actuel. Le lien vers la CAI est fourni. L’identité et une coordonnée durable du responsable doivent encore être confirmées.

## 10. Cookies et mesure d’audience

Inspection du code : aucune plateforme d’analytics, publicité, pixel, CAPTCHA tiers, utilisation de `localStorage`/`sessionStorage`, écriture `Set-Cookie` ou cookie non essentiel n’a été trouvée. Aucune bannière de consentement n’est donc ajoutée. Cette conclusion doit être réévaluée avant toute intégration future de mesure, marketing, vidéo externe ou CAPTCHA.

## 11. Mentions légales

La page identifie Infotechs Solutions, son activité de services informatiques, son ancrage à Saint-Louis-de-Gonzague en Montérégie sans le présenter comme adresse commerciale, et le formulaire Contact comme moyen de communication. Elle couvre nature des contenus, concepts démonstratifs, propriété intellectuelle, liens externes, responsabilité, confidentialité et droit applicable avec une formulation prudente.

## 12. Informations confirmées

- nom public : Infotechs Solutions;
- activité et territoire d’ancrage issus des sources applicatives;
- formulaire Contact comme mécanisme public;
- portfolio actuellement composé de concepts démonstratifs;
- Resend comme canal technique implémenté;
- absence de stockage applicatif, d’analytics et de cookies non essentiels dans le code actuel.

## 13. Informations manquantes avant production

- forme juridique, dénomination enregistrée et NEQ, si applicables;
- identité de la personne exerçant officiellement la fonction de responsable;
- coordonnée durable et confirmée du responsable et de l’éditeur;
- adresse officielle, uniquement si sa publication est requise et confirmée;
- responsable de publication, si applicable et confirmé;
- hébergeur et architecture de déploiement;
- configuration du domaine Resend, expéditeur, destinataire, SPF/DKIM et preuve de réception;
- EFVP, DPA/clauses contractuelles, sous-traitants et garanties de transfert hors Québec;
- calendrier de conservation approuvé pour Resend et la boîte destinataire;
- validation humaine compétente des textes.

Ces données ne sont pas affichées comme espaces réservés sur le site public.

## 14. Modifications effectuées

- `src/app/confidentialite/page.tsx` : politique réécrite selon le flux réel, métadonnées/canonical/Open Graph, droits, Resend, transferts, conservation, sécurité, cookies et mise à jour.
- `src/app/mentions-legales/page.tsx` : informations confirmées uniquement, concepts, responsabilité, propriété intellectuelle et droit applicable prudent.
- `src/components/contact-form.tsx` : consentement limité à la transmission et au traitement de la demande, avec lien accessible vers la politique.
- Tests de confidentialité et Contact adaptés; nouvelle suite dédiée aux mentions légales.
- Six preuves visuelles et présent rapport ajoutés.

Le mécanisme d’envoi Contact, ses dépendances et ses paramètres n’ont pas été modifiés.

## 15. Tests

La suite couvre notamment : H1 unique, canonical et Open Graph; liste exacte des champs; absence de téléversement, Supabase, CRM et analytics inactifs; Resend et absence de stockage applicatif; droits, date et transfert; consentement non marketing et lien; absence de coordonnées temporaires et de lien Ressources; prudence des mentions légales.

Résultat final : **144/144 tests réussis dans 25 fichiers**, soit un total supérieur à la baseline de 135.

## 16. Validations

- `npx tsc --noEmit` : PASS.
- `npm run lint` : PASS, aucune erreur.
- `npm test` : PASS — 144/144.
- `npm run build` : PASS — 22/22 pages générées; routes légales statiques présentes.

## 17. Captures

Répertoire : `docs/legal/screens/infotechs-legal-001/`.

- `confidentialite-1280.png`
- `confidentialite-390.png`
- `mentions-legales-1280.png`
- `mentions-legales-390.png`
- `contact-consent-1280.png`
- `contact-consent-390.png`

Inspection visuelle : lisibilité, contraste, hiérarchie, liens visibles, absence de débordement et absence de contenu temporaire — PASS aux largeurs 1280 et 390 px.

## 18. Risques

- **BLOQUANT PRODUCTION** — réception réelle et configuration Resend non validées.
- **BLOQUANT PRODUCTION** — responsable et coordonnée officielle non confirmés; revue juridique non réalisée.
- **BLOQUANT PRODUCTION** — transfert hors Québec non évalué/formalisé pour l’environnement réel.
- **IMPORTANT** — conservation effective dépend de Resend et de la boîte destinataire; calendrier non approuvé.
- **IMPORTANT** — limitation de débit en mémoire à réévaluer selon l’architecture d’hébergement.
- **SURVEILLANCE** — toute future mesure d’audience ou technologie non essentielle rouvrira l’analyse cookies/consentement.

## 19. Éléments à faire valider juridiquement

Applicabilité et portée des lois; qualité et coordonnées du responsable; suffisance du mécanisme Contact; formulation du consentement et des droits; EFVP et encadrement du transfert; rôle contractuel de Resend et de ses sous-traitants; calendrier de conservation; informations obligatoires de l’éditeur; droit applicable et limitations de responsabilité. Aucun énoncé de ce rapport ne remplace cette validation.

## 20. SHA final

À la clôture, l’unique commit doit porter le message `docs(legal): align public policies with contact delivery`. Le SHA du commit final est consigné dans le retour d’exécution; il ne peut être inscrit dans son propre contenu sans créer un nouveau commit et rompre la règle d’un commit unique.

## 21. État Git final

Objectif de clôture : branche `master`, unique commit du lot, `git status --short` vide. La preuve effective est consignée dans le retour d’exécution après création du commit.

## Décision recommandée

```text
CONFIDENTIALITÉ ALIGNÉE : PASS
MENTIONS LÉGALES ALIGNÉES : PASS
CONSENTEMENT ALIGNÉ : PASS
RESEND DOCUMENTÉ : PASS
COOKIES ÉVALUÉS : PASS
CONTENU TEMPORAIRE RETIRÉ : PASS
INFORMATIONS NON CONFIRMÉES NON INVENTÉES : PASS
INFOTECHS-LEGAL-001 : GO CLÔTURE SOUS VALIDATION PM
INFOTECHS-QA-001 : NON OUVERT
PRODUCTION : NO GO
```
