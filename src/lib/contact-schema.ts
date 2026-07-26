import { z } from "zod";

// Keep client-side validation compatible with a CSP that deliberately omits
// `unsafe-eval`. Zod otherwise probes JIT support with the Function constructor.
z.config({ jitless: true });

export const contactNeedTypes = ["Site web", "Automatisation", "Application web", "Autre besoin"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100, "Le nom est trop long."),
  company: z.string().trim().max(120, "Le nom de l’organisation est trop long.").optional(),
  email: z.string().trim().email("Indiquez un courriel valide.").max(254, "Le courriel est trop long."),
  phone: z.string().trim().min(7, "Indiquez un numéro valide.").max(30, "Le numéro est trop long.").regex(/^[+()0-9.\s-]*$/, "Indiquez un numéro valide.").optional().or(z.literal("")),
  projectType: z.enum(contactNeedTypes, { error: "Choisissez un type de besoin." }),
  message: z.string().trim().min(20, "Ajoutez au moins 20 caractères.").max(5000, "La description est trop longue."),
  consent: z.boolean().refine((value) => value, "Le consentement est requis."),
  website: z.string().max(200).optional(),
}).strict();

export type ContactFormValues = z.infer<typeof contactSchema>;
