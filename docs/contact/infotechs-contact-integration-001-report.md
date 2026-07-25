# INFOTECHS-CONTACT-INTEGRATION-001 — Rapport d’intégration

## 1. SHA initial

`bd690d137fd22b82369458245273b622a315af22`

Branche initiale : `master`. Working tree initial : propre.

## 2. État du lot

```text
INFOTECHS-DESIGN-COMPLETION-003A : CLOS ET GELÉ
INFOTECHS-CONTACT-INTEGRATION-001 : TERMINÉ — EN ATTENTE DE VALIDATION PM
INFOTECHS-LEGAL-001 : NON OUVERT
INFOTECHS-QA-001 : NO GO EN ATTENTE DE LA DÉCISION PM
PRODUCTION : NO GO
```

## 3. Options analysées

| Critère | Resend par API HTTPS | SMTP transactionnel | Décision |
|---|---|---|---|
| Fiabilité | API transactionnelle, statuts HTTP, identifiant fournisseur et idempotence | Fiable si transport correctement configuré, mais davantage de paramètres réseau | Resend |
| Sécurité | Clé serveur unique, HTTPS obligatoire, aucun secret client | Identifiant et mot de passe SMTP serveur; exposition à davantage d’erreurs de transport | Resend |
| Coût MVP | Offre adaptée au faible volume, quotas documentés | Variable selon l’hébergeur | Resend |
| Complexité | Un appel `fetch` REST, aucun SDK requis | Transport, ports, TLS et authentification à maintenir | Resend |
| Données conservées | Aucun stockage applicatif; traitement transactionnel par le fournisseur et la boîte destinataire | Aucun stockage applicatif, mais traitement par le relais et la boîte destinataire | Équivalent, Resend mieux documenté |
| Déploiement VPS | Sortie HTTPS standard | Les ports SMTP peuvent être filtrés ou restreints | Resend |
| Protection anti-spam | Protections applicatives + quotas fournisseur | Protections applicatives à compléter par le relais | Resend |
| Maintenance | DNS SPF/DKIM, clé et quotas | Transport, certificats, identifiants et réputation | Resend |

Une solution de stockage/CRM a été écartée : elle n’est pas nécessaire au MVP et augmenterait la surface de données personnelles. Le fournisseur alternatif « déjà prévu » dans la configuration était Resend; Supabase n’était qu’une intention historique de stockage et ne répondait pas à la direction préautorisée.

Références techniques consultées :

- `https://resend.com/docs/api-reference/introduction`
- `https://resend.com/docs/api-reference/emails/send-email`
- `https://resend.com/docs/dashboard/emails/idempotency-keys`
- `https://resend.com/docs/dashboard/domains/introduction`
- documentation Next.js 16.2.9 locale : `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`

## 4. Choix du fournisseur

**Resend**, appelé directement par `fetch` depuis le serveur Next.js.

Raisons : API HTTPS documentée, clé secrète serveur, domaine vérifiable par SPF/DKIM, en-tête d’idempotence, absence d’architecture supplémentaire et compatibilité avec le VPS. Aucun SDK ni nouvelle dépendance n’a été ajouté.

## 5. Architecture retenue

```text
Navigateur / formulaire HTML
  → POST /api/contact
  → limite de taille
  → rate limit
  → parsing JSON ou urlencoded
  → schéma Zod strict
  → honeypot
  → construction texte côté serveur
  → POST HTTPS api.resend.com/emails
  → boîte CONTACT_FORM_TO
```

Fichiers principaux :

- `src/components/contact-form.tsx` : interface, états et soumission;
- `src/app/api/contact/route.ts` : frontière HTTP et orchestration;
- `src/lib/contact-schema.ts` : validation partagée;
- `src/lib/contact-rate-limit.ts` : limitation en mémoire;
- `src/lib/contact-delivery.ts` : adaptateur Resend.

## 6. Flux de données

Le navigateur transmet le payload à la route Next.js. La route vérifie la taille, le taux de requêtes, le format et le honeypot. Les données validées sont converties en message texte. Resend reçoit le message puis le transmet à l’adresse confirmée configurée dans `CONTACT_FORM_TO`. Le navigateur ne reçoit jamais la clé, l’adresse destinataire ni les détails d’erreur du fournisseur.

## 7. Données collectées

- nom;
- organisation facultative;
- courriel;
- téléphone facultatif;
- type de besoin parmi quatre valeurs autorisées;
- description;
- consentement;
- IP déclarée par le reverse proxy et User-Agent, uniquement pour produire une clé de rate limit hachée;
- référence UUID technique et identifiant fournisseur dans les logs minimaux.

## 8. Données non collectées

- aucun fichier ou pièce jointe;
- aucun compte utilisateur;
- aucun profil marketing;
- aucun cookie analytics ajouté;
- aucune base de données;
- aucun CRM;
- aucune mesure d’audience;
- aucun mot de passe ou secret client.

## 9. Stockage

Le site n’écrit aucune demande dans une base de données, un fichier, un CRM ou un outil analytics. Le rate limiter conserve temporairement uniquement une clé SHA-256 non réversible et des horodatages en mémoire. Resend et la boîte courriel destinataire traitent nécessairement le courriel transactionnel; cette réalité est désormais décrite dans la politique de confidentialité.

## 10. Sécurité

- Zod strict rejette les champs inconnus;
- longueurs maximales : nom 100, organisation 120, courriel 254, téléphone 30, description 5000;
- taille HTTP maximale : 16 384 octets;
- courriel et téléphone validés;
- type de besoin fermé;
- consentement obligatoire;
- honeypot hors tabulation;
- secret Resend exclusivement lu dans `process.env` côté serveur;
- corps du message envoyé en texte brut;
- `reply_to` issu d’un courriel validé;
- adresses de configuration refusées si elles comportent des retours de ligne;
- timeout fournisseur de 10 secondes;
- en-tête d’idempotence UUID;
- aucune erreur interne ou réponse fournisseur exposée;
- logs sans description, nom, courriel ni téléphone.

## 11. Rate limiting

Fenêtre : 10 minutes. Maximum : 5 tentatives par clé client hachée. La sixième retourne `429` et `Retry-After`.

Cette protection en mémoire est proportionnée au VPS mono-instance prévu. Limite connue : elle est réinitialisée au redémarrage et ne se coordonne pas entre plusieurs instances. Un store partagé devra remplacer cette implémentation avant une architecture horizontale.

## 12. Anti-spam

Le honeypot `website` est invisible visuellement, retiré de l’ordre de tabulation et soumis au serveur. Une valeur remplie provoque une acceptation silencieuse sans appel au fournisseur. Le rate limit et les limites de taille complètent ce mécanisme. Aucun CAPTCHA tiers n’a été ajouté, car il augmenterait la friction et la collecte sans nécessité démontrée au volume MVP.

## 13. Variables d’environnement

```text
RESEND_API_KEY=
CONTACT_FORM_FROM=
CONTACT_FORM_TO=
CONTACT_PROVIDER_API_URL=
```

`CONTACT_PROVIDER_API_URL` est réservé aux tests locaux sur `127.0.0.1`; toute autre valeur est ignorée et l’URL HTTPS officielle Resend est utilisée. Aucune valeur réelle, adresse personnelle ou clé n’est versionnée.

Préproduction requise : créer une clé d’envoi à privilège minimal, vérifier le domaine d’envoi SPF/DKIM, définir l’expéditeur et confirmer l’adresse destinataire.

## 14. Gestion du succès

Un succès n’est affiché qu’après réponse 2xx du fournisseur contenant un identifiant. La route retourne `202` et le message :

```text
Votre demande a été transmise. Infotechs Solutions pourra l’examiner à partir des informations fournies.
```

Le formulaire est réinitialisé, le bouton demeure désactivé dans cet état et le message porte `role="status"` dans une région `aria-live`.

## 15. Gestion des erreurs

- payload illisible ou invalide : `400`;
- corps trop volumineux : `413`;
- rate limit : `429`;
- fournisseur indisponible : `502`;
- configuration absente : `503`.

Aucun échec ne retourne `ok: true`. L’interface conserve les données, réactive le bouton et affiche une erreur avec `role="alert"`, une consigne de nouvelle tentative et une référence technique. Les détails internes ne sont pas rendus.

## 16. Comportement sans JavaScript

Le formulaire possède `action="/api/contact"` et `method="post"`. La route accepte `application/x-www-form-urlencoded` en plus du JSON; la validation et la transmission restent donc disponibles sans JavaScript, avec une réponse JSON serveur comme repli fonctionnel minimal.

## 17. Alignement éditorial

- Header : `Nous contacter` / `Transmettre une demande`;
- footer : canal réel et CTA `Transmettre une demande`;
- Accueil et Services : formulations orientées transmission réelle;
- Contact : suppression des mentions de vérification locale et d’absence de transmission;
- consentement : transmission à Infotechs Solutions pour examen;
- aucune promesse de devis automatique, appel réservé, disponibilité ou délai de réponse.

## 18. Confidentialité technique

La politique décrit désormais exactement les champs, la finalité, Resend, les destinataires, l’absence de stockage applicatif/CRM/analytics, les protections générales et un moyen provisoire d’exercer les droits via le formulaire. Les mentions relatives au téléversement, à Supabase, au CRM futur et aux analytics futurs ont été retirées.

La validation juridique finale, la durée de conservation juridiquement appropriée et la coordonnée officielle du responsable restent attribuées à `INFOTECHS-LEGAL-001`.

## 19. Tests

Résultat final : **135/135 tests dans 24 fichiers** (baseline : 114).

Couverture ajoutée :

- API valide, JSON invalide, payload incomplet, champ inconnu;
- courriel, type et consentement invalides;
- honeypot sans appel fournisseur;
- rate limit et `Retry-After`;
- fournisseur indisponible;
- configuration absente;
- succès fournisseur et idempotence;
- aucune fuite de secret;
- formulaire natif sans JavaScript;
- taille maximale;
- états initial, chargement, succès, erreur et double soumission;
- reset après succès et conservation après échec;
- région live et rôles accessibles;
- contenu Contact et confidentialité;
- absence de stockage, CRM, analytics et téléversement.

## 20. Résultats techniques

| Validation | Résultat |
|---|---|
| `npx tsc --noEmit` | PASS |
| `npm run lint` | PASS, 0 erreur et 0 avertissement |
| `npm test` | PASS — 135/135, 24 fichiers |
| `npm run build` | PASS — 22/22 pages, `/api/contact` dynamique |
| Dépendances | INCHANGÉES |

## 21. Preuves HTTP

Build final testé sur ports isolés, sans adresse tierce :

| Requête | Résultat |
|---|---|
| `GET /contact` | 200 |
| `POST /api/contact` payload invalide | 400 |
| `POST /api/contact` configuration absente | 503, `ok: false` |
| `POST /api/contact` fournisseur local simulé | 202, `ok: true` |

Le fournisseur simulé local a retardé sa réponse de trois secondes et retourné un identifiant contrôlé. Il a servi aux preuves de chargement/succès et n’a envoyé aucun courriel externe.

## 22. Captures

```text
docs/contact/screens/contact-integration-001/contact-ready-1280.png
docs/contact/screens/contact-integration-001/contact-loading-1280.png
docs/contact/screens/contact-integration-001/contact-success-1280.png
docs/contact/screens/contact-integration-001/contact-error-1280.png
docs/contact/screens/contact-integration-001/contact-footer-1280.png
docs/contact/screens/contact-integration-001/contact-ready-390.png
docs/contact/screens/contact-integration-001/contact-loading-390.png
docs/contact/screens/contact-integration-001/contact-success-390.png
docs/contact/screens/contact-integration-001/contact-error-390.png
docs/contact/screens/contact-integration-001/contact-footer-390.png
```

Résultat : **PASS — 10/10**. Les captures montrent les états réels, les annonces visibles, le bouton désactivé pendant l’envoi, le CTA et le footer sur desktop et mobile.

## 23. Diff

Fichiers applicatifs modifiés : route Contact, formulaire, schéma, Contact, Confidentialité, surfaces CTA autorisées, `.env.example` et tests associés.

Fichiers créés : adaptateur Resend, rate limiter, tests API/interface/confidentialité, rapport et dix captures.

`package.json` et `package-lock.json` sont inchangés. Aucun stockage, dépendance ou fichier temporaire de test n’est inclus.

## 24. SHA final et working tree

Un unique commit doit porter exactement le message :

```text
feat(contact): enable secure contact request delivery
```

Le SHA final est retourné par `git rev-parse HEAD` dans le closeout. Il ne peut pas être inscrit littéralement dans le fichier appartenant à ce même commit sans référence circulaire. Working tree final attendu : propre.

## 25. Réserves avant production et recommandation

```text
CANAL RÉEL : PASS TECHNIQUE
VALIDATION SERVEUR : PASS
PROTECTION ANTI-SPAM : PASS
RATE LIMIT : PASS POUR VPS MONO-INSTANCE
GESTION DES ERREURS : PASS
AUCUN FAUX SUCCÈS : PASS
SECRETS CÔTÉ SERVEUR : PASS
CONFIDENTIALITÉ ALIGNÉE : PASS TECHNIQUE
TYPE-CHECK : PASS
LINT : PASS
TESTS : PASS — 135/135
BUILD : PASS
HTTP : PASS
CAPTURES : PASS — 10/10
```

Avant production : configurer et vérifier le compte/domaine Resend, confirmer les adresses d’envoi et de réception, effectuer une vraie recette de réception autorisée, ouvrir `INFOTECHS-LEGAL-001`, traiter ou accepter les vulnérabilités héritées, puis exécuter `INFOTECHS-QA-001`.

Recommandation de l’agent : **GO POUR DÉCISION PM DE CLÔTURE DU LOT; PRODUCTION NO GO**. L’ouverture de QA reste une décision PM après examen des réserves de configuration réelle.
