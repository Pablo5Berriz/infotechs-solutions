# Prototypes et descriptions d'interaction

Méthode: chaque interaction ci-dessous est décrite à partir du **code HTML/JS réel exporté par Stitch** (voir `docs/design/_stitch-source/*/code.html`) quand ce code existe et implémente l'interaction, ou signalée explicitement comme **non implémentée dans ce lot** quand ce n'est pas le cas. Aucune interaction n'est décrite comme fonctionnelle sans preuve dans le code source réel — conformément à la règle du projet de ne jamais déclarer un comportement validé sans preuve.

## 1. Ouverture du menu mobile

**Statut**: implémenté et vérifié dans le code réel (`docs/design/_stitch-source/home-mobile/code.html`, script en fin de fichier).

Séquence :
1. L'utilisateur touche l'icône `menu` (☰) dans le header, `aria-label="Menu"`.
2. Un gestionnaire `click` bascule un état `isMenuOpen` et ajoute la classe `active` sur l'overlay `#nav-menu`, ce qui déclenche la transition CSS `clip-path` définie dans `animation-spec.md` (cercle qui s'étend depuis le coin supérieur droit, 0.4s ease-in-out).
3. L'icône change de `menu` à `close` (changement de `textContent`, pas une nouvelle icône chargée).
4. Le défilement de la page est bloqué (`document.body.style.overflow = 'hidden'`) tant que le menu est ouvert.
5. Chaque lien du menu a son propre gestionnaire `click` qui referme le menu automatiquement (`classList.remove('active')`, icône reremise à `menu`, défilement débloqué) — utile pour la navigation au clavier et tactile.

**Écart relevé**: le déplacement du focus clavier vers le premier lien du menu à l'ouverture (requis par `animation-spec.md` section 7 et déjà signalé comme manquant dans `accessibility-audit.md`) n'est **pas implémenté** dans le code généré par Stitch — confirmé absent du script. Reste un point à corriger à l'implémentation réelle, pas seulement dans la maquette.

## 2. Changement d'onglet / présentation des services

**Statut**: **écart de conception constaté** — `animation-spec.md` (section 4, rédigé lors du lot précédent) spécifiait un pattern d'onglets ARIA (`tablist`/`tab`/`tabpanel`) avec transition en fondu croisé. Le code réel généré par Stitch pour la page Services (`docs/design/_stitch-source/services-desktop/code.html`) n'implémente **pas** ce pattern : les trois domaines (Web & Applications, Flux de travail automatisés, Sur mesure) sont affichés simultanément sous forme de **trois cartes statiques côte à côte**, sans logique JavaScript de bascule, sans attribut `role="tab"` ni `onclick`.

Deux options à trancher avant l'implémentation :
1. **Suivre la maquette réelle** (cartes statiques) — plus simple, déjà accessible par défaut (tout le contenu est visible sans interaction), cohérent avec ce qui a été effectivement validé visuellement dans ce lot.
2. **Revenir au pattern d'onglets** originalement spécifié — demande un travail d'implémentation non prévu par la maquette actuelle, complexité accessibilité plus élevée (navigation clavier flèches gauche/droite), mais réduit la hauteur de page sur desktop.

**Recommandation**: option 1 (cartes statiques), parce que c'est la seule des deux qui a été réellement produite, prévisualisée et vérifiée dans ce lot — recommander l'implémentation d'un pattern qui n'a jamais été testé visuellement serait spéculatif. `animation-spec.md` section 4 doit être mis à jour en conséquence pour refléter cette décision, plutôt que de laisser une spécification obsolète en contradiction avec la maquette livrée.

## 3. Survol / focus des boutons d'action (CTA)

**Statut**: implémenté visuellement dans toutes les captures desktop (classes Tailwind `hover:` et `transition-all` présentes dans le code de chaque page, ex. `contact-desktop-1280.png`, `home-desktop-1280.png`).

Séquence (desktop, à la souris) :
1. État normal : fond `copper.500`, aucune ombre portée.
2. Au survol : classe `hover:` applique le halo lumineux `shadow.glow-copper` (voir `design-tokens.md`) en transition 150ms — confirmé par la présence de classes `transition-all duration-200` dans le code réel de plusieurs boutons.
3. Au clic/pression : classe `active:scale-95` observée dans le code réel (ex. bouton menu mobile, boutons de formulaire) — léger effet d'échelle plutôt que le changement d'opacité initialement documenté dans `animation-spec.md` section 2. **Écart mineur** : le comportement réel utilise `scale-95`, pas une réduction d'opacité à 0.85 comme spécifié — à corriger dans `animation-spec.md` pour refléter ce qui a été produit, ou à imposer explicitement à l'implémentation si l'effet d'opacité est préféré.

**Focus clavier**: aucun style `focus-visible` explicite n'a été trouvé dans le code généré par Stitch pour la majorité des boutons — seul le focus par défaut du navigateur s'appliquerait en l'état. C'est un écart d'accessibilité réel par rapport à la contrainte d'anneau de focus visible documentée dans `design-tokens.md` et `animation-spec.md` — **à ajouter explicitement au moment de l'implémentation**, ce n'est pas un comportement que la maquette Stitch fournit par défaut.

## 4. Progression de la section Processus (Analyse / Conception / Livraison)

**Statut**: présent visuellement sur toutes les pages qui reprennent cette section (Accueil, Services, À propos) sous forme de trois blocs numérotés statiques (01/02/03). **Aucune animation de ligne de progression au scroll n'est implémentée dans le code réel** — le comportement dynamique décrit dans `animation-spec.md` section 3 (ligne qui se remplit progressivement avec `useScroll`/`useTransform`) reste une spécification à implémenter en code React lors du portage, pas quelque chose que Stitch a généré ou testé. Aucune preuve visuelle de cette animation n'existe dans ce lot — ne pas la déclarer validée.

## 5. Survol d'une carte de réalisation / concept démonstratif

**Statut**: partiellement vérifiable. Le badge « CONCEPT DÉMONSTRATIF » est confirmé présent et statique dans le code réel de la page d'accueil (section portfolio) et implicitement sur la page Réalisations d'origine (lot précédent). Le comportement de survol (élévation, translation -4px) documenté dans `animation-spec.md` section 5 n'a pas de preuve explicite dans le code HTML statique exporté (les classes `hover:` Tailwind sont présentes sur les conteneurs d'image, ex. `group-hover:scale-105` sur l'image elle-même dans `home-mobile/code.html` ligne 254), mais aucune transformation de carte entière (translation Y) n'a été trouvée dans le code audité. **Point de vigilance confirmé et respecté** : le badge n'est jamais inclus dans un conteneur avec `group-hover:` qui l'affecterait — il reste visuellement indépendant de l'effet de survol de l'image, ce qui est conforme à l'exigence de ne jamais masquer le badge.

## 6. Ouverture d'un accordéon

**Statut**: **non implémenté dans ce lot.** Aucune des 9 pages générées ne contient de composant accordéon (recherche de `<details>`, `aria-expanded`, ou logique JS d'ouverture/fermeture dans l'ensemble des fichiers `code.html` du lot — aucune occurrence trouvée). La directive de complétion demandait une description de cette interaction, mais elle n'a été implémentée nulle part dans les pages réellement produites — probablement parce qu'aucune page conçue dans ce lot ne nécessitait structurellement un accordéon (pas de FAQ dédiée, par exemple).

Spécification de comportement attendu si un accordéon est ajouté à l'implémentation (ex. FAQ future) :
1. Clic/touche sur l'en-tête → bascule `aria-expanded` de `false` à `true`.
2. Le panneau associé passe de `max-height: 0` (ou `hidden`) à sa hauteur naturelle, transition 200–300ms.
3. Icône chevron pivote de 180° en cohérence avec l'état ouvert/fermé.
4. Un seul panneau ouvert à la fois recommandé pour la lisibilité (comportement à confirmer selon le contexte d'usage réel).

Cette section reste **une recommandation de conception, pas une interaction vérifiée** — à ne pas confondre avec les sections 1, 3 et 6 (validation) qui ont une preuve directe dans le code produit.

## 7. Validation locale du formulaire de contact

**Statut**: implémenté et vérifié dans le code réel (`docs/design/_stitch-source/contact-desktop-v2/code.html`, lignes 368–393).

Séquence, confirmée par le script JS réel :
1. L'utilisateur tape dans le champ `#message` (`textarea`, `required`).
2. À chaque frappe (`input` event), la longueur du texte est mesurée (`messageInput.value.length`).
3. Si la longueur est sous le minimum requis : le bloc `#validationError` (initialement `hidden`) devient visible, la bordure du champ passe de `border-outline-variant` à une classe `border-error`, et l'attribut visuel associe l'état d'erreur au champ.
4. Si la longueur atteint le minimum : le message d'erreur redevient caché, la bordure revient à son état neutre.
5. Un compteur de caractères (« 0 / 20 min », visible dans la capture réelle `contact-desktop-1280.png`) donne un retour continu avant même la tentative de soumission.
6. Tous les champs (nom, courriel, type de projet, budget, délai, message) portent l'attribut HTML `required` natif — un niveau de validation navigateur de base s'applique en complément de la validation JS visuelle personnalisée.

**Cohérence avec le code de production existant**: ce comportement est cohérent avec le pattern `aria-invalid`/`aria-describedby`/`role="alert"` déjà implémenté dans `src/components/contact-form.tsx` lors du lot d'audit précédent (voir `production-readiness-audit.md` section 6) — l'implémentation réelle devra combiner les deux : le pattern d'accessibilité déjà en place dans le code de production, et le retour visuel (bordure, compteur) désormais spécifié par la maquette Stitch.

**Champ upload** : confirmé absent de tous les champs du formulaire généré (`grep 'type="file"'` sur le code réel ne retourne aucun résultat) — conforme à l'interdiction explicite de la directive.

**Mention mode démonstration** : confirmée présente et visible sur les deux versions (desktop et mobile) du formulaire, texte exact vérifié : « Ce formulaire est en mode démonstration. Aucune donnée n'est réellement envoyée ni stockée. »

---

## Synthèse des écarts de conception relevés dans cette section

| # | Interaction | Écart relevé | Impact |
|---|---|---|---|
| 1 | Menu mobile | Focus clavier non déplacé à l'ouverture | Accessibilité — à corriger à l'implémentation |
| 2 | Services | Pattern onglets spécifié à l'origine, mais cartes statiques réellement produites | Documentation (`animation-spec.md`) à mettre à jour pour refléter la réalité |
| 3 | CTA | Effet `scale-95` réellement utilisé au lieu de l'opacité 0.85 documentée ; aucun style de focus visible trouvé dans le code | Documentation à corriger ; accessibilité à ajouter à l'implémentation |
| 4 | Processus | Aucune animation de progression au scroll dans le code réel — reste une spécification non testée | À implémenter et tester réellement, pas à supposer fonctionnelle |
| 5 | Carte réalisation | Effet de survol de carte entière non confirmé dans le code (seul le zoom d'image est confirmé) ; badge correctement isolé de l'effet | Mineur |
| 6 | Accordéon | Aucune page du lot n'en contient | Description fournie à titre de spécification future uniquement |
| 7 | Formulaire | Aucun écart — comportement vérifié conforme | — |

Cette synthèse illustre pourquoi `animation-spec.md` (rédigé avant que les pages réelles soient produites) ne doit plus être considéré comme la référence unique du comportement attendu — le code réel produit dans ce lot doit désormais faire foi en cas de contradiction, et `animation-spec.md` devrait être mis à jour pour refléter ces écarts avant le lot d'implémentation.
