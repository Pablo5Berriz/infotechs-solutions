"use client";

import {useContent, useAppLocale} from "@/i18n/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, LoaderCircle, Send } from "lucide-react";
import { cloneElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import Link from "@/components/localized-link";
import { contactNeedTypes, createContactSchema, type ContactFormValues } from "@/lib/contact-schema";

const inputClass =
  "mt-2 min-h-11 w-full rounded-sm border border-bg-800 bg-bg-900 px-4 py-3 text-sm text-text-100 outline-none transition placeholder:text-text-400 hover:border-text-400 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-400/30";

export function ContactForm() {
  const m = useContent();
  const locale=useAppLocale();

  const [submission, setSubmission] = useState<{ kind: "idle" | "success" | "error"; message?: string }>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(locale)),
    defaultValues: { locale, company: "", phone: "", consent: false, website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (isSubmitting) return;
    setSubmission({ kind: "idle" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json", "Accept-Language": locale }, body: JSON.stringify(values) });
      const result = (await response.json().catch(() => null)) as { message?: unknown; reference?: unknown } | null;
      if (!response.ok) {
        const reference = typeof result?.reference === "string" ? m.contact.form.referenceSuffix.replace("{reference}", result.reference) : "";
        setSubmission({ kind: "error", message: `${typeof result?.message === "string" ? result.message : m.contact.form.genericError}${reference}` });
        return;
      }
      setSubmission({ kind: "success", message: typeof result?.message === "string" ? result.message : m.contact.form.defaultSuccess });
      reset({ locale, name: "", company: "", email: "", phone: "", projectType: undefined, message: "", consent: false, website: "" });
    } catch {
      setSubmission({ kind: "error", message: m.contact.form.networkError });
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
      <input type="hidden" {...register("locale")} />
      <div className="border-b border-bg-800 pb-6">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-purple-300">{m.contact.form.formTitleEyebrow}</p>
        <h2 id="contact-form-title" className="mt-3 text-2xl font-semibold">{m.contact.form.formTitle}</h2>
        <p className="mt-3 leading-7 text-text-400">
          {m.contact.form.formIntro} </p>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">{m.contact.form.honeypotLabel}</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label={m.contact.form.nameLabel} required error={errors.name?.message} errorId="name-error">
          <input className={inputClass} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        </Field>
        <Field label={m.contact.form.companyLabel} error={errors.company?.message} errorId="company-error">
          <input className={inputClass} autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} {...register("company")} />
        </Field>
        <Field label={m.contact.form.emailLabel} required error={errors.email?.message} errorId="email-error">
          <input className={inputClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </Field>
        <Field label={m.contact.form.phoneLabel} error={errors.phone?.message} errorId="phone-error">
          <input className={inputClass} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
        </Field>
      </div>

      <Field label={m.contact.form.projectTypeLabel} required error={errors.projectType?.message} errorId="projectType-error" className="mt-5">
        <select className={inputClass} defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined} {...register("projectType")}>
          <option value="" disabled>{m.contact.form.projectTypePlaceholder}</option>
          {contactNeedTypes.map((type) => <option key={type} value={type}>{m.contact.needTypes[type]}</option>)}
        </select>
      </Field>

      <Field label={m.contact.form.messageLabel} required error={errors.message?.message} errorId="message-error" help={m.contact.form.messageHelp} helpId="message-help" className="mt-5">
        <textarea
          className={`${inputClass} min-h-40 resize-y`}
          placeholder={m.contact.form.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          {...register("message")}
        />
      </Field>

      <div className="mt-6">
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-text-400">
          <input type="checkbox" required aria-required="true" className="mt-1 h-5 w-5 shrink-0 accent-purple-500" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
          <span>{m.common.consentPrefix} <Link href="/confidentialite" className="font-semibold text-purple-300 underline underline-offset-4">{m.contact.form.privacyLinkText}</Link>.</span>
        </label>
        {errors.consent ? <p id="consent-error" role="alert" className="mt-2 text-sm font-medium text-red-400">{errors.consent.message}</p> : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-bg-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-md gap-2 text-sm leading-6 text-text-400"><Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" aria-hidden="true" />{m.contact.form.noAutoReply}</p>
        <button type="submit" disabled={isSubmitting || submission.kind === "success"} aria-disabled={isSubmitting || submission.kind === "success"} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-purple-600 px-5 py-3 font-semibold text-[#f4f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? <>{m.contact.form.submitting} <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /></> : <>{m.contact.form.submit} <Send className="h-4 w-4" aria-hidden="true" /></>}
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
      {label}{required ? <span className="ml-1 text-purple-300" aria-hidden="true">*</span> : null}
      {control}
      {help ? <span id={helpId} className="mt-2 block text-xs font-normal text-text-400">{help}</span> : null}
      {error ? <span id={errorId} role="alert" className="mt-2 block text-sm font-medium text-red-400">{error}</span> : null}
    </label>
  );
}
