export type AboutPrinciple = {
  id: string;
  title: string;
  description: string;
};

export type AboutMethodStep = {
  number: string;
  title: string;
  description: string;
};

export const aboutPrinciples: AboutPrinciple[] = [
  { id: "understand", title: "Comprendre avant de construire", description: "Le contexte, les utilisateurs et les contraintes sont clarifiés avant de choisir une technologie ou une fonctionnalité." },
  { id: "proportion", title: "Choisir le bon niveau de solution", description: "Le périmètre doit rester proportionné au problème : un site, une automatisation ciblée ou un outil métier ne répondent pas aux mêmes besoins." },
  { id: "progress", title: "Livrer progressivement", description: "Les étapes courtes rendent les choix vérifiables, limitent les écarts et permettent d’ajuster la suite avec des éléments concrets." },
  { id: "visible", title: "Rendre les décisions visibles", description: "Hypothèses, priorités, limites et validations sont formulées clairement afin que chacun comprenne ce qui est décidé." },
  { id: "document", title: "Documenter l’essentiel", description: "Les éléments utiles à l’utilisation, à la maintenance et à l’évolution sont consignés sans produire une documentation inutilement lourde." },
  { id: "users", title: "Concevoir pour les usages réels", description: "Les parcours, le contenu et l’accessibilité sont évalués selon les personnes qui utiliseront réellement la solution." },
];

export const aboutMethod: AboutMethodStep[] = [
  { number: "01", title: "Contexte", description: "Comprendre la situation actuelle, les utilisateurs et les contraintes connues." },
  { number: "02", title: "Objectifs", description: "Définir ce que la solution doit permettre de mieux faire ou de mieux comprendre." },
  { number: "03", title: "Priorités", description: "Séparer l’essentiel, les options et les sujets qui demandent une expertise complémentaire." },
  { number: "04", title: "Conception", description: "Transformer les décisions en parcours, interfaces et comportements observables." },
  { number: "05", title: "Validation", description: "Vérifier par étapes le contenu, les usages, la qualité technique et les limites." },
  { number: "06", title: "Mise en service", description: "Préparer le passage en usage, la documentation et les évolutions raisonnables." },
];

export const aboutScope = {
  canDo: [
    "Concevoir ou refondre un site web clair et accessible.",
    "Structurer une expérience numérique autour d’utilisateurs précis.",
    "Automatiser un processus ciblé lorsque le gain attendu est vérifiable.",
    "Développer une application web adaptée à un flux métier.",
    "Organiser une livraison progressive et documenter la solution.",
  ],
  needsScoping: [
    "Les besoins juridiques et les obligations réglementaires.",
    "Les exigences de sécurité spécialisées et la sensibilité des données.",
    "Les intégrations avec des services ou systèmes tiers.",
    "Le niveau d’hébergement, de maintenance et de disponibilité attendu.",
    "Les responsabilités opérationnelles après la mise en service.",
  ],
} as const;
