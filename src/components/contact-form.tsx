"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, LoaderCircle, Send } from "lucide-react";
import { cloneElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { contactNeedTypes, contactSchema, type ContactFormValues } from "@/lib/contact-schema";

const inputClass =
  "mt-2 min-h-11 w-full rounded-sm border border-bg-800 bg-bg-900 px-4 py-3 text-sm text-text-100 outline-none transition placeholder:text-text-400 hover:border-text-400 focus-visible:border-copper-500 focus-visible:ring-2 focus-visible:ring-copper-500/30";

export function ContactForm() {
  const [submission, setSubmission] = useState<{ kind: "idle" | "success" | "error"; message?: string }>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { company: "", phone: "", consent: false, website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (isSubmitting) return;
    setSubmission({ kind: "idle" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = (await response.json().catch(() => null)) as { message?: unknown; reference?: unknown } | null;
      if (!response.ok) {
        const reference = typeof result?.reference === "string" ? ` Référence : ${result.reference}.` : "";
        setSubmission({ kind: "error", message: `${typeof result?.message === "string" ? result.message : "La transmission a échoué."}${reference}` });
        return;
      }
      setSubmission({ kind: "success", message: typeof result?.message === "string" ? result.message : "Votre demande a été transmise." });
      reset({ name: "", company: "", email: "", phone: "", projectType: undefined, message: "", consent: false, website: "" });
    } catch {
      setSubmission({ kind: "error", message: "La transmission a échoué. Vérifiez votre connexion et réessayez." });
    }
  }

  return (
    <form
      id="devis"
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-sm border border-bg-800 bg-bg-900 p-5 sm:p-8"
      aria-labelledby="contact-form-title"
    >
      <div className="border-b border-bg-800 pb-6">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-copper-500">Demande de contact</p>
        <h2 id="contact-form-title" className="mt-3 text-2xl font-semibold">Transmettez les grandes lignes.</h2>
        <p className="mt-3 leading-7 text-text-400">
          Les informations sont transmises à Infotechs Solutions par notre fournisseur courriel. Elles ne sont ni ajoutées à un CRM ni stockées dans une base de données par ce site.
        </p>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Ne pas remplir ce champ</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Nom" required error={errors.name?.message} errorId="name-error">
          <input className={inputClass} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        </Field>
        <Field label="Organisation (optionnel)" error={errors.company?.message} errorId="company-error">
          <input className={inputClass} autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} {...register("company")} />
        </Field>
        <Field label="Courriel" required error={errors.email?.message} errorId="email-error">
          <input className={inputClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </Field>
        <Field label="Téléphone (optionnel)" error={errors.phone?.message} errorId="phone-error">
          <input className={inputClass} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
        </Field>
      </div>

      <Field label="Type de besoin" required error={errors.projectType?.message} errorId="projectType-error" className="mt-5">
        <select className={inputClass} defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined} {...register("projectType")}>
          <option value="" disabled>Choisir un type de besoin</option>
          {contactNeedTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </Field>

      <Field label="Description" required error={errors.message?.message} errorId="message-error" help="Au moins 20 caractères." helpId="message-help" className="mt-5">
        <textarea
          className={`${inputClass} min-h-40 resize-y`}
          placeholder="Décrivez le contexte, les utilisateurs, l’objectif et les contraintes déjà connues."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          {...register("message")}
        />
      </Field>

      <div className="mt-6">
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-text-400">
          <input type="checkbox" required aria-required="true" className="mt-1 h-5 w-5 shrink-0 accent-copper-500" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
          <span>Je consens à transmettre ces informations à Infotechs Solutions afin que ma demande puisse être examinée.</span>
        </label>
        {errors.consent ? <p id="consent-error" role="alert" className="mt-2 text-sm font-medium text-red-400">{errors.consent.message}</p> : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-bg-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-md gap-2 text-sm leading-6 text-text-400"><Info className="mt-0.5 h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" />Aucun délai de réponse automatique n’est promis.</p>
        <button type="submit" disabled={isSubmitting || submission.kind === "success"} aria-disabled={isSubmitting || submission.kind === "success"} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-copper-500 px-5 py-3 font-semibold text-[#14151a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-500 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? <>Transmission… <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /></> : <>Transmettre la demande <Send className="h-4 w-4" aria-hidden="true" /></>}
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {submission.kind === "success" ? <p role="status" className="mt-5 border-l-2 border-emerald-500 bg-bg-950 px-4 py-3 text-sm leading-6 text-text-100">{submission.message}</p> : null}
        {submission.kind === "error" ? <p role="alert" className="mt-5 border-l-2 border-red-400 bg-bg-950 px-4 py-3 text-sm leading-6 text-red-300">{submission.message}</p> : null}
      </div>
    </form>
  );
}

function Field({ label, required, error, errorId, help, helpId, children, className }: { label: string; required?: boolean; error?: string; errorId: string; help?: string; helpId?: string; children: ReactElement<{ required?: boolean; "aria-required"?: boolean }>; className?: string }) {
  const control = required ? cloneElement(children, { required: true, "aria-required": true }) : children;

  return (
    <label className={`block text-sm font-semibold text-text-100 ${className ?? ""}`}>
      {label}{required ? <span className="ml-1 text-copper-500" aria-hidden="true">*</span> : null}
      {control}
      {help ? <span id={helpId} className="mt-2 block text-xs font-normal text-text-400">{help}</span> : null}
      {error ? <span id={errorId} role="alert" className="mt-2 block text-sm font-medium text-red-400">{error}</span> : null}
    </label>
  );
}
