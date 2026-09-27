import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { resetContactRateLimitForTests } from "@/lib/contact-rate-limit";

const validPayload = {
  locale: "fr",
  name: "Marie Tremblay",
  company: "PME Exemple",
  email: "marie@example.com",
  phone: "+1 450 555 0101",
  projectType: "web",
  message: "Nous souhaitons clarifier et moderniser notre présence numérique.",
  consent: true,
  website: "",
};

function request(body: string | object, ip = "203.0.113.10", contentType = "application/json") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": contentType, "x-infotechs-client-ip": ip, "user-agent": "vitest" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("localise le succès EN et le courriel sans envoi réel", async () => {
    const provider = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email_en" }), { status: 200 }));
    const response = await POST(request({ ...validPayload, locale: "en" }));
    expect(response.status).toBe(202);
    expect(await response.json()).toMatchObject({ok:true,message:expect.stringContaining("Your request has been sent")});
    const email = JSON.parse(String(provider.mock.calls[0][1]?.body));
    expect(email.subject).toMatch(/^New request/);
    expect(email.text).toContain("Language: en");
    expect(email.text).toContain(validPayload.message);
  });

  it("localise les erreurs EN et refuse une locale invalide sans fournisseur", async () => {
    const provider = vi.spyOn(globalThis, "fetch");
    const invalid = await POST(request({ ...validPayload, locale:"en", name:"" }));
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toMatchObject({issues:{name:["Enter your name."]}});
    expect((await POST(request({...validPayload,locale:"de"}))).status).toBe(400);
    expect(provider).not.toHaveBeenCalled();
  });

  it("localise une erreur avant parsing grâce à Accept-Language", async () => {
    const response = await POST(new Request("http://localhost/api/contact", {method:"POST",headers:{"accept-language":"en-CA","content-type":"application/json"},body:"{"}));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({message:"The request could not be read."});
  });

  beforeEach(() => {
    resetContactRateLimitForTests();
    process.env.RESEND_API_KEY = "re_test_only";
    process.env.CONTACT_FORM_FROM = "noreply@example.com";
    process.env.CONTACT_FORM_TO = "inbox@example.com";
    process.env.CONTACT_TRUSTED_PROXY_MODE = "trusted";
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FORM_FROM;
    delete process.env.CONTACT_FORM_TO;
    delete process.env.CONTACT_TRUSTED_PROXY_MODE;
  });

  it("accepte une requête valide après succès du fournisseur", async () => {
    const provider = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));
    const response = await POST(request(validPayload));
    expect(response.status).toBe(202);
    expect(await response.json()).toMatchObject({ ok: true, message: expect.stringContaining("transmise") });
    const init = provider.mock.calls[0][1] as RequestInit;
    expect(init.headers).toMatchObject({ Authorization: "Bearer re_test_only", "Idempotency-Key": expect.stringMatching(/^contact\//) });
    expect(String(init.body)).not.toContain("re_test_only");
  });

  it("accepte un expéditeur Resend avec nom d’affichage", async () => {
    process.env.CONTACT_FORM_FROM = "Infotechs Solutions <contact@infotechssolutions.ca>";
    process.env.CONTACT_FORM_TO = "solutionsinfos2023@gmail.com";
    const provider = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email_display_name" }), { status: 200 }));

    const response = await POST(request(validPayload));

    expect(response.status).toBe(202);
    const init = provider.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toMatchObject({
      from: "Infotechs Solutions <contact@infotechssolutions.ca>",
      to: ["solutionsinfos2023@gmail.com"],
    });
  });

  it.each([
    "Infotechs Solutions <contact@infotechssolutions.ca>\r\nBcc: attacker@example.com",
    "Infotechs Solutions <>",
    "<contact@infotechssolutions.ca>",
    "Infotechs Solutions contact@infotechssolutions.ca",
  ])("refuse un expéditeur Resend invalide : %s", async (from) => {
    process.env.CONTACT_FORM_FROM = from;
    const provider = vi.spyOn(globalThis, "fetch");

    const response = await POST(request(validPayload));

    expect(response.status).toBe(503);
    expect(provider).not.toHaveBeenCalled();
  });

  it("refuse un JSON invalide", async () => expect((await POST(request("{"))).status).toBe(400));
  it("refuse un payload incomplet", async () => expect((await POST(request({ name: "Marie" }))).status).toBe(400));
  it("refuse un champ inconnu", async () => expect((await POST(request({ ...validPayload, admin: true }))).status).toBe(400));
  it("refuse un courriel invalide", async () => expect((await POST(request({ ...validPayload, email: "invalide" }))).status).toBe(400));
  it("refuse un type de besoin invalide", async () => expect((await POST(request({ ...validPayload, projectType: "CRM" }))).status).toBe(400));
  it("refuse le consentement absent", async () => {
    const payload = { ...validPayload } as Partial<typeof validPayload>;
    delete payload.consent;
    expect((await POST(request(payload))).status).toBe(400);
  });

  it("filtre silencieusement le honeypot sans appeler le fournisseur", async () => {
    const provider = vi.spyOn(globalThis, "fetch");
    const response = await POST(request({ ...validPayload, website: "https://spam.example" }));
    expect(response.status).toBe(202);
    expect(provider).not.toHaveBeenCalled();
  });

  it("limite les répétitions abusives", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));
    for (let index = 0; index < 5; index += 1) expect((await POST(request(validPayload))).status).toBe(202);
    const response = await POST(request(validPayload));
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    expect(await response.text()).not.toContain("203.0.113.10");
  });

  it("isole deux identités clientes", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));
    for (let index = 0; index < 5; index += 1) {
      expect((await POST(request(validPayload, "203.0.113.20"))).status).toBe(202);
    }
    expect((await POST(request(validPayload, "203.0.113.21"))).status).toBe(202);
  });

  it("retourne 502 sans faux succès si le fournisseur est indisponible", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("indisponible", { status: 503 }));
    const response = await POST(request(validPayload));
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ ok: false, reference: expect.any(String) });
  });

  it("retourne 503 si la configuration est absente", async () => {
    delete process.env.RESEND_API_KEY;
    const provider = vi.spyOn(globalThis, "fetch");
    const response = await POST(request(validPayload));
    expect(response.status).toBe(503);
    expect(provider).not.toHaveBeenCalled();
  });

  it("ne divulgue jamais un secret dans la réponse", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("erreur", { status: 401 }));
    const response = await POST(request(validPayload));
    expect(await response.text()).not.toContain("re_test_only");
  });

  it("accepte un formulaire natif sans JavaScript", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email_form" }), { status: 200 }));
    const encoded = new URLSearchParams({ ...validPayload, consent: "on" }).toString();
    expect((await POST(request(encoded, "203.0.113.11", "application/x-www-form-urlencoded"))).status).toBe(202);
  });

  it("refuse un corps trop volumineux", async () => {
    const oversized = request(JSON.stringify({ ...validPayload, message: "x".repeat(17_000) }), "203.0.113.12");
    expect((await POST(oversized)).status).toBe(413);
  });
});
