import type { LucideIcon } from "lucide-react";
import { Bot, ClipboardCheck, Code2, Globe2 } from "lucide-react";

export type ServiceProcessStep = { title: string; text: string };
export type ServiceOfferingKind = "solution" | "entry";

export type ServiceOffering = {
  id: string;
  kind: ServiceOfferingKind;
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  href: string;
  icon: LucideIcon;
  outcomes: string[];
  capabilities: string[];
  process: ServiceProcessStep[];
  idealFor: string[];
  deliverables: string[];
  considerations: string[];
  relatedServiceIds: string[];
  technologies: string[];
  status: "published" | "draft";
  seo: { title: string; description: string };
};

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "web",
    kind: "solution",
    slug: "creation-sites-web",
    label: "Création de sites web",
    eyebrow: "Présence numérique",
    title: "Un site web professionnel, clair et prêt à évoluer.",
    summary: "Pour présenter votre offre avec crédibilité et faciliter le passage de la visite à la prise de contact.",
    description: "Nous structurons le contenu, l’interface et la base technique de sites vitrines et de refontes destinés aux PME et organisations locales.",
    href: "/services/creation-sites-web",
    icon: Globe2,
    outcomes: ["Une offre plus facile à comprendre", "Une expérience cohérente sur chaque écran", "Une base maintenable pour les évolutions futures"],
    capabilities: ["Site vitrine", "Refonte", "Architecture de contenu", "Design responsive", "Accessibilité", "Optimisation technique", "Formulaires", "SEO technique de base", "Préparation au déploiement"],
    process: [
      { title: "Découverte", text: "Objectifs, publics, contenus existants et contraintes." },
      { title: "Architecture", text: "Hiérarchie des pages, messages et parcours prioritaires." },
      { title: "Conception", text: "Direction visuelle et composants adaptés aux écrans." },
      { title: "Réalisation", text: "Développement, intégration, tests et ajustements." },
      { title: "Mise en service", text: "Préparation du lancement et transmission des repères utiles." },
    ],
    idealFor: ["Créer une présence numérique crédible", "Remplacer un site devenu difficile à utiliser", "Clarifier une offre ou une architecture de contenu", "Préparer un site pour de futures évolutions"],
    deliverables: ["Architecture de pages", "Interfaces responsive", "Composants réutilisables", "Intégration du contenu convenu", "Formulaires prévus au cadrage", "Documentation de mise en service"],
    considerations: ["Le volume et l’état du contenu doivent être évalués.", "Les besoins juridiques spécialisés nécessitent une validation externe.", "Le référencement dépend aussi du contenu, du marché et du suivi après lancement."],
    relatedServiceIds: ["automation", "custom"],
    technologies: ["Next.js", "React", "TypeScript"],
    status: "published",
    seo: { title: "Création de sites web", description: "Conception et refonte de sites web professionnels, accessibles et maintenables pour PME et organisations au Québec." },
  },
  {
    id: "automation",
    kind: "solution",
    slug: "automatisation-ia",
    label: "Automatisation et IA",
    eyebrow: "Opérations plus fluides",
    title: "Automatiser les tâches répétitives avec méthode.",
    summary: "Pour réduire les doubles saisies, fiabiliser les suivis et mieux faire circuler l’information.",
    description: "Nous analysons un processus avant de relier formulaires, documents, notifications et outils. L’IA n’est utilisée que lorsqu’elle apporte une valeur claire et contrôlable.",
    href: "/services/automatisation-ia",
    icon: Bot,
    outcomes: ["Moins de manipulations répétitives", "Des suivis plus cohérents", "Une meilleure visibilité sur les étapes du processus"],
    capabilities: ["Cartographie de processus", "Automatisation de suivis", "Traitement structuré de formulaires", "Génération assistée de documents", "Intégration d’API", "Synchronisation de données", "Tableaux de bord", "Notifications", "Assistants internes encadrés"],
    process: [
      { title: "Observer", text: "Comprendre le flux réel, ses volumes et ses exceptions." },
      { title: "Prioriser", text: "Choisir une automatisation stable et utile à tester." },
      { title: "Prototyper", text: "Valider les règles, données et points de contrôle humain." },
      { title: "Intégrer", text: "Relier les outils et documenter le fonctionnement." },
      { title: "Suivre", text: "Mesurer, corriger et maintenir le processus dans le temps." },
    ],
    idealFor: ["Réduire une double saisie récurrente", "Structurer le traitement de formulaires", "Automatiser des notifications ou relances", "Relier des outils qui échangent mal leurs données"],
    deliverables: ["Cartographie du processus", "Règles et scénarios validés", "Automatisation configurée", "Points de contrôle humain", "Documentation d’utilisation", "Plan de maintenance"],
    considerations: ["Certaines décisions doivent rester humaines.", "Les données sensibles nécessitent une analyse spécifique.", "La pertinence dépend du volume, de la stabilité et du coût actuel du processus."],
    relatedServiceIds: ["web", "custom"],
    technologies: [],
    status: "published",
    seo: { title: "Automatisation et IA", description: "Automatisation prudente de processus, formulaires, documents et suivis pour PME, avec validation humaine et documentation." },
  },
  {
    id: "custom",
    kind: "solution",
    slug: "applications-web-sur-mesure",
    label: "Applications web sur mesure",
    eyebrow: "Outils métier",
    title: "Une application conçue autour de vos opérations.",
    summary: "Pour les besoins qu’un site vitrine ou un assemblage d’outils génériques ne couvre pas correctement.",
    description: "Nous concevons des portails, tableaux de bord et outils internes autour des rôles, données et flux réels de votre organisation.",
    href: "/services/applications-web-sur-mesure",
    icon: Code2,
    outcomes: ["Des opérations regroupées dans un outil cohérent", "Une information mieux structurée", "Une base capable d’évoluer par étapes"],
    capabilities: ["Analyse fonctionnelle", "Prototypage", "Interface responsive", "Authentification", "Rôles et permissions", "Tableaux de bord", "Flux métier", "API", "Intégrations tierces", "Documentation", "Accompagnement à la mise en service"],
    process: [
      { title: "Cadrer", text: "Identifier les utilisateurs, priorités et contraintes." },
      { title: "Prototyper", text: "Valider les parcours avant d’engager la réalisation complète." },
      { title: "Construire", text: "Livrer les fonctions prioritaires sur une architecture maintenable." },
      { title: "Valider", text: "Tester avec les usages réels et arbitrer les ajustements." },
      { title: "Faire évoluer", text: "Planifier la maintenance et les prochains incréments." },
    ],
    idealFor: ["Remplacer des fichiers et suivis dispersés", "Créer un portail client ou partenaire", "Gérer des rôles et données métier", "Livrer progressivement un outil interne"],
    deliverables: ["Analyse fonctionnelle", "Prototype des parcours", "Application responsive", "Gestion des accès prévue", "Fonctions métier priorisées", "Documentation et plan de mise en service"],
    considerations: ["Le projet exige un cadrage et des priorités explicites.", "Les choix fonctionnels impliquent des arbitrages.", "La validation doit être progressive.", "Un plan de maintenance doit être défini."],
    relatedServiceIds: ["web", "automation"],
    technologies: ["React", "TypeScript"],
    status: "published",
    seo: { title: "Applications web sur mesure", description: "Conception d’applications métier, portails et outils internes adaptés aux opérations des PME et organisations." },
  },
  {
    id: "audit",
    kind: "entry",
    slug: "audit-et-cadrage",
    label: "Audit et cadrage",
    eyebrow: "Clarifier avant de construire",
    title: "Clarifier le besoin, les risques et la prochaine décision.",
    summary: "Une analyse structurée pour comprendre l’existant, prioriser un périmètre utile et préparer une feuille de route sans présumer de la solution.",
    description: "Nous réunissons les faits disponibles, les usages, les contraintes et les dépendances afin de formuler des constats vérifiables, des priorités et les prochaines décisions. Le mandat peut se conclure sans réalisation ultérieure.",
    href: "/services/audit-et-cadrage",
    icon: ClipboardCheck,
    outcomes: ["Une situation actuelle mieux documentée", "Un périmètre priorisé et des limites explicites", "Une feuille de route adaptée au niveau de preuve disponible"],
    capabilities: ["Audit de site existant", "Revue UX/UI et accessibilité de premier niveau", "Revue technique limitée", "Architecture de contenu", "Cartographie de processus", "Clarification fonctionnelle", "Priorisation MVP", "Estimation qualitative de complexité", "Recommandations de refonte"],
    process: [
      { title: "Définir", text: "Préciser la question, les sources et les limites du mandat." },
      { title: "Recueillir", text: "Examiner les documents, interfaces et témoignages autorisés." },
      { title: "Analyser", text: "Distinguer les faits, hypothèses, risques et dépendances." },
      { title: "Prioriser", text: "Comparer les scénarios et le périmètre utile." },
      { title: "Restituer", text: "Remettre les constats, décisions et feuille de route." },
    ],
    idealFor: ["Préparer une refonte sans périmètre clair", "Comprendre pourquoi un parcours ou processus fonctionne mal", "Prioriser un MVP avant la réalisation", "Comparer des scénarios sans engager immédiatement un développement"],
    deliverables: ["Cadre de l’audit et inventaire des sources", "Constats classés et limites de preuve", "Architecture, parcours ou cartographie selon le mandat", "Périmètre et priorités recommandés", "Feuille de route et rapport de restitution"],
    considerations: ["Les conclusions dépendent des accès et informations strictement nécessaires au mandat.", "Aucun audit de cybersécurité avancé ni avis juridique n’est inclus.", "La réalisation ultérieure n’est ni incluse ni garantie.", "Une estimation ferme exige un périmètre validé."],
    relatedServiceIds: ["web", "automation", "custom"],
    technologies: [],
    status: "published",
    seo: { title: "Audit et cadrage numérique", description: "Audit structuré de sites, parcours et processus pour clarifier les constats, prioriser un MVP et préparer une feuille de route." },
  },
];

export function getServiceOffering(slug: string) {
  return serviceOfferings.find((service) => service.slug === slug);
}

export function getRelatedOfferings(service: ServiceOffering) {
  return service.relatedServiceIds.map((id) => serviceOfferings.find((item) => item.id === id)).filter((item): item is ServiceOffering => Boolean(item));
}
