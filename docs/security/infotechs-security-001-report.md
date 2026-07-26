# INFOTECHS-SECURITY-001 — Rapport de sécurité

## 1. État du lot

```text
LOT : INFOTECHS-SECURITY-001
PHASE COURANTE : CONSOLIDATION FINALE
STATUT : TERMINÉ — EN ATTENTE DE CLÔTURE PM
PRODUCTION : NO GO
```

Baseline Git : `c48512b0a4fd4923f73bd9bf9cf7781c526a7710` sur `master`. Aucun commit n'avait été créé pendant les phases T1 à H1 ; la remédiation consolidée a ensuite été intégrée au SHA `f0ee6c8da94e40aa17792dc863bcddbc6da1c560`.

```text
VALIDATION CUMULÉE :
Tests : 179/179 dans 29 fichiers
Build : 22/22
Type-check : PASS
Lint : PASS
Diff check : PASS
```

## 2. Audit initial et méthode

L'analyse a porté sur `package.json`, `package-lock.json`, l'arbre installé, les avis retournés par `npm audit`, la configuration Next.js, le layout, les pages et composants publics, les styles et les ressources de `public/`.

L'audit initial associait les vulnérabilités à leurs chaînes parentes et à l'exposition réelle plutôt que de considérer chaque entrée agrégée comme une exploitation applicative. Neuf avis propres à Next.js ont été supprimés par la migration stable de Next.js et `eslint-config-next` de 16.2.9 à 16.2.12. La résolution naturelle du lockfile a également actualisé PostCSS racine, nanoid, js-yaml et certaines versions de brace-expansion, sans override ni nouvelle dépendance.

Après remédiation naturelle, `npm audit` signale 12 entrées de paquets de sévérité haute, reposant sur cinq avis directs résiduels : trois avis PostCSS dans la copie imbriquée de Next.js, un avis Sharp et un avis brace-expansion propagé dans l'outillage ESLint. Aucun correctif stable naturel compatible n'est proposé par les chaînes parentes actuelles ; les propositions automatiques sont des changements inter-majeurs ou des rétrogradations invalides.

## 3. Changements de dépendances autorisés

- `next` : 16.2.9 → 16.2.12.
- `eslint-config-next` : 16.2.9 → 16.2.12.
- PostCSS racine de développement : 8.5.23 après résolution naturelle.
- PostCSS embarqué par Next.js : 8.4.31, inchangé et encore concerné.
- Sharp : 0.34.5, inchangé.
- brace-expansion racine : 1.1.16 ; copie TypeScript ESLint : 5.0.8.
- js-yaml : 4.3.0 après résolution naturelle.

Aucun `overrides`, aucune nouvelle dépendance et aucun `npm audit fix --force` n'ont été utilisés.

## 4. Registre des risques acceptés

### SEC-RISK-001 — PostCSS

```text
PACKAGE : postcss@8.4.31
PARENT : next@16.2.12
RISQUE : 3 avis connus
EXPOSITION : FAIBLE
DÉCISION : ACCEPTATION TEMPORAIRE
ÉCHÉANCE : prochaine version stable Next intégrant PostCSS corrigé,
ou avant mise en production.
```

Mesures compensatoires : aucun CSS fourni par les utilisateurs, aucun éditeur CSS public, aucun CMS autorisant du CSS personnalisé, sources CSS contrôlées dans Git, build reproductible, CSP déployée et testée. Toute fonctionnalité future de thème ou CMS acceptant du contenu libre impose une nouvelle analyse.

### SEC-RISK-002 — Sharp

```text
PACKAGE : sharp@0.34.5
PARENT : next@16.2.12
RISQUE : GHSA-f88m-g3jw-g9cj
EXPOSITION : FAIBLE
DÉCISION : ACCEPTATION TEMPORAIRE
ÉCHÉANCE : version stable Next utilisant sharp >=0.35.0,
ou avant mise en production.
```

Mesures compensatoires : aucun `next/image`, aucun téléversement d'image, aucun traitement d'image non fiable et aucune route d'optimisation volontairement utilisée. Un ajout futur de téléversement ou de `next/image` impose la réouverture de l'analyse.

### SEC-RISK-003 — Brace Expansion

```text
PACKAGE : brace-expansion@1.1.16
PORTÉE : développement uniquement
EXPOSITION : outillage ESLint contrôlé localement et en CI
DÉCISION : ACCEPTATION TEMPORAIRE
ÉCHÉANCE : mise à jour naturelle de l'écosystème ESLint/minimatch.
```

Mesures compensatoires : aucune expression glob fournie par un utilisateur, lint limité au dépôt contrôlé, aucune présence dans l'exécution publique et aucun override inter-majeur.

Ces trois risques doivent être réévalués avant la production et à chaque mise à jour de Next.js ou de l'écosystème ESLint.

## 5. Analyse des ressources HTTP

- Scripts : aucun `next/script`, analytics ou script tiers. Le HTML de production contient le JSON-LD applicatif et les scripts inline d'amorçage/hydratation générés par Next.js.
- Styles : styles du dépôt et styles inline utilisés par Framer Motion.
- Polices : `next/font/google`, téléchargées au build puis servies localement.
- Images et SVG : ressources locales ; les URI `data:` sont permises pour les images.
- Navigateur : le seul appel API applicatif est `/api/contact` sur la même origine.
- Resend : exclusivement serveur ; aucun domaine ou secret Resend n'est exposé dans la CSP ou les bundles clients.
- Aucun CAPTCHA, iframe, CMS ou ressource Cloudflare côté client.

## 6. Stratégie d'en-têtes

`poweredByHeader: false` supprime `X-Powered-By`. Les en-têtes suivants s'appliquent à `/(.*)`, donc aux pages, aux erreurs et à l'API :

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
```

La protection iframe est volontairement redondante : `X-Frame-Options: DENY` pour les clients historiques et `frame-ancestors 'none'` dans la CSP.

## 7. CSP finale

```text
default-src 'self';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
object-src 'none';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline'
```

Il n'existe aucun wildcard global, aucun domaine tiers inutile et aucun `unsafe-eval`.

`script-src 'unsafe-inline'` est actuellement nécessaire aux scripts inline d'amorçage/hydratation émis par Next.js et au JSON-LD inline. Une nonce dynamique n'a pas été introduite : elle exige une étude dédiée et risquerait de rendre dynamiques les pages aujourd'hui statiques. `style-src 'unsafe-inline'` est nécessaire aux styles inline de Framer Motion et au fonctionnement visuel observé de Next.js.

Firefox a initialement signalé le probe JIT de Zod, qui utilise le constructeur `Function` même lorsque son échec est intercepté. Ajouter `unsafe-eval` a été refusé. `z.config({ jitless: true })` désactive ce probe et conserve la validation fonctionnelle tout en rendant le formulaire compatible avec la CSP. Après correction, aucune violation CSP n'est observée.

## 8. HSTS et isolation cross-origin

```text
HSTS : PRÉPARÉ MAIS NON ACTIVÉ
COUCHE CIBLE : CLOUDFLARE / REVERSE PROXY DE PRODUCTION
```

Prérequis : domaine définitif, HTTPS et certificat validés, inventaire des sous-domaines, stratégie de retour arrière et transfert Cloudflare terminé. `preload` et `includeSubDomains` ne sont pas autorisés à cette étape.

COOP, CORP et COEP ne sont pas activés. Le site n'a pas besoin d'isolation cross-origin pour ses fonctions actuelles et leur activation apporterait un risque de compatibilité avec les navigations ou ressources futures sans bénéfice démontré. COEP devra notamment faire l'objet d'une preuve de compatibilité avant toute activation.

## 9. Tests et build

```text
npx tsc --noEmit : PASS
npm run lint : PASS
npm test : PASS — 163/163 dans 27 fichiers
npm run build : PASS — 22/22 routes
git diff --check : PASS
```

Dix tests H1 vérifient la portée globale, la suppression de `X-Powered-By`, les valeurs des quatre en-têtes stables, la CSP, la protection iframe, l'absence de wildcard et d'`unsafe-eval`, ainsi que l'absence de noms de secrets ou de Resend dans les en-têtes.

## 10. Validation HTTP en production locale

Serveur : `next start -p 3000`.

| Requête | Statut | En-têtes de sécurité | Résultat |
|---|---:|---|---|
| `GET /` | 200 | présents | PASS |
| `GET /contact` | 200 | présents | PASS |
| `GET /confidentialite` | 200 | présents | PASS |
| `GET /mentions-legales` | 200 | présents | PASS |
| `GET /route-inconnue-h1` | 404 | présents | PASS |
| `GET /api/contact` | 405 | présents | PASS — méthode refusée |
| `OPTIONS /api/contact` | 204 | présents | PASS |

`X-Powered-By` et `Strict-Transport-Security` sont absents comme prévu. Les réponses des méthodes API inattendues ne contiennent ni stack trace ni secret.

## 11. Validation navigateurs

Matrice exécutée en build de production sur `/`, `/contact`, `/confidentialite` et `/mentions-legales`, à 390 px et 1280 px :

| Moteur | Cas | HTTP 200 | H1/contenu visible | Navigation | Polices | Débordement | Console/CSP |
|---|---:|---|---|---|---|---|---|
| Chrome | 8/8 | PASS | PASS | PASS | PASS | aucun | 0 erreur |
| Firefox | 8/8 | PASS | PASS | PASS | PASS | aucun | 0 erreur |
| WebKit | 8/8 | PASS | PASS | PASS | PASS | aucun | 0 erreur |

Le formulaire est visible aux deux largeurs, les polices atteignent l'état `loaded`, les pages restent visibles, la navigation est présente et aucun blocage de ressource ou changement visuel n'a été observé. Les animations conservent leur chemin normal (`prefers-reduced-motion: no-preference`).

## 12. Risques résiduels et décision

- SEC-RISK-001 à SEC-RISK-003 restent ouverts sous acceptation temporaire.
- HSTS reste à configurer à la couche Cloudflare/reverse proxy après validation du domaine et de HTTPS.
- `unsafe-inline` reste nécessaire pour les scripts et styles dans l'architecture statique actuelle ; une stratégie nonce/hash demanderait un lot séparé.
- La confiance proxy et le rate limiting relèvent de H2 et ne sont pas couverts ici.
- État historique au jalon H1 : les changements de dépendances et H1 attendaient encore leur consolidation dans un commit Security unique.

```text
RECOMMANDATION H1 : GO POUR VALIDATION PM
INFOTECHS-SECURITY-001 : EN COURS AU JALON H1
INFOTECHS-DEPLOYMENT-001 : NON OUVERT
PRODUCTION : NO GO
```

## 13. H2 — Confiance proxy et rate limiting

### 13.1 Logique avant H2

La route prenait aveuglément le premier élément de `X-Forwarded-For`, puis `X-Real-IP`, avec `unknown` en dernier recours. Cette valeur était concaténée au User-Agent avant hachage. Un client directement connecté pouvait donc changer sa clé de limitation en falsifiant ces en-têtes. Le limiteur appliquait cinq requêtes sur dix minutes et stockait une clé SHA-256, mais ne purgeait les timestamps expirés que lorsque la même identité revenait ; le nombre total d'identités n'était pas borné. Les compteurs disparaissaient au redémarrage et n'étaient pas partagés entre instances.

### 13.2 Architecture cible et frontière de confiance

```text
Client
→ Cloudflare
→ tunnel ou reverse proxy contrôlé
→ Next.js
```

L'en-tête interne retenu est `X-Infotechs-Client-IP`. Il n'est fiable que si toutes les conditions suivantes sont remplies :

1. l'application Next.js n'est pas directement accessible depuis Internet ;
2. le proxy rejette ou supprime tout `X-Infotechs-Client-IP` fourni par le client ;
3. le proxy établit lui-même l'IP client à partir de sa frontière Cloudflare validée ;
4. le proxy réécrit une valeur unique dans `X-Infotechs-Client-IP` ;
5. `CONTACT_TRUSTED_PROXY_MODE=trusted` est défini uniquement après validation de ces contrôles.

Le proxy doit également supprimer les valeurs client de `CF-Connecting-IP`, `X-Forwarded-For` et `X-Real-IP` ou les réécrire selon sa propre politique. L'application ne consulte jamais ces trois en-têtes pour le rate limiting.

### 13.3 Modes de fonctionnement

Mode par défaut, local ou non validé : variable absente, vide, `off` ou toute valeur autre que `trusted`. Tous les en-têtes IP sont considérés non fiables et l'identité conservatrice stable `contact-client:untrusted-proxy` est utilisée. Cette politique empêche le contournement par falsification, mais partage la limite entre les demandes tant que le proxy n'est pas validé ; elle n'est donc pas la configuration opérationnelle cible de production.

Mode proxy validé : `CONTACT_TRUSTED_PROXY_MODE=trusted`. Seul `X-Infotechs-Client-IP` peut déterminer l'identité, sous le contrat réseau ci-dessus. Aucune variable `NEXT_PUBLIC_` ni secret n'est requis.

### 13.4 Validation et normalisation des adresses

- IPv4 : format validé par Node.js puis normalisé en quatre octets décimaux.
- IPv6 : format validé par Node.js, compressé et converti en minuscules dans une forme canonique.
- Listes contenant une virgule : refusées dans l'en-tête interne.
- CR/LF : refusés.
- Chaîne vide, format ambigu ou adresse invalide : refusés.
- En-tête absent en mode validé : fallback conservateur stable.
- Aucun User-Agent, donnée formulaire, secret ou clé fournisseur ne participe à l'identité.

L'identité est hachée en SHA-256 avant insertion dans la Map. Les IP brutes ne sont ni stockées dans le limiteur, ni écrites dans les réponses ou logs de la route.

### 13.5 Politique de rate limiting

```text
SEUIL : 5 requêtes
FENÊTRE : 10 minutes
SIXIÈME REQUÊTE : HTTP 429
RETRY-AFTER : secondes restantes, minimum 1
STOCKAGE : Map en mémoire du processus
CLÉ : SHA-256 de l'identité résolue
PURGE : balayage au plus une fois par minute, suppression des entrées expirées
BORNE : 10 000 identités, éviction des plus anciennes au-delà
```

Une instance unique peut utiliser ce limiteur mémoire pour le MVP. Un redémarrage efface les compteurs. Plusieurs instances possèdent des compteurs indépendants : cette protection devient insuffisante en scale horizontal. Un stockage partagé atomique sera requis avant tout déploiement multi-instance ; Redis n'a pas été ajouté dans ce lot.

### 13.6 Tests H2

Les tests couvrent : mode désactivé, en-tête interne absent, fallback stable, falsifications `CF-Connecting-IP`, `X-Forwarded-For` et `X-Real-IP`, mode proxy validé, IPv4, IPv6, liste d'IP, CR/LF, format invalide, sixième requête, `Retry-After`, isolation de deux identités, absence d'IP brute dans la réponse, expiration, purge et borne mémoire.

```text
npx tsc --noEmit : PASS
npm run lint : PASS
npm test : PASS — 179/179 dans 29 fichiers
npm run build : PASS — 22/22 routes
git diff --check : PASS
npm audit : 12 HIGH — risques SEC-RISK-001 à 003 déjà acceptés
npm audit --omit=dev : 3 HIGH — PostCSS et Sharp déjà acceptés
```

### 13.7 Méthodes API en production locale

| Méthode | Statut | Fournisseur Resend |
|---|---:|---|
| POST | fonctionnelle | non appelée pendant H2 |
| GET | 405 | non appelé |
| PUT | 405 | non appelé |
| PATCH | 405 | non appelé |
| DELETE | 405 | non appelé |
| OPTIONS | 204, `Allow: OPTIONS, POST` | non appelé |

Aucun nouvel envoi Resend réel n'a été effectué.

### 13.8 Risques résiduels et prérequis de déploiement

- Le mode `trusted` ne doit jamais être activé tant que l'origine Next.js reste directement accessible.
- Le contrat de suppression/réécriture de l'en-tête interne devra être testé sur l'infrastructure réelle.
- Le fallback partagé est volontairement restrictif hors proxy validé et peut limiter plusieurs utilisateurs ensemble.
- Le stockage mémoire perd son état au redémarrage et ne protège pas uniformément plusieurs instances.
- La borne mémoire protège le processus, mais son éviction réduit la précision du limiteur en cas d'afflux de plus de 10 000 identités actives.
- HSTS, règles Cloudflare et contrôle d'accès à l'origine restent des prérequis de déploiement.

```text
RECOMMANDATION H2 : GO POUR VALIDATION PM
INFOTECHS-SECURITY-001 : H2 ACCEPTÉ — CONSOLIDATION EFFECTUÉE
INFOTECHS-DEPLOYMENT-001 : NON OUVERT
PRODUCTION : NO GO
```

## 14. Clôture finale

```text
SHA INITIAL :
c48512b0a4fd4923f73bd9bf9cf7781c526a7710

SHA DE LA REMÉDIATION SECURITY :
f0ee6c8da94e40aa17792dc863bcddbc6da1c560

COMMIT :
fix(security): harden public application baseline

VALIDATIONS FINALES :
Type-check : PASS
Lint : PASS
Tests : PASS — 179/179 dans 29 fichiers
Build : PASS — 22/22
Diff check : PASS
Secret scan : PASS

AUDIT COMPLET :
12 HIGH — risques documentés uniquement

AUDIT PRODUCTION :
3 HIGH — Next/PostCSS/Sharp documentés

HSTS :
DIFFÉRÉ À LA COUCHE PRODUCTION

PROXY TRUST :
OFF PAR DÉFAUT

RATE LIMIT :
VALIDÉ POUR UNE INSTANCE UNIQUE

RECOMMANDATION :
GO POUR CLÔTURE PM DU LOT SECURITY
PRODUCTION : NO GO
```
