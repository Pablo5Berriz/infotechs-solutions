import type {AppLocale} from '@/i18n/routing';
import fr from '../../messages/fr/contact.json';
import en from '../../messages/en/contact.json';
import { z } from "zod";

// Keep client-side validation compatible with a CSP that deliberately omits
// `unsafe-eval`. Zod otherwise probes JIT support with the Function constructor.
z.config({ jitless: true });

export const contactNeedTypes = ["web", "automation", "custom", "audit", "other"] as const;

export function getContactMessages(locale:AppLocale) {return locale==='en'?en:fr;}
export function createContactSchema(locale:AppLocale='fr') {
 const e=getContactMessages(locale).errors;
 return z.object({
  locale:z.enum(['fr','en'],{error:e.localeInvalid}),
  name: z.string({error:e.nameRequired}).trim().min(2, e.nameRequired).max(100, e.nameTooLong),
  company: z.string().trim().max(120, e.companyTooLong).optional(),
  email: z.string({error:e.emailInvalid}).trim().email(e.emailInvalid).max(254, e.emailTooLong),
  phone: z.string().trim().min(7, e.phoneInvalid).max(30, e.phoneTooLong).regex(/^[+()0-9.\s-]*$/, e.phoneInvalid).optional().or(z.literal("")),
  projectType: z.enum(contactNeedTypes, { error: e.projectTypeRequired }),
  message: z.string({error:e.messageTooShort}).trim().min(20, e.messageTooShort).max(5000, e.messageTooLong),
  consent: z.boolean({error:e.consentRequired}).refine((value) => value, e.consentRequired),
  website: z.string().max(200).optional(),
}).strict();
}
export const contactSchema=createContactSchema();

export type ContactFormValues = z.infer<typeof contactSchema>;
