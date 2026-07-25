# Flux de données et confidentialité — état réel

**Statut**: Aucune collecte réelle en production. Formulaire en mode démonstration, vérifié par lecture de code (pas par supposition).

## 1. Ce que le code fait réellement aujourd'hui

Preuve par lecture de `src/components/contact-form.tsx`:

```ts
async function onSubmit(values: FormValues) {
  await new Promise((resolve) => setTimeout(resolve, 650));
  console.info("Demande validée localement, non envoyée", values);
  setSent(true);
  reset();
}
```

Il n'y a **aucun appel `fetch`** vers `/api/contact` ou tout autre endpoint. Les données saisies restent dans le navigateur de l'utilisateur, sont journalisées dans la console du navigateur (`console.info`) à des fins de démonstration, puis perdues à la fermeture de l'onglet. **Aucune donnée personnelle ne quitte le poste du visiteur.**

La route serveur `src/app/api/contact/route.ts` existe et valide un payload JSON via le schéma partagé (`src/lib/contact-schema.ts`), mais retourne systématiquement HTTP 501 avec le message *« Intégration fournisseur à activer avant mise en production »* tant qu'aucune des deux conditions n'est remplie:

```ts
const hasResendConfig = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FORM_FROM && process.env.CONTACT_FORM_TO);
const hasSupabaseConfig = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_CONTACT_TABLE);
```

`.env.example` confirme qu'aucune de ces variables n'a de valeur par défaut — elles sont toutes en commentaire `# Future integration`. **Le formulaire ne peut pas envoyer de données réelles dans l'état actuel du dépôt, même si quelqu'un le déployait tel quel.**

Le texte affiché à l'utilisateur reflète cet état honnêtement: *« Validation locale seulement: aucune demande n'est envoyée tant qu'une API courriel ou CRM n'est pas connectée. »*

**Conclusion**: la directive PM #4 (« ne pas transmettre, stocker ou téléverser de données personnelles en production tant que les décisions de conformité ne sont pas finalisées ») est déjà respectée par construction. Aucun changement de code n'était nécessaire pour l'imposer — il n'y avait rien à désactiver.

## 2. Ce qui reste à décider avant d'activer une intégration réelle

Ces décisions appartiennent au fondateur / à un conseiller juridique, pas à l'agent. Aucune n'est tranchée dans ce lot.

| Décision | Statut |
|---|---|
| Responsable du traitement | Non tranché — probablement Infotechs Solutions elle-même, à confirmer formellement |
| Finalité précise (devis, suivi de mandat, etc.) | Esquissée dans `confidentialite/page.tsx` (« traiter les demandes de devis, demandes d'information et suivis de projet ») mais non formalisée légalement |
| Données collectées | Connues par le schéma Zod: nom, entreprise (optionnel), courriel, téléphone (optionnel), type de projet, budget, délai, message. **Aucun fichier** (retiré, voir audit section 5) |
| Durée de conservation | Non définie — la page confidentialité le dit explicitement : *« sera définie lors du branchement réel du formulaire »* |
| Destinataires | Dépend du fournisseur choisi (Resend = courriel direct; Supabase = base de données interne) — non choisi |
| Lieu d'hébergement des données | Dépend du fournisseur — Resend et Supabase ont tous deux des options de résidence de données à vérifier avant choix final |
| Sous-traitants | Aucun engagé — Resend/Supabase seraient les premiers sous-traitants si retenus, nécessitant vérification de leurs propres engagements de conformité |
| Droits de la personne (accès, rectification, suppression) | Non implémentés — aucun mécanisme technique n'existe encore pour honorer une demande d'accès/suppression |
| Mécanisme de consentement | Aucun — à évaluer une fois la finalité et la base légale confirmées (Loi 25 québécoise) |

## 3. Politique de confidentialité actuelle — évaluation honnête

Lu intégralement (`src/app/confidentialite/page.tsx`). Le contenu actuel:
- Ne prétend **à aucun moment** être conforme à la Loi 25.
- Hedge systématiquement chaque affirmation non finalisée (« sera ajouté avant la mise en production », « une intégration future pourra », « sera définie lors du branchement réel »).
- Ne contient aucune fausse déclaration détectée.

**Ce que ce document N'EST PAS**: une validation juridique. Aucune revue par un professionnel du droit n'a eu lieu. L'agent n'a pas la compétence pour certifier la conformité Loi 25 et ne le fait pas ici.

## 4. Recommandation avant activation d'une intégration réelle

1. Faire réviser `confidentialite/page.tsx` et `mentions-legales/page.tsx` par un conseiller juridique qualifié en droit québécois de la protection des renseignements personnels.
2. Formaliser les 9 décisions du tableau section 2 dans un registre de traitement.
3. Une fois Resend ou Supabase choisi et configuré, retirer les formulations conditionnelles (« sera », « prévue ») de la politique de confidentialité et les remplacer par des affirmations factuelles vérifiées.
4. Envisager un mécanisme minimal de suppression sur demande avant la première collecte réelle, même simple (courriel à une adresse dédiée avec engagement de délai de traitement).

## 5. Statut de conformité

**NON ÉVALUÉ.** Ni GO ni NO GO ne peuvent être émis sur la conformité légale — cela nécessite une revue humaine qualifiée, hors du périmètre de cet agent.
