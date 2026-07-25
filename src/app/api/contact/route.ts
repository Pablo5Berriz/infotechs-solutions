import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { createContactReference, deliverContactRequest } from "@/lib/contact-delivery";
import { contactRateLimit } from "@/lib/contact-rate-limit";

const MAX_BODY_BYTES = 16_384;

function clientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${forwarded || request.headers.get("x-real-ip") || "unknown"}|${request.headers.get("user-agent") || "unknown"}`;
}

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
  const rate = contactRateLimit(clientIdentifier(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: "Trop de tentatives. Réessayez plus tard.", reference },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const body = await readPayload(request);
  if ("tooLarge" in body) return NextResponse.json({ ok: false, message: "La demande est trop volumineuse.", reference }, { status: 413 });
  if ("invalidJson" in body) return NextResponse.json({ ok: false, message: "La demande est illisible.", reference }, { status: 400 });

  const parsed = contactSchema.safeParse(body.payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Vérifiez les informations saisies.", issues: parsed.error.flatten().fieldErrors, reference },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    console.info("contact_request_filtered", { reference, reason: "honeypot" });
    return NextResponse.json({ ok: true, message: "Votre demande a été transmise." }, { status: 202 });
  }

  const delivery = await deliverContactRequest(parsed.data, reference);
  if (!delivery.ok) {
    console.error("contact_request_failed", { reference, reason: delivery.reason });
    const status = delivery.reason === "configuration" ? 503 : 502;
    return NextResponse.json(
      { ok: false, message: "La transmission est temporairement indisponible. Vous pouvez réessayer.", reference },
      { status },
    );
  }

  console.info("contact_request_delivered", { reference, providerId: delivery.providerId });
  return NextResponse.json(
    { ok: true, message: "Votre demande a été transmise. Infotechs Solutions pourra l’examiner à partir des informations fournies." },
    { status: 202 },
  );
}
