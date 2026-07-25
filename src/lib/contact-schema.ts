import { z } from "zod";

export const contactNeedTypes = ["Site web", "Automatisation", "Application web", "Autre besoin"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Indiquez un courriel valide."),
  phone: z.string().trim().min(7, "Indiquez un numéro valide.").optional().or(z.literal("")),
  projectType: z.enum(contactNeedTypes, { error: "Choisissez un type de besoin." }),
  message: z.string().trim().min(20, "Ajoutez au moins 20 caractères."),
  consent: z.boolean().refine((value) => value, "Le consentement est requis."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
