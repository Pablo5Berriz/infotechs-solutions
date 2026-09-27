import {isLocale} from '@/i18n/paths';
import { NextResponse } from "next/server";
import { createContactSchema, getContactMessages } from "@/lib/contact-schema";
import { createContactReference, deliverContactRequest } from "@/lib/contact-delivery";
import { contactRateLimit } from "@/lib/contact-rate-limit";
import { resolveContactClientIdentity } from "@/lib/contact-client-identity";

const MAX_BODY_BYTES = 16_384;

async function readPayload(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return { tooLarge: true as const };

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return { tooLarge: true as const };

  try {
    if (request.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
      const form = new URLSearchParams(raw);
      return { payload: { ...Object.fromEntries(form), consent: form.get("consent") === "on" || form.get("consent") === "true" } };
    }
    return { payload: JSON.parse(raw) as unknown };
  } catch {
    return { invalidJson: true as const };
  }
}

export async function POST(request: Request) {
  const reference = createContactReference();
  const language=request.headers.get('accept-language')?.split(/[,;-]/)[0];
  let locale=isLocale(language)?language:'fr' as const;
  let messages=getContactMessages(locale).api;
  const rate = contactRateLimit(resolveContactClientIdentity(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: messages.rateLimited, reference },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const body = await readPayload(request);
  if ("tooLarge" in body) return NextResponse.json({ ok: false, message: messages.tooLarge, reference }, { status: 413 });
  if ("invalidJson" in body) return NextResponse.json({ ok: false, message: messages.unreadable, reference }, { status: 400 });

  if (body.payload && typeof body.payload==='object' && 'locale' in body.payload && isLocale(body.payload.locale)) locale=body.payload.locale;
  messages=getContactMessages(locale).api;
  const parsed = createContactSchema(locale).safeParse(body.payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: messages.invalid, issues: parsed.error.flatten().fieldErrors, reference },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    console.info("contact_request_filtered", { reference, reason: "honeypot" });
    return NextResponse.json({ ok: true, message: messages.filtered }, { status: 202 });
  }

  const delivery = await deliverContactRequest(parsed.data, reference);
  if (!delivery.ok) {
    console.error("contact_request_failed", { reference, reason: delivery.reason });
    const status = delivery.reason === "configuration" ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: messages.unavailable, reference },
      { status },
    );
  }

  console.info("contact_request_delivered", { reference, providerId: delivery.providerId });
  return NextResponse.json(
    { ok: true, message: messages.success },
    { status: 202 },
  );
}
