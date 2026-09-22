# INFOTECHS-DESIGN-PALETTE-003A-V1 — Validation visuelle (captures)

Date : 21 septembre 2026
Type : validation visuelle. Complète 003A (code/tests/build déjà PASS, captures manquantes). Aucun commit.

## Méthode

App démarrée en mode dev (`npm run dev`, Next.js 16.3.2 Turbopack) directement sur le poste Windows réel (via Desktop Commander), car le sandbox Linux isolé utilisé pour install/test/build n'a ni navigateur ni accès réseau vers un serveur qu'il démarre lui-même. Captures produites avec Playwright (`playwright-core`, canal `msedge`) piloté depuis le même poste : page chargée, défilement complet pour déclencher les animations au scroll, `prefers-reduced-motion: reduce`, puis capture plein-page (`fullPage: true`) par route et par viewport. Vérification de non-régression du débordement horizontal faite en complément par script (`document.documentElement.scrollWidth` vs `clientWidth`) sur les 10 routes × 390/768px — méthode plus fiable qu'une inspection visuelle seule pour ce point précis.

Le serveur dev a été arrêté et l'émulation de viewport du navigateur remise à `desktop` en fin de lot.

## Effet de bord détecté et corrigé (hors périmètre applicatif)

Le démarrage de `next dev` sur le dépôt réel a déclenché la reconfiguration automatique de `tsconfig.json` par Next.js lui-même (ajout de `.next/dev/dev/types/**/*.ts` à `include`, reformattage JSON) — comportement standard de Next.js 16 en mode dev, non lié à la palette. Détecté via `git status`, **annulé** par `git checkout -- tsconfig.json` avant remise du lot. Aucune autre modification de code n'a eu lieu pendant ce lot.

## CAPTURES : 22/22 (grille obligatoire) + 11 captures ciblées = 33 fichiers

Toutes livrées dans `docs/design/screens/palette-003a/` (connecté, poste réel — pas seulement dans le chat).

Grille obligatoire (page × viewport) :

| Page | 390 | 768 | 1280 | 1440 |
|---|---|---|---|---|
| Home | ok | ok | ok | ok |
| Services | ok | — | ok | — |
| Service detail (creation-sites-web) | ok | — | ok | — |
| Réalisations | ok | — | ok | — |
| Réalisation detail (site-web-garage-local) | ok | — | ok | — |
| À propos | ok | — | ok | — |
| Contact | ok | — | ok | — |
| Confidentialité | ok | — | ok | — |
| Mentions légales | ok | — | ok | — |
| 404 | ok | — | ok | — |

Captures ciblées : header-desktop, header-mobile, hero-desktop, hero-mobile, footer, buttons-primary-secondary, service-cards, portfolio-cards, badge-concept, mobile-menu-open, contact-form, contact-field-focus-1280 (focus clavier réel, anneau `--color-focus` visible), cta-final.

## 390 : PASS
## 768 : PASS
## 1280 : PASS
## 1440 : PASS

Aucun débordement horizontal détecté sur aucune des 10 routes aux largeurs 390/768 (vérifié par script, `scrollWidth === clientWidth` partout). Aucun texte tronqué, aucune classe morte observée dans les captures. Grille de cartes (services 3 col / portfolio 3 col) se réorganise proprement en 1 colonne à 390.

## HEADER : PASS — logo + nav clairs, CTA violet identifiable, pas de dérive vers le violet excessif.
## HERO : PASS — halo violet/lavande présent mais contenu (glow + 2 halos secondaires), pas de néon.
## SECTIONS : PASS — proposition de valeur, étapes, expertise technique : graphite dominant, violet en accent seulement.
## SERVICES : PASS — cartes homogènes, icônes violet clair, bordure focus visible sur l'onglet actif (home) et sur les tags.
## PORTFOLIO : PASS — badge "CONCEPT DÉMONSTRATIF" (bordure violette + fond graphite profond + texte clair, contraste mesuré 13,87:1 en 003A) cohérent sur toutes les fiches.
## ABOUT : PASS — même système, aucune dérive.
## CONTACT : PASS — formulaire lisible, lien "politique de confidentialité" en violet, focus clavier net (anneau visible, capturé).
## LEGAL (confidentialité, mentions légales) : PASS — traitement sobre, quasi aucun violet hors liens, conforme à l'esprit "légal = neutre".
## 404 : PASS — CTA violet unique, pas de surcharge.
## FOOTER : PASS — dégradé graphite→violet/20 subtil, pas de bloc saturé.
## MOBILE MENU : PASS — overlay graphite, item actif avec anneau focus violet visible, CTA violet plein.
## FOCUS : PASS — anneau `--color-focus` (purple-400) net sur champ de formulaire et sur lien de nav clavier ; capturé.

## COPPER VISUALLY PRESENT : NO
Confirmé visuellement sur les 22 captures grille + 11 ciblées, cohérent avec le grep "0 résiduel" déjà établi en 003A.

## RESPONSIVE VISUAL : PASS
Confirmé par script (scrollWidth/clientWidth) sur 10 routes × 2 largeurs, en complément de l'inspection visuelle des 22 captures.

## RATIO 70/20/10 — évaluation qualitative
Dominante graphite/neutres respectée sur toutes les pages (formulaires, cartes, footer, header restent sombres). Violet concentré sur : CTA primaires, liens, icônes, bordures de badge, focus ring, halos de hero, bloc CTA final. Lavande (purple-100/50) visible seulement en halo secondaire du hero et en fond de badge — usage bien sporadique, pas de dérive "tout violet". Rendu perçu : sobre, technologique, B2B — pas de néon ni cyberpunk. Aucun écran où le violet domine visuellement la page.

## Constat hors palette (dev uniquement, non visuel)
L'overlay de développement Next.js ("N — X Issues", coin bas-gauche) apparaît sur les captures : il provient de deux avertissements dev-only propres à l'environnement (NODE_ENV non standard, reconfiguration tsconfig au démarrage), pas de l'application ni de la palette. Absent en build de production. Non compté comme défaut visuel — signalé pour information seulement.

## CORRECTIONS EFFECTUÉES :
1. Reversion de `tsconfig.json` (effet de bord du démarrage `next dev`, sans rapport avec la palette) — remis à l'état du commit HEAD via `git checkout`.

Aucune correction esthétique effectuée. Aucun défaut objectif (élément invisible, overflow réel, classe morte, contraste manifestement cassé, composant inutilisable) trouvé lors de cette passe — les deux bugs objectifs identifiés en 003A (contraste `#14151a`/purple-600, `rgba` avec espaces) avaient déjà été corrigés et documentés dans le rapport 003A ; les captures actuelles confirment visuellement leur résolution (aucun texte foncé sur fond violet, aucun halo/glow manquant).

## VISUAL REVIEW :
READY FOR PM REVIEW

## 003A :
PENDING PM DECISION

## PRODUCTION :
NO GO
