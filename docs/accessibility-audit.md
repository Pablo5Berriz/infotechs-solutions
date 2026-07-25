# Audit d'accessibilité

**Statut: NON VALIDÉ.** Aucun score Lighthouse Accessibilité ni rapport axe-core chiffré n'a pu être produit dans cet environnement d'audit. Ce document ne doit **pas** être lu comme une certification WCAG 2.1 AA.

## 1. Pourquoi aucun chiffre n'est fourni (preuve, pas excuse)

Tentative réelle effectuée:
1. Installation de Chrome via `npx @puppeteer/browsers install chrome@stable` → succès (`chrome@151.0.7922.47` téléchargé).
2. Lancement direct: `chrome --headless=new --no-sandbox --disable-gpu --dump-dom https://example.com` →
   ```
   error while loading shared libraries: libXdamage.so.1: cannot open shared object file: No such file or directory
   ```
3. Tentative de correction: `apt-get install -y chromium` → `E: Could not open lock file /var/lib/dpkg/lock-frontend — Permission denied` (pas de droits root dans le sandbox d'audit).

**Conclusion technique**: l'environnement de cet audit ne dispose pas des bibliothèques système requises pour exécuter un navigateur headless, et l'agent ne dispose pas des privilèges pour les installer. Ce n'est pas représentatif de l'environnement CI (GitHub Actions `ubuntu-latest` a ces bibliothèques préinstallées) ni du poste de développement du fondateur. **Action requise**: exécuter Lighthouse/axe soit localement (`npx lighthouse http://localhost:3000 --view` après `npm run build && npm run start`), soit ajouter une étape dédiée au workflow CI (`.github/workflows/ci.yml`) une fois ce lot mergé.

## 2. Cibles à atteindre (rappel, non mesurées)

```
Lighthouse Accessibilité: 95+
Aucune violation axe critique
Aucune violation axe sérieuse non documentée
Navigation clavier complète, aucun piège de focus
Contraste WCAG AA pour textes et contrôles
```

## 3. Revue de code manuelle (substitut partiel, pas un audit automatisé)

Constats obtenus par lecture directe du code, avec preuve fichier/ligne. Une revue de code ne remplace pas un audit outillé — elle permet seulement d'éliminer les défauts évidents en attendant l'audit réel.

### Points déjà corrects (vérifiés, pas supposés)

- **Landmarks sémantiques**: `layout.tsx` structure `<header>` (`SiteHeader`), `<main>`, `<footer>` (`SiteFooter`) — présents et uniques.
- **`focus-visible` global**: `globals.css` applique un contour visible (`outline: 2px solid #0891b2; outline-offset: 4px`) sur `a, button, input, textarea, select` — cohérent sur tout le site, pas un cas isolé.
- **Menu mobile**: le bouton bascule expose `aria-expanded` et `aria-controls="mobile-menu"` (`site-header.tsx`), avec un `aria-label` explicite (« Ouvrir le menu »). La nav mobile a son propre `aria-label="Navigation mobile"` distinct de la nav desktop (`aria-label="Navigation principale"`).
- **Filtre de projets**: `project-filter.tsx` utilise `role="tablist"` et `aria-label="Filtrer les réalisations"` sur le conteneur de boutons de catégorie — pattern correct pour un filtre à sélection unique.
- **Image hero**: `alt="Interfaces numériques modernes pour PME"` présent et descriptif, pas de `alt=""` ni d'image manquante.

### Défauts trouvés et corrigés dans ce lot

- **`prefers-reduced-motion` totalement absent avant ce lot.** Les animations d'apparition (`src/components/reveal.tsx`, via `framer-motion`) s'exécutaient inconditionnellement. **Correctif**: `useReducedMotion()` de framer-motion — si l'utilisateur a activé la préférence système, `Reveal` rend un simple `<div>` sans animation. Une règle CSS globale complémentaire a aussi été ajoutée (`globals.css`) pour les transitions CSS pures ailleurs dans le site.
- **Erreurs de formulaire non associées aux champs pour les technologies d'assistance.** Avant correction, `Field` affichait le message d'erreur visuellement à côté du champ, mais sans `aria-describedby` ni `aria-invalid` sur l'`<input>`/`<select>`/`<textarea>` correspondant — un lecteur d'écran ne l'aurait pas annoncé automatiquement. **Correctif**: chaque champ du formulaire (`contact-form.tsx`) a maintenant `aria-invalid={!!errors.x}` et `aria-describedby="x-error"` conditionnels, et le `<span>` d'erreur a `id="x-error"` et `role="alert"`. Le message de confirmation d'envoi a aussi reçu `role="status"`.

### Défauts identifiés, non corrigés (nécessitent une décision ou un outil que l'agent n'a pas)

- **Contraste des couleurs**: non vérifié par calcul automatisé. Les combinaisons `text-slate-400`/`text-slate-300` sur fond `bg-slate-950` (footer, hero) sont visuellement proches du seuil AA (4.5:1 pour texte normal) sans mesure colorimétrique réelle — à vérifier avec un outil de contraste avant de déclarer conforme.
- **Absence de piège de focus explicitement testé** dans le menu mobile — le code ne montre pas de gestion active du focus à l'ouverture/fermeture (pas de `focus()` programmatique, pas de trap), mais comme le menu est un simple bloc dans le flux (pas une modale superposée), ceci est probablement acceptable — à confirmer par test clavier réel, pas par lecture de code seule.
- **Hiérarchie des titres**: non vérifiée systématiquement page par page (chaque page a un seul `<h1>` d'après la lecture effectuée, mais un balayage exhaustif de toutes les 29 routes n'a pas été fait ligne par ligne).

## 4. Verdict

**NON VALIDÉ.** Des corrections réelles et vérifiables ont été appliquées (voir section 3), mais en l'absence d'un rapport Lighthouse/axe chiffré, aucune conformité WCAG 2.1 AA ne peut être déclarée. Prochaine étape obligatoire avant GO: exécuter `npx lighthouse` et `axe-core` (ou l'extension axe DevTools) sur un build de production réel (`npm run build && npm run start`), sur les pages `/`, `/services`, `/realisations`, `/contact` au minimum.
