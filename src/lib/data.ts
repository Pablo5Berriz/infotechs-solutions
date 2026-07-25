import {
  Bot,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Gauge,
  Globe2,
  LifeBuoy,
  LockKeyhole,
  MessageSquareQuote,
  RefreshCcw,
  Smartphone,
} from "lucide-react";

export const site = {
  name: "Infotechs Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://infotechssolutions.ca",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  location: "Saint-Louis-de-Gonzague, Montérégie, Québec",
  description:
    "Infotechs Solutions aide les PME du Québec à créer des sites web, applications, automatisations IA et outils numériques simples, performants et rentables.",
  keywords: [
    "création site web Québec",
    "développement web Montérégie",
    "agence web Saint-Louis-de-Gonzague",
    "développeur web PME Québec",
    "application web sur mesure Québec",
    "automatisation IA PME",
    "transformation numérique PME",
  ],
};

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Ressources", href: "/ressources" },
  { label: "Contact", href: "/contact" },
];

export const serviceIcons = {
  web: Globe2,
  app: Code2,
  mobile: Smartphone,
  saas: Database,
  redesign: RefreshCcw,
  maintenance: Gauge,
  ai: Bot,
  conseil: BriefcaseBusiness,
  cloud: Cloud,
  support: LifeBuoy,
  security: LockKeyhole,
};

export const services = [
  {
    slug: "creation-sites-web",
    title: "Création de sites web professionnels",
    short: "Sites vitrines rapides, crédibles et optimisés pour convertir les visiteurs en demandes de devis.",
    icon: "web",
    category: "Site web",
    price: "À partir de 1 800 $",
    timeline: "2 à 5 semaines",
    description:
      "Nous concevons des sites web modernes pour PME, commerces, organismes et travailleurs autonomes qui veulent inspirer confiance, mieux présenter leurs services et générer des contacts qualifiés.",
    deliverables: ["Architecture de pages", "Design responsive", "Contenu SEO", "Formulaire de contact", "Optimisation performance"],
  },
  {
    slug: "applications-web-sur-mesure",
    title: "Applications web sur mesure",
    short: "Outils internes, portails et plateformes métier adaptés aux processus réels de votre entreprise.",
    icon: "app",
    category: "Application web",
    price: "Sur estimation",
    timeline: "4 à 12 semaines",
    description:
      "Nous développons des applications web fiables pour centraliser les opérations, réduire les fichiers Excel dispersés et automatiser les suivis importants.",
    deliverables: ["Analyse fonctionnelle", "Interface métier", "Base de données", "Gestion des accès", "Déploiement"],
  },
  {
    slug: "applications-mobiles",
    title: "Applications mobiles",
    short: "Applications mobiles simples et utiles pour offrir un accès rapide à vos services ou données.",
    icon: "mobile",
    category: "Application mobile",
    price: "Sur estimation",
    timeline: "6 à 14 semaines",
    description:
      "Nous créons des expériences mobiles ciblées pour les services locaux, équipes terrain et clients qui ont besoin d'une interaction fluide sur téléphone.",
    deliverables: ["Parcours utilisateur", "Prototype", "Développement mobile", "Tests appareils", "Accompagnement publication"],
  },
  {
    slug: "saas-plateformes-metier",
    title: "SaaS et plateformes métier",
    short: "Bases solides pour lancer une plateforme vendable, un portail client ou un produit numérique.",
    icon: "saas",
    category: "SaaS",
    price: "Sur estimation",
    timeline: "8 à 16 semaines",
    description:
      "Nous aidons les startups et organisations ambitieuses à transformer une idée de plateforme en produit web structuré, maintenable et évolutif.",
    deliverables: ["MVP", "Comptes utilisateurs", "Tableaux de bord", "Paiements ou abonnements", "Base technique évolutive"],
  },
  {
    slug: "refonte-sites-web",
    title: "Refonte de sites web existants",
    short: "Modernisation visuelle, technique et SEO sans perdre ce qui fonctionne déjà.",
    icon: "redesign",
    category: "Refonte",
    price: "À partir de 1 500 $",
    timeline: "2 à 6 semaines",
    description:
      "Nous améliorons les sites lents, datés ou difficiles à modifier afin de livrer une présence numérique plus claire, plus rapide et plus professionnelle.",
    deliverables: ["Audit de l'existant", "Nouvelle direction visuelle", "Migration de contenu", "Redirections SEO", "Optimisation mobile"],
  },
  {
    slug: "maintenance-optimisation",
    title: "Maintenance web et optimisation",
    short: "Mises à jour, corrections, performance et amélioration continue de vos outils numériques.",
    icon: "maintenance",
    category: "Maintenance",
    price: "Forfaits mensuels",
    timeline: "Continu",
    description:
      "Nous gardons votre site ou application propre, rapide et sécurisé avec un accompagnement régulier et des interventions planifiées.",
    deliverables: ["Mises à jour", "Sauvegardes", "Corrections", "Suivi performance", "Petites évolutions"],
  },
  {
    slug: "automatisation-ia",
    title: "Automatisation de processus avec IA",
    short: "Automatisations concrètes pour réduire les tâches répétitives et accélérer les opérations.",
    icon: "ai",
    category: "Automatisation",
    price: "À partir de 950 $",
    timeline: "1 à 4 semaines",
    description:
      "Nous identifions les tâches administratives répétitives et créons des automatisations simples avec IA, formulaires, notifications et intégrations d'outils.",
    deliverables: ["Cartographie du processus", "Automatisation", "Connecteurs", "Documentation", "Formation courte"],
  },
  {
    slug: "conseil-informatique-pme",
    title: "Conseil informatique pour PME",
    short: "Décisions claires sur les outils, priorités techniques et investissements numériques.",
    icon: "conseil",
    category: "Conseil",
    price: "Mandats courts",
    timeline: "1 à 3 semaines",
    description:
      "Nous aidons les dirigeants à choisir les bonnes solutions numériques sans jargon inutile, avec des recommandations concrètes et réalistes.",
    deliverables: ["Diagnostic", "Plan d'action", "Choix d'outils", "Budget indicatif", "Priorisation"],
  },
  {
    slug: "cloud-support-securite",
    title: "Cloud, support et sécurité de base",
    short: "Sauvegardes, accès, bonnes pratiques et accompagnement numérique pour protéger vos données.",
    icon: "security",
    category: "Support",
    price: "Sur estimation",
    timeline: "Selon besoins",
    description:
      "Nous mettons en place des pratiques simples pour réduire les risques: sauvegardes, accès, outils cloud, protection des données et support aux équipes.",
    deliverables: ["Configuration cloud", "Gestion des accès", "Sauvegardes", "Bonnes pratiques", "Support technique"],
  },
] as const;

export const projectCategories = ["Tous", "Site web", "Application web", "Application mobile", "Automatisation", "SaaS", "Refonte"] as const;

export const projects = [
  {
    slug: "site-web-garage-local",
    title: "Site web pour garage local",
    category: "Site web",
    summary: "Site vitrine rapide avec demandes de rendez-vous, services clairs et optimisation locale.",
    challenge: "Le garage dépendait du bouche-à-oreille et n'avait pas de présence crédible sur Google.",
    solution: "Un site responsive avec pages de services, formulaire simple et contenu SEO local.",
    results: ["+38 % de demandes en ligne simulées", "Temps de chargement sous 1,5 s", "Structure prête pour Google Business"],
  },
  {
    slug: "plateforme-reservation",
    title: "Plateforme de réservation",
    category: "Application web",
    summary: "Système de réservation en ligne pour centraliser horaires, disponibilités et confirmations.",
    challenge: "Les réservations étaient gérées par téléphone et messages dispersés.",
    solution: "Une interface web avec calendrier, confirmations automatisées et tableau d'administration.",
    results: ["Moins d'appels répétitifs", "Meilleure visibilité des disponibilités", "Expérience client plus fluide"],
  },
  {
    slug: "application-gestion-interne",
    title: "Application de gestion interne",
    category: "Application web",
    summary: "Outil métier pour suivre clients, tâches, documents et statuts opérationnels.",
    challenge: "Les données étaient réparties entre courriels, fichiers et notes manuelles.",
    solution: "Une application centralisée avec rôles, tableaux de bord et historique des actions.",
    results: ["Moins de double saisie", "Suivi plus fiable", "Données mieux organisées"],
  },
  {
    slug: "automatisation-administrative",
    title: "Automatisation administrative",
    category: "Automatisation",
    summary: "Flux automatisé pour traiter formulaires, documents et notifications internes.",
    challenge: "L'équipe perdait du temps à transférer les mêmes informations entre outils.",
    solution: "Un processus automatisé reliant formulaire, dossier cloud, courriel et tableau de suivi.",
    results: ["Plusieurs heures économisées par semaine", "Moins d'oublis", "Suivi plus transparent"],
  },
  {
    slug: "tableau-bord-pme",
    title: "Tableau de bord PME",
    category: "SaaS",
    summary: "Dashboard pour visualiser ventes, demandes, tâches et indicateurs de performance.",
    challenge: "La direction manquait d'une vue simple sur les activités importantes.",
    solution: "Un tableau de bord clair avec indicateurs, filtres et exports.",
    results: ["Décisions plus rapides", "Indicateurs accessibles", "Base prête pour nouveaux modules"],
  },
  {
    slug: "application-mobile-service-local",
    title: "Application mobile pour service local",
    category: "Application mobile",
    summary: "Prototype mobile pour faciliter les demandes de service, suivis et notifications.",
    challenge: "Les clients voulaient suivre leurs demandes sans appeler l'entreprise.",
    solution: "Une app mobile orientée demandes, statuts et messages rapides.",
    results: ["Parcours client simplifié", "Notifications prêtes", "Fondation extensible"],
  },
];

export const methodGuarantees = [
  {
    title: "Périmètre clair",
    text: "Chaque mandat commence avec des objectifs, livrables, priorités et limites explicitement définis.",
  },
  {
    title: "Livraison vérifiable",
    text: "Les pages, formulaires, routes, performances et contenus sont testés avant validation.",
  },
  {
    title: "Base évolutive",
    text: "Le code et les contenus sont structurés pour pouvoir ajouter un CMS, des analytics ou un espace client plus tard.",
  },
];

export const processSteps = [
  ["01", "Comprendre", "On clarifie vos objectifs, contraintes, utilisateurs et priorités d'affaires."],
  ["02", "Structurer", "On propose une architecture simple, un périmètre réaliste et un plan de livraison."],
  ["03", "Concevoir", "On crée les interfaces, contenus et parcours avec une attention forte à la conversion."],
  ["04", "Développer", "On construit proprement, teste sur mobile et optimise performance, SEO et accessibilité."],
  ["05", "Accompagner", "On documente, déploie et reste disponible pour les ajustements et l'évolution."],
];

export const faqs = [
  {
    question: "Travaillez-vous seulement en Montérégie?",
    answer:
      "Non. Nous sommes basés à Saint-Louis-de-Gonzague et servons la Montérégie, mais nous pouvons accompagner des PME partout au Québec à distance.",
  },
  {
    question: "Pouvez-vous créer les textes du site?",
    answer:
      "Oui. Nous rédigeons des contenus clairs et orientés SEO à partir de vos services, de votre clientèle et de vos objectifs de conversion.",
  },
  {
    question: "Est-ce que le site sera facile à faire évoluer?",
    answer:
      "Oui. La première version peut rester semi-statique pour la performance, tout en prévoyant une connexion future à un CMS comme Sanity, Strapi ou Supabase.",
  },
  {
    question: "Pouvez-vous reprendre un site existant?",
    answer:
      "Oui. Nous pouvons auditer l'existant, conserver le contenu utile, améliorer le design, la performance, le SEO et la structure technique.",
  },
];

export const resources = [
  {
    slug: "pourquoi-pme-site-web-professionnel",
    title: "Pourquoi une PME doit avoir un site web professionnel",
    excerpt: "Un site clair rassure, explique vos services et transforme les recherches locales en demandes concrètes.",
    readTime: "6 min",
  },
  {
    slug: "combien-coute-site-web-quebec",
    title: "Combien coûte un site web au Québec?",
    excerpt: "Les vrais facteurs de coût: contenu, design, fonctionnalités, SEO, maintenance et niveau d'accompagnement.",
    readTime: "7 min",
  },
  {
    slug: "automatiser-taches-administratives",
    title: "Pourquoi automatiser ses tâches administratives",
    excerpt: "Des automatisations simples peuvent réduire les oublis, accélérer le suivi et libérer du temps chaque semaine.",
    readTime: "5 min",
  },
  {
    slug: "site-vitrine-application-web-saas",
    title: "Comment choisir entre site vitrine, application web et SaaS",
    excerpt: "Le bon choix dépend de votre modèle d'affaires, de vos utilisateurs et de la valeur que l'outil doit créer.",
    readTime: "8 min",
  },
  {
    slug: "securite-web-base-pme",
    title: "Sécurité web de base pour PME",
    excerpt: "Sauvegardes, accès, mises à jour et bonnes pratiques: les fondations simples pour réduire les risques.",
    readTime: "6 min",
  },
];

export const whyUs = [
  ["Clarté", "Des recommandations compréhensibles, des budgets lisibles et aucune complexité inutile."],
  ["Qualité technique", "Une base moderne, rapide, responsive et prête à évoluer."],
  ["Proximité", "Un accompagnement humain pour les PME, commerces et organisations locales."],
  ["Innovation utile", "De l'IA et de l'automatisation seulement quand elles créent une vraie valeur."],
];

export const futureNote = {
  icon: MessageSquareQuote,
  title: "Zone prête pour futur assistant IA",
  text: "Le lancement ne comprend pas de chat en direct. L'architecture prévoit toutefois un emplacement pour ajouter plus tard un assistant IA ou un espace client.",
};
