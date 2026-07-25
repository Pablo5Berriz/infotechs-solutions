import { randomUUID } from "node:crypto";
import type { ContactFormValues } from "@/lib/contact-schema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export type ContactDeliveryResult = { ok: true; providerId: string } | { ok: false; reason: "configuration" | "provider" };

function isSafeEmail(value?: string) {
  return Boolean(value && emailPattern.test(value) && !/[\r\n]/.test(value));
}

function isSafeFromAddress(value?: string) {
  if (!value || /[\r\n]/.test(value)) return false;
  if (emailPattern.test(value)) return true;

  const match = value.match(/^([^<>]+)\s*<([^<>]+)>$/);
  if (!match) return false;

  const displayName = match[1].trim();
  const email = match[2].trim();
  return displayName.length > 0 && emailPattern.test(email);
}

function getConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim();
  const to = process.env.CONTACT_FORM_TO?.trim();

  if (!apiKey || !isSafeFromAddress(from) || !isSafeEmail(to)) return null;
  return { apiKey, from, to };
}

export async function deliverContactRequest(values: ContactFormValues, reference: string): Promise<ContactDeliveryResult> {
  const config = getConfig();
  if (!config) return { ok: false, reason: "configuration" };
  const configuredEndpoint = process.env.CONTACT_PROVIDER_API_URL?.trim();
  const endpoint = configuredEndpoint && /^http:\/\/127\.0\.0\.1:\d+\//.test(configuredEndpoint) ? configuredEndpoint : RESEND_ENDPOINT;

  const lines = [
    `Référence : ${reference}`,
    `Nom : ${values.name}`,
    `Organisation : ${values.company || "Non indiquée"}`,
    `Courriel : ${values.email}`,
    `Téléphone : ${values.phone || "Non indiqué"}`,
    `Type de besoin : ${values.projectType}`,
    "",
    "Description :",
    values.message,
  ];

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${reference}`,
        "User-Agent": "infotechs-solutions-contact/1.0",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: values.email,
        subject: `Nouvelle demande — ${values.projectType}`,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return { ok: false, reason: "provider" };
    const body = (await response.json().catch(() => null)) as { id?: unknown } | null;
    return typeof body?.id === "string" ? { ok: true, providerId: body.id } : { ok: false, reason: "provider" };
  } catch {
    return { ok: false, reason: "provider" };
  }
}

export function createContactReference() {
  return randomUUID();
}
