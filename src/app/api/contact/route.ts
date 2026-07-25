import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Données invalides.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const hasResendConfig = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FORM_FROM && process.env.CONTACT_FORM_TO);
  const hasSupabaseConfig = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_CONTACT_TABLE);

  if (!hasResendConfig && !hasSupabaseConfig) {
    return NextResponse.json(
      {
        ok: false,
        message: "Formulaire validé, mais aucun fournisseur d'envoi ou de stockage n'est configuré.",
        nextSteps: ["Configurer Resend pour l'envoi courriel", "ou configurer Supabase pour stocker les demandes"],
      },
      { status: 501 },
    );
  }

  // Future integration point:
  // - Resend: send an email to CONTACT_FORM_TO.
  // - Supabase: insert parsed.data into SUPABASE_CONTACT_TABLE.
  return NextResponse.json(
    {
      ok: false,
      message: "Intégration fournisseur à activer avant mise en production.",
    },
    { status: 501 },
  );
}
